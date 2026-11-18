import {
  ExamSchedule,
  ExamViolationLog,
  Question,
  StudentExamSession,
  StudentExamStatus,
  ViolationType,
} from '../types/cbt';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { calculateProvisionalScore } from '../utils/sessionDevice';
import { syncSingleSession } from '../utils/apiSync';

export interface SupabaseExamSessionRow {
  id: string;
  student_id: string;
  student_name: string;
  nis: string;
  class_id: string;
  class_name: string;
  exam_id: string;
  exam_title: string;
  status: string;
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

export function mapSessionToSupabaseRow(session: StudentExamSession): SupabaseExamSessionRow {
  const nowIso = session.updatedAt || new Date().toISOString();
  return {
    id: session.id,
    student_id: session.studentId,
    student_name: session.studentName,
    nis: session.nis,
    class_id: session.classId,
    class_name: session.className,
    exam_id: session.examId,
    exam_title: session.examTitle,
    status: session.status,
    score: Number(session.finalScore) || 0,
    score_pg: Number(session.scorePg) || 0,
    score_essay: Number(session.scoreEssay) || 0,
    final_score: Number(session.finalScore) || 0,
    is_passed: Boolean(session.isPassed),
    violation_count: Number(session.violationsCount) || 0,
    is_locked: Boolean(session.isLocked || session.status === 'locked'),
    lock_reason: session.lockReason || null,
    answers_json: session.answers || {},
    time_remaining_seconds: Number(session.timeRemainingSeconds) || 0,
    extra_time_minutes: Number(session.extraTimeMinutes) || 0,
    current_question_index: Number(session.currentQuestionIndex) || 0,
    device_info: session.deviceInfo || 'CBT Browser',
    device_session_id: session.deviceSessionId || null,
    is_online: Boolean(session.isOnline),
    last_heartbeat: Number(session.lastHeartbeat) || Date.now(),
    admin_action_at: session.adminActionAt ?? null,
    started_at: session.startedAt || null,
    submitted_at: session.submittedAt || null,
    updated_at: nowIso,
  };
}

export function mapSupabaseRowToSession(row: SupabaseExamSessionRow): StudentExamSession {
  const validStatus = (row.status || 'not_started') as StudentExamStatus;
  const computedFinalScore = Number(row.final_score ?? row.score ?? 0);
  return {
    id: row.id,
    studentId: row.student_id,
    studentName: row.student_name || '',
    nis: row.nis || '',
    classId: row.class_id || '',
    className: row.class_name || '',
    examId: row.exam_id || '',
    examTitle: row.exam_title || '',
    status: row.is_locked ? 'locked' : validStatus,
    startedAt: row.started_at || undefined,
    submittedAt: row.submitted_at || undefined,
    timeRemainingSeconds: Number(row.time_remaining_seconds ?? 5400),
    violationsCount: Number(row.violation_count ?? 0),
    isLocked: Boolean(row.is_locked || validStatus === 'locked'),
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

/**
 * 1. SUBMIT EXAM (Siswa -> Supabase -> Operator/Guru)
 * Explicitly computes final score, persists answers, status='completed', and submitted_at.
 * Resolves success ONLY after Supabase/server confirms persistence.
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

  if (isSupabaseConfigured && supabase) {
    const row = mapSessionToSupabaseRow(completedSession);
    const { data, error } = await supabase
      .from('cbt_exam_sessions')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('[Supabase] submitExam upsert failed:', error);
      return {
        success: false,
        session: completedSession,
        source: 'supabase',
        error: `Gagal menyimpan nilai ke Supabase: ${error.message}`,
      };
    }

    const confirmedSession = data ? mapSupabaseRowToSession(data as SupabaseExamSessionRow) : completedSession;
    // Also mirror to local/JSONBin store cleanly
    await syncSingleSession(confirmedSession).catch(() => false);
    return {
      success: true,
      session: confirmedSession,
      source: 'supabase',
    };
  }

  // Fallback to Express API + JSONBin when Supabase env vars are not yet configured in local dev
  const synced = await syncSingleSession(completedSession);
  if (!synced) {
    return {
      success: false,
      session: completedSession,
      source: 'server',
      error: 'Gagal mengirim lembar jawaban ke server. Periksa koneksi internet Anda lalu coba lagi.',
    };
  }

  return {
    success: true,
    session: completedSession,
    source: 'server',
  };
}

/**
 * 2. RECORD ANTI-CHEAT VIOLATION & AUTO-LOCK AT 3/3
 * Increments violation_count + 1, writes audit row to cbt_violation_logs,
 * and sets is_locked=true when violation_count >= maxViolations.
 */
export async function recordViolationToSupabase(params: {
  session: StudentExamSession;
  violationType: ViolationType;
  details: string;
  maxViolations?: number;
  timeRemainingSeconds?: number;
}): Promise<SessionActionResult> {
  const { session, violationType, details, maxViolations = 3, timeRemainingSeconds } = params;
  const nextCount = (session.violationsCount || 0) + 1;
  const isNowLocked = nextCount >= maxViolations;
  const nowIso = new Date().toISOString();

  const updatedSession: StudentExamSession = {
    ...session,
    violationsCount: nextCount,
    isLocked: isNowLocked,
    status: isNowLocked ? 'locked' : 'in_progress',
    lockReason: isNowLocked
      ? `Mencapai batas ${maxViolations}x pelanggaran (${details})`
      : session.lockReason,
    timeRemainingSeconds:
      typeof timeRemainingSeconds === 'number' ? timeRemainingSeconds : session.timeRemainingSeconds,
    lastHeartbeat: Date.now(),
    updatedAt: nowIso,
  };

  if (isSupabaseConfigured && supabase) {
    const row = mapSessionToSupabaseRow(updatedSession);
    const { data, error } = await supabase
      .from('cbt_exam_sessions')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    const logRow: SupabaseViolationLogRow = {
      id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      session_id: session.id,
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
      console.warn('[Supabase] Violation log insert warning:', logErr.message);
    }

    if (error) {
      console.error('[Supabase] Violation session update failed:', error);
      return { success: false, session: updatedSession, error: error.message };
    }

    const confirmed = data ? mapSupabaseRowToSession(data as SupabaseExamSessionRow) : updatedSession;
    syncSingleSession(confirmed).catch(() => false);
    return { success: true, session: confirmed };
  }

  await syncSingleSession(updatedSession).catch(() => false);
  return { success: true, session: updatedSession };
}

/**
 * 3. UNLOCK STUDENT SESSION BY OPERATOR / GURU
 * Sets is_locked=false, resets violation_count to 0 (optional), and stamps admin_action_at
 * so the student's locked screen unlocks immediately via Supabase Realtime.
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
    const { data, error } = await supabase
      .from('cbt_exam_sessions')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    // Log operator unlock in cbt_violation_logs for complete audit trail
    await supabase
      .from('cbt_violation_logs')
      .insert({
        id: `unlock-${nowMs}-${Math.random().toString(36).slice(2, 7)}`,
        session_id: session.id,
        student_id: session.studentId,
        student_name: session.studentName,
        nis: session.nis,
        class_name: session.className,
        exam_id: session.examId,
        exam_title: session.examTitle,
        violation_type: 'operator_unlock',
        description: resetViolations
          ? 'Operator membuka kunci ujian dan mereset hitungan pelanggaran menjadi 0/3'
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
 * 4. SYNC PROGRESS / HEARTBEAT / RESET TO SUPABASE
 */
export async function syncSessionProgressToSupabase(session: StudentExamSession): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return true;
  try {
    const row = mapSessionToSupabaseRow({
      ...session,
      updatedAt: new Date().toISOString(),
    });
    const { error } = await supabase.from('cbt_exam_sessions').upsert(row, { onConflict: 'id' });
    if (error) {
      console.warn('[Supabase] Session progress upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] Network error syncing session:', err);
    return false;
  }
}

export async function syncMultipleSessionsToSupabase(sessions: StudentExamSession[]): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase || sessions.length === 0) return true;
  try {
    const nowIso = new Date().toISOString();
    const rows = sessions.map(s => mapSessionToSupabaseRow({ ...s, updatedAt: nowIso }));
    const { error } = await supabase.from('cbt_exam_sessions').upsert(rows, { onConflict: 'id' });
    if (error) {
      console.warn('[Supabase] Batch sessions upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] Batch sessions network error:', err);
    return false;
  }
}

/**
 * 5. DIRECT QUERIES FOR OPERATOR DASHBOARD (REKAP NILAI & MONITORING)
 */
export async function fetchExamResultsFromSupabase(): Promise<StudentExamSession[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('cbt_exam_sessions')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] fetchExamResults failed:', error.message);
      return null;
    }
    return (data || []).map(row => mapSupabaseRowToSession(row as SupabaseExamSessionRow));
  } catch (err) {
    console.warn('[Supabase] fetchExamResults network error:', err);
    return null;
  }
}

export async function fetchViolationLogsFromSupabase(limitCount = 50): Promise<ExamViolationLog[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('cbt_violation_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limitCount);

    if (error) {
      console.warn('[Supabase] fetchViolationLogs failed:', error.message);
      return null;
    }
    return (data || []).map(row => mapSupabaseViolationRow(row as SupabaseViolationLogRow));
  } catch (err) {
    console.warn('[Supabase] fetchViolationLogs network error:', err);
    return null;
  }
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
        if (record && record.id) {
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
 * Subscribes specifically to this student's session row so when Operator sets
 * is_locked = false in Supabase, the lock screen clears instantaneously.
 */
export function subscribeToStudentSessionLockRealtime(
  sessionId: string,
  onSessionChange: (updated: StudentExamSession) => void
): () => void {
  if (!isSupabaseConfigured || !supabase || !sessionId) {
    return () => {};
  }

  const client = supabase;
  const channel = client
    .channel(`cbt-student-session-${sessionId}-${Date.now()}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'cbt_exam_sessions',
        filter: `id=eq.${sessionId}`,
      },
      payload => {
        const record = payload.new as SupabaseExamSessionRow | undefined;
        if (record && record.id) {
          onSessionChange(mapSupabaseRowToSession(record));
        }
      }
    )
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}
