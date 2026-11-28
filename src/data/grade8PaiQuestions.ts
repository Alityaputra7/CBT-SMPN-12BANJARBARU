import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI PENDIDIKAN AGAMA ISLAM KELAS VIII SMPN 12 BANJARBARU
// Sumber: SOAL_PAI__KELAS_8_e07d94ac.pdf (30 Soal Lengkap, Total Skor = 100)
// - Bagian I: 20 Pilihan Ganda Biasa (No. 1-20) x 2 poin = 40 poin
// - Bagian II: 10 Pilihan Ganda Campuran / Kompleks (No. 21-30) x 6 poin = 60 poin
// Total = 100 poin
// =========================================================================

export const PAI_KELAS_8_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // BAGIAN I: PILIHAN GANDA BIASA (No. 1 - 20, 2 poin/soal = 40 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pai-viii-1',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt:
      'Perhatikan kutipan Q.S. ar-Rum/30: 41 berikut!\n\nظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ\n\nPada musim penghujan, beberapa kawasan pemukiman di sekitar aliran sungai mengalami banjir akibat penyumbatan saluran air oleh sampah plastik rumah tangga. Jika fenomena tersebut dianalisis menggunakan pesan Q.S. ar-Rum/30: 41, kesimpulan yang paling tepat adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'bencana banjir merupakan fenomena alam murni yang tidak berkaitan dengan perilaku manusia' },
      { id: 'B', text: 'kerusakan di darat dan di laut muncul sebagai akibat dari perbuatan dan kelalaian manusia sendiri' },
      { id: 'C', text: 'manusia tidak memiliki kemampuan untuk mencegah kerusakan lingkungan yang sudah terjadi' },
      { id: 'D', text: 'pemanfaatan sumber daya alam secara besar-besaran diperbolehkan demi kemajuan pembangunan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-2',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg',
    prompt:
      "Cermati perbandingan kandungan dua ayat Al-Qur'an berikut:\n1) Q.S. Ibrahim/14: 32 menjelaskan bahwa Allah Swt. menurunkan air hujan dari langit lalu menghasilkan buah-buahan sebagai rezeki bagi manusia.\n2) Q.S. az-Zukhruf/43: 13 menjelaskan bahwa Allah Swt. menundukkan hewan ternak dan sarana transportasi agar manusia dapat duduk di atasnya lalu mengingat nikmat Tuhan.\n\nSikap pelajar yang paling mencerminkan pengamalan kedua ayat tersebut secara bersamaan dalam kehidupan sehari-hari adalah ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'menggunakan kendaraan bermotor secara berlebihan dan membuang sisa makanan yang tidak habis' },
      { id: 'B', text: 'merawat tanaman di pekarangan sekolah serta membaca doa dan bersyukur saat menaiki kendaraan' },
      { id: 'C', text: 'memanfaatkan hewan peliharaan untuk bekerja tanpa henti demi memperoleh keuntungan pribadi' },
      { id: 'D', text: 'menebang pepohonan di sekitar sekolah untuk memperluas area parkir kendaraan bermotor' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-3',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'pg',
    prompt:
      "Perhatikan potongan lafaz Al-Qur'an berikut ini:\n1) عَبْدُ اللهِ\n2) بِسْمِ اللهِ\n3) رَسُوْلُ اللهِ\n4) فِيْ دِيْنِ اللهِ\n\nBerdasarkan kaidah ilmu tajwid mengenai hukum bacaan Lam Jalalah, pasangan lafaz yang harus dibaca tarqiq (tipis) karena didahului harakat kasrah ditunjukkan oleh nomor ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '1) dan 2)' },
      { id: 'B', text: '1) dan 3)' },
      { id: 'C', text: '2) dan 4)' },
      { id: 'D', text: '3) dan 4)' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-viii-4',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 4,
    type: 'pg',
    prompt:
      "Perhatikan penggalan ayat berikut:\n\nظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ ... وَأَنْزَلَ مِنَ السَّمَاءِ مَاءً ... خَلَقَ السَّمٰوٰتِ وَالْأَرْضَ\n\nSeorang siswa menganalisis hukum bacaan huruf Ra' pada kata yang tercetak tebal dalam ayat di atas:\n• Kata ظَهَرَ (huruf Ra' berharakat fathah)\n• Kata الْبَحْرِ (huruf Ra' berharakat kasrah)\n• Kata الْأَرْضَ (huruf Ra' sukun didahului huruf berharakat fathah)\n\nAnalisis hukum bacaan Ra' yang paling tepat secara berurutan adalah ....",
    points: 2,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'tafkhim – tarqiq – tafkhim' },
      { id: 'B', text: 'tarqiq – tafkhim – tarqiq' },
      { id: 'C', text: 'tafkhim – tafkhim – tarqiq' },
      { id: 'D', text: 'tarqiq – tarqiq – tafkhim' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-viii-5',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 5,
    type: 'pg',
    prompt:
      'Sebagai khalifah di muka bumi, manusia diberi amanah untuk menjaga keseimbangan ekosistem dan mencegah terjadinya al-fasad. Di lingkungan SMPN 12 Banjarbaru, pengurus OSIS melihat banyak siswa masih membawa botol minuman sekali pakai yang menumpuk di tempat sampah setiap hari. Solusi strategis yang paling sesuai dengan peran khalifah adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'melarang seluruh siswa membawa air minum dari rumah agar sampah botol berkurang' },
      { id: 'B', text: 'membakar tumpukan sampah plastik setiap sore di halaman belakang sekolah' },
      { id: 'C', text: 'mengadakan gerakan membawa botol minum isi ulang (tumbler) dan menyediakan galon air isi ulang di kelas' },
      { id: 'D', text: 'membiarkan petugas kebersihan sekolah bekerja ekstra karena itu sudah menjadi tugasnya' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-viii-6',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 6,
    type: 'pg',
    prompt:
      "Perhatikan tabel pasangan kitab suci dan nabi penerimanya berikut!\n1. Taurat — Nabi Musa a.s.\n2. Zabur — Nabi Isa a.s.\n3. Injil — Nabi Daud a.s.\n4. Al-Qur'an — Nabi Muhammad saw.\n\nPasangan yang tepat antara kitab suci yang diturunkan Allah Swt. beserta rasul penerimanya ditunjukkan oleh nomor ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: '1 dan 2' },
      { id: 'B', text: '1 dan 4' },
      { id: 'C', text: '2 dan 3' },
      { id: 'D', text: '3 dan 4' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-7',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 7,
    type: 'pg',
    prompt:
      "Allah Swt. menurunkan wahyu kepada para rasul-Nya dalam bentuk Kitab dan Suhuf. Nabi Ibrahim a.s. dan Nabi Musa a.s. termasuk nabi yang menerima Suhuf, sedangkan Al-Qur'an diturunkan sebagai Kitab kepada Nabi Muhammad saw. Perbedaan mendasar antara Kitab dan Suhuf terletak pada aspek ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'sumber wahyu, karena Kitab berasal dari Allah Swt. sedangkan Suhuf merupakan karangan para nabi' },
      { id: 'B', text: 'bentuk dan cakupan umat, karena Kitab dibukukan dan berlaku luas sedangkan Suhuf berupa lembaran terpisah' },
      { id: 'C', text: 'kebenaran ajaran, karena isi Suhuf tidak wajib diimani oleh umat Islam masa kini' },
      { id: 'D', text: 'bahasa penyampaian, karena seluruh Kitab dan Suhuf diturunkan menggunakan bahasa Arab' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-8',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 8,
    type: 'pg',
    prompt:
      "Raka adalah siswa kelas VII yang beragama Islam dan menjadikan Al-Qur'an sebagai pedoman hidup utamanya. Saat pembagian kelompok kerja bakti di sekolah, Raka satu kelompok dengan Dito yang memeluk agama berbeda. Ketika waktu salat Zuhur tiba, Dito mempersilakan Raka untuk beribadah terlebih dahulu. Sikap terbaik Raka yang mencerminkan generasi pecinta Al-Qur'an yang toleran adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'menunda salat Zuhur hingga pulang sekolah agar tidak menyinggung perasaan Dito' },
      { id: 'B', text: 'menerima tawaran Dito dengan santun, melaksanakan salat, lalu kembali bekerja sama dengan baik' },
      { id: 'C', text: 'mengajak Dito untuk ikut melaksanakan salat Zuhur berjamaah di musala sekolah' },
      { id: 'D', text: 'menolak bekerja sama dengan Dito pada tugas kelompok berikutnya karena perbedaan keyakinan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-9',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 9,
    type: 'pg',
    prompt:
      "Meyakini Al-Qur'an sebagai kitab suci terakhir yang menyempurnakan kitab-kitab sebelumnya menuntut seorang muslim tidak sekadar membacanya, tetapi juga menjadikannya pedoman hidup. Perilaku di bawah ini yang menunjukkan pengamalan nyata dari keyakinan tersebut adalah ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: "menyimpan mushaf Al-Qur'an di lemari kaca yang tinggi tanpa pernah membukanya" },
      { id: 'B', text: "membaca Al-Qur'an dengan suara keras hanya ketika ada perlombaan di sekolah" },
      { id: 'C', text: "menjadikan nilai-nilai kejujuran dan kasih sayang dalam Al-Qur'an sebagai dasar bersikap sehari-hari" },
      { id: 'D', text: 'meremehkan pemeluk agama lain karena merasa paling benar dalam beragama' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'pai-viii-10',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 10,
    type: 'pg',
    prompt:
      'Nadya ditunjuk oleh teman-teman sekelasnya sebagai bendahara kas kelas. Suatu hari, adik Nadya membutuhkan uang untuk membeli perlengkapan sekolah, sementara uang saku Nadya sudah habis. Nadya tetap tidak menggunakan uang kas kelas meskipun ia berniat menggantinya keesokan hari. Sikap Nadya tersebut menunjukkan bahwa ia menjaga sifat amanah yang berdampak pada ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'hilangnya kesempatan membantu keluarga demi aturan yang kaku' },
      { id: 'B', text: 'terbangunnya integritas diri dan kepercayaan penuh dari teman-temannya' },
      { id: 'C', text: 'munculnya rasa takut berlebihan terhadap pengawasan wali kelas' },
      { id: 'D', text: 'berkurangnya kepedulian sosial terhadap anggota keluarga sendiri' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-11',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 11,
    type: 'pg',
    prompt:
      'Perhatikan pernyataan berikut:\n"Seorang pelajar yang membiasakan kesesuaian antara perkataan dan perbuatannya tidak akan merasa cemas ketika ucapannya dicocokkan dengan kenyataan."\n\nPernyataan tersebut menggambarkan keterkaitan erat antara sikap jujur dengan ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'ketenangan batin karena terbebas dari rasa takut ketahuan berbohong' },
      { id: 'B', text: 'popularitas tinggi di media sosial karena sering dipuji orang lain' },
      { id: 'C', text: 'kemudahan mendapatkan nilai tinggi tanpa harus belajar sungguh-sungguh' },
      { id: 'D', text: 'kemampuan memengaruhi orang lain untuk mengikuti seluruh keinginannya' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-viii-12',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 12,
    type: 'pg',
    prompt:
      'Saat ulangan harian berlangsung, Fajar lupa mempelajari salah satu materi. Teman sebangkunya menyodorkan secarik kertas berisi catatan jawaban secara diam-diam. Fajar menolak catatan tersebut dan memilih mengerjakan soal sesuai kemampuannya sendiri. Analisis yang paling tepat terhadap keputusan Fajar adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'tindakan Fajar merugikan dirinya sendiri karena peluang mendapat nilai sempurna menjadi hilang' },
      { id: 'B', text: 'Fajar mengutamakan integritas dan kejujuran demi ketenangan batin dibandingkan nilai tinggi hasil kecurangan' },
      { id: 'C', text: 'Fajar bersikap tidak setia kawan karena menolak bantuan yang diberikan teman sebangkunya' },
      { id: 'D', text: 'kejujuran hanya diperlukan saat diawasi secara ketat oleh guru pengawas ujian' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-13',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 13,
    type: 'pg',
    prompt:
      'Pada malam hari, terjadi peristiwa gerhana bulan total yang dapat diamati dari kota Banjarbaru. Umat Islam dianjurkan melaksanakan salat gerhana bulan (khusuf). Kekhasan tata cara pelaksanaan salat gerhana yang membedakannya dengan salat sunah dua rakaat pada umumnya adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'dilaksanakan secara munfarid tanpa didahului dan diakhiri dengan khutbah' },
      { id: 'B', text: 'setiap rakaat terdiri atas dua kali berdiri membaca Al-Fatihah dan dua kali rukuk' },
      { id: 'C', text: 'dikerjakan sebanyak empat rakaat dengan satu kali salam dan tanpa sujud' },
      { id: 'D', text: 'wajib dilaksanakan di tanah lapang pada siang hari sebelum matahari terbenam' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-14',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 14,
    type: 'pg',
    prompt:
      'Kemarau panjang mengakibatkan debit air sungai menurun dan lahan pertanian warga mengalami kekeringan. Masyarakat berencana melaksanakan salat istiska untuk memohon turunnya hujan kepada Allah Swt. Rangkaian pelaksanaan salat istiska yang sesuai dengan tuntunan syariat Islam adalah ....',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'dilaksanakan di dalam masjid tertutup dengan bacaan takbir sebanyak tujuh kali pada rakaat pertama' },
      { id: 'B', text: 'didahului anjuran memperbanyak istigfar dan sedekah, dilaksanakan di tanah lapang, serta diakhiri khutbah' },
      { id: 'C', text: "dilaksanakan tanpa khutbah dan khatib dilarang mengubah posisi selendang (rida') saat berdoa" },
      { id: 'D', text: 'hukum pelaksanaannya adalah fardu ain bagi setiap penduduk yang mengalami kekeringan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-15',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 15,
    type: 'pg',
    prompt:
      'Salah seorang warga di lingkungan tempat tinggal Ahmad meninggal dunia. Warga segera mengurus jenazah tersebut mulai dari memandikan, mengafani, menyalatkan, hingga menguburkannya. Dalam ketentuan fikih Islam, hukum pelaksanaan salat jenazah bagi umat Islam yang mengetahui kabar kematian tersebut adalah fardu kifayah, yang artinya ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'wajib dikerjakan oleh setiap individu muslim tanpa terkecuali meskipun sudah ada yang mengerjakannya' },
      { id: 'B', text: 'kewajiban kolektif yang gugur dosanya bagi seluruh warga apabila sudah dilaksanakan oleh sebagian muslim' },
      { id: 'C', text: 'ibadah sunah yang hanya boleh dikerjakan oleh anggota keluarga inti dari jenazah' },
      { id: 'D', text: 'ibadah yang dilaksanakan dengan rukuk dan sujud panjang di area pemakaman' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-16',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 16,
    type: 'pg',
    prompt:
      'Perhatikan karakteristik ibadah berikut!\n1) Hukum pelaksanaannya fardu kifayah.\n2) Dilaksanakan dalam posisi berdiri dengan empat kali takbir.\n3) Tidak terdapat gerakan rukuk, iktidal, maupun sujud di dalamnya.\n\nKarakteristik di atas merupakan ketentuan tata cara pelaksanaan dari ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'salat gerhana matahari (kusuf)' },
      { id: 'B', text: 'salat gerhana bulan (khusuf)' },
      { id: 'C', text: 'salat memohon hujan (istiska)' },
      { id: 'D', text: 'salat jenazah' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'pai-viii-17',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 17,
    type: 'pg',
    prompt:
      'Pada tahun 750 M, berdiri sebuah kekhalifahan baru dalam sejarah peradaban Islam yang menggantikan kekuasaan sebelumnya dan memindahkan pusat pemerintahannya ke kota Baghdad. Sosok pendiri sekaligus khalifah pertama dari Daulah Abbasiyah tersebut adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Abu al-Abbas as-Saffah' },
      { id: 'B', text: 'Harun al-Rasyid' },
      { id: 'C', text: "Abdullah al-Ma'mun" },
      { id: 'D', text: "Abu Ja'far al-Mansur" }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'pai-viii-18',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 18,
    type: 'pg',
    prompt:
      "Pada masa pemerintahan Khalifah Harun al-Rasyid dan dilanjutkan oleh putranya, Khalifah al-Ma'mun, Daulah Abbasiyah mencapai puncak kejayaan ilmu pengetahuan. Salah satu bukti monumental kemajuan tersebut adalah berdirinya lembaga Baitul Hikmah di Baghdad yang berfungsi sebagai ....",
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'benteng pertahanan militer utama untuk memperluas wilayah kekuasaan ke benua Eropa' },
      { id: 'B', text: 'pusat kajian ilmu pengetahuan, perpustakaan besar, dan lembaga penerjemahan buku-buku ilmiah' },
      { id: 'C', text: 'istana megah yang hanya digunakan untuk pertemuan keluarga kerajaan dan jamuan kenegaraan' },
      { id: 'D', text: 'pusat perdagangan rempah-rempah dan komoditas pertanian dari seluruh wilayah kekhalifahan' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-19',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 19,
    type: 'pg',
    prompt:
      "Keberhasilan Daulah Abbasiyah mencapai era keemasan ilmu pengetahuan pada masa Khalifah Harun al-Rasyid dan al-Ma'mun tidak terjadi secara kebetulan. Faktor utama yang mendorong pesatnya perkembangan ilmu pengetahuan pada periode tersebut adalah ....",
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'kebijakan khalifah yang melarang masuknya ilmu pengetahuan dari luar wilayah Baghdad' },
      { id: 'B', text: 'perhatian besar dan dukungan penuh para khalifah terhadap para ilmuwan serta pengembangan literasi' },
      { id: 'C', text: 'penghentian seluruh kegiatan ekonomi masyarakat agar fokus menghafal buku-buku sejarah' },
      { id: 'D', text: 'pemindahan pusat kegiatan ilmiah dari Baghdad ke daerah pedalaman yang terisolasi' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'pai-viii-20',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 20,
    type: 'pg',
    prompt:
      'Sebagai pelajar SMPN 12 Banjarbaru, nilai keteladanan paling relevan yang dapat diterapkan dari sejarah kejayaan Baitul Hikmah pada masa Daulah Abbasiyah untuk menghadapi tantangan zaman saat ini adalah ....',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'membanggakan kejayaan masa lalu tanpa perlu mempelajari ilmu pengetahuan modern' },
      { id: 'B', text: 'membudayakan semangat membaca, meneliti, dan mengembangkan ilmu pengetahuan yang bermanfaat' },
      { id: 'C', text: 'membatasi pergaulan ilmiah hanya dengan teman yang memiliki minat baca yang sama' },
      { id: 'D', text: 'mengutamakan kegiatan bermain gawai daripada memanfaatkan perpustakaan sekolah' }
    ],
    correctAnswers: ['B']
  },

  // -----------------------------------------------------------------------
  // BAGIAN II: PILIHAN GANDA CAMPURAN / KOMPLEKS (No. 21 - 30, 6 poin/soal = 60 poin)
  // -----------------------------------------------------------------------
  {
    id: 'pai-viii-21',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 21,
    type: 'pg_kompleks',
    prompt:
      'Bacalah teks berikut!\n"Allah Swt. menciptakan langit, bumi, air hujan, serta berbagai jenis hewan agar dimanfaatkan manusia untuk memenuhi kebutuhan hidup dan sarana transportasi (Q.S. Ibrahim/14: 32 dan Q.S. az-Zukhruf/43: 13). Namun, Q.S. ar-Rum/30: 41 mengingatkan bahwa keserakahan manusia justru memicu kerusakan di darat dan di laut."\n\nBerdasarkan teks tersebut, pilihlah dua pernyataan yang mencerminkan sikap manusia sebagai khalifah yang bertanggung jawab!',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Memanfaatkan sarana transportasi secara bijak dan senantiasa bersyukur atas nikmat Allah Swt.' },
      { id: 'B', text: 'Mengeksploitasi sumber daya alam secara bebas karena seluruh isi bumi diciptakan untuk manusia.' },
      { id: 'C', text: 'Menjaga kelestarian lingkungan darat dan perairan agar terhindar dari bencana akibat al-fasad.' },
      { id: 'D', text: 'Mengabaikan dampak pencemaran lingkungan selama kegiatan ekonomi masyarakat tetap berjalan.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'pai-viii-22',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 22,
    type: 'pg_kompleks',
    prompt:
      "Cermati empat potongan lafaz berikut ini:\n1) وَاللهُ عَلِيْمٌ (Lafaz Allah didahului harakat fathah)\n2) لِلهِ الْأَمْرُ (Lafaz Allah didahului harakat kasrah)\n3) رُزِقْنَا (Huruf Ra' berharakat dammah)\n4) الْبِرِّ (Huruf Ra' berharakat kasrah)\n\nPilihlah dua pernyataan analisis hukum bacaan tajwid yang benar berdasarkan data di atas!",
    points: 6,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Lafaz nomor 1) dibaca Lam Jalalah tafkhim (tebal) karena didahului huruf berharakat fathah.' },
      { id: 'B', text: 'Lafaz nomor 2) dibaca Lam Jalalah tafkhim (tebal) karena berada di awal kalimat.' },
      { id: 'C', text: "Lafaz nomor 3) dibaca Ra' tarqiq (tipis) karena huruf Ra' berharakat dammah." },
      { id: 'D', text: "Lafaz nomor 4) dibaca Ra' tarqiq (tipis) karena huruf Ra' berharakat kasrah." }
    ],
    correctAnswers: ['A', 'D']
  },
  {
    id: 'pai-viii-23',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 23,
    type: 'pg_kompleks',
    prompt:
      'Allah Swt. menurunkan wahyu kepada para rasul-Nya dalam bentuk Kitab dan Suhuf sebagai petunjuk hidup umat manusia. Pilihlah dua pernyataan yang benar mengenai perbedaan antara Kitab dan Suhuf!',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Kitab merupakan wahyu Allah Swt. yang dibukukan dan berlaku untuk umat secara luas.' },
      { id: 'B', text: 'Suhuf merupakan wahyu Allah Swt. berupa lembaran-lembaran terpisah yang tidak dibukukan.' },
      { id: 'C', text: "Nabi Ibrahim a.s. dan Nabi Musa a.s. adalah dua rasul yang menerima Kitab Al-Qur'an dan Zabur." },
      { id: 'D', text: 'Suhuf memiliki kedudukan lebih tinggi daripada Kitab sehingga wajib dibukukan menjadi satu mushaf.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'pai-viii-24',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 24,
    type: 'pg_kompleks',
    prompt:
      "Di sekolah yang memiliki peserta didik dari berbagai latar belakang keyakinan, pelajar muslim dituntut menjadi generasi pecinta Al-Qur'an yang toleran. Pilihlah dua perilaku yang menunjukkan sikap tersebut!",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "Menjadikan ajaran Al-Qur'an sebagai pedoman hidup utama dalam bersikap dan bertutur kata." },
      { id: 'B', text: 'Mengikuti ritual ibadah pemeluk agama lain sebagai bentuk penghormatan atas perbedaan.' },
      { id: 'C', text: 'Menghormati hak teman yang berbeda agama untuk menjalankan ibadah sesuai keyakinannya tanpa mengganggu.' },
      { id: 'D', text: 'Memaksakan pendapat pribadi kepada teman yang berbeda keyakinan saat berdiskusi di kelas.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'pai-viii-25',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 25,
    type: 'pg_kompleks',
    prompt:
      'Sikap amanah dan jujur merupakan fondasi karakter mulia yang ditekankan dalam ajaran Islam. Pilihlah dua manfaat utama yang dirasakan seseorang apabila konsisten menerapkan sikap jujur dan amanah dalam kehidupan sehari-hari!',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Terbangunnya integritas pribadi sehingga dipercaya oleh lingkungan keluarga, sekolah, dan masyarakat.' },
      { id: 'B', text: 'Memperoleh ketenangan batin karena tidak ada kebohongan atau pengkhianatan yang harus ditutupi.' },
      { id: 'C', text: 'Terhindar dari seluruh ujian dan kesulitan hidup selama menempuh pendidikan di sekolah.' },
      { id: 'D', text: 'Mendapatkan kebebasan melakukan kesalahan tanpa perlu mempertanggungjawabkannya.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'pai-viii-26',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 26,
    type: 'pg_kompleks',
    prompt:
      'Perhatikan situasi berikut!\n"Salsa dititipi pesan rahasia oleh sahabatnya sekaligus diberi amanah oleh guru untuk mengumpulkan buku tugas teman-teman sekelas tepat waktu ke ruang guru."\n\nPilihlah dua tindakan yang menunjukkan bahwa Salsa adalah pelajar yang menjaga amanah!',
    points: 6,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Menceritakan pesan rahasia sahabatnya kepada teman lain agar dianggap paling tahu informasi.' },
      { id: 'B', text: 'Menjaga kerahasiaan pesan sahabatnya dengan tidak menyebarkannya kepada siapa pun.' },
      { id: 'C', text: 'Mengumpulkan seluruh buku tugas kelas dan menyerahkannya kepada guru sesuai waktu yang ditentukan.' },
      { id: 'D', text: 'Menunda penyerahan buku tugas hingga keesokan hari tanpa memberi kabar kepada guru.' }
    ],
    correctAnswers: ['B', 'C']
  },
  {
    id: 'pai-viii-27',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 27,
    type: 'pg_kompleks',
    prompt:
      'Ibadah salat sunah kusuf/khusuf (gerhana) dan salat istiska (mohon hujan) memiliki tata cara pelaksanaan khusus yang berbeda dengan salat fardu lima waktu. Pilihlah dua pernyataan yang benar mengenai kedua salat sunah tersebut!',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Salat gerhana dikerjakan sebanyak dua rakaat dengan dua kali rukuk pada setiap rakaatnya.' },
      { id: 'B', text: 'Salat gerhana wajib dikerjakan tanpa membaca Surah Al-Fatihah pada rakaat kedua.' },
      { id: 'C', text: 'Salat istiska dilaksanakan di tanah lapang secara berjamaah dan disertai khutbah yang memperbanyak istigfar.' },
      { id: 'D', text: 'Salat istiska dikerjakan sebanyak empat rakaat dengan empat kali takbir tanpa gerakan rukuk dan sujud.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'pai-viii-28',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 28,
    type: 'pg_kompleks',
    prompt:
      'Ketika seorang muslim meninggal dunia, umat Islam di sekitarnya memiliki kewajiban untuk melaksanakan salat jenazah. Pilihlah dua ketentuan yang benar terkait pelaksanaan salat jenazah!',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Hukum pelaksanaannya adalah fardu kifayah bagi kaum muslimin yang masih hidup.' },
      { id: 'B', text: 'Rukun gerakannya terdiri atas empat kali takbir dalam posisi berdiri tanpa rukuk dan sujud.' },
      { id: 'C', text: 'Pelaksanaannya wajib dilakukan di tanah lapang setelah jenazah selesai dimakamkan.' },
      { id: 'D', text: 'Jumlah takbir dalam salat jenazah adalah tujuh kali pada rakaat pertama dan lima kali pada rakaat kedua.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'pai-viii-29',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 29,
    type: 'pg_kompleks',
    prompt:
      'Sejarah mencatat bahwa Daulah Abbasiyah memegang peranan penting dalam kemajuan peradaban Islam selama berabad-abad. Pilihlah dua fakta sejarah yang benar mengenai berdirinya Daulah Abbasiyah!',
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Daulah Abbasiyah didirikan oleh Abu al-Abbas as-Saffah pada tahun 750 M.' },
      { id: 'B', text: 'Kota Baghdad ditetapkan sebagai pusat pemerintahan dan peradaban Daulah Abbasiyah.' },
      { id: 'C', text: "Khalifah pertama yang mendirikan Daulah Abbasiyah adalah Khalifah al-Ma'mun pada tahun 850 M." },
      { id: 'D', text: 'Pusat pemerintahan Daulah Abbasiyah sejak awal berdiri terletak di kota Madinah.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'pai-viii-30',
    bankId: 'qbank-pai',
    subjectId: 'sbj-pai',
    classId: 'cls-8',
    grade: 'VIII',
    number: 30,
    type: 'pg_kompleks',
    prompt:
      "Masa pemerintahan Khalifah Harun al-Rasyid dan Khalifah al-Ma'mun dikenal sebagai era keemasan ilmu pengetahuan pada masa Daulah Abbasiyah. Pilihlah dua pernyataan yang tepat mengenai perkembangan ilmu pengetahuan pada periode tersebut!",
    points: 6,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Lembaga Baitul Hikmah berkembang pesat sebagai pusat penerjemahan, perpustakaan, dan kajian ilmu pengetahuan.' },
      { id: 'B', text: "Khalifah Harun al-Rasyid dan al-Ma'mun memberikan dukungan penuh terhadap perkembangan sains dan literasi." },
      { id: 'C', text: 'Lembaga Baitul Hikmah didirikan khusus untuk melatih pasukan perang dan strategi militer.' },
      { id: 'D', text: "Kegiatan penerjemahan buku-buku ilmu pengetahuan dilarang keras pada masa pemerintahan al-Ma'mun." }
    ],
    correctAnswers: ['A', 'B']
  }
];
