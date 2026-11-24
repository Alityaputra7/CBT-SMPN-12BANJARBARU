import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Upload,
  Download,
  CheckCircle,
  AlertTriangle,
  X,
  Plus,
  FileSpreadsheet
} from 'lucide-react';
import { Question, QuestionType, Subject, ClassRoom } from '../../types/cbt';
import { MathTextRenderer } from './MathTextRenderer';
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

/**
 * RFC-4180 compliant CSV / TSV parser that preserves literal backslashes (`\`),
 * dollar signs (`$`), escaped quotes (`""`), and multi-line quoted cells without mangling LaTeX formulas.
 */
function parseTabularRows(raw: string): string[][] {
  const normalized = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const firstLine = normalized.split('\n').find(l => l.trim().length > 0) || '';
  const delimiter = firstLine.includes('\t') ? '\t' : ',';

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    const next = normalized[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        currentCell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if (ch === '\n' && !inQuotes) {
      currentRow.push(currentCell.trim());
      if (currentRow.some(c => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += ch;
    }
  }

  currentRow.push(currentCell.trim());
  if (currentRow.some(c => c.length > 0)) {
    rows.push(currentRow);
  }

  return rows;
}

function buildQuestionsFromRows(
  rows: string[][],
  selectedSubjectId: string,
  selectedClassId: string
): { questions: Question[]; errors: string[] } {
  const errors: string[] = [];
  const questions: Question[] = [];
  const gradeVal =
    selectedClassId === 'cls-8' ? 'VIII' : selectedClassId === 'cls-9' ? 'IX' : 'VII';

  if (rows.length === 0) {
    return { questions, errors: ['Tidak ada baris soal yang terbaca.'] };
  }

  let startIndex = 0;
  let hasOptionECol = false;

  const firstRowUpper = rows[0].map(c => c.toUpperCase());
  const isHeaderRow =
    firstRowUpper[0]?.includes('TIPE') ||
    firstRowUpper[1]?.includes('SOAL') ||
    firstRowUpper[0]?.includes('TYPE');

  if (isHeaderRow) {
    startIndex = 1;
    hasOptionECol = firstRowUpper.some(h => h === 'OPSI_E' || h === 'E' || h.includes('OPSI E'));
  } else {
    // Auto-detect 9-column format (with OPSI_E) vs 8-column format (A-D)
    hasOptionECol = rows[0].length >= 9;
  }

  for (let r = startIndex; r < rows.length; r++) {
    const cols = rows[r];
    if (!cols || cols.every(c => !c.trim())) continue;

    if (cols.length < 2) {
      errors.push(`Baris ${r + 1}: Format kolom tidak sesuai (minimal memuat Tipe dan Soal).`);
      continue;
    }

    const rawType = (cols[0] || '').toLowerCase().trim();
    let qType: QuestionType = 'pg';
    if (
      ['pg', 'pg_kompleks', 'esay', 'esai', 'uraian', 'mencocokkan', 'benar_salah', 'isian'].includes(
        rawType
      )
    ) {
      qType = (rawType === 'esay' || rawType === 'esai' ? 'uraian' : rawType) as QuestionType;
    }

    const prompt = cols[1] || '';
    if (!prompt.trim()) {
      errors.push(`Baris ${r + 1}: Teks soal kosong.`);
      continue;
    }

    const optA = cols[2] || '';
    const optB = cols[3] || '';
    const optC = cols[4] || '';
    const optD = cols[5] || '';
    const useFiveCols = hasOptionECol || cols.length >= 9;
    const optE = useFiveCols ? cols[6] || '' : '';
    const key = useFiveCols ? cols[7] || 'A' : cols[6] || 'A';
    const points = parseInt(useFiveCols ? cols[8] || '10' : cols[7] || '10', 10) || 10;

    let matchingPairs: { id: string; leftText: string; rightText: string }[] | undefined;
    if (qType === 'mencocokkan' && key.includes('|')) {
      matchingPairs = key
        .split('|')
        .map((pair, pIdx) => {
          const eqIdx = pair.indexOf('=');
          if (eqIdx === -1) return { id: `pair-${pIdx + 1}`, leftText: pair.trim(), rightText: '' };
          return {
            id: `pair-${pIdx + 1}`,
            leftText: pair.slice(0, eqIdx).trim(),
            rightText: pair.slice(eqIdx + 1).trim()
          };
        })
        .filter(p => p.leftText && p.rightText);
    }

    const pgOptions =
      qType === 'pg' || qType === 'pg_kompleks'
        ? [
            { id: 'A', text: optA || 'Opsi A' },
            { id: 'B', text: optB || 'Opsi B' },
            { id: 'C', text: optC || 'Opsi C' },
            { id: 'D', text: optD || 'Opsi D' },
            ...(optE.trim() ? [{ id: 'E', text: optE }] : [])
          ]
        : qType === 'benar_salah'
          ? [
              { id: 'BENAR', text: 'BENAR' },
              { id: 'SALAH', text: 'SALAH' }
            ]
          : [];

    questions.push({
      id: `imp-${Date.now()}-${r}`,
      bankId: `qbank-${selectedSubjectId}`,
      subjectId: selectedSubjectId,
      classId: selectedClassId,
      grade: gradeVal,
      number: questions.length + 1,
      type: qType,
      prompt,
      points,
      options: pgOptions,
      matchingPairs,
      correctAnswers:
        qType === 'pg' || qType === 'benar_salah'
          ? [key.trim().toUpperCase() || 'A']
          : qType === 'pg_kompleks'
            ? key
                .split(',')
                .map(s => s.trim().toUpperCase())
                .filter(Boolean)
            : undefined,
      correctAnswerText: qType === 'isian' ? key : undefined,
      essayRubric: qType === 'uraian' ? key : undefined,
      difficulty: 'sedang'
    });
  }

  return { questions, errors };
}

export const QuestionImportModal: React.FC<QuestionImportModalProps> = ({
  isOpen,
  onClose,
  onSaveQuestions,
  subjects,
  classes,
  initialSubjectId,
  initialClassId
}) => {
  const normalizeClassId = (cId?: string) => {
    if (cId === 'cls-8a' || cId === 'cls-8b' || cId === 'cls-8') return 'cls-8';
    if (cId === 'cls-9') return 'cls-9';
    return cId || 'cls-1';
  };

  const [selectedFormat, setSelectedFormat] = useState<'excel' | 'csv' | 'word'>('excel');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || subjects[0]?.id || ''
  );
  const [selectedClassId, setSelectedClassId] = useState<string>(normalizeClassId(initialClassId));
  const [rawInputText, setRawInputText] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);
  const [parsingErrors, setParsingErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  // Sample rows preserving literal LaTeX backslashes (`\`) and `$`
  const sampleExcelRows: string[][] = [
    ['TIPE', 'SOAL', 'OPSI_A', 'OPSI_B', 'OPSI_C', 'OPSI_D', 'OPSI_E', 'KUNCI', 'BOBOT'],
    [
      'pg',
      'Hitunglah nilai dari $$\\sqrt{169} + 4^{2}$$',
      '$25$',
      '$29$',
      '$32$',
      '$36$',
      '$40$',
      'B',
      '15'
    ],
    [
      'pg',
      'Nilai dari $\\sin 30^{\\circ} + \\cos 60^{\\circ}$ adalah...',
      '$\\frac{1}{2}$',
      '$1$',
      '$\\frac{\\sqrt{3}}{2}$',
      '$\\sqrt{2}$',
      '',
      'B',
      '15'
    ],
    [
      'uraian',
      'Tentukan nilai integral tentu $$\\int_{0}^{2} 3x^{2}\\,dx$$ dan jelaskan langkahnya!',
      '',
      '',
      '',
      '',
      '',
      'Langkah: $\\left[x^{3}\\right]_{0}^{2} = 2^{3} - 0^{3} = 8$.',
      '20'
    ],
    [
      'mencocokkan',
      'Jodohkan ekspresi matematika berikut dengan nilainya!',
      '',
      '',
      '',
      '',
      '',
      '$2^{3}$=$8$ | $\\sqrt{64}$=$8$ | $\\log_{2} 8$=$3$ | $\\frac{100}{4}$=$25$',
      '20'
    ]
  ];

  const sampleCsvContent = sampleExcelRows
    .map(row =>
      row
        .map(cell => (cell.includes(',') || cell.includes('"') || cell.includes('\n') ? `"${cell.replace(/"/g, '""')}"` : cell))
        .join(',')
    )
    .join('\n');

  const sampleWordContent = `[SOAL_1]
Tipe: pg
Soal: Bentuk sederhana dari $2(3x - 5) + 4x$ adalah...
A: $10x - 10$
B: $10x - 5$
C: $7x - 10$
D: $6x - 1$
E: $10x + 10$
Kunci: A
Bobot: 15

[SOAL_2]
Tipe: pg
Soal: Jika $f(x) = \\frac{x^{2} - 4}{x - 2}$, maka nilai $\\lim_{x \\to 2} f(x)$ adalah...
A: $0$
B: $2$
C: $4$
D: $\\infty$
Kunci: C
Bobot: 15

[SOAL_3]
Tipe: mencocokkan
Soal: Pasangkan ekspresi akar dan pangkat berikut dengan hasilnya:
Pasangan: $\\sqrt{81}$ = $9$ | $\\sqrt[3]{27}$ = $3$ | $2^{4}$ = $16$ | $\\log_{10} 100$ = $2$
Bobot: 20

[SOAL_4]
Tipe: uraian
Soal: Tentukan himpunan penyelesaian dari persamaan $\\frac{3x + 6}{3} = 9$!
Rubrik: Skor 5 untuk $x + 2 = 9$, skor 10 untuk $x = 7$.
Bobot: 20`;

  const handleDownloadTemplate = () => {
    if (selectedFormat === 'excel') {
      const ws = XLSX.utils.aoa_to_sheet(sampleExcelRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'BankSoal');
      XLSX.writeFile(wb, 'template_soal_matematika_cbt.xlsx');
      return;
    }

    let content = sampleCsvContent;
    let filename = 'template_soal_matematika_cbt.csv';
    let mime = 'text/csv;charset=utf-8;';

    if (selectedFormat === 'word') {
      content = sampleWordContent;
      filename = 'template_soal_matematika_word.txt';
      mime = 'text/plain;charset=utf-8;';
    }

    const blob = new Blob(['\uFEFF' + content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    setUploadedFileName(null);
    if (selectedFormat === 'word') {
      setRawInputText(sampleWordContent);
    } else {
      setRawInputText(sampleCsvContent);
    }
    setShowPreview(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);

    const lowerName = file.name.toLowerCase();
    if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) {
      // Binary Excel workbook via SheetJS — preserves every `\` and `$` verbatim
      const reader = new FileReader();
      reader.onload = event => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array', raw: false });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const aoa = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
            header: 1,
            raw: false,
            defval: ''
          });
          const stringRows: string[][] = aoa.map(row =>
            (Array.isArray(row) ? row : []).map(cell => String(cell ?? '').trim())
          );

          // Also display TSV representation in textarea so teacher can inspect/edit before saving
          const tsvPreview = stringRows.map(r => r.join('\t')).join('\n');
          setRawInputText(tsvPreview);

          const { questions, errors } = buildQuestionsFromRows(
            stringRows,
            selectedSubjectId,
            selectedClassId
          );
          setParsedQuestions(questions);
          setParsingErrors(errors);
          setShowPreview(true);
        } catch (err) {
          setParsingErrors([
            `Gagal membaca file Excel (${file.name}): ${err instanceof Error ? err.message : String(err)}`
          ]);
          setShowPreview(false);
        }
      };
      reader.readAsArrayBuffer(file);
      return;
    }

    // Text-based CSV / TSV / TXT file
    const reader = new FileReader();
    reader.onload = event => {
      const content = (event.target?.result as string) || '';
      // Strip UTF-8 BOM if present without touching backslashes or dollar signs
      const cleaned = content.replace(/^\uFEFF/, '');
      setRawInputText(cleaned);
      setShowPreview(false);
    };
    reader.readAsText(file, 'UTF-8');
  };

  // Parsing logic for pasted / text input
  const parseQuestions = () => {
    if (!rawInputText.trim()) {
      setParsingErrors([
        'Teks/file input masih kosong! Silakan unggah file Excel/CSV, tempel teks, atau klik "Muat Format Contoh".'
      ]);
      return;
    }

    if (selectedFormat === 'word') {
      const errors: string[] = [];
      const questions: Question[] = [];
      const blocks = rawInputText
        .replace(/\r\n/g, '\n')
        .split(/\[SOAL_\d+\]/i)
        .filter(b => b.trim());

      blocks.forEach((block, idx) => {
        const lines = block
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean);
        let qType: QuestionType = 'pg';
        let prompt = '';
        let optA = '',
          optB = '',
          optC = '',
          optD = '',
          optE = '';
        let key = '';
        let points = 10;
        let rubric = '';
        let matchingPairs: { id: string; leftText: string; rightText: string }[] = [];

        for (const line of lines) {
          if (/^tipe:\s*(.+)$/i.test(line)) {
            const rawType = line.match(/^tipe:\s*(.+)$/i)![1].toLowerCase().trim();
            if (
              ['pg', 'pg_kompleks', 'esay', 'esai', 'uraian', 'mencocokkan', 'benar_salah', 'isian'].includes(
                rawType
              )
            ) {
              qType = (rawType === 'esay' || rawType === 'esai' ? 'uraian' : rawType) as QuestionType;
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
          } else if (/^E:\s*(.+)$/i.test(line)) {
            optE = line.match(/^E:\s*(.+)$/i)![1];
          } else if (/^kunci:\s*(.+)$/i.test(line)) {
            key = line.match(/^kunci:\s*(.+)$/i)![1];
          } else if (/^bobot:\s*(\d+)$/i.test(line)) {
            points = parseInt(line.match(/^bobot:\s*(\d+)$/i)![1], 10) || 10;
          } else if (/^rubrik:\s*(.+)$/i.test(line)) {
            rubric = line.match(/^rubrik:\s*(.+)$/i)![1];
          } else if (/^pasangan:\s*(.+)$/i.test(line)) {
            const pairStr = line.match(/^pasangan:\s*(.+)$/i)![1];
            matchingPairs = pairStr
              .split('|')
              .map((pair, pIdx) => {
                const eqIdx = pair.indexOf('=');
                if (eqIdx === -1) return { id: `p-${pIdx + 1}`, leftText: pair.trim(), rightText: '' };
                return {
                  id: `p-${pIdx + 1}`,
                  leftText: pair.slice(0, eqIdx).trim(),
                  rightText: pair.slice(eqIdx + 1).trim()
                };
              })
              .filter(p => p.leftText && p.rightText);
          }
        }

        if (!prompt) {
          errors.push(`Blok ${idx + 1}: Teks soal tidak ditemukan.`);
          return;
        }

        const gradeVal =
          selectedClassId === 'cls-8' ? 'VIII' : selectedClassId === 'cls-9' ? 'IX' : 'VII';

        const pgOpts =
          qType === 'pg' || qType === 'pg_kompleks'
            ? [
                { id: 'A', text: optA || 'Opsi A' },
                { id: 'B', text: optB || 'Opsi B' },
                { id: 'C', text: optC || 'Opsi C' },
                { id: 'D', text: optD || 'Opsi D' },
                ...(optE.trim() ? [{ id: 'E', text: optE }] : [])
              ]
            : qType === 'benar_salah'
              ? [
                  { id: 'BENAR', text: 'BENAR' },
                  { id: 'SALAH', text: 'SALAH' }
                ]
              : [];

        questions.push({
          id: `imp-${Date.now()}-${idx}`,
          bankId: `qbank-${selectedSubjectId}`,
          subjectId: selectedSubjectId,
          classId: selectedClassId,
          grade: gradeVal,
          number: questions.length + 1,
          type: qType,
          prompt,
          points,
          options: pgOpts,
          matchingPairs: qType === 'mencocokkan' ? matchingPairs : undefined,
          correctAnswers:
            qType === 'pg' || qType === 'benar_salah'
              ? [key.trim().toUpperCase() || 'A']
              : qType === 'pg_kompleks'
                ? key
                    .split(',')
                    .map(s => s.trim().toUpperCase())
                    .filter(Boolean)
                : undefined,
          correctAnswerText: qType === 'isian' ? key : undefined,
          essayRubric: rubric || undefined,
          difficulty: 'sedang'
        });
      });

      setParsedQuestions(questions);
      setParsingErrors(errors);
      setShowPreview(true);
      return;
    }

    // CSV / Excel Tabular parser (preserves `\` and `$` cleanly)
    const rows = parseTabularRows(rawInputText);
    const { questions, errors } = buildQuestionsFromRows(
      rows,
      selectedSubjectId,
      selectedClassId
    );
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
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-5 my-4 sm:my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Impor Soal Massal (Excel .xlsx, CSV, Word / Copy-Paste)
              </h3>
              <p className="text-xs text-slate-500">
                Mendukung rumus matematika LaTeX (<code className="bg-slate-100 px-1 rounded">$...$</code> / <code className="bg-slate-100 px-1 rounded">$$...$$</code>) dengan karakter <code className="bg-slate-100 px-1 rounded">\</code> &amp; <code className="bg-slate-100 px-1 rounded">$</code> utuh tanpa terpotong.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Subject & Class Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran Tujuan:</label>
            <select
              value={selectedSubjectId}
              onChange={e => setSelectedSubjectId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:border-blue-500 font-medium"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
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
              type="button"
              onClick={() => {
                setSelectedFormat('excel');
                setShowPreview(false);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                selectedFormat === 'excel' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Excel (.xlsx / Tabel)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedFormat('csv');
                setShowPreview(false);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                selectedFormat === 'csv' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              File CSV
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedFormat('word');
                setShowPreview(false);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                selectedFormat === 'word' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Word / Blok Teks
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors font-medium cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Muat Contoh Rumus
            </button>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 transition-colors font-medium cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Unduh Template {selectedFormat === 'excel' ? '.XLSX' : selectedFormat.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Upload File or Paste Text */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700">
              Unggah File Excel (.xlsx/.xls/.csv) atau Tempel Langsung dari Excel / Word:
            </label>
            <label className="text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-1.5 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadedFileName ? `File: ${uploadedFileName}` : 'Pilih File (.xlsx / .csv / .txt)'}</span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv,.txt,.tsv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <textarea
            rows={8}
            value={rawInputText}
            onChange={e => {
              setRawInputText(e.target.value);
              setShowPreview(false);
            }}
            placeholder={`Tempelkan tabel dari Excel / CSV / Word di sini... Rumus seperti $\\frac{a}{b}$ atau $$\\int_{0}^{2} x^{2} dx$$ akan langsung terender rapi.`}
            className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl outline-none focus:border-blue-500 leading-relaxed bg-slate-50/50"
          />
        </div>

        {/* Parse Action Button */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-slate-500">
            Mendukung <strong>Opsi A–E</strong>, tipe <strong>PG, PG Kompleks, Esai, Isian, Mencocokkan</strong>, serta rumus <strong>KaTeX</strong>.
          </span>
          <button
            type="button"
            onClick={parseQuestions}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            Uji &amp; Pratinjau Soal ({parsedQuestions.length > 0 ? `${parsedQuestions.length} Soal` : 'Periksa'})
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

        {/* Live Preview Section with KaTeX MathTextRenderer */}
        {showPreview && parsedQuestions.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Pratinjau {parsedQuestions.length} Butir Soal &amp; Rumus KaTeX:</span>
              </h4>
              <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                Tujuan: {subObj?.name} ({clsObj?.name})
              </span>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2.5 border border-slate-200 rounded-xl p-3 bg-slate-50">
              {parsedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-slate-200 rounded-lg space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Soal #{idx + 1}</span>
                    <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {q.type} · {q.points} Poin
                    </span>
                  </div>

                  <div className="text-slate-800">
                    <MathTextRenderer content={q.prompt} />
                  </div>

                  {q.type === 'mencocokkan' && q.matchingPairs && (
                    <div className="p-2 bg-slate-50 rounded border border-slate-200 space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600">
                        Pasangan yang Dijodohkan:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {q.matchingPairs.map((pair, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-center justify-between gap-2 bg-white px-2 py-1.5 rounded border border-slate-200"
                          >
                            <div className="min-w-0 flex-1 overflow-x-auto">
                              <MathTextRenderer content={pair.leftText} inline />
                            </div>
                            <span className="text-slate-400 font-bold shrink-0">↔</span>
                            <div className="min-w-0 flex-1 overflow-x-auto text-right font-semibold text-blue-700">
                              <MathTextRenderer content={pair.rightText} inline />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(q.type === 'pg' || q.type === 'pg_kompleks') && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                      {q.options.map(opt => {
                        const isKey = q.correctAnswers?.includes(opt.id);
                        return (
                          <div
                            key={opt.id}
                            className={`px-2 py-1.5 rounded border flex items-center gap-1.5 ${
                              isKey
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="font-mono font-bold shrink-0">{opt.id}.</span>
                            <div className="min-w-0 flex-1 overflow-x-auto">
                              <MathTextRenderer content={opt.text} inline />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'isian' && q.correctAnswerText && (
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded text-[11px] text-blue-900 flex items-center gap-1.5">
                      <span className="font-bold">Kunci:</span>
                      <MathTextRenderer content={q.correctAnswerText} inline />
                    </div>
                  )}

                  {q.type === 'uraian' && q.essayRubric && (
                    <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-950 space-y-0.5">
                      <span className="font-bold block">Rubrik / Pembahasan:</span>
                      <MathTextRenderer content={q.essayRubric} />
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
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={parsedQuestions.length === 0}
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Simpan {parsedQuestions.length} Soal ke Bank Soal
          </button>
        </div>
      </div>
    </div>
  );
};
