export type UserRole = 'operator' | 'guru' | 'siswa';

export type Gender = 'L' | 'P';

export type QuestionType = 'pg' | 'pg_kompleks' | 'benar_salah' | 'isian' | 'uraian' | 'mencocokkan';

export type ExamStatus = 'draft' | 'scheduled' | 'ongoing' | 'finished';

export type StudentExamStatus = 'not_started' | 'in_progress' | 'submitted' | 'force_submitted' | 'locked';

export type ViolationType = 
  | 'tab_switch' 
  | 'exit_fullscreen' 
  | 'blur_loss' 
  | 'devtools_or_shortcut' 
  | 'context_menu' 
  | 'copy_paste';

export interface SchoolSetting {
  id: string;
  name: string;
  npsn: string;
  address: string;
  academicYear: string;
  semester: 'Ganjil' | 'Genap';
  maxViolations: number;
  sebStrictMode: boolean;
  sebConfigKey: string;
  logoUrl?: string;
  allowStudentViewResult: boolean;
  principalTitle?: string;
  principalName?: string;
  principalNip?: string;
  cbtCoordinatorName?: string;
  cbtCoordinatorNip?: string;
}

export interface UserAccount {
  id: string;
  role: 'operator' | 'guru';
  usernameOrNip: string;
  name: string;
  email?: string;
  password?: string;
  mustChangePassword?: boolean;
  assignedSubjectIds?: string[];
  assignedClassIds?: string[];
}

export interface Student {
  id: string;
  nis: string;
  name: string;
  classId: string;
  className: string;
  gender: Gender;
  birthDate?: string;
  roomNumber?: string;
  seatNumber?: string;
}

export interface ClassRoom {
  id: string;
  grade: 'VII' | 'VIII' | 'IX';
  name: string;
  homeroomTeacherName: string;
  totalStudents: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  grade: 'VII' | 'VIII' | 'IX' | 'Semua';
  assignedTeacherIds?: string[];
}

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D', 'E'
  text: string;
  imageUrl?: string;
  isCorrect?: boolean;
}

export interface MatchingPair {
  id: string;
  leftText: string;
  rightText: string;
  leftImageUrl?: string;
  rightImageUrl?: string;
}

export interface Question {
  id: string;
  bankId: string;
  subjectId?: string;
  classId?: string;
  grade?: string;
  number: number;
  type: QuestionType;
  prompt: string;
  imageUrl?: string;
  options: QuestionOption[];
  matchingPairs?: MatchingPair[];
  correctAnswers?: string[]; // for pg, pg_kompleks ('A', 'C'), or benar_salah ('true'/'false')
  correctAnswerText?: string; // for isian singkat (e.g. "45")
  essayRubric?: string;
  points: number;
  difficulty?: 'mudah' | 'sedang' | 'sukar';
}

export interface QuestionBank {
  id: string;
  subjectId: string;
  subjectName: string;
  grade: 'VII' | 'VIII' | 'IX';
  title: string;
  teacherId: string;
  teacherName: string;
  totalQuestions: number;
  questions: Question[];
}

export interface ExamSchedule {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  targetClassIds: string[];
  targetClassNames: string[];
  date: string;
  startTime: string; // "07:30"
  endTime: string;   // "09:30"
  durationMinutes: number;
  kkm: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  questionBankId: string;
  totalQuestions?: number;
  status: ExamStatus;
  tokenRequired: boolean;
}

export interface DynamicToken {
  id: string;
  examId?: string;
  classId?: string;
  tokenCode: string;
  generatedAt: number;
  expiresAt: number; // 5 minutes duration
}

export interface StudentExamSession {
  id: string;
  studentId: string;
  studentName: string;
  nis: string;
  classId: string;
  className: string;
  examId: string;
  examTitle: string;
  status: StudentExamStatus;
  startedAt?: string;
  submittedAt?: string;
  timeRemainingSeconds: number;
  violationsCount: number;
  isLocked: boolean;
  lockReason?: string;
  extraTimeMinutes: number;
  deviceInfo: string;
  isOnline: boolean;
  lastHeartbeat: number;
  answers: Record<string, {
    answer: string | string[];
    isDoubtful: boolean; // ragu-ragu
    scoreObtained?: number;
    updatedAt: number;
  } | undefined>;
  scorePg: number;
  scoreEssay: number;
  finalScore: number;
  isPassed: boolean;
}

export interface ExamViolationLog {
  id: string;
  studentId: string;
  studentName: string;
  nis: string;
  examId: string;
  examTitle: string;
  type: ViolationType;
  description: string;
  timestamp: string;
  actionTaken: string;
}

export interface AuditLog {
  id: string;
  userRole: UserRole;
  userIdentifier: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole: 'all' | 'guru' | 'siswa';
  author: string;
  createdAt: string;
  priority: 'info' | 'penting' | 'peringatan';
}
