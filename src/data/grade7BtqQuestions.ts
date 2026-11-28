import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI BACA TULIS AL-QUR'AN (BTQ) KELAS VII SMPN 12 BANJARBARU
// Sumber: Soal_BTA_Kelas_7_69cd321f.pdf (30 Soal Lengkap, Total Skor = 100)
// Pedoman Penskoran Resmi (Hal. 10):
// - Bagian I: 20 Pilihan Ganda Biasa (No. 1-20) x 2 poin = 40 poin
// - Bagian II: 10 Pilihan Ganda Kompleks Kombinasi A/B/C/D (No. 21-30) x 6 poin = 60 poin
// Total = 100 poin
// =========================================================================

export const BTQ_KELAS_7_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // BAGIAN I: PILIHAN GANDA BIASA (No. 1 - 20, 2 poin/soal = 40 poin)
  // -----------------------------------------------------------------------
  {
    id: 'btq-vii-1',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt:
      "Ahmad hendak menyetorkan hafalan Q.S. An-Nas kepada guru BTQ di kelas. Ia baru saja pulang dari kamar mandi, lalu langsung mengambil mushaf Al-Qur'an dan membacanya tanpa berwudhu terlebih dahulu. Berdasarkan adab membaca Al-Qur'an, tindakan Ahmad kurang tepat karena ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: "membaca Al-Qur'an wajib dilakukan di dalam masjid saja" },
      { id: 'B', text: "menyentuh dan membaca mushaf Al-Qur'an diutamakan dalam keadaan suci dari hadas" },
      { id: 'C', text: 'membaca hafalan tidak diperbolehkan jika belum menghadap ke arah timur' },
      { id: 'D', text: "setiap kali membaca Al-Qur'an harus memakai pakaian serba putih" }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-vii-2',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg',
    prompt:
      "Perhatikan ilustrasi berikut!\nFatimah membaca Al-Qur'an dengan suara yang sangat cepat tanpa memperhatikan panjang pendek harakat dan tanda berhenti agar target khatamnya cepat selesai dalam satu hari.\n\nSikap yang seharusnya dilakukan Fatimah sesuai adab membaca Al-Qur'an adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'membaca dengan tartil, perlahan, serta memperhatikan kaidah tajwid' },
      { id: 'B', text: 'mengecilkan suara hingga tidak terdengar sama sekali oleh dirinya sendiri' },
      { id: 'C', text: "melewatkan bacaan ta'awudz agar waktu membaca lebih efisien" },
      { id: 'D', text: 'mengulang-ulang satu ayat saja tanpa melanjutkan ke ayat berikutnya' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-3',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'pg',
    prompt:
      "Bacaan yang disunnahkan untuk dibaca pertama kali sebelum memulai membaca ayat Al-Qur'an sebagai bentuk permohonan perlindungan kepada Allah Swt. dari godaan setan adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Basmalah' },
      { id: 'B', text: 'Hamdalah' },
      { id: 'C', text: "Ta'awudz" },
      { id: 'D', text: 'Tasbih' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-4',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'pg',
    prompt:
      'Perhatikan potongan huruf hijaiyah berikut: كَ – تَ – بَ\n\nJika ketiga huruf hijaiyah tersebut disambung menjadi satu kata yang benar sesuai kaidah penulisan di awal, tengah, dan akhir, bentuk penulisannya adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'كَتَبَ' },
      { id: 'B', text: 'كَ تَبَ' },
      { id: 'C', text: 'كَتَ بَ' },
      { id: 'D', text: 'كَ تَ بَ' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-5',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'pg',
    prompt:
      'Di antara kelompok huruf hijaiyah berikut, huruf yang tidak dapat disambung dengan huruf sesudahnya ketika berada di awal atau tengah kata adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'ب – ت – ث – ن' },
      { id: 'B', text: 'س – ش – ص – ض' },
      { id: 'C', text: 'ا – د – ذ – ر – ز – و' },
      { id: 'D', text: 'ف – ق – ك – ل' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-6',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 6,
    type: 'pg',
    prompt:
      'Perhatikan lafaz berikut ini: إِنَّا\n\nTanda baca (harakat) berbentuk seperti kepala huruf sin kecil ( ّ ) yang berada di atas huruf Nun (نّ) berfungsi untuk ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'mematikan bunyi huruf Nun sehingga dibaca sukun' },
      { id: 'B', text: 'menggandakan bunyi huruf Nun dan menahannya dengan dengung' },
      { id: 'C', text: 'memanjangkan bacaan huruf Nun sebanyak dua ketukan' },
      { id: 'D', text: 'mengubah bunyi vokal Nun menjadi bunyi un' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-vii-7',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 7,
    type: 'pg',
    prompt:
      'Siswa kelas VII diminta menuliskan lafaz "Malikinnās" dengan harakat lengkap. Pada huruf terakhir (Sin), bunyi vokal yang tepat adalah kasrah, sehingga bentuk penulisan harakat pada huruf Sin tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'سَ' },
      { id: 'B', text: 'سُ' },
      { id: 'C', text: 'سِ' },
      { id: 'D', text: 'سٍ' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-8',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 8,
    type: 'pg',
    prompt:
      "Ketika melafalkan huruf ح (Ha) dan ع ('Ain), seorang pembaca Al-Qur'an merasakan getaran suara yang keluar dari bagian tengah saluran napas di leher. Berdasarkan pembagian makharijul huruf, tempat keluarnya kedua huruf tersebut adalah ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Al-Jauf (rongga mulut)' },
      { id: 'B', text: 'Al-Halq (tenggorokan)' },
      { id: 'C', text: 'Asy-Syafatain (dua bibir)' },
      { id: 'D', text: 'Al-Khaisyum (pangkal hidung)' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-vii-9',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 9,
    type: 'pg',
    prompt:
      'Perhatikan kelompok huruf berikut: ب – م – و – ف.\n\nPersamaan keempat huruf hijaiyah tersebut jika ditinjau dari makharijul huruf-nya adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'semuanya keluar dari ujung lidah yang menempel pada gusi atas' },
      { id: 'B', text: 'semuanya keluar dari rongga tenggorokan bagian paling bawah' },
      { id: 'C', text: 'semuanya melibatkan pertemuan atau gerakan dua bibir (Asy-Syafatain)' },
      { id: 'D', text: 'semuanya dibunyikan melalui pangkal hidung tanpa menggerakkan mulut' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-10',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 10,
    type: 'pg',
    prompt:
      'Bunyi dengung (ghunnah) yang muncul saat membaca huruf Nun bertasydid atau Mim bertasydid berasal dari makhraj ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Al-Khaisyum (pangkal hidung)' },
      { id: 'B', text: 'Al-Lisan (pangkal lidah)' },
      { id: 'C', text: 'Al-Jauf (rongga mulut)' },
      { id: 'D', text: 'Al-Halq (tenggorokan atas)' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-11',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 11,
    type: 'pg',
    prompt:
      'Perhatikan potongan ayat berikut: قُلْ هُوَ اللهُ أَحَدٌ ۚ\n\nTanda kecil berbentuk huruf Jim (ۚ) yang terdapat di akhir ayat pertama Q.S. Al-Ikhlas tersebut menunjukkan hukum waqaf Jaiz, yang artinya ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'dilarang keras berhenti di tengah kalimat tersebut' },
      { id: 'B', text: 'wajib berhenti karena makna ayat sudah sempurna' },
      { id: 'C', text: 'boleh berhenti dan boleh juga melanjutkan bacaan' },
      { id: 'D', text: 'harus berhenti sejenak tanpa mengambil napas' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-12',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 12,
    type: 'pg',
    prompt:
      "Perhatikan lafaz-lafaz berikut:\n1. نُوْحِيْهَا\n2. السَّمَاءِ\n3. قَالُوْا\n4. يَا أَيُّهَا\n\nLafaz yang mengandung hukum bacaan Mad Thabi'i (Mad Asli) dengan ukuran panjang 2 harakat ditunjukkan oleh nomor ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1 dan 2' },
      { id: 'B', text: '1 dan 3' },
      { id: 'C', text: '2 dan 4' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-vii-13',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 13,
    type: 'pg',
    prompt:
      "Cermati potongan ayat berikut ini: إِذَا جَاءَ نَصْرُ اللهِ\n\nPada lafaz جَاءَ, terdapat huruf Mad Thabi'i (alif setelah fathah) yang bertemu dengan huruf Hamzah dalam satu kata. Hukum bacaan mad pada lafaz tersebut adalah ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "Mad Thabi'i" },
      { id: 'B', text: 'Mad Wajib Muttashil' },
      { id: 'C', text: 'Mad Jaiz Munfashil' },
      { id: 'D', text: 'Mad Aridh Lissukun' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-vii-14',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 14,
    type: 'pg',
    prompt:
      'Perbedaan mendasar antara hukum bacaan Mad Wajib Muttashil dengan Mad Jaiz Munfashil terletak pada ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'huruf mad yang digunakan hanya huruf Ya sukun saja' },
      { id: 'B', text: 'posisi huruf Hamzah yang berada dalam satu kata atau terpisah di lain kata' },
      { id: 'C', text: 'cara membacanya yang tidak boleh dipanjangkan lebih dari 1 harakat' },
      { id: 'D', text: 'keberadaan tanda tasydid setelah huruf mad' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-vii-15',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 15,
    type: 'pg',
    prompt:
      'Perhatikan potongan ayat dari Q.S. Al-Falaq berikut: مِنْ شَرِّ مَا خَلَقَ\n\nPada lafaz مِنْ شَرِّ, terdapat Nun sukun (نْ) bertemu dengan huruf Syin (ش). Cara membaca yang tepat sesuai hukum tajwid adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'dibaca jelas tanpa dengung karena bertemu huruf tenggorokan' },
      { id: 'B', text: 'dileburkan sepenuhnya ke dalam huruf Syin tanpa dengung' },
      { id: 'C', text: 'dibaca samar-samar disertai dengung selama 2 harakat (Ikhfa Haqiqi)' },
      { id: 'D', text: 'bunyi Nun diubah menjadi huruf Mim disertai dengung (Iqlab)' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-16',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 16,
    type: 'pg',
    prompt:
      'Cermati potongan ayat berikut: لَمْ يَلِدْ وَلَمْ يُوْلَدْ\n\nPada lafaz لَمْ يَلِدْ, terdapat huruf Mim sukun (مْ) bertemu dengan huruf Ya (ي). Hukum bacaan yang berlaku pada pertemuan kedua huruf tersebut adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Idgham Mimi' },
      { id: 'B', text: 'Ikhfa Syafawi' },
      { id: 'C', text: 'Idzhar Syafawi' },
      { id: 'D', text: 'Idzhar Halqi' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-17',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 17,
    type: 'pg',
    prompt:
      'Perhatikan lafaz berikut: مِنْ بَعْدِ\n\nKetika Nun sukun bertemu dengan huruf Ba (ب), suara huruf Nun berubah menjadi bunyi Mim yang disamarkan dengan dengung. Hukum bacaan tersebut dinamakan ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Iqlab' },
      { id: 'B', text: 'Idzhar Halqi' },
      { id: 'C', text: 'Idgham Bilaghunnah' },
      { id: 'D', text: 'Idgham Bighunnah' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-18',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 18,
    type: 'pg',
    prompt:
      'Perhatikan potongan ayat berikut: وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ\n\nPada lafaz غَاسِقٍ إِذَا, terdapat tanda kasratain ( ٍ ) bertemu dengan huruf Hamzah (إِ). Cara membacanya harus jelas dan terang tanpa dengung karena termasuk hukum ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Ikhfa Haqiqi' },
      { id: 'B', text: 'Idzhar Halqi' },
      { id: 'C', text: 'Idgham Bighunnah' },
      { id: 'D', text: 'Iqlab' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-vii-19',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 19,
    type: 'pg',
    prompt:
      'Perhatikan susunan ayat-ayat Q.S. Al-Falaq berikut secara acak:\n1. وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ\n2. قُلْ أَعُوْذُ بِرَبِّ الْفَلَقِ\n3. وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ\n4. مِنْ شَرِّ مَا خَلَقَ\n5. وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ\n\nUrutan ayat Q.S. Al-Falaq yang benar dari ayat ke-1 sampai ayat ke-5 adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '2 – 4 – 5 – 1 – 3' },
      { id: 'B', text: '2 – 4 – 1 – 5 – 3' },
      { id: 'C', text: '2 – 5 – 4 – 1 – 3' },
      { id: 'D', text: '2 – 1 – 4 – 5 – 3' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-20',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 20,
    type: 'pg',
    prompt:
      'Dalam Q.S. An-Nas ayat ke-4, Allah Swt. memerintahkan manusia berlindung dari kejahatan bisikan setan yang bersembunyi. Bunyi ayat ke-4 Q.S. An-Nas yang tepat adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'مَلِكِ النَّاسِ' },
      { id: 'B', text: 'إِلٰهِ النَّاسِ' },
      { id: 'C', text: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ' },
      { id: 'D', text: 'الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِ' }
    ],
    correctAnswers: ['C']
  },

  // -----------------------------------------------------------------------
  // BAGIAN II: PILIHAN GANDA KOMPLEKS / CAMPURAN KOMBINASI (No. 21 - 30, 6 poin/soal = 60 poin)
  // -----------------------------------------------------------------------
  {
    id: 'btq-vii-21',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 21,
    type: 'pg',
    prompt:
      "Perhatikan pernyataan-pernyataan mengenai adab sebelum dan saat membaca Al-Qur'an berikut:\n1. Berwudhu terlebih dahulu sebelum menyentuh mushaf Al-Qur'an.\n2. Mengenakan pakaian yang bersih, rapi, dan menutup aurat.\n3. Membaca Al-Qur'an sambil berbaring santai dan bercanda dengan teman.\n4. Mengawali bacaan dengan ta'awudz dan basmalah serta menghadap kiblat jika memungkinkan.\n\nPernyataan yang mencerminkan adab yang benar dalam memuliakan Al-Qur'an adalah ....",
    points: 6,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '1 dan 3' },
      { id: 'B', text: '2 dan 3' },
      { id: 'C', text: '1, 2, dan 4' },
      { id: 'D', text: '2, 3, dan 4' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-22',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 22,
    type: 'pg',
    prompt:
      'Seorang siswa sedang berlatih menyambung huruf hijaiyah menjadi satu kata utuh:\n1. Huruf س – ج – د jika disambung menjadi سَجَدَ.\n2. Huruf ر – ز – ق jika disambung menjadi رَزَقَ (semua huruf terpisah karena tidak bisa disambung ke kiri).\n3. Huruf م – ل – ك jika disambung menjadi مَلِكَ.\n4. Huruf و – ل – د jika disambung menjadi وَلَدَ (huruf Wawu menyambung langsung ke huruf Lam).\n\nAnalisis penulisan sambung huruf hijaiyah yang benar ditunjukkan oleh nomor ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1, 2, dan 3' },
      { id: 'B', text: '1, 3, dan 4' },
      { id: 'C', text: '2 dan 4' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-23',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 23,
    type: 'pg',
    prompt:
      'Cermati pengelompokan makharijul huruf berikut ini:\n1. Huruf ء – هـ – ع – ح – غ – خ keluar dari tenggorokan (Al-Halq).\n2. Huruf ق – ك – ج – ش – ي keluar dari rongga hidung (Al-Khaisyum).\n3. Huruf ف – ب – م – و keluar dari dua bibir (Asy-Syafatain).\n4. Bunyi vokal panjang (Mad) ا – و – ي keluar dari rongga mulut dan tenggorokan (Al-Jauf).\n\nPernyataan yang sesuai dengan kaidah makharijul huruf adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1 dan 2' },
      { id: 'B', text: '2 dan 3' },
      { id: 'C', text: '1, 3, dan 4' },
      { id: 'D', text: '2, 3, dan 4' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-24',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 24,
    type: 'pg',
    prompt:
      "Perhatikan daftar tanda waqaf dan artinya dalam tabel analisis berikut:\n1. Tanda مـ (Waqaf Lazim) = Harus berhenti pada kata tersebut.\n2. Tanda لا (Waqaf Mamnu') = Dilarang berhenti pada kata tersebut kecuali di akhir ayat.\n3. Tanda صلى (Al-Washlu Aula) = Diutamakan berhenti daripada melanjutkan bacaan.\n4. Tanda قلى (Al-Waqfu Aula) = Diutamakan berhenti daripada melanjutkan bacaan.\n\nPasangan tanda waqaf dan keterangannya yang tepat adalah ....",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1, 2, dan 4' },
      { id: 'B', text: '1 dan 3' },
      { id: 'C', text: '2 dan 3' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-25',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 25,
    type: 'pg',
    prompt:
      'Bacalah kutipan ayat dari Q.S. Al-Kautsar berikut: إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ\n\nAnalisis hukum bacaan yang terdapat pada ayat tersebut meliputi:\n1. Pada lafaz إِنَّا أَعْطَيْنَاكَ, terdapat hukum Mad Jaiz Munfashil karena huruf mad bertemu hamzah di lain kata.\n2. Pada huruf Nun bertasydid (إِنَّ), terdapat bacaan Ghunnah yang keluar dari makhraj Al-Khaisyum.\n3. Pada lafaz الْكَوْثَرَ, terdapat hukum Mad Wajib Muttashil karena huruf Wawu sukun.\n4. Huruf ع pada lafaz أَعْطَيْنَاكَ dibaca melalui makhraj tenggorokan bagian tengah.\n\nPernyataan analisis tajwid yang benar ditunjukkan oleh nomor ....',
    points: 6,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: '1 dan 3' },
      { id: 'B', text: '2 dan 3' },
      { id: 'C', text: '1, 2, dan 4' },
      { id: 'D', text: '2, 3, dan 4' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-vii-26',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 26,
    type: 'pg',
    prompt:
      'Perhatikan hukum bacaan Nun Sukun atau Tanwin berikut:\n1. Idzhar Halqi terjadi apabila nun sukun/tanwin bertemu huruf ء، هـ، ع، ح، غ، خ.\n2. Idgham Bighunnah terjadi apabila nun sukun/tanwin bertemu huruf ي، ن، م، و.\n3. Idgham Bilaghunnah terjadi apabila nun sukun/tanwin bertemu huruf ل، ر dan dibaca dengan dengung panjang.\n4. Ikhfa Haqiqi terjadi apabila nun sukun/tanwin bertemu 15 huruf selain huruf Idzhar, Idgham, dan Iqlab.\n\nPernyataan yang benar mengenai kaidah Nun Sukun/Tanwin adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1, 2, dan 4' },
      { id: 'B', text: '1 dan 3' },
      { id: 'C', text: '2 dan 3' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-27',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 27,
    type: 'pg',
    prompt:
      'Cermati potongan-potongan ayat berikut untuk mengidentifikasi hukum bacaan Mim Sukun (مْ):\n1. تَرْمِيْهِمْ بِحِجَارَةٍ → Hukum bacaan Ikhfa Syafawi (Mim sukun bertemu Ba).\n2. لَهُمْ مَا يَشَاءُوْنَ → Hukum bacaan Idgham Mimi (Mim sukun bertemu Mim).\n3. أَلَمْ تَرَ كَيْفَ → Hukum bacaan Idzhar Syafawi (Mim sukun bertemu Ta).\n4. عَلَيْهِمْ وَلَا الضَّالِّيْنَ → Hukum bacaan Iqlab (Mim sukun bertemu Wawu).\n\nIdentifikasi hukum bacaan Mim Sukun yang tepat ditunjukkan oleh nomor ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1, 2, dan 3' },
      { id: 'B', text: '1 dan 4' },
      { id: 'C', text: '2 dan 4' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-28',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 28,
    type: 'pg',
    prompt:
      'Dalam Q.S. Al-Ikhlas ayat 1–4 terdapat beberapa kaidah penulisan dan tajwid yang perlu diperhatikan saat menyalinnya:\n1. Lafaz اللهُ الصَّمَدُ pada ayat ke-2 mengandung huruf Shad bertasydid.\n2. Pada ayat ke-3 (لَمْ يَلِدْ وَلَمْ يُوْلَدْ), terdapat dua kali hukum bacaan Idzhar Syafawi.\n3. Ayat ke-4 berbunyi وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ yang di dalamnya terdapat hukum Idgham Bilaghunnah (يَكُنْ لَهُ) dan Idzhar Halqi (كُفُوًا أَحَدٌ).\n4. Surah Al-Ikhlas terdiri atas 5 ayat dan termasuk golongan surah Madaniyah.\n\nPernyataan yang benar terkait Q.S. Al-Ikhlas adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1, 2, dan 3' },
      { id: 'B', text: '1 dan 4' },
      { id: 'C', text: '2 dan 4' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-29',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 29,
    type: 'pg',
    prompt:
      "Seorang guru meminta siswa menganalisis kesalahan penulisan dan pelafalan dalam ayat berikut: قُلْ أَعُوْذُ بِرَبِّ النَّاسِ\n\nHal-hal yang benar dalam kaidah penulisan dan pelafalan ayat pertama Q.S. An-Nas tersebut adalah ....\n1. Lafaz أَعُوْذُ mengandung hukum bacaan Mad Thabi'i karena Wawu sukun didahului Dhammah.\n2. Huruf ذ (Dzal) dilafalkan dengan ujung lidah menyentuh ujung gigi seri atas, bukan seperti huruf Zai (ز).\n3. Lafaz النَّاسِ diawali huruf Nun bertasydid yang wajib dibaca dengung selama 2 harakat.\n4. Huruf ق (Qaf) pada kata قُلْ keluar dari ujung dua bibir yang dimonyongkan.\n\nPernyataan yang tepat ditunjukkan oleh nomor ....",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1, 2, dan 3' },
      { id: 'B', text: '1 dan 4' },
      { id: 'C', text: '2 dan 4' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-vii-30',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-1',
    grade: 'VII',
    number: 30,
    type: 'pg',
    prompt:
      "Perhatikan karakteristik bacaan Mad Far'i berikut ini:\n1. Mad Wajib Muttashil terjadi jika huruf mad bertemu hamzah dalam satu kata dan dibaca panjang 4–5 harakat.\n2. Mad Jaiz Munfashil terjadi jika huruf mad berada di akhir kata dan bertemu hamzah di awal kata berikutnya.\n3. Panjang bacaan Mad Thabi'i lebih panjang daripada Mad Wajib Muttashil.\n4. Contoh lafaz السَّمَاءِ termasuk Mad Wajib Muttashil, sedangkan يَا أَيُّهَا termasuk Mad Jaiz Munfashil.\n\nPernyataan yang benar mengenai perbandingan hukum bacaan Mad adalah ....",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1, 2, dan 4' },
      { id: 'B', text: '1 dan 3' },
      { id: 'C', text: '2 dan 3' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['A']
  }
];
