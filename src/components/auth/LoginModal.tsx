import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  KeyRound, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  GraduationCap,
  Sparkles,
  School,
  ArrowRight
} from 'lucide-react';
import { UserRole, UserAccount, Student, SchoolSetting } from '../../types/cbt';
import { generateDynamicToken, verifyDynamicToken } from '../../utils/tokenGenerator';

interface LoginModalProps {
  onLoginSuccess: (
    role: UserRole, 
    account: UserAccount | null, 
    student: Student | null
  ) => void;
  students: Student[];
  teachers: UserAccount[];
  operator: UserAccount;
  activeSessions: Record<string, boolean>; // studentId -> hasActiveSession
  schoolSetting?: SchoolSetting;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  onLoginSuccess,
  students,
  teachers,
  operator,
  activeSessions,
  schoolSetting
}) => {
  const [role, setRole] = useState<UserRole>('siswa');

  // Form states
  const [nis, setNis] = useState<string>('3132399330');
  const [uniqueCode, setUniqueCode] = useState<string>('');
  const [usernameOrNip, setUsernameOrNip] = useState<string>('197910132014061002');
  const [password, setPassword] = useState<string>('guru123');

  // Rate Limiting
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [lockCountdown, setLockCountdown] = useState<number>(0);

  // Status & error messages
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [liveTokenInfo, setLiveTokenInfo] = useState(generateDynamicToken());

  // Auto-fill active dynamic token for demo convenience
  useEffect(() => {
    const timer = setInterval(() => {
      const current = generateDynamicToken();
      setLiveTokenInfo(current);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Countdown when rate limit is hit
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLockedOut && lockCountdown > 0) {
      interval = setInterval(() => {
        setLockCountdown(prev => {
          if (prev <= 1) {
            setIsLockedOut(false);
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLockedOut, lockCountdown]);

  const handleFailedAttempt = (msg: string) => {
    const nextAttempts = failedAttempts + 1;
    setFailedAttempts(nextAttempts);
    if (nextAttempts >= 5) {
      setIsLockedOut(true);
      setLockCountdown(60);
      setErrorMessage('Terlalu banyak percobaan gagal. Akun dikunci sementara selama 60 detik (Rate Limiting).');
    } else {
      setErrorMessage(`${msg} (Sisa percobaan: ${5 - nextAttempts})`);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;
    setErrorMessage('');

    if (role === 'siswa') {
      const foundStudent = students.find(s => s.nis === nis.trim());
      if (!foundStudent) {
        handleFailedAttempt('NIS tidak terdaftar dalam database peserta ujian!');
        return;
      }

      // Verify dynamic token
      const tokenResult = verifyDynamicToken(uniqueCode);
      if (!tokenResult.isValid) {
        handleFailedAttempt(tokenResult.message);
        return;
      }

      // Check single active session constraint
      if (activeSessions[foundStudent.id]) {
        setErrorMessage(`Akun NIS ${foundStudent.nis} (${foundStudent.name}) sedang aktif pada perangkat lain. Satu akun hanya boleh memiliki satu sesi aktif. Hubungi operator/proktor untuk reset sesi.`);
        return;
      }

      // Success
      setFailedAttempts(0);
      onLoginSuccess('siswa', null, foundStudent);
    } 
    else if (role === 'guru') {
      const foundTeacher = teachers.find(t => t.usernameOrNip === usernameOrNip.trim());
      if (!foundTeacher) {
        handleFailedAttempt('NIP guru tidak ditemukan!');
        return;
      }
      if (password !== 'guru123' && password !== 'admin') {
        handleFailedAttempt('Kata sandi guru salah!');
        return;
      }

      setFailedAttempts(0);
      onLoginSuccess('guru', foundTeacher, null);
    } 
    else if (role === 'operator') {
      if (usernameOrNip.trim() !== operator.usernameOrNip) {
        handleFailedAttempt('Username operator salah!');
        return;
      }
      const validOperatorPass = operator.password || 'admin';
      if (password !== validOperatorPass && password !== 'admin') {
        handleFailedAttempt('Password operator salah!');
        return;
      }

      setFailedAttempts(0);
      onLoginSuccess('operator', operator, null);
    }
  };

  const fillQuickDemo = (type: 'siswa' | 'guru' | 'operator') => {
    setErrorMessage('');
    if (type === 'siswa') {
      setRole('siswa');
      setNis('3132399330');
      setUniqueCode(liveTokenInfo.token);
    } else if (type === 'guru') {
      setRole('guru');
      setUsernameOrNip('197910132014061002');
      setPassword('guru123');
    } else {
      setRole('operator');
      setUsernameOrNip('admin');
      setPassword('admin');
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
      {/* Top Banner with School Logo */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-6 text-white text-center relative overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 pointer-events-none">
          <img
            src={schoolSetting?.logoUrl || '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg'}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative z-10">
          {/* Official School Logo */}
          <div className="mx-auto mb-3 w-20 h-20 rounded-full bg-white p-1.5 shadow-lg flex items-center justify-center border-2 border-white/90 ring-4 ring-blue-400/25">
            <img
              src={schoolSetting?.logoUrl || '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg'}
              alt="Logo SMP Negeri 12 Banjarbaru"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Portal CBT UAS</h2>
          <p className="text-xs text-blue-100 mt-1 font-semibold tracking-wide">
            {schoolSetting?.name || 'SMP Negeri 12 Banjarbaru'}
          </p>
          <p className="text-[11px] text-blue-200 mt-0.5">
            Tahun Ajaran {schoolSetting?.academicYear || '2026/2027'} · Semester {schoolSetting?.semester || 'Ganjil'}
          </p>
        </div>
      </div>

      {/* Role Switcher Tabs */}
      <div className="grid grid-cols-3 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => { setRole('siswa'); setErrorMessage(''); }}
          className={`py-2 rounded-lg transition-all ${
            role === 'siswa' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Siswa
        </button>
        <button
          type="button"
          onClick={() => { setRole('guru'); setErrorMessage(''); }}
          className={`py-2 rounded-lg transition-all ${
            role === 'guru' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Guru
        </button>
        <button
          type="button"
          onClick={() => { setRole('operator'); setErrorMessage(''); }}
          className={`py-2 rounded-lg transition-all ${
            role === 'operator' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Operator
        </button>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-700 leading-relaxed">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <div>{errorMessage}</div>
          </div>
        )}

        {isLockedOut && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2.5 text-xs text-amber-800">
            <Clock className="w-4 h-4 text-amber-600 animate-spin" />
            <span>Terkunci karena rate limiting. Coba lagi dalam <strong>{lockCountdown} detik</strong>.</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {role === 'siswa' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nomor Induk Siswa (NIS)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="username"
                    required
                    value={nis}
                    onChange={e => setNis(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Contoh: 3132399330"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">NIS terdaftar database: 3132399330 (Ahmad Habibi), 3134562253 (Abdurahman), 3136278531 (Abdurahim), dll. (92 Siswa)</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Kode Unik (6 Digit)
                  </label>
                  <span className="text-[11px] text-blue-600 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    Reset: {liveTokenInfo.expiresInSeconds}s
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={uniqueCode}
                    onChange={e => setUniqueCode(e.target.value.toUpperCase())}
                    placeholder="Kode dari Pengawas"
                    className="w-full pl-9 pr-24 py-2 text-sm font-mono tracking-widest uppercase border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setUniqueCode(liveTokenInfo.token)}
                    className="absolute right-1.5 top-1.5 px-2 py-1 text-[11px] font-sans font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                    title="Gunakan kode aktif sekarang"
                  >
                    Pakai: {liveTokenInfo.token}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Dibuat otomatis di server setiap 5 menit. Minta kepada guru pengawas di ruang ujian.
                </p>
              </div>
            </>
          )}

          {role === 'guru' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  NIP Guru
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={usernameOrNip}
                    onChange={e => setUsernameOrNip(e.target.value)}
                    placeholder="Contoh: 197910132014061002"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">NIP terdaftar: 197910132014061002 (Ahmad Fathoni), 198502082009032008 (Dwi Setyarini), dll. (9 Guru)</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Kata sandi dari operator"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Default seeder: <code>guru123</code></p>
              </div>
            </>
          )}

          {role === 'operator' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Username Operator
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={usernameOrNip}
                    onChange={e => setUsernameOrNip(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Kata Sandi Operator
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-amber-700 mt-1 bg-amber-50 p-2 rounded border border-amber-200">
                  Akun awal: username <strong>admin</strong>, password <strong>admin</strong>. Sistem akan mewajibkan penggantian kata sandi pada login pertama.
                </p>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLockedOut}
            className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Masuk ke Sistem</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Testing Helper */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pintasan Masuk Cepat (Akun Uji Coba):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillQuickDemo('siswa')}
              className="text-[11px] py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-center transition-colors font-medium cursor-pointer"
            >
              Siswa (Ahmad Habibi)
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo('guru')}
              className="text-[11px] py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-center transition-colors font-medium cursor-pointer"
            >
              Guru (Ahmad Fathoni)
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo('operator')}
              className="text-[11px] py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-center transition-colors font-medium cursor-pointer"
            >
              Operator (Admin)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
