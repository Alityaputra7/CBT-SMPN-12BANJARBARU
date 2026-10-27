import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  FileSpreadsheet, 
  Check, 
  Users
} from 'lucide-react';
import { Student, ClassRoom, Gender } from '../../types/cbt';

interface StudentExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: ClassRoom[];
  onImportStudents: (newStudents: Student[]) => void;
  existingNisList: string[];
}

export const StudentExcelImportModal: React.FC<StudentExcelImportModalProps> = ({
  isOpen,
  onClose,
  classes,
  onImportStudents,
  existingNisList
}) => {
  if (!isOpen) return null;

  const [rawText, setRawText] = useState('');
  const [parsedStudents, setParsedStudents] = useState<Student[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const sampleCsvContent = `NIS,NAMA_LENGKAP,KELAS,JENIS_KELAMIN,RUANG,BANGKU
24031,Achmad Danuarta,VIII-A,L,Ruang 03,01
24032,Almira Syakira,VIII-A,P,Ruang 03,02
24033,Bima Sakti Pratama,VIII-A,L,Ruang 03,03
24034,Citra Kirana Putri,VIII-B,P,Ruang 04,01
24035,Deni Kurniawan,VIII-B,L,Ruang 04,02
24036,Erina Maulida,IX,P,Ruang 05,01
24037,Fajar Hidayatullah,IX,L,Ruang 05,02`;

  const handleDownloadTemplate = () => {
    const blob = new Blob([sampleCsvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_siswa_smpn12_banjarbaru.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSample = () => {
    setRawText(sampleCsvContent);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
      }
    };
    reader.readAsText(file);
  };

  const parseExcelData = () => {
    const errs: string[] = [];
    const students: Student[] = [];
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

    if (lines.length === 0) {
      setErrors(['Data masih kosong! Silakan tempel teks tabel Excel atau unggah file.']);
      return;
    }

    lines.forEach((line, index) => {
      // Skip header
      if (index === 0 && (line.toLowerCase().includes('nis') || line.toLowerCase().includes('nama'))) {
        return;
      }

      const delimiter = line.includes('\t') ? '\t' : ',';
      const parts = line.split(delimiter).map(s => s.trim().replace(/^["']|["']$/g, ''));

      if (parts.length < 3) {
        errs.push(`Baris ${index + 1}: Data tidak lengkap (minimal butuh NIS, Nama, dan Kelas).`);
        return;
      }

      const nis = parts[0];
      const name = parts[1];
      const classInput = parts[2];
      const genderRaw = (parts[3] || 'L').toUpperCase();
      const room = parts[4] || 'Ruang 01';
      const seat = parts[5] || `${index}`;

      if (!nis || !name) {
        errs.push(`Baris ${index + 1}: NIS atau Nama tidak boleh kosong.`);
        return;
      }

      // Find matching class
      const matchedClass = classes.find(c => 
        c.name.toLowerCase().includes(classInput.toLowerCase()) || 
        c.id.toLowerCase() === classInput.toLowerCase()
      ) || classes[0];

      const gender: Gender = genderRaw.startsWith('P') ? 'P' : 'L';

      students.push({
        id: `std-imp-${Date.now()}-${index}`,
        nis,
        name,
        classId: matchedClass.id,
        className: matchedClass.name,
        gender,
        roomNumber: room,
        seatNumber: seat
      });
    });

    setParsedStudents(students);
    setErrors(errs);
    setShowPreview(true);
  };

  const handleSave = () => {
    if (parsedStudents.length === 0) return;
    onImportStudents(parsedStudents);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Impor Data Siswa dari File Excel / CSV
              </h3>
              <p className="text-xs text-slate-500">
                Impor massal data siswa untuk kelas 7, 8A, 8B, dan 9 sekaligus.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar for template */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg font-medium transition-colors"
            >
              Muat Format Contoh (7 siswa)
            </button>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg font-medium transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Unduh Template Excel (.csv)
            </button>
          </div>

          <label className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
            <Upload className="w-3.5 h-3.5" />
            <span>Pilih file Excel/CSV dari komputer</span>
            <input type="file" accept=".csv,.txt,.tsv,.xlsx" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Input Text Area */}
        <div className="space-y-1.5 text-xs">
          <label className="font-semibold text-slate-700 block">
            Tempel Salinan Tabel Excel di Sini (Kolom: NIS, Nama, Kelas, L/P, Ruang, Bangku):
          </label>
          <textarea
            rows={7}
            value={rawText}
            onChange={e => { setRawText(e.target.value); setShowPreview(false); }}
            placeholder="Tempel baris data siswa yang disalin langsung dari Microsoft Excel atau Google Sheets..."
            className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl outline-none focus:border-blue-500 leading-relaxed bg-slate-50/40"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Mendukung pemisah koma (CSV) maupun tabulasi (salin langsung dari Excel).
          </span>
          <button
            type="button"
            onClick={parseExcelData}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs shadow-xs"
          >
            Validasi & Pratinjau ({parsedStudents.length > 0 ? `${parsedStudents.length} Siswa` : 'Periksa'})
          </button>
        </div>

        {/* Errors Alert */}
        {errors.length > 0 && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1 text-xs text-rose-700">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Catatan Validasi Data:</span>
            </div>
            <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
              {errors.map((e, idx) => (
                <li key={idx}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Preview Table */}
        {showPreview && parsedStudents.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Pratinjau {parsedStudents.length} Data Siswa Siap Diimpor:</span>
            </h4>

            <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-2 px-3 font-semibold">NIS</th>
                    <th className="py-2 px-3 font-semibold">Nama Siswa</th>
                    <th className="py-2 px-3 font-semibold">Kelas</th>
                    <th className="py-2 px-3 font-semibold">L/P</th>
                    <th className="py-2 px-3 font-semibold">Ruang</th>
                    <th className="py-2 px-3 font-semibold">Bangku</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {parsedStudents.map((std, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-1.5 px-3 font-mono font-medium text-slate-700">{std.nis}</td>
                      <td className="py-1.5 px-3 text-slate-900 font-medium">{std.name}</td>
                      <td className="py-1.5 px-3 text-blue-700 font-medium">{std.className}</td>
                      <td className="py-1.5 px-3 text-slate-600">{std.gender}</td>
                      <td className="py-1.5 px-3 text-slate-500">{std.roomNumber}</td>
                      <td className="py-1.5 px-3 font-mono text-slate-500">{std.seatNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={parsedStudents.length === 0}
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 rounded-lg shadow-sm"
          >
            Simpan {parsedStudents.length} Siswa ke Database
          </button>
        </div>
      </div>
    </div>
  );
};
