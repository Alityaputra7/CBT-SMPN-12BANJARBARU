import { Question } from '../types/cbt';
import { GRADE_8_QUESTIONS, GRADE_9_QUESTIONS } from './grade8and9Questions';

const GRADE_7_OFFICIAL_QUESTIONS: Question[] = [
  // ==========================================
  // 1. MATEMATIKA (sbj-mat)
  // ==========================================
  {
    id: 'mat-1',
    bankId: 'qbank-mat-7',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt: 'Hitunglah nilai dari operasi aritmatika campuran bilangan bulat berikut:\n$$-18 + 24 \\div (-3) - (-12)$$',
    points: 10,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$-14$' },
      { id: 'B', text: '$-18$' },
      { id: 'C', text: '$-2$' },
      { id: 'D', text: '$6$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mat-2',
    bankId: 'qbank-mat-7',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg',
    prompt: 'Hitunglah hasil dari operasi hitung bentuk akar dan perpangkatan berikut:\n$$\\sqrt{196} + 4^3 - 5 \\times 8$$',
    points: 10,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '34' },
      { id: 'B', text: '38' },
      { id: 'C', text: '42' },
      { id: 'D', text: '46' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'mat-3',
    bankId: 'qbank-mat-7',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'pg_kompleks',
    prompt: 'Perhatikan beberapa pernyataan tentang relasi himpunan dan operasi aljabar berikut. Pilihlah semua pernyataan yang **BENAR**:',
    points: 15,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Bentuk sederhana dari $3(2x - 5) + 4x$ adalah $10x - 15$' },
      { id: 'B', text: 'Nilai dari $(-5)^2$ sama dengan $25$, sedangkan $-5^2 = -25$' },
      { id: 'C', text: 'Himpunan bilangan prima antara 10 dan 20 adalah $\\{11, 13, 17, 19\\}$' },
      { id: 'D', text: 'FPB dari 36 dan 54 adalah 9' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'mat-4',
    bankId: 'qbank-mat-7',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'benar_salah',
    prompt: 'Dua sudut yang saling berpenyiku (komplementer) memiliki jumlah besar sudut sama dengan $90^\\circ$. Jika sudut $A = 35^\\circ$, maka penyiku dari sudut $A$ adalah $55^\\circ$.',
    points: 10,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'mat-5',
    bankId: 'qbank-mat-7',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'isian',
    prompt: 'Suatu persegi panjang memiliki keliling $60\\text{ cm}$. Jika ukuran panjangnya $18\\text{ cm}$, hitunglah luas persegi panjang tersebut dalam satuan $\\text{cm}^2$! (Tuliskan hanya angkanya saja)',
    points: 15,
    difficulty: 'sedang',
    options: [],
    correctAnswerText: '216'
  },
  {
    id: 'mat-6',
    bankId: 'qbank-mat-7',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 6,
    type: 'mencocokkan',
    prompt: 'Jodohkanlah bentuk aljabar dan bilangan berpangkat berikut dengan bentuk sederhananya yang tepat:',
    points: 15,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p-1', leftText: '$$2^5$$', rightText: '32' },
      { id: 'p-2', leftText: '$$\\sqrt{225}$$', rightText: '15' },
      { id: 'p-3', leftText: '$$3(x + 4) - 2x$$', rightText: 'x + 12' },
      { id: 'p-4', leftText: '$$20\\% \\text{ dari } 250.000$$', rightText: '50.000' }
    ]
  },
  {
    id: 'mat-7',
    bankId: 'qbank-mat-7',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 7,
    type: 'uraian',
    prompt: 'Koperasi Siswa SMP Negeri 12 Banjarbaru menjual paket alat tulis. Harga 3 buku tulis dan 2 penggaris adalah Rp19.500,00. Sedangkan harga 2 buku tulis dan 3 penggaris adalah Rp18.000,00.\na) Tuliskan sistem persamaan linear dua variabel (SPLDV) yang menyatakan permasalahan tersebut!\nb) Tentukan harga masing-masing 1 buah buku tulis dan 1 buah penggaris!\nc) Jika seorang siswa membeli 5 buah buku tulis dan 2 buah penggaris dengan membayar uang Rp50.000,00, berapakah uang kembalian yang ia terima?',
    points: 25,
    difficulty: 'sukar',
    options: [],
    essayRubric: 'Rubrik: (a) Model SPLDV benar: 3b + 2p = 19500 dan 2b + 3p = 18000 (skor 8). (b) Eliminasi/substitusi benar: harga buku b = Rp4.500, harga penggaris p = Rp3.000 (skor 10). (c) Total belanja 5(4500) + 2(3000) = 22500 + 6000 = Rp28.500. Kembalian: 50000 - 28500 = Rp21.500 (skor 7).'
  },

  // ==========================================
  // 2. ILMU PENGETAHUAN ALAM / IPA (sbj-ipa)
  // ==========================================
  {
    id: 'ipa-1',
    bankId: 'qbank-ipa-7',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt: 'Satuan internasional (SI) untuk besaran pokok panjang, massa, dan suhu berturut-turut adalah...',
    points: 15,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Meter, kilogram, dan Kelvin' },
      { id: 'B', text: 'Centimeter, gram, dan Celcius' },
      { id: 'C', text: 'Meter, gram, dan Fahrenheit' },
      { id: 'D', text: 'Kilometer, ton, dan Kelvin' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa-2',
    bankId: 'qbank-ipa-7',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg_kompleks',
    prompt: 'Perhatikan ciri-ciri organel sel berikut. Manakah organel yang hanya ditemukan pada **sel tumbuhan** dan tidak ditemukan pada sel hewan? (Pilih semua yang benar)',
    points: 20,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Dinding sel yang tersusun atas selulosa' },
      { id: 'B', text: 'Kloroplas yang mengandung klorofil untuk fotosintesis' },
      { id: 'C', text: 'Mitokondria sebagai pusat respirasi sel' },
      { id: 'D', text: 'Vakuola sentral berukuran besar' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'ipa-3',
    bankId: 'qbank-ipa-7',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'benar_salah',
    prompt: 'Peristiwa perpindahan kalor secara radiasi tidak memerlukan medium (zat perantara), contohnya panas sinar matahari yang sampai ke bumi melewati ruang hampa udara.',
    points: 15,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'ipa-4',
    bankId: 'qbank-ipa-7',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'isian',
    prompt: 'Sebuah benda bermassa $4\\text{ kg}$ ditarik dengan gaya mendatar $20\\text{ N}$. Sesuai Hukum II Newton ($F = m \\times a$), percepatan yang dialami benda tersebut adalah ... $\\text{m/s}^2$. (Tulis angkanya saja)',
    points: 20,
    difficulty: 'sedang',
    options: [],
    correctAnswerText: '5'
  },
  {
    id: 'ipa-5',
    bankId: 'qbank-ipa-7',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'mencocokkan',
    prompt: 'Jodohkanlah contoh perubahan zat berikut dengan jenis perubahannya yang sesuai:',
    points: 15,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p-1', leftText: 'Besi berkarat di udara terbuka', rightText: 'Perubahan Kimia' },
      { id: 'p-2', leftText: 'Es batu mencair menjadi air', rightText: 'Perubahan Fisika' },
      { id: 'p-3', leftText: 'Kertas dibakar menjadi abu', rightText: 'Perubahan Kimia' },
      { id: 'p-4', leftText: 'Gula larut dalam air teh', rightText: 'Perubahan Fisika' }
    ]
  },
  {
    id: 'ipa-6',
    bankId: 'qbank-ipa-7',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 6,
    type: 'uraian',
    prompt: 'Jelaskan perbedaan antara perpindahan kalor secara konduksi, konveksi, dan radiasi, serta sebutkan masing-masing 1 contoh peristiwa sehari-hari di lingkungan sekolah atau rumah!',
    points: 15,
    difficulty: 'sedang',
    options: [],
    essayRubric: 'Rubrik: Konduksi perpindahan tanpa partikel berpindah (cth: sendok panas di kopi) skor 5; Konveksi perpindahan disertai aliran partikel (cth: merebus air) skor 5; Radiasi tanpa zat perantara (cth: api unggun/panas matahari) skor 5.'
  },

  // ==========================================
  // 3. BAHASA INDONESIA (sbj-bin)
  // ==========================================
  {
    id: 'bin-1',
    bankId: 'qbank-bin-7',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt: 'Bacalah kutipan teks berikut:\n\n"Hutan mangrove di pesisir Kalimantan Selatan memiliki peran ekologis yang sangat vital. Selain menahan abrasi gelombang laut, akar napas bakau menjadi habitat tempat memijah beragam jenis ikan dan kepiting bakau."\n\nIde pokok paragraf di atas adalah...',
    points: 15,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Peran ekologis hutan mangrove di pesisir Kalimantan Selatan' },
      { id: 'B', text: 'Jenis-jenis kepiting bakau di pesisir pantai' },
      { id: 'C', text: 'Bahaya abrasi gelombang air laut di muara sungai' },
      { id: 'D', text: 'Ciri fisik akar napas pohon bakau' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'bin-2',
    bankId: 'qbank-bin-7',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg_kompleks',
    prompt: 'Manakah di antara kalimat berikut yang menggunakan tanda baca dan ejaan bahasa Indonesia (EBI) yang **BAKU dan TEPAT**? (Pilih semua yang benar)',
    points: 20,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'SMP Negeri 12 Banjarbaru menyelenggarakan Ujian Akhir Semester berbasis komputer.' },
      { id: 'B', text: 'Ibu membeli perlengkapan sekolah: buku, pensil, dan penghapus di koperasi.' },
      { id: 'C', text: 'Mereka pergi ke Banjarbaru, hari Minggu yang lalu.' },
      { id: 'D', text: 'Dr. Ahmad Fathoni, M.Pd. menyampaikan sambutan pembukaan ujian.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'bin-3',
    bankId: 'qbank-bin-7',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'benar_salah',
    prompt: 'Struktur teks laporan hasil observasi (LHO) terdiri atas: Pernyataan umum/definisi umum, Deskripsi bagian, dan Deskripsi manfaat/kesimpulan.',
    points: 15,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'bin-4',
    bankId: 'qbank-bin-7',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'isian',
    prompt: 'Kata berimbuhan yang dibentuk dari kata dasar "tulis" dengan awalan "meN-" dan akhiran "-kan" adalah...',
    points: 20,
    difficulty: 'mudah',
    options: [],
    correctAnswerText: 'menuliskan'
  },
  {
    id: 'bin-5',
    bankId: 'qbank-bin-7',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'uraian',
    prompt: 'Tuliskan sebuah paragraf deskripsi singkat (minimal 3-4 kalimat) yang menggambarkan suasana ruang kelas atau lingkungan SMP Negeri 12 Banjarbaru dengan memperhatikan penggunaan kalimat efektif dan ejaan yang tepat!',
    points: 30,
    difficulty: 'sedang',
    options: [],
    essayRubric: 'Rubrik: Kepaduan paragraf dan fokus deskripsi (skor 10); Kalimat efektif dan variasi kosakata (skor 10); Ketepatan ejaan huruf kapital dan tanda baca (skor 10).'
  },

  // ==========================================
  // 4. BAHASA INGGRIS (sbj-big)
  // ==========================================
  {
    id: 'big-1',
    bankId: 'qbank-big-7',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt: 'Reno: "Hello Dani, could you tell me what time the English examination starts?"\nDani: "Sure, it starts at a quarter to eight in the morning."\n\nWhat time does the examination start?',
    points: 20,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '07:45 AM' },
      { id: 'B', text: '08:15 AM' },
      { id: 'C', text: '07:15 AM' },
      { id: 'D', text: '08:45 AM' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'big-2',
    bankId: 'qbank-big-7',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg_kompleks',
    prompt: 'Choose the grammatically **CORRECT** sentences using Simple Present Tense: (Select all that apply)',
    points: 20,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'The students always arrive at SMP Negeri 12 Banjarbaru before 07.00 AM.' },
      { id: 'B', text: 'Mr. Ahmad teaches Mathematics patiently in our classroom.' },
      { id: 'C', text: 'She do not understand the computer-based test instruction.' },
      { id: 'D', text: 'Does they bring their exam identity cards today?' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'big-3',
    bankId: 'qbank-big-7',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'isian',
    prompt: 'Complete the sentence with the correct possessive pronoun:\n"This laptop belongs to Siti. It is ________ laptop." (Fill in with one word: his/her/their/my)',
    points: 20,
    difficulty: 'mudah',
    options: [],
    correctAnswerText: 'her'
  },
  {
    id: 'big-4',
    bankId: 'qbank-big-7',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'mencocokkan',
    prompt: 'Match each English vocabulary word with its correct Indonesian meaning:',
    points: 20,
    difficulty: 'mudah',
    options: [],
    matchingPairs: [
      { id: 'p-1', leftText: 'Library', rightText: 'Perpustakaan' },
      { id: 'p-2', leftText: 'Timetable', rightText: 'Jadwal Pelajaran' },
      { id: 'p-3', leftText: 'Rules and regulations', rightText: 'Tata tertib' },
      { id: 'p-4', leftText: 'Score', rightText: 'Nilai ujian' }
    ]
  },
  {
    id: 'big-5',
    bankId: 'qbank-big-7',
    subjectId: 'sbj-big',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'uraian',
    prompt: 'Write a short self-introduction in English (3 to 5 sentences) mentioning your name, your age, where you study (SMP Negeri 12 Banjarbaru), and your favorite school subject!',
    points: 20,
    difficulty: 'sedang',
    options: [],
    essayRubric: 'Rubric: Correct grammatical structure (Simple Present Tense) 8 points; Vocabulary and completeness of information 8 points; Proper capitalization and punctuation 4 points.'
  },

  // ==========================================
  // 5. PENDIDIKAN AGAMA ISLAM / PAI (sbj-pai)
  // ==========================================
  {
    id: 'pai-1',
    bankId: 'qbank-pai-7',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt: 'Hukum bacaan Al-Qur\'an apabila huruf Alif Lam (ال) bertemu dengan huruf hijaiyah yang terbaca jelas tanpa dileburkan (izhar) disebut hukum bacaan...',
    points: 20,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Al-Qamariyah' },
      { id: 'B', text: 'Al-Syamsiyah' },
      { id: 'C', text: 'Iqlab' },
      { id: 'D', text: 'Ghunnah' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-2',
    bankId: 'qbank-pai-7',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'benar_salah',
    prompt: 'Shalat fardhu yang dikerjakan secara berjamaah memiliki keutamaan pahala 27 derajat lebih tinggi dibandingkan dengan shalat yang dikerjakan secara sendirian (munfarid).',
    points: 20,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'pai-3',
    bankId: 'qbank-pai-7',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'pg_kompleks',
    prompt: 'Perhatikan perilaku terpuji berikut. Manakah contoh perbuatan yang mencerminkan sifat **Amanah** dan **Jujur** saat mengikuti Ujian CBT di sekolah? (Pilih semua yang tepat)',
    points: 25,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Mengerjakan soal dengan kemampuan diri sendiri tanpa mencontek' },
      { id: 'B', text: 'Tidak membagikan kode token ujian kepada siswa yang belum hadir' },
      { id: 'C', text: 'Menjaga dan merawat perangkat komputer ujian sekolah dengan baik' },
      { id: 'D', text: 'Membuka tab mesin pencari untuk mencari kunci jawaban' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'pai-4',
    bankId: 'qbank-pai-7',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'uraian',
    prompt: 'Jelaskan pengertian Asmaul Husna Al-Alim (Maha Mengetahui) dan Al-Khabir (Maha Waspada/Teliti), serta jelaskan bagaimana sikap seorang siswa beriman saat menghadapi ujian jika meyakini dua sifat Allah SWT tersebut!',
    points: 35,
    difficulty: 'sedang',
    options: [],
    essayRubric: 'Rubrik: Pengertian Al-Alim dan Al-Khabir tepat (skor 15); Implementasi kejujuran dan keyakinan bahwa Allah selalu mengawasi segala amal perbuatan (skor 20).'
  },

  // ==========================================
  // 6. INFORMATIKA (sbj-inf)
  // ==========================================
  {
    id: 'inf-1',
    bankId: 'qbank-inf-7',
    subjectId: 'sbj-inf',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt: 'Perangkat keras komputer yang berfungsi sebagai otak utama untuk memproses seluruh instruksi program sistem CBT adalah...',
    points: 20,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Central Processing Unit (CPU)' },
      { id: 'B', text: 'Hard Disk Drive (HDD)' },
      { id: 'C', text: 'Monitor' },
      { id: 'D', text: 'Keyboard' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'inf-2',
    bankId: 'qbank-inf-7',
    subjectId: 'sbj-inf',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg_kompleks',
    prompt: 'Manakah di antara praktik berikut yang merupakan langkah **keamanan digital (cyber security)** yang baik untuk akun ujian siswa? (Pilih semua yang benar)',
    points: 25,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Menggunakan kombinasi kata sandi huruf besar, huruf kecil, dan angka' },
      { id: 'B', text: 'Selalu melakukan Logout setelah selesai menggunakan komputer lab' },
      { id: 'C', text: 'Memberitahukan password akun ke teman sekelas agar bisa login bersamaan' },
      { id: 'D', text: 'Tidak mengklik tautan mencurigakan atau mengunduh file tidak dikenal' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'inf-3',
    bankId: 'qbank-inf-7',
    subjectId: 'sbj-inf',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'mencocokkan',
    prompt: 'Jodohkan istilah informatika berikut dengan fungsinya yang tepat:',
    points: 25,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p-1', leftText: 'Browser Web (Chrome/Edge)', rightText: 'Aplikasi pembuka halaman CBT' },
      { id: 'p-2', leftText: 'Local Area Network (LAN)', rightText: 'Jaringan kabel lokal komputer sekolah' },
      { id: 'p-3', leftText: 'Algoritma', rightText: 'Urutan langkah logis penyelesaian masalah' },
      { id: 'p-4', leftText: 'RAM (Random Access Memory)', rightText: 'Penyimpanan sementara saat aplikasi berjalan' }
    ]
  },
  {
    id: 'inf-4',
    bankId: 'qbank-inf-7',
    subjectId: 'sbj-inf',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'uraian',
    prompt: 'Jelaskan apa yang dimaksud dengan Computational Thinking (Berpikir Komputasional) dan sebutkan 4 pilar utamanya (Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma)!',
    points: 30,
    difficulty: 'sedang',
    options: [],
    essayRubric: 'Rubrik: Pengertian berpikir komputasional tepat (skor 10); Penjelasan Dekomposisi & Pola tepat (skor 10); Penjelasan Abstraksi & Algoritma tepat (skor 10).'
  }
];

export const OFFICIAL_QUESTION_LIST: Question[] = [
  ...GRADE_7_OFFICIAL_QUESTIONS,
  ...GRADE_8_QUESTIONS,
  ...GRADE_9_QUESTIONS
];

export const OFFICIAL_EXAM_SCHEDULES = [
  {
    id: 'ex-mat-2026',
    title: 'UAS Semester Ganjil - Matematika',
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
    status: 'ongoing' as const,
    tokenRequired: true
  },
  {
    id: 'ex-ipa-2026',
    title: 'UAS Semester Ganjil - Ilmu Pengetahuan Alam (IPA)',
    subjectId: 'sbj-ipa',
    subjectName: 'Ilmu Pengetahuan Alam (IPA)',
    targetClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9'],
    targetClassNames: ['VII', 'VIII-A', 'VIII-B', 'IX'],
    date: '2026-10-25',
    startTime: '07:30',
    endTime: '12:00',
    durationMinutes: 90,
    kkm: 75,
    randomizeQuestions: true,
    randomizeOptions: true,
    questionBankId: 'qbank-ipa-7',
    status: 'ongoing' as const,
    tokenRequired: true
  },
  {
    id: 'ex-bin-2026',
    title: 'UAS Semester Ganjil - Bahasa Indonesia',
    subjectId: 'sbj-bin',
    subjectName: 'Bahasa Indonesia',
    targetClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9'],
    targetClassNames: ['VII', 'VIII-A', 'VIII-B', 'IX'],
    date: '2026-10-25',
    startTime: '07:30',
    endTime: '12:00',
    durationMinutes: 90,
    kkm: 75,
    randomizeQuestions: true,
    randomizeOptions: true,
    questionBankId: 'qbank-bin-7',
    status: 'ongoing' as const,
    tokenRequired: true
  },
  {
    id: 'ex-big-2026',
    title: 'UAS Semester Ganjil - Bahasa Inggris',
    subjectId: 'sbj-big',
    subjectName: 'Bahasa Inggris',
    targetClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9'],
    targetClassNames: ['VII', 'VIII-A', 'VIII-B', 'IX'],
    date: '2026-10-25',
    startTime: '07:30',
    endTime: '12:00',
    durationMinutes: 90,
    kkm: 75,
    randomizeQuestions: true,
    randomizeOptions: true,
    questionBankId: 'qbank-big-7',
    status: 'ongoing' as const,
    tokenRequired: true
  },
  {
    id: 'ex-pai-2026',
    title: 'UAS Semester Ganjil - Pendidikan Agama Islam',
    subjectId: 'sbj-pai',
    subjectName: 'Pendidikan Agama Islam',
    targetClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9'],
    targetClassNames: ['VII', 'VIII-A', 'VIII-B', 'IX'],
    date: '2026-10-25',
    startTime: '07:30',
    endTime: '12:00',
    durationMinutes: 90,
    kkm: 75,
    randomizeQuestions: true,
    randomizeOptions: true,
    questionBankId: 'qbank-pai-7',
    status: 'ongoing' as const,
    tokenRequired: true
  },
  {
    id: 'ex-inf-2026',
    title: 'UAS Semester Ganjil - Informatika',
    subjectId: 'sbj-inf',
    subjectName: 'Informatika',
    targetClassIds: ['cls-1', 'cls-8a', 'cls-8b', 'cls-9'],
    targetClassNames: ['VII', 'VIII-A', 'VIII-B', 'IX'],
    date: '2026-10-25',
    startTime: '07:30',
    endTime: '12:00',
    durationMinutes: 90,
    kkm: 75,
    randomizeQuestions: true,
    randomizeOptions: true,
    questionBankId: 'qbank-inf-7',
    status: 'ongoing' as const,
    tokenRequired: true
  }
];
