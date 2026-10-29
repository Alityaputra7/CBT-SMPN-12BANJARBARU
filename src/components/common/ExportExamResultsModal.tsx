import React, { useState, useMemo } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileSpreadsheet, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  School,
  FileCheck,
  Check,
  Layers
} from 'lucide-react';
import { 
  StudentExamSession, 
  ExamSchedule, 
  Student, 
  Subject, 
  ClassRoom, 
  SchoolSetting,
  UserAccount 
} from '../../types/cbt';
import { 
  getFilteredResultRows, 
  exportExamResultsToCSV, 
  ExamResultRow 
} from '../../utils/exportExamResults';
import { QUESTION_CLASS_GROUPS } from '../../utils/classGroups';

interface ExportExamResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: StudentExamSession[];
  exams: ExamSchedule[];
  students: Student[];
  subjects: Subject[];
  classes: ClassRoom[];
  schoolSetting?: SchoolSetting;
  currentTeacher?: UserAccount;
  isOperator?: boolean;
  initialSubjectId?: string;
  initialClassId?: string;
}

export const ExportExamResultsModal: React.FC<ExportExamResultsModalProps> = ({
  isOpen,
  onClose,
  sessions,
  exams,
  students,
  subjects,
  classes,
  schoolSetting,
  currentTeacher,
  isOperator = false,
  initialSubjectId,
  initialClassId
}) => {
  if (!isOpen) return null;

  // Filter available subjects for teachers
  const availableSubjects = useMemo(() => {
    if (isOperator) return subjects;
    if (currentTeacher?.assignedSubjectIds?.length) {
      return subjects.filter(s => currentTeacher.assignedSubjectIds?.includes(s.id));
    }
    const matched = subjects.filter(s => s.assignedTeacherIds?.includes(currentTeacher?.id || ''));
    return matched.length > 0 ? matched : [subjects[0]];
  }, [isOperator, currentTeacher, subjects]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    initialSubjectId || (isOperator ? 'all' : availableSubjects[0]?.id || 'all')
  );
  const [selectedClassId, setSelectedClassId] = useState<string>(initialClassId || 'all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'not_started'>('all');
  const [viewMode, setViewMode] = useState<'preview' | 'print_view'>('preview');

  // Compute filtered result rows
  const resultRows = useMemo(() => {
    return getFilteredResultRows(
      sessions,
      exams,
      students,
      subjects,
      classes,
      {
        subjectId: selectedSubjectId,
        classId: selectedClassId,
        statusFilter: selectedStatusFilter
      }
    );
  }, [sessions, exams, students, subjects, classes, selectedSubjectId, selectedClassId, selectedStatusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = resultRows.length;
    if (total === 0) {
      return { total: 0, completed: 0, passed: 0, failed: 0, average: 0, highest: 0, lowest: 0, passRate: 0 };
    }
    const completedRows = resultRows.filter(r => r.statusLabel === 'Selesai' || r.statusLabel === 'Dikumpulkan Otomatis');
    const passedRows = resultRows.filter(r => r.isPassed);
    const scores = resultRows.map(r => r.finalScore);
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    const average = total > 0 ? Math.round((sum / total) * 10) / 10 : 0;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passRate = total > 0 ? Math.round((passedRows.length / total) * 100) : 0;

    return {
      total,
      completed: completedRows.length,
      passed: passedRows.length,
      failed: total - passedRows.length,
      average,
      highest,
      lowest,
      passRate
    };
  }, [resultRows]);

  // Dynamic file name for CSV export
  const handleDownloadCSV = () => {
    const targetSubName = selectedSubjectId === 'all' 
      ? 'Semua_Mapel' 
      : subjects.find(s => s.id === selectedSubjectId)?.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Mapel';
    
    let targetClassName = 'Semua_Kelas';
    if (selectedClassId === 'cls-8') {
      targetClassName = 'Kelas_VIII';
    } else if (selectedClassId !== 'all') {
      targetClassName = `Kelas_${classes.find(c => c.id === selectedClassId)?.name?.replace(/[^a-zA-Z0-9]/g, '_') || selectedClassId}`;
    }

    const prefix = `Rekap_Nilai_CBT_SMPN12_${targetSubName}_${targetClassName}`;
    exportExamResultsToCSV(resultRows, prefix);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentSubjectObj = subjects.find(s => s.id === selectedSubjectId);
  const currentClassLabel = selectedClassId === 'all' 
    ? 'Semua Kelas' 
    : selectedClassId === 'cls-8' 
      ? 'Kelas VIII (VIII-A & VIII-B)' 
      : `Kelas ${classes.find(c => c.id === selectedClassId)?.name || selectedClassId}`;

  const defaultSchoolName = schoolSetting?.name || 'SMP NEGERI 12 BANJARBARU';
  const defaultNpsn = schoolSetting?.npsn || '30304618';
  const defaultAddress = schoolSetting?.address || 'Jl. Mistar Cokrokusumo No. 12, Sungai Besar, Banjarbaru Selatan, Kalimantan Selatan';
  const defaultAcademicYear = schoolSetting?.academicYear || '2025/2026';
  const defaultSemester = schoolSetting?.semester || 'Ganjil';
  const defaultLogo = schoolSetting?.logoUrl || '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg';

  const teacherName = currentTeacher?.name || 'Guru Pengampu Mata Pelajaran';
  const teacherNip = currentTeacher?.usernameOrNip || '-';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Modal Top Bar (Hidden when printing) */}
        <div className="p-4 sm:px-6 sm:py-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Ekspor & Cetak Rekap Nilai CBT
              </h3>
              <p className="text-xs text-slate-300">
                {isOperator ? 'Mode Operator CBT: Seluruh Mata Pelajaran & Rombel' : `Guru: ${teacherName} (${availableSubjects.map(s => s.name).join(', ')})`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls & Action Bar (Hidden when printing) */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filter selectors */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Mata Pelajaran Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Mata Pelajaran:
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={e => setSelectedSubjectId(e.target.value)}
                  className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  {isOperator && <option value="all">Semua Mata Pelajaran</option>}
                  {availableSubjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              {/* Rombel / Kelas Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Kelas / Rombel:
                </label>
                <select
                  value={selectedClassId}
                  onChange={e => setSelectedClassId(e.target.value)}
                  className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  <option value="all">Semua Kelas ({sessions.length} Siswa)</option>
                  <option value="cls-8">Kelas VIII (Gabungan VIII-A & VIII-B)</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>Kelas {c.name}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Status Ujian:
                </label>
                <select
                  value={selectedStatusFilter}
                  onChange={e => setSelectedStatusFilter(e.target.value as any)}
                  className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                >
                  <option value="all">Semua Status ({resultRows.length})</option>
                  <option value="completed">Sudah Mengumpulkan / Selesai</option>
                  <option value="in_progress">Sedang Mengerjakan</option>
                  <option value="not_started">Belum Mulai</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                title="Unduh file Microsoft Excel (.csv UTF-8 BOM)"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Excel / CSV</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-xs transition-colors cursor-pointer"
                title="Cetak Leger Nilai atau simpan sebagai PDF"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Cetak / PDF</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-1 text-center">
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Peserta</div>
              <div className="text-base font-bold text-slate-800 font-mono">{stats.total}</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Telah Submit</div>
              <div className="text-base font-bold text-blue-700 font-mono">{stats.completed}</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Rata-rata Nilai</div>
              <div className="text-base font-bold text-indigo-700 font-mono">{stats.average}</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Nilai Tertinggi</div>
              <div className="text-base font-bold text-emerald-700 font-mono">{stats.highest}</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Tuntas (≥75)</div>
              <div className="text-base font-bold text-emerald-600 font-mono">
                {stats.passed} <span className="text-[11px] font-normal text-slate-500">({stats.passRate}%)</span>
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Belum Tuntas</div>
              <div className="text-base font-bold text-rose-600 font-mono">{stats.failed}</div>
            </div>
          </div>
        </div>

        {/* Content Area: Report Sheet Preview (Print-optimized) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/50 print:p-0 print:bg-white">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-slate-200 print:border-none print:shadow-none print:p-0 max-w-4xl mx-auto space-y-5">
            
            {/* Official School Letterhead (KOP SURAT) */}
            <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-900 text-center sm:text-left">
              <img 
                src={defaultLogo} 
                alt="Logo SMPN 12 Banjarbaru" 
                className="w-20 h-20 object-contain shrink-0 mx-auto sm:mx-0"
              />
              <div className="flex-1 text-center">
                <h4 className="text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase">
                  Pemerintah Kota Banjarbaru · Dinas Pendidikan
                </h4>
                <h2 className="text-base sm:text-xl font-extrabold text-slate-950 uppercase tracking-tight">
                  {defaultSchoolName}
                </h2>
                <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                  NPSN: {defaultNpsn} · {defaultAddress}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Website / Portal CBT: cbt.smpn12bjb.sch.id · Email: info@smpn12bjb.sch.id
                </p>
              </div>
              <div className="w-20 hidden sm:block shrink-0"></div>
            </div>

            {/* Document Header */}
            <div className="text-center space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
                DAFTAR REKAPITULASI HASIL ASESMEN / UJIAN AKHIR SEMESTER (CBT)
              </h3>
              <p className="text-xs text-slate-600">
                Tahun Ajaran: <strong>{defaultAcademicYear}</strong> · Semester: <strong>{defaultSemester}</strong>
              </p>
            </div>

            {/* Metadata Box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Mata Pelajaran:</span>
                <span className="font-bold text-slate-900">
                  {selectedSubjectId === 'all' ? 'Semua Mata Pelajaran' : currentSubjectObj?.name || 'Matematika'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Kelas / Rombel:</span>
                <span className="font-bold text-slate-900">{currentClassLabel}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Kriteria Ketuntasan (KKM):</span>
                <span className="font-bold text-blue-700">75.00</span>
              </div>
              <div>
                <span className="text-slate-500 block">Guru Pengampu / Operator:</span>
                <span className="font-bold text-slate-900">{isOperator ? 'Operator CBT Administrator' : teacherName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">NIP:</span>
                <span className="font-mono text-slate-900">{isOperator ? '198503152009041001' : teacherNip}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Waktu Cetak Dokumen:</span>
                <span className="font-medium text-slate-700">{new Date().toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Table of Results */}
            {resultRows.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-300 rounded-lg">
                Tidak ada data hasil ujian yang sesuai dengan filter yang dipilih.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                      <th className="p-2 border-r border-slate-300 text-center w-8">No</th>
                      <th className="p-2 border-r border-slate-300 font-semibold w-20">NIS</th>
                      <th className="p-2 border-r border-slate-300 font-semibold">Nama Siswa</th>
                      <th className="p-2 border-r border-slate-300 text-center w-10">L/P</th>
                      <th className="p-2 border-r border-slate-300 font-semibold text-center w-16">Kelas</th>
                      <th className="p-2 border-r border-slate-300 text-center w-14 font-semibold">PG/Obj</th>
                      <th className="p-2 border-r border-slate-300 text-center w-14 font-semibold">Uraian</th>
                      <th className="p-2 border-r border-slate-300 text-center w-16 font-bold bg-blue-50/50">Nilai</th>
                      <th className="p-2 border-r border-slate-300 text-center w-24 font-semibold">Ketuntasan</th>
                      <th className="p-2 text-center w-28 font-semibold">Status Pengerjaan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {resultRows.map((r) => (
                      <tr key={`${r.nis}-${r.no}`} className="hover:bg-slate-50 print:hover:bg-transparent">
                        <td className="p-2 border-r border-slate-200 text-center text-slate-600 font-mono">{r.no}</td>
                        <td className="p-2 border-r border-slate-200 font-mono text-slate-800">{r.nis}</td>
                        <td className="p-2 border-r border-slate-200 font-medium text-slate-900">{r.studentName}</td>
                        <td className="p-2 border-r border-slate-200 text-center text-slate-600">{r.gender}</td>
                        <td className="p-2 border-r border-slate-200 text-center text-slate-700">{r.className}</td>
                        <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-700">{r.scorePg}</td>
                        <td className="p-2 border-r border-slate-200 text-center font-mono text-slate-700">{r.scoreEssay}</td>
                        <td className="p-2 border-r border-slate-200 text-center font-mono font-bold text-blue-800 bg-blue-50/30">
                          {r.finalScore}
                        </td>
                        <td className="p-2 border-r border-slate-200 text-center">
                          {r.isPassed ? (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              TUNTAS
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              BELUM TUNTAS
                            </span>
                          )}
                        </td>
                        <td className="p-2 text-center text-[11px] text-slate-600">
                          {r.statusLabel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Official Signature Block */}
            <div className="pt-6 grid grid-cols-2 gap-8 text-xs text-center break-inside-avoid">
              <div className="space-y-16">
                <p className="text-slate-600">
                  Mengetahui,<br />
                  <strong>Kepala SMP Negeri 12 Banjarbaru</strong>
                </p>
                <div>
                  <p className="font-bold underline text-slate-900 uppercase">H. Akhmad Ridhani, M.Pd.</p>
                  <p className="font-mono text-slate-600">NIP. 196805121994121002</p>
                </div>
              </div>

              <div className="space-y-16">
                <p className="text-slate-600">
                  Banjarbaru, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br />
                  <strong>{isOperator ? 'Koordinator CBT / Proktor' : 'Guru Pengampu Mata Pelajaran'}</strong>
                </p>
                <div>
                  <p className="font-bold underline text-slate-900 uppercase">
                    {isOperator ? 'Muhammad Rizky Pratama, S.Kom' : teacherName}
                  </p>
                  <p className="font-mono text-slate-600">NIP. {isOperator ? '198503152009041001' : teacherNip}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between print:hidden">
          <div className="text-xs text-slate-500">
            Format file: Microsoft Excel (.csv UTF-8 BOM) atau Dokumen Cetak / PDF A4.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Excel</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
