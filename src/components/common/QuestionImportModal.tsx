import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  HelpCircle,
  Eye,
  Plus
} from 'lucide-react';
import { Question, QuestionType, Subject, ClassRoom } from '../../types/cbt';
import { KatexRenderer } from './KatexRenderer';
import { QUESTION_CLASS_GROUPS } from '../../utils/classGroups';

interface QuestionImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveQuestions: (newQuestions: Question[], targetSubjectId: string, targetClassId: string) => void;
  subjects: Subject[];
  classes: ClassRoom[];
  initialSubjectId?: string;
  initialClassId?: string;
  isOperator?: boolean;
}

export const QuestionImportModal: React.FC<QuestionImportModalProps> = ({
  isOpen,
  onClose,
  onSaveQuestions,
  subjects,
  classes,
  initialSubjectId,
  initialClassId,
  isOperator = false
}) => {
  const normalizeClassId = (cId?: string) => {
    if (cId === 'cls-8a' || cId === 'cls-8b' || cId === 'cls-8') return 'cls-8';
    if (cId === 'cls-9') return 'cls-9';
    return cId || 'cls-1';
  };

  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'excel' | 'word'>('csv');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || subjects[0]?.id || '');
  const [selectedClassId, setSelectedClassId] = useState<string>(normalizeClassId(initialClassId));
  const [rawInputText, setRawInputText] = useState<string>('');
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);
  const [parsingErrors, setParsingErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  // Sample templates for download
  const sampleCsvContent = `TIPE,SOAL,OPSI_A,OPSI_B,OPSI_C,OPSI_D,KUNCI,BOBOT
pg,"Hitunglah nilai dari $$\\sqrt{169} + 4^2$$",25,29,32,36,B,15
pg_kompleks,"Pilih sifat-sifat bangun datar belah ketupat yang BENAR:","Semua sisi sama panjang","Kedua diagonal saling tegak lurus","Keempat sudutnya siku-siku","Memiliki dua simetri lipat","A,B,D",20
uraian,"Jelaskan langkah-langkah membagi pecahan $$\\frac{3}{4} \\div \\frac{2}{5}$$!","","","","","Kunci: Kalikan dengan kebalikan pecahan kedua: 3/4 x 5/2 = 15/8 = 1 7/8",15
mencocokkan,"Jodohkan operasi berikut dengan hasilnya! [PAIRS: 2^3=8 | sqrt{64}=8 | 5x4=20 | 100/5=20]","","","","","2^3=8|sqrt{64}=8|5x4=20|100/5=20",20`;

  const sampleWordContent = `=== FORMAT IMPORT DOKUMEN WORD (.DOCX) ===
Gunakan format blok atau tabel seperti contoh berikut:

[SOAL_1]
Tipe: pg
Soal: Bentuk sederhana dari $2(3x - 5) + 4x$ adalah...
A: $10x - 10$
B: $10x - 5$
C: $7x - 10$
D: $6x - 1$
Kunci: A
Bobot: 15

[SOAL_2]
Tipe: mencocokkan
Soal: Pasangkan bilangan Romawi berikut dengan angka desimalnya:
Pasangan: X = 10 | L = 50 | C = 100 | M = 1000
Bobot: 20

[SOAL_3]
Tipe: uraian
Soal: Tentukan himpunan penyelesaian dari persamaan linear satu variabel $3x + 12 = 27$!
Rubrik: Skor 5 untuk pindah ruas $3x=15$, skor 10 untuk $x=5$.
Bobot: 15`;

  const handleDownloadTemplate = () => {
    let content = sampleCsvContent;
    let filename = 'template_soal_cbt_smpn12.csv';
    let mime = 'text/csv;charset=utf-8;';

    if (selectedFormat === 'word') {
      content = sampleWordContent;
      filename = 'template_soal_cbt_word.txt';
      mime = 'text/plain;charset=utf-8;';
    } else if (selectedFormat === 'excel') {
      filename = 'template_soal_cbt_excel.csv';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    if (selectedFormat === 'word') {
      setRawInputText(sampleWordContent);
    } else {
      setRawInputText(sampleCsvContent);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawInputText(content);
      }
    };
    reader.readAsText(file);
  };

  // Parsing logic
  const parseQuestions = () => {
    const errors: string[] = [];
    const questions: Question[] = [];

    if (!rawInputText.trim()) {
      setParsingErrors(['Teks/file input masih kosong! Silakan tempel teks atau muat template contoh.']);
      return;
    }

    if (selectedFormat === 'word') {
      // Parse block-based Word document format
      const blocks = rawInputText.split(/\[SOAL_\d+\]/i).filter(b => b.trim());
      blocks.forEach((block, idx) => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        let qType: QuestionType = 'pg';
        let prompt = '';
        let optA = '', optB = '', optC = '', optD = '';
        let key = '';
        let points = 10;
        let rubric = '';
        let matchingPairs: { id: string; leftText: string; rightText: string }[] = [];

        lines.forEach(line => {
          if (/^tipe:\s*(.+)$/i.test(line)) {
            const rawType = line.match(/^tipe:\s*(.+)$/i)![1].toLowerCase();
            if (['pg', 'pg_kompleks', 'esay', 'uraian', 'mencocokkan', 'benar_salah', 'isian'].includes(rawType)) {
              qType = (rawType === 'esay' ? 'uraian' : rawType) as QuestionType;
            }
          } else if (/^soal:\s*(.+)$/i.test(line)) {
            prompt = line.match(/^soal:\s*(.+)$/i)![1];
          } else if (/^A:\s*(.+)$/i.test(line)) {
            optA = line.match(/^A:\s*(.+)$/i)![1];
          } else if (/^B:\s*(.+)$/i.test(line)) {
            optB = line.match(/^B:\s*(.+)$/i)![1];
          } else if (/^C:\s*(.+)$/i.test(line)) {
            optC = line.match(/^C:\s*(.+)$/i)![1];
          } else if (/^D:\s*(.+)$/i.test(line)) {
            optD = line.match(/^D:\s*(.+)$/i)![1];
          } else if (/^kunci:\s*(.+)$/i.test(line)) {
            key = line.match(/^kunci:\s*(.+)$/i)![1];
          } else if (/^bobot:\s*(\d+)$/i.test(line)) {
            points = parseInt(line.match(/^bobot:\s*(\d+)$/i)![1]) || 10;
          } else if (/^rubrik:\s*(.+)$/i.test(line)) {
            rubric = line.match(/^rubrik:\s*(.+)$/i)![1];
          } else if (/^pasangan:\s*(.+)$/i.test(line)) {
            const pairStr = line.match(/^pasangan:\s*(.+)$/i)![1];
            matchingPairs = pairStr.split('|').map((pair, pIdx) => {
              const [left, right] = pair.split('=').map(s => s.trim());
              return { id: `p-${pIdx + 1}`, leftText: left || '', rightText: right || '' };
            }).filter(p => p.leftText && p.rightText);
          }
        });

        if (!prompt) {
          errors.push(`Blok ${idx + 1}: Teks soal tidak ditemukan.`);
          return;
        }

        const gradeVal = selectedClassId === 'cls-8' ? 'VIII' : (selectedClassId === 'cls-9' ? 'IX' : 'VII');

        const newQ: Question = {
          id: `imp-${Date.now()}-${idx}`,
          bankId: `qbank-${selectedSubjectId}`,
          subjectId: selectedSubjectId,
          classId: selectedClassId,
          grade: gradeVal,
          number: idx + 1,
          type: qType,
          prompt,
          points,
          options: (qType as string) === 'pg' || (qType as string) === 'pg_kompleks' ? [
            { id: 'A', text: optA || 'Opsi A' },
            { id: 'B', text: optB || 'Opsi B' },
            { id: 'C', text: optC || 'Opsi C' },
            { id: 'D', text: optD || 'Opsi D' },
          ] : [],
          matchingPairs: (qType as string) === 'mencocokkan' ? matchingPairs : undefined,
          correctAnswers: (qType as string) === 'pg' ? [key.trim().toUpperCase() || 'A'] : ((qType as string) === 'pg_kompleks' ? key.split(',').map(s => s.trim().toUpperCase()) : undefined),
          essayRubric: rubric || undefined,
          difficulty: 'sedang'
        };
        questions.push(newQ);
      });
    } else {
      // CSV / Excel Tabular parser
      const lines = rawInputText.split('\n').map(l => l.trim()).filter(Boolean);
      lines.forEach((line, index) => {
        // Skip header row
        if (index === 0 && (line.toLowerCase().includes('tipe') || line.toLowerCase().includes('soal'))) {
          return;
        }

        // Handle CSV with commas or tabs
        const delimiter = line.includes('\t') ? '\t' : ',';
        const cols: string[] = [];
        let inQuotes = false;
        let cur = '';

        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === delimiter && !inQuotes) {
            cols.push(cur.trim());
            cur = '';
          } else {
            cur += char;
          }
        }
        cols.push(cur.trim());

        if (cols.length < 2) {
          errors.push(`Baris ${index + 1}: Format kolom tidak sesuai (minimal memuat Tipe dan Soal).`);
          return;
        }

        const rawType = cols[0].toLowerCase();
        let qType: QuestionType = 'pg';
        if (['pg', 'pg_kompleks', 'esay', 'uraian', 'mencocokkan', 'benar_salah', 'isian'].includes(rawType)) {
          qType = (rawType === 'esay' ? 'uraian' : rawType) as QuestionType;
        }

        const prompt = cols[1];
        const optA = cols[2] || '';
        const optB = cols[3] || '';
        const optC = cols[4] || '';
        const optD = cols[5] || '';
        const key = cols[6] || 'A';
        const points = parseInt(cols[7]) || 10;

        let matchingPairs: { id: string; leftText: string; rightText: string }[] | undefined = undefined;
        if (qType === 'mencocokkan' && key.includes('|')) {
          matchingPairs = key.split('|').map((pair, pIdx) => {
            const [left, right] = pair.split('=').map(s => s.trim());
            return { id: `pair-${pIdx + 1}`, leftText: left || '', rightText: right || '' };
          }).filter(p => p.leftText && p.rightText);
        }

        const gradeVal = selectedClassId === 'cls-8' ? 'VIII' : (selectedClassId === 'cls-9' ? 'IX' : 'VII');

        questions.push({
          id: `imp-${Date.now()}-${index}`,
          bankId: `qbank-${selectedSubjectId}`,
          subjectId: selectedSubjectId,
          classId: selectedClassId,
          grade: gradeVal,
          number: questions.length + 1,
          type: qType,
          prompt,
          points,
          options: qType === 'pg' || qType === 'pg_kompleks' ? [
            { id: 'A', text: optA || 'Opsi A' },
            { id: 'B', text: optB || 'Opsi B' },
            { id: 'C', text: optC || 'Opsi C' },
            { id: 'D', text: optD || 'Opsi D' },
          ] : [],
          matchingPairs,
          correctAnswers: qType === 'pg' ? [key.trim().toUpperCase()] : (qType === 'pg_kompleks' ? key.split(',').map(s => s.trim().toUpperCase()) : undefined),
          correctAnswerText: qType === 'isian' ? key : undefined,
          essayRubric: qType === 'uraian' ? key : undefined,
          difficulty: 'sedang'
        });
      });
    }

    setParsedQuestions(questions);
    setParsingErrors(errors);
    setShowPreview(true);
  };

  const handleSave = () => {
    if (parsedQuestions.length === 0) return;
    onSaveQuestions(parsedQuestions, selectedSubjectId, selectedClassId);
    onClose();
  };

  const subObj = subjects.find(s => s.id === selectedSubjectId);
  const clsObj = classes.find(c => c.id === selectedClassId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Impor Soal Massal (CSV, Excel, Word .docx)
              </h3>
              <p className="text-xs text-slate-500">
                Unggah atau tempel naskah soal dengan formula KaTeX dan aneka tipe soal.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Subject & Class Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Mata Pelajaran Tujuan:
            </label>
            <select
              value={selectedSubjectId}
              onChange={e => setSelectedSubjectId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:border-blue-500 font-medium"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Tingkat / Rombel Kelas Tujuan:
            </label>
            <select
              value={selectedClassId}
              onChange={e => setSelectedClassId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:border-blue-500 font-medium text-blue-700"
            >
              {QUESTION_CLASS_GROUPS.map(cg => (
                <option key={cg.id} value={cg.id}>
                  {cg.name}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              * Kelas VIII-A dan VIII-B otomatis digabung dalam 1 paket soal (hanya 1x upload).
            </p>
          </div>
        </div>

        {/* Format Selector & Template Downloader */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => { setSelectedFormat('csv'); setShowPreview(false); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedFormat === 'csv' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              File CSV
            </button>
            <button
              onClick={() => { setSelectedFormat('excel'); setShowPreview(false); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedFormat === 'excel' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Excel (.xlsx / Table)
            </button>
            <button
              onClick={() => { setSelectedFormat('word'); setShowPreview(false); }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedFormat === 'word' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Word (.docx / Blok Soal)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Muat Format Contoh
            </button>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 transition-colors font-medium"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Unduh Template {selectedFormat.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Upload File or Paste Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Tempel Teks Naskah Soal atau Unggah File:
            </label>
            <label className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
              <Upload className="w-3 h-3" />
              <span>Pilih file dari komputer</span>
              <input 
                type="file" 
                accept=".csv,.txt,.tsv" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>
          </div>

          <textarea
            rows={8}
            value={rawInputText}
            onChange={e => { setRawInputText(e.target.value); setShowPreview(false); }}
            placeholder={`Tempelkan naskah soal berformat ${selectedFormat.toUpperCase()} di sini... (atau klik "Muat Format Contoh" di atas)`}
            className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl outline-none focus:border-blue-500 leading-relaxed bg-slate-50/50"
          />
        </div>

        {/* Parse Action Button */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Mendukung tipe: <strong>PG, PG Kompleks, Esay/Uraian, Mencocokkan</strong>, serta rumus KaTeX ($...$ / $$...$$).
          </span>
          <button
            type="button"
            onClick={parseQuestions}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
          >
            Uji & Pratinjau Soal ({parsedQuestions.length > 0 ? `${parsedQuestions.length} Soal` : 'Periksa'})
          </button>
        </div>

        {/* Errors Alert */}
        {parsingErrors.length > 0 && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1 text-xs text-rose-700">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Ditemukan Catatan Format / Baris Bermasalah:</span>
            </div>
            <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
              {parsingErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Live Preview Section */}
        {showPreview && parsedQuestions.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Pratinjau {parsedQuestions.length} Butir Soal Terbaca:</span>
              </h4>
              <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                Tujuan: {subObj?.name} ({clsObj?.name})
              </span>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50">
              {parsedQuestions.map((q, idx) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Soal #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {q.type} · {q.points} Poin
                      </span>
                    </div>
                  </div>

                  <div className="text-slate-800">
                    <KatexRenderer content={q.prompt} />
                  </div>

                  {q.type === 'mencocokkan' && q.matchingPairs && (
                    <div className="p-2 bg-slate-50 rounded border border-slate-200 space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600">Pasangan yang Dijodohkan:</span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        {q.matchingPairs.map((pair, pIdx) => (
                          <div key={pIdx} className="flex justify-between bg-white px-2 py-1 rounded border border-slate-200">
                            <span className="font-medium text-slate-700">{pair.leftText}</span>
                            <span className="text-slate-400">↔</span>
                            <span className="font-semibold text-blue-700">{pair.rightText}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(q.type === 'pg' || q.type === 'pg_kompleks') && q.options.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {q.options.map(opt => (
                        <div key={opt.id} className="bg-slate-50 px-2 py-1 rounded flex items-center gap-1.5">
                          <span className="font-mono font-bold text-slate-700">{opt.id}.</span>
                          <KatexRenderer content={opt.text} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={parsedQuestions.length === 0}
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 rounded-lg transition-colors shadow-sm"
          >
            Simpan {parsedQuestions.length} Soal ke Bank Soal
          </button>
        </div>
      </div>
    </div>
  );
};
