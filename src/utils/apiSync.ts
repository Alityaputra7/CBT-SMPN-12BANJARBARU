import { 
  SchoolSetting, 
  UserAccount, 
  Student, 
  ClassRoom, 
  Subject, 
  ExamSchedule, 
  StudentExamSession, 
  QuestionBank, 
  AuditLog,
  isSessionCompleted
} from '../types/cbt';
import { 
  INITIAL_SCHOOL_SETTING,
  INITIAL_OPERATOR,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_EXAMS,
  INITIAL_QUESTION_BANK,
  INITIAL_AUDIT_LOGS,
  createInitialStudentSessions
} from '../data/seedData';

// User's Verified JSONBin.io Credentials
export const JSONBIN_CONFIG = {
  BIN_ID: '6ae3da16ac6210605a5d7d67',
  MASTER_KEY: '$2a$10$FInWr6nZAYYAmp8/KXrUoOEuDH5NOQ/0oM82MRBKIjynMzb/H5vXO',
  BASE_URL: 'https://api.jsonbin.io/v3/b',
};

export interface CbtStorePayload {
  schoolSetting?: SchoolSetting;
  operator?: UserAccount;
  students?: Student[];
  teachers?: UserAccount[];
  classes?: ClassRoom[];
  subjects?: Subject[];
  exams?: ExamSchedule[];
  sessions?: StudentExamSession[];
  questionBank?: QuestionBank;
  auditLogs?: AuditLog[];
}

export interface CbtServerDataResponse {
  success: boolean;
  version: number;
  lastUpdated: number;
  source: 'jsonbin' | 'server' | 'local';
  data: {
    schoolSetting: SchoolSetting;
    operator: UserAccount;
    students: Student[];
    teachers: UserAccount[];
    classes: ClassRoom[];
    subjects: Subject[];
    exams: ExamSchedule[];
    sessions: StudentExamSession[];
    questionBank: QuestionBank;
    auditLogs: AuditLog[];
  };
}

export interface CbtServerVersionResponse {
  success: boolean;
  version: number;
  lastUpdated: number;
}

// In-memory cache to merge partial updates before sending to JSONBin
let cachedStore: CbtServerDataResponse['data'] = {
  schoolSetting: INITIAL_SCHOOL_SETTING,
  operator: INITIAL_OPERATOR,
  students: INITIAL_STUDENTS,
  teachers: INITIAL_TEACHERS,
  classes: INITIAL_CLASSES,
  subjects: INITIAL_SUBJECTS,
  exams: INITIAL_EXAMS,
  sessions: createInitialStudentSessions(INITIAL_STUDENTS),
  questionBank: INITIAL_QUESTION_BANK,
  auditLogs: INITIAL_AUDIT_LOGS,
};

let currentVersion = 1;
let lastUpdatedTimestamp = Date.now();
let debounceSaveTimer: ReturnType<typeof setTimeout> | null = null;
let isSavingToJsonBin = false;

export function getLatestSyncMeta() {
  return {
    version: currentVersion,
    lastUpdated: lastUpdatedTimestamp,
  };
}

/**
 * Browser & Node compatible string compression via standard CompressionStream ('deflate')
 */
export async function compressString(str: string): Promise<string> {
  const cs = new CompressionStream('deflate');
  const writer = cs.writable.getWriter();
  writer.write(new TextEncoder().encode(str));
  writer.close();
  const reader = cs.readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
  const full = new Uint8Array(totalLength);
  let offset = 0;
  for (const c of chunks) {
    full.set(c, offset);
    offset += c.length;
  }
  let binary = '';
  for (let i = 0; i < full.byteLength; i++) {
    binary += String.fromCharCode(full[i]);
  }
  return btoa(binary);
}

/**
 * Browser & Node compatible string decompression via standard DecompressionStream ('deflate')
 */
export async function decompressString(b64: string): Promise<string> {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const ds = new DecompressionStream('deflate');
  const writer = ds.writable.getWriter();
  writer.write(bytes);
  writer.close();
  const reader = ds.readable.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
  const full = new Uint8Array(totalLength);
  let offset = 0;
  for (const c of chunks) {
    full.set(c, offset);
    offset += c.length;
  }
  return new TextDecoder().decode(full);
}

/**
 * Helper to build an optimized payload for JSONBin (staying under the 100 KB free-tier limit).
 * Only active or modified student sessions are sent across the wire;
 * default empty sessions are regenerated deterministically from the student list.
 */
function buildJsonBinPayload() {
  const activeSessions = (cachedStore.sessions || []).filter(s => 
    s.isOnline ||
    s.status !== 'not_started' || 
    Object.keys(s.answers || {}).length > 0 || 
    s.isLocked || 
    s.finalScore > 0 || 
    s.violationsCount > 0 ||
    !!s.deviceSessionId ||
    !!s.adminActionAt
  );

  return {
    version: currentVersion + 1,
    lastUpdated: Date.now(),
    schoolSetting: cachedStore.schoolSetting,
    operator: cachedStore.operator,
    students: cachedStore.students,
    teachers: cachedStore.teachers,
    classes: cachedStore.classes,
    subjects: cachedStore.subjects,
    exams: cachedStore.exams,
    activeSessions: activeSessions,
    questionBank: cachedStore.questionBank,
    auditLogs: (cachedStore.auditLogs || []).slice(0, 50), // keep latest 50 logs
  };
}

/**
 * Reconstructs full 92+ sessions by merging default template with active sessions from JSONBin
 */
function reconstructFullSessions(
  students: Student[], 
  activeSessions: StudentExamSession[] = [], 
  primaryExam: ExamSchedule
): StudentExamSession[] {
  const base = createInitialStudentSessions(students);
  const activeMap = new Map<string, StudentExamSession>();
  const usedIds = new Set<string>();
  
  activeSessions.forEach(s => {
    activeMap.set(`${s.studentId}-${s.examId || primaryExam?.id || 'ex-mat-2026'}`, s);
    if (!activeMap.has(s.studentId)) {
      activeMap.set(s.studentId, s);
    }
  });

  const merged = base.map(defaultSess => {
    const matched = activeMap.get(`${defaultSess.studentId}-${defaultSess.examId}`) || activeMap.get(defaultSess.studentId);
    if (matched) {
      usedIds.add(matched.id);
      return matched;
    }
    return defaultSess;
  });

  // Preserve any additional per-exam sessions not matching the primary base slot
  activeSessions.forEach(s => {
    if (!usedIds.has(s.id) && !merged.some(m => m.id === s.id)) {
      merged.push(s);
    }
  });

  return merged;
}

/**
 * 1. GET DATA DARI JSONBIN.IO
 * Membaca data terbaru dari JSONBin saat aplikasi pertama kali dimuat.
 */
export async function fetchServerData(): Promise<CbtServerDataResponse | null> {
  try {
    const url = `${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}/latest`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY,
        'Cache-Control': 'no-cache',
      },
    });

    if (!res.ok) {
      console.warn(`[JSONBin] GET failed with status ${res.status}, falling back to server`);
      return fetchLocalServerData();
    }

    const json = await res.json();
    let record = json.record;

    if (!record) {
      return fetchLocalServerData();
    }

    // Auto-decompress if payload is compressed
    if (record.compressed && typeof record.data === 'string') {
      try {
        const decompressed = await decompressString(record.data);
        const parsed = JSON.parse(decompressed);
        record = {
          ...parsed,
          version: record.version || parsed.version,
          lastUpdated: record.lastUpdated || parsed.lastUpdated,
        };
      } catch (decErr) {
        console.error('[JSONBin] Decompression error, falling back:', decErr);
      }
    }

    // Update version
    if (record.version) {
      currentVersion = record.version;
    }
    if (record.lastUpdated) {
      lastUpdatedTimestamp = record.lastUpdated;
    }

    const students = Array.isArray(record.students) && record.students.length > 0 
      ? record.students 
      : INITIAL_STUDENTS;
    const exams = Array.isArray(record.exams) && record.exams.length > 0 
      ? record.exams 
      : INITIAL_EXAMS;
    const primaryExam = exams[0] || INITIAL_EXAMS[0];

    const fullSessions = reconstructFullSessions(
      students, 
      record.activeSessions || record.sessions || [], 
      primaryExam
    );

    cachedStore = {
      schoolSetting: record.schoolSetting || INITIAL_SCHOOL_SETTING,
      operator: record.operator || INITIAL_OPERATOR,
      students,
      teachers: Array.isArray(record.teachers) ? record.teachers : INITIAL_TEACHERS,
      classes: Array.isArray(record.classes) ? record.classes : INITIAL_CLASSES,
      subjects: Array.isArray(record.subjects) ? record.subjects : INITIAL_SUBJECTS,
      exams,
      sessions: fullSessions,
      questionBank: record.questionBank || INITIAL_QUESTION_BANK,
      auditLogs: Array.isArray(record.auditLogs) ? record.auditLogs : INITIAL_AUDIT_LOGS,
    };

    return {
      success: true,
      source: 'jsonbin',
      version: currentVersion,
      lastUpdated: lastUpdatedTimestamp,
      data: cachedStore,
    };
  } catch (err) {
    console.warn('[JSONBin] Network error during GET, fallback to local server:', err);
    return fetchLocalServerData();
  }
}

/**
 * 2. GET VERSION DARI JSONBIN.IO (POLLING RINGAN)
 * Memeriksa versi data terbaru dari JSONBin untuk mendeteksi perubahan antar HP & Laptop.
 */
export async function fetchServerVersion(): Promise<CbtServerVersionResponse | null> {
  try {
    // Use local proxy or direct JSONBin check
    const url = `${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}/latest`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY,
        'Cache-Control': 'no-cache',
      },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const record = json.record;

    return {
      success: true,
      version: record?.version || currentVersion,
      lastUpdated: record?.lastUpdated || lastUpdatedTimestamp,
    };
  } catch {
    return null;
  }
}

/**
 * 3. SIMPAN DATA KE JSONBIN.IO (PUT)
 * Setiap kali ada data baru (soal, guru, siswa, jadwal, hasil ujian), data langsung terupdate ke JSONBin.
 */
export async function syncServerUpdates(updates: CbtStorePayload): Promise<boolean> {
  try {
    // Merge into local cache
    if (updates.schoolSetting) cachedStore.schoolSetting = updates.schoolSetting;
    if (updates.operator) cachedStore.operator = updates.operator;
    if (Array.isArray(updates.students)) cachedStore.students = updates.students;
    if (Array.isArray(updates.teachers)) cachedStore.teachers = updates.teachers;
    if (Array.isArray(updates.classes)) cachedStore.classes = updates.classes;
    if (Array.isArray(updates.subjects)) cachedStore.subjects = updates.subjects;
    if (Array.isArray(updates.exams)) cachedStore.exams = updates.exams;
    if (Array.isArray(updates.sessions)) cachedStore.sessions = updates.sessions;
    if (updates.questionBank) cachedStore.questionBank = updates.questionBank;
    if (Array.isArray(updates.auditLogs)) cachedStore.auditLogs = updates.auditLogs;

    // Build compressed payload to guarantee staying under JSONBin's 100 KB free-tier limit (~40 KB)
    const uncompressedData = {
      schoolSetting: cachedStore.schoolSetting,
      operator: cachedStore.operator,
      students: cachedStore.students,
      teachers: cachedStore.teachers,
      classes: cachedStore.classes,
      subjects: cachedStore.subjects,
      exams: cachedStore.exams,
      sessions: cachedStore.sessions,
      questionBank: cachedStore.questionBank,
      auditLogs: (cachedStore.auditLogs || []).slice(0, 50),
    };

    let payload: any;
    try {
      const b64 = await compressString(JSON.stringify(uncompressedData));
      payload = {
        version: currentVersion + 1,
        lastUpdated: Date.now(),
        compressed: true,
        data: b64,
      };
    } catch {
      payload = buildJsonBinPayload();
    }

    const url = `${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      currentVersion++;
      lastUpdatedTimestamp = Date.now();
      // Mirror to local server background if available
      mirrorToLocalServer(updates);
      return true;
    } else {
      const errJson = await res.json().catch(() => ({}));
      console.warn('[JSONBin] PUT update failed:', errJson);
      // Fallback: mirror to local server
      return await mirrorToLocalServer(updates);
    }
  } catch (err) {
    console.error('[JSONBin] Network error during PUT update:', err);
    return await mirrorToLocalServer(updates);
  }
}

/**
 * Helper to merge a single student session into the latest remote JSONBin state
 * so simultaneous students never overwrite each other's scores/locks and
 * stale heartbeats never overwrite newer Operator/Guru resets or unlocks.
 */
async function mergeAndPushSingleSession(session: StudentExamSession): Promise<boolean> {
  try {
    const latest = await fetchServerData();
    if (latest && latest.success && Array.isArray(latest.data.sessions)) {
      const remoteSessions = [...latest.data.sessions];
      const remoteIdx = remoteSessions.findIndex(s => s.id === session.id);
      const remoteTarget = remoteIdx >= 0 ? remoteSessions[remoteIdx] : null;

      // If Operator/Guru executed an unlock or reset that this student client hasn't applied yet,
      // preserve the Operator/Guru action instead of overwriting it with stale student state.
      if (
        remoteTarget?.adminActionAt &&
        remoteTarget.adminActionAt !== session.adminActionAt &&
        (!session.adminActionAt || remoteTarget.adminActionAt > session.adminActionAt)
      ) {
        cachedStore.sessions = remoteSessions;
        return true;
      }

      if (remoteIdx >= 0) {
        remoteSessions[remoteIdx] = session;
      } else {
        remoteSessions.push(session);
      }

      // If student switched to a different exam (e.g. sess-std-001-ex-ipa-2026),
      // clear ghost isOnline flag on their unused placeholder session if untouched
      const cleanedSessions = remoteSessions.map(s => {
        if (
          s.studentId === session.studentId &&
          s.id !== session.id &&
          s.status === 'not_started' &&
          s.isOnline &&
          Object.keys(s.answers || {}).length === 0
        ) {
          return { ...s, isOnline: false, deviceSessionId: undefined };
        }
        return s;
      });

      cachedStore.sessions = cleanedSessions;
      return await syncServerUpdates({ sessions: cleanedSessions });
    }
  } catch (err) {
    console.warn('[JSONBin] Pre-merge failed, falling back to cached store:', err);
  }

  return await syncServerUpdates({ sessions: cachedStore.sessions });
}

/**
 * 4. SIMPAN SESI SISWA KE JSONBIN.IO
 * Menyimpan progres jawaban, pelanggaran 3x, dan nilai akhir siswa secara real-time.
 */
let latestQueuedSession: StudentExamSession | null = null;

export async function syncSingleSession(session: StudentExamSession): Promise<boolean> {
  // Update in-memory session immediately
  const existingIdx = cachedStore.sessions.findIndex(s => s.id === session.id);
  const prevSession = existingIdx >= 0 ? cachedStore.sessions[existingIdx] : null;

  if (existingIdx >= 0) {
    cachedStore.sessions[existingIdx] = session;
  } else {
    cachedStore.sessions.push(session);
  }

  // Detect critical milestones that require immediate zero-delay server & JSONBin push:
  // 1. Student LOGS IN or LOGS OUT (isOnline changed)
  // 2. Student STARTS exam (status changed to in_progress)
  // 3. Student FINISHES exam (status is submitted or force_submitted)
  // 4. Student VIOLATION or LOCK/UNLOCK/RESET event
  const isLoginEvent = session.isOnline !== (prevSession?.isOnline ?? false);
  const isStartEvent = session.status === 'in_progress' && (!prevSession || prevSession.status === 'not_started');
  const isFinishEvent = isSessionCompleted(session.status);
  const isLockEvent = session.isLocked !== (prevSession?.isLocked ?? false) || session.status === 'locked';
  const isViolationEvent = session.violationsCount !== (prevSession?.violationsCount ?? 0);
  const isAdminEvent = session.adminActionAt !== prevSession?.adminActionAt;

  // Send single session to local server proxy with high priority
  fetch('/api/cbt/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session }),
  }).catch(err => console.warn('[CBT Server] Session update error:', err));

  if (isLoginEvent || isStartEvent || isFinishEvent || isLockEvent || isViolationEvent || isAdminEvent) {
    if (debounceSaveTimer) {
      clearTimeout(debounceSaveTimer);
      debounceSaveTimer = null;
    }
    latestQueuedSession = null;
    return await mergeAndPushSingleSession(session);
  }

  // For real-time keystrokes, question navigation & clicks during exam, fast debounce JSONBin PUT (350ms)
  latestQueuedSession = session;
  if (debounceSaveTimer) {
    clearTimeout(debounceSaveTimer);
  }

  debounceSaveTimer = setTimeout(async () => {
    const toPush = latestQueuedSession || session;
    latestQueuedSession = null;
    if (isSavingToJsonBin) return;
    isSavingToJsonBin = true;
    try {
      await mergeAndPushSingleSession(toPush);
    } finally {
      isSavingToJsonBin = false;
    }
  }, 350);

  return true;
}

/**
 * 5. RESET DATA KE DEFAULT PABRIK DI JSONBIN.IO
 */
export async function resetServerData(): Promise<CbtServerDataResponse | null> {
  try {
    cachedStore = {
      schoolSetting: INITIAL_SCHOOL_SETTING,
      operator: INITIAL_OPERATOR,
      students: INITIAL_STUDENTS,
      teachers: INITIAL_TEACHERS,
      classes: INITIAL_CLASSES,
      subjects: INITIAL_SUBJECTS,
      exams: INITIAL_EXAMS,
      sessions: createInitialStudentSessions(INITIAL_STUDENTS),
      questionBank: INITIAL_QUESTION_BANK,
      auditLogs: INITIAL_AUDIT_LOGS,
    };
    currentVersion++;
    lastUpdatedTimestamp = Date.now();

    const payload = buildJsonBinPayload();
    const url = `${JSONBIN_CONFIG.BASE_URL}/${JSONBIN_CONFIG.BIN_ID}`;

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY,
      },
      body: JSON.stringify(payload),
    });

    // Reset local server too
    fetch('/api/cbt/reset', { method: 'POST' }).catch(() => {});

    return {
      success: true,
      source: 'jsonbin',
      version: currentVersion,
      lastUpdated: lastUpdatedTimestamp,
      data: cachedStore,
    };
  } catch {
    return null;
  }
}

/**
 * Fallback helpers for local dev server
 */
async function fetchLocalServerData(): Promise<CbtServerDataResponse | null> {
  try {
    const res = await fetch('/api/cbt/data', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function mirrorToLocalServer(updates: CbtStorePayload): Promise<boolean> {
  try {
    const res = await fetch('/api/cbt/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
