import { Question } from '../types/cbt';

/**
 * Bank Soal Resmi PAS Ganjil Bahasa Inggris Kelas VII (SMP Negeri 12 Banjarbaru)
 * 100% verbatim dari dokumen: KELAS 7 b inggris.pdf
 * Pedoman penskoran resmi:
 * - Part A: 15 Complex Multiple Choice (Q1–Q15) × 5 poin = 75 poin
 * - Part B: 5 Multi-Statement True/False (B-1–B-5) × 3 poin = 15 poin
 * - Part C: 1 Matching (5 premises × 2 poin) = 10 poin
 * Total = 21 soal, 100 poin.
 */
export const BIG_KELAS_7_QUESTIONS: Question[] = [
  // =========================================================================
  // PART A. COMPLEX MULTIPLE CHOICE (15 QUESTIONS) — 5 POIN PER SOAL
  // =========================================================================
  {
    id: 'big-vii-1',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 1,
    points: 5,
    difficulty: 'mudah',
    prompt: `At 7.00 a.m. at the school gate.
Mr. Arman: Good morning, Dina.
Dina: Good morning, Sir. How are you?
Mr. Arman: I’m fine, thank you. And you?
Dina: ______

Which expressions are appropriate to complete Dina’s reply?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Good night, Sir.' },
      { id: 'B', text: 'I’m fine, thank you.' },
      { id: 'C', text: 'I’m very well, Sir.' },
      { id: 'D', text: 'See you tomorrow, Sir.' },
      { id: 'E', text: 'Not bad, thank you.' }
    ],
    correctAnswers: ['B', 'C', 'E']
  },
  {
    id: 'big-vii-2',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 2,
    points: 5,
    difficulty: 'mudah',
    prompt: `At 5.00 p.m., Rina and Tono finish studying together in the library. Rina has to go home first.

Which expressions can Rina use to say goodbye to Tono?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Good morning, Tono.' },
      { id: 'B', text: 'Goodbye, Tono.' },
      { id: 'C', text: 'Nice to meet you.' },
      { id: 'D', text: 'I have to go now. See you tomorrow.' }
    ],
    correctAnswers: ['B', 'D']
  },
  {
    id: 'big-vii-3',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 3,
    points: 5,
    difficulty: 'mudah',
    prompt: `Hello, everyone. My name is Salsa Putri. I am twelve years old. I live at Jalan Melati Number 5, Banjarbaru. My hobby is drawing.

Which statements match the text?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Salsa is twelve years old.' },
      { id: 'B', text: 'Salsa’s hobby is singing.' },
      { id: 'C', text: 'Salsa lives in Jakarta.' },
      { id: 'D', text: 'Salsa’s address is Jalan Melati Number 5.' }
    ],
    correctAnswers: ['A', 'D']
  },
  {
    id: 'big-vii-4',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 4,
    points: 5,
    difficulty: 'sedang',
    prompt: `Student Data Card
- Name : Budi Santoso
- Age : 13
- Address : Jalan Merdeka 12, Martapura
- Hobby : Reading
- Class : VII B

Which self-introduction sentences match the data card?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'My name is Budi Santoso.' },
      { id: 'B', text: 'I am thirteen years old.' },
      { id: 'C', text: 'I live at Jalan Merdeka 12, Martapura.' },
      { id: 'D', text: 'My hobby is swimming.' },
      { id: 'E', text: 'I am in class VII A.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'big-vii-5',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 5,
    points: 5,
    difficulty: 'sedang',
    prompt: `Rani: Dimas, this is my friend, Kevin. Kevin, this is Dimas.
Dimas: Nice to meet you, Kevin.
Kevin: ______

Which responses are appropriate for Kevin to say?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Nice to meet you, too.' },
      { id: 'B', text: 'Pleased to meet you, Dimas.' },
      { id: 'C', text: 'Goodbye, Dimas.' },
      { id: 'D', text: 'I’m fine, thank you.' },
      { id: 'E', text: 'Glad to meet you, Dimas.' }
    ],
    correctAnswers: ['A', 'B', 'E']
  },
  {
    id: 'big-vii-6',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 6,
    points: 5,
    difficulty: 'sedang',
    prompt: `This is my friend, Nadia. She is thirteen years old. She is from Banjarmasin. Her hobby is dancing. She is a student at SMP Negeri 2.

Which sentences use pronouns and possessive words correctly to talk about Nadia?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'She is thirteen years old.' },
      { id: 'B', text: 'He is from Banjarmasin.' },
      { id: 'C', text: 'Her hobby is dancing.' },
      { id: 'D', text: 'His name is Nadia.' },
      { id: 'E', text: 'She is a student at SMP Negeri 2.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'big-vii-7',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 7,
    points: 5,
    difficulty: 'sedang',
    prompt: `Some expressions that are often used in the classroom:
1. “May I come in, Ma’am?”
2. “Could you repeat that, please?”
3. “Be quiet, please.”
4. “Please open your book.”

Which statements about the functions of these expressions are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Expression 1 is used by a late student to ask permission to enter the class.' },
      { id: 'B', text: 'Expression 4 is used by a student to ask the teacher for help.' },
      { id: 'C', text: 'Expression 2 is used to ask the teacher to explain something again.' },
      { id: 'D', text: 'Expression 3 is an instruction given by a teacher to make students quiet.' },
      { id: 'E', text: 'Expression 1 is an instruction from a teacher to students.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'big-vii-8',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 8,
    points: 5,
    difficulty: 'sedang',
    prompt: `Teacher: Open your book to page 25 and read the text silently.
Aldo: Excuse me, Ma’am. I forgot my book. Can I share with Sinta?
Teacher: Yes, you can.
Sinta: Sure, Aldo. Come here.

Which statements match the dialogue?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'The teacher gives an instruction.' },
      { id: 'B', text: 'Aldo asks permission to leave the class.' },
      { id: 'C', text: 'Aldo asks permission to share a book with Sinta.' },
      { id: 'D', text: 'The students must read the text aloud.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'big-vii-9',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 9,
    points: 5,
    difficulty: 'sedang',
    prompt: `Number of Students in Grade 7
- VII A : 32
- VII B : 30
- VII C : 31

Which statements are correct based on the table?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'VII B has thirteen students.' },
      { id: 'B', text: 'VII A has thirty-two students.' },
      { id: 'C', text: 'The total number of students is ninety-four.' },
      { id: 'D', text: 'VII C has thirty-one students.' },
      { id: 'E', text: 'The total number of students is ninety-three.' }
    ],
    correctAnswers: ['B', 'D', 'E']
  },
  {
    id: 'big-vii-10',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 10,
    points: 5,
    difficulty: 'sedang',
    prompt: `English Lesson Schedule, Class VII C
Day: Tuesday | Time: 09.15–10.45

Which statements about how to say these times in English are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: '09.15 is “a quarter past nine”.' },
      { id: 'B', text: '10.45 is “a quarter past ten”.' },
      { id: 'C', text: '10.45 is “a quarter to eleven”.' },
      { id: 'D', text: '09.15 is “half past nine”.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'big-vii-11',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 11,
    points: 5,
    difficulty: 'sukar',
    prompt: `Birthdays of Three Friends
- Ana : 3 March
- Doni : 1 January
- Rudi : 22 August

Which statements are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: '3 March is read “the third of March”.' },
      { id: 'B', text: '22 August is read “the twenty-second of August”.' },
      { id: 'C', text: '1 January is read “the one of January”.' },
      { id: 'D', text: 'The order of the birthdays from the earliest to the latest in a year is Doni, Ana, Rudi.' },
      { id: 'E', text: 'Rudi’s birthday comes before Ana’s in a year.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'big-vii-12',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 12,
    points: 5,
    difficulty: 'mudah',
    prompt: `Dewi opens her pencil case. In it, there are a red pen, two blue pencils, a long yellow ruler, and a small white eraser.

Which statements match the text?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Dewi has two blue pencils.' },
      { id: 'B', text: 'Dewi has a red pen.' },
      { id: 'C', text: 'The ruler is red.' },
      { id: 'D', text: 'The eraser is black.' },
      { id: 'E', text: 'The ruler is yellow.' }
    ],
    correctAnswers: ['A', 'B', 'E']
  },
  {
    id: 'big-vii-13',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 13,
    points: 5,
    difficulty: 'sedang',
    prompt: `My name is Rafi. My father is Mr. Hasan and my mother is Mrs. Laila. I have one sister, Nisa, and one brother, Dika. My grandfather is Grandpa Umar, my father’s father. Uncle Joko is my father’s brother. His daughter is Sinta.

Which statements are correct based on the text?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Dika is Rafi’s cousin.' },
      { id: 'B', text: 'Nisa is Rafi’s sister.' },
      { id: 'C', text: 'Sinta is Rafi’s cousin.' },
      { id: 'D', text: 'Uncle Joko is Rafi’s mother’s brother.' },
      { id: 'E', text: 'Grandpa Umar is Rafi’s grandfather.' }
    ],
    correctAnswers: ['B', 'C', 'E']
  },
  {
    id: 'big-vii-14',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 14,
    points: 5,
    difficulty: 'sedang',
    prompt: `I am Maya. I get up at half past five every morning. Then I take a bath and have breakfast at a quarter past six. I go to school by bike at half past six. School starts at seven o’clock and finishes at half past one in the afternoon. I do my homework at four o’clock and go to bed at nine o’clock at night.

Which statements are correct based on the text?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Maya has breakfast before she takes a bath.' },
      { id: 'B', text: 'Maya gets up at half past five.' },
      { id: 'C', text: 'Maya does her homework in the morning.' },
      { id: 'D', text: 'Maya goes to school by bike.' },
      { id: 'E', text: 'Maya goes to bed at six o’clock.' }
    ],
    correctAnswers: ['B', 'D']
  },
  {
    id: 'big-vii-15',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 15,
    points: 5,
    difficulty: 'sukar',
    prompt: `Bima’s school starts at 7.15 a.m. He wants to arrive at school 10 minutes before school starts. He needs 30 minutes to ride his bike to school, 20 minutes to have breakfast, and 15 minutes to take a bath. Every morning he gets up, takes a bath, has breakfast, and then leaves for school. He has no other activities in the morning.

Which statements are correct based on reasoning from the text?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Bima must leave home at 6.35 a.m.' },
      { id: 'B', text: 'Bima must get up at a quarter past six.' },
      { id: 'C', text: 'Bima must start breakfast at 6.15 a.m.' },
      { id: 'D', text: 'Bima arrives at school at 7.15 a.m.' },
      { id: 'E', text: 'Bima must get up at six o’clock at the latest.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },

  // =========================================================================
  // PART B. TRUE / FALSE (5 QUESTIONS, 5 STATEMENTS EACH) — 3 POIN PER SOAL
  // =========================================================================
  {
    id: 'big-vii-16',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'benar_salah',
    number: 16,
    points: 3,
    difficulty: 'mudah',
    prompt: `Part B – Question B-1
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Dialogue 1 (7.00 a.m., at the school gate)
Fajar: Good morning, Lina.
Lina: Good morning, Fajar. How are you?
Fajar: I’m fine, thanks. And you?
Lina: I’m great.

Dialogue 2 (1.30 p.m., in front of the classroom)
Fajar: I have to go home now. Goodbye, Lina.
Lina: Bye, Fajar. See you tomorrow.`,
    options: [],
    statements: [
      { id: 'b1-s1', text: 'Fajar and Lina meet in the morning in Dialogue 1.', correctAnswer: 'BENAR' },
      { id: 'b1-s2', text: '“How are you?” is used to say goodbye.', correctAnswer: 'SALAH' },
      { id: 'b1-s3', text: '“I’m fine, thanks.” is a response to “How are you?”', correctAnswer: 'BENAR' },
      { id: 'b1-s4', text: '“See you tomorrow.” is used to greet someone at the beginning of a meeting.', correctAnswer: 'SALAH' },
      { id: 'b1-s5', text: 'Fajar and Lina say goodbye in the afternoon.', correctAnswer: 'BENAR' }
    ]
  },
  {
    id: 'big-vii-17',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'benar_salah',
    number: 17,
    points: 3,
    difficulty: 'mudah',
    prompt: `Part B – Question B-2
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Hi, I’m Kayla. I’m twelve years old and I live at Jalan Kenanga 7. My hobby is baking. This is my best friend, Wulan. She is thirteen years old. Her hobby is playing badminton. We are classmates in VII C.`,
    options: [],
    statements: [
      { id: 'b2-s1', text: 'Kayla is thirteen years old.', correctAnswer: 'SALAH' },
      { id: 'b2-s2', text: 'Kayla’s hobby is baking.', correctAnswer: 'BENAR' },
      { id: 'b2-s3', text: '“This is my best friend, Wulan.” is an expression to introduce someone.', correctAnswer: 'BENAR' },
      { id: 'b2-s4', text: 'Wulan is older than Kayla.', correctAnswer: 'BENAR' },
      { id: 'b2-s5', text: 'Kayla and Wulan are in different classes.', correctAnswer: 'SALAH' }
    ]
  },
  {
    id: 'big-vii-18',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'benar_salah',
    number: 18,
    points: 3,
    difficulty: 'sedang',
    prompt: `Part B – Question B-3
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Look at my classroom. There is a green board on the wall and a round clock above it. There are four big windows on the left side. There are thirty brown chairs and fifteen yellow tables. Every table has two chairs. The teacher says, “Please take out your notebook.”`,
    options: [],
    statements: [
      { id: 'b3-s1', text: 'The board is green.', correctAnswer: 'BENAR' },
      { id: 'b3-s2', text: 'There are three big windows in the classroom.', correctAnswer: 'SALAH' },
      { id: 'b3-s3', text: 'There are thirty brown chairs.', correctAnswer: 'BENAR' },
      { id: 'b3-s4', text: 'Fifteen tables are enough for thirty students because every table has two chairs.', correctAnswer: 'BENAR' },
      { id: 'b3-s5', text: '“Please take out your notebook.” is an expression to ask permission.', correctAnswer: 'SALAH' }
    ]
  },
  {
    id: 'big-vii-19',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'benar_salah',
    number: 19,
    points: 3,
    difficulty: 'sedang',
    prompt: `Part B – Question B-4
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Siti’s father is Mr. Anwar. He is an engineer. Her mother is Mrs. Rina. She is a nurse. Siti has an older brother, Bagas, and a younger sister, Mira. Mr. Anwar’s mother, Grandma Fatimah, lives with them.`,
    options: [],
    statements: [
      { id: 'b4-s1', text: 'Mr. Anwar is Siti’s father.', correctAnswer: 'BENAR' },
      { id: 'b4-s2', text: 'Mrs. Rina is Siti’s aunt.', correctAnswer: 'SALAH' },
      { id: 'b4-s3', text: 'Mira is Siti’s younger sister.', correctAnswer: 'BENAR' },
      { id: 'b4-s4', text: 'Grandma Fatimah is Siti’s mother’s mother.', correctAnswer: 'SALAH' },
      { id: 'b4-s5', text: 'Siti has two siblings.', correctAnswer: 'BENAR' }
    ]
  },
  {
    id: 'big-vii-20',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'benar_salah',
    number: 20,
    points: 3,
    difficulty: 'sedang',
    prompt: `Part B – Question B-5
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Dani’s Activities on Saturday
- 06.00 : Gets up
- 06.30 : Goes jogging
- 08.00 : Has breakfast
- 09.00 : Helps his mother at home
- 11.30 : Cleans his room
- 14.00 : Plays football with his friends
- 19.00 : Studies`,
    options: [],
    statements: [
      { id: 'b5-s1', text: 'Dani goes jogging half an hour after he gets up.', correctAnswer: 'BENAR' },
      { id: 'b5-s2', text: 'Dani has breakfast at a quarter past eight.', correctAnswer: 'SALAH' },
      { id: 'b5-s3', text: 'There are two and a half hours between helping his mother and cleaning his room.', correctAnswer: 'BENAR' },
      { id: 'b5-s4', text: 'Dani plays football in the morning.', correctAnswer: 'SALAH' },
      { id: 'b5-s5', text: 'Dani studies five hours after he starts playing football.', correctAnswer: 'BENAR' }
    ]
  },

  // =========================================================================
  // PART C. MATCHING (5 PREMISES × 2 POIN = 10 POIN)
  // =========================================================================
  {
    id: 'big-vii-21',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    type: 'mencocokkan',
    number: 21,
    points: 10,
    difficulty: 'sedang',
    prompt: `Part C. Matching (5 questions)
Instructions: Match each situation (premise) in the left column with the most appropriate expression in the right column. There are more answer choices than premises, and each choice can be used only once.
(Jodohkan situasi di kolom kiri dengan ekspresi yang paling sesuai di kolom kanan.)`,
    options: [],
    matchingPairs: [
      {
        id: 'big-vii-21-p1',
        leftText: '1. You meet your homeroom teacher at the school gate at 6.45 a.m. You greet him or her with: ………',
        rightText: 'b. Good morning, Sir.'
      },
      {
        id: 'big-vii-21-p2',
        leftText: '2. A new friend says to you, “Nice to meet you.” You answer: ………',
        rightText: 'd. Nice to meet you, too.'
      },
      {
        id: 'big-vii-21-p3',
        leftText: '3. You want to introduce your friend Rudi to your mother. You say: ………',
        rightText: 'a. Mom, this is my friend, Rudi.'
      },
      {
        id: 'big-vii-21-p4',
        leftText: '4. You do not understand the teacher’s assignment and want to ask for help. You say: ………',
        rightText: 'e. Excuse me, Ma’am. Could you help me, please?'
      },
      {
        id: 'big-vii-21-p5',
        leftText: '5. You want to know the name of the student sitting next to you. You ask: ………',
        rightText: 'f. What’s your name?'
      }
    ],
    matchingRightOptions: [
      'a. Mom, this is my friend, Rudi.',
      'b. Good morning, Sir.',
      'c. See you tomorrow, Sir.',
      'd. Nice to meet you, too.',
      'e. Excuse me, Ma’am. Could you help me, please?',
      'f. What’s your name?',
      'g. Please open your book on page ten.'
    ],
    essayRubric: `1→b (6.45 a.m. is morning, so the correct greeting to a teacher is Good morning, Sir.)
2→d (The response to Nice to meet you is Nice to meet you, too.)
3→a (The expression for introducing someone is ..., this is my friend, ...)
4→e (A polite expression for asking for help is Excuse me, Ma'am. Could you help me, please?)
5→f (To ask for someone's identity/name, use What's your name?)`
  }
];
