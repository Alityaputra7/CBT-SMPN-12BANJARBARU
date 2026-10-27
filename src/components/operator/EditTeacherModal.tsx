import React, { useState } from 'react';
import { X, User, Lock, Mail, BookOpen } from 'lucide-react';
import { UserAccount, Subject, ClassRoom } from '../../types/cbt';

interface EditTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: UserAccount | null;
  onSaveTeacher: (updated: UserAccount) => void;
  subjects: Subject[];
  classes: ClassRoom[];
}

export const EditTeacherModal: React.FC<EditTeacherModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onSaveTeacher,
  subjects,
  classes
}) => {
  if (!isOpen || !teacher) return null;

  const [nip, setNip] = useState(teacher.usernameOrNip);
  const [name, setName] = useState(teacher.name);
  const [email, setEmail] = useState(teacher.email || '');
  const [password, setPassword] = useState(teacher.password || 'guru123');
  const [assignedSubjectIds, setAssignedSubjectIds] = useState<string[]>(teacher.assignedSubjectIds || []);
  const [assignedClassIds, setAssignedClassIds] = useState<string[]>(teacher.assignedClassIds || []);

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
    if (!nip.trim() || !name.trim()) return;

    onSaveTeacher({
      ...teacher,
      usernameOrNip: nip.trim(),
      name: name.trim(),
      email: email.trim() || undefined,
      password: password.trim() || 'guru123',
      assignedSubjectIds,
      assignedClassIds
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Edit Data Guru & Penugasan</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">NIP (Nomor Induk Pegawai)</label>
            <input
              type="text"
              required
              value={nip}
              onChange={e => setNip(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Dinas / Pribadi</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nama.guru@smpn12bjb.sch.id"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Kata Sandi Akun</label>
            <input
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="guru123"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
            />
          </div>

          {/* Subjects Assignment */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran yang Diampu:</label>
            <div className="flex flex-wrap gap-2">
              {subjects.map(sub => {
                const isChecked = assignedSubjectIds.includes(sub.id);
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleToggleSubject(sub.id)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                      isChecked 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Classes Assignment */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Kelas yang Ditugaskan:</label>
            <div className="flex flex-wrap gap-2">
              {classes.map(cls => {
                const isChecked = assignedClassIds.includes(cls.id);
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => handleToggleClass(cls.id)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                      isChecked 
                        ? 'bg-emerald-600 text-white border-emerald-600' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Kelas {cls.name}
                  </button>
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
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
