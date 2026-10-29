import { Student, StudentExamSession, ClassRoom, ExamSchedule, QuestionBank, UserAccount } from '../types/cbt';

const STORAGE_KEY_PREFIX = 'SMPN12_CBT_DATA_V1_';

export const STORAGE_KEYS = {
  OPERATOR: `${STORAGE_KEY_PREFIX}OPERATOR`,
  STUDENTS: `${STORAGE_KEY_PREFIX}STUDENTS`,
  TEACHERS: `${STORAGE_KEY_PREFIX}TEACHERS`,
  CLASSES: `${STORAGE_KEY_PREFIX}CLASSES`,
  SUBJECTS: `${STORAGE_KEY_PREFIX}SUBJECTS`,
  QUESTIONS: `${STORAGE_KEY_PREFIX}QUESTIONS`,
  EXAMS: `${STORAGE_KEY_PREFIX}EXAMS`,
  SESSIONS: `${STORAGE_KEY_PREFIX}SESSIONS`,
  SETTING: `${STORAGE_KEY_PREFIX}SETTING`,
  LOGS: `${STORAGE_KEY_PREFIX}LOGS`
};

/**
 * Safely load from localStorage with fallback
 */
export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Gagal memuat ${key} dari localStorage:`, e);
    return fallback;
  }
}

/**
 * Safely save to localStorage
 */
export function saveToStorage(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Gagal menyimpan ${key} ke localStorage:`, e);
  }
}

/**
 * Clear all persisted CBT storage keys
 */
export function clearCbtStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  } catch (e) {
    console.warn('Gagal membersihkan localStorage:', e);
  }
}

/**
 * Synchronize student sessions: ensures each active student has a corresponding session record
 */
export function syncStudentSessions(
  students: Student[],
  currentSessions: StudentExamSession[],
  primaryExam: ExamSchedule
): StudentExamSession[] {
  const sessionMap = new Map<string, StudentExamSession>();
  currentSessions.forEach(s => {
    sessionMap.set(s.studentId, s);
  });

  const updatedSessions: StudentExamSession[] = students.map((std, idx) => {
    const existing = sessionMap.get(std.id);
    if (existing) {
      // Sync student details if updated
      return {
        ...existing,
        studentName: std.name,
        nis: std.nis,
        classId: std.classId,
        className: std.className
      };
    }

    // New student session auto-created
    return {
      id: `sess-${std.id}`,
      studentId: std.id,
      studentName: std.name,
      nis: std.nis,
      classId: std.classId,
      className: std.className,
      examId: primaryExam.id,
      examTitle: primaryExam.title,
      status: 'not_started',
      timeRemainingSeconds: primaryExam.durationMinutes * 60,
      violationsCount: 0,
      isLocked: false,
      extraTimeMinutes: 0,
      deviceInfo: 'CBT Client Baru',
      isOnline: false,
      lastHeartbeat: Date.now(),
      answers: {},
      scorePg: 0,
      scoreEssay: 0,
      finalScore: 0,
      isPassed: false
    };
  });

  return updatedSessions;
}

/**
 * Synchronize classes with active student count
 */
export function syncClassRoomCounts(classes: ClassRoom[], students: Student[]): ClassRoom[] {
  return classes.map(cls => {
    const count = students.filter(s => s.classId === cls.id || s.className.toLowerCase() === cls.name.toLowerCase()).length;
    return {
      ...cls,
      totalStudents: count
    };
  });
}
