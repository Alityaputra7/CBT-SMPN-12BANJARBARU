import { Question } from '../types/cbt';

// =========================================================================
// PENDIDIKAN PANCASILA (PPKn) KELAS IX — ULANGAN SEMESTER GANJIL 2026-2027
// Sumber: Soal PPKn kelas 9 kunci 2026.pdf (30 Soal: 12 PG + 15 PGK + 3 Menjodohkan)
// Gambar pendukung: ppkn_kelas9_no29_30.png (No. 29 & No. 30)
// =========================================================================
export const PPKN_KELAS_9_QUESTIONS: Question[] = [
  // =========================================================================
  // A. PILIHAN GANDA (NO. 1–5)
  // =========================================================================
  {
    id: 'ppkn-ix-1',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 1,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pancasila merupakan dasar negara Indonesia. Nilai-nilai Pancasila menjadi pedoman dalam penyelenggaraan negara, termasuk dalam penyusunan peraturan perundang-undangan. Sementara itu, UUD NRI Tahun 1945 merupakan hukum dasar tertulis negara Indonesia.

Berdasarkan bacaan tersebut, hubungan Pancasila dengan UUD NRI Tahun 1945 adalah ....`,
    options: [
      { id: 'A', text: 'Pancasila merupakan bagian dari pasal-pasal UUD NRI Tahun 1945.' },
      { id: 'B', text: 'UUD NRI Tahun 1945 menjadi dasar dalam menggantikan Pancasila.' },
      { id: 'C', text: 'Pancasila menjadi dasar nilai dalam penyusunan UUD NRI Tahun 1945.' },
      { id: 'D', text: 'Pancasila dan UUD NRI Tahun 1945 memiliki kedudukan yang sama sebagai hukum tertulis.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ppkn-ix-2',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 2,
    points: 5,
    difficulty: 'mudah',
    prompt: `Di sebuah sekolah, terdapat siswa yang berasal dari berbagai suku dan daerah. Ketika mengerjakan tugas kelompok, beberapa siswa menolak bekerja sama dengan teman yang berbeda suku. Akibatnya, kelompok tersebut mengalami kesulitan menyelesaikan tugas.

Sikap yang seharusnya dilakukan berdasarkan hubungan Pancasila dengan Bhinneka Tunggal Ika adalah ....`,
    options: [
      { id: 'A', text: 'Memilih teman kelompok yang berasal dari daerah yang sama.' },
      { id: 'B', text: 'Menghargai perbedaan dan bekerja sama tanpa membedakan asal daerah.' },
      { id: 'C', text: 'Membiarkan setiap siswa bekerja sendiri sesuai keinginannya.' },
      { id: 'D', text: 'Mengutamakan kebiasaan suku sendiri dalam setiap kegiatan kelompok.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ppkn-ix-3',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 3,
    points: 5,
    difficulty: 'mudah',
    prompt: `Setiap warga negara memiliki hak dan kewajiban yang harus dilaksanakan secara seimbang. Hak merupakan sesuatu yang seharusnya diterima seseorang, sedangkan kewajiban merupakan sesuatu yang harus dilaksanakan dengan penuh tanggung jawab.

Contoh pelaksanaan hak dan kewajiban siswa di sekolah secara berurutan adalah ....`,
    options: [
      { id: 'A', text: 'Mendapatkan pelajaran dari guru dan menaati tata tertib sekolah.' },
      { id: 'B', text: 'Mengerjakan tugas dan mendapatkan nilai dari guru.' },
      { id: 'C', text: 'Menjaga kebersihan kelas dan mengikuti upacara bendera.' },
      { id: 'D', text: 'Membantu teman belajar dan melaksanakan piket kelas.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ppkn-ix-4',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 4,
    points: 5,
    difficulty: 'sedang',
    prompt: `Bacalah beberapa pernyataan berikut!
1. Setiap pekerja berhak memperoleh upah yang layak sesuai pekerjaan yang dilakukannya.
2. Setiap warga negara wajib mengikuti pendidikan dasar.
3. Setiap warga negara berhak memperoleh pekerjaan dan penghidupan yang layak.
4. Setiap warga negara memiliki kedudukan yang sama di hadapan hukum.

Berdasarkan pernyataan tersebut, yang merupakan perwujudan hak warga negara sesuai Pasal 27 ayat (2) UUD NRI Tahun 1945 ditunjukkan oleh ....`,
    options: [
      { id: 'A', text: 'Pernyataan 1 dan 2.' },
      { id: 'B', text: 'Pernyataan 1 dan 3.' },
      { id: 'C', text: 'Pernyataan 2 dan 4.' },
      { id: 'D', text: 'Pernyataan 3 dan 4.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ppkn-ix-5',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 5,
    points: 5,
    difficulty: 'mudah',
    prompt: `Di sebuah lingkungan masyarakat, terdapat warga yang selalu menuntut agar fasilitas umum diperbaiki oleh pemerintah. Namun, ketika diadakan kegiatan kerja bakti untuk membersihkan lingkungan, sebagian warga tidak mau ikut serta. Mereka menganggap kebersihan lingkungan sepenuhnya merupakan tanggung jawab pemerintah.

Permasalahan tersebut menunjukkan bahwa ....`,
    options: [
      { id: 'A', text: 'Pemerintah tidak perlu memenuhi kebutuhan masyarakat apabila warga tidak ikut bekerja bakti.' },
      { id: 'B', text: 'Hak warga negara lebih penting daripada kewajiban dalam kehidupan bermasyarakat.' },
      { id: 'C', text: 'Warga negara cukup menuntut hak tanpa harus memperhatikan kewajibannya.' },
      { id: 'D', text: 'Pemenuhan hak perlu diimbangi dengan pelaksanaan kewajiban dan tanggung jawab warga negara.' }
    ],
    correctAnswers: ['D']
  },

  // =========================================================================
  // PILIHAN GANDA KOMPLEKS (PGK) (NO. 6–8)
  // =========================================================================
  {
    id: 'ppkn-ix-6',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 6,
    points: 5,
    difficulty: 'mudah',
    prompt: `Petunjuk: Pilihlah lebih dari satu jawaban yang benar!

Setiap anggota keluarga memiliki hak dan kewajiban. Dalam kehidupan sehari-hari, pelaksanaan hak dan kewajiban perlu dilakukan secara seimbang agar tercipta suasana keluarga yang harmonis.

Berikut ini yang termasuk contoh pelaksanaan hak dan kewajiban di rumah adalah ....`,
    options: [
      { id: 'A', text: 'Anak memperoleh kasih sayang dan perlindungan dari orang tua.' },
      { id: 'B', text: 'Anak membiarkan orang tua mengerjakan seluruh pekerjaan rumah.' },
      { id: 'C', text: 'Anak mendapatkan kesempatan untuk menyampaikan pendapat kepada keluarga.' },
      { id: 'D', text: 'Anak membantu menjaga kebersihan rumah sesuai kemampuannya.' },
      { id: 'E', text: 'Anak menuntut semua keinginannya harus dipenuhi oleh orang tua.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-ix-7',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 7,
    points: 5,
    difficulty: 'sedang',
    prompt: `UUD NRI Tahun 1945 mengatur berbagai hak warga negara. Hak tersebut antara lain berkaitan dengan pekerjaan, pendidikan, kehidupan, perlindungan anak, kebebasan beragama, dan kebebasan menyampaikan pendapat.

Pernyataan yang sesuai dengan pasal-pasal UUD NRI Tahun 1945 berikut adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Pasal 27 ayat (2) mengatur hak warga negara untuk mendapatkan pekerjaan dan penghidupan yang layak.' },
      { id: 'B', text: 'Pasal 28A mengatur hak setiap orang untuk hidup serta mempertahankan kehidupannya.' },
      { id: 'C', text: 'Pasal 28E ayat (3) mengatur kebebasan setiap orang untuk memeluk agama dan beribadah.' },
      { id: 'D', text: 'Pasal 29 ayat (2) menjamin kemerdekaan setiap penduduk untuk memeluk agama dan beribadah.' },
      { id: 'E', text: 'Pasal 31 ayat (1) mengatur kewajiban setiap warga negara untuk membiayai pendidikan seluruh masyarakat.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'ppkn-ix-8',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 8,
    points: 5,
    difficulty: 'sedang',
    prompt: `Dalam kehidupan bernegara, pemenuhan hak warga negara masih menghadapi berbagai permasalahan. Misalnya, masih terdapat anak yang kesulitan memperoleh pendidikan, pekerja yang mendapatkan upah tidak layak, serta masyarakat yang mengalami perlakuan tidak adil.

Berdasarkan permasalahan tersebut, upaya yang tepat untuk meningkatkan pemenuhan hak dan pelaksanaan kewajiban warga negara adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Pemerintah meningkatkan pemerataan akses pendidikan bagi seluruh masyarakat.' },
      { id: 'B', text: 'Masyarakat hanya menuntut hak tanpa perlu menaati peraturan yang berlaku.' },
      { id: 'C', text: 'Pemerintah memberikan perlindungan hukum dan menjamin perlakuan yang adil bagi warga negara.' },
      { id: 'D', text: 'Setiap warga negara melaksanakan kewajibannya sesuai peraturan yang berlaku.' },
      { id: 'E', text: 'Pemenuhan hak hanya diberikan kepada masyarakat yang tinggal di perkotaan.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },

  // =========================================================================
  // MENJODOHKAN (NO. 9–10)
  // =========================================================================
  {
    id: 'ppkn-ix-9',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'mencocokkan',
    number: 9,
    points: 5,
    difficulty: 'sedang',
    prompt: `Petunjuk: Pasangkan pernyataan pada Kolom I dengan ketentuan dalam UUD NRI Tahun 1945 pada Kolom II yang tepat. Pilihan jawaban tersedia lebih banyak daripada jumlah pernyataan.`,
    options: [],
    matchingPairs: [
      { id: 'ppkn-ix-9-p1', leftText: '1. Hak untuk mendapatkan pendidikan.', rightText: 'B. Pasal 31 ayat (1)' },
      { id: 'ppkn-ix-9-p2', leftText: '2. Hak untuk memeluk agama dan beribadah.', rightText: 'D. Pasal 29 ayat (2)' },
      { id: 'ppkn-ix-9-p3', leftText: '3. Hak untuk hidup dan mempertahankan kehidupan.', rightText: 'A. Pasal 28A' },
      { id: 'ppkn-ix-9-p4', leftText: '4. Hak untuk berserikat, berkumpul, dan mengeluarkan pendapat.', rightText: 'C. Pasal 28E ayat (3)' }
    ],
    matchingRightOptions: [
      'A. Pasal 28A',
      'B. Pasal 31 ayat (1)',
      'C. Pasal 28E ayat (3)',
      'D. Pasal 29 ayat (2)',
      'E. Pasal 27 ayat (2)'
    ],
    essayRubric: 'Kunci: 1.B, 2.D, 3.A, 4.C'
  },
  {
    id: 'ppkn-ix-10',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'mencocokkan',
    number: 10,
    points: 5,
    difficulty: 'sedang',
    prompt: `Petunjuk: Bacalah setiap ilustrasi berikut. Pasangkan peristiwa pada Kolom I dengan pasal UUD NRI Tahun 1945 yang sesuai pada Kolom II.`,
    options: [],
    matchingPairs: [
      {
        id: 'ppkn-ix-10-p1',
        leftText: '1. Rina mendapatkan perlindungan dari orang tuanya agar dapat tumbuh dan berkembang serta terhindar dari kekerasan.',
        rightText: 'B. Pasal 28B ayat (2)'
      },
      {
        id: 'ppkn-ix-10-p2',
        leftText: '2. Budi mendapatkan perlakuan yang adil dan kepastian hukum ketika keluarganya menyelesaikan suatu permasalahan melalui jalur hukum.',
        rightText: 'A. Pasal 28D ayat (1)'
      },
      {
        id: 'ppkn-ix-10-p3',
        leftText: '3. Siti menjalankan ibadah sesuai dengan agama yang dianutnya dan mendapatkan perlindungan untuk melaksanakan ibadah tersebut.',
        rightText: 'C. Pasal 28E ayat (1)'
      },
      {
        id: 'ppkn-ix-10-p4',
        leftText: '4. Ayah Andi memperoleh pekerjaan dan penghasilan yang layak untuk memenuhi kebutuhan keluarganya.',
        rightText: 'D. Pasal 27 ayat (2)'
      }
    ],
    matchingRightOptions: [
      'A. Pasal 28D ayat (1)',
      'B. Pasal 28B ayat (2)',
      'C. Pasal 28E ayat (1)',
      'D. Pasal 27 ayat (2)',
      'E. Pasal 28A'
    ],
    essayRubric: 'Kunci: 1.B, 2.A, 3.C, 4.D'
  },

  // =========================================================================
  // PILIHAN GANDA (NO. 11–17)
  // =========================================================================
  {
    id: 'ppkn-ix-11',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 11,
    points: 5,
    difficulty: 'mudah',
    prompt: `Ketika terjadi keributan antarkelompok warga di suatu lingkungan, masyarakat melaporkan kejadian tersebut kepada pihak kepolisian. Polisi kemudian datang untuk menjaga keamanan dan ketertiban serta menangani permasalahan sesuai hukum yang berlaku.

Berdasarkan ilustrasi tersebut, tugas utama Kepolisian Republik Indonesia (Polri) adalah ....`,
    options: [
      { id: 'A', text: 'memberikan bantuan hukum kepada terdakwa di pengadilan.' },
      { id: 'B', text: 'memutuskan hukuman bagi pelaku pelanggaran hukum.' },
      { id: 'C', text: 'memelihara keamanan dan ketertiban serta menegakkan hukum.' },
      { id: 'D', text: 'menentukan apakah suatu perkara harus diputus oleh hakim.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ppkn-ix-12',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 12,
    points: 5,
    difficulty: 'mudah',
    prompt: `Sebuah perkara dugaan tindak pidana telah selesai diperiksa dan dikumpulkan alat buktinya. Selanjutnya, perkara tersebut akan diproses untuk menentukan apakah dapat diajukan ke pengadilan.

Lembaga yang memiliki kewenangan utama dalam bidang penuntutan adalah ....`,
    options: [
      { id: 'A', text: 'Kepolisian Republik Indonesia.' },
      { id: 'B', text: 'Kejaksaan.' },
      { id: 'C', text: 'Advokat.' },
      { id: 'D', text: 'Hakim.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ppkn-ix-13',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 13,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pak Ahmad dan keluarganya sedang menyelesaikan permasalahan pembagian harta warisan. Mereka membutuhkan lembaga peradilan yang berwenang menangani perkara waris antara orang-orang yang beragama Islam.

Lembaga peradilan yang tepat untuk menangani perkara tersebut adalah ....`,
    options: [
      { id: 'A', text: 'Peradilan Militer.' },
      { id: 'B', text: 'Peradilan Umum.' },
      { id: 'C', text: 'Peradilan Tata Usaha Negara.' },
      { id: 'D', text: 'Peradilan Agama.' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ppkn-ix-14',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 14,
    points: 5,
    difficulty: 'mudah',
    prompt: `Dalam kegiatan diskusi kelas, seorang siswa menyampaikan gagasan mengenai pentingnya menjaga kebersihan sekolah. Ia diberikan kesempatan untuk berbicara dan teman-temannya mendengarkan pendapat tersebut.

Peristiwa tersebut merupakan contoh pelaksanaan kemerdekaan berpendapat, yaitu ....`,
    options: [
      { id: 'A', text: 'hak setiap orang untuk menyampaikan ide dan pemikirannya secara lisan maupun tulisan.' },
      { id: 'B', text: 'kewajiban setiap orang untuk mengikuti seluruh pendapat orang lain.' },
      { id: 'C', text: 'kebebasan menyampaikan pendapat tanpa memperhatikan aturan.' },
      { id: 'D', text: 'hak seseorang untuk memaksakan pendapatnya kepada orang lain.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ppkn-ix-15',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 15,
    points: 5,
    difficulty: 'mudah',
    prompt: `Ketua OSIS ingin menyampaikan usulan kepada kepala sekolah mengenai penambahan tempat sampah di lingkungan sekolah. Ia membuat tulisan berisi usulan tersebut dan memasukkannya ke dalam kotak saran.

Bentuk penyampaian pendapat yang dilakukan ketua OSIS tersebut adalah ....`,
    options: [
      { id: 'A', text: 'pidato.' },
      { id: 'B', text: 'dialog.' },
      { id: 'C', text: 'tertulis.' },
      { id: 'D', text: 'wawancara.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ppkn-ix-16',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 16,
    points: 5,
    difficulty: 'sedang',
    prompt: `Sekelompok masyarakat berencana menyampaikan aspirasi di muka umum. Mereka ingin kegiatan tersebut berlangsung dengan aman dan tertib. Namun, mereka belum mengetahui tempat-tempat yang dilarang untuk digunakan sebagai lokasi penyampaian pendapat.

Berdasarkan ketentuan dalam buku, tempat yang tidak boleh digunakan untuk penyampaian pendapat di muka umum adalah ....`,
    options: [
      { id: 'A', text: 'lapangan terbuka dan taman kota.' },
      { id: 'B', text: 'lingkungan istana kepresidenan dan tempat ibadah.' },
      { id: 'C', text: 'halaman gedung pertemuan umum dan alun-alun.' },
      { id: 'D', text: 'lapangan olahraga dan halaman balai warga.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ppkn-ix-17',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg',
    number: 17,
    points: 5,
    difficulty: 'mudah',
    prompt: `Pada awal tahun ajaran baru, sekolah memberikan kesempatan kepada seluruh siswa untuk mengikuti pembelajaran dan menggunakan fasilitas pendidikan tanpa membeda-bedakan latar belakang keluarga. Riko merasa bersyukur karena mendapatkan kesempatan belajar yang sama dengan teman-temannya. Ia berusaha mengikuti pelajaran dengan sungguh-sungguh, mengerjakan tugas, dan menaati aturan sekolah.

Berdasarkan kasus tersebut, contoh keseimbangan pelaksanaan hak dan kewajiban dalam bidang pendidikan adalah ....`,
    options: [
      { id: 'A', text: 'Mendapatkan perlakuan yang sama di hadapan hukum dan menaati setiap peraturan perundang-undangan yang berlaku.' },
      { id: 'B', text: 'Mendapatkan jaminan keamanan dan kenyamanan, serta melaksanakan upaya bela negara sesuai dengan perannya sebagai peserta didik.' },
      { id: 'C', text: 'Mendapatkan kesejahteraan, kesempatan dalam bekerja dan berusaha, serta mencintai produk dalam negeri.' },
      { id: 'D', text: 'Mendapatkan layanan pendidikan yang sama di sekolah dan belajar dengan sungguh-sungguh.' }
    ],
    correctAnswers: ['D']
  },

  // =========================================================================
  // SOAL PILIHAN GANDA KOMPLEKS (PGK) (NO. 18–23)
  // =========================================================================
  {
    id: 'ppkn-ix-18',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 18,
    points: 5,
    difficulty: 'sedang',
    prompt: `Petunjuk: Pilihlah lebih dari satu jawaban yang benar!

Dalam kehidupan masyarakat, terdapat berbagai lembaga yang memiliki tugas berbeda dalam penegakan hukum. Setiap lembaga menjalankan kewenangannya sesuai dengan peraturan perundang-undangan.

Pernyataan yang tepat mengenai tugas lembaga penegak hukum adalah ....`,
    options: [
      { id: 'A', text: 'Polri bertugas memelihara keamanan dan ketertiban masyarakat.' },
      { id: 'B', text: 'Kejaksaan bertugas memberikan jasa bantuan hukum kepada terdakwa.' },
      { id: 'C', text: 'Hakim memiliki kewenangan untuk mengadili perkara dalam persidangan.' },
      { id: 'D', text: 'Advokat bertugas memberikan jasa hukum kepada orang yang membutuhkan bantuan hukum.' },
      { id: 'E', text: 'Hakim bertugas melakukan patroli untuk menjaga keamanan lingkungan.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-ix-19',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 19,
    points: 5,
    difficulty: 'sedang',
    prompt: `Perhatikan beberapa peristiwa berikut!
1. Seorang warga mengajukan perkara pidana karena mengalami pencurian.
2. Sebuah keluarga Muslim menyelesaikan perkara pembagian warisan.
3. Seorang anggota militer menghadapi perkara tindak pidana yang berkaitan dengan tugas kemiliterannya.
4. Seorang warga mengajukan gugatan mengenai keputusan tata usaha negara.

Berdasarkan peristiwa tersebut, pasangan peristiwa dan lembaga peradilan yang tepat adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Peristiwa 1 ditangani oleh Peradilan Umum.' },
      { id: 'B', text: 'Peristiwa 2 ditangani oleh Peradilan Militer.' },
      { id: 'C', text: 'Peristiwa 2 ditangani oleh Peradilan Agama.' },
      { id: 'D', text: 'Peristiwa 3 ditangani oleh Peradilan Militer.' },
      { id: 'E', text: 'Peristiwa 4 ditangani oleh Peradilan Agama.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-ix-20',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 20,
    points: 5,
    difficulty: 'mudah',
    prompt: `Di sebuah sekolah, beberapa siswa mengalami kesulitan mengikuti pembelajaran karena fasilitas belajar kurang memadai. Pemerintah kemudian memberikan bantuan untuk mendukung pemenuhan hak pendidikan bagi siswa.

Pernyataan yang tepat berkaitan dengan pemenuhan hak dan kewajiban warga negara adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Mendapatkan pendidikan merupakan hak warga negara.' },
      { id: 'B', text: 'Pemerintah tidak memiliki tanggung jawab dalam pemenuhan hak pendidikan.' },
      { id: 'C', text: 'Warga negara memiliki kewajiban untuk menaati peraturan yang berlaku.' },
      { id: 'D', text: 'Pemenuhan hak pendidikan hanya menjadi tanggung jawab keluarga.' },
      { id: 'E', text: 'Pemerintah dapat berupaya meningkatkan pemerataan pelayanan pendidikan.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ppkn-ix-21',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 21,
    points: 5,
    difficulty: 'mudah',
    prompt: `Di lingkungan masyarakat, masih ditemukan beberapa permasalahan, seperti masyarakat yang kurang mendapatkan pelayanan kesehatan, fasilitas umum yang rusak, dan sebagian warga tidak menaati peraturan yang berlaku.

Tindakan yang dapat dilakukan untuk mengatasi permasalahan tersebut adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Pemerintah meningkatkan pemerataan pelayanan kesehatan.' },
      { id: 'B', text: 'Masyarakat ikut menjaga fasilitas umum yang telah disediakan.' },
      { id: 'C', text: 'Warga mengabaikan peraturan karena merasa memiliki hak.' },
      { id: 'D', text: 'Pemerintah memberikan pelayanan hanya kepada kelompok tertentu.' },
      { id: 'E', text: 'Masyarakat dan pemerintah bekerja sama dalam memenuhi hak dan melaksanakan kewajiban.' }
    ],
    correctAnswers: ['A', 'B', 'E']
  },
  {
    id: 'ppkn-ix-22',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 22,
    points: 5,
    difficulty: 'mudah',
    prompt: `Nadia dan teman-temannya sering menyampaikan pendapat melalui berbagai kegiatan. Ada yang menyampaikan gagasan melalui diskusi kelas, membuat poster, dan menulis surat kepada pihak sekolah.

Berdasarkan ilustrasi tersebut, yang termasuk bentuk penyampaian pendapat secara lisan adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Pidato.' },
      { id: 'B', text: 'Poster.' },
      { id: 'C', text: 'Wawancara.' },
      { id: 'D', text: 'Dialog.' },
      { id: 'E', text: 'Selebaran.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-ix-23',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 23,
    points: 5,
    difficulty: 'mudah',
    prompt: `Kemerdekaan berpendapat merupakan hak warga negara. Namun, dalam pelaksanaannya, setiap orang tetap harus memperhatikan hak orang lain dan aturan yang berlaku.

Perilaku yang sesuai dengan kewajiban dalam menyampaikan pendapat adalah ....
(Pilihlah lebih dari satu jawaban yang benar!)`,
    options: [
      { id: 'A', text: 'Menghormati hak dan kebebasan orang lain.' },
      { id: 'B', text: 'Menyampaikan pendapat dengan menggunakan kata-kata yang menghina.' },
      { id: 'C', text: 'Menaati hukum dan peraturan perundang-undangan.' },
      { id: 'D', text: 'Menjaga keamanan dan ketertiban umum.' },
      { id: 'E', text: 'Menyebarkan informasi yang belum diketahui kebenarannya.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },

  // =========================================================================
  // C. MENJODOHKAN (NO. 24)
  // =========================================================================
  {
    id: 'ppkn-ix-24',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'mencocokkan',
    number: 24,
    points: 5,
    difficulty: 'sedang',
    prompt: `Petunjuk: Pasangkan pernyataan pada Kolom I dengan pilihan jawaban pada Kolom II yang tepat.`,
    options: [],
    matchingPairs: [
      {
        id: 'ppkn-ix-24-p1',
        leftText: '1. Lembaga yang bertugas memelihara keamanan dan ketertiban serta memberikan perlindungan kepada masyarakat.',
        rightText: 'F. Kepolisian Republik Indonesia (Polri)'
      },
      {
        id: 'ppkn-ix-24-p2',
        leftText: '2. Lembaga pemerintah yang melaksanakan kekuasaan negara di bidang penuntutan.',
        rightText: 'D. Kejaksaan'
      },
      {
        id: 'ppkn-ix-24-p3',
        leftText: '3. Pejabat yang memiliki kewenangan untuk mengadili seseorang yang melanggar hukum.',
        rightText: 'C. Hakim'
      },
      {
        id: 'ppkn-ix-24-p4',
        leftText: '4. Profesi yang memberikan jasa hukum dan bantuan hukum kepada orang yang membutuhkan.',
        rightText: 'A. Advokat'
      },
      {
        id: 'ppkn-ix-24-p5',
        leftText: '5. Lembaga peradilan yang menangani perkara tertentu antara orang-orang beragama Islam, seperti perkawinan dan waris.',
        rightText: 'E. Peradilan Agama'
      }
    ],
    matchingRightOptions: [
      'A. Advokat',
      'B. Peradilan Umum',
      'C. Hakim',
      'D. Kejaksaan',
      'E. Peradilan Agama',
      'F. Kepolisian Republik Indonesia (Polri)'
    ],
    essayRubric: 'Kunci jawaban: 1-F, 2-D, 3-C, 4-A, 5-E'
  },

  // =========================================================================
  // SOAL PGK & PGK ANALISIS (NO. 25–30)
  // =========================================================================
  {
    id: 'ppkn-ix-25',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 25,
    points: 5,
    difficulty: 'sedang',
    prompt: `Petunjuk: Bacalah setiap kasus dengan teliti. Pilihlah lebih dari satu pernyataan yang benar berdasarkan kasus tersebut!

Pada awal tahun pelajaran, Rafi terpilih menjadi ketua kelas. Ia menemukan beberapa permasalahan, seperti LCD kelas yang rusak dan jaringan internet yang sering mengalami gangguan. Teman-temannya mengusulkan agar permasalahan tersebut disampaikan kepada kepala sekolah.

Rafi kemudian mengajak teman-temannya membuat surat berisi keluhan dan usulan perbaikan. Surat tersebut disusun dengan bahasa yang sopan dan disertai alasan yang jelas.

Berdasarkan kasus tersebut, pernyataan yang tepat adalah ....`,
    options: [
      { id: 'A', text: 'Rafi dan teman-temannya sedang melaksanakan hak menyampaikan pendapat.' },
      { id: 'B', text: 'Rafi tidak boleh menyampaikan keluhan karena masih berstatus sebagai siswa.' },
      { id: 'C', text: 'Surat kepada kepala sekolah merupakan salah satu bentuk penyampaian pendapat secara tertulis.' },
      { id: 'D', text: 'Pendapat harus disampaikan dengan bahasa yang sopan dan bertanggung jawab.' },
      { id: 'E', text: 'Setiap pendapat siswa harus selalu diterima tanpa pertimbangan oleh kepala sekolah.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ppkn-ix-26',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 26,
    points: 5,
    difficulty: 'sedang',
    prompt: `Sekelompok masyarakat ingin menyampaikan aspirasi mengenai kondisi jalan yang rusak di daerah mereka. Mereka berencana melakukan penyampaian pendapat di muka umum agar pemerintah memperhatikan permasalahan tersebut.

Sebelum kegiatan dilaksanakan, mereka mempelajari ketentuan mengenai tempat dan waktu penyampaian pendapat.

Berdasarkan kasus tersebut, pernyataan yang benar adalah ....
(Pilihlah lebih dari satu pernyataan yang benar!)`,
    options: [
      { id: 'A', text: 'Masyarakat berhak menyampaikan aspirasi kepada pemerintah.' },
      { id: 'B', text: 'Penyampaian pendapat dapat dilakukan di lingkungan istana kepresidenan.' },
      { id: 'C', text: 'Penyampaian pendapat harus memperhatikan ketentuan tempat dan waktu yang berlaku.' },
      { id: 'D', text: 'Penyampaian pendapat pada malam hari diperbolehkan selama dilakukan secara berkelompok.' },
      { id: 'E', text: 'Penyampaian pendapat harus memperhatikan keamanan dan ketertiban umum.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ppkn-ix-27',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 27,
    points: 5,
    difficulty: 'sedang',
    prompt: `Seorang siswa mengunggah kritik mengenai fasilitas sekolah melalui media sosial. Ia menyampaikan bahwa beberapa meja dan kursi kelas sudah rusak sehingga mengganggu kenyamanan belajar. Namun, dalam unggahannya, siswa tersebut menggunakan kata-kata yang menghina dan menyebut nama beberapa orang.

Teman-temannya kemudian menyarankan agar kritik tersebut disampaikan dengan cara yang lebih baik.

Berdasarkan kasus tersebut, tindakan yang tepat adalah ....
(Pilihlah lebih dari satu pernyataan yang benar!)`,
    options: [
      { id: 'A', text: 'Tetap menyampaikan kritik dengan bahasa yang santun dan tidak menghina orang lain.' },
      { id: 'B', text: 'Menghapus seluruh kritik karena siswa tidak memiliki hak untuk menyampaikan pendapat.' },
      { id: 'C', text: 'Menyampaikan kritik berdasarkan keadaan yang sebenarnya dan disertai alasan yang jelas.' },
      { id: 'D', text: 'Menggunakan media sosial untuk menyebarkan hinaan agar pihak sekolah segera memperbaiki fasilitas.' },
      { id: 'E', text: 'Menghormati hak orang lain dan bertanggung jawab atas pendapat yang disampaikan.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ppkn-ix-28',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 28,
    points: 5,
    difficulty: 'sedang',
    prompt: `Dalam kehidupan bernegara, setiap warga negara memiliki hak dan kewajiban yang harus dilaksanakan secara seimbang. Salah satu kewajiban tersebut telah diatur dalam UUD NRI Tahun 1945.

Perhatikan beberapa pernyataan berikut!
Kewajiban warga negara yang tercantum dalam UUD NRI Tahun 1945 ditunjukkan oleh ....
(Pilihlah lebih dari satu pernyataan yang benar!)`,
    options: [
      { id: 'A', text: 'Mendapat pendidikan dan pengajaran.' },
      { id: 'B', text: 'Mengikuti berbagai upaya pembelaan negara.' },
      { id: 'C', text: 'Mendapat penghidupan yang layak.' },
      { id: 'D', text: 'Menjalankan ibadah sesuai dengan keyakinan.' },
      { id: 'E', text: 'Menghormati hak asasi manusia orang lain dalam kehidupan bermasyarakat.' }
    ],
    correctAnswers: ['B', 'E']
  },
  {
    id: 'ppkn-ix-29',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 29,
    points: 5,
    difficulty: 'sukar',
    imageUrl: '/images/soal/ppkn_kelas9_no29_30.png',
    prompt: `Berdasarkan informasi pada teks berita tersebut, terdapat hubungan antara hak dan kewajiban dalam bidang pendidikan. Pernyataan berikut yang menunjukkan pihak penerima hak dan pihak yang menunaikan kewajiban adalah ....
(Pilihlah lebih dari satu pernyataan yang benar!)`,
    options: [
      { id: 'A', text: 'Siswa SMA/SMK negeri dan swasta merupakan pihak yang menerima manfaat dari program pendidikan gratis.' },
      { id: 'B', text: 'Pemerintah Provinsi Jawa Timur telah berupaya menunaikan kewajibannya dengan menganggarkan biaya pendidikan bagi siswa.' },
      { id: 'C', text: 'Siswa SMA/SMK berkewajiban menyediakan anggaran pemerintah untuk membiayai pendidikan.' },
      { id: 'D', text: 'Pemerintah Provinsi Jawa Timur merupakan pihak yang menerima hak berupa pembebasan biaya SPP.' },
      { id: 'E', text: 'Pihak sekolah berkewajiban memberikan bantuan anggaran kepada pemerintah untuk membiayai pendidikan siswa.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'ppkn-ix-30',
    bankId: 'qbank-ppkn',
    subjectId: 'sbj-ppkn',
    classId: 'cls-9',
    grade: 'IX',
    type: 'pg_kompleks',
    number: 30,
    points: 5,
    difficulty: 'sukar',
    imageUrl: '/images/soal/ppkn_kelas9_no29_30.png',
    prompt: `Pemerintah Provinsi Jawa Timur menganggarkan Rp904,19 miliar untuk membantu biaya pendidikan siswa SMA/SMK. Menurut pendapatmu, alasan yang tepat bagi pemerintah untuk menganggarkan dana tersebut adalah ....
(Pilihlah lebih dari satu pernyataan yang benar!)`,
    options: [
      { id: 'A', text: 'Membantu meringankan beban ekonomi orang tua dalam memenuhi kebutuhan biaya pendidikan anak.' },
      { id: 'B', text: 'Memberikan kesempatan kepada siswa untuk memperoleh pendidikan tanpa terlalu terbebani biaya SPP.' },
      { id: 'C', text: 'Mengalihkan seluruh tanggung jawab pembiayaan pendidikan dari orang tua kepada pihak sekolah.' },
      { id: 'D', text: 'Memberikan subsidi biaya SPP maupun seragam kepada siswa SMA/SMK negeri dan swasta.' },
      { id: 'E', text: 'Menunjukkan upaya pemerintah dalam mendukung pemenuhan hak warga negara untuk memperoleh pendidikan.' }
    ],
    correctAnswers: ['A', 'B', 'D', 'E']
  }
];
