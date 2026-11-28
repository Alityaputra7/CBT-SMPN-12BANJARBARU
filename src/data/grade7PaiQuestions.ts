import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI KELAS VII SMPN 12 BANJARBARU
// Sumber: SOAL_PAI__KELAS_7_4178380a.pdf (30 Soal Lengkap, Total Skor = 100)
// - Bagian I: 20 Pilihan Ganda (No. 1-20) x 2 poin = 40 poin
// - Bagian II: 10 Pilihan Ganda Kompleks (No. 21-30) x 6 poin = 60 poin
// Total = 100 poin
// =========================================================================

export const PAI_KELAS_7_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // BAGIAN I – PILIHAN GANDA (No. 1 - 20, 2 poin/soal = 40 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pai-vii-1',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt:
      'Ahmad menemukan informasi di media sosial yang menyatakan bahwa suatu makanan tertentu dilarang dalam Islam. Agar tidak mudah percaya, tindakan yang paling tepat adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'langsung menyebarkan informasi tersebut kepada teman' },
      { id: 'B', text: 'mempercayai informasi karena banyak orang membagikannya' },
      { id: 'C', text: "memeriksa kebenarannya berdasarkan Al-Qur'an, Sunnah, dan penjelasan yang dapat dipercaya" },
      { id: 'D', text: 'mengabaikan semua ajaran agama yang berkaitan dengan makanan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-vii-2',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg',
    prompt:
      "Al-Qur'an merupakan pedoman hidup umat Islam, sedangkan Sunnah berfungsi menjelaskan dan memberikan contoh pelaksanaan ajaran Al-Qur'an. Contoh hubungan keduanya adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: "Al-Qur'an memerintahkan salat, sedangkan Sunnah menjelaskan tata cara pelaksanaannya" },
      { id: 'B', text: "Sunnah menggantikan seluruh isi Al-Qur'an" },
      { id: 'C', text: "Al-Qur'an hanya digunakan ketika belajar di sekolah" },
      { id: 'D', text: 'Sunnah hanya berlaku bagi umat Islam pada masa dahulu' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-vii-3',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'pg',
    prompt:
      "Dalam kegiatan diskusi kelompok, seorang siswa mengajak temannya berbohong agar kelompok mereka mendapatkan nilai tinggi. Berdasarkan ajaran Al-Qur'an dan Sunnah, sikap yang seharusnya dilakukan adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'mengikuti ajakan tersebut demi kepentingan kelompok' },
      { id: 'B', text: 'menolak dengan baik dan mengajak teman berlaku jujur' },
      { id: 'C', text: 'membiarkan teman melakukan kebohongan' },
      { id: 'D', text: 'menyalahkan anggota kelompok lainnya' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-vii-4',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'pg',
    prompt:
      "Seorang muslim menjadikan Al-Qur'an dan Sunnah sebagai pedoman dalam berbicara, bertindak, dan mengambil keputusan. Kesimpulan yang paling tepat dari pernyataan tersebut adalah ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'pedoman agama hanya diperlukan ketika beribadah' },
      { id: 'B', text: 'ajaran Islam mengatur hubungan manusia dengan Allah dan sesama manusia' },
      { id: 'C', text: 'kehidupan sehari-hari tidak berkaitan dengan ajaran agama' },
      { id: 'D', text: 'Sunnah hanya digunakan untuk mempelajari sejarah Islam' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-vii-5',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'pg',
    prompt:
      "Allah memiliki nama Al-'Alim yang berarti Maha Mengetahui. Pemahaman terhadap nama Allah tersebut seharusnya mendorong seorang siswa untuk ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'menyembunyikan kesalahan karena tidak diketahui orang lain' },
      { id: 'B', text: 'rajin belajar dan menyadari bahwa Allah mengetahui segala sesuatu' },
      { id: 'C', text: 'merasa paling pintar dibandingkan teman-temannya' },
      { id: 'D', text: 'hanya belajar ketika akan menghadapi ujian' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-vii-6',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 6,
    type: 'pg',
    prompt:
      "Ketika mengerjakan tugas kelompok, Siti mendengarkan pendapat teman-temannya dengan sungguh-sungguh. Perilaku tersebut sesuai dengan keteladanan terhadap As-Sami' yang berarti ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Maha Melihat' },
      { id: 'B', text: 'Maha Mengetahui' },
      { id: 'C', text: 'Maha Mendengar' },
      { id: 'D', text: 'Maha Pencipta' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-vii-7',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 7,
    type: 'pg',
    prompt:
      'Rafi mendapatkan kesempatan mengerjakan ujian tanpa pengawasan langsung. Ia tetap mengerjakan secara jujur karena yakin Allah Maha Melihat. Nama Allah yang sesuai dengan keyakinan tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Al-Basir' },
      { id: 'B', text: 'Al-Khabir' },
      { id: 'C', text: "Al-'Alim" },
      { id: 'D', text: "As-Sami'" }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-vii-8',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 8,
    type: 'pg',
    prompt:
      'Seorang siswa mengetahui bahwa temannya melakukan kesalahan, tetapi ia tidak langsung menghakimi. Ia berusaha memahami keadaan temannya dan memberikan nasihat dengan baik. Sikap tersebut menunjukkan bahwa ia berusaha meneladani pemahaman terhadap ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Al-Khabir, Allah Maha Teliti terhadap segala sesuatu' },
      { id: 'B', text: "As-Sami', Allah Maha Mendengar" },
      { id: 'C', text: 'Al-Basir, Allah Maha Melihat' },
      { id: 'D', text: "Al-'Alim, Allah Maha Mengetahui" }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-vii-9',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 9,
    type: 'pg',
    prompt:
      'Perhatikan perilaku berikut: (1) Belajar dengan sungguh-sungguh. (2) Berbicara kasar karena merasa tidak diawasi. (3) Berhati-hati dalam bertindak. (4) Mendengarkan nasihat orang tua dan guru. Perilaku yang menunjukkan penghayatan terhadap nama dan sifat Allah adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '(1) dan (2)' },
      { id: 'B', text: '(2) dan (3)' },
      { id: 'C', text: '(1), (3), dan (4)' },
      { id: 'D', text: '(2), (3), dan (4)' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-vii-10',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 10,
    type: 'pg',
    prompt:
      'Dimas sering menunda salat karena terlalu asyik bermain. Setelah memahami pentingnya salat, tindakan terbaik yang seharusnya dilakukan adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'melaksanakan salat hanya ketika diingatkan guru' },
      { id: 'B', text: 'mengatur waktu bermain agar tidak meninggalkan salat' },
      { id: 'C', text: 'mengganti salat dengan membaca buku agama' },
      { id: 'D', text: 'melaksanakan salat hanya pada hari tertentu' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-vii-11',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 11,
    type: 'pg',
    prompt:
      'Salat merupakan bentuk hubungan seorang hamba dengan Allah Swt. Salah satu pengaruh positif salat dalam kehidupan sehari-hari adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'membuat seseorang merasa lebih tinggi daripada orang lain' },
      { id: 'B', text: 'melatih kedisiplinan, ketaatan, dan tanggung jawab' },
      { id: 'C', text: 'membebaskan seseorang dari kewajiban berbuat baik' },
      { id: 'D', text: 'menjadikan seseorang tidak perlu menghormati orang lain' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-vii-12',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 12,
    type: 'pg',
    prompt:
      'Setelah melaksanakan salat, seorang siswa membiasakan diri membaca istigfar dan berzikir. Tujuan utama kegiatan tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'mengingat Allah dan mendekatkan diri kepada-Nya' },
      { id: 'B', text: 'memperoleh pujian dari teman' },
      { id: 'C', text: 'menggantikan kewajiban salat berikutnya' },
      { id: 'D', text: 'menunjukkan bahwa dirinya lebih baik daripada orang lain' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-vii-13',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 13,
    type: 'pg',
    prompt:
      'Setiap waktu istirahat, Fajar segera mengambil air wudu dan melaksanakan salat ketika waktunya tiba. Ia kemudian kembali belajar dengan tertib. Nilai yang dapat diambil dari perilaku Fajar adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'salat menghambat kegiatan belajar' },
      { id: 'B', text: 'ibadah dan kegiatan belajar dapat dilaksanakan secara seimbang' },
      { id: 'C', text: 'belajar lebih penting daripada melaksanakan salat' },
      { id: 'D', text: 'salat hanya perlu dilakukan ketika tidak ada kegiatan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-vii-14',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 14,
    type: 'pg',
    prompt:
      'Ketika melihat keindahan alam berupa pegunungan dan laut, seorang muslim mengucapkan Subhanallah. Ucapan tersebut menunjukkan ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'rasa kagum terhadap manusia' },
      { id: 'B', text: 'pengakuan terhadap kesempurnaan dan keagungan Allah' },
      { id: 'C', text: 'keinginan untuk memiliki seluruh alam' },
      { id: 'D', text: 'kebanggaan terhadap kemampuan diri sendiri' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-vii-15',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 15,
    type: 'pg',
    prompt:
      'Ketika memperoleh keberhasilan dalam perlombaan, sikap yang menunjukkan pengagungan kepada Allah Swt. adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'menyombongkan kemampuan diri' },
      { id: 'B', text: 'merendahkan peserta lain' },
      { id: 'C', text: 'bersyukur dan menyadari bahwa keberhasilan juga merupakan karunia Allah' },
      { id: 'D', text: 'menganggap keberhasilan hanya berasal dari usaha sendiri' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-vii-16',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 16,
    type: 'pg',
    prompt:
      'Dalam kehidupan sehari-hari, mengagungkan Allah tidak cukup hanya dengan ucapan. Perilaku yang paling mencerminkan pengagungan kepada Allah adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'mengucapkan kalimat pujian tetapi tetap berbuat curang' },
      { id: 'B', text: 'menghormati perintah Allah dan menjauhi larangan-Nya' },
      { id: 'C', text: 'beribadah hanya ketika dilihat orang lain' },
      { id: 'D', text: 'memuji Allah tetapi tidak menghargai sesama manusia' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-vii-17',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 17,
    type: 'pg',
    prompt:
      'Dinasti Umayyah menjadikan Damaskus sebagai pusat pemerintahan. Kota tersebut memiliki peran penting karena ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'menjadi pusat pemerintahan dan perkembangan peradaban Islam' },
      { id: 'B', text: 'menjadi tempat lahirnya seluruh nabi' },
      { id: 'C', text: 'merupakan satu-satunya kota yang dihuni umat Islam' },
      { id: 'D', text: 'menjadi pusat pemerintahan Dinasti Abbasiyah' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-vii-18',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 18,
    type: 'pg',
    prompt: 'Pendiri Dinasti Umayyah adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Abu Bakar ash-Shiddiq' },
      { id: 'B', text: 'Umar bin Khattab' },
      { id: 'C', text: 'Muawiyah bin Abu Sufyan' },
      { id: 'D', text: 'Harun ar-Rasyid' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-vii-19',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 19,
    type: 'pg',
    prompt:
      'Salah satu perkembangan penting pada masa Dinasti Umayyah adalah perluasan wilayah kekuasaan Islam. Hal tersebut menunjukkan bahwa ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'peradaban Islam tidak mengalami perkembangan' },
      { id: 'B', text: 'pemerintahan Islam memiliki pengaruh yang semakin luas' },
      { id: 'C', text: 'umat Islam hanya beraktivitas di Damaskus' },
      { id: 'D', text: 'seluruh kegiatan pendidikan dihentikan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-vii-20',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 20,
    type: 'pg',
    prompt:
      'Seorang pemimpin pada masa Dinasti Umayyah berusaha memperkuat pemerintahan, membangun administrasi, dan mengembangkan wilayah kekuasaan. Pelajaran yang dapat diambil dari ilustrasi tersebut adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'kepemimpinan membutuhkan tanggung jawab dan kemampuan mengelola pemerintahan' },
      { id: 'B', text: 'pemimpin tidak perlu memperhatikan rakyat' },
      { id: 'C', text: 'pemerintahan tidak memerlukan aturan' },
      { id: 'D', text: 'kemajuan hanya ditentukan oleh luas wilayah' }
    ],
    correctAnswers: ['A']
  },

  // -----------------------------------------------------------------------
  // BAGIAN II – PILIHAN GANDA KOMPLEKS (No. 21 - 30, 6 poin/soal = 60 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pai-vii-21',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 21,
    type: 'pg_kompleks',
    prompt:
      "Perhatikan beberapa pernyataan berikut mengenai fungsi Al-Qur'an dan Sunnah! Pilihlah semua jawaban yang benar!",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "Al-Qur'an menjadi sumber utama ajaran Islam." },
      { id: 'B', text: "Sunnah menjelaskan dan memberikan contoh pelaksanaan ajaran Al-Qur'an." },
      { id: 'C', text: "Al-Qur'an hanya menjadi pedoman ketika berada di masjid." },
      { id: 'D', text: "Al-Qur'an dan Sunnah menjadi pedoman dalam kehidupan sehari-hari." }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pai-vii-22',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 22,
    type: 'pg_kompleks',
    prompt:
      "Perhatikan perilaku siswa berikut! Perilaku yang mencerminkan penerapan Al-Qur'an dan Sunnah sebagai pedoman hidup adalah ....",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Memeriksa kebenaran informasi sebelum menyebarkannya.' },
      { id: 'B', text: 'Berkata jujur kepada guru dan teman.' },
      { id: 'C', text: 'Menyontek karena ingin mendapatkan nilai tinggi.' },
      { id: 'D', text: 'Menghormati orang tua dan guru.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pai-vii-23',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 23,
    type: 'pg_kompleks',
    prompt: 'Perhatikan nama-nama Allah berikut beserta artinya. Pernyataan yang benar adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "Al-'Alim berarti Allah Maha Mengetahui." },
      { id: 'B', text: 'Al-Khabir berarti Allah Maha Teliti atau Maha Mengetahui secara mendalam.' },
      { id: 'C', text: "As-Sami' berarti Allah Maha Melihat." },
      { id: 'D', text: 'Al-Basir berarti Allah Maha Melihat.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pai-vii-24',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 24,
    type: 'pg_kompleks',
    prompt:
      'Andi ingin menerapkan keyakinannya terhadap nama dan sifat Allah dalam kehidupan sekolah. Perilaku yang tepat adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Belajar dengan sungguh-sungguh karena Allah Maha Mengetahui.' },
      { id: 'B', text: 'Menjaga ucapan karena Allah Maha Mendengar.' },
      { id: 'C', text: 'Melakukan kecurangan ketika guru tidak melihat.' },
      { id: 'D', text: 'Berhati-hati dalam bertindak karena Allah Maha Melihat.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pai-vii-25',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 25,
    type: 'pg_kompleks',
    prompt: 'Berikut ini merupakan manfaat membiasakan salat dalam kehidupan sehari-hari, yaitu ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Melatih kedisiplinan waktu.' },
      { id: 'B', text: 'Meningkatkan ketaatan kepada Allah.' },
      { id: 'C', text: 'Membenarkan perilaku tidak jujur.' },
      { id: 'D', text: 'Membentuk pribadi yang bertanggung jawab.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pai-vii-26',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 26,
    type: 'pg_kompleks',
    prompt: 'Zikir merupakan salah satu cara mengingat Allah. Perilaku yang menunjukkan kebiasaan berzikir adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Membaca istigfar setelah menyadari kesalahan.' },
      { id: 'B', text: 'Mengucapkan Alhamdulillah ketika mendapatkan nikmat.' },
      { id: 'C', text: 'Mengucapkan Subhanallah ketika mengagumi kebesaran Allah.' },
      { id: 'D', text: 'Menggunakan zikir untuk menggantikan seluruh kewajiban salat.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'pai-vii-27',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 27,
    type: 'pg_kompleks',
    prompt: 'Perhatikan beberapa perilaku berikut! Perilaku yang menunjukkan pengagungan kepada Allah Swt. adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Mengucapkan takbir ketika menyadari kebesaran Allah.' },
      { id: 'B', text: 'Bersyukur atas nikmat yang diberikan Allah.' },
      { id: 'C', text: 'Merasa paling hebat karena memiliki banyak prestasi.' },
      { id: 'D', text: 'Melaksanakan perintah Allah dengan ikhlas.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pai-vii-28',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 28,
    type: 'pg_kompleks',
    prompt:
      'Seorang siswa menyadari bahwa alam semesta merupakan ciptaan Allah. Sikap yang sesuai dengan kesadaran tersebut adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Menjaga kebersihan lingkungan.' },
      { id: 'B', text: 'Mensyukuri keindahan alam.' },
      { id: 'C', text: 'Merusak lingkungan karena merasa bebas.' },
      { id: 'D', text: 'Menggunakan nikmat Allah dengan bertanggung jawab.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pai-vii-29',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 29,
    type: 'pg_kompleks',
    prompt: 'Perhatikan pernyataan berikut mengenai Dinasti Umayyah di Damaskus. Pernyataan yang benar adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Berdiri pada tahun 661 M.' },
      { id: 'B', text: 'Didirikan oleh Muawiyah bin Abu Sufyan.' },
      { id: 'C', text: 'Menjadikan Damaskus sebagai pusat pemerintahan.' },
      { id: 'D', text: 'Berakhir pada tahun 850 M.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'pai-vii-30',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-1',
    grade: 'VII',
    number: 30,
    type: 'pg_kompleks',
    prompt:
      'Perkembangan peradaban Islam pada masa Dinasti Umayyah memberikan beberapa pelajaran bagi generasi sekarang. Pelajaran tersebut adalah ....',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Pentingnya kepemimpinan yang bertanggung jawab.' },
      { id: 'B', text: 'Pentingnya mengembangkan ilmu dan administrasi pemerintahan.' },
      { id: 'C', text: 'Pentingnya persatuan dalam membangun peradaban.' },
      { id: 'D', text: 'Keberhasilan hanya ditentukan oleh kekuasaan dan peperangan.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  }
];
