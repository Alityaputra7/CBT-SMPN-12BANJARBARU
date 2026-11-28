import { Question } from '../types/cbt';

// =========================================================================
// BAHASA INGGRIS KELAS IX — PENILAIAN AKHIR SEMESTER GANJIL (PAS) 2026-2027
// Sumber: KELAS 9 SOAL inggris.pdf (21 Soal: 15 PGK + 5 True/False + 1 Matching)
// =========================================================================
export const BIG_KELAS_9_QUESTIONS: Question[] = [
  // =========================================================================
  // PART A. COMPLEX MULTIPLE CHOICE (15 QUESTIONS × 5 POIN = 75 POIN)
  // =========================================================================
  {
    id: 'big-ix-1',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 1,
    points: 5,
    difficulty: 'mudah',
    prompt: `My father (work) in a bank. Last year, he (visit) Japan. Next month, he (go) to Singapore for a business meeting.

Which verb forms are correct for the verbs in brackets?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'work → works' },
      { id: 'B', text: 'work → work' },
      { id: 'C', text: 'visit → visited' },
      { id: 'D', text: 'go → will go' },
      { id: 'E', text: 'go → went' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'big-ix-2',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 2,
    points: 5,
    difficulty: 'mudah',
    prompt: `Mom: Where is Budi?
Dina: He is studying in his room. He has finished his homework, and now he is reading a novel.

Which statements about the tenses in the dialogue are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: '“is studying” describes an action happening now.' },
      { id: 'B', text: '“has finished” is in the simple past tense.' },
      { id: 'C', text: '“has finished” is in the present perfect tense.' },
      { id: 'D', text: '“is reading” describes a daily habit.' },
      { id: 'E', text: '“is reading” is in the present continuous tense.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'big-ix-3',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 3,
    points: 5,
    difficulty: 'mudah',
    prompt: `Blue Sky is a popular song. Rama wrote it, and Dewi sang it. A studio in Bandung recorded it in 2019.

Which passive sentences express the information in the text correctly?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Rama was written the song.' },
      { id: 'B', text: 'The song was written by Rama.' },
      { id: 'C', text: 'The song sung by Dewi.' },
      { id: 'D', text: 'The song was sung by Dewi.' },
      { id: 'E', text: 'The song was recorded in 2019.' }
    ],
    correctAnswers: ['B', 'D', 'E']
  },
  {
    id: 'big-ix-4',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 4,
    points: 5,
    difficulty: 'mudah',
    prompt: `School Rules
1. Students must wear the school uniform.
2. Students should bring a water bottle.
3. Students can borrow books from the library.
4. Students must not run in the corridor.

Which statements about the modals in the rules are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: '“must” in rule 1 expresses obligation.' },
      { id: 'B', text: '“should” in rule 2 expresses prohibition.' },
      { id: 'C', text: '“can” in rule 3 expresses permission.' },
      { id: 'D', text: '“must not” in rule 4 expresses permission.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'big-ix-5',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 5,
    points: 5,
    difficulty: 'sedang',
    prompt: `1. Mr. Hadi is the teacher who teaches English.
2. The book that I borrowed is thick.
3. The girl whose bag is red is my cousin.
4. The camera which my uncle bought is expensive.

Which statements about the relative pronouns are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: '“Who” in sentence 1 refers to a person.' },
      { id: 'B', text: '“Which” in sentence 4 refers to a person.' },
      { id: 'C', text: '“That” in sentence 2 refers to a thing.' },
      { id: 'D', text: '“Whose” in sentence 3 shows possession.' },
      { id: 'E', text: '“Whose” in sentence 3 can refer to a thing only.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'big-ix-6',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 6,
    points: 5,
    difficulty: 'sedang',
    prompt: `Rina is making pancakes in the kitchen. She checks the ingredients and mixes the flour with great care.

Which sentences about the pancake ingredients and Rina’s actions use quantifiers or adverbs of manner correctly?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'There is a little sugar in the jar.' },
      { id: 'B', text: 'There are much eggs in the basket.' },
      { id: 'C', text: 'There isn’t much milk.' },
      { id: 'D', text: 'Rina mixes the flour careful.' },
      { id: 'E', text: 'Rina carefully mixes the flour.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'big-ix-7',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 7,
    points: 5,
    difficulty: 'sedang',
    prompt: `The weather was bad. We still went to the beach.

Which sentences combine the two ideas logically?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'We went to the beach because the weather was bad.' },
      { id: 'B', text: 'Although the weather was bad, we went to the beach.' },
      { id: 'C', text: 'The weather was bad; therefore, we went to the beach.' },
      { id: 'D', text: 'The weather was bad. However, we went to the beach.' }
    ],
    correctAnswers: ['B', 'D']
  },
  {
    id: 'big-ix-8',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 8,
    points: 5,
    difficulty: 'sedang',
    prompt: `Ani said, “I am very tired.”

Dodi said, “I will join the club.”

Mr. Joko said, “The exam starts at nine.”

Which reported statements are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Ani said that she was very tired.' },
      { id: 'B', text: 'Dodi said that he will join the club.' },
      { id: 'C', text: 'Dodi said that he would join the club.' },
      { id: 'D', text: 'Mr. Joko said that the exam started at nine.' },
      { id: 'E', text: 'Ani said that I was very tired.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'big-ix-9',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 9,
    points: 5,
    difficulty: 'sedang',
    prompt: `Kartini was born in Jepara on 21 April 1879. She was the daughter of a regent. She attended a Dutch primary school, but she had to stay at home when she was twelve years old. She read many books and wrote letters to her Dutch friends. In her letters, she expressed her ideas about education for women. She died in 1904 at the age of 25.

Which statements are correct based on the text?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Kartini was born in Jepara.' },
      { id: 'B', text: 'Kartini never attended school.' },
      { id: 'C', text: 'Kartini wrote letters about education for women.' },
      { id: 'D', text: 'Kartini died at the age of 25.' },
      { id: 'E', text: 'Kartini stayed at home when she was twenty.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'big-ix-10',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 10,
    points: 5,
    difficulty: 'sedang',
    prompt: `Long ago, a poor widow lived with her son, Malin Kundang, in a small village. One day, Malin went sailing to find a better life. Years later, he became a rich merchant and returned with a beautiful ship. But when his mother ran to hug him, he denied her and said she was just an old beggar. The mother was very angry and asked God to punish him. Suddenly, a storm destroyed the ship, and Malin turned into a stone.

Which statements about the text are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'The text is a legend.' },
      { id: 'B', text: 'The first sentence is the orientation because it introduces the characters and the setting.' },
      { id: 'C', text: 'The complication begins when Malin sails to find a better life.' },
      { id: 'D', text: 'One moral value of the text is that we must respect our parents.' },
      { id: 'E', text: 'Malin was punished because he was lazy.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'big-ix-11',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 11,
    points: 5,
    difficulty: 'sedang',
    prompt: `Octopuses are sea animals. They belong to a group called cephalopods. An octopus has eight arms, three hearts, and blue blood. It lives in oceans and hides in small spaces. Octopuses eat crabs, shrimps, and small fish. They are known as intelligent animals.

Which statements about the text are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'The text is a report text because it presents general information.' },
      { id: 'B', text: 'The text tells the experience of one specific octopus.' },
      { id: 'C', text: 'An octopus has three hearts.' },
      { id: 'D', text: 'Octopuses belong to a group called cephalopods.' },
      { id: 'E', text: 'Octopuses live in rivers.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'big-ix-12',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 12,
    points: 5,
    difficulty: 'sedang',
    prompt: `How to Make Iced Tea

Ingredients: tea bags, hot water, sugar, ice cubes

Steps:
1. Put two tea bags in a cup.
2. Pour hot water into the cup.
3. Wait for three minutes, then remove the tea bags.
4. Add sugar and stir.
5. Add ice cubes and serve.

Which statements about the text are correct?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'The first step is to put two tea bags in a cup.' },
      { id: 'B', text: 'Ice cubes are added before hot water is poured.' },
      { id: 'C', text: '“Pour hot water into the cup.” is an imperative sentence.' },
      { id: 'D', text: 'The text uses the simple past tense to give the steps.' },
      { id: 'E', text: 'The tea bags are removed after three minutes.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'big-ix-13',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 13,
    points: 5,
    difficulty: 'sukar',
    prompt: `Operating the Electric Kettle

1. Fill the kettle with water between the MIN and MAX lines.
2. Close the lid firmly.
3. Place the kettle on its base and plug it in.
4. Press the switch.

The kettle turns off automatically when the water boils.

Warning: Never turn on the kettle when it is empty. Do not open the lid while the water is boiling.

Case: Doni fills the kettle with water, places it on its base, plugs it in, and presses the switch. He forgets to close the lid.

Which conclusions are correct based on the manual and the case?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Doni missed Step 2 before he pressed the switch.' },
      { id: 'B', text: 'Doni does not need to turn off the kettle by hand when the water boils.' },
      { id: 'C', text: 'It is safe for Doni to open the lid while the water is boiling.' },
      { id: 'D', text: 'Doni must fill the kettle above the MAX line.' },
      { id: 'E', text: 'If the kettle has no water, Doni must not switch it on.' }
    ],
    correctAnswers: ['A', 'B', 'E']
  },
  {
    id: 'big-ix-14',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 14,
    points: 5,
    difficulty: 'sedang',
    prompt: `Batik is a traditional Indonesian cloth that has beautiful patterns. It is made by applying hot wax to the cloth before dyeing it. The wax protects some parts of the cloth from the dye, so the pattern appears after the wax is removed. UNESCO recognized batik as an Intangible Cultural Heritage of Humanity in 2009. Many Indonesians wear batik for formal events.

Which statements are correct based on the text?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: 'The cloth is dyed before the wax is applied.' },
      { id: 'B', text: 'Batik is a traditional Indonesian cloth.' },
      { id: 'C', text: 'UNESCO recognized batik in 2019.' },
      { id: 'D', text: 'The wax protects some parts of the cloth from the dye.' },
      { id: 'E', text: 'UNESCO recognized batik in 2009.' }
    ],
    correctAnswers: ['B', 'D', 'E']
  },
  {
    id: 'big-ix-15',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 15,
    points: 5,
    difficulty: 'sukar',
    prompt: `Plastic bags are used everywhere because they are cheap and light. However, they take hundreds of years to break down. Therefore, many cities have started to ban them. Although some people complain, the ban has reduced the amount of rubbish in rivers. Shops now offer cloth bags, which can be used many times.

Which statements are correct based on the text?
(Choose all the correct answers / Pilih semua jawaban yang benar lebih dari satu.)`,
    options: [
      { id: 'A', text: '“they” in the second sentence refers to shops.' },
      { id: 'B', text: '“they” in the second sentence refers to plastic bags.' },
      { id: 'C', text: 'The main idea of the text is that plastic bags are cheap and light.' },
      { id: 'D', text: 'We can infer that the ban helps to reduce rubbish in rivers.' },
      { id: 'E', text: '“which” in the last sentence refers to cloth bags.' }
    ],
    correctAnswers: ['B', 'D', 'E']
  },

  // =========================================================================
  // PART B. TRUE / FALSE (5 QUESTIONS × 3 POIN = 15 POIN)
  // =========================================================================
  {
    id: 'big-ix-16',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'benar_salah',
    number: 16,
    points: 3,
    difficulty: 'mudah',
    prompt: `Part B – Question B-1
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Bamboo is a plant that belongs to the grass family. There are more than 1,000 species of bamboo. Bamboo grows very fast, and some species can grow up to 90 centimeters in one day. People use bamboo to build houses, make furniture, and produce paper.`,
    options: [],
    statements: [
      { id: 'ix-b1-s1', text: 'Bamboo belongs to the grass family.', correctAnswer: 'BENAR' },
      { id: 'ix-b1-s2', text: 'Bamboo grows very slowly.', correctAnswer: 'SALAH' },
      { id: 'ix-b1-s3', text: 'Bamboo can be used to build houses and make furniture.', correctAnswer: 'BENAR' },
      { id: 'ix-b1-s4', text: 'There are fewer than 100 species of bamboo.', correctAnswer: 'SALAH' },
      { id: 'ix-b1-s5', text: 'The text is an information report because it presents general facts.', correctAnswer: 'BENAR' }
    ]
  },
  {
    id: 'big-ix-17',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'benar_salah',
    number: 17,
    points: 3,
    difficulty: 'sedang',
    prompt: `Part B – Question B-2
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

I have visited Yogyakarta twice. I visited Borobudur in 2022. I have never been to Bali. I have just finished my project.`,
    options: [],
    statements: [
      { id: 'ix-b2-s1', text: '“I have visited Yogyakarta twice.” talks about the writer’s experience.', correctAnswer: 'BENAR' },
      { id: 'ix-b2-s2', text: '“I visited Borobudur in 2022.” uses the simple past because the time is finished and stated.', correctAnswer: 'BENAR' },
      { id: 'ix-b2-s3', text: '“I have never been to Bali.” means the writer went to Bali last year.', correctAnswer: 'SALAH' },
      { id: 'ix-b2-s4', text: '“I have just finished my project.” shows an action that was completed recently.', correctAnswer: 'BENAR' },
      { id: 'ix-b2-s5', text: 'The present perfect tense is always used with time words such as yesterday and last year.', correctAnswer: 'SALAH' }
    ]
  },
  {
    id: 'big-ix-18',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'benar_salah',
    number: 18,
    points: 3,
    difficulty: 'mudah',
    prompt: `Part B – Question B-3
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

The Ant and the Grasshopper

In a warm field, a grasshopper played music all summer while an ant worked hard to collect food. When winter came, the grasshopper had nothing to eat. He asked the ant for help. The ant gave him some food but said, “Next time, you should prepare for the future.”`,
    options: [],
    statements: [
      { id: 'ix-b3-s1', text: 'The text is a fable because the characters are animals.', correctAnswer: 'BENAR' },
      { id: 'ix-b3-s2', text: 'The ant was lazy.', correctAnswer: 'SALAH' },
      { id: 'ix-b3-s3', text: 'The grasshopper had nothing to eat in winter because he did not prepare in summer.', correctAnswer: 'BENAR' },
      { id: 'ix-b3-s4', text: 'One moral value of the text is that we should work hard and prepare for the future.', correctAnswer: 'BENAR' },
      { id: 'ix-b3-s5', text: 'The text explains how to collect food in steps.', correctAnswer: 'SALAH' }
    ]
  },
  {
    id: 'big-ix-19',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'benar_salah',
    number: 19,
    points: 3,
    difficulty: 'sedang',
    prompt: `Part B – Question B-4
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

Ms. Lina told the class, “The test will be held on Monday. You must bring a pencil and an eraser.”

Later, Dani told his friend, “Ms. Lina said that the test would be held on Monday and that we had to bring a pencil and an eraser.”`,
    options: [],
    statements: [
      { id: 'ix-b4-s1', text: 'Dani reports what Ms. Lina said.', correctAnswer: 'BENAR' },
      { id: 'ix-b4-s2', text: '“will be held” changes to “would be held” in the reported speech.', correctAnswer: 'BENAR' },
      { id: 'ix-b4-s3', text: 'According to Dani, the test is on Tuesday.', correctAnswer: 'SALAH' },
      { id: 'ix-b4-s4', text: '“had to” in Dani’s sentence expresses an obligation, like “must”.', correctAnswer: 'BENAR' },
      { id: 'ix-b4-s5', text: 'Dani says that students can choose whether to bring a pencil and an eraser.', correctAnswer: 'SALAH' }
    ]
  },
  {
    id: 'big-ix-20',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'benar_salah',
    number: 20,
    points: 3,
    difficulty: 'sedang',
    prompt: `Part B – Question B-5
Read the stimulus below. Decide whether each statement is True (BENAR) or False (SALAH).

A student wrote this procedure text.

How to Plant a Bean Seed
1. Water the soil every morning.
2. Put the seed into the hole and cover it with soil.
3. Fill a pot with soil.
4. Make a small hole in the soil.
5. Put the pot in a sunny place.`,
    options: [],
    statements: [
      { id: 'ix-b5-s1', text: 'The steps are already in the correct order.', correctAnswer: 'SALAH' },
      { id: 'ix-b5-s2', text: 'Step 3 should come before Step 4.', correctAnswer: 'BENAR' },
      { id: 'ix-b5-s3', text: 'Watering the soil should come after the seed is covered with soil.', correctAnswer: 'BENAR' },
      { id: 'ix-b5-s4', text: '“Put the pot in a sunny place.” is an imperative sentence.', correctAnswer: 'BENAR' },
      { id: 'ix-b5-s5', text: 'Step 2 should come before Step 4.', correctAnswer: 'SALAH' }
    ]
  },

  // =========================================================================
  // PART C. MATCHING (5 PREMISES × 2 POIN = 10 POIN)
  // =========================================================================
  {
    id: 'big-ix-21',
    bankId: 'qbank-big',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    type: 'mencocokkan',
    number: 21,
    points: 10,
    difficulty: 'sedang',
    prompt: `Part C. Matching (5 questions)
Instructions: Match each description (premise) in the left column with the correct text type in the right column. There are more answer choices than premises, and each choice can be used only once.
(Jodohkan setiap deskripsi di kolom kiri dengan jenis teks yang tepat di kolom kanan.)`,
    options: [],
    matchingPairs: [
      {
        id: 'big-ix-21-p1',
        leftText: '1. A text that tells how to make something or how to operate a device, using steps in order. ………',
        rightText: 'd. Procedure text'
      },
      {
        id: 'big-ix-21-p2',
        leftText: '2. A text that retells events in the past in chronological order, such as a biography or a story about a school trip. ………',
        rightText: 'a. Recount text'
      },
      {
        id: 'big-ix-21-p3',
        leftText: '3. A text that entertains readers with a story that has a complication, a resolution, and a moral value, such as a legend or a fable. ………',
        rightText: 'b. Narrative text'
      },
      {
        id: 'big-ix-21-p4',
        leftText: '4. A text that presents general facts about animals, plants, or natural phenomena. ………',
        rightText: 'c. Report text'
      },
      {
        id: 'big-ix-21-p5',
        leftText: '5. “The tower is tall and made of white stone. Its round roof is gold.” This sentence belongs to a: ………',
        rightText: 'e. Descriptive text'
      }
    ],
    matchingRightOptions: [
      'a. Recount text',
      'b. Narrative text',
      'c. Report text',
      'd. Procedure text',
      'e. Descriptive text',
      'f. Announcement',
      'g. Explanation text'
    ],
    essayRubric: `1→d (A text that explains how to make or operate something with ordered steps is a procedure text.)
2→a (A text that retells past events in chronological order is a recount text.)
3→b (A story with a complication, a resolution, and a moral value is a narrative text.)
4→c (A text that presents general facts about animals, plants, or natural phenomena is a report text.)
5→e (The sentences describe the features of one specific tower, not general facts, so they belong to a descriptive text.)`
  }
];
