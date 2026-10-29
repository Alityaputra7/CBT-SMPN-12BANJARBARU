import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Copy, 
  Edit3, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  BarChart3, 
  FileCheck2,
  Check,
  Eye,
  Upload,
  Layers,
  RotateCcw,
  CheckSquare,
  Square
} from 'lucide-react';
import { 
  UserAccount, 
  QuestionBank, 
  Question, 
  ExamSchedule, 
  StudentExamSession, 
  ClassRoom,
  Subject
} from '../../types/cbt';
import { generateDynamicToken } from '../../utils/tokenGenerator';
import { KatexRenderer } from '../common/KatexRenderer';
import { QuestionImportModal } from '../common/QuestionImportModal';
import { QuestionEditorModal } from '../common/QuestionEditorModal';
import { ResetExamResultsModal } from '../common/ResetExamResultsModal';
import { 
  QUESTION_CLASS_GROUPS, 
  isQuestionMatchingClass, 
  getQuestionClassLabel 
} from '../../utils/classGroups';

interface GuruDashboardProps {
  teacher: UserAccount;
  questionBank: QuestionBank;
  onUpdateQuestionBank: (bank: QuestionBank) => void;
  exams: ExamSchedule[];
  sessions: StudentExamSession[];
  onUpdateSessions: (sessions: StudentExamSession[]) => void;
  classes: ClassRoom[];
  subjects: Subject[];
  onResetSingleResult?: (sessionId: string, reason?: string) => void;
  onResetAllResults?: (targetClassId?: string, reason?: string) => void;
  lastSyncTime?: string;
}

export const GuruDashboard: React.FC<GuruDashboardProps> = ({
  teacher,
  questionBank,
  onUpdateQuestionBank,
  exams,
  sessions,
  onUpdateSessions,
  classes,
  subjects,
  onResetSingleResult,
  onResetAllResults,
  lastSyncTime = ''
}) => {
  // 1. Guru Subject Authorization: strictly limit to assigned subjects
  const teacherSubjects = subjects.filter(s => teacher.assignedSubjectIds?.includes(s.id));
  const effectiveTeacherSubjects = teacherSubjects.length > 0 
    ? teacherSubjects 
    : (subjects.filter(s => s.assignedTeacherIds?.includes(teacher.id)).length > 0
        ? subjects.filter(s => s.assignedTeacherIds?.includes(teacher.id))
        : [subjects[0]]);
  const teacherSubjectIds = effectiveTeacherSubjects.map(s => s.id);

  const [activeTab, setActiveTab] = useState<'bank' | 'monitor' | 'correction' | 'analysis'>('bank');
  const [tokenInfo, setTokenInfo] = useState(generateDynamicToken());
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Bulk Delete Selection State
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  // Reset Results Modal State
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [resetTargetSession, setResetTargetSession] = useState<StudentExamSession | null>(null);

  // Filter state: default to teacher's first assigned subject
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>(
    effectiveTeacherSubjects[0]?.id || 'sbj-mat'
  );
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');

  // Question Modals
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showEditorModal, setShowEditorModal] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Correction state
  const [selectedSessionForGrading, setSelectedSessionForGrading] = useState<StudentExamSession | null>(null);
  const [selectedEssayQuestion, setSelectedEssayQuestion] = useState<Question | null>(null);
  const [essayGradingScore, setEssayGradingScore] = useState<number>(15);
  const [essayFeedback, setEssayFeedback] = useState<string>('Jawaban dan langkah penyelesaian sudah sangat tepat.');

  useEffect(() => {
    const timer = setInterval(() => {
      setTokenInfo(generateDynamicToken());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
        submittedAt: undefined,
        timeRemainingSeconds: 90 * 60,
        isOnline: false
      } : s));
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
            submittedAt: undefined,
            timeRemainingSeconds: 90 * 60,
            isOnline: false
          };
        }
        return s;
      }));
    }
  };

  // Bulk Delete Actions for Guru
  const handleToggleSelectQuestion = (qId: string) => {
    setSelectedQuestionIds(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleToggleSelectAll = (visibleQuestions: Question[]) => {
    const visibleIds = visibleQuestions.map(q => q.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every(id => selectedQuestionIds.includes(id));
    if (allSelected) {
      setSelectedQuestionIds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedQuestionIds(prev => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleBulkDelete = () => {
    if (selectedQuestionIds.length === 0) return;
    if (confirm(`Apakah Anda yakin ingin menghapus ${selectedQuestionIds.length} butir soal terpilih? Tindakan ini tidak dapat dibatalkan.`)) {
      const remainingQuestions = questionBank.questions.filter(q => !selectedQuestionIds.includes(q.id));
      onUpdateQuestionBank({
        ...questionBank,
        totalQuestions: remainingQuestions.length,
        questions: remainingQuestions
      });
      setSelectedQuestionIds([]);
      if (selectedQuestion && selectedQuestionIds.includes(selectedQuestion.id)) {
        setSelectedQuestion(remainingQuestions[0] || null);
      }
      alert(`Berhasil menghapus ${selectedQuestionIds.length} butir soal.`);
    }
  };

  const handleDuplicateQuestion = (q: Question) => {
    if (q.subjectId && !teacherSubjectIds.includes(q.subjectId)) {
      alert('Akses Ditolak: Anda hanya dapat menduplikat soal untuk mata pelajaran yang Anda ampu!');
      return;
    }
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
  };

  const handleDeleteQuestion = (id: string) => {
    const targetQ = questionBank.questions.find(q => q.id === id);
    if (targetQ && targetQ.subjectId && !teacherSubjectIds.includes(targetQ.subjectId)) {
      alert('Akses Ditolak: Anda hanya dapat menghapus butir soal untuk mata pelajaran Anda sendiri!');
      return;
    }
    if (confirm('Hapus butir soal ini?')) {
      const filtered = questionBank.questions.filter(q => q.id !== id);
      onUpdateQuestionBank({
        ...questionBank,
        totalQuestions: filtered.length,
        questions: filtered
      });
      setSelectedQuestion(filtered[0] || null);
      setSelectedQuestionIds(prev => prev.filter(qid => qid !== id));
    }
  };

  const handleSaveQuestion = (question: Question, targetSubjectId: string, targetClassId: string) => {
    const finalSub = targetSubjectId || selectedSubjectFilter || teacherSubjectIds[0] || 'sbj-mat';
    if (!teacherSubjectIds.includes(finalSub)) {
      alert('Akses Ditolak: Anda hanya berhak menginput soal untuk mata pelajaran yang Anda ampu!');
      return;
    }

    const finalCls = targetClassId || (selectedClassFilter !== 'all' ? selectedClassFilter : 'cls-1');
    const finalGrade = finalCls === 'cls-8' ? 'VIII' : (finalCls === 'cls-9' ? 'IX' : 'VII');

    const existingIndex = questionBank.questions.findIndex(q => q.id === question.id);
    let updatedQuestions: Question[];

    const preparedQ: Question = {
      ...question,
      subjectId: finalSub,
      classId: finalCls,
      grade: finalGrade,
      bankId: `qbank-${finalSub}`
    };

    if (existingIndex >= 0) {
      updatedQuestions = [...questionBank.questions];
      updatedQuestions[existingIndex] = preparedQ;
    } else {
      preparedQ.number = questionBank.questions.length + 1;
      updatedQuestions = [...questionBank.questions, preparedQ];
    }

    onUpdateQuestionBank({
      ...questionBank,
      totalQuestions: updatedQuestions.length,
      questions: updatedQuestions
    });
    setSelectedQuestion(preparedQ);
    setEditingQuestion(null);
    setShowEditorModal(false);
    alert('Butir soal berhasil disimpan dan langsung aktif untuk peserta ujian.');
  };

  const handleSaveImportedQuestions = (imported: Question[], targetSubjectId: string, targetClassId: string) => {
    const finalSub = targetSubjectId || selectedSubjectFilter || teacherSubjectIds[0] || 'sbj-mat';
    if (!teacherSubjectIds.includes(finalSub)) {
      alert('Akses Ditolak: Anda hanya berhak mengimpor soal untuk mata pelajaran yang Anda ampu!');
      return;
    }

    const finalCls = targetClassId || (selectedClassFilter !== 'all' ? selectedClassFilter : 'cls-1');
    const finalGrade = finalCls === 'cls-8' ? 'VIII' : (finalCls === 'cls-9' ? 'IX' : 'VII');
    const startingNum = questionBank.questions.length + 1;

    const renumbered = imported.map((q, idx) => ({
      ...q,
      subjectId: finalSub,
      classId: finalCls,
      grade: finalGrade,
      bankId: `qbank-${finalSub}`,
      number: startingNum + idx
    }));
    const updated = [...questionBank.questions, ...renumbered];

    onUpdateQuestionBank({
      ...questionBank,
      totalQuestions: updated.length,
      questions: updated
    });
    setSelectedQuestion(renumbered[0] || questionBank.questions[0]);
    alert(`Berhasil mengimpor ${imported.length} butir soal ke ${finalSub}. Soal langsung aktif untuk ujian siswa.`);
  };

  // Save manual essay grade for teacher's subject
  const handleSaveEssayScore = (session: StudentExamSession, questionId: string) => {
    const scoreVal = Number(essayGradingScore);
    const updatedAnswers = {
      ...session.answers,
      [questionId]: {
        answer: session.answers[questionId]?.answer || '',
        isDoubtful: false,
        scoreObtained: scoreVal,
        updatedAt: Date.now()
      }
    };

    // Calculate total essay score across all essay questions
    const currentExam = exams.find(e => e.id === session.examId);
    const exSubId = currentExam?.subjectId || selectedSubjectFilter;
    const essayQs = questionBank.questions.filter(q => q.type === 'uraian' && (q.subjectId === exSubId || (!q.subjectId && exSubId === 'sbj-mat')));
    
    let totalEssayScore = 0;
    essayQs.forEach(eq => {
      if (eq.id === questionId) {
        totalEssayScore += scoreVal;
      } else if (session.answers[eq.id]?.scoreObtained !== undefined) {
        totalEssayScore += Number(session.answers[eq.id]?.scoreObtained) || 0;
      }
    });

    const updatedFinalScore = Math.min(100, session.scorePg + totalEssayScore);
    const kkm = currentExam?.kkm || 75;

    const updatedSessions = sessions.map(s => {
      if (s.id === session.id) {
        return {
          ...s,
          answers: updatedAnswers,
          scoreEssay: totalEssayScore,
          finalScore: updatedFinalScore,
          isPassed: updatedFinalScore >= kkm
        };
      }
      return s;
    });

    onUpdateSessions(updatedSessions);
    alert(`Nilai uraian siswa ${session.studentName} berhasil disimpan. Skor uraian: ${totalEssayScore}, Nilai akhir: ${updatedFinalScore}`);
    setSelectedSessionForGrading(null);
    setSelectedEssayQuestion(null);
  };

  // Class analytics calculations
  const completedSessions = sessions.filter(s => s.status === 'submitted' || s.status === 'force_submitted');
  const averageScore = completedSessions.length > 0 
    ? Math.round(completedSessions.reduce((acc, curr) => acc + curr.finalScore, 0) / completedSessions.length)
    : 0;
  const passCount = completedSessions.filter(s => s.finalScore >= 75).length;
  const passRate = completedSessions.length > 0 
    ? Math.round((passCount / completedSessions.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Portal Guru & Pengawas CBT
            </h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
              Pengampu Mata Pelajaran
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {teacher.name} (NIP: {teacher.usernameOrNip}) · Kelas VII-A & VII-B
          </p>
        </div>

        {/* Classroom Projector Token Box */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-5 py-3 rounded-xl shadow-md border border-emerald-700 flex items-center gap-4">
          <div>
            <div className="text-[10px] text-emerald-200 uppercase tracking-wider font-bold">
              Token Aktif Ruang Ujian (5 Menit)
            </div>
            <div className="text-2xl font-mono font-bold tracking-widest text-amber-300">
              {tokenInfo.token}
            </div>
          </div>
          <div className="border-l border-white/20 pl-4 text-right">
            <div className="text-[10px] text-emerald-200">Kedaluwarsa:</div>
            <div className="text-sm font-mono font-bold text-white flex items-center justify-end gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              {tokenInfo.expiresInSeconds}s
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg max-w-xl">
        <button
          onClick={() => setActiveTab('bank')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'bank' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Bank Soal ({questionBank.questions.length})
        </button>
        <button
          onClick={() => setActiveTab('monitor')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'monitor' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          Monitor Ujian
        </button>
        <button
          onClick={() => setActiveTab('correction')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'correction' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          Koreksi Uraian
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'analysis' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Analisis Butir & Nilai
        </button>
      </div>

      {/* TAB 1: BANK SOAL */}
      {activeTab === 'bank' && (
        <div className="space-y-4">
          {/* Action Bar for Bank Soal */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-0.5">Mata Pelajaran (Diampu):</label>
                <select
                  value={selectedSubjectFilter}
                  onChange={e => {
                    setSelectedSubjectFilter(e.target.value);
                    setSelectedQuestionIds([]);
                  }}
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white outline-none font-semibold text-blue-800"
                >
                  {effectiveTeacherSubjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-0.5">Kelompok Kelas:</label>
                <select
                  value={selectedClassFilter}
                  onChange={e => {
                    setSelectedClassFilter(e.target.value);
                    setSelectedQuestionIds([]);
                  }}
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white outline-none font-medium"
                >
                  <option value="all">Semua Kelas</option>
                  {QUESTION_CLASS_GROUPS.map(cg => (
                    <option key={cg.id} value={cg.id}>{cg.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                Impor CSV / Excel / Word
              </button>
              <button
                onClick={() => {
                  setEditingQuestion(null);
                  setShowEditorModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Input Soal Manual
              </button>
            </div>
          </div>

          {/* Bulk Selection Notification & Action Banner */}
          {selectedQuestionIds.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-xs shadow-xs animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-[11px]">
                  {selectedQuestionIds.length}
                </span>
                <span className="font-bold text-rose-900">
                  {selectedQuestionIds.length} butir soal dipilih
                </span>
                <span className="text-rose-600 text-[11px] hidden sm:inline">
                  (Anda dapat menghapus beberapa butir soal sekaligus)
                </span>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-colors shadow-2xs cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus {selectedQuestionIds.length} Soal Terpilih
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedQuestionIds([])}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-300 font-medium transition-colors cursor-pointer"
                >
                  Batal Pilih
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question List Column */}
          {(() => {
            const filteredGuruQuestions = questionBank.questions.filter(q => {
              // Guru only accesses their own subject questions
              const isOwnSubject = teacherSubjectIds.includes(q.subjectId || '');
              if (!isOwnSubject) return false;

              // Filter by specific selected subject
              if (selectedSubjectFilter && selectedSubjectFilter !== 'all' && q.subjectId !== selectedSubjectFilter) {
                return false;
              }

              // Filter by class using combined Kelas VIII logic
              return isQuestionMatchingClass(q.classId, q.grade, selectedClassFilter);
            });

            const allSelected = filteredGuruQuestions.length > 0 && filteredGuruQuestions.every(q => selectedQuestionIds.includes(q.id));

            return (
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleSelectAll(filteredGuruQuestions)}
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
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {filteredGuruQuestions.length} Soal
                  </span>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {filteredGuruQuestions.length === 0 ? (
                    <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center text-xs text-slate-500 space-y-2">
                      <p>Belum ada butir soal untuk mata pelajaran atau kelompok kelas ini.</p>
                      <button
                        onClick={() => {
                          setEditingQuestion(null);
                          setShowEditorModal(true);
                        }}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Tambah Butir Soal Baru
                      </button>
                    </div>
                  ) : (
                    filteredGuruQuestions.map((q, idx) => {
                      const isChecked = selectedQuestionIds.includes(q.id);
                      const isSelected = selectedQuestion?.id === q.id;

                      return (
                        <div
                          key={q.id}
                          onClick={() => setSelectedQuestion(q)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50/40 shadow-xs ring-1 ring-blue-500/30'
                              : isChecked
                              ? 'border-amber-400 bg-amber-50/30'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleToggleSelectQuestion(q.id);
                              }}
                              className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between text-xs gap-1">
                                <span className="font-bold text-slate-900">Soal #{idx + 1}</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                    {getQuestionClassLabel(q.classId, q.grade)}
                                  </span>
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                                    {q.type.replace('_', ' ')} · {q.points}p
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                                {q.prompt.replace(/\$\$[\s\S]+?\$\$/g, '[Rumus]').replace(/\$[^\$]+?\$/g, '[Rumus]')}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })()}

            {/* Question Detail & KaTeX Live Preview */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              {selectedQuestion ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Butir Soal #{selectedQuestion.number} ({selectedQuestion.type.toUpperCase()})
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Bobot: {selectedQuestion.points} Poin · Tingkat: {selectedQuestion.difficulty || 'sedang'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDuplicateQuestion(selectedQuestion)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Duplikat Soal"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingQuestion(selectedQuestion);
                          setShowEditorModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Butir Soal"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(selectedQuestion.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Soal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Prompt with KaTeX */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Teks Pertanyaan & Formula KaTeX:
                    </h4>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm leading-relaxed">
                      <KatexRenderer content={selectedQuestion.prompt} />
                      {selectedQuestion.imageUrl && (
                        <img 
                          src={selectedQuestion.imageUrl} 
                          alt="Ilustrasi" 
                          className="max-h-48 object-contain rounded mt-3 border border-slate-200" 
                        />
                      )}
                    </div>
                  </div>

                  {/* Options if PG or PG Kompleks */}
                  {['pg', 'pg_kompleks', 'benar_salah'].includes(selectedQuestion.type) && selectedQuestion.options.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        Pilihan Jawaban:
                      </h4>
                      <div className="space-y-2">
                        {selectedQuestion.options.map(opt => {
                          const isCorrect = selectedQuestion.correctAnswers?.includes(opt.id);
                          return (
                            <div
                              key={opt.id}
                              className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                                isCorrect 
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium' 
                                : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center font-bold font-mono text-slate-700">
                                  {opt.id}
                                </span>
                                <KatexRenderer content={opt.text} />
                              </div>
                              {isCorrect && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                  Kunci Benar
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Mencocokkan (Menjodohkan) Pairs Preview */}
                  {selectedQuestion.type === 'mencocokkan' && selectedQuestion.matchingPairs && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Pasangan Soal Menjodohkan (Kunci):
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {selectedQuestion.matchingPairs.map((pair, pIdx) => (
                          <div key={pIdx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                            <KatexRenderer content={pair.leftText} />
                            <span className="text-slate-400 font-bold px-2">↔</span>
                            <span className="font-semibold text-blue-700">{pair.rightText}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Isian Singkat Answer */}
                  {selectedQuestion.type === 'isian' && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs">
                      <span className="font-bold text-blue-900">Kunci Jawaban Isian Singkat:</span>
                      <span className="font-mono font-bold ml-2 text-blue-700">{selectedQuestion.correctAnswerText}</span>
                    </div>
                  )}

                  {/* Essay Rubric */}
                  {selectedQuestion.type === 'uraian' && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                      <span className="font-bold block mb-1">Pedoman Penskoran / Rubrik Guru:</span>
                      {selectedQuestion.essayRubric}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-slate-400 text-sm">
                  Pilih atau tambah butir soal baru.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MONITOR UJIAN */}
      {activeTab === 'monitor' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pemantauan Kelas ({classes.map(c => c.name).join(', ')})
              </h3>
              <p className="text-xs text-slate-500">
                Memantau {sessions.length} siswa yang sedang mengikuti ujian {teacher.assignedSubjectIds?.[0] ? 'mata pelajaran ini' : 'aktif'}.
              </p>
            </div>
            <button
              onClick={handleOpenResetBatch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
              title="Reset semua hasil ujian siswa untuk remedial kelas"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              Reset Hasil Ujian Kelas
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold">NIS</th>
                  <th className="py-2.5 px-3 font-semibold">Nama Siswa</th>
                  <th className="py-2.5 px-3 font-semibold">Kelas</th>
                  <th className="py-2.5 px-3 font-semibold">Status Pengerjaan</th>
                  <th className="py-2.5 px-3 font-semibold">Pelanggaran</th>
                  <th className="py-2.5 px-3 font-semibold">Nilai Sementara</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Aksi Guru</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/60">
                    <td className="py-2 px-3 font-mono text-slate-700">{s.nis}</td>
                    <td className="py-2 px-3 font-medium text-slate-900">{s.studentName}</td>
                    <td className="py-2 px-3 text-slate-600">{s.className}</td>
                    <td className="py-2 px-3">
                      {s.status === 'submitted' || s.status === 'force_submitted' ? (
                        <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Selesai Dikumpulkan
                        </span>
                      ) : s.status === 'in_progress' ? (
                        <span className="text-blue-700 font-medium inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Sedang Mengerjakan
                        </span>
                      ) : (
                        <span className="text-slate-400">Belum Masuk</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {s.violationsCount > 0 ? (
                        <span className="text-rose-600 font-bold">{s.violationsCount}x insiden</span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>
                    <td className="py-2 px-3 font-mono font-bold text-slate-800">
                      {s.status === 'submitted' || s.status === 'force_submitted' ? (
                        <span className={s.finalScore >= 75 ? 'text-emerald-700' : 'text-rose-600'}>
                          {s.finalScore} / 100
                        </span>
                      ) : '-'}
                    </td>
                    <td className="py-2 px-3 text-right">
                      {(s.status === 'submitted' || s.status === 'force_submitted' || s.finalScore > 0) && (
                        <button
                          onClick={() => handleOpenResetSingle(s)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded transition-colors cursor-pointer"
                          title="Izinkan siswa mengikuti ujian remedial / ulang"
                        >
                          <RotateCcw className="w-3 h-3 text-rose-600" />
                          <span>Reset Nilai</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: KOREKSI URAIAN (HANYA MATA PELAJARAN GURU SENDIRI) */}
      {activeTab === 'correction' && (() => {
        const teacherExamIds = exams.filter(e => teacherSubjectIds.includes(e.subjectId)).map(e => e.id);
        const teacherSessions = sessions.filter(s => {
          if (s.examId && teacherExamIds.includes(s.examId)) return true;
          const ex = exams.find(e => e.id === s.examId);
          if (ex) return teacherSubjectIds.includes(ex.subjectId);
          return teacherSubjectIds.includes('sbj-mat');
        });
        const submittedSessions = teacherSessions.filter(s => s.status === 'submitted' || s.status === 'force_submitted');

        return (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Penilaian & Koreksi Manual Soal Uraian ({effectiveTeacherSubjects.map(s => s.name).join(', ')})
                </h3>
                <p className="text-xs text-slate-500">
                  Guru hanya mengoreksi lembar jawaban uraian mata pelajarannya sendiri. Nilai akhir siswa otomatis dikalkulasi ulang.
                </p>
              </div>
              <button
                onClick={handleOpenResetBatch}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                Reset Hasil Ujian Kelas
              </button>
            </div>

            {submittedSessions.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                Belum ada siswa yang menyelesaikan ujian untuk mata pelajaran yang Anda ampu ({effectiveTeacherSubjects.map(s => s.name).join(', ')}).
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {submittedSessions.map(s => {
                  const currentExam = exams.find(e => e.id === s.examId);
                  const examSubId = currentExam?.subjectId || teacherSubjectIds[0] || 'sbj-mat';
                  const examSubName = subjects.find(sub => sub.id === examSubId)?.name || 'Mata Pelajaran';
                  
                  const essayQuestions = questionBank.questions.filter(q => 
                    q.type === 'uraian' && (q.subjectId === examSubId || (!q.subjectId && examSubId === 'sbj-mat'))
                  );

                  return (
                    <div key={s.id} className="p-4 border border-slate-200 rounded-xl space-y-3 bg-slate-50/40 hover:border-slate-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{s.studentName}</h4>
                          <span className="text-xs text-slate-500">
                            NIS {s.nis} · {s.className} · {examSubName}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded">
                          Skor Esai: {s.scoreEssay}p
                        </span>
                      </div>

                      {essayQuestions.length === 0 ? (
                        <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-500 italic">
                          Tidak ada butir soal uraian untuk mata pelajaran ini. Nilai otomatis dari PG/Kompleks.
                        </div>
                      ) : (
                        essayQuestions.map(eq => {
                          const studentAns = s.answers[eq.id]?.answer || (eq.id === 'mat-7' || eq.id === 'q-6' ? s.answers['q-6']?.answer : undefined);
                          const studentScore = s.answers[eq.id]?.scoreObtained;

                          return (
                            <div key={eq.id} className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-2">
                              <div className="flex items-center justify-between text-slate-700">
                                <span className="font-bold text-slate-900">
                                  Soal Uraian #{eq.number} (Maks {eq.points} poin)
                                </span>
                                {studentScore !== undefined ? (
                                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    Skor: {studentScore}/{eq.points}
                                  </span>
                                ) : (
                                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                    Belum Dinilai
                                  </span>
                                )}
                              </div>

                              <p className="text-slate-800 italic whitespace-pre-wrap bg-slate-50 p-2.5 rounded border border-slate-100 text-xs">
                                {typeof studentAns === 'string' && studentAns.trim() ? studentAns : 'Siswa tidak mengisi jawaban uraian'}
                              </p>

                              <button
                                onClick={() => {
                                  setSelectedSessionForGrading(s);
                                  setSelectedEssayQuestion(eq);
                                  setEssayGradingScore(studentScore !== undefined ? studentScore : Math.min(eq.points, 15));
                                }}
                                className="w-full py-1.5 px-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer text-center"
                              >
                                Beri Nilai Soal #{eq.number}
                              </button>
                            </div>
                          );
                        })
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-xs text-slate-600">
                          Total Nilai Akhir: <strong className={s.finalScore >= 75 ? 'text-emerald-700' : 'text-rose-600'}>{s.finalScore}/100</strong>
                        </span>
                        <button
                          onClick={() => handleOpenResetSingle(s)}
                          className="py-1 px-2.5 text-[11px] font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded transition-colors cursor-pointer inline-flex items-center gap-1"
                          title="Reset ujian siswa ini"
                        >
                          <RotateCcw className="w-3 h-3 text-rose-600" />
                          <span>Reset Siswa</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* TAB 4: ANALISIS BUTIR & NILAI */}
      {activeTab === 'analysis' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Analisis Butir Soal & Statistik Kelas
            </h3>
            <p className="text-xs text-slate-500">
              Rata-rata kelas, tingkat kesukaran soal, dan daya beda untuk evaluasi kurikulum.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500">Rata-rata Nilai Kelas</span>
              <div className="text-2xl font-bold font-mono text-blue-700 mt-1">{averageScore} / 100</div>
              <span className="text-[11px] text-slate-400">KKM: 75.00</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500">Persentase Ketuntasan</span>
              <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">{passRate}%</div>
              <span className="text-[11px] text-slate-400">{passCount} Siswa Tuntas</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500">Jumlah Peserta Mengumpulkan</span>
              <div className="text-2xl font-bold font-mono text-slate-800 mt-1">{completedSessions.length}</div>
              <span className="text-[11px] text-slate-400">Dari total 30 siswa</span>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wide">
              Tingkat Kesukaran Butir Soal (Item Difficulty)
            </h4>
            <div className="space-y-2">
              {questionBank.questions.map((q, idx) => (
                <div key={q.id} className="p-3 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 mr-2">Soal #{idx + 1}</span>
                    <span className="text-slate-600">({q.type.toUpperCase()})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-700">{q.points} Poin</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      q.difficulty === 'mudah' ? 'bg-emerald-100 text-emerald-800' :
                      q.difficulty === 'sedang' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manual Question Editor Modal for Guru (Only Assigned Subjects) */}
      {showEditorModal && (
        <QuestionEditorModal
          isOpen={true}
          onClose={() => {
            setShowEditorModal(false);
            setEditingQuestion(null);
          }}
          onSaveQuestion={handleSaveQuestion}
          subjects={effectiveTeacherSubjects}
          classes={classes}
          initialQuestion={editingQuestion}
          initialSubjectId={selectedSubjectFilter}
          initialClassId={selectedClassFilter !== 'all' ? selectedClassFilter : undefined}
        />
      )}

      {/* Question Import Modal for Guru (Only Assigned Subjects) */}
      {showImportModal && (
        <QuestionImportModal
          isOpen={true}
          onClose={() => setShowImportModal(false)}
          onSaveQuestions={handleSaveImportedQuestions}
          subjects={effectiveTeacherSubjects}
          classes={classes}
          initialSubjectId={selectedSubjectFilter}
          initialClassId={selectedClassFilter !== 'all' ? selectedClassFilter : undefined}
          isOperator={false}
        />
      )}

      {/* Manual Essay Grading Modal */}
      {selectedSessionForGrading && selectedEssayQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 my-8">
            <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Koreksi Uraian: {selectedSessionForGrading.studentName}
                </h4>
                <p className="text-xs text-slate-500">
                  NIS {selectedSessionForGrading.nis} · {selectedSessionForGrading.className}
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Bobot: {selectedEssayQuestion.points} Poin
              </span>
            </div>

            {/* Question Prompt */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Naskah Pertanyaan Uraian #{selectedEssayQuestion.number}:
              </span>
              <div className="text-xs text-slate-800">
                <KatexRenderer content={selectedEssayQuestion.prompt} />
              </div>
            </div>

            {/* Rubric */}
            {selectedEssayQuestion.essayRubric && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1 text-amber-900">
                <span className="font-bold block">Pedoman Penskoran / Rubrik Guru:</span>
                <p className="leading-relaxed">{selectedEssayQuestion.essayRubric}</p>
              </div>
            )}

            {/* Student Answer */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-600 block">Lembar Jawaban Siswa:</span>
              <p className="italic text-slate-800 whitespace-pre-wrap text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {(() => {
                  const directAns = selectedSessionForGrading.answers[selectedEssayQuestion.id]?.answer;
                  const fallbackAns = (selectedEssayQuestion.id === 'mat-7' || selectedEssayQuestion.id === 'q-6')
                    ? selectedSessionForGrading.answers['q-6']?.answer
                    : undefined;
                  const ans = directAns || fallbackAns;
                  return typeof ans === 'string' && ans.trim() ? ans : 'Siswa tidak mengisi lembar jawaban uraian';
                })()}
              </p>
            </div>

            <div className="space-y-3 text-xs pt-1">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Skor Diberikan (0 s/d {selectedEssayQuestion.points} Poin):
                </label>
                <input
                  type="number"
                  min={0}
                  max={selectedEssayQuestion.points}
                  value={essayGradingScore}
                  onChange={e => setEssayGradingScore(Math.min(selectedEssayQuestion.points, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-base font-bold text-blue-700 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Catatan / Feedback Guru untuk Siswa:
                </label>
                <textarea
                  rows={2}
                  value={essayFeedback}
                  onChange={e => setEssayFeedback(e.target.value)}
                  placeholder="Berikan catatan koreksi atau penjelasan perolehan skor..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSessionForGrading(null);
                    setSelectedEssayQuestion(null);
                  }}
                  className="px-4 py-2 rounded-lg text-xs text-slate-600 hover:bg-slate-100 cursor-pointer font-medium"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveEssayScore(selectedSessionForGrading, selectedEssayQuestion.id)}
                  className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer shadow-sm transition-colors"
                >
                  Simpan Nilai Uraian
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Exam Results Modal for Guru */}
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
          userRole="guru"
          currentExamTitle={exams[0]?.title}
        />
      )}
    </div>
  );
};
