export interface ClassGroupOption {
  id: string; // 'cls-1', 'cls-8', 'cls-9'
  name: string;
  grade: 'VII' | 'VIII' | 'IX';
  badgeLabel: string;
  description: string;
  memberClassIds: string[];
}

export const QUESTION_CLASS_GROUPS: ClassGroupOption[] = [
  {
    id: 'cls-1',
    name: 'Kelas VII',
    grade: 'VII',
    badgeLabel: 'Kelas VII',
    description: 'Rombel Kelas VII',
    memberClassIds: ['cls-1']
  },
  {
    id: 'cls-8',
    name: 'Kelas VIII (VIII-A & VIII-B)',
    grade: 'VIII',
    badgeLabel: 'Kelas VIII (Gabungan A & B)',
    description: 'Gabungan VIII-A & VIII-B (cukup 1x upload)',
    memberClassIds: ['cls-8', 'cls-8a', 'cls-8b']
  },
  {
    id: 'cls-9',
    name: 'Kelas IX',
    grade: 'IX',
    badgeLabel: 'Kelas IX',
    description: 'Rombel Kelas IX',
    memberClassIds: ['cls-9']
  }
];

/**
 * Checks whether a question matches a selected class filter or a student's class.
 * VIII-A and VIII-B students automatically match questions designated for Kelas VIII ('cls-8', 'VIII', 'cls-8a', 'cls-8b').
 */
export const isQuestionMatchingClass = (
  questionClassId: string | undefined,
  questionGrade: string | undefined,
  filterOrStudentClassId: string
): boolean => {
  if (!filterOrStudentClassId || filterOrStudentClassId === 'all') return true;

  // If question doesn't specify class, it applies to all classes
  if (!questionClassId && !questionGrade) return true;

  // Target: Kelas VIII group or student in VIII-A / VIII-B
  if (
    filterOrStudentClassId === 'cls-8' || 
    filterOrStudentClassId === 'VIII' || 
    filterOrStudentClassId === 'cls-8a' || 
    filterOrStudentClassId === 'cls-8b'
  ) {
    return (
      questionClassId === 'cls-8' ||
      questionClassId === 'cls-8a' ||
      questionClassId === 'cls-8b' ||
      questionClassId === 'all' ||
      questionGrade === 'VIII' ||
      !questionClassId
    );
  }

  // Target: Kelas VII
  if (filterOrStudentClassId === 'cls-1' || filterOrStudentClassId === 'VII') {
    return (
      questionClassId === 'cls-1' ||
      questionClassId === 'all' ||
      questionGrade === 'VII' ||
      !questionClassId
    );
  }

  // Target: Kelas IX
  if (filterOrStudentClassId === 'cls-9' || filterOrStudentClassId === 'IX') {
    return (
      questionClassId === 'cls-9' ||
      questionClassId === 'all' ||
      questionGrade === 'IX' ||
      !questionClassId
    );
  }

  return questionClassId === filterOrStudentClassId || questionClassId === 'all';
};

/**
 * Returns formatted label for question's assigned class
 */
export const getQuestionClassLabel = (classId?: string, grade?: string): string => {
  if (classId === 'cls-8' || classId === 'cls-8a' || classId === 'cls-8b' || grade === 'VIII') {
    return 'Kelas VIII (A & B)';
  }
  if (classId === 'cls-1' || grade === 'VII') {
    return 'Kelas VII';
  }
  if (classId === 'cls-9' || grade === 'IX') {
    return 'Kelas IX';
  }
  return 'Semua Kelas';
};
