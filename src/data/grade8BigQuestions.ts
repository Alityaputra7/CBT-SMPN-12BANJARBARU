import { Question } from '../types/cbt';

/**
 * Bank Soal Resmi PAS Ganjil Bahasa Inggris Kelas VIII (SMP Negeri 12 Banjarbaru)
 * 100% verbatim dari dokumen: KELAS_8_SOAL_inggris_1e96073c.pdf
 * Pedoman penskoran resmi:
 * - Part A: 15 Complex Multiple Choice (Q1–Q15) × 5 poin = 75 poin
 * - Part B: 5 Multi-Statement True/False (B-1–B-5) × 3 poin = 15 poin
 * - Part C: 1 Matching (5 premises × 2 poin) = 10 poin
 * Total = 21 soal (25 item penilaian), 100 poin.
 */
export const BIG_KELAS_8_QUESTIONS: Question[] = [
  // =========================================================================
  // PART A. COMPLEX MULTIPLE CHOICE (15 QUESTIONS) — 5 POIN PER SOAL
  // =========================================================================
  {
    id: 'big-viii-1',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 1,
    points: 5,
    difficulty: 'mudah',
    prompt: `Dina and her sister are at the library. They are reading books. Dina’s brother is at home. He is playing games.

Which sentences are grammatically correct and match the text?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'Dina and her sister are at the library.' },
      { id: 'B', text: 'Dina’s brother am at home.' },
      { id: 'C', text: 'He is playing games.' },
      { id: 'D', text: 'They is reading books.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'big-viii-2',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 2,
    points: 5,
    difficulty: 'mudah',
    prompt: `Mr. Budi is a farmer. He wakes up at 4.30 a.m. and feeds his cows. His wife cooks breakfast. They eat together at six o’clock.

Which sentences use the simple present tense correctly?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'Mr. Budi wakes up at 4.30 a.m.' },
      { id: 'B', text: 'His wife cook breakfast.' },
      { id: 'C', text: 'They eat together at six o’clock.' },
      { id: 'D', text: 'He feed his cows.' },
      { id: 'E', text: 'Mr. Budi is a farmer.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'big-viii-3',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 3,
    points: 5,
    difficulty: 'mudah',
    prompt: `Yesterday, I (go) to the market with my mother. We (buy) vegetables and fruit. Then we (visit) my grandmother.

Which past forms are correct for the verbs in brackets?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'buy → buyed' },
      { id: 'B', text: 'go → went' },
      { id: 'C', text: 'visit → visited' },
      { id: 'D', text: 'buy → bought' },
      { id: 'E', text: 'go → goed' }
    ],
    correctAnswers: ['B', 'C', 'D']
  },
  {
    id: 'big-viii-4',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 4,
    points: 5,
    difficulty: 'sedang',
    prompt: `Today is Friday. This is Rita’s diary.

Day | Activity
- Thursday : Play badminton
- Wednesday : Clean her room
- Last Sunday : Visit her aunt

Which sentences are correct based on the diary?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'Rita cleans her room two days ago.' },
      { id: 'B', text: 'Rita played badminton yesterday.' },
      { id: 'C', text: 'Rita visits her aunt last Sunday.' },
      { id: 'D', text: 'Rita cleaned her room two days ago.' },
      { id: 'E', text: 'Rita visited her aunt last Sunday.' }
    ],
    correctAnswers: ['B', 'D', 'E']
  },
  {
    id: 'big-viii-5',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 5,
    points: 5,
    difficulty: 'sedang',
    prompt: `Last holiday, my family visited Mount Bromo. We left home at 2 a.m. and arrived at the viewpoint at 4 a.m. First, we watched the sunrise. Then we rode horses across the sand sea. After that, we climbed the stairs to the crater. Finally, we went home in the afternoon. It was tiring but exciting.

Which statements about the text are correct?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'The text describes the features of Mount Bromo without telling any events.' },
      { id: 'B', text: 'The text is a recount text.' },
      { id: 'C', text: 'The events are arranged in chronological order.' },
      { id: 'D', text: 'The text invites readers to join a trip.' },
      { id: 'E', text: 'First, then, after that, and finally are sequence words.' }
    ],
    correctAnswers: ['B', 'C', 'E']
  },
  {
    id: 'big-viii-6',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 6,
    points: 5,
    difficulty: 'sedang',
    prompt: `Last Friday, our class held a cleaning day at school. At 7 a.m., Mr. Hadi divided us into four groups. My group swept the yard and planted flowers. Another group cleaned the windows. At 10 a.m., we rested and had some snacks. Our school looked clean and beautiful.

Which statements match the text?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'Mr. Hadi planted flowers.' },
      { id: 'B', text: 'The cleaning day was held last Friday.' },
      { id: 'C', text: 'All groups swept the yard.' },
      { id: 'D', text: 'The students were divided into four groups.' },
      { id: 'E', text: 'The students rested at 10 a.m.' }
    ],
    correctAnswers: ['B', 'D', 'E']
  },
  {
    id: 'big-viii-7',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 7,
    points: 5,
    difficulty: 'sedang',
    prompt: `My Unforgettable Moment

I will never forget the day I won my first English speech contest. I was very nervous when I stood on the stage. My hands were shaking and my voice was weak. But when I saw my mother smiling in the audience, I felt brave. When the judges announced my name, I jumped and cried happily. That day, I learned that practice and courage can beat fear.

Which statements are correct based on the text?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'The writer was nervous at first.' },
      { id: 'B', text: 'The writer felt brave after seeing her mother.' },
      { id: 'C', text: 'The writer felt disappointed when her name was announced.' },
      { id: 'D', text: 'The writer was happy when the judges announced her name.' },
      { id: 'E', text: 'The writer lost the contest.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'big-viii-8',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 8,
    points: 5,
    difficulty: 'sukar',
    prompt: `Last month, Bayu forgot to bring his homework. His teacher was disappointed and Bayu felt ashamed. That night, he made a checklist and put his books in his bag before sleeping. The next week, he brought all his homework.

Which inferences are supported by the text?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'Bayu learned from his mistake.' },
      { id: 'B', text: 'Bayu was proud when he forgot his homework.' },
      { id: 'C', text: 'The checklist helped Bayu to be more prepared.' },
      { id: 'D', text: 'The teacher was happy about Bayu’s homework.' },
      { id: 'E', text: 'Bayu’s feeling of shame pushed him to change his habit.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'big-viii-9',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 9,
    points: 5,
    difficulty: 'sedang',
    prompt: `Borobudur is a famous Buddhist temple in Magelang, Central Java. It was built in the ninth century. The temple has nine platforms. There are 504 Buddha statues and more than 2,600 relief panels. Thousands of tourists visit it every year.

Which statements are correct based on the text?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'Borobudur is in Yogyakarta.' },
      { id: 'B', text: 'Borobudur has nine platforms.' },
      { id: 'C', text: 'Borobudur is a Buddhist temple.' },
      { id: 'D', text: 'Borobudur has 504 Buddha statues.' },
      { id: 'E', text: 'Borobudur was built in the fifteenth century.' }
    ],
    correctAnswers: ['B', 'C', 'D']
  },
  {
    id: 'big-viii-10',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 10,
    points: 5,
    difficulty: 'sedang',
    prompt: `B. J. Habibie was the third President of Indonesia. He was born in Parepare, South Sulawesi. He was very intelligent and diligent. He studied aeronautical engineering in Germany and later became a respected aircraft designer. Many people remember him as a patriotic and humble leader.

Which statements about the text are correct?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'The text tells a series of events in time order.' },
      { id: 'B', text: 'The text describes a famous person.' },
      { id: 'C', text: 'The first sentence identifies the person being described.' },
      { id: 'D', text: 'The text persuades readers to vote for him.' },
      { id: 'E', text: 'Intelligent, diligent, and humble describe his character.' }
    ],
    correctAnswers: ['B', 'C', 'E']
  },
  {
    id: 'big-viii-11',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 11,
    points: 5,
    difficulty: 'sedang',
    prompt: `Running Speed of Four Animals

Animal | Speed (km/h)
- Cheetah : 110
- Lion : 80
- Giraffe : 60
- Elephant : 40

Which statements are correct based on the table?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'A cheetah is faster than a lion.' },
      { id: 'B', text: 'An elephant is the fastest of the four animals.' },
      { id: 'C', text: 'A giraffe is more fast than a lion.' },
      { id: 'D', text: 'An elephant is the slowest of the four animals.' },
      { id: 'E', text: 'A lion is slower than a cheetah but faster than a giraffe.' }
    ],
    correctAnswers: ['A', 'D', 'E']
  },
  {
    id: 'big-viii-12',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 12,
    points: 5,
    difficulty: 'mudah',
    prompt: `Rani is making a note about comparison. She wants to use correct forms in her homework.

Which forms are correct?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'big → bigger → the biggest' },
      { id: 'B', text: 'good → gooder → the goodest' },
      { id: 'C', text: 'beautiful → more beautiful → the most beautiful' },
      { id: 'D', text: 'cheap → more cheap → the most cheap' },
      { id: 'E', text: 'bad → worse → the worst' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'big-viii-13',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 13,
    points: 5,
    difficulty: 'sukar',
    prompt: `Rina wants to choose the closest beach with a ticket price of less than Rp30,000.

Beach | Distance | Ticket Price | Rating (out of 5)
- Beach A : 40 km | Rp25,000 | 4.5
- Beach B : 25 km | Rp35,000 | 4.2
- Beach C : 60 km | Rp15,000 | 4.8

Which conclusions are correct?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'Beach B is the best choice because it is the closest.' },
      { id: 'B', text: 'Beach A is the best choice for Rina.' },
      { id: 'C', text: 'Beach B is the closest, but its ticket is more expensive than Rp30,000.' },
      { id: 'D', text: 'Beach C is the best choice because it has the highest rating and the cheapest ticket.' },
      { id: 'E', text: 'Beach C is the farthest, so it is not the best choice for Rina.' }
    ],
    correctAnswers: ['B', 'C', 'E']
  },
  {
    id: 'big-viii-14',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 14,
    points: 5,
    difficulty: 'sedang',
    prompt: `You are invited!
Rani is having a birthday party.
Day and date: Saturday, 12 December
Time: 3.00 p.m.
Place: Jalan Kenanga 21
Please confirm by Thursday.

Which statements are correct based on the invitation?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'The party is on Sunday.' },
      { id: 'B', text: 'The party starts at 3.00 p.m.' },
      { id: 'C', text: 'Guests are asked to confirm by Thursday.' },
      { id: 'D', text: 'The party will be held at Jalan Kenanga 21.' },
      { id: 'E', text: 'The invitation is from a teacher to students.' }
    ],
    correctAnswers: ['B', 'C', 'D']
  },
  {
    id: 'big-viii-15',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 15,
    points: 5,
    difficulty: 'sedang',
    prompt: `ANNOUNCEMENT

The school library will be closed on Monday, 7 December, because of a book inventory. Students must return all borrowed books by Friday, 4 December. Students who are late will pay Rp1,000 per day. For more information, please see Mrs. Sari at the library.

Which statements are correct based on the announcement?
(Choose all the correct answers / Pilihlah semua jawaban benar lebih dari 1.)`,
    options: [
      { id: 'A', text: 'The library will be closed on Monday, 7 December.' },
      { id: 'B', text: 'Students must return the books on Monday.' },
      { id: 'C', text: 'The library will be closed for a book inventory.' },
      { id: 'D', text: 'Students who return books late must pay a fine.' },
      { id: 'E', text: 'Students should get more information from the principal.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },

  // =========================================================================
  // PART B. TRUE / FALSE (5 QUESTIONS × 3 POIN = 15 POIN)
  // =========================================================================
  {
    id: 'big-viii-16',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'benar_salah',
    number: 16,
    points: 3,
    difficulty: 'mudah',
    prompt: `Part B – Question B-1
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Last Sunday, I woke up at six o’clock. I helped my mother in the kitchen, then I went to the market with my brother. In the afternoon, we visited our grandmother. We came home at 5 p.m. and watched TV.`,
    options: [],
    statements: [
      { id: 'b1-s1', text: 'The writer woke up at six o’clock last Sunday.', correctAnswer: 'BENAR' },
      { id: 'b1-s2', text: 'Went is the past form of go.', correctAnswer: 'BENAR' },
      { id: 'b1-s3', text: 'Helped is an irregular verb.', correctAnswer: 'SALAH' },
      { id: 'b1-s4', text: 'The writer visited her grandmother in the morning.', correctAnswer: 'SALAH' },
      { id: 'b1-s5', text: 'Watched is the past form of watch.', correctAnswer: 'BENAR' }
    ]
  },
  {
    id: 'big-viii-17',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'benar_salah',
    number: 17,
    points: 3,
    difficulty: 'sedang',
    prompt: `Part B – Question B-2
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Last Saturday, Class VIII B went on a trip to a museum in Banjarbaru. We left school at 8 a.m. by bus. First, a guide explained the history of the museum. Then we looked at traditional clothes and old tools. After that, we wrote notes for our report. We went back to school at noon. It was a useful trip.`,
    options: [],
    statements: [
      { id: 'b2-s1', text: 'The first sentence tells us who, when, and where (orientation).', correctAnswer: 'BENAR' },
      { id: 'b2-s2', text: 'The students went to the museum by train.', correctAnswer: 'SALAH' },
      { id: 'b2-s3', text: 'The events are arranged in chronological order.', correctAnswer: 'BENAR' },
      { id: 'b2-s4', text: 'The writer wrote the text to persuade readers to visit the museum.', correctAnswer: 'SALAH' },
      { id: 'b2-s5', text: '“It was a useful trip.” is the writer’s personal comment at the end of the text.', correctAnswer: 'BENAR' }
    ]
  },
  {
    id: 'big-viii-18',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'benar_salah',
    number: 18,
    points: 3,
    difficulty: 'mudah',
    prompt: `Part B – Question B-3
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Lake Toba is a large lake in North Sumatra. It is the largest volcanic lake in the world. In the middle of the lake, there is Samosir Island. The water is clear and cool. Many tourists visit Lake Toba to enjoy the beautiful view and learn about Batak culture.`,
    options: [],
    statements: [
      { id: 'b3-s1', text: 'Lake Toba is in North Sumatra.', correctAnswer: 'BENAR' },
      { id: 'b3-s2', text: 'Samosir Island is at the edge of the lake.', correctAnswer: 'SALAH' },
      { id: 'b3-s3', text: 'The water of Lake Toba is warm and muddy.', correctAnswer: 'SALAH' },
      { id: 'b3-s4', text: 'The text describes a place and its features.', correctAnswer: 'BENAR' },
      { id: 'b3-s5', text: 'Tourists visit Lake Toba to enjoy the view and learn about Batak culture.', correctAnswer: 'BENAR' }
    ]
  },
  {
    id: 'big-viii-19',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'benar_salah',
    number: 19,
    points: 3,
    difficulty: 'sedang',
    prompt: `Part B – Question B-4
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Data of Four Students
Name | Height | Age
- Andi : 158 cm | 13 years old
- Budi : 165 cm | 14 years old
- Cici : 152 cm | 13 years old
- Dewi : 160 cm | 13 years old`,
    options: [],
    statements: [
      { id: 'b4-s1', text: 'Budi is taller than Andi.', correctAnswer: 'BENAR' },
      { id: 'b4-s2', text: 'Cici is the tallest student.', correctAnswer: 'SALAH' },
      { id: 'b4-s3', text: 'Dewi is shorter than Budi but taller than Andi.', correctAnswer: 'BENAR' },
      { id: 'b4-s4', text: 'Andi is younger than Budi.', correctAnswer: 'BENAR' },
      { id: 'b4-s5', text: 'Budi is the youngest student.', correctAnswer: 'SALAH' }
    ]
  },
  {
    id: 'big-viii-20',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'benar_salah',
    number: 20,
    points: 3,
    difficulty: 'sedang',
    prompt: `Part B – Question B-5
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Rafi: Hi Dion, we are having a futsal match on Saturday at 4 p.m. at Gor Satria. Would you like to join us?
Dion: Thanks for inviting me, Rafi. I’d love to, but I have a family dinner that evening. I’m sorry I can’t come.
Rafi: That’s OK. Maybe next time!`,
    options: [],
    statements: [
      { id: 'b5-s1', text: 'Rafi invites Dion to a futsal match.', correctAnswer: 'BENAR' },
      { id: 'b5-s2', text: 'Dion accepts the invitation.', correctAnswer: 'SALAH' },
      { id: 'b5-s3', text: 'Dion declines because he has another plan.', correctAnswer: 'BENAR' },
      { id: 'b5-s4', text: 'Dion gives a reason for declining, which makes his reply polite.', correctAnswer: 'BENAR' },
      { id: 'b5-s5', text: 'Rafi is upset with Dion’s answer.', correctAnswer: 'SALAH' }
    ]
  },

  // =========================================================================
  // PART C. MATCHING (5 PREMISES × 2 POIN = 10 POIN)
  // =========================================================================
  {
    id: 'big-viii-21',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'mencocokkan',
    number: 21,
    points: 10,
    difficulty: 'sedang',
    prompt: `Part C. Matching (5 questions)
Instructions: Match each situation (premise) in the left column with the most appropriate sentence in the right column. There are more answer choices than premises, and each choice can be used only once.
(Jodohkan setiap situasi (premise) di kolom kiri dengan kalimat yang paling sesuai di kolom kanan.)`,
    options: [],
    matchingPairs: [
      {
        id: 'big-viii-21-p1',
        leftText: '1. You want to invite your friend to play badminton with you on Saturday. You say: ………',
        rightText: 'a. Would you like to play badminton with me on Saturday?'
      },
      {
        id: 'big-viii-21-p2',
        leftText: '2. Your friend invites you to her birthday party, and you can come. You say: ………',
        rightText: 'b. Thank you for inviting me. I’d love to come.'
      },
      {
        id: 'big-viii-21-p3',
        leftText: '3. Your friend invites you to watch a film tonight, but you have to finish your homework. You say: ………',
        rightText: 'c. I’m sorry, I can’t come. I have to finish my homework.'
      },
      {
        id: 'big-viii-21-p4',
        leftText: '4. Mount A is 2,000 m high, Mount B is 2,500 m high, and Mount C is 3,000 m high. You want to say which one is the highest. You say: ………',
        rightText: 'd. Mount C is the highest of the three mountains.'
      },
      {
        id: 'big-viii-21-p5',
        leftText: '5. You want to begin a story about your visit to your grandparents in Kandangan during the last holiday. You write: ………',
        rightText: 'e. Last holiday, I visited my grandparents in Kandangan.'
      }
    ],
    matchingRightOptions: [
      'a. Would you like to play badminton with me on Saturday?',
      'b. Thank you for inviting me. I’d love to come.',
      'c. I’m sorry, I can’t come. I have to finish my homework.',
      'd. Mount C is the highest of the three mountains.',
      'e. Last holiday, I visited my grandparents in Kandangan.',
      'f. I visit my grandparents every holiday.',
      'g. Mount A is higher than Mount B.'
    ],
    essayRubric: `1→a (Would you like to …? is an expression for making an invitation.)
2→b (Thank you for inviting me. I’d love to come. accepts an invitation.)
3→c (I’m sorry, I can’t come. I have to … declines an invitation with a reason.)
4→d (Three or more things are compared, so the superlative the highest is used.)
5→e (A recount about last holiday starts with an orientation in the simple past.)`
  }
];
