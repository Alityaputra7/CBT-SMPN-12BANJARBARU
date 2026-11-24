import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI MATEMATIKA SMP NEGERI 12 BANJARBARU (SEMESTER GANJIL 2026/2027)
// Sumber: Dokumen Resmi Soal Matematika Kelas VII, VIII, dan IX (Tanpa Esai)
// Ketentuan:
// - Total 60 soal (20 Kelas VII + 20 Kelas VIII + 20 Kelas IX)
// - Bobot seluruh soal = 5 poin per soal (20 x 5 = 100 poin per kelas)
// - Seluruh notasi & rumus matematika menggunakan format LaTeX ($...$ / $$...$$) untuk KaTeX
// - Seluruh opsi jawaban bersih dari penanda visual kunci (warna merah/bold/keterangan KUNCI)
// =========================================================================

// -------------------------------------------------------------------------
// A. MATEMATIKA KELAS VII (20 SOAL, 5 POIN/SOAL = 100 POIN)
//    classId: 'cls-1', grade: 'VII'
// -------------------------------------------------------------------------
export const MTK_KELAS_7_QUESTIONS: Question[] = [
  // I. Pilihan Ganda (No. 1 - 8)
  {
    id: 'mtk-vii-1',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt:
      'Suhu udara di sebuah daerah pegunungan pada pagi hari adalah $3^{\\circ}\\text{C}$. Pada malam hari suhu turun sebesar $8^{\\circ}\\text{C}$. Suhu daerah tersebut pada malam hari adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$11^{\\circ}\\text{C}$' },
      { id: 'B', text: '$5^{\\circ}\\text{C}$' },
      { id: 'C', text: '$-5^{\\circ}\\text{C}$' },
      { id: 'D', text: '$-11^{\\circ}\\text{C}$' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'mtk-vii-2',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg',
    prompt:
      'Seorang penyelam berada pada kedalaman $12$ meter di bawah permukaan laut. Ia naik sejauh $7$ meter, kemudian turun kembali sejauh $4$ meter.\n\nPosisi penyelam sekarang adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$-3$ meter' },
      { id: 'B', text: '$-5$ meter' },
      { id: 'C', text: '$-9$ meter' },
      { id: 'D', text: '$-23$ meter' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'mtk-vii-3',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'pg',
    prompt:
      'Ibu membeli gula sebanyak $2,5\\text{ kg}$. Kemudian digunakan sebanyak $0,75\\text{ kg}$ untuk membuat kue.\n\nSisa gula ibu adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$1,75\\text{ kg}$' },
      { id: 'B', text: '$1,50\\text{ kg}$' },
      { id: 'C', text: '$1,70\\text{ kg}$' },
      { id: 'D', text: '$2,25\\text{ kg}$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mtk-vii-4',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'pg',
    prompt:
      'Dalam sebuah perlombaan lari, Andi menempuh jarak $0,75\\text{ km}$, sedangkan Budi menempuh jarak $\\frac{4}{5}\\text{ km}$.\n\nPernyataan yang benar adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Jarak Andi lebih jauh' },
      { id: 'B', text: 'Jarak Budi lebih jauh' },
      { id: 'C', text: 'Jarak keduanya sama' },
      { id: 'D', text: 'Jarak keduanya tidak dapat dibandingkan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'mtk-vii-5',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'pg',
    prompt:
      'Untuk membuat minuman sirup, seorang pedagang mencampurkan sirup dan air dengan perbandingan $2 : 5$.\n\nJika jumlah seluruh campuran adalah $21$ liter, banyak air yang digunakan adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$6$ liter' },
      { id: 'B', text: '$10$ liter' },
      { id: 'C', text: '$15$ liter' },
      { id: 'D', text: '$18$ liter' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'mtk-vii-6',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 6,
    type: 'pg',
    prompt:
      'Sebuah sekolah memiliki $360$ peserta didik. Perbandingan jumlah peserta didik laki-laki dan perempuan adalah $4 : 5$.\n\nBerdasarkan informasi tersebut, jumlah peserta didik perempuan adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$120$ orang' },
      { id: 'B', text: '$140$ orang' },
      { id: 'C', text: '$160$ orang' },
      { id: 'D', text: '$200$ orang' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'mtk-vii-7',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 7,
    type: 'pg',
    prompt:
      'Seorang pedagang menjual buku dengan harga $x$ rupiah per buku. Jika seseorang membeli $5$ buku dan membayar biaya pembungkus sebesar Rp2.000,00, bentuk aljabar dari total pembayaran adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$5 + x + 2.000$' },
      { id: 'B', text: '$5x + 2.000$' },
      { id: 'C', text: '$5x - 2.000$' },
      { id: 'D', text: '$x + 2.000$' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'mtk-vii-8',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 8,
    type: 'pg',
    prompt: 'Perhatikan bentuk aljabar berikut:\n$$7x + 5y - 9$$\nPernyataan yang benar adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Koefisien $x$ adalah $5$' },
      { id: 'B', text: 'Koefisien $y$ adalah $7$' },
      { id: 'C', text: 'Konstanta adalah $-9$' },
      { id: 'D', text: 'Variabelnya adalah $7$ dan $5$' }
    ],
    correctAnswers: ['C']
  },

  // II. Benar atau Salah (No. 9 - 12)
  {
    id: 'mtk-vii-9',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 9,
    type: 'benar_salah',
    prompt:
      'Sebuah lift berada di lantai $3$. Lift turun sebanyak $7$ lantai menuju lantai bawah tanah.\n\nPernyataan: Hasil dari $3 - 7 = -4$, sehingga lift berada di lantai $-4$.',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'mtk-vii-10',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 10,
    type: 'benar_salah',
    prompt:
      'Dina memiliki pita sepanjang $\\frac{3}{4}$ meter, sedangkan Rani memiliki pita sepanjang $0,7$ meter.\n\nPernyataan: Pita Dina lebih panjang daripada pita Rani.',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'mtk-vii-11',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 11,
    type: 'benar_salah',
    prompt:
      'Perbandingan jumlah kelereng merah dan biru adalah $3 : 4$. Jika jumlah seluruh kelereng $28$, maka jumlah kelereng merah adalah $12$.',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'mtk-vii-12',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 12,
    type: 'benar_salah',
    prompt:
      'Perhatikan bentuk aljabar berikut:\n$$8a - 3b + 12$$\nTentukan Benar atau Salah untuk setiap pernyataan berikut!',
    points: 5,
    difficulty: 'sedang',
    options: [],
    statements: [
      { id: 's1', text: 'Koefisien $a$ adalah $8$.', correctAnswer: 'BENAR' },
      { id: 's2', text: 'Koefisien $b$ adalah $-3$.', correctAnswer: 'BENAR' },
      { id: 's3', text: 'Konstanta adalah $12$.', correctAnswer: 'BENAR' },
      { id: 's4', text: 'Bentuk aljabar tersebut memiliki $2$ suku.', correctAnswer: 'SALAH' }
    ]
  },

  // III. Menjodohkan (No. 13 - 15)
  {
    id: 'mtk-vii-13',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 13,
    type: 'mencocokkan',
    prompt:
      'Perhatikan operasi bilangan bulat berikut! Pasangkan setiap operasi pada Kolom A dengan hasil yang tepat pada Kolom B!',
    points: 5,
    difficulty: 'mudah',
    options: [],
    matchingPairs: [
      { id: 'p1', leftText: '$8 + (-5)$', rightText: '$3$' },
      { id: 'p2', leftText: '$(-6) \\times (-2)$', rightText: '$12$' },
      { id: 'p3', leftText: '$15 - 20$', rightText: '$-5$' },
      { id: 'p4', leftText: '$(-24) \\div 2$', rightText: '$-12$' }
    ],
    matchingRightOptions: ['$-8$', '$3$', '$-5$', '$-12$', '$12$', '$35$', '$-13$']
  },
  {
    id: 'mtk-vii-14',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 14,
    type: 'mencocokkan',
    prompt: 'Pasangkan bilangan pecahan pada Kolom A dengan bentuk desimal yang sesuai pada Kolom B!',
    points: 5,
    difficulty: 'mudah',
    options: [],
    matchingPairs: [
      { id: 'p1', leftText: '$\\frac{1}{2}$', rightText: '$0,5$' },
      { id: 'p2', leftText: '$\\frac{3}{4}$', rightText: '$0,75$' },
      { id: 'p3', leftText: '$\\frac{1}{4}$', rightText: '$0,25$' },
      { id: 'p4', leftText: '$\\frac{1}{5}$', rightText: '$0,2$' }
    ],
    matchingRightOptions: ['$0,25$', '$0,5$', '$0,75$', '$0,4$', '$0,2$', '$0,6$']
  },
  {
    id: 'mtk-vii-15',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 15,
    type: 'mencocokkan',
    prompt: 'Pasangkan perbandingan pada Kolom A dengan bentuk perbandingan yang senilai pada Kolom B!',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p1', leftText: '$2 : 3$', rightText: '$8 : 12$' },
      { id: 'p2', leftText: '$3 : 5$', rightText: '$6 : 10$' },
      { id: 'p3', leftText: '$4 : 6$', rightText: '$12 : 18$' },
      { id: 'p4', leftText: '$5 : 8$', rightText: '$10 : 16$' }
    ],
    matchingRightOptions: ['$12 : 18$', '$8 : 12$', '$6 : 10$', '$9 : 15$', '$10 : 16$', '$4 : 12$']
  },

  // IV. Pilihan Ganda Kompleks (No. 16 - 20)
  {
    id: 'mtk-vii-16',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 16,
    type: 'pg_kompleks',
    prompt:
      'Dalam sebuah permainan, Riko mendapatkan dan kehilangan poin sebagai berikut:\n• Putaran pertama mendapat $15$ poin.\n• Putaran kedua kehilangan $8$ poin.\n• Putaran ketiga kehilangan $5$ poin.\n\nPernyataan yang benar adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Poin akhir Riko adalah $2$.' },
      { id: 'B', text: 'Operasi hitungnya adalah $15 - 8 - 5$.' },
      { id: 'C', text: 'Riko kehilangan total $13$ poin.' },
      { id: 'D', text: 'Poin akhir Riko adalah $-2$.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'mtk-vii-17',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 17,
    type: 'pg_kompleks',
    prompt:
      'Ibu membeli bahan makanan dengan berat sebagai berikut:\n• Tepung $1,5\\text{ kg}$.\n• Gula $\\frac{3}{4}\\text{ kg}$.\n• Beras $2,25\\text{ kg}$.\n\nPernyataan yang benar adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$1,5$ sama dengan $\\frac{3}{2}$' },
      { id: 'B', text: '$\\frac{3}{4}$ sama dengan $0,75$.' },
      { id: 'C', text: 'Berat beras lebih ringan daripada tepung.' },
      { id: 'D', text: 'Jumlah seluruh bahan adalah $4,5\\text{ kg}$.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'mtk-vii-18',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 18,
    type: 'pg_kompleks',
    prompt:
      'Sebuah toko membuat paket alat tulis dengan perbandingan pensil dan pulpen $3 : 2$.\n\nJika tersedia $60$ alat tulis, pernyataan yang benar adalah ....',
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Jumlah pensil adalah $36$ buah.' },
      { id: 'B', text: 'Jumlah pulpen adalah $24$ buah.' },
      { id: 'C', text: 'Jumlah pensil lebih sedikit daripada pulpen.' },
      {
        id: 'D',
        text: 'Jika jumlah alat tulis menjadi $100$ dengan rasio tetap, jumlah pensil adalah $60$ buah.'
      }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'mtk-vii-19',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 19,
    type: 'pg_kompleks',
    prompt: 'Perhatikan bentuk aljabar berikut:\n$$6x + 4y - 8$$\nPernyataan yang benar adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Variabelnya adalah $x$ dan $y$.' },
      { id: 'B', text: 'Koefisien $x$ adalah $6$.' },
      { id: 'C', text: 'Konstanta adalah $4$.' },
      { id: 'D', text: 'Bentuk aljabar tersebut memiliki $3$ suku.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'mtk-vii-20',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-1',
    grade: 'VII',
    number: 20,
    type: 'pg_kompleks',
    prompt:
      'Pak Ahmad membeli $x$ buah buku tulis dengan harga Rp4.000,00 per buku dan $3$ buah pensil dengan harga Rp2.000,00 per pensil.\n\nBentuk aljabar dari total pembayaran adalah:\n$$4.000x + 6.000$$\nPernyataan yang benar adalah ....',
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Variabelnya adalah $x$.' },
      { id: 'B', text: 'Koefisien $x$ adalah $4.000$.' },
      { id: 'C', text: 'Konstantanya adalah $6.000$.' },
      { id: 'D', text: 'Jumlah sukunya adalah $3$.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  }
];

// -------------------------------------------------------------------------
// B. MATEMATIKA KELAS VIII (20 SOAL, 5 POIN/SOAL = 100 POIN)
//    classId: 'cls-8', grade: 'VIII' (berlaku otomatis untuk VIII-A & VIII-B)
// -------------------------------------------------------------------------
export const MTK_KELAS_8_QUESTIONS: Question[] = [
  // A. Pilihan Ganda (No. 1 - 10)
  {
    id: 'mtk-viii-1',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt: 'Hasil dari $2^{4}$ adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$8$' },
      { id: 'B', text: '$12$' },
      { id: 'C', text: '$16$' },
      { id: 'D', text: '$24$' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'mtk-viii-2',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg',
    prompt: 'Bentuk perkalian berulang dari $3^{3}$ adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$3 + 3 + 3$' },
      { id: 'B', text: '$3 \\times 3 \\times 3$' },
      { id: 'C', text: '$3 \\times 3$' },
      { id: 'D', text: '$3 + 3 \\times 3$' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'mtk-viii-3',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'pg',
    prompt: 'Hasil dari $2^{3} \\times 2^{4}$ adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$2^{7}$' },
      { id: 'B', text: '$2^{12}$' },
      { id: 'C', text: '$2^{1}$' },
      { id: 'D', text: '$2^{9}$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mtk-viii-4',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 4,
    type: 'pg',
    prompt: 'Nilai $x$ yang memenuhi persamaan $3x + 5 = 20$ adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$3$' },
      { id: 'B', text: '$4$' },
      { id: 'C', text: '$5$' },
      { id: 'D', text: '$6$' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'mtk-viii-5',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 5,
    type: 'pg',
    prompt: 'Diketahui persamaan $x - 7 = 12$. Nilai $x$ adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$5$' },
      { id: 'B', text: '$12$' },
      { id: 'C', text: '$17$' },
      { id: 'D', text: '$19$' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'mtk-viii-6',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 6,
    type: 'pg',
    prompt: 'Penyelesaian dari pertidaksamaan $2x + 4 > 12$ adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$x > 4$' },
      { id: 'B', text: '$x < 4$' },
      { id: 'C', text: '$x > 8$' },
      { id: 'D', text: '$x < 8$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mtk-viii-7',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 7,
    type: 'pg',
    prompt:
      'Umur Andi $3$ tahun lebih tua daripada umur Budi. Jika jumlah umur mereka $25$ tahun, umur Budi adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$10$ tahun' },
      { id: 'B', text: '$11$ tahun' },
      { id: 'C', text: '$12$ tahun' },
      { id: 'D', text: '$14$ tahun' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'mtk-viii-8',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 8,
    type: 'pg',
    prompt:
      'Segitiga siku-siku mempunyai panjang sisi siku-siku $3\\text{ cm}$ dan $4\\text{ cm}$. Panjang sisi miringnya adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$5\\text{ cm}$' },
      { id: 'B', text: '$6\\text{ cm}$' },
      { id: 'C', text: '$7\\text{ cm}$' },
      { id: 'D', text: '$8\\text{ cm}$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mtk-viii-9',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 9,
    type: 'pg',
    prompt:
      'Sebuah segitiga siku-siku mempunyai sisi miring $13\\text{ cm}$ dan salah satu sisi siku-sikunya $5\\text{ cm}$. Panjang sisi siku-siku lainnya adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$8\\text{ cm}$' },
      { id: 'B', text: '$9\\text{ cm}$' },
      { id: 'C', text: '$11\\text{ cm}$' },
      { id: 'D', text: '$12\\text{ cm}$' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'mtk-viii-10',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 10,
    type: 'pg',
    prompt:
      'Sebuah tangga panjangnya $10$ meter disandarkan pada dinding. Jarak kaki tangga ke dinding adalah $6$ meter. Tinggi ujung tangga dari permukaan tanah adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$6$ meter' },
      { id: 'B', text: '$7$ meter' },
      { id: 'C', text: '$8$ meter' },
      { id: 'D', text: '$9$ meter' }
    ],
    correctAnswers: ['C']
  },

  // B. Benar atau Salah (No. 11 - 15)
  {
    id: 'mtk-viii-11',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 11,
    type: 'benar_salah',
    prompt: 'Tentukan apakah pernyataan berikut Benar atau Salah:\n$$5^{2} = 25$$',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'mtk-viii-12',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 12,
    type: 'benar_salah',
    prompt: 'Tentukan apakah pernyataan berikut Benar atau Salah:\n$$2^{3} \\times 2^{2} = 2^{5}$$',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'mtk-viii-13',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 13,
    type: 'benar_salah',
    prompt: 'Tentukan apakah pernyataan berikut Benar atau Salah:\nPenyelesaian dari $4x = 20$ adalah $x = 4$.',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },
  {
    id: 'mtk-viii-14',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 14,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\nPenyelesaian dari $x + 3 < 8$ adalah $x < 5$.',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'mtk-viii-15',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 15,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\nSegitiga dengan panjang sisi $6\\text{ cm}$, $8\\text{ cm}$, dan $10\\text{ cm}$ merupakan segitiga siku-siku.',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },

  // C. Menjodohkan (No. 16 - 18)
  {
    id: 'mtk-viii-16',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 16,
    type: 'mencocokkan',
    prompt: 'Pasangkan bilangan berpangkat pada Kolom A dengan nilainya yang tepat pada Kolom B!',
    points: 5,
    difficulty: 'mudah',
    options: [],
    matchingPairs: [
      { id: 'p1', leftText: '$2^{3}$', rightText: '$8$' },
      { id: 'p2', leftText: '$3^{2}$', rightText: '$9$' },
      { id: 'p3', leftText: '$5^{2}$', rightText: '$25$' }
    ],
    matchingRightOptions: ['$5$', '$8$', '$9$', '$6$', '$10$', '$25$']
  },
  {
    id: 'mtk-viii-17',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 17,
    type: 'mencocokkan',
    prompt:
      'Pasangkan persamaan dan pertidaksamaan linear satu variabel pada Kolom A dengan penyelesaian yang tepat pada Kolom B!',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p1', leftText: '$x + 5 = 12$', rightText: '$x = 7$' },
      { id: 'p2', leftText: '$2x = 16$', rightText: '$x = 8$' },
      { id: 'p3', leftText: '$x - 3 > 0$', rightText: '$x > 3$' }
    ],
    matchingRightOptions: ['$x > 3$', '$x = 7$', '$x = 8$']
  },
  {
    id: 'mtk-viii-18',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 18,
    type: 'mencocokkan',
    prompt:
      'Pasangkan ukuran sisi siku-siku segitiga pada Kolom A dengan panjang sisi miringnya (Teorema Pythagoras) yang tepat pada Kolom B!',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p1', leftText: 'Sisi siku-siku $3\\text{ cm}$ dan $4\\text{ cm}$', rightText: '$5\\text{ cm}$' },
      { id: 'p2', leftText: 'Sisi siku-siku $5\\text{ cm}$ dan $12\\text{ cm}$', rightText: '$13\\text{ cm}$' },
      { id: 'p3', leftText: 'Sisi siku-siku $6\\text{ cm}$ dan $8\\text{ cm}$', rightText: '$10\\text{ cm}$' }
    ],
    matchingRightOptions: [
      '$13\\text{ cm}$',
      '$10\\text{ cm}$',
      '$5\\text{ cm}$',
      '$7\\text{ cm}$',
      '$17\\text{ cm}$',
      '$14\\text{ cm}$'
    ]
  },

  // D. Pilihan Ganda Kompleks (No. 19 - 20)
  {
    id: 'mtk-viii-19',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 19,
    type: 'pg_kompleks',
    prompt: 'Pernyataan bilangan berpangkat berikut yang benar adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$3^{3} = 27$' },
      { id: 'B', text: '$6^{2} = 12$' },
      { id: 'C', text: '$4^{2} = 16$' },
      { id: 'D', text: '$5^{2} = 10$' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'mtk-viii-20',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-8',
    grade: 'VIII',
    number: 20,
    type: 'pg_kompleks',
    prompt: 'Diketahui pertidaksamaan $3x - 6 \\leq 12$. Pernyataan yang benar adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$x \\leq 6$' },
      { id: 'B', text: '$x = 6$ merupakan penyelesaian.' },
      { id: 'C', text: '$x = 7$ merupakan penyelesaian.' },
      { id: 'D', text: '$x = 4$ merupakan penyelesaian.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  }
];

// -------------------------------------------------------------------------
// C. MATEMATIKA KELAS IX (20 SOAL, 5 POIN/SOAL = 100 POIN)
//    classId: 'cls-9', grade: 'IX'
// -------------------------------------------------------------------------
export const MTK_KELAS_9_QUESTIONS: Question[] = [
  // A. Pilihan Ganda (No. 1 - 10)
  {
    id: 'mtk-ix-1',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt:
      'Sebuah toko pakaian mengadakan promosi akhir tahun. Sebuah jaket memiliki harga label Rp250.000,00. Toko memberikan diskon sebesar $20\\%$ kepada setiap pembeli.\n\nBerdasarkan informasi tersebut, harga jaket setelah diskon adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Rp180.000,00' },
      { id: 'B', text: 'Rp190.000,00' },
      { id: 'C', text: 'Rp200.000,00' },
      { id: 'D', text: 'Rp220.000,00' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'mtk-ix-2',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 2,
    type: 'pg',
    prompt:
      'Pak Budi membeli $40\\text{ kg}$ beras dengan harga Rp12.000,00 per kg. Seluruh beras tersebut dijual dengan harga Rp14.000,00 per kg.\n\nKeuntungan yang diperoleh Pak Budi adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Rp40.000,00' },
      { id: 'B', text: 'Rp80.000,00' },
      { id: 'C', text: 'Rp480.000,00' },
      { id: 'D', text: 'Rp560.000,00' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'mtk-ix-3',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 3,
    type: 'pg',
    prompt:
      'Sebuah toko elektronik menjual televisi dengan harga Rp3.000.000,00. Pembeli dikenakan pajak sebesar $11\\%$ dari harga barang.\n\nJumlah uang yang harus dibayar pembeli adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Rp3.110.000,00' },
      { id: 'B', text: 'Rp3.220.000,00' },
      { id: 'C', text: 'Rp3.300.000,00' },
      { id: 'D', text: 'Rp3.330.000,00' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'mtk-ix-4',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 4,
    type: 'pg',
    prompt:
      'Rina menabung sebesar Rp2.000.000,00 di sebuah bank. Bank memberikan bunga tunggal sebesar $6\\%$ per tahun. Rina tidak melakukan penarikan maupun penambahan tabungan selama $8$ bulan.\n\nJumlah tabungan Rina setelah $8$ bulan adalah ....',
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Rp2.060.000,00' },
      { id: 'B', text: 'Rp2.080.000,00' },
      { id: 'C', text: 'Rp2.100.000,00' },
      { id: 'D', text: 'Rp2.120.000,00' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'mtk-ix-5',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 5,
    type: 'pg',
    prompt:
      'Di sebuah koperasi sekolah, harga $2$ buku tulis dan $1$ pensil adalah Rp11.000,00. Sementara itu, harga $1$ buku tulis dan $1$ pensil adalah Rp7.000,00.\n\nHarga satu buku tulis adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Rp2.000,00' },
      { id: 'B', text: 'Rp3.000,00' },
      { id: 'C', text: 'Rp4.000,00' },
      { id: 'D', text: 'Rp5.000,00' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'mtk-ix-6',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 6,
    type: 'pg',
    prompt:
      'Sebuah tempat wisata menjual tiket masuk untuk orang dewasa dan anak-anak dengan rincian sebagai berikut:\n• Pembelian 1: $2$ tiket dewasa dan $3$ tiket anak-anak, total harga Rp85.000,00.\n• Pembelian 2: $3$ tiket dewasa dan $2$ tiket anak-anak, total harga Rp90.000,00.\n\nJika harga tiket dewasa dan anak-anak tetap, harga satu tiket dewasa adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Rp15.000,00' },
      { id: 'B', text: 'Rp20.000,00' },
      { id: 'C', text: 'Rp25.000,00' },
      { id: 'D', text: 'Rp30.000,00' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'mtk-ix-7',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 7,
    type: 'pg',
    prompt:
      'Dalam kegiatan bazar sekolah, panitia menjual paket makanan:\n• Paket A terdiri atas $2$ roti dan $1$ kotak susu seharga Rp13.000,00.\n• Paket B terdiri atas $1$ roti dan $2$ kotak susu seharga Rp11.000,00.\n\nHarga satu roti dan satu kotak susu berturut-turut adalah ....',
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Rp5.000,00 dan Rp3.000,00' },
      { id: 'B', text: 'Rp4.000,00 dan Rp5.000,00' },
      { id: 'C', text: 'Rp6.000,00 dan Rp2.000,00' },
      { id: 'D', text: 'Rp3.000,00 dan Rp7.000,00' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mtk-ix-8',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 8,
    type: 'pg',
    prompt:
      'Sebuah titik $A(2, 3)$ digeser $4$ satuan ke kanan dan $2$ satuan ke atas. Koordinat bayangan titik $A$ adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$(6, 5)$' },
      { id: 'B', text: '$(6, 1)$' },
      { id: 'C', text: '$(-2, 5)$' },
      { id: 'D', text: '$(2, 5)$' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'mtk-ix-9',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 9,
    type: 'pg',
    prompt:
      'Sebuah motif batik dibuat dengan titik awal $P(3, -4)$. Motif tersebut dicerminkan terhadap sumbu-$X$.\n\nKoordinat bayangan titik $P$ adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '$(-3, -4)$' },
      { id: 'B', text: '$(3, 4)$' },
      { id: 'C', text: '$(-3, 4)$' },
      { id: 'D', text: '$(4, 3)$' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'mtk-ix-10',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 10,
    type: 'pg',
    prompt:
      'Sebuah titik $B(4, 2)$ pada desain logo sekolah diputar sebesar $90^{\\circ}$ berlawanan arah jarum jam dengan pusat rotasi $O(0, 0)$.\n\nKoordinat bayangan titik $B$ adalah ....',
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: '$(2, -4)$' },
      { id: 'B', text: '$(-2, 4)$' },
      { id: 'C', text: '$(-4, -2)$' },
      { id: 'D', text: '$(4, -2)$' }
    ],
    correctAnswers: ['B']
  },

  // B. Benar atau Salah Multi-Pernyataan (No. 11 - 15)
  {
    id: 'mtk-ix-11',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 11,
    type: 'benar_salah',
    prompt:
      'Seorang pedagang membeli $1$ lusin tas dengan harga Rp600.000,00. Kemudian, setiap tas dijual dengan harga Rp60.000,00.\n\nTentukan Benar atau Salah untuk setiap pernyataan berikut!',
    points: 5,
    difficulty: 'mudah',
    options: [],
    statements: [
      { id: 's1', text: 'Harga beli satu tas adalah Rp50.000,00.', correctAnswer: 'BENAR' },
      { id: 's2', text: 'Total hasil penjualan adalah Rp720.000,00.', correctAnswer: 'BENAR' },
      { id: 's3', text: 'Keuntungan seluruhnya adalah Rp100.000,00.', correctAnswer: 'SALAH' }
    ]
  },
  {
    id: 'mtk-ix-12',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 12,
    type: 'benar_salah',
    prompt:
      'Di sebuah kantin sekolah, harga $2$ porsi nasi goreng dan $1$ gelas teh adalah Rp27.000,00. Sedangkan harga $1$ porsi nasi goreng dan $2$ gelas teh adalah Rp21.000,00.\n\nTentukan Benar atau Salah untuk setiap pernyataan berikut!',
    points: 5,
    difficulty: 'sedang',
    options: [],
    statements: [
      { id: 's1', text: 'Harga satu porsi nasi goreng adalah Rp11.000,00.', correctAnswer: 'BENAR' },
      { id: 's2', text: 'Harga satu gelas teh adalah Rp5.000,00.', correctAnswer: 'BENAR' },
      { id: 's3', text: 'Harga $2$ porsi nasi goreng dan $2$ gelas teh adalah Rp32.000,00.', correctAnswer: 'BENAR' }
    ]
  },
  {
    id: 'mtk-ix-13',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 13,
    type: 'benar_salah',
    prompt:
      'Titik $A(-2, 3)$ ditranslasikan oleh $T = (5, -4)$.\n\nTentukan Benar atau Salah untuk setiap pernyataan berikut!',
    points: 5,
    difficulty: 'mudah',
    options: [],
    statements: [
      { id: 's1', text: 'Koordinat bayangan titik $A$ adalah $(3, -1)$.', correctAnswer: 'BENAR' },
      { id: 's2', text: 'Translasi mengubah bentuk dan ukuran bangun.', correctAnswer: 'BENAR' },
      { id: 's3', text: 'Translasi menggeser titik tanpa mengubah jaraknya.', correctAnswer: 'SALAH' }
    ]
  },
  {
    id: 'mtk-ix-14',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 14,
    type: 'benar_salah',
    prompt:
      'Sebuah desain gambar memiliki titik $P(4, 2)$. Gambar tersebut dicerminkan terhadap garis $y = x$.\n\nTentukan Benar atau Salah untuk setiap pernyataan berikut!',
    points: 5,
    difficulty: 'sedang',
    options: [],
    statements: [
      { id: 's1', text: 'Bayangan titik $P$ adalah $(2, 4)$.', correctAnswer: 'BENAR' },
      {
        id: 's2',
        text: 'Jarak titik $P$ ke garis cermin sama dengan jarak bayangannya ke garis cermin.',
        correctAnswer: 'BENAR'
      },
      { id: 's3', text: 'Refleksi mengubah ukuran bangun datar.', correctAnswer: 'SALAH' }
    ]
  },
  {
    id: 'mtk-ix-15',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 15,
    type: 'benar_salah',
    prompt:
      'Sebuah segitiga memiliki titik $A(2, 3)$, $B(4, 2)$, dan $C(2, 1)$. Segitiga tersebut didilatasikan dengan pusat $O(0, 0)$ dan faktor skala $2$.\n\nTentukan Benar atau Salah untuk setiap pernyataan berikut!',
    points: 5,
    difficulty: 'sukar',
    options: [],
    statements: [
      { id: 's1', text: 'Bayangan titik $A$ adalah $(4, 6)$.', correctAnswer: 'BENAR' },
      { id: 's2', text: 'Bayangan titik $B$ adalah $(8, 4)$.', correctAnswer: 'BENAR' },
      {
        id: 's3',
        text: 'Panjang sisi bayangan menjadi setengah panjang sisi semula.',
        correctAnswer: 'SALAH'
      }
    ]
  },

  // C. Menjodohkan (No. 16 - 18)
  {
    id: 'mtk-ix-16',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 16,
    type: 'mencocokkan',
    prompt:
      'Perhatikan informasi aritmatika sosial berikut! Pasangkan pernyataan pada Kolom A dengan jawaban yang tepat pada Kolom B!',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p1', leftText: 'Harga barang Rp100.000,00 mendapat diskon $20\\%$', rightText: 'Rp80.000,00' },
      { id: 'p2', leftText: 'Modal Rp80.000,00 dijual Rp100.000,00', rightText: 'Rp20.000,00' },
      {
        id: 'p3',
        leftText: 'Tabungan Rp1.000.000,00 mendapat bunga tunggal $12\\%$ selama $1$ tahun',
        rightText: 'Rp120.000,00'
      }
    ],
    matchingRightOptions: [
      'Rp120.000,00',
      'Rp80.000,00',
      'Rp20.000,00',
      'Rp100.000,00',
      'Rp12.000,00'
    ]
  },
  {
    id: 'mtk-ix-17',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 17,
    type: 'mencocokkan',
    prompt:
      'Perhatikan beberapa sistem persamaan linear dua variabel berikut! Pasangkan sistem persamaan pada Kolom A dengan penyelesaian yang tepat pada Kolom B!',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p1', leftText: '$x + y = 10$ dan $x - y = 2$', rightText: '$x = 6, \\; y = 4$' },
      { id: 'p2', leftText: '$2x + y = 13$ dan $x + y = 8$', rightText: '$x = 5, \\; y = 3$' },
      { id: 'p3', leftText: '$x + 2y = 11$ dan $x + y = 8$', rightText: '$x = 5, \\; y = 3$' }
    ],
    matchingRightOptions: [
      '$x = 5, \\; y = 3$',
      '$x = 6, \\; y = 4$',
      '$x = 3, \\; y = 4$',
      '$x = -5, \\; y = -3$',
      '$x = -3, \\; y = -4$'
    ]
  },
  {
    id: 'mtk-ix-18',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 18,
    type: 'mencocokkan',
    prompt:
      'Pasangkan jenis transformasi pada Kolom A dengan hasil transformasi titik $P(2, 3)$ yang tepat pada Kolom B!',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      { id: 'p1', leftText: 'Translasi $T = (2, 1)$', rightText: '$(4, 4)$' },
      { id: 'p2', leftText: 'Refleksi terhadap sumbu-$X$', rightText: '$(2, -3)$' },
      { id: 'p3', leftText: 'Rotasi $90^{\\circ}$ berlawanan arah jarum jam', rightText: '$(-3, 2)$' }
    ],
    matchingRightOptions: ['$(-3, 2)$', '$(4, 4)$', '$(2, -3)$', '$(-2, -3)$', '$(-4, 4)$']
  },

  // D. Pilihan Ganda Kompleks (No. 19 - 20)
  {
    id: 'mtk-ix-19',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 19,
    type: 'pg_kompleks',
    prompt:
      'Dina memiliki uang Rp500.000,00. Ia berencana membeli perlengkapan sekolah dengan rincian berikut:\n• Tas: Rp200.000,00\n• Sepatu: Rp150.000,00\n• Alat tulis: Rp50.000,00\n\nToko memberikan diskon $10\\%$ untuk pembelian tas dan sepatu. Alat tulis tidak mendapatkan diskon. Berdasarkan informasi tersebut, pernyataan yang benar adalah ....',
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Diskon tas adalah Rp20.000,00.' },
      { id: 'B', text: 'Diskon sepatu adalah Rp15.000,00.' },
      { id: 'C', text: 'Total pembayaran setelah diskon adalah Rp350.000,00.' },
      { id: 'D', text: 'Sisa uang Dina setelah berbelanja adalah Rp150.000,00.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'mtk-ix-20',
    bankId: 'qbank-mat',
    subjectId: 'sbj-mat',
    classId: 'cls-9',
    grade: 'IX',
    number: 20,
    type: 'pg_kompleks',
    prompt:
      'Sebuah bangun datar memiliki titik $A(1, 2)$, $B(3, 2)$, dan $C(2, 4)$. Bangun tersebut mengalami transformasi sebagai berikut:\n1. Dicerminkan terhadap sumbu-$Y$.\n2. Kemudian ditranslasikan dengan $T = (2, 1)$.\n\nPilihlah semua pernyataan yang benar!',
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Bayangan titik $A$ setelah refleksi adalah $(-1, 2)$.' },
      { id: 'B', text: 'Bayangan titik $B$ setelah refleksi adalah $(-3, 2)$.' },
      { id: 'C', text: 'Bayangan akhir titik $A$ adalah $(1, 3)$.' },
      { id: 'D', text: 'Bayangan akhir titik $C$ adalah $(0, 5)$.' }
    ],
    correctAnswers: ['B', 'C', 'D']
  }
];

export const MTK_ALL_OFFICIAL_QUESTIONS: Question[] = [
  ...MTK_KELAS_7_QUESTIONS,
  ...MTK_KELAS_8_QUESTIONS,
  ...MTK_KELAS_9_QUESTIONS
];
