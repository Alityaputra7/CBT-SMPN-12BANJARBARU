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
  WifiOff,
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
  mergeActiveStudentSessionWithRemote,
  mergeExamAnswers,
  FRIENDLY_OFFLINE_SUBMIT_MESSAGE,
  getPendingSubmissionForExam,
  flushPendingSubmissionsToSupabase,
  calculateUnlockCooldown,
  formatCooldownMMSS,
  calculateLogoutPenalty,
  recordCooldownEscapeToSupabase
} from '../../services/supabaseExamService';
import {
  loadPersistedStudentSession,
  savePersistedStudentSession,
  clearActiveExamFromPersistedStudentSession,
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
  studentSessions?: StudentExamSession[];
  onSelectExam?: (exam: ExamSchedule) => void;
  onReturnToScheduleList?: (preferredNextExamId?: string) => Promise<void> | void;
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
  studentSessions = [],
  onSelectExam,
  onReturnToScheduleList,
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
    // Match strictly to the exact active_exam_id so Session 1 never bleeds into Session 2
    if (!p.active_exam_id || p.active_exam_id !== exam.id) return null;
    return p;
  })();

  const [justCompletedExamId, setJustCompletedExamId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() =>
    Math.max(0, session.currentQuestionIndex ?? persistedForExam?.current_question_index ?? 0)
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState<boolean>(() =>
    !isSessionCompleted(session.status) &&
    (session.status === 'in_progress' ||
      session.isLocked ||
      session.status === 'locked' ||
      Boolean(persistedForExam?.has_started))
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
  const [submitRetryStatus, setSubmitRetryStatus] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isQueuedOffline, setIsQueuedOffline] = useState<boolean>(() =>
    Boolean(getPendingSubmissionForExam(student.nis, exam.id))
  );
  const [isAutoSyncingQueue, setIsAutoSyncingQueue] = useState<boolean>(false);
  const [syncErrorBanner, setSyncErrorBanner] = useState<string | null>(null);
  const [isCheckingUnlock, setIsCheckingUnlock] = useState(false);
  const [isRefreshingSchedule, setIsRefreshingSchedule] = useState(false);
  const [unlockCheckNotice, setUnlockCheckNotice] = useState<{
    type: 'info' | 'warning' | 'error';
    message: string;
  } | null>(null);
  // Pure local state as the single source of truth for student answers during active exam
  // (immune to polling/realtime echoes overwriting essay text while the student is typing)
  const [localAnswers, setLocalAnswers] = useState<StudentExamSession['answers']>(() => ({
    ...(session.answers || {})
  }));
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [violationAlert, setViolationAlert] = useState<{
    show: boolean;
    title: string;
    msg: string;
    count: number;
    max: number;
  } | null>(null);
  const [focusLostWarning, setFocusLostWarning] = useState<{
    active: boolean;
    reason: string;
    isSplitScreen: boolean;
    focusReturned: boolean;
  } | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(() => {
    if (
      isSessionCompleted(session.status) ||
      session.isLocked ||
      session.status === 'locked' ||
      session.status === 'not_started'
    ) {
      return null;
    }
    const fromSession =
      typeof session.unlockCooldownUntil === 'number' && session.unlockCooldownUntil > 0
        ? session.unlockCooldownUntil
        : 0;
    const fromStorage =
      typeof persistedForExam?.unlock_cooldown_until === 'number' &&
      persistedForExam.unlock_cooldown_until > 0
        ? persistedForExam.unlock_cooldown_until
        : 0;
    const best = Math.max(fromSession, fromStorage);
    return best > Date.now() ? best : null;
  });
  const [cooldownEscapeAlert, setCooldownEscapeAlert] = useState<string | null>(null);
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
  const localAnswersRef = useRef<StudentExamSession['answers']>(localAnswers);
  const timeRemainingRef = useRef<number>(timeRemaining);
  const currentQuestionIndexRef = useRef<number>(currentQuestionIndex);
  const hasStartedRef = useRef<boolean>(hasStarted);
  const isPageUnloadingRef = useRef<boolean>(false);
  const lastViolationAtRef = useRef<number>(0);
  const lastCooldownEscapeAtRef = useRef<number>(0);
  const autoSubmitLogoutTriggeredRef = useRef<string | null>(null);
  const focusLostStartedAtRef = useRef<number | null>(null);
  const lastSustainedPenaltyAtRef = useRef<number>(0);
  const isSplitScreenActiveRef = useRef<boolean>(false);
  const lastExamIdRef = useRef<string>(exam.id);
  const textDebounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPendingTextSyncRef = useRef<boolean>(false);
  const initialMountHydratedExamRef = useRef<string | null>(null);

  const clearTextDebounceTimer = () => {
    if (textDebounceTimerRef.current) {
      clearTimeout(textDebounceTimerRef.current);
      textDebounceTimerRef.current = null;
    }
  };

  // Sync prop updates onto sessionRef WITHOUT ever letting parent re-renders/polling overwrite active localAnswers
  useEffect(() => {
    const switchedExam = lastExamIdRef.current !== exam.id;
    const isExplicitReset =
      session.status === 'not_started' &&
      !session.isLocked &&
      Object.keys(session.answers || {}).length === 0 &&
      (sessionRef.current.status !== 'not_started' || Object.keys(localAnswersRef.current || {}).length > 0);

    if (switchedExam || isExplicitReset) {
      clearTextDebounceTimer();
      hasPendingTextSyncRef.current = false;
      if (switchedExam) {
        lastExamIdRef.current = exam.id;
        initialMountHydratedExamRef.current = null;
      }
      const freshAnswers = { ...(session.answers || {}) };
      localAnswersRef.current = freshAnswers;
      setLocalAnswers(freshAnswers);
      sessionRef.current = { ...session, answers: freshAnswers };
    } else {
      sessionRef.current = {
        ...session,
        answers: localAnswersRef.current
      };
    }
  }, [session, exam.id]);

  // Clear pending debounce timer on unmount or exam switch
  useEffect(() => {
    return () => {
      clearTextDebounceTimer();
    };
  }, [exam.id]);

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
      // Keep student login identity intact; clear ONLY the completed active_exam_id
      clearActiveExamFromPersistedStudentSession();
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
      lock_count: Math.max(0, targetSession.lockCount ?? 0),
      logout_count: Math.max(0, targetSession.logoutCount ?? 0),
      unlock_cooldown_until:
        !targetSession.isLocked &&
        targetSession.status !== 'locked' &&
        typeof targetSession.unlockCooldownUntil === 'number' &&
        targetSession.unlockCooldownUntil > 0
          ? targetSession.unlockCooldownUntil
          : null,
      saved_at: Date.now()
    });
  };

  // Flush exact timer, current question index, answers, and violation state before browser reload
  useEffect(() => {
    const flushBeforeUnload = () => {
      isPageUnloadingRef.current = true;
      const latest = sessionRef.current;
      if (isSessionCompleted(latest.status)) {
        clearActiveExamFromPersistedStudentSession();
        return;
      }
      const snapshot: StudentExamSession = {
        ...latest,
        answers: localAnswersRef.current,
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

  // Keep local exam screen synchronized strictly with the currently selected `exam.id` & its own session
  useEffect(() => {
    const defaultSec = (exam.durationMinutes || 90) * 60;
    if (session.status === 'not_started' && !session.isLocked) {
      setHasStarted(false);
      setViolationAlert(null);
      setShowSubmitConfirm(false);
      setSubmitError(null);
      setUnlockCheckNotice(null);
      setCooldownUntil(null);
      setCurrentQuestionIndex(0);
      setTimeRemaining(session.timeRemainingSeconds > 0 ? session.timeRemainingSeconds : defaultSec);
    } else if (isSessionCompleted(session.status)) {
      clearActiveExamFromPersistedStudentSession();
      setViolationAlert(null);
      setShowSubmitConfirm(false);
      setCooldownUntil(null);
      // Only show the completion card if the student JUST submitted this exam; otherwise keep on Schedule List
      if (justCompletedExamId !== exam.id) {
        setHasStarted(false);
      }
    } else if (session.isLocked || session.status === 'locked') {
      setHasStarted(true);
      setViolationAlert(null);
      setCooldownUntil(null);
      setTimeRemaining(session.timeRemainingSeconds > 0 ? session.timeRemainingSeconds : defaultSec);
    } else if (!session.isLocked && session.status === 'in_progress') {
      setHasStarted(true);
      setViolationAlert(null);
      const nextCooldown =
        typeof session.unlockCooldownUntil === 'number' && session.unlockCooldownUntil > Date.now()
          ? session.unlockCooldownUntil
          : null;
      setCooldownUntil(prev => {
        if (nextCooldown) return nextCooldown;
        // Preserve unexpired localStorage cooldown on initial mount if prop hasn't synced yet
        if (prev && prev > Date.now() && lastExamIdRef.current === exam.id) return prev;
        return null;
      });
      setCurrentQuestionIndex(Math.max(0, session.currentQuestionIndex || 0));
      setTimeRemaining(session.timeRemainingSeconds > 0 ? session.timeRemainingSeconds : defaultSec);
    }
  }, [exam.id, session.status, session.isLocked, session.id, session.adminActionAt, session.unlockCooldownUntil, exam.durationMinutes, justCompletedExamId]);

  // Live Clock to track exam schedule timing & cooldown countdown in real-time
  const [nowTime, setNowTime] = useState<Date>(() => new Date());
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setNowTime(new Date());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Progressive Unlock Cooldown Penalty live status
  const isInCooldown =
    !isSessionCompleted(session.status) &&
    !session.isLocked &&
    session.status !== 'locked' &&
    session.status !== 'not_started' &&
    Boolean(cooldownUntil && cooldownUntil > nowTime.getTime());

  const cooldownRemainingSec =
    isInCooldown && cooldownUntil
      ? Math.max(0, Math.ceil((cooldownUntil - nowTime.getTime()) / 1000))
      : 0;

  // Automatically close cooldown screen & resume exam once countdown reaches 00:00
  useEffect(() => {
    if (!cooldownUntil) return;
    if (nowTime.getTime() >= cooldownUntil) {
      setCooldownUntil(null);
      setCooldownEscapeAlert(null);
      const latest = sessionRef.current;
      if (latest.unlockCooldownUntil) {
        const resumedSession: StudentExamSession = {
          ...latest,
          unlockCooldownUntil: undefined,
          lockReason: undefined,
          updatedAt: new Date().toISOString(),
        };
        sessionRef.current = resumedSession;
        persistExamSnapshotLocally(resumedSession, hasStartedRef.current);
        onUpdateSession(resumedSession, { skipSupabaseMirror: true });
      }
    }
  }, [cooldownUntil, nowTime]);

  // Safeguard: If session has logoutCount >= 3 and is somehow not completed yet, trigger immediate Auto-Submit
  useEffect(() => {
    if (
      isSessionCompleted(session.status) ||
      session.isLocked ||
      session.status === 'locked' ||
      isSubmitting
    ) {
      return;
    }
    if ((session.logoutCount || 0) >= 3) {
      const triggerKey = `${student.nis}_${exam.id}_${session.logoutCount}`;
      if (autoSubmitLogoutTriggeredRef.current === triggerKey) return;
      autoSubmitLogoutTriggeredRef.current = triggerKey;
      void submitExam(
        'completed',
        'Auto-Submit: Mencapai batas 3x keluar akun (logout) saat ujian berlangsung'
      );
    }
  }, [session.status, session.isLocked, session.logoutCount, student.nis, exam.id, isSubmitting]);

  // Cooldown Escape Watchdog (Requirement 4):
  // If student leaves app / switches tab / opens floating window DURING ANY active Cooldown Screen
  // before countdown reaches 00:00 -> escalate cooldown to 7 minutes (and auto-submit on 3rd strike)
  useEffect(() => {
    if (!isInCooldown || isSessionCompleted(session.status) || session.isLocked) return;

    let blurCheckTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerCooldownEscape = (reason: string) => {
      if (isPageUnloadingRef.current) return;
      const latest = sessionRef.current;
      if (isSessionCompleted(latest.status) || latest.isLocked) return;

      const now = Date.now();
      if (now - lastCooldownEscapeAtRef.current < 3500) return;
      lastCooldownEscapeAtRef.current = now;

      const latestWithAnswers: StudentExamSession = {
        ...latest,
        answers: localAnswersRef.current,
        currentQuestionIndex: currentQuestionIndexRef.current,
        timeRemainingSeconds: timeRemainingRef.current,
      };

      onRecordViolation('cooldown_escape', `Keluar aplikasi saat masa tunggu (${reason})`);

      void recordCooldownEscapeToSupabase({
        session: latestWithAnswers,
        questions,
        exam,
        reason,
        maxViolations: schoolSetting.maxViolations || 3,
      }).then(res => {
        if (!res.success && res.error) {
          reportSyncError(`Gagal mencatat pelanggaran masa tunggu ke Supabase: ${res.error}`);
        } else if (res.success) {
          clearSyncError();
        }

        sessionRef.current = res.session;
        onUpdateSession(res.session, { skipSupabaseMirror: true });

        if (res.autoSubmitted) {
          setCooldownUntil(null);
          setCooldownEscapeAlert(null);
          clearActiveExamFromPersistedStudentSession();
          setJustCompletedExamId(exam.id);
          return;
        }

        const nextUntil = res.session.unlockCooldownUntil || Date.now() + 7 * 60 * 1000;
        setCooldownUntil(nextUntil);
        setCooldownEscapeAlert(
          `Pelanggaran terdeteksi saat masa tunggu (${reason})! Sanksi waktu tunggu dinaikkan menjadi 7 menit. Tetap di halaman ini hingga 00:00 atau ujian akan dikumpulkan otomatis.`
        );
        persistExamSnapshotLocally(res.session, true);
      });
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        triggerCooldownEscape('Berpindah tab atau keluar dari aplikasi');
      }
    };

    const onWindowBlur = () => {
      if (isPageUnloadingRef.current) return;
      if (blurCheckTimer) clearTimeout(blurCheckTimer);
      blurCheckTimer = setTimeout(() => {
        blurCheckTimer = null;
        if (isPageUnloadingRef.current) return;
        if (!document.hasFocus()) {
          triggerCooldownEscape('Kehilangan fokus / membuka jendela mengambang');
        }
      }, 150);
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onWindowBlur);

    return () => {
      if (blurCheckTimer) clearTimeout(blurCheckTimer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onWindowBlur);
    };
  }, [isInCooldown, session.status, session.isLocked, exam.id, schoolSetting.maxViolations]);

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

  // Authoritative reconciler:
  // - On initial mount (`source === 'mount'`), merges remote answers with localStorage backup once.
  // - After initial load (`source === 'realtime' | 'poll' | 'manual'`), STRICTLY FORBIDS overwriting
  //   `answers` / `answers_json` from server echoes. Only Operator administrative actions
  //   (`is_locked`, `violations_count` reset, `extra_time_minutes`, `force_submitted`, or full reset)
  //   are applied so essay typing & deletion never suffer race conditions.
  const applyAuthoritativeRemoteState = (
    res: FetchStudentSessionStatusResult,
    source: 'mount' | 'realtime' | 'poll' | 'manual'
  ): { unlocked: boolean; statusText?: string } => {
    if (res.error) {
      return { unlocked: false, statusText: `Gagal memeriksa Supabase: ${res.error}` };
    }

    const localLatest: StudentExamSession = {
      ...sessionRef.current,
      answers: localAnswersRef.current,
    };
    const defaultDurationSec = (exam.durationMinutes || 90) * 60;

    // 1. No row in Supabase
    if (!res.found || !res.session) {
      // If student refreshed right after starting while offline / before initial upsert landed, preserve & backfill
      if (source === 'mount' && localLatest.status === 'in_progress' && !localLatest.isLocked) {
        initialMountHydratedExamRef.current = exam.id;
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
        clearTextDebounceTimer();
        hasPendingTextSyncRef.current = false;
        const cleanResetSession: StudentExamSession = {
          ...localLatest,
          status: 'not_started',
          isLocked: false,
          lockReason: undefined,
          lockCount: 0,
          logoutCount: 0,
          unlockCooldownUntil: undefined,
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
        localAnswersRef.current = {};
        setLocalAnswers({});
        sessionRef.current = cleanResetSession;
        onUpdateSession(cleanResetSession, { skipSupabaseMirror: true });
        persistExamSnapshotLocally(cleanResetSession, false);
        setHasStarted(false);
        setViolationAlert(null);
        setCooldownUntil(null);
        setCooldownEscapeAlert(null);
        setShowSubmitConfirm(false);
        setUnlockCheckNotice(null);
        setCurrentQuestionIndex(0);
        setTimeRemaining(defaultDurationSec);
        return { unlocked: true, statusText: 'Sesi ujian telah direset oleh Operator.' };
      }
      return { unlocked: false, statusText: 'Belum ada sesi ujian tersimpan di Supabase.' };
    }

    const remote = res.session;
    const isLocalLocked = Boolean(localLatest.isLocked || localLatest.status === 'locked');
    const isRemoteLocked = Boolean(remote.isLocked || remote.status === 'locked');
    const isRemoteReset = remote.status === 'not_started' && !isRemoteLocked;
    const isRemoteDone = isSessionCompleted(remote.status);
    const isAdminUnlocked = isLocalLocked && !isRemoteLocked;
    const isAdminLocked = !isLocalLocked && isRemoteLocked;
    const isAdminViolationReset =
      localLatest.violationsCount > 0 &&
      (remote.violationsCount || 0) === 0 &&
      !isRemoteLocked &&
      Boolean(remote.adminActionAt);
    const isAdminExtraTime = (remote.extraTimeMinutes || 0) > (localLatest.extraTimeMinutes || 0);
    const isAdminActionChanged = Boolean(
      remote.adminActionAt && remote.adminActionAt !== localLatest.adminActionAt
    );
    const isAdminCooldownChanged =
      (remote.unlockCooldownUntil || 0) !== (localLatest.unlockCooldownUntil || 0);

    // A. POST-INITIAL-LOAD (Realtime / Polling / Manual Check):
    // ONLY process Operator administrative changes; NEVER overwrite student's localAnswers!
    if (source !== 'mount') {
      // 1. Operator reset exam completely
      if (isRemoteReset && (localLatest.status !== 'not_started' || isLocalLocked || Object.keys(localAnswersRef.current).length > 0)) {
        clearTextDebounceTimer();
        hasPendingTextSyncRef.current = false;
        const cleanResetSession: StudentExamSession = {
          ...remote,
          status: 'not_started',
          isLocked: false,
          lockReason: undefined,
          lockCount: 0,
          logoutCount: 0,
          unlockCooldownUntil: undefined,
          violationsCount: 0,
          answers: {},
          scorePg: 0,
          scoreEssay: 0,
          finalScore: 0,
          isPassed: false,
          submittedAt: undefined,
          currentQuestionIndex: 0,
          timeRemainingSeconds: remote.timeRemainingSeconds || defaultDurationSec,
        };
        localAnswersRef.current = {};
        setLocalAnswers({});
        sessionRef.current = cleanResetSession;
        onUpdateSession(cleanResetSession, { skipSupabaseMirror: true });
        persistExamSnapshotLocally(cleanResetSession, false);
        setHasStarted(false);
        setViolationAlert(null);
        setCooldownUntil(null);
        setCooldownEscapeAlert(null);
        setShowSubmitConfirm(false);
        setUnlockCheckNotice(null);
        setCurrentQuestionIndex(0);
        setTimeRemaining(cleanResetSession.timeRemainingSeconds);
        return { unlocked: true, statusText: 'Sesi ujian telah direset oleh Operator.' };
      }

      // 2. Operator force-submitted or exam confirmed completed in DB
      if (isRemoteDone && !isSessionCompleted(localLatest.status)) {
        clearTextDebounceTimer();
        hasPendingTextSyncRef.current = false;
        const doneSession: StudentExamSession = {
          ...remote,
          unlockCooldownUntil: undefined,
          answers:
            Object.keys(localAnswersRef.current).length > 0
              ? mergeExamAnswers(remote.answers, localAnswersRef.current)
              : remote.answers,
        };
        sessionRef.current = doneSession;
        onUpdateSession(doneSession, { skipSupabaseMirror: true });
        clearActiveExamFromPersistedStudentSession();
        setCooldownUntil(null);
        setCooldownEscapeAlert(null);
        if (justCompletedExamId !== exam.id) {
          setHasStarted(false);
        }
        setViolationAlert(null);
        setUnlockCheckNotice(null);
        return { unlocked: true, statusText: 'Ujian sudah berstatus selesai di Supabase.' };
      }

      // 3. Operator administrative interventions (unlock, lock, violation reset, extra time, cooldown)
      const hasAdminChange =
        isAdminUnlocked ||
        isAdminLocked ||
        isAdminViolationReset ||
        isAdminExtraTime ||
        isAdminActionChanged ||
        isAdminCooldownChanged;

      if (!hasAdminChange) {
        // Pure echo of the student's own debounced save / heartbeat -> IGNORE COMPLETELY!
        if (isLocalLocked) {
          return {
            unlocked: false,
            statusText: `Status di Supabase masih TERKUNCI (${localLatest.violationsCount}/${schoolSetting.maxViolations || 3} pelanggaran). Pastikan Operator sudah menekan tombol "Buka Kunci" di Dashboard Operator.`,
          };
        }
        return { unlocked: false };
      }

      // Apply ONLY administrative fields while keeping `answers: localAnswersRef.current` 100% untouched
      const nextTimeRemaining = isAdminExtraTime
        ? Math.max(
            timeRemainingRef.current + ((remote.extraTimeMinutes || 0) - (localLatest.extraTimeMinutes || 0)) * 60,
            remote.timeRemainingSeconds || timeRemainingRef.current
          )
        : timeRemainingRef.current;

      const resolvedLockCount = Math.max(remote.lockCount || 0, localLatest.lockCount || 0);
      const resolvedLogoutCount = Math.max(remote.logoutCount || 0, localLatest.logoutCount || 0);
      const resolvedCooldownUntil = isRemoteLocked
        ? undefined
        : remote.unlockCooldownUntil ?? localLatest.unlockCooldownUntil ?? undefined;

      const adminUpdatedSession: StudentExamSession = {
        ...localLatest,
        status: isRemoteLocked ? 'locked' : (remote.status === 'in_progress' ? 'in_progress' : localLatest.status),
        isLocked: isRemoteLocked,
        lockReason: isRemoteLocked
          ? remote.lockReason
          : resolvedCooldownUntil
            ? (remote.lockReason || localLatest.lockReason)
            : undefined,
        lockCount: resolvedLockCount,
        logoutCount: resolvedLogoutCount,
        unlockCooldownUntil: resolvedCooldownUntil,
        violationsCount: isAdminUnlocked || isAdminViolationReset || isAdminActionChanged
          ? (remote.violationsCount || 0)
          : Math.max(localLatest.violationsCount || 0, remote.violationsCount || 0),
        extraTimeMinutes: Math.max(localLatest.extraTimeMinutes || 0, remote.extraTimeMinutes || 0),
        timeRemainingSeconds: nextTimeRemaining,
        adminActionAt: remote.adminActionAt || localLatest.adminActionAt,
        answers: localAnswersRef.current, // NEVER overwrite student's typed answers
      };

      sessionRef.current = adminUpdatedSession;
      onUpdateSession(adminUpdatedSession, { skipSupabaseMirror: true });

      if (isAdminExtraTime && nextTimeRemaining > 0) {
        setTimeRemaining(nextTimeRemaining);
      }

      if (!adminUpdatedSession.isLocked && adminUpdatedSession.status !== 'locked') {
        const startedNow = adminUpdatedSession.status === 'in_progress';
        if (startedNow) setHasStarted(true);
        const activeCooldownMs =
          typeof adminUpdatedSession.unlockCooldownUntil === 'number' &&
          adminUpdatedSession.unlockCooldownUntil > Date.now()
            ? adminUpdatedSession.unlockCooldownUntil
            : null;
        setCooldownUntil(activeCooldownMs);
        persistExamSnapshotLocally(adminUpdatedSession, startedNow);
        setViolationAlert(null);
        setUnlockCheckNotice(null);
        if (isAdminUnlocked || isAdminViolationReset) {
          return { unlocked: true, statusText: 'Kunci ujian telah dibuka oleh Operator!' };
        }
      } else {
        setCooldownUntil(null);
        persistExamSnapshotLocally(adminUpdatedSession, true);
        setHasStarted(true);
        setViolationAlert(null);
      }

      if (adminUpdatedSession.isLocked || adminUpdatedSession.status === 'locked') {
        return {
          unlocked: false,
          statusText: `Status di Supabase masih TERKUNCI (${adminUpdatedSession.violationsCount}/${schoolSetting.maxViolations || 3} pelanggaran). Pastikan Operator sudah menekan tombol "Buka Kunci" di Dashboard Operator.`,
        };
      }
      return { unlocked: false };
    }

    // B. INITIAL MOUNT LOAD (`source === 'mount'`):
    // Reconcile once per exam load so refreshing restores server + localStorage state accurately
    initialMountHydratedExamRef.current = exam.id;
    const mergedResult = mergeActiveStudentSessionWithRemote({
      local: localLatest,
      remote,
      defaultDurationSec,
    });
    const {
      session: nextSess,
      unlockedOrReset,
      isRemoteReset: mergedIsReset,
      isRemoteDone: mergedIsDone,
      needsRemoteBackfill,
    } = mergedResult;

    const mergedAnswers = mergedIsReset ? {} : { ...(nextSess.answers || {}) };
    localAnswersRef.current = mergedAnswers;
    setLocalAnswers(mergedAnswers);

    const hydratedSession: StudentExamSession = {
      ...nextSess,
      answers: mergedAnswers,
    };
    sessionRef.current = hydratedSession;
    onUpdateSession(hydratedSession, { skipSupabaseMirror: true });

    if (mergedIsReset) {
      clearTextDebounceTimer();
      hasPendingTextSyncRef.current = false;
      persistExamSnapshotLocally(hydratedSession, false);
      setHasStarted(false);
      setViolationAlert(null);
      setCooldownUntil(null);
      setShowSubmitConfirm(false);
      setUnlockCheckNotice(null);
      setCurrentQuestionIndex(0);
      setTimeRemaining(hydratedSession.timeRemainingSeconds || defaultDurationSec);
      return { unlocked: true, statusText: 'Sesi ujian telah direset oleh Operator.' };
    }

    if (mergedIsDone) {
      clearTextDebounceTimer();
      hasPendingTextSyncRef.current = false;
      clearActiveExamFromPersistedStudentSession();
      setCooldownUntil(null);
      if (justCompletedExamId !== exam.id) {
        setHasStarted(false);
      }
      setViolationAlert(null);
      setUnlockCheckNotice(null);
      return { unlocked: true, statusText: 'Ujian sudah berstatus selesai di Supabase.' };
    }

    const hydratedCooldownMs =
      !hydratedSession.isLocked &&
      hydratedSession.status === 'in_progress' &&
      typeof hydratedSession.unlockCooldownUntil === 'number' &&
      hydratedSession.unlockCooldownUntil > Date.now()
        ? hydratedSession.unlockCooldownUntil
        : null;
    setCooldownUntil(hydratedCooldownMs);

    const restoredQuestionIdx =
      questions.length > 0
        ? Math.max(0, Math.min(questions.length - 1, hydratedSession.currentQuestionIndex || 0))
        : Math.max(0, hydratedSession.currentQuestionIndex || 0);

    setCurrentQuestionIndex(restoredQuestionIdx);
    if (hydratedSession.timeRemainingSeconds > 0) {
      setTimeRemaining(hydratedSession.timeRemainingSeconds);
    }

    if (!hydratedSession.isLocked && hydratedSession.status !== 'locked') {
      const startedNow = hydratedSession.status === 'in_progress';
      if (startedNow) {
        setHasStarted(true);
      }
      persistExamSnapshotLocally(hydratedSession, startedNow);
      setViolationAlert(null);
      setUnlockCheckNotice(null);

      // If refresh merged newer local answers / tighter timer / online status, sync back to Supabase
      if (isSupabaseConfigured && (needsRemoteBackfill || startedNow)) {
        void syncSessionProgressWithDetails(
          { ...hydratedSession, isOnline: true, lastHeartbeat: Date.now() },
          questions.length
        );
      }

      if (unlockedOrReset) {
        return { unlocked: true, statusText: 'Kunci ujian telah dibuka oleh Operator!' };
      }
    } else {
      persistExamSnapshotLocally(hydratedSession, true);
      setHasStarted(true);
      setViolationAlert(null);
      if (isSupabaseConfigured && needsRemoteBackfill) {
        void syncSessionProgressWithDetails(hydratedSession, questions.length);
      }
      return {
        unlocked: false,
        statusText: `Status di Supabase masih TERKUNCI (${hydratedSession.violationsCount}/${schoolSetting.maxViolations || 3} pelanggaran). Pastikan Operator sudah menekan tombol "Buka Kunci" di Dashboard Operator.`,
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

  // Build the latest authoritative local session snapshot from `localAnswersRef.current`
  const buildLocalSessionSnapshot = (overrides?: Partial<StudentExamSession>): StudentExamSession => {
    const latest = sessionRef.current;
    const answersSnapshot = overrides?.answers ?? localAnswersRef.current;
    const { scorePg, finalScore } = calculateProvisionalScore(questions, answersSnapshot, latest.scoreEssay || 0);
    return {
      ...latest,
      ...overrides,
      answers: answersSnapshot,
      scorePg,
      finalScore,
      isPassed: finalScore >= exam.kkm,
      currentQuestionIndex: overrides?.currentQuestionIndex ?? currentQuestionIndexRef.current,
      timeRemainingSeconds: overrides?.timeRemainingSeconds ?? timeRemainingRef.current,
      isOnline: overrides?.isOnline ?? true,
      lastHeartbeat: overrides?.lastHeartbeat ?? Date.now(),
      updatedAt: overrides?.updatedAt || new Date().toISOString(),
    };
  };

  // Helper to update session state and sync directly to Supabase (with total question count & visible error reporting)
  const updateSessionWithSync = (updated: StudentExamSession, mirrorToSupabase = true) => {
    const stamped: StudentExamSession = {
      ...updated,
      answers: updated.answers ?? localAnswersRef.current,
      updatedAt: updated.updatedAt || new Date().toISOString(),
    };
    sessionRef.current = stamped;
    persistExamSnapshotLocally(stamped);
    onUpdateSession(stamped, { skipSupabaseMirror: true });
    if (mirrorToSupabase && isSupabaseConfigured) {
      setSaveStatus('saving');
      void syncSessionProgressWithDetails(stamped, questions.length).then(res => {
        if (!res.success && !res.skipped && res.error) {
          reportSyncError(`Gagal menyimpan progres/jawaban ke Supabase: ${res.error}`);
        } else if (res.success) {
          clearSyncError();
        }
        if (!hasPendingTextSyncRef.current) {
          setSaveStatus('saved');
        }
      });
    }
  };

  // Immediately flush any pending essay/short-answer edits from localAnswersRef to localStorage & Supabase
  const flushPendingAnswersToSupabase = (overrides?: Partial<StudentExamSession>) => {
    clearTextDebounceTimer();
    hasPendingTextSyncRef.current = false;
    const snapshot = buildLocalSessionSnapshot(overrides);
    updateSessionWithSync(snapshot, true);
    return snapshot;
  };

  // Navigate to a question index: immediately flush any unsaved essay edits to localStorage & Supabase first
  const goToQuestion = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(Math.max(0, questions.length - 1), nextIndex));
    currentQuestionIndexRef.current = clamped;
    setCurrentQuestionIndex(clamped);
    if (hasStarted && sessionRef.current.status === 'in_progress' && !sessionRef.current.isLocked) {
      flushPendingAnswersToSupabase({
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
    setTimeout(() => {
      if (!hasPendingTextSyncRef.current) {
        setSaveStatus('saved');
      }
    }, 300);
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

  // Timer countdown (paused during progressive cooldown penalty; 5-second localStorage checkpoint)
  useEffect(() => {
    if (!hasStarted || isSessionCompleted(session.status) || session.isLocked || session.status === 'locked' || isInCooldown) return;

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
  }, [hasStarted, session.status, session.isLocked, isInCooldown]);

  // Real-Time Periodic Heartbeat to Operator Dashboard (every 10 seconds, skips if essay debounce is actively pending)
  useEffect(() => {
    if (!hasStarted || session.status !== 'in_progress' || session.isLocked) return;

    const heartbeatTimer = setInterval(() => {
      const latest = sessionRef.current;
      if (latest.isLocked || latest.status !== 'in_progress') return;
      // Avoid racing with an active essay typing debounce timer
      if (textDebounceTimerRef.current !== null) return;
      const activeSession = buildLocalSessionSnapshot({
        timeRemainingSeconds: timeRemainingRef.current,
        isOnline: true,
        lastHeartbeat: Date.now()
      });
      updateSessionWithSync(activeSession);
    }, 10000);

    return () => clearInterval(heartbeatTimer);
  }, [hasStarted, session.status, session.isLocked]);

  // Anti-Cheat Event Listeners (3x tolerance: 1/3 warning, 2/3 final warning, 3/3 auto-lock)
  // Hardened against Android Floating Window / Pop-up View / Split Screen with zero false positives
  // Paused automatically while student is waiting on the Progressive Cooldown Penalty screen
  useEffect(() => {
    if (!hasStarted || session.status !== 'in_progress' || session.isLocked || isInCooldown) {
      setFocusLostWarning(null);
      focusLostStartedAtRef.current = null;
      lastSustainedPenaltyAtRef.current = 0;
      isSplitScreenActiveRef.current = false;
      return;
    }

    const maxViolations = schoolSetting.maxViolations || 3;
    const VIOLATION_COOLDOWN_MS = 2500;
    const SUSTAINED_FLOATING_PENALTY_MS = 5000;
    const FLOATING_WINDOW_REASON =
      'Membuka jendela mengambang (Floating Window) / Split Screen / Keluar fokus ujian';

    // Capture baseline viewport dimensions for accurate Split-Screen detection
    const baseline = {
      width: window.innerWidth,
      height: window.innerHeight,
      outerWidth: window.outerWidth || window.innerWidth,
      outerHeight: window.outerHeight || window.innerHeight,
    };

    const isEditableElementFocused = (): boolean => {
      const activeEl = document.activeElement;
      if (!activeEl) return false;
      const tag = activeEl.tagName.toLowerCase();
      return tag === 'textarea' || tag === 'input' || (activeEl as HTMLElement).isContentEditable;
    };

    const checkIsSplitScreenViewport = (): boolean => {
      if (typeof window === 'undefined') return false;
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      const screenAvailW = window.screen?.availWidth || baseline.width;
      const screenAvailH = window.screen?.availHeight || baseline.height;

      // Detect natural phone orientation rotation (portrait <-> landscape): update baseline, NOT a violation
      const looksLikeRotation =
        Math.abs(curW - baseline.height) < 140 && Math.abs(curH - baseline.width) < 140;
      if (looksLikeRotation) {
        baseline.width = curW;
        baseline.height = curH;
        baseline.outerWidth = window.outerWidth || curW;
        baseline.outerHeight = window.outerHeight || curH;
        return false;
      }

      // Update baseline upward if user maximizes or enters fullscreen
      if (curW > baseline.width) baseline.width = curW;
      if (curH > baseline.height) baseline.height = curH;

      // 1. Horizontal shrink (>28% narrower than baseline/screen) — side-by-side Split Screen or resized floating browser
      const refW = Math.min(baseline.width, screenAvailW);
      if (refW > 0 && curW < refW * 0.72) {
        return true;
      }

      // 2. Vertical OS window shrink (top/bottom Android Split Screen):
      // `window.outerHeight` tracks the browser window height (unaffected by mobile soft keyboard on Chrome Android)
      const outerH = window.outerHeight || curH;
      const outerHRatio = screenAvailH > 0 ? outerH / screenAvailH : 1;
      if (screenAvailH >= 500 && outerHRatio < 0.7) {
        return true;
      }

      // 3. Sudden viewport height collapse (>35%) when NO editable input/textarea is focused
      // (excludes Android virtual keyboard sliding up when typing essays/short answers)
      if (!isEditableElementFocused() && baseline.height >= 450 && curH < baseline.height * 0.65) {
        return true;
      }

      return false;
    };

    const handleViolation = (type: ViolationType, details: string, bypassCooldown = false) => {
      if (isPageUnloadingRef.current) return;
      const latestSession = sessionRef.current;
      if (latestSession.isLocked || latestSession.status !== 'in_progress') return;

      // Cooldown 2.5 seconds so a single action (blur + visibilitychange + resize) never double-counts
      const now = Date.now();
      if (!bypassCooldown && now - lastViolationAtRef.current < VIOLATION_COOLDOWN_MS) return;
      lastViolationAtRef.current = now;

      const newCount = (latestSession.violationsCount || 0) + 1;
      const isNowLocked = newCount >= maxViolations;
      const nextLockCount = isNowLocked
        ? (latestSession.lockCount || 0) + 1
        : Math.max(0, latestSession.lockCount || 0);

      onRecordViolation(type, details);

      if (isNowLocked) {
        clearTextDebounceTimer();
        hasPendingTextSyncRef.current = false;
        setFocusLostWarning(null);
        setCooldownUntil(null);
      }

      const latestWithAnswers: StudentExamSession = {
        ...latestSession,
        answers: localAnswersRef.current,
      };

      const updatedSession: StudentExamSession = {
        ...latestWithAnswers,
        violationsCount: newCount,
        isLocked: isNowLocked,
        lockCount: nextLockCount,
        unlockCooldownUntil: isNowLocked ? undefined : latestWithAnswers.unlockCooldownUntil,
        status: isNowLocked ? 'locked' : 'in_progress',
        lockReason: isNowLocked
          ? `Pemblokiran ke-${nextLockCount}: Mencapai batas ${maxViolations}x pelanggaran (${details})`
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
        session: latestWithAnswers,
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
          msg: `Sistem mendeteksi pelanggaran: ${details}. Tutup jendela mengambang / aplikasi lain dan tetap di layar penuh ujian.`,
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

    const engageFocusLossShield = (
      type: ViolationType,
      reason: string,
      isSplitScreen = false
    ) => {
      if (isPageUnloadingRef.current) return;
      const latestSession = sessionRef.current;
      if (latestSession.isLocked || latestSession.status !== 'in_progress') return;

      const now = Date.now();
      if (focusLostStartedAtRef.current === null) {
        focusLostStartedAtRef.current = now;
        lastSustainedPenaltyAtRef.current = now;
      }

      // Immediately blackout/hide exam questions so student cannot read questions behind a floating window
      setFocusLostWarning({
        active: true,
        reason,
        isSplitScreen,
        focusReturned: false,
      });

      handleViolation(type, reason);
    };

    let blurVerifyTimer: ReturnType<typeof setTimeout> | null = null;

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        engageFocusLossShield('tab_switch', 'Beralih ke tab atau aplikasi lain', false);
      }
    };

    const onBlur = () => {
      if (isPageUnloadingRef.current) return;
      // Brief 120ms verification: normal clicks inside exam DOM (textarea, buttons, modal) keep document.hasFocus() === true
      if (blurVerifyTimer) clearTimeout(blurVerifyTimer);
      blurVerifyTimer = setTimeout(() => {
        blurVerifyTimer = null;
        if (isPageUnloadingRef.current) return;
        if (!document.hasFocus()) {
          engageFocusLossShield('blur_loss', FLOATING_WINDOW_REASON, isSplitScreenActiveRef.current);
        }
      }, 120);
    };

    const onFocus = () => {
      if (blurVerifyTimer) {
        clearTimeout(blurVerifyTimer);
        blurVerifyTimer = null;
      }
      const stillSplit = checkIsSplitScreenViewport();
      isSplitScreenActiveRef.current = stillSplit;

      if (document.hasFocus() && !stillSplit) {
        focusLostStartedAtRef.current = null;
        lastSustainedPenaltyAtRef.current = 0;
        // Overlay closes only after floating window/split-screen is closed and focus genuinely returns
        setFocusLostWarning(null);
      } else if (stillSplit) {
        setFocusLostWarning(prev =>
          prev
            ? { ...prev, isSplitScreen: true, focusReturned: document.hasFocus() }
            : {
                active: true,
                reason: 'Mode Split Screen masih aktif. Kembalikan layar ke ukuran penuh untuk melanjutkan ujian.',
                isSplitScreen: true,
                focusReturned: document.hasFocus(),
              }
        );
      }
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
      if (isPageUnloadingRef.current) return;
      const isSplitNow = checkIsSplitScreenViewport();
      isSplitScreenActiveRef.current = isSplitNow;

      if (isSplitNow) {
        engageFocusLossShield(
          'blur_loss',
          'Membuka jendela mengambang (Floating Window) / Split Screen / Ukuran layar menyusut drastis',
          true
        );
      } else if (document.hasFocus()) {
        focusLostStartedAtRef.current = null;
        lastSustainedPenaltyAtRef.current = 0;
        setFocusLostWarning(null);
      }
    };

    // 1-second continuous watchdog for `!document.hasFocus()` (catches Android Pop-up View / Floating Window
    // even if visibilitychange never fires, and escalates violation if kept open > 5 seconds)
    const focusWatchdog = setInterval(() => {
      if (isPageUnloadingRef.current) return;
      const latestSession = sessionRef.current;
      if (latestSession.isLocked || latestSession.status !== 'in_progress') {
        setFocusLostWarning(null);
        return;
      }

      const hasDocFocus = document.hasFocus();
      const isSplitNow = checkIsSplitScreenViewport();
      isSplitScreenActiveRef.current = isSplitNow;

      if (!hasDocFocus || isSplitNow) {
        const now = Date.now();
        const reason = isSplitNow
          ? 'Membuka jendela mengambang (Floating Window) / Split Screen / Ukuran layar menyusut drastis'
          : FLOATING_WINDOW_REASON;

        // Immediately ensure question-hiding overlay is active
        setFocusLostWarning(prev =>
          prev?.active && prev.isSplitScreen === isSplitNow && prev.focusReturned === hasDocFocus
            ? prev
            : {
                active: true,
                reason,
                isSplitScreen: isSplitNow,
                focusReturned: hasDocFocus,
              }
        );

        if (focusLostStartedAtRef.current === null) {
          // Newly detected focus loss via polling
          focusLostStartedAtRef.current = now;
          lastSustainedPenaltyAtRef.current = now;
          handleViolation('blur_loss', reason);
        } else if (now - lastSustainedPenaltyAtRef.current >= SUSTAINED_FLOATING_PENALTY_MS) {
          // Student kept Floating Window / Split Screen open for > 5 seconds -> escalate violation until 3/3 lock
          lastSustainedPenaltyAtRef.current = now;
          handleViolation(
            'blur_loss',
            `${FLOATING_WINDOW_REASON} (dibiarkan terbuka >5 detik)`,
            true
          );
        }
      } else if (focusLostStartedAtRef.current !== null) {
        // Focus fully returned & viewport restored
        focusLostStartedAtRef.current = null;
        lastSustainedPenaltyAtRef.current = 0;
        setFocusLostWarning(null);
      }
    }, 1000);

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
    window.addEventListener('focus', onFocus);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      if (blurVerifyTimer) clearTimeout(blurVerifyTimer);
      clearInterval(focusWatchdog);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [hasStarted, session.status, session.isLocked, isInCooldown, schoolSetting.maxViolations]);

  // Discrete answer handler (PG, PG Kompleks, Benar/Salah, Mencocokkan, Ragu-ragu):
  // Updates pure local state + localStorage + Supabase immediately
  const applyAnswersUpdate = (updatedAnswers: StudentExamSession['answers']) => {
    localAnswersRef.current = updatedAnswers;
    setLocalAnswers(updatedAnswers);
    flushPendingAnswersToSupabase({ answers: updatedAnswers });
    triggerSaveIndicator();
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    const latest = sessionRef.current;
    if (latest.isLocked || latest.status === 'locked') return;
    const prevAnswers = localAnswersRef.current;
    const currentAnswerObj = prevAnswers[questionId] || { answer: '', isDoubtful: false, updatedAt: Date.now() };
    applyAnswersUpdate({
      ...prevAnswers,
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
    const prevAnswers = localAnswersRef.current;
    const currentAnswerObj = prevAnswers[questionId] || { answer: [], isDoubtful: false, updatedAt: Date.now() };
    const currentList = Array.isArray(currentAnswerObj.answer) ? [...currentAnswerObj.answer] : [];

    const exists = currentList.includes(optionId);
    const updatedList = exists 
      ? currentList.filter(id => id !== optionId)
      : [...currentList, optionId].sort();

    applyAnswersUpdate({
      ...prevAnswers,
      [questionId]: {
        ...currentAnswerObj,
        answer: updatedList,
        updatedAt: Date.now()
      }
    });
  };

  // Essay (`uraian`) & Short Answer (`isian`) handler:
  // 1. Instant pure local state update + synchronous localStorage write (0ms lag, immune to network race conditions)
  // 2. Debounced Supabase upsert (1.8 seconds after student stops typing) — never fires per keystroke
  const handleTextAnswerChange = (questionId: string, text: string) => {
    const latest = sessionRef.current;
    if (latest.isLocked || latest.status === 'locked') return;

    const prevAnswers = localAnswersRef.current;
    const currentAnswerObj = prevAnswers[questionId] || { answer: '', isDoubtful: false, updatedAt: Date.now() };
    const updatedAnswers: StudentExamSession['answers'] = {
      ...prevAnswers,
      [questionId]: {
        ...currentAnswerObj,
        answer: text,
        updatedAt: Date.now()
      }
    };

    localAnswersRef.current = updatedAnswers;
    setLocalAnswers(updatedAnswers);

    // Synchronously snapshot to localStorage so sudden refresh never loses a single character
    const localSnapshot = buildLocalSessionSnapshot({ answers: updatedAnswers });
    sessionRef.current = localSnapshot;
    persistExamSnapshotLocally(localSnapshot, true);

    hasPendingTextSyncRef.current = true;
    setSaveStatus('saving');

    clearTextDebounceTimer();
    textDebounceTimerRef.current = setTimeout(() => {
      textDebounceTimerRef.current = null;
      if (isSessionCompleted(sessionRef.current.status) || sessionRef.current.isLocked) {
        hasPendingTextSyncRef.current = false;
        return;
      }
      flushPendingAnswersToSupabase();
    }, 1800);
  };

  // Flush essay/short-answer immediately when the student leaves the input box (`onBlur`)
  const handleTextAnswerBlur = () => {
    if (hasPendingTextSyncRef.current || textDebounceTimerRef.current !== null) {
      if (!isSessionCompleted(sessionRef.current.status) && !sessionRef.current.isLocked) {
        flushPendingAnswersToSupabase();
      }
    }
  };

  const handleToggleDoubtful = (questionId: string) => {
    const prevAnswers = localAnswersRef.current;
    const currentAnswerObj = prevAnswers[questionId] || { answer: '', isDoubtful: false, updatedAt: Date.now() };
    applyAnswersUpdate({
      ...prevAnswers,
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
    const prevAnswers = localAnswersRef.current;
    const currentAnswerObj = prevAnswers[questionId] || { answer: '{}', isDoubtful: false, updatedAt: Date.now() };
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
      ...prevAnswers,
      [questionId]: {
        ...currentAnswerObj,
        answer: JSON.stringify(currentMap),
        updatedAt: Date.now()
      }
    });
  };

  // Keep isQueuedOffline synced when switching between exams
  useEffect(() => {
    setIsQueuedOffline(Boolean(getPendingSubmissionForExam(student.nis, exam.id)));
  }, [student.nis, exam.id]);

  // Background auto-sync for queued offline exam submission:
  // Listens to `window` online event AND runs a 5-second background check until delivered to Supabase
  useEffect(() => {
    if (!isQueuedOffline || isSessionCompleted(session.status)) return;

    let cancelled = false;
    const tryAutoFlushPending = async () => {
      if (cancelled || isSubmitting) return;
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
      const queued = getPendingSubmissionForExam(student.nis, exam.id);
      if (!queued) {
        setIsQueuedOffline(false);
        return;
      }

      setIsAutoSyncingQueue(true);
      try {
        const res = await flushPendingSubmissionsToSupabase({
          filterNis: student.nis,
          filterExamId: exam.id,
        });
        if (cancelled) return;
        const synced = res.syncedSessions.find(
          s => s.nis.trim() === student.nis.trim() && s.examId === exam.id
        );
        if (synced) {
          clearSyncError();
          clearActiveExamFromPersistedStudentSession();
          sessionRef.current = synced;
          setIsQueuedOffline(false);
          setSubmitError(null);
          setSubmitRetryStatus(null);
          setJustCompletedExamId(exam.id);
          onUpdateSession(synced, { skipSupabaseMirror: true });
          setShowSubmitConfirm(false);
          setSaveStatus('saved');
        }
      } finally {
        if (!cancelled) {
          setIsAutoSyncingQueue(false);
        }
      }
    };

    const handleOnline = () => {
      void tryAutoFlushPending();
    };

    window.addEventListener('online', handleOnline);
    const pollInterval = setInterval(() => {
      void tryAutoFlushPending();
    }, 5000);

    // Attempt immediately if signal already came back
    void tryAutoFlushPending();

    return () => {
      cancelled = true;
      window.removeEventListener('online', handleOnline);
      clearInterval(pollInterval);
    };
  }, [isQueuedOffline, isSubmitting, student.nis, exam.id, session.status]);

  // Submission function (`submitExam`): flushes local essay answers, auto-retries up to 4x with backoff,
  // and falls back safely to `cbt_pending_submissions` offline queue if connection is down
  const submitExam = async (
    forcedStatus: 'completed' | 'force_submitted' = 'completed',
    customLockReason?: string
  ): Promise<boolean> => {
    if (isSubmitting) return false;
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitRetryStatus('Mengirim lembar jawaban ke server... (Percobaan 1/4)');

    try {
      // Cancel any pending essay debounce and guarantee the very latest localAnswers are persisted & submitted
      clearTextDebounceTimer();
      hasPendingTextSyncRef.current = false;
      const latestSnapshot = buildLocalSessionSnapshot({ answers: localAnswersRef.current });
      sessionRef.current = latestSnapshot;
      flushSingleSessionToLocalStorage(latestSnapshot);

      const result = await submitExamToSupabase({
        session: latestSnapshot,
        questions,
        exam,
        forcedStatus,
        customLockReason,
        onRetryStatus: (_attempt, _max, statusMsg) => {
          setSubmitRetryStatus(statusMsg);
        },
      });

      if (!result.success) {
        if (result.queuedOffline || result.isNetworkError) {
          setIsQueuedOffline(true);
          setSubmitError(result.error || FRIENDLY_OFFLINE_SUBMIT_MESSAGE);
          return false;
        }
        const errMsg =
          result.error || 'Gagal menyimpan hasil ujian ke database. Silakan klik "Coba Kirim Lagi".';
        setSubmitError(errMsg);
        reportSyncError(`Pengumpulan ujian ke Supabase gagal: ${errMsg}`);
        return false;
      }

      // Only transition screen AFTER database persistence is confirmed
      clearSyncError();
      setIsQueuedOffline(false);
      // Keep student login identity intact; clear ONLY this finished exam's active_exam_id
      clearActiveExamFromPersistedStudentSession();
      sessionRef.current = result.session;
      setJustCompletedExamId(exam.id);
      onUpdateSession(result.session, { skipSupabaseMirror: true });
      setShowSubmitConfirm(false);
      setSaveStatus('saved');
      return true;
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : String(err || '');
      const looksLikeNetwork =
        rawMsg.toLowerCase().includes('fetch') ||
        rawMsg.toLowerCase().includes('network') ||
        (typeof navigator !== 'undefined' && navigator.onLine === false);
      if (looksLikeNetwork) {
        setIsQueuedOffline(true);
        setSubmitError(FRIENDLY_OFFLINE_SUBMIT_MESSAGE);
      } else {
        setSubmitError(rawMsg || 'Terjadi kendala saat mengirim jawaban. Silakan coba lagi.');
        reportSyncError(`Pengumpulan ujian gagal: ${rawMsg}`);
      }
      return false;
    } finally {
      setIsSubmitting(false);
      setSubmitRetryStatus(null);
    }
  };

  // Look up a student's session strictly by `exam_id`
  const getSessionForExam = (targetExamId: string): StudentExamSession | undefined => {
    const matched = studentSessions.find(s => s.examId === targetExamId);
    if (matched) return matched;
    return session.examId === targetExamId ? session : undefined;
  };

  const studentEligibleExams = availableExams.filter(ex =>
    isExamMatchingStudentClass(ex, student.classId, student.className)
  );

  // Next uncompleted & unlocked exam (e.g. Session 2 on the same day after Session 1 finishes)
  const nextAvailableExam = (() => {
    const others = studentEligibleExams.filter(ex => {
      if (ex.id === exam.id) return false;
      const s = getSessionForExam(ex.id);
      const done = s ? isSessionCompleted(s.status) : false;
      const locked = s ? Boolean(s.isLocked || s.status === 'locked') : false;
      return !done && !locked;
    });
    return others.find(ex => validateExamSchedule(ex, nowTime).canStart) || others[0] || null;
  })();

  const handleGoToScheduleList = async (preferredNextExamId?: string) => {
    setJustCompletedExamId(null);
    setHasStarted(false);
    setViolationAlert(null);
    setShowSubmitConfirm(false);
    setSubmitError(null);
    setUnlockCheckNotice(null);
    setCurrentQuestionIndex(0);
    if (document.fullscreenElement && document.exitFullscreen) {
      try {
        await document.exitFullscreen();
      } catch {
        // Ignore fullscreen exit errors
      }
    }
    if (onReturnToScheduleList) {
      await onReturnToScheduleList(preferredNextExamId);
    } else if (preferredNextExamId && onSelectExam) {
      const target = studentEligibleExams.find(e => e.id === preferredNextExamId);
      if (target) onSelectExam(target);
    }
  };

  const openSubmitConfirm = () => {
    // Flush any pending debounced essay/short-answer input immediately before opening confirmation modal
    if (hasPendingTextSyncRef.current || textDebounceTimerRef.current !== null) {
      flushPendingAnswersToSupabase();
    }
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

        {/* Available Exams Selector (Daftar Jadwal Ujian Siswa per exam_id — Kelas Siswa) */}
        {(() => {
          if (!studentEligibleExams || studentEligibleExams.length === 0) return null;

          return (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <label className="block text-xs font-bold text-slate-800">
                  Daftar Jadwal Ujian Kelas {student.className} ({studentEligibleExams.length} Jadwal):
                </label>
                <span className="text-[10px] font-medium text-slate-500">
                  Status berlaku terpisah per mata pelajaran
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {studentEligibleExams.map(ex => {
                  const isSelected = ex.id === exam.id;
                  const exCheck = validateExamSchedule(ex, nowTime);
                  const exSession = getSessionForExam(ex.id);
                  const exIsDone = exSession ? isSessionCompleted(exSession.status) : false;
                  const exIsLocked = exSession ? Boolean(exSession.isLocked || exSession.status === 'locked') : false;
                  const exInProgress = exSession?.status === 'in_progress' && !exIsLocked;
                  const exCooldownSec =
                    exInProgress &&
                    typeof exSession?.unlockCooldownUntil === 'number' &&
                    exSession.unlockCooldownUntil > nowTime.getTime()
                      ? Math.ceil((exSession.unlockCooldownUntil - nowTime.getTime()) / 1000)
                      : 0;
                  const count = questionBank.questions.filter(q => 
                    q.subjectId === ex.subjectId && isQuestionMatchingClass(q.classId, q.grade, student.classId)
                  ).length;

                  const statusLabel = exIsDone
                    ? 'Selesai Dikerjakan'
                    : exIsLocked
                      ? `Terkunci (${exSession?.violationsCount || 3}/${schoolSetting.maxViolations || 3})`
                      : exCooldownSec > 0
                        ? `Masa Tunggu (${formatCooldownMMSS(exCooldownSec)})`
                        : exInProgress
                          ? 'Sedang Dikerjakan'
                          : exCheck.canStart
                            ? 'Tersedia / Mulai Ujian'
                            : exCheck.statusBadge;

                  const statusBadgeStyle = exIsDone
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : exIsLocked
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : exCooldownSec > 0
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : exInProgress
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : exCheck.canStart
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : exCheck.badgeClass;

                  return (
                    <button
                      key={ex.id}
                      type="button"
                      disabled={exIsDone}
                      onClick={() => {
                        if (exIsDone || !onSelectExam) return;
                        setJustCompletedExamId(null);
                        onSelectExam(ex);
                        setCurrentQuestionIndex(exInProgress ? Math.max(0, exSession?.currentQuestionIndex || 0) : 0);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        exIsDone
                          ? 'border-emerald-200 bg-emerald-50/40 opacity-80 cursor-not-allowed'
                          : isSelected
                            ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs cursor-pointer'
                            : 'border-slate-200 bg-white hover:bg-slate-50 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate flex items-center gap-1.5">
                          {exIsDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          {ex.subjectName}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold shrink-0 ${
                          exIsDone
                            ? 'bg-emerald-100 text-emerald-800'
                            : isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                        }`}>
                          {exIsDone && schoolSetting.allowStudentViewResult
                            ? `Nilai: ${exSession?.finalScore ?? 0}`
                            : `${count} Soal`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{ex.title}</p>
                      <div className="flex items-center justify-between gap-1.5 mt-2 pt-1.5 border-t border-slate-200/70">
                        <span className="text-[10px] font-mono text-slate-500">
                          {ex.date} · {ex.startTime}-{ex.endTime}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${statusBadgeStyle}`}>
                          {statusLabel}
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
            <li><strong>Dilarang keluar akun (Logout)</strong> sebelum ujian dikumpulkan — keluar ke-1 sanksi tunggu 5 menit, ke-2 sanksi 7 menit, ke-3 <strong>dikumpulkan otomatis (Auto-Submit)</strong>.</li>
          </ul>
        </div>

        <div className="space-y-2 pt-1">
          {isSessionCompleted(session.status) ? (
            <div className="space-y-2">
              {((session.logoutCount || 0) >= 3 || session.lockReason?.includes('3x keluar akun')) ? (
                <div className="p-3.5 bg-rose-50 text-rose-900 rounded-xl text-xs border border-rose-300 space-y-1 text-left">
                  <div className="font-bold flex items-center gap-1.5 text-rose-700">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Ujian {exam.subjectName} Ditutup &amp; Dikumpulkan Otomatis (3x Keluar Akun)</span>
                  </div>
                  <p className="leading-relaxed text-rose-800">
                    Sesi ujian ini telah ditutup otomatis karena mencapai batas maksimal 3x keluar akun saat ujian berlangsung. Nilai berdasarkan jawaban terakhir sudah tersimpan di server.
                  </p>
                </div>
              ) : (
                <button
                  disabled
                  className="w-full py-3.5 px-4 bg-emerald-50 text-emerald-800 font-semibold rounded-xl text-sm cursor-not-allowed flex items-center justify-center gap-2 border border-emerald-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ujian {exam.subjectName} Sudah Selesai Dikerjakan</span>
                </button>
              )}
              {nextAvailableExam && (
                <button
                  type="button"
                  onClick={() => void handleGoToScheduleList(nextAvailableExam.id)}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Maximize className="w-4 h-4" />
                  <span>Pilih Jadwal Ujian Berikutnya: {nextAvailableExam.subjectName}</span>
                </button>
              )}
            </div>
          ) : scheduleCheck.canStart && questions.length > 0 ? (
            <button
              onClick={handleStartExam}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Maximize className="w-4 h-4" />
              <span>
                {session.status === 'in_progress'
                  ? `Lanjutkan Ujian ${exam.subjectName} (${questions.length} Soal)`
                  : `Mulai Kerjakan Ujian ${exam.subjectName} (${questions.length} Soal · Kelas ${student.className})`}
              </span>
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
    const lockedCountInfo = calculateUnlockCooldown(Math.max(1, session.lockCount || 1));
    return (
      <div className="max-w-lg mx-auto my-12 bg-white border-2 border-rose-500 rounded-2xl shadow-2xl p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
            Pemblokiran ke-{lockedCountInfo.lockCount} · Sanksi Masa Tunggu {lockedCountInfo.penaltyMinutes} Menit
          </span>
          <h2 className="text-xl font-bold text-slate-900">Ujian Terkunci Otomatis</h2>
        </div>
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
          Lembar jawaban Anda telah dibekukan sementara untuk menjaga kejujuran ujian. <strong>Segera laporkan kepada guru pengawas atau operator di ruang ujian</strong> untuk membuka kembali akses ujian Anda. Setelah dibuka, Anda akan dikenakan <strong>sanksi waktu tunggu {lockedCountInfo.penaltyMinutes} menit</strong> sebelum dapat melanjutkan soal.
        </p>

        {/* Real-time waiting indicator */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-center gap-2 text-xs text-amber-900">
          <RefreshCw className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
          <span>
            {isSupabaseConfigured
              ? 'Supabase Realtime & Auto-Cek 3 Detik aktif: Layar otomatis beralih begitu Operator menekan Buka Kunci atau Reset.'
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
          {nextAvailableExam && (
            <button
              type="button"
              onClick={() => void handleGoToScheduleList(nextAvailableExam.id)}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Pilih Jadwal Ujian Lain</span>
            </button>
          )}
          <button
            onClick={onExitExam}
            className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-slate-200"
          >
            Keluar (Logout)
          </button>
        </div>
      </div>
    );
  }

  // 2.5. Progressive Cooldown Penalty Screen (Unlock Cooldown / Forced-Logout Cooldown / Cooldown Escape 7m)
  if (isInCooldown && cooldownRemainingSec > 0) {
    const activeLogoutCount = Math.max(
      0,
      session.logoutCount || persistedForExam?.logout_count || 0
    );
    const activeLockCount = Math.max(
      0,
      session.lockCount || persistedForExam?.lock_count || 0
    );
    const isEscalatedDuringCooldown = Boolean(
      cooldownEscapeAlert || session.lockReason?.includes('Masa Tunggu')
    );
    const isLogoutPenaltyScreen =
      activeLogoutCount > 0 &&
      (Boolean(session.lockReason?.includes('Logout')) || activeLockCount === 0);

    const logoutMeta = calculateLogoutPenalty(
      Math.max(1, activeLogoutCount),
      isEscalatedDuringCooldown
    );
    const unlockMeta = calculateUnlockCooldown(Math.max(1, activeLockCount));

    const displayPenaltyMinutes = isEscalatedDuringCooldown
      ? 7
      : isLogoutPenaltyScreen
        ? logoutMeta.penaltyMinutes
        : unlockMeta.penaltyMinutes;
    const totalPenaltySec = Math.max(1, displayPenaltyMinutes * 60);
    const elapsedPct = Math.min(
      100,
      Math.max(0, Math.round(((totalPenaltySec - cooldownRemainingSec) / totalPenaltySec) * 100))
    );

    const headerBg = isEscalatedDuringCooldown
      ? 'bg-rose-600'
      : isLogoutPenaltyScreen
        ? 'bg-orange-600'
        : 'bg-amber-500';
    const cardBorder = isEscalatedDuringCooldown
      ? 'border-rose-500'
      : isLogoutPenaltyScreen
        ? 'border-orange-500'
        : 'border-amber-500';

    return (
      <div className={`max-w-lg mx-auto my-10 bg-white border-2 ${cardBorder} rounded-2xl shadow-2xl overflow-hidden`}>
        <div className={`${headerBg} px-6 py-4 text-white flex items-center justify-between gap-3`}>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-white/90">
                {isLogoutPenaltyScreen
                  ? `Keluar Akun (Logout) ke-${activeLogoutCount} / 3 · ${exam.subjectName}`
                  : `Pemblokiran ke-${unlockMeta.lockCount} · ${exam.subjectName}`}
              </span>
              <h2 className="text-lg font-extrabold leading-tight">
                {isEscalatedDuringCooldown
                  ? `Sanksi Tambahan - Masa Tunggu (${displayPenaltyMinutes} Menit)`
                  : isLogoutPenaltyScreen
                    ? `Masa Tunggu Sanksi Logout (${displayPenaltyMinutes} Menit)`
                    : 'Sanksi Pelanggaran - Masa Tunggu'}
              </h2>
            </div>
          </div>
          <span className="text-xs font-bold bg-black/25 border border-white/30 px-2.5 py-1 rounded-lg font-mono shrink-0">
            {displayPenaltyMinutes} Menit
          </span>
        </div>

        <div className="p-6 text-center space-y-5">
          {cooldownEscapeAlert && (
            <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-xl text-xs text-rose-900 text-left font-semibold flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{cooldownEscapeAlert}</span>
            </div>
          )}

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed text-left">
            {isLogoutPenaltyScreen ? (
              <>
                Anda tercatat melakukan <strong>keluar akun (logout) ke-{activeLogoutCount}</strong> saat ujian sedang berlangsung. Anda dikenakan sanksi waktu tunggu selama{' '}
                <strong>{displayPenaltyMinutes} menit</strong> sebelum dapat melanjutkan soal.{' '}
                {activeLogoutCount === 2 ? (
                  <span className="text-rose-700 font-bold">
                    PERHATIAN: Keluar akun 1 kali lagi (ke-3) akan langsung menutup &amp; mengumpulkan ujian Anda secara otomatis!
                  </span>
                ) : (
                  <span>
                    Keluar akun ke-2 akan dikenakan sanksi <strong>7 menit</strong>, dan keluar akun ke-3 akan langsung <strong>dikumpulkan otomatis (Auto-Submit)</strong>.
                  </span>
                )}
              </>
            ) : isEscalatedDuringCooldown ? (
              <>
                Anda terdeteksi keluar dari aplikasi atau berpindah tab saat masa tunggu berlangsung. Sesuai aturan anti-kecurangan, sanksi waktu tunggu dinaikkan menjadi{' '}
                <strong>7 menit</strong>.
              </>
            ) : (
              <>
                Akun Anda telah dibuka oleh Operator. Karena ini merupakan{' '}
                <strong>pemblokiran ke-{unlockMeta.lockCount}</strong>, Anda dikenakan sanksi waktu tunggu selama{' '}
                <strong>{unlockMeta.penaltyMinutes} menit</strong> sebelum dapat melanjutkan ujian.
              </>
            )}
          </div>

          <div className="py-5 px-4 bg-slate-900 rounded-2xl text-white space-y-2 shadow-inner">
            <span className="block text-[11px] uppercase tracking-widest text-amber-300 font-semibold">
              Sisa Waktu Tunggu Sanksi
            </span>
            <div className="text-5xl font-black font-mono tracking-wider text-amber-400">
              {formatCooldownMMSS(cooldownRemainingSec)}
            </div>
            <div className="w-full max-w-xs mx-auto h-2 bg-slate-700 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-amber-400 transition-all duration-700"
                style={{ width: `${elapsedPct}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 pt-1">
              Layar ujian akan otomatis terbuka kembali saat hitungan mencapai <strong className="text-white">00:00</strong>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 text-left space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Larangan Selama Masa Tunggu:</span>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 leading-relaxed">
              <li><strong>DILARANG berpindah tab, membuka aplikasi lain, atau logout</strong> sebelum waktu mencapai 00:00 — hukuman akan dinaikkan menjadi <strong>7 menit</strong> (atau Auto-Submit jika mencapai batas 3x).</li>
              <li>Memuat ulang (refresh) halaman atau ganti perangkat <strong>tidak akan mereset</strong> sisa waktu tunggu.</li>
              <li>Jawaban yang sudah Anda isi sebelumnya tetap aman tersimpan di server.</li>
            </ul>
          </div>

          <div className="pt-1 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onExitExam}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-slate-200"
            >
              Keluar (Logout)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. If submitted / completed
  if (isSessionCompleted(session.status)) {
    const isAutoSubmitLogout =
      (session.logoutCount || 0) >= 3 ||
      Boolean(session.lockReason?.includes('3x keluar akun')) ||
      Boolean(session.lockReason?.includes('Auto-Submit'));

    return (
      <div className={`max-w-md mx-auto my-10 bg-white border ${isAutoSubmitLogout ? 'border-rose-300 border-2' : 'border-slate-200'} rounded-2xl shadow-xl p-6 text-center space-y-5`}>
        <div className={`w-14 h-14 ${isAutoSubmitLogout ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'} rounded-2xl flex items-center justify-center mx-auto`}>
          {isAutoSubmitLogout ? <ShieldAlert className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
        </div>
        <div>
          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 border ${
            isAutoSubmitLogout
              ? 'text-rose-700 bg-rose-50 border-rose-200'
              : 'text-emerald-700 bg-emerald-50 border-emerald-200'
          }`}>
            {isAutoSubmitLogout
              ? `${exam.subjectName} · Auto-Submit Sanksi`
              : `${exam.subjectName} · Selesai Dikerjakan`}
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            {isAutoSubmitLogout ? 'Ujian Ditutup & Dikumpulkan Otomatis' : 'Ujian Berhasil Dikumpulkan'}
          </h2>
          {isAutoSubmitLogout ? (
            <div className="mt-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 text-left leading-relaxed">
              <strong>Pemberitahuan Sistem:</strong> Ujian Anda untuk <strong>{exam.title}</strong> telah ditutup dan dikumpulkan secara otomatis karena mencapai batas maksimal <strong>3 kali keluar akun (logout) / pelanggaran saat ujian berlangsung</strong>. Nilai Anda telah dihitung dari jawaban terakhir dan langsung tersimpan ke Rekap Nilai Operator.
            </div>
          ) : (
            <p className="text-xs text-slate-500 mt-1">
              Terima kasih {student.name}, jawaban Anda untuk <strong>{exam.title}</strong> telah tersimpan dengan aman di server Supabase CBT.
            </p>
          )}
        </div>

        {schoolSetting.allowStudentViewResult && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-semibold text-slate-500">Nilai Ujian Sementara ({exam.subjectName}):</span>
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

        {nextAvailableExam && (
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-left space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-blue-900">
                Jadwal Ujian Sesi Berikutnya Tersedia:
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${validateExamSchedule(nextAvailableExam, nowTime).badgeClass}`}>
                {validateExamSchedule(nextAvailableExam, nowTime).canStart ? 'AKTIF SEKARANG' : validateExamSchedule(nextAvailableExam, nowTime).statusBadge}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-900">
              {nextAvailableExam.subjectName} — {nextAvailableExam.title}
            </p>
            <p className="text-[11px] text-slate-600 font-mono">
              {formatDateIndo(nextAvailableExam.date)} · Pukul {nextAvailableExam.startTime} - {nextAvailableExam.endTime} WITA
            </p>
          </div>
        )}

        <div className="space-y-2 pt-1">
          {nextAvailableExam ? (
            <button
              type="button"
              onClick={() => void handleGoToScheduleList(nextAvailableExam.id)}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Lanjut ke Daftar Jadwal ({nextAvailableExam.subjectName})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handleGoToScheduleList()}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Kembali ke Daftar Jadwal Ujian</span>
            </button>
          )}
          <button
            type="button"
            onClick={onExitExam}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-slate-200"
          >
            Selesai & Keluar (Logout)
          </button>
        </div>
      </div>
    );
  }

  // 4. Main Exam Workplace (read exclusively from pure localAnswers state)
  const studentAns = localAnswers[currentQ.id]?.answer;
  const isDoubtful = !!localAnswers[currentQ.id]?.isDoubtful;
  const isShieldActive = Boolean(focusLostWarning?.active);

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
      {/* Full-Screen Anti-Cheat Blackout Overlay (Immediately Hides Questions on Floating Window / Split Screen / Focus Loss) */}
      {isShieldActive && (
        <div
          onClick={async () => {
            window.focus();
            if (document.hasFocus() && !isSplitScreenActiveRef.current) {
              focusLostStartedAtRef.current = null;
              lastSustainedPenaltyAtRef.current = 0;
              setFocusLostWarning(null);
              await enterFullscreen();
            }
          }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-rose-950/98 backdrop-blur-xl p-5 select-none"
        >
          <div className="bg-slate-950/95 border-2 border-rose-500 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4 text-white">
            <div className="w-16 h-16 rounded-2xl bg-rose-600/25 border border-rose-500 text-rose-400 flex items-center justify-center mx-auto animate-pulse">
              <ShieldAlert className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-rose-600 text-white tracking-wide">
                PELANGGARAN {session.violationsCount || 1} / {schoolSetting.maxViolations || 3}
              </span>
              <h3 className="text-lg font-extrabold text-white tracking-tight">
                PERINGATAN PELANGGARAN!
              </h3>
              <p className="text-xs text-rose-100 leading-relaxed">
                {focusLostWarning?.isSplitScreen
                  ? 'Terdeteksi mengaktifkan mode Split Screen / mengecilkan layar ujian. Kembalikan browser ujian ke layar penuh dan ketuk layar ini untuk melanjutkan.'
                  : 'Terdeteksi membuka aplikasi lain / jendela mengambang (Floating Window). Tutup jendela mengambang tersebut dan ketuk layar ini untuk melanjutkan.'}
              </p>
              <p className="text-[11px] text-amber-300 bg-amber-950/60 border border-amber-500/40 rounded-lg p-2.5 leading-relaxed">
                Soal ujian disembunyikan otomatis. Membiarkan jendela mengambang / Split Screen tetap terbuka lebih dari 5 detik akan dihitung sebagai pelanggaran berikutnya hingga akun terkunci otomatis ({schoolSetting.maxViolations || 3}/{schoolSetting.maxViolations || 3}).
              </p>
            </div>
            <button
              type="button"
              onClick={async e => {
                e.stopPropagation();
                window.focus();
                if (document.hasFocus() && !isSplitScreenActiveRef.current) {
                  focusLostStartedAtRef.current = null;
                  lastSustainedPenaltyAtRef.current = 0;
                  setFocusLostWarning(null);
                  await enterFullscreen();
                }
              }}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition-colors cursor-pointer"
            >
              {focusLostWarning?.isSplitScreen
                ? 'Saya Sudah Keluar dari Split Screen — Lanjutkan'
                : 'Tutup Jendela Mengambang & Ketuk untuk Melanjutkan'}
            </button>
          </div>
        </div>
      )}

      {/* Hard Blocking Warning Modal for Violation 1/3 and 2/3 */}
      {!isShieldActive && violationAlert && violationAlert.show && (
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

      {/* Offline Queued Submission Banner (Auto-Syncs When Signal Returns) */}
      {isQueuedOffline && !showSubmitConfirm && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs">
          <div className="flex items-start gap-2.5">
            <WifiOff className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-950">
                Jawaban Aman Tersimpan di HP (Menunggu Sinyal Internet)
              </span>
              <span className="text-[11px] text-amber-800 leading-relaxed">
                {FRIENDLY_OFFLINE_SUBMIT_MESSAGE}
              </span>
            </div>
          </div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              setShowSubmitConfirm(true);
              void handleFinalSubmit();
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shrink-0 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAutoSyncingQueue || isSubmitting ? 'animate-spin' : ''}`} />
            <span>{isAutoSyncingQueue ? 'Mengirim Otomatis...' : 'Coba Kirim Lagi'}</span>
          </button>
        </div>
      )}

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
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-5 transition-all duration-150 ${
        isShieldActive ? 'blur-xl opacity-0 pointer-events-none select-none' : ''
      }`}>
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
                  onBlur={handleTextAnswerBlur}
                  placeholder="Ketik jawaban di sini..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  translate="no"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-blue-500 font-mono notranslate select-text"
                />
              </div>
            )}

            {/* Essay / Uraian */}
            {currentQ.type === 'uraian' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Tuliskan langkah-langkah dan jawaban lengkap Anda:
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {saveStatus === 'saving' ? 'Menyimpan otomatis...' : 'Tersimpan lokal & server'}
                  </span>
                </div>
                <textarea
                  rows={6}
                  value={typeof studentAns === 'string' ? studentAns : ''}
                  onChange={e => handleTextAnswerChange(currentQ.id, e.target.value)}
                  onBlur={handleTextAnswerBlur}
                  placeholder="Ketikkan penjabaran uraian jawaban Anda secara rinci..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  translate="no"
                  className="w-full p-4 text-xs border border-slate-300 rounded-xl outline-none focus:border-blue-500 leading-relaxed font-sans notranslate select-text"
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
                const ans = localAnswers[q.id]?.answer;
                const doubtful = localAnswers[q.id]?.isDoubtful;
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
                const ans = localAnswers[q.id]?.answer;
                const doubtful = localAnswers[q.id]?.isDoubtful;
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
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto ${
              isQueuedOffline && !isSubmitting
                ? 'bg-amber-100 text-amber-600'
                : 'bg-emerald-100 text-emerald-600'
            }`}>
              {isSubmitting || isAutoSyncingQueue ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : isQueuedOffline ? (
                <WifiOff className="w-6 h-6" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              {isSubmitting
                ? 'Mengirim Lembar Jawaban...'
                : isQueuedOffline
                  ? 'Jawaban Aman Tersimpan di HP'
                  : 'Konfirmasi Pengumpulan'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isSubmitting
                ? (submitRetryStatus || 'Menghubungkan ke server... Mohon jangan tutup halaman ini.')
                : isQueuedOffline
                  ? 'Sistem sedang memantau koneksi internet Anda secara otomatis setiap 5 detik.'
                  : 'Apakah Anda yakin ingin menyelesaikan dan mengumpulkan lembar jawaban ujian ini? Nilai akan langsung dikirim ke Operator dan Guru.'}
            </p>
            {isSubmitting && submitRetryStatus && (
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-[11px] font-medium text-blue-800 flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0 text-blue-600" />
                <span>{submitRetryStatus}</span>
              </div>
            )}
            {!isSubmitting && submitError && (
              <div className={`p-3 rounded-xl text-left text-xs space-y-1.5 border ${
                isQueuedOffline
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}>
                <div className={`font-bold flex items-center gap-1.5 ${
                  isQueuedOffline ? 'text-amber-900' : 'text-rose-800'
                }`}>
                  {isQueuedOffline ? (
                    <WifiOff className="w-4 h-4 shrink-0 text-amber-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  )}
                  <span>
                    {isQueuedOffline
                      ? 'Menunggu Koneksi Internet Kembali'
                      : 'Pengiriman Gagal (Detail Error Database)'}
                  </span>
                </div>
                <p className={`text-[11px] break-words leading-relaxed ${
                  isQueuedOffline ? 'font-sans text-amber-900' : 'font-mono text-rose-700'
                }`}>
                  {submitError}
                </p>
                {isQueuedOffline && (
                  <div className="pt-1 flex items-center gap-1.5 text-[10px] font-semibold text-amber-700">
                    <RefreshCw className={`w-3 h-3 ${isAutoSyncingQueue ? 'animate-spin' : ''}`} />
                    <span>
                      {isAutoSyncingQueue
                        ? 'Mencoba mengirim ulang otomatis ke server...'
                        : 'Antrean lokal aktif — akan terkirim otomatis saat sinyal pulih.'}
                    </span>
                  </div>
                )}
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
                <span>
                  {isSubmitting
                    ? (submitRetryStatus?.includes('Percobaan')
                        ? submitRetryStatus.slice(submitRetryStatus.indexOf('('))
                        : 'Mengirim...')
                    : submitError || isQueuedOffline
                      ? 'Coba Kirim Lagi'
                      : 'Ya, Kumpulkan'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
