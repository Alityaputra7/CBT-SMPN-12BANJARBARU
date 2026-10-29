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

export async function fetchServerData(): Promise<CbtServerDataResponse | null> {
  try {
    const res = await fetch('/api/cbt/data', {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    // Network or server unreachable, fallback to localStorage
    return null;
  }
}

export async function fetchServerVersion(): Promise<CbtServerVersionResponse | null> {
  try {
    const res = await fetch('/api/cbt/version', {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function syncServerUpdates(updates: CbtStorePayload): Promise<boolean> {
  try {
    const res = await fetch('/api/cbt/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates })
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function syncSingleSession(session: StudentExamSession): Promise<boolean> {
  try {
    const res = await fetch('/api/cbt/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session })
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function resetServerData(): Promise<CbtServerDataResponse | null> {
  try {
    const res = await fetch('/api/cbt/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
