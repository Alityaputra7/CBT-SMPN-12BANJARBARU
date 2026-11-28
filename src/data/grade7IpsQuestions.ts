import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI IPS KELAS VII SEMESTER 1 (DESEMBER 2026)
// Sumber: Soal__IPS_kelas_7_kunci_2026_065cf77c.pdf (30 Soal Lengkap)
// - 12 Pilihan Ganda (No. 1-12)
// - 11 Pilihan Ganda Kompleks (No. 13-23; No. 18 dilengkapi foto asli dari PDF)
// - 3 Menjodohkan (No. 24-26)
// - 4 Esai (No. 27-30, berita BPBD Karhutla Kalsel + kunci jawaban)
// - Bobot: 5 poin per soal
// =========================================================================

const KARHUTLA_NEWS_STIMULUS = `Untuk menjawab soal essay, baca berita di bawah ini!

BPBD: Karhutla di Kalimantan Selatan capai 20.206 hektare

Banjarbaru (ANTARA) - Badan Penanggulangan Bencana Daerah (BPBD) Kalimantan Selatan mencatat luas terdampak kebakaran hutan dan lahan (karhutla) di provinsi itu telah mencapai 20.206,06 hektare dengan 2.963 kejadian sepanjang periode 1 Januari hingga 10 September 2026.

Kepala BPBD Kalsel Ronny Eka Saputra di Banjarbaru, Kamis, mengatakan Kabupaten Banjar menjadi wilayah dengan karhutla terluas, yakni mencapai sekitar 5.100 hektare, diikuti Kota Banjarbaru sekitar 2.539 hektare, dan Kabupaten Tanah Laut.

“Meskipun karhutla mulai terkendali, masih terdapat sejumlah titik yang mengeluarkan asap karena berada pada kawasan lahan gambut yang membutuhkan penanganan lebih lama,” ujarnya.

BPBD Kalsel bersama unsur terkait memadukan sejumlah metode untuk menangani kebakaran pada lahan gambut, termasuk penyuntikan areal gambut menggunakan cairan surfaktan yang diinisiasi Kapolda Kalsel serta pemanfaatan drone termal untuk mendeteksi titik panas.

Ronny mengatakan perpaduan metode tersebut cukup efektif membantu pengendalian karhutla, meskipun penanganan pada lahan gambut membutuhkan waktu karena sumber api dapat berada di bawah permukaan dan masih menghasilkan asap meski api terbuka telah berkurang.

BPBD Kalsel mengingatkan masyarakat agar tidak melakukan aktivitas yang berisiko memicu karhutla, termasuk membakar sampah maupun membuka atau membersihkan lahan dengan pembakaran tanpa pengawasan yang benar.

BPBD Kalsel juga mengimbau masyarakat menghemat penggunaan air karena sejumlah daerah di Kalimantan Selatan mengalami kekeringan sehingga ketersediaan sumber air untuk kebutuhan masyarakat maupun penanganan karhutla perlu dijaga.
(Sumber: https://kalsel.antaranews.com/berita/534533/bpbd-karhutla-di-kalimantan-selatan-capai-20206-hektare)`;

export const IPS_KELAS_7_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // A. PILIHAN GANDA (No. 1 - 12)
  // -----------------------------------------------------------------------
  {
    id: 'ips-vii-1',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt:
      'Manusia memenuhi kebutuhan untuk kelangsungan hidup. Kebutuhan manusia ini berbeda antarindividu serta sifatnya hampir tidak terbatas. Dalam kehidupan sehari-hari, manusia juga memiliki berbagai keinginan yang belum tentu harus dipenuhi. Oleh karena itu, manusia perlu memahami perbedaan antara kebutuhan dan keinginan agar dapat menentukan prioritas dalam menggunakan sumber daya yang dimiliki.\n\nPerhatikan beberapa pernyataan berikut!\n1. Kebutuhan harus dipenuhi karena berpengaruh terhadap kelangsungan hidup manusia.\n2. Keinginan harus selalu dipenuhi agar manusia dapat hidup dengan baik.\n3. Kebutuhan bersifat mendasar, sedangkan keinginan merupakan tambahan untuk memperoleh kepuasan.\n4. Keinginan dapat ditunda pemenuhannya tanpa mengganggu kelangsungan hidup.\n\nPernyataan yang tepat untuk membedakan kebutuhan dan keinginan ditunjukkan oleh nomor ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1, 2, dan 3' },
      { id: 'B', text: '1, 3, dan 4' },
      { id: 'C', text: '1, 2, dan 4' },
      { id: 'D', text: '2, 3, dan 4' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-vii-2',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg',
    prompt:
      'Manusia memiliki kebutuhan dan keinginan yang berbeda-beda. Dalam kehidupan sehari-hari, seseorang perlu menentukan mana yang harus dipenuhi terlebih dahulu.\n\nPerhatikan beberapa pernyataan berikut!\n1. Rina membeli beras untuk memenuhi kebutuhan makan keluarganya.\n2. Dodi membeli sepatu baru karena ingin mengikuti model terbaru, padahal sepatunya masih layak digunakan.\n3. Ibu membeli obat ketika anggota keluarganya sedang sakit.\n4. Andi membeli telepon genggam keluaran terbaru meskipun telepon genggam lamanya masih berfungsi dengan baik.\n\nBerdasarkan pernyataan tersebut, contoh tindakan yang menunjukkan pemenuhan kebutuhan ditunjukkan oleh nomor ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '1 dan 2' },
      { id: 'B', text: '2 dan 3' },
      { id: 'C', text: '1 dan 3' },
      { id: 'D', text: '2 dan 4' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-vii-3',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'pg',
    prompt:
      'Keluarga Pak Hasan memiliki beberapa kebutuhan yang harus dipenuhi setiap hari. Ia membeli beras, lauk-pauk, dan pakaian untuk keluarganya. Selain itu, ia juga ingin membeli televisi baru untuk hiburan.\n\nBerdasarkan cerita tersebut, kebutuhan primer keluarga Pak Hasan ditunjukkan oleh ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Membeli beras, lauk-pauk, dan pakaian' },
      { id: 'B', text: 'Membeli televisi dan pakaian' },
      { id: 'C', text: 'Membeli televisi dan lauk-pauk' },
      { id: 'D', text: 'Membeli televisi untuk hiburan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ips-vii-4',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'pg',
    prompt:
      'Rani baru saja pindah ke rumah baru bersama keluarganya. Keluarganya sudah memiliki makanan, pakaian, dan tempat tinggal. Untuk menunjang kenyamanan hidup, orang tuanya membeli meja belajar, lemari, dan sepeda.\n\nBarang-barang yang dibeli keluarga Rani termasuk kebutuhan ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Primer, karena berkaitan dengan kebutuhan dasar' },
      { id: 'B', text: 'Sekunder, karena melengkapi kebutuhan utama' },
      { id: 'C', text: 'Tersier, karena menunjukkan kemewahan' },
      { id: 'D', text: 'Primer, karena harus dimiliki setiap orang' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-vii-5',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'pg',
    prompt:
      'Pak Budi memiliki penghasilan yang cukup untuk memenuhi kebutuhan keluarganya. Ia sudah memiliki rumah, makanan, pakaian, dan kendaraan sederhana. Namun, ia berencana membeli mobil mewah untuk meningkatkan kenyamanan dan gengsi.\n\nBerdasarkan tingkat kepentingannya, mobil mewah yang ingin dibeli Pak Budi termasuk kebutuhan ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Primer' },
      { id: 'B', text: 'Sekunder' },
      { id: 'C', text: 'Tersier' },
      { id: 'D', text: 'Pokok' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-vii-6',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 6,
    type: 'pg',
    prompt:
      'Keluarga Ibu Sari sedang mengatur pengeluaran bulanan. Mereka membuat daftar barang yang ingin dibeli, yaitu:\n1. Beras dan kebutuhan makanan sehari-hari.\n2. Lemari untuk menyimpan pakaian.\n3. Perhiasan mahal untuk koleksi.\n4. Pakaian sekolah anak.\n5. Mobil mewah untuk menunjang gaya hidup.\n\nBerdasarkan daftar tersebut, pengelompokan kebutuhan yang tepat adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Primer (1 dan 2), sekunder (4), tersier (3 dan 5)' },
      { id: 'B', text: 'Primer (1 dan 4), sekunder (2), tersier (3 dan 5)' },
      { id: 'C', text: 'Primer (1 dan 3), sekunder (2 dan 4), tersier (5)' },
      { id: 'D', text: 'Primer (1 dan 5), sekunder (2 dan 3), tersier (4)' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-vii-7',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 7,
    type: 'pg',
    prompt:
      'Andi berasal dari keluarga dengan penghasilan terbatas. Keluarganya sudah mampu memenuhi kebutuhan makanan, pakaian, dan tempat tinggal. Orang tuanya kemudian mempertimbangkan untuk membeli sepeda motor, memperbaiki perabot rumah, atau membeli perhiasan mahal.\n\nJika keluarga Andi ingin menggunakan penghasilannya secara bijaksana, keputusan yang paling tepat adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Membeli perhiasan mahal karena memiliki nilai jual yang tinggi.' },
      { id: 'B', text: 'Membeli semua barang agar seluruh keinginan keluarga terpenuhi.' },
      {
        id: 'C',
        text: 'Memprioritaskan kebutuhan yang paling penting dan mempertimbangkan kemampuan ekonomi keluarga.'
      },
      { id: 'D', text: 'Membeli barang yang paling mahal agar dapat digunakan dalam jangka panjang.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-vii-8',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 8,
    type: 'pg',
    prompt:
      'Perbedaan kebutuhan manusia tidak hanya dipengaruhi oleh kondisi ekonomi, tetapi juga oleh keadaan pribadi dan lingkungan sosialnya. Perhatikan beberapa pernyataan berikut!\n1. Seseorang memilih makanan tertentu karena memiliki selera yang berbeda dengan orang lain.\n2. Kebutuhan pakaian seseorang dapat dipengaruhi oleh jenis kelaminnya.\n3. Seseorang membeli barang bermerek untuk menunjukkan kedudukan sosialnya.\n4. Kebutuhan seseorang tidak akan berubah meskipun usianya bertambah.\n5. Masyarakat yang tinggal di daerah pantai memiliki kebutuhan yang sama persis dengan masyarakat pegunungan.\n\nPernyataan yang tepat mengenai faktor-faktor yang memengaruhi kebutuhan manusia ditunjukkan oleh ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1, 2, dan 3' },
      { id: 'B', text: '1, 2, dan 4' },
      { id: 'C', text: '2, 3, dan 5' },
      { id: 'D', text: '1, 3, 4, dan 5' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ips-vii-9',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 9,
    type: 'pg',
    prompt:
      'Perhatikan jenis barang berikut:\n(1) Pensil\n(2) Pertalite\n(3) Motor\n(4) Pulpen\n(5) Jagung\n(6) Nasi\n(7) Pertamax\n\nBarang yang termasuk dalam kategori barang komplementer ditunjukan oleh nomor ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '(1) dan (4)' },
      { id: 'B', text: '(2) dan (3)' },
      { id: 'C', text: '(2) dan (7)' },
      { id: 'D', text: '(5) dan (6)' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-vii-10',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 10,
    type: 'pg',
    prompt:
      'Kota-kota metropolitan seperti Jakarta, Surabaya, dan Bandung mempunyai pencemaran udara yang cukup tinggi karena aktivitas penduduknya yang cukup banyak menggunakan kendaraan bermotor. Sebaliknya di kota-kota yang pencemaran udaranya rendah mempunyai aktivitas penduduk yang cenderung sedikit menggunakan kendaraan bermotor dalam aktivitas sehari-harinya. Maka dapat disimpulkan bahwa ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      {
        id: 'A',
        text: 'kota-kota metropolitan mempunyai sumbangan yang kecil terhadap pencemaran udara dibandingkan kota-kota kecil'
      },
      {
        id: 'B',
        text: 'kota-kota metropolitan mempunyai sumbangan yang besar terhadap pencemaran udara dibandingkan kota-kota kecil'
      },
      {
        id: 'C',
        text: 'kota-kota metropolitan mempunyai sumbangan yang sama dengan pencemaran udara yang terjadi di kota-kota kecil'
      },
      {
        id: 'D',
        text: 'kota-kota metropolitan mempunyai sumbangan yang cukup terhadap pencemaran udara yang terjadi di kota-kota kecil'
      }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-vii-11',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 11,
    type: 'pg',
    prompt:
      '(1) Menggunakan sarana transportasi umum\n(2) Mengembangkan kendaraan bertenaga listrik\n(3) Menanam pohon-pohon di hutan\n(4) Memakai masker ketika beraktivitas\n\nSolusi yang tepat untuk menanggulangi pencemaran udara dari pernyataan di atas yaitu ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1 dan 2' },
      { id: 'B', text: '2 dan 3' },
      { id: 'C', text: '3 dan 4' },
      { id: 'D', text: '1 dan 4' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-vii-12',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 12,
    type: 'pg',
    prompt: 'Syarat adanya interaksi sosial adalah kontak sosial yang terjadi karena ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'keterlibatan satu individu dengan individu' },
      { id: 'B', text: 'keterlibatan satu individu dengan kelompok.' },
      { id: 'C', text: 'keterlibatan satu kelompok dengan kelompok' },
      { id: 'D', text: 'keterlibatan satu individu dengan individu atau kelompok dengan kelompok lain.' }
    ],
    correctAnswers: ['D']
  },

  // -----------------------------------------------------------------------
  // B. PILIHAN GANDA KOMPLEKS (No. 13 - 23 / Nomor 1-11 pada dokumen)
  // -----------------------------------------------------------------------
  {
    id: 'ips-vii-13',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 13,
    type: 'pg_kompleks',
    prompt:
      'Ada 8 faktor yang memengaruhi kebutuhan, di mana hal ini menyebabkan perbedaan kebutuhan setiap orang. Faktor-faktor tersebut dapat dilihat dari kondisi kehidupan manusia sehari-hari.\n\nPilihlah semua pernyataan yang menunjukkan faktor-faktor yang memengaruhi kebutuhan manusia!',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Seorang petani membutuhkan cangkul untuk membantu pekerjaannya.' },
      { id: 'B', text: 'Masyarakat yang tinggal di daerah pegunungan membutuhkan pakaian lebih tebal.' },
      { id: 'C', text: 'Setiap orang memiliki kebutuhan yang sama karena tinggal di negara yang sama.' },
      { id: 'D', text: 'Seseorang dengan pendapatan tinggi memiliki kemampuan membeli barang lebih banyak.' },
      { id: 'E', text: 'Kebutuhan seseorang tidak pernah berubah meskipun usianya bertambah.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'ips-vii-14',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 14,
    type: 'pg_kompleks',
    prompt:
      'Pak Rahman bekerja sebagai petani padi. Setelah panen, ia menjual gabah kepada pengusaha penggilingan padi. Gabah tersebut kemudian diolah menjadi beras untuk dijual kepada masyarakat.\n\nBerdasarkan cerita tersebut, pilihlah semua pernyataan yang benar!',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Gabah termasuk barang mentah karena belum mengalami proses pengolahan lebih lanjut.' },
      { id: 'B', text: 'Nasi termasuk barang jadi karena sudah siap dikonsumsi.' },
      { id: 'C', text: 'Gabah termasuk barang jadi karena sudah dapat dijual.' },
      { id: 'D', text: 'Beras termasuk barang mentah karena berasal dari hasil pertanian.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'ips-vii-15',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 15,
    type: 'pg_kompleks',
    prompt:
      'Sebuah perusahaan mengolah kayu hasil hutan menjadi papan. Papan tersebut kemudian dijual kepada perusahaan mebel untuk dibuat menjadi meja dan kursi.\n\nBerdasarkan proses pembuatannya, pilihlah semua pernyataan yang tepat!',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Kayu hasil hutan termasuk barang jadi karena dapat dijual.' },
      { id: 'B', text: 'Papan termasuk barang setengah jadi karena masih perlu diolah menjadi barang lain.' },
      { id: 'C', text: 'Meja dan kursi termasuk barang jadi karena dapat langsung digunakan.' },
      { id: 'D', text: 'Papan termasuk barang mentah karena belum digunakan oleh konsumen.' }
    ],
    correctAnswers: ['B', 'C']
  },
  {
    id: 'ips-vii-16',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 16,
    type: 'pg_kompleks',
    prompt:
      'Sebuah industri makanan membeli singkong dari petani. Singkong tersebut diolah menjadi tepung tapioka. Selanjutnya, tepung tapioka digunakan oleh perusahaan lain untuk membuat berbagai jenis makanan yang siap dikonsumsi.\n\nBerdasarkan studi kasus tersebut, pilihlah semua pernyataan yang benar!',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Singkong termasuk barang jadi karena dapat langsung dimakan.' },
      {
        id: 'B',
        text: 'Tepung tapioka termasuk barang setengah jadi karena masih digunakan sebagai bahan untuk membuat produk lain.'
      },
      { id: 'C', text: 'Makanan siap konsumsi termasuk barang jadi karena dapat langsung digunakan atau dikonsumsi.' },
      { id: 'D', text: 'Singkong termasuk barang setengah jadi karena sudah dipanen dari lahan pertanian.' }
    ],
    correctAnswers: ['B', 'C']
  },
  {
    id: 'ips-vii-17',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 17,
    type: 'pg_kompleks',
    prompt:
      'Sebuah industri tekstil membeli kapas dari petani. Kapas tersebut diproses menjadi benang, kemudian diolah menjadi kain. Kain selanjutnya dijahit menjadi pakaian yang dijual di toko.\n\nBerdasarkan proses pembuatan tersebut, pilihlah semua pernyataan yang tepat!',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Kapas termasuk barang mentah karena belum mengalami proses pengolahan menjadi bahan tekstil.' },
      { id: 'B', text: 'Benang termasuk barang jadi karena dapat dijual kepada perusahaan tekstil.' },
      { id: 'C', text: 'Kain termasuk barang setengah jadi karena masih dapat diolah menjadi pakaian.' },
      { id: 'D', text: 'Pakaian termasuk barang jadi karena sudah siap digunakan oleh konsumen.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ips-vii-18',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 18,
    type: 'pg_kompleks',
    imageUrl: '/images/soal/ips_kelas7_no18.jpg',
    prompt:
      'Warga membuang sampah plastik dan kaleng bekas di sekitar permukiman. Jika kebiasaan tersebut terus dilakukan, tanah di sekitar permukiman dapat mengalami pencemaran.\n\nKegiatan yang menjadi penyebab pencemaran tanah adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Membuang sampah plastik sembarangan.' },
      { id: 'B', text: 'Mengolah sampah organik menjadi kompos.' },
      { id: 'C', text: 'Menimbun sampah anorganik tanpa pengelolaan.' },
      { id: 'D', text: 'Menanam pohon di lahan kosong.' },
      { id: 'E', text: 'Memisahkan sampah berdasarkan jenisnya.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'ips-vii-19',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 19,
    type: 'pg_kompleks',
    prompt:
      'Sebuah sungai di dekat permukiman terlihat keruh dan dipenuhi sampah. Setelah diamati, banyak warga membuang sampah rumah tangga langsung ke sungai.\n\nTindakan yang dapat dilakukan untuk mencegah pencemaran air adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Membuang sampah ke sungai saat air mengalir deras.' },
      { id: 'B', text: 'Menyediakan tempat sampah di sekitar permukiman.' },
      { id: 'C', text: 'Mengurangi kebiasaan membuang limbah ke sungai.' },
      { id: 'D', text: 'Menggunakan sungai sebagai tempat pembuangan sampah.' },
      { id: 'E', text: 'Melakukan kegiatan membersihkan sungai secara rutin.' }
    ],
    correctAnswers: ['B', 'C', 'E']
  },
  {
    id: 'ips-vii-20',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 20,
    type: 'pg_kompleks',
    prompt:
      'Petani menggunakan pupuk kimia dan pestisida secara berlebihan untuk meningkatkan hasil pertanian. Ketika hujan turun, sebagian bahan kimia tersebut terbawa air menuju tanah dan saluran air di sekitarnya.\n\nDampak yang mungkin terjadi akibat kegiatan tersebut adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Kesuburan tanah selalu meningkat tanpa batas.' },
      { id: 'B', text: 'Organisme yang hidup di tanah dapat terganggu.' },
      { id: 'C', text: 'Kualitas air dapat menurun akibat masuknya bahan kimia.' },
      { id: 'D', text: 'Ekosistem perairan menjadi semakin seimbang.' },
      { id: 'E', text: 'Sisa bahan kimia dapat mencemari lingkungan.' }
    ],
    correctAnswers: ['B', 'C', 'E']
  },
  {
    id: 'ips-vii-21',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 21,
    type: 'pg_kompleks',
    prompt:
      'Sebuah usaha rumah tangga menghasilkan limbah cair dari kegiatan produksi. Pemilik usaha berencana membuang limbah tersebut langsung ke sungai karena dianggap lebih praktis dan murah.\n\nTindakan yang tepat untuk mencegah pencemaran air akibat kegiatan tersebut adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Mengolah limbah cair sebelum dibuang ke lingkungan.' },
      { id: 'B', text: 'Membuang limbah pada malam hari agar tidak diketahui warga.' },
      { id: 'C', text: 'Menggunakan bahan yang lebih ramah lingkungan dalam proses produksi.' },
      { id: 'D', text: 'Membuang limbah ke sungai dengan jumlah sedikit setiap hari.' },
      { id: 'E', text: 'Memastikan limbah yang dibuang telah memenuhi ketentuan baku mutu lingkungan.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ips-vii-22',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 22,
    type: 'pg_kompleks',
    prompt:
      'Di sebuah kawasan permukiman, warga menemukan bahwa tanah di sekitar tempat pembuangan sampah mulai berbau tidak sedap. Air sumur yang berada tidak jauh dari lokasi tersebut juga mengalami perubahan warna dan rasa. Setelah ditelusuri, sampah rumah tangga bercampur dengan baterai bekas dan limbah cair.\n\nBerdasarkan kasus tersebut, upaya yang paling tepat untuk mengatasi permasalahan lingkungan adalah ....',
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Memisahkan sampah organik, anorganik, dan limbah berbahaya sebelum dibuang.' },
      { id: 'B', text: 'Menutup seluruh permukaan tempat pembuangan sampah dengan tanah tanpa pengelolaan lebih lanjut.' },
      { id: 'C', text: 'Mengelola sampah melalui prinsip 3R (Reduce, Reuse, Recycle).' },
      { id: 'D', text: 'Melakukan pemeriksaan kualitas air sumur untuk mengetahui tingkat pencemarannya.' },
      { id: 'E', text: 'Memindahkan sampah ke lahan kosong lain yang jauh dari permukiman.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ips-vii-23',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 23,
    type: 'pg_kompleks',
    prompt:
      'Sebuah desa memiliki sungai yang dimanfaatkan untuk kebutuhan sehari-hari dan pengairan sawah. Namun, kualitas air sungai semakin menurun karena limbah rumah tangga, penggunaan pestisida berlebihan, dan kebiasaan membuang sampah ke sungai. Pemerintah desa ingin membuat program pencegahan pencemaran yang melibatkan seluruh masyarakat.\n\nProgram yang paling tepat untuk mengatasi permasalahan tersebut adalah ....',
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Membangun sistem pengolahan limbah rumah tangga sebelum dialirkan ke sungai.' },
      { id: 'B', text: 'Mengajak petani menggunakan pupuk dan pestisida sesuai dosis yang dianjurkan.' },
      { id: 'C', text: 'Memindahkan seluruh kegiatan pertanian agar tidak berada di dekat sungai.' },
      { id: 'D', text: 'Melaksanakan kegiatan edukasi dan pengawasan terhadap kebiasaan membuang sampah.' },
      { id: 'E', text: 'Melakukan pengerukan sungai secara rutin tanpa mengurangi sumber pencemaran.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },

  // -----------------------------------------------------------------------
  // C. MENJODOHKAN (No. 24 - 26 / Nomor 1-3 pada dokumen)
  // -----------------------------------------------------------------------
  {
    id: 'ips-vii-24',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 24,
    type: 'mencocokkan',
    prompt:
      'Pasangkan setiap pernyataan pada Kolom kiri dengan faktor yang memengaruhi kebutuhan manusia pada Kolom kanan secara tepat! Pilihlah jawaban yang sesuai.',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      {
        id: 'p1',
        leftText: 'Seorang anak membutuhkan perlengkapan sekolah, sedangkan orang dewasa membutuhkan perlengkapan untuk bekerja.',
        rightText: 'Usia'
      },
      {
        id: 'p2',
        leftText: 'Masyarakat yang tinggal di daerah pegunungan membutuhkan pakaian lebih tebal dibandingkan masyarakat di daerah pantai.',
        rightText: 'Lingkungan tempat tinggal'
      },
      {
        id: 'p3',
        leftText: 'Seseorang membeli pakaian bermerek dan barang mewah untuk menunjukkan kedudukan serta pengakuan dalam masyarakat.',
        rightText: 'Status sosial'
      },
      {
        id: 'p4',
        leftText: 'Seorang dokter membutuhkan peralatan medis, sedangkan seorang petani membutuhkan cangkul dan pupuk untuk bekerja.',
        rightText: 'Pekerjaan'
      },
      {
        id: 'p5',
        leftText: 'Seseorang yang memiliki penghasilan tinggi mampu membeli barang lebih banyak dibandingkan orang berpenghasilan rendah.',
        rightText: 'Pendapatan'
      }
    ],
    matchingRightOptions: [
      'Lingkungan tempat tinggal',
      'Pekerjaan',
      'Usia',
      'Status sosial',
      'Selera',
      'Pendapatan'
    ]
  },
  {
    id: 'ips-vii-25',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 25,
    type: 'mencocokkan',
    prompt:
      'Pasangkan setiap pernyataan pada Kolom kiri dengan Jenis Barang pada Kolom kanan secara tepat! Pilihlah jawaban yang sesuai.',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      {
        id: 'p1',
        leftText: 'Udara yang dihirup manusia di alam terbuka dapat diperoleh tanpa harus membayar',
        rightText: 'Barang bebas'
      },
      {
        id: 'p2',
        leftText: 'Ibu membeli beras di pasar dengan mengeluarkan sejumlah uang untuk memenuhi kebutuhan keluarga.',
        rightText: 'Barang ekonomis'
      },
      {
        id: 'p3',
        leftText: 'Harga kopi mengalami kenaikan. Akibatnya, sebagian konsumen beralih membeli teh.',
        rightText: 'Barang substitusi'
      },
      {
        id: 'p4',
        leftText: 'Lampu kendaraan membutuhkan baterai agar dapat berfungsi dengan baik. Kedua barang tersebut digunakan secara bersamaan.',
        rightText: 'Barang komplementer'
      },
      {
        id: 'p5',
        leftText: 'Air yang jumlahnya berlebihan akibat banjir dapat merusak rumah, lahan pertanian, dan fasilitas umum.',
        rightText: 'Barang illith'
      }
    ],
    matchingRightOptions: [
      'Barang ekonomis',
      'Barang komplementer',
      'Barang bebas',
      'Barang illith',
      'Barang substitusi',
      'Barang produksi'
    ]
  },
  {
    id: 'ips-vii-26',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 26,
    type: 'mencocokkan',
    prompt:
      'Pasangkan setiap pernyataan pada Kolom kiri dengan Keterangan pada Kolom kanan secara tepat! Pilihlah jawaban yang sesuai.',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      {
        id: 'p1',
        leftText: 'Hubungan timbal balik antara individu dengan individu, individu dengan kelompok, atau kelompok dengan kelompok disebut ....',
        rightText: 'Kontak sosial dan komunikasi'
      },
      {
        id: 'p2',
        leftText: 'Ketika dua siswa saling berbicara dan memberikan tanggapan, mereka telah melakukan syarat interaksi sosial berupa ....',
        rightText: 'Interaksi sosial'
      },
      {
        id: 'p3',
        leftText: 'Dua kelompok siswa bekerja sama membersihkan lingkungan sekolah agar menjadi bersih dan nyaman. Bentuk interaksi sosial tersebut adalah ....',
        rightText: 'Kerja sama'
      },
      {
        id: 'p4',
        leftText: 'Seorang siswa meniru gaya berpakaian dan cara berbicara tokoh idolanya. Faktor yang memengaruhi interaksi sosial tersebut adalah ....',
        rightText: 'Imitasi'
      },
      {
        id: 'p5',
        leftText: 'Dua kelompok warga yang memiliki perbedaan pendapat kemudian berdiskusi untuk mencapai kesepakatan. Bentuk interaksi sosial tersebut adalah ....',
        rightText: 'Akomodasi'
      },
      {
        id: 'p6',
        leftText: 'Seorang siswa merasa tertarik dan memiliki keinginan untuk memahami perasaan temannya yang sedang mengalami kesulitan. Faktor yang memengaruhi interaksi sosial tersebut adalah ....',
        rightText: 'Kompetisi'
      }
    ],
    matchingRightOptions: [
      'Kerja sama',
      'Kompetisi',
      'Interaksi sosial',
      'Akomodasi',
      'Sugesti',
      'Kontak sosial dan komunikasi',
      'Imitasi'
    ]
  },

  // -----------------------------------------------------------------------
  // D. SOAL ESSAY (No. 27 - 30 / Nomor 1-4 pada dokumen)
  // -----------------------------------------------------------------------
  {
    id: 'ips-vii-27',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 27,
    type: 'uraian',
    prompt: `${KARHUTLA_NEWS_STIMULUS}\n\nPertanyaan 1:\nApa penyebab terjadinya kebakaran hutan berdasarkan berita di atas? (Sebutkan juga wilayah mana saja di Kalimantan Selatan yang mengalami kebakaran hutan dan lahan berdasarkan berita!)`,
    points: 5,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Kunci Jawaban: Wilayah yang mengalami kebakaran hutan dan lahan tersebar di beberapa kabupaten/kota di Kalimantan Selatan (Kabupaten Banjar sekitar 5.100 hektare, Kota Banjarbaru sekitar 2.539 hektare, dan Kabupaten Tanah Laut). Kegiatan manusia yang dapat memicu kebakaran antara lain membakar lahan untuk membuka/membersihkan perkebunan tanpa pengawasan, membuang puntung rokok sembarangan, dan membakar sampah di dekat kawasan hutan atau lahan kering.'
  },
  {
    id: 'ips-vii-28',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 28,
    type: 'uraian',
    prompt: `${KARHUTLA_NEWS_STIMULUS}\n\nPertanyaan 2:\nApa dampak kebakaran hutan bagi manusia dan lingkungan?`,
    points: 5,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Kunci Jawaban: Dampak kebakaran hutan dan lahan antara lain: (1) Menimbulkan kabut asap yang mengganggu pernapasan dan kesehatan manusia; (2) Mengganggu kegiatan belajar, bekerja, dan transportasi; (3) Merusak tumbuhan serta habitat hewan; (4) Mengurangi kesuburan tanah dan merusak ekosistem; (5) Menyebabkan pencemaran udara.'
  },
  {
    id: 'ips-vii-29',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 29,
    type: 'uraian',
    prompt: `${KARHUTLA_NEWS_STIMULUS}\n\nPertanyaan 3:\nMengapa hutan gambut perlu dijaga kelestariannya dan mengapa kebakaran di lahan gambut sulit dipadamkan?`,
    points: 5,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Kunci Jawaban: Lahan gambut perlu dijaga karena mampu menyimpan air, menjadi tempat hidup berbagai jenis tumbuhan dan hewan, serta menyimpan karbon dalam jumlah besar. Kebakaran di lahan gambut sulit dipadamkan karena api dapat menjalar dan membakar lapisan gambut di bawah permukaan tanah sehingga tidak mudah terlihat dan dijangkau.'
  },
  {
    id: 'ips-vii-30',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-1',
    grade: 'VII',
    number: 30,
    type: 'uraian',
    prompt: `${KARHUTLA_NEWS_STIMULUS}\n\nPertanyaan 4:\nApa tindakan yang dapat dilakukan masyarakat untuk mencegah kebakaran hutan?`,
    points: 5,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Kunci Jawaban: Tindakan yang dapat dilakukan masyarakat antara lain: (1) Tidak membuka lahan dengan cara membakar; (2) Tidak membuang puntung rokok sembarangan; (3) Tidak membakar sampah di dekat hutan atau lahan kering; (4) Menjaga dan merawat lingkungan sekitar; (5) Segera melaporkan kepada petugas jika melihat titik api atau kebakaran.'
  }
];
