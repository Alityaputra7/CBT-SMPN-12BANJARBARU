import {
  ExamSchedule,
  ExamViolationLog,
  Question,
  Student,
  StudentExamSession,
  StudentExamStatus,
  ViolationType,
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
  return `sess-${cleanNis}-${cleanExam}`;
}

export function countAnsweredQuestions(answers?: StudentExamSession['answers']): number {
  if (!answers || typeof answers !== 'object') return 0;
  return Object.values(answers).filter(
    a => a && a.answer !== '' && a.answer !== undefined && (!Array.isArray(a.answer) || a.answer.length > 0)
  ).length;
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
 * 1. SUBMIT EXAM (Siswa -> Supabase -> Operator/Guru)
 * Explicitly computes final score, answered_count, status='completed', and submitted_at.
 * Writes directly to Supabase via supabaseClient.ts (no /api/ local fallback).
 * Surfaces the exact Supabase error.message on failure.
 */
export async function submitExamToSupabase(params: {
  session: StudentExamSession;
  questions: Question[];
  exam: ExamSchedule;
  forcedStatus?: 'completed' | 'force_submitted';
}): Promise<SubmitExamResult> {
  const { session, questions, exam, forcedStatus = 'completed' } = params;
  const { scorePg, finalScore } = calculateProvisionalScore(
    questions,
    session.answers || {},
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
    submittedAt: nowIso,
    updatedAt: nowIso,
    timeRemainingSeconds: 0,
    scorePg,
    scoreEssay: session.scoreEssay || 0,
    finalScore,
    isPassed: finalScore >= kkm,
    isLocked: false,
    lockReason: undefined,
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
    };
  }

  try {
    const row = mapSessionToSupabaseRow(completedSession, questions.length);
    const { data, error } = await upsertSessionRow(row);

    if (error) {
      const exactMessage = formatSupabaseError(error);
      console.error('[Supabase] submitExam upsert failed:', error);
      return {
        success: false,
        session: completedSession,
        source: 'supabase',
        error: exactMessage,
      };
    }

    const confirmedSession = data
      ? mapSupabaseRowToSession(data as SupabaseExamSessionRow)
      : completedSession;
    return {
      success: true,
      session: confirmedSession,
      source: 'supabase',
    };
  } catch (err) {
    const exactMessage = err instanceof Error ? err.message : String(err);
    console.error('[Supabase] submitExam unexpected error:', err);
    return {
      success: false,
      session: completedSession,
      source: 'supabase',
      error: exactMessage,
    };
  }
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
  const nowIso = new Date().toISOString();

  const updatedSession: StudentExamSession = {
    ...session,
    id: session.nis && session.examId ? buildDeterministicSessionId(session.nis, session.examId) : session.id,
    violationsCount: nextCount,
    isLocked: isNowLocked,
    status: isNowLocked ? 'locked' : 'in_progress',
    lockReason: isNowLocked
      ? `Mencapai batas ${maxViolations}x pelanggaran (${details})`
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

  const unlockedSession: StudentExamSession = {
    ...session,
    id: session.nis && session.examId ? buildDeterministicSessionId(session.nis, session.examId) : session.id,
    isLocked: false,
    lockReason: undefined,
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
          ? 'Operator membuka kunci ujian dan mereset pelanggaran menjadi 0/3'
          : 'Operator membuka kunci ujian siswa',
        violation_number: 0,
        action_taken: 'OPERATOR_UNLOCK',
        created_at: nowIso,
      })
      .then(() => {}, () => {});

    if (error) {
      console.error('[Supabase] Unlock session failed:', error);
      return { success: false, session: unlockedSession, error: error.message };
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

    // Fallback query by deterministic ID if nis/student_nis wasn't matched
    const detId = buildDeterministicSessionId(cleanNis, cleanExamId);
    const byId = await supabase
      .from('cbt_exam_sessions')
      .select('*')
      .eq('id', detId)
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
