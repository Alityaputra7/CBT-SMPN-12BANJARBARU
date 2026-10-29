import { 
  SchoolSetting, 
  UserAccount, 
  Student, 
  ClassRoom, 
  Subject, 
  ExamSchedule, 
  StudentExamSession, 
  QuestionBank, 
  AuditLog 
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

/**
 * Helper to build an optimized payload for JSONBin (staying under the 100 KB free-tier limit).
 * Only active or modified student sessions are sent across the wire;
 * default empty sessions are regenerated deterministically from the student list.
 */
function buildJsonBinPayload() {
  const activeSessions = (cachedStore.sessions || []).filter(s => 
    s.status !== 'not_started' || 
    Object.keys(s.answers || {}).length > 0 || 
    s.isLocked || 
    s.finalScore > 0 ||
    s.violationsCount > 0
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
 * Reconstructs full 92 sessions by merging default template with active sessions from JSONBin
 */
function reconstructFullSessions(
  students: Student[], 
  activeSessions: StudentExamSession[] = [], 
  primaryExam: ExamSchedule
): StudentExamSession[] {
  const base = createInitialStudentSessions(students);
  const activeMap = new Map<string, StudentExamSession>();
  
  activeSessions.forEach(s => {
    // Key by studentId and examId
    activeMap.set(`${s.studentId}-${s.examId || primaryExam.id}`, s);
    activeMap.set(s.studentId, s);
  });

  return base.map(defaultSess => {
    const matched = activeMap.get(`${defaultSess.studentId}-${defaultSess.examId}`) || activeMap.get(defaultSess.studentId);
    return matched || defaultSess;
  });
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
    const record = json.record;

    if (!record) {
      return fetchLocalServerData();
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

    // Send PUT request to JSONBin.io immediately
    const payload = buildJsonBinPayload();
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
 * 4. SIMPAN SESI SISWA KE JSONBIN.IO
 * Menyimpan progres jawaban siswa secara real-time.
 */
export async function syncSingleSession(session: StudentExamSession): Promise<boolean> {
  // Update in-memory session immediately
  const existingIdx = cachedStore.sessions.findIndex(s => s.id === session.id);
  if (existingIdx >= 0) {
    cachedStore.sessions[existingIdx] = session;
  } else {
    cachedStore.sessions.push(session);
  }

  // If exam is submitted or forced, sync to JSONBin immediately without debounce
  if (session.status === 'submitted' || session.status === 'force_submitted') {
    return await syncServerUpdates({ sessions: cachedStore.sessions });
  }

  // For real-time keystrokes & clicks during exam, debounce JSONBin PUT (500ms) to respect rate limits
  if (debounceSaveTimer) {
    clearTimeout(debounceSaveTimer);
  }

  debounceSaveTimer = setTimeout(async () => {
    if (isSavingToJsonBin) return;
    isSavingToJsonBin = true;
    try {
      await syncServerUpdates({ sessions: cachedStore.sessions });
    } finally {
      isSavingToJsonBin = false;
    }
  }, 600);

  // Send single session to local server proxy in parallel
  fetch('/api/cbt/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session }),
  }).catch(() => {});

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
