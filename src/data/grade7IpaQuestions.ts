import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI IPA KELAS VII SMP/MTs (BAB 1-4)
// Sumber: SOAL_IPA_KELAS_7_db239ff8.pdf (25 Soal Lengkap, Total Skor = 100)
// Pedoman Penilaian Resmi (Hal. 6):
// - 15 Pilihan Ganda (No. 1-15) x 3 poin = 45 poin
// - 5 Benar atau Salah (No. 16-20) x 2 poin = 10 poin
// - 5 Soal Esai (No. 21-25) x 9 poin = 45 poin
// Total = 100 poin
// =========================================================================

export const IPA_KELAS_7_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // A. PILIHAN GANDA (No. 1 - 15, 3 poin/soal = 45 poin)
  // -----------------------------------------------------------------------
  {
    id: 'ipa-vii-1',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt:
      'Seorang siswa mengamati tanaman kacang hijau yang tumbuh di dua tempat berbeda. Tanaman pertama diletakkan di tempat terkena sinar matahari, sedangkan tanaman kedua diletakkan di tempat gelap. Setelah satu minggu, tanaman pertama tumbuh lebih hijau dibandingkan tanaman kedua. Berdasarkan kegiatan tersebut, pernyataan yang menunjukkan hakikat sains adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Sains hanya mempelajari sesuatu yang dapat dilihat tanpa alat bantu.' },
      { id: 'B', text: 'Sains merupakan pengetahuan yang diperoleh melalui pengamatan dan penyelidikan secara sistematis.' },
      { id: 'C', text: 'Sains merupakan kumpulan pendapat yang tidak perlu dibuktikan.' },
      { id: 'D', text: 'Sains hanya mempelajari makhluk hidup dan lingkungan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-vii-2',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg',
    prompt:
      'Dalam kehidupan sehari-hari, kita menemukan berbagai peristiwa yang dapat dijelaskan melalui cabang ilmu sains. Perhatikan kegiatan berikut: (1) mempelajari struktur tulang manusia; (2) meneliti kandungan zat dalam air; (3) mempelajari pergerakan planet; dan (4) mengamati hubungan makhluk hidup dengan lingkungannya. Urutan cabang ilmu yang tepat adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Biologi, Kimia, Astronomi, Ekologi.' },
      { id: 'B', text: 'Fisika, Biologi, Kimia, Astronomi.' },
      { id: 'C', text: 'Kimia, Fisika, Biologi, Geologi.' },
      { id: 'D', text: 'Biologi, Fisika, Astronomi, Kimia.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa-vii-3',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'pg',
    prompt:
      'Seorang siswa ingin mengukur volume air sebanyak $45\\text{ mL}$ secara teliti. Ia menemukan beberapa alat laboratorium, yaitu gelas beker, tabung reaksi, gelas ukur, dan cawan penguap. Alat yang paling tepat digunakan adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Cawan penguap.' },
      { id: 'B', text: 'Tabung reaksi.' },
      { id: 'C', text: 'Gelas ukur.' },
      { id: 'D', text: 'Gelas beker.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-vii-4',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'pg',
    prompt:
      'Seorang siswa ingin mengetahui pengaruh intensitas cahaya terhadap pertumbuhan tanaman kacang hijau. Ia menyiapkan tiga tanaman dengan jenis tanah, jumlah air, dan ukuran pot yang sama, tetapi meletakkannya pada kondisi pencahayaan berbeda. Variabel bebas dalam percobaan tersebut adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Jenis tanah yang digunakan.' },
      { id: 'B', text: 'Jumlah air yang diberikan.' },
      { id: 'C', text: 'Pertumbuhan tanaman.' },
      { id: 'D', text: 'Intensitas cahaya yang diterima tanaman.' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ipa-vii-5',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'pg',
    prompt:
      'Dalam praktikum, siswa mengukur panjang meja menggunakan penggaris. Agar hasil pengukuran akurat, posisi mata harus tegak lurus terhadap skala penggaris dan pengukuran dimulai dari angka nol. Alasan posisi mata harus tegak lurus adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Agar penggaris terlihat lebih panjang.' },
      { id: 'B', text: 'Untuk menghindari kesalahan paralaks saat membaca hasil pengukuran.' },
      { id: 'C', text: 'Agar hasil pengukuran menjadi lebih besar.' },
      { id: 'D', text: 'Untuk mempercepat proses pengukuran.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-vii-6',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 6,
    type: 'pg',
    prompt:
      'Perhatikan karakteristik partikel tiga zat berikut. Zat P: partikelnya sangat rapat dan teratur, hanya bergetar di tempat. Zat Q: partikelnya agak renggang, dapat bergeser, dan mengikuti bentuk wadah. Zat R: partikelnya sangat renggang, bergerak bebas, dan memenuhi seluruh ruang wadah. Urutan wujud zat P, Q, dan R adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Gas, cair, padat.' },
      { id: 'B', text: 'Padat, cair, gas.' },
      { id: 'C', text: 'Cair, padat, gas.' },
      { id: 'D', text: 'Padat, gas, cair.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-vii-7',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 7,
    type: 'pg',
    prompt:
      'Ibu memasukkan beberapa es batu ke dalam gelas berisi minuman. Setelah beberapa menit, es batu berubah menjadi air. Perubahan wujud yang terjadi disebut ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Mengembun.' },
      { id: 'B', text: 'Membeku.' },
      { id: 'C', text: 'Mencair.' },
      { id: 'D', text: 'Menyublim.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-vii-8',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 8,
    type: 'pg',
    prompt:
      'Perhatikan peristiwa berikut: (1) kertas dibakar hingga menjadi abu; (2) es batu mencair menjadi air; (3) besi berkarat setelah terkena air dan udara; (4) gula larut dalam air. Peristiwa yang termasuk perubahan kimia ditunjukkan oleh nomor ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1 dan 3.' },
      { id: 'B', text: '2 dan 4.' },
      { id: 'C', text: '1 dan 2.' },
      { id: 'D', text: '3 dan 4.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa-vii-9',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 9,
    type: 'pg',
    prompt:
      'Seorang siswa memasukkan tiga benda ke dalam air dan mencatat data berikut:\n• Benda A: Massa = $100\\text{ g}$, Volume = $50\\text{ cm}^{3}$\n• Benda B: Massa = $120\\text{ g}$, Volume = $150\\text{ cm}^{3}$\n• Benda C: Massa = $300\\text{ g}$, Volume = $100\\text{ cm}^{3}$\n\nBerdasarkan data, benda yang memiliki kerapatan paling besar adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Benda A.' },
      { id: 'B', text: 'Benda B.' },
      { id: 'C', text: 'Benda C.' },
      { id: 'D', text: 'Benda A dan B.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-vii-10',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 10,
    type: 'pg',
    prompt:
      'Ketika minyak dituangkan ke dalam gelas berisi air, minyak terlihat berada di bagian atas permukaan air. Berdasarkan konsep kerapatan zat, penyebab peristiwa tersebut adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Minyak memiliki massa yang lebih besar daripada air.' },
      { id: 'B', text: 'Minyak memiliki kerapatan lebih kecil daripada air.' },
      { id: 'C', text: 'Air memiliki volume yang lebih kecil daripada minyak.' },
      { id: 'D', text: 'Minyak dan air memiliki kerapatan yang sama.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-vii-11',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 11,
    type: 'pg',
    prompt:
      'Seorang siswa mengukur suhu air menggunakan termometer Celsius. Suhu awal air $25^{\\circ}\\text{C}$. Setelah dipanaskan, suhunya meningkat menjadi $65^{\\circ}\\text{C}$. Kenaikan suhu air adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$25^{\\circ}\\text{C}$.' },
      { id: 'B', text: '$35^{\\circ}\\text{C}$.' },
      { id: 'C', text: '$40^{\\circ}\\text{C}$.' },
      { id: 'D', text: '$65^{\\circ}\\text{C}$.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-vii-12',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 12,
    type: 'pg',
    prompt:
      'Ketika sendok logam dimasukkan ke dalam segelas teh panas, beberapa saat kemudian ujung sendok terasa hangat. Peristiwa tersebut menunjukkan perpindahan kalor secara ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Konduksi.' },
      { id: 'B', text: 'Konveksi.' },
      { id: 'C', text: 'Radiasi.' },
      { id: 'D', text: 'Evaporasi.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa-vii-13',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 13,
    type: 'pg',
    prompt:
      'Pada siang hari yang panas, kabel listrik yang terbentang di antara dua tiang terlihat lebih kendur dibandingkan pada pagi hari. Fenomena tersebut terjadi karena ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Kabel mengalami penyusutan akibat suhu meningkat.' },
      { id: 'B', text: 'Kabel mengalami pemuaian akibat menerima kalor dari lingkungan.' },
      { id: 'C', text: 'Kabel kehilangan seluruh energi panasnya.' },
      { id: 'D', text: 'Kabel berubah menjadi zat cair karena panas matahari.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-vii-14',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 14,
    type: 'pg',
    prompt:
      'Seorang siswa berjalan dari rumah menuju sekolah sejauh $500$ meter. Setelah sampai di sekolah, ia kembali ke rumah melalui jalan yang sama. Jarak tempuh dan perpindahan siswa adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Jarak $0$ meter dan perpindahan $1.000$ meter.' },
      { id: 'B', text: 'Jarak $500$ meter dan perpindahan $500$ meter.' },
      { id: 'C', text: 'Jarak $1.000$ meter dan perpindahan $0$ meter.' },
      { id: 'D', text: 'Jarak $1.000$ meter dan perpindahan $1.000$ meter.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-vii-15',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 15,
    type: 'pg',
    prompt:
      'Dua orang siswa mendorong sebuah meja di lantai. Siswa pertama mendorong dengan gaya $20\\text{ N}$, sedangkan siswa kedua mendorong dengan gaya $30\\text{ N}$ ke arah yang sama. Resultan gaya yang bekerja pada meja adalah ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '$10\\text{ N}$.' },
      { id: 'B', text: '$20\\text{ N}$.' },
      { id: 'C', text: '$30\\text{ N}$.' },
      { id: 'D', text: '$50\\text{ N}$.' }
    ],
    correctAnswers: ['D']
  },

  // -----------------------------------------------------------------------
  // B. BENAR ATAU SALAH (No. 16 - 20 / B.1 - B.5, 2 poin/soal = 10 poin)
  // -----------------------------------------------------------------------
  {
    id: 'ipa-vii-16',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 16,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nSains merupakan ilmu pengetahuan yang diperoleh melalui pengamatan, penyelidikan, dan pembuktian berdasarkan bukti.',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'ipa-vii-17',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 17,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nGelas beker merupakan alat laboratorium yang paling tepat untuk mengukur volume cairan dengan ketelitian tinggi.',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },
  {
    id: 'ipa-vii-18',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 18,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nKetika air dipanaskan hingga mendidih dan berubah menjadi uap, terjadi perubahan wujud dari cair menjadi gas.',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'ipa-vii-19',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 19,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nBenda yang memiliki massa lebih besar pasti memiliki kerapatan lebih besar daripada benda yang massanya lebih kecil.',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },
  {
    id: 'ipa-vii-20',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 20,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nJika sebuah benda bergerak kembali ke titik awal melalui lintasan yang sama, perpindahannya bernilai nol meskipun jarak tempuhnya tidak nol.',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },

  // -----------------------------------------------------------------------
  // C. SOAL ESAI (No. 21 - 25 / C.1 - C.5, 9 poin/soal = 45 poin)
  // -----------------------------------------------------------------------
  {
    id: 'ipa-vii-21',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 21,
    type: 'uraian',
    prompt:
      'Seorang siswa ingin mengetahui pengaruh cahaya matahari terhadap pertumbuhan tanaman kacang hijau. Bagaimana rancangan percobaan ilmiah yang tepat untuk membuktikan pengaruh cahaya matahari tersebut?',
    points: 9,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Metode Ilmiah): Menanam dua kelompok kacang hijau dengan kondisi yang sama. Satu kelompok diletakkan di tempat terkena sinar matahari dan satu kelompok di tempat gelap. Amati dan bandingkan pertumbuhannya. (Kriteria: Skor 9 lengkap & benar; Skor 7 benar kurang lengkap; Skor 5 sebagian benar; Skor 3 kurang tepat; Skor 0 tidak menjawab.)'
  },
  {
    id: 'ipa-vii-22',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 22,
    type: 'uraian',
    prompt:
      'Ibu memasak air menggunakan panci di atas kompor. Setelah beberapa menit, air mendidih dan mengeluarkan uap. Pada bagian tutup panci terlihat titik-titik air yang terbentuk ketika uap menyentuh permukaan tutup yang lebih dingin. Jawablah:\na. Perubahan wujud apa yang terjadi ketika air mendidih?\nb. Perubahan wujud apa yang terjadi ketika uap menjadi titik-titik air?',
    points: 9,
    difficulty: 'mudah',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Zat dan Perubahannya): a. Menguap, yaitu perubahan zat cair menjadi gas. b. Mengembun, yaitu perubahan gas menjadi cair. (Skor maksimal 9.)'
  },
  {
    id: 'ipa-vii-23',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 23,
    type: 'uraian',
    prompt:
      'Mengapa kabel listrik yang dipasang di antara dua tiang dibuat agak kendur dan tidak dipasang terlalu tegang? Jelaskan menggunakan konsep suhu dan pemuaian!',
    points: 9,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Suhu dan Kalor): Kabel listrik dipasang agak kendur karena logam penyusun kabel mengalami pemuaian ketika suhu meningkat dan penyusutan ketika suhu menurun. Pada siang hari yang panas, kabel memuai sehingga panjangnya bertambah. Sebaliknya, pada malam hari yang dingin, kabel menyusut sehingga panjangnya berkurang. Jika kabel dipasang terlalu tegang, penyusutan saat suhu dingin dapat menyebabkan kabel tertarik terlalu kuat dan berisiko putus. (Skor maksimal 9.)'
  },
  {
    id: 'ipa-vii-24',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 24,
    type: 'uraian',
    prompt:
      'Andi bersepeda sejauh $800$ meter selama $4$ menit dari rumah menuju taman. Tentukan kelajuan rata-rata Andi dalam satuan $\\text{m/s}$ dan jelaskan cara memperoleh hasilnya!',
    points: 9,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Gerak): Diketahui Jarak = $800\\text{ m}$, Waktu = $4 \\times 60 = 240\\text{ sekon}$. Kecepatan = $\\frac{\\text{jarak}}{\\text{waktu}} = \\frac{800}{240} = 3,33\\text{ m/s}$. (Skor maksimal 9.)'
  },
  {
    id: 'ipa-vii-25',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-1',
    grade: 'VII',
    number: 25,
    type: 'uraian',
    prompt:
      'Perhatikan peristiwa berikut: (1) buah mangga jatuh dari pohon ke tanah; (2) seorang anak mengayuh sepeda hingga bergerak; (3) magnet menarik paku besi; (4) rem sepeda ditekan sehingga roda melambat; (5) bola ditendang hingga bergerak.\na. Identifikasikan jenis gaya yang bekerja pada setiap peristiwa tersebut!\nb. Jelaskan bagaimana gaya dapat memengaruhi gerak benda!',
    points: 9,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Macam-macam Gaya): a. Mangga jatuh: gaya gravitasi; mengayuh sepeda: gaya otot; magnet menarik paku: gaya magnet; rem memperlambat roda: gaya gesek; menendang bola: gaya otot. b. Gaya dapat membuat benda bergerak, berhenti, berubah arah, berubah kecepatan, atau berubah bentuk. (Skor maksimal 9.)'
  }
];
