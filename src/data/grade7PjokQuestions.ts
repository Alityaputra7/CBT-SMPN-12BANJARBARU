import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI PENILAIAN AKHIR SEMESTER GANJIL PJOK KELAS VII SMP
// Sumber: UAS_PJOK_Kelas_VII_Semester_Ganjil_dae1b237.pdf
// 40 Nomor Soal Naskah -> 35 Butir CBT (Total Skor = 100):
// - A. 20 Pilihan Ganda (No. 1-20) x 2 poin = 40 poin
// - B. 6 Pilihan Ganda Kompleks (No. 21-26) x 3 poin = 18 poin
// - C. 1 Menjodohkan (6 Pasangan, Naskah No. 27-32) = 6 poin
// - D. 3 Benar atau Salah (Naskah No. 33-35) x 2 poin = 6 poin
// - E. 5 Uraian / Esai (Naskah No. 36-40) x 6 poin = 30 poin
// Total = 100 poin
// =========================================================================

export const PJOK_KELAS_7_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // A. PILIHAN GANDA (No. 1 - 20, 2 poin/soal = 40 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-vii-1',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 1,
    type: 'pg',
    prompt:
      'Saat pembelajaran bola tangan, guru menjelaskan bahwa permainan bola tangan merupakan permainan beregu yang bertujuan memasukkan bola ke gawang lawan. Tujuan utama permainan bola tangan adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'mempertahankan bola selama mungkin tanpa mencetak gol' },
      { id: 'B', text: 'memasukkan bola ke gawang lawan sebanyak-banyaknya' },
      { id: 'C', text: 'menjatuhkan pemain lawan agar tidak bergerak' },
      { id: 'D', text: 'membawa bola keluar dari lapangan permainan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-vii-2',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 2,
    type: 'pg',
    prompt:
      'Rafi menerima bola dari temannya dalam permainan bola tangan. Ia ingin mengoper bola kepada teman yang berada di sisi kanan lapangan dengan jarak cukup dekat. Teknik yang paling tepat digunakan Rafi adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'menendang bola dengan kaki bagian dalam' },
      { id: 'B', text: 'memukul bola menggunakan kepalan tangan' },
      { id: 'C', text: 'mengoper bola menggunakan tangan' },
      { id: 'D', text: 'melempar bola ke atas tanpa arah' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-vii-3',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 3,
    type: 'pg',
    prompt:
      'Dalam pertandingan bola tangan antarkelas, tim VII-A sedang menyerang. Pemain yang membawa bola melihat dua pemain lawan berada di depannya, sedangkan temannya berada dalam posisi bebas. Tindakan paling tepat adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'tetap membawa bola melewati dua pemain lawan' },
      { id: 'B', text: 'mengoper bola kepada teman yang berada pada posisi bebas' },
      { id: 'C', text: 'menghentikan permainan dan meminta pergantian pemain' },
      { id: 'D', text: 'melempar bola keluar lapangan agar lawan tidak menyerang' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-vii-4',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 4,
    type: 'pg',
    prompt:
      'Tim kelas VII-B mengalami kesulitan mencetak gol karena seluruh pemain selalu bergerombol dekat bola. Akibatnya, pemain lawan mudah melakukan pertahanan. Strategi yang paling tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'seluruh pemain berkumpul di depan gawang lawan' },
      { id: 'B', text: 'pemain yang tidak membawa bola diam di tempat' },
      { id: 'C', text: 'pemain menyebar ke ruang kosong dan membangun kerja sama' },
      { id: 'D', text: 'pemain hanya mengandalkan satu orang untuk mencetak gol' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-vii-5',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 5,
    type: 'pg',
    prompt:
      'Ketika bermain bola tangan, Dimas memegang bola dan ingin bergerak menuju gawang lawan. Ia harus memperhatikan aturan langkah agar tidak melakukan pelanggaran. Tindakan yang sesuai prinsip permainan adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'berlari membawa bola tanpa batas langkah' },
      { id: 'B', text: 'berjalan membawa bola sambil menghindari aturan permainan' },
      { id: 'C', text: 'memantulkan bola atau mengoper sesuai aturan sebelum melanjutkan pergerakan' },
      { id: 'D', text: 'membawa bola dengan kedua tangan sambil terus berlari tanpa batas' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-vii-6',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 6,
    type: 'pg',
    prompt:
      'Dalam permainan bola voli, setiap tim berusaha mengirimkan bola melewati net agar jatuh di daerah permainan lawan. Alat yang memisahkan kedua wilayah permainan tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'garis start' },
      { id: 'B', text: 'net' },
      { id: 'C', text: 'papan pantul' },
      { id: 'D', text: 'gawang' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-vii-7',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 7,
    type: 'pg',
    prompt:
      'Saat pembelajaran bola voli, Sinta berlatih menerima bola yang datang rendah dari arah lawan. Guru meminta Sinta menggunakan teknik passing bawah. Posisi tangan yang benar adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'kedua telapak tangan terbuka dan jari-jari direnggangkan' },
      { id: 'B', text: 'kedua tangan ditekuk dan bola ditangkap' },
      { id: 'C', text: 'kedua tangan dirapatkan dan lengan diluruskan sebagai bidang pantul' },
      { id: 'D', text: 'satu tangan diangkat dan satu tangan berada di belakang badan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-vii-8',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 8,
    type: 'pg',
    prompt:
      'Bola servis dari lawan datang cukup rendah dan cepat menuju bagian depan tubuh Andi. Agar bola dapat diarahkan kepada teman yang akan melakukan serangan, Andi sebaiknya menggunakan ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'passing bawah' },
      { id: 'B', text: 'smash' },
      { id: 'C', text: 'blok' },
      { id: 'D', text: 'servis atas' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-vii-9',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 9,
    type: 'pg',
    prompt:
      'Dalam pertandingan bola voli kelas VII, tim Rina sering gagal menerima servis lawan. Ketiga pemain penerima berdiri terlalu dekat sehingga bola yang jatuh di antara mereka tidak dapat dijangkau. Perbaikan strategi yang tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'semua pemain berdiri di dekat net' },
      { id: 'B', text: 'pemain mengatur posisi penerimaan dengan membagi area lapangan' },
      { id: 'C', text: 'pemain tidak perlu bergerak ketika bola datang' },
      { id: 'D', text: 'pemain menghindari bola agar tidak terjadi kesalahan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-vii-10',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 10,
    type: 'pg',
    prompt:
      'Budi melakukan servis dalam permainan bola voli. Ia berdiri di belakang garis akhir lapangan dan memukul bola agar melewati net menuju daerah lawan. Pukulan tersebut merupakan ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'passing bawah' },
      { id: 'B', text: 'passing atas' },
      { id: 'C', text: 'servis' },
      { id: 'D', text: 'blok' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-vii-11',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 11,
    type: 'pg',
    prompt:
      'Lompat jauh merupakan salah satu nomor atletik yang bertujuan mencapai jarak lompatan sejauh mungkin. Urutan tahapan teknik lompat jauh yang benar adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'mendarat – melayang – berlari – menolak' },
      { id: 'B', text: 'berlari – menolak – melayang – mendarat' },
      { id: 'C', text: 'menolak – berlari – mendarat – melayang' },
      { id: 'D', text: 'melayang – berlari – menolak – mendarat' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-vii-12',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 12,
    type: 'pg',
    prompt:
      'Alya berlatih lompat jauh. Ia berlari dengan kecepatan tinggi, tetapi ketika menolak, kakinya melewati garis batas papan tolakan. Akibat kesalahan tersebut, lompatan Alya dinyatakan ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'sah dan jaraknya ditambah' },
      { id: 'B', text: 'sah apabila mendarat dengan dua kaki' },
      { id: 'C', text: 'gagal atau tidak sah' },
      { id: 'D', text: 'tetap sah apabila lompatan lebih dari tiga meter' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-vii-13',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 13,
    type: 'pg',
    prompt:
      'Seorang siswa memiliki kecepatan lari awalan yang baik, tetapi hasil lompat jauhnya masih pendek. Ia menolak dengan posisi tubuh kurang seimbang dan tidak memanfaatkan ayunan lengan. Upaya tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'mengurangi kecepatan awalan dan menghindari ayunan lengan' },
      { id: 'B', text: 'memperbaiki teknik tolakan, koordinasi ayunan lengan, dan posisi tubuh saat melayang' },
      { id: 'C', text: 'berlari secepat mungkin tanpa memperhatikan papan tolakan' },
      { id: 'D', text: 'mendarat dengan satu kaki lurus ke belakang' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-vii-14',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 14,
    type: 'pg',
    prompt:
      'Dalam olahraga tolak peluru, atlet menggunakan alat berbentuk bola besi yang memiliki berat tertentu. Gerakan yang benar adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'melempar peluru dari belakang kepala' },
      { id: 'B', text: 'menendang peluru ke arah depan' },
      { id: 'C', text: 'menolak peluru dari dekat bahu menggunakan satu tangan' },
      { id: 'D', text: 'memukul peluru menggunakan kedua tangan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-vii-15',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 15,
    type: 'pg',
    prompt:
      'Ketika melakukan tolak peluru, Fajar meletakkan peluru di telapak tangan dan mengayunkannya jauh ke belakang sebelum melepaskan alat. Kesalahan tekniknya adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'peluru seharusnya diletakkan dekat leher atau bahu' },
      { id: 'B', text: 'peluru harus diletakkan di lantai sebelum ditolak' },
      { id: 'C', text: 'peluru harus dipegang menggunakan kedua tangan' },
      { id: 'D', text: 'peluru harus dilempar dari atas kepala' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-vii-16',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 16,
    type: 'pg',
    prompt:
      'Dalam latihan tolak peluru, seorang siswa menghasilkan tolakan pendek meskipun kekuatan lengan cukup baik. Ia hanya menggunakan lengan dan tidak memanfaatkan gerakan tubuh. Perbaikan tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'hanya memperkuat jari-jari tangan' },
      { id: 'B', text: 'menggabungkan dorongan kaki, gerakan badan, dan kekuatan lengan secara koordinatif' },
      { id: 'C', text: 'mengurangi gerakan tubuh agar lebih mudah' },
      { id: 'D', text: 'memegang peluru dengan dua tangan dan melemparkannya' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-vii-17',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 17,
    type: 'pg',
    prompt:
      'Lempar lembing merupakan nomor atletik yang menggunakan alat berbentuk panjang dan runcing. Tujuan utama lempar lembing adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'melempar lembing setinggi mungkin' },
      { id: 'B', text: 'melempar lembing sejauh mungkin dengan teknik yang benar' },
      { id: 'C', text: 'melempar lembing ke arah sasaran bergerak' },
      { id: 'D', text: 'melempar lembing sambil melompat melewati net' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-vii-18',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 18,
    type: 'pg',
    prompt:
      'Saat latihan lempar lembing, Nanda memegang lembing pada bagian pegangan dan mengarahkan ujung lembing ke depan atas sebelum melakukan lemparan. Cara tersebut bertujuan untuk ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'mengurangi panjang lembing' },
      { id: 'B', text: 'membantu mengontrol lembing dan menghasilkan arah lemparan yang baik' },
      { id: 'C', text: 'membuat lembing berputar di tempat' },
      { id: 'D', text: 'menghindari gerakan awalan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-vii-19',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 19,
    type: 'pg',
    prompt: 'Alat yang digunakan dalam nomor lempar cakram berbentuk ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'bola kecil' },
      { id: 'B', text: 'tongkat panjang' },
      { id: 'C', text: 'piringan pipih dan bulat' },
      { id: 'D', text: 'bola besi dengan pegangan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-vii-20',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 20,
    type: 'pg',
    prompt:
      'Dalam latihan lempar cakram, Arman melepaskan cakram dengan posisi badan tidak seimbang sehingga cakram jatuh ke arah samping. Ia juga kurang melakukan putaran badan. Perbaikan tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'memperbaiki keseimbangan, koordinasi putaran badan, dan arah pelepasan cakram' },
      { id: 'B', text: 'melempar cakram tanpa melakukan gerakan badan' },
      { id: 'C', text: 'mengurangi ayunan tangan dan berdiri diam' },
      { id: 'D', text: 'melempar cakram menggunakan kedua tangan dari depan dada' }
    ],
    correctAnswers: ['A']
  },

  // -----------------------------------------------------------------------
  // B. PILIHAN GANDA KOMPLEKS (No. 21 - 26, 3 poin/soal = 18 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-vii-21',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 21,
    type: 'pg_kompleks',
    prompt:
      'Dalam permainan bola tangan, tim kelas VII sedang melakukan serangan. Pemain harus bekerja sama agar dapat menciptakan peluang mencetak gol. Pernyataan yang benar adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'pemain dapat mengoper bola kepada teman satu tim' },
      { id: 'B', text: 'pemain harus bekerja sama dalam menyerang dan bertahan' },
      { id: 'C', text: 'pemain boleh membawa bola tanpa memperhatikan aturan langkah' },
      { id: 'D', text: 'pemain dapat memanfaatkan ruang kosong untuk menyerang' },
      { id: 'E', text: 'tujuan permainan adalah memasukkan bola ke gawang lawan' }
    ],
    correctAnswers: ['A', 'B', 'D', 'E']
  },
  {
    id: 'pjok-vii-22',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 22,
    type: 'pg_kompleks',
    prompt:
      'Dalam latihan bola voli, tim kelas VII mengalami kesulitan menerima servis lawan. Strategi yang dapat dilakukan untuk meningkatkan kualitas permainan adalah ....',
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'berkomunikasi sebelum dan selama bola dimainkan' },
      { id: 'B', text: 'memperbaiki posisi penerimaan servis' },
      { id: 'C', text: 'membiarkan bola jatuh apabila datang ke area teman' },
      { id: 'D', text: 'melakukan passing sesuai arah datangnya bola' },
      { id: 'E', text: 'mengatur kerja sama antarpemain' }
    ],
    correctAnswers: ['A', 'B', 'D', 'E']
  },
  {
    id: 'pjok-vii-23',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 23,
    type: 'pg_kompleks',
    prompt: 'Pada latihan lompat jauh, siswa ingin menghasilkan lompatan baik dan aman. Hal-hal yang perlu dilakukan adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'melakukan awalan dengan kecepatan yang terkontrol' },
      { id: 'B', text: 'melakukan tolakan menggunakan satu kaki' },
      { id: 'C', text: 'memperhatikan batas papan tolakan' },
      { id: 'D', text: 'mendarat dengan kedua kaki dan menjaga keseimbangan' },
      { id: 'E', text: 'mendarat dengan tangan terlebih dahulu di belakang tubuh' }
    ],
    correctAnswers: ['A', 'B', 'C', 'D']
  },
  {
    id: 'pjok-vii-24',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 24,
    type: 'pg_kompleks',
    prompt:
      'Dalam pembelajaran tolak peluru, guru meminta siswa menganalisis teknik yang dapat menghasilkan tolakan lebih jauh sekaligus menjaga keselamatan. Pernyataan tepat adalah ....',
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'peluru diletakkan dekat leher atau bahu' },
      { id: 'B', text: 'peluru ditolak menggunakan satu tangan' },
      { id: 'C', text: 'gerakan kaki dan badan membantu menghasilkan tenaga' },
      { id: 'D', text: 'peluru dilempar seperti melempar bola biasa' },
      { id: 'E', text: 'siswa harus memastikan area tolakan aman sebelum melakukan gerakan' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },
  {
    id: 'pjok-vii-25',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 25,
    type: 'pg_kompleks',
    prompt:
      'Dalam kegiatan atletik, siswa berlatih lempar lembing menggunakan alat yang sesuai tingkat pembelajaran. Tindakan yang benar adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'memegang lembing pada bagian pegangan' },
      { id: 'B', text: 'mengarahkan lembing ke area lempar yang aman' },
      { id: 'C', text: 'melempar lembing ke arah teman untuk latihan menangkap' },
      { id: 'D', text: 'melakukan awalan sesuai kemampuan dan aturan' },
      { id: 'E', text: 'mengambil lembing ketika teman masih melakukan lemparan' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pjok-vii-26',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 26,
    type: 'pg_kompleks',
    prompt: 'Saat latihan lempar cakram, siswa ingin memperbaiki hasil lemparannya. Saran tepat adalah ....',
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'meningkatkan koordinasi gerakan kaki, badan, dan lengan' },
      { id: 'B', text: 'memperhatikan keseimbangan ketika melakukan putaran' },
      { id: 'C', text: 'melepaskan cakram dengan arah yang terkontrol' },
      { id: 'D', text: 'melakukan lemparan tanpa memperhatikan area keselamatan' },
      { id: 'E', text: 'melakukan latihan teknik secara bertahap' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },

  // -----------------------------------------------------------------------
  // C. MENJODOHKAN (Naskah No. 27 - 32 -> 1 Butir dengan 6 Pasangan = 6 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-vii-27',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 27,
    type: 'mencocokkan',
    prompt: 'Pasangkan pernyataan pada Kolom A dengan jawaban yang tepat pada Kolom B!',
    points: 6,
    difficulty: 'mudah',
    options: [],
    matchingPairs: [
      { id: 'p-1', leftText: 'Teknik mengoper bola kepada teman dalam permainan bola tangan.', rightText: 'Operan bola' },
      { id: 'p-2', leftText: 'Teknik menerima bola rendah dalam permainan bola voli.', rightText: 'Passing bawah' },
      { id: 'p-3', leftText: 'Gerakan kaki untuk menghasilkan dorongan saat lompat jauh.', rightText: 'Tolakan' },
      { id: 'p-4', leftText: 'Gerakan mendorong bola besi dari dekat bahu.', rightText: 'Tolakan peluru' },
      { id: 'p-5', leftText: 'Pukulan untuk memulai permainan bola voli.', rightText: 'Servis' },
      { id: 'p-6', leftText: 'Alat atletik berbentuk piringan pipih dan bulat.', rightText: 'Cakram' }
    ],
    matchingRightOptions: ['Tolakan', 'Passing bawah', 'Servis', 'Operan bola', 'Tolakan peluru', 'Cakram']
  },

  // -----------------------------------------------------------------------
  // D. BENAR ATAU SALAH (Naskah No. 33 - 35 -> CBT No. 28 - 30, 2 poin/soal = 6 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-vii-28',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 28,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nDalam permainan bola tangan, kerja sama antarpemain diperlukan untuk menciptakan peluang mencetak gol dan mempertahankan gawang.',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'pjok-vii-29',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 29,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nKetika melakukan lompat jauh, seorang siswa boleh melewati batas papan tolakan selama ia berhasil mendarat dengan kedua kaki secara bersamaan.',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },
  {
    id: 'pjok-vii-30',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 30,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nKetika latihan lempar lembing dan lempar cakram, siswa boleh mengambil alat yang telah dilempar tanpa menunggu instruksi atau memastikan tidak ada teman yang sedang melakukan lemparan, karena kedua alat tersebut merupakan alat olahraga.',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },

  // -----------------------------------------------------------------------
  // E. URAIAN / ESAI (Naskah No. 36 - 40 -> CBT No. 31 - 35, 6 poin/soal = 30 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-vii-31',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 31,
    type: 'uraian',
    prompt:
      'Dalam pertandingan bola tangan antarkelas, tim VII-A mengalami kesulitan menyerang karena pemain yang membawa bola selalu berusaha melewati lawan sendiri. Pemain lain jarang bergerak mencari ruang kosong sehingga serangan mudah dihentikan. Berdasarkan cerita tersebut:\na) Jelaskan dua kesalahan strategi yang dilakukan tim VII-A!\nb) Berikan dua solusi untuk memperbaiki pola serangan tim tersebut!\nc) Jelaskan mengapa kerja sama sangat penting dalam permainan bola tangan!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Bola Tangan): a) Individualis, tidak mengoper, pemain tanpa bola tidak mencari ruang. b) Operan antarpemain, bergerak mencari ruang kosong, mengatur posisi dan komunikasi. c) Kerja sama membuka peluang gol, menghindari penjagaan, dan membangun serangan. (Skor maksimal 6.)'
  },
  {
    id: 'pjok-vii-32',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 32,
    type: 'uraian',
    prompt:
      'Dalam pertandingan bola voli antarkelas, tim VII-B sering kehilangan poin karena bola servis lawan tidak dapat diterima dengan baik. Beberapa siswa takut menerima bola, sedangkan siswa lainnya tidak memahami teknik passing bawah. Berdasarkan situasi tersebut:\na) Jelaskan fungsi passing bawah!\nb) Uraikan tiga langkah melakukan passing bawah dengan benar!\nc) Berikan solusi agar tim VII-B mampu meningkatkan kemampuan menerima servis lawan!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Bola Voli): a) Passing bawah untuk menerima bola rendah/keras, terutama servis atau serangan. b) Sikap siap, tangan dirapatkan dan lengan lurus, pantulkan dengan bidang lengan bawah sambil menggerakkan kaki/tubuh. c) Latihan berpasangan, menerima servis bertahap, posisi siap, dan komunikasi. (Skor maksimal 6.)'
  },
  {
    id: 'pjok-vii-33',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 33,
    type: 'uraian',
    prompt:
      'Saat mengikuti perlombaan lompat jauh, seorang siswa memiliki kecepatan lari yang baik. Namun, hasil lompatannya kurang maksimal karena ia sering melakukan tolakan melewati papan tolakan dan posisi tubuhnya kurang seimbang saat mendarat. Analisislah:\na) Sebutkan empat tahapan utama lompat jauh!\nb) Jelaskan kesalahan siswa tersebut!\nc) Berikan tiga cara memperbaiki teknik lompat jauh agar hasil lebih baik dan aman!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Lompat Jauh): a) Awalan, tolakan, melayang, pendaratan. b) Melewati papan tolakan sehingga tidak sah dan kurang seimbang saat mendarat. c) Mengatur langkah awalan, latihan tolakan, ayunan lengan, posisi melayang, serta pendaratan dengan kedua kaki. (Skor maksimal 6.)'
  },
  {
    id: 'pjok-vii-34',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 34,
    type: 'uraian',
    prompt:
      'Pada kegiatan atletik, siswa kelas VII melakukan latihan tolak peluru dan lempar lembing. Seorang siswa melakukan tolak peluru dengan cara melempar dari belakang kepala, sedangkan siswa lainnya melakukan lempar lembing tanpa memperhatikan arah lemparan dan keselamatan teman. Berdasarkan cerita tersebut:\na) Jelaskan perbedaan gerakan dasar tolak peluru dan lempar lembing!\nb) Jelaskan kesalahan teknik kedua siswa!\nc) Tuliskan minimal tiga aturan keselamatan saat latihan!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Tolak Peluru & Lempar Lembing): a) Tolak peluru: mendorong peluru dari dekat bahu dengan satu tangan; lembing: melempar lembing ke depan melalui awalan dan koordinasi tubuh. b) Tolak peluru seperti lemparan dari belakang kepala; lembing tanpa arah/keamanan. c) Pastikan area kosong, jangan arahkan ke teman, tunggu instruksi, ambil alat setelah semua lemparan selesai, gunakan alat sesuai arahan. (Skor maksimal 6.)'
  },
  {
    id: 'pjok-vii-35',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-1',
    grade: 'VII',
    number: 35,
    type: 'uraian',
    prompt:
      'Dalam latihan lempar cakram, Bayu belum mampu menghasilkan lemparan jauh. Ia hanya mengandalkan kekuatan lengan, tidak menjaga keseimbangan saat berputar, dan melepaskan cakram dengan arah kurang tepat. Sebagai teman latihan Bayu:\na) Mengapa kekuatan lengan saja tidak cukup?\nb) Jelaskan peran koordinasi kaki, badan, dan lengan!\nc) Buat tiga rekomendasi latihan sederhana untuk memperbaiki teknik lempar cakram!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Lempar Cakram): a) Lemparan membutuhkan koordinasi seluruh tubuh dan momentum, bukan lengan saja. b) Kaki menghasilkan dorongan/putaran, badan meneruskan tenaga, lengan mengontrol dan melepas cakram. c) Latihan keseimbangan, putaran badan tanpa alat, ayunan dan pelepasan dengan alat aman, koordinasi, latihan bertahap. (Skor maksimal 6.)'
  }
];
