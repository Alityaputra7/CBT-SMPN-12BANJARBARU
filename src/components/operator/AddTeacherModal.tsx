import React, { useState } from 'react';
import { X, UserPlus, Lock, Mail, BookOpen, Layers } from 'lucide-react';
import { UserAccount, Subject, ClassRoom } from '../../types/cbt';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTeacher: (teacher: UserAccount) => void;
  subjects: Subject[];
  classes: ClassRoom[];
}

export const AddTeacherModal: React.FC<AddTeacherModalProps> = ({
  isOpen,
  onClose,
  onAddTeacher,
  subjects,
  classes
}) => {
  if (!isOpen) return null;

  const [nip, setNip] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('guru123');
  const [assignedSubjectIds, setAssignedSubjectIds] = useState<string[]>([subjects[0]?.id || 'sbj-mat']);
  const [assignedClassIds, setAssignedClassIds] = useState<string[]>(classes.map(c => c.id)); // Default assigns across 7, 8A, 8B, 9

  const handleToggleSubject = (subId: string) => {
    if (assignedSubjectIds.includes(subId)) {
      setAssignedSubjectIds(assignedSubjectIds.filter(id => id !== subId));
    } else {
      setAssignedSubjectIds([...assignedSubjectIds, subId]);
    }
  };

  const handleToggleClass = (classId: string) => {
    if (assignedClassIds.includes(classId)) {
      setAssignedClassIds(assignedClassIds.filter(id => id !== classId));
    } else {
      setAssignedClassIds([...assignedClassIds, classId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nip.trim() || !name.trim()) {
      alert('NIP dan Nama Guru wajib diisi!');
      return;
    }

    const newTeacher: UserAccount = {
      id: `guru-${Date.now()}`,
      role: 'guru',
      usernameOrNip: nip.trim(),
      name: name.trim(),
      email: email.trim() || undefined,
      password: password.trim() || 'guru123',
      mustChangePassword: false,
      assignedSubjectIds,
      assignedClassIds
    };

    onAddTeacher(newTeacher);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Tambah Data Guru Baru</h3>
              <p className="text-xs text-slate-500">Daftarkan NIP, penugasan mata pelajaran, dan kelas diampu.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              NIP (Nomor Induk Pegawai 18 Digit)
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: 198804252014021003"
              value={nip}
              onChange={e => setNip(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nama Lengkap & Gelar
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Rahmat Hidayat, S.Pd., M.Pd."
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Dinas</label>
              <input
                type="email"
                placeholder="nama@smpn12bjb.sch.id"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kata Sandi Awal</label>
              <input
                type="text"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>
          </div>

          {/* Subjects Assignment */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            <label className="block font-semibold text-slate-700">
              Pilih Mata Pelajaran yang Diampu:
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 bg-slate-50 rounded-lg border border-slate-200">
              {subjects.map(sub => {
                const isSelected = assignedSubjectIds.includes(sub.id);
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleToggleSubject(sub.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Classes Assignment (7, 8A, 8B, 9) */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">
                Pilih Kelas yang Diampu (Kelas 7, 8A, 8B, 9):
              </label>
              <button
                type="button"
                onClick={() => setAssignedClassIds(classes.map(c => c.id))}
                className="text-[11px] text-blue-600 hover:underline"
              >
                Pilih Semua Kelas
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
              {classes.map(cls => {
                const isSelected = assignedClassIds.includes(cls.id);
                return (
                  <label
                    key={cls.id}
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleClass(cls.id)}
                      className="rounded text-emerald-600"
                    />
                    <span>Kelas {cls.name}</span>
                  </label>
                );
              })}
            </div>
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
              Simpan Data Guru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
