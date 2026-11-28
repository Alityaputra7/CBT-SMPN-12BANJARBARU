import { Question } from '../types/cbt';

const BIN_GENANGAN_STIMULUS = `Bacaan: Mengapa Genangan Air Dapat Terjadi?

Setelah hujan deras, air terkadang menggenang di halaman sekolah. Genangan dapat terjadi ketika air hujan terkumpul lebih cepat daripada kemampuan tanah menyerapnya atau saluran mengalirkannya. Permukaan yang tertutup semen atau aspal juga cenderung menyerap air lebih sedikit dibandingkan tanah terbuka.

Di sekolah, petugas menemukan bahwa beberapa saluran air tertutup daun kering dan sampah plastik. Akibatnya, aliran air menjadi terhambat. Setelah saluran dibersihkan, air di beberapa bagian halaman mengalir lebih lancar, meskipun genangan tidak langsung hilang di semua tempat.

Guru menjelaskan bahwa penanganan genangan perlu mempertimbangkan kondisi saluran, jenis permukaan, dan banyaknya air hujan. Karena itu, menjaga saluran tetap bersih merupakan salah satu tindakan yang dapat membantu, tetapi bukan satu-satunya faktor yang menentukan keadaan halaman.`;

/**
 * Bank Soal Resmi Ulangan Semester 1 Bahasa Indonesia Kelas VII (SMP Negeri 12 Banjarbaru)
 * 100% verbatim dari dokumen: SOAL BAHASA INDONESIA_ KELAS 7.pdf
 * Pedoman penskoran resmi:
 * - 20 Pilihan Ganda (No. 1–20) × 2 poin = 40 poin
 * - 5 Pilihan Ganda Kompleks (No. 21–25) × 4 poin = 20 poin
 * - 3 Benar/Salah (No. 26–28) × 2 poin = 6 poin
 * - 2 Uraian Berbasis Literasi (No. 29–30) × 17 poin = 34 poin
 * Total = 30 soal, 100 poin.
 */
export const BIN_KELAS_7_QUESTIONS: Question[] = [
  // =========================================================================
  // A. PILIHAN GANDA (NOMOR 1–20) — 2 POIN PER SOAL
  // =========================================================================
  {
    id: 'bin-vii-1',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 1,
    points: 2,
    difficulty: 'mudah',
    prompt: `Taman Baca di Ujung Gang

Di ujung sebuah gang yang tidak terlalu lebar, terdapat taman baca sederhana milik warga. Bangunannya tidak besar, hanya terdiri atas dua ruangan dengan dinding berwarna hijau muda. Di bagian depan, beberapa pot bunga berjajar rapi di dekat pintu masuk. Tanaman lidah mertua dan bunga kertas tumbuh subur meskipun halaman bangunan itu tidak terlalu luas.

Saat pintu dibuka, pengunjung akan mencium aroma khas buku dan kayu. Rak-rak pendek memenuhi sisi kanan dan kiri ruangan. Buku cerita anak ditempatkan di rak bagian bawah agar mudah dijangkau, sedangkan buku pengetahuan dan ensiklopedia berada di rak yang lebih tinggi. Sebuah karpet biru terbentang di tengah ruangan, menjadi tempat anak-anak duduk sambil membaca.

Setiap sore, taman baca itu dikunjungi anak-anak dari lingkungan sekitar. Ada yang membaca dengan tenang, ada pula yang berdiskusi mengenai cerita yang baru mereka selesaikan. Meskipun fasilitasnya sederhana, suasana taman baca terasa nyaman dan menyenangkan.

Pertanyaan: Ciri teks deskripsi yang paling jelas terlihat dalam bacaan tersebut adalah ....`,
    options: [
      { id: 'A', text: 'Menjelaskan urutan langkah untuk menggunakan taman baca.' },
      { id: 'B', text: 'Menggambarkan objek melalui rincian bentuk, warna, letak, dan suasana.' },
      { id: 'C', text: 'Menceritakan konflik antara pengelola taman baca dan pengunjung.' },
      { id: 'D', text: 'Menyampaikan pendapat penulis tentang pentingnya membeli buku.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-vii-2',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 2,
    points: 2,
    difficulty: 'sedang',
    prompt: `Pasar Tradisional Pagi Hari

Pasar tradisional di dekat terminal mulai ramai sejak pukul lima pagi. Para pedagang menata sayuran, ikan, buah-buahan, dan berbagai kebutuhan rumah tangga di atas meja dagangan. Aroma rempah-rempah bercampur dengan bau ikan segar yang baru diturunkan dari kendaraan pengangkut.

Di lorong bagian depan, pedagang sayur menyusun kangkung, bayam, dan sawi dalam ikatan kecil. Di bagian tengah, beberapa penjual menawarkan ikan yang diletakkan di atas lapisan es. Sementara itu, penjual buah menata jeruk, pisang, dan pepaya berdasarkan ukuran dan kematangannya. Suara tawar-menawar terdengar hampir dari setiap sudut pasar.

Walaupun suasananya ramai dan terkadang becek setelah hujan, pasar tersebut tetap menjadi tempat pilihan warga untuk berbelanja. Sebagian pembeli menyukai pasar itu karena dapat memilih barang secara langsung dan berinteraksi dengan pedagang. Bagi warga setempat, pasar bukan sekadar tempat transaksi, melainkan juga ruang pertemuan yang menghidupkan hubungan sosial.

Pertanyaan: Simpulan yang paling tepat berdasarkan bacaan adalah ....`,
    options: [
      { id: 'A', text: 'Pasar tradisional hanya dikunjungi oleh pedagang sayur dan ikan.' },
      { id: 'B', text: 'Keadaan pasar yang ramai membuat seluruh pembeli enggan berbelanja.' },
      { id: 'C', text: 'Pasar tradisional memiliki fungsi ekonomi sekaligus sosial bagi masyarakat.' },
      { id: 'D', text: 'Semua barang di pasar dijual dengan harga yang sama.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-vii-3',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 3,
    points: 2,
    difficulty: 'mudah',
    prompt: `Perjalanan ke Air Terjun

Jalan menuju air terjun melewati perkebunan dan hutan kecil. Udara di sepanjang jalan terasa sejuk, terutama ketika pepohonan tinggi menaungi jalur pejalan kaki. Sesekali terdengar kicauan burung dari dahan yang tidak terlihat jelas karena tertutup dedaunan.

Semakin dekat dengan air terjun, suara gemuruh air terdengar semakin keras. Butiran air yang terbawa angin menyentuh wajah dan membuat kulit terasa dingin. Di antara bebatuan, tumbuh lumut hijau yang licin ketika diinjak. Air mengalir deras dari tebing tinggi, kemudian berkumpul dalam kolam alami yang dikelilingi batu-batu besar.

Pengunjung biasanya berhenti di tempat yang aman untuk menikmati pemandangan. Beberapa orang mengambil foto, sedangkan yang lain duduk sejenak sambil mendengarkan suara air. Keindahan tempat itu membuat perjalanan yang melelahkan terasa sepadan.

Pertanyaan: Kalimat yang paling kuat menggambarkan pengalaman melalui indra pendengaran adalah ....`,
    options: [
      { id: 'A', text: 'Lumut hijau tumbuh di antara bebatuan yang licin.' },
      { id: 'B', text: 'Udara terasa sejuk di bawah pepohonan tinggi.' },
      { id: 'C', text: 'Butiran air menyentuh wajah dan membuat kulit terasa dingin.' },
      { id: 'D', text: 'Suara gemuruh air terdengar semakin keras ketika mendekati air terjun.' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'bin-vii-4',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 4,
    points: 2,
    difficulty: 'mudah',
    prompt: `Kebun Sayur Sekolah

Di belakang laboratorium terdapat kebun sayur yang dikelola siswa kelas VII. Lahan yang semula dipenuhi rumput liar itu diubah menjadi petak-petak kecil untuk menanam kangkung, bayam, dan cabai. Setiap kelompok memperoleh tanggung jawab merawat tanaman sesuai jadwal yang disepakati.

Pada minggu pertama, beberapa tanaman tampak layu karena siswa belum memahami kebutuhan air setiap jenis tanaman. Guru kemudian memberikan penjelasan tentang penyiraman, pemilihan pupuk, dan pentingnya memperhatikan kondisi tanah. Siswa mulai mengamati perubahan warna daun serta kelembapan tanah sebelum menyiram tanaman.

Setelah beberapa minggu, tanaman tumbuh lebih baik. Daun kangkung terlihat segar, sedangkan tanaman cabai mulai menghasilkan buah kecil. Kebun tersebut menjadi sarana belajar yang membantu siswa memahami hubungan antara pengetahuan di kelas dan kegiatan nyata.

Pertanyaan: Makna kata layu pada bacaan tersebut adalah ....`,
    options: [
      { id: 'A', text: 'Tumbuh semakin tinggi dan kuat.' },
      { id: 'B', text: 'Kehilangan kesegaran sehingga daun atau tanaman tampak lemas.' },
      { id: 'C', text: 'Menghasilkan bunga dalam jumlah banyak.' },
      { id: 'D', text: 'Mengalami pertumbuhan yang sangat cepat.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-vii-5',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 5,
    points: 2,
    difficulty: 'sedang',
    prompt: `Ruang Kelas yang Nyaman

Ruang kelas VII B terletak di ujung koridor lantai satu. Dindingnya berwarna putih dengan beberapa poster pembelajaran yang ditempel di bagian belakang. Meja dan kursi disusun menghadap papan tulis, tetapi susunannya dapat diubah ketika siswa melakukan diskusi kelompok. Di dekat jendela terdapat dua tanaman kecil yang dirawat secara bergantian oleh siswa.

Ketika pagi hari, cahaya matahari masuk melalui jendela di sisi timur. Udara mengalir cukup baik karena terdapat beberapa ventilasi di bagian atas dinding. Di sudut kelas, sebuah rak digunakan untuk menyimpan kamus, buku bacaan, dan hasil karya siswa. Ruangan itu tidak memiliki pendingin udara, tetapi terasa cukup nyaman ketika jendela dibuka.

Guru dan siswa sepakat menjaga kebersihan kelas. Setiap kelompok menjalankan piket sesuai jadwal. Mereka juga membuat aturan sederhana agar barang-barang tidak berserakan dan poster tetap terawat.

Pertanyaan: Penilaian yang paling didukung oleh informasi dalam bacaan adalah ....`,
    options: [
      { id: 'A', text: 'Ruang kelas nyaman karena memiliki pendingin udara modern.' },
      { id: 'B', text: 'Ruang kelas tertata dan mendukung pembelajaran karena ventilasi, pencahayaan, serta pengelolaan kebersihannya.' },
      { id: 'C', text: 'Ruang kelas hanya cocok digunakan untuk kegiatan membaca mandiri.' },
      { id: 'D', text: 'Ruang kelas tidak membutuhkan perawatan karena sudah memiliki ventilasi.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-vii-6',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 6,
    points: 2,
    difficulty: 'sedang',
    prompt: `Bacaan: Membuat Kompos dari Sampah Daun

Sampah daun yang menumpuk di halaman sekolah dapat dimanfaatkan menjadi kompos. Sebelum memulai, siapkan daun kering, wadah berlubang, sedikit tanah, air secukupnya, dan alat pemotong. Daun kering dipotong menjadi bagian kecil agar lebih mudah terurai.

Masukkan potongan daun ke dalam wadah, lalu campurkan dengan tanah. Percikkan air secukupnya supaya bahan tetap lembap, tetapi jangan sampai terlalu basah. Tutup wadah dengan penutup yang masih memungkinkan udara masuk. Aduk campuran secara berkala dan periksa kelembapannya.

Setelah beberapa minggu, bahan akan berubah warna dan teksturnya menjadi lebih menyerupai tanah. Proses ini memerlukan waktu yang berbeda-beda, bergantung pada kondisi bahan dan lingkungan. Kompos yang telah matang dapat digunakan untuk membantu menyuburkan tanaman.

Pertanyaan: Bagian bacaan yang berfungsi sebagai langkah kerja adalah ....`,
    options: [
      { id: 'A', text: 'Penjelasan mengenai manfaat kompos bagi tanaman.' },
      { id: 'B', text: 'Pernyataan bahwa sampah daun menumpuk di halaman sekolah.' },
      { id: 'C', text: 'Petunjuk memotong daun, mencampurkannya dengan tanah, dan menjaga kelembapan.' },
      { id: 'D', text: 'Penjelasan bahwa waktu penguraian berbeda-beda.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-vii-7',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 7,
    points: 2,
    difficulty: 'sedang',
    prompt: `Menyiapkan Presentasi Kelompok

Kelompok Dita mendapat tugas mempresentasikan hasil pengamatan lingkungan sekolah. Mereka terlebih dahulu membaca kembali catatan hasil pengamatan dan memilih informasi yang paling penting. Setelah itu, mereka menyusun kerangka presentasi yang terdiri atas pembukaan, isi, dan kesimpulan.

Informasi yang telah dipilih kemudian ditulis dalam bentuk poin-poin singkat pada media presentasi. Mereka menambahkan foto hasil pengamatan sebagai bukti pendukung. Setelah bahan selesai, setiap anggota memperoleh bagian untuk disampaikan. Kelompok tersebut kemudian berlatih berbicara dengan suara jelas dan memperhatikan durasi.

Pada hari presentasi, salah seorang anggota bertugas menjelaskan hasil pengamatan, sedangkan anggota lainnya menampilkan gambar dan menjawab pertanyaan. Persiapan yang teratur membantu mereka menyampaikan informasi secara runtut dan mudah dipahami.

Pertanyaan: Urutan kegiatan yang paling tepat berdasarkan bacaan adalah ....`,
    options: [
      { id: 'A', text: 'Berlatih – memilih informasi – membuat kerangka – mengumpulkan catatan.' },
      { id: 'B', text: 'Memilih informasi – menyusun kerangka – membuat media presentasi – berlatih.' },
      { id: 'C', text: 'Membuat media – melakukan pengamatan – membagi tugas – memilih informasi.' },
      { id: 'D', text: 'Menjawab pertanyaan – membuat kerangka – memilih informasi – berlatih.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-vii-8',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 8,
    points: 2,
    difficulty: 'mudah',
    prompt: `Mengirim Pesan kepada Guru

Rafi ingin menanyakan tugas kepada guru melalui pesan singkat. Ia menyadari bahwa pesan kepada guru perlu ditulis dengan bahasa yang sopan dan jelas. Sebelum mengirim pesan, Rafi memeriksa nama penerima dan memastikan bahwa pertanyaannya memang berkaitan dengan pembelajaran.

Ia memulai pesan dengan salam, memperkenalkan diri, dan menyebutkan kelasnya. Setelah itu, ia menjelaskan maksud pesan secara singkat, misalnya menanyakan batas waktu pengumpulan tugas. Rafi menutup pesan dengan ucapan terima kasih. Ia juga menghindari penggunaan singkatan yang sulit dipahami dan tidak mengirim pesan berulang kali jika belum memperoleh balasan.

Guru membalas pesan tersebut pada waktu yang memungkinkan. Rafi membaca jawabannya dengan teliti dan menyimpan informasi penting agar tidak perlu bertanya kembali mengenai hal yang sama.

Pertanyaan: Tujuan utama petunjuk yang tersirat dalam bacaan adalah ....`,
    options: [
      { id: 'A', text: 'Mengajarkan cara mengirim pesan yang sopan, jelas, dan sesuai keperluan.' },
      { id: 'B', text: 'Mendorong siswa mengirim pesan kepada guru setiap saat.' },
      { id: 'C', text: 'Menjelaskan cara membuat akun media sosial baru.' },
      { id: 'D', text: 'Mengajarkan siswa agar tidak perlu bertanya kepada guru.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'bin-vii-9',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 9,
    points: 2,
    difficulty: 'mudah',
    prompt: `Semut dan Burung Pipit

Pada musim kemarau, seekor semut bekerja keras mengumpulkan makanan. Setiap pagi ia berjalan menuju ladang dan membawa butiran makanan ke sarangnya. Di atas pohon, Burung Pipit sering memperhatikan kegiatan Semut. Pipit menganggap Semut terlalu sibuk dan tidak pernah menikmati waktu luang.

Suatu hari, angin kencang merobohkan sebagian ranting pohon tempat Pipit menyimpan makanan. Pipit kesulitan menemukan persediaannya. Ia kemudian meminta bantuan Semut. Semut bersedia membantu mencari butiran makanan yang masih tersisa, tetapi ia juga mengingatkan Pipit agar mulai mempersiapkan persediaan sejak awal.

Pipit menyadari bahwa kebiasaannya menunda pekerjaan membuatnya kesulitan ketika keadaan berubah. Sejak saat itu, ia membagi waktunya untuk mencari makanan, beristirahat, dan menjaga sarangnya.

Pertanyaan: Watak Semut yang paling tepat berdasarkan tindakannya adalah ....`,
    options: [
      { id: 'A', text: 'Sombong karena merasa pekerjaannya paling penting.' },
      { id: 'B', text: 'Pemalas karena hanya bekerja pada musim kemarau.' },
      { id: 'C', text: 'Rajin dan bersedia membantu tanpa mengabaikan tanggung jawab.' },
      { id: 'D', text: 'Iri terhadap kehidupan Burung Pipit.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-vii-10',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 10,
    points: 2,
    difficulty: 'mudah',
    prompt: `Kelinci dan Kura-Kura di Kebun

Kelinci merasa dirinya pelari tercepat di kebun. Ketika Kura-Kura mengajak bekerja sama mengumpulkan sayuran untuk persediaan musim hujan, Kelinci menolak. Ia yakin dapat menyelesaikan seluruh pekerjaan dalam waktu singkat.

Kelinci berlari mengelilingi kebun, tetapi tidak memperhatikan tempat penyimpanan yang telah disiapkan. Banyak sayuran yang dikumpulkannya tertinggal di jalan. Sementara itu, Kura-Kura bekerja perlahan, tetapi selalu meletakkan hasil panennya di keranjang dan mencatat jumlahnya.

Ketika hujan mulai turun, Kura-Kura telah memiliki persediaan yang cukup. Kelinci baru menyadari bahwa kecepatan tidak selalu menjamin hasil yang baik. Ia kemudian meminta maaf dan belajar menyelesaikan pekerjaan dengan lebih teratur.

Pertanyaan: Amanat yang paling sesuai dengan cerita adalah ....`,
    options: [
      { id: 'A', text: 'Orang yang bergerak cepat tidak perlu merencanakan pekerjaan.' },
      { id: 'B', text: 'Ketelitian, tanggung jawab, dan keteraturan penting untuk mencapai hasil yang baik.' },
      { id: 'C', text: 'Setiap pekerjaan harus dilakukan seorang diri.' },
      { id: 'D', text: 'Keberhasilan hanya ditentukan oleh kemampuan fisik.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-vii-11',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 11,
    points: 2,
    difficulty: 'mudah',
    prompt: `Layang-Layang Putus

Pada sore hari, Fajar bermain layang-layang bersama teman-temannya di lapangan. Angin bertiup cukup kencang sehingga layang-layangnya terbang tinggi. Fajar merasa bangga karena layang-layangnya menjadi yang paling tinggi di antara milik teman-temannya.

Tiba-tiba, benang layang-layang putus. Layang-layang itu terbawa angin dan tersangkut pada pohon di dekat jalan. Fajar ingin segera mengambilnya, tetapi ia melihat kendaraan melintas di sekitar pohon. Temannya menyarankan agar mereka meminta bantuan orang dewasa daripada memanjat pohon atau berlari ke jalan.

Awalnya Fajar kecewa karena tidak dapat mengambil layang-layangnya sendiri. Namun, setelah meminta bantuan penjaga lapangan, layang-layang berhasil diambil dengan aman. Fajar menyadari bahwa keselamatan lebih penting daripada keinginannya memperoleh kembali barang yang hilang.

Pertanyaan: Konflik utama yang dihadapi Fajar adalah ....`,
    options: [
      { id: 'A', text: 'Ia tidak diizinkan bermain bersama teman-temannya.' },
      { id: 'B', text: 'Ia tidak mampu membuat layang-layang yang dapat terbang.' },
      { id: 'C', text: 'Teman-temannya tidak mau bermain di lapangan.' },
      { id: 'D', text: 'Layang-layangnya tersangkut di tempat yang berbahaya untuk dijangkau sendiri.' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'bin-vii-12',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 12,
    points: 2,
    difficulty: 'mudah',
    prompt: `Buku Catatan yang Hilang

Nadia dikenal sebagai siswa yang rajin mencatat penjelasan guru. Suatu hari, ia menemukan buku catatan milik Arman di bawah meja. Karena sedang terburu-buru mengikuti kegiatan olahraga, Nadia meletakkan buku tersebut di tasnya tanpa memberi tahu siapa pun.

Ketika Arman mencari bukunya, ia merasa khawatir karena catatan itu akan digunakan untuk belajar. Nadia baru menyadari kesalahannya ketika membuka tas sepulang sekolah. Ia segera menghubungi Arman, menjelaskan kejadian sebenarnya, dan meminta maaf.

Keesokan harinya, Nadia mengembalikan buku itu dalam keadaan baik. Ia berjanji akan lebih teliti dan segera menyerahkan barang yang bukan miliknya kepada pemilik atau guru. Arman menerima permintaan maaf tersebut, dan mereka kembali belajar bersama.

Pertanyaan: Perubahan sikap Nadia ditunjukkan oleh ....`,
    options: [
      { id: 'A', text: 'Ia memilih menyembunyikan buku agar tidak diminta kembali.' },
      { id: 'B', text: 'Ia menyadari kesalahannya, meminta maaf, dan mengembalikan buku kepada pemiliknya.' },
      { id: 'C', text: 'Ia menyalahkan Arman karena tidak menjaga barangnya.' },
      { id: 'D', text: 'Ia berhenti mencatat penjelasan guru.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-vii-13',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 13,
    points: 2,
    difficulty: 'sedang',
    prompt: `Program Jumat Bersih

SMP Pelita Bangsa melaksanakan kegiatan Jumat Bersih setiap pekan. Pada kegiatan tersebut, siswa membersihkan ruang kelas, menyapu koridor, merapikan taman, dan mengumpulkan sampah yang ditemukan di lingkungan sekolah. Kegiatan dimulai pukul 07.00 dan berlangsung selama tiga puluh menit sebelum pembelajaran.

Menurut laporan pengurus OSIS, pada Jumat pertama ditemukan dua belas kantong sampah di halaman dan koridor. Pada Jumat keempat, jumlah sampah yang dikumpulkan berkurang menjadi tujuh kantong. Pengurus OSIS menyatakan bahwa kegiatan tersebut sangat bermanfaat karena membuat sekolah lebih nyaman.

Namun, beberapa siswa berpendapat bahwa kegiatan Jumat Bersih sebaiknya disertai edukasi pengelolaan sampah. Mereka menilai bahwa membersihkan sampah saja belum cukup jika kebiasaan membuang sampah sembarangan tetap terjadi.

Pertanyaan: Kalimat yang merupakan fakta berdasarkan bacaan adalah ....`,
    options: [
      { id: 'A', text: 'Kegiatan Jumat Bersih merupakan kegiatan paling menyenangkan.' },
      { id: 'B', text: 'Sekolah menjadi tempat terbaik untuk belajar di kota tersebut.' },
      { id: 'C', text: 'Pada Jumat pertama ditemukan dua belas kantong sampah.' },
      { id: 'D', text: 'Semua siswa pasti menyukai kegiatan Jumat Bersih.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-vii-14',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 14,
    points: 2,
    difficulty: 'sedang',
    prompt: `Manfaat Membaca Sebelum Tidur

Membaca buku sebelum tidur menjadi kebiasaan sebagian siswa. Mereka memilih cerita pendek, buku pengetahuan, atau bacaan ringan yang tidak membutuhkan banyak waktu. Beberapa siswa mengatakan bahwa membaca membuat mereka merasa lebih tenang setelah menjalani kegiatan sekolah.

Seorang siswa menyatakan bahwa membaca selama lima belas menit sebelum tidur pasti meningkatkan nilai semua mata pelajaran. Ia mendasarkan pendapatnya pada pengalaman pribadi setelah memperoleh nilai yang baik dalam satu ulangan. Namun, ia belum membandingkan kebiasaan belajar siswa lain atau mempertimbangkan faktor seperti latihan soal, pemahaman materi, dan waktu istirahat.

Guru Bahasa Indonesia menyarankan agar siswa membiasakan membaca karena kegiatan itu dapat memperkaya kosakata dan menambah pengetahuan. Meskipun demikian, peningkatan nilai pelajaran tidak dapat dipastikan hanya dari satu kebiasaan.

Pertanyaan: Alasan yang paling tepat untuk menyatakan bahwa klaim siswa tersebut belum cukup kuat adalah ....`,
    options: [
      { id: 'A', text: 'Membaca buku tidak memiliki manfaat apa pun bagi siswa.' },
      { id: 'B', text: 'Semua siswa mempunyai kebiasaan membaca yang sama.' },
      { id: 'C', text: 'Nilai ulangan tidak pernah berkaitan dengan proses belajar.' },
      { id: 'D', text: 'Klaim hanya didasarkan pada pengalaman pribadi tanpa bukti yang cukup untuk semua siswa.' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'bin-vii-15',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 15,
    points: 2,
    difficulty: 'sedang',
    prompt: `Pentingnya Sarapan

Sarapan merupakan kegiatan makan pada pagi hari sebelum memulai aktivitas. Setelah tidak memperoleh asupan makanan selama tidur malam, tubuh membutuhkan energi untuk menjalankan kegiatan pada pagi hari. Menu sarapan tidak harus mahal, tetapi sebaiknya mengandung beragam zat gizi sesuai kebutuhan.

Sebagian siswa berangkat ke sekolah hanya dengan minum teh atau air putih karena takut terlambat. Ketika kegiatan belajar berlangsung, mereka terkadang merasa lapar dan sulit berkonsentrasi. Meskipun demikian, kondisi setiap orang berbeda, sehingga kebutuhan dan waktu makan juga dapat bervariasi.

Orang tua dan sekolah dapat membantu siswa membangun kebiasaan makan yang teratur dengan memberikan edukasi tentang gizi dan menyediakan pilihan makanan yang sesuai. Dengan pemahaman yang baik, siswa diharapkan dapat lebih memperhatikan kebutuhan tubuhnya sebelum mengikuti pembelajaran.

Pertanyaan: Ide pokok bacaan tersebut adalah ....`,
    options: [
      { id: 'A', text: 'Sarapan dan pemahaman gizi berperan dalam mendukung kesiapan siswa menjalani aktivitas.' },
      { id: 'B', text: 'Semua siswa yang tidak sarapan pasti gagal dalam pelajaran.' },
      { id: 'C', text: 'Sarapan hanya diperlukan oleh siswa yang mengikuti olahraga.' },
      { id: 'D', text: 'Makanan mahal merupakan syarat utama untuk sarapan sehat.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'bin-vii-16',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 16,
    points: 2,
    difficulty: 'mudah',
    prompt: `Pengumuman Lomba Membaca Puisi

Dalam rangka memperingati Bulan Bahasa, SMP Bina Karya mengadakan lomba membaca puisi untuk siswa kelas VII dan VIII. Kegiatan akan dilaksanakan pada Kamis, 12 November, pukul 09.00–11.30 WITA di aula sekolah. Setiap kelas dapat mengirimkan paling banyak dua peserta.

Peserta diminta membawakan satu puisi berbahasa Indonesia dengan durasi penampilan maksimal lima menit. Puisi boleh dipilih dari buku pelajaran atau sumber bacaan lain yang sesuai untuk siswa. Peserta tidak diperbolehkan menggunakan kata-kata yang menghina kelompok tertentu atau menampilkan materi yang tidak pantas.

Pendaftaran dilakukan melalui wali kelas paling lambat tanggal 8 November. Pengumuman pemenang akan disampaikan setelah seluruh peserta selesai tampil dan dewan juri melakukan penilaian berdasarkan penghayatan, pelafalan, intonasi, serta ekspresi.

Pertanyaan: Informasi yang benar berdasarkan pengumuman adalah ....`,
    options: [
      { id: 'A', text: 'Lomba hanya diikuti siswa kelas IX.' },
      { id: 'B', text: 'Setiap kelas dapat mengirimkan paling banyak dua peserta.' },
      { id: 'C', text: 'Peserta wajib membawakan tiga puisi sekaligus.' },
      { id: 'D', text: 'Pendaftaran ditutup pada hari pelaksanaan lomba.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-vii-17',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 17,
    points: 2,
    difficulty: 'mudah',
    prompt: `Bacaan: Deskripsi Poster Hemat Air

Di dekat tempat mencuci tangan, sekolah memasang poster bergambar keran yang meneteskan air ke dalam sebuah ember. Di bagian atas tertulis kalimat, “Setetes Air Berarti untuk Masa Depan.” Di bawah gambar terdapat tiga ajakan singkat: tutup keran setelah digunakan, gunakan air secukupnya, dan laporkan keran yang bocor kepada petugas.

Poster tersebut menggunakan huruf besar pada kalimat utama agar mudah dibaca dari kejauhan. Gambar keran dibuat lebih menonjol daripada tulisan penjelas. Warna biru dan putih mendominasi poster untuk memperkuat kesan air yang bersih.

Guru menjelaskan bahwa poster bukan hanya hiasan dinding. Pesan yang disampaikan perlu diwujudkan dalam perilaku sehari-hari. Karena itu, siswa diminta memperhatikan penggunaan air saat mencuci tangan dan membersihkan kelas.

Pertanyaan: Tujuan utama poster tersebut adalah ....`,
    options: [
      { id: 'A', text: 'Mengajak siswa menghemat air melalui tindakan sederhana.' },
      { id: 'B', text: 'Menjelaskan cara membuat keran air dari bahan bekas.' },
      { id: 'C', text: 'Mengiklankan penjualan ember dan peralatan kebersihan.' },
      { id: 'D', text: 'Menceritakan pengalaman siswa ketika kekurangan air.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'bin-vii-18',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 18,
    points: 2,
    difficulty: 'sedang',
    prompt: `Bacaan: Perjalanan Buku Kelas

Kelas VII A memiliki program pertukaran buku setiap bulan. Setiap siswa boleh membawa satu buku yang masih layak dibaca untuk ditukarkan dengan buku milik temannya. Sebelum pertukaran, pengurus kelas mencatat judul buku, nama pemilik, dan kondisi buku.

Pada bulan pertama, hanya dua belas siswa yang mengikuti program tersebut. Beberapa siswa mengaku belum mengetahui buku apa yang dapat dibawa. Pengurus kelas kemudian membuat daftar kategori buku yang sesuai, seperti cerita anak, pengetahuan umum, dan komik edukatif.

Pada bulan kedua, jumlah peserta meningkat menjadi dua puluh siswa. Beberapa siswa yang sebelumnya jarang membaca mulai meminjam buku dari teman. Pengurus kelas tetap mengingatkan semua peserta untuk menjaga buku dan mengembalikannya sesuai kesepakatan.

Pertanyaan: Simpulan yang paling tepat berdasarkan bacaan adalah ....`,
    options: [
      { id: 'A', text: 'Semua siswa wajib menyerahkan seluruh buku miliknya.' },
      { id: 'B', text: 'Pertukaran buku hanya dapat dilakukan jika sekolah membeli buku baru.' },
      { id: 'C', text: 'Penambahan informasi tentang kategori buku dapat membantu meningkatkan partisipasi siswa.' },
      { id: 'D', text: 'Program pertukaran buku menyebabkan siswa tidak perlu belajar.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-vii-19',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 19,
    points: 2,
    difficulty: 'sedang',
    prompt: `Bacaan: Sampah Plastik di Kantin

Setiap jam istirahat, kantin sekolah menjual makanan dan minuman dalam berbagai kemasan. Setelah istirahat berakhir, petugas sering menemukan gelas plastik dan bungkus makanan di sekitar meja. Tempat sampah sebenarnya telah tersedia, tetapi sebagian siswa terburu-buru kembali ke kelas dan meninggalkan sampah di meja.

Pengurus OSIS kemudian mengusulkan tiga tindakan. Pertama, memasang tanda pengingat di meja kantin. Kedua, mengajak siswa membawa wadah minum sendiri. Ketiga, mengadakan pemantauan kebersihan secara berkala bersama petugas kantin.

Beberapa siswa mengusulkan agar sekolah langsung melarang seluruh makanan dan minuman berkemasan tanpa menyediakan alternatif. Guru meminta pengurus OSIS mempertimbangkan dampak setiap usulan, termasuk kemudahan pelaksanaan dan kerja sama dengan penjual kantin.

Pertanyaan: Usulan yang paling masuk akal untuk mengurangi sampah sekaligus membangun kebiasaan bertanggung jawab adalah ....`,
    options: [
      { id: 'A', text: 'Menghapus waktu istirahat agar siswa tidak membeli makanan.' },
      { id: 'B', text: 'Menggabungkan pengingat, penggunaan wadah pakai ulang, dan pemantauan kebersihan.' },
      { id: 'C', text: 'Membiarkan sampah menumpuk agar siswa dapat melihat akibatnya.' },
      { id: 'D', text: 'Menyalahkan petugas kantin atas semua sampah yang ditemukan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-vii-20',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg',
    number: 20,
    points: 2,
    difficulty: 'sedang',
    prompt: `Bacaan: Tanaman Cabai yang Menguning

Kelompok Sinta menanam cabai dalam pot di halaman sekolah. Pada minggu pertama, tanaman tumbuh cukup baik. Namun, setelah beberapa hari hujan turun hampir setiap sore, sebagian daun mulai menguning. Kelompok itu mengira tanaman kekurangan air, sehingga mereka tetap menyiramnya setiap pagi.

Guru mengajak siswa memeriksa kondisi tanah dan lubang pembuangan air pada pot. Ternyata, sebagian pot tidak memiliki lubang yang memadai sehingga air menggenang terlalu lama. Guru menjelaskan bahwa akar membutuhkan air sekaligus udara, dan tanah yang terlalu basah dapat mengganggu kondisi akar.

Siswa kemudian memperbaiki lubang pembuangan air dan menyesuaikan penyiraman berdasarkan kelembapan tanah. Setelah beberapa waktu, mereka mengamati apakah kondisi tanaman membaik dan mencatat hasilnya dalam tabel sederhana.

Pertanyaan: Penyebab yang paling didukung oleh informasi dalam bacaan adalah ....`,
    options: [
      { id: 'A', text: 'Tanaman cabai tidak membutuhkan sinar matahari sama sekali.' },
      { id: 'B', text: 'Daun menguning karena semua tanaman selalu kekurangan air ketika hujan.' },
      { id: 'C', text: 'Tanaman tidak dapat tumbuh jika ditanam dalam pot.' },
      { id: 'D', text: 'Air yang menggenang akibat drainase kurang baik dapat mengganggu kondisi akar.' }
    ],
    correctAnswers: ['D']
  },

  // =========================================================================
  // B. PILIHAN GANDA KOMPLEKS (NOMOR 21–25) — 4 POIN PER SOAL
  // =========================================================================
  {
    id: 'bin-vii-21',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 21,
    points: 4,
    difficulty: 'sedang',
    prompt: `Bacaan: Hasil Pengamatan Kebersihan Kelas

Kelompok literasi kelas VII B melakukan pengamatan kebersihan selama lima hari sekolah. Setiap pagi, mereka memeriksa kondisi lantai, meja, tempat sampah, dan ventilasi. Hasil pengamatan dicatat pada lembar kerja yang sama agar mudah dibandingkan.

Pada hari Senin, kelompok menemukan sampah kertas di bawah tiga meja dan tempat sampah yang hampir penuh. Pada hari Rabu, lantai terlihat bersih, tetapi beberapa meja belum dirapikan. Pada hari Jumat, sebagian besar meja sudah tersusun rapi dan tidak ditemukan sampah di bawah meja. Kelompok juga mencatat bahwa tempat sampah lebih cepat penuh setelah kegiatan membuat kerajinan.

Mereka menyimpulkan bahwa kebersihan kelas tidak cukup dijaga melalui piket saja. Siswa perlu membuang sampah dengan benar dan merapikan meja setelah kegiatan. Guru meminta mereka melanjutkan pengamatan untuk mengetahui apakah perubahan kebiasaan tersebut bertahan.

Pertanyaan: Pernyataan yang termasuk fakta berdasarkan bacaan adalah ....
(Pilihlah semua jawaban yang benar. Setiap nomor memiliki lebih dari satu jawaban yang benar.)`,
    options: [
      { id: 'A', text: 'Pada hari Senin ditemukan sampah kertas di bawah tiga meja.' },
      { id: 'B', text: 'Semua siswa kelas VII B selalu menjaga kebersihan dengan sempurna.' },
      { id: 'C', text: 'Pada hari Rabu beberapa meja belum dirapikan.' },
      { id: 'D', text: 'Kelas VII B merupakan kelas paling bersih di sekolah.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'bin-vii-22',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 22,
    points: 4,
    difficulty: 'sedang',
    prompt: `Bacaan: Peminjaman Buku Perpustakaan

Petugas perpustakaan mencatat jumlah buku yang dipinjam selama empat minggu. Pada minggu pertama terdapat 24 peminjaman, minggu kedua 28 peminjaman, minggu ketiga 35 peminjaman, dan minggu keempat 38 peminjaman. Selama periode tersebut, sekolah mengadakan kegiatan membaca bersama dan menampilkan rekomendasi buku pada papan informasi.

Guru menyatakan bahwa kenaikan jumlah peminjaman merupakan perkembangan yang menggembirakan. Namun, ia mengingatkan bahwa data tersebut belum menunjukkan penyebab kenaikan secara pasti. Bisa saja kegiatan membaca berpengaruh, tetapi faktor lain seperti buku baru atau tugas dari guru juga mungkin berperan.

Untuk memperoleh gambaran lebih jelas, sekolah berencana mencatat jenis buku yang dipinjam, jumlah siswa yang meminjam, dan alasan mereka memilih buku tertentu. Hasil pencatatan akan digunakan untuk merencanakan kegiatan literasi berikutnya.

Pertanyaan: Pernyataan yang sesuai dengan bacaan adalah ....
(Pilihlah semua jawaban yang benar. Setiap nomor memiliki lebih dari satu jawaban yang benar.)`,
    options: [
      { id: 'A', text: 'Jumlah peminjaman buku meningkat dari minggu pertama hingga minggu keempat.' },
      { id: 'B', text: 'Data tersebut membuktikan bahwa kegiatan membaca bersama merupakan satu-satunya penyebab kenaikan.' },
      { id: 'C', text: 'Sekolah dapat mengumpulkan data tambahan untuk memahami penyebab kenaikan peminjaman.' },
      { id: 'D', text: 'Jumlah peminjaman buku selalu menurun setiap minggu.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'bin-vii-23',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 23,
    points: 4,
    difficulty: 'sedang',
    prompt: `Bacaan: Sungai di Dekat Permukiman

Warga yang tinggal di dekat sungai melihat bahwa air menjadi lebih keruh setelah hujan deras. Di beberapa bagian tepi sungai, ditemukan bungkus makanan dan botol plastik yang tersangkut di antara ranting. Sejumlah warga menduga bahwa sampah dari permukiman ikut terbawa aliran air, tetapi mereka belum mengetahui seluruh sumber sampah tersebut.

Ketua RT mengajak warga mengamati kondisi sungai dari tempat yang aman. Mereka mencatat lokasi sampah, mengambil foto sebagai dokumentasi, dan mendiskusikan cara mengurangi sampah. Warga juga mengusulkan kegiatan kerja bakti serta penyediaan tempat sampah yang lebih mudah dijangkau.

Ketua RT mengingatkan bahwa membersihkan sungai perlu dilakukan secara hati-hati. Warga tidak boleh turun ke aliran yang deras atau menyentuh benda yang berbahaya. Jika ditemukan kondisi yang membutuhkan penanganan khusus, mereka akan melaporkannya kepada petugas terkait.

Pertanyaan: Tindakan yang tepat berdasarkan bacaan adalah ....
(Pilihlah semua jawaban yang benar. Setiap nomor memiliki lebih dari satu jawaban yang benar.)`,
    options: [
      { id: 'A', text: 'Mencatat lokasi sampah dan mendokumentasikan kondisi sungai dari tempat aman.' },
      { id: 'B', text: 'Langsung menyimpulkan bahwa seluruh sampah berasal dari satu rumah.' },
      { id: 'C', text: 'Melakukan kerja bakti dengan memperhatikan keselamatan dan kemampuan warga.' },
      { id: 'D', text: 'Memasuki sungai yang deras untuk mengambil semua sampah secepat mungkin.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'bin-vii-24',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 24,
    points: 4,
    difficulty: 'mudah',
    prompt: `Bacaan: Kegiatan Kunjungan Literasi

SMP Citra Bangsa mengadakan kunjungan literasi ke perpustakaan daerah pada Sabtu, 21 November. Kegiatan ditujukan kepada siswa kelas VII yang telah mendaftar melalui wali kelas. Peserta berkumpul di halaman sekolah pukul 07.00 WITA dan kembali diperkirakan pukul 12.00 WITA.

Setiap peserta diminta membawa alat tulis, buku catatan, bekal secukupnya, serta kartu identitas pelajar. Selama kunjungan, siswa akan mengenal cara mencari buku berdasarkan katalog, memahami aturan peminjaman, dan mengikuti kegiatan membaca mandiri. Peserta juga diminta menjaga ketertiban dan menghormati pengunjung lain.

Siswa yang berhalangan hadir harus memberi tahu wali kelas sebelum hari keberangkatan. Sekolah meminta peserta membaca kembali pengumuman agar tidak ada perlengkapan penting yang tertinggal.

Pertanyaan: Informasi yang benar berdasarkan pengumuman adalah ....
(Pilihlah semua jawaban yang benar. Setiap nomor memiliki lebih dari satu jawaban yang benar.)`,
    options: [
      { id: 'A', text: 'Peserta berkumpul di halaman sekolah pukul 07.00 WITA.' },
      { id: 'B', text: 'Semua siswa sekolah wajib mengikuti kunjungan tanpa pendaftaran.' },
      { id: 'C', text: 'Siswa akan belajar menggunakan katalog perpustakaan.' },
      { id: 'D', text: 'Peserta tidak perlu membawa alat tulis atau buku catatan.' }
    ],
    correctAnswers: ['A', 'C']
  },
  {
    id: 'bin-vii-25',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'pg_kompleks',
    number: 25,
    points: 4,
    difficulty: 'sedang',
    prompt: `Bacaan: Bijak Menggunakan Telepon Genggam

Di papan informasi sekolah terdapat poster yang mengajak siswa menggunakan telepon genggam secara bijak. Poster itu menampilkan gambar seorang siswa yang meletakkan telepon genggam di dalam tas saat guru menjelaskan materi. Di bagian bawah, tertulis pesan, “Gunakan Teknologi untuk Belajar, Bukan untuk Mengabaikan Sekitar.”

Poster menjelaskan bahwa telepon genggam dapat digunakan untuk mencari informasi, membaca materi digital, dan mengerjakan tugas ketika diizinkan guru. Namun, penggunaan tanpa kendali dapat mengganggu konsentrasi, mengurangi interaksi langsung, dan membuat siswa melewatkan informasi penting.

Poster juga mengajak siswa memeriksa kebenaran informasi sebelum membagikannya. Jika menemukan berita yang meragukan, siswa dianjurkan mencari sumber tepercaya dan membandingkan informasi. Dengan demikian, teknologi dapat dimanfaatkan secara bertanggung jawab.

Pertanyaan: Pesan yang sesuai dengan poster adalah ....
(Pilihlah semua jawaban yang benar. Setiap nomor memiliki lebih dari satu jawaban yang benar.)`,
    options: [
      { id: 'A', text: 'Telepon genggam harus digunakan setiap saat agar siswa tidak ketinggalan informasi.' },
      { id: 'B', text: 'Teknologi dapat mendukung pembelajaran jika digunakan sesuai kebutuhan.' },
      { id: 'C', text: 'Informasi di internet selalu benar sehingga tidak perlu diperiksa.' },
      { id: 'D', text: 'Siswa perlu menjaga konsentrasi dan memeriksa kebenaran informasi digital.' }
    ],
    correctAnswers: ['B', 'D']
  },

  // =========================================================================
  // C. BENAR ATAU SALAH (NOMOR 26–28) — 2 POIN PER SOAL
  // =========================================================================
  {
    id: 'bin-vii-26',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'benar_salah',
    number: 26,
    points: 2,
    difficulty: 'mudah',
    prompt: `${BIN_GENANGAN_STIMULUS}

Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan bacaan:
Permukaan yang tertutup semen dapat menyerap air lebih sedikit daripada tanah terbuka.`,
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR'],
    essayRubric: 'Permukaan semen cenderung menyerap lebih sedikit air daripada tanah terbuka.'
  },
  {
    id: 'bin-vii-27',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'benar_salah',
    number: 27,
    points: 2,
    difficulty: 'sedang',
    prompt: `${BIN_GENANGAN_STIMULUS}

Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan bacaan:
Membersihkan saluran air selalu menjamin bahwa tidak akan ada genangan di halaman sekolah.`,
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH'],
    essayRubric: 'Pembersihan saluran membantu, tetapi genangan juga dipengaruhi faktor lain.'
  },
  {
    id: 'bin-vii-28',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'benar_salah',
    number: 28,
    points: 2,
    difficulty: 'mudah',
    prompt: `${BIN_GENANGAN_STIMULUS}

Tentukan apakah pernyataan berikut Benar atau Salah berdasarkan bacaan:
Sampah dan daun kering yang menutup saluran dapat menghambat aliran air.`,
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR'],
    essayRubric: 'Sampah dan daun yang menutup saluran dapat menghambat aliran air.'
  },

  // =========================================================================
  // D. URAIAN BERBASIS LITERASI (NOMOR 29–30) — 17 POIN PER SOAL
  // =========================================================================
  {
    id: 'bin-vii-29',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'uraian',
    number: 29,
    points: 17,
    difficulty: 'sukar',
    prompt: `Bacaan: Kantin Sehat untuk Siswa

Kantin SMP Maju Bersama ramai dikunjungi saat istirahat. Berbagai makanan dijual dengan harga yang beragam. Sebagian pedagang menyediakan buah potong, makanan rumahan, dan air minum, sedangkan pedagang lainnya menjual makanan ringan dalam kemasan. Sekolah berusaha menjaga agar lingkungan kantin tetap bersih dan nyaman.

Dalam pengamatan selama satu minggu, pengurus OSIS menemukan bahwa sampah kemasan sering menumpuk di dekat meja. Beberapa siswa juga meninggalkan sisa makanan di piring karena membeli makanan lebih banyak daripada yang sanggup mereka habiskan. Petugas kantin harus membersihkan area tersebut berulang kali sebelum jam istirahat berikutnya.

Pengurus OSIS mengusulkan tiga langkah: mengajak siswa membeli makanan sesuai kebutuhan, membiasakan membuang sampah pada tempatnya, dan bekerja sama dengan pedagang untuk mengurangi kemasan yang tidak diperlukan. Mereka juga ingin memasang poster tentang kebersihan dan memilih makanan yang sesuai kebutuhan tubuh.

Guru mendukung usulan itu, tetapi meminta OSIS melakukan evaluasi setelah dua minggu. Evaluasi akan melihat apakah sampah berkurang dan apakah siswa semakin terbiasa menjaga kebersihan kantin.

Pertanyaan (Jawablah dengan bahasa yang jelas, disertai alasan berdasarkan bacaan):
a. Sebutkan dua masalah yang ditemukan di kantin berdasarkan bacaan.
b. Jelaskan mengapa poster saja belum tentu cukup untuk mengatasi masalah tersebut.
c. Tuliskan dua tindakan nyata yang dapat dilakukan siswa untuk membantu menciptakan kantin yang bersih dan sehat.`,
    options: [],
    essayRubric: `a. Dua masalah yang ditemukan:
- Sampah kemasan menumpuk di dekat meja kantin.
- Siswa meninggalkan sisa makanan karena membeli makanan melebihi kebutuhan.
b. Poster saja belum tentu cukup karena perubahan perilaku membutuhkan tindakan nyata, pembiasaan, kerja sama dengan pedagang, dan evaluasi berkala.
c. Contoh tindakan:
- Membuang sampah sesuai jenis dan tempatnya.
- Membeli makanan sesuai kebutuhan dan menghabiskan makanan yang diambil.
- Mengurangi penggunaan kemasan yang tidak diperlukan.`
  },
  {
    id: 'bin-vii-30',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-1',
    grade: 'VII',
    type: 'uraian',
    number: 30,
    points: 17,
    difficulty: 'sukar',
    prompt: `Bacaan: Membaca Buku atau Menonton Video?

Di kelas VII C, guru memberikan tugas untuk mempelajari sebuah topik tentang lingkungan. Siswa boleh membaca buku, artikel, atau menonton video edukatif yang sesuai. Setelah kegiatan selesai, setiap siswa diminta menuliskan informasi penting dan menyampaikan hal yang mereka pelajari.

Dua siswa memiliki pendapat berbeda. Damar mengatakan bahwa video lebih baik daripada buku karena gambar bergerak dan suara memudahkan dirinya memahami materi. Sementara itu, Lani berpendapat bahwa buku lebih membantu karena ia dapat membaca ulang bagian yang sulit dan mencatat informasi secara teratur.

Guru menjelaskan bahwa setiap media memiliki kelebihan dan keterbatasan. Video dapat membantu menjelaskan proses yang sulit dibayangkan, sedangkan buku memungkinkan pembaca mengatur kecepatan membaca dan menelaah informasi secara lebih mendalam. Kualitas sumber, kesesuaian isi, dan cara siswa memanfaatkan media juga memengaruhi hasil belajar.

Akhirnya, guru meminta siswa membandingkan dua sumber yang membahas topik sama. Mereka harus mencatat informasi yang serupa, memeriksa perbedaan, dan menyimpulkan media mana yang paling membantu untuk kebutuhan belajar mereka. Tujuan kegiatan bukan menentukan satu media yang selalu paling baik, melainkan melatih siswa memilih sumber secara kritis.

Pertanyaan (Jawablah dengan bahasa yang jelas, disertai alasan berdasarkan bacaan):
a. Jelaskan perbedaan pendapat Damar dan Lani.
b. Menurutmu, apakah video selalu lebih baik daripada buku? Berikan alasan berdasarkan bacaan.
c. Sebutkan dua langkah yang dapat dilakukan siswa untuk menilai apakah suatu sumber informasi layak digunakan.`,
    options: [],
    essayRubric: `a. Damar menganggap video membantu pemahaman melalui gambar bergerak dan suara, sedangkan Lani menganggap buku memudahkannya membaca ulang dan mencatat informasi.
b. Video tidak selalu lebih baik daripada buku. Keduanya memiliki kelebihan dan keterbatasan. Pilihan media perlu disesuaikan dengan tujuan belajar, kualitas sumber, dan kebutuhan siswa.
c. Dua langkah untuk menilai sumber:
- Memeriksa kredibilitas pembuat atau penerbit sumber.
- Membandingkan informasi dengan sumber tepercaya lainnya.
- Memastikan informasi sesuai dengan topik dan didukung bukti.`
  }
];
