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
 * Checks whether a question matches a student's class.
 * Strictly prevents questions from different classes from bleeding into each other.
 * VIII-A and VIII-B students automatically match questions designated for Kelas VIII ('cls-8', 'VIII', 'cls-8a', 'cls-8b').
 */
export const isQuestionMatchingClass = (
  questionClassId: string | undefined,
  questionGrade: string | undefined,
  studentClassId: string
): boolean => {
  if (!studentClassId) return false;

  // Student in Kelas VIII (VIII-A or VIII-B)
  if (
    studentClassId === 'cls-8' || 
    studentClassId === 'cls-8a' || 
    studentClassId === 'cls-8b' || 
    studentClassId === 'VIII'
  ) {
    return (
      questionClassId === 'cls-8' ||
      questionClassId === 'cls-8a' ||
      questionClassId === 'cls-8b' ||
      questionGrade === 'VIII'
    );
  }

  // Student in Kelas VII
  if (studentClassId === 'cls-1' || studentClassId === 'VII') {
    return (
      questionClassId === 'cls-1' ||
      questionGrade === 'VII'
    );
  }

  // Student in Kelas IX
  if (studentClassId === 'cls-9' || studentClassId === 'IX') {
    return (
      questionClassId === 'cls-9' ||
      questionGrade === 'IX'
    );
  }

  return questionClassId === studentClassId;
};

/**
 * Checks whether an exam schedule applies to a student's class.
 */
export const isExamMatchingStudentClass = (
  exam: { targetClassIds?: string[]; targetClassNames?: string[] },
  studentClassId: string,
  studentClassName?: string
): boolean => {
  if (!exam.targetClassIds || exam.targetClassIds.length === 0) return true;
  if (exam.targetClassIds.includes('all')) return true;
  if (exam.targetClassIds.includes(studentClassId)) return true;

  // Student in Kelas VIII (cls-8a or cls-8b)
  if (
    (studentClassId === 'cls-8a' || studentClassId === 'cls-8b' || studentClassId === 'cls-8') &&
    (exam.targetClassIds.includes('cls-8') || exam.targetClassIds.includes('cls-8a') || exam.targetClassIds.includes('cls-8b'))
  ) {
    return true;
  }

  // Fallback by class name match (e.g. "VII", "VIII-A", "VIII-B", "IX")
  if (studentClassName && exam.targetClassNames && Array.isArray(exam.targetClassNames)) {
    const sName = studentClassName.toUpperCase().trim();
    return exam.targetClassNames.some(t => {
      const tn = t.toUpperCase().trim();
      if (tn === sName) return true;
      if (sName.startsWith('VIII') && (tn === 'VIII' || tn.startsWith('VIII'))) return true;
      return false;
    });
  }

  return false;
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
