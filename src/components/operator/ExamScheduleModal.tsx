import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen, Layers, Check } from 'lucide-react';
import { ExamSchedule, Subject, ClassRoom } from '../../types/cbt';

interface ExamScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveExam: (exam: ExamSchedule) => void;
  subjects: Subject[];
  classes: ClassRoom[];
  initialExam?: ExamSchedule | null;
}

export const ExamScheduleModal: React.FC<ExamScheduleModalProps> = ({
  isOpen,
  onClose,
  onSaveExam,
  subjects,
  classes,
  initialExam
}) => {
  if (!isOpen) return null;

  const [subjectId, setSubjectId] = useState<string>(initialExam?.subjectId || subjects[0]?.id || '');
  const [title, setTitle] = useState<string>(initialExam?.title || `Ujian Akhir Semester - ${subjects[0]?.name || 'Matematika'}`);
  const [targetClassIds, setTargetClassIds] = useState<string[]>(initialExam?.targetClassIds || classes.map(c => c.id));
  const [date, setDate] = useState<string>(initialExam?.date || new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>(initialExam?.startTime || '07:30');
  const [endTime, setEndTime] = useState<string>(initialExam?.endTime || '09:30');
  const [durationMinutes, setDurationMinutes] = useState<number>(initialExam?.durationMinutes || 90);
  const [kkm, setKkm] = useState<number>(initialExam?.kkm || 75);
  const [randomizeQuestions, setRandomizeQuestions] = useState<boolean>(initialExam?.randomizeQuestions ?? true);
  const [randomizeOptions, setRandomizeOptions] = useState<boolean>(initialExam?.randomizeOptions ?? true);
  const [status, setStatus] = useState<ExamSchedule['status']>(initialExam?.status || 'ongoing');

  const handleSubjectChange = (newSubId: string) => {
    setSubjectId(newSubId);
    const sub = subjects.find(s => s.id === newSubId);
    if (sub && !initialExam) {
      setTitle(`Ujian Akhir Semester - ${sub.name}`);
    }
  };

  const handleToggleClass = (classId: string) => {
    if (targetClassIds.includes(classId)) {
      if (targetClassIds.length > 1) {
        setTargetClassIds(targetClassIds.filter(id => id !== classId));
      }
    } else {
      setTargetClassIds([...targetClassIds, classId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = subjects.find(s => s.id === subjectId);
    const targetClassNames = targetClassIds
      .map(id => classes.find(c => c.id === id)?.name)
      .filter(Boolean) as string[];

    const newOrUpdated: ExamSchedule = {
      id: initialExam?.id || `ex-${Date.now()}`,
      title: title.trim(),
      subjectId,
      subjectName: sub ? sub.name : 'Matematika',
      targetClassIds,
      targetClassNames,
      date,
      startTime,
      endTime,
      durationMinutes: Number(durationMinutes),
      kkm: Number(kkm),
      randomizeQuestions,
      randomizeOptions,
      questionBankId: initialExam?.questionBankId || 'qbank-mat-7',
      status,
      tokenRequired: true
    };

    onSaveExam(newOrUpdated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {initialExam ? 'Edit Jadwal Ujian' : 'Tambah Jadwal Ujian Mata Pelajaran'}
              </h3>
              <p className="text-xs text-slate-500">
                Buat dan atur pelaksanaan ujian untuk semua mata pelajaran sekolah.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Pilih Mata Pelajaran yang Diujikan:
            </label>
            <select
              value={subjectId}
              onChange={e => handleSubjectChange(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none font-medium text-blue-700"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Judul Sesi Ujian
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Contoh: UAS Semester Ganjil - IPA Kelas 7 & 8"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-semibold"
            />
          </div>

          {/* Classes participating in this exam */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">
                Kelas Peserta Ujian (Bisa pilih 7, 8A, 8B, 9):
              </label>
              <button
                type="button"
                onClick={() => setTargetClassIds(classes.map(c => c.id))}
                className="text-[11px] text-blue-600 hover:underline"
              >
                Pilih Semua Kelas
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
              {classes.map(c => {
                const isSelected = targetClassIds.includes(c.id);
                return (
                  <label
                    key={c.id}
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50 border-blue-300 text-blue-950 font-medium'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleClass(c.id)}
                      className="rounded text-blue-600"
                    />
                    <span>Kelas {c.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tanggal</label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Jam Mulai</label>
              <input
                type="time"
                required
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Jam Selesai</label>
              <input
                type="time"
                required
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Durasi (Menit)</label>
              <input
                type="number"
                min={10}
                max={240}
                value={durationMinutes}
                onChange={e => setDurationMinutes(parseInt(e.target.value) || 90)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">KKM Kelulusan</label>
              <input
                type="number"
                min={50}
                max={100}
                value={kkm}
                onChange={e => setKkm(parseInt(e.target.value) || 75)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Status Sesi</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white outline-none font-medium"
              >
                <option value="ongoing">Berlangsung (Aktif)</option>
                <option value="scheduled">Terjadwal</option>
                <option value="draft">Draft</option>
                <option value="finished">Selesai</option>
              </select>
            </div>
          </div>

          {/* Randomization switches */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={randomizeQuestions}
                onChange={e => setRandomizeQuestions(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="text-slate-700 font-medium">Acak Nomor Soal</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={randomizeOptions}
                onChange={e => setRandomizeOptions(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="text-slate-700 font-medium">Acak Opsi Pilihan A/B/C/D</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
            >
              Simpan Jadwal Ujian
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
