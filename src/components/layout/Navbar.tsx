import React from 'react';
import { UserRole, UserAccount, Student } from '../../types/cbt';
import { GraduationCap, LogOut, Shield } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole | null;
  currentUser: UserAccount | null;
  currentStudent: Student | null;
  activeSection: string;
  onNavigate: (section: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  currentUser,
  currentStudent,
  activeSection,
  onNavigate,
  onLogout
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone (Single text element wordmark) */}
        <div 
          onClick={() => onNavigate(currentRole ? currentRole : 'login')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-white p-0.5 border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden">
            <img 
              src="/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg" 
              alt="Logo SMPN 12 Banjarbaru" 
              className="w-full h-full object-contain rounded-full" 
            />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">
            CBT SMPN 12 Banjarbaru
          </span>
        </div>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('overview')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'overview' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Arsitektur & ERD
          </button>
          
          <button
            onClick={() => onNavigate('operator')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'operator' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Modul Operator
          </button>

          <button
            onClick={() => onNavigate('guru')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'guru' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Modul Guru
          </button>

          <button
            onClick={() => onNavigate('siswa')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'siswa' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Simulasi Siswa
          </button>

          <button
            onClick={() => onNavigate('panduan')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'panduan' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Panduan & SEB
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* JSONBin.io Cloud Sync Status Indicator */}
          <div 
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-medium shadow-2xs" 
            title="Sinkronisasi Cloud JSONBin.io Aktif (Bin ID: 6ae3da16ac6210605a5d7d67) - Laptop & HP Tersinkronisasi Otomatis"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">JSONBin Sync</span>
          </div>

          {currentRole ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs text-slate-500 font-medium">
                {currentRole === 'siswa' && currentStudent ? `${currentStudent.name} (${currentStudent.className})` : (currentUser ? currentUser.name : currentRole)}
              </span>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Masuk Portal
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
