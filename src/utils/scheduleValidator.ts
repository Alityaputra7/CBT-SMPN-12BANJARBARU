import { ExamSchedule } from '../types/cbt';

export interface ScheduleValidationResult {
  canStart: boolean;
  status: 'upcoming' | 'ongoing' | 'ended' | 'completed' | 'cancelled';
  statusBadge: string;
  badgeClass: string;
  title: string;
  message: string;
  formattedSchedule: string;
  currentTimeString: string;
  currentDateString: string;
  isToday: boolean;
  minutesUntilStart: number;
  minutesUntilEnd: number;
}

/**
 * Formats a date string 'YYYY-MM-DD' into Indonesian locale format.
 */
export const formatDateIndo = (dateStr: string): string => {
  if (!dateStr) return '-';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, monthIdx, day);
      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  } catch {
    // fallback
  }
  return dateStr;
};

/**
 * Validates whether an exam schedule allows students to take the exam right now.
 * Enforces the requirement: "Pengerjaan soal hanya bisa dikerjakan pada saat jadwal yang ditentukan".
 */
export const validateExamSchedule = (
  exam: ExamSchedule,
  referenceDate: Date = new Date()
): ScheduleValidationResult => {
  const now = referenceDate;
  
  // Format current date and time
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
  const currentDay = String(now.getDate()).padStart(2, '0');
  const currentDateStr = `${currentYear}-${currentMonth}-${currentDay}`;

  const currentHour = String(now.getHours()).padStart(2, '0');
  const currentMinute = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHour}:${currentMinute}`;
  const currentTimeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Fallback defaults if not set on exam
  const examDate = exam.date || currentDateStr;
  const startTime = exam.startTime || '07:30';
  const endTime = exam.endTime || '12:00';

  const isToday = examDate === currentDateStr;
  const formattedSchedule = `${formatDateIndo(examDate)} · Pukul ${startTime} - ${endTime} WITA`;

  // 1. Check explicit status 'finished'
  if (exam.status === 'finished') {
    return {
      canStart: false,
      status: 'completed',
      statusBadge: 'UJIAN SELESAI',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
      title: 'Ujian Telah Selesai',
      message: 'Pelaksanaan ujian untuk jadwal ini telah resmi ditutup dan selesai dilaksanakan.',
      formattedSchedule,
      currentTimeString,
      currentDateString: formatDateIndo(currentDateStr),
      isToday,
      minutesUntilStart: 0,
      minutesUntilEnd: 0
    };
  }

  // 2. Check explicit status 'draft'
  if (exam.status === 'draft') {
    return {
      canStart: false,
      status: 'cancelled',
      statusBadge: 'DRAF / BELUM DIRILIS',
      badgeClass: 'bg-rose-100 text-rose-700 border-rose-300',
      title: 'Jadwal Ujian Masih Draf',
      message: 'Jadwal pelaksanaan ujian ini masih dalam status draf dan belum dirilis oleh operator.',
      formattedSchedule,
      currentTimeString,
      currentDateString: formatDateIndo(currentDateStr),
      isToday,
      minutesUntilStart: 0,
      minutesUntilEnd: 0
    };
  }

  // Calculate minute timestamps for time comparison
  const [currH, currM] = [now.getHours(), now.getMinutes()];
  const currentTotalMinutes = currH * 60 + currM;

  const [startH, startM] = startTime.split(':').map(n => parseInt(n, 10) || 0);
  const startTotalMinutes = startH * 60 + startM;

  const [endH, endM] = endTime.split(':').map(n => parseInt(n, 10) || 0);
  const endTotalMinutes = endH * 60 + endM;

  // 3. Compare Dates
  if (examDate < currentDateStr) {
    // Exam date is in the past
    return {
      canStart: false,
      status: 'ended',
      statusBadge: 'TELAH BERAKHIR',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      title: 'Jadwal Ujian Telah Berakhir',
      message: `Batas waktu pelaksanaan ujian telah berakhir pada tanggal ${formatDateIndo(examDate)} pukul ${endTime} WITA. Siswa tidak dapat lagi mengerjakan soal di luar jadwal.`,
      formattedSchedule,
      currentTimeString,
      currentDateString: formatDateIndo(currentDateStr),
      isToday,
      minutesUntilStart: 0,
      minutesUntilEnd: 0
    };
  }

  if (examDate > currentDateStr) {
    // Exam date is in the future
    return {
      canStart: false,
      status: 'upcoming',
      statusBadge: 'BELUM DIMULAI',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      title: 'Ujian Belum Dimulai',
      message: `Ujian dijadwalkan pada hari ${formatDateIndo(examDate)} pukul ${startTime} - ${endTime} WITA. Soal hanya dapat dikerjakan siswa pada saat jadwal yang telah ditentukan.`,
      formattedSchedule,
      currentTimeString,
      currentDateString: formatDateIndo(currentDateStr),
      isToday,
      minutesUntilStart: 9999,
      minutesUntilEnd: 9999
    };
  }

  // 4. Same day (Today): Check time window
  if (currentTotalMinutes < startTotalMinutes) {
    const minsLeft = startTotalMinutes - currentTotalMinutes;
    const hoursLeft = Math.floor(minsLeft / 60);
    const remainingMins = minsLeft % 60;
    const timeRemainingStr = hoursLeft > 0 ? `${hoursLeft} jam ${remainingMins} menit` : `${minsLeft} menit`;

    return {
      canStart: false,
      status: 'upcoming',
      statusBadge: 'BELUM DIMULAI',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      title: 'Ujian Belum Dimulai',
      message: `Ujian dijadwalkan hari ini mulai pukul ${startTime} WITA (kurang ${timeRemainingStr} lagi). Tombol mulai akan aktif otomatis saat jadwal tiba.`,
      formattedSchedule,
      currentTimeString,
      currentDateString: formatDateIndo(currentDateStr),
      isToday,
      minutesUntilStart: minsLeft,
      minutesUntilEnd: endTotalMinutes - currentTotalMinutes
    };
  }

  if (currentTotalMinutes > endTotalMinutes) {
    return {
      canStart: false,
      status: 'ended',
      statusBadge: 'WAKTU SELESAI',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      title: 'Waktu Pelaksanaan Ujian Telah Berakhir',
      message: `Jadwal ujian hari ini telah resmi ditutup pada pukul ${endTime} WITA. Pengerjaan soal hanya diizinkan selama rentang jadwal berlangsung.`,
      formattedSchedule,
      currentTimeString,
      currentDateString: formatDateIndo(currentDateStr),
      isToday,
      minutesUntilStart: 0,
      minutesUntilEnd: 0
    };
  }

  // 5. Active: Within scheduled date and time window
  const minsRemaining = endTotalMinutes - currentTotalMinutes;
  return {
    canStart: true,
    status: 'ongoing',
    statusBadge: 'SEDANG BERLANGSUNG',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    title: 'Jadwal Ujian Aktif',
    message: `Ujian sedang berlangsung hari ini dari pukul ${startTime} hingga ${endTime} WITA (tersisa ${minsRemaining} menit dalam jadwal).`,
    formattedSchedule,
    currentTimeString,
    currentDateString: formatDateIndo(currentDateStr),
    isToday,
    minutesUntilStart: 0,
    minutesUntilEnd: minsRemaining
  };
};
