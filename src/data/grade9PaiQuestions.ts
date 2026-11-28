import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI PENDIDIKAN AGAMA ISLAM KELAS IX SMPN 12 BANJARBARU
// Sumber: PAI_KELAS_9_87aa8d83.pdf (30 Soal Lengkap, Total Skor = 100)
// Pedoman Penskoran Resmi (Hal. 11):
// - Bagian I: 20 Pilihan Ganda Tunggal (No. 1-20) x 2 poin = 40 poin
// - Bagian II: 10 Pilihan Ganda Kompleks / Campuran (No. 21-30) x 6 poin = 60 poin
// Total = 100 poin
// =========================================================================

export const PAI_KELAS_9_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // BAGIAN I: PILIHAN GANDA TUNGGAL (No. 1 - 20, 2 poin/soal = 40 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pai-ix-1',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt:
      'Perhatikan ilustrasi berikut!\n"Saat kegiatan diskusi kelompok di kelas IX SMPN 12 Banjarbaru berlangsung, ruangan terasa cukup penuh karena beberapa siswa dari kelompok lain ikut menyimak presentasi. Melihat hal tersebut, Rafi segera menggeser kursinya dan mempersilakan teman-temannya yang masih berdiri untuk duduk bersama di meja kelompoknya agar mereka dapat mengikuti penjelasan guru dengan nyaman."\n\nSikap yang ditunjukkan oleh Rafi merupakan wujud pengamalan langsung dari pesan pokok Q.S. al-Mujadilah [58]: 11, yaitu ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'berlomba-lomba menjadi pembicara utama dalam setiap forum diskusi ilmiah' },
      { id: 'B', text: 'memberikan kelapangan tempat duduk kepada orang lain di dalam majelis ilmu' },
      { id: 'C', text: 'meminta imbalan berupa pujian dari guru atas kepedulian terhadap teman sebaya' },
      { id: 'D', text: 'mengutamakan teman dekat saja agar suasana belajar kelompok tetap terasa akrab' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-2',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 2,
    type: 'pg',
    prompt:
      'Cermati potongan ayat Q.S. az-Zumar [39]: 9 berikut!\n\nقُلْ هَلْ يَسْتَوِي الَّذِيْنَ يَعْلَمُوْنَ وَالَّذِيْنَ لَا يَعْلَمُوْنَ ۗ إِنَّمَا يَتَذَكَّرُ أُوْلُو الْأَلْبَابِ\n\nBerdasarkan potongan ayat di atas, Allah Swt. menegaskan bahwa tidaklah sama antara orang yang berilmu dengan orang yang tidak berilmu. Siapakah golongan yang disebut ulul albab pada akhir ayat tersebut sehingga mampu mengambil pelajaran dari perbedaan itu?',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Orang-orang yang memiliki harta melimpah untuk membangun lembaga pendidikan' },
      { id: 'B', text: 'Orang-orang yang gemar berdebat untuk menunjukkan kepandaiannya di depan umum' },
      { id: 'C', text: 'Orang-orang yang memiliki akal sehat dan pikiran jernih untuk merenungi kebenaran' },
      { id: 'D', text: 'Orang-orang yang menghafal banyak istilah ilmiah tanpa mengamalkannya dalam ibadah' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-ix-3',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 3,
    type: 'pg',
    prompt:
      'Perhatikan potongan lafaz Q.S. al-Mujadilah [58]: 11 berikut!\n\nيَرْفَعِ اللهُ الَّذِيْنَ آمَنُوْا مِنْكُمْ وَالَّذِيْنَ أُوْتُوْا الْعِلْمَ دَرَجَاتٍ\n\nApabila seorang pelajar tekun menguasai ilmu pengetahuan dan teknologi, namun ia mengabaikan kewajiban salat serta bersikap sombong kepada orang tuanya, maka berdasarkan kandungan ayat di atas ia belum memenuhi syarat utama diangkatnya derajat oleh Allah Swt., karena pengangkatan derajat tersebut mensyaratkan perpaduan antara ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'kecerdasan intelektual dan dukungan finansial yang memadai' },
      { id: 'B', text: 'keimanan yang kokoh dan penguasaan ilmu pengetahuan' },
      { id: 'C', text: 'banyaknya gelar akademik dan jabatan strategis di masyarakat' },
      { id: 'D', text: 'ketekunan membaca buku dan kemampuan berbicara di depan publik' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-4',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 4,
    type: 'pg',
    prompt:
      'Perhatikan kisah berikut!\n"Nadia harus menempuh jarak yang cukup jauh setiap pagi untuk mengikuti pembinaan Olimpiade Ilmu Pengetahuan Alam di sekolahnya. Meskipun sering merasa lelah, ia tetap meluruskan niatnya bahwa setiap langkahnya mencari ilmu adalah bentuk ketaatan kepada Allah Swt. dan ikhtiar agar bermanfaat bagi sesama."\n\nSikap Nadia selaras dengan kandungan hadis riwayat Muslim yang menjelaskan bahwa barang siapa menempuh suatu jalan untuk mencari ilmu, maka Allah Swt. akan ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'melipatgandakan kekayaan hartanya sebelum ia lulus dari sekolah' },
      { id: 'B', text: 'menjauhkan dirinya dari segala bentuk ujian dan kesulitan hidup' },
      { id: 'C', text: 'memudahkan baginya jalan menuju surga berkat keikhlasannya menuntut ilmu' },
      { id: 'D', text: 'menjadikannya pemimpin yang selalu dihormati oleh seluruh penduduk bumi' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-ix-5',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 5,
    type: 'pg',
    prompt:
      'Cermati dua peristiwa berikut!\n1. Terjadinya gempa bumi tektonik yang meruntuhkan sejumlah bangunan di suatu wilayah dan merenggut korban jiwa.\n2. Hancurnya seluruh tatanan alam semesta, gunung-gunung berterbangan bagaikan bulu yang dihambur-hamburkan, serta berakhirnya kehidupan seluruh makhluk di bumi setelah tiupan sangkakala Malaikat Israfil.\n\nPerbedaan mendasar antara Peristiwa 1 dan Peristiwa 2 ditinjau dari akidah Islam tentang Hari Akhir adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Peristiwa 1 merupakan kiamat kubra yang bersifat lokal, sedangkan Peristiwa 2 merupakan kiamat sugra yang bersifat menyeluruh' },
      { id: 'B', text: 'Peristiwa 1 merupakan kiamat sugra sebagai peringatan bagi manusia yang masih hidup, sedangkan Peristiwa 2 merupakan kiamat kubra yang mengakhiri kehidupan dunia' },
      { id: 'C', text: 'Peristiwa 1 terjadi setelah manusia dibangkitkan dari alam kubur, sedangkan Peristiwa 2 terjadi sebelum manusia mengalami kematian' },
      { id: 'D', text: 'Peristiwa 1 hanya dialami oleh umat terdahulu, sedangkan Peristiwa 2 dapat dicegah apabila manusia menjaga kelestarian lingkungan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-6',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 6,
    type: 'pg',
    prompt:
      'Perhatikan ilustrasi tahapan kehidupan setelah kematian berikut!\n"Setelah seluruh makhluk dibangkitkan dari alam kubur, manusia digiring menuju sebuah padang yang sangat luas untuk menunggu keputusan Allah Swt. Setelah itu, seluruh catatan amal perbuatan manusia diperiksa secara teliti tanpa ada satu pun yang terlewat, lalu ditimbang untuk menentukan beratnya amal kebaikan dan keburukan."\n\nUrutan nama-nama Hari Kiamat yang paling tepat menggambarkan rangkaian peristiwa pada ilustrasi tersebut adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "Yaumul Mahsyar – Yaumul Ba'ats – Yaumul Mizan – Yaumul Hisab" },
      { id: 'B', text: "Yaumul Ba'ats – Yaumul Mahsyar – Yaumul Hisab – Yaumul Mizan" },
      { id: 'C', text: "Yaumul Hisab – Yaumul Mizan – Yaumul Ba'ats – Yaumul Mahsyar" },
      { id: 'D', text: "Yaumul Mizan – Yaumul Hisab – Yaumul Mahsyar – Yaumul Ba'ats" }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-7',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 7,
    type: 'pg',
    prompt:
      'Perhatikan kutipan Q.S. al-Hajj [22]: 7 berikut!\n\nوَأَنَّ السَّاعَةَ آتِيَةٌ لَا رَيْبَ فِيْهَا وَأَنَّ اللهَ يَبْعَثُ مَنْ فِي الْقُبُوْرِ\n\nKandungan ayat di atas menegaskan dua kepastian mutlak dalam rukun iman kelima, yaitu ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'kedatangan hari kiamat yang tidak diragukan lagi dan kepastian Allah membangkitkan manusia dari alam kubur' },
      { id: 'B', text: 'penentuan waktu terjadinya kiamat secara pasti dan perhitungan amal manusia sebelum mengalami kematian' },
      { id: 'C', text: 'kehancuran seluruh benda langit akibat tabrakan bintang dan kekekalan kehidupan manusia di dunia' },
      { id: 'D', text: 'kebangkitan manusia dari alam kubur dan kemampuan manusia untuk saling menolong saat hari perhitungan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-ix-8',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 8,
    type: 'pg',
    prompt:
      'Perhatikan studi kasus berikut!\n"Saat ujian berlangsung, pengawas ruangan keluar sebentar karena ada keperluan mendesak. Beberapa siswa memanfaatkan situasi tersebut untuk membuka catatan di bawah meja. Namun, Farhan memilih tetap mengerjakan soal dengan kemampuannya sendiri meskipun ada beberapa nomor yang terasa sulit. Ia meyakini bahwa setiap perbuatan sekecil apa pun dicatat dan akan dipertanggungjawabkan kelak di akhirat."\n\nPerilaku Farhan menunjukkan buah dari keimanan kepada Hari Akhir berupa sikap ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "qana'ah dan pasrah terhadap hasil nilai ujian tanpa perlu berusaha maksimal" },
      { id: 'B', text: 'mawas diri (muhasabah) dan jujur karena meyakini adanya pengawasan Allah Swt. serta Yaumul Hisab' },
      { id: 'C', text: 'tasamuh terhadap teman yang menyontek agar tidak menimbulkan perselisihan di kelas' },
      { id: 'D', text: 'tawakal penuh dengan menyerahkan seluruh jawaban ujian tanpa memeriksa ulang pekerjaannya' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-9',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 9,
    type: 'pg',
    prompt:
      'Perhatikan kasus komunikasi di media sosial berikut!\n"Sebuah pesan berantai masuk ke grup obrolan siswa kelas IX yang berisi kabar bahwa kegiatan studi wisata sekolah dibatalkan secara sepihak dan dana yang telah dikumpulkan tidak akan dikembalikan. Sebagian anggota grup langsung terpancing emosi dan menuliskan komentar bernada marah. Melihat situasi itu, Aisyah segera menghubungi wali kelas untuk menanyakan kebenaran berita tersebut sebelum ikut berkomentar."\n\nTindakan Aisyah dalam menyikapi informasi tersebut mencerminkan prinsip komunikasi Islami yang disebut ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'ghibah, yakni membicarakan keburukan pihak lain di belakangnya' },
      { id: 'B', text: 'suudzan, yakni berprasangka buruk terhadap kebijakan pihak sekolah' },
      { id: 'C', text: 'tabayyun, yakni meneliti dan mengklarifikasi kebenaran berita sebelum menyebarkannya' },
      { id: 'D', text: 'namimah, yakni menyampaikan informasi untuk memperkeruh suasana antarpihak' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-ix-10',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 10,
    type: 'pg',
    prompt:
      'Perhatikan dialog berikut!\nIbu: "Nak, tolong bantu Ibu merapikan buku-buku di ruang tamu sebelum kamu bermain, ya."\nDaffa: "Baik, Bu. Daffa selesaikan tugas merapikan bukunya sekarang juga agar ruang tamu kembali nyaman."\n\nDaffa menjawab permintaan ibunya dengan nada suara yang lembut, penuh rasa hormat, dan tidak membentak. Dalam etika komunikasi Islami, gaya bertutur kata yang mulia dan penuh penghormatan kepada orang tua dikenal dengan istilah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Qaulan Karima' },
      { id: 'B', text: 'Qaulan Sadida' },
      { id: 'C', text: 'Qaulan Baligha' },
      { id: 'D', text: 'Qaulan Maysura' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-ix-11',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 11,
    type: 'pg',
    prompt:
      'Perhatikan situasi pergaulan remaja berikut!\n"Dalam rangka menyelesaikan tugas proyek pembuatan video dokumenter sekolah, kelompok belajar yang terdiri atas dua siswa laki-laki dan dua siswa perempuan sepakat bekerja bersama."\n\nAgar tetap menjaga adab pergaulan Islami, langkah paling tepat yang harus mereka terapkan adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'mengerjakan tugas di tempat tertutup berdua saja agar proses diskusi berjalan lebih tenang' },
      { id: 'B', text: 'bekerja di ruang terbuka atau perpustakaan sekolah secara berkelompok dengan menjaga aurat dan batasan interaksi' },
      { id: 'C', text: 'berinteraksi bebas tanpa batas agar kekompakan tim terlihat alami di depan kamera' },
      { id: 'D', text: 'memisahkan diri sepenuhnya dan menolak berkomunikasi meskipun untuk urusan tugas sekolah' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-12',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 12,
    type: 'pg',
    prompt:
      'Cermati peristiwa berikut!\n"Rizki tidak sengaja menyenggol botol minum milik Bayu hingga terjatuh dan pecah di teras kelas. Rizki segera meminta maaf dengan jujur atas kelalaiannya serta menawarkan diri untuk mengganti botol tersebut. Bayu pun menerima permintaan maaf Rizki dengan lapang dada tanpa memperpanjang masalah."\n\nSikap Rizki yang menyampaikan fakta sebenarnya secara jujur tanpa menutup-nutupi kesalahannya mencerminkan prinsip komunikasi Islami ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Qaulan Sadida (perkataan yang benar dan jujur)' },
      { id: 'B', text: 'Qaulan Layyina (perkataan yang lemah lembut kepada penguasa)' },
      { id: 'C', text: "Qaulan Ma'rufa (perkataan yang berisi janji-janji manis)" },
      { id: 'D', text: 'Qaulan Baligha (perkataan yang panjang lebar dan berbelit-belit)' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-ix-13',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 13,
    type: 'pg',
    prompt:
      'Perhatikan ilustrasi berikut!\n"Pada tanggal 5 Rabiulawal, pasangan suami istri Pak Ridwan dan Bu Salma dikaruniai bayi kembar yang terdiri atas satu anak laki-laki dan satu anak perempuan. Keduanya berniat melaksanakan ibadah akikah pada waktu yang paling utama sesuai tuntunan sunah Rasulullah saw."\n\nBerdasarkan ketentuan syariat Islam, waktu pelaksanaan paling utama serta jumlah hewan kambing yang harus disiapkan oleh keluarga Pak Ridwan adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'tanggal 11 Rabiulawal dengan menyembelih 2 ekor kambing' },
      { id: 'B', text: 'tanggal 11 Rabiulawal dengan menyembelih 3 ekor kambing' },
      { id: 'C', text: 'tanggal 12 Rabiulawal dengan menyembelih 3 ekor kambing' },
      { id: 'D', text: 'tanggal 12 Rabiulawal dengan menyembelih 4 ekor kambing' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-ix-14',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 14,
    type: 'pg',
    prompt:
      'Panitia kurban Masjid Al-Ikhlas melakukan pemeriksaan kelayakan terhadap empat hewan ternak yang diserahkan oleh warga berikut ini:\n1. Seekor sapi berumur 2,5 tahun, sehat, dan tidak memiliki cacat fisik.\n2. Seekor kambing berumur 1 tahun, sehat, namun belum mengalami pergantian gigi (musinnah).\n3. Seekor domba berumur 1 tahun lebih, sehat, dan sudah berganti gigi serinya.\n4. Seekor sapi berumur 3 tahun, gemuk, namun salah satu kaki belakangnya pincang berat sehingga sulit berjalan.\n\nBerdasarkan syarat sah hewan kurban dalam syariat Islam, hewan yang sah untuk dijadikan kurban ditunjukkan oleh nomor ....',
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: '(1) dan (2)' },
      { id: 'B', text: '(1) dan (3)' },
      { id: 'C', text: '(2) dan (4)' },
      { id: 'D', text: '(3) dan (4)' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-15',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 15,
    type: 'pg',
    prompt:
      'Perhatikan tabel perbandingan berikut!\n1. Waktu Pelaksanaan — Ibadah Akikah: Disunahkan pada hari ke-7, ke-14, atau ke-21 setelah kelahiran anak | Ibadah Kurban: Dilaksanakan pada tanggal 10 Zulhijah dan hari Tasyrik (11, 12, 13 Zulhijah)\n2. Kondisi Daging Saat Dibagikan — Ibadah Akikah: Lebih utama dibagikan dalam keadaan mentah | Ibadah Kurban: Lebih utama dibagikan setelah dimasak terlebih dahulu\n3. Tujuan Utama — Ibadah Akikah: Wujud rasa syukur atas kelahiran anak | Ibadah Kurban: Sarana mendekatkan diri kepada Allah Swt. dan kepedulian sosial\n4. Hukum Pelaksanaan — Ibadah Akikah: Sunah muakad bagi orang tua yang mampu | Ibadah Kurban: Sunah muakad bagi umat Islam yang mampu\n\nBerdasarkan tabel di atas, pasangan aspek perbandingan antara ibadah akikah dan ibadah kurban yang kurang tepat ditunjukkan oleh nomor ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '3' },
      { id: 'D', text: '4' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-16',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 16,
    type: 'pg',
    prompt:
      'Perhatikan kasus berikut!\n"Tujuh orang guru di SMPN 12 Banjarbaru sepakat melakukan patungan untuk membeli satu ekor sapi sehat berumur 3 tahun guna disembelih pada Hari Raya Iduladha. Setelah disembelih, daging sapi tersebut dibagi menjadi tiga bagian: sepertiga untuk keluarga para pekurban, sepertiga dihadiahkan kepada kerabat dan tetangga sekitar sekolah, serta sepertiga lagi dibagikan kepada fakir miskin."\n\nDitinjau dari ketentuan fikih kurban, hukum dan cara pendistribusian daging kurban yang dilakukan para guru tersebut adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'tidak sah karena satu ekor sapi hanya boleh dikurbankan untuk satu orang pekurban saja' },
      { id: 'B', text: 'sah dan sesuai sunah karena sapi dapat digunakan untuk maksimal tujuh orang serta pembagiannya proporsional' },
      { id: 'C', text: 'sah secara hukum, namun pembagian daging kepada keluarga pekurban dilarang dalam syariat Islam' },
      { id: 'D', text: 'tidak sah karena hewan kurban jenis sapi wajib berumur minimal lima tahun sebelum disembelih' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-17',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 17,
    type: 'pg',
    prompt:
      'Perhatikan narasi sejarah berikut!\n"Pada tahun 1453 M, Sultan Muhammad II berhasil menaklukkan kota Konstantinopel yang selama berabad-abad dikenal memiliki benteng pertahanan berlapis dan rantai raksasa penghalang di selat Tanduk Emas (Golden Horn). Keberhasilan ini diraih melalui kombinasi penguasaan teknologi meriam besar, strategi memindahkan puluhan kapal perang melewati jalur darat perbukitan dalam satu malam, serta kedisiplinan spiritual pasukannya."\n\nPelajaran utama yang dapat dipetik oleh generasi pelajar masa kini dari kisah perjuangan Sultan Muhammad al-Fatih tersebut adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'keberhasilan besar hanya dapat dicapai melalui kekuatan fisik tanpa memerlukan perencanaan strategis' },
      { id: 'B', text: 'penguasaan ilmu pengetahuan dan inovasi teknologi harus berjalan beriringan dengan kekuatan iman dan disiplin tinggi' },
      { id: 'C', text: 'semangat juang generasi muda cukup diwujudkan dengan mengagumi kejayaan masa lalu tanpa perlu berinovasi' },
      { id: 'D', text: 'strategi pertahanan yang kuat membuat seseorang tidak lagi membutuhkan kerja sama tim dalam meraih cita-cita' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-18',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 18,
    type: 'pg',
    prompt:
      'Cermati kebijakan pemerintahan Daulah Usmani berikut!\n"Selama berabad-abad memerintah wilayah yang mencakup tiga benua (Asia, Eropa, dan Afrika), Daulah Usmani menerapkan sistem Millet, yaitu kebijakan yang memberikan hak otonomi kepada komunitas non-Muslim (seperti Nasrani dan Yahudi) untuk menjalankan ibadah, mengatur pendidikan, serta menyelesaikan urusan internal berdasarkan hukum agama mereka masing-masing."\n\nNilai keteladanan dari kebijakan sistem Millet tersebut yang relevan diterapkan dalam kehidupan bermasyarakat di Indonesia adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'memaksakan keseragaman budaya agar tidak terjadi perbedaan pendapat di masyarakat' },
      { id: 'B', text: 'menjunjung tinggi toleransi dan menghormati kebebasan beragama dalam masyarakat majemuk' },
      { id: 'C', text: 'membatasi interaksi sosial antarpemeluk agama yang berbeda demi menjaga stabilitas negara' },
      { id: 'D', text: 'memberikan keistimewaan hukum hanya kepada kelompok masyarakat yang memiliki status ekonomi tinggi' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-ix-19',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 19,
    type: 'pg',
    prompt:
      'Perhatikan profil tokoh Daulah Usmani berikut!\n"Beliau memerintah pada tahun 1520–1566 M dan membawa Daulah Usmani mencapai puncak masa keemasannya. Di bawah kepemimpinannya, sistem hukum negara ditata secara sistematis melalui penyusunan kitab undang-undang yang dikenal dengan Qanun Osmani. Selain itu, bidang seni arsitektur berkembang pesat melalui kerja samanya dengan arsitek agung Mimar Sinan dalam membangun berbagai masjid megah, jembatan, dan fasilitas publik."\n\nTokoh sultan Daulah Usmani yang dimaksud pada profil di atas adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Usman bin Ertugrul (Usman I)' },
      { id: 'B', text: 'Sultan Orkhan' },
      { id: 'C', text: 'Sultan Murad I' },
      { id: 'D', text: 'Sultan Sulaiman I (Sulaiman al-Qanuni)' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'pai-ix-20',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 20,
    type: 'pg',
    prompt:
      'Perhatikan kisah awal berdirinya Daulah Usmani berikut!\n"Sebelum mendirikan Daulah Usmani pada tahun 1299 M, kabilah Kayi yang dipimpin oleh Ertugrul dan dilanjutkan oleh putranya, Usman, dikenal sebagai kelompok yang setia, berani membela kebenaran, serta amanah dalam menjaga wilayah perbatasan yang dipercayakan oleh Sultan Alauddin II dari Dinasti Seljuk Rum. Sikap amanah dan kepemimpinan adil tersebut membuat masyarakat sekitar menaruh kepercayaan penuh kepada Usman hingga akhirnya terbentuklah Daulah Usmani."\n\nNilai karakter utama yang melandasi berdirinya peradaban besar Daulah Usmani berdasarkan kisah tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'ambisi kekuasaan mutlak dengan menyingkirkan seluruh sekutu politiknya' },
      { id: 'B', text: 'integritas, sikap amanah, keberanian membela kebenaran, dan keadilan dalam memimpin' },
      { id: 'C', text: 'kekayaan sumber daya alam yang melimpah sejak awal perpindahan kabilah Kayi' },
      { id: 'D', text: 'penguasaan jalur perdagangan laut internasional sebelum memiliki wilayah daratan' }
    ],
    correctAnswers: ['B']
  },

  // -----------------------------------------------------------------------
  // BAGIAN II: PILIHAN GANDA KOMPLEKS / CAMPURAN (No. 21 - 30, 6 poin/soal = 60 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pai-ix-21',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 21,
    type: 'pg_kompleks',
    prompt:
      'Perhatikan pernyataan-pernyataan berikut terkait keutamaan orang berilmu dalam Q.S. al-Mujadilah [58]: 11 dan Q.S. az-Zumar [39]: 9! Manakah pernyataan yang benar mengenai ciri dan kedudukan orang berilmu menurut kedua surah tersebut? (Pilih 3 jawaban yang benar)',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Allah Swt. mengangkat derajat orang-orang yang beriman dan berilmu beberapa derajat dibandingkan yang lainnya.' },
      { id: 'B', text: 'Orang yang berilmu memiliki kedudukan yang sama persis dengan orang yang tidak berilmu dalam pandangan Allah Swt.' },
      { id: 'C', text: 'Orang berilmu yang ulul albab senantiasa menggunakan akal sehatnya untuk merenungi tanda-tanda kebesaran Allah Swt.' },
      { id: 'D', text: 'Kelapangan hati dalam majelis ilmu dan ketekunan beribadah merupakan bagian dari karakter insan berilmu.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'pai-ix-22',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 22,
    type: 'pg_kompleks',
    prompt:
      'Seorang pelajar SMP yang mengamalkan pesan hadis tentang menuntut ilmu akan menunjukkan sikap-sikap positif dalam kesehariannya. Manakah perilaku berikut yang mencerminkan pengamalan hadis tersebut? (Pilih 2 jawaban yang benar)',
    points: 6,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Mempelajari ilmu pengetahuan umum dan ilmu agama secara sungguh-sungguh dengan niat mencari rida Allah Swt.' },
      { id: 'B', text: 'Membagikan pemahaman materi pelajaran kepada teman yang kesulitan belajar dengan ikhlas.' },
      { id: 'C', text: 'Menyimpan catatan ringkasan materi sendiri agar tidak ada teman lain yang mendapatkan nilai lebih tinggi.' },
      { id: 'D', text: 'Hanya mau belajar apabila menjelang pelaksanaan ujian semester agar waktu bermain tetap lebih banyak.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'pai-ix-23',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 23,
    type: 'pg_kompleks',
    prompt:
      'Cermati peristiwa-peristiwa berikut ini! Manakah peristiwa yang termasuk kategori Kiamat Kubra dan rangkaian kejadian setelahnya menurut akidah Islam? (Pilih 3 jawaban yang benar)',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Hancurnya seluruh alam semesta beserta isinya setelah ditiupnya sangkakala oleh Malaikat Israfil.' },
      { id: 'B', text: 'Wafatnya seseorang akibat sakit keras atau kecelakaan lalu lintas di jalan raya.' },
      { id: 'C', text: 'Dibangkitkannya seluruh umat manusia dari alam kubur menuju Padang Mahsyar untuk dihisab amalnya.' },
      { id: 'D', text: 'Matahari terbit dari arah barat dan tertutupnya pintu tobat menjelang kehancuran total alam semesta.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'pai-ix-24',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 24,
    type: 'pg_kompleks',
    prompt:
      'Keyakinan terhadap datangnya Hari Akhir mendorong seorang muslim untuk senantiasa bersikap mawas diri dalam kehidupan sehari-hari. Manakah tindakan berikut yang merupakan wujud nyata sikap mawas diri tersebut? (Pilih 3 jawaban yang benar)',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Memperbanyak amal saleh dan segera bertobat apabila melakukan kekhilafan atau dosa.' },
      { id: 'B', text: 'Menjaga lisan dan tulisan di media sosial karena meyakini setiap ucapan akan dimintai pertanggungjawaban.' },
      { id: 'C', text: 'Menumpuk harta kekayaan sebanyak mungkin dengan segala cara untuk bekal kenyamanan hidup di dunia.' },
      { id: 'D', text: 'Bersikap adil, amanah, dan tidak merugikan hak orang lain meskipun tidak diawasi oleh manusia.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pai-ix-25',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 25,
    type: 'pg_kompleks',
    prompt:
      'Dalam berinteraksi dan berkomunikasi di lingkungan sekolah maupun keluarga, Islam mengajarkan prinsip-prinsip tutur kata yang santun. Manakah pasangan prinsip komunikasi Islami dan penerapannya yang tepat? (Pilih 2 jawaban yang benar)',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Qaulan Sadida: menyampaikan kesaksian yang jujur dan apa adanya saat dimintai keterangan oleh guru BK.' },
      { id: 'B', text: 'Qaulan Karima: berbicara dengan nada tinggi dan terburu-buru kepada orang tua agar pesan cepat tersampaikan.' },
      { id: 'C', text: "Qaulan Ma'rufa: menggunakan kata-kata yang pantas, sopan, dan menenangkan saat menghibur teman yang sedang berduka." },
      { id: 'D', text: 'Qaulan Layyina: menyindir kesalahan teman di depan umum menggunakan kata-kata tajam agar ia merasa malu.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'pai-ix-26',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 26,
    type: 'pg_kompleks',
    prompt:
      'Pergaulan remaja di era digital memerlukan rambu-rambu etika Islami agar terhindar dari perilaku menyimpang. Manakah aturan adab pergaulan Islami yang wajib dijaga oleh pelajar? (Pilih 3 jawaban yang benar)',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Menghindari khalwat (berdua-duaan antara laki-laki dan perempuan yang bukan mahram di tempat sepi).' },
      { id: 'B', text: 'Menjaga pandangan dan menutup aurat sesuai ketentuan syariat saat berada di luar rumah.' },
      { id: 'C', text: 'Memilih lingkungan pertemanan yang saling mengingatkan dalam kebaikan dan prestasi belajar.' },
      { id: 'D', text: 'Membiasakan tajassus (mencari-cari kesalahan pribadi teman) untuk dijadikan bahan candaan di grup kelas.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'pai-ix-27',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 27,
    type: 'pg_kompleks',
    prompt:
      'Keluarga Pak Ahmad hendak melaksanakan ibadah akikah atas kelahiran putra pertamanya. Manakah ketentuan syariat yang harus diperhatikan oleh keluarga Pak Ahmad agar pelaksanaan akikahnya sesuai sunah? (Pilih 3 jawaban yang benar)',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Menyembelih dua ekor kambing atau domba yang sehat dan memenuhi syarat usia.' },
      { id: 'B', text: 'Melaksanakan penyembelihan pada hari ke-7 setelah kelahiran sebagai waktu yang paling utama.' },
      { id: 'C', text: 'Membagikan daging akikah dalam keadaan mentah seluruhnya karena dilarang untuk dimasak.' },
      { id: 'D', text: 'Mencukur rambut bayi pada hari ketujuh, memberinya nama yang baik, dan bersedekah seberat timbangan rambutnya.' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'pai-ix-28',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 28,
    type: 'pg_kompleks',
    prompt:
      'Pada perayaan Iduladha, panitia kurban sekolah mengelola penyembelihan hewan kurban dari warga sekolah. Manakah pernyataan yang benar mengenai ketentuan pelaksanaan dan distribusi daging kurban? (Pilih 2 jawaban yang benar)',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Daging kurban disunahkan dibagikan dalam keadaan mentah agar penerima dapat mengolahnya sesuai kebutuhan.' },
      { id: 'B', text: 'Penyembelihan hewan kurban dapat dilakukan pada tanggal 10 Zulhijah setelah salat Iduladha hingga terbenam matahari tanggal 13 Zulhijah.' },
      { id: 'C', text: 'Panitia kurban diperbolehkan menjual kulit dan kepala hewan kurban untuk dijadikan upah bagi tukang jagal.' },
      { id: 'D', text: 'Satu ekor kambing dapat digunakan untuk berkurban secara patungan oleh tujuh orang siswa dalam satu kelas.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'pai-ix-29',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 29,
    type: 'pg_kompleks',
    prompt:
      'Peradaban Daulah Usmani memberikan sumbangsih besar bagi sejarah peradaban Islam dan dunia. Manakah bukti kemajuan peradaban Daulah Usmani pada masa kejayaannya? (Pilih 3 jawaban yang benar)',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Pembentukan pasukan militer elite yang terlatih dan disiplin bernama Jenissari (Inkisyariyah).' },
      { id: 'B', text: 'Pembangunan karya arsitektur monumental seperti Masjid Sulaimaniyah dan Masjid Biru (Masjid Sultan Ahmed).' },
      { id: 'C', text: 'Penyusunan kitab hukum perundang-undangan yang teratur bernama Qanun Osmani pada masa Sultan Sulaiman I.' },
      { id: 'D', text: 'Pemindahan pusat pemerintahan seluruh dunia Islam ke kota Baghdad dan pendirian lembaga Baitul Hikmah.' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'pai-ix-30',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-9',
    grade: 'IX',
    number: 30,
    type: 'pg_kompleks',
    prompt:
      'Mempelajari sejarah Daulah Usmani memberikan banyak inspirasi bagi pelajar SMP dalam membangun karakter unggul. Manakah nilai keteladanan tokoh Daulah Usmani yang patut diterapkan dalam kehidupan pelajar? (Pilih 2 jawaban yang benar)',
    points: 6,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Semangat pantang menyerah, cerdas menyusun strategi, dan menguasai ilmu pengetahuan sebagaimana diteladankan Muhammad al-Fatih.' },
      { id: 'B', text: 'Sikap amanah, adil, dan teguh memegang prinsip kebenaran dalam memimpin sebagaimana dicontohkan Usman bin Ertugrul.' },
      { id: 'C', text: 'Sikap menutup diri dari perkembangan ilmu pengetahuan modern karena dianggap bertentangan dengan tradisi.' },
      { id: 'D', text: 'Mengutamakan kepentingan kelompok sendiri dan mengabaikan hak-hak warga yang berbeda latar belakang.' }
    ],
    correctAnswers: ['A', 'B']
  }
];
