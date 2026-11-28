import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI BAHASA INDONESIA KELAS VIII
// Sumber: SOAL_BAHASA_INDONESIA_KELAS_8_dea620df.pdf (30 Soal Pilihan Ganda)
// Bobot: 5 poin per soal
// Klasifikasi Tingkat Kesulitan (Hal. 9):
// - LOW (mudah): 1, 3, 4, 6, 8, 9, 10, 13, 16, 17, 21, 24, 26, 28
// - MEDIUM (sedang): 2, 5, 7, 11, 12, 15, 18, 20, 22, 27
// - HOTS (sukar): 14, 19, 23, 25, 29, 30
// =========================================================================

export const BIN_KELAS_8_QUESTIONS: Question[] = [
  {
    id: 'bin-viii-1',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Hutan Mangrove di Pesisir

Hutan mangrove merupakan ekosistem tumbuhan yang hidup di wilayah pesisir dan dipengaruhi oleh pasang surut air laut. Tumbuhan mangrove memiliki akar yang khas dan mampu bertahan di lingkungan berlumpur serta memiliki kadar garam tinggi. Akar tersebut membantu tumbuhan berdiri kokoh meskipun diterpa gelombang.
Selain menjadi tempat hidup berbagai jenis hewan, hutan mangrove juga memiliki peran penting bagi lingkungan. Kawasan ini menjadi tempat berkembang biak ikan, kepiting, dan udang. Hutan mangrove juga dapat mengurangi kekuatan gelombang laut sehingga membantu melindungi wilayah pesisir dari abrasi.

Informasi yang menunjukkan pengertian umum hutan mangrove adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Hutan mangrove menjadi tempat berkembang biak kepiting dan udang.' },
      { id: 'B', text: 'Hutan mangrove merupakan ekosistem tumbuhan di wilayah pesisir.' },
      { id: 'C', text: 'Hutan mangrove dapat mengurangi kekuatan gelombang laut.' },
      { id: 'D', text: 'Akar mangrove membantu melindungi wilayah pesisir dari abrasi.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-2',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Kupu-Kupu dan Lingkungan

Kupu-kupu merupakan serangga yang memiliki dua pasang sayap bersisik. Tubuhnya terdiri atas tiga bagian, yaitu kepala, dada, dan perut. Kupu-kupu memiliki alat pengisap yang disebut probosis untuk mengambil nektar dari bunga.
Dalam kehidupannya, kupu-kupu mengalami proses metamorfosis sempurna. Tahap perkembangannya dimulai dari telur, kemudian menjadi larva atau ulat, kepompong, dan akhirnya kupu-kupu dewasa. Keberadaan kupu-kupu juga memiliki manfaat bagi lingkungan karena membantu proses penyerbukan pada beberapa jenis tumbuhan.

Mengapa kupu-kupu memiliki peran penting bagi lingkungan?`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Karena kupu-kupu dapat hidup di berbagai tempat.' },
      { id: 'B', text: 'Karena kupu-kupu mengalami metamorfosis sempurna.' },
      { id: 'C', text: 'Karena kupu-kupu membantu proses penyerbukan tumbuhan.' },
      { id: 'D', text: 'Karena kupu-kupu memiliki sayap yang bersisik.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-3',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Perpustakaan Sekolah

Perpustakaan SMP Harapan Bangsa terletak di sebelah ruang guru. Ruangan tersebut memiliki empat rak buku besar yang disusun berdasarkan jenis bacaan. Buku pelajaran ditempatkan di rak bagian depan, sedangkan novel dan cerita rakyat berada di rak bagian belakang.
Di dekat jendela terdapat beberapa meja baca yang tertata rapi. Cahaya matahari masuk melalui jendela sehingga ruangan tidak terlalu gelap. Setiap pengunjung diwajibkan menjaga ketenangan dan mengembalikan buku ke tempat semula setelah selesai membaca.

Kalimat yang menggambarkan keadaan fisik perpustakaan adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Setiap pengunjung wajib menjaga ketenangan.' },
      { id: 'B', text: 'Perpustakaan menjadi tempat belajar yang menyenangkan.' },
      { id: 'C', text: 'Ruangan memiliki empat rak buku besar yang disusun berdasarkan jenis bacaan.' },
      { id: 'D', text: 'Siswa sebaiknya membaca buku setiap hari.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-4',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 4,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Kebun Sekolah

Kebun sekolah SMP Tunas Bangsa terletak di belakang ruang kelas. Berbagai tanaman tumbuh di area tersebut, seperti cabai, tomat, kangkung, dan tanaman obat keluarga. Setiap kelas mendapat jadwal untuk merawat tanaman secara bergantian.
Tanah di kebun tersebut tampak gembur dan berwarna cokelat kehitaman. Beberapa tanaman tumbuh subur karena mendapatkan air dan sinar matahari yang cukup. Selain memperindah lingkungan, kebun sekolah juga digunakan sebagai tempat pembelajaran langsung mengenai tumbuhan.

Makna kata gembur dalam teks tersebut adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Tanah yang keras dan sulit ditanami.' },
      { id: 'B', text: 'Tanah yang remah dan mudah diolah.' },
      { id: 'C', text: 'Tanah yang selalu tergenang air.' },
      { id: 'D', text: 'Tanah yang dipenuhi bebatuan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-5',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 5,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Kondisi Sungai di Desa Sukamaju

Sungai di Desa Sukamaju dahulu memiliki air yang jernih. Warga sering memanfaatkannya untuk mengairi kebun dan menangkap ikan. Namun, dalam beberapa tahun terakhir, kondisi sungai mengalami perubahan. Beberapa bagian sungai dipenuhi sampah plastik dan tumbuhan liar.
Ketika musim hujan tiba, aliran air sering tersendat karena sampah menumpuk di sekitar jembatan. Warga juga mengeluhkan bau tidak sedap yang muncul dari bagian sungai yang dipenuhi sampah. Meskipun demikian, sebagian masyarakat mulai melakukan kegiatan membersihkan sungai setiap akhir pekan.

Kesimpulan paling tepat berdasarkan teks tersebut adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Sungai tidak lagi dapat dimanfaatkan oleh masyarakat.' },
      { id: 'B', text: 'Kondisi sungai mengalami penurunan kualitas dan memerlukan penanganan bersama.' },
      { id: 'C', text: 'Seluruh masyarakat Desa Sukamaju membuang sampah ke sungai.' },
      { id: 'D', text: 'Sungai menjadi kotor hanya ketika musim hujan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-6',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 6,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Cara Membuat Jus Mangga

Untuk membuat jus mangga, siapkan satu buah mangga matang, air secukupnya, gula sesuai selera, dan es batu. Pertama, kupas mangga kemudian potong daging buah menjadi bagian kecil. Setelah itu, masukkan potongan mangga ke dalam blender.
Tambahkan air dan gula secukupnya. Nyalakan blender selama beberapa menit hingga seluruh bahan tercampur halus. Setelah selesai, tuangkan jus ke dalam gelas dan tambahkan es batu sesuai kebutuhan.

Tujuan teks tersebut adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Menjelaskan ciri-ciri buah mangga.' },
      { id: 'B', text: 'Menggambarkan manfaat buah mangga bagi kesehatan.' },
      { id: 'C', text: 'Memberikan petunjuk membuat jus mangga secara berurutan.' },
      { id: 'D', text: 'Menceritakan pengalaman seseorang membuat jus.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-7',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 7,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Langkah Menanam Cabai dalam Pot

Menanam cabai dalam pot dapat dilakukan di halaman rumah yang tidak terlalu luas. Siapkan pot, tanah, pupuk kompos, bibit cabai, dan air. Campurkan tanah dengan pupuk kompos, kemudian masukkan campuran tersebut ke dalam pot.
Buat lubang kecil di bagian tengah tanah. Masukkan bibit cabai secara perlahan, lalu tutup kembali lubang dengan tanah. Setelah itu, siram tanaman secukupnya. Letakkan pot di tempat yang mendapatkan sinar matahari dan lakukan penyiraman secara teratur.

Apabila bibit dimasukkan sebelum lubang tanam dibuat, kemungkinan yang terjadi adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Bibit lebih mudah ditanam tanpa mengalami gangguan.' },
      { id: 'B', text: 'Proses penanaman menjadi kurang tepat dan dapat merusak bibit.' },
      { id: 'C', text: 'Tanaman langsung menghasilkan buah.' },
      { id: 'D', text: 'Tanah menjadi lebih subur dengan sendirinya.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-8',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 8,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Cara Menggunakan Perpustakaan Digital

Perpustakaan digital dapat membantu siswa memperoleh bahan bacaan tanpa harus datang langsung ke perpustakaan. Untuk menggunakannya, siswa terlebih dahulu membuka aplikasi perpustakaan digital melalui telepon genggam atau komputer. Selanjutnya, siswa masuk menggunakan akun yang telah didaftarkan oleh sekolah.
Setelah berhasil masuk, siswa dapat mencari buku berdasarkan judul atau nama penulis. Buku yang tersedia dapat dibaca secara langsung melalui aplikasi. Pengguna perlu memperhatikan ketentuan peminjaman dan tidak membagikan kata sandi akun kepada orang lain.

Mengapa kata sandi akun tidak boleh dibagikan kepada orang lain?`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Agar aplikasi tidak dapat digunakan oleh siswa lain.' },
      { id: 'B', text: 'Agar keamanan dan kerahasiaan akun tetap terjaga.' },
      { id: 'C', text: 'Agar jumlah buku di perpustakaan bertambah.' },
      { id: 'D', text: 'Agar proses pencarian buku menjadi lebih lama.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-9',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 9,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Poster Hemat Air

Di dinding sekolah terdapat poster bertuliskan, “Setetes Air, Sejuta Kehidupan. Gunakan Air Secukupnya!” Poster tersebut dilengkapi gambar keran yang tertutup rapat dan beberapa tetes air. Di bagian bawah poster terdapat kalimat ajakan agar siswa menutup keran setelah mencuci tangan.
Poster tersebut dipasang di dekat tempat mencuci tangan agar mudah dibaca oleh seluruh warga sekolah. Melalui poster itu, sekolah berharap siswa terbiasa menggunakan air secara bijaksana.

Pesan utama poster tersebut adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Siswa harus mencuci tangan setiap saat.' },
      { id: 'B', text: 'Air hanya boleh digunakan oleh petugas sekolah.' },
      { id: 'C', text: 'Setiap orang perlu menghemat penggunaan air.' },
      { id: 'D', text: 'Keran air harus selalu dibuka agar tidak rusak.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-10',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 10,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Iklan Produk Minuman

Sebuah iklan minuman menampilkan gambar botol berwarna cerah dengan tulisan, “Segar Setiap Saat, Temani Aktivitasmu!” Iklan tersebut juga mencantumkan informasi bahwa minuman tersedia dalam beberapa rasa. Pada bagian bawah iklan terdapat gambar buah-buahan yang digunakan sebagai ilustrasi rasa produk.
Iklan dipasang di papan informasi dekat kantin sekolah. Tujuannya adalah memperkenalkan produk kepada warga sekolah agar mereka tertarik untuk membelinya.

Kalimat yang menunjukkan unsur persuasif dalam iklan adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Sebuah botol berwarna cerah.' },
      { id: 'B', text: 'Tersedia dalam beberapa rasa.' },
      { id: 'C', text: 'Segar Setiap Saat, Temani Aktivitasmu!' },
      { id: 'D', text: 'Dipasang di papan informasi dekat kantin.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-11',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 11,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Pentingnya Membaca Buku

Membaca buku merupakan salah satu kegiatan yang dapat memperluas pengetahuan. Melalui buku, seseorang dapat memperoleh informasi tentang berbagai bidang, seperti ilmu pengetahuan, sejarah, budaya, dan teknologi. Membaca juga membantu seseorang mengenal kosakata baru dan memahami penggunaan bahasa yang baik.
Kebiasaan membaca perlu dibangun sejak usia sekolah. Siswa yang terbiasa membaca akan memiliki lebih banyak kesempatan untuk mengembangkan kemampuan berpikir dan memahami informasi. Oleh karena itu, sekolah dan keluarga perlu menciptakan lingkungan yang mendukung kegiatan membaca.

Gagasan utama paragraf kedua adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Buku memiliki banyak jenis dan bidang pembahasan.' },
      { id: 'B', text: 'Kebiasaan membaca perlu dibangun sejak usia sekolah.' },
      { id: 'C', text: 'Membaca hanya dapat dilakukan di lingkungan sekolah.' },
      { id: 'D', text: 'Keluarga harus menyediakan semua jenis buku.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-12',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 12,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Sampah Plastik dan Lingkungan

Sampah plastik membutuhkan waktu yang sangat lama untuk terurai secara alami. Jika dibuang sembarangan, sampah plastik dapat menyumbat saluran air dan mencemari lingkungan. Plastik yang terbawa ke sungai juga dapat mencapai laut dan mengganggu kehidupan hewan.
Salah satu cara mengurangi sampah plastik adalah menggunakan tas belanja yang dapat dipakai berulang kali. Selain itu, masyarakat dapat membawa botol minum sendiri dan menghindari penggunaan kemasan sekali pakai jika tersedia pilihan lain.

Tindakan paling sesuai untuk mengurangi sampah plastik adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Menggunakan kantong plastik baru setiap berbelanja.' },
      { id: 'B', text: 'Membakar seluruh sampah plastik di halaman rumah.' },
      { id: 'C', text: 'Membawa tas belanja dan botol minum yang dapat digunakan berulang kali.' },
      { id: 'D', text: 'Membuang plastik ke sungai agar tidak menumpuk di rumah.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-13',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 13,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Manfaat Sarapan Pagi

Sarapan merupakan kegiatan makan dan minum pada pagi hari sebelum memulai aktivitas. Sarapan membantu tubuh memperoleh energi setelah tidak menerima makanan selama tidur malam. Menu sarapan dapat berupa nasi, telur, sayuran, roti, buah, atau makanan lain yang mengandung zat gizi.
Sebagian siswa sering melewatkan sarapan karena terburu-buru berangkat ke sekolah. Padahal, tubuh membutuhkan asupan energi untuk menjalankan aktivitas. Membiasakan sarapan dengan menu seimbang merupakan salah satu cara menjaga kebugaran tubuh.

Pernyataan yang merupakan fakta berdasarkan teks adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Semua siswa yang tidak sarapan pasti mendapat nilai rendah.' },
      { id: 'B', text: 'Sarapan selalu menjadi kegiatan paling menyenangkan.' },
      { id: 'C', text: 'Sarapan merupakan kegiatan makan dan minum pada pagi hari sebelum beraktivitas.' },
      { id: 'D', text: 'Setiap orang wajib sarapan dengan menu yang sama.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-14',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 14,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Penghijauan Lingkungan Sekolah

SMP Pelita Bangsa melaksanakan kegiatan penghijauan dengan menanam 50 bibit pohon di sekitar halaman sekolah. Kegiatan tersebut dilakukan oleh siswa, guru, dan petugas kebersihan. Kepala sekolah menyampaikan bahwa penghijauan bertujuan menciptakan lingkungan yang lebih teduh dan nyaman.
Namun, setelah dua bulan, beberapa bibit terlihat layu. Berdasarkan pengamatan, sebagian tanaman tidak mendapatkan air yang cukup karena jadwal penyiraman belum berjalan dengan baik. Selain itu, beberapa bibit ditanam terlalu dekat dengan area yang sering dilalui siswa.

Penilaian paling tepat terhadap pelaksanaan kegiatan penghijauan tersebut adalah ....`,
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Kegiatan gagal sepenuhnya karena beberapa tanaman layu.' },
      { id: 'B', text: 'Kegiatan sudah cukup baik, tetapi perlu perawatan dan pengaturan lokasi tanam.' },
      { id: 'C', text: 'Kegiatan tidak bermanfaat karena pohon belum menghasilkan buah.' },
      { id: 'D', text: 'Kegiatan seharusnya dihentikan karena halaman sekolah menjadi penuh.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-15',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 15,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Penggunaan Gawai pada Siswa

Gawai memberikan kemudahan bagi siswa untuk mencari informasi dan mengakses materi pembelajaran. Melalui internet, siswa dapat membaca artikel, menonton video pembelajaran, dan mengikuti kelas daring. Akan tetapi, penggunaan gawai yang berlebihan dapat mengganggu waktu belajar dan istirahat.
Oleh karena itu, siswa perlu mengatur waktu penggunaan gawai. Gawai sebaiknya dimanfaatkan sesuai kebutuhan, terutama untuk kegiatan yang mendukung pembelajaran. Orang tua dan guru juga dapat membantu siswa membangun kebiasaan menggunakan teknologi secara bertanggung jawab.

Simpulan yang tepat berdasarkan teks adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Gawai harus dilarang sepenuhnya bagi seluruh siswa.' },
      { id: 'B', text: 'Gawai hanya dapat digunakan untuk bermain.' },
      { id: 'C', text: 'Gawai bermanfaat jika digunakan secara bijaksana dan sesuai kebutuhan.' },
      { id: 'D', text: 'Penggunaan internet tidak memiliki hubungan dengan pembelajaran.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-16',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 16,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Pengumuman Kegiatan Literasi

Dalam rangka memperingati Bulan Bahasa, SMP Cendekia akan mengadakan kegiatan literasi pada Jumat, 13 November 2026. Kegiatan dimulai pukul 08.00 sampai dengan 11.00 WITA di halaman sekolah. Seluruh siswa kelas VII, VIII, dan IX diharapkan membawa satu buku bacaan nonpelajaran.
Kegiatan akan diisi dengan membaca bersama, berbagi cerita, dan pameran hasil karya siswa. Peserta diminta hadir tepat waktu dan menjaga ketertiban selama kegiatan berlangsung.

Kapan kegiatan literasi tersebut dilaksanakan?`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Jumat, 13 November 2026 pukul 08.00–11.00 WITA.' },
      { id: 'B', text: 'Jumat, 13 November 2026 pukul 11.00–13.00 WITA.' },
      { id: 'C', text: 'Sabtu, 13 November 2026 pukul 08.00–11.00 WITA.' },
      { id: 'D', text: 'Jumat, 14 November 2026 pukul 08.00–11.00 WITA.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'bin-viii-17',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 17,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Slogan Kebersihan

Di beberapa sudut sekolah terdapat slogan yang berbunyi, “Sekolah Bersih, Belajar Lebih Nyaman.” Slogan tersebut dibuat dengan huruf besar dan warna yang mencolok agar mudah dibaca. Di bawah slogan terdapat gambar siswa yang sedang memungut sampah dan membuangnya ke tempat sampah.
Slogan tersebut tidak hanya berfungsi sebagai hiasan sekolah. Kalimat singkat itu diharapkan mampu mengingatkan seluruh warga sekolah untuk menjaga kebersihan lingkungan.

Ciri slogan yang paling jelas terlihat dalam teks tersebut adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Menggunakan kalimat panjang yang menjelaskan seluruh kegiatan sekolah.' },
      { id: 'B', text: 'Menggunakan kalimat singkat, menarik, dan mudah diingat.' },
      { id: 'C', text: 'Memuat daftar harga barang yang dijual di sekolah.' },
      { id: 'D', text: 'Berisi petunjuk penggunaan alat kebersihan secara lengkap.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-18',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 18,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Kegiatan Bank Sampah Sekolah

SMP Bina Karya mengadakan program bank sampah setiap hari Jumat. Siswa diminta membawa sampah anorganik yang telah dipilah dari rumah. Sampah tersebut kemudian ditimbang dan dicatat oleh pengurus bank sampah sekolah.
Dalam tiga bulan pelaksanaan, sekolah berhasil mengumpulkan 120 kilogram sampah plastik dan kertas. Sebagian sampah dijual kepada pengepul, sedangkan sebagian lainnya dimanfaatkan untuk membuat kerajinan. Program ini juga digunakan sebagai sarana pembelajaran agar siswa memahami pentingnya mengurangi dan mengelola sampah.

Hubungan antara kegiatan pemilahan sampah dan tujuan program tersebut adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Pemilahan sampah membuat seluruh sampah dapat dibuang tanpa pengolahan.' },
      { id: 'B', text: 'Pemilahan sampah membantu pengelolaan dan pemanfaatan sampah sesuai jenisnya.' },
      { id: 'C', text: 'Pemilahan sampah bertujuan meningkatkan jumlah sampah di sekolah.' },
      { id: 'D', text: 'Pemilahan sampah hanya dilakukan agar siswa mendapatkan nilai tambahan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-19',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 19,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Saluran Air di Lingkungan Sekolah

Setelah hujan deras, halaman SMP Sejahtera sering tergenang air. Hasil pengamatan menunjukkan bahwa beberapa saluran air tertutup daun kering dan sampah plastik. Selain itu, terdapat bagian saluran yang mengalami kerusakan sehingga air tidak dapat mengalir dengan lancar.
Pihak sekolah telah mengingatkan siswa agar tidak membuang sampah sembarangan. Namun, genangan masih terjadi karena saluran yang rusak belum diperbaiki. Petugas kebersihan juga membutuhkan bantuan warga sekolah untuk membersihkan area tersebut secara rutin.

Tindakan paling efektif untuk mengatasi masalah tersebut adalah ....`,
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Menyuruh siswa menghindari halaman saat hujan.' },
      { id: 'B', text: 'Mengecat ulang halaman agar terlihat lebih bersih.' },
      { id: 'C', text: 'Membersihkan saluran, memperbaiki bagian yang rusak, dan membangun kebiasaan membuang sampah pada tempatnya.' },
      { id: 'D', text: 'Menutup seluruh saluran air agar sampah tidak masuk.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-20',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 20,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Tidur yang Cukup bagi Remaja

Tidur merupakan kebutuhan penting bagi tubuh. Ketika tidur, tubuh melakukan berbagai proses pemulihan dan pengaturan fungsi organ. Remaja yang memiliki waktu tidur cukup cenderung lebih siap menjalani aktivitas pada siang hari.
Kurang tidur dapat menyebabkan seseorang merasa lelah, sulit berkonsentrasi, dan mudah mengantuk. Salah satu kebiasaan yang dapat mengganggu waktu tidur adalah menggunakan telepon genggam hingga larut malam. Oleh karena itu, remaja perlu membangun kebiasaan tidur teratur dan membatasi penggunaan gawai sebelum tidur.

Mengapa penggunaan gawai hingga larut malam perlu dibatasi?`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Karena gawai tidak memiliki manfaat dalam kehidupan remaja.' },
      { id: 'B', text: 'Karena penggunaan gawai dapat mengganggu waktu tidur.' },
      { id: 'C', text: 'Karena semua aplikasi di gawai mengandung informasi yang salah.' },
      { id: 'D', text: 'Karena remaja tidak diperbolehkan menggunakan teknologi.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-21',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 21,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Laporan Hasil Observasi Tanaman Lidah Buaya

Lidah buaya merupakan tanaman sukulen yang mampu menyimpan air di dalam daunnya. Daunnya tebal, berdaging, dan memiliki duri kecil di bagian tepi. Tanaman ini dapat tumbuh di daerah yang cukup mendapat sinar matahari dan tidak memerlukan penyiraman terlalu sering.
Lidah buaya banyak dibudidayakan sebagai tanaman hias. Selain itu, bagian gel di dalam daunnya sering dimanfaatkan sebagai bahan dalam produk perawatan kulit dan rambut. Namun, penggunaan lidah buaya untuk tujuan tertentu perlu memperhatikan cara pengolahan dan keamanan produk.

Pernyataan yang sesuai dengan isi teks adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Lidah buaya termasuk tanaman sukulen.' },
      { id: 'B', text: 'Lidah buaya harus disiram setiap jam agar tumbuh subur.' },
      { id: 'C', text: 'Semua bagian lidah buaya tidak memiliki manfaat.' },
      { id: 'D', text: 'Lidah buaya hanya dapat tumbuh di dalam air.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'bin-viii-22',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 22,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Pentingnya Ruang Terbuka Hijau

Ruang terbuka hijau merupakan area yang ditumbuhi tanaman dan dapat dimanfaatkan untuk berbagai kegiatan masyarakat. Keberadaan ruang terbuka hijau membantu menciptakan lingkungan yang lebih nyaman. Tanaman dapat memberikan keteduhan dan menjadi bagian dari upaya menjaga kualitas lingkungan.
Di beberapa wilayah perkotaan, ruang terbuka hijau semakin berkurang karena pembangunan gedung dan jalan. Kondisi tersebut perlu mendapat perhatian karena masyarakat juga membutuhkan ruang untuk beraktivitas di luar ruangan. Pemerintah dan masyarakat dapat bekerja sama menjaga taman kota, menanam pohon, dan mengembangkan area hijau di lingkungan masing-masing.

Pernyataan yang paling tepat berdasarkan isi teks adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Ruang terbuka hijau tidak memiliki manfaat bagi masyarakat.' },
      { id: 'B', text: 'Pembangunan gedung dan jalan dapat menyebabkan berkurangnya ruang terbuka hijau.' },
      { id: 'C', text: 'Semua taman kota pasti memiliki fasilitas olahraga lengkap.' },
      { id: 'D', text: 'Masyarakat tidak memiliki peran dalam menjaga lingkungan hijau.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-23',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 23,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Poster Anti-Perundungan

Sebuah poster sekolah menampilkan gambar dua siswa yang saling membantu. Pada bagian atas tertulis, “Berani Peduli, Berani Menghentikan Perundungan!” Di bawah gambar terdapat kalimat, “Jangan diam ketika teman disakiti. Laporkan kepada guru atau orang dewasa yang dapat dipercaya.”
Poster tersebut ditempel di ruang kelas dan koridor sekolah. Pesannya mengajak siswa untuk tidak melakukan perundungan, tidak membiarkan tindakan perundungan, serta mencari bantuan ketika melihat teman mengalami perlakuan tidak menyenangkan.

Tindakan yang paling sesuai dengan pesan poster adalah ....`,
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Menertawakan teman yang sedang diejek.' },
      { id: 'B', text: 'Mengabaikan teman yang mengalami perundungan.' },
      { id: 'C', text: 'Mendampingi teman yang mengalami perundungan dan melaporkannya kepada guru.' },
      { id: 'D', text: 'Membagikan video perundungan agar menjadi tontonan.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-24',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 24,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Prosedur Menjaga Kebersihan Tangan

Tangan merupakan bagian tubuh yang sering bersentuhan dengan benda di sekitar. Oleh karena itu, menjaga kebersihan tangan penting dilakukan sebelum makan dan setelah menggunakan toilet. Cara mencuci tangan yang benar dimulai dengan membasahi tangan menggunakan air mengalir.
Selanjutnya, gunakan sabun dan gosok seluruh bagian tangan, termasuk telapak, punggung tangan, sela-sela jari, dan ujung kuku. Bilas dengan air mengalir hingga bersih, kemudian keringkan menggunakan tisu atau handuk bersih.

Berdasarkan teks, bagian tangan yang perlu dibersihkan ketika mencuci tangan adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Telapak tangan saja.' },
      { id: 'B', text: 'Punggung tangan saja.' },
      { id: 'C', text: 'Telapak, punggung, sela-sela jari, dan ujung kuku.' },
      { id: 'D', text: 'Ujung jari saja.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-25',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 25,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Hasil Pengamatan Kantin Sekolah

Berdasarkan pengamatan selama tiga hari, sebagian besar siswa membeli makanan pada waktu istirahat pertama. Kantin menyediakan nasi, lauk-pauk, makanan ringan, dan minuman. Beberapa penjual sudah menggunakan wadah tertutup untuk menyimpan makanan.
Namun, masih ditemukan makanan yang dibiarkan terbuka di dekat tempat sampah. Selain itu, beberapa siswa tidak menghabiskan makanan yang dibeli sehingga menimbulkan sisa makanan. Petugas kantin menyampaikan bahwa mereka berusaha menjaga kebersihan, tetapi membutuhkan kerja sama dari seluruh warga sekolah.

Berdasarkan hasil pengamatan tersebut, tindakan paling tepat untuk memperbaiki kondisi kantin adalah ....`,
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Membiarkan makanan terbuka agar mudah diambil.' },
      { id: 'B', text: 'Menutup makanan dan mengajak siswa membeli sesuai kebutuhan.' },
      { id: 'C', text: 'Membiarkan sisa makanan menumpuk di meja kantin.' },
      { id: 'D', text: 'Mengurangi jumlah tempat sampah di kantin.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-26',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 26,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Tanaman Anggrek

Anggrek merupakan salah satu jenis tanaman berbunga yang memiliki bentuk dan warna beragam. Sebagian anggrek hidup menempel pada batang pohon, tetapi tidak mengambil makanan dari pohon yang ditumpanginya. Tanaman tersebut menggunakan pohon sebagai tempat melekat agar memperoleh cahaya dan udara.
Anggrek dapat tumbuh dengan baik jika memperoleh perawatan sesuai jenisnya. Beberapa jenis anggrek membutuhkan tempat yang teduh, sedangkan jenis lainnya memerlukan cahaya lebih banyak. Karena memiliki bentuk bunga yang menarik, anggrek sering dijadikan tanaman hias.

Pernyataan yang sesuai dengan teks adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Semua anggrek mengambil makanan dari pohon yang ditempelinya.' },
      { id: 'B', text: 'Anggrek hanya dapat hidup di dalam air.' },
      { id: 'C', text: 'Anggrek memiliki bentuk dan warna bunga yang beragam.' },
      { id: 'D', text: 'Anggrek tidak membutuhkan perawatan.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-27',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 27,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Penggunaan Plastik Sekali Pakai

Penggunaan plastik sekali pakai masih banyak ditemukan dalam kehidupan sehari-hari. Kantong plastik, sedotan, dan kemasan makanan sering digunakan karena dianggap praktis. Akan tetapi, penggunaan yang berlebihan dapat meningkatkan jumlah sampah plastik.
Sampah plastik yang tidak dikelola dengan baik dapat mencemari tanah dan perairan. Upaya menguranginya dapat dilakukan dengan membawa tas belanja sendiri, menggunakan botol minum isi ulang, dan memilih barang dengan kemasan yang lebih ramah lingkungan.

Berdasarkan teks, mengapa penggunaan plastik sekali pakai perlu dikurangi?`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Karena plastik tidak memiliki kegunaan sama sekali.' },
      { id: 'B', text: 'Karena plastik dapat mencemari lingkungan jika tidak dikelola dengan baik.' },
      { id: 'C', text: 'Karena seluruh barang kebutuhan manusia terbuat dari plastik.' },
      { id: 'D', text: 'Karena plastik hanya dapat ditemukan di perkotaan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-28',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 28,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Manfaat Membaca Artikel Ilmiah Populer

Artikel ilmiah populer merupakan tulisan yang menyampaikan informasi atau pengetahuan berdasarkan fakta dan kajian ilmiah dengan bahasa yang lebih mudah dipahami masyarakat umum. Topiknya dapat beragam, misalnya kesehatan, lingkungan, teknologi, dan pendidikan.
Berbeda dengan tulisan ilmiah yang biasanya menggunakan bahasa lebih teknis, artikel ilmiah populer berusaha menyampaikan pengetahuan secara menarik dan sederhana. Meskipun demikian, informasi yang disampaikan tetap perlu didasarkan pada sumber yang dapat dipercaya.

Ciri utama artikel ilmiah populer berdasarkan teks adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Menggunakan bahasa yang sulit dipahami pembaca umum.' },
      { id: 'B', text: 'Menyampaikan informasi berdasarkan fakta dengan bahasa yang mudah dipahami.' },
      { id: 'C', text: 'Berisi cerita khayalan tanpa dasar informasi.' },
      { id: 'D', text: 'Hanya membahas pengalaman pribadi penulis.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'bin-viii-29',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 29,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Permasalahan Sampah di Lingkungan Sekolah

SMP Maju Bersama memiliki halaman yang cukup luas dan beberapa taman kecil. Setiap hari, banyak siswa beraktivitas di halaman sekolah, terutama ketika waktu istirahat. Namun, berdasarkan pengamatan selama satu minggu, masih ditemukan sampah makanan dan bungkus plastik di sekitar taman serta lapangan.
Sekolah sebenarnya telah menyediakan tempat sampah di beberapa lokasi. Akan tetapi, sebagian siswa masih membuang sampah sembarangan. Petugas kebersihan harus membersihkan halaman berulang kali agar lingkungan tetap nyaman. Guru juga telah mengingatkan siswa untuk menjaga kebersihan, tetapi kebiasaan tersebut belum terbentuk secara konsisten.
Jika keadaan ini terus dibiarkan, lingkungan sekolah dapat menjadi kotor dan kegiatan belajar menjadi kurang nyaman.

Berdasarkan bacaan, tindakan paling tepat untuk mengatasi permasalahan tersebut adalah ....`,
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Menyerahkan seluruh tanggung jawab kebersihan kepada petugas sekolah.' },
      { id: 'B', text: 'Menambah aturan tanpa melakukan kegiatan nyata.' },
      { id: 'C', text: 'Membiasakan membuang sampah pada tempatnya dan melaksanakan kegiatan kebersihan bersama.' },
      { id: 'D', text: 'Membiarkan sampah menumpuk hingga petugas membersihkannya.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'bin-viii-30',
    bankId: 'qbank-bin',
    subjectId: 'sbj-bin',
    classId: 'cls-8',
    grade: 'VIII',
    number: 30,
    type: 'pg',
    prompt: `Bacalah teks berikut!

Penggunaan Media Sosial dan Informasi

Media sosial memudahkan masyarakat memperoleh dan membagikan informasi. Dalam waktu singkat, sebuah berita dapat tersebar kepada banyak orang. Namun, tidak semua informasi yang beredar di media sosial dapat dipercaya.
Sebagian informasi dibuat tanpa melalui pemeriksaan fakta. Ada pula judul berita yang sengaja dibuat berlebihan agar menarik perhatian pembaca. Jika seseorang langsung membagikan informasi tanpa memeriksa kebenarannya, kesalahpahaman dapat terjadi dan merugikan orang lain.
Oleh karena itu, pengguna media sosial perlu bersikap kritis. Informasi sebaiknya diperiksa melalui sumber resmi, dibandingkan dengan pemberitaan dari media terpercaya, dan tidak langsung disebarkan jika kebenarannya belum jelas.

Tindakan paling tepat sebelum membagikan berita yang diperoleh dari media sosial adalah ....`,
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Langsung membagikannya agar orang lain cepat mengetahui.' },
      { id: 'B', text: 'Memeriksa sumber informasi dan membandingkannya dengan sumber terpercaya.' },
      { id: 'C', text: 'Mempercayai berita jika memiliki judul yang menarik.' },
      { id: 'D', text: 'Membagikan berita hanya karena banyak orang menyukainya.' }
    ],
    correctAnswers: ['B']
  }
];
