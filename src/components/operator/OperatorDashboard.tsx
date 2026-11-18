import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  FileSpreadsheet, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Download, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Settings, 
  FileText, 
  Printer, 
  Key, 
  RefreshCw,
  Search,
  Check,
  BookOpen,
  Eye,
  Copy,
  Calendar,
  Layers,
  UserPlus,
  CheckSquare,
  Square,
  Unlock,
  Radio
} from 'lucide-react';
import { 
  Student, 
  UserAccount, 
  ClassRoom, 
  Subject, 
  ExamSchedule, 
  StudentExamSession, 
  AuditLog, 
  ExamViolationLog,
  SchoolSetting,
  QuestionBank,
  Question,
  isSessionCompleted
} from '../../types/cbt';
import { generateDynamicToken } from '../../utils/tokenGenerator';
import { EditTeacherModal } from './EditTeacherModal';
import { AddTeacherModal } from './AddTeacherModal';
import { EditStudentModal } from './EditStudentModal';
import { StudentExcelImportModal } from './StudentExcelImportModal';
import { SubjectFormModal } from './SubjectFormModal';
import { ExamScheduleModal } from './ExamScheduleModal';
import { QuestionImportModal } from '../common/QuestionImportModal';
import { QuestionEditorModal } from '../common/QuestionEditorModal';
import { ResetExamResultsModal } from '../common/ResetExamResultsModal';
import { KatexRenderer } from '../common/KatexRenderer';
import { ExportExamResultsModal } from '../common/ExportExamResultsModal';
import { exportExamResultsToCSV, getFilteredResultRows } from '../../utils/exportExamResults';
import { 
  QUESTION_CLASS_GROUPS, 
  isQuestionMatchingClass, 
  getQuestionClassLabel 
} from '../../utils/classGroups';
import { downloadExamCardsAsHtml } from '../../utils/cardDownloader';
import { isSupabaseConfigured, supabaseConfigError } from '../../lib/supabaseClient';
import { unlockStudentSessionInSupabase } from '../../services/supabaseExamService';

interface OperatorDashboardProps {
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
  teachers: UserAccount[];
  onUpdateTeachers: (teachers: UserAccount[]) => void;
  classes: ClassRoom[];
  subjects: Subject[];
  onUpdateSubjects: (subjects: Subject[]) => void;
  exams: ExamSchedule[];
  onUpdateExams: (exams: ExamSchedule[]) => void;
  sessions: StudentExamSession[];
  onUpdateSessions: (sessions: StudentExamSession[]) => void;
  schoolSetting: SchoolSetting;
  onUpdateSetting: (setting: SchoolSetting) => void;
  auditLogs: AuditLog[];
  onAddAuditLog: (action: string, details: string) => void;
  questionBank: QuestionBank;
  onUpdateQuestionBank: (bank: QuestionBank) => void;
  onResetSingleResult?: (sessionId: string, reason?: string) => void;
  onResetAllResults?: (targetClassId?: string, reason?: string) => void;
  onResetLoginSession?: (sessionId: string, studentName: string) => void;
  onRestoreFactoryData?: () => void;
  lastSyncTime?: string;
  violationLogs?: ExamViolationLog[];
  realtimeStatus?: string;
  onRefreshFromSupabase?: () => Promise<void>;
  supabaseError?: string | null;
}

export const OperatorDashboard: React.FC<OperatorDashboardProps> = ({
  students,
  onUpdateStudents,
  teachers,
  onUpdateTeachers,
  classes,
  subjects,
  onUpdateSubjects,
  exams,
  onUpdateExams,
  sessions,
  onUpdateSessions,
  schoolSetting,
  onUpdateSetting,
  auditLogs,
  onAddAuditLog,
  questionBank,
  onUpdateQuestionBank,
  onResetSingleResult,
  onResetAllResults,
  onResetLoginSession,
  onRestoreFactoryData,
  lastSyncTime = '',
  violationLogs = [],
  realtimeStatus = 'idle',
  onRefreshFromSupabase,
  supabaseError = null
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'monitoring' | 'students' | 'teachers' | 'subjects' | 'questions' | 'schedules' | 'results' | 'cards' | 'logs' | 'settings'>('overview');
  const [isUnlockingId, setIsUnlockingId] = useState<string | null>(null);
  const [isRefreshingSupabase, setIsRefreshingSupabase] = useState<boolean>(false);

  // Reset Exam Results Modal States
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [resetTargetSession, setResetTargetSession] = useState<StudentExamSession | null>(null);

  const handleOpenResetSingle = (session: StudentExamSession) => {
    setResetTargetSession(session);
    setShowResetModal(true);
  };

  const handleOpenResetBatch = () => {
    setResetTargetSession(null);
    setShowResetModal(true);
  };

  const handleConfirmResetSingle = (sessionId: string, reason: string) => {
    if (onResetSingleResult) {
      onResetSingleResult(sessionId, reason);
    } else {
      onUpdateSessions(sessions.map(s => s.id === sessionId ? {
        ...s,
        status: 'not_started',
        answers: {},
        scorePg: 0,
        scoreEssay: 0,
        finalScore: 0,
        isPassed: false,
        violationsCount: 0,
        isLocked: false,
        lockReason: undefined,
        deviceSessionId: undefined,
        adminActionAt: Date.now(),
        submittedAt: undefined,
        timeRemainingSeconds: 90 * 60,
        isOnline: false
      } : s));
      onAddAuditLog('RESET_HASIL_SISWA', `Mereset hasil ulangan siswa: ${reason}`);
    }
  };

  const handleConfirmResetBatch = (targetClassId: string, reason: string) => {
    if (onResetAllResults) {
      onResetAllResults(targetClassId, reason);
    } else {
      const now = Date.now();
      onUpdateSessions(sessions.map(s => {
        if (targetClassId === 'all' || s.classId === targetClassId) {
          return {
            ...s,
            status: 'not_started',
            answers: {},
            scorePg: 0,
            scoreEssay: 0,
            finalScore: 0,
            isPassed: false,
            violationsCount: 0,
            isLocked: false,
            lockReason: undefined,
            deviceSessionId: undefined,
            adminActionAt: now,
            submittedAt: undefined,
            timeRemainingSeconds: 90 * 60,
            isOnline: false
          };
        }
        return s;
      }));
      onAddAuditLog('RESET_MASSAL_HASIL', `Mereset hasil ulangan kelas ${targetClassId}: ${reason}`);
    }
  };

  // Token ticker
  const [tokenInfo, setTokenInfo] = useState(generateDynamicToken());
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [monitorSearch, setMonitorSearch] = useState('');
  const [monitorClassFilter, setMonitorClassFilter] = useState<string>('all');
  const [monitorStatusFilter, setMonitorStatusFilter] = useState<string>('all');
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<Student | null>(null);
  const [selectedCardClassFilter, setSelectedCardClassFilter] = useState<string>('all');
  const [cardSearchQuery, setCardSearchQuery] = useState<string>('');

  // Modals for Teachers
  const [showAddTeacherModal, setShowAddTeacherModal] = useState<boolean>(false);
  const [editingTeacher, setEditingTeacher] = useState<UserAccount | null>(null);

  // Modals for Students
  const [showAddStudentModal, setShowAddStudentModal] = useState<boolean>(false);
  const [showStudentExcelImportModal, setShowStudentExcelImportModal] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudentNis, setNewStudentNis] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentClassId, setNewStudentClassId] = useState('cls-1');
  const [newStudentGender, setNewStudentGender] = useState<'L' | 'P'>('L');

  // Modals for Subjects
  const [showSubjectModal, setShowSubjectModal] = useState<boolean>(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  // Modals for Exam Schedules
  const [showExamScheduleModal, setShowExamScheduleModal] = useState<boolean>(false);
  const [editingExamSchedule, setEditingExamSchedule] = useState<ExamSchedule | null>(null);

  // Question Management States
  const [selectedQSubjectFilter, setSelectedQSubjectFilter] = useState<string>('all');
  const [selectedQClassFilter, setSelectedQClassFilter] = useState<string>('all');
  const [showQuestionImportModal, setShowQuestionImportModal] = useState<boolean>(false);
  const [showQuestionEditorModal, setShowQuestionEditorModal] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [selectedQIds, setSelectedQIds] = useState<string[]>([]);

  // Export Results Modal State
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [resultsSubjectFilter, setResultsSubjectFilter] = useState<string>('all');

  const handleDirectExportResults = () => {
    const rows = getFilteredResultRows(
      sessions,
      exams,
      students,
      subjects,
      classes,
      {
        subjectId: resultsSubjectFilter,
        classId: selectedClassFilter,
        statusFilter: 'all'
      }
    );
    const subName = resultsSubjectFilter === 'all' 
      ? 'Semua_Mapel' 
      : subjects.find(s => s.id === resultsSubjectFilter)?.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Mapel';
    const clsName = selectedClassFilter === 'all' 
      ? 'Semua_Kelas' 
      : selectedClassFilter === 'cls-8' 
        ? 'Kelas_VIII' 
        : `Kelas_${classes.find(c => c.id === selectedClassFilter)?.name?.replace(/[^a-zA-Z0-9]/g, '_') || selectedClassFilter}`;
    exportExamResultsToCSV(rows, `Rekap_Nilai_CBT_SMPN12_${subName}_${clsName}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTokenInfo(generateDynamicToken());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ((activeTab === 'results' || activeTab === 'monitoring') && onRefreshFromSupabase) {
      void onRefreshFromSupabase();
    }
  }, [activeTab]);

  const handleManualRefreshSupabase = async () => {
    if (!onRefreshFromSupabase) return;
    setIsRefreshingSupabase(true);
    try {
      await onRefreshFromSupabase();
    } finally {
      setIsRefreshingSupabase(false);
    }
  };

  // Quick stats
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const ongoingExams = exams.filter(e => e.status === 'ongoing').length;
  const activeExaminees = sessions.filter(s => s.status === 'in_progress' && !s.isLocked).length;
  const completedExaminees = sessions.filter(s => isSessionCompleted(s.status)).length;
  const lockedExaminees = sessions.filter(s => s.isLocked || s.status === 'locked').length;
  const violatedExaminees = sessions.filter(s => s.violationsCount > 0 || s.isLocked || s.status === 'locked').length;

  // Realtime Actions
  const handleResetSession = (sessionId: string, studentName: string) => {
    if (onResetLoginSession) {
      onResetLoginSession(sessionId, studentName);
      return;
    }
    const now = Date.now();
    onUpdateSessions(sessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          isOnline: false,
          deviceSessionId: undefined,
          deviceInfo: 'Login Direset Operator',
          lastHeartbeat: now,
          adminActionAt: now
        };
      }
      return s;
    }));
    onAddAuditLog('RESET_LOGIN_SESI', `Mereset sesi login perangkat untuk siswa: ${studentName}`);
  };

  const handleUnlockSession = async (sessionId: string, studentName: string) => {
    const targetSession = sessions.find(s => s.id === sessionId);
    if (!targetSession) return;

    setIsUnlockingId(sessionId);
    try {
      const result = await unlockStudentSessionInSupabase(targetSession, { resetViolations: true });
      onUpdateSessions(sessions.map(s => (s.id === sessionId ? result.session : s)));
      onAddAuditLog(
        'BUKA_KUNCI_SISWA',
        `Operator membuka blokiran ujian dan mereset pelanggaran menjadi 0 untuk siswa: ${studentName}.`
      );
      if (!result.success && result.error) {
        alert(`Kunci lokal dibuka, namun sinkronisasi Supabase bermasalah: ${result.error}`);
      } else {
        alert(`Blokiran ujian siswa "${studentName}" berhasil dibuka dan pelanggaran di-reset ke 0! Layar siswa akan terbuka otomatis.`);
      }
    } finally {
      setIsUnlockingId(null);
    }
  };

  const handleAddExtraTime = (sessionId: string, studentName: string) => {
    const now = Date.now();
    onUpdateSessions(sessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          extraTimeMinutes: s.extraTimeMinutes + 15,
          timeRemainingSeconds: s.timeRemainingSeconds + (15 * 60),
          adminActionAt: now
        };
      }
      return s;
    }));
    onAddAuditLog('TAMBAH_WAKTU', `Menambahkan 15 menit waktu ujian untuk siswa: ${studentName}`);
  };

  const handleForceSubmit = (sessionId: string, studentName: string) => {
    const now = Date.now();
    onUpdateSessions(sessions.map(s => {
      if (s.id === sessionId) {
        const examObj = exams.find(e => e.id === s.examId);
        const kkm = examObj?.kkm || 75;
        return {
          ...s,
          status: 'force_submitted',
          isLocked: false,
          lockReason: undefined,
          isOnline: false,
          deviceSessionId: undefined,
          submittedAt: new Date().toISOString(),
          timeRemainingSeconds: 0,
          isPassed: s.finalScore >= kkm,
          adminActionAt: now
        };
      }
      return s;
    }));
    onAddAuditLog('PAKSA_KUMPUL_JAWABAN', `Memaksa kumpul lembar jawaban siswa: ${studentName}`);
  };

  // Student CRUD
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentNis || !newStudentName) return;
    const cls = classes.find(c => c.id === newStudentClassId);
    const newStd: Student = {
      id: `std-${Date.now()}`,
      nis: newStudentNis.trim(),
      name: newStudentName.trim(),
      classId: newStudentClassId,
      className: cls ? cls.name : 'VII-A',
      gender: newStudentGender,
      roomNumber: 'Ruang 01',
      seatNumber: `${students.length + 1}`
    };
    onUpdateStudents([...students, newStd]);
    onAddAuditLog('TAMBAH_SISWA', `Menambahkan siswa baru: ${newStd.name} (NIS ${newStd.nis})`);
    setNewStudentNis('');
    setNewStudentName('');
    setShowAddStudentModal(false);
  };

  const handleImportExcelStudents = (newStudents: Student[]) => {
    onUpdateStudents([...students, ...newStudents]);
    onAddAuditLog('IMPOR_SISWA_EXCEL', `Berhasil mengimpor ${newStudents.length} siswa baru dari Excel`);
    setShowStudentExcelImportModal(false);
    alert(`Berhasil mengimpor ${newStudents.length} data siswa dari file Excel.`);
  };

  const handleSaveEditedStudent = (updatedStudent: Student) => {
    onUpdateStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    onAddAuditLog('EDIT_SISWA', `Memperbarui data siswa: ${updatedStudent.name} (NIS ${updatedStudent.nis})`);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus data siswa: ${name}?`)) {
      onUpdateStudents(students.filter(s => s.id !== id));
      onAddAuditLog('HAPUS_SISWA', `Menghapus data siswa: ${name}`);
    }
  };

  // Teacher CRUD
  const handleAddNewTeacher = (newTeacher: UserAccount) => {
    onUpdateTeachers([...teachers, newTeacher]);
    onAddAuditLog('TAMBAH_GURU', `Menambahkan guru baru: ${newTeacher.name} (NIP ${newTeacher.usernameOrNip})`);
    setShowAddTeacherModal(false);
    alert(`Guru ${newTeacher.name} berhasil didaftarkan ke sistem.`);
  };

  const handleSaveEditedTeacher = (updatedTeacher: UserAccount) => {
    onUpdateTeachers(teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
    onAddAuditLog('EDIT_GURU', `Memperbarui data dan penugasan guru: ${updatedTeacher.name} (NIP ${updatedTeacher.usernameOrNip})`);
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (id: string, name: string) => {
    if (confirm(`Hapus guru ${name} dari sistem?`)) {
      onUpdateTeachers(teachers.filter(t => t.id !== id));
      onAddAuditLog('HAPUS_GURU', `Menghapus guru: ${name}`);
    }
  };

  // Subject CRUD & Teacher Assignment
  const handleSaveSubject = (savedSubject: Subject, selectedTeacherIds: string[]) => {
    const exists = subjects.some(s => s.id === savedSubject.id);
    let updatedSubjects: Subject[];
    if (exists) {
      updatedSubjects = subjects.map(s => s.id === savedSubject.id ? savedSubject : s);
    } else {
      updatedSubjects = [...subjects, savedSubject];
    }
    onUpdateSubjects(updatedSubjects);

    // Sync teacher assignments
    const updatedTeachers = teachers.map(t => {
      const isAssigned = selectedTeacherIds.includes(t.id);
      let subIds = t.assignedSubjectIds || [];
      if (isAssigned && !subIds.includes(savedSubject.id)) {
        subIds = [...subIds, savedSubject.id];
      } else if (!isAssigned && subIds.includes(savedSubject.id)) {
        subIds = subIds.filter(id => id !== savedSubject.id);
      }
      return { ...t, assignedSubjectIds: subIds };
    });
    onUpdateTeachers(updatedTeachers);

    onAddAuditLog('SIMPAN_MAPEL', `Menyimpan mata pelajaran: ${savedSubject.name} (${savedSubject.code})`);
    setShowSubjectModal(false);
    setEditingSubject(null);
    alert(`Mata pelajaran "${savedSubject.name}" dan penugasan guru berhasil disimpan.`);
  };

  const handleDeleteSubject = (subId: string, subName: string) => {
    if (confirm(`Hapus mata pelajaran ${subName}?`)) {
      onUpdateSubjects(subjects.filter(s => s.id !== subId));
      onAddAuditLog('HAPUS_MAPEL', `Menghapus mata pelajaran: ${subName}`);
    }
  };

  // Exam Schedules CRUD
  const handleSaveExamSchedule = (savedExam: ExamSchedule) => {
    const exists = exams.some(e => e.id === savedExam.id);
    let updatedExams: ExamSchedule[];
    if (exists) {
      updatedExams = exams.map(e => e.id === savedExam.id ? savedExam : e);
    } else {
      updatedExams = [...exams, savedExam];
    }
    onUpdateExams(updatedExams);
    onAddAuditLog('SIMPAN_JADWAL_UJIAN', `Menyimpan jadwal ujian: ${savedExam.title}`);
    setShowExamScheduleModal(false);
    setEditingExamSchedule(null);
    alert(`Jadwal ujian "${savedExam.title}" berhasil disimpan.`);
  };

  const handleDeleteExam = (exId: string, title: string) => {
    if (confirm(`Hapus jadwal ujian ${title}?`)) {
      onUpdateExams(exams.filter(e => e.id !== exId));
      onAddAuditLog('HAPUS_JADWAL_UJIAN', `Menghapus jadwal ujian: ${title}`);
    }
  };

  // Questions Management
  const handleSaveSingleQuestion = (question: Question, targetSubjectId: string, targetClassId: string) => {
    const existingIndex = questionBank.questions.findIndex(q => q.id === question.id);
    let updatedQuestions: Question[];

    const finalSubjectId = targetSubjectId || (selectedQSubjectFilter !== 'all' ? selectedQSubjectFilter : 'sbj-mat');
    const finalClassId = targetClassId || (selectedQClassFilter !== 'all' ? selectedQClassFilter : 'cls-1');
    const derivedGrade = (finalClassId === 'cls-8' || finalClassId === 'cls-8a' || finalClassId === 'cls-8b')
      ? 'VIII'
      : (finalClassId === 'cls-9' ? 'IX' : 'VII');

    const preparedQuestion: Question = {
      ...question,
      subjectId: finalSubjectId,
      classId: finalClassId,
      grade: derivedGrade,
      bankId: `qbank-${finalSubjectId}`
    };

    if (existingIndex >= 0) {
      updatedQuestions = [...questionBank.questions];
      updatedQuestions[existingIndex] = preparedQuestion;
      onAddAuditLog('EDIT_SOAL', `Operator memperbarui soal #${preparedQuestion.number} (${preparedQuestion.type})`);
    } else {
      preparedQuestion.number = questionBank.questions.length + 1;
      updatedQuestions = [...questionBank.questions, preparedQuestion];
      onAddAuditLog('TAMBAH_SOAL', `Operator menambahkan soal baru untuk mapel ${finalSubjectId} (${preparedQuestion.type})`);
    }

    onUpdateQuestionBank({
      ...questionBank,
      totalQuestions: updatedQuestions.length,
      questions: updatedQuestions
    });
    setEditingQuestion(null);
    setShowQuestionEditorModal(false);
    alert(`Soal berhasil disimpan dan langsung disinkronkan ke paket ujian peserta.`);
  };

  const handleSaveImportedQuestions = (imported: Question[], targetSubjectId: string, targetClassId: string) => {
    const finalSubjectId = targetSubjectId || (selectedQSubjectFilter !== 'all' ? selectedQSubjectFilter : 'sbj-mat');
    const finalClassId = targetClassId || (selectedQClassFilter !== 'all' ? selectedQClassFilter : 'cls-1');
    const derivedGrade = (finalClassId === 'cls-8' || finalClassId === 'cls-8a' || finalClassId === 'cls-8b')
      ? 'VIII'
      : (finalClassId === 'cls-9' ? 'IX' : 'VII');
    const startingNum = questionBank.questions.length + 1;

    const renumbered = imported.map((q, idx) => ({
      ...q,
      subjectId: finalSubjectId,
      classId: finalClassId,
      grade: derivedGrade,
      bankId: `qbank-${finalSubjectId}`,
      number: startingNum + idx
    }));
    const updated = [...questionBank.questions, ...renumbered];

    onUpdateQuestionBank({
      ...questionBank,
      totalQuestions: updated.length,
      questions: updated
    });
    onAddAuditLog('IMPOR_SOAL_MASSAL', `Operator berhasil mengimpor ${imported.length} butir soal baru ke mapel ${finalSubjectId}`);
    alert(`Berhasil menambahkan ${imported.length} butir soal ke bank soal mapel terpilih. Soal langsung aktif untuk ujian siswa!`);
  };

  const handleToggleSelectQ = (qId: string) => {
    setSelectedQIds(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleToggleSelectAllQ = (visibleQuestions: Question[]) => {
    const visibleIds = visibleQuestions.map(q => q.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every(id => selectedQIds.includes(id));
    if (allSelected) {
      setSelectedQIds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedQIds(prev => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleBulkDeleteQ = () => {
    if (selectedQIds.length === 0) return;
    if (confirm(`Apakah Anda yakin ingin menghapus ${selectedQIds.length} butir soal terpilih? Tindakan ini tidak dapat dibatalkan.`)) {
      const remainingQuestions = questionBank.questions.filter(q => !selectedQIds.includes(q.id));
      onUpdateQuestionBank({
        ...questionBank,
        totalQuestions: remainingQuestions.length,
        questions: remainingQuestions
      });
      onAddAuditLog('HAPUS_SOAL_MASSAL', `Operator menghapus ${selectedQIds.length} butir soal secara massal`);
      setSelectedQIds([]);
      alert(`Berhasil menghapus ${selectedQIds.length} butir soal.`);
    }
  };

  const handleDeleteQuestion = (qId: string) => {
    if (confirm('Hapus butir soal ini dari bank soal?')) {
      const filtered = questionBank.questions.filter(q => q.id !== qId);
      onUpdateQuestionBank({
        ...questionBank,
        totalQuestions: filtered.length,
        questions: filtered
      });
      setSelectedQIds(prev => prev.filter(id => id !== qId));
      onAddAuditLog('HAPUS_SOAL', `Operator menghapus butir soal`);
    }
  };

  const handleDuplicateQuestion = (q: Question) => {
    const dup: Question = {
      ...q,
      id: `q-${Date.now()}`,
      number: questionBank.questions.length + 1,
      prompt: `${q.prompt} (Salinan)`
    };
    onUpdateQuestionBank({
      ...questionBank,
      totalQuestions: questionBank.questions.length + 1,
      questions: [...questionBank.questions, dup]
    });
    onAddAuditLog('DUPLIKAT_SOAL', `Operator menduplikasi butir soal #${q.number}`);
  };

  const filteredStudents = students.filter(s => {
    const matchClass = selectedClassFilter === 'all' || s.classId === selectedClassFilter;
    const matchSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.nis.includes(studentSearch);
    return matchClass && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar Navigation for Operator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Dashboard Operator CBT
            </h2>
            <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
              Akses Penuh
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {schoolSetting.name} · Tahun Ajaran {schoolSetting.academicYear} ({schoolSetting.semester})
          </p>
        </div>

        {/* Dynamic Token Widget for Operator */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-4 py-2.5 rounded-xl shadow-sm border border-blue-800">
          <div>
            <div className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">
              Kode Unik Siswa (Server)
            </div>
            <div className="text-lg font-mono font-bold tracking-widest text-amber-300">
              {tokenInfo.token}
            </div>
          </div>
          <div className="text-right border-l border-white/20 pl-3">
            <div className="text-[10px] text-blue-200">Berganti dalam:</div>
            <div className="text-xs font-mono font-bold text-white flex items-center justify-end gap-1">
              <Clock className="w-3 h-3 text-amber-300" />
              {tokenInfo.expiresInSeconds}s
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto print:hidden">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Ringkasan
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'monitoring' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Monitor Real-Time ({activeExaminees})</span>
          {lockedExaminees > 0 && (
            <span className="px-1.5 py-0.2 bg-rose-600 text-white text-[10px] font-bold rounded-full">
              {lockedExaminees} Terkunci
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'students' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Data Siswa ({students.length})
        </button>
        <button
          onClick={() => setActiveTab('teachers')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'teachers' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Data Guru ({teachers.length})
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'subjects' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Mata Pelajaran ({subjects.length})
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'questions' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bank Soal ({questionBank.questions.length})
        </button>
        <button
          onClick={() => setActiveTab('schedules')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'schedules' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Jadwal Ujian ({exams.length})
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'results' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Rekap Nilai
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kartu Ujian & Absensi
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'logs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Audit Log
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'settings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pengaturan
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="text-xs font-medium text-slate-500">Total Siswa Terdaftar</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{totalStudents}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Kelas 7, 8A, 8B, 9</div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="text-xs font-medium text-slate-500">Guru / Pengawas</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{totalTeachers}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Semua Mata Pelajaran</div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="text-xs font-medium text-slate-500">Sedang Mengerjakan</div>
              <div className="text-2xl font-bold font-mono text-blue-600 mt-1">{activeExaminees}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Sesi Ujian Aktif</div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="text-xs font-medium text-slate-500">Terkunci / Curang</div>
              <div className="text-2xl font-bold font-mono text-rose-600 mt-1">{lockedExaminees}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Perlu Tindakan Pengawas</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Jadwal Ujian Aktif</h3>
                <p className="text-xs text-slate-500">
                  {exams[0]?.title} · {exams[0]?.subjectName} · Durasi {exams[0]?.durationMinutes} Menit
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowExamScheduleModal(true)}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                >
                  + Tambah Jadwal Ujian
                </button>
                <button
                  onClick={() => setActiveTab('monitoring')}
                  className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                >
                  Monitor Real-Time →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700">Sudah Mengumpulkan:</span>
                <p className="text-base font-bold font-mono text-emerald-600 mt-0.5">{completedExaminees} Siswa</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700">Sedang Ujian:</span>
                <p className="text-base font-bold font-mono text-blue-600 mt-0.5">{activeExaminees} Siswa</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700">Belum Memulai:</span>
                <p className="text-base font-bold font-mono text-slate-600 mt-0.5">
                  {totalStudents - activeExaminees - completedExaminees - lockedExaminees} Siswa
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MONITORING REAL-TIME */}
      {activeTab === 'monitoring' && (() => {
        const maxViolationsAllowed = schoolSetting.maxViolations || 3;
        const lockedOrViolatedSessions = sessions.filter(
          s => s.isLocked || s.status === 'locked' || s.violationsCount > 0
        );

        const getMonitorPriority = (s: StudentExamSession) => {
          if (s.isLocked || s.status === 'locked') return 0;
          if (s.violationsCount > 0 && s.status === 'in_progress') return 1;
          if (s.status === 'in_progress') return 2;
          if (isSessionCompleted(s.status)) return 3;
          if (s.isOnline) return 4;
          return 5;
        };

        const filteredMonitoringSessions = sessions
          .filter(s => {
            const matchClass = monitorClassFilter === 'all' || s.classId === monitorClassFilter;
            const matchSearch =
              !monitorSearch.trim() ||
              s.studentName.toLowerCase().includes(monitorSearch.toLowerCase()) ||
              s.nis.includes(monitorSearch.trim());
            const isLockedFlag = s.isLocked || s.status === 'locked';
            const effectiveStatus = isLockedFlag
              ? 'locked'
              : isSessionCompleted(s.status)
                ? 'submitted'
                : s.status === 'in_progress'
                  ? 'in_progress'
                  : 'not_started';
            const matchStatus =
              monitorStatusFilter === 'all'
                ? true
                : monitorStatusFilter === 'violations'
                  ? isLockedFlag || s.violationsCount > 0
                  : effectiveStatus === monitorStatusFilter;
            return matchClass && matchSearch && matchStatus;
          })
          .sort((a, b) => {
            const pDiff = getMonitorPriority(a) - getMonitorPriority(b);
            if (pDiff !== 0) return pDiff;
            const hbDiff = (b.lastHeartbeat || 0) - (a.lastHeartbeat || 0);
            if (hbDiff !== 0) return hbDiff;
            return a.studentName.localeCompare(b.studentName);
          });

        return (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Pemantauan Ujian Siswa Secara Real-Time
                  </h3>
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                    isSupabaseConfigured && realtimeStatus === 'SUBSCRIBED'
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-blue-700 bg-blue-50 border-blue-200'
                  }`}>
                    <Radio className="w-3 h-3 animate-pulse" />
                    {isSupabaseConfigured && realtimeStatus === 'SUBSCRIBED'
                      ? `Supabase Realtime LIVE${lastSyncTime ? ` · ${lastSyncTime}` : ''}`
                      : `Auto-Sync 3 Detik ${lastSyncTime ? `(${lastSyncTime})` : ''}`}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pantau status login, progres soal per mapel, pelanggaran (maks {maxViolationsAllowed}x), nilai sementara/akhir, serta buka kunci atau reset akun siswa.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {onRefreshFromSupabase && (
                  <button
                    onClick={handleManualRefreshSupabase}
                    disabled={isRefreshingSupabase}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer disabled:opacity-60"
                    title="Tarik data sesi & pelanggaran terbaru dari Supabase"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshingSupabase ? 'animate-spin' : ''}`} />
                    {isRefreshingSupabase ? 'Memuat...' : 'Refresh Supabase'}
                  </button>
                )}
                <button
                  onClick={handleOpenResetBatch}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                  title="Reset hasil ulangan untuk seluruh siswa atau per kelas"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                  Reset Semua Hasil Ulangan
                </button>
              </div>
            </div>

            {!isSupabaseConfigured && supabaseConfigError && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Konfigurasi Supabase Belum Aktif:</span>
                  <span className="font-mono text-[11px] break-words">{supabaseConfigError}</span>
                </div>
              </div>
            )}

            {supabaseError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Gagal Sinkronisasi Supabase:</span>
                  <span className="font-mono text-[11px] break-words">{supabaseError}</span>
                </div>
              </div>
            )}

            {/* Real-Time Violation & Lock Alert Banner */}
            {lockedOrViolatedSessions.length > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-rose-800 text-xs font-bold">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>
                      Peringatan Real-Time: {lockedExaminees} siswa terkunci ({maxViolationsAllowed}/{maxViolationsAllowed} pelanggaran), {violatedExaminees} total catatan pelanggaran terdeteksi.
                    </span>
                  </div>
                  <button
                    onClick={() => setMonitorStatusFilter(monitorStatusFilter === 'violations' ? 'all' : 'violations')}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-white text-rose-700 border border-rose-300 rounded-md hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    {monitorStatusFilter === 'violations' ? 'Tampilkan Semua Siswa' : 'Filter Siswa Bermasalah'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {lockedOrViolatedSessions
                    .filter(s => s.isLocked || s.status === 'locked' || s.violationsCount >= maxViolationsAllowed)
                    .map(ls => {
                      const lsExam = exams.find(e => e.id === ls.examId);
                      const isUnlocking = isUnlockingId === ls.id;
                      return (
                        <div
                          key={ls.id}
                          className="flex items-center gap-2 bg-white border border-rose-300 rounded-lg px-2.5 py-1.5 text-xs shadow-2xs"
                        >
                          <div>
                            <span className="font-bold text-slate-900">{ls.studentName}</span>
                            <span className="text-slate-500 ml-1">({ls.className}{lsExam ? ` · ${lsExam.subjectName}` : ''})</span>
                            <span className="ml-1.5 font-mono text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                              {ls.violationsCount}/{maxViolationsAllowed}
                            </span>
                          </div>
                          <button
                            onClick={() => void handleUnlockSession(ls.id, ls.studentName)}
                            disabled={isUnlocking}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-60"
                          >
                            <Unlock className="w-3 h-3" />
                            {isUnlocking ? 'Membuka...' : 'Buka Kunci'}
                          </button>
                          <button
                            onClick={() => handleOpenResetSingle(ls)}
                            className="px-2 py-1 text-[11px] font-semibold bg-rose-100 text-rose-800 rounded hover:bg-rose-200 transition-colors cursor-pointer"
                          >
                            Reset Akun
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Monitoring Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={monitorSearch}
                  onChange={e => setMonitorSearch(e.target.value)}
                  placeholder="Cari NIS atau Nama Siswa..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-500 text-xs"
                />
              </div>
              <select
                value={monitorClassFilter}
                onChange={e => setMonitorClassFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-700 text-xs outline-none"
              >
                <option value="all">Semua Kelas ({sessions.length})</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>Kelas {c.name}</option>
                ))}
              </select>
              <select
                value={monitorStatusFilter}
                onChange={e => setMonitorStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-slate-700 text-xs outline-none"
              >
                <option value="all">Semua Status</option>
                <option value="locked">Terkunci 3/3 ({lockedExaminees})</option>
                <option value="violations">Ada Pelanggaran ≥1x ({violatedExaminees})</option>
                <option value="in_progress">Mengerjakan ({activeExaminees})</option>
                <option value="submitted">Selesai ({completedExaminees})</option>
                <option value="not_started">Belum Login / Belum Mulai</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-2.5 px-3 font-semibold">NIS</th>
                    <th className="py-2.5 px-3 font-semibold">Nama Siswa & Mapel</th>
                    <th className="py-2.5 px-3 font-semibold">Kelas</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                    <th className="py-2.5 px-3 font-semibold">Progres Soal</th>
                    <th className="py-2.5 px-3 font-semibold">Pelanggaran</th>
                    <th className="py-2.5 px-3 font-semibold">Nilai</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Tindakan Pengawas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMonitoringSessions.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500 italic">
                        Tidak ada siswa yang sesuai dengan filter pemantauan saat ini.
                      </td>
                    </tr>
                  ) : (
                    filteredMonitoringSessions.map(s => {
                      const answeredFromMap = Object.values(s.answers || {}).filter(
                        a => a && a.answer !== '' && (!Array.isArray(a.answer) || a.answer.length > 0)
                      ).length;
                      const answeredCount = Math.max(answeredFromMap, s.answeredCount || 0);

                      const matchingExam = exams.find(e => e.id === s.examId) || exams[0];
                      const examQuestionsCount = matchingExam
                        ? questionBank.questions.filter(q => {
                            const matchSubject =
                              !matchingExam.subjectId ||
                              q.subjectId === matchingExam.subjectId ||
                              (matchingExam.questionBankId && q.bankId === matchingExam.questionBankId);
                            const matchClass = isQuestionMatchingClass(q.classId, q.grade, s.classId);
                            return matchSubject && matchClass;
                          }).length
                        : questionBank.questions.length;

                      const totalQ = examQuestionsCount > 0 ? examQuestionsCount : (s.totalQuestions || matchingExam?.totalQuestions || 25);
                      const isSessionLocked = s.isLocked || s.status === 'locked';
                      const isSessionDone = isSessionCompleted(s.status);
                      const canResetAccount =
                        isSessionLocked ||
                        s.violationsCount > 0 ||
                        s.status !== 'not_started' ||
                        isSessionDone ||
                        s.finalScore > 0 ||
                        answeredCount > 0 ||
                        s.isOnline ||
                        Boolean(s.deviceSessionId);

                      return (
                        <tr key={s.id} className={`hover:bg-slate-50/60 ${isSessionLocked ? 'bg-rose-50/50' : ''}`}>
                          <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap">{s.nis}</td>
                          <td className="py-2.5 px-3 font-medium text-slate-900">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  isSessionLocked
                                    ? 'bg-rose-500'
                                    : s.isOnline
                                      ? 'bg-emerald-500 animate-pulse'
                                      : 'bg-slate-300'
                                }`}
                              />
                              <div>
                                <span className="block leading-tight">{s.studentName}</span>
                                <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                  {matchingExam && (
                                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.2 rounded">
                                      {matchingExam.subjectName}
                                    </span>
                                  )}
                                  {s.isOnline && s.deviceInfo && s.deviceInfo !== '-' && (
                                    <span className="text-[10px] text-slate-400 font-normal">{s.deviceInfo}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">{s.className}</td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            {(isSessionLocked || s.violationsCount >= maxViolationsAllowed) ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded">
                                <ShieldAlert className="w-3 h-3" /> Terkunci ({s.violationsCount}/{maxViolationsAllowed})
                              </span>
                            ) : isSessionDone ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                                <CheckCircle className="w-3 h-3" /> Selesai
                              </span>
                            ) : s.status === 'in_progress' ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                                <Clock className="w-3 h-3" /> Sedang Mengerjakan
                              </span>
                            ) : s.isOnline ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                                Sudah Login
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Belum Login</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="font-mono text-slate-800 font-semibold">
                              {answeredCount}/{totalQ} soal
                            </div>
                            {s.status === 'in_progress' && (
                              <div className="text-[10px] text-slate-400 font-mono">
                                Aktif No. #{(s.currentQuestionIndex || 0) + 1} · {Math.floor(s.timeRemainingSeconds / 60)}m
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] border ${
                                isSessionLocked || s.violationsCount >= maxViolationsAllowed
                                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                                  : s.violationsCount > 0
                                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                                    : 'bg-slate-50 text-slate-500 border-slate-200'
                              }`}
                            >
                              {s.violationsCount}/{maxViolationsAllowed}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono whitespace-nowrap">
                            {s.status === 'not_started' && answeredCount === 0 ? (
                              <span className="text-slate-400">-</span>
                            ) : (
                              <span className={`font-bold ${s.finalScore >= (matchingExam?.kkm || 75) ? 'text-emerald-700' : 'text-blue-700'}`}>
                                {s.finalScore}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {(isSessionLocked || s.violationsCount >= maxViolationsAllowed) ? (
                                <button
                                  onClick={() => void handleUnlockSession(s.id, s.studentName)}
                                  disabled={isUnlockingId === s.id}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors cursor-pointer shadow-2xs disabled:opacity-60"
                                  title="Buka kunci & reset pelanggaran agar siswa bisa langsung melanjutkan ujian tanpa kehilangan jawaban"
                                >
                                  <Unlock className="w-3 h-3" />
                                  {isUnlockingId === s.id ? 'Membuka...' : 'Buka Kunci'}
                                </button>
                              ) : s.status === 'in_progress' ? (
                                <>
                                  <button
                                    onClick={() => handleAddExtraTime(s.id, s.studentName)}
                                    className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors cursor-pointer"
                                    title="Tambah 15 menit"
                                  >
                                    +15m
                                  </button>
                                  <button
                                    onClick={() => handleForceSubmit(s.id, s.studentName)}
                                    className="px-2 py-1 text-[11px] font-medium bg-amber-100 hover:bg-amber-200 text-amber-800 rounded transition-colors cursor-pointer"
                                    title="Paksa Kumpulkan"
                                  >
                                    Kumpul
                                  </button>
                                </>
                              ) : null}

                              {(s.isOnline || s.deviceSessionId || s.status === 'in_progress' || isSessionLocked) && (
                                <button
                                  onClick={() => handleResetSession(s.id, s.studentName)}
                                  className="px-2 py-1 text-[11px] font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded transition-colors cursor-pointer"
                                  title="Reset sesi login perangkat agar siswa bisa pindah HP/laptop tanpa menghapus jawaban"
                                >
                                  Reset Login / Sesi
                                </button>
                              )}

                              {canResetAccount && (
                                <button
                                  onClick={() => handleOpenResetSingle(s)}
                                  className="px-2 py-1 text-[11px] font-medium bg-rose-100 hover:bg-rose-200 text-rose-800 rounded transition-colors flex items-center gap-1 cursor-pointer"
                                  title="Reset akun & pelanggaran siswa ini agar bisa ujian ulang dari awal"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  Reset Akun
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {violationLogs.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    Log Pelanggaran & Unlock Terbaru (Realtime Supabase)
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    {Math.min(violationLogs.length, 8)} aktivitas terbaru
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {violationLogs.slice(0, 8).map(v => (
                    <div
                      key={v.id}
                      className={`p-2.5 rounded-lg border text-[11px] flex items-start justify-between gap-2 ${
                        v.actionTaken === 'OPERATOR_UNLOCK'
                          ? 'bg-emerald-50/70 border-emerald-200'
                          : v.actionTaken.startsWith('AUTO_LOCK')
                            ? 'bg-rose-50/70 border-rose-200'
                            : 'bg-amber-50/60 border-amber-200'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">
                          {v.studentName} <span className="font-mono font-normal text-slate-500">({v.nis})</span>
                        </div>
                        <p className="text-slate-600 truncate">{v.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`inline-block font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          v.actionTaken === 'OPERATOR_UNLOCK'
                            ? 'bg-emerald-100 text-emerald-800'
                            : v.actionTaken.startsWith('AUTO_LOCK')
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                        }`}>
                          {v.actionTaken}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                          {new Date(v.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* TAB 3: DATA SISWA (WITH EXCEL IMPORT & EDIT) */}
      {activeTab === 'students' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Manajemen Data Siswa (Peserta Ujian)
              </h3>
              <p className="text-xs text-slate-500">
                Total {students.length} siswa terdaftar di rombongan belajar kelas 7, 8A, 8B, dan 9.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowStudentExcelImportModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                Input Data Siswa (Excel)
              </button>
              <button
                onClick={() => setShowAddStudentModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Siswa Manual
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari berdasarkan NIS atau Nama Siswa..."
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={selectedClassFilter}
              onChange={e => setSelectedClassFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none bg-white text-slate-700"
            >
              <option value="all">Semua Kelas ({students.length})</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.totalStudents} siswa)</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">NIS</th>
                  <th className="py-2.5 px-3 font-semibold">Nama Siswa</th>
                  <th className="py-2.5 px-3 font-semibold">Kelas</th>
                  <th className="py-2.5 px-3 font-semibold">L/P</th>
                  <th className="py-2.5 px-3 font-semibold">Ruang</th>
                  <th className="py-2.5 px-3 font-semibold">Bangku</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map(std => (
                  <tr key={std.id} className="hover:bg-slate-50/60">
                    <td className="py-2 px-3 font-mono font-medium text-slate-700">{std.nis}</td>
                    <td className="py-2 px-3 font-medium text-slate-900">{std.name}</td>
                    <td className="py-2 px-3 text-slate-600 font-medium">{std.className}</td>
                    <td className="py-2 px-3 text-slate-600">{std.gender}</td>
                    <td className="py-2 px-3 text-slate-500">{std.roomNumber || 'Ruang 01'}</td>
                    <td className="py-2 px-3 font-mono text-slate-500">{std.seatNumber || '-'}</td>
                    <td className="py-2 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingStudent(std)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded transition-colors cursor-pointer"
                          title="Edit Data Siswa"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStudentForCard(std);
                            setActiveTab('cards');
                          }}
                          className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors cursor-pointer"
                        >
                          Kartu
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(std.id, std.name)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                          title="Hapus Siswa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: DATA GURU (WITH ADD & EDIT) */}
      {activeTab === 'teachers' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Manajemen Guru & Pengawas
              </h3>
              <p className="text-xs text-slate-500">
                Daftar guru pengampu mata pelajaran yang mengampu kelas 7, 8A, 8B, dan 9.
              </p>
            </div>
            <button
              onClick={() => setShowAddTeacherModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              + Tambah Data Guru
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">NIP</th>
                  <th className="py-2.5 px-3 font-semibold">Nama Lengkap</th>
                  <th className="py-2.5 px-3 font-semibold">Mata Pelajaran</th>
                  <th className="py-2.5 px-3 font-semibold">Kelas Diampu</th>
                  <th className="py-2.5 px-3 font-semibold">Email</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teachers.map(t => {
                  const subNames = t.assignedSubjectIds?.map(id => subjects.find(s => s.id === id)?.name).filter(Boolean).join(', ');
                  const classNames = t.assignedClassIds?.map(id => classes.find(c => c.id === id)?.name).filter(Boolean).join(', ');
                  return (
                    <tr key={t.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-mono font-medium text-slate-700">{t.usernameOrNip}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-900">{t.name}</td>
                      <td className="py-2.5 px-3 text-blue-700 font-medium">{subNames || '-'}</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-medium">{classNames || 'Semua Kelas'}</td>
                      <td className="py-2.5 px-3 text-slate-500">{t.email || '-'}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingTeacher(t)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors cursor-pointer"
                            title="Edit Profil Guru & Penugasan"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              alert(`Password guru ${t.name} berhasil di-reset ke "guru123"`);
                              onAddAuditLog('RESET_PASSWORD_GURU', `Reset password untuk NIP ${t.usernameOrNip}`);
                            }}
                            className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                          >
                            Reset Password
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(t.id, t.name)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                            title="Hapus Guru"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: MATA PELAJARAN & GURU PENGAMPU */}
      {activeTab === 'subjects' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Manajemen Mata Pelajaran & Pilihan Guru Pengampu
              </h3>
              <p className="text-xs text-slate-500">
                Kelola semua mata pelajaran yang diujikan beserta penugasan guru pengampu.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingSubject(null);
                setShowSubjectModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              + Input Mata Pelajaran
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">Kode Mapel</th>
                  <th className="py-2.5 px-3 font-semibold">Nama Mata Pelajaran</th>
                  <th className="py-2.5 px-3 font-semibold">Tingkat Jenjang</th>
                  <th className="py-2.5 px-3 font-semibold">Guru Pengampu Ditugaskan</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map(sub => {
                  const assignedTeachers = teachers.filter(t => t.assignedSubjectIds?.includes(sub.id));
                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{sub.code}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{sub.name}</td>
                      <td className="py-2.5 px-3 text-slate-600">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium">
                          {sub.grade}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {assignedTeachers.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {assignedTeachers.map(gt => (
                              <span key={gt.id} className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-medium">
                                {gt.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-amber-600 text-[11px] italic">Belum ada guru pengampu</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingSubject(sub);
                              setShowSubjectModal(true);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit / Atur Guru
                          </button>
                          <button
                            onClick={() => handleDeleteSubject(sub.id, sub.name)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                            title="Hapus Mapel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: BANK SOAL & INPUT (OPERATOR FULL ACCESS) */}
      {activeTab === 'questions' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pengelolaan Bank Soal (Hak Penuh Operator)
              </h3>
              <p className="text-xs text-slate-500">
                Kelola butir soal berdasarkan mata pelajaran dan kelas (Tipe: PG, PG Kompleks, Esay, Mencocokkan, KaTeX Math & Gambar).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  onUpdateQuestionBank({ ...questionBank, totalQuestions: questionBank.questions.length });
                  alert(`Berhasil menyinkronkan ${questionBank.questions.length} butir soal ke semua jadwal ujian siswa.`);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                title="Sinkronkan butir soal terbaru ke lembar ujian siswa"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                Update Soal ke Ujian
              </button>
              <button
                onClick={() => setShowQuestionImportModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                Impor Soal (CSV / Excel / Word)
              </button>
              <button
                onClick={() => {
                  setEditingQuestion(null);
                  setShowQuestionEditorModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Input Soal Manual
              </button>
            </div>
          </div>

          {/* Filter Mapel & Kelas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Filter Mata Pelajaran:</label>
              <select
                value={selectedQSubjectFilter}
                onChange={e => setSelectedQSubjectFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none"
              >
                <option value="all">Semua Mata Pelajaran ({subjects.length})</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Filter Kelompok Kelas:</label>
              <select
                value={selectedQClassFilter}
                onChange={e => {
                  setSelectedQClassFilter(e.target.value);
                  setSelectedQIds([]);
                }}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none"
              >
                <option value="all">Semua Kelas</option>
                {QUESTION_CLASS_GROUPS.map(cg => (
                  <option key={cg.id} value={cg.id}>{cg.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Selection Notification & Action Banner for Operator */}
          {selectedQIds.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-xs shadow-xs animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-[11px]">
                  {selectedQIds.length}
                </span>
                <span className="font-bold text-rose-900">
                  {selectedQIds.length} butir soal dipilih
                </span>
                <span className="text-rose-600 text-[11px] hidden sm:inline">
                  (Hapus massal butir soal yang tidak diperlukan sekaligus)
                </span>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleBulkDeleteQ}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-colors shadow-2xs cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus {selectedQIds.length} Soal Terpilih
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedQIds([])}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-300 font-medium transition-colors cursor-pointer"
                >
                  Batal Pilih
                </button>
              </div>
            </div>
          )}

          {/* Questions Grid */}
          {(() => {
            const filteredQuestions = questionBank.questions.filter(q => {
              const matchSubject = selectedQSubjectFilter === 'all' || q.subjectId === selectedQSubjectFilter || (!q.subjectId && selectedQSubjectFilter === 'sbj-mat');
              const matchClass = isQuestionMatchingClass(q.classId, q.grade, selectedQClassFilter);
              return matchSubject && matchClass;
            });

            const allSelected = filteredQuestions.length > 0 && filteredQuestions.every(q => selectedQIds.includes(q.id));

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 px-1 pb-1 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleSelectAllQ(filteredQuestions)}
                      className="p-1 text-slate-500 hover:text-blue-600 rounded transition-colors cursor-pointer flex items-center gap-1"
                      title="Pilih / Batalkan Semua Soal yang Ditampilkan"
                    >
                      {allSelected ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-[11px] font-semibold text-slate-600">Pilih Semua</span>
                    </button>
                    <span>
                      Menampilkan <strong>{filteredQuestions.length}</strong> dari <strong>{questionBank.questions.length}</strong> butir soal
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Semua soal otomatis aktif di ujian peserta
                  </span>
                </div>

                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl space-y-3">
                    <p className="text-slate-500 text-sm">Belum ada butir soal untuk mata pelajaran atau kelas yang dipilih.</p>
                    <button
                      onClick={() => setShowQuestionEditorModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Tambah Soal untuk Mapel Ini
                    </button>
                  </div>
                ) : (
                  filteredQuestions.map((q, idx) => {
                    const isChecked = selectedQIds.includes(q.id);

                    return (
                      <div 
                        key={q.id} 
                        className={`p-4 border rounded-xl space-y-3 transition-colors ${
                          isChecked 
                            ? 'border-amber-400 bg-amber-50/20' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleSelectQ(q.id)}
                              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                            />
                            <span className="font-bold text-slate-900 text-sm">Butir Soal #{idx + 1}</span>
                            <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              {q.type.replace('_', ' ')}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              {getQuestionClassLabel(q.classId, q.grade)}
                            </span>
                            {q.subjectId && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                {subjects.find(s => s.id === q.subjectId)?.name || q.subjectId}
                              </span>
                            )}
                            <span className="text-xs text-slate-500 font-mono">
                              Bobot: {q.points} Poin · {q.difficulty || 'sedang'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDuplicateQuestion(q)}
                              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Duplikat Soal"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingQuestion(q);
                                setShowQuestionEditorModal(true);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Edit Butir Soal"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Soal"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                {/* Prompt with KaTeX */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed">
                  <KatexRenderer content={q.prompt} />
                  {q.imageUrl && (
                    <img 
                      src={q.imageUrl} 
                      alt="Gambar Soal" 
                      className="max-h-40 object-contain rounded mt-2 border border-slate-200" 
                    />
                  )}
                </div>

                {/* Question Type Details */}
                {q.type === 'mencocokkan' && q.matchingPairs && (
                  <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 text-xs space-y-1.5">
                    <span className="font-semibold text-amber-900 block">Pasangan yang Dicocokkan (Menjodohkan):</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {q.matchingPairs.map((pair, pIdx) => (
                        <div key={pIdx} className="bg-white p-2 rounded border border-amber-200 flex items-center justify-between">
                          <KatexRenderer content={pair.leftText} />
                          <span className="text-slate-400 font-bold px-1">↔</span>
                          <span className="font-semibold text-blue-700">{pair.rightText}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {['pg', 'pg_kompleks', 'benar_salah'].includes(q.type) && q.options.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {q.options.map(opt => {
                      const isCorrect = q.correctAnswers?.includes(opt.id);
                      return (
                        <div 
                          key={opt.id} 
                          className={`p-2 rounded-lg border flex items-center justify-between ${
                            isCorrect 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium' 
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold">{opt.id}.</span>
                            <KatexRenderer content={opt.text} />
                          </div>
                          {isCorrect && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Kunci
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.type === 'uraian' && q.essayRubric && (
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                    <span className="font-bold text-slate-800">Rubrik Penskoran:</span> {q.essayRubric}
                  </div>
                )}
                    </div>
                  );
                }))}
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 5: JADWAL UJIAN (ALL SUBJECTS) */}
      {activeTab === 'schedules' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Jadwal Ujian Semua Mata Pelajaran
              </h3>
              <p className="text-xs text-slate-500">
                Buat dan kelola jadwal ujian untuk semua mata pelajaran sekolah bagi kelas 7, 8A, 8B, dan 9.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingExamSchedule(null);
                setShowExamScheduleModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              + Input Pelajaran yang Diujikan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.length === 0 ? (
              <div className="col-span-1 md:col-span-2 py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="font-semibold text-slate-700">Belum ada jadwal ujian yang dibuat</p>
                <p className="text-xs text-slate-400 mt-1">Klik tombol "+ Input Pelajaran yang Diujikan" di atas untuk menambahkan jadwal ujian baru.</p>
              </div>
            ) : (
              exams.map(ex => (
              <div key={ex.id} className="p-4 border border-slate-200 rounded-xl space-y-3 bg-slate-50/40">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      {ex.subjectName}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{ex.title}</h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {ex.status}
                    </span>
                    <button
                      onClick={() => {
                        setEditingExamSchedule(ex);
                        setShowExamScheduleModal(true);
                      }}
                      className="p-1 text-slate-500 hover:text-blue-700 rounded"
                      title="Edit Jadwal"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteExam(ex.id, ex.title)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Hapus Jadwal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block">Kelas Target:</span>
                    <span className="font-medium text-slate-800">{ex.targetClassNames.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Waktu & Durasi:</span>
                    <span className="font-medium text-slate-800">{ex.startTime} - {ex.endTime} ({ex.durationMinutes}m)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">KKM Kelulusan:</span>
                    <span className="font-medium text-slate-800">{ex.kkm}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Pengacakan:</span>
                    <span className="font-medium text-slate-800">
                      {ex.randomizeQuestions ? 'Soal (ON)' : 'Soal (OFF)'} · {ex.randomizeOptions ? 'Opsi (ON)' : 'Opsi (OFF)'}
                    </span>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      )}

      {/* TAB 6: REKAP NILAI */}
      {activeTab === 'results' && (() => {
        const isMatchingClass = (s: StudentExamSession) => {
          if (selectedClassFilter === 'all') return true;
          if (selectedClassFilter === 'cls-8') {
            return s.classId === 'cls-2' || s.classId === 'cls-3' || s.className.includes('VIII') || s.classId === 'cls-8';
          }
          return s.classId === selectedClassFilter;
        };

        const isMatchingSubject = (s: StudentExamSession) => {
          if (resultsSubjectFilter === 'all') return true;
          const ex = exams.find(e => e.id === s.examId);
          return ex?.subjectId === resultsSubjectFilter;
        };

        const getResultPriority = (s: StudentExamSession) => {
          if (isSessionCompleted(s.status)) return 0;
          if (s.isLocked || s.status === 'locked') return 1;
          if (s.status === 'in_progress' || s.finalScore > 0) return 2;
          return 3;
        };

        const filteredSessions = sessions
          .filter(s => isMatchingClass(s) && isMatchingSubject(s))
          .sort((a, b) => {
            const pDiff = getResultPriority(a) - getResultPriority(b);
            if (pDiff !== 0) return pDiff;
            const hbDiff = (b.lastHeartbeat || 0) - (a.lastHeartbeat || 0);
            if (hbDiff !== 0) return hbDiff;
            return a.studentName.localeCompare(b.studentName);
          });

        const completedSessions = filteredSessions.filter(s => isSessionCompleted(s.status));
        const passedSessions = completedSessions.filter(s => {
          const kkm = exams.find(e => e.id === s.examId)?.kkm || 75;
          return s.finalScore >= kkm;
        });
        const avgScore = completedSessions.length > 0 
          ? Math.round(completedSessions.reduce((acc, curr) => acc + curr.finalScore, 0) / completedSessions.length)
          : 0;

        return (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Rekap Hasil Nilai & Ketuntasan KKM
                  </h3>
                  {lastSyncTime && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {isSupabaseConfigured && realtimeStatus === 'SUBSCRIBED' ? 'Supabase Live' : 'Sync'}: {lastSyncTime}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Nilai siswa yang selesai ujian otomatis masuk dan terkumpul secara real-time di dashboard Operator dan Guru mapel terkait.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {onRefreshFromSupabase && (
                  <button
                    onClick={handleManualRefreshSupabase}
                    disabled={isRefreshingSupabase}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer shadow-2xs disabled:opacity-60"
                    title="Muat ulang nilai terbaru dari database Supabase"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isRefreshingSupabase ? 'animate-spin' : ''}`} />
                    <span>{isRefreshingSupabase ? 'Memuat...' : 'Refresh Nilai'}</span>
                  </button>
                )}
                <button
                  onClick={handleOpenResetBatch}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  title="Reset hasil ujian massal untuk seluruh peserta atau kelas tertentu"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                  Reset Hasil Ulangan
                </button>
                <button
                  onClick={handleDirectExportResults}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
                  title="Unduh file Microsoft Excel / CSV dengan encoding UTF-8 BOM"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ekspor Excel (CSV)</span>
                </button>
                <button
                  onClick={() => setShowExportModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
                  title="Pratinjau Leger Nilai resmi berkop sekolah dan cetak PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cetak Leger / PDF</span>
                </button>
              </div>
            </div>

            {!isSupabaseConfigured && supabaseConfigError && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Konfigurasi Supabase Belum Aktif:</span>
                  <span className="font-mono text-[11px] break-words">{supabaseConfigError}</span>
                </div>
              </div>
            )}

            {supabaseError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Gagal Membaca Data dari Supabase:</span>
                  <span className="font-mono text-[11px] break-words">{supabaseError}</span>
                </div>
              </div>
            )}

            {/* Quick Metrics & Class/Subject Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-600">Mata Pelajaran:</span>
                  <select
                    value={resultsSubjectFilter}
                    onChange={e => setResultsSubjectFilter(e.target.value)}
                    className="px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white outline-none font-medium"
                  >
                    <option value="all">Semua Mata Pelajaran</option>
                    {subjects.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name} ({sub.code})</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-600">Filter Rombel:</span>
                  <select
                    value={selectedClassFilter}
                    onChange={e => setSelectedClassFilter(e.target.value)}
                    className="px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white outline-none font-medium"
                  >
                    <option value="all">Semua Rombel ({sessions.length} Sesi)</option>
                    <option value="cls-8">Kelas VIII (Gabungan VIII-A & VIII-B)</option>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>Kelas {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Selesai:</span>{' '}
                  <span className="font-bold text-slate-800 font-mono">{completedSessions.length}/{filteredSessions.length}</span>
                </div>
                <div>
                  <span className="text-slate-500">Tuntas (≥KKM):</span>{' '}
                  <span className="font-bold text-emerald-700 font-mono">{passedSessions.length}</span>
                </div>
                <div>
                  <span className="text-slate-500">Belum Tuntas:</span>{' '}
                  <span className="font-bold text-rose-600 font-mono">
                    {Math.max(0, completedSessions.length - passedSessions.length)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Rata-rata:</span>{' '}
                  <span className="font-bold text-blue-700 font-mono">{avgScore}</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-2.5 px-3 font-semibold">NIS</th>
                    <th className="py-2.5 px-3 font-semibold">Nama Siswa</th>
                    <th className="py-2.5 px-3 font-semibold">Kelas</th>
                    <th className="py-2.5 px-3 font-semibold">Mata Pelajaran</th>
                    <th className="py-2.5 px-3 font-semibold">Status Ujian</th>
                    <th className="py-2.5 px-3 font-semibold">Skor Otomatis</th>
                    <th className="py-2.5 px-3 font-semibold">Skor Uraian</th>
                    <th className="py-2.5 px-3 font-semibold">Nilai Akhir</th>
                    <th className="py-2.5 px-3 font-semibold">Status KKM</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Aksi Reset</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSessions.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-500 italic">
                        Tidak ada siswa yang cocok dengan filter yang dipilih.
                      </td>
                    </tr>
                  ) : (
                    filteredSessions.map(s => {
                      const ex = exams.find(e => e.id === s.examId);
                      const kkm = ex?.kkm || 75;
                      const isDone = isSessionCompleted(s.status);
                      const isLockedFlag = s.isLocked || s.status === 'locked';

                      return (
                        <tr key={s.id} className={`hover:bg-slate-50/60 ${isDone ? 'bg-emerald-50/20' : isLockedFlag ? 'bg-rose-50/30' : ''}`}>
                          <td className="py-2 px-3 font-mono text-slate-700">{s.nis}</td>
                          <td className="py-2 px-3 font-medium text-slate-900">{s.studentName}</td>
                          <td className="py-2 px-3 text-slate-600">{s.className}</td>
                          <td className="py-2 px-3 text-slate-700">
                            <span className="text-[11px] font-medium bg-indigo-50 text-indigo-800 border border-indigo-200 px-1.5 py-0.5 rounded">
                              {ex?.subjectName || 'Umum'}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            {isDone ? (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                Selesai
                              </span>
                            ) : isLockedFlag ? (
                              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 border border-rose-200 px-1.5 py-0.5 rounded">
                                Terkunci
                              </span>
                            ) : s.status === 'in_progress' ? (
                              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                                Mengerjakan
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                Belum Ujian
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 font-mono text-slate-700">{s.scorePg}</td>
                          <td className="py-2 px-3 font-mono text-slate-700">{s.scoreEssay}</td>
                          <td className="py-2 px-3 font-mono font-bold text-blue-700">{s.finalScore}</td>
                          <td className="py-2 px-3">
                            {!isDone && s.finalScore === 0 ? (
                              <span className="text-[10px] text-slate-400">-</span>
                            ) : s.finalScore >= kkm ? (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                TUNTAS
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                                BELUM TUNTAS
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-right">
                            <button
                              onClick={() => handleOpenResetSingle(s)}
                              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded transition-colors cursor-pointer"
                              title="Reset hasil atau akun siswa ini agar bisa ujian ulang"
                            >
                              <RotateCcw className="w-3 h-3 text-rose-600" />
                              <span>Reset Akun</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {/* TAB 7: KARTU PESERTA */}
      {activeTab === 'cards' && (() => {
        const isMatchingCardClass = (std: Student) => {
          if (selectedCardClassFilter === 'all') return true;
          if (selectedCardClassFilter === 'cls-8') {
            return std.classId === 'cls-2' || std.classId === 'cls-3' || std.className.includes('8') || std.className.includes('VIII');
          }
          return std.classId === selectedCardClassFilter;
        };

        const isMatchingSearch = (std: Student) => {
          if (!cardSearchQuery.trim()) return true;
          const q = cardSearchQuery.toLowerCase();
          return std.name.toLowerCase().includes(q) || std.nis.toLowerCase().includes(q);
        };

        const filteredStudentsForCard = students.filter(s => isMatchingCardClass(s) && isMatchingSearch(s));
        const cardsToDisplay = selectedStudentForCard ? [selectedStudentForCard] : filteredStudentsForCard;

        return (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-6 print:border-none print:p-0 print:shadow-none">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100 print:hidden">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Cetak Kartu Peserta Ujian & Lembar Kehadiran
                </h3>
                <p className="text-xs text-slate-500">
                  Tampilkan seluruh kartu peserta ujian resmi untuk siswa kelas 7, 8A, 8B, dan 9 sekaligus dalam satu kali klik cetak.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    const classLabel = selectedCardClassFilter === 'all' 
                      ? 'Semua_Rombel' 
                      : selectedCardClassFilter === 'cls-8' 
                        ? 'Kelas_VIII' 
                        : `Kelas_${classes.find(c => c.id === selectedCardClassFilter)?.name || selectedCardClassFilter}`;
                    downloadExamCardsAsHtml(cardsToDisplay, schoolSetting, `Kartu_Ujian_CBT_SMPN12_${classLabel}`, classLabel);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  title="Unduh seluruh kartu peserta ujian yang terpilih sebagai file dokumen siap cetak / PDF"
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>Download Kartu Ujian ({cardsToDisplay.length})</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-sm"
                  title="Cetak seluruh kartu peserta ujian yang tampil langsung ke printer atau file PDF"
                >
                  <Printer className="w-4 h-4" />
                  Cetak Semua Kartu ({cardsToDisplay.length})
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 print:hidden text-xs">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <span className="font-semibold text-slate-700">Filter Rombel:</span>
                <select
                  value={selectedCardClassFilter}
                  onChange={e => {
                    setSelectedCardClassFilter(e.target.value);
                    setSelectedStudentForCard(null);
                  }}
                  className="px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white outline-none font-medium text-xs"
                >
                  <option value="all">Semua Rombel ({students.length} Siswa)</option>
                  <option value="cls-8">Kelas VIII (Gabungan VIII-A & VIII-B)</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>Kelas {c.name}</option>
                  ))}
                </select>

                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={cardSearchQuery}
                    onChange={e => {
                      setCardSearchQuery(e.target.value);
                      setSelectedStudentForCard(null);
                    }}
                    placeholder="Cari NIS atau Nama Siswa..."
                    className="w-full pl-8 pr-7 py-1.5 border border-slate-300 rounded-lg bg-white outline-none text-xs"
                  />
                  {cardSearchQuery && (
                    <button
                      onClick={() => setCardSearchQuery('')}
                      className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 font-bold text-sm"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                  {cardsToDisplay.length} Kartu Siap Cetak
                </span>
                {selectedStudentForCard && (
                  <button
                    onClick={() => setSelectedStudentForCard(null)}
                    className="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    Reset Filter Siswa
                  </button>
                )}
              </div>
            </div>

            {cardsToDisplay.length === 0 ? (
              <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p className="font-semibold text-slate-700">Tidak ada kartu siswa yang cocok dengan filter</p>
                <p className="text-xs text-slate-400 mt-1">Coba sesuaikan pilihan rombel atau kata kunci pencarian Anda.</p>
              </div>
            ) : (
              <div className="cbt-cards-print-container space-y-6 print:space-y-0">
                {Array.from({ length: Math.ceil(cardsToDisplay.length / 6) }, (_, pageIdx) => {
                  const pageCards = cardsToDisplay.slice(pageIdx * 6, pageIdx * 6 + 6);
                  return (
                    <div
                      key={`card-page-${pageIdx}`}
                      className="cbt-cards-print-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:grid-cols-2 print:gap-0"
                    >
                      {pageCards.map(std => (
                        <div
                          key={std.id}
                          className="cbt-exam-card border-2 border-slate-800 rounded-lg p-3 bg-white flex flex-col justify-between relative break-inside-avoid shadow-xs print:shadow-none print:break-inside-avoid print:border-black"
                        >
                          <div>
                            {/* Header Kartu */}
                            <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5 mb-2">
                              <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-slate-300 shrink-0 flex items-center justify-center overflow-hidden">
                                <img
                                  src={schoolSetting.logoUrl || '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg'}
                                  alt="Logo Sekolah"
                                  className="w-full h-full object-contain rounded-full"
                                />
                              </div>
                              <div className="flex-1 text-center pr-1">
                                <h4 className="text-[11px] font-black text-slate-900 tracking-tight uppercase leading-tight">KARTU PESERTA UJIAN CBT</h4>
                                <p className="text-[10px] text-slate-800 font-bold uppercase leading-tight">{schoolSetting.name}</p>
                                <p className="text-[8.5px] text-slate-500 leading-tight">T.A. {schoolSetting.academicYear} · Semester {schoolSetting.semester}</p>
                              </div>
                            </div>

                            {/* Data Siswa */}
                            <div className="text-[11px] space-y-0.5 text-slate-800">
                              <div className="flex justify-between items-baseline">
                                <span className="text-slate-500 text-[10px]">Nomor Induk (NIS):</span>
                                <span className="font-mono font-bold text-slate-900">{std.nis}</span>
                              </div>
                              <div className="flex justify-between items-baseline">
                                <span className="text-slate-500 text-[10px]">Nama Lengkap:</span>
                                <span className="font-bold text-slate-900 text-right truncate max-w-[165px]" title={std.name}>{std.name}</span>
                              </div>
                              <div className="flex justify-between items-baseline">
                                <span className="text-slate-500 text-[10px]">Kelas / Rombel:</span>
                                <span className="font-medium text-slate-800">{std.className}</span>
                              </div>
                              <div className="flex justify-between items-baseline">
                                <span className="text-slate-500 text-[10px]">Ruang / Sesi:</span>
                                <span className="font-medium text-slate-800">{std.roomNumber || 'Ruang 01'}</span>
                              </div>
                              <div className="flex justify-between items-baseline">
                                <span className="text-slate-500 text-[10px]">Nomor Bangku:</span>
                                <span className="font-mono font-bold text-blue-700">{std.seatNumber || '01'}</span>
                              </div>
                              <div className="flex justify-between items-baseline pt-0.5 border-t border-slate-100">
                                <span className="text-slate-400 text-[9.5px]">Login CBT:</span>
                                <span className="font-mono text-[9.5px] text-slate-600">{std.nis} (Token Pengawas)</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            {/* Tanda Tangan Plt. Kepala Sekolah */}
                            <div className="pt-1.5 mt-1 border-t border-dashed border-slate-300 flex items-end justify-between text-[9.5px] text-slate-600">
                              <div>
                                <span className="text-[8.5px] text-slate-400 block">Lokasi Ujian</span>
                                <span className="font-medium">Banjarbaru</span>
                              </div>
                              <div className="text-right">
                                <p className="text-[8.5px] text-slate-500">{schoolSetting.principalTitle || 'Plt. Kepala Sekolah'},</p>
                                <div className="h-4"></div>
                                <p className="font-bold text-slate-900 text-[9.5px] underline leading-tight">
                                  {schoolSetting.principalName || 'Legiyo, S.Pd'}
                                </p>
                                <p className="text-[8px] text-slate-500 font-mono">
                                  NIP. {schoolSetting.principalNip || '196907022000031010'}
                                </p>
                              </div>
                            </div>

                            {/* Action Bar for Single Card (Screen only) */}
                            <div className="pt-1.5 mt-1 border-t border-slate-200 flex items-center justify-between print:hidden">
                              <span className="text-[10px] text-slate-400">SMPN 12 Banjarbaru</span>
                              <button
                                type="button"
                                onClick={() => downloadExamCardsAsHtml([std], schoolSetting, `Kartu_Ujian_${std.nis}_${std.name.replace(/\s+/g, '_')}`, std.name)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                title="Download kartu peserta ujian siswa ini"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download Kartu</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* TAB 8: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Audit Log Aktivitas Sistem</h3>
              <p className="text-xs text-slate-500">
                Pencatatan riwayat aksi operator, guru, reset sesi, dan kejadian sistem.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">Waktu</th>
                  <th className="py-2.5 px-3 font-semibold">Peran</th>
                  <th className="py-2.5 px-3 font-semibold">User</th>
                  <th className="py-2.5 px-3 font-semibold">Aksi</th>
                  <th className="py-2.5 px-3 font-semibold">Rincian</th>
                  <th className="py-2.5 px-3 font-semibold">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/60">
                    <td className="py-2 px-3 font-mono text-slate-500">{log.timestamp}</td>
                    <td className="py-2 px-3 font-medium text-slate-700 capitalize">{log.userRole}</td>
                    <td className="py-2 px-3 font-mono text-slate-700">{log.userIdentifier}</td>
                    <td className="py-2 px-3">
                      <span className="font-mono text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-600">{log.details}</td>
                    <td className="py-2 px-3 font-mono text-slate-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 9: PENGATURAN */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Pengaturan Sistem Sekolah</h3>
            <p className="text-xs text-slate-500">
              Konfigurasi umum institusi, batas kecurangan anti-curang, dan Safe Exam Browser (SEB).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Satuan Pendidikan</label>
              <input
                type="text"
                value={schoolSetting.name}
                onChange={e => onUpdateSetting({ ...schoolSetting, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tahun Ajaran</label>
              <input
                type="text"
                value={schoolSetting.academicYear}
                onChange={e => onUpdateSetting({ ...schoolSetting, academicYear: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Batas Maksimal Pelanggaran Curang (Sebelum Lock)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={schoolSetting.maxViolations}
                onChange={e => onUpdateSetting({ ...schoolSetting, maxViolations: parseInt(e.target.value) || 3 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default: 3 kali (ujian otomatis terkunci)</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Safe Exam Browser (SEB) Config Key</label>
              <input
                type="text"
                value={schoolSetting.sebConfigKey}
                onChange={e => onUpdateSetting({ ...schoolSetting, sebConfigKey: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Header validasi x-safeexambrowser-configkey</span>
            </div>

            <div className="md:col-span-2 pt-4 border-t border-slate-200">
              <h4 className="font-bold text-slate-800 text-sm mb-1">Pejabat Pengesah Surat & Laporan Nilai CBT</h4>
              <p className="text-slate-500 text-[11px] mb-3">
                Data pejabat yang akan dicantumkan secara otomatis pada lembar cetak Leger Nilai, surat hasil ujian, dan kartu peserta ujian.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Sebutan Jabatan Kepala Sekolah</label>
              <input
                type="text"
                value={schoolSetting.principalTitle || 'Plt. Kepala Sekolah'}
                onChange={e => onUpdateSetting({ ...schoolSetting, principalTitle: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
                placeholder="Plt. Kepala Sekolah"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Sekolah / Plt.</label>
              <input
                type="text"
                value={schoolSetting.principalName || 'Legiyo, S.Pd'}
                onChange={e => onUpdateSetting({ ...schoolSetting, principalName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-medium"
                placeholder="Legiyo, S.Pd"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIP Kepala Sekolah / Plt.</label>
              <input
                type="text"
                value={schoolSetting.principalNip || '196907022000031010'}
                onChange={e => onUpdateSetting({ ...schoolSetting, principalNip: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
                placeholder="196907022000031010"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Koordinator CBT</label>
              <input
                type="text"
                value={schoolSetting.cbtCoordinatorName || 'Dwi Setyarini, S.Pd.'}
                onChange={e => onUpdateSetting({ ...schoolSetting, cbtCoordinatorName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-medium"
                placeholder="Dwi Setyarini, S.Pd."
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIP Koordinator CBT</label>
              <input
                type="text"
                value={schoolSetting.cbtCoordinatorNip || '198502082009032008'}
                onChange={e => onUpdateSetting({ ...schoolSetting, cbtCoordinatorNip: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
                placeholder="198502082009032008"
              />
            </div>

            <div className="md:col-span-2 pt-4 border-t border-slate-200">
              <label className="block font-semibold text-slate-700 mb-1">Logo Satuan Pendidikan</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-slate-200 p-0.5 overflow-hidden shrink-0 bg-white shadow-xs">
                  <img
                    src={schoolSetting.logoUrl || '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg'}
                    alt="Logo Sekolah"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <input
                  type="text"
                  value={schoolSetting.logoUrl || '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg'}
                  onChange={e => onUpdateSetting({ ...schoolSetting, logoUrl: e.target.value })}
                  placeholder="/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono text-xs"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Logo resmi SMP Negeri 12 Banjarbaru yang ditampilkan di laman masuk, navigasi utama, dan kartu ujian siswa.</span>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddTeacherModal && (
        <AddTeacherModal
          isOpen={true}
          onClose={() => setShowAddTeacherModal(false)}
          onAddTeacher={handleAddNewTeacher}
          subjects={subjects}
          classes={classes}
        />
      )}

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <EditTeacherModal
          isOpen={true}
          onClose={() => setEditingTeacher(null)}
          teacher={editingTeacher}
          onSaveTeacher={handleSaveEditedTeacher}
          subjects={subjects}
          classes={classes}
        />
      )}

      {/* Add Student Modal (Manual) */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 border border-slate-200 shadow-xl space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Tambah Siswa Baru</h4>
            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">NIS (Nomor Induk Siswa)</label>
                <input
                  type="text"
                  required
                  placeholder="24031"
                  value={newStudentNis}
                  onChange={e => setNewStudentNis(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Siswa..."
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rombel / Kelas</label>
                <select
                  value={newStudentClassId}
                  onChange={e => setNewStudentClassId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jenis Kelamin</label>
                <select
                  value={newStudentGender}
                  onChange={e => setNewStudentGender(e.target.value as 'L' | 'P')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white"
                >
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Student from Excel Modal */}
      {showStudentExcelImportModal && (
        <StudentExcelImportModal
          isOpen={true}
          onClose={() => setShowStudentExcelImportModal(false)}
          classes={classes}
          onImportStudents={handleImportExcelStudents}
          existingNisList={students.map(s => s.nis)}
        />
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <EditStudentModal
          isOpen={true}
          onClose={() => setEditingStudent(null)}
          student={editingStudent}
          onSaveStudent={handleSaveEditedStudent}
          classes={classes}
        />
      )}

      {/* Subject Form Modal (Add / Edit Mapel & Assign Teachers) */}
      {showSubjectModal && (
        <SubjectFormModal
          isOpen={true}
          onClose={() => {
            setShowSubjectModal(false);
            setEditingSubject(null);
          }}
          onSaveSubject={handleSaveSubject}
          teachers={teachers}
          initialSubject={editingSubject}
        />
      )}

      {/* Exam Schedule Modal (Schedule any subject for 7, 8A, 8B, 9) */}
      {showExamScheduleModal && (
        <ExamScheduleModal
          isOpen={true}
          onClose={() => {
            setShowExamScheduleModal(false);
            setEditingExamSchedule(null);
          }}
          onSaveExam={handleSaveExamSchedule}
          subjects={subjects}
          classes={classes}
          initialExam={editingExamSchedule}
        />
      )}

      {/* Question Import Modal for Operator */}
      {showQuestionImportModal && (
        <QuestionImportModal
          isOpen={true}
          onClose={() => setShowQuestionImportModal(false)}
          onSaveQuestions={handleSaveImportedQuestions}
          subjects={subjects}
          classes={classes}
          initialSubjectId={selectedQSubjectFilter !== 'all' ? selectedQSubjectFilter : undefined}
          initialClassId={selectedQClassFilter !== 'all' ? selectedQClassFilter : undefined}
          isOperator={true}
        />
      )}

      {/* Question Manual Editor Modal for Operator */}
      {showQuestionEditorModal && (
        <QuestionEditorModal
          isOpen={true}
          onClose={() => {
            setShowQuestionEditorModal(false);
            setEditingQuestion(null);
          }}
          onSaveQuestion={handleSaveSingleQuestion}
          subjects={subjects}
          classes={classes}
          initialQuestion={editingQuestion}
          initialSubjectId={selectedQSubjectFilter !== 'all' ? selectedQSubjectFilter : undefined}
          initialClassId={selectedQClassFilter !== 'all' ? selectedQClassFilter : undefined}
        />
      )}

      {/* Reset Exam Results Modal */}
      {showResetModal && (
        <ResetExamResultsModal
          isOpen={true}
          onClose={() => {
            setShowResetModal(false);
            setResetTargetSession(null);
          }}
          targetSession={resetTargetSession}
          sessions={sessions}
          classes={classes}
          onConfirmResetSingle={handleConfirmResetSingle}
          onConfirmResetBatch={handleConfirmResetBatch}
          userRole="operator"
          currentExamTitle={exams[0]?.title}
        />
      )}

      {/* Export & Print Exam Results Modal */}
      {showExportModal && (
        <ExportExamResultsModal
          isOpen={true}
          onClose={() => setShowExportModal(false)}
          sessions={sessions}
          exams={exams}
          students={students}
          subjects={subjects}
          classes={classes}
          schoolSetting={schoolSetting}
          isOperator={true}
          initialSubjectId={resultsSubjectFilter}
          initialClassId={selectedClassFilter}
        />
      )}
    </div>
  );
};
