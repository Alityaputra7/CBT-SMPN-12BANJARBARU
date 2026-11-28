import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI IPA KELAS VIII SMP/MTs (BAB 1-3)
// Sumber: SOAL_IPA_KELAS_8_fc2261db.pdf (25 Soal Lengkap, Total Skor = 100)
// Pedoman Penilaian Resmi (Hal. 6):
// - 15 Pilihan Ganda (No. 1-15) x 3 poin = 45 poin
// - 5 Benar atau Salah (No. 16-20) x 3 poin = 15 poin
// - 5 Soal Esai (No. 21-25) x 8 poin = 40 poin
// Total = 100 poin
// =========================================================================

export const IPA_KELAS_8_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // A. PILIHAN GANDA (No. 1 - 15, 3 poin/soal = 45 poin)
  // -----------------------------------------------------------------------
  {
    id: 'ipa-viii-1',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt:
      'Perhatikan hasil pengamatan berikut! Seorang siswa mengamati dua jenis jaringan menggunakan mikroskop. Pada preparat pertama ditemukan sel berbentuk relatif tetap dan memiliki dinding sel. Pada preparat kedua ditemukan sel yang bentuknya tidak tetap dan tidak memiliki dinding sel. Kesimpulan yang paling tepat adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Preparat pertama merupakan sel hewan dan preparat kedua sel tumbuhan.' },
      { id: 'B', text: 'Preparat pertama merupakan sel tumbuhan dan preparat kedua sel hewan.' },
      { id: 'C', text: 'Kedua preparat merupakan sel tumbuhan karena memiliki membran sel.' },
      { id: 'D', text: 'Kedua preparat merupakan sel hewan karena memiliki inti sel.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-viii-2',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg',
    prompt:
      'Teori sel menyatakan bahwa semua makhluk hidup tersusun atas sel dan sel merupakan unit struktural serta fungsional terkecil kehidupan. Ketika peneliti menemukan organisme mikroskopis yang hanya terdiri atas satu sel, pernyataan paling tepat adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Organisme tersebut bukan makhluk hidup karena hanya memiliki satu sel.' },
      { id: 'B', text: 'Organisme tersebut merupakan makhluk hidup karena satu sel dapat menjalankan fungsi kehidupan.' },
      { id: 'C', text: 'Organisme tersebut harus memiliki jaringan agar dapat hidup.' },
      { id: 'D', text: 'Organisme tersebut tidak membutuhkan energi untuk bertahan hidup.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-viii-3',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'pg',
    prompt:
      'Seorang siswa mengamati sel daun menggunakan mikroskop. Ia menemukan organel berwarna hijau yang berperan dalam fotosintesis. Organel yang dimaksud beserta fungsinya adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Mitokondria, menghasilkan energi melalui respirasi sel.' },
      { id: 'B', text: 'Ribosom, menyusun protein untuk kebutuhan sel.' },
      { id: 'C', text: 'Kloroplas, menangkap energi cahaya untuk fotosintesis.' },
      { id: 'D', text: 'Vakuola, mengatur seluruh aktivitas sel.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-viii-4',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 4,
    type: 'pg',
    prompt:
      'Sel tumbuhan diletakkan dalam larutan garam pekat. Setelah beberapa menit, bagian dalam sel tampak menyusut dan menjauh dari dinding sel. Peristiwa tersebut terjadi karena ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Air masuk ke dalam sel melalui osmosis.' },
      { id: 'B', text: 'Air keluar dari sel karena larutan di luar lebih pekat.' },
      { id: 'C', text: 'Dinding sel mengalami pembelahan.' },
      { id: 'D', text: 'Kloroplas menghasilkan air secara berlebihan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-viii-5',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 5,
    type: 'pg',
    prompt:
      'Mikroskop menggunakan lensa okuler $10\\times$ dan lensa objektif $40\\times$. Berapakah perbesaran total mikroskop tersebut?',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$40\\times$' },
      { id: 'B', text: '$100\\times$' },
      { id: 'C', text: '$200\\times$' },
      { id: 'D', text: '$400\\times$' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ipa-viii-6',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 6,
    type: 'pg',
    prompt:
      'Satu porsi makanan mengandung karbohidrat $50$ gram, protein $15$ gram, lemak $10$ gram, serta vitamin dan mineral. Seorang siswa mengonsumsi makanan tersebut sebelum olahraga. Fungsi utama karbohidrat adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Membentuk antibodi secara langsung.' },
      { id: 'B', text: 'Menjadi sumber energi utama bagi tubuh.' },
      { id: 'C', text: 'Mengangkut oksigen ke seluruh tubuh.' },
      { id: 'D', text: 'Menghasilkan hormon pertumbuhan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-viii-7',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 7,
    type: 'pg',
    prompt:
      'Seorang siswa makan nasi dan telur. Setelah dikunyah, makanan masuk ke lambung dan mengalami pencernaan lebih lanjut. Enzim yang berperan dalam pemecahan protein di lambung adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Amilase' },
      { id: 'B', text: 'Lipase' },
      { id: 'C', text: 'Pepsin' },
      { id: 'D', text: 'Maltase' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-viii-8',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 8,
    type: 'pg',
    prompt:
      'Seorang pasien mengalami penyumbatan pembuluh darah yang membawa darah dari jantung menuju paru-paru. Pembuluh darah yang mengalami penyumbatan adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Vena pulmonalis' },
      { id: 'B', text: 'Arteri pulmonalis' },
      { id: 'C', text: 'Aorta' },
      { id: 'D', text: 'Vena kava' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-viii-9',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 9,
    type: 'pg',
    prompt:
      'Ketika seseorang berlari, frekuensi pernapasannya meningkat dibandingkan saat duduk santai. Alasan ilmiah yang paling tepat adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Tubuh membutuhkan lebih banyak oksigen untuk menghasilkan energi.' },
      { id: 'B', text: 'Paru-paru berhenti melakukan pertukaran gas.' },
      { id: 'C', text: 'Tubuh tidak lagi menghasilkan karbon dioksida.' },
      { id: 'D', text: 'Jantung mengurangi aliran darah menuju otot.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa-viii-10',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 10,
    type: 'pg',
    prompt:
      'Seseorang jarang minum air putih. Urine yang dikeluarkan menjadi lebih pekat dan jumlahnya lebih sedikit. Respons ginjal yang menyebabkan kondisi tersebut adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Mengurangi penyerapan kembali air.' },
      { id: 'B', text: 'Meningkatkan penyerapan kembali air.' },
      { id: 'C', text: 'Menghentikan proses penyaringan darah.' },
      { id: 'D', text: 'Mengeluarkan seluruh air dari tubuh.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-viii-11',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 11,
    type: 'pg',
    prompt:
      'Seorang siswa mendorong meja dengan gaya $100\\text{ N}$ sehingga meja berpindah sejauh $5$ meter searah gaya. Besar usaha yang dilakukan adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$20$ joule' },
      { id: 'B', text: '$100$ joule' },
      { id: 'C', text: '$500$ joule' },
      { id: 'D', text: '$1.000$ joule' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-viii-12',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 12,
    type: 'pg',
    prompt:
      'Dua siswa mengangkat benda yang sama ke ketinggian yang sama. Siswa pertama membutuhkan waktu $4$ detik, sedangkan siswa kedua $8$ detik. Pernyataan yang tepat adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Usaha siswa pertama lebih besar karena waktunya lebih singkat.' },
      { id: 'B', text: 'Usaha keduanya sama, tetapi daya siswa pertama lebih besar.' },
      { id: 'C', text: 'Usaha siswa kedua lebih besar karena membutuhkan waktu lebih lama.' },
      { id: 'D', text: 'Daya keduanya sama karena benda yang diangkat sama.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-viii-13',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 13,
    type: 'pg',
    prompt:
      'Sebuah bola berada di puncak bukit. Ketika menggelinding menuruni bukit, kecepatannya meningkat. Perubahan energi yang terjadi adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Energi kinetik berubah menjadi energi potensial.' },
      { id: 'B', text: 'Energi potensial gravitasi berubah menjadi energi kinetik.' },
      { id: 'C', text: 'Energi kimia berubah menjadi energi listrik.' },
      { id: 'D', text: 'Energi panas berubah menjadi energi kimia.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-viii-14',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 14,
    type: 'pg',
    prompt:
      'Seorang pekerja menggunakan papan miring untuk menaikkan drum ke atas truk. Ia memilih papan yang lebih panjang agar gaya yang dibutuhkan lebih kecil. Jenis pesawat sederhana dan prinsip kerjanya adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Katrol, memperbesar berat benda.' },
      { id: 'B', text: 'Roda berporos, menghilangkan gaya gravitasi.' },
      { id: 'C', text: 'Bidang miring, memperkecil gaya dengan memperpanjang lintasan.' },
      { id: 'D', text: 'Tuas, mengubah energi potensial menjadi energi listrik.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-viii-15',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 15,
    type: 'pg',
    prompt:
      'Seorang petani menggunakan linggis dan meletakkan batu kecil sebagai titik tumpu di antara beban dan kuasa. Jenis pengungkit dan manfaatnya adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Pengungkit jenis I, dapat memperbesar gaya yang diberikan.' },
      { id: 'B', text: 'Pengungkit jenis II, titik tumpu berada di tengah.' },
      { id: 'C', text: 'Pengungkit jenis III, dapat menghilangkan beban.' },
      { id: 'D', text: 'Pengungkit jenis II, titik kuasa berada di antara beban dan titik tumpu.' }
    ],
    correctAnswers: ['A']
  },

  // -----------------------------------------------------------------------
  // B. BENAR ATAU SALAH (No. 16 - 20, 3 poin/soal = 15 poin)
  // -----------------------------------------------------------------------
  {
    id: 'ipa-viii-16',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 16,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nSemua sel memiliki membran sel, tetapi tidak semua sel memiliki dinding sel.',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'ipa-viii-17',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 17,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nMitokondria merupakan tempat utama respirasi aerob yang menghasilkan ATP.',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'ipa-viii-18',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 18,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nArteri pulmonalis membawa darah manjadi oksigen dari jantung menuju paru-paru.',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },
  {
    id: 'ipa-viii-19',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 19,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nBidang miring yang lebih panjang justru membutuhkan gaya lebih kecil untuk mencapai ketinggian yang sama, jika gesekan diabaikan.',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },
  {
    id: 'ipa-viii-20',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 20,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nAlveolus merupakan tempat pertukaran gas oksigen dan karbon dioksida.',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },

  // -----------------------------------------------------------------------
  // C. SOAL ESAI (No. 21 - 25, 8 poin/soal = 40 poin)
  // -----------------------------------------------------------------------
  {
    id: 'ipa-viii-21',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 21,
    type: 'uraian',
    prompt: `Menganalisis struktur dan fungsi sel

Seorang siswa mengamati dua preparat menggunakan mikroskop. Preparat A memiliki dinding sel, kloroplas, dan vakuola besar. Preparat B tidak memiliki dinding sel dan tidak ditemukan kloroplas.
a. Jelaskan tiga perbedaan struktur sel tumbuhan dan sel hewan.
b. Mengapa kloroplas penting bagi kelangsungan hidup tumbuhan?`,
    points: 8,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Struktur dan fungsi sel): a. Sel tumbuhan memiliki dinding sel, kloroplas, dan vakuola besar; sel hewan tidak memiliki dinding sel dan kloroplas serta umumnya vakuolanya kecil. b. Kloroplas menangkap energi cahaya untuk fotosintesis sehingga tumbuhan dapat menghasilkan bahan makanan. (Rubrik maks 8 poin: ketepatan konsep ilmiah 3, analisis & penalaran 2, proses/perhitungan 2, kejelasan penyampaian 1.)'
  },
  {
    id: 'ipa-viii-22',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 22,
    type: 'uraian',
    prompt: `Menganalisis hubungan sistem pencernaan dan peredaran darah

Seorang siswa mengonsumsi nasi, ikan, dan sayuran. Setelah makanan dicerna, zat-zat makanan diserap dan diedarkan ke seluruh tubuh.
a. Jelaskan peran lambung dan usus halus.
b. Jelaskan peran darah dan jantung.`,
    points: 8,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Pencernaan dan peredaran darah): a. Lambung mengolah makanan, sedangkan usus halus menyelesaikan pencernaan dan menyerap zat gizi. b. Darah mengangkut zat gizi, jantung memompa darah. (Maks 8 poin.)'
  },
  {
    id: 'ipa-viii-23',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 23,
    type: 'uraian',
    prompt: `Menganalisis sistem pernapasan dan ekskresi

Seorang atlet berlari selama 30 menit. Setelah latihan, napasnya lebih cepat, denyut jantung meningkat, dan tubuh mengeluarkan banyak keringat.
a. Mengapa frekuensi pernapasan meningkat setelah berolahraga?
b. Mengapa tubuh mengeluarkan keringat dan bagaimana peran ginjal dalam sistem ekskresi?`,
    points: 8,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Pernapasan dan ekskresi): a. Otot membutuhkan lebih banyak oksigen dan menghasilkan lebih banyak karbon dioksida. b. Keringat membantu mengatur suhu tubuh serta mengeluarkan air dan garam; ginjal menyaring darah dan membuang sisa metabolisme melalui urine. (Maks 8 poin.)'
  },
  {
    id: 'ipa-viii-24',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 24,
    type: 'uraian',
    prompt: `Menghitung usaha dan efisiensi usaha

Seorang pekerja mendorong peti dengan gaya $200\\text{ N}$ sejauh $10$ meter. Energi yang diberikan sebesar $2.500$ joule.
- Hitung usaha yang dilakukan pekerja! Gunakan rumus ($W = F \\times s$)`,
    points: 8,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Usaha dan efisiensi): Diketahui: $F = 200\\text{ N}$, $s = 10\\text{ m}$, Ditanya: $W$....? Jawab: $W = F \\times s = 200 \\times 10 = 2.000\\text{ J}$. (Maks 8 poin.)'
  },
  {
    id: 'ipa-viii-25',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-8',
    grade: 'VIII',
    number: 25,
    type: 'uraian',
    prompt: `Menganalisis manfaat pesawat sederhana

Seorang pedagang ingin menaikkan drum bermassa $60\\text{ kg}$ ke bak mobil setinggi $1,5$ meter menggunakan papan sepanjang $3$ meter. Anggap $g = 10\\text{ m/s}^2$ dan gesekan diabaikan.
- Hitung berat drum! Gunakan rumus ($W = m \\times g$)`,
    points: 8,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Pesawat sederhana): Diketahui $m = 60\\text{ kg}$, $g = 10\\text{ m/s}^2$, Ditanya Berat drum? Jawab: $W = m \\times g = 60 \\times 10 = 600\\text{ N}$. (Maks 8 poin.)'
  }
];
