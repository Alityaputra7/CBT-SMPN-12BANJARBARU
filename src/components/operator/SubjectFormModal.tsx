import React, { useState } from 'react';
import { X, BookOpen, UserCheck, Plus, Check } from 'lucide-react';
import { Subject, UserAccount } from '../../types/cbt';

interface SubjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSubject: (subject: Subject, selectedTeacherIds: string[]) => void;
  teachers: UserAccount[];
  initialSubject?: Subject | null;
}

export const SubjectFormModal: React.FC<SubjectFormModalProps> = ({
  isOpen,
  onClose,
  onSaveSubject,
  teachers,
  initialSubject
}) => {
  if (!isOpen) return null;

  const [code, setCode] = useState(initialSubject?.code || '');
  const [name, setName] = useState(initialSubject?.name || '');
  const [grade, setGrade] = useState<'VII' | 'VIII' | 'IX' | 'Semua'>(initialSubject?.grade || 'Semua');
  const [selectedTeacherIds, setSelectedTeacherIds] = useState<string[]>(initialSubject?.assignedTeacherIds || []);

  const handleToggleTeacher = (tId: string) => {
    if (selectedTeacherIds.includes(tId)) {
      setSelectedTeacherIds(selectedTeacherIds.filter(id => id !== tId));
    } else {
      setSelectedTeacherIds([...selectedTeacherIds, tId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Nama mata pelajaran wajib diisi!');
      return;
    }

    const autoCode = code.trim() || `${name.trim().substring(0, 3).toUpperCase()}-SMP`;
    const newOrUpdated: Subject = {
      id: initialSubject?.id || `sbj-${Date.now()}`,
      code: autoCode,
      name: name.trim(),
      grade,
      assignedTeacherIds: selectedTeacherIds
    };

    onSaveSubject(newOrUpdated, selectedTeacherIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {initialSubject ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
              </h3>
              <p className="text-xs text-slate-500">
                Tentukan kode, kurikulum, dan guru pengampu mapel.
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
              Nama Mata Pelajaran
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Bahasa Inggris"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kode Mapel
              </label>
              <input
                type="text"
                placeholder="BIG-SMP"
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono uppercase"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tingkat Jenjang
              </label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none"
              >
                <option value="Semua">Semua Jenjang (7, 8, 9)</option>
                <option value="VII">Kelas VII (7)</option>
                <option value="VIII">Kelas VIII (8)</option>
                <option value="IX">Kelas IX (9)</option>
              </select>
            </div>
          </div>

          {/* Teacher Selection for this Subject */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="block font-semibold text-slate-700">
              Pilih Guru Pengampu untuk Mata Pelajaran Ini:
            </label>
            <p className="text-[11px] text-slate-400">
              Guru terpilih akan otomatis memiliki hak menginput soal dan menguji mapel ini.
            </p>

            <div className="space-y-1.5 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-lg border border-slate-200">
              {teachers.map(teacher => {
                const isChecked = selectedTeacherIds.includes(teacher.id);
                return (
                  <label
                    key={teacher.id}
                    className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-blue-50 border-blue-300 text-blue-950 font-medium'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleTeacher(teacher.id)}
                        className="rounded text-blue-600"
                      />
                      <div>
                        <div className="font-semibold">{teacher.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">NIP {teacher.usernameOrNip}</div>
                      </div>
                    </div>
                    {isChecked && <Check className="w-4 h-4 text-blue-600" />}
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
              Simpan Mata Pelajaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
