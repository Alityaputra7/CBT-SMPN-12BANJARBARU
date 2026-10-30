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
  AuditLog 
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
  createInitialStudentSessions 
} from './data/seedData';
import { 
  loadFromStorage, 
  saveToStorage, 
  STORAGE_KEYS, 
  syncStudentSessions, 
  syncClassRoomCounts, 
  clearCbtStorage 
} from './utils/dataSync';
import { 
  fetchServerData, 
  fetchServerVersion, 
  syncServerUpdates, 
  syncSingleSession, 
  resetServerData 
} from './utils/apiSync';
import { isExamMatchingStudentClass } from './utils/classGroups';
import { Navbar } from './components/layout/Navbar';
import { DatabaseSchemaViewer } from './components/erd/DatabaseSchemaViewer';
import { LoginModal } from './components/auth/LoginModal';
import { ChangePasswordModal } from './components/auth/ChangePasswordModal';
import { OperatorDashboard } from './components/operator/OperatorDashboard';
import { GuruDashboard } from './components/guru/GuruDashboard';
import { SiswaExamView } from './components/siswa/SiswaExamView';
import { SecurityAndDeployGuide } from './components/common/SecurityAndDeployGuide';
import { Database, Shield, BookOpen, Clock, Users, ArrowRight, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

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
    if (!loaded || !Array.isArray(loaded) || loaded.length === 0) {
      return INITIAL_TEACHERS;
    }
    return loaded;
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
    if (!loaded || !Array.isArray(loaded) || loaded.length === 0) {
      return INITIAL_SUBJECTS;
    }
    return loaded;
  });
  const [questionBank, setQuestionBank] = useState<QuestionBank>(() => {
    const loaded = loadFromStorage<QuestionBank | null>(STORAGE_KEYS.QUESTIONS, null);
    if (!loaded || !Array.isArray(loaded.questions)) {
      return INITIAL_QUESTION_BANK;
    }
    return loaded;
  });
  const [exams, setExams] = useState<ExamSchedule[]>(() => {
    const loaded = loadFromStorage<ExamSchedule[] | null>(STORAGE_KEYS.EXAMS, null);
    if (loaded !== null && Array.isArray(loaded)) {
      return loaded;
    }
    return INITIAL_EXAMS;
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

  // Auto-sync notification feedback
  const [lastSyncTime, setLastSyncTime] = useState<string>(() => new Date().toLocaleTimeString('id-ID'));
  const [syncFeedbackMessage, setSyncFeedbackMessage] = useState<string | null>(null);

  // Cross-device sync tracking (ensures mobile phones and laptops stay 100% in sync)
  const lastKnownVersion = useRef<number>(1);
  const isSyncingFromServer = useRef<boolean>(false);

  // 1. Initial hydration from server on mount
  useEffect(() => {
    fetchServerData().then(serverRes => {
      if (serverRes && serverRes.success && serverRes.data) {
        isSyncingFromServer.current = true;
        lastKnownVersion.current = serverRes.version;
        const d = serverRes.data;
        if (d.schoolSetting) setSchoolSetting(d.schoolSetting);
        if (d.operator) setOperator(d.operator);
        if (Array.isArray(d.students)) setStudents(d.students);
        if (Array.isArray(d.teachers)) setTeachers(d.teachers);
        if (Array.isArray(d.classes)) setClasses(d.classes);
        if (Array.isArray(d.subjects)) setSubjects(d.subjects);
        if (Array.isArray(d.exams)) setExams(d.exams);
        if (Array.isArray(d.sessions)) setSessions(d.sessions);
        if (d.questionBank) setQuestionBank(d.questionBank);
        if (Array.isArray(d.auditLogs)) setAuditLogs(d.auditLogs);
        setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
        setTimeout(() => { isSyncingFromServer.current = false; }, 600);
      }
    });
  }, []);

  // 2. Real-time background sync interval (checks every 3 seconds)
  useEffect(() => {
    const syncInterval = setInterval(async () => {
      if (isSyncingFromServer.current) return;
      const verRes = await fetchServerVersion();
      if (verRes && verRes.version > lastKnownVersion.current) {
        const fullRes = await fetchServerData();
        if (fullRes && fullRes.success && fullRes.data) {
          isSyncingFromServer.current = true;
          lastKnownVersion.current = fullRes.version;
          const d = fullRes.data;
          if (d.schoolSetting) setSchoolSetting(d.schoolSetting);
          if (d.operator) setOperator(d.operator);
          if (Array.isArray(d.students)) setStudents(d.students);
          if (Array.isArray(d.teachers)) setTeachers(d.teachers);
          if (Array.isArray(d.classes)) setClasses(d.classes);
          if (Array.isArray(d.subjects)) setSubjects(d.subjects);
          if (Array.isArray(d.exams)) setExams(d.exams);
          if (Array.isArray(d.sessions)) setSessions(d.sessions);
          if (d.questionBank) setQuestionBank(d.questionBank);
          if (Array.isArray(d.auditLogs)) setAuditLogs(d.auditLogs);
          setLastSyncTime(new Date().toLocaleTimeString('id-ID'));
          setTimeout(() => { isSyncingFromServer.current = false; }, 600);
        }
      }
    }, 3000);

    return () => clearInterval(syncInterval);
  }, []);

  // Authentication State
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState<boolean>(false);

  // Navigation: 'overview' | 'operator' | 'guru' | 'siswa' | 'panduan' | 'login'
  const [activeSection, setActiveSection] = useState<string>('login');

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

  // Single active session map (prevent duplicate login per student)
  const activeSessionsMap: Record<string, boolean> = {};
  sessions.forEach(s => {
    if (s.isOnline && s.status === 'in_progress') {
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
  const handleUpdateExams = (newExams: ExamSchedule[]) => {
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

    triggerSyncNotification(`Jadwal ujian diperbarui (${newExams.length} jadwal aktif)`);
  };

  // Synchronized setting updater
  const handleUpdateSetting = (newSetting: SchoolSetting) => {
    setSchoolSetting(newSetting);
    saveToStorage(STORAGE_KEYS.SETTING, newSetting);
    syncServerUpdates({ schoolSetting: newSetting });
    triggerSyncNotification('Pengaturan sekolah berhasil diperbarui');
  };

  // Synchronized sessions updater
  const handleUpdateSessions = (newSessions: StudentExamSession[]) => {
    setSessions(newSessions);
    saveToStorage(STORAGE_KEYS.SESSIONS, newSessions);
    syncServerUpdates({ sessions: newSessions });
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
      syncServerUpdates({ questionBank: newBank, exams: updated });
      return updated;
    });

    triggerSyncNotification(`Bank soal diperbarui (${newBank.questions.length} butir soal aktif). Data otomatis tersinkronisasi ke Cloud & ponsel!`);
  };

  // RESET EXAM RESULTS: Single student
  const handleResetSingleExamResult = (sessionId: string, reason?: string) => {
    const primaryExam = exams[0] || INITIAL_EXAMS[0];
    let targetStudentName = '';
    
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id === sessionId) {
          targetStudentName = s.studentName;
          return {
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
            submittedAt: undefined,
            timeRemainingSeconds: primaryExam.durationMinutes * 60,
            extraTimeMinutes: 0,
            isOnline: false,
            lastHeartbeat: Date.now()
          };
        }
        return s;
      });
      saveToStorage(STORAGE_KEYS.SESSIONS, updated);
      syncServerUpdates({ sessions: updated });
      return updated;
    });

    handleAddAuditLog(
      'RESET_HASIL_SISWA', 
      `Mereset hasil ulangan siswa ${targetStudentName || sessionId}. Alasan: ${reason || 'Ujian remedial / perbaikan'}`
    );
    triggerSyncNotification(`Hasil ulangan ${targetStudentName} telah direset. Siswa dapat mengikuti ujian ulang.`);
  };

  // RESET EXAM RESULTS: Batch (all students or per class)
  const handleResetAllExamResults = (targetClassId?: string, reason?: string) => {
    const primaryExam = exams[0] || INITIAL_EXAMS[0];
    let resetCount = 0;

    setSessions(prev => {
      const updated = prev.map(s => {
        if (!targetClassId || targetClassId === 'all' || s.classId === targetClassId) {
          resetCount++;
          return {
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
            submittedAt: undefined,
            timeRemainingSeconds: primaryExam.durationMinutes * 60,
            extraTimeMinutes: 0,
            isOnline: false,
            lastHeartbeat: Date.now()
          };
        }
        return s;
      });
      saveToStorage(STORAGE_KEYS.SESSIONS, updated);
      syncServerUpdates({ sessions: updated });
      return updated;
    });

    const scopeLabel = !targetClassId || targetClassId === 'all' 
      ? 'seluruh kelas' 
      : `kelas ${classes.find(c => c.id === targetClassId)?.name || targetClassId}`;

    handleAddAuditLog(
      'RESET_MASSAL_HASIL', 
      `Mereset hasil ulangan ${scopeLabel} (${resetCount} siswa). Alasan: ${reason || 'Reset ujian massal'}`
    );
    triggerSyncNotification(`Hasil ulangan untuk ${resetCount} siswa pada ${scopeLabel} berhasil direset.`);
  };

  // Restore factory data back to 92 official students & 9 official teachers
  const handleRestoreFactoryData = () => {
    if (confirm('Pulihkan seluruh basis data ke kondisi awal pabrik resmi SMP Negeri 12 Banjarbaru? Seluruh data 92 siswa resmi dan 9 guru resmi akan dimuat kembali.')) {
      clearCbtStorage();
      resetServerData();
      setStudents(INITIAL_STUDENTS);
      setTeachers(INITIAL_TEACHERS);
      setClasses(INITIAL_CLASSES);
      setQuestionBank(INITIAL_QUESTION_BANK);
      setExams(INITIAL_EXAMS);
      setSessions(createInitialStudentSessions(INITIAL_STUDENTS));
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

    if (role === 'operator') {
      if (account?.mustChangePassword) {
        setShowPasswordChangeModal(true);
      }
      setActiveSection('operator');
      handleAddAuditLog('LOGIN_OPERATOR', 'Operator berhasil login ke sistem');
    } else if (role === 'guru') {
      setActiveSection('guru');
      handleAddAuditLog('LOGIN_GURU', `Guru ${account?.name} berhasil login`);
    } else if (role === 'siswa') {
      setActiveSection('siswa');
      handleAddAuditLog('LOGIN_SISWA', `Siswa ${student?.name} (${student?.nis}) berhasil login dengan kode unik`);
    }
  };

  const handleLogout = () => {
    if (currentRole === 'siswa' && currentStudent) {
      // Mark offline
      setSessions(prev => {
        const updated = prev.map(s => {
          if (s.studentId === currentStudent.id) {
            return { ...s, isOnline: false };
          }
          return s;
        });
        saveToStorage(STORAGE_KEYS.SESSIONS, updated);
        return updated;
      });
    }

    // Explicitly guarantee all master data & latest edits remain saved in localStorage
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

    setCurrentRole(null);
    setCurrentUser(null);
    setCurrentStudent(null);
    setActiveSection('login');
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
    handleAddAuditLog(`PELANGGARAN_${type.toUpperCase()}`, `Siswa ${currentStudent.name}: ${details}`);
  };

  // Student active exam selection - strictly filtered for student's class
  const studentAvailableExams = currentStudent
    ? exams.filter(ex => isExamMatchingStudentClass(ex, currentStudent.classId, currentStudent.className))
    : exams;

  const [selectedExamId, setSelectedExamId] = useState<string>(() => exams[0]?.id || 'ex-mat-2026');

  // Keep currentExam consistent with student's class
  const currentExam = currentStudent
    ? (studentAvailableExams.find(e => e.id === selectedExamId) || studentAvailableExams[0] || exams[0] || INITIAL_EXAMS[0])
    : (exams.find(e => e.id === selectedExamId) || exams[0] || INITIAL_EXAMS[0]);

  // Session specific to this student AND this specific exam (prevents mixing exam results)
  const currentStudentSession = currentStudent 
    ? sessions.find(s => s.studentId === currentStudent.id && s.examId === currentExam.id) || {
        id: `sess-${currentStudent.id}-${currentExam.id}`,
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
        deviceInfo: 'Browser CBT Siswa (HP / Komputer)',
        isOnline: true,
        lastHeartbeat: Date.now(),
        answers: {},
        scorePg: 0,
        scoreEssay: 0,
        finalScore: 0,
        isPassed: false
      }
    : sessions[0];

  const handleUpdateStudentSession = (updatedSession: StudentExamSession) => {
    setSessions(prev => {
      const exists = prev.some(s => s.id === updatedSession.id);
      const updated = exists
        ? prev.map(s => s.id === updatedSession.id ? updatedSession : s)
        : [...prev, updatedSession];
      saveToStorage(STORAGE_KEYS.SESSIONS, updated);
      return updated;
    });
    // Instant sync to central server for laptop & phone live synchronization
    syncSingleSession(updatedSession);
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
            onRestoreFactoryData={handleRestoreFactoryData}
            lastSyncTime={lastSyncTime}
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
            lastSyncTime={lastSyncTime}
          />
        )}

        {/* VIEW 5: SISWA EXAM VIEW */}
        {activeSection === 'siswa' && (
          <SiswaExamView
            student={currentStudent || students[0]}
            exam={currentExam}
            availableExams={studentAvailableExams}
            onSelectExam={(ex) => setSelectedExamId(ex.id)}
            questionBank={questionBank}
            session={currentStudentSession}
            onUpdateSession={handleUpdateStudentSession}
            onRecordViolation={handleRecordViolation}
            schoolSetting={schoolSetting}
            onExitExam={() => setActiveSection('login')}
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
