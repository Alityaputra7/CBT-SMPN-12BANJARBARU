import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { Student, ClassRoom, Gender } from '../../types/cbt';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onSaveStudent: (updated: Student) => void;
  classes: ClassRoom[];
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
  isOpen,
  onClose,
  student,
  onSaveStudent,
  classes
}) => {
  if (!isOpen || !student) return null;

  const [nis, setNis] = useState(student.nis);
  const [name, setName] = useState(student.name);
  const [classId, setClassId] = useState(student.classId);
  const [gender, setGender] = useState<Gender>(student.gender);
  const [roomNumber, setRoomNumber] = useState(student.roomNumber || 'Ruang 01');
  const [seatNumber, setSeatNumber] = useState(student.seatNumber || '01');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nis.trim() || !name.trim()) return;

    const cls = classes.find(c => c.id === classId);
    onSaveStudent({
      ...student,
      nis: nis.trim(),
      name: name.trim(),
      classId,
      className: cls ? cls.name : student.className,
      gender,
      roomNumber: roomNumber.trim(),
      seatNumber: seatNumber.trim()
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
            <h3 className="text-base font-bold text-slate-900">Edit Data Peserta Didik</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nomor Induk Siswa (NIS)</label>
            <input
              type="text"
              required
              value={nis}
              onChange={e => setNis(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap Siswa</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Rombel / Kelas</label>
              <select
                value={classId}
                onChange={e => setClassId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>Kelas {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Jenis Kelamin</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as Gender)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none"
              >
                <option value="L">Laki-laki (L)</option>
                <option value="P">Perempuan (P)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Ruang Ujian</label>
              <input
                type="text"
                value={roomNumber}
                onChange={e => setRoomNumber(e.target.value)}
                placeholder="Ruang 01"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nomor Bangku</label>
              <input
                type="text"
                value={seatNumber}
                onChange={e => setSeatNumber(e.target.value)}
                placeholder="01"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
              />
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
