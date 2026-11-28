import {
  SchoolSetting,
  UserAccount,
  Student,
  ClassRoom,
  Subject,
  QuestionBank,
  ExamSchedule,
  Announcement,
  AuditLog,
  StudentExamSession
} from '../types/cbt';
import { OFFICIAL_STUDENTS } from './generatedStudents';

export const INITIAL_SCHOOL_SETTING: SchoolSetting = {
  id: 'sch-1',
  name: 'SMP Negeri 12 Banjarbaru',
  npsn: '30304612',
  address: 'Jl. Panglima Batur Barat No. 12, Kel. Loktabat Utara, Kota Banjarbaru, Kalimantan Selatan',
  academicYear: '2026/2027',
  semester: 'Ganjil',
  maxViolations: 3,
  sebStrictMode: false,
  sebConfigKey: 'a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9',
  logoUrl: '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg',
  allowStudentViewResult: true,
  principalTitle: 'Plt. Kepala Sekolah',
  principalName: 'Legiyo, S.Pd',
  principalNip: '196907022000031010',
  cbtCoordinatorName: 'Dwi Setyarini, S.Pd.',
  cbtCoordinatorNip: '198502082009032008'
};

export const INITIAL_OPERATOR: UserAccount = {
  id: 'usr-admin',
  role: 'operator',
  usernameOrNip: 'admin',
  name: 'Dwi Setyarini, S.Pd. (Koordinator CBT)',
  email: 'dwi.setyarini@smpn12bjb.sch.id',
  mustChangePassword: true
};

export const INITIAL_TEACHERS: UserAccount[] = [
  {
    id: 'guru-1',
    role: 'guru',
    usernameOrNip: '197910132014061002',
    name: 'Ahmad Fathoni, S.Pd.I',
    email: 'ahmad.fathoni@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-pai'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-2',
    role: 'guru',
    usernameOrNip: '198502082009032008',
    name: 'Dwi Setyarini, S.Pd.',
    email: 'dwi.setyarini@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-ips', 'sbj-ppkn'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-3',
    role: 'guru',
    usernameOrNip: '196907022000031010',
    name: 'Legiyo, S.Pd.',
    email: 'legiyo@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-mat'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-4',
    role: 'guru',
    usernameOrNip: '199703022022212002',
    name: 'Maulida Fitriani, S.Pd.',
    email: 'maulida.fitriani@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-bin'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-5',
    role: 'guru',
    usernameOrNip: '199103022022212006',
    name: 'Nisfi Nor Imaniar, S.Pd.',
    email: 'nisfi.imaniar@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-bk'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-6',
    role: 'guru',
    usernameOrNip: '197006011997021006',
    name: 'Riswan Hidayat, S.Pd.',
    email: 'riswan.hidayat@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-big'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-7',
    role: 'guru',
    usernameOrNip: '198105082022211003',
    name: 'Setya Kariyadi, S.E',
    email: 'setya.kariyadi@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-seni', 'sbj-inf'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-8',
    role: 'guru',
    usernameOrNip: '123456789999999999',
    name: 'Nazma Aulia, S.Pd.',
    email: 'nazma.aulia@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-ipa'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-9',
    role: 'guru',
    usernameOrNip: '262012931000219331',
    name: 'Alitya Putra Maulidan, S.Pd.',
    email: 'alitya.maulidan@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-pjok'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  }
];

export const INITIAL_CLASSES: ClassRoom[] = [
  {
    id: 'cls-1',
    grade: 'VII',
    name: 'VII',
    homeroomTeacherName: 'Ahmad Fathoni, S.Pd.I',
    totalStudents: 30
  },
  {
    id: 'cls-8a',
    grade: 'VIII',
    name: 'VIII-A',
    homeroomTeacherName: 'Dwi Setyarini, S.Pd.',
    totalStudents: 17
  },
  {
    id: 'cls-8b',
    grade: 'VIII',
    name: 'VIII-B',
    homeroomTeacherName: 'Legiyo, S.Pd.',
    totalStudents: 17
  },
  {
    id: 'cls-9',
    grade: 'IX',
    name: 'IX',
    homeroomTeacherName: 'Riswan Hidayat, S.Pd.',
    totalStudents: 29
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'sbj-mat', code: 'MAT-SMP', name: 'Matematika', grade: 'Semua', assignedTeacherIds: ['guru-3'] },
  { id: 'sbj-ipa', code: 'IPA-SMP', name: 'Ilmu Pengetahuan Alam (IPA)', grade: 'Semua', assignedTeacherIds: ['guru-8'] },
  { id: 'sbj-bin', code: 'BIN-SMP', name: 'Bahasa Indonesia', grade: 'Semua', assignedTeacherIds: ['guru-4'] },
  { id: 'sbj-big', code: 'BIG-SMP', name: 'Bahasa Inggris', grade: 'Semua', assignedTeacherIds: ['guru-6'] },
  { id: 'sbj-pai', code: 'PAI-SMP', name: 'Pendidikan Agama Islam', grade: 'Semua', assignedTeacherIds: ['guru-1'] },
  { id: 'sbj-ppkn', code: 'PPKN-SMP', name: 'Pendidikan Kewarganegaraan (PPKn)', grade: 'Semua', assignedTeacherIds: ['guru-2'] },
  { id: 'sbj-ips', code: 'IPS-SMP', name: 'Ilmu Pengetahuan Sosial (IPS)', grade: 'Semua', assignedTeacherIds: ['guru-2'] },
  { id: 'sbj-inf', code: 'INF-SMP', name: 'Teknologi dan Informatika', grade: 'Semua', assignedTeacherIds: ['guru-7'] },
  { id: 'sbj-pjok', code: 'PJOK-SMP', name: 'Pendidikan Jasmani Olahraga Kesehatan (PJOK)', grade: 'Semua', assignedTeacherIds: ['guru-9'] },
  { id: 'sbj-seni', code: 'SBD-SMP', name: 'Seni dan Prakarya', grade: 'Semua', assignedTeacherIds: ['guru-7'] },
  { id: 'sbj-bk', code: 'BK-SMP', name: 'Bimbingan Konseling', grade: 'Semua', assignedTeacherIds: ['guru-5'] }
];

import { OFFICIAL_QUESTION_LIST, OFFICIAL_EXAM_SCHEDULES } from './officialQuestions';
import { MTK_ALL_OFFICIAL_QUESTIONS } from './mathOfficialQuestions';
import {
  GRADE_7_UPLOADED_OFFICIAL_QUESTIONS,
  GRADE_8_UPLOADED_OFFICIAL_QUESTIONS,
  OFFICIAL_EXAM_SCHEDULES_ALL
} from './officialCurriculumQuestions';

export const INITIAL_STUDENTS: Student[] = OFFICIAL_STUDENTS;

export const INITIAL_QUESTION_BANK: QuestionBank = {
  id: 'qbank-mat-7',
  subjectId: 'sbj-mat',
  subjectName: 'Matematika',
  grade: 'VII',
  title: 'Bank Soal UAS Semester Ganjil SMP Negeri 12 Banjarbaru',
  teacherId: 'guru-3',
  teacherName: 'Legiyo, S.Pd.',
  totalQuestions: OFFICIAL_QUESTION_LIST.length,
  questions: OFFICIAL_QUESTION_LIST
};

export const INITIAL_EXAMS: ExamSchedule[] = OFFICIAL_EXAM_SCHEDULES;

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Tata Tertib Ujian Akhir Semester CBT 2026/2027',
    content: 'Seluruh peserta ujian wajib hadir tepat waktu, menggunakan perangkat yang sudah lolos uji kesiapan, dan dilarang keras membuka aplikasi lain selain browser CBT. Pelanggaran 3x akan mengakibatkan ujian terkunci otomatis.',
    targetRole: 'all',
    author: 'Operator CBT SMPN 12 Banjarbaru',
    createdAt: '2026-10-24 08:00',
    priority: 'penting'
  },
  {
    id: 'ann-2',
    title: 'Jadwal Rilis Token Ujian Sesi Pagi',
    content: 'Token dinamis 6-digit berganti otomatis setiap 5 menit di dashboard guru pengawas. Mohon bapak/ibu guru menginstruksikan siswa agar tidak saling membagikan token ke luar ruang ujian.',
    targetRole: 'guru',
    author: 'Operator CBT SMPN 12 Banjarbaru',
    createdAt: '2026-10-24 07:00',
    priority: 'info'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    userRole: 'operator',
    userIdentifier: 'admin',
    action: 'JADWAL_UJIAN_DIBUAT',
    details: 'Membuat jadwal UAS Matematika Kelas VII (VII-A, VII-B)',
    ipAddress: '192.168.1.10',
    timestamp: '2026-10-24 19:30:12'
  },
  {
    id: 'log-2',
    userRole: 'guru',
    userIdentifier: '198005122006041008',
    action: 'BANK_SOAL_DIPERBARUI',
    details: 'Menambahkan 6 butir soal Matematika dengan formula KaTeX',
    ipAddress: '192.168.1.45',
    timestamp: '2026-10-24 19:45:00'
  },
  {
    id: 'log-3',
    userRole: 'operator',
    userIdentifier: 'admin',
    action: 'TOKEN_DINAMIS_AKTIF',
    details: 'Inisialisasi rotasi token 5-menitan untuk server CBT',
    ipAddress: '192.168.1.10',
    timestamp: '2026-10-24 20:00:00'
  }
];

// Initialize clean Student Exam Sessions for all official students (no false-positive active/locked states)
export const createInitialStudentSessions = (students: Student[]): StudentExamSession[] => {
  const primaryExam = INITIAL_EXAMS[0];
  const defaultDurationSeconds = (primaryExam?.durationMinutes || 90) * 60;

  return students.map((std) => ({
    id: `sess-${std.id}`,
    studentId: std.id,
    studentName: std.name,
    nis: std.nis,
    classId: std.classId,
    className: std.className,
    examId: primaryExam?.id || 'ex-mat-2026',
    examTitle: primaryExam?.title || 'Ujian Akhir Semester Ganjil',
    status: 'not_started',
    timeRemainingSeconds: defaultDurationSeconds,
    violationsCount: 0,
    isLocked: false,
    extraTimeMinutes: 0,
    deviceInfo: '-',
    deviceSessionId: undefined,
    currentQuestionIndex: 0,
    isOnline: false,
    lastHeartbeat: 0,
    answers: {},
    scorePg: 0,
    scoreEssay: 0,
    finalScore: 0,
    isPassed: false
  }));
};

/**
 * Reconciles legacy teacher/subject seed data stored in localStorage, server disk, or JSONBin
 * with the updated official SMPN 12 Banjarbaru teacher & subject database without clobbering
 * custom teachers/subjects added later by Operator.
 */
export function reconcileOfficialTeachersAndSubjects(
  loadedTeachers?: UserAccount[] | null,
  loadedSubjects?: Subject[] | null
): { teachers: UserAccount[]; subjects: Subject[]; migrated: boolean } {
  const safeTeachers = Array.isArray(loadedTeachers) && loadedTeachers.length > 0 ? loadedTeachers : INITIAL_TEACHERS;
  const safeSubjects = Array.isArray(loadedSubjects) && loadedSubjects.length > 0 ? loadedSubjects : INITIAL_SUBJECTS;

  const isLegacyTeacherSeed = safeTeachers.some(
    t =>
      (t.usernameOrNip === '197910132014061002' && t.name === 'Ahmad Fathoni') ||
      (t.usernameOrNip === '196907022000031010' && t.name === 'Legiyo') ||
      (t.usernameOrNip === '198502082009032008' && t.name === 'Dwi Setyarini')
  );

  if (!isLegacyTeacherSeed) {
    return {
      teachers: safeTeachers,
      subjects: safeSubjects,
      migrated: false,
    };
  }

  const officialIds = new Set(INITIAL_TEACHERS.map(t => t.id));
  const officialNips = new Set(INITIAL_TEACHERS.map(t => t.usernameOrNip));

  const mergedOfficialTeachers = INITIAL_TEACHERS.map(official => {
    const existing = safeTeachers.find(
      t => t.id === official.id || t.usernameOrNip === official.usernameOrNip
    );
    if (!existing) return official;
    return {
      ...official,
      password: existing.password && existing.password !== 'guru123' ? existing.password : official.password,
      mustChangePassword: existing.mustChangePassword ?? official.mustChangePassword,
    };
  });

  const customTeachers = safeTeachers.filter(
    t => !officialIds.has(t.id) && !officialNips.has(t.usernameOrNip)
  );

  const officialSubjectIds = new Set(INITIAL_SUBJECTS.map(s => s.id));
  const customSubjects = safeSubjects.filter(s => !officialSubjectIds.has(s.id));

  return {
    teachers: [...mergedOfficialTeachers, ...customTeachers],
    subjects: [...INITIAL_SUBJECTS, ...customSubjects],
    migrated: true,
  };
}

/**
 * Reconciles legacy Matematika seed questions (mtk-1..mtk-26 with grade='Semua') stored in
 * localStorage or server disk with the official 60-question Kelas VII, VIII, and IX Matematika
 * bank (20 questions per grade, 5 points each) without clobbering other subjects or custom teacher questions.
 */
export function reconcileOfficialMathQuestions(
  loadedBank?: QuestionBank | null,
  loadedExams?: ExamSchedule[] | null
): { questionBank: QuestionBank; exams: ExamSchedule[]; migrated: boolean } {
  const safeBank: QuestionBank =
    loadedBank && Array.isArray(loadedBank.questions) ? loadedBank : INITIAL_QUESTION_BANK;
  const safeExams: ExamSchedule[] =
    Array.isArray(loadedExams) && loadedExams.length > 0 ? loadedExams : INITIAL_EXAMS;

  const existingIds = new Set(safeBank.questions.map(q => q.id));
  const hasOfficialVii = existingIds.has('mtk-vii-1');
  const hasOfficialViii = existingIds.has('mtk-viii-1');
  const hasOfficialIx = existingIds.has('mtk-ix-1');

  if (hasOfficialVii && hasOfficialViii && hasOfficialIx) {
    return {
      questionBank: safeBank,
      exams: safeExams,
      migrated: false,
    };
  }

  const officialMathIds = new Set(MTK_ALL_OFFICIAL_QUESTIONS.map(q => q.id));
  const remainingQuestions = safeBank.questions.filter(q => {
    // Drop legacy generic seed math questions (mtk-1 .. mtk-26)
    if (/^mtk-\d+$/.test(q.id) && (q.subjectId === 'sbj-mat' || q.bankId === 'qbank-mat')) {
      return false;
    }
    // Deduplicate against incoming official IDs
    if (officialMathIds.has(q.id)) {
      return false;
    }
    return true;
  });

  const mergedQuestions = [...MTK_ALL_OFFICIAL_QUESTIONS, ...remainingQuestions];

  const updatedExams = safeExams.map(ex => {
    if (ex.id === 'ex-mat-2026' || (ex.subjectId === 'sbj-mat' && ex.totalQuestions === 26)) {
      return {
        ...ex,
        totalQuestions: 20,
      };
    }
    return ex;
  });

  return {
    questionBank: {
      ...safeBank,
      totalQuestions: mergedQuestions.length,
      questions: mergedQuestions,
    },
    exams: updatedExams,
    migrated: true,
  };
}

/**
 * Reconciles cached localStorage / server-disk questionBank & exams with the 5 verbatim
 * Kelas VII official banks (IPS 30, Bahasa Indonesia 30, IPA 25, Bahasa Inggris 21, PPKn 30)
 * and ensures legacy IPA/IPS/BIG seed questions are scoped to Kelas VIII & IX so they never
 * bleed into Kelas VII exams, while preserving all custom teacher questions and other subjects.
 */
export function reconcileOfficialGrade7Banks(
  loadedBank?: QuestionBank | null,
  loadedExams?: ExamSchedule[] | null
): { questionBank: QuestionBank; exams: ExamSchedule[]; migrated: boolean } {
  const safeBank: QuestionBank =
    loadedBank && Array.isArray(loadedBank.questions) ? loadedBank : INITIAL_QUESTION_BANK;
  const safeExams: ExamSchedule[] =
    Array.isArray(loadedExams) && loadedExams.length > 0 ? loadedExams : INITIAL_EXAMS;

  const existingIds = new Set(safeBank.questions.map(q => q.id));
  const hasAllGrade7Markers =
    existingIds.has('ips-vii-1') &&
    existingIds.has('bin-vii-1') &&
    existingIds.has('ipa-vii-1') &&
    existingIds.has('big-vii-1') &&
    existingIds.has('ppkn-vii-1');

  const hasLegacyUnscopedForGrade7 = safeBank.questions.some(
    q =>
      /^(ipa|ips|big)-\d+$/.test(q.id) &&
      (q.classId === 'all' || q.grade === 'Semua')
  );

  const existingExamIds = new Set(safeExams.map(e => e.id));
  const hasBinAndPpknSchedules =
    existingExamIds.has('ex-bin-2026') && existingExamIds.has('ex-ppkn-2026');

  if (hasAllGrade7Markers && !hasLegacyUnscopedForGrade7 && hasBinAndPpknSchedules) {
    return {
      questionBank: safeBank,
      exams: safeExams,
      migrated: false,
    };
  }

  const incomingIds = new Set(GRADE_7_UPLOADED_OFFICIAL_QUESTIONS.map(q => q.id));

  // Scope legacy generic IPA/IPS/BIG seed questions to Kelas VIII & IX, and deduplicate incoming IDs
  const preservedQuestions = safeBank.questions
    .filter(q => !incomingIds.has(q.id))
    .map(q => {
      if (
        /^(ipa|ips|big)-\d+$/.test(q.id) &&
        (!q.classId || q.classId === 'all' || q.grade === 'Semua')
      ) {
        return {
          ...q,
          classId: 'cls-8,cls-9',
          grade: 'VIII,IX',
        };
      }
      return q;
    });

  const mergedQuestions = [...GRADE_7_UPLOADED_OFFICIAL_QUESTIONS, ...preservedQuestions];

  // Update existing schedule counts & ensure Bahasa Indonesia + PPKn schedules exist
  const updatedExams = safeExams.map(ex => {
    if (ex.id === 'ex-ips-2026' && ex.totalQuestions === 38) {
      return { ...ex, totalQuestions: 30 };
    }
    if (ex.id === 'ex-big-2026' && ex.totalQuestions === 25) {
      return { ...ex, totalQuestions: 21 };
    }
    return ex;
  });

  const requiredNewExamIds = ['ex-bin-2026', 'ex-ppkn-2026'];
  for (const reqId of requiredNewExamIds) {
    if (!existingExamIds.has(reqId)) {
      const template = OFFICIAL_EXAM_SCHEDULES_ALL.find(e => e.id === reqId);
      if (template) {
        updatedExams.push(template);
      }
    }
  }

  return {
    questionBank: {
      ...safeBank,
      totalQuestions: mergedQuestions.length,
      questions: mergedQuestions,
    },
    exams: updatedExams,
    migrated: true,
  };
}

/**
 * Reconciles cached localStorage / server-disk questionBank & exams with the 5 verbatim
 * Kelas VIII official banks (IPS 30, Bahasa Indonesia 30, IPA 25, Bahasa Inggris 21, PPKn 30)
 * and ensures legacy generic IPA/IPS/BIG seed questions are narrowed to Kelas IX only so they
 * never bleed into Kelas VIII exams, while ensuring Bahasa Indonesia & PPKn schedules include
 * Kelas VIII-A & VIII-B and preserving all custom teacher questions and other subjects.
 */
export function reconcileOfficialGrade8Banks(
  loadedBank?: QuestionBank | null,
  loadedExams?: ExamSchedule[] | null
): { questionBank: QuestionBank; exams: ExamSchedule[]; migrated: boolean } {
  const safeBank: QuestionBank =
    loadedBank && Array.isArray(loadedBank.questions) ? loadedBank : INITIAL_QUESTION_BANK;
  const safeExams: ExamSchedule[] =
    Array.isArray(loadedExams) && loadedExams.length > 0 ? loadedExams : INITIAL_EXAMS;

  const existingIds = new Set(safeBank.questions.map(q => q.id));
  const hasAllGrade8Markers =
    existingIds.has('ips-viii-1') &&
    existingIds.has('bin-viii-1') &&
    existingIds.has('ipa-viii-1') &&
    existingIds.has('big-viii-1') &&
    existingIds.has('ppkn-viii-1');

  const hasLegacyBleedingIntoGrade8 = safeBank.questions.some(
    q =>
      /^(ipa|ips|big)-\d+$/.test(q.id) &&
      (!q.classId ||
        q.classId === 'all' ||
        q.grade === 'Semua' ||
        q.classId.includes('cls-8') ||
        (q.grade || '').split(',').some(g => g.trim().toUpperCase() === 'VIII'))
  );

  const binExam = safeExams.find(e => e.id === 'ex-bin-2026');
  const ppknExam = safeExams.find(e => e.id === 'ex-ppkn-2026');
  const hasGrade8InBinAndPpknSchedules =
    Boolean(binExam?.targetClassIds?.includes('cls-8a') && binExam?.targetClassIds?.includes('cls-8b')) &&
    Boolean(ppknExam?.targetClassIds?.includes('cls-8a') && ppknExam?.targetClassIds?.includes('cls-8b'));

  if (hasAllGrade8Markers && !hasLegacyBleedingIntoGrade8 && hasGrade8InBinAndPpknSchedules) {
    return {
      questionBank: safeBank,
      exams: safeExams,
      migrated: false,
    };
  }

  const incomingIds = new Set(GRADE_8_UPLOADED_OFFICIAL_QUESTIONS.map(q => q.id));

  // Narrow legacy generic IPA/IPS/BIG seed questions to Kelas IX only, and deduplicate incoming Grade 8 IDs
  const preservedQuestions = safeBank.questions
    .filter(q => !incomingIds.has(q.id))
    .map(q => {
      if (
        /^(ipa|ips|big)-\d+$/.test(q.id) &&
        (!q.classId ||
          q.classId === 'all' ||
          q.grade === 'Semua' ||
          q.classId.includes('cls-8') ||
          (q.grade || '').split(',').some(g => g.trim().toUpperCase() === 'VIII'))
      ) {
        return {
          ...q,
          classId: 'cls-9',
          grade: 'IX',
        };
      }
      return q;
    });

  const mergedQuestions = [...GRADE_8_UPLOADED_OFFICIAL_QUESTIONS, ...preservedQuestions];

  const ensureGrade8Classes = (ex: ExamSchedule): ExamSchedule => {
    const classIds = Array.isArray(ex.targetClassIds) ? [...ex.targetClassIds] : [];
    const classNames = Array.isArray(ex.targetClassNames) ? [...ex.targetClassNames] : [];
    let changed = false;
    if (!classIds.includes('cls-8a')) {
      classIds.push('cls-8a');
      changed = true;
    }
    if (!classIds.includes('cls-8b')) {
      classIds.push('cls-8b');
      changed = true;
    }
    if (!classNames.includes('VIII-A')) {
      classNames.push('VIII-A');
      changed = true;
    }
    if (!classNames.includes('VIII-B')) {
      classNames.push('VIII-B');
      changed = true;
    }
    return changed ? { ...ex, targetClassIds: classIds, targetClassNames: classNames } : ex;
  };

  const existingExamIds = new Set(safeExams.map(e => e.id));
  const updatedExams = safeExams.map(ex => {
    if (ex.id === 'ex-bin-2026' || ex.id === 'ex-ppkn-2026') {
      return ensureGrade8Classes(ex);
    }
    return ex;
  });

  for (const reqId of ['ex-bin-2026', 'ex-ppkn-2026']) {
    if (!existingExamIds.has(reqId)) {
      const template = OFFICIAL_EXAM_SCHEDULES_ALL.find(e => e.id === reqId);
      if (template) {
        updatedExams.push(template);
      }
    }
  }

  return {
    questionBank: {
      ...safeBank,
      totalQuestions: mergedQuestions.length,
      questions: mergedQuestions,
    },
    exams: updatedExams,
    migrated: true,
  };
}



