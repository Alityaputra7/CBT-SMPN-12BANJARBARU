import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI BACA TULIS AL-QUR'AN (BTQ) KELAS VIII SMPN 12 BANJARBARU
// Sumber: Soal_BTA_Kelas_8_52e40365.pdf (30 Soal Lengkap, Total Skor = 100)
// Pedoman Penskoran Resmi (Hal. 9):
// - Bagian A: 20 Pilihan Ganda Biasa (No. 1-20) x 2 poin = 40 poin
// - Bagian B: 10 Pilihan Ganda Kompleks / Campuran (No. 21-30) x 6 poin = 60 poin
// Total = 100 poin
// =========================================================================

export const BTQ_KELAS_8_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // BAGIAN A: PILIHAN GANDA BIASA (No. 1 - 20, 2 poin/soal = 40 poin)
  // -----------------------------------------------------------------------
  {
    id: 'btq-viii-1',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt:
      "Pada kegiatan tadarus pagi di SMPN 12 Banjarbaru, Ahmad membaca Al-Qur'an dengan tempo sedang—tidak terlalu lambat seperti orang belajar dan tidak pula terlalu cepat hingga mengabaikan tajwid. Tingkatan tempo bacaan yang diterapkan Ahmad adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Tahqiq' },
      { id: 'B', text: 'Tartil' },
      { id: 'C', text: 'Tadwir' },
      { id: 'D', text: 'Hadr' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-viii-2',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg',
    prompt:
      'Seorang guru BTQ mencontohkan pelafalan makhraj huruf dan panjang mad secara sangat perlahan, jelas, dan teliti agar siswa kelas 8 mampu menirukan setiap ketukan harakat dengan tepat. Metode tempo bacaan yang digunakan guru tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Hadr' },
      { id: 'B', text: 'Tadwir' },
      { id: 'C', text: 'Tahqiq' },
      { id: 'D', text: 'Muraqabah' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-viii-3',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'pg',
    prompt:
      'Perhatikan kasus berikut!\nSaat membaca QS. Al-Fatihah ayat 7, seorang siswa membaca lafaz أَنْعَمْتَ (an\'amta) menjadi أَنْعَمْتُ (an\'amtu). Perubahan harakat akhir tersebut menyebabkan perubahan makna dari "Engkau telah memberi nikmat" menjadi "Aku telah memberi nikmat". Kesalahan bacaan ini dikategorikan sebagai ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Lahn Khafiy, karena hanya mengurangi keindahan irama bacaan' },
      { id: 'B', text: 'Lahn Jaliy, karena kesalahan harakat yang mengubah arti secara nyata' },
      { id: 'C', text: 'Lahn Khafiy, karena kesalahan terjadi pada huruf yang bertasydid' },
      { id: 'D', text: 'Lahn Jaliy, karena pembaca tidak berhenti pada tanda waqaf yang tepat' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-4',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 4,
    type: 'pg',
    prompt:
      'Fatimah membaca hukum bacaan idgham bighunnah tanpa menahan dengung selama dua harakat, tetapi pelafalan seluruh huruf dan harakatnya sudah benar sehingga tidak merusak arti kata. Kesalahan Fatimah tersebut dikenal dengan istilah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Lahn Jaliy' },
      { id: 'B', text: 'Lahn Khafiy' },
      { id: 'C', text: 'Waqaf Qabih' },
      { id: 'D', text: 'Isymaam' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-5',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 5,
    type: 'pg',
    prompt:
      "Salah satu keutamaan membaca Al-Qur'an dijelaskan dalam hadis Nabi Muhammad saw. bahwa orang yang mahir membaca Al-Qur'an akan bersama para malaikat yang mulia, sedangkan orang yang membaca Al-Qur'an dengan terbata-bata dan merasa kesulitan akan mendapatkan ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Satu pahala karena belum lancar' },
      { id: 'B', text: 'Dua pahala (pahala membaca dan pahala kesungguhannya)' },
      { id: 'C', text: 'Ampunan dosa tanpa perlu memperbaiki bacaan' },
      { id: 'D', text: 'Keringanan untuk cukup mendengarkan saja' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-6',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 6,
    type: 'pg',
    prompt:
      "Perhatikan daftar huruf hijaiyah berikut:\n(1) خ\n(2) م\n(3) ص\n(4) ب\n(5) ط\n(6) ق\n\nKelompok huruf isti'la yang wajib dibaca tebal (tafkhim) ditunjukkan oleh nomor ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '(1), (2), (3), dan (4)' },
      { id: 'B', text: '(1), (3), (5), dan (6)' },
      { id: 'C', text: '(2), (3), (4), dan (5)' },
      { id: 'D', text: '(2), (4), (5), dan (6)' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-7',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 7,
    type: 'pg',
    prompt:
      'Cermati potongan ayat berikut!\nبِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ\n\nLafaz Jalalah (اللهِ) pada potongan ayat di atas harus dibaca tipis (tarqiq). Analisis alasan hukum bacaan yang paling tepat adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Lafaz Jalalah didahului oleh huruf mim yang berharakat kasrah' },
      { id: 'B', text: 'Lafaz Jalalah berada di awal kalimat atau permulaan bacaan' },
      { id: 'C', text: 'Lafaz Jalalah bertemu dengan huruf ra yang bertasydid' },
      { id: 'D', text: 'Lafaz Jalalah didahului oleh huruf sin yang berharakat sukun' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-viii-8',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 8,
    type: 'pg',
    prompt:
      'Perhatikan empat lafaz berikut!\n1. رَبَّنَا\n2. رِزْقًا\n3. قُرْآنٌ\n4. فِرْعَوْنَ\n\nLafaz yang mengandung hukum bacaan Ra Tarqiq (dibaca tipis) ditunjukkan oleh nomor ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1 dan 2' },
      { id: 'B', text: '1 dan 3' },
      { id: 'C', text: '2 dan 3' },
      { id: 'D', text: '2 dan 4' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'btq-viii-9',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 9,
    type: 'pg',
    prompt:
      "Pada lafaz وَالْعَصْرِ (wal-'ashri), apabila pembaca mewaqafkan (berhenti) di akhir kata tersebut, huruf ra menjadi sukun karena waqaf. Cara membaca huruf ra pada kondisi tersebut adalah ....",
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Tarqiq, karena huruf ra berharakat asli kasrah' },
      { id: 'B', text: 'Tafkhim, karena sebelumnya terdapat huruf sukun (shad) yang didahului huruf berharakat fathah' },
      { id: 'C', text: 'Tarqiq, karena berada di akhir ayat' },
      { id: 'D', text: "Boleh tafkhim atau tarqiq karena huruf shad termasuk huruf isti'la" }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-10',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 10,
    type: 'pg',
    prompt:
      "Huruf ra sukun pada lafaz فِرْقَةٍ (firqatin) didahului oleh huruf fa berharakat kasrah, namun setelah huruf ra sukun terdapat huruf qaf berharakat fathah. Berdasarkan kaidah ilmu tajwid, hukum bacaan ra tersebut adalah ....",
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Tarqiq, karena kaidah utamanya melihat harakat kasrah sebelum ra sukun' },
      { id: 'B', text: "Tafkhim, karena setelah ra sukun terdapat huruf isti'la berharakat fathah dalam satu kata" },
      { id: 'C', text: "Tarqiq, karena huruf fa bukan merupakan huruf isti'la" },
      { id: 'D', text: 'Tafkhim, karena huruf ra berada di tengah kalimat' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-11',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 11,
    type: 'pg',
    prompt:
      "Perhatikan potongan ayat berikut:\nنُوْحِيْهَا (nūḥīhā)\n\nDalam satu kata tersebut terkumpul seluruh huruf mad asli/thabi'i secara berurutan. Ketiga huruf mad yang dimaksud adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Alif, Ya sukun, dan Nun' },
      { id: 'B', text: 'Wawu sukun, Alif, dan Ha' },
      { id: 'C', text: 'Wawu sukun, Ya sukun, dan Alif' },
      { id: 'D', text: 'Dammah, Kasrah, dan Fathah' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-viii-12',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 12,
    type: 'pg',
    prompt: "Perbedaan mendasar antara Mad Thabi'i (Asli) dan Mad Far'i terletak pada ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Letak huruf mad yang selalu berada di awal kalimat' },
      { id: 'B', text: 'Panjang harakat dan ada tidaknya sebab lain seperti hamzah atau sukun setelah huruf mad' },
      { id: 'C', text: "Jenis mushaf Al-Qur'an yang digunakan oleh pembaca" },
      { id: 'D', text: 'Kewajiban untuk selalu menghentikan bacaan pada huruf mad' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-13',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 13,
    type: 'pg',
    prompt:
      "Ketika membaca akhir ayat pada surah Al-Ma'un: فَوَيْلٌ لِلْمُصَلِّيْنَ, pembaca menghentikan napas pada kata لِلْمُصَلِّيْنَ sehingga huruf nun terakhir disukunkan setelah huruf mad ya. Hukum bacaan mad yang terjadi karena waqaf tersebut adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Mad Wajib Muttashil' },
      { id: 'B', text: 'Mad Jaiz Munfashil' },
      { id: 'C', text: "Mad 'Aridh Lissukun" },
      { id: 'D', text: 'Mad Badal' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-viii-14',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 14,
    type: 'pg',
    prompt:
      "Perhatikan dua potongan ayat berikut!\nPotongan I: إِذَا جَاءَ نَصْرُ اللهِ (idzaa jaa-a nashrullaah)\nPotongan II: إِنَّا أَعْطَيْنَاكَ (innaa a'thainaaka)\n\nPerbandingan hukum bacaan mad pada kedua potongan ayat tersebut yang paling tepat adalah ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Potongan I adalah Mad Jaiz Munfashil (dalam dua kata), sedangkan Potongan II adalah Mad Wajib Muttashil (dalam satu kata)' },
      { id: 'B', text: 'Potongan I adalah Mad Wajib Muttashil (huruf mad dan hamzah dalam satu kata), sedangkan Potongan II adalah Mad Jaiz Munfashil (dalam dua kata terpisah)' },
      { id: 'C', text: "Keduanya merupakan Mad Thabi'i karena panjang bacaannya sama-sama 2 harakat" },
      { id: 'D', text: 'Keduanya merupakan Mad Lazim Mutsaqqal Kilmi karena terdapat huruf bertasydid' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-15',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 15,
    type: 'pg',
    prompt:
      'Saat membaca QS. Al-Kahfi ayat 1–2, Rina menemukan tanda huruf sin kecil (س) di atas akhir lafaz عِوَجَا ۜ قَيِّمًا. Rina berhenti sejenak sekitar dua harakat tanpa mengambil napas baru, lalu melanjutkan bacaannya. Bacaan khusus yang dipraktikkan Rina disebut ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Imalah' },
      { id: 'B', text: 'Isymaam' },
      { id: 'C', text: 'Tashil' },
      { id: 'D', text: 'Saktah' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'btq-viii-16',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 16,
    type: 'pg',
    prompt:
      'Pada QS. Hud ayat 41 terdapat lafaz مَجْرٰىهَا yang memiliki tanda wajik/belah ketupat di bawah huruf ra. Cara melafalkan bunyi vokal pada huruf ra tersebut menurut bacaan khusus dalam mushaf adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Memonyongkan kedua bibir ke depan tanpa suara di tengah dengung' },
      { id: 'B', text: 'Memiringkan bunyi vokal fathah ke arah kasrah (sehingga terdengar seperti majrēhā)' },
      { id: 'C', text: 'Meringankan bunyi hamzah kedua di antara hamzah dan alif' },
      { id: 'D', text: 'Menghentikan suara selama empat harakat sambil menarik napas' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-17',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 17,
    type: 'pg',
    prompt:
      'Perhatikan tanda waqaf berikut beserta artinya:\n1. مـ : Waqaf Lazim (harus berhenti)\n2. لا : Larangan berhenti\n3. ج : Waqaf Jaiz (boleh berhenti, boleh lanjut)\n4. صلى : Lebih utama berhenti\n\nPasangan tanda waqaf dan keterangannya yang tidak tepat ditunjukkan oleh nomor ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '3' },
      { id: 'D', text: '4' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'btq-viii-18',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 18,
    type: 'pg',
    prompt:
      "Ketika membaca Al-Qur'an, Yusuf menemukan tanda simbol kubah kecil disertai tulisan السجدة (As-Sajdah) di pinggir halaman mushaf serta garis di atas kata tertentu. Tindakan yang disunnahkan bagi Yusuf setelah membaca ayat tersebut adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Berhenti sejenak tanpa bernapas selama 2 harakat' },
      { id: 'B', text: 'Mengulang ayat tersebut sebanyak tiga kali' },
      { id: 'C', text: 'Melakukan sujud tilawah sambil membaca doa sujud tilawah' },
      { id: 'D', text: 'Mengubah harakat akhir ayat menjadi kasrah' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-viii-19',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 19,
    type: 'pg',
    prompt:
      "Bacaan khusus Tashil hanya terdapat satu tempat di dalam Al-Qur'an, yaitu pada QS. Fussilat ayat 44 pada lafaz ءَاَعْجَمِيٌّ (a-a'jamiyyun). Pengertian dan cara membaca tashil pada lafaz tersebut adalah ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Membaca dua hamzah secara tebal dan ditekan kuat' },
      { id: 'B', text: 'Meringankan bunyi hamzah kedua di antara bunyi hamzah dan alif' },
      { id: 'C', text: 'Menghilangkan hamzah pertama dan menggantinya dengan huruf ha' },
      { id: 'D', text: 'Memanjangkan hamzah pertama hingga enam harakat' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-viii-20',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 20,
    type: 'pg',
    prompt:
      'Perhatikan tanda waqaf قلى (Al-Waqfu Aula) pada sebuah ayat panjang. Jika seorang siswa memiliki napas yang masih cukup panjang, sikap terbaik sesuai kaidah waqaf tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Tetap disarankan berhenti karena berhenti pada tanda qaf-lam-ya lebih utama daripada meneruskan bacaan' },
      { id: 'B', text: 'Wajib terus melanjutkan bacaan karena berhenti pada tanda tersebut hukumnya haram' },
      { id: 'C', text: 'Mengulang kembali bacaan dari awal surah' },
      { id: 'D', text: 'Berhenti tanpa menyukunkan huruf terakhir' }
    ],
    correctAnswers: ['A']
  },

  // -----------------------------------------------------------------------
  // BAGIAN B: PILIHAN GANDA KOMPLEKS / CAMPURAN (No. 21 - 30, 6 poin/soal = 60 poin)
  // -----------------------------------------------------------------------
  {
    id: 'btq-viii-21',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 21,
    type: 'pg_kompleks',
    prompt:
      "Perhatikan pernyataan mengenai adab dan tingkatan membaca Al-Qur'an berikut!\nManakah dua (2) pernyataan yang benar terkait etika dan cara membaca Al-Qur'an?",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "Membaca Al-Qur'an dengan tempo cepat (hadr) diperbolehkan selama hukum tajwid dan makhraj huruf tetap terjaga." },
      { id: 'B', text: "Membaca Al-Qur'an dengan suara keras di dekat orang yang sedang salat wajib diutamakan agar terdengar syiarnya." },
      { id: 'C', text: "Dalam keadaan berhadas kecil, seseorang tetap diperbolehkan membaca Al-Qur'an secara hafalan tanpa menyentuh mushaf secara langsung." },
      { id: 'D', text: "Tartil berarti membaca Al-Qur'an secepat mungkin agar segera khatam dalam waktu singkat." }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'btq-viii-22',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 22,
    type: 'pg_kompleks',
    prompt:
      "Analisis dampak kesalahan membaca Al-Qur'an pada kasus berikut!\nManakah dua (2) contoh kasus yang termasuk kategori Lahn Jaliy (kesalahan nyata/fatal)?",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Membaca huruf ق (qaf) pada قُلْ menjadi ك (kaf) sehingga berubah makna dari "Katakanlah" menjadi "Makanlah".' },
      { id: 'B', text: 'Kurang sempurna dalam memberikan sifat qalqalah sughra pada huruf ba sukun di tengah kata.' },
      { id: 'C', text: 'Mengubah harakat kasrah menjadi fathah pada kata أَنْعَمْتَ sehingga merusak struktur bahasa Arab dan artinya.' },
      { id: 'D', text: 'Memanjangkan bacaan ghunnah hanya 1 harakat yang seharusnya 2 harakat.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'btq-viii-23',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 23,
    type: 'pg_kompleks',
    prompt:
      'Perhatikan potongan-potongan ayat berikut!\n1. قُلْ هُوَ اللهُ أَحَدٌ\n2. بِسْمِ اللهِ\n3. نَصْرُ اللهِ\n4. فِي دِيْنِ اللهِ\n\nPilihlah dua (2) potongan ayat yang Lafaz Jalalah-nya dibaca Tafkhim (tebal)!',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Potongan ayat nomor 1' },
      { id: 'B', text: 'Potongan ayat nomor 2' },
      { id: 'C', text: 'Potongan ayat nomor 3' },
      { id: 'D', text: 'Potongan ayat nomor 4' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'btq-viii-24',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 24,
    type: 'pg_kompleks',
    prompt:
      'Cermati kata-kata berikut yang mengandung huruf ra:\n1. رُسُلٌ (rusulun)\n2. مِرْيَةٍ (miryatin)\n3. الرَّحْمٰنِ (ar-raḥmāni)\n4. خَيْرٌ (khairun — ketika diwaqafkan)\n\nManakah dua (2) kata yang huruf ra-nya dibaca Tarqiq (tipis)?',
    points: 6,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Kata nomor 1' },
      { id: 'B', text: 'Kata nomor 2' },
      { id: 'C', text: 'Kata nomor 3' },
      { id: 'D', text: 'Kata nomor 4' }
    ],
    correctAnswers: ['B', 'D']
  },
  {
    id: 'btq-viii-25',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 25,
    type: 'pg_kompleks',
    prompt:
      "Huruf isti'la memiliki sifat terangkatnya pangkal lidah ke langit-langit atas sehingga menghasilkan bunyi tebal (tafkhim).\nPilihlah tiga (3) huruf yang termasuk kelompok huruf isti'la!",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'ظ (Zha)' },
      { id: 'B', text: 'س (Sin)' },
      { id: 'C', text: 'غ (Ghain)' },
      { id: 'D', text: 'ض (Dhad)' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'btq-viii-26',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 26,
    type: 'pg_kompleks',
    prompt:
      'Perhatikan ketentuan panjang bacaan hukum mad berikut!\nManakah dua (2) pernyataan yang benar mengenai perbedaan dan aturan panjang bacaan mad?',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "Mad Thabi'i memiliki panjang bacaan tetap, yaitu 1 alif atau 2 harakat." },
      { id: 'B', text: 'Mad Lazim Mutsaqqal Kilmi dibaca panjang 6 harakat (3 alif) karena huruf mad bertemu huruf bertasydid dalam satu kata.' },
      { id: 'C', text: 'Mad Jaiz Munfashil hanya boleh dibaca 1 harakat saja.' },
      { id: 'D', text: "Semua jenis Mad Far'i panjang bacaannya tidak boleh melebihi 2 harakat." }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'btq-viii-27',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 27,
    type: 'pg_kompleks',
    prompt:
      'Identifikasi hukum bacaan mad pada lafaz-lafaz di bawah ini!\nManakah dua (2) pasangan lafaz dan hukum bacaan mad yang tepat?',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'وَلَا الضَّالِّيْنَ → Mad Lazim Mutsaqqal Kilmi' },
      { id: 'B', text: "يَعْلَمُوْنَ (diwaqafkan) → Mad 'Aridh Lissukun" },
      { id: 'C', text: 'قَالُوْا → Mad Wajib Muttashil' },
      { id: 'D', text: "أُولٰئِكَ → Mad Thabi'i" }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'btq-viii-28',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 28,
    type: 'pg_kompleks',
    prompt:
      "Dalam mushaf Al-Qur'an terdapat tanda waqaf ∴ ∴ (Waqaf Mu'anaqah / Muraqabah), seperti pada awal surah Al-Baqarah: ذٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيْهِ ۛ هُدًى لِلْمُتَّقِيْنَ.\nManakah dua (2) pernyataan yang benar mengenai cara membaca tanda waqaf tersebut?",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Pembaca boleh berhenti pada salah satu tanda titik tiga saja (tanda pertama atau tanda kedua).' },
      { id: 'B', text: 'Pembaca wajib berhenti pada kedua tanda titik tiga secara berturut-turut.' },
      { id: 'C', text: 'Jika sudah berhenti pada tanda titik tiga pertama (لَا رَيْبَ), maka tanda titik tiga kedua (فِيْهِ) harus dibaca terus (washal).' },
      { id: 'D', text: 'Tanda tersebut berarti dilarang berhenti sama sekali dari awal hingga akhir ayat.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'btq-viii-29',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 29,
    type: 'pg_kompleks',
    prompt:
      "Perhatikan tanda baca khusus (bacaan gharib) dalam mushaf Al-Qur'an berikut!\nManakah tiga (3) bacaan khusus beserta contoh lokasinya dalam Al-Qur'an yang benar?",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Saktah: Berhenti sejenak tanpa bernapas, terdapat pada QS. Yasin ayat 52 (مِنْ مَرْقَدِنَا ۜ هٰذَا).' },
      { id: 'B', text: 'Isymaam: Memonyongkan kedua bibir tanpa suara saat dengung, terdapat pada QS. Yusuf ayat 11 (لَا تَأْمَنَّا).' },
      { id: 'C', text: 'Imalah: Memiringkan bunyi fathah ke kasrah, terdapat pada QS. Hud ayat 41 (مَجْرٰىهَا).' },
      { id: 'D', text: 'Tashil: Mengganti bunyi huruf mim sukun menjadi nun, terdapat pada QS. Al-Ikhlas ayat 1.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'btq-viii-30',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-8',
    grade: 'VIII',
    number: 30,
    type: 'pg_kompleks',
    prompt:
      'Saat membaca QS. Al-Qiyamah ayat 27: وَقِيْلَ مَنْ ۜ رَاقٍ, terdapat tanda س (saktah) di atas huruf nun sukun. Mengapa tanda saktah diterapkan pada pertemuan huruf nun sukun dan ra tersebut?\nPilihlah dua (2) alasan yang tepat!',
    points: 6,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Untuk mencegah terjadinya peleburan bunyi (idgham bilaghunnah) yang dapat mengaburkan makna kata "siapa yang menyembuhkan" (man rāqin) menjadi "tukang sihir/peruqyah" (marrāqin).' },
      { id: 'B', text: 'Karena huruf nun dan ra memiliki makhraj yang sama persis sehingga wajib dibaca dengung.' },
      { id: 'C', text: 'Agar pembaca memisahkan pelafalan kata مَنْ dan رَاقٍ melalui jeda tanpa napas sehingga kejelasan makna ayat terjaga.' },
      { id: 'D', text: 'Karena tanda saktah mewajibkan pembaca berhenti total dan mengakhiri bacaan pada ayat tersebut.' }
    ],
    correctAnswers: ['A', 'C']
  }
];
