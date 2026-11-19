import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Maximize, 
  Minimize, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Bookmark, 
  RefreshCw, 
  LogOut, 
  Sparkles,
  Layers,
  Calendar,
  Lock,
  Unlock,
  Smartphone,
  Laptop,
  CheckCircle2,
  AlertCircle,
  Download,
  X
} from 'lucide-react';
import { 
  Student, 
  ExamSchedule, 
  QuestionBank, 
  Question, 
  StudentExamSession, 
  ViolationType,
  SchoolSetting,
  isSessionCompleted
} from '../../types/cbt';
import { KatexRenderer } from '../common/KatexRenderer';
import { isQuestionMatchingClass, isExamMatchingStudentClass } from '../../utils/classGroups';
import { fetchServerData } from '../../utils/apiSync';
import { isSupabaseConfigured, supabaseConfigError } from '../../lib/supabaseClient';
import {
  submitExamToSupabase,
  recordViolationToSupabase,
  subscribeToStudentSessionLockRealtime,
  fetchStudentSessionStatusFromSupabase,
  FetchStudentSessionStatusResult,
  syncSessionProgressWithDetails,
  mergeActiveStudentSessionWithRemote
} from '../../services/supabaseExamService';
import {
  loadPersistedStudentSession,
  savePersistedStudentSession,
  clearPersistedStudentSession,
  flushSingleSessionToLocalStorage
} from '../../utils/dataSync';
import { validateExamSchedule, formatDateIndo } from '../../utils/scheduleValidator';
import { downloadExamCardsAsHtml } from '../../utils/cardDownloader';
import { 
  calculateProvisionalScore, 
  getStudentSessionDeviceId, 
  detectClientDeviceInfo 
} from '../../utils/sessionDevice';

interface SiswaExamViewProps {
  student: Student;
  exam: ExamSchedule;
  availableExams?: ExamSchedule[];
  onSelectExam?: (exam: ExamSchedule) => void;
  questionBank: QuestionBank;
  session: StudentExamSession;
  onUpdateSession: (updatedSession: StudentExamSession, options?: { skipSupabaseMirror?: boolean }) => void;
  onRecordViolation: (type: ViolationType, details: string) => void;
  schoolSetting: SchoolSetting;
  onExitExam: () => void;
  onSupabaseError?: (message: string) => void;
  onSupabaseSuccess?: () => void;
  onRefreshSchedules?: () => Promise<void>;
}

export const SiswaExamView: React.FC<SiswaExamViewProps> = ({
  student,
  exam,
  availableExams = [],
  onSelectExam,
  questionBank,
  session,
  onUpdateSession,
  onRecordViolation,
  schoolSetting,
  onExitExam,
  onSupabaseError,
  onSupabaseSuccess,
  onRefreshSchedules
}) => {
  const persistedForExam = (() => {
    const p = loadPersistedStudentSession();
    if (!p) return null;
    if (p.student_nis.trim() !== student.nis.trim()) return null;
    if (p.active_exam_id && p.active_exam_id !== exam.id) return null;
    return p;
  })();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() =>
    Math.max(0, session.currentQuestionIndex ?? persistedForExam?.current_question_index ?? 0)
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState<boolean>(() =>
    session.status === 'in_progress' ||
    session.isLocked ||
    session.status === 'locked' ||
    isSessionCompleted(session.status) ||
    Boolean(persistedForExam?.has_started)
  );
  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    const defaultSec = (exam.durationMinutes || 90) * 60;
    const sessTime = session.timeRemainingSeconds;
    const persistedTime = persistedForExam?.time_remaining_seconds;
    if (typeof sessTime === 'number' && sessTime > 0 && typeof persistedTime === 'number' && persistedTime > 0) {
      return Math.min(sessTime, persistedTime);
    }
    return (typeof sessTime === 'number' && sessTime > 0 ? sessTime : null) ??
      (typeof persistedTime === 'number' && persistedTime > 0 ? persistedTime : null) ??
      defaultSec;
  });
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [syncErrorBanner, setSyncErrorBanner] = useState<string | null>(null);
  const [isCheckingUnlock, setIsCheckingUnlock] = useState(false);
  const [isRefreshingSchedule, setIsRefreshingSchedule] = useState(false);
  const [unlockCheckNotice, setUnlockCheckNotice] = useState<{
    type: 'info' | 'warning' | 'error';
    message: string;
  } | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [violationAlert, setViolationAlert] = useState<{
    show: boolean;
    title: string;
    msg: string;
    count: number;
    max: number;
  } | null>(null);
  const [showMobileQuestionList, setShowMobileQuestionList] = useState(false);

  const reportSyncError = (message: string) => {
    setSyncErrorBanner(message);
    onSupabaseError?.(message);
  };

  const clearSyncError = () => {
    setSyncErrorBanner(null);
    onSupabaseSuccess?.();
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<StudentExamSession>(session);
  const timeRemainingRef = useRef<number>(timeRemaining);
  const currentQuestionIndexRef = useRef<number>(currentQuestionIndex);
  const hasStartedRef = useRef<boolean>(hasStarted);
  const isPageUnloadingRef = useRef<boolean>(false);
  const lastViolationAtRef = useRef<number>(0);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    timeRemainingRef.current = timeRemaining;
  }, [timeRemaining]);

  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  useEffect(() => {
    hasStartedRef.current = hasStarted;
  }, [hasStarted]);

  // Synchronously persist active student exam snapshot to localStorage (survives page refresh)
  const persistExamSnapshotLocally = (
    targetSession: StudentExamSession,
    startedOverride?: boolean
  ) => {
    flushSingleSessionToLocalStorage(targetSession);
    if (isSessionCompleted(targetSession.status)) {
      clearPersistedStudentSession();
      return;
    }
    const isStartedNow =
      typeof startedOverride === 'boolean'
        ? startedOverride
        : Boolean(
            hasStartedRef.current ||
              targetSession.status === 'in_progress' ||
              targetSession.isLocked ||
              targetSession.status === 'locked'
          );
    savePersistedStudentSession({
      role: 'siswa',
      student_id: student.id,
      student_nis: student.nis,
      student_name: student.name,
      class_id: student.classId,
      class_name: student.className,
      active_exam_id: exam.id,
      active_session_id: targetSession.id,
      has_started: isStartedNow,
      current_question_index: targetSession.currentQuestionIndex ?? currentQuestionIndexRef.current,
      time_remaining_seconds: targetSession.timeRemainingSeconds ?? timeRemainingRef.current,
      violations_count: targetSession.violationsCount ?? 0,
      is_locked: Boolean(targetSession.isLocked || targetSession.status === 'locked'),
      saved_at: Date.now()
    });
  };

  // Flush exact timer, current question index, answers, and violation state before browser reload
  useEffect(() => {
    const flushBeforeUnload = () => {
      isPageUnloadingRef.current = true;
      const latest = sessionRef.current;
      if (isSessionCompleted(latest.status)) {
        clearPersistedStudentSession();
        return;
      }
      const snapshot: StudentExamSession = {
        ...latest,
        currentQuestionIndex: currentQuestionIndexRef.current,
        timeRemainingSeconds: timeRemainingRef.current,
        lastHeartbeat: Date.now(),
        updatedAt: new Date().toISOString()
      };
      persistExamSnapshotLocally(snapshot, hasStartedRef.current);
    };

    const onPageShow = () => {
      isPageUnloadingRef.current = false;
    };

    window.addEventListener('beforeunload', flushBeforeUnload);
    window.addEventListener('pagehide', flushBeforeUnload);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      window.removeEventListener('beforeunload', flushBeforeUnload);
      window.removeEventListener('pagehide', flushBeforeUnload);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [student.id, student.nis, student.name, student.classId, student.className, exam.id]);

  // Keep local exam screen synchronized with Operator actions & restored session state
  useEffect(() => {
    if (session.status === 'not_started' && !session.isLocked) {
      setHasStarted(false);
      setViolationAlert(null);
      setShowSubmitConfirm(false);
      setCurrentQuestionIndex(0);
      setTimeRemaining(session.timeRemainingSeconds || exam.durationMinutes * 60);
    } else if (isSessionCompleted(session.status)) {
      setHasStarted(true);
      setViolationAlert(null);
      clearPersistedStudentSession();
    } else if (session.isLocked || session.status === 'locked') {
      setHasStarted(true);
      setViolationAlert(null);
    } else if (!session.isLocked && session.status === 'in_progress') {
      setHasStarted(true);
      setViolationAlert(null);
    }
  }, [session.status, session.isLocked, session.id, session.adminActionAt, exam.durationMinutes]);

  // Live Clock to track exam schedule timing in real-time
  const [nowTime, setNowTime] = useState<Date>(() => new Date());
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setNowTime(new Date());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Always pull fresh exam schedules from Supabase when student views the readiness / schedule screen
  useEffect(() => {
    if (!hasStarted && onRefreshSchedules) {
      void onRefreshSchedules();
    }
  }, [hasStarted, student.nis]);

  const handleManualRefreshSchedule = async () => {
    if (!onRefreshSchedules) return;
    setIsRefreshingSchedule(true);
    try {
      await onRefreshSchedules();
      setNowTime(new Date());
    } finally {
      setIsRefreshingSchedule(false);
    }
  };

  // Real-time schedule validation (strict time window enforcement)
  const scheduleCheck = validateExamSchedule(exam, nowTime);

  // STRICT: Questions MUST belong to this exam's subject AND the student's specific class/grade.
  // Sourced directly from questions uploaded/maintained by teachers and operators in the centralized question bank.
  const questions = questionBank.questions.filter(q => {
    const matchSubject = !exam.subjectId || q.subjectId === exam.subjectId || (exam.questionBankId && q.bankId === exam.questionBankId);
    const matchClass = isQuestionMatchingClass(q.classId, q.grade, student.classId);
    return matchSubject && matchClass;
  });

  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Authoritative reconciler: merges Supabase SSoT with localStorage backup on refresh/poll/realtime
  // Preserves answers, question index, timer, and violations on refresh while honoring Operator unlock/reset
  const applyAuthoritativeRemoteState = (
    res: FetchStudentSessionStatusResult,
    source: 'mount' | 'realtime' | 'poll' | 'manual'
  ): { unlocked: boolean; statusText?: string } => {
    if (res.error) {
      return { unlocked: false, statusText: `Gagal memeriksa Supabase: ${res.error}` };
    }

    const localLatest = sessionRef.current;
    const defaultDurationSec = (exam.durationMinutes || 90) * 60;

    // 1. No row in Supabase
    if (!res.found || !res.session) {
      // If student refreshed right after starting while offline / before initial upsert landed, preserve & backfill
      if (source === 'mount' && localLatest.status === 'in_progress' && !localLatest.isLocked) {
        setHasStarted(true);
        if (typeof localLatest.currentQuestionIndex === 'number') {
          const clampedIdx =
            questions.length > 0
              ? Math.max(0, Math.min(questions.length - 1, localLatest.currentQuestionIndex))
              : Math.max(0, localLatest.currentQuestionIndex);
          setCurrentQuestionIndex(clampedIdx);
        }
        if (localLatest.timeRemainingSeconds > 0) {
          setTimeRemaining(localLatest.timeRemainingSeconds);
        }
        persistExamSnapshotLocally(localLatest, true);
        if (isSupabaseConfigured) {
          void syncSessionProgressWithDetails(
            { ...localLatest, isOnline: true, lastHeartbeat: Date.now() },
            questions.length
          );
        }
        return { unlocked: false };
      }

      if (
        localLatest.isLocked ||
        localLatest.status !== 'not_started' ||
        localLatest.violationsCount > 0 ||
        Object.keys(localLatest.answers || {}).length > 0
      ) {
        const cleanResetSession: StudentExamSession = {
          ...localLatest,
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
          timeRemainingSeconds: defaultDurationSec,
          currentQuestionIndex: 0,
          adminActionAt: Date.now(),
          updatedAt: new Date().toISOString(),
        };
        sessionRef.current = cleanResetSession;
        onUpdateSession(cleanResetSession, { skipSupabaseMirror: true });
        persistExamSnapshotLocally(cleanResetSession, false);
        setHasStarted(false);
        setViolationAlert(null);
        setShowSubmitConfirm(false);
        setUnlockCheckNotice(null);
        setCurrentQuestionIndex(0);
        setTimeRemaining(defaultDurationSec);
        return { unlocked: true, statusText: 'Sesi ujian telah direset oleh Operator.' };
      }
      return { unlocked: false, statusText: 'Belum ada sesi ujian tersimpan di Supabase.' };
    }

    const remote = res.session;
    const mergedResult = mergeActiveStudentSessionWithRemote({
      local: localLatest,
      remote,
      defaultDurationSec,
    });
    const {
      session: nextSess,
      unlockedOrReset,
      isRemoteReset,
      isRemoteDone,
      needsRemoteBackfill,
    } = mergedResult;

    const remoteUpdatedMs = remote.updatedAt ? Date.parse(remote.updatedAt) : remote.lastHeartbeat || 0;
    const localUpdatedMs = localLatest.updatedAt ? Date.parse(localLatest.updatedAt) : localLatest.lastHeartbeat || 0;

    const shouldApplyRemote =
      unlockedOrReset ||
      source === 'mount' ||
      nextSess.isLocked !== localLatest.isLocked ||
      nextSess.status !== localLatest.status ||
      nextSess.violationsCount !== localLatest.violationsCount ||
      Object.keys(nextSess.answers || {}).length !== Object.keys(localLatest.answers || {}).length ||
      isRemoteDone ||
      remoteUpdatedMs > localUpdatedMs;

    if (shouldApplyRemote) {
      sessionRef.current = nextSess;
      onUpdateSession(nextSess, { skipSupabaseMirror: true });

      if (isRemoteReset) {
        persistExamSnapshotLocally(nextSess, false);
        setHasStarted(false);
        setViolationAlert(null);
        setShowSubmitConfirm(false);
        setUnlockCheckNotice(null);
        setCurrentQuestionIndex(0);
        setTimeRemaining(nextSess.timeRemainingSeconds || defaultDurationSec);
        return { unlocked: true, statusText: 'Sesi ujian telah direset oleh Operator.' };
      }

      if (isRemoteDone) {
        clearPersistedStudentSession();
        setHasStarted(true);
        setViolationAlert(null);
        setUnlockCheckNotice(null);
        return { unlocked: true, statusText: 'Ujian sudah berstatus selesai di Supabase.' };
      }

      const restoredQuestionIdx =
        questions.length > 0
          ? Math.max(0, Math.min(questions.length - 1, nextSess.currentQuestionIndex || 0))
          : Math.max(0, nextSess.currentQuestionIndex || 0);

      if (source === 'mount' || unlockedOrReset) {
        setCurrentQuestionIndex(restoredQuestionIdx);
      }
      if (nextSess.timeRemainingSeconds > 0) {
        setTimeRemaining(nextSess.timeRemainingSeconds);
      }

      if (!nextSess.isLocked && nextSess.status !== 'locked') {
        const startedNow = nextSess.status === 'in_progress';
        if (startedNow) {
          setHasStarted(true);
        }
        persistExamSnapshotLocally(nextSess, startedNow);
        setViolationAlert(null);
        setUnlockCheckNotice(null);

        // If refresh merged newer local answers / tighter timer / online status, sync back to Supabase
        if (source === 'mount' && isSupabaseConfigured && (needsRemoteBackfill || startedNow)) {
          void syncSessionProgressWithDetails(
            { ...nextSess, isOnline: true, lastHeartbeat: Date.now() },
            questions.length
          );
        }

        if (unlockedOrReset) {
          return { unlocked: true, statusText: 'Kunci ujian telah dibuka oleh Operator!' };
        }
      } else {
        persistExamSnapshotLocally(nextSess, true);
        setHasStarted(true);
        setViolationAlert(null);
        if (source === 'mount' && isSupabaseConfigured && needsRemoteBackfill) {
          void syncSessionProgressWithDetails(nextSess, questions.length);
        }
      }
    }

    if (nextSess.isLocked || nextSess.status === 'locked') {
      return {
        unlocked: false,
        statusText: `Status di Supabase masih TERKUNCI (${nextSess.violationsCount}/${schoolSetting.maxViolations || 3} pelanggaran). Pastikan Operator sudah menekan tombol "Buka Kunci" di Dashboard Operator.`,
      };
    }

    return { unlocked: false };
  };

  // 1. Sync authoritative session snapshot from Supabase whenever exam opens/switches (Supabase overrides localStorage)
  useEffect(() => {
    if (!isSupabaseConfigured || !student.nis || !exam.id) return;
    let cancelled = false;
    fetchStudentSessionStatusFromSupabase(student.nis, exam.id).then(res => {
      if (cancelled) return;
      applyAuthoritativeRemoteState(res, 'mount');
    });
    return () => {
      cancelled = true;
    };
  }, [student.nis, exam.id]);

  // 2. Real-time WebSocket listener + periodic 3-second polling directly against Supabase when active or locked
  useEffect(() => {
    if (!hasStarted && !session.isLocked && session.status !== 'locked') return;

    const unsubscribeRealtime = subscribeToStudentSessionLockRealtime(
      session.id,
      student.nis,
      exam.id,
      remoteSession => {
        applyAuthoritativeRemoteState({ found: true, session: remoteSession }, 'realtime');
      }
    );

    let unlockChecker: ReturnType<typeof setInterval> | null = null;
    if (session.isLocked || session.status === 'locked') {
      const checkLockFromDb = async () => {
        try {
          if (isSupabaseConfigured) {
            const res = await fetchStudentSessionStatusFromSupabase(student.nis, exam.id);
            applyAuthoritativeRemoteState(res, 'poll');
            return;
          }
          const fullData = await fetchServerData();
          if (fullData?.data?.sessions) {
            const remoteSession = fullData.data.sessions.find(
              s => s.id === session.id || (s.nis === student.nis && s.examId === exam.id)
            );
            if (remoteSession && !remoteSession.isLocked && remoteSession.status !== 'locked') {
              applyAuthoritativeRemoteState({ found: true, session: remoteSession }, 'poll');
            }
          }
        } catch (err) {
          console.warn('Unlock poll check failed:', err);
        }
      };

      void checkLockFromDb();
      unlockChecker = setInterval(() => {
        void checkLockFromDb();
      }, 3000);
    }

    return () => {
      unsubscribeRealtime();
      if (unlockChecker) clearInterval(unlockChecker);
    };
  }, [hasStarted, session.isLocked, session.status, session.id, student.nis, exam.id, exam.durationMinutes]);

  // Helper to update session state and sync directly to Supabase (with total question count & visible error reporting)
  const updateSessionWithSync = (updated: StudentExamSession, mirrorToSupabase = true) => {
    const stamped: StudentExamSession = {
      ...updated,
      updatedAt: updated.updatedAt || new Date().toISOString(),
    };
    sessionRef.current = stamped;
    onUpdateSession(stamped, { skipSupabaseMirror: !mirrorToSupabase });
    if (mirrorToSupabase && isSupabaseConfigured) {
      void syncSessionProgressWithDetails(stamped, questions.length).then(res => {
        if (!res.success && !res.skipped && res.error) {
          reportSyncError(`Gagal menyimpan progres/jawaban ke Supabase: ${res.error}`);
        } else if (res.success) {
          clearSyncError();
        }
      });
    }
  };

  // Navigate to a question index and sync current progress immediately
  const goToQuestion = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(Math.max(0, questions.length - 1), nextIndex));
    setCurrentQuestionIndex(clamped);
    if (hasStarted && sessionRef.current.status === 'in_progress' && !sessionRef.current.isLocked) {
      updateSessionWithSync({
        ...sessionRef.current,
        currentQuestionIndex: clamped,
        timeRemainingSeconds: timeRemainingRef.current,
        isOnline: true,
        lastHeartbeat: Date.now()
      });
    }
  };

  // Auto-save feedback ticker
  const triggerSaveIndicator = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 300);
  };

  // Fullscreen controller
  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      setIsFullscreen(true);
    } catch {
      // In iframes or strict sandbox, graceful fallback
      setIsFullscreen(true);
    }
  };

  const handleStartExam = async () => {
    if (!scheduleCheck.canStart) {
      alert(`Peringatan Akses: ${scheduleCheck.message}`);
      return;
    }
    if (questions.length === 0) {
      alert(`Soal belum tersedia untuk Kelas ${student.className}. Silakan hubungi guru mapel atau operator.`);
      return;
    }
    await enterFullscreen();
    setHasStarted(true);
    const latest = sessionRef.current;
    const startSession: StudentExamSession = {
      ...latest,
      examId: exam.id,
      examTitle: exam.title,
      status: latest.isLocked ? 'locked' : 'in_progress',
      violationsCount: latest.violationsCount || 0,
      isLocked: Boolean(latest.isLocked),
      startedAt: latest.startedAt || new Date().toISOString(),
      isOnline: true,
      deviceSessionId: latest.deviceSessionId || getStudentSessionDeviceId(student.nis),
      deviceInfo: detectClientDeviceInfo(),
      currentQuestionIndex,
      lastHeartbeat: Date.now(),
      timeRemainingSeconds: latest.timeRemainingSeconds || exam.durationMinutes * 60,
      updatedAt: new Date().toISOString()
    };
    updateSessionWithSync(startSession, false);
    persistExamSnapshotLocally(startSession, true);
    if (isSupabaseConfigured) {
      const syncRes = await syncSessionProgressWithDetails(startSession, questions.length);
      if (!syncRes.success && !syncRes.skipped && syncRes.error) {
        reportSyncError(`Gagal menyimpan status mulai ujian ke Supabase: ${syncRes.error}`);
      } else if (syncRes.success) {
        clearSyncError();
      }
    }
  };

  // Timer countdown (with lightweight 5-second localStorage timer checkpoint)
  useEffect(() => {
    if (!hasStarted || isSessionCompleted(session.status) || session.isLocked || session.status === 'locked') return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          void handleAutoSubmit('Waktu ujian telah habis');
          return 0;
        }
        const nextVal = prev - 1;
        if (nextVal % 5 === 0) {
          persistExamSnapshotLocally(
            {
              ...sessionRef.current,
              currentQuestionIndex: currentQuestionIndexRef.current,
              timeRemainingSeconds: nextVal
            },
            true
          );
        }
        return nextVal;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, session.status, session.isLocked]);

  // Real-Time Periodic Heartbeat to Operator Dashboard (every 10 seconds, without tearing down on every 1s tick)
  useEffect(() => {
    if (!hasStarted || session.status !== 'in_progress' || session.isLocked) return;

    const heartbeatTimer = setInterval(() => {
      const latest = sessionRef.current;
      if (latest.isLocked || latest.status !== 'in_progress') return;
      const activeSession: StudentExamSession = {
        ...latest,
        timeRemainingSeconds: timeRemainingRef.current,
        isOnline: true,
        lastHeartbeat: Date.now()
      };
      updateSessionWithSync(activeSession);
    }, 10000);

    return () => clearInterval(heartbeatTimer);
  }, [hasStarted, session.status, session.isLocked]);

  // Anti-Cheat Event Listeners (3x tolerance: 1/3 warning, 2/3 final warning, 3/3 auto-lock)
  useEffect(() => {
    if (!hasStarted || session.status !== 'in_progress' || session.isLocked) return;

    const maxViolations = schoolSetting.maxViolations || 3;

    const handleViolation = (type: ViolationType, details: string) => {
      if (isPageUnloadingRef.current) return;
      const latestSession = sessionRef.current;
      if (latestSession.isLocked || latestSession.status !== 'in_progress') return;

      // Cooldown 1500ms so a single tab switch doesn't double-fire blur + visibilitychange
      const now = Date.now();
      if (now - lastViolationAtRef.current < 1500) return;
      lastViolationAtRef.current = now;

      const newCount = (latestSession.violationsCount || 0) + 1;
      const isNowLocked = newCount >= maxViolations;

      onRecordViolation(type, details);

      const updatedSession: StudentExamSession = {
        ...latestSession,
        violationsCount: newCount,
        isLocked: isNowLocked,
        status: isNowLocked ? 'locked' : 'in_progress',
        lockReason: isNowLocked
          ? `Mencapai batas ${maxViolations}x pelanggaran (${details})`
          : undefined,
        currentQuestionIndex: currentQuestionIndexRef.current,
        timeRemainingSeconds: timeRemainingRef.current,
        lastHeartbeat: Date.now(),
        updatedAt: new Date().toISOString()
      };

      // Update local state & localStorage immediately WITHOUT racing syncSessionProgress, then persist authoritatively via recordViolationToSupabase
      updateSessionWithSync(updatedSession, false);
      persistExamSnapshotLocally(updatedSession, true);
      void recordViolationToSupabase({
        session: latestSession,
        violationType: type,
        details,
        maxViolations,
        timeRemainingSeconds: timeRemainingRef.current,
        totalQuestions: questions.length
      }).then(res => {
        if (!res.success && res.error) {
          reportSyncError(`Gagal mencatat pelanggaran ke Supabase: ${res.error}`);
        } else if (res.success) {
          clearSyncError();
        }
      });

      if (isNowLocked) {
        setViolationAlert(null);
      } else if (newCount === 1) {
        setViolationAlert({
          show: true,
          title: `Peringatan 1/${maxViolations}: Dilarang meninggalkan halaman ujian!`,
          msg: `Sistem mendeteksi pelanggaran: ${details}. Tetap berada di halaman ujian dalam mode layar penuh.`,
          count: newCount,
          max: maxViolations
        });
      } else {
        setViolationAlert({
          show: true,
          title: `Peringatan ${newCount}/${maxViolations}: Satu kali lagi pelanggaran, akun Anda akan dikunci otomatis!`,
          msg: `Pelanggaran terdeteksi: ${details}. Jika terulang 1x lagi, ujian Anda akan diblokir dan harus dibuka Operator.`,
          count: newCount,
          max: maxViolations
        });
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleViolation('tab_switch', 'Beralih ke tab atau aplikasi lain');
      }
    };

    const onBlur = () => {
      handleViolation('blur_loss', 'Jendela ujian kehilangan fokus');
    };

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        handleViolation('exit_fullscreen', 'Keluar dari mode layar penuh (fullscreen)');
      } else {
        setIsFullscreen(true);
      }
    };

    const onWindowResize = () => {
      // Detect desktop/tablet split-screen without false-triggering on mobile virtual keyboard height changes
      if (typeof window !== 'undefined' && window.screen?.availWidth >= 768) {
        if (window.innerWidth < window.screen.availWidth * 0.65) {
          handleViolation('blur_loss', 'Layar diperkecil / mode split-screen terdeteksi');
        }
      }
    };

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      handleViolation('context_menu', 'Mencoba klik kanan');
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Block F12 (DevTools), Ctrl+C, Ctrl+V, Ctrl+U, Ctrl+P, Ctrl+S
      if (
        e.key === 'F12' ||
        (e.ctrlKey && ['c', 'v', 'u', 'p', 's', 'C', 'V', 'U', 'P', 'S'].includes(e.key))
      ) {
        e.preventDefault();
        handleViolation('devtools_or_shortcut', `Menekan kombinasi tombol terlarang (${e.key})`);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onBlur);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [hasStarted, session.status, session.isLocked, schoolSetting.maxViolations]);

  // Answer handlers (recalculate live provisional score & sync immediately using latest ref state)
  const applyAnswersUpdate = (updatedAnswers: StudentExamSession['answers']) => {
    const latest = sessionRef.current;
    const { scorePg, finalScore } = calculateProvisionalScore(questions, updatedAnswers, latest.scoreEssay || 0);
    updateSessionWithSync({
      ...latest,
      answers: updatedAnswers,
      scorePg,
      finalScore,
      isPassed: finalScore >= exam.kkm,
      currentQuestionIndex,
      timeRemainingSeconds: timeRemainingRef.current,
      isOnline: true,
      lastHeartbeat: Date.now()
    });
    triggerSaveIndicator();
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    const latest = sessionRef.current;
    if (latest.isLocked || latest.status === 'locked') return;
    const currentAnswerObj = latest.answers[questionId] || { answer: '', isDoubtful: false, updatedAt: Date.now() };
    applyAnswersUpdate({
      ...latest.answers,
      [questionId]: {
        ...currentAnswerObj,
        answer: optionId,
        updatedAt: Date.now()
      }
    });
  };

  const handleToggleComplexOption = (questionId: string, optionId: string) => {
    const latest = sessionRef.current;
    if (latest.isLocked || latest.status === 'locked') return;
    const currentAnswerObj = latest.answers[questionId] || { answer: [], isDoubtful: false, updatedAt: Date.now() };
    const currentList = Array.isArray(currentAnswerObj.answer) ? [...currentAnswerObj.answer] : [];

    const exists = currentList.includes(optionId);
    const updatedList = exists 
      ? currentList.filter(id => id !== optionId)
      : [...currentList, optionId].sort();

    applyAnswersUpdate({
      ...latest.answers,
      [questionId]: {
        ...currentAnswerObj,
        answer: updatedList,
        updatedAt: Date.now()
      }
    });
  };

  const handleTextAnswerChange = (questionId: string, text: string) => {
    const latest = sessionRef.current;
    if (latest.isLocked || latest.status === 'locked') return;
    const currentAnswerObj = latest.answers[questionId] || { answer: '', isDoubtful: false, updatedAt: Date.now() };
    applyAnswersUpdate({
      ...latest.answers,
      [questionId]: {
        ...currentAnswerObj,
        answer: text,
        updatedAt: Date.now()
      }
    });
  };

  const handleToggleDoubtful = (questionId: string) => {
    const latest = sessionRef.current;
    const currentAnswerObj = latest.answers[questionId] || { answer: '', isDoubtful: false, updatedAt: Date.now() };
    applyAnswersUpdate({
      ...latest.answers,
      [questionId]: {
        ...currentAnswerObj,
        isDoubtful: !currentAnswerObj.isDoubtful,
        updatedAt: Date.now()
      }
    });
  };

  const handleMatchingSelect = (questionId: string, pairId: string, rightVal: string) => {
    const latest = sessionRef.current;
    if (latest.isLocked || latest.status === 'locked') return;
    const currentAnswerObj = latest.answers[questionId] || { answer: '{}', isDoubtful: false, updatedAt: Date.now() };
    let currentMap: Record<string, string> = {};
    try {
      currentMap = typeof currentAnswerObj.answer === 'string' && currentAnswerObj.answer.startsWith('{')
        ? JSON.parse(currentAnswerObj.answer)
        : {};
    } catch {
      currentMap = {};
    }

    currentMap[pairId] = rightVal;

    applyAnswersUpdate({
      ...latest.answers,
      [questionId]: {
        ...currentAnswerObj,
        answer: JSON.stringify(currentMap),
        updatedAt: Date.now()
      }
    });
  };

  // Submission function (`submitExam`): explicitly computes score, awaits Supabase/server confirmation, handles loading & error states
  const submitExam = async (forcedStatus: 'completed' | 'force_submitted' = 'completed'): Promise<boolean> => {
    if (isSubmitting) return false;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const latest = sessionRef.current;
      const result = await submitExamToSupabase({
        session: latest,
        questions,
        exam,
        forcedStatus,
      });

      if (!result.success) {
        const errMsg =
          result.error || 'Gagal menyimpan hasil ujian ke database. Silakan klik "Ya, Kumpulkan" lagi.';
        setSubmitError(errMsg);
        reportSyncError(`Pengumpulan ujian ke Supabase gagal: ${errMsg}`);
        return false;
      }

      // Only transition screen AFTER database persistence is confirmed
      clearSyncError();
      clearPersistedStudentSession();
      sessionRef.current = result.session;
      onUpdateSession(result.session, { skipSupabaseMirror: true });
      setShowSubmitConfirm(false);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan jaringan saat mengirim nilai.';
      setSubmitError(message);
      reportSyncError(`Pengumpulan ujian gagal: ${message}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const openSubmitConfirm = () => {
    setSubmitError(null);
    setShowSubmitConfirm(true);
  };

  const handleFinalSubmit = async () => {
    await submitExam('completed');
  };

  const handleAutoSubmit = async (reason: string) => {
    const ok = await submitExam('force_submitted');
    if (ok) {
      alert(`Ujian Anda otomatis dikumpulkan karena: ${reason}`);
    } else {
      setShowSubmitConfirm(true);
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. If not started yet, display Exam Greeting & Readiness Check
  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto my-8 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-6 space-y-6">
        <div className="text-center space-y-2 pb-4 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center mx-auto overflow-hidden">
            <img 
              src={schoolSetting?.logoUrl || '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg'} 
              alt="Logo SMP Negeri 12 Banjarbaru" 
              className="w-full h-full object-contain rounded-full" 
            />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Konfirmasi Kesiapan Peserta Ujian</h2>
          <p className="text-xs text-slate-500 font-medium">
            {schoolSetting.name} · Ruang Ujian CBT
          </p>
        </div>

        {!isSupabaseConfigured && supabaseConfigError && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="font-bold block">Konfigurasi Supabase Belum Aktif:</span>
              <span className="font-mono text-[11px] break-words">{supabaseConfigError}</span>
            </div>
          </div>
        )}

        {syncErrorBanner && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-800 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="font-bold text-rose-900 block">Sinkronisasi Supabase Bermasalah:</span>
              <span className="font-mono text-[11px] break-words">{syncErrorBanner}</span>
            </div>
            <button
              type="button"
              onClick={clearSyncError}
              className="p-0.5 text-rose-500 hover:text-rose-800 rounded cursor-pointer"
              aria-label="Tutup peringatan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Available Exams Selector (Strictly for Student's Class) */}
        {(() => {
          const studentEligibleExams = availableExams.filter(ex => 
            isExamMatchingStudentClass(ex, student.classId, student.className)
          );
          if (!studentEligibleExams || studentEligibleExams.length <= 1 || !onSelectExam) return null;

          return (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Pilih Jadwal Ujian Terdaftar untuk Kelas {student.className}:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {studentEligibleExams.map(ex => {
                  const isSelected = ex.id === exam.id;
                  const exCheck = validateExamSchedule(ex, nowTime);
                  const count = questionBank.questions.filter(q => 
                    q.subjectId === ex.subjectId && isQuestionMatchingClass(q.classId, q.grade, student.classId)
                  ).length;
                  return (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => {
                        onSelectExam(ex);
                        setCurrentQuestionIndex(0);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs' 
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate">{ex.subjectName}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold shrink-0 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {count} Soal
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{ex.title}</p>
                      <div className="flex items-center justify-between gap-1.5 mt-1.5 pt-1.5 border-t border-slate-100">
                        <span className="text-[10px] font-mono text-slate-500">
                          {ex.date} · {ex.startTime}-{ex.endTime}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${exCheck.badgeClass}`}>
                          {exCheck.canStart ? 'AKTIF' : exCheck.statusBadge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* 1. Schedule Timing Verification Card (Strict Schedule Window — Live from Supabase) */}
        <div className={`rounded-xl p-4 border transition-all text-xs space-y-3 ${
          scheduleCheck.canStart 
            ? 'bg-emerald-50/70 border-emerald-200' 
            : scheduleCheck.status === 'upcoming' 
              ? 'bg-amber-50/80 border-amber-200' 
              : 'bg-rose-50/80 border-rose-200'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold">
              <Calendar className="w-4 h-4 text-slate-700" />
              <span className="text-slate-900">Jadwal Pelaksanaan Ujian</span>
            </div>
            <div className="flex items-center gap-1.5">
              {onRefreshSchedules && (
                <button
                  type="button"
                  onClick={() => void handleManualRefreshSchedule()}
                  disabled={isRefreshingSchedule}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
                  title="Ambil jadwal terbaru langsung dari Supabase"
                >
                  <RefreshCw className={`w-3 h-3 ${isRefreshingSchedule ? 'animate-spin' : ''}`} />
                  <span>{isRefreshingSchedule ? 'Memuat...' : 'Refresh Jadwal'}</span>
                </button>
              )}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs ${scheduleCheck.badgeClass}`}>
                {scheduleCheck.statusBadge}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-slate-500 block">Jadwal Tanggal & Waktu:</span>
              <span className="font-semibold text-slate-900 block">
                {formatDateIndo(exam.date)}
              </span>
              <span className="font-mono text-blue-700 font-bold block">
                Pukul {exam.startTime} - {exam.endTime} WITA
              </span>
            </div>
            <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-slate-500 block">Waktu Sistem Saat Ini:</span>
              <span className="font-semibold text-slate-900 block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                {scheduleCheck.currentTimeString} WITA
              </span>
              <span className="text-[10px] text-slate-500 block">
                {scheduleCheck.isToday ? 'Hari pelaksanaan ujian (Hari ini)' : 'Di luar tanggal pelaksanaan'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 text-[11px] leading-relaxed">
            {scheduleCheck.canStart ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : scheduleCheck.status === 'upcoming' ? (
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <Lock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <p className={scheduleCheck.canStart ? 'text-emerald-900 font-medium' : scheduleCheck.status === 'upcoming' ? 'text-amber-900 font-medium' : 'text-rose-900 font-medium'}>
              {scheduleCheck.message}
            </p>
          </div>
        </div>

        {/* 2. Student Identity & Question Source Card */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 font-semibold text-slate-700">
            <span>Identitas Peserta Ujian</span>
            <span className="text-blue-700 font-mono">Ruang Ujian Mandiri</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Nomor Induk Siswa (NIS):</span>
            <span className="font-mono font-bold text-slate-900">{student.nis}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Nama Lengkap Siswa:</span>
            <span className="font-semibold text-slate-900">{student.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Rombongan Belajar / Kelas:</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Kelas {student.className}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Mata Pelajaran:</span>
            <span className="font-bold text-slate-900">{exam.subjectName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Naskah Soal Resmi (Guru & Operator):</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded ${questions.length > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {questions.length} Butir Soal Khusus Kelas {student.className}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Alokasi Waktu Pengerjaan:</span>
            <span className="font-medium text-slate-900">{exam.durationMinutes} Menit</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kriteria Ketuntasan Minimal (KKM):</span>
            <span className="font-mono font-bold text-slate-900">{exam.kkm}</span>
          </div>
        </div>

        {/* 3. Cross-Device Compatibility & Real-Time Sync Banner */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5 text-xs text-blue-950">
          <div className="flex items-center gap-2 font-bold text-blue-900">
            <div className="flex items-center gap-1">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <Laptop className="w-4 h-4 text-emerald-600" />
            </div>
            <span>Dukungan Ponsel (HP) & Laptop · Sinkronisasi Otomatis</span>
          </div>
          <p className="text-[11px] text-blue-900/90 leading-relaxed">
            Aplikasi CBT ini dirancang responsif untuk digunakan melalui <strong>telepon genggam (ponsel) maupun laptop</strong>. Data soal yang Anda kerjakan bersumber langsung dari bank soal yang diunggah oleh guru atau operator. Jawaban dan sisa waktu tersinkronisasi terpusat ke server sehingga data di HP dan laptop selalu sama persis.
          </p>
        </div>

        {/* Notice when no questions uploaded yet for this class */}
        {questions.length === 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Paket Soal Belum Tersedia untuk Kelas {student.className}</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Mata pelajaran <strong>{exam.subjectName}</strong> belum memiliki soal yang diunggah oleh guru atau operator untuk <strong>Kelas {student.className}</strong>. Silakan pilih mata pelajaran lain yang terjadwal atau hubungi operator/guru pengampu.
            </p>
          </div>
        )}

        {/* Anti-Cheat Regulations */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-800">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <ShieldAlert className="w-4 h-4 text-slate-700" />
            <span>Tata Tertib Ujian CBT:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-[11px] leading-relaxed">
            <li>Pengerjaan soal hanya dapat dilakukan saat jam jadwal berlangsung (Pukul {exam.startTime} - {exam.endTime} WITA).</li>
            <li>Ujian wajib dilaksanakan dalam mode <strong>Layar Penuh (Fullscreen)</strong>.</li>
            <li>Dilarang berpindah aplikasi, membuka tab lain, atau meminimalkan browser selama ujian berlangsung.</li>
            <li>Batas toleransi pelanggaran <strong>{schoolSetting.maxViolations}x</strong> sebelum lembar ujian terkunci otomatis.</li>
          </ul>
        </div>

        <div className="space-y-2 pt-1">
          {scheduleCheck.canStart && questions.length > 0 ? (
            <button
              onClick={handleStartExam}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Maximize className="w-4 h-4" />
              <span>Mulai Kerjakan Ujian ({questions.length} Soal · Kelas {student.className})</span>
            </button>
          ) : (
            <div className="space-y-2">
              <button
                disabled
                className="w-full py-3.5 px-4 bg-slate-200 text-slate-500 font-semibold rounded-xl text-sm cursor-not-allowed flex items-center justify-center gap-2 border border-slate-300 shadow-none"
              >
                {!scheduleCheck.canStart ? (
                  <>
                    <Lock className="w-4 h-4 text-slate-400" />
                    <span>
                      {scheduleCheck.status === 'upcoming' 
                        ? `Ujian Belum Dimulai (Jadwal: ${exam.startTime} - ${exam.endTime} WITA)`
                        : scheduleCheck.status === 'ended'
                          ? `Waktu Ujian Telah Berakhir (Ditutup Pukul ${exam.endTime} WITA)`
                          : `Ujian Ditutup (${scheduleCheck.statusBadge})`}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Soal Belum Diunggah untuk Kelas {student.className}</span>
                  </>
                )}
              </button>
              {!scheduleCheck.canStart && (
                <p className="text-center text-[11px] text-rose-600 font-medium bg-rose-50 p-2 rounded-lg border border-rose-200">
                  ⛔ Pengerjaan soal hanya bisa dikerjakan pada saat jadwal yang ditentukan ({formatDateIndo(exam.date)} pukul {exam.startTime} - {exam.endTime} WITA).
                </p>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => downloadExamCardsAsHtml([student], schoolSetting, `Kartu_Ujian_${student.nis}_${student.name.replace(/\s+/g, '_')}`, student.name)}
            className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.99]"
            title="Download kartu peserta ujian resmi siswa dalam format file siap cetak / PDF"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Unduh Kartu Peserta Ujian Saya (PDF / Cetak)</span>
          </button>

          <button
            type="button"
            onClick={onExitExam}
            className="w-full py-2.5 px-4 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer text-center font-medium"
          >
            Keluar dari Sesi Siswa
          </button>
        </div>
      </div>
    );
  }

  // 2. If Locked out due to cheat violations
  if (session.isLocked || session.status === 'locked') {
    return (
      <div className="max-w-lg mx-auto my-12 bg-white border-2 border-rose-500 rounded-2xl shadow-2xl p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Ujian Terkunci Otomatis</h2>
        <div className="text-xs text-rose-700 bg-rose-50 p-3.5 rounded-xl border border-rose-200 text-left space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Alasan Pemblokiran Sesi:</span>
          </div>
          <p className="leading-relaxed">
            {session.lockReason || `Anda telah melakukan ${session.violationsCount} kali pelanggaran tata tertib anti-curang.`}
          </p>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Lembar jawaban Anda telah dibekukan sementara untuk menjaga kejujuran ujian. <strong>Segera laporkan kepada guru pengawas atau operator di ruang ujian</strong> untuk membuka kembali akses ujian Anda.
        </p>

        {/* Real-time waiting indicator */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-center gap-2 text-xs text-amber-900">
          <RefreshCw className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
          <span>
            {isSupabaseConfigured
              ? 'Supabase Realtime & Auto-Cek 3 Detik aktif: Layar otomatis terbuka begitu Operator menekan Buka Kunci atau Reset.'
              : 'Menunggu operator membuka kunci... Sistem otomatis memuat ulang saat dibuka.'}
          </span>
        </div>

        {unlockCheckNotice && (
          <div
            className={`p-3 rounded-xl border text-xs text-left leading-relaxed ${
              unlockCheckNotice.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : unlockCheckNotice.type === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}
          >
            {unlockCheckNotice.message}
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
          <button
            type="button"
            disabled={isCheckingUnlock}
            onClick={async () => {
              setIsCheckingUnlock(true);
              setUnlockCheckNotice(null);
              try {
                if (isSupabaseConfigured) {
                  const res = await fetchStudentSessionStatusFromSupabase(student.nis, exam.id);
                  const applied = applyAuthoritativeRemoteState(res, 'manual');
                  if (!applied.unlocked && applied.statusText) {
                    setUnlockCheckNotice({
                      type: res.error ? 'error' : 'warning',
                      message: applied.statusText,
                    });
                  }
                  return;
                }
                const fullData = await fetchServerData();
                if (fullData?.data?.sessions) {
                  const refreshed = fullData.data.sessions.find(
                    s => s.id === session.id || (s.nis === student.nis && s.examId === exam.id)
                  );
                  if (refreshed) {
                    const applied = applyAuthoritativeRemoteState({ found: true, session: refreshed }, 'manual');
                    if (!applied.unlocked && applied.statusText) {
                      setUnlockCheckNotice({ type: 'warning', message: applied.statusText });
                    }
                  }
                }
              } finally {
                setIsCheckingUnlock(false);
              }
            }}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCheckingUnlock ? 'animate-spin' : ''}`} />
            <span>{isCheckingUnlock ? 'Memeriksa Supabase...' : 'Cek Status Pembukaan Kunci'}</span>
          </button>
          <button
            onClick={onExitExam}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-slate-200"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // 3. If submitted / completed
  if (isSessionCompleted(session.status)) {
    return (
      <div className="max-w-md mx-auto my-10 bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-center space-y-5">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ujian Berhasil Dikumpulkan</h2>
          <p className="text-xs text-slate-500 mt-1">
            Terima kasih {student.name}, jawaban Anda telah tersimpan dengan aman di server CBT.
          </p>
        </div>

        {schoolSetting.allowStudentViewResult && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-slate-500">Nilai Ujian Sementara:</span>
            <div className="text-3xl font-bold font-mono text-blue-700">
              {session.finalScore} / 100
            </div>
            <div className="text-xs">
              {session.finalScore >= exam.kkm ? (
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Tuntas KKM ({exam.kkm})
                </span>
              ) : (
                <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Belum Tuntas KKM ({exam.kkm})
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={onExitExam}
          className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Selesai & Keluar
        </button>
      </div>
    );
  }

  // 4. Main Exam Workplace
  const studentAns = session.answers[currentQ.id]?.answer;
  const isDoubtful = !!session.answers[currentQ.id]?.isDoubtful;

  return (
    <div 
      ref={containerRef}
      className="space-y-4 select-none notranslate cbt-secure-text"
      translate="no"
      onContextMenu={e => e.preventDefault()}
      onCopy={e => e.preventDefault()}
      onCut={e => e.preventDefault()}
      onPaste={e => e.preventDefault()}
    >
      {/* Hard Blocking Warning Modal for Violation 1/3 and 2/3 */}
      {violationAlert && violationAlert.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4">
          <div className={`bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border-2 text-center space-y-4 ${
            violationAlert.count >= 2 ? 'border-rose-600' : 'border-amber-500'
          }`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
              violationAlert.count >= 2 ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
            }`}>
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <span className={`inline-block text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                violationAlert.count >= 2
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                PELANGGARAN {violationAlert.count} / {violationAlert.max}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                {violationAlert.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {violationAlert.msg}
              </p>
            </div>
            <button
              type="button"
              onClick={async () => {
                setViolationAlert(null);
                await enterFullscreen();
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-sm transition-colors cursor-pointer ${
                violationAlert.count >= 2
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              Saya Mengerti &amp; Lanjutkan Ujian
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sticky Top Bar (Smartphone View) */}
      <div className="flex md:hidden items-center justify-between bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs sticky top-2 z-20 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2 py-1 rounded-md font-mono shrink-0">
            #{currentQuestionIndex + 1}/{questions.length}
          </span>
          <span className="text-xs font-semibold text-slate-800 truncate" title={exam.subjectName}>
            {exam.subjectName}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg font-mono font-bold text-xs ${
            timeRemaining < 300 
              ? 'bg-rose-100 text-rose-800 animate-pulse' 
              : 'bg-slate-900 text-amber-300'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(timeRemaining)}</span>
          </div>

          <button
            onClick={() => setShowMobileQuestionList(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs"
            title="Daftar Nomor Soal"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Soal</span>
          </button>
        </div>
      </div>

      {/* Desktop Exam Navigation Bar */}
      <div className="hidden md:flex bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-xs">
            <span className="text-slate-400 block">Peserta Ujian:</span>
            <span className="font-semibold text-slate-900">{student.name} ({student.className})</span>
          </div>
          <div className="border-l border-slate-200 pl-3 text-xs">
            <span className="text-slate-400 block">Mata Pelajaran:</span>
            <span className="font-semibold text-blue-700">{exam.subjectName}</span>
          </div>
        </div>

        {/* Server Countdown Timer & Autosave Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className={`w-2 h-2 rounded-full ${saveStatus === 'saved' ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
            <span className="font-mono text-[11px]">{saveStatus === 'saved' ? 'Tersimpan otomatis' : 'Menyimpan...'}</span>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-sm ${
            timeRemaining < 300 
              ? 'bg-rose-100 text-rose-800 animate-pulse' 
              : 'bg-slate-900 text-amber-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTimer(timeRemaining)}</span>
          </div>

          {!isFullscreen && (
            <button
              onClick={enterFullscreen}
              className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg cursor-pointer"
              title="Layar Penuh"
            >
              <Maximize className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Inline Sync Error Banner during Exam */}
      {syncErrorBanner && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-800 flex items-start gap-2.5 shadow-xs">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="font-bold text-rose-900 block">Gagal Menyimpan ke Database Supabase (Cek Koneksi / SQL Migration):</span>
            <span className="font-mono text-[11px] break-words">{syncErrorBanner}</span>
          </div>
          <button
            type="button"
            onClick={clearSyncError}
            className="p-0.5 text-rose-500 hover:text-rose-800 rounded cursor-pointer"
            aria-label="Tutup peringatan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Grid: Question Content (Left) & Palette Navigator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Question Box */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">
                Soal Nomor {currentQuestionIndex + 1}
              </span>
              <span className="text-[11px] font-sans px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                {currentQ.type === 'pg' && 'Pilihan Ganda'}
                {currentQ.type === 'pg_kompleks' && 'Pilihan Ganda Kompleks'}
                {currentQ.type === 'benar_salah' && 'Benar / Salah'}
                {currentQ.type === 'isian' && 'Isian Singkat'}
                {currentQ.type === 'uraian' && 'Uraian / Essay'}
                {currentQ.type === 'mencocokkan' && 'Mencocokkan (Menjodohkan)'}
              </span>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-lg border border-amber-200 transition-colors">
              <input
                type="checkbox"
                checked={isDoubtful}
                onChange={() => handleToggleDoubtful(currentQ.id)}
                className="rounded text-amber-600"
              />
              <Bookmark className="w-3.5 h-3.5" />
              <span>Ragu-ragu</span>
            </label>
          </div>

          {/* Question Prompt with KaTeX (Protected from smart keyboard/browser translation) */}
          <div 
            className="text-slate-800 text-sm leading-relaxed p-4 bg-slate-50 rounded-xl border border-slate-200 notranslate cbt-secure-text"
            translate="no"
          >
            <KatexRenderer content={currentQ.prompt} />
            {currentQ.imageUrl && (
              <img 
                src={currentQ.imageUrl} 
                alt="Gambar Soal" 
                className="max-h-60 object-contain rounded-lg border border-slate-200 mt-3 pointer-events-none" 
              />
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-3 pt-2">
            {/* Multiple Choice (PG) */}
            {currentQ.type === 'pg' && (
              <div className="space-y-2">
                {currentQ.options.map(opt => {
                  const isSelected = studentAns === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-medium shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-mono text-xs shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {opt.id}
                      </span>
                      <div className="flex-1">
                        <KatexRenderer content={opt.text} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Multiple Choice Complex (PG Kompleks) */}
            {currentQ.type === 'pg_kompleks' && (
              <div className="space-y-2">
                <p className="text-xs text-blue-700 font-medium">
                  * Anda dapat memilih lebih dari satu jawaban yang benar:
                </p>
                {currentQ.options.map(opt => {
                  const selectedList = Array.isArray(studentAns) ? studentAns : [];
                  const isSelected = selectedList.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleToggleComplexOption(currentQ.id, opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-medium shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="w-4 h-4 rounded text-blue-600 shrink-0"
                      />
                      <span className="font-bold font-mono text-slate-700 shrink-0">{opt.id}.</span>
                      <div className="flex-1">
                        <KatexRenderer content={opt.text} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Matching (Mencocokkan / Menjodohkan) */}
            {currentQ.type === 'mencocokkan' && currentQ.matchingPairs && (
              <div className="space-y-3">
                <p className="text-xs text-blue-700 font-medium">
                  * Pasangkan setiap item pada kolom kiri dengan jawaban yang sesuai pada pilihan kanan:
                </p>
                <div className="space-y-2.5">
                  {currentQ.matchingPairs.map((pair, pIdx) => {
                    let studentPairs: Record<string, string> = {};
                    try {
                      studentPairs = typeof studentAns === 'string' && studentAns.startsWith('{')
                        ? JSON.parse(studentAns)
                        : {};
                    } catch {
                      studentPairs = {};
                    }
                    const selectedVal = studentPairs[pair.id] || '';

                    return (
                      <div 
                        key={pair.id} 
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-white border border-slate-200 font-mono font-bold text-slate-600 flex items-center justify-center shrink-0">
                            {pIdx + 1}
                          </span>
                          <div className="font-medium text-slate-900">
                            <KatexRenderer content={pair.leftText} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-64">
                          <span className="text-slate-400 font-bold hidden sm:inline">↔</span>
                          <select
                            value={selectedVal}
                            onChange={e => handleMatchingSelect(currentQ.id, pair.id, e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white outline-none focus:border-blue-500 font-medium text-slate-800"
                          >
                            <option value="">-- Pilih Pasangan --</option>
                            {currentQ.matchingPairs?.map(m => (
                              <option key={m.id} value={m.rightText}>
                                {m.rightText}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* True / False (Benar / Salah) */}
            {currentQ.type === 'benar_salah' && (
              <div className="grid grid-cols-2 gap-4">
                {['BENAR', 'SALAH'].map(val => {
                  const isSelected = studentAns === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, val)}
                      className={`p-4 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                        isSelected
                          ? val === 'BENAR'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                            : 'bg-rose-600 text-white border-rose-600 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Short Answer (Isian Singkat) */}
            {currentQ.type === 'isian' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Tuliskan jawaban singkat Anda:
                </label>
                <input
                  type="text"
                  value={typeof studentAns === 'string' ? studentAns : ''}
                  onChange={e => handleTextAnswerChange(currentQ.id, e.target.value)}
                  placeholder="Ketik jawaban di sini..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  translate="no"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-blue-500 font-mono notranslate"
                />
              </div>
            )}

            {/* Essay / Uraian */}
            {currentQ.type === 'uraian' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Tuliskan langkah-langkah dan jawaban lengkap Anda:
                </label>
                <textarea
                  rows={6}
                  value={typeof studentAns === 'string' ? studentAns : ''}
                  onChange={e => handleTextAnswerChange(currentQ.id, e.target.value)}
                  placeholder="Ketikkan penjabaran uraian jawaban Anda secara rinci..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  translate="no"
                  className="w-full p-4 text-xs border border-slate-300 rounded-xl outline-none focus:border-blue-500 leading-relaxed font-sans notranslate"
                />
              </div>
            )}
          </div>

          {/* Bottom Question Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => goToQuestion(currentQuestionIndex - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => goToQuestion(currentQuestionIndex + 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={openSubmitConfirm}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kumpulkan Ujian</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Palette & Overview Navigator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Nomor &amp; Status Soal
            </h3>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {questions.map((q, idx) => {
                const ans = session.answers[q.id]?.answer;
                const doubtful = session.answers[q.id]?.isDoubtful;
                const hasAnswer = ans !== undefined && ans !== '' && (!Array.isArray(ans) || ans.length > 0);
                const isCurrent = currentQuestionIndex === idx;

                let colorClasses = 'bg-slate-50 text-slate-700 border-slate-200';
                if (doubtful) {
                  colorClasses = 'bg-amber-400 text-slate-900 border-amber-500 font-bold';
                } else if (hasAnswer) {
                  colorClasses = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    className={`h-10 rounded-lg border text-xs flex items-center justify-center font-mono transition-all cursor-pointer ${colorClasses} ${
                      isCurrent ? 'ring-2 ring-blue-500 ring-offset-1 font-extrabold' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1.5 text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600" />
                <span>Sudah dijawab</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-400" />
                <span>Ragu-ragu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
                <span>Belum dijawab</span>
              </div>
            </div>

            <button
              onClick={openSubmitConfirm}
              className="w-full mt-2 py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              Kumpulkan Ujian Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Bar (Smartphone) */}
      <div className="flex md:hidden items-center justify-between gap-2 sticky bottom-2 z-20 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-lg mt-4">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={() => goToQuestion(currentQuestionIndex - 1)}
          className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 disabled:opacity-40 rounded-lg min-w-[85px] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          onClick={() => handleToggleDoubtful(currentQ.id)}
          className={`inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            isDoubtful 
              ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xs font-bold' 
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>{isDoubtful ? 'Ragu ✓' : 'Ragu'}</span>
        </button>

        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={() => goToQuestion(currentQuestionIndex + 1)}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs min-w-[85px] cursor-pointer"
          >
            <span>Lanjut</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={openSubmitConfirm}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs min-w-[85px] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim</span>
          </button>
        )}
      </div>

      {/* Mobile Question List Bottom Sheet / Modal */}
      {showMobileQuestionList && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Daftar Nomor Soal</h4>
                <p className="text-[11px] text-slate-500">Kelas {student.className} · {exam.subjectName}</p>
              </div>
              <button
                onClick={() => setShowMobileQuestionList(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const ans = session.answers[q.id]?.answer;
                const doubtful = session.answers[q.id]?.isDoubtful;
                const hasAnswer = ans !== undefined && ans !== '' && (!Array.isArray(ans) || ans.length > 0);
                const isCurrent = currentQuestionIndex === idx;

                let colorClasses = 'bg-slate-50 text-slate-700 border-slate-200';
                if (doubtful) {
                  colorClasses = 'bg-amber-400 text-slate-900 border-amber-500 font-bold';
                } else if (hasAnswer) {
                  colorClasses = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      goToQuestion(idx);
                      setShowMobileQuestionList(false);
                    }}
                    className={`h-11 rounded-xl border text-xs flex items-center justify-center font-mono font-bold transition-all cursor-pointer ${colorClasses} ${
                      isCurrent ? 'ring-2 ring-blue-600 ring-offset-2' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[10px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600 shrink-0" />
                <span>Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-400 shrink-0" />
                <span>Ragu-ragu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 shrink-0" />
                <span>Belum</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setShowMobileQuestionList(false);
                  openSubmitConfirm();
                }}
                className="w-full py-2.5 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl cursor-pointer"
              >
                Selesai & Kumpulkan Ujian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              {isSubmitting ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              {isSubmitting ? 'Mengirim Lembar Jawaban...' : 'Konfirmasi Pengumpulan'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isSubmitting
                ? 'Sedang menghitung skor akhir dan menyimpan jawaban Anda ke database. Mohon jangan tutup halaman ini.'
                : 'Apakah Anda yakin ingin menyelesaikan dan mengumpulkan lembar jawaban ujian ini? Nilai akan langsung dikirim ke Operator dan Guru.'}
            </p>
            {submitError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-left text-xs text-rose-700 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Pengiriman Gagal (Detail Error Supabase)</span>
                </div>
                <p className="font-mono text-[11px] break-words leading-relaxed">{submitError}</p>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setSubmitError(null);
                  setShowSubmitConfirm(false);
                }}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 rounded-lg cursor-pointer"
              >
                Batal &amp; Lanjut
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-lg shadow-sm cursor-pointer"
              >
                {isSubmitting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{isSubmitting ? 'Menyimpan...' : submitError ? 'Coba Kirim Lagi' : 'Ya, Kumpulkan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
