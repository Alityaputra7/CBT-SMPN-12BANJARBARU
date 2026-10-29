import { Question } from '../types/cbt';

export const GRADE_8_QUESTIONS: Question[] = [
  // ==========================================
  // KELAS VIII: MATEMATIKA (sbj-mat)
  // ==========================================
  {
    id: 'mat8-1',
    bankId: 'qbank-mat-8',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt: 'Sebuah segitiga siku-siku memiliki panjang sisi tegak $9\\text{ cm}$ dan $12\\text{ cm}$. Berdasarkan Teorema Pythagoras ($c^2 = a^2 + b^2$), panjang sisi miring (hipotenusa) segitiga tersebut adalah...',
    points: 15,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$15\\text{ cm}$' },
      { id: 'B', text: '$18\\text{ cm}$' },
      { id: 'C', text: '$21\\text{ cm}$' },
      { id: 'D', text: '$25\\text{ cm}$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mat8-2',
    bankId: 'qbank-mat-8',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg',
    prompt: 'Diketahui barisan aritmatika: $3, 7, 11, 15, 19, \\dots$. Suku ke-25 ($U_{25}$) dari barisan aritmatika tersebut adalah...',
    points: 15,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '95' },
      { id: 'B', text: '99' },
      { id: 'C', text: '103' },
      { id: 'D', text: '107' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'mat8-3',
    bankId: 'qbank-mat-8',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'pg_kompleks',
    prompt: 'Diketahui rumus fungsi linear $f(x) = 4x - 7$. Manakah pernyataan berikut yang **BENAR**? (Pilih semua yang benar)',
    points: 20,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Nilai dari $f(3) = 5$' },
      { id: 'B', text: 'Nilai dari $f(-2) = -15$' },
      { id: 'C', text: 'Bayangan dari $0$ adalah $-7$' },
      { id: 'D', text: 'Jika $f(a) = 17$, maka nilai $a = 6$' }
    ],
    correctAnswers: ['A', 'B', 'C', 'D']
  },
  {
    id: 'mat8-4',
    bankId: 'qbank-mat-8',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 4,
    type: 'benar_salah',
    prompt: 'Gradien garis yang melalui titik pusat $(0,0)$ dan titik $(4, 8)$ bernilai $m = 2$.',
    points: 10,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'mat8-5',
    bankId: 'qbank-mat-8',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 5,
    type: 'mencocokkan',
    prompt: 'Jodohkan persamaan garis lurus berikut dengan nilai gradiennya ($m$):',
    points: 20,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p-1', leftText: '$$y = 3x + 5$$', rightText: 'm = 3' },
      { id: 'p-2', leftText: '$$2x + y = 7$$', rightText: 'm = -2' },
      { id: 'p-3', leftText: '$$4y - 8x = 12$$', rightText: 'm = 2' },
      { id: 'p-4', leftText: '$$y = -x + 4$$', rightText: 'm = -1' }
    ]
  },
  {
    id: 'mat8-6',
    bankId: 'qbank-mat-8',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 6,
    type: 'uraian',
    prompt: 'Seorang pedagang di kantin SMPN 12 Banjarbaru menjual 4 porsi nasi kuning dan 3 gelas es teh seharga Rp38.000,00. Sedangkan 2 porsi nasi kuning dan 5 gelas es teh seharga Rp30.000,00.\na) Buatlah model matematika dalam bentuk Sistem Persamaan Linear Dua Variabel (SPLDV)!\nb) Hitunglah harga 1 porsi nasi kuning dan 1 gelas es teh!\nc) Berapakah yang harus dibayar jika membeli 3 porsi nasi kuning dan 2 gelas es teh?',
    points: 20,
    difficulty: 'sukar',
    options: [],
    essayRubric: 'Rubrik: (a) Model 4x + 3y = 38000 dan 2x + 5y = 30000 (skor 6); (b) Eliminasi/substitusi x = 7000 (nasi) dan y = 3200 (teh) (skor 8); (c) 3(7000) + 2(3200) = 21000 + 6400 = Rp27.400 (skor 6).'
  },

  // ==========================================
  // KELAS VIII: IPA (sbj-ipa)
  // ==========================================
  {
    id: 'ipa8-1',
    bankId: 'qbank-ipa-8',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt: 'Enzim yang dihasilkan oleh kelenjar lambung untuk mengubah protein menjadi pepton adalah...',
    points: 15,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Pepsin' },
      { id: 'B', text: 'Amilase' },
      { id: 'C', text: 'Lipase' },
      { id: 'D', text: 'Tripsin' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa8-2',
    bankId: 'qbank-ipa-8',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg_kompleks',
    prompt: 'Manakah zat berikut yang termasuk bahan **pemanis buatan** yang diizinkan untuk industri makanan sesuai batas konsumsi aman? (Pilih semua yang benar)',
    points: 20,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Aspartam' },
      { id: 'B', text: 'Sakarin' },
      { id: 'C', text: 'Siklamat' },
      { id: 'D', text: 'Rhodamin B' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'ipa8-3',
    bankId: 'qbank-ipa-8',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'benar_salah',
    prompt: 'Hukum Pascal menyatakan bahwa tekanan yang diberikan pada zat cair dalam ruang tertutup akan diteruskan ke segala arah dengan sama besar.',
    points: 15,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'ipa8-4',
    bankId: 'qbank-ipa-8',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 4,
    type: 'isian',
    prompt: 'Sebuah benda berada pada kedalaman $2\\text{ meter}$ di dalam kolam air (massa jenis air $\\rho = 1.000\\text{ kg/m}^3$ dan percepatan gravitasi $g = 10\\text{ m/s}^2$). Besar tekanan hidrostatis ($P = \\rho \\cdot g \\cdot h$) yang dialami benda tersebut adalah ... $\\text{Pascal}$. (Tulis hanya angkanya)',
    points: 20,
    difficulty: 'sedang',
    options: [],
    correctAnswerText: '20000'
  },
  {
    id: 'ipa8-5',
    bankId: 'qbank-ipa-8',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 5,
    type: 'uraian',
    prompt: 'Jelaskan perbedaan peredaran darah besar dan peredaran darah kecil pada manusia, lengkap dengan urutan jalannya darah mulai dari jantung dan organ yang dituju!',
    points: 30,
    difficulty: 'sedang',
    options: [],
    essayRubric: 'Rubrik: Peredaran darah besar (bilik kiri -> aorta -> seluruh tubuh -> vena cava -> serambi kanan) skor 15; Peredaran darah kecil (bilik kanan -> arteri pulmonalis -> paru-paru -> vena pulmonalis -> serambi kiri) skor 15.'
  },

  // ==========================================
  // KELAS VIII: BAHASA INDONESIA (sbj-bin)
  // ==========================================
  {
    id: 'bin8-1',
    bankId: 'qbank-bin-8',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt: 'Unsur berita yang menjawab pertanyaan tentang tempat dan waktu terjadinya suatu peristiwa berturut-turut adalah...',
    points: 20,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Di mana (Where) dan Kapan (When)' },
      { id: 'B', text: 'Apa (What) dan Siapa (Who)' },
      { id: 'C', text: 'Mengapa (Why) dan Bagaimana (How)' },
      { id: 'D', text: 'Siapa (Who) dan Kapan (When)' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'bin8-2',
    bankId: 'qbank-bin-8',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg_kompleks',
    prompt: 'Perhatikan ciri-ciri slogan dan poster berikut. Manakah pernyataan yang **BENAR**? (Pilih semua yang benar)',
    points: 25,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Slogan lebih mengutamakan kata-kata yang singkat, padat, dan mudah diingat' },
      { id: 'B', text: 'Poster memadukan unsur gambar grafis dan teks untuk dipasang di tempat umum' },
      { id: 'C', text: 'Iklan bertujuan membujuk atau mempengaruhi pembaca agar menggunakan produk/jasa' },
      { id: 'D', text: 'Poster tidak boleh mengandung gambar ilustrasi sama sekali' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'bin8-3',
    bankId: 'qbank-bin-8',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'uraian',
    prompt: 'Tuliskan sebuah teks eksposisi singkat (minimal 4 kalimat) tentang pentingnya kejujuran dan mematuhi tata tertib saat pelaksanaan ujian sekolah berbasis komputer!',
    points: 30,
    difficulty: 'sedang',
    options: [],
    essayRubric: 'Rubrik: Tesis/pernyataan pendapat jelas (skor 10); Argumentasi logis dan relevan (skor 10); Penegasan ulang dan kaidah bahasa baku (skor 10).'
  },

  // ==========================================
  // KELAS VIII: BAHASA INGGRIS (sbj-big)
  // ==========================================
  {
    id: 'big8-1',
    bankId: 'qbank-big-8',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt: 'Ayu: "What do you think of our school CBT application?"\nBagus: "_______ It is very smooth and easy to use on my smartphone."',
    points: 20,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'I think it is fantastic.' },
      { id: 'B', text: 'I don\'t know the answer.' },
      { id: 'C', text: 'Are you sure about that?' },
      { id: 'D', text: 'Please turn off the computer.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'big8-2',
    bankId: 'qbank-big-8',
    subjectId: 'sbj-big',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg',
    prompt: 'Complete the sentence with the correct past tense verb: "Yesterday, the students of Class VIII _______ their mathematics exam in the computer laboratory."',
    points: 20,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'took' },
      { id: 'B', text: 'take' },
      { id: 'C', text: 'taken' },
      { id: 'D', text: 'taking' }
    ],
    correctAnswers: ['A']
  },

  // ==========================================
  // KELAS VIII: INFORMATIKA (sbj-inf)
  // ==========================================
  {
    id: 'inf8-1',
    bankId: 'qbank-inf-8',
    subjectId: 'sbj-inf',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt: 'Topologi jaringan komputer yang menghubungkan setiap komputer ke sebuah konsentrator pusat (Switch / Hub) disebut topologi...',
    points: 25,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Star (Bintang)' },
      { id: 'B', text: 'Bus' },
      { id: 'C', text: 'Ring (Cincin)' },
      { id: 'D', text: 'Mesh' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'inf8-2',
    bankId: 'qbank-inf-8',
    subjectId: 'sbj-inf',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg_kompleks',
    prompt: 'Pada aplikasi lembar kerja (Microsoft Excel / Google Sheets), fungsi rumus yang digunakan untuk menghitung nilai rata-rata dan penjumlahan berurutan adalah: (Pilih semua yang benar)',
    points: 25,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '=AVERAGE(sel_awal:sel_akhir) untuk rata-rata' },
      { id: 'B', text: '=SUM(sel_awal:sel_akhir) untuk penjumlahan' },
      { id: 'C', text: '=MAX(sel_awal:sel_akhir) untuk nilai tertinggi' },
      { id: 'D', text: '=MIN(sel_awal:sel_akhir) untuk nilai terendah' }
    ],
    correctAnswers: ['A', 'B', 'C', 'D']
  }
];

export const GRADE_9_QUESTIONS: Question[] = [
  // ==========================================
  // KELAS IX: MATEMATIKA (sbj-mat)
  // ==========================================
  {
    id: 'mat9-1',
    bankId: 'qbank-mat-9',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt: 'Hasil dari penyederhanaan bentuk akar $3\\sqrt{48} + 2\\sqrt{75} - \\sqrt{108}$ adalah...',
    points: 15,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$16\\sqrt{3}$' },
      { id: 'B', text: '$12\\sqrt{3}$' },
      { id: 'C', text: '$18\\sqrt{3}$' },
      { id: 'D', text: '$14\\sqrt{3}$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mat9-2',
    bankId: 'qbank-mat-9',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 2,
    type: 'pg',
    prompt: 'Akar-akar dari persamaan kuadrat $x^2 - 7x + 10 = 0$ adalah...',
    points: 15,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$x_1 = 2$ dan $x_2 = 5$' },
      { id: 'B', text: '$x_1 = -2$ dan $x_2 = -5$' },
      { id: 'C', text: '$x_1 = 1$ dan $x_2 = 10$' },
      { id: 'D', text: '$x_1 = -1$ dan $x_2 = 10$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mat9-3',
    bankId: 'qbank-mat-9',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 3,
    type: 'pg_kompleks',
    prompt: 'Perhatikan fungsi kuadrat $f(x) = x^2 - 4x - 5$. Manakah pernyataan berikut yang **BENAR**? (Pilih semua yang benar)',
    points: 20,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Grafik parabola terbuka ke atas karena $a > 0$' },
      { id: 'B', text: 'Sumbu simetri berada pada garis $x = 2$' },
      { id: 'C', text: 'Nilai optimum (minimum) fungsi adalah $y = -9$' },
      { id: 'D', text: 'Titik potong dengan sumbu-Y adalah $(0, -5)$' }
    ],
    correctAnswers: ['A', 'B', 'C', 'D']
  },
  {
    id: 'mat9-4',
    bankId: 'qbank-mat-9',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 4,
    type: 'benar_salah',
    prompt: 'Bayangan titik $A(3, -5)$ jika direfleksikan terhadap sumbu-X menghasilkan koordinat $A\'(3, 5)$.',
    points: 10,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'mat9-5',
    bankId: 'qbank-mat-9',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 5,
    type: 'mencocokkan',
    prompt: 'Jodohkan bangun ruang sisi lengkung dengan rumus volumenya yang tepat:',
    points: 20,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p-1', leftText: 'Volume Tabung', rightText: 'V = pi * r^2 * t' },
      { id: 'p-2', leftText: 'Volume Kerucut', rightText: 'V = 1/3 * pi * r^2 * t' },
      { id: 'p-3', leftText: 'Volume Bola', rightText: 'V = 4/3 * pi * r^3' },
      { id: 'p-4', leftText: 'Luas Selimut Tabung', rightText: 'L = 2 * pi * r * t' }
    ]
  },
  {
    id: 'mat9-6',
    bankId: 'qbank-mat-9',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 6,
    type: 'uraian',
    prompt: 'Sebuah tangki air berbentuk tabung tertutup di lingkungan SMP Negeri 12 Banjarbaru memiliki jari-jari alas $r = 70\\text{ cm}$ dan tinggi $t = 200\\text{ cm}$ (gunakan $\\pi = \\frac{22}{7}$).\na) Hitunglah luas permukaan tabung tersebut!\nb) Hitunglah volume air maksimum yang dapat ditampung dalam tangki (dalam satuan liter, dimana $1\\text{ liter} = 1.000\\text{ cm}^3$)!',
    points: 20,
    difficulty: 'sukar',
    options: [],
    essayRubric: 'Rubrik: (a) Luas permukaan 2 * pi * r * (r + t) = 2 * (22/7) * 70 * (270) = 440 * 270 = 118.800 cm^2 (skor 10); (b) Volume = pi * r^2 * t = (22/7) * 4900 * 200 = 3.080.000 cm^3 = 3.080 liter (skor 10).'
  },

  // ==========================================
  // KELAS IX: IPA (sbj-ipa)
  // ==========================================
  {
    id: 'ipa9-1',
    bankId: 'qbank-ipa-9',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt: 'Dua buah muatan listrik masing-masing $q_1 = 4 \\times 10^{-6}\\text{ C}$ dan $q_2 = 9 \\times 10^{-6}\\text{ C}$ terpisah sejauh $r = 0,3\\text{ m}$. Jika konstanta $k = 9 \\times 10^9\\text{ N m}^2/\\text{C}^2$, besar gaya tolak-menolak Coulomb adalah...',
    points: 20,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$3,6\\text{ N}$' },
      { id: 'B', text: '$4,8\\text{ N}$' },
      { id: 'C', text: '$7,2\\text{ N}$' },
      { id: 'D', text: '$10,8\\text{ N}$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa9-2',
    bankId: 'qbank-ipa-9',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 2,
    type: 'pg_kompleks',
    prompt: 'Pada persilangan monohibrid dominan penuh antara tanaman berbunga merah (MM) dan putih (mm), pernyataan yang **BENAR** mengenai keturunan F2 adalah: (Pilih semua yang benar)',
    points: 25,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Perbandingan rasio fenotipe F2 adalah 3 Merah : 1 Putih' },
      { id: 'B', text: 'Perbandingan rasio genotipe F2 adalah 1 MM : 2 Mm : 1 mm' },
      { id: 'C', text: 'Persentase bunga merah pada F2 adalah 75%' },
      { id: 'D', text: 'Semua keturunan F2 berfenotipe merah' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'ipa9-3',
    bankId: 'qbank-ipa-9',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 3,
    type: 'isian',
    prompt: 'Sebuah lampu dialiri arus listrik $2\\text{ A}$ dengan hambatan sebesar $110\\text{ Ohm}$. Berdasarkan Hukum Ohm ($V = I \\times R$), tegangan sumber listrik tersebut adalah ... $\\text{Volt}$. (Tulis angkanya saja)',
    points: 20,
    difficulty: 'mudah',
    options: [],
    correctAnswerText: '220'
  },

  // ==========================================
  // KELAS IX: BAHASA INDONESIA (sbj-bin)
  // ==========================================
  {
    id: 'bin9-1',
    bankId: 'qbank-bin-9',
    subjectId: 'sbj-bin',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt: 'Teks pidato yang bertujuan mengajak, membujuk, atau meyakinkan pendengar untuk melakukan sesuatu hal yang positif disebut...',
    points: 20,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Pidato Persuasif' },
      { id: 'B', text: 'Pidato Rekreatif' },
      { id: 'C', text: 'Pidato Informatif' },
      { id: 'D', text: 'Pidato Sambutan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'bin9-2',
    bankId: 'qbank-bin-9',
    subjectId: 'sbj-bin',
    classId: 'cls-9',
    grade: 'IX',
    number: 2,
    type: 'uraian',
    prompt: 'Jelaskan struktur penulisan Teks Laporan Percobaan (Judul, Tujuan, Alat dan Bahan, Langkah Kerja, Hasil Percobaan, dan Kesimpulan) dengan singkat dan runtut!',
    points: 30,
    difficulty: 'sedang',
    options: [],
    essayRubric: 'Rubrik: Menyebutkan 6 komponen struktur lengkap (skor 15); Menjelaskan fungsi masing-masing komponen secara tepat (skor 15).'
  },

  // ==========================================
  // KELAS IX: BAHASA INGGRIS (sbj-big)
  // ==========================================
  {
    id: 'big9-1',
    bankId: 'qbank-big-9',
    subjectId: 'sbj-big',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt: 'Change this active sentence into passive voice: "The school IT team designed the CBT examination program."',
    points: 25,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'The CBT examination program was designed by the school IT team.' },
      { id: 'B', text: 'The CBT examination program is designed by the school IT team.' },
      { id: 'C', text: 'The school IT team is designing the CBT examination program.' },
      { id: 'D', text: 'The CBT examination program has designed by the school IT team.' }
    ],
    correctAnswers: ['A']
  },

  // ==========================================
  // KELAS IX: INFORMATIKA (sbj-inf)
  // ==========================================
  {
    id: 'inf9-1',
    bankId: 'qbank-inf-9',
    subjectId: 'sbj-inf',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt: 'Simbol belah ketupat (Diamond) dalam diagram alir (Flowchart) digunakan untuk menunjukkan...',
    points: 25,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Keputusan / Percabangan kondisi (Decision)' },
      { id: 'B', text: 'Memulai atau mengakhiri program (Terminator)' },
      { id: 'C', text: 'Operasi proses perhitungan (Process)' },
      { id: 'D', text: 'Input atau output data (Data)' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'inf9-2',
    bankId: 'qbank-inf-9',
    subjectId: 'sbj-inf',
    classId: 'cls-9',
    grade: 'IX',
    number: 2,
    type: 'pg_kompleks',
    prompt: 'Keuntungan utama dari pemanfaatan teknologi Komputasi Awan (Cloud Computing) dalam sistem CBT sekolah adalah: (Pilih semua yang benar)',
    points: 25,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Data hasil ujian tersinkronisasi otomatis antara laptop dan ponsel siswa' },
      { id: 'B', text: 'Akses dapat dilakukan secara fleksibel dari berbagai perangkat' },
      { id: 'C', text: 'Pencadangan (backup) data lebih aman dan terhindar dari kehilangan file lokal' },
      { id: 'D', text: 'Menghilangkan kebutuhan akan koneksi internet sama sekali' }
    ],
    correctAnswers: ['A', 'B', 'C']
  }
];
