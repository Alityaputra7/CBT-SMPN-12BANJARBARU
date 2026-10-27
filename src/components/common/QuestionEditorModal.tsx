import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Calculator, 
  Check, 
  Eye, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { Question, QuestionType, Subject, ClassRoom, MatchingPair } from '../../types/cbt';
import { KatexRenderer } from './KatexRenderer';

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

export const QuestionEditorModal: React.FC<QuestionEditorModalProps> = ({
  isOpen,
  onClose,
  onSaveQuestion,
  subjects,
  classes,
  initialQuestion,
  initialSubjectId,
  initialClassId
}) => {
  if (!isOpen) return null;

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || subjects[0]?.id || '');
  const [selectedClassId, setSelectedClassId] = useState<string>(initialClassId || classes[0]?.id || '');

  // Question fields
  const [qType, setQType] = useState<QuestionType>(initialQuestion?.type || 'pg');
  const [prompt, setPrompt] = useState<string>(initialQuestion?.prompt || 'Hitunglah nilai dari $$\\sqrt{144} + 3^2$$');
  const [imageUrl, setImageUrl] = useState<string>(initialQuestion?.imageUrl || '');
  const [points, setPoints] = useState<number>(initialQuestion?.points || 15);
  const [difficulty, setDifficulty] = useState<'mudah' | 'sedang' | 'sukar'>(initialQuestion?.difficulty || 'sedang');

  // PG / PG Kompleks options
  const [options, setOptions] = useState<{ id: string; text: string; imageUrl?: string }[]>(
    initialQuestion?.options?.length ? initialQuestion.options : [
      { id: 'A', text: '21' },
      { id: 'B', text: '18' },
      { id: 'C', text: '25' },
      { id: 'D', text: '30' }
    ]
  );
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(initialQuestion?.correctAnswers || ['A']);

  // Isian singkat
  const [correctAnswerText, setCorrectAnswerText] = useState<string>(initialQuestion?.correctAnswerText || '');

  // Essay Rubric
  const [essayRubric, setEssayRubric] = useState<string>(initialQuestion?.essayRubric || 'Rubrik penilaian: uraikan langkah pengerjaan lengkap.');

  // Matching Pairs (Mencocokkan)
  const [matchingPairs, setMatchingPairs] = useState<MatchingPair[]>(
    initialQuestion?.matchingPairs || [
      { id: 'p-1', leftText: '$$\\sqrt{64}$$', rightText: '8' },
      { id: 'p-2', leftText: '$$3^3$$', rightText: '27' },
      { id: 'p-3', leftText: '$$5 \\times 12$$', rightText: '60' },
      { id: 'p-4', leftText: '$$100 \\div 4$$', rightText: '25' }
    ]
  );

  const [showFormulaBar, setShowFormulaBar] = useState(true);

  // KaTeX Quick Inserts
  const insertFormula = (latex: string) => {
    setPrompt(prev => prev + ' ' + latex + ' ');
  };

  const handleAddMatchingPair = () => {
    const newId = `p-${matchingPairs.length + 1}`;
    setMatchingPairs([...matchingPairs, { id: newId, leftText: '', rightText: '' }]);
  };

  const handleRemoveMatchingPair = (id: string) => {
    if (matchingPairs.length <= 2) {
      alert('Soal mencocokkan minimal harus memiliki 2 pasang item.');
      return;
    }
    setMatchingPairs(matchingPairs.filter(p => p.id !== id));
  };

  const handleUpdateMatchingPair = (id: string, field: 'leftText' | 'rightText' | 'leftImageUrl' | 'rightImageUrl', value: string) => {
    setMatchingPairs(matchingPairs.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleToggleCorrectOption = (optId: string) => {
    if (qType === 'pg') {
      setCorrectAnswers([optId]);
    } else {
      // PG Kompleks
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
      alert('Teks pertanyaan tidak boleh kosong!');
      return;
    }

    const savedQ: Question = {
      id: initialQuestion?.id || `q-${Date.now()}`,
      bankId: initialQuestion?.bankId || 'bank-default',
      number: initialQuestion?.number || 1,
      type: qType,
      prompt,
      imageUrl: imageUrl.trim() || undefined,
      points: Number(points),
      difficulty,
      options: ['pg', 'pg_kompleks', 'benar_salah'].includes(qType) ? options : [],
      matchingPairs: qType === 'mencocokkan' ? matchingPairs : undefined,
      correctAnswers: ['pg', 'pg_kompleks', 'benar_salah'].includes(qType) ? correctAnswers : undefined,
      correctAnswerText: qType === 'isian' ? correctAnswerText : undefined,
      essayRubric: qType === 'uraian' ? essayRubric : undefined
    };

    onSaveQuestion(savedQ, selectedSubjectId, selectedClassId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {initialQuestion ? 'Edit Butir Soal' : 'Input Butir Soal Baru'}
            </h3>
            <p className="text-xs text-slate-500">
              Mendukung rumus matematika KaTeX, gambar, dan aneka tipe soal kurikulum.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tingkat / Kelas</label>
              <select
                value={selectedClassId}
                onChange={e => setSelectedClassId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>Kelas {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Type & Points */}
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
                    setOptions([
                      { id: 'A', text: 'Opsi A' },
                      { id: 'B', text: 'Opsi B' },
                      { id: 'C', text: 'Opsi C' },
                      { id: 'D', text: 'Opsi D' }
                    ]);
                    setCorrectAnswers(['A']);
                  }
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none font-medium text-blue-700"
              >
                <option value="pg">Pilihan Ganda (PG)</option>
                <option value="pg_kompleks">Pilihan Ganda Kompleks</option>
                <option value="uraian">Esay / Uraian</option>
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
                max={50}
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

          {/* KaTeX Math Toolbar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>Bilah Rumus Matematika (KaTeX):</span>
              </label>
              <span className="text-[11px] text-slate-400">Klik simbol untuk menyisipkan ke naskah</span>
            </div>

            <div className="flex flex-wrap gap-1 p-2 bg-slate-100 rounded-lg border border-slate-200">
              {[
                { label: '√x', latex: '$$\\sqrt{x}$$' },
                { label: 'a/b', latex: '$$\\frac{a}{b}$$' },
                { label: 'x²', latex: '$x^2$' },
                { label: 'x₁', latex: '$x_1$' },
                { label: '±', latex: '$\\pm$' },
                { label: '×', latex: '$\\times$' },
                { label: '÷', latex: '$\\div$' },
                { label: '≤', latex: '$\\le$' },
                { label: '≥', latex: '$\\ge$' },
                { label: 'π', latex: '$\\pi$' },
                { label: 'α', latex: '$\\alpha$' },
                { label: 'β', latex: '$\\beta$' },
                { label: '90°', latex: '$90^\\circ$' },
                { label: '∑', latex: '$$\\sum_{i=1}^{n}$$' }
              ].map((sym, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => insertFormula(sym.latex)}
                  className="px-2 py-1 bg-white hover:bg-blue-50 text-slate-800 rounded border border-slate-200 text-xs font-mono transition-colors"
                >
                  {sym.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Teks Pertanyaan
            </label>
            <textarea
              rows={4}
              required
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Ketik teks pertanyaan di sini... Gunakan $...$ untuk rumus sebaris atau $$...$$ untuk rumus blok."
              className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>

          {/* Optional Image URL */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
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
          {/* 1. PG / PG KOMPLEKS */}
          {['pg', 'pg_kompleks'].includes(qType) && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">
                  Pilihan Opsi Jawaban (Klik centang untuk kunci jawaban):
                </span>
                <span className="text-[11px] text-blue-600 font-medium">
                  {qType === 'pg' ? 'Pilih 1 kunci benar' : 'Bisa centang lebih dari 1 kunci'}
                </span>
              </div>

              <div className="space-y-2">
                {options.map((opt, idx) => {
                  const isChecked = correctAnswers.includes(opt.id);
                  return (
                    <div key={opt.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleCorrectOption(opt.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-mono text-xs border transition-colors ${
                          isChecked 
                            ? 'bg-emerald-600 text-white border-emerald-600' 
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Tandai sebagai kunci benar"
                      >
                        {opt.id}
                      </button>
                      <input
                        type="text"
                        required
                        value={opt.text}
                        onChange={e => {
                          const val = e.target.value;
                          setOptions(options.map(o => o.id === opt.id ? { ...o, text: val } : o));
                        }}
                        placeholder={`Teks pilihan ${opt.id}...`}
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg outline-none"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. MENCOCOKKAN (MATCHING) */}
          {qType === 'mencocokkan' && (
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">
                    Pasangan yang Harus Dijodohkan (Kiri ↔ Kanan):
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Siswa akan memilih pasangan yang sesuai dari kolom kiri ke kanan.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAddMatchingPair}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 font-medium"
                >
                  <Plus className="w-3 h-3" />
                  Tambah Pasangan
                </button>
              </div>

              <div className="space-y-2">
                {matchingPairs.map((pair, idx) => (
                  <div key={pair.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-mono text-slate-400 text-xs w-5">#{idx + 1}</span>
                    <input
                      type="text"
                      required
                      value={pair.leftText}
                      onChange={e => handleUpdateMatchingPair(pair.id, 'leftText', e.target.value)}
                      placeholder="Pernyataan / Soal Kiri (contoh: √64)"
                      className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none"
                    />
                    <span className="text-slate-400 font-bold">↔</span>
                    <input
                      type="text"
                      required
                      value={pair.rightText}
                      onChange={e => handleUpdateMatchingPair(pair.id, 'rightText', e.target.value)}
                      placeholder="Pasangan Kanan (contoh: 8)"
                      className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMatchingPair(pair.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ISIAN SINGKAT */}
          {qType === 'isian' && (
            <div className="pt-2 border-t border-slate-200 space-y-1">
              <label className="block font-semibold text-slate-700">
                Kunci Jawaban Teks / Angka (Case-insensitive):
              </label>
              <input
                type="text"
                required
                value={correctAnswerText}
                onChange={e => setCorrectAnswerText(e.target.value)}
                placeholder="Contoh: 150"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>
          )}

          {/* 4. ESAY / URAIAN */}
          {qType === 'uraian' && (
            <div className="pt-2 border-t border-slate-200 space-y-1">
              <label className="block font-semibold text-slate-700">
                Pedoman Penskoran / Rubrik Guru:
              </label>
              <textarea
                rows={3}
                value={essayRubric}
                onChange={e => setEssayRubric(e.target.value)}
                placeholder="Tuliskan petunjuk kriteria penskoran bagi guru pengoreksi..."
                className="w-full p-3 border border-slate-300 rounded-lg outline-none"
              />
            </div>
          )}

          {/* Live Preview Box */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Pratinjau Tampilan di Layar Siswa:</span>
            </span>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <KatexRenderer content={prompt} />
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt="Ilustrasi Soal" 
                  className="max-h-48 object-contain rounded-lg border border-slate-200 mt-2" 
                />
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Simpan Soal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
