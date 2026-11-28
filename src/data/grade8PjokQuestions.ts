import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI PENILAIAN AKHIR SEMESTER GANJIL PJOK KELAS VIII SMP
// Sumber: UAS_PJOK_Kelas_VIII_Semester_Ganjil_019c1afc.pdf
// 40 Nomor Soal Naskah -> 35 Butir CBT (Total Skor = 100):
// - A. 20 Pilihan Ganda (No. 1-20) x 2 poin = 40 poin
// - B. 6 Pilihan Ganda Kompleks (No. 21-26) x 3 poin = 18 poin
// - C. 1 Menjodohkan (6 Pasangan, Naskah No. 27-32) = 6 poin
// - D. 3 Benar atau Salah (Naskah No. 33-35) x 2 poin = 6 poin
// - E. 5 Uraian / Esai (Naskah No. 36-40) x 6 poin = 30 poin
// Total = 100 poin
// =========================================================================

export const PJOK_KELAS_8_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // A. PILIHAN GANDA (No. 1 - 20, 2 poin/soal = 40 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-viii-1',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt:
      'Dalam pertandingan bola tangan antarkelas, tim VIII-A sedang melakukan serangan. Pemain yang membawa bola melihat rekannya berada pada posisi bebas, sedangkan dua pemain bertahan lawan menutup jalur menuju gawang. Keputusan paling tepat untuk mempertahankan peluang serangan adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'memaksakan diri melewati dua pemain bertahan' },
      { id: 'B', text: 'mengoper bola kepada teman yang berada pada posisi bebas' },
      { id: 'C', text: 'menghentikan permainan dengan sengaja' },
      { id: 'D', text: 'melempar bola ke luar lapangan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-viii-2',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg',
    prompt:
      'Tim VIII-B selalu kehilangan bola saat menyerang karena pemain terlalu lama menggiring bola dan tidak memperhatikan posisi rekan. Ketika bola berhasil direbut lawan, tim juga terlambat melakukan pertahanan. Perbaikan strategi paling tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'meningkatkan kemampuan individu menggiring bola tanpa latihan operan' },
      { id: 'B', text: 'membiarkan pemain paling cepat menguasai seluruh permainan' },
      { id: 'C', text: 'membangun komunikasi, melakukan operan cepat, dan segera beralih dari menyerang ke bertahan' },
      { id: 'D', text: 'menempatkan semua pemain di dekat gawang lawan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-viii-3',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'pg',
    prompt:
      'Fikri menerima bola dekat daerah pertahanan lawan. Ia melihat penjaga gawang bergerak ke kiri sehingga sisi kanan gawang relatif terbuka. Tindakan tepat adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'mengarahkan tembakan ke ruang gawang yang terbuka dengan tetap memperhatikan posisi dan keseimbangan tubuh' },
      { id: 'B', text: 'menembak sekuat mungkin tanpa memperhatikan arah' },
      { id: 'C', text: 'menunggu sampai semua pemain lawan berkumpul' },
      { id: 'D', text: 'mengoper bola ke penjaga gawang lawan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-viii-4',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 4,
    type: 'pg',
    prompt:
      'Tim VIII-C menerapkan serangan dengan hanya mengandalkan satu pemain. Ketika pemain tersebut dijaga ketat, tim tidak mampu menciptakan peluang. Strategi tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'tetap mengandalkan pemain utama agar terbiasa menghadapi tekanan' },
      { id: 'B', text: 'menghentikan pergerakan pemain lain agar tidak mengganggu' },
      { id: 'C', text: 'mengganti semua pemain penyerang dengan pemain bertahan' },
      { id: 'D', text: 'mengembangkan variasi serangan, pergerakan tanpa bola, dan distribusi operan' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'pjok-viii-5',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 5,
    type: 'pg',
    prompt:
      'Pada menit terakhir pertandingan bola tangan, tim VIII-D unggul satu gol. Lawan meningkatkan tekanan dan berusaha merebut bola. Keputusan taktis paling efektif adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'melakukan tembakan dari jarak jauh setiap kali menerima bola' },
      { id: 'B', text: 'menjaga penguasaan bola melalui operan aman, memanfaatkan ruang, dan menghindari kesalahan' },
      { id: 'C', text: 'menggiring bola ke tengah kerumunan pemain lawan' },
      { id: 'D', text: 'sengaja melakukan pelanggaran agar waktu pertandingan berhenti' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-viii-6',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 6,
    type: 'pg',
    prompt:
      'Ketika menerima servis keras, pemain libero tim VIII-A melakukan passing bawah, tetapi bola melambung terlalu jauh ke belakang sehingga setter kesulitan melakukan umpan. Kesalahan yang kemungkinan terjadi adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'posisi tubuh terlalu rendah dan arah bidang pantul tidak terkontrol' },
      { id: 'B', text: 'pemain menggunakan passing bawah untuk menerima servis' },
      { id: 'C', text: 'pemain menekuk lutut saat menerima bola' },
      { id: 'D', text: 'pemain mengarahkan bola kepada setter' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-viii-7',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 7,
    type: 'pg',
    prompt:
      'Tim VIII-B memiliki pemain yang mampu melakukan smash keras. Namun, sebagian besar smash dapat diblok lawan karena arah serangan selalu menuju area yang sama. Solusi taktis tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'meningkatkan kekuatan smash saja' },
      { id: 'B', text: 'mengurangi jumlah pemain yang melakukan serangan' },
      { id: 'C', text: 'memvariasikan arah serangan, melakukan tip, dan memanfaatkan area kosong' },
      { id: 'D', text: 'selalu melakukan smash ke pemain blok tertinggi' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-viii-8',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 8,
    type: 'pg',
    prompt:
      'Dalam rally bola voli, bola pertama diterima dengan passing bawah dan diarahkan kepada setter. Setter kemudian mengumpan bola kepada pemain depan yang akan menyerang. Peran utama setter adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'menjaga bola agar tidak melewati garis lapangan' },
      { id: 'B', text: 'mengatur umpan agar penyerang dapat melakukan serangan efektif' },
      { id: 'C', text: 'menggantikan seluruh tugas pemain bertahan' },
      { id: 'D', text: 'melakukan servis setiap kali terjadi rally' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-viii-9',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 9,
    type: 'pg',
    prompt:
      'Tim VIII-C sering kehilangan poin karena tiga pemain berada di area yang sama ketika bola datang. Area lain tidak terjaga. Analisis perbaikan tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'semua pemain bergerak mengikuti bola secara bersamaan' },
      { id: 'B', text: 'pemain depan tidak perlu ikut bertahan' },
      { id: 'C', text: 'pemain mempertahankan posisi awal tanpa bergerak' },
      { id: 'D', text: 'mengatur pembagian area tanggung jawab, komunikasi, dan rotasi posisi sesuai situasi permainan' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'pjok-viii-10',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 10,
    type: 'pg',
    prompt:
      'Tim VIII-D menghadapi lawan dengan blok tinggi dan kuat. Penyerang sering gagal karena selalu melakukan smash keras tepat di atas blok. Strategi lebih efektif adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'melakukan variasi serangan seperti mengarahkan bola ke sudut atau tip di belakang blok' },
      { id: 'B', text: 'melakukan smash lebih keras tanpa mengubah arah' },
      { id: 'C', text: 'menghentikan serangan dan hanya melakukan passing' },
      { id: 'D', text: 'mengarahkan seluruh serangan kepada pemain blok' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-viii-11',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 11,
    type: 'pg',
    prompt:
      'Nadia memiliki kecepatan awalan yang baik dalam lompat jauh. Namun, ia sering kehilangan kecepatan sebelum papan tolakan karena memperpendek langkah secara berlebihan. Cara memperbaiki adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'menghentikan lari sebelum papan tolakan' },
      { id: 'B', text: 'mempercepat langkah secara tidak teratur' },
      { id: 'C', text: 'melatih konsistensi awalan dan menyesuaikan langkah agar mencapai papan tolakan dengan tepat' },
      { id: 'D', text: 'mengurangi kecepatan sejak awal awalan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-viii-12',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 12,
    type: 'pg',
    prompt:
      'Seorang siswa melakukan lompatan jauh, tetapi ketika mendarat, kedua kakinya berada di depan tubuh dan badannya jatuh ke belakang sehingga meninggalkan bekas jatuh di belakang titik pendaratan kaki. Dampaknya adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'jarak lompatan bertambah karena tubuh jatuh ke belakang' },
      { id: 'B', text: 'jarak lompatan dapat berkurang karena titik jatuh tubuh menjadi bagian pengukuran' },
      { id: 'C', text: 'lompatan otomatis menjadi sah dengan jarak lebih jauh' },
      { id: 'D', text: 'tidak memengaruhi hasil pengukuran' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-viii-13',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 13,
    type: 'pg',
    prompt:
      'Dalam latihan lompat jauh, guru meminta siswa mengembangkan kemampuan tolakan. Siswa berlatih melompat dari satu kaki setelah melakukan awalan pendek. Tujuan utama latihan adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'meningkatkan kemampuan tolakan dan koordinasi gerak' },
      { id: 'B', text: 'mengurangi kemampuan berlari' },
      { id: 'C', text: 'melatih siswa mendarat dengan satu kaki saja' },
      { id: 'D', text: 'menghilangkan kebutuhan melakukan awalan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-viii-14',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 14,
    type: 'pg',
    prompt:
      'Riko meletakkan peluru jauh dari leher dan mengayunkan tangan ke belakang seperti gerakan melempar bola. Perbaikan teknik adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'menempatkan peluru dekat leher atau bahu dan melakukan gerakan menolak' },
      { id: 'B', text: 'meletakkan peluru di pinggang lalu menendangnya' },
      { id: 'C', text: 'menggunakan kedua tangan untuk melempar peluru' },
      { id: 'D', text: 'melempar peluru dari belakang kepala' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-viii-15',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 15,
    type: 'pg',
    prompt:
      'Dalam latihan tolak peluru, siswa mampu menghasilkan tolakan cukup jauh dengan tenaga lengan, tetapi hasil tidak konsisten. Posisi kaki, putaran badan, dan arah tolakan berubah-ubah. Kesimpulan tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'hasil tolak peluru hanya dipengaruhi kekuatan lengan' },
      { id: 'B', text: 'gerakan kaki dan badan tidak penting' },
      { id: 'C', text: 'konsistensi teknik dan koordinasi seluruh tubuh memengaruhi hasil tolakan' },
      { id: 'D', text: 'siswa sebaiknya tidak menggunakan gerakan kaki' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-viii-16',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 16,
    type: 'pg',
    prompt:
      'Dalam latihan lempar lembing, siswa melakukan awalan dengan kecepatan tinggi, tetapi lembing dilepaskan terlalu rendah sehingga segera jatuh. Perbaikan tepat adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'memperlambat gerakan tanpa memperhatikan teknik' },
      { id: 'B', text: 'memperbaiki posisi lembing, sudut pelepasan, dan koordinasi awalan dengan gerakan melempar' },
      { id: 'C', text: 'melempar lembing menggunakan dua tangan' },
      { id: 'D', text: 'menghilangkan awalan sepenuhnya' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-viii-17',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 17,
    type: 'pg',
    prompt:
      'Atlet pemula kesulitan menghasilkan lemparan lembing jauh. Kecepatan awalan cukup, tetapi gerakan melempar dilakukan hanya menggunakan lengan tanpa koordinasi badan. Faktor teknik yang perlu diperbaiki adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'koordinasi awalan, posisi badan, gerakan lengan, dan pelepasan lembing' },
      { id: 'B', text: 'memperbesar langkah tanpa memperhatikan gerakan melempar' },
      { id: 'C', text: 'mengurangi gerakan badan agar lembing lebih ringan' },
      { id: 'D', text: 'mengubah lembing menjadi alat yang lebih pendek' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-viii-18',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 18,
    type: 'pg',
    prompt:
      'Sari melakukan putaran badan sebelum melepaskan cakram. Namun, ia kehilangan keseimbangan dan keluar dari area lempar sebelum cakram mendarat. Hal yang harus diperbaiki adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'mempercepat putaran tanpa latihan keseimbangan' },
      { id: 'B', text: 'melakukan putaran dengan kontrol, menjaga keseimbangan, dan mengikuti aturan sektor lempar' },
      { id: 'C', text: 'melempar cakram menggunakan dua tangan' },
      { id: 'D', text: 'melompat keluar dari area lempar setelah cakram dilepaskan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-viii-19',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 19,
    type: 'pg',
    prompt:
      'Dua siswa melakukan lempar cakram. Siswa pertama memiliki kekuatan lengan lebih besar, tetapi putarannya kurang terkoordinasi. Siswa kedua memiliki kekuatan sedang, tetapi gerak kaki, badan, dan lengan berurutan. Kemungkinan hasil lebih baik siswa kedua karena ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'kekuatan lengan tidak diperlukan' },
      { id: 'B', text: 'cakram hanya dipengaruhi berat badan' },
      { id: 'C', text: 'koordinasi gerak dan pemanfaatan momentum berkontribusi terhadap kecepatan pelepasan cakram' },
      { id: 'D', text: 'gerakan putaran tidak berpengaruh terhadap jarak' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-viii-20',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 20,
    type: 'pg',
    prompt:
      'Dalam kegiatan atletik, beberapa siswa mampu menghasilkan lemparan jauh, tetapi sering melanggar batas area dan mengambil cakram ketika siswa lain masih melempar. Prioritas perbaikan adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'hanya meningkatkan jarak lemparan' },
      { id: 'B', text: 'mengutamakan kecepatan latihan tanpa aturan' },
      { id: 'C', text: 'mengurangi pengawasan agar siswa lebih mandiri' },
      { id: 'D', text: 'menggabungkan penguasaan teknik, aturan, disiplin, dan prosedur keselamatan' }
    ],
    correctAnswers: ['D']
  },

  // -----------------------------------------------------------------------
  // B. PILIHAN GANDA KOMPLEKS (No. 21 - 26, 3 poin/soal = 18 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-viii-21',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 21,
    type: 'pg_kompleks',
    prompt:
      'Dalam pertandingan bola tangan, tim VIII-A kesulitan mempertahankan penguasaan bola ketika lawan melakukan tekanan. Strategi tepat adalah ....',
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'melakukan operan cepat kepada rekan yang berada pada posisi bebas' },
      { id: 'B', text: 'memanfaatkan pergerakan tanpa bola untuk membuka ruang' },
      { id: 'C', text: 'menggiring bola selama mungkin agar lawan kelelahan' },
      { id: 'D', text: 'membangun komunikasi dan kerja sama dalam serangan' },
      { id: 'E', text: 'membiarkan pemain yang membawa bola menghadapi semua lawan sendiri' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pjok-viii-22',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 22,
    type: 'pg_kompleks',
    prompt:
      'Tim VIII-B menghadapi lawan dengan servis keras dan smash terarah. Tim sering kehilangan poin karena penerimaan bola dan koordinasi pertahanan kurang baik. Upaya tepat adalah ....',
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'melatih passing bawah untuk menerima servis dan bola serangan' },
      { id: 'B', text: 'memperbaiki pembagian tanggung jawab area pertahanan' },
      { id: 'C', text: 'menghindari komunikasi agar pemain fokus sendiri' },
      { id: 'D', text: 'melakukan latihan antisipasi arah bola dan posisi siap' },
      { id: 'E', text: 'mengembangkan kerja sama penerima, setter, dan penyerang' }
    ],
    correctAnswers: ['A', 'B', 'D', 'E']
  },
  {
    id: 'pjok-viii-23',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 23,
    type: 'pg_kompleks',
    prompt:
      'Dalam latihan lompat jauh, siswa ingin meningkatkan hasil lompatan melalui perbaikan teknik. Tindakan tepat adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'melatih awalan secara konsisten' },
      { id: 'B', text: 'melakukan tolakan dengan satu kaki' },
      { id: 'C', text: 'memperhatikan ketepatan papan tolakan' },
      { id: 'D', text: 'menjaga posisi tubuh saat melayang' },
      { id: 'E', text: 'mendarat dengan posisi tubuh jatuh ke belakang' }
    ],
    correctAnswers: ['A', 'B', 'C', 'D']
  },
  {
    id: 'pjok-viii-24',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 24,
    type: 'pg_kompleks',
    prompt:
      'Guru mengamati hasil tolakan siswa kurang maksimal karena gerakan hanya dilakukan dengan lengan. Hal yang perlu diperbaiki adalah ....',
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'memanfaatkan dorongan kaki' },
      { id: 'B', text: 'mengoordinasikan gerakan badan dan lengan' },
      { id: 'C', text: 'menempatkan peluru dekat leher atau bahu sesuai teknik' },
      { id: 'D', text: 'melempar peluru seperti melempar bola' },
      { id: 'E', text: 'menjaga keseimbangan dan arah tolakan' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },
  {
    id: 'pjok-viii-25',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 25,
    type: 'pg_kompleks',
    prompt:
      'Dalam pembelajaran lempar lembing, siswa perlu mengembangkan teknik sekaligus memperhatikan keselamatan. Pernyataan tepat adalah ....',
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'awalan harus disesuaikan kemampuan dan penguasaan teknik' },
      { id: 'B', text: 'lembing diarahkan ke sektor lempar yang ditentukan' },
      { id: 'C', text: 'lembing boleh dilempar ke arah teman untuk latihan ketepatan' },
      { id: 'D', text: 'gerakan awalan, badan, dan lengan perlu dikoordinasikan' },
      { id: 'E', text: 'lembing diambil ketika teman masih melakukan lemparan' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pjok-viii-26',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 26,
    type: 'pg_kompleks',
    prompt:
      'Dalam latihan lempar cakram, siswa kesulitan mengontrol arah lemparan dan keseimbangan saat putaran. Upaya tepat adalah ....',
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'melakukan latihan keseimbangan dan koordinasi gerak' },
      { id: 'B', text: 'melatih putaran badan secara bertahap' },
      { id: 'C', text: 'memperhatikan posisi kaki dan arah pelepasan cakram' },
      { id: 'D', text: 'meningkatkan kecepatan putaran tanpa menguasai teknik' },
      { id: 'E', text: 'melakukan latihan teknik dengan pengawasan dan area aman' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },

  // -----------------------------------------------------------------------
  // C. MENJODOHKAN (Naskah No. 27 - 32 -> 1 Butir dengan 6 Pasangan = 6 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-viii-27',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 27,
    type: 'mencocokkan',
    prompt: 'Pasangkan pernyataan pada Kolom A dengan konsep yang tepat pada Kolom B!',
    points: 6,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      {
        id: 'p-1',
        leftText: 'Pemain bola tangan mengoper kepada rekan yang berada pada posisi bebas untuk menghindari penjagaan lawan.',
        rightText: 'Distribusi bola dan pemanfaatan ruang'
      },
      {
        id: 'p-2',
        leftText: 'Pemain bola voli mengarahkan passing pertama kepada setter agar serangan dapat dibangun.',
        rightText: 'Passing penerimaan'
      },
      {
        id: 'p-3',
        leftText: 'Pelompat mengatur langkah awalan dan melakukan tolakan pada papan dengan tepat.',
        rightText: 'Ketepatan awalan dan tolakan'
      },
      {
        id: 'p-4',
        leftText: 'Atlet mendorong peluru dari dekat bahu dengan melibatkan gerakan kaki dan badan.',
        rightText: 'Teknik menolak peluru'
      },
      {
        id: 'p-5',
        leftText: 'Atlet mengatur posisi lembing dan arah pelepasan agar lembing terbang dengan baik.',
        rightText: 'Sudut pelepasan'
      },
      {
        id: 'p-6',
        leftText: 'Atlet melakukan putaran badan dan mengoordinasikan kaki serta lengan ketika melepaskan cakram.',
        rightText: 'Momentum dan koordinasi tubuh'
      }
    ],
    matchingRightOptions: [
      'Sudut pelepasan',
      'Momentum dan koordinasi tubuh',
      'Distribusi bola dan pemanfaatan ruang',
      'Passing penerimaan',
      'Ketepatan awalan dan tolakan',
      'Teknik menolak peluru'
    ]
  },

  // -----------------------------------------------------------------------
  // D. BENAR ATAU SALAH (Naskah No. 33 - 35 -> CBT No. 28 - 30, 2 poin/soal = 6 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-viii-28',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 28,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nDalam permainan bola tangan, pemain yang tidak sedang menguasai bola tetap memiliki peran penting. Pergerakan tanpa bola, mencari ruang kosong, dan memberikan pilihan operan dapat membantu tim mempertahankan serangan.',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'pjok-viii-29',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 29,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nDalam permainan bola voli, pemain yang melakukan passing pertama harus selalu mengarahkan bola langsung melewati net agar tim memperoleh poin lebih cepat. Mengarahkan bola kepada setter tidak diperlukan karena dapat memperlambat serangan.',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },
  {
    id: 'pjok-viii-30',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 30,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah:\n\nDalam latihan lempar lembing dan lempar cakram, keberhasilan latihan tidak hanya ditentukan oleh jauhnya lemparan, tetapi juga oleh penguasaan teknik, kedisiplinan, dan penerapan prosedur keselamatan.',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },

  // -----------------------------------------------------------------------
  // E. URAIAN / ESAI (Naskah No. 36 - 40 -> CBT No. 31 - 35, 6 poin/soal = 30 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-viii-31',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 31,
    type: 'uraian',
    prompt:
      'Permainan Bola Tangan: Dalam sebuah pertandingan antarkelas, tim VIII-A memiliki pemain yang cukup terampil menggiring dan menembak bola. Namun, tim tersebut selalu kalah dalam penguasaan bola karena pemain terlalu sering melakukan serangan individu. Ketika bola direbut lawan, pemain juga lambat kembali ke posisi bertahan. Berdasarkan situasi tersebut:\na) Analisislah dua penyebab utama kelemahan permainan tim VIII-A!\nb) Rancanglah strategi penyerangan yang lebih efektif!\nc) Jelaskan bagaimana transisi dari menyerang ke bertahan dapat membantu tim mengurangi peluang lawan mencetak gol!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Bola Tangan): a) Serangan terlalu individual, komunikasi/operan kurang, pemain tanpa bola tidak bergerak, transisi bertahan lambat. b) Variasi operan, pergerakan tanpa bola, mencari ruang, dan serangan terencana. c) Setelah kehilangan bola, pemain segera kembali ke posisi, menutup ruang, dan membantu pertahanan. (Skor maksimal 6.)'
  },
  {
    id: 'pjok-viii-32',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 32,
    type: 'uraian',
    prompt:
      'Permainan Bola Voli: Tim VIII-B sedang mengikuti pertandingan bola voli antarkelas. Tim tersebut memiliki kemampuan smash yang baik, tetapi sering kehilangan poin karena penerimaan servis kurang akurat, setter kesulitan mengatur umpan, dan penyerang selalu melakukan smash ke arah yang sama.\na) Analisis hubungan antara kualitas passing pertama, umpan setter, dan keberhasilan serangan!\nb) Jelaskan dua strategi untuk mengatasi blok lawan yang kuat!\nc) Buat rancangan latihan sederhana untuk meningkatkan kerja sama tim dalam menerima servis dan membangun serangan!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Bola Voli): a) Passing pertama yang akurat memudahkan setter memberi umpan berkualitas sehingga penyerang dapat menyerang efektif. b) Variasi arah smash, tip, menyerang ruang kosong, mengubah tempo. c) Latihan penerimaan servis berkelompok, target passing kepada setter, dilanjutkan pola tiga sentuhan dan komunikasi. (Skor maksimal 6.)'
  },
  {
    id: 'pjok-viii-33',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 33,
    type: 'uraian',
    prompt:
      'Lompat Jauh: Dina dan Rani mengikuti perlombaan lompat jauh. Dina memiliki kecepatan awalan tinggi, tetapi sering melewati papan tolakan. Rani memiliki awalan lebih terkontrol dan tolakan tepat, tetapi ketika mendarat tubuhnya jatuh ke belakang sehingga hasil pengukuran menjadi lebih pendek.\na) Analisis kesalahan teknik Dina dan Rani!\nb) Jelaskan bagaimana awalan, tolakan, fase melayang, dan pendaratan saling memengaruhi hasil lompat jauh!\nc) Buat program latihan sederhana untuk membantu kedua siswa memperbaiki teknik!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Lompat Jauh): a) Dina kurang konsisten mengatur awalan dan melanggar papan; Rani kurang teknik pendaratan dan jatuh ke belakang. b) Awalan membangun kecepatan, tolakan mengubah kecepatan menjadi lompatan, fase melayang menjaga posisi, pendaratan menentukan titik pengukuran. c) Latihan awalan bertanda, tolakan satu kaki, ayunan lengan, fase melayang, dan pendaratan ke bak pasir. (Skor maksimal 6.)'
  },
  {
    id: 'pjok-viii-34',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 34,
    type: 'uraian',
    prompt:
      'Tolak Peluru dan Lempar Lembing: Dalam pembelajaran atletik, siswa kelas VIII melakukan latihan tolak peluru dan lempar lembing. Sebagian siswa menganggap kedua nomor hanya membutuhkan kekuatan lengan. Akibatnya, teknik kurang terkoordinasi dan beberapa siswa latihan tanpa memperhatikan area keselamatan.\na) Analisis perbedaan prinsip gerak pada tolak peluru dan lempar lembing!\nb) Jelaskan mengapa koordinasi gerak kaki, badan, dan lengan penting dalam kedua nomor!\nc) Buat tiga rekomendasi untuk meningkatkan kualitas latihan sekaligus menjaga keselamatan siswa!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Tolak Peluru & Lembing): a) Tolak peluru adalah gerak mendorong peluru dari dekat bahu; lembing adalah gerak melempar lembing dengan awalan dan pelepasan terarah. b) Kaki menghasilkan tenaga, badan meneruskan momentum, lengan mengontrol alat dan pelepasan. c) Area lempar harus kosong, arah lempar ditetapkan, menunggu aba-aba, mengambil alat setelah semua selesai, latihan diawasi guru. (Skor maksimal 6.)'
  },
  {
    id: 'pjok-viii-35',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-8',
    grade: 'VIII',
    number: 35,
    type: 'uraian',
    prompt:
      'Lempar Cakram: Bayu mengikuti latihan lempar cakram. Ia memiliki kekuatan lengan cukup baik, tetapi hasil lemparannya belum maksimal. Ketika melakukan putaran, posisi kaki kurang stabil, gerakan badan tidak terkoordinasi, dan arah pelepasan cakram kurang tepat. Bayu juga beberapa kali keluar dari area lempar sebelum gerakan selesai.\na) Analisis faktor teknik yang menyebabkan hasil lemparan Bayu kurang maksimal!\nb) Jelaskan hubungan keseimbangan, putaran tubuh, koordinasi gerak, dan arah pelepasan cakram dengan hasil lemparan!\nc) Rancang tiga bentuk latihan untuk meningkatkan teknik dan keselamatan dalam lempar cakram!',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Pedoman Jawaban (Lempar Cakram): a) Keseimbangan tidak stabil, putaran kurang terkoordinasi, arah pelepasan tidak tepat, pelanggaran area. b) Keseimbangan memungkinkan putaran terkontrol; koordinasi menghasilkan momentum; arah/sudut pelepasan memengaruhi lintasan dan jarak. c) Latihan keseimbangan, putaran bertahap tanpa cakram, koordinasi kaki-badan-lengan, pelepasan dengan alat ringan/aman di sektor yang kosong. (Skor maksimal 6.)'
  }
];
