import { Question } from '../types/cbt';

/**
 * Bank Soal Resmi Pendidikan Pancasila (PPKn) Kelas VII (SMP Negeri 12 Banjarbaru)
 * 100% verbatim dari dokumen: soal PPKn kelas 7 kunci 2026.pdf
 * Total: 30 butir soal (13 Pilihan Ganda, 15 Pilihan Ganda Kompleks, 2 Menjodohkan), bobot 5 poin per soal.
 */
export const PPKN_KELAS_7_QUESTIONS: Question[] = [
  // =========================================================================
  // A. PILIHAN GANDA (NOMOR 1–5)
  // =========================================================================
  {
    id: 'ppkn-vii-1',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 1,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pada masa persiapan kemerdekaan Indonesia, BPUPK melaksanakan dua kali sidang. Sidang pertama dilaksanakan pada tanggal 29 Mei–1 Juni 1945, sedangkan sidang kedua dilaksanakan pada tanggal 10–17 Juli 1945.

Pokok pembahasan dalam sidang pertama BPUPK adalah ....`,
    options: [
      { id: 'A', text: 'pembentukan Komite Nasional Indonesia Pusat' },
      { id: 'B', text: 'perumusan dasar negara Indonesia' },
      { id: 'C', text: 'pembentukan tentara nasional Indonesia' },
      { id: 'D', text: 'penetapan presiden dan wakil presiden' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ppkn-vii-2',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 2,
    points: 5,
    difficulty: 'mudah',
    prompt: `Setelah sidang pertama BPUPK, dibentuk sebuah panitia yang beranggotakan sembilan tokoh. Panitia ini bertugas membahas dan merumuskan dasar negara. Hasil kerja panitia tersebut kemudian dikenal dengan nama Piagam Jakarta.

Panitia yang dimaksud adalah ....`,
    options: [
      { id: 'A', text: 'Panitia Persiapan Kemerdekaan Indonesia' },
      { id: 'B', text: 'Panitia Perancang Undang-Undang Dasar' },
      { id: 'C', text: 'Panitia Sembilan' },
      { id: 'D', text: 'Komite Nasional Indonesia' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ppkn-vii-3',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 3,
    points: 5,
    difficulty: 'mudah',
    prompt: `Piagam Jakarta merupakan salah satu bagian penting dalam sejarah perumusan Pancasila. Dokumen tersebut dihasilkan melalui kesepakatan para tokoh bangsa yang tergabung dalam Panitia Sembilan.

Piagam Jakarta disepakati pada tanggal ....`,
    options: [
      { id: 'A', text: '1 Juni 1945' },
      { id: 'B', text: '17 Agustus 1945' },
      { id: 'C', text: '18 Agustus 1945' },
      { id: 'D', text: '22 Juni 1945' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ppkn-vii-4',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 4,
    points: 5,
    difficulty: 'mudah',
    prompt: `Di lingkungan tempat tinggalnya, warga sedang mengadakan rapat untuk menentukan kegiatan peringatan hari kemerdekaan. Setiap warga memiliki usulan yang berbeda. Ada yang mengusulkan perlombaan olahraga, kegiatan kebersihan lingkungan, dan kegiatan sosial. Meskipun berbeda pendapat, warga tetap berdiskusi hingga memperoleh kesepakatan bersama.

Sikap warga tersebut mencerminkan penerapan Pancasila, terutama sila ....`,
    options: [
      { id: 'A', text: 'pertama, Ketuhanan Yang Maha Esa' },
      { id: 'B', text: 'kedua, Kemanusiaan yang Adil dan Beradab' },
      { id: 'C', text: 'ketiga, Persatuan Indonesia' },
      { id: 'D', text: 'keempat, Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ppkn-vii-5',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 5,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pada tanggal 18 Agustus 1945, PPKI melaksanakan sidang yang menghasilkan beberapa keputusan penting bagi negara Indonesia. Salah satu keputusan tersebut adalah menetapkan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.

Makna penting keputusan tersebut bagi bangsa Indonesia adalah ....`,
    options: [
      { id: 'A', text: 'Indonesia mulai memiliki landasan konstitusional dalam penyelenggaraan negara' },
      { id: 'B', text: 'Indonesia menyerahkan kekuasaan pemerintahan kepada negara lain' },
      { id: 'C', text: 'Indonesia membatalkan kemerdekaan yang telah diproklamasikan' },
      { id: 'D', text: 'Indonesia memberikan kewenangan penuh kepada penjajah untuk mengatur pemerintahan' }
    ],
    correctAnswers: ['A']
  },

  // =========================================================================
  // B. PILIHAN GANDA KOMPLEKS (NOMOR 6–9)
  // =========================================================================
  {
    id: 'ppkn-vii-6',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 6,
    points: 5,
    difficulty: 'sedang',
    prompt: `Dalam kegiatan kerja bakti di lingkungan tempat tinggal, beberapa warga memiliki latar belakang agama dan suku yang berbeda. Ketika membersihkan lingkungan, mereka bekerja sama tanpa membedakan latar belakang masing-masing. Mereka menyadari bahwa kebersihan lingkungan merupakan tanggung jawab bersama.

Berdasarkan cerita tersebut, perilaku yang sesuai dengan nilai-nilai Pancasila adalah ....
(Pilihlah semua jawaban yang benar. Jawaban benar dapat lebih dari satu.)`,
    options: [
      { id: 'A', text: 'menghargai perbedaan agama dan suku antarwarga' },
      { id: 'B', text: 'mengutamakan kepentingan pribadi daripada kepentingan bersama' },
      { id: 'C', text: 'bekerja sama menjaga kebersihan lingkungan' },
      { id: 'D', text: 'memilih teman kerja berdasarkan kesamaan suku' },
      { id: 'E', text: 'menjaga persatuan meskipun memiliki perbedaan' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ppkn-vii-7',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 7,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan beberapa pernyataan berikut tentang sidang BPUPK!

Berdasarkan pernyataan tersebut, pilihlah semua jawaban yang benar!`,
    options: [
      { id: 'A', text: 'Sidang pertama BPUPK dilaksanakan pada tanggal 29 Mei–1 Juni 1945.' },
      { id: 'B', text: 'Sidang pertama BPUPK membahas rancangan Undang-Undang Dasar.' },
      { id: 'C', text: 'Sidang kedua BPUPK dilaksanakan pada tanggal 10–17 Juli 1945.' },
      { id: 'D', text: 'Sidang kedua BPUPK membahas rancangan Undang-Undang Dasar.' },
      { id: 'E', text: 'Sidang pertama BPUPK membahas pembentukan Komite Nasional Indonesia Pusat.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-vii-8',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 8,
    points: 5,
    difficulty: 'sedang',
    prompt: `Dalam sebuah diskusi kelas, siswa membahas perubahan rumusan sila pertama dalam Piagam Jakarta menjadi rumusan yang terdapat dalam Pembukaan UUD 1945. Beberapa siswa berpendapat bahwa perubahan tersebut menunjukkan pentingnya mengutamakan persatuan bangsa. Siswa lainnya menyampaikan bahwa para pendiri bangsa telah menunjukkan sikap menghargai perbedaan demi kepentingan bersama.

Berdasarkan peristiwa tersebut, nilai-nilai yang dapat diteladani dari para pendiri bangsa adalah ....
(Pilihlah semua jawaban yang benar. Jawaban benar dapat lebih dari satu.)`,
    options: [
      { id: 'A', text: 'mengutamakan kepentingan bangsa di atas kepentingan golongan' },
      { id: 'B', text: 'mempertahankan pendapat sendiri meskipun dapat memecah persatuan' },
      { id: 'C', text: 'bersedia menerima kesepakatan demi keutuhan bangsa' },
      { id: 'D', text: 'menghargai perbedaan dalam kehidupan berbangsa' },
      { id: 'E', text: 'menghindari musyawarah ketika terjadi perbedaan pendapat' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-vii-9',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 9,
    points: 5,
    difficulty: 'sedang',
    prompt: `Di sebuah lingkungan masyarakat, akan dilaksanakan kegiatan pembangunan fasilitas umum. Sebagian warga mengusulkan pembangunan taman bermain, sedangkan warga lainnya mengusulkan perbaikan jalan. Dalam rapat, setiap warga diberikan kesempatan menyampaikan pendapat. Setelah berdiskusi, mereka sepakat untuk memperbaiki jalan terlebih dahulu karena kondisinya lebih mendesak. Warga yang usulannya belum dipilih tetap menerima keputusan bersama.

Berdasarkan kasus tersebut, tindakan yang mencerminkan penerapan nilai-nilai Pancasila adalah ....
(Pilihlah semua jawaban yang benar. Jawaban benar dapat lebih dari satu.)`,
    options: [
      { id: 'A', text: 'memberikan kesempatan kepada warga untuk menyampaikan pendapat' },
      { id: 'B', text: 'memaksakan usulan pribadi agar diterima oleh seluruh warga' },
      { id: 'C', text: 'menerima hasil keputusan bersama dengan penuh tanggung jawab' },
      { id: 'D', text: 'mengutamakan kebutuhan bersama daripada kepentingan pribadi' },
      { id: 'E', text: 'menolak keputusan rapat karena usulan pribadi tidak dipilih' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },

  // =========================================================================
  // C. MENJODOHKAN (NOMOR 10)
  // =========================================================================
  {
    id: 'ppkn-vii-10',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'mencocokkan',
    number: 10,
    points: 5,
    difficulty: 'sedang',
    prompt: `Pasangkan pernyataan pada Kolom I dengan jawaban yang tepat pada Kolom II! Pilihan jawaban tersedia lebih banyak daripada jumlah pernyataan.`,
    options: [],
    matchingPairs: [
      { id: 'ppkn-vii-10-p1', leftText: '1. Tokoh yang bukan anggota Panitia Sembilan.', rightText: 'C. Mr. Soepomo' },
      { id: 'ppkn-vii-10-p2', leftText: '2. Dokumen hasil kesepakatan Panitia Sembilan pada tanggal 22 Juni 1945.', rightText: 'B. Piagam Jakarta' },
      { id: 'ppkn-vii-10-p3', leftText: '3. Sidang BPUPK yang membahas perumusan dasar negara.', rightText: 'A. Sidang pertama BPUPK' },
      { id: 'ppkn-vii-10-p4', leftText: '4. Sidang BPUPK yang membahas rancangan Undang-Undang Dasar.', rightText: 'E. Sidang kedua BPUPK' },
      { id: 'ppkn-vii-10-p5', leftText: '5. Sikap para pendiri bangsa yang bersedia mengubah rumusan sila pertama demi menjaga persatuan bangsa.', rightText: 'D. Rela berkorban dan mengutamakan persatuan' }
    ],
    matchingRightOptions: [
      'A. Sidang pertama BPUPK',
      'B. Piagam Jakarta',
      'C. Mr. Soepomo',
      'D. Rela berkorban dan mengutamakan persatuan',
      'E. Sidang kedua BPUPK',
      'F. Panitia Persiapan Kemerdekaan Indonesia'
    ]
  },

  // =========================================================================
  // PILIHAN GANDA LANJUTAN (NOMOR 11–18)
  // =========================================================================
  {
    id: 'ppkn-vii-11',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 11,
    points: 5,
    difficulty: 'mudah',
    prompt: `Dalam kehidupan sehari-hari, manusia selalu berhubungan dengan orang lain. Agar hubungan tersebut berjalan dengan baik, diperlukan aturan yang mengatur perilaku manusia dalam kehidupan bersama.

Berdasarkan pernyataan tersebut, yang dimaksud dengan norma adalah ....`,
    options: [
      { id: 'A', text: 'kebiasaan seseorang yang dilakukan tanpa memperhatikan orang lain' },
      { id: 'B', text: 'aturan atau ketentuan yang mengatur tingkah laku manusia dalam kehidupan' },
      { id: 'C', text: 'keinginan seseorang untuk mendapatkan penghargaan dari masyarakat' },
      { id: 'D', text: 'kegiatan yang dilakukan seseorang untuk memenuhi kebutuhan hidupnya' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ppkn-vii-12',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 12,
    points: 5,
    difficulty: 'mudah',
    prompt: `Setiap pagi sebelum berangkat sekolah, Rina selalu berdoa dan melaksanakan ibadah sesuai dengan ajaran agamanya. Ia juga menghormati teman-temannya yang memiliki agama berbeda.

Perilaku Rina berkaitan dengan pelaksanaan norma ....`,
    options: [
      { id: 'A', text: 'kesopanan' },
      { id: 'B', text: 'hukum' },
      { id: 'C', text: 'agama' },
      { id: 'D', text: 'kesusilaan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ppkn-vii-13',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 13,
    points: 5,
    difficulty: 'mudah',
    prompt: `Ketika mengikuti pelajaran, seorang siswa menemukan uang di bawah meja. Ia mengetahui bahwa uang tersebut bukan miliknya. Meskipun tidak ada orang yang melihat, ia memilih menyerahkan uang tersebut kepada guru agar dikembalikan kepada pemiliknya.

Perilaku siswa tersebut terutama mencerminkan pelaksanaan norma ....`,
    options: [
      { id: 'A', text: 'kesopanan' },
      { id: 'B', text: 'hukum' },
      { id: 'C', text: 'agama' },
      { id: 'D', text: 'kesusilaan' }
    ],
    correctAnswers: ['D'],
    essayRubric: 'Norma kesusilaan bersumber dari hati nurani manusia. Kejujuran dan kesadaran untuk melakukan hal yang benar merupakan contoh penerapannya.'
  },
  {
    id: 'ppkn-vii-14',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 14,
    points: 5,
    difficulty: 'mudah',
    prompt: `Di lingkungan sekolah terdapat tata tertib yang wajib dipatuhi oleh seluruh siswa. Salah satu aturan tersebut adalah siswa harus datang tepat waktu. Siswa yang terlambat akan mendapatkan teguran sesuai ketentuan sekolah.

Aturan tersebut merupakan contoh penerapan norma ....`,
    options: [
      { id: 'A', text: 'kesopanan' },
      { id: 'B', text: 'hukum' },
      { id: 'C', text: 'agama' },
      { id: 'D', text: 'kesusilaan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ppkn-vii-15',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 15,
    points: 5,
    difficulty: 'mudah',
    prompt: `Di sebuah lingkungan masyarakat, terdapat warga yang sering memutar musik dengan suara keras hingga larut malam. Akibatnya, warga lain merasa terganggu karena sedang beristirahat. Beberapa warga kemudian mengingatkan orang tersebut agar menghormati kenyamanan tetangga.

Berdasarkan kasus tersebut, tindakan yang paling tepat untuk memperbaiki keadaan adalah ....`,
    options: [
      { id: 'A', text: 'membiarkan perilaku tersebut karena setiap orang bebas melakukan apa saja di rumahnya' },
      { id: 'B', text: 'membalas dengan memutar musik lebih keras agar orang tersebut memahami gangguan yang ditimbulkan' },
      { id: 'C', text: 'mengingatkan secara baik-baik dan mengajak warga menaati aturan hidup bertetangga' },
      { id: 'D', text: 'menyebarkan keburukan orang tersebut kepada seluruh warga agar merasa malu' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ppkn-vii-16',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 16,
    points: 5,
    difficulty: 'sedang',
    prompt: `Bacalah artikel berikut

Pada suatu pagi, seorang ibu sedang membagi-bagikan uang saku kepada ketiga anaknya. Anak pertama yang duduk di bangku kelas 2 SMA diberi Rp25 ribu, adik perempuannya yang duduk di kelas 1 SMP mendapat Rp15 ribu, dan si bungsu yang masih kelas 5 SD diberi Rp10 ribu. Pembagian ini rupanya membuat gelisah si bungsu yang akhirnya protes saat itu.

“Bu, kalau membagi uang saku harusnya yang adil. Masak uang saku adik lebih sedikit dari kakak-kakak,” kata si bungsu. Sambil tersenyum ibu bertanya, “Nak, menurutmu adil itu yang seperti apa?”

“Ya harus sama jumlahnya, Bu. Kalau kakak dapat Rp25 ribu, ya semuanya sama Rp25 ribu,” katanya dengan polos.

Mendengar jawaban itu sang ibu pergi sejenak untuk mengambil 3 buah gelas berukuran berbeda, sebotol air, dan literan.

“Nak, sekarang coba bantu ibu mengisi gelas-gelas itu dengan air. Masing-masing gelas isi sebanyak $240\\text{ mL}$,” pinta sang Ibu. Si bungsu pun mengikuti arahan sang Ibu. Pada gelas berukuran besar, air terisi penuh $240\\text{ mL}$, lalu di gelas lebih kecil, air tidak sampai $240\\text{ mL}$ dan justru tumpah. Sang Ibu meminta si bungsu untuk mengosongkan semua isi gelas. Kemudian mengisi air kembali sesuai ukuran gelas. Hasilnya, air tidak ada yang tumpah.

(Sumber : https://esqtraining.com/kisah-inspiratif-menakar-makna-keadilan/)

Gambaran situasi pada kutipan artikel di atas dapat kita pahami bahwa keadilan memiliki makna yaitu ....`,
    options: [
      { id: 'A', text: 'Mendapatkan hak sebelum menunaikan kewajiban' },
      { id: 'B', text: 'Mendapatkan hak yang setara untuk setiap orang' },
      { id: 'C', text: 'Tidak mendapatkan hak sesuai yang dibutuhkan' },
      { id: 'D', text: 'Mendapatkan hak sesuai kebutuhan' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ppkn-vii-17',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 17,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan nilai-nilai Pancasila berikut!
1) Mencintai sesama manusia
2) Suka bekerja keras
3) Gemar melakukan kegiatan kemanusiaan
4) Tidak semena-mena terhadap orang lain
5) Berani membela kebenaran dan keadilan

Berdasarkan nilai-nilai di atas, yang termasuk nilai kemanusiaan yang adil dan beradab ditunjukkan oleh nomor ....`,
    options: [
      { id: 'A', text: '1, 2, 3, dan 5' },
      { id: 'B', text: '2, 3, 4, dan 5' },
      { id: 'C', text: '1, 2, 3, dan 4' },
      { id: 'D', text: '1, 3, 4, dan 5' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ppkn-vii-18',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 18,
    points: 5,
    difficulty: 'sedang',
    prompt: `Keadilan sosial merupakan nilai Pancasila yang sangat penting dan perlu kita terapkan dalam kehidupan sehari-hari. Berikut ini contoh perilaku yang mencerminkan nilai sila keadilan sosial bagi seluruh rakyat Indonesia dalam lingkungan masyarakat adalah ....`,
    options: [
      { id: 'A', text: 'Mengutamakan kepentingan pribadi di atas kepentingan bersama' },
      { id: 'B', text: 'Gemar menabung dan menghemat uang jajan' },
      { id: 'C', text: 'Menyalurkan bantuan sosial kepada Masyarakat' },
      { id: 'D', text: 'Senantiasa melatih keterampilan diri' }
    ],
    correctAnswers: ['D']
  },

  // =========================================================================
  // B. PILIHAN GANDA KOMPLEKS ANALISIS (NOMOR 19–23)
  // =========================================================================
  {
    id: 'ppkn-vii-19',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 19,
    points: 5,
    difficulty: 'sedang',
    prompt: `Andi tinggal di lingkungan masyarakat yang memiliki warga dari berbagai latar belakang. Suatu hari, ia melihat tetangganya yang sudah lanjut usia kesulitan membawa barang belanjaan. Andi segera membantu tanpa mengharapkan imbalan. Ketika bertemu warga lain, Andi juga selalu menyapa dengan ramah.

Berdasarkan cerita tersebut, perilaku yang mencerminkan pelaksanaan norma adalah ....
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'membantu tetangga yang membutuhkan pertolongan' },
      { id: 'B', text: 'menghormati orang yang lebih tua' },
      { id: 'C', text: 'mengharapkan imbalan setiap kali membantu orang lain' },
      { id: 'D', text: 'bersikap ramah kepada warga sekitar' },
      { id: 'E', text: 'menghindari tetangga yang membutuhkan bantuan' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'ppkn-vii-20',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 20,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan beberapa pernyataan berikut!
1. Menghormati orang tua ketika berbicara.
2. Beribadah sesuai ajaran agama.
3. Tidak mengambil barang milik orang lain.
4. Mematuhi peraturan lalu lintas.
5. Menjaga kebersihan kamar sendiri.

Pilihlah semua pernyataan yang menunjukkan pelaksanaan norma agama!`,
    options: [
      { id: 'A', text: 'Beribadah sesuai ajaran agama.' },
      { id: 'B', text: 'Menghormati orang tua.' },
      { id: 'C', text: 'Melaksanakan kewajiban agama.' },
      { id: 'D', text: 'Mematuhi lampu lalu lintas.' },
      { id: 'E', text: 'Menggunakan pakaian seragam sesuai ketentuan sekolah.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'ppkn-vii-21',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 21,
    points: 5,
    difficulty: 'sedang',
    prompt: `Ketika sedang mengerjakan tugas kelompok, beberapa siswa menemukan bahwa salah satu anggota kelompok tidak mengerjakan tugasnya. Padahal, ia telah menyanggupi untuk menyelesaikan bagian tertentu. Teman-temannya kemudian mengajak siswa tersebut berdiskusi dan mengingatkan pentingnya tanggung jawab.

Tindakan yang sesuai dengan pelaksanaan norma dalam kehidupan sekolah adalah ....
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'menyelesaikan tugas sesuai tanggung jawab masing-masing' },
      { id: 'B', text: 'membiarkan teman yang tidak bekerja karena bukan urusan pribadi' },
      { id: 'C', text: 'mengingatkan teman dengan bahasa yang sopan' },
      { id: 'D', text: 'menghargai pendapat setiap anggota kelompok' },
      { id: 'E', text: 'menyalahkan teman tersebut di depan kelas agar merasa malu' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-vii-22',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 22,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan beberapa contoh perilaku berikut!

Pilihlah semua pernyataan yang merupakan sanksi akibat pelanggaran norma!`,
    options: [
      { id: 'A', text: 'Merasa bersalah setelah melakukan kebohongan.' },
      { id: 'B', text: 'Mendapat teguran karena berbicara tidak sopan.' },
      { id: 'C', text: 'Mendapat penghargaan karena memenangkan perlombaan.' },
      { id: 'D', text: 'Mendapat denda karena melanggar peraturan lalu lintas.' },
      { id: 'E', text: 'Mendapat hadiah karena membantu orang lain.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'ppkn-vii-23',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 23,
    points: 5,
    difficulty: 'sedang',
    prompt: `Di sebuah desa, terdapat aturan bahwa setiap warga harus ikut menjaga kebersihan lingkungan. Namun, beberapa warga masih membuang sampah ke sungai. Akibatnya, aliran sungai menjadi tersumbat dan lingkungan menjadi kotor. Ketua RT kemudian mengajak warga berdiskusi untuk mencari solusi.

Berdasarkan kasus tersebut, tindakan yang tepat untuk menyelesaikan permasalahan adalah ....
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'memberikan pemahaman kepada warga tentang pentingnya menaati aturan kebersihan' },
      { id: 'B', text: 'membiarkan warga membuang sampah karena sungai merupakan tempat umum' },
      { id: 'C', text: 'membuat kesepakatan bersama mengenai pengelolaan sampah' },
      { id: 'D', text: 'melaksanakan kerja bakti secara rutin untuk menjaga kebersihan lingkungan' },
      { id: 'E', text: 'menyalahkan seluruh warga tanpa mencari penyebab permasalahan' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },

  // =========================================================================
  // C. MENJODOHKAN (NOMOR 24)
  // =========================================================================
  {
    id: 'ppkn-vii-24',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'mencocokkan',
    number: 24,
    points: 5,
    difficulty: 'sedang',
    prompt: `Pasangkan pernyataan pada Kolom I dengan jawaban yang tepat pada Kolom II! Pilihan jawaban tersedia lebih banyak daripada jumlah pernyataan.`,
    options: [],
    matchingPairs: [
      { id: 'ppkn-vii-24-p1', leftText: '1. Norma yang bersumber dari ajaran Tuhan.', rightText: 'C. Norma agama' },
      { id: 'ppkn-vii-24-p2', leftText: '2. Norma yang bersumber dari hati nurani manusia.', rightText: 'D. Norma kesusilaan' },
      { id: 'ppkn-vii-24-p3', leftText: '3. Norma yang mengatur perilaku manusia dalam bergaul agar saling menghormati dan menghargai.', rightText: 'A. Norma kesopanan' },
      { id: 'ppkn-vii-24-p4', leftText: '4. Norma yang memiliki aturan tegas dan sanksi yang dapat dipaksakan oleh negara.', rightText: 'B. Norma hukum' }
    ],
    matchingRightOptions: [
      'A. Norma kesopanan',
      'B. Norma hukum',
      'C. Norma agama',
      'D. Norma kesusilaan',
      'E. Norma kebiasaan'
    ]
  },

  // =========================================================================
  // D. PILIHAN GANDA KOMPLEKS (NOMOR 25–30)
  // =========================================================================
  {
    id: 'ppkn-vii-25',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 25,
    points: 5,
    difficulty: 'mudah',
    prompt: `Norma diperlukan agar kehidupan manusia berjalan tertib dan teratur. Setiap orang perlu memahami serta menaati norma yang berlaku dalam kehidupan sehari-hari.

Berikut ini yang merupakan tujuan adanya norma dalam kehidupan masyarakat adalah ....
(Pilihlah semua jawaban yang benar! Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'menciptakan ketertiban dalam kehidupan bersama' },
      { id: 'B', text: 'membatasi semua kegiatan masyarakat tanpa alasan' },
      { id: 'C', text: 'menjadi pedoman dalam bertingkah laku' },
      { id: 'D', text: 'menciptakan kehidupan yang aman dan harmonis' },
      { id: 'E', text: 'memberikan kebebasan kepada setiap orang untuk melanggar aturan' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-vii-26',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 26,
    points: 5,
    difficulty: 'sedang',
    prompt: `Setiap jenis norma memiliki sumber dan aturan yang berbeda. Meskipun demikian, semuanya memiliki peran dalam mengatur perilaku manusia.

Pilihlah pernyataan yang benar mengenai pembagian norma!`,
    options: [
      { id: 'A', text: 'Norma agama bersumber dari ajaran Tuhan.' },
      { id: 'B', text: 'Norma kesusilaan bersumber dari hati nurani manusia.' },
      { id: 'C', text: 'Norma hukum bersumber dari kebiasaan seseorang.' },
      { id: 'D', text: 'Norma kesopanan berkaitan dengan tata krama dalam pergaulan.' },
      { id: 'E', text: 'Norma kesusilaan hanya berlaku ketika seseorang berada di sekolah.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'ppkn-vii-27',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 27,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pilihlah semua pernyataan yang menunjukkan penerapan norma dalam kehidupan sehari-hari!`,
    options: [
      { id: 'A', text: 'Berbicara dengan sopan kepada orang tua.' },
      { id: 'B', text: 'Melaksanakan ibadah sesuai ajaran agama.' },
      { id: 'C', text: 'Melanggar aturan lalu lintas ketika jalan sedang sepi.' },
      { id: 'D', text: 'Mengakui kesalahan dan tidak berbohong.' },
      { id: 'E', text: 'Menghormati hak orang lain dalam kehidupan bermasyarakat.' }
    ],
    correctAnswers: ['A', 'B', 'D', 'E']
  },
  {
    id: 'ppkn-vii-28',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 28,
    points: 5,
    difficulty: 'sedang',
    prompt: `Norma memiliki sanksi yang berbeda-beda sesuai dengan jenis pelanggarannya. Sanksi tersebut diberikan agar setiap orang menyadari kesalahannya dan tidak mengulangi pelanggaran.

Pilihlah pasangan jenis norma dan sanksi yang tepat!`,
    options: [
      { id: 'A', text: 'Norma agama – mendapatkan dosa.' },
      { id: 'B', text: 'Norma kesusilaan – merasa bersalah dan menyesal.' },
      { id: 'C', text: 'Norma kesopanan – mendapatkan teguran atau celaan masyarakat.' },
      { id: 'D', text: 'Norma hukum – mendapatkan hukuman sesuai peraturan yang berlaku.' },
      { id: 'E', text: 'Norma agama – mendapatkan denda dari pemerintah untuk setiap pelanggaran ibadah.' }
    ],
    correctAnswers: ['A', 'B', 'C', 'D']
  },
  {
    id: 'ppkn-vii-29',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 29,
    points: 5,
    difficulty: 'sedang',
    prompt: `Di sebuah sekolah, terdapat siswa yang sering mengambil barang milik temannya tanpa izin. Ketika ditegur, siswa tersebut beralasan bahwa ia hanya meminjam dan akan mengembalikannya. Namun, ia tidak pernah meminta izin kepada pemilik barang.

Beberapa teman mengetahui kebiasaan tersebut, tetapi mereka takut untuk mengingatkannya. Akibatnya, banyak siswa merasa tidak nyaman dan khawatir barang miliknya akan hilang.

Berdasarkan kasus tersebut, pilihlah tindakan yang tepat untuk menyelesaikan permasalahan!`,
    options: [
      { id: 'A', text: 'Mengingatkan siswa tersebut agar meminta izin sebelum menggunakan barang milik orang lain.' },
      { id: 'B', text: 'Membiarkan perilaku tersebut karena barang yang diambil hanya digunakan sementara.' },
      { id: 'C', text: 'Menanamkan kesadaran bahwa mengambil barang tanpa izin merupakan perilaku yang tidak baik.' },
      { id: 'D', text: 'Melaporkan kejadian kepada guru agar mendapatkan penyelesaian yang tepat.' },
      { id: 'E', text: 'Mengambil barang milik siswa tersebut sebagai bentuk balasan.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-vii-30',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 30,
    points: 5,
    difficulty: 'sedang',
    prompt: `Dalam kehidupan bermasyarakat, seseorang tidak cukup hanya mengetahui jenis-jenis norma. Ia juga harus mampu menerapkannya sesuai dengan situasi yang dihadapi.

Pilihlah pernyataan yang menunjukkan pemahaman dan penerapan norma secara tepat!`,
    options: [
      { id: 'A', text: 'Seseorang menaati peraturan lalu lintas meskipun tidak ada polisi yang mengawasi.' },
      { id: 'B', text: 'Seseorang hanya bersikap sopan kepada orang yang memiliki kedudukan tinggi.' },
      { id: 'C', text: 'Seseorang tetap berkata jujur meskipun tidak ada orang lain yang mengetahui perbuatannya.' },
      { id: 'D', text: 'Seseorang menghormati tetangga yang berbeda agama dan tidak mengganggu pelaksanaan ibadahnya.' },
      { id: 'E', text: 'Seseorang menaati aturan hanya karena takut mendapatkan hukuman.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  }
];
