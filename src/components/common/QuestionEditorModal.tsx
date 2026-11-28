import React, { useState, useRef } from 'react';
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Eye,
  CheckCircle2,
  Calculator
} from 'lucide-react';
import { Question, QuestionType, Subject, ClassRoom, MatchingPair, TrueFalseStatement } from '../../types/cbt';
import { MathTextRenderer, containsMathSyntax } from './MathTextRenderer';
import { MathFormulaToolbar } from './MathFormulaToolbar';
import { QUESTION_CLASS_GROUPS } from '../../utils/classGroups';

interface QuestionEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveQuestion: (question: Question, targetSubjectId: string, targetClassId: string) => void;
  subjects: Subject[];
  classes: ClassRoom[];
  initialQuestion?: Question | null;
  initialSubjectId?: string;
  initialClassId?: string;
}

type ActiveFieldTarget =
  | { kind: 'prompt' }
  | { kind: 'option'; id: string }
  | { kind: 'pair'; id: string; side: 'leftText' | 'rightText' }
  | { kind: 'isian' }
  | { kind: 'rubric' };

export const QuestionEditorModal: React.FC<QuestionEditorModalProps> = ({
  isOpen,
  onClose,
  onSaveQuestion,
  subjects,
  initialQuestion,
  initialSubjectId,
  initialClassId
}) => {
  if (!isOpen) return null;

  const normalizeClassId = (cId?: string) => {
    if (cId === 'cls-8a' || cId === 'cls-8b' || cId === 'cls-8') return 'cls-8';
    if (cId === 'cls-9') return 'cls-9';
    return cId || 'cls-1';
  };

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || initialQuestion?.subjectId || subjects[0]?.id || ''
  );
  const [selectedClassId, setSelectedClassId] = useState<string>(
    normalizeClassId(initialClassId || initialQuestion?.classId)
  );

  // Question fields
  const [qType, setQType] = useState<QuestionType>(initialQuestion?.type || 'pg');
  const [prompt, setPrompt] = useState<string>(
    initialQuestion?.prompt || 'Hitunglah nilai dari $$\\sqrt{144} + 3^{2}$$'
  );
  const [imageUrl, setImageUrl] = useState<string>(initialQuestion?.imageUrl || '');
  const [points, setPoints] = useState<number>(initialQuestion?.points || 15);
  const [difficulty, setDifficulty] = useState<'mudah' | 'sedang' | 'sukar'>(
    initialQuestion?.difficulty || 'sedang'
  );

  // PG / PG Kompleks options (supports A-E)
  const [options, setOptions] = useState<{ id: string; text: string; imageUrl?: string }[]>(
    initialQuestion?.options?.length
      ? initialQuestion.options
      : [
          { id: 'A', text: '$21$' },
          { id: 'B', text: '$18$' },
          { id: 'C', text: '$25$' },
          { id: 'D', text: '$30$' }
        ]
  );
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(
    initialQuestion?.correctAnswers || ['A']
  );

  // Isian singkat
  const [correctAnswerText, setCorrectAnswerText] = useState<string>(
    initialQuestion?.correctAnswerText || ''
  );

  // Essay Rubric / Pembahasan
  const [essayRubric, setEssayRubric] = useState<string>(
    initialQuestion?.essayRubric || 'Rubrik penilaian: uraikan langkah pengerjaan lengkap.'
  );

  // Matching Pairs (Mencocokkan)
  const [matchingPairs, setMatchingPairs] = useState<MatchingPair[]>(
    initialQuestion?.matchingPairs || [
      { id: 'p-1', leftText: '$\\sqrt{64}$', rightText: '$8$' },
      { id: 'p-2', leftText: '$3^{3}$', rightText: '$27$' },
      { id: 'p-3', leftText: '$5 \\times 12$', rightText: '$60$' },
      { id: 'p-4', leftText: '$100 \\div 4$', rightText: '$25$' }
    ]
  );

  // Multi-statement True/False rows (optional)
  const [statements, setStatements] = useState<TrueFalseStatement[]>(
    initialQuestion?.statements || []
  );

  // Track currently focused field & DOM refs for cursor-accurate LaTeX insertion
  const [activeField, setActiveField] = useState<ActiveFieldTarget>({ kind: 'prompt' });
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const getFieldKey = (target: ActiveFieldTarget): string => {
    if (target.kind === 'prompt') return 'prompt';
    if (target.kind === 'option') return `option:${target.id}`;
    if (target.kind === 'pair') return `pair:${target.id}:${target.side}`;
    if (target.kind === 'isian') return 'isian';
    return 'rubric';
  };

  const getActiveTargetLabel = (): string => {
    if (activeField.kind === 'prompt') return 'Teks Pertanyaan';
    if (activeField.kind === 'option') return `Opsi Jawaban ${activeField.id}`;
    if (activeField.kind === 'pair') {
      const idx = matchingPairs.findIndex(p => p.id === activeField.id);
      return `Pasangan #${idx >= 0 ? idx + 1 : ''} (${activeField.side === 'leftText' ? 'Kiri' : 'Kanan'})`;
    }
    if (activeField.kind === 'isian') return 'Kunci Isian Singkat';
    return 'Rubrik / Pembahasan';
  };

  // Cursor-aware formula insertion into ANY active input/textarea (Prompt, Options A-E, Pairs, Isian, Rubric)
  const insertFormulaAtCursor = (latex: string) => {
    const key = getFieldKey(activeField);
    const el = fieldRefs.current[key];

    const spliceAtSelection = (currentVal: string): { nextVal: string; nextCursor: number } => {
      if (el && typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const before = currentVal.slice(0, start);
        const after = currentVal.slice(end);
        const padLeft = before.length > 0 && !/\s$/.test(before) ? ' ' : '';
        const padRight = after.length > 0 && !/^\s/.test(after) ? ' ' : '';
        const inserted = `${padLeft}${latex}${padRight}`;
        return {
          nextVal: before + inserted + after,
          nextCursor: start + inserted.length
        };
      }
      const sep = currentVal.length > 0 && !/\s$/.test(currentVal) ? ' ' : '';
      const nextVal = currentVal + sep + latex;
      return { nextVal, nextCursor: nextVal.length };
    };

    let targetCursor = 0;

    if (activeField.kind === 'prompt') {
      setPrompt(prev => {
        const res = spliceAtSelection(prev);
        targetCursor = res.nextCursor;
        return res.nextVal;
      });
    } else if (activeField.kind === 'option') {
      setOptions(prev =>
        prev.map(o => {
          if (o.id !== activeField.id) return o;
          const res = spliceAtSelection(o.text);
          targetCursor = res.nextCursor;
          return { ...o, text: res.nextVal };
        })
      );
    } else if (activeField.kind === 'pair') {
      setMatchingPairs(prev =>
        prev.map(p => {
          if (p.id !== activeField.id) return p;
          const cur = p[activeField.side] || '';
          const res = spliceAtSelection(cur);
          targetCursor = res.nextCursor;
          return { ...p, [activeField.side]: res.nextVal };
        })
      );
    } else if (activeField.kind === 'isian') {
      setCorrectAnswerText(prev => {
        const res = spliceAtSelection(prev);
        targetCursor = res.nextCursor;
        return res.nextVal;
      });
    } else if (activeField.kind === 'rubric') {
      setEssayRubric(prev => {
        const res = spliceAtSelection(prev);
        targetCursor = res.nextCursor;
        return res.nextVal;
      });
    }

    requestAnimationFrame(() => {
      const refEl = fieldRefs.current[key];
      if (refEl) {
        refEl.focus();
        try {
          refEl.setSelectionRange(targetCursor, targetCursor);
        } catch {
          // ignore on unsupported inputs
        }
      }
    });
  };

  const handleAddOptionE = () => {
    if (options.length >= 5) return;
    const nextLetters = ['A', 'B', 'C', 'D', 'E'];
    const nextLetter = nextLetters.find(l => !options.some(o => o.id === l));
    if (!nextLetter) return;
    setOptions([...options, { id: nextLetter, text: '' }]);
  };

  const handleRemoveOption = (optId: string) => {
    if (options.length <= 2) return;
    const nextOpts = options.filter(o => o.id !== optId);
    setOptions(nextOpts);
    if (correctAnswers.includes(optId)) {
      const remaining = correctAnswers.filter(id => id !== optId);
      setCorrectAnswers(remaining.length > 0 ? remaining : [nextOpts[0].id]);
    }
  };

  const handleAddMatchingPair = () => {
    const newId = `p-${Date.now()}`;
    setMatchingPairs([...matchingPairs, { id: newId, leftText: '', rightText: '' }]);
  };

  const handleRemoveMatchingPair = (id: string) => {
    if (matchingPairs.length <= 2) {
      return;
    }
    setMatchingPairs(matchingPairs.filter(p => p.id !== id));
  };

  const handleUpdateMatchingPair = (
    id: string,
    field: 'leftText' | 'rightText' | 'leftImageUrl' | 'rightImageUrl',
    value: string
  ) => {
    setMatchingPairs(matchingPairs.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleToggleCorrectOption = (optId: string) => {
    if (qType === 'pg') {
      setCorrectAnswers([optId]);
    } else {
      if (correctAnswers.includes(optId)) {
        if (correctAnswers.length > 1) {
          setCorrectAnswers(correctAnswers.filter(id => id !== optId));
        }
      } else {
        setCorrectAnswers([...correctAnswers, optId].sort());
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    const gradeVal =
      selectedClassId === 'cls-8' ? 'VIII' : selectedClassId === 'cls-9' ? 'IX' : 'VII';

    // Preserve literal backslashes & dollar signs cleanly without escaping/trimming math tokens
    const savedQ: Question = {
      id: initialQuestion?.id || `q-${Date.now()}`,
      bankId: initialQuestion?.bankId || 'bank-default',
      number: initialQuestion?.number || 1,
      type: qType,
      prompt,
      imageUrl: imageUrl.trim() || undefined,
      points: Number(points),
      difficulty,
      subjectId: selectedSubjectId,
      classId: selectedClassId,
      grade: gradeVal,
      options:
        ['pg', 'pg_kompleks'].includes(qType) || (qType === 'benar_salah' && statements.length === 0)
          ? options
          : [],
      matchingPairs: qType === 'mencocokkan' ? matchingPairs : undefined,
      matchingRightOptions:
        qType === 'mencocokkan' ? initialQuestion?.matchingRightOptions : undefined,
      statements: qType === 'benar_salah' && statements.length > 0 ? statements : undefined,
      correctAnswers:
        ['pg', 'pg_kompleks'].includes(qType) || (qType === 'benar_salah' && statements.length === 0)
          ? correctAnswers
          : undefined,
      correctAnswerText: qType === 'isian' ? correctAnswerText : undefined,
      essayRubric: qType === 'uraian' ? essayRubric : undefined
    };

    onSaveQuestion(savedQ, selectedSubjectId, selectedClassId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-5 my-4 sm:my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {initialQuestion ? 'Edit Butir Soal' : 'Input Butir Soal Baru'}
            </h3>
            <p className="text-xs text-slate-500">
              Mendukung rumus &amp; notasi matematika KaTeX lengkap di soal, opsi A–E, pasangan, dan rubrik pembahasan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Target Subject & Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran</label>
              <select
                value={selectedSubjectId}
                onChange={e => setSelectedSubjectId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none font-medium"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tingkat / Kelas Sasaran</label>
              <select
                value={selectedClassId}
                onChange={e => setSelectedClassId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none font-medium text-blue-700"
              >
                {QUESTION_CLASS_GROUPS.map(cg => (
                  <option key={cg.id} value={cg.id}>
                    {cg.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                * Kelas VIII-A &amp; VIII-B digabung: cukup input 1 kali untuk kedua rombel.
              </p>
            </div>
          </div>

          {/* Type, Points & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tipe Soal</label>
              <select
                value={qType}
                onChange={e => {
                  const val = e.target.value as QuestionType;
                  setQType(val);
                  if (val === 'benar_salah') {
                    setOptions([
                      { id: 'BENAR', text: 'BENAR' },
                      { id: 'SALAH', text: 'SALAH' }
                    ]);
                    setCorrectAnswers(['BENAR']);
                  } else if (val === 'pg' || val === 'pg_kompleks') {
                    if (options.length < 2 || options[0]?.id === 'BENAR') {
                      setOptions([
                        { id: 'A', text: '' },
                        { id: 'B', text: '' },
                        { id: 'C', text: '' },
                        { id: 'D', text: '' }
                      ]);
                      setCorrectAnswers(['A']);
                    }
                  }
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none font-medium text-blue-700"
              >
                <option value="pg">Pilihan Ganda (PG)</option>
                <option value="pg_kompleks">Pilihan Ganda Kompleks</option>
                <option value="uraian">Esai / Uraian</option>
                <option value="mencocokkan">Mencocokkan (Menjodohkan)</option>
                <option value="benar_salah">Benar / Salah</option>
                <option value="isian">Isian Singkat</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bobot Nilai</label>
              <input
                type="number"
                min={1}
                max={100}
                value={points}
                onChange={e => setPoints(parseInt(e.target.value) || 10)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tingkat Kesukaran</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as 'mudah' | 'sedang' | 'sukar')}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none"
              >
                <option value="mudah">Mudah</option>
                <option value="sedang">Sedang</option>
                <option value="sukar">Sukar</option>
              </select>
            </div>
          </div>

          {/* Sticky Math Formula Toolbar (One-Click LaTeX Insertion into Active Input) */}
          <div className="sticky top-0 z-10 bg-white pt-1 pb-1">
            <MathFormulaToolbar
              onInsert={insertFormulaAtCursor}
              activeTargetLabel={getActiveTargetLabel()}
            />
          </div>

          {/* Question Prompt + Instant Live Math Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Teks Pertanyaan</label>
              {activeField.kind === 'prompt' && (
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Kolom Aktif untuk Sisip Rumus
                </span>
              )}
            </div>
            <textarea
              ref={el => {
                fieldRefs.current['prompt'] = el;
              }}
              rows={4}
              required
              value={prompt}
              onFocus={() => setActiveField({ kind: 'prompt' })}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Ketik teks pertanyaan di sini... Contoh: Tentukan hasil dari $\frac{3}{4} + \sqrt{25}$ atau gunakan tombol rumus di atas."
              className={`w-full p-3 font-mono text-xs border rounded-xl outline-none leading-relaxed transition-colors ${
                activeField.kind === 'prompt'
                  ? 'border-blue-500 ring-2 ring-blue-100'
                  : 'border-slate-300 focus:border-blue-500'
              }`}
            />

            {/* Instant Live Preview Right Under Prompt */}
            {prompt.trim() && (
              <div className="p-3 bg-blue-50/50 border border-blue-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Live Preview Rumus Pertanyaan:</span>
                </span>
                <div className="text-slate-900 text-sm leading-relaxed bg-white p-2.5 rounded-lg border border-blue-100">
                  <MathTextRenderer content={prompt} />
                </div>
              </div>
            )}
          </div>

          {/* Optional Image URL */}
          <div>
            <label className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>URL Gambar Soal (Opsional):</span>
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="Contoh: https://example.com/diagram_geometri.png"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono text-xs"
            />
          </div>

          {/* TYPE-SPECIFIC EDITORS */}
          {/* 1. PG / PG KOMPLEKS (Supports A-E + Per-Option Math Target & Live Preview) */}
          {['pg', 'pg_kompleks'].includes(qType) && (
            <div className="space-y-2.5 pt-2 border-t border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold text-slate-700 block">
                    Pilihan Opsi Jawaban A–E (Klik huruf untuk kunci jawaban · Klik kolom untuk sisip rumus):
                  </span>
                  <span className="text-[11px] text-blue-600 font-medium">
                    {qType === 'pg' ? 'Pilih 1 kunci benar' : 'Bisa centang lebih dari 1 kunci'}
                  </span>
                </div>
                {options.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddOptionE}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 font-semibold text-[11px] cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Opsi E</span>
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                {options.map(opt => {
                  const isChecked = correctAnswers.includes(opt.id);
                  const isFocusedOpt = activeField.kind === 'option' && activeField.id === opt.id;
                  const hasMath = containsMathSyntax(opt.text);

                  return (
                    <div key={opt.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleCorrectOption(opt.id)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-mono text-xs border transition-colors cursor-pointer shrink-0 ${
                            isChecked
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Tandai sebagai kunci benar"
                        >
                          {opt.id}
                        </button>
                        <input
                          ref={el => {
                            fieldRefs.current[`option:${opt.id}`] = el;
                          }}
                          type="text"
                          required
                          value={opt.text}
                          onFocus={() => setActiveField({ kind: 'option', id: opt.id })}
                          onChange={e => {
                            const val = e.target.value;
                            setOptions(
                              options.map(o => (o.id === opt.id ? { ...o, text: val } : o))
                            );
                          }}
                          placeholder={`Teks / rumus pilihan ${opt.id}... (contoh: $\\frac{1}{2}$)`}
                          className={`flex-1 px-3 py-1.5 font-mono text-xs border rounded-lg outline-none transition-colors ${
                            isFocusedOpt
                              ? 'border-blue-500 ring-2 ring-blue-100'
                              : 'border-slate-300 focus:border-blue-500'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setActiveField({ kind: 'option', id: opt.id });
                            fieldRefs.current[`option:${opt.id}`]?.focus();
                          }}
                          title={`Pilih Opsi ${opt.id} sebagai target sisip rumus`}
                          className={`px-2 py-1.5 rounded-lg border text-[11px] font-semibold flex items-center gap-1 cursor-pointer shrink-0 transition-colors ${
                            isFocusedOpt
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-700'
                          }`}
                        >
                          <Calculator className="w-3 h-3" />
                          <span className="hidden sm:inline">fx</span>
                        </button>
                        {options.length > 4 && opt.id === 'E' && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(opt.id)}
                            title="Hapus Opsi E"
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {hasMath && (
                        <div className="ml-9 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 text-xs text-slate-800">
                          <span className="text-[10px] font-bold text-blue-600 uppercase shrink-0">
                            Preview {opt.id}:
                          </span>
                          <div className="min-w-0 flex-1 overflow-x-auto">
                            <MathTextRenderer content={opt.text} inline />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 1B. MULTI-STATEMENT BENAR / SALAH */}
          {qType === 'benar_salah' && statements.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">
                  Daftar Pernyataan Benar / Salah ({statements.length} Butir):
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setStatements(prev => [
                      ...prev,
                      { id: `s${prev.length + 1}`, text: '', correctAnswer: 'BENAR' }
                    ])
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 font-medium cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  Tambah Pernyataan
                </button>
              </div>
              <div className="space-y-2">
                {statements.map((st, sIdx) => (
                  <div
                    key={st.id}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-white border border-slate-200 font-mono font-bold text-slate-600 flex items-center justify-center shrink-0">
                        {String.fromCharCode(97 + sIdx)}
                      </span>
                      <input
                        type="text"
                        value={st.text}
                        onChange={e =>
                          setStatements(prev =>
                            prev.map(row =>
                              row.id === st.id ? { ...row, text: e.target.value } : row
                            )
                          )
                        }
                        placeholder="Teks pernyataan (mendukung rumus LaTeX $...$)..."
                        className="flex-1 px-2.5 py-1.5 font-mono text-xs border border-slate-300 rounded bg-white outline-none focus:border-blue-500"
                      />
                      <div className="flex items-center gap-1 shrink-0">
                        {(['BENAR', 'SALAH'] as const).map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() =>
                              setStatements(prev =>
                                prev.map(row =>
                                  row.id === st.id ? { ...row, correctAnswer: val } : row
                                )
                              )
                            }
                            className={`px-2 py-1 rounded text-[11px] font-bold border cursor-pointer ${
                              st.correctAnswer === val
                                ? val === 'BENAR'
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-rose-600 text-white border-rose-600'
                                : 'bg-white text-slate-600 border-slate-300'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                      {statements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setStatements(prev => prev.filter(row => row.id !== st.id))}
                          className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {containsMathSyntax(st.text) && (
                      <div className="ml-8 px-2 py-1 bg-white border border-slate-200 rounded text-xs overflow-x-auto">
                        <MathTextRenderer content={st.text} inline />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. MENCOCOKKAN (MATCHING) */}
          {qType === 'mencocokkan' && (
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">
                    Pasangan yang Harus Dijodohkan (Kiri ↔ Kanan · Mendukung Rumus KaTeX):
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Klik salah satu kolom lalu klik tombol rumus di toolbar untuk menyisipkan LaTeX.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddMatchingPair}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 font-medium cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  Tambah Pasangan
                </button>
              </div>

              <div className="space-y-2">
                {matchingPairs.map((pair, idx) => (
                  <div
                    key={pair.id}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400 text-xs w-5 shrink-0">
                        #{idx + 1}
                      </span>
                      <input
                        ref={el => {
                          fieldRefs.current[`pair:${pair.id}:leftText`] = el;
                        }}
                        type="text"
                        required
                        value={pair.leftText}
                        onFocus={() =>
                          setActiveField({ kind: 'pair', id: pair.id, side: 'leftText' })
                        }
                        onChange={e =>
                          handleUpdateMatchingPair(pair.id, 'leftText', e.target.value)
                        }
                        placeholder="Soal Kiri (contoh: $\sqrt{64}$)"
                        className="flex-1 px-3 py-1.5 font-mono text-xs border border-slate-300 rounded-lg bg-white outline-none focus:border-blue-500"
                      />
                      <span className="text-slate-400 font-bold shrink-0">↔</span>
                      <input
                        ref={el => {
                          fieldRefs.current[`pair:${pair.id}:rightText`] = el;
                        }}
                        type="text"
                        required
                        value={pair.rightText}
                        onFocus={() =>
                          setActiveField({ kind: 'pair', id: pair.id, side: 'rightText' })
                        }
                        onChange={e =>
                          handleUpdateMatchingPair(pair.id, 'rightText', e.target.value)
                        }
                        placeholder="Pasangan Kanan (contoh: $8$)"
                        className="flex-1 px-3 py-1.5 font-mono text-xs border border-slate-300 rounded-lg bg-white outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        disabled={matchingPairs.length <= 2}
                        onClick={() => handleRemoveMatchingPair(pair.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-40 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {(containsMathSyntax(pair.leftText) || containsMathSyntax(pair.rightText)) && (
                      <div className="ml-7 px-2.5 py-1 bg-white border border-slate-200 rounded flex items-center justify-between gap-2 text-xs">
                        <MathTextRenderer content={pair.leftText} inline />
                        <span className="text-slate-400 font-bold">↔</span>
                        <MathTextRenderer content={pair.rightText} inline className="text-blue-700 font-semibold" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ISIAN SINGKAT */}
          {qType === 'isian' && (
            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <label className="block font-semibold text-slate-700">
                Kunci Jawaban Teks / Angka / Rumus (Case-insensitive):
              </label>
              <input
                ref={el => {
                  fieldRefs.current['isian'] = el;
                }}
                type="text"
                required
                value={correctAnswerText}
                onFocus={() => setActiveField({ kind: 'isian' })}
                onChange={e => setCorrectAnswerText(e.target.value)}
                placeholder="Contoh: 150 atau $\frac{3}{4}$"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono focus:border-blue-500"
              />
              {containsMathSyntax(correctAnswerText) && (
                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-xs">
                  <span className="text-[10px] font-bold text-blue-700 uppercase">Preview Kunci:</span>
                  <MathTextRenderer content={correctAnswerText} inline />
                </div>
              )}
            </div>
          )}

          {/* 4. ESAI / URAIAN */}
          {qType === 'uraian' && (
            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <label className="block font-semibold text-slate-700">
                Pedoman Penskoran / Pembahasan / Rubrik Guru (Mendukung Rumus KaTeX):
              </label>
              <textarea
                ref={el => {
                  fieldRefs.current['rubric'] = el;
                }}
                rows={3}
                value={essayRubric}
                onFocus={() => setActiveField({ kind: 'rubric' })}
                onChange={e => setEssayRubric(e.target.value)}
                placeholder="Tuliskan langkah pembahasan atau kriteria penskoran (boleh menggunakan $...$ atau $$...$$)..."
                className="w-full p-3 font-mono text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-500"
              />
              {containsMathSyntax(essayRubric) && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg space-y-1 text-xs text-amber-950">
                  <span className="text-[10px] font-bold text-amber-700 uppercase block">
                    Preview Pembahasan / Rubrik:
                  </span>
                  <MathTextRenderer content={essayRubric} />
                </div>
              )}
            </div>
          )}

          {/* Full Student-View Live Preview Card */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Pratinjau Lengkap Tampilan di Layar Siswa:</span>
            </span>
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-3">
              {imageUrl && (
                <div className="flex justify-center">
                  <img
                    src={imageUrl}
                    alt="Ilustrasi Soal"
                    className="object-contain max-h-72 w-auto max-w-full mx-auto rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              )}

              <div className="text-sm text-slate-900 leading-relaxed">
                <MathTextRenderer content={prompt} />
              </div>

              {qType === 'benar_salah' && statements.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {statements.map((st, sIdx) => (
                    <div
                      key={st.id}
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="font-mono font-bold text-slate-500 shrink-0">
                          {String.fromCharCode(97 + sIdx)}.
                        </span>
                        <div className="min-w-0 flex-1 overflow-x-auto">
                          <MathTextRenderer content={st.text || '(Kosong)'} inline />
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                          st.correctAnswer === 'BENAR'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {st.correctAnswer}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {(['pg', 'pg_kompleks'].includes(qType) || (qType === 'benar_salah' && statements.length === 0)) && options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {options.map(opt => {
                    const isCorrect = correctAnswers.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-lg border flex items-start justify-between gap-2 text-xs ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-2 min-w-0 flex-1">
                          <span
                            className={`w-6 h-6 rounded-md font-mono font-bold flex items-center justify-center shrink-0 ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <div className="min-w-0 flex-1 overflow-x-auto space-y-1.5">
                            {opt.imageUrl && (
                              <img
                                src={opt.imageUrl}
                                alt={`Gambar Opsi ${opt.id}`}
                                className="object-contain max-h-32 w-auto max-w-full rounded border border-slate-200 bg-white"
                              />
                            )}
                            <MathTextRenderer content={opt.text || `(Kosong)`} inline />
                          </div>
                        </div>
                        {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              )}

              {qType === 'mencocokkan' && matchingPairs.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {matchingPairs.map((pair, idx) => (
                    <div
                      key={pair.id}
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="font-mono text-slate-400 text-[10px]">#{idx + 1}</span>
                      <div className="min-w-0 flex-1 overflow-x-auto">
                        <MathTextRenderer content={pair.leftText} inline />
                      </div>
                      <span className="text-slate-400 font-bold">↔</span>
                      <div className="min-w-0 flex-1 overflow-x-auto text-right text-blue-700 font-semibold">
                        <MathTextRenderer content={pair.rightText} inline />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {qType === 'isian' && correctAnswerText && (
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center gap-2">
                  <span className="font-bold">Kunci:</span>
                  <MathTextRenderer content={correctAnswerText} inline />
                </div>
              )}

              {qType === 'uraian' && essayRubric && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 space-y-1">
                  <span className="font-bold block">Rubrik / Pembahasan:</span>
                  <MathTextRenderer content={essayRubric} />
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Simpan Soal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
