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
  UserPlus
} from 'lucide-react';
import { 
  Student, 
  UserAccount, 
  ClassRoom, 
  Subject, 
  ExamSchedule, 
  StudentExamSession, 
  AuditLog, 
  SchoolSetting,
  QuestionBank,
  Question
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
  onRestoreFactoryData?: () => void;
  lastSyncTime?: string;
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
  onRestoreFactoryData,
  lastSyncTime = ''
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'monitoring' | 'students' | 'teachers' | 'subjects' | 'questions' | 'schedules' | 'results' | 'cards' | 'logs' | 'settings'>('overview');

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
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<Student | null>(null);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTokenInfo(generateDynamicToken());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Quick stats
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const ongoingExams = exams.filter(e => e.status === 'ongoing').length;
  const activeExaminees = sessions.filter(s => s.status === 'in_progress').length;
  const completedExaminees = sessions.filter(s => s.status === 'submitted' || s.status === 'force_submitted').length;
  const lockedExaminees = sessions.filter(s => s.isLocked).length;

  // Realtime Actions
  const handleResetSession = (sessionId: string, studentName: string) => {
    onUpdateSessions(sessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          status: 'not_started',
          isLocked: false,
          violationsCount: 0,
          answers: {},
          scorePg: 0,
          scoreEssay: 0,
          finalScore: 0,
          isOnline: false
        };
      }
      return s;
    }));
    onAddAuditLog('RESET_SESI_SISWA', `Mereset sesi ujian untuk siswa: ${studentName}`);
  };

  const handleUnlockSession = (sessionId: string, studentName: string) => {
    onUpdateSessions(sessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          isLocked: false,
          lockReason: undefined,
          status: 'in_progress'
        };
      }
      return s;
    }));
    onAddAuditLog('BUKA_KUNCI_SISWA', `Membuka kunci anti-curang untuk siswa: ${studentName}`);
  };

  const handleAddExtraTime = (sessionId: string, studentName: string) => {
    onUpdateSessions(sessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          extraTimeMinutes: s.extraTimeMinutes + 15,
          timeRemainingSeconds: s.timeRemainingSeconds + (15 * 60)
        };
      }
      return s;
    }));
    onAddAuditLog('TAMBAH_WAKTU', `Menambahkan 15 menit waktu ujian untuk siswa: ${studentName}`);
  };

  const handleForceSubmit = (sessionId: string, studentName: string) => {
    onUpdateSessions(sessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          status: 'force_submitted',
          submittedAt: new Date().toLocaleTimeString('id-ID'),
          timeRemainingSeconds: 0
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

    const preparedQuestion: Question = {
      ...question,
      subjectId: finalSubjectId,
      classId: finalClassId,
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
    const startingNum = questionBank.questions.length + 1;

    const renumbered = imported.map((q, idx) => ({
      ...q,
      subjectId: finalSubjectId,
      classId: finalClassId,
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

  const handleDeleteQuestion = (qId: string) => {
    if (confirm('Hapus butir soal ini dari bank soal?')) {
      const filtered = questionBank.questions.filter(q => q.id !== qId);
      onUpdateQuestionBank({
        ...questionBank,
        totalQuestions: filtered.length,
        questions: filtered
      });
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
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
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
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
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeTab === 'monitoring' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Monitor Real-Time ({activeExaminees})
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
      {activeTab === 'monitoring' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pemantauan Ujian Siswa Secara Real-Time
              </h3>
              <p className="text-xs text-slate-500">
                Status koneksi online, jumlah jawaban tersimpan, sisa waktu, dan deteksi pelanggaran anti-curang.
              </p>
            </div>
            <div className="flex items-center gap-2">
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

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">NIS</th>
                  <th className="py-2.5 px-3 font-semibold">Nama Siswa</th>
                  <th className="py-2.5 px-3 font-semibold">Kelas</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold">Progress</th>
                  <th className="py-2.5 px-3 font-semibold">Sisa Waktu</th>
                  <th className="py-2.5 px-3 font-semibold">Pelanggaran</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Tindakan Pengawas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions.map(s => {
                  const answeredCount = Object.keys(s.answers).length;
                  return (
                    <tr key={s.id} className={`hover:bg-slate-50/60 ${s.isLocked ? 'bg-rose-50/40' : ''}`}>
                      <td className="py-2 px-3 font-mono text-slate-700">{s.nis}</td>
                      <td className="py-2 px-3 font-medium text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${s.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <span>{s.studentName}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-slate-600">{s.className}</td>
                      <td className="py-2 px-3">
                        {s.isLocked ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                            <ShieldAlert className="w-3 h-3" /> Terkunci
                          </span>
                        ) : s.status === 'submitted' || s.status === 'force_submitted' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            <CheckCircle className="w-3 h-3" /> Selesai
                          </span>
                        ) : s.status === 'in_progress' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3" /> Mengerjakan
                          </span>
                        ) : (
                          <span className="text-slate-400">Belum Masuk</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        <span className="font-mono text-slate-700">{answeredCount} / {questionBank.questions.length} Soal</span>
                      </td>
                      <td className="py-2 px-3 font-mono text-slate-600">
                        {s.status === 'in_progress' ? `${Math.floor(s.timeRemainingSeconds / 60)}m` : '-'}
                      </td>
                      <td className="py-2 px-3">
                        {s.violationsCount > 0 ? (
                          <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[11px] ${
                            s.violationsCount >= schoolSetting.maxViolations
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {s.violationsCount}x insiden
                          </span>
                        ) : (
                          <span className="text-slate-400">0</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {s.isLocked ? (
                            <button
                              onClick={() => handleUnlockSession(s.id, s.studentName)}
                              className="px-2 py-1 text-[11px] font-medium bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                            >
                              Buka Kunci
                            </button>
                          ) : s.status === 'in_progress' ? (
                            <>
                              <button
                                onClick={() => handleAddExtraTime(s.id, s.studentName)}
                                className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                                title="Tambah 15 menit"
                              >
                                +15m
                              </button>
                              <button
                                onClick={() => handleForceSubmit(s.id, s.studentName)}
                                className="px-2 py-1 text-[11px] font-medium bg-amber-100 hover:bg-amber-200 text-amber-800 rounded transition-colors"
                                title="Paksa Kumpulkan"
                              >
                                Kumpul
                              </button>
                            </>
                          ) : null}

                          {(s.status === 'submitted' || s.status === 'force_submitted' || s.finalScore > 0) && (
                            <button
                              onClick={() => handleOpenResetSingle(s)}
                              className="px-2 py-1 text-[11px] font-medium bg-rose-100 hover:bg-rose-200 text-rose-800 rounded transition-colors flex items-center gap-1"
                              title="Reset hasil ujian siswa ini agar dapat ujian ulang"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Reset Hasil
                            </button>
                          )}

                          <button
                            onClick={() => handleResetSession(s.id, s.studentName)}
                            className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                            title="Reset sesi perangkat"
                          >
                            Reset Sesi
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
              <label className="block font-semibold text-slate-700 mb-1">Filter Kelas / Rombel:</label>
              <select
                value={selectedQClassFilter}
                onChange={e => setSelectedQClassFilter(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none"
              >
                <option value="all">Semua Kelas ({classes.length})</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>Kelas {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Questions Grid */}
          {(() => {
            const filteredQuestions = questionBank.questions.filter(q => {
              const matchSubject = selectedQSubjectFilter === 'all' || q.subjectId === selectedQSubjectFilter || (!q.subjectId && selectedQSubjectFilter === 'sbj-mat');
              const matchClass = selectedQClassFilter === 'all' || q.classId === selectedQClassFilter || (!q.classId);
              return matchSubject && matchClass;
            });

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>Menampilkan <strong>{filteredQuestions.length}</strong> dari <strong>{questionBank.questions.length}</strong> butir soal</span>
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
                  filteredQuestions.map((q, idx) => (
                    <div key={q.id} className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white hover:border-slate-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">Butir Soal #{idx + 1}</span>
                          <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            {q.type.replace('_', ' ')}
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
                  ))
                )}
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
            {exams.map(ex => (
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
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: REKAP NILAI */}
      {activeTab === 'results' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Rekap Hasil Nilai & Ketuntasan KKM
                </h3>
                {lastSyncTime && (
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Sync: {lastSyncTime}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Rekap nilai otomatis gabungan skor pilihan ganda, mencocokkan, dan uraian (KKM: 75).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleOpenResetBatch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
                title="Reset hasil ujian massal untuk seluruh peserta atau kelas tertentu"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                Reset Semua Hasil Ulangan
              </button>
              <button
                onClick={() => alert('Mengunduh format Rekap_Nilai_UAS_SMPN12_BJB.xlsx')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                Ekspor Excel/PDF
              </button>
            </div>
          </div>

          {/* Quick Metrics & Class Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600">Filter Rombel:</span>
              <select
                value={selectedClassFilter}
                onChange={e => setSelectedClassFilter(e.target.value)}
                className="px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white outline-none font-medium"
              >
                <option value="all">Semua Rombel ({sessions.length} Siswa)</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>Kelas {c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-slate-500">Tuntas (≥75):</span>{' '}
                <span className="font-bold text-emerald-700">
                  {sessions.filter(s => (selectedClassFilter === 'all' || s.classId === selectedClassFilter) && s.finalScore >= 75).length}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Belum Tuntas:</span>{' '}
                <span className="font-bold text-rose-600">
                  {sessions.filter(s => (selectedClassFilter === 'all' || s.classId === selectedClassFilter) && s.finalScore < 75 && (s.status === 'submitted' || s.status === 'force_submitted')).length}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Rata-rata:</span>{' '}
                <span className="font-bold text-blue-700 font-mono">
                  {(() => {
                    const filtered = sessions.filter(s => (selectedClassFilter === 'all' || s.classId === selectedClassFilter) && (s.status === 'submitted' || s.status === 'force_submitted'));
                    if (filtered.length === 0) return '0';
                    return Math.round(filtered.reduce((acc, curr) => acc + curr.finalScore, 0) / filtered.length);
                  })()}
                </span>
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
                  <th className="py-2.5 px-3 font-semibold">Skor Otomatis</th>
                  <th className="py-2.5 px-3 font-semibold">Skor Uraian</th>
                  <th className="py-2.5 px-3 font-semibold">Nilai Akhir</th>
                  <th className="py-2.5 px-3 font-semibold">Status KKM</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Aksi Reset</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions
                  .filter(s => selectedClassFilter === 'all' || s.classId === selectedClassFilter)
                  .map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 font-mono text-slate-700">{s.nis}</td>
                      <td className="py-2 px-3 font-medium text-slate-900">{s.studentName}</td>
                      <td className="py-2 px-3 text-slate-600">{s.className}</td>
                      <td className="py-2 px-3 font-mono text-slate-700">{s.scorePg}</td>
                      <td className="py-2 px-3 font-mono text-slate-700">{s.scoreEssay}</td>
                      <td className="py-2 px-3 font-mono font-bold text-blue-700">{s.finalScore}</td>
                      <td className="py-2 px-3">
                        {s.finalScore >= 75 ? (
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
                          title="Reset hasil ulangan siswa ini agar bisa ujian ulang"
                        >
                          <RotateCcw className="w-3 h-3 text-rose-600" />
                          <span>Reset Hasil</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: KARTU PESERTA */}
      {activeTab === 'cards' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Cetak Kartu Peserta Ujian & Lembar Kehadiran
              </h3>
              <p className="text-xs text-slate-500">
                Kartu resmi peserta ujian memuat NIS, Nama, Kelas, Ruang, dan Bangku.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak Semua Kartu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(selectedStudentForCard ? [selectedStudentForCard] : students.slice(0, 6)).map(std => (
              <div key={std.id} className="border-2 border-slate-800 rounded-lg p-4 bg-white space-y-3 relative">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={schoolSetting.logoUrl || '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg'}
                      alt="Logo"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div className="flex-1 text-center pr-2">
                    <h4 className="text-xs font-bold text-slate-900 tracking-tight">KARTU PESERTA UJIAN</h4>
                    <p className="text-[10px] text-slate-700 font-semibold uppercase">{schoolSetting.name}</p>
                    <p className="text-[9px] text-slate-400">T.A. {schoolSetting.academicYear} · Semester {schoolSetting.semester}</p>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">NIS:</span>
                    <span className="font-mono font-bold">{std.nis}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nama:</span>
                    <span className="font-semibold text-right">{std.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kelas:</span>
                    <span className="font-medium">{std.className}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ruang / Sesi:</span>
                    <span className="font-medium">{std.roomNumber || 'Ruang 01'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nomor Bangku:</span>
                    <span className="font-mono font-bold text-blue-700">{std.seatNumber || '01'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Banjarbaru, 2026</span>
                  <span>Kepala Sekolah</span>
                </div>
              </div>
            ))}
          </div>
          {selectedStudentForCard && (
            <div className="text-center pt-2">
              <button
                onClick={() => setSelectedStudentForCard(null)}
                className="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
              >
                ← Tampilkan Semua Kartu Siswa
              </button>
            </div>
          )}
        </div>
      )}

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

            <div className="md:col-span-2">
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
    </div>
  );
};
