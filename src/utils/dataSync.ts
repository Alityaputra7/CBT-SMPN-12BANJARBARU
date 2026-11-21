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
  LOGS: `${STORAGE_KEY_PREFIX}LOGS`,
  ACTIVE_STUDENT_AUTH: `${STORAGE_KEY_PREFIX}ACTIVE_STUDENT_AUTH`
};

export interface PersistedStudentSession {
  role: 'siswa';
  student_id: string;
  student_nis: string;
  student_name: string;
  class_id: string;
  class_name: string;
  active_exam_id: string;
  active_session_id: string;
  has_started: boolean;
  current_question_index?: number;
  time_remaining_seconds?: number;
  violations_count?: number;
  is_locked?: boolean;
  lock_count?: number;
  unlock_cooldown_until?: number | null;
  saved_at: number;
}

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
 * Load persisted active student login + exam state (survives browser refresh)
 */
export function loadPersistedStudentSession(): PersistedStudentSession | null {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT_AUTH) ||
      sessionStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT_AUTH);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedStudentSession>;
    if (
      parsed &&
      parsed.role === 'siswa' &&
      typeof parsed.student_nis === 'string' &&
      parsed.student_nis.trim().length > 0 &&
      typeof parsed.student_id === 'string' &&
      parsed.student_id.trim().length > 0
    ) {
      return {
        role: 'siswa',
        student_id: parsed.student_id,
        student_nis: parsed.student_nis,
        student_name: parsed.student_name || '',
        class_id: parsed.class_id || '',
        class_name: parsed.class_name || '',
        active_exam_id: parsed.active_exam_id || '',
        active_session_id: parsed.active_session_id || '',
        has_started: Boolean(parsed.has_started),
        current_question_index:
          typeof parsed.current_question_index === 'number' ? parsed.current_question_index : undefined,
        time_remaining_seconds:
          typeof parsed.time_remaining_seconds === 'number' ? parsed.time_remaining_seconds : undefined,
        violations_count:
          typeof parsed.violations_count === 'number' ? parsed.violations_count : undefined,
        is_locked: typeof parsed.is_locked === 'boolean' ? parsed.is_locked : undefined,
        lock_count:
          typeof parsed.lock_count === 'number' && Number.isFinite(parsed.lock_count)
            ? Math.max(0, Math.round(parsed.lock_count))
            : undefined,
        unlock_cooldown_until:
          typeof parsed.unlock_cooldown_until === 'number' &&
          Number.isFinite(parsed.unlock_cooldown_until) &&
          parsed.unlock_cooldown_until > 0
            ? Math.round(parsed.unlock_cooldown_until)
            : null,
        saved_at: typeof parsed.saved_at === 'number' ? parsed.saved_at : Date.now()
      };
    }
    return null;
  } catch (e) {
    console.warn('Gagal membaca sesi aktif siswa:', e);
    return null;
  }
}

/**
 * Save active student login + exam state to localStorage & sessionStorage
 */
export function savePersistedStudentSession(session: PersistedStudentSession): void {
  try {
    const serialized = JSON.stringify(session);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT_AUTH, serialized);
    sessionStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT_AUTH, serialized);
  } catch (e) {
    console.warn('Gagal menyimpan sesi aktif siswa:', e);
  }
}

/**
 * Clear ONLY the active exam pointer from the persisted student session while keeping
 * the student's login identity (`student_id`, `student_nis`, `student_name`, `class_name`)
 * intact so the student returns cleanly to the Exam Schedule List for session 2 without re-logging in.
 */
export function clearActiveExamFromPersistedStudentSession(): void {
  try {
    const existing = loadPersistedStudentSession();
    if (!existing) return;
    savePersistedStudentSession({
      ...existing,
      active_exam_id: '',
      active_session_id: '',
      has_started: false,
      current_question_index: 0,
      time_remaining_seconds: undefined,
      violations_count: 0,
      is_locked: false,
      lock_count: 0,
      unlock_cooldown_until: null,
      saved_at: Date.now(),
    });
  } catch (e) {
    console.warn('Gagal menghapus active_exam_id dari sesi siswa:', e);
  }
}

/**
 * Clear full student login + exam state (called ONLY on explicit Logout / Reset Pabrik)
 */
export function clearPersistedStudentSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_STUDENT_AUTH);
    sessionStorage.removeItem(STORAGE_KEYS.ACTIVE_STUDENT_AUTH);
  } catch (e) {
    console.warn('Gagal menghapus sesi aktif siswa:', e);
  }
}

/**
 * Synchronously flush a single student's latest exam session into STORAGE_KEYS.SESSIONS
 * keyed strictly by `(student_nis / studentId, examId)` so multiple exams never collide.
 */
export function flushSingleSessionToLocalStorage(session: StudentExamSession): void {
  try {
    const existing = loadFromStorage<StudentExamSession[]>(STORAGE_KEYS.SESSIONS, []);
    const cleanNis = (session.nis || '').trim();
    const idx = existing.findIndex(
      s =>
        ((cleanNis && (s.nis || '').trim() === cleanNis) || s.studentId === session.studentId) &&
        s.examId === session.examId
    );
    const updated =
      idx >= 0
        ? existing.map((s, i) => (i === idx ? session : s))
        : [...existing, session];
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
  } catch (e) {
    console.warn('Gagal menyimpan backup sesi ujian ke localStorage:', e);
  }
}

/**
 * Clear all persisted CBT storage keys
 */
export function clearCbtStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    sessionStorage.removeItem(STORAGE_KEYS.ACTIVE_STUDENT_AUTH);
  } catch (e) {
    console.warn('Gagal membersihkan localStorage:', e);
  }
}

/**
 * Synchronize student sessions: ensures each active student has a corresponding session record
 * while preserving every distinct `(student_nis, exam_id)` session across multi-exam schedules.
 */
export function syncStudentSessions(
  students: Student[],
  currentSessions: StudentExamSession[],
  primaryExam: ExamSchedule
): StudentExamSession[] {
  const sessionsByStudent = new Map<string, StudentExamSession[]>();
  currentSessions.forEach(s => {
    const list = sessionsByStudent.get(s.studentId) || [];
    list.push(s);
    sessionsByStudent.set(s.studentId, list);
  });

  const updatedSessions: StudentExamSession[] = [];
  students.forEach(std => {
    const existingList = sessionsByStudent.get(std.id);
    if (existingList && existingList.length > 0) {
      // Deduplicate strictly by examId so multiple exams per student are preserved cleanly
      const seenExamIds = new Set<string>();
      existingList.forEach(existing => {
        if (seenExamIds.has(existing.examId)) return;
        seenExamIds.add(existing.examId);
        updatedSessions.push({
          ...existing,
          studentName: std.name,
          nis: std.nis,
          classId: std.classId,
          className: std.className
        });
      });
      return;
    }

    // New student session auto-created with composite `${nis}_${examId}` ID
    updatedSessions.push({
      id: `${std.nis.trim()}_${primaryExam.id.trim()}`,
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
    });
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
