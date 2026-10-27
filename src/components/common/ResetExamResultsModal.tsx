import React, { useState } from 'react';
import { 
  X, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle, 
  Trash2, 
  ShieldAlert, 
  Users, 
  User, 
  BookOpen 
} from 'lucide-react';
import { StudentExamSession, ClassRoom } from '../../types/cbt';

interface ResetExamResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSession?: StudentExamSession | null; // If provided, single mode
  sessions: StudentExamSession[];
  classes: ClassRoom[];
  onConfirmResetSingle: (sessionId: string, reason: string) => void;
  onConfirmResetBatch: (targetClassId: string, reason: string) => void;
  userRole: 'operator' | 'guru';
  currentExamTitle?: string;
}

export const ResetExamResultsModal: React.FC<ResetExamResultsModalProps> = ({
  isOpen,
  onClose,
  targetSession,
  sessions,
  classes,
  onConfirmResetSingle,
  onConfirmResetBatch,
  userRole,
  currentExamTitle = 'Ujian Akhir Semester (CBT)'
}) => {
  if (!isOpen) return null;

  const isSingle = Boolean(targetSession);

  // Single mode state
  const [singleReason, setSingleReason] = useState<string>('Ujian remedial / perbaikan nilai');
  const [customSingleReason, setCustomSingleReason] = useState<string>('');

  // Batch mode state
  const [selectedClassScope, setSelectedClassScope] = useState<string>('all');
  const [batchReason, setBatchReason] = useState<string>('Jadwal sesi ujian baru / ulangan serentak');
  const [confirmationInput, setConfirmationInput] = useState<string>('');
  const [includeClearViolations, setIncludeClearViolations] = useState<boolean>(true);

  // Compute affected count for batch
  const affectedSessions = sessions.filter(s => {
    if (selectedClassScope === 'all') return true;
    return s.classId === selectedClassScope;
  });

  const completedCount = affectedSessions.filter(
    s => s.status === 'submitted' || s.status === 'force_submitted' || s.finalScore > 0
  ).length;

  const handleConfirm = () => {
    if (isSingle && targetSession) {
      const finalReason = singleReason === 'Lainnya' ? customSingleReason : singleReason;
      onConfirmResetSingle(targetSession.id, finalReason || 'Reset hasil ulangan oleh ' + userRole);
      onClose();
    } else {
      if (confirmationInput.trim().toUpperCase() !== 'RESET') {
        alert('Silakan ketik teks "RESET" dengan huruf besar untuk mengonfirmasi tindakan.');
        return;
      }
      onConfirmResetBatch(selectedClassScope, batchReason);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-xs">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-snug">
                {isSingle ? 'Reset Hasil Ulangan Siswa' : 'Reset Semua Hasil Ulangan'}
              </h3>
              <p className="text-xs text-rose-100">
                {isSingle 
                  ? 'Kembalikan status ujian siswa ke awal untuk ujian ulang' 
                  : 'Mereset lembar jawaban & nilai peserta secara massal'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-rose-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {isSingle && targetSession ? (
            /* SINGLE STUDENT RESET */
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-semibold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Perhatian: Data hasil ujian siswa berikut akan dihapus bersih:</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-rose-100 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nama Siswa:</span>
                    <span className="font-bold text-slate-900">{targetSession.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">NIS / Kelas:</span>
                    <span className="font-mono font-medium text-slate-700">{targetSession.nis} · {targetSession.className}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status Saat Ini:</span>
                    <span className="font-semibold text-blue-700">
                      {targetSession.status === 'submitted' || targetSession.status === 'force_submitted' 
                        ? 'Sudah Mengumpulkan' 
                        : targetSession.status === 'in_progress' ? 'Sedang Mengerjakan' : 'Belum Selesai'}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-1.5">
                    <span className="text-slate-500">Nilai Akhir Saat Ini:</span>
                    <span className="font-mono font-bold text-rose-600 text-sm">
                      {targetSession.finalScore} / 100
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>(PG: {targetSession.scorePg} Poin · Uraian: {targetSession.scoreEssay} Poin · {targetSession.violationsCount}x Insiden)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Alasan Reset / Ujian Ulang:
                </label>
                <select
                  value={singleReason}
                  onChange={e => setSingleReason(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                >
                  <option value="Ujian remedial / perbaikan nilai">Ujian remedial / perbaikan nilai</option>
                  <option value="Kendala teknis / perangkat siswa mati saat ujian">Kendala teknis / perangkat siswa mati saat ujian</option>
                  <option value="Siswa salah klik kumpulkan ujian sebelum waktu habis">Siswa salah klik kumpulkan ujian sebelum waktu habis</option>
                  <option value="Reset pelanggaran anti-curang / pengawas mengizinkan">Reset pelanggaran anti-curang / pengawas mengizinkan</option>
                  <option value="Lainnya">Alasan Khusus Lainnya...</option>
                </select>

                {singleReason === 'Lainnya' && (
                  <input
                    type="text"
                    value={customSingleReason}
                    onChange={e => setCustomSingleReason(e.target.value)}
                    placeholder="Tuliskan alasan reset..."
                    className="w-full mt-2 text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none"
                  />
                )}
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-700">Dampak Reset:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li>Jawaban siswa dikosongkan kembali.</li>
                  <li>Skor kembali menjadi 0 dan status menjadi <span className="font-medium text-slate-800">"Belum Masuk"</span>.</li>
                  <li>Hitungan waktu ujian dikembalikan utuh ke durasi awal.</li>
                  <li>Kunci anti-curang dibuka otomatis sehingga siswa bisa login ulang.</li>
                </ul>
              </div>
            </div>
          ) : (
            /* BATCH RESET FOR MULTIPLE / ALL STUDENTS */
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Peringatan Tindakan Massal (Reset Nilai Ujian)</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Tindakan ini akan menghapus seluruh lembar jawaban dan nilai siswa yang terpilih. Pastikan Anda telah mengunduh / mengekspor Rekap Nilai ke format Excel terlebih dahulu jika memerlukan arsip nilai sebelumnya.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Pilih Cakupan Peserta yang Direset:
                </label>
                <select
                  value={selectedClassScope}
                  onChange={e => setSelectedClassScope(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
                >
                  <option value="all">Semua Siswa Seluruh Kelas ({sessions.length} Peserta)</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>
                      Hanya Kelas {c.name} ({sessions.filter(s => s.classId === c.id).length} Peserta)
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500">Total data yang terpengaruh:</span>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {affectedSessions.length} Peserta ({completedCount} siswa dengan nilai)
                  </p>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-rose-100 text-rose-800 rounded-lg">
                  {selectedClassScope === 'all' ? 'Seluruh Kelas' : 'Kelas Tertentu'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Alasan Reset Massal:
                </label>
                <input
                  type="text"
                  value={batchReason}
                  onChange={e => setBatchReason(e.target.value)}
                  placeholder="Contoh: Jadwal Ujian Ulang Semester Baru..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-rose-700 mb-1">
                  Ketik kata <span className="underline tracking-wider">RESET</span> untuk konfirmasi:
                </label>
                <input
                  type="text"
                  value={confirmationInput}
                  onChange={e => setConfirmationInput(e.target.value)}
                  placeholder="Ketik RESET"
                  className="w-full text-xs px-3 py-2 border-2 border-rose-300 rounded-lg bg-rose-50/30 font-mono tracking-widest text-slate-800 uppercase outline-none focus:border-rose-600 focus:bg-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Validasi keamanan untuk mencegah penghapusan nilai secara tidak disengaja.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isSingle && confirmationInput.trim().toUpperCase() !== 'RESET'}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer ${
              !isSingle && confirmationInput.trim().toUpperCase() !== 'RESET'
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>
              {isSingle ? 'Ya, Reset Hasil Siswa' : 'Reset Semua Hasil Terpilih'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
