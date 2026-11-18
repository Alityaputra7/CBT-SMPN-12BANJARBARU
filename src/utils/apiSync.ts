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
  createInitialStudentSessions,
  reconcileOfficialTeachersAndSubjects
} from '../data/seedData';

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
  source: 'server' | 'local';
  version: number;
  lastUpdated: number;
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

let currentVersion = 1;
let lastUpdatedTimestamp = Date.now();

export function getLatestSyncMeta() {
  return {
    version: currentVersion,
    lastUpdated: lastUpdatedTimestamp,
  };
}

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

/**
 * 1. GET MASTER & SESSION SNAPSHOT FROM LOCAL SERVER (/api/cbt/data)
 * Digunakan sebagai fallback/master-config ketika endpoint Express lokal tersedia.
 * Sumber data sesi ujian utama tetap Supabase (Single Source of Truth).
 */
export async function fetchServerData(): Promise<CbtServerDataResponse | null> {
  try {
    const res = await fetch('/api/cbt/data', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.data) {
      const reconciled = reconcileOfficialTeachersAndSubjects(
        json.data.teachers,
        json.data.subjects
      );
      cachedStore = {
        ...cachedStore,
        ...json.data,
        teachers: reconciled.teachers,
        subjects: reconciled.subjects,
      };
      if (json.version) currentVersion = json.version;
      if (json.lastUpdated) lastUpdatedTimestamp = json.lastUpdated;
      return {
        success: true,
        source: 'server',
        version: currentVersion,
        lastUpdated: lastUpdatedTimestamp,
        data: cachedStore,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * 2. GET VERSION FROM LOCAL SERVER (/api/cbt/version)
 */
export async function fetchServerVersion(): Promise<CbtServerVersionResponse | null> {
  try {
    const res = await fetch('/api/cbt/version', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * 3. SYNC MASTER UPDATES TO LOCAL SERVER (/api/cbt/sync)
 */
export async function syncServerUpdates(updates: CbtStorePayload): Promise<CbtServerDataResponse | null> {
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

  currentVersion++;
  lastUpdatedTimestamp = Date.now();

  try {
    const res = await fetch('/api/cbt/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.version) currentVersion = json.version;
      if (json?.lastUpdated) lastUpdatedTimestamp = json.lastUpdated;
    }
  } catch {
    // Graceful no-op on static hosting without Express backend
  }

  return {
    success: true,
    source: 'server',
    version: currentVersion,
    lastUpdated: lastUpdatedTimestamp,
    data: cachedStore,
  };
}

/**
 * 4. MIRROR SINGLE SESSION TO LOCAL SERVER FALLBACK (/api/cbt/session)
 */
export async function syncSingleSession(session: StudentExamSession): Promise<boolean> {
  const existingIdx = cachedStore.sessions.findIndex(s => s.id === session.id);
  if (existingIdx >= 0) {
    cachedStore.sessions[existingIdx] = session;
  } else {
    cachedStore.sessions.push(session);
  }
  currentVersion++;
  lastUpdatedTimestamp = Date.now();

  try {
    const res = await fetch('/api/cbt/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session }),
    });
    return res.ok;
  } catch {
    return true;
  }
}

/**
 * 5. RESET MASTER DATA ON LOCAL SERVER (/api/cbt/reset)
 */
export async function resetServerData(): Promise<CbtServerDataResponse | null> {
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

  try {
    await fetch('/api/cbt/reset', { method: 'POST' });
  } catch {
    // Graceful no-op
  }

  return {
    success: true,
    source: 'server',
    version: currentVersion,
    lastUpdated: lastUpdatedTimestamp,
    data: cachedStore,
  };
}
