import {
  ExamSchedule,
  ExamViolationLog,
  Question,
  Student,
  StudentExamSession,
  StudentExamStatus,
  ViolationType,
  isSessionCompleted,
} from '../types/cbt';
import { supabase, isSupabaseConfigured, supabaseConfigError } from '../lib/supabaseClient';
import { calculateProvisionalScore } from '../utils/sessionDevice';
import { syncSingleSession } from '../utils/apiSync';

export interface SupabaseExamSessionRow {
  id: string;
  student_id: string;
  student_nis?: string;
  student_name: string;
  nis: string;
  class_id: string;
  class_name: string;
  exam_id: string;
  exam_title: string;
  status: string;
  answered_count?: number;
  total_questions?: number;
  score: number;
  score_pg: number;
  score_essay: number;
  final_score: number;
  is_passed: boolean;
  violation_count: number;
  is_locked: boolean;
  lock_reason: string | null;
  lock_count?: number | null;
  unlock_cooldown_until?: number | null;
  answers_json: StudentExamSession['answers'] | string | null;
  time_remaining_seconds: number;
  extra_time_minutes: number;
  current_question_index: number;
  device_info: string | null;
  device_session_id: string | null;
  is_online: boolean;
  last_heartbeat: number;
  admin_action_at: number | null;
  started_at: string | null;
  submitted_at: string | null;
  updated_at: string;
}

export interface SupabaseViolationLogRow {
  id: string;
  session_id: string;
  student_id: string;
  student_name: string;
  nis: string;
  class_name: string;
  exam_id: string;
  exam_title: string;
  violation_type: string;
  description: string;
  violation_number: number;
  action_taken: string;
  created_at: string;
}

export interface SubmitExamResult {
  success: boolean;
  session: StudentExamSession;
  source: 'supabase' | 'server';
  error?: string;
  isNetworkError?: boolean;
  queuedOffline?: boolean;
  attemptsUsed?: number;
}

export const PENDING_SUBMISSIONS_STORAGE_KEY = 'cbt_pending_submissions';

export const FRIENDLY_OFFLINE_SUBMIT_MESSAGE =
  "Koneksi internet terputus. Jawaban Anda sudah aman tersimpan di HP ini. Aktifkan kembali internet/Wi-Fi lalu tekan 'Coba Kirim Lagi', atau sistem akan mengirimnya otomatis begitu sinyal kembali.";

export interface PendingSubmissionRecord {
  id: string;
  nis: string;
  examId: string;
  totalQuestions: number;
  session: StudentExamSession;
  payload: Partial<SupabaseExamSessionRow>;
  queuedAt: number;
  attempts: number;
  lastError?: string;
}

export interface SessionActionResult {
  success: boolean;
  session: StudentExamSession;
  error?: string;
}

export interface SyncSessionResult {
  success: boolean;
  session?: StudentExamSession;
  error?: string;
  skipped?: boolean;
}

export interface FetchExamResultsWithStatus {
  sessions: StudentExamSession[] | null;
  error?: string;
}

export interface FetchViolationLogsWithStatus {
  logs: ExamViolationLog[] | null;
  error?: string;
}

export function buildDeterministicSessionId(nis: string, examId: string): string {
  const cleanNis = (nis || 'unknown').trim();
  const cleanExam = (examId || 'ex-mat-2026').trim();
  return `${cleanNis}_${cleanExam}`;
}

export function countAnsweredQuestions(answers?: StudentExamSession['answers']): number {
  if (!answers || typeof answers !== 'object') return 0;
  return Object.values(answers).filter(
    a => a && a.answer !== '' && a.answer !== undefined && (!Array.isArray(a.answer) || a.answer.length > 0)
  ).length;
}

/**
 * Progressive Unlock Cooldown Penalty formula:
 * - 1st lock (lock_count = 1): 1 minute (60s)
 * - 2nd lock (lock_count = 2): 3 minutes (180s)
 * - 3rd lock (lock_count = 3): 5 minutes (300s)
 * - Nth lock: ((N * 2) - 1) minutes = ((N * 2) - 1) * 60 seconds
 */
export function calculateUnlockCooldown(lockCount?: number | null): {
  lockCount: number;
  penaltyMinutes: number;
  penaltySeconds: number;
} {
  const effectiveLockCount = Math.max(1, Math.round(Number(lockCount) || 1));
  const penaltyMinutes = effectiveLockCount * 2 - 1;
  return {
    lockCount: effectiveLockCount,
    penaltyMinutes,
    penaltySeconds: penaltyMinutes * 60,
  };
}

export function formatCooldownMMSS(totalSeconds: number): string {
  const safe = Math.max(0, Math.ceil(Number(totalSeconds) || 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function normalizeStatus(rawStatus?: string | null, isLocked?: boolean): StudentExamStatus {
  if (isLocked) return 'locked';
  const s = (rawStatus || 'not_started').toLowerCase().trim();
  if (s === 'sedang_mengerjakan' || s === 'in_progress') return 'in_progress';
  if (s === 'selesai' || s === 'completed') return 'completed';
  if (s === 'submitted') return 'submitted';
  if (s === 'force_submitted') return 'force_submitted';
  if (s === 'terkunci' || s === 'locked') return 'locked';
  return 'not_started';
}

function parseAnswersJson(raw: SupabaseExamSessionRow['answers_json']): StudentExamSession['answers'] {
  if (!raw) return {};
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }
  return typeof raw === 'object' ? raw : {};
}

function normalizeIsoTimestamp(value?: string | null): string | null {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const directMs = Date.parse(trimmed);
  if (!Number.isNaN(directMs)) {
    return new Date(directMs).toISOString();
  }
  // Convert locale time-only strings like "08.30.15" or "08:30:15" into valid ISO-8601 timestamp
  const timeMatch = trimmed.match(/^(\d{1,2})[.:](\d{2})(?:[.:](\d{2}))?$/);
  if (timeMatch) {
    const d = new Date();
    d.setHours(Number(timeMatch[1]), Number(timeMatch[2]), Number(timeMatch[3] || 0), 0);
    return d.toISOString();
  }
  return null;
}

function sanitizeAnswersJson(
  answers?: StudentExamSession['answers']
): StudentExamSession['answers'] {
  if (!answers || typeof answers !== 'object') return {};
  try {
    const serialized = JSON.stringify(answers);
    const parsed = serialized ? JSON.parse(serialized) : {};
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function roundNumericScore(val: unknown): number {
  const num = Number(val);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(9999.99, Math.round(num * 100) / 100));
}

export function mapSessionToSupabaseRow(
  session: StudentExamSession,
  totalQuestions = 0
): SupabaseExamSessionRow {
  const nowIso = normalizeIsoTimestamp(session.updatedAt) || new Date().toISOString();
  const cleanAnswers = sanitizeAnswersJson(session.answers);
  const answeredCount = countAnsweredQuestions(cleanAnswers);
  const resolvedNis = (session.nis || session.studentId || '').trim();
  const resolvedExamId = (session.examId || 'ex-mat-2026').trim();
  const deterministicId =
    resolvedNis && resolvedExamId
      ? buildDeterministicSessionId(resolvedNis, resolvedExamId)
      : session.id || `sess-${Date.now()}`;

  const cleanAdminActionAt =
    typeof session.adminActionAt === 'number' && Number.isFinite(session.adminActionAt)
      ? Math.round(session.adminActionAt)
      : null;

  return {
    id: deterministicId,
    student_id: session.studentId || resolvedNis,
    student_nis: resolvedNis,
    nis: resolvedNis,
    student_name: session.studentName || '',
    class_id: session.classId || '',
    class_name: session.className || '',
    exam_id: resolvedExamId,
    exam_title: session.examTitle || '',
    status: session.isLocked ? 'locked' : session.status,
    answered_count: answeredCount,
    ...(totalQuestions > 0 ? { total_questions: Math.round(totalQuestions) } : {}),
    score: roundNumericScore(session.finalScore),
    score_pg: roundNumericScore(session.scorePg),
    score_essay: roundNumericScore(session.scoreEssay),
    final_score: roundNumericScore(session.finalScore),
    is_passed: Boolean(session.isPassed),
    violation_count: Math.max(0, Math.round(Number(session.violationsCount) || 0)),
    is_locked: Boolean(session.isLocked || session.status === 'locked'),
    lock_reason: session.lockReason || null,
    lock_count: Math.max(0, Math.round(Number(session.lockCount) || 0)),
    unlock_cooldown_until:
      typeof session.unlockCooldownUntil === 'number' &&
      Number.isFinite(session.unlockCooldownUntil) &&
      session.unlockCooldownUntil > 0
        ? Math.round(session.unlockCooldownUntil)
        : null,
    answers_json: cleanAnswers,
    time_remaining_seconds: Math.max(0, Math.round(Number(session.timeRemainingSeconds) || 0)),
    extra_time_minutes: Math.max(0, Math.round(Number(session.extraTimeMinutes) || 0)),
    current_question_index: Math.max(0, Math.round(Number(session.currentQuestionIndex) || 0)),
    device_info: session.deviceInfo || 'CBT Browser',
    device_session_id: session.deviceSessionId || null,
    is_online: Boolean(session.isOnline),
    last_heartbeat: Math.round(Number(session.lastHeartbeat) || Date.now()),
    admin_action_at: cleanAdminActionAt,
    started_at: normalizeIsoTimestamp(session.startedAt),
    submitted_at: normalizeIsoTimestamp(session.submittedAt),
    updated_at: nowIso,
  };
}

export function mapSupabaseRowToSession(row: SupabaseExamSessionRow): StudentExamSession {
  const isLockedFlag = Boolean(row.is_locked || (row.status || '').toLowerCase() === 'locked' || (row.status || '').toLowerCase() === 'terkunci');
  const validStatus = normalizeStatus(row.status, isLockedFlag);
  const computedFinalScore = Number(row.final_score ?? row.score ?? 0);
  const resolvedNis = (row.nis || row.student_nis || '').trim();

  return {
    id: row.id || buildDeterministicSessionId(resolvedNis, row.exam_id),
    studentId: row.student_id,
    studentName: row.student_name || '',
    nis: resolvedNis,
    classId: row.class_id || '',
    className: row.class_name || '',
    examId: row.exam_id || '',
    examTitle: row.exam_title || '',
    status: validStatus,
    startedAt: row.started_at || undefined,
    submittedAt: row.submitted_at || undefined,
    timeRemainingSeconds: Number(row.time_remaining_seconds ?? 5400),
    violationsCount: Number(row.violation_count ?? 0),
    isLocked: isLockedFlag,
    lockReason: row.lock_reason || undefined,
    lockCount: Math.max(0, Math.round(Number(row.lock_count ?? 0))),
    unlockCooldownUntil:
      typeof row.unlock_cooldown_until === 'number' &&
      Number.isFinite(row.unlock_cooldown_until) &&
      row.unlock_cooldown_until > 0
        ? Math.round(row.unlock_cooldown_until)
        : undefined,
    extraTimeMinutes: Number(row.extra_time_minutes ?? 0),
    deviceInfo: row.device_info || 'CBT Browser',
    deviceSessionId: row.device_session_id || undefined,
    currentQuestionIndex: Number(row.current_question_index ?? 0),
    isOnline: Boolean(row.is_online),
    lastHeartbeat: Number(row.last_heartbeat ?? Date.now()),
    adminActionAt: row.admin_action_at ?? undefined,
    updatedAt: row.updated_at || undefined,
    answers: parseAnswersJson(row.answers_json),
    answeredCount: typeof row.answered_count === 'number' ? row.answered_count : undefined,
    totalQuestions: typeof row.total_questions === 'number' ? row.total_questions : undefined,
    scorePg: Number(row.score_pg ?? 0),
    scoreEssay: Number(row.score_essay ?? 0),
    finalScore: computedFinalScore,
    isPassed: Boolean(row.is_passed),
  };
}

export function mapSupabaseViolationRow(row: SupabaseViolationLogRow): ExamViolationLog {
  return {
    id: row.id,
    studentId: row.student_id,
    studentName: row.student_name,
    nis: row.nis,
    examId: row.exam_id,
    examTitle: row.exam_title,
    type: (row.violation_type as ViolationType) || 'blur_loss',
    description: row.description,
    timestamp: row.created_at,
    actionTaken: row.action_taken,
  };
}

function formatSupabaseError(err: {
  message?: string;
  details?: string | null;
  hint?: string | null;
  code?: string;
}): string {
  const base = err.message || 'Unknown Supabase error';
  const extras = [err.code ? `Kode: ${err.code}` : '', err.details || '', err.hint || '']
    .filter(Boolean)
    .join(' | ');
  return extras ? `${base} (${extras})` : base;
}

function isNetworkFailureError(err: unknown): boolean {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return true;
  }
  const msg =
    typeof err === 'string'
      ? err
      : err && typeof err === 'object' && 'message' in err
        ? String((err as { message?: unknown }).message || '')
        : String(err || '');
  const lower = msg.toLowerCase();
  return (
    lower.includes('failed to fetch') ||
    lower.includes('networkerror') ||
    lower.includes('network request failed') ||
    lower.includes('load failed') ||
    lower.includes('fetch failed') ||
    lower.includes('err_internet_disconnected') ||
    lower.includes('err_network') ||
    lower.includes('err_connection') ||
    lower.includes('timeout') ||
    lower.includes('timed out') ||
    lower.includes('aborted') ||
    lower.includes('econnreset') ||
    lower.includes('socket hang up') ||
    lower.includes('offline')
  );
}

function waitMs(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Strips empty / redundant keys from answers_json so the submission packet
 * stays tiny and reliably completes even on 1-bar / Edge cellular connections.
 */
function buildCompactAnswersJson(
  answers?: StudentExamSession['answers']
): StudentExamSession['answers'] {
  if (!answers || typeof answers !== 'object') return {};
  const compact: StudentExamSession['answers'] = {};
  Object.entries(answers).forEach(([qId, entry]) => {
    if (!entry || typeof entry !== 'object') return;
    const ans = entry.answer;
    const hasValue =
      ans !== undefined &&
      ans !== null &&
      ans !== '' &&
      (!Array.isArray(ans) || ans.length > 0);
    if (!hasValue && !entry.isDoubtful) return;
    compact[qId] = {
      answer: typeof ans === 'string' ? ans : Array.isArray(ans) ? ans : '',
      isDoubtful: Boolean(entry.isDoubtful),
      updatedAt: Number(entry.updatedAt || Date.now()),
    };
  });
  return compact;
}

/**
 * Builds a minimal, essential-columns-only payload for `cbt_exam_sessions` final submission.
 * Excludes question bank objects, verbose device strings, and redundant non-essential fields.
 */
function buildCompactSubmitRow(
  session: StudentExamSession,
  totalQuestions = 0
): Partial<SupabaseExamSessionRow> {
  const nowIso = normalizeIsoTimestamp(session.updatedAt) || new Date().toISOString();
  const submittedIso = normalizeIsoTimestamp(session.submittedAt) || nowIso;
  const compactAnswers = buildCompactAnswersJson(session.answers);
  const answeredCount = countAnsweredQuestions(compactAnswers);
  const resolvedNis = (session.nis || session.studentId || '').trim();
  const resolvedExamId = (session.examId || 'ex-mat-2026').trim();
  const deterministicId = buildDeterministicSessionId(resolvedNis, resolvedExamId);

  return {
    id: deterministicId,
    student_id: session.studentId || resolvedNis,
    student_nis: resolvedNis,
    nis: resolvedNis,
    student_name: (session.studentName || '').trim(),
    class_id: session.classId || '',
    class_name: session.className || '',
    exam_id: resolvedExamId,
    exam_title: (session.examTitle || '').slice(0, 120),
    status: session.status,
    answered_count: answeredCount,
    ...(totalQuestions > 0 ? { total_questions: Math.round(totalQuestions) } : {}),
    score: roundNumericScore(session.finalScore),
    score_pg: roundNumericScore(session.scorePg),
    score_essay: roundNumericScore(session.scoreEssay),
    final_score: roundNumericScore(session.finalScore),
    is_passed: Boolean(session.isPassed),
    violation_count: Math.max(0, Math.round(Number(session.violationsCount) || 0)),
    is_locked: false,
    lock_reason: null,
    lock_count: Math.max(0, Math.round(Number(session.lockCount) || 0)),
    unlock_cooldown_until: null,
    answers_json: compactAnswers,
    time_remaining_seconds: 0,
    is_online: false,
    device_session_id: null,
    last_heartbeat: Math.round(Number(session.lastHeartbeat) || Date.now()),
    started_at: normalizeIsoTimestamp(session.startedAt),
    submitted_at: submittedIso,
    updated_at: nowIso,
  };
}

/**
 * Lightweight upsert for final exam submission:
 * Omits `.select()` response echo so slow Edge connections don't re-download all essay answers.
 */
async function upsertCompactSubmitRow(row: Partial<SupabaseExamSessionRow>) {
  if (!supabase) {
    return {
      error: {
        message:
          supabaseConfigError ||
          'Supabase client belum terkonfigurasi. Periksa VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY.',
      },
    };
  }

  let res = await supabase
    .from('cbt_exam_sessions')
    .upsert(row, { onConflict: 'nis,exam_id' });

  if (
    res.error &&
    (res.error.code === '42P10' ||
      res.error.code === '23505' ||
      res.error.message?.includes('ON CONFLICT'))
  ) {
    res = await supabase
      .from('cbt_exam_sessions')
      .upsert(row, { onConflict: 'id' });
  }

  return res;
}

/**
 * Shared upsert helper: prioritizes composite (nis, exam_id) conflict key,
 * and falls back to primary key `id` if DB constraint hasn't been created yet.
 */
async function upsertSessionRow(row: SupabaseExamSessionRow) {
  if (!supabase) {
    return {
      data: null,
      error: {
        message:
          supabaseConfigError ||
          'Supabase client belum terkonfigurasi. Periksa VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY.',
      },
    };
  }

  let res = await supabase
    .from('cbt_exam_sessions')
    .upsert(row, { onConflict: 'nis,exam_id' })
    .select()
    .maybeSingle();

  if (
    res.error &&
    (res.error.code === '42P10' ||
      res.error.code === '23505' ||
      res.error.message?.includes('ON CONFLICT'))
  ) {
    res = await supabase
      .from('cbt_exam_sessions')
      .upsert(row, { onConflict: 'id' })
      .select()
      .maybeSingle();
  }

  return res;
}

/**
 * ============================================================================
 * OFFLINE SUBMISSION QUEUE (`cbt_pending_submissions` in localStorage)
 * Safely stores completed exams when student loses cellular/Wi-Fi signal,
 * and flushes automatically on `window` online event or 5s background check.
 * ============================================================================
 */
export function getPendingSubmissions(): PendingSubmissionRecord[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const raw = window.localStorage.getItem(PENDING_SUBMISSIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is PendingSubmissionRecord =>
        Boolean(item && typeof item === 'object' && item.id && item.nis && item.examId && item.payload)
    );
  } catch {
    return [];
  }
}

function savePendingSubmissionsList(list: PendingSubmissionRecord[]): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    if (list.length === 0) {
      window.localStorage.removeItem(PENDING_SUBMISSIONS_STORAGE_KEY);
    } else {
      window.localStorage.setItem(PENDING_SUBMISSIONS_STORAGE_KEY, JSON.stringify(list));
    }
  } catch (err) {
    console.warn('[CBT Queue] Failed writing cbt_pending_submissions:', err);
  }
}

export function getPendingSubmissionForExam(
  nis: string,
  examId: string
): PendingSubmissionRecord | null {
  const cleanNis = (nis || '').trim();
  const cleanExamId = (examId || '').trim();
  if (!cleanNis || !cleanExamId) return null;
  const detId = buildDeterministicSessionId(cleanNis, cleanExamId);
  return (
    getPendingSubmissions().find(
      item => item.id === detId || (item.nis.trim() === cleanNis && item.examId.trim() === cleanExamId)
    ) || null
  );
}

export function enqueuePendingSubmission(
  session: StudentExamSession,
  payload: Partial<SupabaseExamSessionRow>,
  totalQuestions = 0,
  lastError?: string
): PendingSubmissionRecord {
  const cleanNis = (session.nis || session.studentId || '').trim();
  const cleanExamId = (session.examId || 'ex-mat-2026').trim();
  const detId = buildDeterministicSessionId(cleanNis, cleanExamId);
  const existing = getPendingSubmissions();
  const prev = existing.find(item => item.id === detId);
  const record: PendingSubmissionRecord = {
    id: detId,
    nis: cleanNis,
    examId: cleanExamId,
    totalQuestions,
    session,
    payload,
    queuedAt: prev?.queuedAt || Date.now(),
    attempts: (prev?.attempts || 0) + 1,
    lastError,
  };
  const next = [...existing.filter(item => item.id !== detId), record];
  savePendingSubmissionsList(next);
  return record;
}

export function removePendingSubmission(nis: string, examId: string): void {
  const cleanNis = (nis || '').trim();
  const cleanExamId = (examId || '').trim();
  const detId = buildDeterministicSessionId(cleanNis, cleanExamId);
  const existing = getPendingSubmissions();
  const next = existing.filter(
    item => item.id !== detId && !(item.nis.trim() === cleanNis && item.examId.trim() === cleanExamId)
  );
  if (next.length !== existing.length) {
    savePendingSubmissionsList(next);
  }
}

let isFlushingPendingSubmissions = false;

export async function flushPendingSubmissionsToSupabase(options?: {
  filterNis?: string;
  filterExamId?: string;
}): Promise<{
  syncedSessions: StudentExamSession[];
  remainingCount: number;
  errors: string[];
}> {
  const allQueued = getPendingSubmissions();
  if (allQueued.length === 0) {
    return { syncedSessions: [], remainingCount: 0, errors: [] };
  }
  if (!isSupabaseConfigured || !supabase) {
    return { syncedSessions: [], remainingCount: allQueued.length, errors: [] };
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { syncedSessions: [], remainingCount: allQueued.length, errors: [] };
  }
  if (isFlushingPendingSubmissions) {
    return { syncedSessions: [], remainingCount: allQueued.length, errors: [] };
  }

  isFlushingPendingSubmissions = true;
  const syncedSessions: StudentExamSession[] = [];
  const errors: string[] = [];

  try {
    const targets = allQueued.filter(item => {
      if (options?.filterNis && item.nis.trim() !== options.filterNis.trim()) return false;
      if (options?.filterExamId && item.examId.trim() !== options.filterExamId.trim()) return false;
      return true;
    });

    for (const item of targets) {
      try {
        const freshPayload: Partial<SupabaseExamSessionRow> = {
          ...item.payload,
          updated_at: new Date().toISOString(),
        };
        const { error } = await upsertCompactSubmitRow(freshPayload);
        if (!error) {
          removePendingSubmission(item.nis, item.examId);
          syncedSessions.push(item.session);
        } else {
          const msg = formatSupabaseError(error);
          errors.push(msg);
          if (!isNetworkFailureError(error)) {
            console.warn('[CBT Queue] Non-network error flushing queued submission:', msg);
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(msg);
      }
    }
  } finally {
    isFlushingPendingSubmissions = false;
  }

  return {
    syncedSessions,
    remainingCount: getPendingSubmissions().length,
    errors,
  };
}

/**
 * 1. SUBMIT EXAM (Siswa -> Supabase -> Operator/Guru)
 * - Compact payload (only essential columns & non-empty answers) for 1-bar / Edge networks
 * - Automatic retry up to 4 attempts with exponential backoff (1s, 2s, 4s) on transient network errors
 * - Automatic offline queue fallback (`cbt_pending_submissions`) if all 4 retries fail
 */
export async function submitExamToSupabase(params: {
  session: StudentExamSession;
  questions: Question[];
  exam: ExamSchedule;
  forcedStatus?: 'completed' | 'force_submitted';
  onRetryStatus?: (attempt: number, maxAttempts: number, statusMessage: string) => void;
}): Promise<SubmitExamResult> {
  const { session, questions, exam, forcedStatus = 'completed', onRetryStatus } = params;
  const compactAnswers = buildCompactAnswersJson(session.answers || {});
  const { scorePg, finalScore } = calculateProvisionalScore(
    questions,
    compactAnswers,
    session.scoreEssay || 0
  );
  const nowIso = new Date().toISOString();
  const kkm = exam.kkm || 75;

  const completedSession: StudentExamSession = {
    ...session,
    id: buildDeterministicSessionId(session.nis, exam.id),
    examId: exam.id,
    examTitle: exam.title,
    status: forcedStatus,
    answers: compactAnswers,
    answeredCount: countAnsweredQuestions(compactAnswers),
    totalQuestions: questions.length,
    submittedAt: nowIso,
    updatedAt: nowIso,
    timeRemainingSeconds: 0,
    scorePg,
    scoreEssay: session.scoreEssay || 0,
    finalScore,
    isPassed: finalScore >= kkm,
    isLocked: false,
    lockReason: undefined,
    unlockCooldownUntil: undefined,
    isOnline: false,
    deviceSessionId: undefined,
    lastHeartbeat: Date.now(),
  };

  if (!isSupabaseConfigured || !supabase) {
    const errMsg =
      supabaseConfigError ||
      'Konfigurasi Supabase belum aktif (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diatur).';
    console.error('[Supabase] submitExam blocked — client not configured:', errMsg);
    return {
      success: false,
      session: completedSession,
      source: 'supabase',
      error: errMsg,
      isNetworkError: false,
      queuedOffline: false,
      attemptsUsed: 0,
    };
  }

  const compactRow = buildCompactSubmitRow(completedSession, questions.length);
  const MAX_ATTEMPTS = 4;
  const RETRY_DELAYS_MS = [1000, 2000, 4000];
  let lastRawError = '';
  let lastWasNetworkError = false;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    onRetryStatus?.(
      attempt,
      MAX_ATTEMPTS,
      attempt === 1
        ? 'Mengirim lembar jawaban ke server... (Percobaan 1/4)'
        : `Menghubungkan ke server... (Percobaan ${attempt}/${MAX_ATTEMPTS})`
    );

    try {
      const { error } = await upsertCompactSubmitRow({
        ...compactRow,
        updated_at: new Date().toISOString(),
      });

      if (!error) {
        removePendingSubmission(completedSession.nis, completedSession.examId);
        return {
          success: true,
          session: completedSession,
          source: 'supabase',
          attemptsUsed: attempt,
        };
      }

      lastWasNetworkError = isNetworkFailureError(error);
      lastRawError = formatSupabaseError(error);

      if (!lastWasNetworkError) {
        // Real database/SQL/RLS error: do not mask or retry blindly; surface exact message
        console.error('[Supabase] submitExam database error:', error);
        return {
          success: false,
          session: completedSession,
          source: 'supabase',
          error: lastRawError,
          isNetworkError: false,
          queuedOffline: false,
          attemptsUsed: attempt,
        };
      }
    } catch (err) {
      lastWasNetworkError = isNetworkFailureError(err);
      lastRawError = err instanceof Error ? err.message : String(err);

      if (!lastWasNetworkError) {
        console.error('[Supabase] submitExam unexpected error:', err);
        return {
          success: false,
          session: completedSession,
          source: 'supabase',
          error: lastRawError,
          isNetworkError: false,
          queuedOffline: false,
          attemptsUsed: attempt,
        };
      }
    }

    // Transient network error -> wait exponential backoff (1s, 2s, 4s) before next retry
    if (attempt < MAX_ATTEMPTS) {
      const delay = RETRY_DELAYS_MS[attempt - 1] ?? 4000;
      onRetryStatus?.(
        attempt + 1,
        MAX_ATTEMPTS,
        `Sinyal terganggu, mencoba ulang dalam ${Math.round(delay / 1000)} detik... (Percobaan ${attempt + 1}/${MAX_ATTEMPTS})`
      );
      await waitMs(delay);
    }
  }

  // All 4 attempts failed due to network interruption -> save safely to offline queue (`cbt_pending_submissions`)
  enqueuePendingSubmission(completedSession, compactRow, questions.length, lastRawError);
  console.warn('[Supabase] submitExam queued offline after 4 network attempts:', lastRawError);

  return {
    success: false,
    session: completedSession,
    source: 'supabase',
    error: FRIENDLY_OFFLINE_SUBMIT_MESSAGE,
    isNetworkError: true,
    queuedOffline: true,
    attemptsUsed: MAX_ATTEMPTS,
  };
}

/**
 * 2. RECORD ANTI-CHEAT VIOLATION & AUTO-LOCK AT 3/3
 * Increments violation_count + 1, writes audit row to cbt_violation_logs,
 * and sets is_locked=true & status='locked' when violation_count >= maxViolations.
 */
export async function recordViolationToSupabase(params: {
  session: StudentExamSession;
  violationType: ViolationType;
  details: string;
  maxViolations?: number;
  timeRemainingSeconds?: number;
  totalQuestions?: number;
}): Promise<SessionActionResult> {
  const {
    session,
    violationType,
    details,
    maxViolations = 3,
    timeRemainingSeconds,
    totalQuestions = 0,
  } = params;
  const nextCount = (session.violationsCount || 0) + 1;
  const isNowLocked = nextCount >= maxViolations;
  const wasAlreadyLocked = Boolean(session.isLocked || session.status === 'locked');
  const nextLockCount = isNowLocked
    ? wasAlreadyLocked
      ? Math.max(1, session.lockCount || 1)
      : (session.lockCount || 0) + 1
    : Math.max(0, session.lockCount || 0);
  const nowIso = new Date().toISOString();

  const updatedSession: StudentExamSession = {
    ...session,
    id: session.nis && session.examId ? buildDeterministicSessionId(session.nis, session.examId) : session.id,
    violationsCount: nextCount,
    isLocked: isNowLocked,
    lockCount: nextLockCount,
    unlockCooldownUntil: isNowLocked ? undefined : session.unlockCooldownUntil,
    status: isNowLocked ? 'locked' : 'in_progress',
    lockReason: isNowLocked
      ? `Pemblokiran ke-${nextLockCount}: Mencapai batas ${maxViolations}x pelanggaran (${details})`
      : `Pelanggaran ${nextCount}/${maxViolations}: ${details}`,
    timeRemainingSeconds:
      typeof timeRemainingSeconds === 'number' ? timeRemainingSeconds : session.timeRemainingSeconds,
    isOnline: true,
    lastHeartbeat: Date.now(),
    updatedAt: nowIso,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const row = mapSessionToSupabaseRow(updatedSession, totalQuestions);
      const { data, error } = await upsertSessionRow(row);

      const logRow: SupabaseViolationLogRow = {
        id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        session_id: row.id,
        student_id: session.studentId,
        student_name: session.studentName,
        nis: session.nis,
        class_name: session.className,
        exam_id: session.examId,
        exam_title: session.examTitle,
        violation_type: violationType,
        description: details,
        violation_number: nextCount,
        action_taken: isNowLocked ? `AUTO_LOCK_${nextCount}/${maxViolations}` : `WARNING_${nextCount}/${maxViolations}`,
        created_at: nowIso,
      };

      const { error: logErr } = await supabase.from('cbt_violation_logs').insert(logRow);
      if (logErr) {
        console.warn('[Supabase] Violation log insert warning:', formatSupabaseError(logErr));
      }

      if (error) {
        const exactError = formatSupabaseError(error);
        console.error('[Supabase] Violation session update failed:', exactError);
        return { success: false, session: updatedSession, error: exactError };
      }

      const confirmed = data ? mapSupabaseRowToSession(data as SupabaseExamSessionRow) : updatedSession;
      syncSingleSession(confirmed).catch(() => false);

      if (logErr) {
        return {
          success: false,
          session: confirmed,
          error: `Sesi tersimpan, namun log pelanggaran gagal disimpan: ${formatSupabaseError(logErr)}`,
        };
      }

      return { success: true, session: confirmed };
    } catch (err) {
      const exactError = err instanceof Error ? err.message : String(err);
      console.error('[Supabase] Violation network error:', exactError);
      return { success: false, session: updatedSession, error: exactError };
    }
  }

  await syncSingleSession(updatedSession).catch(() => false);
  return { success: true, session: updatedSession };
}

/**
 * 3. UNLOCK STUDENT SESSION BY OPERATOR / GURU
 * Sets is_locked=false, status='in_progress', resets violation_count=0,
 * and stamps admin_action_at so the student's locked screen unlocks immediately.
 */
export async function unlockStudentSessionInSupabase(
  session: StudentExamSession,
  options: { resetViolations?: boolean } = { resetViolations: true }
): Promise<SessionActionResult> {
  const { resetViolations = true } = options;
  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();

  // Progressive Cooldown Penalty: 1st lock = 1m, 2nd = 3m, 3rd = 5m, 4th = 7m...
  const cooldown = calculateUnlockCooldown(session.lockCount || 1);
  const unlockCooldownUntil = nowMs + cooldown.penaltySeconds * 1000;

  const unlockedSession: StudentExamSession = {
    ...session,
    id: session.nis && session.examId ? buildDeterministicSessionId(session.nis, session.examId) : session.id,
    isLocked: false,
    lockReason: undefined,
    lockCount: cooldown.lockCount,
    unlockCooldownUntil,
    status: 'in_progress',
    violationsCount: resetViolations ? 0 : session.violationsCount,
    isOnline: true,
    lastHeartbeat: nowMs,
    adminActionAt: nowMs,
    updatedAt: nowIso,
  };

  if (isSupabaseConfigured && supabase) {
    const row = mapSessionToSupabaseRow(unlockedSession);
    const { data, error } = await upsertSessionRow(row);

    // Also update any legacy rows with matching (nis, exam_id) in case old ID existed
    if (session.nis && session.examId) {
      await supabase
        .from('cbt_exam_sessions')
        .update({
          is_locked: false,
          lock_reason: null,
          lock_count: cooldown.lockCount,
          unlock_cooldown_until: unlockCooldownUntil,
          status: 'in_progress',
          violation_count: resetViolations ? 0 : session.violationsCount,
          admin_action_at: nowMs,
          updated_at: nowIso,
        })
        .eq('nis', session.nis)
        .eq('exam_id', session.examId);
    }

    await supabase
      .from('cbt_violation_logs')
      .insert({
        id: `unlock-${nowMs}-${Math.random().toString(36).slice(2, 7)}`,
        session_id: row.id,
        student_id: session.studentId,
        student_name: session.studentName,
        nis: session.nis,
        class_name: session.className,
        exam_id: session.examId,
        exam_title: session.examTitle,
        violation_type: 'operator_unlock',
        description: resetViolations
          ? `Operator membuka kunci ujian (pemblokiran ke-${cooldown.lockCount}), mereset pelanggaran ke 0/3, dan menerapkan sanksi masa tunggu ${cooldown.penaltyMinutes} menit`
          : `Operator membuka kunci ujian siswa (pemblokiran ke-${cooldown.lockCount}) dengan masa tunggu ${cooldown.penaltyMinutes} menit`,
        violation_number: 0,
        action_taken: `OPERATOR_UNLOCK_COOLDOWN_${cooldown.penaltyMinutes}M`,
        created_at: nowIso,
      })
      .then(() => {}, () => {});

    if (error) {
      console.error('[Supabase] Unlock session failed:', error);
      return { success: false, session: unlockedSession, error: formatSupabaseError(error) };
    }

    const confirmed = data ? mapSupabaseRowToSession(data as SupabaseExamSessionRow) : unlockedSession;
    syncSingleSession(confirmed).catch(() => false);
    return { success: true, session: confirmed };
  }

  await syncSingleSession(unlockedSession).catch(() => false);
  return { success: true, session: unlockedSession };
}

/**
 * 4. SYNC PROGRESS / LOGIN / START / ANSWERS / HEARTBEAT TO SUPABASE
 */
export async function syncSessionProgressWithDetails(
  session: StudentExamSession,
  totalQuestions = 0
): Promise<SyncSessionResult> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      skipped: true,
      error: supabaseConfigError || 'Supabase belum dikonfigurasi.',
    };
  }
  try {
    const row = mapSessionToSupabaseRow(
      {
        ...session,
        updatedAt: new Date().toISOString(),
      },
      totalQuestions
    );
    const { data, error } = await upsertSessionRow(row);
    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.warn('[Supabase] Session progress upsert error:', exactMessage);
      return { success: false, error: exactMessage };
    }
    return {
      success: true,
      session: data ? mapSupabaseRowToSession(data as SupabaseExamSessionRow) : session,
    };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] Network error syncing session:', exactMessage);
    return { success: false, error: exactMessage };
  }
}

export async function syncSessionProgressToSupabase(
  session: StudentExamSession,
  totalQuestions = 0
): Promise<boolean> {
  const res = await syncSessionProgressWithDetails(session, totalQuestions);
  return res.success || Boolean(res.skipped);
}

export async function syncMultipleSessionsWithDetails(
  sessions: StudentExamSession[]
): Promise<SyncSessionResult> {
  if (!isSupabaseConfigured || !supabase || sessions.length === 0) {
    return {
      success: false,
      skipped: true,
      error: sessions.length === 0 ? undefined : (supabaseConfigError || 'Supabase belum dikonfigurasi.'),
    };
  }
  try {
    const nowIso = new Date().toISOString();
    const rows = sessions.map(s => mapSessionToSupabaseRow({ ...s, updatedAt: nowIso }));
    let { error } = await supabase
      .from('cbt_exam_sessions')
      .upsert(rows, { onConflict: 'nis,exam_id' });
    if (error && (error.code === '42P10' || error.message?.includes('ON CONFLICT'))) {
      const retry = await supabase.from('cbt_exam_sessions').upsert(rows, { onConflict: 'id' });
      error = retry.error;
    }
    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.warn('[Supabase] Batch sessions upsert error:', exactMessage);
      return { success: false, error: exactMessage };
    }
    return { success: true };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] Batch sessions network error:', exactMessage);
    return { success: false, error: exactMessage };
  }
}

export async function syncMultipleSessionsToSupabase(sessions: StudentExamSession[]): Promise<boolean> {
  const res = await syncMultipleSessionsWithDetails(sessions);
  return res.success || Boolean(res.skipped);
}

/**
 * 5. DIRECT QUERIES FOR STUDENT & OPERATOR (SUPABASE SINGLE SOURCE OF TRUTH)
 */
export interface FetchStudentSessionStatusResult {
  found: boolean;
  session: StudentExamSession | null;
  error?: string;
}

export async function fetchStudentSessionStatusFromSupabase(
  nis: string,
  examId: string
): Promise<FetchStudentSessionStatusResult> {
  const cleanNis = (nis || '').trim();
  const cleanExamId = (examId || '').trim();
  if (!isSupabaseConfigured || !supabase || !cleanNis) {
    return {
      found: false,
      session: null,
      error: supabaseConfigError || 'Supabase belum dikonfigurasi.',
    };
  }

  try {
    const { data, error } = await supabase
      .from('cbt_exam_sessions')
      .select('*')
      .or(`nis.eq.${cleanNis},student_nis.eq.${cleanNis}`)
      .eq('exam_id', cleanExamId)
      .order('updated_at', { ascending: false })
      .limit(1);

    if (error) {
      console.warn('[Supabase] fetchStudentSessionStatus failed:', error.message);
      return { found: false, session: null, error: error.message };
    }

    if (data && data.length > 0) {
      return {
        found: true,
        session: mapSupabaseRowToSession(data[0] as SupabaseExamSessionRow),
      };
    }

    // Fallback query by deterministic composite ID (current `${nis}_${examId}` & legacy `sess-${nis}-${examId}`)
    const detId = buildDeterministicSessionId(cleanNis, cleanExamId);
    const legacyDetId = `sess-${cleanNis}-${cleanExamId}`;
    const byId = await supabase
      .from('cbt_exam_sessions')
      .select('*')
      .in('id', [detId, legacyDetId])
      .order('updated_at', { ascending: false })
      .limit(1);

    if (byId.error) {
      return { found: false, session: null, error: byId.error.message };
    }

    if (byId.data && byId.data.length > 0) {
      return {
        found: true,
        session: mapSupabaseRowToSession(byId.data[0] as SupabaseExamSessionRow),
      };
    }

    return { found: false, session: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] fetchStudentSessionStatus network error:', msg);
    return { found: false, session: null, error: msg };
  }
}

export async function fetchStudentSessionFromSupabase(
  nis: string,
  examId: string
): Promise<StudentExamSession | null> {
  const res = await fetchStudentSessionStatusFromSupabase(nis, examId);
  return res.session;
}

/**
 * Fetches ALL exam sessions belonging to a specific student NIS across every `exam_id`.
 * Enables the student's Exam Schedule List to display per-exam status
 * (`Selesai Dikerjakan`, `Lanjutkan Ujian`, `Terkunci`, `Tersedia / Mulai Ujian`) accurately.
 */
export async function fetchAllStudentSessionsFromSupabase(
  nis: string
): Promise<FetchExamResultsWithStatus> {
  const cleanNis = (nis || '').trim();
  if (!isSupabaseConfigured || !supabase || !cleanNis) {
    return {
      sessions: null,
      error: supabaseConfigError || 'Supabase belum dikonfigurasi.',
    };
  }
  try {
    const { data, error } = await supabase
      .from('cbt_exam_sessions')
      .select('*')
      .or(`nis.eq.${cleanNis},student_nis.eq.${cleanNis}`)
      .order('updated_at', { ascending: false });

    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.warn('[Supabase] fetchAllStudentSessions failed:', exactMessage);
      return { sessions: null, error: exactMessage };
    }
    return {
      sessions: (data || []).map(row => mapSupabaseRowToSession(row as SupabaseExamSessionRow)),
    };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] fetchAllStudentSessions network error:', exactMessage);
    return { sessions: null, error: exactMessage };
  }
}

export async function fetchExamResultsWithStatusFromSupabase(): Promise<FetchExamResultsWithStatus> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      sessions: null,
      error: supabaseConfigError || 'Supabase belum dikonfigurasi.',
    };
  }
  try {
    const { data, error } = await supabase
      .from('cbt_exam_sessions')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.warn('[Supabase] fetchExamResults failed:', exactMessage);
      return { sessions: null, error: exactMessage };
    }
    return {
      sessions: (data || []).map(row => mapSupabaseRowToSession(row as SupabaseExamSessionRow)),
    };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] fetchExamResults network error:', exactMessage);
    return { sessions: null, error: exactMessage };
  }
}

export async function fetchExamResultsFromSupabase(): Promise<StudentExamSession[] | null> {
  const res = await fetchExamResultsWithStatusFromSupabase();
  return res.sessions;
}

export async function fetchViolationLogsWithStatusFromSupabase(
  limitCount = 50
): Promise<FetchViolationLogsWithStatus> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      logs: null,
      error: supabaseConfigError || 'Supabase belum dikonfigurasi.',
    };
  }
  try {
    const { data, error } = await supabase
      .from('cbt_violation_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limitCount);

    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.warn('[Supabase] fetchViolationLogs failed:', exactMessage);
      return { logs: null, error: exactMessage };
    }
    return {
      logs: (data || []).map(row => mapSupabaseViolationRow(row as SupabaseViolationLogRow)),
    };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] fetchViolationLogs network error:', exactMessage);
    return { logs: null, error: exactMessage };
  }
}

export async function fetchViolationLogsFromSupabase(limitCount = 50): Promise<ExamViolationLog[] | null> {
  const res = await fetchViolationLogsWithStatusFromSupabase(limitCount);
  return res.logs;
}

/**
 * Merges student answers from Supabase and localStorage backup per question ID,
 * keeping the union of all answered questions and selecting the newer `updatedAt`
 * entry when both contain the same question.
 */
export function mergeExamAnswers(
  remoteAnswers?: StudentExamSession['answers'],
  localAnswers?: StudentExamSession['answers']
): StudentExamSession['answers'] {
  const merged: StudentExamSession['answers'] = { ...(remoteAnswers || {}) };
  if (!localAnswers || typeof localAnswers !== 'object') {
    return merged;
  }

  Object.entries(localAnswers).forEach(([qId, localAns]) => {
    if (!localAns) return;
    const remoteAns = merged[qId];
    if (!remoteAns) {
      merged[qId] = localAns;
      return;
    }
    const localTs = Number(localAns.updatedAt || 0);
    const remoteTs = Number(remoteAns.updatedAt || 0);
    const localHasValue =
      localAns.answer !== '' &&
      localAns.answer !== undefined &&
      (!Array.isArray(localAns.answer) || localAns.answer.length > 0);
    const remoteHasValue =
      remoteAns.answer !== '' &&
      remoteAns.answer !== undefined &&
      (!Array.isArray(remoteAns.answer) || remoteAns.answer.length > 0);

    if (localTs > remoteTs || (localHasValue && !remoteHasValue)) {
      merged[qId] = localAns;
    }
  });

  return merged;
}

export interface MergedActiveStudentSessionResult {
  session: StudentExamSession;
  unlockedOrReset: boolean;
  isRemoteReset: boolean;
  isRemoteDone: boolean;
  needsRemoteBackfill: boolean;
}

/**
 * Authoritatively reconciles an active student's session between Supabase (SSoT)
 * and localStorage backup (especially after browser refresh):
 * - Operator actions (Reset, Buka Kunci, Paksa Kumpul, Tambah Waktu) ALWAYS win.
 * - Completed / submitted status in Supabase ALWAYS wins.
 * - During active/locked exams without Operator unlock, preserves all answers
 *   (per-question union), current_question_index, tighter remaining timer,
 *   and max(violation_count) so refresh NEVER resets violations or drops answers.
 */
export function mergeActiveStudentSessionWithRemote(params: {
  local: StudentExamSession;
  remote: StudentExamSession;
  defaultDurationSec: number;
}): MergedActiveStudentSessionResult {
  const { local, remote, defaultDurationSec } = params;

  const isLocalLocked = Boolean(local.isLocked || local.status === 'locked');
  const isRemoteUnlocked = !remote.isLocked && remote.status !== 'locked';
  const isRemoteReset = remote.status === 'not_started' && !remote.isLocked;
  const isRemoteDone = isSessionCompleted(remote.status);
  const isAdminIntervention = Boolean(
    remote.adminActionAt && remote.adminActionAt !== local.adminActionAt
  );

  const unlockedOrReset =
    (isLocalLocked && isRemoteUnlocked) ||
    (local.status !== 'not_started' && isRemoteReset) ||
    (local.violationsCount > 0 && remote.violationsCount === 0 && isRemoteUnlocked && Boolean(remote.adminActionAt)) ||
    isAdminIntervention;

  // 1. Operator reset exam -> clean state (including lock_count & unlock_cooldown_until)
  if (isRemoteReset) {
    return {
      session: {
        ...remote,
        isLocked: false,
        lockReason: undefined,
        lockCount: 0,
        unlockCooldownUntil: undefined,
        violationsCount: 0,
        answers: remote.answers || {},
        currentQuestionIndex: 0,
        timeRemainingSeconds: remote.timeRemainingSeconds || defaultDurationSec,
      },
      unlockedOrReset: true,
      isRemoteReset: true,
      isRemoteDone: false,
      needsRemoteBackfill: false,
    };
  }

  // 2. Exam already completed / force-submitted in Supabase -> authoritative done state
  if (isRemoteDone) {
    return {
      session: remote,
      unlockedOrReset,
      isRemoteReset: false,
      isRemoteDone: true,
      needsRemoteBackfill: false,
    };
  }

  const mergedAnswers = mergeExamAnswers(remote.answers, local.answers);
  const remoteUpdatedMs = remote.updatedAt ? Date.parse(remote.updatedAt) : remote.lastHeartbeat || 0;
  const localUpdatedMs = local.updatedAt ? Date.parse(local.updatedAt) : local.lastHeartbeat || 0;
  const localIsNewer = localUpdatedMs > remoteUpdatedMs;

  const mergedQuestionIndex = localIsNewer
    ? Math.max(0, local.currentQuestionIndex ?? remote.currentQuestionIndex ?? 0)
    : Math.max(0, remote.currentQuestionIndex ?? local.currentQuestionIndex ?? 0);

  const operatorAddedTime = (remote.extraTimeMinutes || 0) > (local.extraTimeMinutes || 0);
  let mergedTimeRemaining: number;
  if (operatorAddedTime) {
    mergedTimeRemaining = remote.timeRemainingSeconds || defaultDurationSec;
  } else if (remote.timeRemainingSeconds > 0 && local.timeRemainingSeconds > 0) {
    mergedTimeRemaining = Math.min(remote.timeRemainingSeconds, local.timeRemainingSeconds);
  } else {
    mergedTimeRemaining = remote.timeRemainingSeconds || local.timeRemainingSeconds || defaultDurationSec;
  }

  // 3. Operator explicitly unlocked / cleared violations -> Supabase lock, violation & cooldown state wins
  if (unlockedOrReset) {
    const unlockedSession: StudentExamSession = {
      ...remote,
      isLocked: Boolean(remote.isLocked),
      lockReason: remote.isLocked ? remote.lockReason : undefined,
      lockCount: Math.max(remote.lockCount || 0, local.lockCount || 0),
      unlockCooldownUntil: remote.isLocked ? undefined : (remote.unlockCooldownUntil ?? undefined),
      violationsCount: remote.violationsCount || 0,
      status: remote.isLocked ? 'locked' : remote.status,
      answers: mergedAnswers,
      currentQuestionIndex: mergedQuestionIndex,
      timeRemainingSeconds: mergedTimeRemaining,
    };
    const needsBackfill = countAnsweredQuestions(mergedAnswers) > countAnsweredQuestions(remote.answers);
    return {
      session: unlockedSession,
      unlockedOrReset: true,
      isRemoteReset: false,
      isRemoteDone: false,
      needsRemoteBackfill: needsBackfill,
    };
  }

  // 4. Normal refresh / active session reconciliation -> never reset violations, lock_count, cooldown, or answers
  const mergedViolations = Math.max(remote.violationsCount || 0, local.violationsCount || 0);
  const mergedLocked = Boolean(
    remote.isLocked || remote.status === 'locked' || local.isLocked || local.status === 'locked'
  );
  const mergedLockCount = Math.max(remote.lockCount || 0, local.lockCount || 0);
  const mergedCooldownUntil = mergedLocked
    ? undefined
    : Math.max(remote.unlockCooldownUntil || 0, local.unlockCooldownUntil || 0) || undefined;
  const mergedStatus: StudentExamStatus = mergedLocked
    ? 'locked'
    : remote.status === 'in_progress' || local.status === 'in_progress'
      ? 'in_progress'
      : remote.status;

  const mergedSession: StudentExamSession = {
    ...remote,
    status: mergedStatus,
    isLocked: mergedLocked,
    lockReason: mergedLocked ? (remote.lockReason || local.lockReason) : undefined,
    lockCount: mergedLockCount,
    unlockCooldownUntil: mergedCooldownUntil,
    violationsCount: mergedViolations,
    answers: mergedAnswers,
    currentQuestionIndex: mergedQuestionIndex,
    timeRemainingSeconds: mergedTimeRemaining,
    scorePg: localIsNewer && local.scorePg > remote.scorePg ? local.scorePg : remote.scorePg,
    finalScore: localIsNewer && local.finalScore > remote.finalScore ? local.finalScore : remote.finalScore,
    isPassed: localIsNewer && local.finalScore > remote.finalScore ? local.isPassed : remote.isPassed,
    startedAt: remote.startedAt || local.startedAt,
    isOnline: !mergedLocked,
    lastHeartbeat: Math.max(remote.lastHeartbeat || 0, local.lastHeartbeat || 0, Date.now()),
  };

  const needsRemoteBackfill =
    countAnsweredQuestions(mergedAnswers) > countAnsweredQuestions(remote.answers) ||
    mergedViolations > (remote.violationsCount || 0) ||
    mergedLockCount > (remote.lockCount || 0) ||
    mergedLocked !== Boolean(remote.isLocked) ||
    mergedStatus !== remote.status ||
    mergedQuestionIndex !== (remote.currentQuestionIndex || 0) ||
    mergedTimeRemaining < (remote.timeRemainingSeconds || 0);

  return {
    session: mergedSession,
    unlockedOrReset: false,
    isRemoteReset: false,
    isRemoteDone: false,
    needsRemoteBackfill,
  };
}

/**
 * Reconciles authoritative Supabase session rows with the official 93-student roster
 * by matching on `(nis / student_nis, examId)` (and fallback `studentId`).
 * Also preserves any extra active/completed Supabase rows not in the local roster.
 */
export function reconcileSessionsWithStudents(
  students: Student[],
  remoteSessions: StudentExamSession[],
  defaultExam: ExamSchedule,
  existingLocalSessions: StudentExamSession[] = [],
  options?: { isFullSnapshot?: boolean }
): StudentExamSession[] {
  const byNisAndExam = new Map<string, StudentExamSession>();

  const scoreFreshness = (s: StudentExamSession) =>
    (s.updatedAt ? Date.parse(s.updatedAt) : 0) || s.lastHeartbeat || 0;

  if (!options?.isFullSnapshot) {
    existingLocalSessions.forEach(s => {
      const key = `${(s.nis || s.studentId).trim()}__${s.examId}`;
      byNisAndExam.set(key, s);
    });
  }

  remoteSessions.forEach(remote => {
    const cleanRemoteNis = (remote.nis || '').trim();
    const matchedStudent = students.find(
      st => (cleanRemoteNis && st.nis.trim() === cleanRemoteNis) || st.id === remote.studentId
    );
    const normalizedNis = (matchedStudent?.nis || cleanRemoteNis).trim();
    const normalizedStudentId = matchedStudent?.id || remote.studentId;
    const normalized: StudentExamSession = {
      ...remote,
      nis: normalizedNis,
      studentId: normalizedStudentId,
      studentName: matchedStudent?.name || remote.studentName,
      classId: matchedStudent?.classId || remote.classId,
      className: matchedStudent?.className || remote.className,
    };
    const key = `${normalizedNis || normalizedStudentId}__${normalized.examId}`;
    byNisAndExam.set(key, normalized);
  });

  const allSessions = Array.from(byNisAndExam.values());
  const isUntouchedPlaceholder = (s: StudentExamSession) =>
    s.status === 'not_started' &&
    !s.isOnline &&
    !s.isLocked &&
    s.violationsCount === 0 &&
    s.finalScore === 0 &&
    countAnsweredQuestions(s.answers) === 0 &&
    (s.answeredCount || 0) === 0;

  const finalList: StudentExamSession[] = [];
  const matchedKeys = new Set<string>();

  students.forEach(std => {
    const cleanStdNis = std.nis.trim();
    const studentRows = allSessions
      .filter(s => (s.nis && s.nis.trim() === cleanStdNis) || s.studentId === std.id)
      .sort((a, b) => scoreFreshness(b) - scoreFreshness(a));

    studentRows.forEach(r => matchedKeys.add(`${(r.nis || r.studentId).trim()}__${r.examId}`));

    const activeOrDoneRows = studentRows.filter(s => !isUntouchedPlaceholder(s));

    if (activeOrDoneRows.length > 0) {
      activeOrDoneRows.forEach(row => finalList.push(row));
    } else if (studentRows.length > 0) {
      finalList.push(studentRows[0]);
    } else {
      finalList.push({
        id: buildDeterministicSessionId(std.nis, defaultExam.id),
        studentId: std.id,
        studentName: std.name,
        nis: std.nis,
        classId: std.classId,
        className: std.className,
        examId: defaultExam.id,
        examTitle: defaultExam.title,
        status: 'not_started',
        timeRemainingSeconds: (defaultExam.durationMinutes || 90) * 60,
        violationsCount: 0,
        isLocked: false,
        extraTimeMinutes: 0,
        deviceInfo: '-',
        deviceSessionId: undefined,
        currentQuestionIndex: 0,
        isOnline: false,
        lastHeartbeat: 0,
        answers: {},
        scorePg: 0,
        scoreEssay: 0,
        finalScore: 0,
        isPassed: false,
      });
    }
  });

  // Keep any active/completed remote rows that did not match the static student array
  allSessions.forEach(s => {
    const key = `${(s.nis || s.studentId).trim()}__${s.examId}`;
    if (!matchedKeys.has(key) && !isUntouchedPlaceholder(s)) {
      finalList.push(s);
    }
  });

  return finalList;
}

/**
 * 6. SUPABASE REALTIME CHANNEL — OPERATOR & GURU LIVE MONITORING
 */
export function subscribeToExamSessionsRealtime(callbacks: {
  onSessionUpsert: (session: StudentExamSession) => void;
  onViolationInsert?: (log: ExamViolationLog) => void;
  onStatusChange?: (status: string) => void;
}): () => void {
  if (!isSupabaseConfigured || !supabase) {
    return () => {};
  }

  const client = supabase;
  const channel = client
    .channel(`cbt-operator-monitoring-${Date.now()}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'cbt_exam_sessions',
      },
      payload => {
        const record = (payload.new || payload.old) as SupabaseExamSessionRow | undefined;
        if (record && (record.id || record.nis)) {
          callbacks.onSessionUpsert(mapSupabaseRowToSession(record));
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'cbt_violation_logs',
      },
      payload => {
        const record = payload.new as SupabaseViolationLogRow | undefined;
        if (record && record.id && callbacks.onViolationInsert) {
          callbacks.onViolationInsert(mapSupabaseViolationRow(record));
        }
      }
    )
    .subscribe(status => {
      callbacks.onStatusChange?.(status);
    });

  return () => {
    client.removeChannel(channel);
  };
}

/**
 * 7. SUPABASE REALTIME CHANNEL — STUDENT AUTO-UNLOCK LISTENER
 * Subscribes by student NIS so any Operator unlock update on `(nis, exam_id)`
 * clears the lock screen immediately on the student's phone/laptop.
 */
export function subscribeToStudentSessionLockRealtime(
  sessionId: string,
  studentNis: string,
  examId: string,
  onSessionChange: (updated: StudentExamSession) => void
): () => void {
  if (!isSupabaseConfigured || !supabase || (!sessionId && !studentNis)) {
    return () => {};
  }

  const client = supabase;
  const filterExpr = studentNis ? `nis=eq.${studentNis}` : `id=eq.${sessionId}`;
  const channel = client
    .channel(`cbt-student-session-${studentNis || sessionId}-${Date.now()}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'cbt_exam_sessions',
        filter: filterExpr,
      },
      payload => {
        const record = payload.new as SupabaseExamSessionRow | undefined;
        if (
          record &&
          (record.id === sessionId ||
            (record.exam_id === examId && (record.nis === studentNis || record.student_nis === studentNis)))
        ) {
          onSessionChange(mapSupabaseRowToSession(record));
        }
      }
    )
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}

/**
 * ============================================================================
 * 8. EXAM SCHEDULES (public.cbt_exam_schedules) — SUPABASE SSoT & REALTIME
 * ============================================================================
 */
export interface SupabaseExamScheduleRow {
  id: string;
  exam_title: string;
  subject_id: string;
  subject_name: string;
  class_ids?: string[] | string | null;
  class_names?: string[] | string | null;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  kkm?: number | null;
  token?: string | null;
  token_required?: boolean | null;
  is_active?: boolean | null;
  status?: string | null;
  randomize_questions?: boolean | null;
  randomize_options?: boolean | null;
  question_bank_id?: string | null;
  total_questions?: number | null;
  updated_at?: string | null;
}

export interface FetchExamSchedulesResult {
  schedules: ExamSchedule[] | null;
  error?: string;
}

export interface ExamScheduleMutationResult {
  success: boolean;
  schedule?: ExamSchedule;
  error?: string;
  skipped?: boolean;
}

const CLASS_NAME_TO_ID_MAP: Record<string, string> = {
  'VII': 'cls-1',
  '7': 'cls-1',
  'VIII-A': 'cls-8a',
  '8A': 'cls-8a',
  '8-A': 'cls-8a',
  'VIII-B': 'cls-8b',
  '8B': 'cls-8b',
  '8-B': 'cls-8b',
  'IX': 'cls-9',
  '9': 'cls-9',
};

const CLASS_ID_TO_NAME_MAP: Record<string, string> = {
  'cls-1': 'VII',
  'cls-8a': 'VIII-A',
  'cls-8b': 'VIII-B',
  'cls-9': 'IX',
};

function parseStringArrayField(raw?: string[] | string | null): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map(v => String(v || '').trim()).filter(Boolean);
  }
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map(v => String(v || '').trim()).filter(Boolean);
        }
      } catch {
        // fallback to comma split
      }
    }
    return trimmed
      .replace(/^\{|\}$/g, '')
      .split(',')
      .map(v => v.replace(/^"|"$/g, '').trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeDateYmd(raw?: string | null): string {
  if (!raw) return '';
  const trimmed = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed.slice(0, 10);
  }
  const parsedMs = Date.parse(trimmed);
  if (!Number.isNaN(parsedMs)) {
    const d = new Date(parsedMs);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  return trimmed;
}

function normalizeTimeHm(raw?: string | null, fallback = '07:30'): string {
  if (!raw) return fallback;
  const trimmed = String(raw).trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})/);
  if (match) {
    return `${match[1].padStart(2, '0')}:${match[2]}`;
  }
  return fallback;
}

function normalizeExamStatus(rawStatus?: string | null, isActive?: boolean | null): ExamSchedule['status'] {
  const s = (rawStatus || '').toLowerCase().trim();
  if (s === 'finished' || s === 'selesai') return 'finished';
  if (isActive === false) return 'draft';
  if (s === 'draft') return 'draft';
  if (s === 'scheduled' || s === 'terjadwal') return 'scheduled';
  return 'ongoing';
}

export function mapExamScheduleToSupabaseRow(exam: ExamSchedule): SupabaseExamScheduleRow {
  const isActive =
    typeof exam.isActive === 'boolean'
      ? exam.isActive
      : exam.status !== 'draft' && exam.status !== 'finished';

  const classIds =
    Array.isArray(exam.targetClassIds) && exam.targetClassIds.length > 0
      ? exam.targetClassIds
      : ['cls-1', 'cls-8a', 'cls-8b', 'cls-9'];

  const classNames =
    Array.isArray(exam.targetClassNames) && exam.targetClassNames.length > 0
      ? exam.targetClassNames
      : classIds.map(id => CLASS_ID_TO_NAME_MAP[id] || id);

  return {
    id: (exam.id || `ex-${Date.now()}`).trim(),
    exam_title: (exam.title || '').trim(),
    subject_id: (exam.subjectId || '').trim(),
    subject_name: (exam.subjectName || '').trim(),
    class_ids: classIds,
    class_names: classNames,
    scheduled_date: normalizeDateYmd(exam.date),
    start_time: normalizeTimeHm(exam.startTime, '07:30'),
    end_time: normalizeTimeHm(exam.endTime, '09:30'),
    duration_minutes: Math.max(5, Math.round(Number(exam.durationMinutes) || 90)),
    kkm: Math.max(0, Math.min(100, Math.round(Number(exam.kkm) || 75))),
    token: exam.token || '',
    token_required: exam.tokenRequired !== false,
    is_active: isActive,
    status: exam.status || (isActive ? 'ongoing' : 'draft'),
    randomize_questions: exam.randomizeQuestions !== false,
    randomize_options: exam.randomizeOptions !== false,
    question_bank_id: exam.questionBankId || `qbank-${exam.subjectId || 'mat'}`,
    total_questions: Math.max(0, Math.round(Number(exam.totalQuestions) || 0)),
    updated_at: new Date().toISOString(),
  };
}

export function mapSupabaseRowToExamSchedule(row: SupabaseExamScheduleRow): ExamSchedule {
  const parsedClassNames = parseStringArrayField(row.class_names);
  const parsedClassIds = parseStringArrayField(row.class_ids);

  const targetClassIds =
    parsedClassIds.length > 0
      ? parsedClassIds
      : parsedClassNames.length > 0
        ? parsedClassNames.map(name => CLASS_NAME_TO_ID_MAP[name.toUpperCase()] || name)
        : ['cls-1', 'cls-8a', 'cls-8b', 'cls-9'];

  const targetClassNames =
    parsedClassNames.length > 0
      ? parsedClassNames
      : targetClassIds.map(id => CLASS_ID_TO_NAME_MAP[id] || id);

  const normalizedStatus = normalizeExamStatus(row.status, row.is_active);
  const resolvedIsActive =
    typeof row.is_active === 'boolean'
      ? row.is_active
      : normalizedStatus !== 'draft' && normalizedStatus !== 'finished';

  return {
    id: row.id,
    title: row.exam_title || `Ujian - ${row.subject_name || 'CBT'}`,
    subjectId: row.subject_id || '',
    subjectName: row.subject_name || 'Umum',
    targetClassIds,
    targetClassNames,
    date: normalizeDateYmd(row.scheduled_date),
    startTime: normalizeTimeHm(row.start_time, '07:30'),
    endTime: normalizeTimeHm(row.end_time, '09:30'),
    durationMinutes: Number(row.duration_minutes) || 90,
    kkm: Number(row.kkm) || 75,
    randomizeQuestions: row.randomize_questions !== false,
    randomizeOptions: row.randomize_options !== false,
    questionBankId: row.question_bank_id || `qbank-${row.subject_id || 'mat'}`,
    totalQuestions: typeof row.total_questions === 'number' ? row.total_questions : undefined,
    status: normalizedStatus,
    tokenRequired: row.token_required !== false,
    token: row.token || undefined,
    isActive: resolvedIsActive,
    updatedAt: row.updated_at || undefined,
  };
}

export async function fetchExamSchedulesFromSupabase(): Promise<FetchExamSchedulesResult> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      schedules: null,
      error: supabaseConfigError || 'Supabase belum dikonfigurasi.',
    };
  }
  try {
    const { data, error } = await supabase
      .from('cbt_exam_schedules')
      .select('*')
      .order('scheduled_date', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.warn('[Supabase] fetchExamSchedules failed:', exactMessage);
      return { schedules: null, error: exactMessage };
    }

    return {
      schedules: (data || []).map(row =>
        mapSupabaseRowToExamSchedule(row as SupabaseExamScheduleRow)
      ),
    };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.warn('[Supabase] fetchExamSchedules network error:', exactMessage);
    return { schedules: null, error: exactMessage };
  }
}

export async function upsertExamScheduleToSupabase(
  exam: ExamSchedule
): Promise<ExamScheduleMutationResult> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      skipped: true,
      schedule: exam,
      error: supabaseConfigError || 'Supabase belum dikonfigurasi.',
    };
  }
  try {
    const row = mapExamScheduleToSupabaseRow(exam);
    const { data, error } = await supabase
      .from('cbt_exam_schedules')
      .upsert(row, { onConflict: 'id' })
      .select()
      .maybeSingle();

    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.error('[Supabase] upsertExamSchedule failed:', exactMessage);
      return { success: false, schedule: exam, error: exactMessage };
    }

    return {
      success: true,
      schedule: data
        ? mapSupabaseRowToExamSchedule(data as SupabaseExamScheduleRow)
        : exam,
    };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.error('[Supabase] upsertExamSchedule network error:', exactMessage);
    return { success: false, schedule: exam, error: exactMessage };
  }
}

export async function upsertMultipleExamSchedulesToSupabase(
  exams: ExamSchedule[]
): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  if (!isSupabaseConfigured || !supabase || exams.length === 0) {
    return {
      success: false,
      skipped: true,
      error: exams.length === 0 ? undefined : (supabaseConfigError || 'Supabase belum dikonfigurasi.'),
    };
  }
  try {
    const rows = exams.map(mapExamScheduleToSupabaseRow);
    const { error } = await supabase
      .from('cbt_exam_schedules')
      .upsert(rows, { onConflict: 'id' });

    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.error('[Supabase] batch upsertExamSchedules failed:', exactMessage);
      return { success: false, error: exactMessage };
    }
    return { success: true };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.error('[Supabase] batch upsertExamSchedules network error:', exactMessage);
    return { success: false, error: exactMessage };
  }
}

export async function deleteExamScheduleFromSupabase(
  examId: string
): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      skipped: true,
      error: supabaseConfigError || 'Supabase belum dikonfigurasi.',
    };
  }
  try {
    const { error } = await supabase
      .from('cbt_exam_schedules')
      .delete()
      .eq('id', examId);

    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.error('[Supabase] deleteExamSchedule failed:', exactMessage);
      return { success: false, error: exactMessage };
    }
    return { success: true };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.error('[Supabase] deleteExamSchedule network error:', exactMessage);
    return { success: false, error: exactMessage };
  }
}

export function subscribeToExamSchedulesRealtime(callbacks: {
  onChange: () => void;
  onStatusChange?: (status: string) => void;
}): () => void {
  if (!isSupabaseConfigured || !supabase) {
    return () => {};
  }

  const client = supabase;
  const channel = client
    .channel(`cbt-exam-schedules-realtime-${Date.now()}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'cbt_exam_schedules',
      },
      () => {
        callbacks.onChange();
      }
    )
    .subscribe(status => {
      callbacks.onStatusChange?.(status);
    });

  return () => {
    client.removeChannel(channel);
  };
}

