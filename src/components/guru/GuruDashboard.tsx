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
  RotateCcw
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
  const [activeTab, setActiveTab] = useState<'bank' | 'monitor' | 'correction' | 'analysis'>('bank');
  const [tokenInfo, setTokenInfo] = useState(generateDynamicToken());
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(questionBank.questions[0] || null);

  // Reset Results Modal State
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

  // Filter state
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>(teacher.assignedSubjectIds?.[0] || 'sbj-mat');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');

  // Question Modals
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showEditorModal, setShowEditorModal] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Correction state
  const [selectedSessionForGrading, setSelectedSessionForGrading] = useState<StudentExamSession | null>(null);
  const [essayGradingScore, setEssayGradingScore] = useState<number>(15);
  const [essayFeedback, setEssayFeedback] = useState<string>('Jawaban dan langkah penyelesaian sudah sangat tepat.');

  useEffect(() => {
    const timer = setInterval(() => {
      setTokenInfo(generateDynamicToken());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Hapus butir soal ini?')) {
      const filtered = questionBank.questions.filter(q => q.id !== id);
      onUpdateQuestionBank({
        ...questionBank,
        totalQuestions: filtered.length,
        questions: filtered
      });
      setSelectedQuestion(filtered[0] || null);
    }
  };

  const handleSaveQuestion = (question: Question, targetSubjectId: string, targetClassId: string) => {
    const existingIndex = questionBank.questions.findIndex(q => q.id === question.id);
    let updatedQuestions: Question[];

    const finalSub = targetSubjectId || selectedSubjectFilter || 'sbj-mat';
    const finalCls = targetClassId || (selectedClassFilter !== 'all' ? selectedClassFilter : 'cls-1');

    const preparedQ: Question = {
      ...question,
      subjectId: finalSub,
      classId: finalCls,
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
    const finalSub = targetSubjectId || selectedSubjectFilter || 'sbj-mat';
    const finalCls = targetClassId || (selectedClassFilter !== 'all' ? selectedClassFilter : 'cls-1');
    const startingNum = questionBank.questions.length + 1;

    const renumbered = imported.map((q, idx) => ({
      ...q,
      subjectId: finalSub,
      classId: finalCls,
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
    alert(`Berhasil mengimpor ${imported.length} butir soal ke mapel ini. Soal langsung aktif untuk ujian siswa.`);
  };

  // Save manual essay grade
  const handleSaveEssayScore = (session: StudentExamSession) => {
    const updatedScoreEssay = Number(essayGradingScore);
    const updatedFinalScore = Math.min(100, session.scorePg + updatedScoreEssay);
    const updatedSessions = sessions.map(s => {
      if (s.id === session.id) {
        return {
          ...s,
          scoreEssay: updatedScoreEssay,
          finalScore: updatedFinalScore,
          isPassed: updatedFinalScore >= 75
        };
      }
      return s;
    });
    onUpdateSessions(updatedSessions);
    alert(`Nilai uraian siswa ${session.studentName} berhasil disimpan. Nilai akhir: ${updatedFinalScore}`);
    setSelectedSessionForGrading(null);
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
            <div className="flex items-center gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-0.5">Mata Pelajaran:</label>
                <select
                  value={selectedSubjectFilter}
                  onChange={e => setSelectedSubjectFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white outline-none font-medium"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 block mb-0.5">Kelas:</label>
                <select
                  value={selectedClassFilter}
                  onChange={e => setSelectedClassFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white outline-none font-medium"
                >
                  <option value="all">Semua Rombel</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>Kelas {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                Impor CSV / Excel / Word
              </button>
              <button
                onClick={() => {
                  setEditingQuestion(null);
                  setShowEditorModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Input Soal Manual
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question List Column */}
          {(() => {
            const filteredGuruQuestions = questionBank.questions.filter(q => {
              const matchSubject = !selectedSubjectFilter || selectedSubjectFilter === 'all' || q.subjectId === selectedSubjectFilter || (!q.subjectId && selectedSubjectFilter === 'sbj-mat');
              const matchClass = !selectedClassFilter || selectedClassFilter === 'all' || q.classId === selectedClassFilter || (!q.classId);
              return matchSubject && matchClass;
            });

            return (
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Daftar Soal ({filteredGuruQuestions.length})
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Aktif di Ujian
                  </span>
                </div>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {filteredGuruQuestions.length === 0 ? (
                    <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center text-xs text-slate-500">
                      Belum ada soal untuk mata pelajaran ini. Klik "Input Soal Manual" untuk menambahkan.
                    </div>
                  ) : (
                    filteredGuruQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        onClick={() => setSelectedQuestion(q)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          selectedQuestion?.id === q.id
                            ? 'border-blue-500 bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">Soal #{idx + 1}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                            {q.type.replace('_', ' ')} · {q.points} Poin
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {q.prompt.replace(/\$\$[\s\S]+?\$\$/g, '[Rumus]').replace(/\$[^\$]+?\$/g, '[Rumus]')}
                        </p>
                      </div>
                    ))
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

      {/* TAB 3: KOREKSI URAIAN */}
      {activeTab === 'correction' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Penilaian & Koreksi Manual Soal Uraian
              </h3>
              <p className="text-xs text-slate-500">
                Periksa lembar jawaban uraian siswa, masukkan skor (maksimal 15), dan nilai akhir akan otomatis dikalkulasi ulang.
              </p>
            </div>
            <button
              onClick={handleOpenResetBatch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              Reset Hasil Ujian Kelas
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.filter(s => s.status === 'submitted' || s.status === 'force_submitted').map(s => (
              <div key={s.id} className="p-4 border border-slate-200 rounded-xl space-y-3 bg-slate-50/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{s.studentName}</h4>
                    <span className="text-xs text-slate-500">NIS {s.nis} · {s.className}</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    Skor Uraian: {s.scoreEssay}/15
                  </span>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1.5">
                  <span className="font-semibold text-slate-600 block">Jawaban Siswa (Soal Uraian #6):</span>
                  <p className="text-slate-800 italic whitespace-pre-wrap">
                    {typeof s.answers['q-6']?.answer === 'string' ? s.answers['q-6']?.answer : 'Belum diisi oleh siswa'}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedSessionForGrading(s)}
                    className="flex-1 py-1.5 px-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Beri Nilai & Feedback Uraian
                  </button>
                  <button
                    onClick={() => handleOpenResetSingle(s)}
                    className="py-1.5 px-2.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                    title="Reset ujian siswa ini"
                  >
                    <RotateCcw className="w-3 h-3 text-rose-600" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Manual Question Editor Modal for Guru */}
      {showEditorModal && (
        <QuestionEditorModal
          isOpen={true}
          onClose={() => {
            setShowEditorModal(false);
            setEditingQuestion(null);
          }}
          onSaveQuestion={handleSaveQuestion}
          subjects={subjects}
          classes={classes}
          initialQuestion={editingQuestion}
          initialSubjectId={selectedSubjectFilter}
          initialClassId={selectedClassFilter !== 'all' ? selectedClassFilter : undefined}
        />
      )}

      {/* Question Import Modal for Guru */}
      {showImportModal && (
        <QuestionImportModal
          isOpen={true}
          onClose={() => setShowImportModal(false)}
          onSaveQuestions={handleSaveImportedQuestions}
          subjects={subjects}
          classes={classes}
          initialSubjectId={selectedSubjectFilter}
          initialClassId={selectedClassFilter !== 'all' ? selectedClassFilter : undefined}
          isOperator={false}
        />
      )}

      {/* Manual Essay Grading Modal */}
      {selectedSessionForGrading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 border border-slate-200 shadow-xl space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">
              Koreksi Uraian: {selectedSessionForGrading.studentName}
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="font-semibold block text-slate-600 mb-1">Teks Jawaban Siswa:</span>
              <p className="italic text-slate-800 whitespace-pre-wrap">
                {selectedSessionForGrading.answers['q-6']?.answer as string || 'Tidak dijawab'}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Skor Uraian Diberikan (Maksimal 15)
                </label>
                <input
                  type="number"
                  min={0}
                  max={15}
                  value={essayGradingScore}
                  onChange={e => setEssayGradingScore(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-base"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Feedback Guru ke Siswa
                </label>
                <textarea
                  rows={2}
                  value={essayFeedback}
                  onChange={e => setEssayFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSessionForGrading(null)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveEssayScore(selectedSessionForGrading)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
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
