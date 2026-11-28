import { Question } from '../types/cbt';

/**
 * Bank Soal Resmi Pendidikan Pancasila (PPKn) Kelas VIII (SMP Negeri 12 Banjarbaru)
 * 100% verbatim dari dokumen: Soal_PPKn_kelas_8_kunci_2026_7c9b3f0d.pdf
 * Total: 30 butir soal (16 Pilihan Ganda, 10 Pilihan Ganda Kompleks Analisis, 4 Menjodohkan), bobot 5 poin per soal.
 */
export const PPKN_KELAS_8_QUESTIONS: Question[] = [
  // =========================================================================
  // A. PILIHAN GANDA (NOMOR 1–5)
  // =========================================================================
  {
    id: 'ppkn-viii-1',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 1,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pada tanggal 1 Juni 1945, Ir. Sukarno menyampaikan pidato dalam sidang BPUPK mengenai lima dasar bagi negara Indonesia merdeka. Lima dasar tersebut kemudian dikenal dengan nama Pancasila.

Berdasarkan informasi tersebut, kedudukan Pancasila yang dimaksud adalah ....`,
    options: [
      { id: 'A', text: 'kepribadian bangsa yang menjadi ciri khas masyarakat Indonesia' },
      { id: 'B', text: 'pandangan hidup yang menjadi pedoman dalam kehidupan sehari-hari' },
      { id: 'C', text: 'ideologi yang menjadi cita-cita dan tujuan bangsa Indonesia' },
      { id: 'D', text: 'dasar negara yang menjadi landasan penyelenggaraan negara' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ppkn-viii-2',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 2,
    points: 5,
    difficulty: 'mudah',
    prompt: `Perhatikan cerita berikut!

Keluarga Rani memiliki kemampuan ekonomi yang cukup baik. Meskipun demikian, orang tua Rani selalu mengajarkan hidup sederhana. Mereka tidak suka memamerkan kekayaan dan lebih memilih menggunakan sebagian rezekinya untuk membantu tetangga yang membutuhkan.

Sikap keluarga Rani menunjukkan bahwa Pancasila sebagai pandangan hidup bangsa dapat diwujudkan melalui ....`,
    options: [
      { id: 'A', text: 'kebiasaan mengutamakan kepentingan keluarga daripada masyarakat' },
      { id: 'B', text: 'cara hidup yang sederhana dan memiliki kepedulian terhadap sesama' },
      { id: 'C', text: 'usaha menunjukkan kemampuan ekonomi agar dihargai masyarakat' },
      { id: 'D', text: 'kebebasan menggunakan kekayaan tanpa memperhatikan lingkungan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ppkn-viii-3',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 3,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pancasila merupakan pedoman yang mengarahkan bangsa Indonesia dalam mencapai tujuan bernegara, yaitu menjadi negara yang merdeka, bersatu, berdaulat, adil, dan makmur.

Berdasarkan pernyataan tersebut, makna Pancasila sebagai ideologi negara adalah ....`,
    options: [
      { id: 'A', text: 'menjadi pedoman dan arah dalam mencapai cita-cita serta tujuan negara' },
      { id: 'B', text: 'menjadi kebiasaan masyarakat yang diwariskan secara turun-temurun' },
      { id: 'C', text: 'menjadi aturan yang hanya berlaku bagi lembaga pemerintahan' },
      { id: 'D', text: 'menjadi pedoman yang mengatur hubungan antaranggota keluarga' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ppkn-viii-4',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 4,
    points: 5,
    difficulty: 'sedang',
    prompt: `Setiap negara memiliki konstitusi sebagai hukum dasar dalam penyelenggaraan negara. Konstitusi Indonesia terdiri atas bentuk tertulis dan tidak tertulis.

Salah satu contoh pelaksanaan konstitusi tidak tertulis di Indonesia adalah ....`,
    options: [
      { id: 'A', text: 'penyusunan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945' },
      { id: 'B', text: 'pelaksanaan peraturan pemerintah dalam penyelenggaraan negara' },
      { id: 'C', text: 'pidato kenegaraan Presiden di hadapan sidang DPR sebelum tanggal 17 Agustus' },
      { id: 'D', text: 'penetapan undang-undang oleh lembaga negara yang berwenang' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ppkn-viii-5',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 5,
    points: 5,
    difficulty: 'mudah',
    prompt: `Perhatikan beberapa perilaku siswa dalam kehidupan di sekolah dan masyarakat berikut!

1. Memperlakukan teman dengan menghargai harkat dan martabatnya sebagai manusia.
2. Tidak mengejek, mengintimidasi, atau mengucilkan teman dalam pergaulan sehari-hari.
3. Bergotong royong membersihkan selokan desa untuk menjaga kebersihan lingkungan.
4. Menghormati hak teman untuk menyampaikan pendapat meskipun berbeda dengan pendapat pribadi.

Berdasarkan pernyataan tersebut, perilaku yang mencerminkan pengamalan sila kedua Pancasila ditunjukkan oleh nomor ....`,
    options: [
      { id: 'A', text: '(1), (2), dan (4)' },
      { id: 'B', text: '(1), (2), dan (3)' },
      { id: 'C', text: '(1), (3), dan (4)' },
      { id: 'D', text: '(2), (3), dan (4)' }
    ],
    correctAnswers: ['A']
  },

  // =========================================================================
  // B. PILIHAN GANDA KOMPLEKS ANALISIS (NOMOR 6–7)
  // =========================================================================
  {
    id: 'ppkn-viii-6',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 6,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan studi kasus berikut!

Pemerintah suatu daerah merencanakan pembangunan fasilitas umum untuk masyarakat. Dalam pelaksanaannya, pemerintah mengadakan musyawarah dengan warga untuk mengetahui kebutuhan mereka. Hasil musyawarah menunjukkan bahwa masyarakat membutuhkan fasilitas pendidikan, pelayanan kesehatan, dan jalan yang layak.
Pemerintah kemudian menyusun program pembangunan dengan mempertimbangkan kepentingan masyarakat secara adil.

Berdasarkan kasus tersebut, pernyataan yang menunjukkan penerapan Pancasila sebagai dasar negara adalah ....
(Pilihlah semua jawaban yang benar. Jawaban lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Pemerintah menjadikan nilai-nilai Pancasila sebagai landasan dalam menyusun kebijakan pembangunan.' },
      { id: 'B', text: 'Pemerintah mengutamakan kepentingan kelompok tertentu agar program pembangunan lebih cepat selesai.' },
      { id: 'C', text: 'Pemerintah melibatkan masyarakat dalam musyawarah sebelum menentukan kebijakan.' },
      { id: 'D', text: 'Pemerintah mengupayakan pemerataan pembangunan agar masyarakat memperoleh manfaat secara adil.' },
      { id: 'E', text: 'Pemerintah menyerahkan seluruh keputusan pembangunan kepada kelompok masyarakat yang memiliki kemampuan ekonomi lebih tinggi.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-viii-7',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 7,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan studi kasus berikut!

Ketika seorang warga meninggal dunia, masyarakat di lingkungan tempat tinggalnya segera berkumpul di rumah keluarga yang sedang berduka. Beberapa warga menyampaikan belasungkawa, membantu mempersiapkan kebutuhan keluarga, serta memberikan dukungan kepada anggota keluarga yang ditinggalkan. Meskipun memiliki kesibukan masing-masing, warga tetap berusaha hadir untuk menunjukkan kepedulian.
Perilaku masyarakat tersebut mencerminkan nilai-nilai Pancasila yang telah menjadi bagian dari karakter bangsa Indonesia.

Berdasarkan kasus tersebut, pernyataan yang tepat untuk menjelaskan Pancasila sebagai kepribadian bangsa adalah ....
(Pilihlah semua jawaban yang benar. Jawaban lebih dari satu.)`,
    options: [
      { id: 'A', text: 'Kebiasaan saling membantu menunjukkan karakter masyarakat Indonesia yang menjunjung tinggi kepedulian dan solidaritas.' },
      { id: 'B', text: 'Perilaku tersebut membuktikan bahwa Pancasila hanya berfungsi sebagai dasar hukum dalam penyelenggaraan pemerintahan.' },
      { id: 'C', text: 'Sikap peduli terhadap keluarga yang berduka mencerminkan nilai kemanusiaan yang telah menjadi bagian dari karakter bangsa Indonesia.' },
      { id: 'D', text: 'Kebiasaan masyarakat tersebut menunjukkan ciri khas bangsa Indonesia dalam menjaga hubungan sosial dan kebersamaan.' },
      { id: 'E', text: 'Perilaku tersebut menunjukkan bahwa Pancasila merupakan aturan tertulis yang mengatur seluruh kegiatan masyarakat.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },

  // =========================================================================
  // C. SOAL MENJODOHKAN (NOMOR 8–9)
  // =========================================================================
  {
    id: 'ppkn-viii-8',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'mencocokkan',
    number: 8,
    points: 5,
    difficulty: 'mudah',
    prompt: `Perhatikan pernyataan berikut!
Pasangkan setiap pernyataan pada Kolom I dengan jawaban yang tepat pada Kolom II. Pilihan jawaban tersedia lebih banyak daripada jumlah pernyataan.`,
    options: [],
    matchingPairs: [
      {
        id: 'ppkn-viii-8-p1',
        leftText: '1. Pancasila menjadi landasan dalam penyelenggaraan negara Indonesia.',
        rightText: 'C. Dasar negara'
      },
      {
        id: 'ppkn-viii-8-p2',
        leftText: '2. Pancasila menjadi acuan dalam bersikap dan bertindak dalam kehidupan sehari-hari.',
        rightText: 'D. Pandangan hidup bangsa'
      },
      {
        id: 'ppkn-viii-8-p3',
        leftText: '3. Pancasila menjadi pedoman dalam mencapai cita-cita dan tujuan negara.',
        rightText: 'A. Ideologi negara'
      }
    ],
    matchingRightOptions: [
      'A. Ideologi negara',
      'B. Konstitusi',
      'C. Dasar negara',
      'D. Pandangan hidup bangsa'
    ]
  },
  {
    id: 'ppkn-viii-9',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'mencocokkan',
    number: 9,
    points: 5,
    difficulty: 'sedang',
    prompt:
      'Bacalah pernyataan berikut, kemudian pasangkan dengan pilihan jawaban yang tepat!',
    options: [],
    matchingPairs: [
      {
        id: 'ppkn-viii-9-p1',
        leftText: '1. Hukum dasar tertulis yang menjadi pedoman penyelenggaraan negara Indonesia.',
        rightText: 'C. Konstitusi tertulis'
      },
      {
        id: 'ppkn-viii-9-p2',
        leftText: '2. Kebiasaan ketatanegaraan berupa pidato kenegaraan Presiden sebelum tanggal 17 Agustus mengenai RAPBN.',
        rightText: 'A. Konstitusi tidak tertulis (konvensi)'
      },
      {
        id: 'ppkn-viii-9-p3',
        leftText: '3. Aturan yang berkembang dalam kehidupan masyarakat dan menjadi bagian dari konstitusi tidak tertulis.',
        rightText: 'E. Hukum adat'
      },
      {
        id: 'ppkn-viii-9-p4',
        leftText: '4. Hukum dasar yang dijadikan pegangan dalam penyelenggaraan suatu negara.',
        rightText: 'D. Konstitusi'
      }
    ],
    matchingRightOptions: [
      'A. Konstitusi tidak tertulis (konvensi)',
      'B. Peraturan pemerintah',
      'C. Konstitusi tertulis',
      'D. Konstitusi',
      'E. Hukum adat'
    ]
  },

  // =========================================================================
  // D. PILIHAN GANDA (NOMOR 10–20)
  // =========================================================================
  {
    id: 'ppkn-viii-10',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 10,
    points: 5,
    difficulty: 'mudah',
    prompt: `Indonesia memiliki tata urutan peraturan perundang-undangan yang harus dipatuhi oleh seluruh lembaga negara. Setiap peraturan yang lebih rendah tidak boleh bertentangan dengan peraturan yang berada di atasnya.

Berdasarkan pernyataan tersebut, peraturan yang menempati urutan paling tinggi dalam tata urutan peraturan perundang-undangan Indonesia adalah ....`,
    options: [
      { id: 'A', text: 'Ketetapan MPR' },
      { id: 'B', text: 'Undang-Undang' },
      { id: 'C', text: 'Peraturan Pemerintah' },
      { id: 'D', text: 'UUD Negara RI Tahun 1945' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ppkn-viii-11',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 11,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pemerintah Kabupaten Tanah Laut membuat Peraturan Daerah (Perda) tentang pengelolaan kebersihan lingkungan. Dalam penyusunannya, pemerintah daerah harus memperhatikan peraturan yang memiliki kedudukan lebih tinggi agar tidak terjadi pertentangan aturan.

Berdasarkan tata urutan peraturan perundang-undangan, peraturan yang memiliki kedudukan tepat di atas Perda Kabupaten/Kota adalah ....`,
    options: [
      { id: 'A', text: 'Peraturan Presiden' },
      { id: 'B', text: 'Peraturan Daerah Provinsi' },
      { id: 'C', text: 'Peraturan Pemerintah' },
      { id: 'D', text: 'Ketetapan MPR' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ppkn-viii-12',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 12,
    points: 5,
    difficulty: 'sedang',
    prompt: `Dalam kondisi tertentu, negara dapat menghadapi keadaan darurat yang membutuhkan kebijakan pemerintah secara cepat. Presiden memiliki kewenangan mengeluarkan suatu peraturan sebagai payung hukum untuk menangani keadaan tersebut.

Peraturan yang dimaksud adalah ....`,
    options: [
      { id: 'A', text: 'Undang-Undang' },
      { id: 'B', text: 'Peraturan Presiden' },
      { id: 'C', text: 'Peraturan Pemerintah Pengganti Undang-Undang' },
      { id: 'D', text: 'Ketetapan MPR' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ppkn-viii-13',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 13,
    points: 5,
    difficulty: 'sedang',
    prompt: `Dalam membuat peraturan, pembentuk peraturan harus memperhatikan penggunaan bahasa, istilah, sistematika, dan susunan kalimat hukum. Hal ini bertujuan agar isi peraturan mudah dipahami dan tidak menimbulkan penafsiran yang berbeda.

Asas pembentukan peraturan perundang-undangan yang sesuai dengan pernyataan tersebut adalah ....`,
    options: [
      { id: 'A', text: 'Kejelasan tujuan' },
      { id: 'B', text: 'Keterbukaan' },
      { id: 'C', text: 'Kelembagaan atau organ pembentuk' },
      { id: 'D', text: 'Kejelasan rumusan' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ppkn-viii-14',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 14,
    points: 5,
    difficulty: 'sedang',
    prompt: `Pemerintah daerah ingin membuat peraturan baru untuk mengatur pengelolaan sampah di wilayahnya. Sebelum peraturan tersebut berlaku, terdapat beberapa tahapan yang harus dilalui agar pembentukannya berjalan sesuai ketentuan.

Urutan tahapan pembentukan Peraturan Daerah yang tepat adalah ....`,
    options: [
      { id: 'A', text: 'Perencanaan dan penyusunan, pembahasan, pengesahan dan pengundangan, penyebarluasan' },
      { id: 'B', text: 'Pembahasan, perencanaan dan penyusunan, penyebarluasan, pengesahan dan pengundangan' },
      { id: 'C', text: 'Pengesahan dan pengundangan, pembahasan, perencanaan dan penyusunan, penyebarluasan' },
      { id: 'D', text: 'Perencanaan dan penyusunan, pengesahan, pembahasan, penyebarluasan dan pengundangan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ppkn-viii-15',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 15,
    points: 5,
    difficulty: 'mudah',
    prompt: `Perhatikan pernyataan-pernyataan berikut ini!

1) Membersihkan tempat tidur.
2) Menghormati semua anggota keluarga.
3) Menaati rambu-rambu lalu lintas di jalan raya.
4) Membantu orang tua membersihkan rumah.

Dari beberapa pernyataan di atas, tata tertib yang ada di rumah ditunjukkan oleh nomor ....`,
    options: [
      { id: 'A', text: '(1), (2), dan (3)' },
      { id: 'B', text: '(1), (2), dan (4)' },
      { id: 'C', text: '(1), (3), dan (4)' },
      { id: 'D', text: '(2), (3), dan (4)' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ppkn-viii-16',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 16,
    points: 5,
    difficulty: 'mudah',
    prompt: `Berikut ini adalah pihak-pihak yang terlibat dalam penyusunan Rancangan Undang-Undang (RUU) menjadi Undang-Undang.

1. Dewan Perwakilan Rakyat (DPR)
2. Presiden/Pemerintah/Menteri
3. Mahkamah Konstitusi (MK)
4. Mahkamah Agung (MA)

Lembaga yang terlibat dalam proses penyusunan Undang-Undang antara lain ditunjukkan oleh nomor ....`,
    options: [
      { id: 'A', text: '(1), dan (2)' },
      { id: 'B', text: '(1), dan (3)' },
      { id: 'C', text: '(2), dan (4)' },
      { id: 'D', text: '(3), dan (4)' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ppkn-viii-17',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 17,
    points: 5,
    difficulty: 'mudah',
    prompt: `Undang-Undang Nomor 12 Tahun 2011 mengatur tata urutan peraturan perundang-undangan di Indonesia. Berdasarkan undang-undang tersebut, tata urutan yang tepat adalah ....`,
    options: [
      { id: 'A', text: 'UUD NRI Tahun 1945, Peraturan Pemerintah, Tap MPR, Undangundang, Peraturan Daerah' },
      { id: 'B', text: 'UUD NRI Tahun 1945, Tap MPR, Peraturan Daerah, Undang-undang, Peraturan Pemerintah' },
      { id: 'C', text: 'UUD NRI Tahun 1945, Peraturan Daerah, Tap MPR, Undang-undang, Peraturan Pemerintah' },
      { id: 'D', text: 'UUD NRI Tahun 1945, Tap MPR, Undang-undang, Peraturan Pemerintah, Peraturan Daerah' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ppkn-viii-18',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 18,
    points: 5,
    difficulty: 'mudah',
    prompt: `Keteladanan para tokoh perumus dalam merumuskan dan menetapkan UUD NRI Tahun 1945 perlu kita terapkan dalam kehidupan sehari-hari. Perilaku tersebut juga dapat kalian terapkan di sekolah dengan cara ....`,
    options: [
      { id: 'A', text: 'Mengerjakan setiap tugas sekolah dengan penuh tanggung jawab.' },
      { id: 'B', text: 'Membantu teman sekelas dalam menjawab soal-soal ulangan.' },
      { id: 'C', text: 'Membantu guru dan berharap mendapatkan nilai yang baik.' },
      { id: 'D', text: 'Memilih kegiatan keluarga dibandingkan tugas kelompok.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ppkn-viii-19',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 19,
    points: 5,
    difficulty: 'mudah',
    prompt: `Guru Pendidikan Pancasila melakukan survei kepatuhan dan sikap disiplin peserta didik terhadap tata tertib sekolah selama empat minggu (satu bulan), dengan hasil seperti yang tersaji dalam tabel berikut.

Tabel Kepatuhan terhadap Peraturan
No. | Waktu Pengamatan | Tingkat Kepatuhan
1. | Minggu kesatu | 95%
2. | Minggu kedua | 96%
3. | Minggu ketiga | 98%
4. | Minggu keempat | 92%

Berdasarkan tabel di atas, dapat disimpulkan bahwa ....`,
    options: [
      { id: 'A', text: 'Peserta didik yang berperilaku disiplin dalam menaati tata tertib sekolah paling banyak ditemui pada minggu keempat.' },
      { id: 'B', text: 'Tingkat kedisiplinan peserta didik dalam menaati tata tertib sekolah paling rendah terjadi pada minggu kedua.' },
      { id: 'C', text: 'Minggu ketiga menunjukkan bahwa tingkat kedisiplinan peserta didik dalam menaati tata tertib sekolah sangat baik.' },
      { id: 'D', text: 'Tidak ada peserta didik yang menunjukkan sikap disiplin dalam menaati tata tertib di lingkungan sekolah tersebut.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ppkn-viii-20',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg',
    number: 20,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan tabel berikut!

Kelompok | Bentuk | Muatan | Pembentuk
- I | Tertulis | Memuat norma agama | Wahyu Tuhan
- II | Tertulis | Memuat norma hukum | Pejabat yang berwenang
- III | Tidak Tertulis | Memuat norma kesusilaan | Dibentuk oleh lingkungan
- IV | Tidak Tertulis | Memuat norma kesopanan | Dibentuk oleh masyarakat

Berdasarkan tabel tersebut, ciri-ciri konstitusi ditunjukkan oleh kelompok ....`,
    options: [
      { id: 'A', text: 'I' },
      { id: 'B', text: 'II' },
      { id: 'C', text: 'III' },
      { id: 'D', text: 'IV' }
    ],
    correctAnswers: ['B']
  },

  // =========================================================================
  // E. PILIHAN GANDA KOMPLEKS ANALISIS (NOMOR 21–28)
  // =========================================================================
  {
    id: 'ppkn-viii-21',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 21,
    points: 5,
    difficulty: 'sedang',
    prompt: `Setiap warga negara memiliki hak dan kewajiban yang harus dilaksanakan sesuai dengan ketentuan UUD NRI Tahun 1945. Pelaksanaan hak dan kewajiban tersebut dapat diwujudkan melalui berbagai perilaku dalam kehidupan sehari-hari.

Perhatikan beberapa perilaku berikut!
1. Membayar pajak tepat waktu.
2. Belajar dengan giat dan rajin.
3. Menggunakan hak pilih dalam pemilu.
4. Menghormati hak orang lain.

Berdasarkan pernyataan tersebut, perilaku yang mencerminkan pelaksanaan UUD NRI Tahun 1945
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: '(1) dan (2)' },
      { id: 'B', text: '(1) dan (3)' },
      { id: 'C', text: '(2) dan (3)' },
      { id: 'D', text: '(3) dan (4)' },
      { id: 'E', text: '(1) dan (4)' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'ppkn-viii-22',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 22,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan ilustrasi berikut!

Pemerintah daerah sedang menyusun peraturan tentang pengelolaan lingkungan. Dalam prosesnya, tim penyusun mempelajari berbagai peraturan yang sudah berlaku. Mereka memastikan bahwa rancangan peraturan tersebut tidak bertentangan dengan UUD NRI Tahun 1945 maupun peraturan yang memiliki kedudukan lebih tinggi.

Berdasarkan ilustrasi tersebut, pernyataan yang tepat adalah ....
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'UUD NRI Tahun 1945 merupakan sumber hukum tertulis tertinggi di Indonesia.' },
      { id: 'B', text: 'Peraturan daerah dapat dibuat tanpa memperhatikan peraturan yang lebih tinggi.' },
      { id: 'C', text: 'UUD NRI Tahun 1945 menjadi pedoman dalam penyusunan peraturan perundang-undangan.' },
      { id: 'D', text: 'Setiap peraturan memiliki kedudukan yang sama sehingga tidak memerlukan tata urutan.' },
      { id: 'E', text: 'Peraturan yang lebih rendah tidak boleh bertentangan dengan peraturan yang lebih tinggi.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ppkn-viii-23',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 23,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan studi kasus berikut!

Pemerintah suatu kabupaten berencana membuat Perda tentang pengelolaan pasar tradisional. Sebelum aturan ditetapkan, beberapa pedagang menyampaikan pendapat bahwa aturan tersebut perlu mempertimbangkan kondisi pedagang kecil. Pemerintah daerah kemudian membuka kesempatan bagi masyarakat untuk memberikan masukan.

Berdasarkan kasus tersebut, tindakan yang sesuai dengan prinsip pembentukan peraturan perundang-undangan adalah ....
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'Pemerintah tetap menetapkan aturan tanpa mendengarkan masukan masyarakat.' },
      { id: 'B', text: 'Masyarakat diberikan kesempatan menyampaikan aspirasi terhadap rancangan peraturan.' },
      { id: 'C', text: 'Pemerintah mempertimbangkan kebutuhan masyarakat dalam menyusun peraturan.' },
      { id: 'D', text: 'Pembentukan Perda harus dilakukan secara terbuka dan partisipatif.' },
      { id: 'E', text: 'Pemerintah menyerahkan seluruh proses pembentukan Perda kepada pedagang pasar.' }
    ],
    correctAnswers: ['B', 'C', 'D']
  },
  {
    id: 'ppkn-viii-24',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 24,
    points: 5,
    difficulty: 'mudah',
    prompt: `Setiap sekolah memiliki tata tertib yang harus dipatuhi oleh seluruh peserta didik. Tata tertib dibuat untuk menciptakan suasana belajar yang tertib, nyaman, dan disiplin. Namun, masih terdapat peserta didik yang kurang memahami pentingnya menaati aturan sekolah.

Berdasarkan pernyataan tersebut, manakah tindakan peserta didik yang mencerminkan ketaatan terhadap tata tertib sekolah?
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'Menggunakan seragam sekolah sesuai ketentuan yang berlaku.' },
      { id: 'B', text: 'Meminta teman mengisi daftar hadir ketika datang terlambat.' },
      { id: 'C', text: 'Mengumpulkan pekerjaan rumah sesuai waktu yang telah ditentukan.' },
      { id: 'D', text: 'Meninggalkan kelas saat pembelajaran berlangsung tanpa izin guru.' },
      { id: 'E', text: 'Berada di perpustakaan saat jam pelajaran dengan izin guru untuk mencari sumber belajar.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ppkn-viii-25',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 25,
    points: 5,
    difficulty: 'sedang',
    prompt: `Peraturan perundang-undangan di Indonesia disusun secara bertingkat. Urutan tersebut bertujuan agar setiap peraturan memiliki kedudukan yang jelas dan tidak saling bertentangan.

Pernyataan yang benar mengenai tata urutan peraturan perundang-undangan adalah ....
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'UUD NRI Tahun 1945 menempati urutan paling tinggi.' },
      { id: 'B', text: 'Peraturan Presiden berada di atas Peraturan Pemerintah.' },
      { id: 'C', text: 'Ketetapan MPR berada di bawah UUD NRI Tahun 1945.' },
      { id: 'D', text: 'Perda Provinsi berada di atas Perda Kabupaten/Kota.' },
      { id: 'E', text: 'Peraturan Pemerintah berada di bawah Peraturan Presiden.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-viii-26',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 26,
    points: 5,
    difficulty: 'mudah',
    prompt: `Peraturan dibuat untuk menciptakan kehidupan yang tertib dan teratur. Aturan tersebut berlaku di lingkungan keluarga, sekolah, maupun masyarakat.

Pernyataan yang menunjukkan manfaat menaati peraturan adalah ....
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'Membantu menciptakan keamanan dan keselamatan setiap warga.' },
      { id: 'B', text: 'Memberikan kebebasan kepada seseorang untuk melanggar aturan jika memiliki kepentingan pribadi.' },
      { id: 'C', text: 'Membantu mengatur kehidupan masyarakat agar berjalan tertib.' },
      { id: 'D', text: 'Memberikan rasa aman dan nyaman bagi seluruh lapisan masyarakat.' },
      { id: 'E', text: 'Memberikan perlindungan hanya kepada masyarakat yang memiliki kedudukan tinggi.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-viii-27',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 27,
    points: 5,
    difficulty: 'sedang',
    prompt: `UUD NRI Tahun 1945 merupakan hukum dasar tertulis yang digunakan untuk mengatur jalannya pemerintahan negara. Kedudukannya sangat penting dalam sistem hukum nasional.

Berdasarkan pernyataan tersebut, kedudukan UUD NRI Tahun 1945 ditunjukkan oleh ....
(Pilihlah semua jawaban yang benar. Setiap soal dapat memiliki lebih dari satu jawaban benar.)`,
    options: [
      { id: 'A', text: 'Merupakan sumber hukum tertulis tertinggi.' },
      { id: 'B', text: 'Menempati urutan tertinggi dalam tata urutan peraturan perundang-undangan.' },
      { id: 'C', text: 'Menjadi dasar dalam penyusunan peraturan perundang-undangan.' },
      { id: 'D', text: 'Dapat diubah oleh peraturan daerah apabila diperlukan.' },
      { id: 'E', text: 'Menjadi pedoman dalam penyelenggaraan kehidupan bernegara.' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },
  {
    id: 'ppkn-viii-28',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'pg_kompleks',
    number: 28,
    points: 5,
    difficulty: 'mudah',
    prompt: `Aturan atau tata tertib dibuat di rumah, sekolah, masyarakat, maupun negara untuk menciptakan kehidupan yang damai, disiplin, dan tertib. Namun, tujuan tersebut tidak akan tercapai apabila setiap orang hanya mengetahui aturan tanpa melaksanakannya.
Sebagai generasi penerus bangsa, diperlukan sikap dan tindakan nyata untuk mewujudkan kehidupan yang tertib dan damai.

Berdasarkan pernyataan tersebut, tindakan yang dapat kalian lakukan untuk mewujudkan tujuan tersebut adalah .... (Pilih lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Mematuhi tata tertib sekolah meskipun tidak sedang diawasi oleh guru.' },
      { id: 'B', text: 'Mengingatkan teman yang melanggar aturan dengan cara yang baik dan sopan.' },
      { id: 'C', text: 'Menaati aturan hanya ketika ada petugas atau orang yang mengawasi.' },
      { id: 'D', text: 'Mengutamakan kepentingan pribadi meskipun harus melanggar kesepakatan bersama.' },
      { id: 'E', text: 'Melaksanakan kewajiban di rumah dan masyarakat serta menghormati hak orang lain.' }
    ],
    correctAnswers: ['A', 'B', 'E']
  },

  // =========================================================================
  // F. MENJODOHKAN (NOMOR 29–30)
  // =========================================================================
  {
    id: 'ppkn-viii-29',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'mencocokkan',
    number: 29,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan susunan peraturan perundang-undangan berikut!
Pasangkan pernyataan pada Kolom I dengan jawaban yang tepat pada Kolom II. Pilihan jawaban tersedia lebih banyak daripada jumlah pernyataan.`,
    options: [],
    matchingPairs: [
      {
        id: 'ppkn-viii-29-p1',
        leftText: '1. Peraturan yang berada pada urutan tertinggi.',
        rightText: 'C. UUD NRI Tahun 1945'
      },
      {
        id: 'ppkn-viii-29-p2',
        leftText: '2. Peraturan yang berada tepat di bawah UUD NRI Tahun 1945.',
        rightText: 'A. Ketetapan MPR'
      },
      {
        id: 'ppkn-viii-29-p3',
        leftText: '3. Peraturan yang berada di bawah Peraturan Pemerintah.',
        rightText: 'B. Peraturan Presiden'
      },
      {
        id: 'ppkn-viii-29-p4',
        leftText: '4. Urutan paling bawah pada piramida peraturan Perundang-undangan di Indonesia',
        rightText: 'E. Peraturan Daerah Kabupaten/Kota'
      }
    ],
    matchingRightOptions: [
      'A. Ketetapan MPR',
      'B. Peraturan Presiden',
      'C. UUD NRI Tahun 1945',
      'D. Peraturan Daerah Provinsi',
      'E. Peraturan Daerah Kabupaten/Kota'
    ]
  },
  {
    id: 'ppkn-viii-30',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-8',
    grade: 'VIII',
    type: 'mencocokkan',
    number: 30,
    points: 5,
    difficulty: 'mudah',
    prompt: `Perhatikan pernyataan berikut!
Pasangkan pernyataan pada Kolom I dengan jawaban yang tepat pada Kolom II. Pilihan jawaban tersedia lebih banyak daripada jumlah pernyataan.`,
    options: [],
    matchingPairs: [
      {
        id: 'ppkn-viii-30-p1',
        leftText: '1. Peraturan yang ditetapkan Presiden dalam hal ihwal kegentingan yang memaksa.',
        rightText: 'D. Perppu'
      },
      {
        id: 'ppkn-viii-30-p2',
        leftText: '2. Konstitusi tertulis di Indonesia.',
        rightText: 'A. Undang Undang Dasar'
      },
      {
        id: 'ppkn-viii-30-p3',
        leftText: '3. Peraturan yang dibentuk oleh DPRD Provinsi dengan persetujuan bersama Gubernur.',
        rightText: 'B. Peraturan Daerah Provinsi'
      }
    ],
    matchingRightOptions: [
      'A. Undang Undang Dasar',
      'B. Peraturan Daerah Provinsi',
      'C. Peraturan Presiden',
      'D. Perppu'
    ]
  }
];
