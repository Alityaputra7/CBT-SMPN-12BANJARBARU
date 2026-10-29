import { StudentExamSession, ExamSchedule, Student, Subject, ClassRoom } from '../types/cbt';

export interface ExportFilterOptions {
  subjectId?: string;
  classId?: string;
  statusFilter?: 'all' | 'completed' | 'in_progress' | 'not_started';
}

export interface ExamResultRow {
  no: number;
  nis: string;
  studentName: string;
  gender: string;
  className: string;
  subjectName: string;
  examTitle: string;
  examDate: string;
  statusLabel: string;
  scorePg: number;
  scoreEssay: number;
  finalScore: number;
  kkm: number;
  isPassed: boolean;
  violationsCount: number;
  submittedAt: string;
  deviceInfo: string;
}

/**
 * Filter and format exam sessions into structured rows for export and printing
 */
export function getFilteredResultRows(
  sessions: StudentExamSession[],
  exams: ExamSchedule[],
  students: Student[],
  subjects: Subject[],
  classes: ClassRoom[],
  options: ExportFilterOptions = {}
): ExamResultRow[] {
  const { subjectId, classId, statusFilter = 'all' } = options;

  return sessions
    .filter(session => {
      // 1. Filter by exam/subject
      const currentExam = exams.find(e => e.id === session.examId);
      const examSubjectId = currentExam?.subjectId;

      if (subjectId && subjectId !== 'all') {
        if (examSubjectId && examSubjectId !== subjectId) {
          return false;
        }
      }

      // 2. Filter by class
      if (classId && classId !== 'all') {
        if (classId === 'cls-8') {
          // Combined Kelas VIII (VIII-A & VIII-B)
          const isClass8 = session.classId === 'cls-2' || session.classId === 'cls-3' || 
                          session.className.includes('VIII') || session.classId === 'cls-8';
          if (!isClass8) return false;
        } else if (session.classId !== classId) {
          return false;
        }
      }

      // 3. Filter by status
      if (statusFilter === 'completed') {
        return session.status === 'submitted' || session.status === 'force_submitted';
      } else if (statusFilter === 'in_progress') {
        return session.status === 'in_progress';
      } else if (statusFilter === 'not_started') {
        return session.status === 'not_started';
      }

      return true;
    })
    .sort((a, b) => {
      // Sort primarily by class, then by student name
      if (a.className !== b.className) {
        return a.className.localeCompare(b.className);
      }
      return a.studentName.localeCompare(b.studentName);
    })
    .map((session, index) => {
      const currentExam = exams.find(e => e.id === session.examId);
      const student = students.find(s => s.id === session.studentId || s.nis === session.nis);
      const subject = subjects.find(s => s.id === currentExam?.subjectId);
      const kkm = currentExam?.kkm || 75;

      let statusLabel = 'Belum Mulai';
      if (session.status === 'submitted') statusLabel = 'Selesai';
      else if (session.status === 'force_submitted') statusLabel = 'Dikumpulkan Otomatis';
      else if (session.status === 'in_progress') statusLabel = 'Sedang Mengerjakan';
      else if (session.status === 'locked') statusLabel = 'Terkunci (Pelanggaran)';

      const formattedSubmittedAt = session.submittedAt 
        ? new Date(session.submittedAt).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : '-';

      return {
        no: index + 1,
        nis: session.nis || student?.nis || '-',
        studentName: session.studentName || student?.name || '-',
        gender: student?.gender === 'L' ? 'L' : student?.gender === 'P' ? 'P' : '-',
        className: session.className || student?.className || '-',
        subjectName: subject?.name || currentExam?.subjectName || 'Matematika',
        examTitle: currentExam?.title || session.examTitle || 'Ujian Akhir Semester (CBT)',
        examDate: currentExam?.date || new Date().toISOString().split('T')[0],
        statusLabel,
        scorePg: session.scorePg ?? 0,
        scoreEssay: session.scoreEssay ?? 0,
        finalScore: session.finalScore ?? 0,
        kkm,
        isPassed: (session.finalScore ?? 0) >= kkm,
        violationsCount: session.violationsCount ?? 0,
        submittedAt: formattedSubmittedAt,
        deviceInfo: session.deviceInfo || 'Standard Web Browser'
      };
    });
}

/**
 * Generate CSV string with RFC-4180 quoting and UTF-8 BOM for Microsoft Excel
 */
export function exportExamResultsToCSV(
  rows: ExamResultRow[],
  filenamePrefix: string = 'Rekap_Nilai_CBT'
): void {
  const headers = [
    'No',
    'NIS',
    'Nama Peserta',
    'L/P',
    'Kelas',
    'Mata Pelajaran',
    'Judul Ujian',
    'Tanggal Ujian',
    'Status Pengerjaan',
    'Skor PG/Objektif',
    'Skor Uraian/Esai',
    'Nilai Akhir',
    'KKM',
    'Status Kelulusan',
    'Jml Pelanggaran',
    'Waktu Pengumpulan',
    'Perangkat Peserta'
  ];

  const escapeCSV = (val: string | number | boolean | undefined): string => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvContentRows = rows.map(r => [
    escapeCSV(r.no),
    escapeCSV(r.nis),
    escapeCSV(r.studentName),
    escapeCSV(r.gender),
    escapeCSV(r.className),
    escapeCSV(r.subjectName),
    escapeCSV(r.examTitle),
    escapeCSV(r.examDate),
    escapeCSV(r.statusLabel),
    escapeCSV(r.scorePg),
    escapeCSV(r.scoreEssay),
    escapeCSV(r.finalScore),
    escapeCSV(r.kkm),
    escapeCSV(r.isPassed ? 'TUNTAS' : 'BELUM TUNTAS'),
    escapeCSV(r.violationsCount),
    escapeCSV(r.submittedAt),
    escapeCSV(r.deviceInfo)
  ].join(','));

  // Prepend UTF-8 Byte Order Mark (BOM) \uFEFF so Excel automatically parses Unicode correctly
  const fullCSV = '\uFEFF' + [headers.map(h => escapeCSV(h)).join(','), ...csvContentRows].join('\r\n');

  const blob = new Blob([fullCSV], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const timestamp = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filenamePrefix}_${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
