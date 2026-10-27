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
  Sparkles
} from 'lucide-react';
import { 
  Student, 
  ExamSchedule, 
  QuestionBank, 
  Question, 
  StudentExamSession, 
  ViolationType,
  SchoolSetting 
} from '../../types/cbt';
import { KatexRenderer } from '../common/KatexRenderer';

interface SiswaExamViewProps {
  student: Student;
  exam: ExamSchedule;
  questionBank: QuestionBank;
  session: StudentExamSession;
  onUpdateSession: (updatedSession: StudentExamSession) => void;
  onRecordViolation: (type: ViolationType, details: string) => void;
  schoolSetting: SchoolSetting;
  onExitExam: () => void;
}

export const SiswaExamView: React.FC<SiswaExamViewProps> = ({
  student,
  exam,
  questionBank,
  session,
  onUpdateSession,
  onRecordViolation,
  schoolSetting,
  onExitExam
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(session.status === 'in_progress');
  const [timeRemaining, setTimeRemaining] = useState(session.timeRemainingSeconds || 5400);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [violationAlert, setViolationAlert] = useState<{ show: boolean; msg: string; count: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const questions = questionBank.questions;
  const currentQ = questions[currentQuestionIndex];

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
    await enterFullscreen();
    setHasStarted(true);
    onUpdateSession({
      ...session,
      status: 'in_progress',
      startedAt: session.startedAt || new Date().toLocaleTimeString('id-ID'),
      isOnline: true
    });
  };

  // Timer countdown
  useEffect(() => {
    if (!hasStarted || session.status === 'submitted' || session.status === 'force_submitted' || session.isLocked) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit('Waktu ujian telah habis');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, session.status, session.isLocked]);

  // Anti-Cheat Event Listeners (Tab switch, Blur, ContextMenu, Shortcut blocking)
  useEffect(() => {
    if (!hasStarted || session.status !== 'in_progress' || session.isLocked) return;

    const handleViolation = (type: ViolationType, details: string) => {
      const newCount = session.violationsCount + 1;
      const isNowLocked = newCount >= schoolSetting.maxViolations;

      onRecordViolation(type, details);
      onUpdateSession({
        ...session,
        violationsCount: newCount,
        isLocked: isNowLocked,
        lockReason: isNowLocked ? `Mencapai batas ${schoolSetting.maxViolations}x pelanggaran (${details})` : undefined
      });

      setViolationAlert({
        show: true,
        msg: `Peringatan: Terdeteksi tindakan tidak diizinkan (${details}).`,
        count: newCount
      });
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
    window.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [hasStarted, session, schoolSetting.maxViolations]);

  // Answer handlers
  const handleSelectOption = (questionId: string, optionId: string) => {
    if (session.isLocked) return;
    const currentAnswerObj = session.answers[questionId] || { answer: '', isDoubtful: false, updatedAt: Date.now() };

    onUpdateSession({
      ...session,
      answers: {
        ...session.answers,
        [questionId]: {
          ...currentAnswerObj,
          answer: optionId,
          updatedAt: Date.now()
        }
      }
    });
    triggerSaveIndicator();
  };

  const handleToggleComplexOption = (questionId: string, optionId: string) => {
    if (session.isLocked) return;
    const currentAnswerObj = session.answers[questionId] || { answer: [], isDoubtful: false, updatedAt: Date.now() };
    const currentList = Array.isArray(currentAnswerObj.answer) ? [...currentAnswerObj.answer] : [];

    const exists = currentList.includes(optionId);
    const updatedList = exists 
      ? currentList.filter(id => id !== optionId)
      : [...currentList, optionId].sort();

    onUpdateSession({
      ...session,
      answers: {
        ...session.answers,
        [questionId]: {
          ...currentAnswerObj,
          answer: updatedList,
          updatedAt: Date.now()
        }
      }
    });
    triggerSaveIndicator();
  };

  const handleTextAnswerChange = (questionId: string, text: string) => {
    if (session.isLocked) return;
    const currentAnswerObj = session.answers[questionId] || { answer: '', isDoubtful: false, updatedAt: Date.now() };

    onUpdateSession({
      ...session,
      answers: {
        ...session.answers,
        [questionId]: {
          ...currentAnswerObj,
          answer: text,
          updatedAt: Date.now()
        }
      }
    });
    triggerSaveIndicator();
  };

  const handleToggleDoubtful = (questionId: string) => {
    const currentAnswerObj = session.answers[questionId] || { answer: '', isDoubtful: false, updatedAt: Date.now() };

    onUpdateSession({
      ...session,
      answers: {
        ...session.answers,
        [questionId]: {
          ...currentAnswerObj,
          isDoubtful: !currentAnswerObj.isDoubtful,
          updatedAt: Date.now()
        }
      }
    });
    triggerSaveIndicator();
  };

  const handleMatchingSelect = (questionId: string, pairId: string, rightVal: string) => {
    if (session.isLocked) return;
    const currentAnswerObj = session.answers[questionId] || { answer: '{}', isDoubtful: false, updatedAt: Date.now() };
    let currentMap: Record<string, string> = {};
    try {
      currentMap = typeof currentAnswerObj.answer === 'string' && currentAnswerObj.answer.startsWith('{')
        ? JSON.parse(currentAnswerObj.answer)
        : {};
    } catch {
      currentMap = {};
    }

    currentMap[pairId] = rightVal;

    onUpdateSession({
      ...session,
      answers: {
        ...session.answers,
        [questionId]: {
          ...currentAnswerObj,
          answer: JSON.stringify(currentMap),
          updatedAt: Date.now()
        }
      }
    });
    triggerSaveIndicator();
  };

  // Submission calculation
  const handleFinalSubmit = () => {
    // Grade automatic questions (PG, Kompleks, Benar/Salah, Isian, Mencocokkan)
    let scorePgTotal = 0;
    questions.forEach(q => {
      const studentAns = session.answers[q.id]?.answer;
      if (!studentAns) return;

      if (q.type === 'pg' && Array.isArray(q.correctAnswers)) {
        if (studentAns === q.correctAnswers[0]) scorePgTotal += q.points;
      } else if (q.type === 'benar_salah' && Array.isArray(q.correctAnswers)) {
        if (studentAns === q.correctAnswers[0]) scorePgTotal += q.points;
      } else if (q.type === 'isian' && q.correctAnswerText) {
        if (typeof studentAns === 'string' && studentAns.trim().toLowerCase() === q.correctAnswerText.trim().toLowerCase()) {
          scorePgTotal += q.points;
        }
      } else if (q.type === 'pg_kompleks' && Array.isArray(q.correctAnswers) && Array.isArray(studentAns)) {
        const sortedCorrect = [...q.correctAnswers].sort().join(',');
        const sortedStudent = [...studentAns].sort().join(',');
        if (sortedCorrect === sortedStudent) scorePgTotal += q.points;
      } else if (q.type === 'mencocokkan' && q.matchingPairs) {
        try {
          const map: Record<string, string> = typeof studentAns === 'string' && studentAns.startsWith('{')
            ? JSON.parse(studentAns)
            : {};
          let matches = 0;
          q.matchingPairs.forEach(p => {
            if (map[p.id] === p.rightText) matches++;
          });
          const earned = (matches / q.matchingPairs.length) * q.points;
          scorePgTotal += Math.round(earned);
        } catch {
          // ignore
        }
      }
    });

    const final = scorePgTotal + session.scoreEssay;
    onUpdateSession({
      ...session,
      status: 'submitted',
      submittedAt: new Date().toLocaleTimeString('id-ID'),
      timeRemainingSeconds: 0,
      scorePg: scorePgTotal,
      finalScore: final,
      isPassed: final >= exam.kkm
    });
    setShowSubmitConfirm(false);
  };

  const handleAutoSubmit = (reason: string) => {
    handleFinalSubmit();
    alert(`Ujian Anda otomatis dikumpulkan karena: ${reason}`);
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

        {/* Student Identity Card */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Nomor Induk Siswa (NIS):</span>
            <span className="font-mono font-bold text-slate-900">{student.nis}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Nama Lengkap:</span>
            <span className="font-semibold text-slate-900">{student.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Rombongan Belajar:</span>
            <span className="font-medium text-slate-900">{student.className}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Mata Pelajaran:</span>
            <span className="font-medium text-blue-700">{exam.subjectName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Durasi Pengerjaan:</span>
            <span className="font-medium text-slate-900">{exam.durationMinutes} Menit</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kriteria Ketuntasan (KKM):</span>
            <span className="font-mono font-bold text-slate-900">{exam.kkm}</span>
          </div>
        </div>

        {/* Anti-Cheat Regulations */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-900">
          <div className="flex items-center gap-2 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Tata Tertib & Mode Anti-Keluar Aplikasi:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-amber-800 text-[11px] leading-relaxed">
            <li>Ujian wajib dilaksanakan dalam mode <strong>Layar Penuh (Fullscreen)</strong>.</li>
            <li>Dilarang berpindah tab browser, membuka aplikasi lain, atau meminimalkan jendela.</li>
            <li>Klik kanan, copy, paste, dan pintasan keyboard (F12, Ctrl+C, dll.) dinonaktifkan.</li>
            <li>Pelanggaran maksimal <strong>{schoolSetting.maxViolations}x</strong>. Jika melampaui, ujian Anda otomatis terkunci dan harus dibuka oleh pengawas.</li>
          </ul>
        </div>

        <button
          onClick={handleStartExam}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Maximize className="w-4 h-4" />
          <span>Mulai Ujian Sekarang (Masuk Fullscreen)</span>
        </button>
      </div>
    );
  }

  // 2. If Locked out due to cheat violations
  if (session.isLocked) {
    return (
      <div className="max-w-lg mx-auto my-12 bg-white border-2 border-rose-500 rounded-2xl shadow-2xl p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Ujian Terkunci Otomatis</h2>
        <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-lg border border-rose-200">
          {session.lockReason || `Anda telah melakukan ${session.violationsCount} kali pelanggaran anti-curang.`}
        </p>
        <p className="text-xs text-slate-500">
          Lembar jawaban Anda telah dibekukan sementara. Segera laporkan kepada guru pengawas atau operator di ruang ujian untuk membuka kembali sesi ujian Anda.
        </p>
        <div className="pt-2">
          <button
            onClick={onExitExam}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // 3. If submitted
  if (session.status === 'submitted' || session.status === 'force_submitted') {
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
      className="space-y-4 select-none"
      onContextMenu={e => e.preventDefault()}
      onCopy={e => e.preventDefault()}
      onCut={e => e.preventDefault()}
      onPaste={e => e.preventDefault()}
    >
      {/* Violation Floating Notification */}
      {violationAlert && (
        <div className="fixed top-4 right-4 z-50 bg-rose-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-bounce border-2 border-white">
          <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
          <div>
            <div className="font-bold">{violationAlert.msg}</div>
            <div className="text-[11px] text-rose-100">
              Pelanggaran ke-{violationAlert.count} dari maks {schoolSetting.maxViolations}x
            </div>
          </div>
          <button 
            onClick={() => setViolationAlert(null)}
            className="ml-2 text-rose-200 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Exam Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-xs">
            <span className="text-slate-400 block">Peserta Ujian:</span>
            <span className="font-semibold text-slate-900">{student.name} ({student.className})</span>
          </div>
          <div className="hidden sm:block border-l border-slate-200 pl-3 text-xs">
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
              className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg"
              title="Layar Penuh"
            >
              <Maximize className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

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

          {/* Question Prompt with KaTeX */}
          <div className="text-slate-800 text-sm leading-relaxed p-4 bg-slate-50 rounded-xl border border-slate-200">
            <KatexRenderer content={currentQ.prompt} />
            {currentQ.imageUrl && (
              <img 
                src={currentQ.imageUrl} 
                alt="Gambar Soal" 
                className="max-h-60 object-contain rounded-lg border border-slate-200 mt-3" 
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
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl outline-none focus:border-blue-500 font-mono"
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
                  className="w-full p-4 text-xs border border-slate-300 rounded-xl outline-none focus:border-blue-500 leading-relaxed font-sans"
                />
              </div>
            )}
          </div>

          {/* Bottom Question Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitConfirm(true)}
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
              Nomor & Status Soal
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
                    onClick={() => setCurrentQuestionIndex(idx)}
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
              onClick={() => setShowSubmitConfirm(true)}
              className="w-full mt-2 py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              Kumpulkan Ujian Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Konfirmasi Pengumpulan</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin menyelesaikan dan mengumpulkan lembar jawaban ujian ini? Setelah dikumpulkan, Anda tidak dapat mengubah jawaban lagi.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Batal & Lanjut
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
              >
                Ya, Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
