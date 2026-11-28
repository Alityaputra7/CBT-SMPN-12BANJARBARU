import { Question } from '../types/cbt';

// =========================================================================
// ILMU PENGETAHUAN SOSIAL (IPS) KELAS IX — ULANGAN SEMESTER 1 DESEMBER 2026
// Sumber: Soal IPS kelas 9 kunci 2026.pdf (30 Soal: 14 PG + 10 PGK + 2 Isian + 1 Uraian + 3 Menjodohkan)
// Gambar pendukung: ips_kelas9_no6.jpg (No. 6), ips_kelas9_no9.png (No. 9)
// =========================================================================
const KONSUME_STIMULUS = `Simak teks di bawah ini untuk menjawab soal nomor 10 dan 11

Salah satu dampak dari modernisasi adalah terjadinya fenomena konsumerisme. Konsumerisme adalah sebuah faham yang membuat seseorang melakukan proses konsumsi secara berlebihan dan tidak wajar. Konsumerisme memengaruhi setiap orang baik secara sadar maupun tidak sadar. Hal itu terjadi seiring dengan tersedianya produk-produk modern di masyarakat dan gencarnya iklan di berbagai jenis media.

Ciri-cirinya adalah seseorang tidak lagi menilai sesuatu dari kegunaannya, namun dari merk atau harganya. Semakin bermerk atau mahal harga sebuah barang, maka semakin bernilailah barang tersebut. Ciri lainnya adalah seseorang lebih mementingkan penampilan sebuah barang daripada isinya. Akhirnya orang-orang yang terpengaruh konsumerisme cenderung akan mengikuti tren untuk mendapatkan sesuatu yang sebenarnya tidak dibutuhkan. Hingga terjadilah situasi di mana seseorang tidak bisa membedakan antara kebutuhan dan keinginannya.`;

export const IPS_KELAS_9_QUESTIONS: Question[] = [
  // =========================================================================
  // PILIHAN GANDA (14 SOAL: NO. 1–14)
  // =========================================================================
  {
    id: 'ips-ix-1',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 1,
    points: 5,
    difficulty: 'mudah',
    prompt: `Masyarakat dahulu lebih sering berbelanja langsung ke pasar. Sekarang, sebagian masyarakat mulai membeli kebutuhan melalui aplikasi belanja daring. Perubahan tersebut merupakan salah satu contoh perubahan sosial.
Berdasarkan pernyataan tersebut, perubahan sosial adalah ....`,
    options: [
      { id: 'A', text: 'perubahan yang dialami seseorang sejak lahir hingga dewasa' },
      { id: 'B', text: 'perubahan yang hanya terjadi pada lingkungan alam' },
      { id: 'C', text: 'perubahan yang terjadi pada berbagai aspek kehidupan masyarakat' },
      { id: 'D', text: 'perubahan yang terjadi karena keinginan satu orang' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-ix-2',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 2,
    points: 5,
    difficulty: 'mudah',
    prompt: `Perhatikan pernyataan berikut!
Masyarakat di suatu daerah pesisir sejak dahulu memiliki kebiasaan berinteraksi dengan masyarakat dari berbagai daerah. Dalam waktu yang panjang, kebiasaan tersebut membentuk karakter masyarakat yang lebih terbuka terhadap hal-hal baru.
Bentuk perubahan sosial berdasarkan waktu yang sesuai dengan fenomena tersebut adalah ....`,
    options: [
      { id: 'A', text: 'revolusi' },
      { id: 'B', text: 'evolusi' },
      { id: 'C', text: 'perubahan besar' },
      { id: 'D', text: 'perubahan kecil' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-ix-3',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 3,
    points: 5,
    difficulty: 'mudah',
    prompt: `Perkembangan teknologi produksi pada abad ke-18 di Eropa menyebabkan perubahan besar dalam cara masyarakat menghasilkan barang. Pekerjaan yang sebelumnya banyak dilakukan secara manual mulai menggunakan mesin.
Peristiwa tersebut dikenal dengan ....`,
    options: [
      { id: 'A', text: 'reformasi sosial' },
      { id: 'B', text: 'evolusi pertanian' },
      { id: 'C', text: 'Revolusi Industri' },
      { id: 'D', text: 'perubahan kebudayaan' },
      { id: 'E', text: 'modernisasi pendidikan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-ix-4',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 4,
    points: 5,
    difficulty: 'mudah',
    prompt: `Perhatikan dua fenomena berikut!
1. Perubahan model rambut yang sedang populer di kalangan remaja.
2. Pembangunan berbagai fasilitas transportasi, pendidikan, dan ekonomi yang mengubah kehidupan masyarakat di berbagai wilayah.

Berdasarkan cakupannya, kedua fenomena tersebut secara berurutan termasuk ....`,
    options: [
      { id: 'A', text: 'perubahan besar dan perubahan kecil' },
      { id: 'B', text: 'evolusi dan revolusi' },
      { id: 'C', text: 'perubahan yang direncanakan dan tidak direncanakan' },
      { id: 'D', text: 'perubahan kecil dan perubahan besar' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ips-ix-5',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 5,
    points: 5,
    difficulty: 'sedang',
    prompt: `Di sebuah lingkungan permukiman, pemerintah membangun pasar baru. Sebelumnya, masyarakat harus pergi cukup jauh untuk berbelanja. Setelah pasar dibangun, warga mulai berinteraksi lebih sering dan sebagian warga membuka usaha dagang.
Berdasarkan cakupannya, perubahan tersebut termasuk ....`,
    options: [
      { id: 'A', text: 'perubahan kecil' },
      { id: 'B', text: 'revolusi' },
      { id: 'C', text: 'perubahan besar' },
      { id: 'D', text: 'evolusi' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ips-ix-6',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 6,
    points: 5,
    difficulty: 'sedang',
    imageUrl: '/images/soal/ips_kelas9_no6.jpg',
    prompt: `Perhatikan ilustrasi berikut!

Ilustrasi perubahan cara produksi dari pekerjaan manual menuju penggunaan mesin.
Perubahan cara produksi dari tenaga manusia menjadi penggunaan mesin secara luas menyebabkan perubahan dalam kehidupan ekonomi dan sosial masyarakat.
Alasan perubahan tersebut termasuk perubahan besar adalah ....`,
    options: [
      { id: 'A', text: 'hanya memengaruhi model pakaian masyarakat' },
      { id: 'B', text: 'hanya terjadi pada kelompok pedagang' },
      { id: 'C', text: 'tidak memengaruhi kehidupan masyarakat' },
      { id: 'D', text: 'berdampak luas terhadap struktur masyarakat dan pranata sosial' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ips-ix-7',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 7,
    points: 5,
    difficulty: 'mudah',
    prompt: `Saat ini, penggunaan teknologi digital semakin berkembang. Banyak kegiatan masyarakat, seperti bekerja, berbelanja, dan berkomunikasi, dapat dilakukan dengan bantuan teknologi.
Perbedaan utama antara evolusi dan revolusi berdasarkan waktu terjadinya adalah ....`,
    options: [
      { id: 'A', text: 'evolusi berlangsung lambat, sedangkan revolusi berlangsung cepat' },
      { id: 'B', text: 'evolusi berlangsung cepat, sedangkan revolusi berlangsung lambat' },
      { id: 'C', text: 'evolusi hanya terjadi di perkotaan, sedangkan revolusi di pedesaan' },
      { id: 'D', text: 'evolusi selalu direncanakan, sedangkan revolusi tidak direncanakan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ips-ix-8',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 8,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan contoh perubahan sosial berikut!
1. Perubahan model rambut yang sedang tren.
2. Pembangunan berbagai fasilitas pendidikan dan transportasi di banyak wilayah.
3. Perubahan cara masyarakat menggunakan alat komunikasi.
4. Perubahan gaya berpakaian sebagian kelompok masyarakat.
5. Pembangunan yang berdampak pada bidang ekonomi, pendidikan, transportasi, dan teknologi.

Contoh yang menunjukkan perubahan besar berdasarkan cakupannya adalah ....`,
    options: [
      { id: 'A', text: '1 dan 4' },
      { id: 'B', text: '1 dan 3' },
      { id: 'C', text: '2 dan 5' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-ix-9',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 9,
    points: 5,
    difficulty: 'mudah',
    imageUrl: '/images/soal/ips_kelas9_no9.png',
    prompt: `Perhatikan gambar di atas. Perubahan sosial berdasarkan perencanaannya terbagi 2. Adanya gerakan untuk menggunakan kantong belanja berbahan kain untuk mengurangi produksi sampah plastik termasuk jenis perubahan ....`,
    options: [
      { id: 'A', text: 'perubahan yang tidak direncanakan' },
      { id: 'B', text: 'perubahan yang direncanakan' },
      { id: 'C', text: 'perubahan secara mendadak' },
      { id: 'D', text: 'perubahan secara lambat' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-ix-10',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 10,
    points: 5,
    difficulty: 'sedang',
    prompt: `${KONSUME_STIMULUS}

Perhatikan beberapa ciri perilaku berikut!
1. Membeli barang karena mengikuti tren.
2. Mengutamakan merek dan harga barang daripada kegunaannya.
3. Membeli barang sesuai kebutuhan.
4. Lebih mementingkan penampilan barang daripada isinya.

Ciri-ciri perilaku konsumerisme ditunjukkan oleh nomor ....`,
    options: [
      { id: 'A', text: '1, 2, dan 3' },
      { id: 'B', text: '1, 2, dan 4' },
      { id: 'C', text: '1, 3, dan 4' },
      { id: 'D', text: '2, 3, dan 4' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-ix-11',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 11,
    points: 5,
    difficulty: 'sedang',
    prompt: `${KONSUME_STIMULUS}

Perhatikan pernyataan berikut!
1. Seseorang membeli pakaian baru karena ingin mengikuti tren.
2. Seseorang membeli tas berdasarkan kegunaan dan kualitasnya.
3. Seseorang menganggap barang mahal selalu lebih baik daripada barang murah.
4. Seseorang membeli barang meskipun barang serupa masih dimiliki dan masih layak digunakan.
5. Seseorang membuat daftar belanja sesuai kebutuhan.

Perilaku yang mencerminkan konsumerisme ditunjukkan oleh nomor ....`,
    options: [
      { id: 'A', text: '1, 2, dan 5' },
      { id: 'B', text: '2, 3, dan 5' },
      { id: 'C', text: '2, 4, dan 5' },
      { id: 'D', text: '1, 3, dan 4' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ips-ix-12',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 12,
    points: 5,
    difficulty: 'mudah',
    prompt: `Setiap hari, Rani menggunakan uang untuk membeli makanan dan minuman di kantin sekolah. Dengan uang tersebut, Rani dapat memperoleh barang yang dibutuhkannya.
Berdasarkan kasus tersebut, uang berfungsi sebagai ....`,
    options: [
      { id: 'A', text: 'alat pembayaran utang' },
      { id: 'B', text: 'alat pemindah kekayaan' },
      { id: 'C', text: 'alat tukar' },
      { id: 'D', text: 'alat penimbun kekayaan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-ix-13',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 13,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pak Budi menyisihkan sebagian penghasilannya setiap bulan untuk ditabung di bank. Uang tersebut akan digunakan untuk memenuhi kebutuhan keluarganya pada masa mendatang.
Berdasarkan kasus tersebut, fungsi uang yang ditunjukkan adalah ....`,
    options: [
      { id: 'A', text: 'alat tukar' },
      { id: 'B', text: 'alat satuan hitung' },
      { id: 'C', text: 'alat pembayaran' },
      { id: 'D', text: 'alat penyimpan nilai' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ips-ix-14',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 14,
    points: 5,
    difficulty: 'sedang',
    prompt: `Pak Andi memiliki sebidang tanah di Martapura. Karena ingin mengembangkan usahanya di masa depan, ia menjual tanah tersebut dan menyimpan sebagian uang hasil penjualannya. Beberapa tahun kemudian, uang tersebut digunakan untuk membeli tanah di daerah lain.
Berdasarkan kasus tersebut, fungsi uang yang paling tepat adalah ....`,
    options: [
      { id: 'A', text: 'sebagai alat tukar karena digunakan untuk membeli barang' },
      { id: 'B', text: 'sebagai alat penyimpan nilai karena kekayaan dapat disimpan dalam bentuk uang' },
      { id: 'C', text: 'sebagai alat satuan hitung karena digunakan untuk menentukan harga tanah' },
      { id: 'D', text: 'sebagai alat pembayaran utang karena digunakan untuk melunasi kewajiban' }
    ],
    correctAnswers: ['B']
  },

  // =========================================================================
  // PILIHAN GANDA KOMPLEKS (10 SOAL: NO. 15–24)
  // =========================================================================
  {
    id: 'ips-ix-15',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 15,
    points: 5,
    difficulty: 'sedang',
    prompt: `Petunjuk: Pilihlah lebih dari satu jawaban yang benar!

Perubahan sosial dapat dilihat dari berbagai aspek kehidupan masyarakat. Berikut ini yang termasuk contoh perubahan sosial adalah ....`,
    options: [
      { id: 'A', text: 'Perubahan cara masyarakat berkomunikasi dari surat menjadi pesan melalui telepon pintar.' },
      { id: 'B', text: 'Perubahan warna air sungai akibat hujan.' },
      { id: 'C', text: 'Pergantian siang menjadi malam.' },
      { id: 'D', text: 'Perubahan kebiasaan masyarakat membayar belanjaan dari uang tunai menjadi pembayaran digital.' },
      { id: 'E', text: 'Perubahan kebiasaan masyarakat berbelanja dari pasar langsung menjadi belanja daring.' }
    ],
    correctAnswers: ['A', 'D', 'E']
  },
  {
    id: 'ips-ix-16',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 16,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan beberapa pernyataan berikut!
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Pembangunan fasilitas pendidikan yang mengubah kehidupan masyarakat di berbagai wilayah.' },
      { id: 'B', text: 'Pembangunan jalan dan transportasi yang berdampak pada kegiatan ekonomi masyarakat.' },
      { id: 'C', text: 'Perubahan model rambut yang sedang populer di kalangan remaja.' },
      { id: 'D', text: 'Perubahan model pakaian yang hanya mengikuti tren mode.' },
      { id: 'E', text: 'Perubahan gaya berpakaian yang hanya terjadi pada sebagian kecil masyarakat.' }
    ],
    correctAnswers: ['C', 'D', 'E']
  },
  {
    id: 'ips-ix-17',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 17,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan fenomena berikut!
Revolusi Industri di Eropa pada abad ke-18 membawa perubahan besar dalam kehidupan masyarakat. Penemuan mesin produksi membuat barang dapat dihasilkan secara massal, cepat, dan efisien.
Pernyataan yang tepat mengenai revolusi adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Perubahan yang berlangsung secara perlahan dalam waktu sangat lama.' },
      { id: 'B', text: 'Perubahan yang berlangsung secara cepat atau relatif singkat.' },
      { id: 'C', text: 'Perubahan yang dapat dipicu oleh penemuan baru.' },
      { id: 'D', text: 'Perubahan yang dapat dipicu oleh sebuah peristiwa besar.' },
      { id: 'E', text: 'Perubahan yang hanya terjadi pada kebiasaan berpakaian' }
    ],
    correctAnswers: ['B', 'C', 'D']
  },
  {
    id: 'ips-ix-18',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 18,
    points: 5,
    difficulty: 'sedang',
    prompt: `Di sebuah daerah, masyarakat mengalami perubahan kehidupan dari waktu ke waktu. Dahulu sebagian besar kegiatan produksi dilakukan secara manual. Seiring perkembangan zaman, penggunaan mesin dan teknologi semakin meluas sehingga cara masyarakat bekerja dan memenuhi kebutuhan ikut berubah.
Pernyataan yang sesuai dengan konsep perubahan sosial berdasarkan bacaan tersebut adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'perubahan sosial hanya terjadi pada individu' },
      { id: 'B', text: 'perubahan sosial dapat memengaruhi cara masyarakat bekerja' },
      { id: 'C', text: 'semua perubahan sosial berlangsung secara cepat' },
      { id: 'D', text: 'perkembangan teknologi dapat mendorong perubahan kehidupan masyarakat' },
      { id: 'E', text: 'perubahan sosial hanya terjadi pada aspek penampilan' }
    ],
    correctAnswers: ['B', 'D']
  },
  {
    id: 'ips-ix-19',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 19,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perubahan sosial sebagai sebuah fenomena yang umum terjadi di masyarakat tentu saja membawa berbagai dampak bagi keberlangsungan hidup di masyarakat. Dampak perubahan sosial ini dapat dibagi menjadi dua jenis, yakni dampak positif dan dampak negatif. Yang termasuk dampak positif adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Semakin menghargai hak orang lain.' },
      { id: 'B', text: 'Lahirnya Pola Pikir yang Maju dan Terbuka' },
      { id: 'C', text: 'Terjadinya Kesenjangan sosial' },
      { id: 'D', text: 'Terbukanya Mobilitas Sosial' },
      { id: 'E', text: 'Munculnya perilaku buruk di masyarakat.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'ips-ix-20',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 20,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan studi kasus berikut!
Andi senang menonton film dari luar negeri melalui internet. Ia juga mulai mengenal makanan, musik, dan gaya berpakaian dari berbagai negara. Selain itu, Andi sering berkomunikasi dengan teman dari negara lain melalui media sosial.
Berdasarkan kasus tersebut, pernyataan yang menunjukkan pengaruh globalisasi adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Informasi dan hiburan dari negara lain mudah diakses melalui internet.' },
      { id: 'B', text: 'Masyarakat tidak lagi membutuhkan budaya daerahnya sendiri.' },
      { id: 'C', text: 'Hubungan dan komunikasi antarnegara menjadi lebih mudah.' },
      { id: 'D', text: 'Budaya dari negara lain dapat dikenal oleh masyarakat luas.' },
      { id: 'E', text: 'Semua budaya asing harus ditiru oleh masyarakat.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ips-ix-21',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 21,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan studi kasus berikut!
Bu Rina memiliki usaha kerajinan sasirangan di Banjarbaru. Awalnya, ia hanya menjual produknya kepada pembeli di sekitar daerahnya. Setelah memanfaatkan marketplace, produknya mulai dibeli oleh konsumen dari berbagai daerah, bahkan luar negeri. Ia juga memperoleh informasi tentang tren produk dari internet untuk mengembangkan usahanya.
Berdasarkan kasus tersebut, dampak positif globalisasi yang ditunjukkan adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Pasar penjualan produk menjadi lebih luas.' },
      { id: 'B', text: 'Pengusaha tidak perlu mempertahankan produk lokal.' },
      { id: 'C', text: 'Informasi tentang perkembangan pasar lebih mudah diperoleh.' },
      { id: 'D', text: 'Persaingan usaha menjadi tidak diperlukan.' },
      { id: 'E', text: 'Produk lokal memiliki kesempatan dikenal oleh konsumen luar negeri.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ips-ix-22',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 22,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan studi kasus berikut!
Rafi adalah siswa SMP yang sering menggunakan internet dan media sosial. Ia mulai mengikuti gaya hidup yang dilihatnya di internet. Rafi juga sering bermain gim daring hingga lupa belajar dan kurang memperhatikan tugas sekolah. Selain itu, ia mulai menggunakan bahasa yang kurang sopan karena meniru konten yang ditontonnya.
Berdasarkan kasus tersebut, dampak negatif globalisasi bagi anak sekolah ditunjukkan oleh pernyataan ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Memperoleh informasi pelajaran dari berbagai sumber.' },
      { id: 'B', text: 'Menurunnya waktu belajar karena terlalu sering bermain gim daring.' },
      { id: 'C', text: 'Bertambahnya pengetahuan melalui internet.' },
      { id: 'D', text: 'Menurunnya kesopanan akibat meniru konten negatif.' },
      { id: 'E', text: 'Meniru gaya hidup yang tidak sesuai dengan nilai dan budaya sendiri.' }
    ],
    correctAnswers: ['B', 'D', 'E']
  },
  {
    id: 'ips-ix-23',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 23,
    points: 5,
    difficulty: 'mudah',
    prompt: `Uang adalah alat yang digunakan masyarakat untuk melakukan pembayaran atau membeli barang dan jasa. Dengan adanya uang, kegiatan jual beli menjadi lebih mudah karena masyarakat tidak perlu menukar barang dengan barang. Berdasarkan bentuknya uang dapat dibedakan menjadi dua, yaitu: Uang Kartal dan Uang Giral.
Berikut yang termasuk contoh uang kartal adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Uang kertas Rp50.000' },
      { id: 'B', text: 'Saldo rekening bank' },
      { id: 'C', text: 'Uang logam Rp1.000' },
      { id: 'D', text: 'Saldo dompet digital' },
      { id: 'E', text: 'Uang kertas Rp10.000' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ips-ix-24',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 24,
    points: 5,
    difficulty: 'sedang',
    prompt: `Pak Rahmat ingin membeli sepeda motor untuk menunjang kegiatan usahanya. Namun, ia belum memiliki cukup uang untuk membayar secara tunai. Ia kemudian mendatangi sebuah lembaga pembiayaan yang menyediakan fasilitas pembelian kendaraan dengan pembayaran secara angsuran dalam jangka waktu tertentu.
Berdasarkan kasus tersebut, pernyataan yang tepat mengenai lembaga keuangan yang didatangi Pak Rahmat adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Lembaga tersebut dikenal dengan nama leasing.' },
      { id: 'B', text: 'Lembaga tersebut memberikan pembiayaan untuk pembelian barang, seperti kendaraan bermotor.' },
      { id: 'C', text: 'Lembaga tersebut memberikan pinjaman dengan jaminan emas atau barang berharga.' },
      { id: 'D', text: 'Pembayaran kendaraan dapat dilakukan secara angsuran sesuai kesepakatan.' },
      { id: 'E', text: 'Lembaga tersebut memberikan perlindungan terhadap risiko kecelakaan kendaraan.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },

  // =========================================================================
  // SOAL ISIAN SINGKAT (NO. 25–27)
  // =========================================================================
  {
    id: 'ips-ix-25',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'isian',
    number: 25,
    points: 5,
    difficulty: 'mudah',
    prompt: `Proses menuju cara-cara kehidupan masa kini disebut ....`,
    options: [],
    correctAnswerText: 'Modernisasi'
  },
  {
    id: 'ips-ix-26',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'isian',
    number: 26,
    points: 5,
    difficulty: 'mudah',
    prompt: `Masyarakat yang menerima ide baru dan tidak menolak perubahan memiliki pola pikir ....`,
    options: [],
    correctAnswerText: 'Terbuka'
  },
  {
    id: 'ips-ix-27',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'uraian',
    number: 27,
    points: 5,
    difficulty: 'sedang',
    prompt: `Contoh modernisasi di bidang pekerjaan adalah ....`,
    options: [],
    essayRubric: `- Munculnya pabrik-pabrik
- Bidang pekerjaan semakin meluas seperti buruh dan manajerial perusahaan
- Munculnya sistem dan alat pertanian modern`
  },

  // =========================================================================
  // SOAL MENJODOHKAN (3 SOAL: NO. 28–30)
  // =========================================================================
  {
    id: 'ips-ix-28',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'mencocokkan',
    number: 28,
    points: 5,
    difficulty: 'sedang',
    prompt: `Petunjuk: Pasangkan setiap pilihan jawaban di sebelah kiri dengan pernyataan yang tepat di sebelah kanan!`,
    options: [],
    matchingPairs: [
      {
        id: 'ips-ix-28-p1',
        leftText: '1. Uang elektronik',
        rightText: 'D. Alat pembayaran yang menggunakan saldo melalui kartu atau aplikasi digital'
      },
      {
        id: 'ips-ix-28-p2',
        leftText: '2. Barter',
        rightText: 'A. Kegiatan tukar-menukar barang dengan barang tanpa menggunakan uang.'
      },
      {
        id: 'ips-ix-28-p3',
        leftText: '3. Uang logam',
        rightText: 'B. Alat tukar yang terbuat dari logam, seperti emas dan perak.'
      },
      {
        id: 'ips-ix-28-p4',
        leftText: '4. Uang kertas',
        rightText: 'C. Alat pembayaran berbentuk lembaran yang dikeluarkan oleh bank sentral.'
      },
      {
        id: 'ips-ix-28-p5',
        leftText: '5. Uang kartal',
        rightText: 'F. Uang yang terdiri atas uang kertas dan uang logam serta digunakan sebagai alat pembayaran yang sah.'
      }
    ],
    matchingRightOptions: [
      'A. Kegiatan tukar-menukar barang dengan barang tanpa menggunakan uang.',
      'B. Alat tukar yang terbuat dari logam, seperti emas dan perak.',
      'C. Alat pembayaran berbentuk lembaran yang dikeluarkan oleh bank sentral.',
      'D. Alat pembayaran yang menggunakan saldo melalui kartu atau aplikasi digital',
      'E. Alat tukar berupa barang yang memiliki nilai, seperti garam dan kulit kerang.',
      'F. Uang yang terdiri atas uang kertas dan uang logam serta digunakan sebagai alat pembayaran yang sah.'
    ],
    essayRubric: 'Jawaban: 1.D, 2.A, 3.B, 4.C, 5.F'
  },
  {
    id: 'ips-ix-29',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'mencocokkan',
    number: 29,
    points: 5,
    difficulty: 'sedang',
    prompt: `Petunjuk: Pasangkan setiap pilihan jawaban di sebelah kiri dengan pernyataan yang tepat di sebelah kanan!`,
    options: [],
    matchingPairs: [
      {
        id: 'ips-ix-29-p1',
        leftText: '1. Memberikan perlindungan terhadap risiko kerugian tertentu.',
        rightText: 'C. Asuransi'
      },
      {
        id: 'ips-ix-29-p2',
        leftText: '2. Menghimpun dana masyarakat dalam bentuk simpanan dan menyalurkannya sebagai pinjaman.',
        rightText: 'D. Bank'
      },
      {
        id: 'ips-ix-29-p3',
        leftText: '3. Menyediakan pembiayaan untuk memperoleh barang, seperti kendaraan bermotor.',
        rightText: 'B. Leasing'
      },
      {
        id: 'ips-ix-29-p4',
        leftText: '4. Memberikan pinjaman dengan menggunakan barang sebagai jaminan.',
        rightText: 'A. Pegadaian'
      },
      {
        id: 'ips-ix-29-p5',
        leftText: '5. Melayani kegiatan simpan pinjam untuk memenuhi kebutuhan anggota.',
        rightText: 'E. Koperasi'
      }
    ],
    matchingRightOptions: [
      'A. Pegadaian',
      'B. Leasing',
      'C. Asuransi',
      'D. Bank',
      'E. Koperasi',
      'F. Pasar modal'
    ],
    essayRubric: 'Jawaban: 1.C, 2.D, 3.B, 4.A, 5.E'
  },
  {
    id: 'ips-ix-30',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-9',
    grade: 'IX',
    type: 'mencocokkan',
    number: 30,
    points: 5,
    difficulty: 'sedang',
    prompt: `Petunjuk: Pasangkan contoh peristiwa globalisasi pada kolom A dengan aspek globalisasi yang tepat pada kolom B! Pilihlah huruf jawaban yang sesuai.`,
    options: [],
    matchingPairs: [
      {
        id: 'ips-ix-30-p1',
        leftText: '1. Siswa dapat mengikuti pembelajaran secara daring dengan menggunakan aplikasi dari luar negeri.',
        rightText: 'E. Aspek Teknologi Komunikasi'
      },
      {
        id: 'ips-ix-30-p2',
        leftText: '2. Masyarakat Indonesia dapat membeli produk dari negara lain melalui perdagangan online.',
        rightText: 'C. Aspek Ekonomi'
      },
      {
        id: 'ips-ix-30-p3',
        leftText: '3. Negara-negara bekerja sama dalam membuat kesepakatan untuk menjaga perdamaian dunia.',
        rightText: 'B. Aspek Politik dan Hukum'
      },
      {
        id: 'ips-ix-30-p4',
        leftText: '4. Masyarakat Indonesia mulai mengenal dan menikmati musik serta film dari berbagai negara',
        rightText: 'A. Aspek Kebudayaan'
      },
      {
        id: 'ips-ix-30-p5',
        leftText: '5. Negara-negara bekerja sama membuat aturan internasional untuk melindungi lingkungan hidup.',
        rightText: 'B. Aspek Politik dan Hukum'
      }
    ],
    matchingRightOptions: [
      'A. Aspek Kebudayaan',
      'B. Aspek Politik dan Hukum',
      'C. Aspek Ekonomi',
      'D. Aspek Ilmu Pengetahuan',
      'E. Aspek Teknologi Komunikasi',
      'F. Aspek Transportasi'
    ],
    essayRubric: 'Jawaban: 1.E (atau D), 2.C, 3.B, 4.A, 5.B'
  }
];
