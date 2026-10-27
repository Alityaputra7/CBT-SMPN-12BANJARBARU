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
  allowStudentViewResult: true
};

export const INITIAL_OPERATOR: UserAccount = {
  id: 'usr-admin',
  role: 'operator',
  usernameOrNip: 'admin',
  name: 'Administrator CBT',
  email: 'admin.cbt@smpn12bjb.sch.id',
  mustChangePassword: true
};

export const INITIAL_TEACHERS: UserAccount[] = [
  {
    id: 'guru-1',
    role: 'guru',
    usernameOrNip: '197910132014061002',
    name: 'Ahmad Fathoni',
    email: 'ahmad.fathoni@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-mat', 'sbj-inf'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-2',
    role: 'guru',
    usernameOrNip: '198502082009032008',
    name: 'Dwi Setyarini',
    email: 'dwi.setyarini@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-ipa'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-3',
    role: 'guru',
    usernameOrNip: '196907022000031010',
    name: 'Legiyo',
    email: 'legiyo@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-bin'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-4',
    role: 'guru',
    usernameOrNip: '199703022022212002',
    name: 'Maulida Fitriani',
    email: 'maulida.fitriani@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-big'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-5',
    role: 'guru',
    usernameOrNip: '199103022022212006',
    name: 'Nisfi Nor Imaniar',
    email: 'nisfi.imaniar@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-pai'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-6',
    role: 'guru',
    usernameOrNip: '197006011997021006',
    name: 'Riswan Hidayat',
    email: 'riswan.hidayat@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-ips'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-7',
    role: 'guru',
    usernameOrNip: '198105082022211003',
    name: 'Setya Kariyadi',
    email: 'setya.kariyadi@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-ppkn'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-8',
    role: 'guru',
    usernameOrNip: '123456789999999999',
    name: 'Nazma Aulia',
    email: 'nazma.aulia@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-pjok'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  },
  {
    id: 'guru-9',
    role: 'guru',
    usernameOrNip: '262012931000219331',
    name: 'Alitya Putra Maulidan',
    email: 'alitya.maulidan@smpn12bjb.sch.id',
    password: 'guru123',
    mustChangePassword: false,
    assignedSubjectIds: ['sbj-seni'],
    assignedClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9']
  }
];

export const INITIAL_CLASSES: ClassRoom[] = [
  {
    id: 'cls-1',
    grade: 'VII',
    name: 'VII',
    homeroomTeacherName: 'Ahmad Fathoni',
    totalStudents: 29
  },
  {
    id: 'cls-8a',
    grade: 'VIII',
    name: 'VIII-A',
    homeroomTeacherName: 'Dwi Setyarini',
    totalStudents: 17
  },
  {
    id: 'cls-8b',
    grade: 'VIII',
    name: 'VIII-B',
    homeroomTeacherName: 'Legiyo',
    totalStudents: 17
  },
  {
    id: 'cls-9',
    grade: 'IX',
    name: 'IX',
    homeroomTeacherName: 'Riswan Hidayat',
    totalStudents: 29
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'sbj-mat', code: 'MAT-SMP', name: 'Matematika', grade: 'Semua', assignedTeacherIds: ['guru-1'] },
  { id: 'sbj-ipa', code: 'IPA-SMP', name: 'Ilmu Pengetahuan Alam (IPA)', grade: 'Semua', assignedTeacherIds: ['guru-2'] },
  { id: 'sbj-bin', code: 'BIN-SMP', name: 'Bahasa Indonesia', grade: 'Semua', assignedTeacherIds: ['guru-3'] },
  { id: 'sbj-big', code: 'BIG-SMP', name: 'Bahasa Inggris', grade: 'Semua', assignedTeacherIds: ['guru-4'] },
  { id: 'sbj-pai', code: 'PAI-SMP', name: 'Pendidikan Agama Islam', grade: 'Semua', assignedTeacherIds: ['guru-5'] },
  { id: 'sbj-ppkn', code: 'PPKN-SMP', name: 'Pendidikan Pancasila (PPKn)', grade: 'Semua', assignedTeacherIds: ['guru-7'] },
  { id: 'sbj-ips', code: 'IPS-SMP', name: 'Ilmu Pengetahuan Sosial (IPS)', grade: 'Semua', assignedTeacherIds: ['guru-6'] },
  { id: 'sbj-inf', code: 'INF-SMP', name: 'Informatika', grade: 'Semua', assignedTeacherIds: ['guru-1'] },
  { id: 'sbj-pjok', code: 'PJOK-SMP', name: 'Pendidikan Jasmani (PJOK)', grade: 'Semua', assignedTeacherIds: ['guru-8'] },
  { id: 'sbj-seni', code: 'SBD-SMP', name: 'Seni Budaya', grade: 'Semua', assignedTeacherIds: ['guru-9'] }
];

export const INITIAL_STUDENTS: Student[] = OFFICIAL_STUDENTS;

export const INITIAL_QUESTION_BANK: QuestionBank = {
  id: 'qbank-mat-7',
  subjectId: 'sbj-mat',
  subjectName: 'Matematika',
  grade: 'VII',
  title: 'Bank Soal UAS Semester Ganjil Matematika Kelas VII',
  teacherId: 'guru-1',
  teacherName: 'Ahmad Fathoni',
  totalQuestions: 7,
  questions: [
    {
      id: 'q-1',
      bankId: 'qbank-mat-7',
      number: 1,
      type: 'pg',
      prompt: 'Hitunglah nilai dari ekspresi aritmatika berikut:\n$$\\sqrt{144} + 3^2 - 5 \\times 2$$',
      points: 15,
      difficulty: 'mudah',
      options: [
        { id: 'A', text: '11' },
        { id: 'B', text: '15' },
        { id: 'C', text: '21' },
        { id: 'D', text: '25' }
      ],
      correctAnswers: ['A']
    },
    {
      id: 'q-2',
      bankId: 'qbank-mat-7',
      number: 2,
      type: 'pg_kompleks',
      prompt: 'Perhatikan relasi pertidaksamaan dan himpunan bilangan bulat berikut. Manakah pernyataan yang **BENAR**? (Pilih semua yang tepat)',
      points: 20,
      difficulty: 'sedang',
      options: [
        { id: 'A', text: 'Bilangan $-15$ lebih kecil daripada $-8$' },
        { id: 'B', text: 'Hasil perkalian $(-6) \\times (-4)$ adalah $+24$' },
        { id: 'C', text: 'FPB dari 24 dan 36 adalah 6' },
        { id: 'D', text: 'Himpunan penyelesaian $2x + 4 > 10$ adalah $x > 3$' }
      ],
      correctAnswers: ['A', 'B', 'D']
    },
    {
      id: 'q-3',
      bankId: 'qbank-mat-7',
      number: 3,
      type: 'benar_salah',
      prompt: 'Sudut siku-siku memiliki besar $90^\\circ$, dan dua sudut yang saling berpelurus (bersuplemen) memiliki jumlah besar sudut sama dengan $180^\\circ$.',
      points: 15,
      difficulty: 'mudah',
      options: [
        { id: 'BENAR', text: 'BENAR' },
        { id: 'SALAH', text: 'SALAH' }
      ],
      correctAnswers: ['BENAR']
    },
    {
      id: 'q-4',
      bankId: 'qbank-mat-7',
      number: 4,
      type: 'isian',
      prompt: 'Sebuah persegi panjang memiliki keliling $50\\text{ cm}$. Jika panjangnya adalah $15\\text{ cm}$, berapakah luas persegi panjang tersebut dalam $\\text{cm}^2$? (Tuliskan hanya angkanya)',
      points: 20,
      difficulty: 'sedang',
      options: [],
      correctAnswerText: '150'
    },
    {
      id: 'q-5',
      bankId: 'qbank-mat-7',
      number: 5,
      type: 'pg',
      prompt: 'Bentuk sederhana dari operasi aljabar berikut adalah:\n$$\\frac{3x + 9}{3} + 2(x - 4)$$',
      points: 15,
      difficulty: 'sedang',
      options: [
        { id: 'A', text: '$3x - 5$' },
        { id: 'B', text: '$3x - 1$' },
        { id: 'C', text: '$5x - 8$' },
        { id: 'D', text: '$x + 3$' }
      ],
      correctAnswers: ['A']
    },
    {
      id: 'q-6',
      bankId: 'qbank-mat-7',
      number: 6,
      type: 'uraian',
      prompt: 'Di sebuah koperasi siswa SMP Negeri 12 Banjarbaru, harga 3 buku tulis dan 2 pulpen adalah Rp17.000,00. Sedangkan harga 2 buku tulis dan 5 pulpen adalah Rp26.000,00.\na) Buatlah model matematika dalam sistem persamaan linear dua variabel (SPLDV)!\nb) Tentukan harga masing-masing 1 buku tulis dan 1 pulpen!\nc) Berapakah yang harus dibayar seorang siswa jika membeli 4 buku tulis dan 3 pulpen?',
      points: 15,
      difficulty: 'sukar',
      options: [],
      essayRubric: 'Rubrik Penilaian: (a) Model matematika benar (skor 5): 3x + 2y = 17000 dan 2x + 5y = 26000. (b) Metode eliminasi/substitusi benar (skor 5): x = Rp3.000, y = Rp4.000. (c) Perhitungan 4x + 3y = 4(3000) + 3(4000) = Rp24.000 (skor 5).'
    },
    {
      id: 'q-7',
      bankId: 'qbank-mat-7',
      number: 7,
      type: 'mencocokkan',
      prompt: 'Jodohkanlah operasi hitung matematika dan bentuk aljabar berikut dengan nilai pasangan yang tepat:',
      points: 15,
      difficulty: 'sedang',
      options: [],
      matchingPairs: [
        { id: 'p-1', leftText: '$$\\sqrt{144}$$', rightText: '12' },
        { id: 'p-2', leftText: '$$2^4$$', rightText: '16' },
        { id: 'p-3', leftText: '$$(-5) \\times (-3)$$', rightText: '15' },
        { id: 'p-4', leftText: '$$\\frac{1}{2} \\times 100$$', rightText: '50' }
      ]
    }
  ]
};

export const INITIAL_EXAMS: ExamSchedule[] = [
  {
    id: 'ex-mat-2026',
    title: 'Ujian Akhir Semester Ganjil - Matematika',
    subjectId: 'sbj-mat',
    subjectName: 'Matematika',
    targetClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9'],
    targetClassNames: ['VII', 'VIII-A', 'VIII-B', 'IX'],
    date: '2026-10-25',
    startTime: '07:30',
    endTime: '12:00',
    durationMinutes: 90,
    kkm: 75,
    randomizeQuestions: true,
    randomizeOptions: true,
    questionBankId: 'qbank-mat-7',
    status: 'ongoing',
    tokenRequired: true
  }
];

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

// Pre-seeded Student Exam Sessions to showcase the live monitor for 30 students
export const createInitialStudentSessions = (students: Student[]): StudentExamSession[] => {
  return students.map((std, idx) => {
    // Let's create realistic varied statuses
    if (idx < 5) {
      // 5 finished students
      return {
        id: `sess-${std.id}`,
        studentId: std.id,
        studentName: std.name,
        nis: std.nis,
        classId: std.classId,
        className: std.className,
        examId: 'ex-mat-2026',
        examTitle: 'Ujian Akhir Semester Ganjil - Matematika VII',
        status: 'submitted',
        startedAt: '07:35:10',
        submittedAt: '08:45:20',
        timeRemainingSeconds: 0,
        violationsCount: idx === 1 ? 1 : 0,
        isLocked: false,
        extraTimeMinutes: 0,
        deviceInfo: 'Chrome / Windows 11',
        isOnline: false,
        lastHeartbeat: Date.now() - 3600000,
        answers: {
          'q-1': { answer: 'A', isDoubtful: false, scoreObtained: 15, updatedAt: Date.now() - 4000000 },
          'q-2': { answer: ['A', 'B', 'D'], isDoubtful: false, scoreObtained: 20, updatedAt: Date.now() - 3900000 },
          'q-3': { answer: 'BENAR', isDoubtful: false, scoreObtained: 15, updatedAt: Date.now() - 3800000 },
          'q-4': { answer: '150', isDoubtful: false, scoreObtained: 20, updatedAt: Date.now() - 3700000 },
          'q-5': { answer: 'A', isDoubtful: false, scoreObtained: 15, updatedAt: Date.now() - 3650000 },
          'q-6': { answer: 'a) 3x+2y=17000, 2x+5y=26000\nb) Eliminasi didapat x=3000 (buku), y=4000 (pulpen)\nc) 4(3000)+3(4000) = 12000+12000 = Rp24.000', isDoubtful: false, scoreObtained: 15, updatedAt: Date.now() - 3600000 }
        },
        scorePg: 85,
        scoreEssay: 15,
        finalScore: 100,
        isPassed: true
      };
    } else if (idx === 5) {
      // 1 locked student due to 3 violations
      return {
        id: `sess-${std.id}`,
        studentId: std.id,
        studentName: std.name,
        nis: std.nis,
        classId: std.classId,
        className: std.className,
        examId: 'ex-mat-2026',
        examTitle: 'Ujian Akhir Semester Ganjil - Matematika VII',
        status: 'locked',
        startedAt: '07:38:00',
        timeRemainingSeconds: 2400,
        violationsCount: 3,
        isLocked: true,
        lockReason: 'Mencapai batas 3x pelanggaran (beralih jendela browser)',
        extraTimeMinutes: 0,
        deviceInfo: 'Edge / Windows 10',
        isOnline: true,
        lastHeartbeat: Date.now() - 20000,
        answers: {
          'q-1': { answer: 'A', isDoubtful: false, scoreObtained: 15, updatedAt: Date.now() - 100000 },
          'q-2': { answer: ['A'], isDoubtful: true, scoreObtained: 0, updatedAt: Date.now() - 50000 }
        },
        scorePg: 15,
        scoreEssay: 0,
        finalScore: 15,
        isPassed: false
      };
    } else if (idx < 20) {
      // In progress online students
      return {
        id: `sess-${std.id}`,
        studentId: std.id,
        studentName: std.name,
        nis: std.nis,
        classId: std.classId,
        className: std.className,
        examId: 'ex-mat-2026',
        examTitle: 'Ujian Akhir Semester Ganjil - Matematika VII',
        status: 'in_progress',
        startedAt: '07:40:00',
        timeRemainingSeconds: 3120 - (idx * 50),
        violationsCount: idx === 8 ? 2 : (idx === 12 ? 1 : 0),
        isLocked: false,
        extraTimeMinutes: 0,
        deviceInfo: idx % 2 === 0 ? 'Chrome / ChromeOS' : 'Firefox / Android Tablet',
        isOnline: true,
        lastHeartbeat: Date.now() - (idx * 3000),
        answers: {
          'q-1': { answer: 'A', isDoubtful: false, scoreObtained: 15, updatedAt: Date.now() - 200000 },
          'q-2': { answer: ['A', 'B'], isDoubtful: idx % 3 === 0, scoreObtained: 0, updatedAt: Date.now() - 150000 },
          'q-3': { answer: 'BENAR', isDoubtful: false, scoreObtained: 15, updatedAt: Date.now() - 80000 }
        },
        scorePg: 30,
        scoreEssay: 0,
        finalScore: 30,
        isPassed: false
      };
    } else {
      // Not yet started
      return {
        id: `sess-${std.id}`,
        studentId: std.id,
        studentName: std.name,
        nis: std.nis,
        classId: std.classId,
        className: std.className,
        examId: 'ex-mat-2026',
        examTitle: 'Ujian Akhir Semester Ganjil - Matematika VII',
        status: 'not_started',
        timeRemainingSeconds: 5400,
        violationsCount: 0,
        isLocked: false,
        extraTimeMinutes: 0,
        deviceInfo: '-',
        isOnline: false,
        lastHeartbeat: 0,
        answers: {},
        scorePg: 0,
        scoreEssay: 0,
        finalScore: 0,
        isPassed: false
      };
    }
  });
};
