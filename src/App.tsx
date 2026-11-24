import React, { useState, useEffect, useRef } from 'react';
import { 
  UserRole, 
  UserAccount, 
  Student, 
  StudentExamSession, 
  ViolationType,
  ExamSchedule, 
  QuestionBank, 
  ClassRoom, 
  Subject, 
  SchoolSetting, 
  AuditLog,
  ExamViolationLog,
  isSessionCompleted
} from './types/cbt';
import { 
  INITIAL_SCHOOL_SETTING, 
  INITIAL_OPERATOR, 
  INITIAL_TEACHERS, 
  INITIAL_CLASSES, 
  INITIAL_SUBJECTS, 
  INITIAL_STUDENTS, 
  INITIAL_QUESTION_BANK, 
  INITIAL_EXAMS, 
  INITIAL_AUDIT_LOGS,
  createInitialStudentSessions,
  reconcileOfficialTeachersAndSubjects,
  reconcileOfficialMathQuestions
} from './data/seedData';
import { 
  loadFromStorage, 
  saveToStorage, 
  STORAGE_KEYS, 
  syncStudentSessions, 
  syncClassRoomCounts, 
  clearCbtStorage,
  loadPersistedStudentSession,
  savePersistedStudentSession,
  clearActiveExamFromPersistedStudentSession,
  clearPersistedStudentSession
} from './utils/dataSync';
import { 
  fetchServerData, 
  fetchServerVersion, 
  syncServerUpdates, 
  syncSingleSession, 
  resetServerData,
  getLatestSyncMeta
} from './utils/apiSync';
import { isSupabaseConfigured } from './lib/supabaseClient';
import {
  fetchExamResultsWithStatusFromSupabase,
  fetchViolationLogsWithStatusFromSupabase,
  fetchStudentSessionStatusFromSupabase,
  fetchAllStudentSessionsFromSupabase,
  subscribeToExamSessionsRealtime,
  syncSessionProgressWithDetails,
  syncMultipleSessionsWithDetails,
  reconcileSessionsWithStudents,
  mergeActiveStudentSessionWithRemote,
  buildDeterministicSessionId,
  fetchExamSchedulesFromSupabase,
  upsertExamScheduleToSupabase,
  upsertMultipleExamSchedulesToSupabase,
  deleteExamScheduleFromSupabase,
  subscribeToExamSchedulesRealtime,
  getPendingSubmissions,
  flushPendingSubmissionsToSupabase,
  recordForcedLogoutToSupabase,
  submitExamToSupabase,
  calculateLogoutPenalty
} from './services/supabaseExamService';
import { isExamMatchingStudentClass, isQuestionMatchingClass } from './utils/classGroups';
import { getStudentSessionDeviceId, detectClientDeviceInfo } from './utils/sessionDevice';
import { validateExamSchedule } from './utils/scheduleValidator';
import { Navbar } from './components/layout/Navbar';
import { DatabaseSchemaViewer } from './components/erd/DatabaseSchemaViewer';
import { LoginModal } from './components/auth/LoginModal';
import { ChangePasswordModal } from './components/auth/ChangePasswordModal';
import { OperatorDashboard } from './components/operator/OperatorDashboard';
import { GuruDashboard } from './components/guru/GuruDashboard';
import { SiswaExamView } from './components/siswa/SiswaExamView';
import { SecurityAndDeployGuide } from './components/common/SecurityAndDeployGuide';
import { Database, Shield, BookOpen, Clock, Users, ArrowRight, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, WifiOff, X, LogOut } from 'lucide-react';

export default function App() {
  // App State with permanent local storage persistence
  const [schoolSetting, setSchoolSetting] = useState<SchoolSetting>(() => 
    loadFromStorage(STORAGE_KEYS.SETTING, INITIAL_SCHOOL_SETTING)
  );
  const [operator, setOperator] = useState<UserAccount>(() => 
    loadFromStorage(STORAGE_KEYS.OPERATOR, INITIAL_OPERATOR)
  );
  const [teachers, setTeachers] = useState<UserAccount[]>(() => {
    const loaded = loadFromStorage<UserAccount[] | null>(STORAGE_KEYS.TEACHERS, null);
    const loadedSubjects = loadFromStorage<Subject[] | null>(STORAGE_KEYS.SUBJECTS, null);
    if (!loaded || !Array.isArray(loaded) || loaded.length === 0) {
      return INITIAL_TEACHERS;
    }
    const reconciled = reconcileOfficialTeachersAndSubjects(loaded, loadedSubjects);
    if (reconciled.migrated) {
      saveToStorage(STORAGE_KEYS.TEACHERS, reconciled.teachers);
      saveToStorage(STORAGE_KEYS.SUBJECTS, reconciled.subjects);
    }
    return reconciled.teachers;
  });
  const [students, setStudents] = useState<Student[]>(() => {
    const loaded = loadFromStorage<Student[] | null>(STORAGE_KEYS.STUDENTS, null);
    if (!loaded || !Array.isArray(loaded) || loaded.length === 0) {
      return INITIAL_STUDENTS;
    }
    return loaded;
  });
  const [classes, setClasses] = useState<ClassRoom[]>(() => {
    const loadedClasses = loadFromStorage(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
    const initialStds = loadFromStorage(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
    return syncClassRoomCounts(loadedClasses, initialStds);
  });
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const loaded = loadFromStorage<Subject[] | null>(STORAGE_KEYS.SUBJECTS, null);
    const loadedTeachers = loadFromStorage<UserAccount[] | null>(STORAGE_KEYS.TEACHERS, null);
    if (!loaded || !Array.isArray(loaded) || loaded.length === 0) {
      return INITIAL_SUBJECTS;
    }
    return reconcileOfficialTeachersAndSubjects(loadedTeachers, loaded).subjects;
  });
  const [questionBank, setQuestionBank] = useState<QuestionBank>(() => {
    const loaded = loadFromStorage<QuestionBank | null>(STORAGE_KEYS.QUESTIONS, null);
    const loadedExams = loadFromStorage<ExamSchedule[] | null>(STORAGE_KEYS.EXAMS, null);
    if (!loaded || !Array.isArray(loaded.questions)) {
      return INITIAL_QUESTION_BANK;
    }
    return reconcileOfficialMathQuestions(loaded, loadedExams).questionBank;
  });
  const [exams, setExams] = useState<ExamSchedule[]>(() => {
    const loaded = loadFromStorage<ExamSchedule[] | null>(STORAGE_KEYS.EXAMS, null);
    const loadedBank = loadFromStorage<QuestionBank | null>(STORAGE_KEYS.QUESTIONS, null);
    if (loaded !== null && Array.isArray(loaded)) {
      return reconcileOfficialMathQuestions(loadedBank, loaded).exams;
    }
    return INITIAL_EXAMS;
  });
  // Read persisted active student session once for seamless auto-restore on page refresh
  const initialPersistedStudentRef = useRef(loadPersistedStudentSession());
  const resolvedInitialStudent: Student | null = (() => {
    const persisted = initialPersistedStudentRef.current;
    if (!persisted) return null;
    const matched = students.find(
      s => s.id === persisted.student_id || s.nis.trim() === persisted.student_nis.trim()
    );
    if (matched) return matched;
    return {
      id: persisted.student_id,
      nis: persisted.student_nis,
      name: persisted.student_name || persisted.student_nis,
      classId: persisted.class_id || 'cls-1',
      className: persisted.class_name || 'VII',
      gender: 'L'
    };
  })();

  const [selectedExamId, setSelectedExamId] = useState<string>(() => {
    const persistedExamId = initialPersistedStudentRef.current?.active_exam_id;
    if (persistedExamId) return persistedExamId;
    return exams[0]?.id || 'ex-mat-2026';
  });
  const [sessions, setSessions] = useState<StudentExamSession[]>(() => {
    const savedSessions = loadFromStorage<StudentExamSession[] | null>(STORAGE_KEYS.SESSIONS, null);
    const loadedStudents = loadFromStorage<Student[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
    const loadedExams = loadFromStorage<ExamSchedule[]>(STORAGE_KEYS.EXAMS, INITIAL_EXAMS);
    const baseSessions = savedSessions && savedSessions.length > 0 ? savedSessions : createInitialStudentSessions(loadedStudents);
    return syncStudentSessions(loadedStudents, baseSessions, loadedExams[0] || INITIAL_EXAMS[0]);
  });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => 
    loadFromStorage(STORAGE_KEYS.LOGS, INITIAL_AUDIT_LOGS)
  );
  const [violationLogs, setViolationLogs] = useState<ExamViolationLog[]>([]);
  const [realtimeStatus, setRealtimeStatus] = useState<string>(
    isSupabaseConfigured ? 'CONNECTING' : 'POLLING_3S'
  );

  // Auto-sync notification feedback & Supabase error banner
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => new Date().toLocaleTimeString('id-ID'));
  const [syncFeedbackMessage, setSyncFeedbackMessage] = useState<string | null>(null);
  const [supabaseSyncError, setSupabaseSyncError] = useState<string | null>(null);
  const [pendingSubmissionsCount, setPendingSubmissionsCount] = useState<number>(() => getPendingSubmissions().length);

  // Cross-device sync tracking (ensures mobile phones and laptops stay 100% in sync)
  const lastKnownVersion = useRef<number>(1);
  const lastKnownTimestamp = useRef<number>(0);
  const isSyncingFromServer = useRef<boolean>(false);

  // Authentication State (auto-restored from localStorage if student refreshed during active session)
  const [currentRole, setCurrentRole] = useState<UserRole | null>(() =>
    resolvedInitialStudent ? 'siswa' : null
  );
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(() => resolvedInitialStudent);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState<boolean>(false);

  const sessionsRef = useRef<StudentExamSession[]>(sessions);
  const currentRoleRef = useRef<UserRole | null>(currentRole);
  const currentStudentRef = useRef<Student | null>(currentStudent);
  const selectedExamIdRef = useRef<string>(selectedExamId);

  useEffect(() => {
    sessionsRef.current = sessions;
  }, [sessions]);

  useEffect(() => {
    currentRoleRef.current = currentRole;
    currentStudentRef.current = currentStudent;
  }, [currentRole, currentStudent]);

  useEffect(() => {
    selectedExamIdRef.current = selectedExamId;
  }, [selectedExamId]);

  const studentsRef = useRef<Student[]>(students);
  const examsRef = useRef<ExamSchedule[]>(exams);
  const hasRemoteSchedulesRef = useRef<boolean>(false);

  // Forced-logout confirmation modal state (blocks accidental/intentional mid-exam logout loophole)
  const [forcedLogoutTarget, setForcedLogoutTarget] = useState<{
    student: Student;
    session: StudentExamSession;
    exam: ExamSchedule;
    isDuringCooldown: boolean;
  } | null>(null);
  const [isProcessingForcedLogout, setIsProcessingForcedLogout] = useState<boolean>(false);

  const getQuestionsForStudentExam = (student: Student, targetExam: ExamSchedule) => {
    return questionBank.questions.filter(q => {
      const matchSubject =
        !targetExam.subjectId ||
        q.subjectId === targetExam.subjectId ||
        (targetExam.questionBankId && q.bankId === targetExam.questionBankId);
      const matchClass = isQuestionMatchingClass(q.classId, q.grade, student.classId);
      return matchSubject && matchClass;
    });
  };

  // Pick the most appropriate exam for a student:
  // 1) Ongoing in-progress exam -> 2) Active uncompleted & unlocked exam -> 3) Any uncompleted exam -> 4) Fallback
  const pickBestExamForStudent = (
    student: Student,
    availableExamsList: ExamSchedule[],
    allSessionsList: StudentExamSession[]
  ): ExamSchedule | undefined => {
    const eligible = availableExamsList.filter(ex =>
      isExamMatchingStudentClass(ex, student.classId, student.className)
    );
    const pool = eligible.length > 0 ? eligible : availableExamsList;
    if (pool.length === 0) return INITIAL_EXAMS[0];

    const findSess = (examId: string) =>
      allSessionsList.find(
        s =>
          ((s.nis && s.nis.trim() === student.nis.trim()) || s.studentId === student.id) &&
          s.examId === examId
      );

    // 1. Resume an active in-progress exam first
    const inProgress = pool.find(ex => {
      const s = findSess(ex.id);
      return s && s.status === 'in_progress' && !s.isLocked;
    });
    if (inProgress) return inProgress;

    // 2. Pick an active schedule today that has NOT been completed and is NOT locked (e.g. Session 2 after Session 1 finishes)
    const activeUncompleted = pool.find(ex => {
      const s = findSess(ex.id);
      const isDone = s ? isSessionCompleted(s.status) : false;
      const isLocked = s ? Boolean(s.isLocked || s.status === 'locked') : false;
      return validateExamSchedule(ex).canStart && !isDone && !isLocked;
    });
    if (activeUncompleted) return activeUncompleted;

    // 3. Pick any uncompleted, unlocked schedule
    const anyUncompleted = pool.find(ex => {
      const s = findSess(ex.id);
      const isDone = s ? isSessionCompleted(s.status) : false;
      const isLocked = s ? Boolean(s.isLocked || s.status === 'locked') : false;
      return !isDone && !isLocked;
    });
    if (anyUncompleted) return anyUncompleted;

    return pool[0];
  };

  // Helper to persist or clear active exam pointer in localStorage:
  // When an exam is completed, ONLY clear `active_exam_id` while preserving student login identity
  // so the student can immediately proceed to Session 2 without re-logging in.
  const persistStudentAuthState = (
    student: Student,
    examId: string,
    session?: StudentExamSession | null
  ) => {
    if (session && isSessionCompleted(session.status)) {
      clearActiveExamFromPersistedStudentSession();
      return;
    }
    const resolvedExamId = examId || session?.examId || selectedExamIdRef.current || '';
    const resolvedSessionId = resolvedExamId
      ? session?.id || buildDeterministicSessionId(student.nis, resolvedExamId)
      : '';
    savePersistedStudentSession({
      role: 'siswa',
      student_id: student.id,
      student_nis: student.nis,
      student_name: student.name,
      class_id: student.classId,
      class_name: student.className,
      active_exam_id: resolvedExamId,
      active_session_id: resolvedSessionId,
      has_started: Boolean(
        resolvedExamId &&
          session &&
          (session.status === 'in_progress' || session.isLocked || session.status === 'locked')
      ),
      current_question_index: session?.currentQuestionIndex ?? 0,
      time_remaining_seconds: session?.timeRemainingSeconds,
      violations_count: session?.violationsCount ?? 0,
      is_locked: Boolean(session?.isLocked || session?.status === 'locked'),
      lock_count: session?.lockCount ?? 0,
      logout_count: session?.logoutCount ?? 0,
      unlock_cooldown_until: session?.unlockCooldownUntil ?? null,
      saved_at: Date.now(),
    });
  };

  useEffect(() => {
    studentsRef.current = students;
  }, [students]);

  useEffect(() => {
    examsRef.current = exams;
  }, [exams]);

  // Apply authoritative schedules fetched from Supabase (overriding stale localStorage)
  const applyRemoteSchedules = (remoteSchedules: ExamSchedule[], preferredStudent?: Student | null) => {
    examsRef.current = remoteSchedules;
    setExams(remoteSchedules);
    saveToStorage(STORAGE_KEYS.EXAMS, remoteSchedules);

    const activeStudent = preferredStudent ?? currentStudentRef.current;
    setSelectedExamId(prevId => {
      if (remoteSchedules.length === 0) return '';
      if (activeStudent) {
        const eligible = remoteSchedules.filter(ex =>
          isExamMatchingStudentClass(ex, activeStudent.classId, activeStudent.className)
        );
        const existingEligible = eligible.find(e => e.id === prevId);
        const existingSess = existingEligible
          ? sessionsRef.current.find(
              s =>
                ((s.nis && s.nis.trim() === activeStudent.nis.trim()) || s.studentId === activeStudent.id) &&
                s.examId === existingEligible.id
            )
          : undefined;
        const isExistingDone = existingSess ? isSessionCompleted(existingSess.status) : false;

        // On student login, always favor an uncompleted active schedule (e.g. Session 2 if Session 1 is already completed)
        if (preferredStudent) {
          if (existingEligible && !isExistingDone && validateExamSchedule(existingEligible).canStart) {
            return existingEligible.id;
          }
          const best = pickBestExamForStudent(activeStudent, remoteSchedules, sessionsRef.current);
          if (best) return best.id;
        } else {
          if (existingEligible) return existingEligible.id;
          const best = pickBestExamForStudent(activeStudent, remoteSchedules, sessionsRef.current);
          if (best) return best.id;
        }
      }
      if (remoteSchedules.some(e => e.id === prevId)) return prevId;
      return remoteSchedules[0]?.id || '';
    });
  };

  // Explicit refresh of Exam Schedules directly from Supabase (public.cbt_exam_schedules)
  const handleRefreshSchedulesFromSupabase = async (options?: {
    silent?: boolean;
    forStudent?: Student | null;
  }): Promise<ExamSchedule[] | null> => {
    if (!isSupabaseConfigured) return null;

    const res = await fetchExamSchedulesFromSupabase();
    if (res.error) {
      if (!options?.silent) {
        setSupabaseSyncError(`Gagal memuat jadwal ujian dari Supabase: ${res.error}`);
      }
      return null;
    }

    if (res.schedules) {
      if (res.schedules.length > 0) {
        hasRemoteSchedulesRef.current = true;
        applyRemoteSchedules(res.schedules, options?.forStudent);
        if (!options?.silent) {
          setSupabaseSyncError(null);
        }
        setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
        return res.schedules;
      }
      if (hasRemoteSchedulesRef.current) {
        applyRemoteSchedules([], options?.forStudent);
        if (!options?.silent) {
          setSupabaseSyncError(null);
        }
        setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
        return [];
      }
    }

    return res.schedules;
  };

  // Explicit refresh from Supabase (used by Operator Monitor Real-Time, Auto-Sync 3s & Rekap Nilai)
  const handleRefreshFromSupabase = async () => {
    const [supSessionsRes, supLogsRes, supSchedulesRes, serverRes] = await Promise.all([
      isSupabaseConfigured ? fetchExamResultsWithStatusFromSupabase() : Promise.resolve({ sessions: null, error: undefined as string | undefined }),
      isSupabaseConfigured ? fetchViolationLogsWithStatusFromSupabase() : Promise.resolve({ logs: null, error: undefined as string | undefined }),
      isSupabaseConfigured ? fetchExamSchedulesFromSupabase() : Promise.resolve({ schedules: null, error: undefined as string | undefined }),
      isSupabaseConfigured ? Promise.resolve(null) : fetchServerData(),
    ]);

    if (isSupabaseConfigured && supSchedulesRes.schedules) {
      if (supSchedulesRes.schedules.length > 0) {
        hasRemoteSchedulesRef.current = true;
        applyRemoteSchedules(supSchedulesRes.schedules);
      } else if (hasRemoteSchedulesRef.current) {
        applyRemoteSchedules([]);
      }
    }

    const currentStudents = studentsRef.current;
    const defaultExam = examsRef.current[0] || INITIAL_EXAMS[0];
    let nextList = sessionsRef.current;

    if (isSupabaseConfigured && supSessionsRes.error) {
      setSupabaseSyncError(`Gagal membaca data dari Supabase: ${supSessionsRes.error}`);
    } else if (isSupabaseConfigured && supSessionsRes.sessions) {
      setSupabaseSyncError(null);
      nextList = reconcileSessionsWithStudents(
        currentStudents,
        supSessionsRes.sessions,
        defaultExam,
        sessionsRef.current,
        { isFullSnapshot: true }
      );
    } else if (serverRes?.success && serverRes.data?.sessions) {
      nextList = reconcileSessionsWithStudents(
        currentStudents,
        serverRes.data.sessions,
        defaultExam,
        sessionsRef.current
      );
    }

    sessionsRef.current = nextList;
    setSessions(nextList);
    saveToStorage(STORAGE_KEYS.SESSIONS, nextList);

    if (supLogsRes.logs) {
      setViolationLogs(supLogsRes.logs);
    }
    setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
  };

  // 1. Initial hydration from Supabase (SSoT) & local server master data on mount
  useEffect(() => {
    Promise.all([
      fetchServerData(),
      isSupabaseConfigured ? fetchExamResultsWithStatusFromSupabase() : Promise.resolve({ sessions: null, error: undefined as string | undefined }),
      isSupabaseConfigured ? fetchViolationLogsWithStatusFromSupabase() : Promise.resolve({ logs: null, error: undefined as string | undefined }),
      isSupabaseConfigured ? fetchExamSchedulesFromSupabase() : Promise.resolve({ schedules: null, error: undefined as string | undefined }),
    ]).then(([serverRes, supSessionsRes, supLogsRes, supSchedulesRes]) => {
      let currentStudentsList = studentsRef.current;
      let defaultExam = examsRef.current[0] || INITIAL_EXAMS[0];
      let baseSessions = sessionsRef.current;

      const hasSupabaseSchedules = Boolean(
        isSupabaseConfigured && supSchedulesRes.schedules && supSchedulesRes.schedules.length > 0
      );

      if (hasSupabaseSchedules && supSchedulesRes.schedules) {
        hasRemoteSchedulesRef.current = true;
        applyRemoteSchedules(supSchedulesRes.schedules);
        defaultExam = supSchedulesRes.schedules[0];
      }

      if (serverRes && serverRes.success && serverRes.data) {
        isSyncingFromServer.current = true;
        lastKnownVersion.current = serverRes.version;
        lastKnownTimestamp.current = serverRes.lastUpdated || Date.now();
        const d = serverRes.data;
        if (d.schoolSetting) setSchoolSetting(d.schoolSetting);
        if (d.operator) setOperator(d.operator);
        if (Array.isArray(d.students)) {
          setStudents(d.students);
          studentsRef.current = d.students;
          currentStudentsList = d.students;
        }
        if (Array.isArray(d.teachers) || Array.isArray(d.subjects)) {
          const reconciled = reconcileOfficialTeachersAndSubjects(d.teachers, d.subjects);
          setTeachers(reconciled.teachers);
          setSubjects(reconciled.subjects);
        }
        if (Array.isArray(d.classes)) setClasses(d.classes);
        // Never let local server fallback overwrite schedules fetched from Supabase
        if (!hasSupabaseSchedules && Array.isArray(d.exams) && d.exams.length > 0) {
          setExams(d.exams);
          examsRef.current = d.exams;
          defaultExam = d.exams[0];
        }
        if (!isSupabaseConfigured && Array.isArray(d.sessions)) {
          baseSessions = d.sessions;
        }
        if (d.questionBank) setQuestionBank(d.questionBank);
        if (Array.isArray(d.auditLogs)) setAuditLogs(d.auditLogs);
      }

      if (isSupabaseConfigured && supSessionsRes.error) {
        setSupabaseSyncError(`Gagal memuat data Supabase: ${supSessionsRes.error}`);
      } else if (isSupabaseConfigured && supSchedulesRes.error) {
        setSupabaseSyncError(`Gagal memuat jadwal ujian Supabase: ${supSchedulesRes.error}`);
      } else if (supSessionsRes.sessions || hasSupabaseSchedules) {
        setSupabaseSyncError(null);
      }

      let hydratedSessions = supSessionsRes.sessions
        ? reconcileSessionsWithStudents(currentStudentsList, supSessionsRes.sessions, defaultExam, baseSessions, { isFullSnapshot: true })
        : reconcileSessionsWithStudents(currentStudentsList, baseSessions, defaultExam, []);

      // If a student just refreshed mid-exam (or on the schedule list after Session 1 finished),
      // reconcile strictly for their active `(student_nis, active_exam_id)` without mixing exams.
      const activeStudentOnMount = currentStudentRef.current;
      if (currentRoleRef.current === 'siswa' && activeStudentOnMount) {
        const persistedOnMount = loadPersistedStudentSession();
        const persistedActiveExamId = persistedOnMount?.active_exam_id || '';

        if (!persistedActiveExamId) {
          // Student finished previous session & is on the Schedule List -> highlight next available exam
          const nextBest = pickBestExamForStudent(activeStudentOnMount, examsRef.current, hydratedSessions);
          if (nextBest) {
            setSelectedExamId(nextBest.id);
            selectedExamIdRef.current = nextBest.id;
          }
        } else {
          const activeExamId = persistedActiveExamId;
          const activeExamObj = examsRef.current.find(e => e.id === activeExamId) || defaultExam;
          const defaultDurationSec = (activeExamObj?.durationMinutes || 90) * 60;
          const localActive = baseSessions.find(
            s => (s.nis === activeStudentOnMount.nis || s.studentId === activeStudentOnMount.id) && s.examId === activeExamId
          );
          const remoteActive = supSessionsRes.sessions?.find(
            s => (s.nis === activeStudentOnMount.nis || s.studentId === activeStudentOnMount.id) && s.examId === activeExamId
          );

          if (localActive && remoteActive) {
            const mergedResult = mergeActiveStudentSessionWithRemote({
              local: localActive,
              remote: remoteActive,
              defaultDurationSec,
            });
            hydratedSessions = hydratedSessions.map(s =>
              (s.nis === activeStudentOnMount.nis || s.studentId === activeStudentOnMount.id) && s.examId === activeExamId
                ? mergedResult.session
                : s
            );
            if (mergedResult.isRemoteDone) {
              clearActiveExamFromPersistedStudentSession();
            } else {
              persistStudentAuthState(activeStudentOnMount, activeExamId, mergedResult.session);
            }
          } else if (localActive && !remoteActive && (localActive.status === 'in_progress' || localActive.isLocked)) {
            const existsInHydrated = hydratedSessions.some(
              s => (s.nis === activeStudentOnMount.nis || s.studentId === activeStudentOnMount.id) && s.examId === activeExamId
            );
            hydratedSessions = existsInHydrated
              ? hydratedSessions.map(s =>
                  (s.nis === activeStudentOnMount.nis || s.studentId === activeStudentOnMount.id) && s.examId === activeExamId
                    ? localActive
                    : s
                )
              : [...hydratedSessions, localActive];
            persistStudentAuthState(activeStudentOnMount, activeExamId, localActive);
          }
        }
      }

      sessionsRef.current = hydratedSessions;
      setSessions(hydratedSessions);
      saveToStorage(STORAGE_KEYS.SESSIONS, hydratedSessions);
      if (supLogsRes.logs) setViolationLogs(supLogsRes.logs);
      setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
      setTimeout(() => { isSyncingFromServer.current = false; }, 600);
    });
  }, []);

  // 1b. Supabase Realtime Channel Subscription for Operator & Guru Live Monitoring
  useEffect(() => {
    if (!isSupabaseConfigured || (currentRole !== 'operator' && currentRole !== 'guru')) {
      return;
    }

    void handleRefreshFromSupabase();

    const unsubscribe = subscribeToExamSessionsRealtime({
      onSessionUpsert: incomingSession => {
        setSessions(prev => {
          const next = reconcileSessionsWithStudents(
            studentsRef.current,
            [incomingSession],
            examsRef.current[0] || INITIAL_EXAMS[0],
            prev
          );
          sessionsRef.current = next;
          return next;
        });
        setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
      },
      onViolationInsert: newLog => {
        setViolationLogs(prev => [newLog, ...prev.filter(l => l.id !== newLog.id)].slice(0, 100));
        setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
      },
      onStatusChange: status => {
        setRealtimeStatus(status);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [currentRole]);

  // 1c. Global Supabase Realtime + 7s backup polling for Exam Schedules (Operator <-> Siswa live sync)
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const unsubscribeSchedules = subscribeToExamSchedulesRealtime({
      onChange: () => {
        void handleRefreshSchedulesFromSupabase({ silent: true });
      },
    });

    const schedulePollInterval = setInterval(() => {
      void handleRefreshSchedulesFromSupabase({ silent: true });
    }, 7000);

    return () => {
      unsubscribeSchedules();
      clearInterval(schedulePollInterval);
    };
  }, []);

  // 1d. Offline Submission Queue Auto-Sync (`cbt_pending_submissions`):
  // Listens to `window` online event AND polls every 5 seconds to automatically deliver queued exam submissions
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;
    const runPendingQueueFlush = async () => {
      if (cancelled) return;
      const queued = getPendingSubmissions();
      setPendingSubmissionsCount(queued.length);
      if (queued.length === 0) return;
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return;

      const res = await flushPendingSubmissionsToSupabase();
      if (cancelled) return;
      setPendingSubmissionsCount(res.remainingCount);

      if (res.syncedSessions.length > 0) {
        const merged = reconcileSessionsWithStudents(
          studentsRef.current,
          res.syncedSessions,
          examsRef.current[0] || INITIAL_EXAMS[0],
          sessionsRef.current
        );
        sessionsRef.current = merged;
        setSessions(merged);
        saveToStorage(STORAGE_KEYS.SESSIONS, merged);

        // If the currently logged-in student's active exam was just delivered, clear active_exam_id
        const activeStudent = currentStudentRef.current;
        if (activeStudent) {
          const matchedActive = res.syncedSessions.some(
            s =>
              (s.nis.trim() === activeStudent.nis.trim() || s.studentId === activeStudent.id) &&
              s.examId === selectedExamIdRef.current
          );
          if (matchedActive) {
            clearActiveExamFromPersistedStudentSession();
          }
        }

        clearSupabaseErrorNotification();
        triggerSyncNotification(
          `Koneksi pulih! ${res.syncedSessions.length} lembar jawaban tertunda berhasil dikirim otomatis ke server.`
        );
      }
    };

    const handleWindowOnline = () => {
      void runPendingQueueFlush();
    };

    window.addEventListener('online', handleWindowOnline);
    const queuePollInterval = setInterval(() => {
      void runPendingQueueFlush();
    }, 5000);

    // Run once on mount in case student reopened browser after offline submit
    void runPendingQueueFlush();

    return () => {
      cancelled = true;
      window.removeEventListener('online', handleWindowOnline);
      clearInterval(queuePollInterval);
    };
  }, []);

  // 2. Real-time Auto-Sync 3 Detik (Langsung dari Supabase SSoT saat aktif, fallback ke server lokal jika env belum diset)
  useEffect(() => {
    const syncInterval = setInterval(async () => {
      if (isSyncingFromServer.current) return;

      if (isSupabaseConfigured) {
        if (currentRoleRef.current === 'operator' || currentRoleRef.current === 'guru') {
          await handleRefreshFromSupabase();
        }
        return;
      }

      const verRes = await fetchServerVersion();
      if (
        verRes &&
        (verRes.version > lastKnownVersion.current ||
          (verRes.lastUpdated && verRes.lastUpdated > lastKnownTimestamp.current))
      ) {
        const fullRes = await fetchServerData();
        if (fullRes && fullRes.success && fullRes.data) {
          isSyncingFromServer.current = true;
          lastKnownVersion.current = fullRes.version;
          lastKnownTimestamp.current = fullRes.lastUpdated || Date.now();
          const d = fullRes.data;
          if (d.schoolSetting) setSchoolSetting(d.schoolSetting);
          if (d.operator) setOperator(d.operator);
          if (Array.isArray(d.students)) setStudents(d.students);
          if (Array.isArray(d.teachers) || Array.isArray(d.subjects)) {
            const reconciled = reconcileOfficialTeachersAndSubjects(d.teachers, d.subjects);
            setTeachers(reconciled.teachers);
            setSubjects(reconciled.subjects);
          }
          if (Array.isArray(d.classes)) setClasses(d.classes);
          if (Array.isArray(d.exams)) setExams(d.exams);
          if (Array.isArray(d.sessions)) {
            setSessions(prevSessions => {
              // Operator & Guru views always accept the authoritative server state directly
              // so phone/laptop clock differences never hide student 3x locks or submitted scores.
              if (currentRoleRef.current !== 'siswa') {
                sessionsRef.current = d.sessions;
                return d.sessions;
              }

              const activeStudentId = currentStudentRef.current?.id;
              const merged = d.sessions.map(remoteSess => {
                const localSess = prevSessions.find(p => p.id === remoteSess.id);
                if (!localSess || localSess.studentId !== activeStudentId) return remoteSess;

                // Authoritative Operator / Guru interventions always take effect immediately
                const adminActionOccurred = Boolean(
                  remoteSess.adminActionAt && remoteSess.adminActionAt !== localSess.adminActionAt
                );
                const operatorReset = localSess.status !== 'not_started' && remoteSess.status === 'not_started';
                const operatorUnlocked =
                  (localSess.isLocked || localSess.status === 'locked') &&
                  !remoteSess.isLocked &&
                  remoteSess.status !== 'locked';
                const operatorViolationReset =
                  localSess.violationsCount > 0 && remoteSess.violationsCount === 0 && !remoteSess.isLocked;
                const operatorForceSubmitted =
                  localSess.status !== 'force_submitted' && remoteSess.status === 'force_submitted';
                const operatorAddedTime = remoteSess.extraTimeMinutes > localSess.extraTimeMinutes;
                const operatorLoginReset =
                  localSess.isOnline && !remoteSess.isOnline && !remoteSess.deviceSessionId;

                if (
                  adminActionOccurred ||
                  operatorReset ||
                  operatorUnlocked ||
                  operatorViolationReset ||
                  operatorForceSubmitted ||
                  operatorAddedTime ||
                  operatorLoginReset
                ) {
                  if (operatorReset) {
                    return remoteSess;
                  }
                  return {
                    ...remoteSess,
                    answers: localSess.answers,
                  };
                }

                // Never overwrite active student's local answers via periodic polling
                if (localSess.status === 'in_progress' || localSess.isLocked) {
                  return localSess;
                }
                return remoteSess;
              });
              sessionsRef.current = merged;
              return merged;
            });
          }
          if (d.questionBank) setQuestionBank(d.questionBank);
          if (Array.isArray(d.auditLogs)) setAuditLogs(d.auditLogs);
          setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
          setTimeout(() => { isSyncingFromServer.current = false; }, 600);
        }
      }
    }, 3000);

    return () => clearInterval(syncInterval);
  }, []);

  // Navigation: 'overview' | 'operator' | 'guru' | 'siswa' | 'panduan' | 'login'
  // Auto-restore directly into 'siswa' exam view if an active student session is persisted
  const [activeSection, setActiveSection] = useState<string>(() =>
    resolvedInitialStudent ? 'siswa' : 'login'
  );

  // Persistence to localStorage: ensures ALL data remains saved across logout & page reload
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.OPERATOR, operator);
    saveToStorage(STORAGE_KEYS.STUDENTS, students);
    saveToStorage(STORAGE_KEYS.TEACHERS, teachers);
    saveToStorage(STORAGE_KEYS.CLASSES, classes);
    saveToStorage(STORAGE_KEYS.SUBJECTS, subjects);
    saveToStorage(STORAGE_KEYS.QUESTIONS, questionBank);
    saveToStorage(STORAGE_KEYS.EXAMS, exams);
    saveToStorage(STORAGE_KEYS.SESSIONS, sessions);
    saveToStorage(STORAGE_KEYS.SETTING, schoolSetting);
    saveToStorage(STORAGE_KEYS.LOGS, auditLogs);
  }, [operator, students, teachers, classes, subjects, questionBank, exams, sessions, schoolSetting, auditLogs]);

  // Active session map (only true when student genuinely has an active running exam)
  const activeSessionsMap: Record<string, boolean> = {};
  sessions.forEach(s => {
    if (s.isOnline && s.status === 'in_progress' && !s.isLocked) {
      activeSessionsMap[s.studentId] = true;
    }
  });

  const triggerSyncNotification = (msg: string) => {
    setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
    setSyncFeedbackMessage(msg);
    setTimeout(() => {
      setSyncFeedbackMessage(null);
    }, 4000);
  };

  const triggerSupabaseErrorNotification = (msg: string) => {
    setSupabaseSyncError(msg);
  };

  const clearSupabaseErrorNotification = () => {
    setSupabaseSyncError(null);
  };

  const handleAddAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userRole: currentRole || 'operator',
      userIdentifier: currentUser ? currentUser.usernameOrNip : (currentStudent ? currentStudent.nis : 'sistem'),
      action,
      details,
      ipAddress: '192.168.1.10',
      timestamp: new Date().toLocaleString('id-ID')
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Synchronized student updater: auto-updates classes count & auto-creates sessions for new students
  const handleUpdateStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
    // 1. Sync classes count
    const updatedClasses = syncClassRoomCounts(classes, newStudents);
    setClasses(updatedClasses);

    // 2. Sync sessions: ensure new students have active sessions
    const updatedSessions = syncStudentSessions(newStudents, sessions, exams[0] || INITIAL_EXAMS[0]);
    setSessions(updatedSessions);

    // Immediate storage flush
    saveToStorage(STORAGE_KEYS.STUDENTS, newStudents);
    saveToStorage(STORAGE_KEYS.CLASSES, updatedClasses);
    saveToStorage(STORAGE_KEYS.SESSIONS, updatedSessions);

    // Central server sync (ensures phone and laptop see identical data)
    syncServerUpdates({ students: newStudents, classes: updatedClasses, sessions: updatedSessions });

    triggerSyncNotification(`Data siswa berhasil disinkronkan (${newStudents.length} siswa terdaftar)`);
  };

  // Synchronized teacher updater
  const handleUpdateTeachers = (newTeachers: UserAccount[]) => {
    setTeachers(newTeachers);
    saveToStorage(STORAGE_KEYS.TEACHERS, newTeachers);
    syncServerUpdates({ teachers: newTeachers });
    triggerSyncNotification(`Data guru berhasil diperbarui (${newTeachers.length} guru aktif)`);
  };

  // Synchronized subject updater
  const handleUpdateSubjects = (newSubjects: Subject[]) => {
    setSubjects(newSubjects);
    saveToStorage(STORAGE_KEYS.SUBJECTS, newSubjects);
    syncServerUpdates({ subjects: newSubjects });
    triggerSyncNotification(`Data mata pelajaran diperbarui (${newSubjects.length} mapel terdaftar)`);
  };

  // Synchronized exams updater
  const handleUpdateExams = (newExams: ExamSchedule[], options?: { silentToast?: boolean }) => {
    examsRef.current = newExams;
    setExams(newExams);
    saveToStorage(STORAGE_KEYS.EXAMS, newExams);
    syncServerUpdates({ exams: newExams });

    // If active selected exam was deleted, fallback to first available
    if (!newExams.some(e => e.id === selectedExamId)) {
      setSelectedExamId(newExams[0]?.id || '');
    }

    // Auto-sync sessions for any new exam
    if (newExams.length > 0) {
      setSessions(prev => {
        let updated = [...prev];
        let hasNew = false;
        newExams.forEach(ex => {
          students.forEach(std => {
            const matchesClass = ex.targetClassIds.includes(std.classId) || ex.targetClassIds.length === 0;
            if (matchesClass) {
              const sessionExists = updated.some(s => s.studentId === std.id && s.examId === ex.id);
              if (!sessionExists) {
                hasNew = true;
                updated.push({
                  id: `sess-${std.id}-${ex.id}`,
                  studentId: std.id,
                  studentName: std.name,
                  nis: std.nis,
                  classId: std.classId,
                  className: std.className,
                  examId: ex.id,
                  examTitle: ex.title,
                  status: 'not_started',
                  timeRemainingSeconds: ex.durationMinutes * 60,
                  violationsCount: 0,
                  isLocked: false,
                  extraTimeMinutes: 0,
                  deviceInfo: 'CBT Siswa',
                  isOnline: false,
                  lastHeartbeat: Date.now(),
                  answers: {},
                  scorePg: 0,
                  scoreEssay: 0,
                  finalScore: 0,
                  isPassed: false
                });
              }
            }
          });
        });
        if (hasNew) {
          saveToStorage(STORAGE_KEYS.SESSIONS, updated);
          return updated;
        }
        return prev;
      });
    }

    if (!options?.silentToast) {
      triggerSyncNotification(`Jadwal ujian diperbarui (${newExams.length} jadwal aktif)`);
    }
  };

  // Persist add / edit / toggle-active exam schedule directly to Supabase (cbt_exam_schedules)
  const handleSaveExamSchedule = async (
    savedExam: ExamSchedule
  ): Promise<{ success: boolean; error?: string }> => {
    const currentList = examsRef.current;
    const exists = currentList.some(e => e.id === savedExam.id);
    const updatedExams = exists
      ? currentList.map(e => (e.id === savedExam.id ? savedExam : e))
      : [savedExam, ...currentList];

    if (isSupabaseConfigured) {
      const writeRes = !hasRemoteSchedulesRef.current
        ? await upsertMultipleExamSchedulesToSupabase(updatedExams)
        : await upsertExamScheduleToSupabase(savedExam);

      if (!writeRes.success && !writeRes.skipped) {
        const errMsg = writeRes.error || 'Gagal menyimpan jadwal ujian ke Supabase.';
        triggerSupabaseErrorNotification(`Gagal menyimpan jadwal ujian ke Supabase: ${errMsg}`);
        return { success: false, error: errMsg };
      }
      hasRemoteSchedulesRef.current = true;
      clearSupabaseErrorNotification();
    }

    handleUpdateExams(updatedExams, { silentToast: true });
    triggerSyncNotification(
      isSupabaseConfigured
        ? `Jadwal "${savedExam.title}" tersimpan permanen di Supabase & tersinkron ke perangkat siswa.`
        : `Jadwal "${savedExam.title}" berhasil diperbarui.`
    );
    return { success: true };
  };

  // Delete exam schedule directly from Supabase (cbt_exam_schedules)
  const handleDeleteExamSchedule = async (
    examId: string,
    title: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured) {
      const delRes = await deleteExamScheduleFromSupabase(examId);
      if (!delRes.success && !delRes.skipped) {
        const errMsg = delRes.error || 'Gagal menghapus jadwal ujian di Supabase.';
        triggerSupabaseErrorNotification(`Gagal menghapus jadwal ujian di Supabase: ${errMsg}`);
        return { success: false, error: errMsg };
      }
      hasRemoteSchedulesRef.current = true;
      clearSupabaseErrorNotification();
    }

    const updatedExams = examsRef.current.filter(e => e.id !== examId);
    handleUpdateExams(updatedExams, { silentToast: true });
    triggerSyncNotification(
      isSupabaseConfigured
        ? `Jadwal "${title}" berhasil dihapus dari Supabase.`
        : `Jadwal "${title}" berhasil dihapus.`
    );
    return { success: true };
  };

  // Synchronized setting updater
  const handleUpdateSetting = (newSetting: SchoolSetting) => {
    setSchoolSetting(newSetting);
    saveToStorage(STORAGE_KEYS.SETTING, newSetting);
    syncServerUpdates({ schoolSetting: newSetting });
    triggerSyncNotification('Pengaturan sekolah berhasil diperbarui');
  };

  const syncMetaFromClientPush = () => {
    const meta = getLatestSyncMeta();
    lastKnownVersion.current = meta.version;
    lastKnownTimestamp.current = meta.lastUpdated;
  };

  // Synchronized sessions updater
  const handleUpdateSessions = (newSessions: StudentExamSession[]) => {
    const prevMap = new Map(sessionsRef.current.map(s => [s.id, s]));
    const changed = newSessions.filter(s => prevMap.get(s.id) !== s);

    sessionsRef.current = newSessions;
    setSessions(newSessions);
    saveToStorage(STORAGE_KEYS.SESSIONS, newSessions);
    syncServerUpdates({ sessions: newSessions }).then(syncMetaFromClientPush);
    if (isSupabaseConfigured && changed.length > 0) {
      void syncMultipleSessionsWithDetails(changed).then(res => {
        if (!res.success && !res.skipped && res.error) {
          triggerSupabaseErrorNotification(`Gagal sinkronisasi sesi ke Supabase: ${res.error}`);
        } else if (res.success) {
          clearSupabaseErrorNotification();
        }
      });
    }
  };

  // Synchronized question bank updater: auto-updates exams and active questions
  const handleUpdateQuestionBank = (newBank: QuestionBank) => {
    setQuestionBank(newBank);
    saveToStorage(STORAGE_KEYS.QUESTIONS, newBank);

    // Sync all exams with new question count based on subject or questionBankId
    setExams(prev => {
      const updated = prev.map(ex => {
        const matchingQuestionsCount = newBank.questions.filter(q => 
          (ex.subjectId && q.subjectId === ex.subjectId) ||
          (ex.questionBankId && q.bankId === ex.questionBankId) ||
          (!ex.subjectId && !q.subjectId)
        ).length;

        return {
          ...ex,
          totalQuestions: matchingQuestionsCount > 0 ? matchingQuestionsCount : (newBank.questions.length > 0 ? matchingQuestionsCount : 0)
        };
      });
      saveToStorage(STORAGE_KEYS.EXAMS, updated);
      syncServerUpdates({ questionBank: newBank, exams: updated }).then(syncMetaFromClientPush);
      if (isSupabaseConfigured && hasRemoteSchedulesRef.current) {
        void upsertMultipleExamSchedulesToSupabase(updated);
      }
      return updated;
    });

    triggerSyncNotification(`Bank soal diperbarui (${newBank.questions.length} butir soal aktif). Data otomatis tersinkronisasi ke Cloud & ponsel!`);
  };

  // RESET EXAM RESULTS & VIOLATIONS / LOCK: Single student
  const handleResetSingleExamResult = (sessionId: string, reason?: string) => {
    const primaryExam = exams[0] || INITIAL_EXAMS[0];
    const currentList = sessionsRef.current;
    const targetSess = currentList.find(s => s.id === sessionId);
    const targetStudentName = targetSess?.studentName || sessionId;
    const targetStudentId = targetSess?.studentId;
    const actionTimestamp = Date.now();
    const touchedSessions: StudentExamSession[] = [];

    const updated = currentList.map(s => {
      if (s.id === sessionId) {
        const sessExam = exams.find(e => e.id === s.examId) || primaryExam;
        const resetSess: StudentExamSession = {
          ...s,
          status: 'not_started' as const,
          answers: {},
          scorePg: 0,
          scoreEssay: 0,
          finalScore: 0,
          isPassed: false,
          violationsCount: 0,
          isLocked: false,
          lockReason: undefined,
          lockCount: 0,
          logoutCount: 0,
          unlockCooldownUntil: undefined,
          submittedAt: undefined,
          timeRemainingSeconds: (sessExam?.durationMinutes || 90) * 60,
          extraTimeMinutes: 0,
          currentQuestionIndex: 0,
          isOnline: false,
          deviceSessionId: undefined,
          lastHeartbeat: actionTimestamp,
          adminActionAt: actionTimestamp,
          updatedAt: new Date(actionTimestamp).toISOString()
        };
        touchedSessions.push(resetSess);
        return resetSess;
      }
      // Clear any ghost online/locked device lock if this same student had an untouched/locked entry
      if (targetStudentId && s.studentId === targetStudentId && s.status === 'not_started') {
        const clearedSess: StudentExamSession = {
          ...s,
          isOnline: false,
          isLocked: false,
          lockCount: 0,
          logoutCount: 0,
          unlockCooldownUntil: undefined,
          violationsCount: 0,
          deviceSessionId: undefined,
          adminActionAt: actionTimestamp,
          updatedAt: new Date(actionTimestamp).toISOString()
        };
        touchedSessions.push(clearedSess);
        return clearedSess;
      }
      return s;
    });

    sessionsRef.current = updated;
    setSessions(updated);
    saveToStorage(STORAGE_KEYS.SESSIONS, updated);
    syncServerUpdates({ sessions: updated }).then(syncMetaFromClientPush);
    if (isSupabaseConfigured && touchedSessions.length > 0) {
      void syncMultipleSessionsWithDetails(touchedSessions).then(res => {
        if (!res.success && !res.skipped && res.error) {
          triggerSupabaseErrorNotification(`Gagal mereset sesi di Supabase: ${res.error}`);
        }
      });
    }

    handleAddAuditLog(
      'RESET_AKUN_HASIL_SISWA', 
      `Mereset akun, pelanggaran, dan hasil ulangan siswa ${targetStudentName}. Alasan: ${reason || 'Reset akun / remedial'}`
    );
    triggerSyncNotification(`Akun & hasil ${targetStudentName} berhasil direset (0 pelanggaran). Siswa dapat login & ujian ulang.`);
  };

  // RESET EXAM RESULTS: Batch (all students or per class)
  const handleResetAllExamResults = (targetClassId?: string, reason?: string) => {
    const primaryExam = exams[0] || INITIAL_EXAMS[0];
    const currentList = sessionsRef.current;
    const actionTimestamp = Date.now();
    let resetCount = 0;
    const touchedSessions: StudentExamSession[] = [];

    const updated = currentList.map(s => {
      if (!targetClassId || targetClassId === 'all' || s.classId === targetClassId) {
        resetCount++;
        const sessExam = exams.find(e => e.id === s.examId) || primaryExam;
        const resetSess: StudentExamSession = {
          ...s,
          status: 'not_started' as const,
          answers: {},
          scorePg: 0,
          scoreEssay: 0,
          finalScore: 0,
          isPassed: false,
          violationsCount: 0,
          isLocked: false,
          lockReason: undefined,
          lockCount: 0,
          logoutCount: 0,
          unlockCooldownUntil: undefined,
          submittedAt: undefined,
          timeRemainingSeconds: (sessExam?.durationMinutes || 90) * 60,
          extraTimeMinutes: 0,
          currentQuestionIndex: 0,
          isOnline: false,
          deviceSessionId: undefined,
          lastHeartbeat: actionTimestamp,
          adminActionAt: actionTimestamp,
          updatedAt: new Date(actionTimestamp).toISOString()
        };
        touchedSessions.push(resetSess);
        return resetSess;
      }
      return s;
    });

    sessionsRef.current = updated;
    setSessions(updated);
    saveToStorage(STORAGE_KEYS.SESSIONS, updated);
    syncServerUpdates({ sessions: updated }).then(syncMetaFromClientPush);
    if (isSupabaseConfigured && touchedSessions.length > 0) {
      void syncMultipleSessionsWithDetails(touchedSessions).then(res => {
        if (!res.success && !res.skipped && res.error) {
          triggerSupabaseErrorNotification(`Gagal reset massal di Supabase: ${res.error}`);
        }
      });
    }

    const scopeLabel = !targetClassId || targetClassId === 'all' 
      ? 'seluruh kelas' 
      : `kelas ${classes.find(c => c.id === targetClassId)?.name || targetClassId}`;

    handleAddAuditLog(
      'RESET_MASSAL_HASIL', 
      `Mereset hasil ulangan & pelanggaran ${scopeLabel} (${resetCount} siswa). Alasan: ${reason || 'Reset ujian massal'}`
    );
    triggerSyncNotification(`Hasil ulangan & pelanggaran untuk ${resetCount} siswa pada ${scopeLabel} berhasil direset.`);
  };

  // RESET LOGIN / SESI PERANGKAT ONLY (without wiping student's exam answers)
  const handleResetLoginSession = (sessionId: string, studentName: string) => {
    const actionTimestamp = Date.now();
    const currentList = sessionsRef.current;
    const targetStudentId = currentList.find(s => s.id === sessionId)?.studentId;
    let updatedTarget: StudentExamSession | null = null;

    const updated = currentList.map(s => {
      if (s.id === sessionId || (targetStudentId && s.studentId === targetStudentId && s.isOnline)) {
        const nextSess: StudentExamSession = {
          ...s,
          isOnline: false,
          deviceSessionId: undefined,
          deviceInfo: 'Login Direset Operator',
          lastHeartbeat: actionTimestamp,
          adminActionAt: actionTimestamp,
          updatedAt: new Date(actionTimestamp).toISOString()
        };
        if (s.id === sessionId) updatedTarget = nextSess;
        return nextSess;
      }
      return s;
    });

    sessionsRef.current = updated;
    setSessions(updated);
    saveToStorage(STORAGE_KEYS.SESSIONS, updated);
    syncServerUpdates({ sessions: updated }).then(syncMetaFromClientPush);

    if (updatedTarget) {
      syncSingleSession(updatedTarget).then(syncMetaFromClientPush);
      if (isSupabaseConfigured) {
        void syncSessionProgressWithDetails(updatedTarget).then(res => {
          if (!res.success && !res.skipped && res.error) {
            triggerSupabaseErrorNotification(`Gagal mereset login perangkat di Supabase: ${res.error}`);
          }
        });
      }
    }

    handleAddAuditLog('RESET_LOGIN_SESI', `Mereset sesi login perangkat untuk ${studentName} (jawaban tetap aman)`);
    triggerSyncNotification(`Sesi login ${studentName} telah direset. Siswa dapat masuk kembali dari perangkat baru.`);
  };

  // Restore factory data back to 93 official students & 9 official teachers
  const handleRestoreFactoryData = () => {
    if (confirm('Pulihkan seluruh basis data ke kondisi awal pabrik resmi SMP Negeri 12 Banjarbaru? Seluruh data 93 siswa resmi dan 9 guru resmi akan dimuat kembali.')) {
      clearCbtStorage();
      clearPersistedStudentSession();
      resetServerData();
      const freshSessions = createInitialStudentSessions(INITIAL_STUDENTS);
      sessionsRef.current = freshSessions;
      setStudents(INITIAL_STUDENTS);
      setTeachers(INITIAL_TEACHERS);
      setClasses(INITIAL_CLASSES);
      setSubjects(INITIAL_SUBJECTS);
      setQuestionBank(INITIAL_QUESTION_BANK);
      setExams(INITIAL_EXAMS);
      setSessions(freshSessions);
      setAuditLogs(INITIAL_AUDIT_LOGS);
      setSchoolSetting(INITIAL_SCHOOL_SETTING);
      handleAddAuditLog('PULIHKAN_DATA_PABRIK', 'Mengembalikan database CBT ke data master resmi SMPN 12 Banjarbaru');
      triggerSyncNotification('Data master SMPN 12 Banjarbaru berhasil dipulihkan.');
    }
  };

  const handleLoginSuccess = (
    role: UserRole, 
    account: UserAccount | null, 
    student: Student | null
  ) => {
    setCurrentRole(role);
    setCurrentUser(account);
    setCurrentStudent(student);
    currentRoleRef.current = role;
    currentStudentRef.current = student;

    if (role === 'operator') {
      if (account?.mustChangePassword) {
        setShowPasswordChangeModal(true);
      }
      setActiveSection('operator');
      handleAddAuditLog('LOGIN_OPERATOR', 'Operator berhasil login ke sistem');
    } else if (role === 'guru') {
      setActiveSection('guru');
      handleAddAuditLog('LOGIN_GURU', `Guru ${account?.name} berhasil login`);
    } else if (role === 'siswa' && student) {
      // Pick the best uncompleted/active exam for this student's class (never trapping on an already completed exam)
      const targetExam =
        pickBestExamForStudent(student, examsRef.current, sessionsRef.current) ||
        examsRef.current[0] ||
        INITIAL_EXAMS[0];
      const targetExamId = targetExam?.id || 'ex-mat-2026';
      setSelectedExamId(targetExamId);
      selectedExamIdRef.current = targetExamId;

      const deterministicId = buildDeterministicSessionId(student.nis, targetExamId);
      const deviceSessionId = getStudentSessionDeviceId(student.nis);
      const clientInfo = detectClientDeviceInfo();
      const currentList = sessionsRef.current;

      // 1. Exact match strictly by (NIS / student.id, targetExamId)
      const exactIdx = currentList.findIndex(
        s => (s.nis === student.nis || s.studentId === student.id) && s.examId === targetExamId
      );
      // 2. Otherwise repurpose ONLY an untouched not_started placeholder (never touch a completed or locked exam!)
      const idlePlaceholderIdx = exactIdx >= 0
        ? -1
        : currentList.findIndex(
            s =>
              (s.nis === student.nis || s.studentId === student.id) &&
              s.status === 'not_started' &&
              Object.keys(s.answers || {}).length === 0 &&
              s.violationsCount === 0 &&
              !s.isLocked
          );

      let syncedSession: StudentExamSession;
      let updatedList: StudentExamSession[];

      if (exactIdx >= 0) {
        const existing = currentList[exactIdx];
        const isExistingDone = isSessionCompleted(existing.status);
        let enforcedCooldownUntil = existing.unlockCooldownUntil;
        let enforcedLockReason = existing.lockReason;
        if (!isExistingDone && !existing.isLocked && existing.status === 'in_progress' && (existing.logoutCount || 0) >= 1 && (existing.logoutCount || 0) < 3) {
          const wasEscalated = Boolean(existing.lockReason?.includes('Masa Tunggu') || existing.lockReason?.includes('7 Menit'));
          const pen = calculateLogoutPenalty(existing.logoutCount, wasEscalated);
          enforcedCooldownUntil = Math.max(existing.unlockCooldownUntil || 0, Date.now() + pen.penaltySeconds * 1000);
          enforcedLockReason = wasEscalated
            ? `Sanksi Logout ke-${pen.logoutCount} Saat Masa Tunggu (Tunggu 7 Menit)`
            : `Sanksi Logout ke-${pen.logoutCount} (Tunggu ${pen.penaltyMinutes} Menit)`;
        }
        syncedSession = isExistingDone
          ? existing
          : {
              ...existing,
              id: deterministicId,
              examId: targetExamId,
              examTitle: targetExam?.title || existing.examTitle,
              unlockCooldownUntil: enforcedCooldownUntil,
              lockReason: enforcedLockReason,
              isOnline: true,
              deviceSessionId,
              deviceInfo: clientInfo,
              lastHeartbeat: Date.now()
            };
        updatedList = currentList.map((s, idx) => (idx === exactIdx ? syncedSession : s));
      } else if (idlePlaceholderIdx >= 0) {
        const placeholder = currentList[idlePlaceholderIdx];
        syncedSession = {
          ...placeholder,
          id: deterministicId,
          examId: targetExamId,
          examTitle: targetExam?.title || placeholder.examTitle,
          timeRemainingSeconds: (targetExam?.durationMinutes || 90) * 60,
          isOnline: true,
          deviceSessionId,
          deviceInfo: clientInfo,
          lastHeartbeat: Date.now()
        };
        updatedList = currentList.map((s, idx) => (idx === idlePlaceholderIdx ? syncedSession : s));
      } else {
        syncedSession = {
          id: deterministicId,
          studentId: student.id,
          studentName: student.name,
          nis: student.nis,
          classId: student.classId,
          className: student.className,
          examId: targetExamId,
          examTitle: targetExam?.title || 'Ujian CBT',
          status: 'not_started',
          timeRemainingSeconds: (targetExam?.durationMinutes || 90) * 60,
          violationsCount: 0,
          isLocked: false,
          extraTimeMinutes: 0,
          deviceInfo: clientInfo,
          deviceSessionId,
          currentQuestionIndex: 0,
          isOnline: true,
          lastHeartbeat: Date.now(),
          answers: {},
          scorePg: 0,
          scoreEssay: 0,
          finalScore: 0,
          isPassed: false
        };
        updatedList = [...currentList, syncedSession];
      }

      sessionsRef.current = updatedList;
      setSessions(updatedList);
      saveToStorage(STORAGE_KEYS.SESSIONS, updatedList);
      // Persist student login identity + active exam pointer (clears active_exam_id if completed)
      if (isSessionCompleted(syncedSession.status)) {
        savePersistedStudentSession({
          role: 'siswa',
          student_id: student.id,
          student_nis: student.nis,
          student_name: student.name,
          class_id: student.classId,
          class_name: student.className,
          active_exam_id: '',
          active_session_id: '',
          has_started: false,
          saved_at: Date.now(),
        });
      } else {
        persistStudentAuthState(student, targetExamId, syncedSession);
      }
      if (!isSessionCompleted(syncedSession.status)) {
        syncSingleSession(syncedSession).then(syncMetaFromClientPush);
      }

      if (isSupabaseConfigured) {
        // Fetch fresh schedules + ALL existing sessions for this student NIS across all exam_ids
        void Promise.all([
          handleRefreshSchedulesFromSupabase({ silent: true, forStudent: student }),
          fetchAllStudentSessionsFromSupabase(student.nis),
        ]).then(async ([latestSchedules, allRemoteRes]) => {
          const effectiveSchedules =
            latestSchedules && latestSchedules.length > 0 ? latestSchedules : examsRef.current;

          if (allRemoteRes.error) {
            triggerSupabaseErrorNotification(
              `Gagal sinkronisasi status login ke Supabase: ${allRemoteRes.error}`
            );
            return;
          }

          let latestSessions = sessionsRef.current;
          if (allRemoteRes.sessions && allRemoteRes.sessions.length > 0) {
            latestSessions = reconcileSessionsWithStudents(
              studentsRef.current,
              allRemoteRes.sessions,
              effectiveSchedules[0] || INITIAL_EXAMS[0],
              sessionsRef.current
            );
            sessionsRef.current = latestSessions;
            setSessions(latestSessions);
            saveToStorage(STORAGE_KEYS.SESSIONS, latestSessions);
          }

          // Re-evaluate best exam now that we know which exams are already completed in Supabase
          const bestExam =
            pickBestExamForStudent(student, effectiveSchedules, latestSessions) || targetExam;
          const bestExamId = bestExam?.id || targetExamId;
          setSelectedExamId(bestExamId);
          selectedExamIdRef.current = bestExamId;

          const existingBest = latestSessions.find(
            s =>
              ((s.nis && s.nis.trim() === student.nis.trim()) || s.studentId === student.id) &&
              s.examId === bestExamId
          );
          const isBestDone = existingBest ? isSessionCompleted(existingBest.status) : false;

          if (isBestDone) {
            // All eligible exams are completed — keep student identity on schedule list
            savePersistedStudentSession({
              role: 'siswa',
              student_id: student.id,
              student_nis: student.nis,
              student_name: student.name,
              class_id: student.classId,
              class_name: student.className,
              active_exam_id: '',
              active_session_id: '',
              has_started: false,
              saved_at: Date.now(),
            });
            clearSupabaseErrorNotification();
            return;
          }

          const bestDetId = buildDeterministicSessionId(student.nis, bestExamId);
          const defaultDurationSec = (bestExam?.durationMinutes || 90) * 60;
          const nowLoginMs = Date.now();

          // ENFORCE FORCED-LOGOUT PROGRESSIVE PENALTY ON RE-LOGIN:
          // - logout_count >= 3 & still in_progress -> Immediate Auto-Submit!
          // - logout_count === 1 -> Enforce 5-minute cooldown (or 7m if previously escalated during cooldown)
          // - logout_count === 2 -> Enforce 7-minute cooldown
          if (
            existingBest &&
            existingBest.status === 'in_progress' &&
            !existingBest.isLocked &&
            (existingBest.logoutCount || 0) >= 3 &&
            bestExam
          ) {
            const autoReason =
              'Auto-Submit: Mencapai batas 3x keluar akun (logout) saat ujian berlangsung';
            const examQuestions = getQuestionsForStudentExam(student, bestExam);
            const autoRes = await submitExamToSupabase({
              session: {
                ...existingBest,
                id: bestDetId,
                examId: bestExamId,
                examTitle: bestExam.title,
                lockReason: autoReason,
              },
              questions: examQuestions,
              exam: bestExam,
              forcedStatus: 'completed',
              customLockReason: autoReason,
            });
            const mergedAuto = reconcileSessionsWithStudents(
              studentsRef.current,
              [autoRes.session],
              effectiveSchedules[0] || INITIAL_EXAMS[0],
              sessionsRef.current
            );
            sessionsRef.current = mergedAuto;
            setSessions(mergedAuto);
            saveToStorage(STORAGE_KEYS.SESSIONS, mergedAuto);
            clearActiveExamFromPersistedStudentSession();
            handleAddAuditLog(
              'AUTO_SUBMIT_3X_LOGOUT',
              `Ujian ${bestExam.subjectName} siswa ${student.name} dikumpulkan otomatis saat login kembali karena mencapai 3x keluar akun.`
            );
            return;
          }

          let enforcedCooldownUntil = existingBest?.unlockCooldownUntil;
          let enforcedLockReason = existingBest?.lockReason;
          if (
            existingBest &&
            existingBest.status === 'in_progress' &&
            !existingBest.isLocked &&
            (existingBest.logoutCount || 0) >= 1
          ) {
            const wasEscalated = Boolean(
              existingBest.lockReason?.includes('Masa Tunggu') ||
                existingBest.lockReason?.includes('7 Menit')
            );
            const pen = calculateLogoutPenalty(existingBest.logoutCount, wasEscalated);
            enforcedCooldownUntil = Math.max(
              existingBest.unlockCooldownUntil || 0,
              nowLoginMs + pen.penaltySeconds * 1000
            );
            enforcedLockReason = wasEscalated
              ? `Sanksi Logout ke-${pen.logoutCount} Saat Masa Tunggu (Tunggu 7 Menit)`
              : `Sanksi Logout ke-${pen.logoutCount} (Tunggu ${pen.penaltyMinutes} Menit)`;
          }

          const hydratedBest: StudentExamSession = existingBest
            ? {
                ...existingBest,
                id: bestDetId,
                examId: bestExamId,
                examTitle: bestExam?.title || existingBest.examTitle,
                unlockCooldownUntil: enforcedCooldownUntil,
                lockReason: enforcedLockReason,
                isOnline: !existingBest.isLocked,
                deviceSessionId: existingBest.isLocked ? undefined : deviceSessionId,
                deviceInfo: clientInfo,
                lastHeartbeat: nowLoginMs,
                adminActionAt: enforcedCooldownUntil ? nowLoginMs : existingBest.adminActionAt,
              }
            : {
                id: bestDetId,
                studentId: student.id,
                studentName: student.name,
                nis: student.nis,
                classId: student.classId,
                className: student.className,
                examId: bestExamId,
                examTitle: bestExam?.title || 'Ujian CBT',
                status: 'not_started',
                timeRemainingSeconds: defaultDurationSec,
                violationsCount: 0,
                isLocked: false,
                lockCount: 0,
                logoutCount: 0,
                extraTimeMinutes: 0,
                deviceInfo: clientInfo,
                deviceSessionId,
                currentQuestionIndex: 0,
                isOnline: true,
                lastHeartbeat: nowLoginMs,
                answers: {},
                scorePg: 0,
                scoreEssay: 0,
                finalScore: 0,
                isPassed: false,
              };

          const merged = reconcileSessionsWithStudents(
            studentsRef.current,
            [hydratedBest],
            effectiveSchedules[0] || INITIAL_EXAMS[0],
            sessionsRef.current
          );
          sessionsRef.current = merged;
          setSessions(merged);
          saveToStorage(STORAGE_KEYS.SESSIONS, merged);
          persistStudentAuthState(student, bestExamId, hydratedBest);

          if (!hydratedBest.isLocked) {
            const writeRes = await syncSessionProgressWithDetails(hydratedBest);
            if (!writeRes.success && !writeRes.skipped && writeRes.error) {
              triggerSupabaseErrorNotification(
                `Gagal memperbarui status login di Supabase: ${writeRes.error}`
              );
            } else if (writeRes.success) {
              clearSupabaseErrorNotification();
            }
          }
        });
      }

      setActiveSection('siswa');
      handleAddAuditLog('LOGIN_SISWA', `Siswa ${student.name} (NIS ${student.nis}) masuk dari ${clientInfo}`);
    }
  };

  // Final logout executor (after optional forced-logout penalty has been recorded)
  const executeLogout = (skipOnlineUpdate = false) => {
    if (!skipOnlineUpdate && currentRole === 'siswa' && currentStudent) {
      const currentList = sessionsRef.current;
      const modifiedSessions: StudentExamSession[] = [];
      const updated = currentList.map(s => {
        if (s.studentId === currentStudent.id && (s.isOnline || s.deviceSessionId)) {
          const nextSess: StudentExamSession = {
            ...s,
            isOnline: false,
            deviceSessionId: s.status === 'in_progress' || s.isLocked ? s.deviceSessionId : undefined,
            lastHeartbeat: Date.now()
          };
          modifiedSessions.push(nextSess);
          return nextSess;
        }
        return s;
      });
      sessionsRef.current = updated;
      setSessions(updated);
      saveToStorage(STORAGE_KEYS.SESSIONS, updated);
      if (modifiedSessions[0]) {
        syncSingleSession(modifiedSessions[0]).then(syncMetaFromClientPush);
      }
    }

    // Explicitly guarantee all master data & latest edits remain saved in localStorage
    saveToStorage(STORAGE_KEYS.OPERATOR, operator);
    saveToStorage(STORAGE_KEYS.STUDENTS, students);
    saveToStorage(STORAGE_KEYS.TEACHERS, teachers);
    saveToStorage(STORAGE_KEYS.CLASSES, classes);
    saveToStorage(STORAGE_KEYS.SUBJECTS, subjects);
    saveToStorage(STORAGE_KEYS.QUESTIONS, questionBank);
    saveToStorage(STORAGE_KEYS.EXAMS, exams);
    saveToStorage(STORAGE_KEYS.SESSIONS, sessionsRef.current);
    saveToStorage(STORAGE_KEYS.SETTING, schoolSetting);
    saveToStorage(STORAGE_KEYS.LOGS, auditLogs);

    // Clear persisted student auth/exam session ONLY on explicit Logout
    clearPersistedStudentSession();

    setForcedLogoutTarget(null);
    setIsProcessingForcedLogout(false);
    currentRoleRef.current = null;
    currentStudentRef.current = null;
    setCurrentRole(null);
    setCurrentUser(null);
    setCurrentStudent(null);
    setActiveSection('login');
  };

  // Guarded Logout entry point: intercepts mid-exam logout with mandatory warning modal & penalty tracking
  const handleLogout = () => {
    if (currentRole === 'siswa' && currentStudent) {
      const storedSessions = loadFromStorage<StudentExamSession[]>(STORAGE_KEYS.SESSIONS, []);
      const findInProgress = (list: StudentExamSession[]) =>
        list.find(
          s =>
            ((s.nis && s.nis.trim() === currentStudent.nis.trim()) || s.studentId === currentStudent.id) &&
            s.examId === selectedExamIdRef.current &&
            s.status === 'in_progress' &&
            !s.isLocked
        ) ||
        list.find(
          s =>
            ((s.nis && s.nis.trim() === currentStudent.nis.trim()) || s.studentId === currentStudent.id) &&
            s.status === 'in_progress' &&
            !s.isLocked
        );

      const memActive = findInProgress(sessionsRef.current);
      const storageActive = findInProgress(storedSessions);
      const activeSess = memActive || storageActive;

      if (activeSess && !isSessionCompleted(activeSess.status)) {
        // Merge the freshest locally saved answers (including debounced essay edits) before logout
        const mergedAnswers = {
          ...(memActive?.answers || {}),
          ...(storageActive?.answers || {}),
        };
        const freshestSession: StudentExamSession = {
          ...activeSess,
          answers: Object.keys(mergedAnswers).length > 0 ? mergedAnswers : activeSess.answers,
          logoutCount: Math.max(memActive?.logoutCount || 0, storageActive?.logoutCount || 0),
          unlockCooldownUntil:
            Math.max(memActive?.unlockCooldownUntil || 0, storageActive?.unlockCooldownUntil || 0) ||
            undefined,
        };
        const matchedExam =
          examsRef.current.find(e => e.id === freshestSession.examId) ||
          examsRef.current[0] ||
          INITIAL_EXAMS[0];
        const isDuringCooldown = Boolean(
          freshestSession.unlockCooldownUntil && freshestSession.unlockCooldownUntil > Date.now()
        );

        setForcedLogoutTarget({
          student: currentStudent,
          session: freshestSession,
          exam: matchedExam,
          isDuringCooldown,
        });
        return;
      }
    }

    executeLogout(false);
  };

  const handleConfirmForcedLogout = async () => {
    if (!forcedLogoutTarget || isProcessingForcedLogout) return;
    setIsProcessingForcedLogout(true);
    try {
      const { student, session: targetSess, exam: targetExam, isDuringCooldown } = forcedLogoutTarget;
      const examQuestions = getQuestionsForStudentExam(student, targetExam);
      const res = await recordForcedLogoutToSupabase({
        session: targetSess,
        questions: examQuestions,
        exam: targetExam,
        isDuringCooldown,
      });

      const updated = sessionsRef.current.map(s =>
        s.id === res.session.id ||
        (((s.nis && s.nis.trim() === student.nis.trim()) || s.studentId === student.id) &&
          s.examId === targetExam.id)
          ? res.session
          : s
      );
      const hasMatch = updated.some(s => s.id === res.session.id);
      const finalList = hasMatch ? updated : [...updated, res.session];
      sessionsRef.current = finalList;
      setSessions(finalList);
      saveToStorage(STORAGE_KEYS.SESSIONS, finalList);

      if (!res.success && res.error) {
        triggerSupabaseErrorNotification(
          `Sanksi logout tercatat lokal, namun sinkronisasi Supabase bermasalah: ${res.error}`
        );
      }

      if (res.autoSubmitted) {
        handleAddAuditLog(
          'AUTO_SUBMIT_3X_LOGOUT',
          `Siswa ${student.name} (${student.nis}) keluar akun ke-${res.logoutCount} saat ujian ${targetExam.subjectName} — Ujian dikumpulkan otomatis (Nilai: ${res.session.finalScore}).`
        );
        triggerSyncNotification(
          `Ujian ${targetExam.subjectName} dikumpulkan otomatis (Auto-Submit) karena keluar akun ke-${res.logoutCount}.`
        );
      } else {
        handleAddAuditLog(
          'FORCED_LOGOUT_PENALTY',
          `Siswa ${student.name} (${student.nis}) keluar akun ke-${res.logoutCount} saat ujian ${targetExam.subjectName} — Sanksi waktu tunggu ${res.penaltyMinutes} menit.`
        );
      }
    } finally {
      executeLogout(true);
    }
  };

  const handlePasswordChanged = (newPassword: string) => {
    const updatedOperator = {
      ...operator,
      password: newPassword,
      mustChangePassword: false
    };
    setOperator(updatedOperator);
    saveToStorage(STORAGE_KEYS.OPERATOR, updatedOperator);
    setShowPasswordChangeModal(false);
    alert('Kata sandi operator berhasil diperbarui!');
    handleAddAuditLog('GANTI_PASSWORD_OPERATOR', 'Operator memperbarui kata sandi pertama kali');
  };

  const handleRecordViolation = (type: ViolationType, details: string) => {
    if (!currentStudent) return;
    const matchingExam = exams.find(e => e.id === selectedExamId) || exams[0];
    setViolationLogs(prev => [
      {
        id: `v-local-${Date.now()}`,
        studentId: currentStudent.id,
        studentName: currentStudent.name,
        nis: currentStudent.nis,
        examId: matchingExam?.id || selectedExamId,
        examTitle: matchingExam?.title || 'Ujian CBT',
        type,
        description: details,
        timestamp: new Date().toISOString(),
        actionTaken: 'RECORDED',
      },
      ...prev,
    ].slice(0, 100));
    handleAddAuditLog(`PELANGGARAN_${type.toUpperCase()}`, `Siswa ${currentStudent.name}: ${details}`);
  };

  // Student active exam selection - strictly filtered for student's class
  const studentAvailableExams = currentStudent
    ? exams.filter(ex => isExamMatchingStudentClass(ex, currentStudent.classId, currentStudent.className))
    : exams;

  // Keep currentExam consistent with student's class
  const currentExam = currentStudent
    ? (studentAvailableExams.find(e => e.id === selectedExamId) || studentAvailableExams[0] || exams[0] || INITIAL_EXAMS[0])
    : (exams.find(e => e.id === selectedExamId) || exams[0] || INITIAL_EXAMS[0]);

  // All sessions belonging to the currently logged-in student across every exam_id
  const currentStudentAllSessions = currentStudent
    ? sessions.filter(
        s =>
          (s.nis && s.nis.trim() === currentStudent.nis.trim()) ||
          s.studentId === currentStudent.id
      )
    : [];

  // Session strictly specific to this student AND this specific exam_id (never mixes exams)
  const currentStudentSession = currentStudent 
    ? currentStudentAllSessions.find(s => s.examId === currentExam.id) || {
        id: buildDeterministicSessionId(currentStudent.nis, currentExam.id),
        studentId: currentStudent.id,
        studentName: currentStudent.name,
        nis: currentStudent.nis,
        classId: currentStudent.classId,
        className: currentStudent.className,
        examId: currentExam.id,
        examTitle: currentExam.title,
        status: 'not_started' as const,
        timeRemainingSeconds: currentExam.durationMinutes * 60,
        violationsCount: 0,
        isLocked: false,
        extraTimeMinutes: 0,
        deviceInfo: detectClientDeviceInfo(),
        deviceSessionId: getStudentSessionDeviceId(currentStudent.nis),
        currentQuestionIndex: 0,
        isOnline: true,
        lastHeartbeat: Date.now(),
        answers: {},
        scorePg: 0,
        scoreEssay: 0,
        finalScore: 0,
        isPassed: false
      }
    : sessions[0];

  const handleUpdateStudentSession = (
    updatedSession: StudentExamSession,
    options?: { skipSupabaseMirror?: boolean }
  ) => {
    const currentList = sessionsRef.current;
    const cleanTargetNis = (updatedSession.nis || '').trim();
    const matchesTarget = (s: StudentExamSession) =>
      ((cleanTargetNis && (s.nis || '').trim() === cleanTargetNis) ||
        s.studentId === updatedSession.studentId) &&
      s.examId === updatedSession.examId;

    const exists = currentList.some(matchesTarget);
    const updated = exists
      ? currentList.map(s => (matchesTarget(s) ? updatedSession : s))
      : [...currentList, updatedSession];
    sessionsRef.current = updated;
    setSessions(updated);
    saveToStorage(STORAGE_KEYS.SESSIONS, updated);
    if (currentRoleRef.current === 'siswa' && currentStudentRef.current) {
      persistStudentAuthState(currentStudentRef.current, updatedSession.examId, updatedSession);
    }
    syncSingleSession(updatedSession).then(syncMetaFromClientPush);
    if (isSupabaseConfigured && !options?.skipSupabaseMirror) {
      void syncSessionProgressWithDetails(updatedSession).then(res => {
        if (!res.success && !res.skipped && res.error) {
          triggerSupabaseErrorNotification(`Gagal menyimpan progres ke Supabase: ${res.error}`);
        } else if (res.success) {
          clearSupabaseErrorNotification();
        }
      });
    }
  };

  // Return student to the Exam Schedule List (keeps login identity, clears only finished active_exam_id)
  const handleReturnToScheduleList = async (preferredNextExamId?: string) => {
    clearActiveExamFromPersistedStudentSession();
    const student = currentStudentRef.current;
    if (!student) return;

    let latestSchedules = examsRef.current;
    let latestSessions = sessionsRef.current;

    if (isSupabaseConfigured) {
      const [schedRes, allSessRes] = await Promise.all([
        handleRefreshSchedulesFromSupabase({ silent: true }),
        fetchAllStudentSessionsFromSupabase(student.nis),
      ]);
      if (schedRes && schedRes.length > 0) {
        latestSchedules = schedRes;
      }
      if (allSessRes.sessions && allSessRes.sessions.length > 0) {
        latestSessions = reconcileSessionsWithStudents(
          studentsRef.current,
          allSessRes.sessions,
          latestSchedules[0] || INITIAL_EXAMS[0],
          sessionsRef.current
        );
        sessionsRef.current = latestSessions;
        setSessions(latestSessions);
        saveToStorage(STORAGE_KEYS.SESSIONS, latestSessions);
      }
    }

    if (preferredNextExamId && latestSchedules.some(e => e.id === preferredNextExamId)) {
      setSelectedExamId(preferredNextExamId);
      selectedExamIdRef.current = preferredNextExamId;
      return;
    }

    const nextBest = pickBestExamForStudent(student, latestSchedules, latestSessions);
    if (nextBest) {
      setSelectedExamId(nextBest.id);
      selectedExamIdRef.current = nextBest.id;
    }
  };

  const handleStudentSelectExam = (ex: ExamSchedule) => {
    setSelectedExamId(ex.id);
    selectedExamIdRef.current = ex.id;
    if (!currentStudent) return;

    const deterministicId = buildDeterministicSessionId(currentStudent.nis, ex.id);
    const currentList = sessionsRef.current;
    const deviceSessionId = getStudentSessionDeviceId(currentStudent.nis);
    const clientInfo = detectClientDeviceInfo();
    const existingTarget = currentList.find(
      s => (s.nis === currentStudent.nis || s.studentId === currentStudent.id) && s.examId === ex.id
    );

    let activeSess: StudentExamSession;
    let updatedList: StudentExamSession[];

    if (existingTarget) {
      if (isSessionCompleted(existingTarget.status)) {
        return;
      }
      activeSess = {
        ...existingTarget,
        id: deterministicId,
        isOnline: true,
        deviceSessionId: existingTarget.deviceSessionId || deviceSessionId,
        deviceInfo: clientInfo,
        lastHeartbeat: Date.now()
      };
      updatedList = currentList.map(s => {
        if (s.id === existingTarget.id) return activeSess;
        if ((s.nis === currentStudent.nis || s.studentId === currentStudent.id) && s.status === 'not_started' && s.isOnline) {
          return { ...s, isOnline: false, deviceSessionId: undefined };
        }
        return s;
      });
    } else {
      const idlePlaceholder = currentList.find(
        s =>
          (s.nis === currentStudent.nis || s.studentId === currentStudent.id) &&
          s.status === 'not_started' &&
          Object.keys(s.answers || {}).length === 0 &&
          s.violationsCount === 0 &&
          !s.isLocked
      );
      if (idlePlaceholder) {
        activeSess = {
          ...idlePlaceholder,
          id: deterministicId,
          examId: ex.id,
          examTitle: ex.title,
          timeRemainingSeconds: ex.durationMinutes * 60,
          isOnline: true,
          deviceSessionId,
          deviceInfo: clientInfo,
          lastHeartbeat: Date.now()
        };
        updatedList = currentList.map(s => (s.id === idlePlaceholder.id ? activeSess : s));
      } else {
        activeSess = {
          id: deterministicId,
          studentId: currentStudent.id,
          studentName: currentStudent.name,
          nis: currentStudent.nis,
          classId: currentStudent.classId,
          className: currentStudent.className,
          examId: ex.id,
          examTitle: ex.title,
          status: 'not_started',
          timeRemainingSeconds: ex.durationMinutes * 60,
          violationsCount: 0,
          isLocked: false,
          extraTimeMinutes: 0,
          deviceInfo: clientInfo,
          deviceSessionId,
          currentQuestionIndex: 0,
          isOnline: true,
          lastHeartbeat: Date.now(),
          answers: {},
          scorePg: 0,
          scoreEssay: 0,
          finalScore: 0,
          isPassed: false
        };
        updatedList = [...currentList.map(s =>
          (s.nis === currentStudent.nis || s.studentId === currentStudent.id) && s.status === 'not_started' && s.isOnline
            ? { ...s, isOnline: false, deviceSessionId: undefined }
            : s
        ), activeSess];
      }
    }

    sessionsRef.current = updatedList;
    setSessions(updatedList);
    saveToStorage(STORAGE_KEYS.SESSIONS, updatedList);
    persistStudentAuthState(currentStudent, ex.id, activeSess);
    syncSingleSession(activeSess).then(syncMetaFromClientPush);

    if (isSupabaseConfigured) {
      void fetchStudentSessionStatusFromSupabase(currentStudent.nis, ex.id).then(async res => {
        if (res.error) {
          triggerSupabaseErrorNotification(`Gagal memeriksa sesi mapel di Supabase: ${res.error}`);
          const fallbackWrite = await syncSessionProgressWithDetails(activeSess);
          if (!fallbackWrite.success && !fallbackWrite.skipped && fallbackWrite.error) {
            triggerSupabaseErrorNotification(`Gagal menyimpan sesi mapel ke Supabase: ${fallbackWrite.error}`);
          }
          return;
        }
        if (res.found && res.session) {
          const remote = res.session;
          const isRemoteDone = isSessionCompleted(remote.status);
          const hydrated: StudentExamSession = {
            ...remote,
            isOnline: !isRemoteDone,
            deviceSessionId: isRemoteDone ? undefined : deviceSessionId,
            deviceInfo: clientInfo,
            lastHeartbeat: Date.now(),
          };
          const merged = reconcileSessionsWithStudents(
            studentsRef.current,
            [hydrated],
            examsRef.current[0] || INITIAL_EXAMS[0],
            sessionsRef.current
          );
          sessionsRef.current = merged;
          setSessions(merged);
          saveToStorage(STORAGE_KEYS.SESSIONS, merged);
          persistStudentAuthState(currentStudent, ex.id, hydrated);
          if (!hydrated.isLocked && !isRemoteDone) {
            const writeRes = await syncSessionProgressWithDetails(hydrated);
            if (!writeRes.success && !writeRes.skipped && writeRes.error) {
              triggerSupabaseErrorNotification(`Gagal menyimpan sesi mapel ke Supabase: ${writeRes.error}`);
            } else if (writeRes.success) {
              clearSupabaseErrorNotification();
            }
          }
        } else {
          const cleanSession: StudentExamSession =
            activeSess.isLocked || activeSess.violationsCount > 0 || activeSess.status !== 'not_started'
              ? {
                  ...activeSess,
                  status: 'not_started',
                  isLocked: false,
                  lockReason: undefined,
                  violationsCount: 0,
                  answers: {},
                  scorePg: 0,
                  scoreEssay: 0,
                  finalScore: 0,
                  isPassed: false,
                  submittedAt: undefined,
                  timeRemainingSeconds: ex.durationMinutes * 60,
                  currentQuestionIndex: 0,
                }
              : activeSess;
          const merged = reconcileSessionsWithStudents(
            studentsRef.current,
            [cleanSession],
            examsRef.current[0] || INITIAL_EXAMS[0],
            sessionsRef.current
          );
          sessionsRef.current = merged;
          setSessions(merged);
          saveToStorage(STORAGE_KEYS.SESSIONS, merged);
          const writeRes = await syncSessionProgressWithDetails(cleanSession);
          if (!writeRes.success && !writeRes.skipped && writeRes.error) {
            triggerSupabaseErrorNotification(`Gagal membuat sesi ujian di Supabase: ${writeRes.error}`);
          } else if (writeRes.success) {
            clearSupabaseErrorNotification();
          }
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Primary Navigation */}
      <Navbar
        currentRole={currentRole}
        currentUser={currentUser}
        currentStudent={currentStudent}
        activeSection={activeSection}
        onNavigate={setActiveSection}
        onLogout={handleLogout}
      />

      {/* Supabase Sync Error Alert Toast */}
      {supabaseSyncError && (
        <div className="fixed top-16 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[60] bg-rose-950 text-rose-50 px-4 py-3 rounded-xl shadow-2xl border-2 border-rose-500 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs flex-1 min-w-0">
            <span className="font-bold text-white block">Gagal Sinkronisasi Database Supabase</span>
            <span className="font-mono text-[11px] break-words text-rose-100 block mt-0.5">{supabaseSyncError}</span>
          </div>
          <button
            type="button"
            onClick={clearSupabaseErrorNotification}
            className="p-1 text-rose-300 hover:text-white rounded cursor-pointer shrink-0"
            aria-label="Tutup peringatan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Offline Pending Submissions Queue Banner (Global) */}
      {pendingSubmissionsCount > 0 && activeSection !== 'siswa' && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 bg-amber-950 text-amber-50 px-4 py-3 rounded-xl shadow-2xl border border-amber-500 flex items-center gap-3">
          <WifiOff className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs flex-1">
            <span className="font-bold text-white block">
              {pendingSubmissionsCount} Jawaban Tersimpan di Antrean Lokal
            </span>
            <span className="text-[11px] text-amber-200">
              Akan dikirim otomatis ke server begitu koneksi internet pulih.
            </span>
          </div>
          <RefreshCw className="w-4 h-4 text-amber-300 animate-spin shrink-0" />
        </div>
      )}

      {/* Real-time Sync & Update Toast Notification */}
      {syncFeedbackMessage && (
        <div className="fixed top-16 right-4 z-50 bg-emerald-900 text-emerald-100 px-4 py-3 rounded-xl shadow-xl border border-emerald-700 flex items-center gap-3 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">Sinkronisasi Data Otomatis</span>
            <span>{syncFeedbackMessage}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: OVERVIEW & TAHAP 1 ERD / ARCHITECTURE */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-blue-800">
              <div className="max-w-2xl relative z-10 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Tahap 1: Fondasi Arsitektur Basis Data & Sistem CBT
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Ujian Akhir Semester (CBT) SMP Negeri 12 Banjarbaru
                </h1>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Platform Computer-Based Test terintegrasi dengan validasi token dinamis 5 menit, pengacakan soal & opsi, proteksi anti-curang, dan sinkronisasi real-time untuk 92+ siswa peserta ujian.
                </p>
                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveSection('login')}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Masuk ke Portal Ujian</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveSection('panduan')}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Panduan SEB & Kiosk</span>
                  </button>
                  <button
                    onClick={handleRestoreFactoryData}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 rounded-lg transition-colors cursor-pointer"
                    title="Pulihkan data master awal SMPN 12"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Master Data Pabrik</span>
                  </button>
                </div>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
                <Shield className="w-96 h-96 text-white" />
              </div>
            </div>

            {/* Interactive ERD & Database Schema Inspector */}
            <DatabaseSchemaViewer />
          </div>
        )}

        {/* VIEW 2: LOGIN MODAL */}
        {activeSection === 'login' && (
          <LoginModal
            onLoginSuccess={handleLoginSuccess}
            students={students}
            teachers={teachers}
            operator={operator}
            activeSessions={activeSessionsMap}
            sessions={sessions}
            schoolSetting={schoolSetting}
          />
        )}

        {/* VIEW 3: OPERATOR DASHBOARD */}
        {activeSection === 'operator' && (
          <OperatorDashboard
            students={students}
            onUpdateStudents={handleUpdateStudents}
            teachers={teachers}
            onUpdateTeachers={handleUpdateTeachers}
            classes={classes}
            subjects={subjects}
            onUpdateSubjects={handleUpdateSubjects}
            exams={exams}
            onUpdateExams={handleUpdateExams}
            onSaveExamSchedule={handleSaveExamSchedule}
            onDeleteExamSchedule={handleDeleteExamSchedule}
            onRefreshSchedulesFromSupabase={async () => {
              await handleRefreshSchedulesFromSupabase();
            }}
            sessions={sessions}
            onUpdateSessions={handleUpdateSessions}
            schoolSetting={schoolSetting}
            onUpdateSetting={handleUpdateSetting}
            auditLogs={auditLogs}
            onAddAuditLog={handleAddAuditLog}
            questionBank={questionBank}
            onUpdateQuestionBank={handleUpdateQuestionBank}
            onResetSingleResult={handleResetSingleExamResult}
            onResetAllResults={handleResetAllExamResults}
            onResetLoginSession={handleResetLoginSession}
            onRestoreFactoryData={handleRestoreFactoryData}
            lastSyncTime={lastSyncTime}
            violationLogs={violationLogs}
            realtimeStatus={realtimeStatus}
            onRefreshFromSupabase={handleRefreshFromSupabase}
            supabaseError={supabaseSyncError}
          />
        )}

        {/* VIEW 4: GURU DASHBOARD */}
        {activeSection === 'guru' && (
          <GuruDashboard
            teacher={currentUser || teachers[0]}
            questionBank={questionBank}
            onUpdateQuestionBank={handleUpdateQuestionBank}
            exams={exams}
            sessions={sessions}
            onUpdateSessions={handleUpdateSessions}
            classes={classes}
            subjects={subjects}
            students={students}
            schoolSetting={schoolSetting}
            onResetSingleResult={handleResetSingleExamResult}
            onResetAllResults={handleResetAllExamResults}
            onResetLoginSession={handleResetLoginSession}
            lastSyncTime={lastSyncTime}
          />
        )}

        {/* VIEW 5: SISWA EXAM VIEW */}
        {activeSection === 'siswa' && (
          <SiswaExamView
            student={currentStudent || students[0]}
            exam={currentExam}
            availableExams={studentAvailableExams}
            studentSessions={currentStudentAllSessions}
            onSelectExam={handleStudentSelectExam}
            onReturnToScheduleList={handleReturnToScheduleList}
            questionBank={questionBank}
            session={currentStudentSession}
            onUpdateSession={handleUpdateStudentSession}
            onRecordViolation={handleRecordViolation}
            schoolSetting={schoolSetting}
            onExitExam={handleLogout}
            onSupabaseError={triggerSupabaseErrorNotification}
            onSupabaseSuccess={clearSupabaseErrorNotification}
            onRefreshSchedules={async () => {
              await handleRefreshSchedulesFromSupabase();
              if (isSupabaseConfigured && currentStudentRef.current) {
                const allRes = await fetchAllStudentSessionsFromSupabase(currentStudentRef.current.nis);
                if (allRes.sessions && allRes.sessions.length > 0) {
                  const merged = reconcileSessionsWithStudents(
                    studentsRef.current,
                    allRes.sessions,
                    examsRef.current[0] || INITIAL_EXAMS[0],
                    sessionsRef.current
                  );
                  sessionsRef.current = merged;
                  setSessions(merged);
                  saveToStorage(STORAGE_KEYS.SESSIONS, merged);
                }
              }
            }}
          />
        )}

        {/* VIEW 6: GUIDES & DEPLOYMENT */}
        {activeSection === 'panduan' && (
          <SecurityAndDeployGuide />
        )}
      </main>

      {/* Mandatory Password Change Modal for Operator on First Login */}
      {showPasswordChangeModal && (
        <ChangePasswordModal
          isMandatory={true}
          onPasswordChanged={handlePasswordChanged}
        />
      )}

      {/* Forced-Logout Warning & Penalty Confirmation Modal (Active Student Exam) */}
      {forcedLogoutTarget && (() => {
        const nextLogoutNum = (forcedLogoutTarget.session.logoutCount || 0) + 1;
        const nextPen = calculateLogoutPenalty(nextLogoutNum, forcedLogoutTarget.isDuringCooldown);
        return (
          <div className="fixed inset-0 z-[80] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl border-2 border-rose-500 shadow-2xl overflow-hidden">
              <div className="bg-rose-600 px-5 py-4 text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-rose-100">
                    Peringatan Anti-Kecurangan · {forcedLogoutTarget.exam.subjectName}
                  </span>
                  <h3 className="text-base font-extrabold leading-tight">
                    Konfirmasi Keluar Akun Saat Ujian
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-4 text-xs text-slate-700">
                <p className="leading-relaxed bg-rose-50 border border-rose-200 text-rose-900 p-3.5 rounded-xl font-medium">
                  <strong>PERINGATAN!</strong> Anda belum mengumpulkan ujian. Keluar akun sekarang akan dicatat sebagai kecurangan dengan sanksi waktu tunggu 5 menit (hingga pengumpulan otomatis pada keluar ke-3). Yakin ingin keluar?
                </p>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                  <div className="font-bold text-amber-900">
                    Konsekuensi Keluar Akun ke-{nextLogoutNum} / 3:
                  </div>
                  {nextPen.shouldAutoSubmit ? (
                    <p className="text-rose-700 font-bold leading-relaxed">
                      ⛔ BATAS MAKSIMAL TERCAPAI! Jika Anda keluar sekarang, ujian Anda akan LANGSUNG DITUTUP &amp; DIKUMPULKAN OTOMATIS (Auto-Submit) dengan jawaban terakhir yang tersimpan!
                    </p>
                  ) : forcedLogoutTarget.isDuringCooldown ? (
                    <p className="text-amber-900 leading-relaxed">
                      Anda sedang berada di masa tunggu sanksi. Keluar sekarang akan menaikkan hukuman waktu tunggu menjadi <strong>7 menit</strong> saat login kembali!
                    </p>
                  ) : (
                    <p className="text-amber-900 leading-relaxed">
                      Saat Anda login kembali, Anda akan dikenakan <strong>sanksi waktu tunggu {nextPen.penaltyMinutes} menit</strong> sebelum soal dapat dibuka kembali.
                    </p>
                  )}
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    disabled={isProcessingForcedLogout}
                    onClick={() => void handleConfirmForcedLogout()}
                    className="w-full sm:w-auto px-4 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>
                      {isProcessingForcedLogout
                        ? 'Mencatat Sanksi...'
                        : nextPen.shouldAutoSubmit
                          ? 'Keluar & Kumpulkan Otomatis'
                          : 'Tetap Keluar Akun'}
                    </span>
                  </button>
                  <button
                    type="button"
                    disabled={isProcessingForcedLogout}
                    onClick={() => setForcedLogoutTarget(null)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    Batal &amp; Lanjutkan Ujian
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Quiet Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span>
              © 2026 {schoolSetting.name} · Sistem CBT Ujian Akhir Semester
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
              <CheckCircle2 className="w-3 h-3" /> Auto-Sync Aktif ({lastSyncTime})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Kalimantan Selatan</span>
            <span>·</span>
            <span>NPSN: {schoolSetting.npsn}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
