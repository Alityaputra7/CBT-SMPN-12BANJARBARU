import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI UJIAN AKHIR SEMESTER (UAS) PJOK KELAS IX SMP
// Sumber: UAS_PJOK_Kelas_IX_Semester_Ganjil_40_Soal_2d4808ed.pdf
// 40 Nomor Soal Naskah -> 36 Butir CBT (Total Skor = 100, sesuai Hal. 11: 70 Objektif + 30 Uraian):
// - A. 20 Pilihan Ganda (No. 1-20) x 2 poin = 40 poin
// - B. 5 Pilihan Ganda Kompleks (No. 21-25) x 3 poin = 15 poin
// - C. 1 Mencocokkan (5 Pasangan, Naskah No. 26-30) = 10 poin
// - D. 5 Benar-Salah (Naskah No. 31-35) x 1 poin = 5 poin
// - E. 5 Uraian / Esai (Naskah No. 36-40) x 6 poin = 30 poin
// Total = 100 poin (70 objektif + 30 uraian)
// =========================================================================

export const PJOK_KELAS_9_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // A. PILIHAN GANDA (No. 1 - 20, 2 poin/soal = 40 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-ix-1',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt:
      'Bola Tangan – Analisis Serangan\nDalam pertandingan bola tangan antarkelas, tim IX A mengalami kesulitan mencetak gol. Pemain yang membawa bola selalu mencoba menembus pertahanan lawan seorang diri sehingga sering kehilangan bola. Guru kemudian meminta pemain untuk mengamati posisi tiga rekannya sebelum menentukan tindakan.\n\nTindakan yang paling tepat untuk memperbaiki pola serangan tersebut adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'membawa bola sendiri sampai mendekati gawang' },
      { id: 'B', text: 'melakukan operan kepada pemain yang berada pada posisi paling menguntungkan' },
      { id: 'C', text: 'melempar bola keluar lapangan ketika sulit menyerang' },
      { id: 'D', text: 'menunggu semua pemain berkumpul di dekat gawang' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-2',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 2,
    type: 'pg',
    prompt:
      'Bola Tangan – Pengambilan Keputusan\nDimas membawa bola menuju daerah pertahanan lawan. Dua pemain bertahan mendekatinya dari arah kanan dan kiri. Pada saat yang sama, seorang temannya berada tanpa penjagaan di sisi kiri lapangan.\n\nKeputusan Dimas yang paling efektif adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'tetap menggiring bola di antara dua pemain bertahan' },
      { id: 'B', text: 'menghentikan permainan dan menunggu lawan menjauh' },
      { id: 'C', text: 'mengoper bola kepada temannya yang tidak dijaga' },
      { id: 'D', text: 'melempar bola langsung ke arah gawang dari tengah lapangan' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pjok-ix-3',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 3,
    type: 'pg',
    prompt:
      'Bola Tangan – Strategi Bertahan\nDalam pertandingan, tim IX B sering kebobolan karena pemain bertahan hanya memperhatikan pemain yang membawa bola. Pemain lawan kemudian memanfaatkan ruang kosong di belakang pertahanan.\n\nPerubahan strategi yang paling tepat adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'semua pemain bertahan mengejar pembawa bola' },
      { id: 'B', text: 'pemain bertahan menjaga ruang sekaligus memperhatikan pergerakan lawan' },
      { id: 'C', text: 'seluruh pemain bertahan berdiri di depan gawang' },
      { id: 'D', text: 'hanya penjaga gawang yang bertugas menghentikan serangan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-4',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 4,
    type: 'pg',
    prompt:
      'Bola Tangan – Peraturan\nSaat pertandingan berlangsung, seorang pemain bola tangan membawa bola sambil berlari beberapa langkah tanpa melakukan dribbling atau mengoper kepada temannya. Wasit kemudian menghentikan permainan.\n\nPelanggaran tersebut berkaitan dengan ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'teknik shooting' },
      { id: 'B', text: 'aturan langkah dalam permainan' },
      { id: 'C', text: 'pergantian pemain' },
      { id: 'D', text: 'lemparan ke dalam' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-5',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 5,
    type: 'pg',
    prompt:
      'Bola Tangan – Evaluasi Teknik\nSeorang siswa melakukan lemparan ke arah gawang berkali-kali, tetapi bola sering melambung melewati mistar. Setelah diamati, posisi tubuhnya terlalu condong ke belakang saat melakukan lemparan.\n\nPerbaikan yang paling tepat adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'semakin mencondongkan tubuh ke belakang' },
      { id: 'B', text: 'memperbaiki keseimbangan dan koordinasi tubuh saat melempar' },
      { id: 'C', text: 'mengurangi kekuatan tangan sebanyak mungkin' },
      { id: 'D', text: 'menutup mata saat bola dilepaskan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-6',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 6,
    type: 'pg',
    prompt:
      'Bola Tangan – Kerja Sama Tim\nPemain A memiliki peluang melakukan shooting. Namun, pemain B berada lebih dekat dengan gawang dan tidak dijaga lawan.\n\nJika tujuan utama tim adalah meningkatkan peluang mencetak gol, keputusan terbaik pemain A adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'melakukan shooting karena dirinya sudah membawa bola' },
      { id: 'B', text: 'mengoper kepada pemain B' },
      { id: 'C', text: 'menggiring bola menjauhi gawang' },
      { id: 'D', text: 'menghentikan serangan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-7',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 7,
    type: 'pg',
    prompt:
      'Bola Voli – Analisis Penerimaan\nLawan melakukan servis keras ke arah belakang lapangan. Pemain penerima berdiri terlalu dekat dengan net sehingga kesulitan menerima bola.\n\nPenyesuaian posisi yang paling tepat adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'bergerak lebih dekat ke net' },
      { id: 'B', text: 'mundur dan menyesuaikan posisi dengan arah datangnya bola' },
      { id: 'C', text: 'membelakangi bola' },
      { id: 'D', text: 'tetap diam karena bola merupakan tanggung jawab server' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-8',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 8,
    type: 'pg',
    prompt:
      'Bola Voli – Pengambilan Keputusan\nSebuah tim menerima servis lawan dengan baik. Bola kemudian diarahkan kepada setter. Setter melihat dua pilihan: melakukan umpan tinggi kepada pemain sayap atau umpan cepat kepada pemain tengah. Jika pemain tengah berada dalam posisi siap dan blok lawan belum terbentuk, pilihan yang paling strategis adalah ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'memberikan umpan cepat kepada pemain tengah' },
      { id: 'B', text: 'mengembalikan bola langsung ke lawan' },
      { id: 'C', text: 'melakukan servis' },
      { id: 'D', text: 'meminta permainan dihentikan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-ix-9',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 9,
    type: 'pg',
    prompt:
      'Bola Voli – Evaluasi Passing\nSaat melakukan passing bawah, seorang siswa sering membuat bola melambung terlalu tinggi dan tidak terarah. Setelah diamati, kedua lengannya tidak membentuk bidang pantul yang stabil.\n\nPerbaikan yang paling tepat adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'menggunakan satu tangan saja' },
      { id: 'B', text: 'merapatkan dan menstabilkan kedua lengan sebagai bidang pantul' },
      { id: 'C', text: 'memukul bola sekeras mungkin' },
      { id: 'D', text: 'menekuk kedua tangan secara berlebihan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-10',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 10,
    type: 'pg',
    prompt:
      'Bola Voli – Strategi Pertahanan\nTim IX C menghadapi lawan yang memiliki pemain dengan smash sangat kuat dari posisi sayap. Pelatih meminta tim mengubah pola pertahanan.\n\nStrategi yang paling rasional adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'seluruh pemain berdiri di dekat net' },
      { id: 'B', text: 'memperkuat pertahanan pada area yang sering menjadi sasaran serangan' },
      { id: 'C', text: 'semua pemain berpindah ke belakang lapangan' },
      { id: 'D', text: 'mengabaikan pemain penyerang lawan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-11',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 11,
    type: 'pg',
    prompt:
      'Bola Voli – Rotasi\nDalam permainan bola voli, setelah sebuah tim memperoleh hak melakukan servis, para pemain melakukan rotasi sesuai ketentuan.\n\nTujuan utama rotasi tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'mengubah posisi pemain sesuai urutan yang ditentukan dalam permainan' },
      { id: 'B', text: 'mengganti seluruh pemain di lapangan' },
      { id: 'C', text: 'memberi kesempatan semua pemain menjadi libero' },
      { id: 'D', text: 'menghentikan serangan lawan secara otomatis' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-ix-12',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 12,
    type: 'pg',
    prompt:
      'Bola Voli – Analisis Kesalahan\nSebuah tim sering kehilangan poin karena pemain belakang maju terlalu jauh ketika bola berada di depan. Akibatnya, area belakang kosong dan mudah dimanfaatkan lawan.\n\nKesimpulan yang paling tepat adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'pemain perlu memahami pembagian area dan tanggung jawab posisi' },
      { id: 'B', text: 'semua pemain harus selalu berada di depan' },
      { id: 'C', text: 'pemain belakang tidak boleh bergerak sama sekali' },
      { id: 'D', text: 'pemain depan harus pindah ke belakang setiap bola datang' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-ix-13',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 13,
    type: 'pg',
    prompt:
      'Bola Voli – Serangan\nSebuah tim memiliki kesempatan melakukan serangan ketiga. Pemain yang akan melakukan smash melihat bahwa blok lawan hanya terdiri atas satu pemain.\n\nTindakan yang paling efektif adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'melakukan smash ke arah blok lawan tanpa memperhatikan posisi' },
      { id: 'B', text: 'mengarahkan serangan ke area kosong atau melewati blok yang lemah' },
      { id: 'C', text: 'membiarkan bola jatuh' },
      { id: 'D', text: 'melakukan servis dari dalam lapangan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-14',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 14,
    type: 'pg',
    prompt:
      'Bola Voli – Sportivitas\nDalam pertandingan antarkelas, seorang pemain mengetahui bahwa bola hasil pukulannya sebenarnya menyentuh tangannya sebelum keluar lapangan, tetapi wasit tidak melihat kejadian tersebut.\n\nSikap yang paling mencerminkan nilai sportivitas adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'diam agar tim memperoleh poin' },
      { id: 'B', text: 'mengakui bahwa bola menyentuh dirinya' },
      { id: 'C', text: 'menyalahkan wasit' },
      { id: 'D', text: 'meminta lawan menerima kekalahan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-15',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 15,
    type: 'pg',
    prompt:
      'Pencak Silat – Analisis Sikap\nSeorang pesilat menghadapi lawan yang memiliki jangkauan lebih panjang. Jika ia berdiri terlalu dekat tanpa memperhatikan jarak, ia akan mudah terkena serangan.\n\nStrategi yang paling tepat adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'menjaga jarak dan mengatur waktu masuk untuk melakukan serangan' },
      { id: 'B', text: 'berdiri diam di depan lawan' },
      { id: 'C', text: 'selalu bergerak mendekati lawan' },
      { id: 'D', text: 'membelakangi lawan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-ix-16',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 16,
    type: 'pg',
    prompt:
      'Pencak Silat – Serangan dan Pertahanan\nDalam latihan, seorang siswa langsung melakukan serangan tanpa memperhatikan posisi kaki dan keseimbangan tubuh. Akibatnya, ia mudah kehilangan keseimbangan setelah melakukan pukulan.\n\nKesalahan utama siswa tersebut adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'kurang memperhatikan keseimbangan dan koordinasi gerak' },
      { id: 'B', text: 'terlalu banyak melakukan pemanasan' },
      { id: 'C', text: 'terlalu memperhatikan posisi lawan' },
      { id: 'D', text: 'terlalu menjaga jarak' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-ix-17',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 17,
    type: 'pg',
    prompt:
      'Pencak Silat – Tangkisan\nSeorang siswa menghadapi serangan lurus dari lawan dalam latihan pencak silat. Ia mengarahkan lengannya untuk membendung arah serangan sehingga serangan lawan tidak mengenai sasaran.\n\nTeknik yang dilakukan siswa tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'tendangan' },
      { id: 'B', text: 'tangkisan' },
      { id: 'C', text: 'kuncian' },
      { id: 'D', text: 'sapuan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pjok-ix-18',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 18,
    type: 'pg',
    prompt:
      'Pencak Silat – Sikap Pasang\nDalam pertandingan pencak silat, sikap pasang diperlukan sebelum melakukan serangan maupun pertahanan.\n\nFungsi utama sikap pasang adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'mempersiapkan posisi tubuh agar siap menyerang atau bertahan' },
      { id: 'B', text: 'memperlambat gerakan pesilat' },
      { id: 'C', text: 'menunjukkan bahwa pertandingan telah selesai' },
      { id: 'D', text: 'menggantikan fungsi pemanasan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-ix-19',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 19,
    type: 'pg',
    prompt:
      'Pencak Silat – Nilai Karakter\nSetelah latihan pencak silat selesai, seorang siswa membantu temannya yang mengalami kesulitan memahami teknik tanpa merendahkan kemampuan temannya tersebut.\n\nSikap tersebut menunjukkan penerapan nilai ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'sportivitas dan kepedulian' },
      { id: 'B', text: 'agresivitas' },
      { id: 'C', text: 'individualisme' },
      { id: 'D', text: 'persaingan tidak sehat' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pjok-ix-20',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 20,
    type: 'pg',
    prompt:
      'Pencak Silat – Pengambilan Keputusan\nDalam latihan, lawan melakukan tendangan ke arah tubuh. Pesilat memiliki kesempatan untuk menghindar kemudian melakukan serangan balasan.\n\nUrutan tindakan yang paling tepat adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'menyerang terlebih dahulu tanpa memperhatikan tendangan' },
      { id: 'B', text: 'menghindar, menjaga keseimbangan, kemudian melakukan serangan balasan secara terkontrol' },
      { id: 'C', text: 'membelakangi lawan' },
      { id: 'D', text: 'menutup mata dan menunggu serangan berhenti' }
    ],
    correctAnswers: ['B']
  },

  // -----------------------------------------------------------------------
  // B. PILIHAN GANDA KOMPLEKS (No. 21 - 25, 3 poin/soal = 15 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-ix-21',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 21,
    type: 'pg_kompleks',
    prompt:
      'Bola Tangan – Strategi Serangan\nDalam permainan bola tangan, tim mengalami kesulitan menembus pertahanan lawan yang sangat rapat. Pilihlah semua jawaban yang benar!',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'melakukan pergerakan tanpa bola' },
      { id: 'B', text: 'melakukan operan secara cepat dan akurat' },
      { id: 'C', text: 'menciptakan ruang dengan perpindahan posisi' },
      { id: 'D', text: 'semua pemain membawa bola secara bersamaan' },
      { id: 'E', text: 'memanfaatkan pemain yang berada pada posisi bebas' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },
  {
    id: 'pjok-ix-22',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 22,
    type: 'pg_kompleks',
    prompt: 'Bola Tangan – Pertahanan\nKetika bertahan dalam permainan bola tangan, tindakan yang tepat adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'menjaga pemain lawan sesuai tugas' },
      { id: 'B', text: 'memperhatikan ruang yang dapat dimanfaatkan lawan' },
      { id: 'C', text: 'melakukan komunikasi dengan rekan satu tim' },
      { id: 'D', text: 'meninggalkan daerah pertahanan tanpa alasan' },
      { id: 'E', text: 'menyesuaikan posisi dengan arah serangan lawan' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },
  {
    id: 'pjok-ix-23',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 23,
    type: 'pg_kompleks',
    prompt:
      'Bola Voli – Membangun Serangan\nSebuah tim bola voli ingin membangun serangan yang efektif setelah menerima servis lawan. Tindakan yang tepat adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'menerima bola dengan passing yang terarah' },
      { id: 'B', text: 'mengarahkan bola kedua kepada setter' },
      { id: 'C', text: 'menyiapkan pemain untuk melakukan serangan' },
      { id: 'D', text: 'setiap pemain langsung melakukan smash' },
      { id: 'E', text: 'melakukan komunikasi antarpemain' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },
  {
    id: 'pjok-ix-24',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 24,
    type: 'pg_kompleks',
    prompt:
      'Bola Voli – Pertahanan\nTim lawan memiliki pemain yang sering melakukan smash keras dari sisi kiri. Tindakan yang dapat dilakukan tim bertahan adalah ....',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'memperhatikan pola serangan lawan' },
      { id: 'B', text: 'menyesuaikan posisi pemain bertahan' },
      { id: 'C', text: 'melakukan blocking sesuai arah serangan' },
      { id: 'D', text: 'membiarkan area yang sering diserang' },
      { id: 'E', text: 'meningkatkan komunikasi antarpemain' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },
  {
    id: 'pjok-ix-25',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 25,
    type: 'pg_kompleks',
    prompt: 'Pencak Silat – Prinsip Latihan\nAgar latihan pencak silat berjalan aman dan efektif, seorang siswa sebaiknya ....',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'melakukan pemanasan sebelum latihan' },
      { id: 'B', text: 'memahami teknik dasar sebelum melakukan teknik yang lebih kompleks' },
      { id: 'C', text: 'mengontrol kekuatan ketika berlatih dengan pasangan' },
      { id: 'D', text: 'menyerang pasangan sekuat mungkin' },
      { id: 'E', text: 'memperhatikan instruksi guru' }
    ],
    correctAnswers: ['A', 'B', 'C', 'E']
  },

  // -----------------------------------------------------------------------
  // C. MENCOCOKKAN (Naskah No. 26 - 30 -> 1 Butir dengan 5 Pasangan = 10 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-ix-26',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 26,
    type: 'mencocokkan',
    prompt: 'Pasangkan pernyataan pada Kolom A dengan jawaban yang tepat pada Kolom B!',
    points: 10,
    difficulty: 'mudah',
    options: [],
    matchingPairs: [
      { id: 'p-1', leftText: 'Teknik mengoper bola kepada rekan dalam permainan bola tangan.', rightText: 'Passing/operan' },
      { id: 'p-2', leftText: 'Teknik menerima bola menggunakan kedua lengan bagian bawah dalam bola voli.', rightText: 'Passing bawah' },
      { id: 'p-3', leftText: 'Teknik untuk membendung serangan lawan dalam pencak silat.', rightText: 'Tangkisan' },
      { id: 'p-4', leftText: 'Teknik memasukkan bola ke gawang dalam permainan bola tangan.', rightText: 'Shooting' },
      {
        id: 'p-5',
        leftText: 'Gerakan mengubah posisi pemain secara berurutan setelah memperoleh hak servis dalam bola voli.',
        rightText: 'Rotasi'
      }
    ],
    matchingRightOptions: ['Rotasi', 'Passing bawah', 'Tangkisan', 'Passing/operan', 'Shooting']
  },

  // -----------------------------------------------------------------------
  // D. BENAR – SALAH (Naskah No. 31 - 35 -> CBT No. 27 - 31, 1 poin/soal = 5 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-ix-27',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 27,
    type: 'benar_salah',
    prompt:
      'Bola Tangan — Tentukan apakah pernyataan berikut Benar atau Salah:\n\nDalam permainan bola tangan, kerja sama tim diperlukan karena pemain dapat menciptakan ruang dan peluang mencetak gol melalui pergerakan serta operan.',
    points: 1,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'pjok-ix-28',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 28,
    type: 'benar_salah',
    prompt:
      'Bola Tangan — Tentukan apakah pernyataan berikut Benar atau Salah:\n\nSeorang pemain yang membawa bola sebaiknya selalu mempertahankan bola sendiri agar lawan tidak memiliki kesempatan merebut bola.',
    points: 1,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },
  {
    id: 'pjok-ix-29',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 29,
    type: 'benar_salah',
    prompt:
      'Bola Voli — Tentukan apakah pernyataan berikut Benar atau Salah:\n\nPassing dalam bola voli tidak hanya bertujuan menyelamatkan bola, tetapi juga dapat digunakan untuk membangun pola serangan yang terorganisasi.',
    points: 1,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'pjok-ix-30',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 30,
    type: 'benar_salah',
    prompt:
      'Pencak Silat — Tentukan apakah pernyataan berikut Benar atau Salah:\n\nDalam pencak silat, kemampuan menjaga keseimbangan tubuh penting karena gerakan menyerang dan bertahan membutuhkan kontrol tubuh yang baik.',
    points: 1,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'pjok-ix-31',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 31,
    type: 'benar_salah',
    prompt:
      'Sportivitas — Tentukan apakah pernyataan berikut Benar atau Salah:\n\nMengakui kesalahan sendiri dalam pertandingan meskipun dapat menyebabkan tim kehilangan keuntungan merupakan salah satu bentuk sportivitas.',
    points: 1,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },

  // -----------------------------------------------------------------------
  // E. URAIAN / ESAI (Naskah No. 36 - 40 -> CBT No. 32 - 36, 6 poin/soal = 30 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pjok-ix-32',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 32,
    type: 'uraian',
    prompt:
      'Bola Tangan – Analisis Strategi\nDalam pertandingan bola tangan, tim IX A unggul satu gol. Waktu pertandingan tersisa dua menit. Pemain yang membawa bola terus menggiring bola sendiri untuk mempertahankan keunggulan. Akibatnya, pemain tersebut kehilangan bola dan lawan berhasil melakukan serangan balik.\n\nMenurut Anda, apa kesalahan strategi yang dilakukan pemain tersebut? Jelaskan strategi yang seharusnya dilakukan tim untuk mempertahankan keunggulan.',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Rubrik Uraian (Skor Maksimal 6): Dinilai berdasarkan ketepatan konsep, kemampuan analisis, alasan, dan solusi — kesalahan bermain individual/terlalu lama menggiring bola; solusi menjaga penguasaan bola melalui operan aman, memanfaatkan ruang kosong, komunikasi tim, dan menjaga transisi bertahan.'
  },
  {
    id: 'pjok-ix-33',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 33,
    type: 'uraian',
    prompt:
      'Bola Voli – Pemecahan Masalah\nTim IX B sering kehilangan poin karena setiap menerima servis lawan, bola pertama tidak dapat diarahkan kepada setter. Setelah diamati, para pemain sering berdiri terlalu berdekatan dan tidak berkomunikasi.\n\nAnalisislah dua penyebab utama masalah tersebut dan jelaskan solusi yang dapat dilakukan agar penerimaan servis menjadi lebih efektif.',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Rubrik Uraian (Skor Maksimal 6): Dinilai berdasarkan ketepatan konsep, kemampuan analisis, alasan, dan solusi — dua penyebab utama (posisi berdekatan/pembagian area tidak merata & kurang komunikasi); solusi membagi area tanggung jawab, meningkatkan komunikasi antarpemain, dan melatih passing bawah terarah kepada setter.'
  },
  {
    id: 'pjok-ix-34',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 34,
    type: 'uraian',
    prompt:
      'Bola Voli – Analisis Permainan\nDalam sebuah pertandingan, seorang pemain melakukan smash dengan sangat keras, tetapi sebagian besar smash dapat diblok oleh lawan.\n\nJika Anda menjadi pelatih tim tersebut, perubahan strategi apa yang akan Anda sarankan? Jelaskan alasan Anda.',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Rubrik Uraian (Skor Maksimal 6): Dinilai berdasarkan ketepatan konsep, kemampuan analisis, alasan, dan solusi — memvariasikan arah smash ke area kosong/sudut, melakukan tip/penempatan bola di belakang blok, serta mengubah tempo serangan dengan umpan cepat agar blok lawan sulit menebak arah pukulan.'
  },
  {
    id: 'pjok-ix-35',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 35,
    type: 'uraian',
    prompt:
      'Pencak Silat – Analisis Gerak\nSaat latihan pencak silat, seorang siswa memiliki pukulan yang cukup kuat, tetapi sering kehilangan keseimbangan setelah melakukan serangan. Ia juga cenderung terburu-buru melakukan serangan tanpa memperhatikan posisi lawan.\n\nAnalisislah kesalahan siswa tersebut dan jelaskan latihan atau perbaikan teknik yang dapat dilakukan agar serangannya lebih efektif dan terkontrol.',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Rubrik Uraian (Skor Maksimal 6): Dinilai berdasarkan ketepatan konsep, kemampuan analisis, alasan, dan solusi — kesalahan kurang menguasai sikap kuda-kuda/keseimbangan, koordinasi gerak, dan pengaturan jarak/timing; solusi melatih sikap pasang, kuda-kuda yang kokoh, kontrol napas dan gerakan, serta membaca posisi lawan sebelum menyerang.'
  },
  {
    id: 'pjok-ix-36',
    bankId: 'qbank-pjok',
    subjectId: 'sbj-pjok',
    classId: 'cls-9',
    grade: 'IX',
    number: 36,
    type: 'uraian',
    prompt:
      'Integrasi Materi – HOTS\nDalam olahraga bola tangan, bola voli, maupun pencak silat, kemampuan fisik saja tidak selalu menentukan keberhasilan seseorang. Pemain atau pesilat juga harus mampu membaca situasi, mengambil keputusan, mengontrol emosi, dan bekerja sama atau beradaptasi dengan lawan.\n\nMenurut pendapat Anda, mengapa kemampuan mengambil keputusan penting dalam ketiga aktivitas olahraga tersebut? Berikan masing-masing satu contoh penerapannya dalam bola tangan, bola voli, dan pencak silat.',
    points: 6,
    difficulty: 'sukar',
    options: [],
    essayRubric:
      'Rubrik Uraian (Skor Maksimal 6): Dinilai berdasarkan ketepatan konsep, kemampuan analisis, alasan, dan solusi — menjelaskan pentingnya pengambilan keputusan cepat dan tepat sesuai situasi pertandingan, disertai masing-masing 1 contoh konkret pada bola tangan (memilih operan vs shooting), bola voli (memilih arah umpan/serangan), dan pencak silat (memilih menghindar/tangkisan lalu serangan balik).'
  }
];
