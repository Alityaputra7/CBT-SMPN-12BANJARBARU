import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI IPS KELAS VIII SEMESTER 1 (TAHUN 2026)
// Sumber: Soal_IPS_kelas_8_kunci_2026_900b1813.pdf (30 Soal Lengkap)
// - 20 Pilihan Ganda (No. 1–20)
// - 8 Pilihan Ganda Kompleks (No. 21–28)
// - 2 Menjodohkan (No. 29–30)
// - Dilengkapi 7 aset gambar asli hasil ekstraksi PDF di /images/soal/
//   (No. 1, 2, 4, 5–7, 16–18, 19, 23–24, 27)
// - Bobot: 5 poin per soal
// =========================================================================

export const IPS_KELAS_8_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // A. PILIHAN GANDA (No. 1 - 20)
  // -----------------------------------------------------------------------
  {
    id: 'ips-viii-1',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 1,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no1.png',
    prompt: `Perhatikan peta Indonesia di atas!
Pernyataan yang tepat untuk menjelaskan gambar di atas adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Letak astronomis adalah posisi suatu wilayah berdasarkan garis lintang dan garis bujur yang menunjukkan koordinat suatu tempat di permukaan bumi.' },
      { id: 'B', text: 'Letak geologis adalah posisi suatu wilayah berdasarkan kondisi batuan dan struktur lapisan bumi yang membentuk permukaan wilayah tersebut.' },
      { id: 'C', text: 'Letak geografis adalah posisi suatu wilayah berdasarkan kenyataan di permukaan bumi. Letak geografis Indonesia adalah di antara dua benua yaitu Benua Asia dan Australia serta di antara dua samudra yaitu Samudra Hindia dan Pasifik.' },
      { id: 'D', text: 'Letak administratif adalah posisi suatu wilayah berdasarkan pembagian pemerintahan, seperti provinsi, kabupaten, kota, dan kecamatan.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-viii-2',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 2,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no2.png',
    prompt: `Di atas adalah letak geologis Indonesia. Perhatikan peta tersebut. Jalur pegunungan di Indonesia membentang dari wilayah Sumatra, Jawa, Nusa Tenggara, Banda, Sulawesi, hingga Halmahera. Jalur tersebut merupakan bagian dari rangkaian pegunungan dunia yang memengaruhi kondisi geologis Indonesia.

Berdasarkan informasi tersebut, pernyataan berikut yang bukan merupakan ciri letak geologis Indonesia adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Indonesia dilalui oleh jalur Pegunungan Sirkum Pasifik dan Sirkum Mediterania.' },
      { id: 'B', text: 'Indonesia memiliki banyak gunung api aktif akibat pertemuan lempeng tektonik.' },
      { id: 'C', text: 'Indonesia terletak di antara Benua Asia dan Benua Australia serta Samudra Hindia dan Pasifik.' },
      { id: 'D', text: 'Indonesia memiliki wilayah yang rawan mengalami gempa bumi akibat aktivitas pergerakan lempeng.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-viii-3',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 3,
    type: 'pg',
    prompt: 'Berikut ini merupakan akibat letak geologis Indonesia, yang bukan adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Indonesia memiliki banyak gunung api aktif yang tersebar di beberapa wilayah.' },
      { id: 'B', text: 'Indonesia memiliki potensi sumber daya mineral dan bahan tambang yang beragam.' },
      { id: 'C', text: 'Indonesia memiliki banyak wilayah yang berpotensi mengalami gempa bumi akibat aktivitas tektonik.' },
      { id: 'D', text: 'Indonesia memiliki iklim tropis dengan dua musim, yaitu musim hujan dan musim kemarau.' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ips-viii-4',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 4,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no4.png',
    prompt:
      'Perhatikan gambar di atas yang menunjukkan pembagian iklim di dunia. Berdasarkan informasi pada gambar tersebut, serta letak Indonesia di sekitar garis khatulistiwa, jenis iklim yang memengaruhi wilayah Indonesia adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'iklim sedang' },
      { id: 'B', text: 'iklim sub tropis' },
      { id: 'C', text: 'iklim tropis' },
      { id: 'D', text: 'iklim dingin' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-viii-5',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 5,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no5_7.png',
    prompt: `Perhatikan infografis tentang faktor dan dampak perubahan iklim di atas!

Berdasarkan informasi pada gambar, kerusakan fungsi hutan dan meningkatnya gas rumah kaca dapat memengaruhi kondisi lingkungan. Salah satu dampak yang ditunjukkan dalam infografis tersebut adalah ....`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Bertambahnya luas hutan dan meningkatnya sumber air bersih.' },
      { id: 'B', text: 'Musim kemarau yg berkepanjangan dan berkurangnya sumber air.' },
      { id: 'C', text: 'Menurunnya suhu bumi dan bertambahnya lapisan es di kutub.' },
      { id: 'D', text: 'Berkurangnya curah hujan dan meningkatnya kesuburan tanah.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-viii-6',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 6,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no5_7.png',
    prompt:
      'Pada infografis terlihat bahwa penggunaan chlorofluorocarbon (CFC) yang tidak terkendali dan gas buang industri menjadi salah satu faktor perubahan iklim. Jika aktivitas tersebut terus meningkat, dampak yang mungkin terjadi terhadap lingkungan adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Suhu bumi semakin meningkat akibat meningkatnya pencemaran udara dari aktivitas manusia.' },
      { id: 'B', text: 'Kualitas udara semakin baik karena jumlah gas di atmosfer (lapisan udara) bertambah.' },
      { id: 'C', text: 'Suhu bumi semakin menurun sehingga lapisan es di kutub semakin tebal.' },
      { id: 'D', text: 'Curah hujan menjadi stabil dan musim kemarau semakin pendek.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ips-viii-7',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 7,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no5_7.png',
    prompt:
      'Perhatikan kembali bagian dampak perubahan iklim pada infografis. Peningkatan suhu bumi dapat menyebabkan mencairnya es di wilayah kutub. Jika kondisi tersebut terus berlangsung, akibat yang paling mungkin terjadi adalah ....',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Berkurangnya volume air laut dan meluasnya wilayah daratan.' },
      { id: 'B', text: 'Meningkatnya suhu udara yang menyebabkan beberapa jenis tumbuhan sulit tumbuh.' },
      { id: 'C', text: 'Meningkatnya volume air laut sehingga wilayah pesisir berisiko mengalami banjir.' },
      { id: 'D', text: 'Bertambahnya sumber air bersih di seluruh wilayah Indonesia.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-viii-8',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 8,
    type: 'pg',
    prompt:
      'El Nino dan La Nina merupakan fenomena iklim yang berkaitan dengan perubahan suhu permukaan laut dan pola angin di wilayah tertentu. Fenomena tersebut terutama terjadi di ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Samudera Hindia' },
      { id: 'B', text: 'Samudera Atlantik' },
      { id: 'C', text: 'Samudera Pasifik' },
      { id: 'D', text: 'Samudera Arktik' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-viii-9',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 9,
    type: 'pg',
    prompt:
      'Hutan memiliki fungsi menyerap karbon dioksida dan membantu menjaga keseimbangan lingkungan. Jika hutan ditebang secara berlebihan tanpa dilakukan reboisasi, salah satu dampak yang mungkin terjadi adalah ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'jumlah karbon dioksida di atmosfer semakin berkurang' },
      { id: 'B', text: 'suhu bumi meningkat, risiko perubahan iklim bertambah' },
      { id: 'C', text: 'curah hujan di seluruh dunia menjadi sama' },
      { id: 'D', text: 'kelembapan udara selalu menurun di semua wilayah' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-viii-10',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 10,
    type: 'pg',
    prompt:
      'Fenomena El Niño menyebabkan perubahan pola curah hujan di Indonesia. Ketika fenomena ini terjadi, sebagian besar wilayah Indonesia mengalami penurunan curah hujan. Kondisi tersebut mengakibatkan terjadinya musim ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Hujan dengan intensitas tinggi' },
      { id: 'B', text: 'Pancaroba dengan angin kencang' },
      { id: 'C', text: 'Dingin dengan suhu udara rendah' },
      { id: 'D', text: 'Kemarau yang lebih panjang dan kering' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ips-viii-11',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 11,
    type: 'pg',
    prompt:
      'Fenomena La Niña menyebabkan peningkatan curah hujan di sebagian besar wilayah Indonesia. Kondisi tersebut dapat mengakibatkan terjadinya musim ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Kemarau panjang dan kekeringan' },
      { id: 'B', text: 'Hujan dengan curah hujan yang lebih tinggi' },
      { id: 'C', text: 'Dingin dengan suhu udara rendah' },
      { id: 'D', text: 'Pancaroba dengan curah hujan tidak menentu' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-viii-12',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 12,
    type: 'pg',
    prompt: `Perhatikan dua pernyataan berikut!
Pernyataan 1: Pagi hari di Banjarbaru turun hujan deras, tetapi pada siang hari cuaca menjadi cerah.
Pernyataan 2: Indonesia memiliki iklim tropis sehingga umumnya memiliki suhu udara yang relatif tinggi sepanjang tahun.

Perbedaan yang tepat antara cuaca dan iklim berdasarkan kedua pernyataan tersebut adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'cuaca berlangsung dalam waktu relatif singkat, sedangkan iklim merupakan pola cuaca dalam waktu yang panjang' },
      { id: 'B', text: 'cuaca hanya terjadi di daerah tropis, sedangkan iklim terjadi di daerah subtropis' },
      { id: 'C', text: 'cuaca selalu berubah setiap tahun, sedangkan iklim berubah setiap jam' },
      { id: 'D', text: 'cuaca memiliki pola tetap, sedangkan iklim selalu berubah setiap hari' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ips-viii-13',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 13,
    type: 'pg',
    prompt: `“Warga pendatang usai Lebaran diminta punya keahlian dan keterampilan”

Jakarta (ANTARA) - Kementerian Pemberdayaan Perempuan dan Perlindungan Anak mengimbau para pendatang yang merantau ke kota besar usai Lebaran, hendaknya memiliki bekal keahlian dan keterampilan sehingga bisa mandiri dan meningkatkan kesejahteraan.
"Para pendatang baru ini sebenarnya belum siap, baik secara keahlian, maupun mental," kata Asisten Deputi Bidang Perlindungan Hak Perempuan Pekerja dan TPPO KemenPPPA Priyadi Santosa dalam webinar bertajuk "Petaka Perempuan Desa Terjebak Pesona Ibukota, Pasca Mudik Hari Raya", di Jakarta, Kamis.
Priyadi Santosa menilai para pendatang banyak yang tidak memiliki keahlian khusus sehingga kehidupan mereka di kota, tidak lebih baik daripada kehidupan saat di desa.
Akibatnya, semakin bertambahnya masalah sosial seperti fenomena anak jalanan, gelandangan, pengemis, pekerja seks komersil, dan terciptanya 'kantong-kantong' kemiskinan sebagai dampak peprindahan ini.

Bacalah potongan berita di atas!
Dari artikel di atas, menunjukkan bentuk mobilitas sosial, yaitu ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Transmigrasi' },
      { id: 'B', text: 'Ruralisasi' },
      { id: 'C', text: 'Imigrasi' },
      { id: 'D', text: 'Urbanisasi' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ips-viii-14',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 14,
    type: 'pg',
    prompt:
      'Pak Ahmad berasal dari Indonesia, kemudian pindah dan menetap di Malaysia untuk bekerja. Peristiwa tersebut termasuk ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Imigrasi, karena masuknya penduduk ke suatu negara.' },
      { id: 'B', text: 'Emigrasi, karena keluarnya penduduk dari negara asal untuk menetap di negara lain.' },
      { id: 'C', text: 'Urbanisasi, karena perpindahan penduduk dari desa ke kota.' },
      { id: 'D', text: 'Transmigrasi, karena perpindahan penduduk antarpulau dalam satu negara.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ips-viii-15',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 15,
    type: 'pg',
    prompt:
      'Maria adalah warga negara Filipina yang pindah dan menetap di Indonesia. Peristiwa tersebut disebut ....',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Emigrasi, karena Maria meninggalkan negara asalnya.' },
      { id: 'B', text: 'Urbanisasi, karena Maria pindah ke wilayah perkotaan.' },
      { id: 'C', text: 'Imigrasi, karena Maria masuk ke negara Indonesia untuk menetap.' },
      { id: 'D', text: 'Transmigrasi, karena Maria berpindah tempat tinggal.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-viii-16',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 16,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no16_18.png',
    prompt:
      'Perhatikan infografik di atas. Berdasarkan data yang disajikan, pernyataan manakah yang paling tepat?',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Populasi penduduk India lebih besar dibandingkan dengan jumlah penduduk Cina pada tahun 2020.' },
      { id: 'B', text: 'Brasil menduduki peringkat kelima sebagai negara dengan jumlah penduduk terbanyak di dunia.' },
      { id: 'C', text: 'Gabungan jumlah penduduk Rusia dan Meksiko lebih besar dibandingkan dengan populasi penduduk Amerika Serikat.' },
      { id: 'D', text: 'Indonesia merupakan negara yang memiliki tingkat penduduk dengan peringkat ke-4 dunia setelah Amerika Serikat.' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ips-viii-17',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 17,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no16_18.png',
    prompt: 'Berdasarkan data pada infografik di atas, pernyataan manakah di bawah ini yang benar?',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Meksiko merupakan negara dengan jumlah penduduk paling sedikit di antara kesepuluh negara dalam daftar tersebut.' },
      { id: 'B', text: 'India berada di peringkat pertama sebagai negara dengan penduduk terbanyak di dunia.' },
      { id: 'C', text: 'Indonesia tercatat memiliki jumlah populasi mencapai lebih dari 300 juta jiwa.' },
      { id: 'D', text: 'Amerika Serikat berada di urutan kelima dalam daftar negara terpadat.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ips-viii-18',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 18,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no16_18.png',
    prompt:
      'Berdasarkan infografik gambar di atas, manakah pernyataan di bawah ini yang TIDAK tepat?',
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Cina berada di urutan pertama dalam daftar negara terpadat tersebut.' },
      { id: 'B', text: 'India menempati peringkat kedua dengan jumlah populasi terbanyak.' },
      { id: 'C', text: 'Indonesia menempati urutan keempat dalam daftar tersebut.' },
      { id: 'D', text: 'Meksiko merupakan negara dengan jumlah penduduk paling banyak di dunia.' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ips-viii-19',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 19,
    type: 'pg',
    imageUrl: '/images/soal/ips_kelas8_no19.png',
    prompt:
      'Berdasarkan gambar Piramida Penduduk Muda (ekspansif) di atas, karakteristik utama dari wilayah dengan piramida tersebut adalah...',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Mayoritas penduduk didominasi oleh kelompok usia tua' },
      { id: 'B', text: 'Angka kelahiran dan angka kematian sama-sama rendah' },
      { id: 'C', text: 'Angka kelahiran tinggi dan angka kematian rendah' },
      { id: 'D', text: 'Pertumbuhan penduduk yang berjalan sangat lambat' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ips-viii-20',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 20,
    type: 'pg',
    prompt: `Perhatikan pernyataan berikut:
(1) Syarat untuk masuk agama Islam sangat mudah, yaitu hanya dengan mengucap dua kalimat syahadat.
(2) Terdapat paksaan dari raja untuk memeluk agama Islam.
(3) Agama Islam tidak mengenal sistem kasta.
(4) Proses penyebaran agama Islam di Indonesia dilakukan secara damai tanpa kekerasan.
(5) Memiliki upacara tradisi yang mengharuskan keikutsertaan masyarakat.

Berdasarkan pernyataan di atas yang merupakan pernyataan bahwa penyebaran Islam masuk dengan mudah ke Indonesia adalah ....`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '(1), (2) dan (3).' },
      { id: 'B', text: '(1), (3) dan (4).' },
      { id: 'C', text: '(2), (3) dan (5).' },
      { id: 'D', text: '(3), (4) dan (5).' }
    ],
    correctAnswers: ['B']
  },

  // -----------------------------------------------------------------------
  // B. PILIHAN GANDA KOMPLEKS (No. 21 - 28)
  // -----------------------------------------------------------------------
  {
    id: 'ips-viii-21',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 21,
    type: 'pg_kompleks',
    prompt: `Indonesia memiliki letak geografis yang strategis karena berada di antara Benua Asia dan Australia serta Samudra Hindia dan Pasifik. Kondisi tersebut memberikan beberapa keuntungan bagi Indonesia, yaitu ....
(Pilihlah semua jawaban yang benar! Setiap soal memiliki lebih dari satu jawaban benar.)`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Indonesia menjadi jalur perdagangan internasional.' },
      { id: 'B', text: 'Indonesia memiliki iklim tropis dengan dua musim.' },
      { id: 'C', text: 'Indonesia memiliki keberagaman budaya akibat interaksi dengan bangsa lain.' },
      { id: 'D', text: 'Indonesia memiliki potensi ekonomi dan pariwisata yang tinggi.' },
      { id: 'E', text: 'Indonesia mengalami perbedaan waktu di setiap wilayahnya.' }
    ],
    correctAnswers: ['A', 'C', 'D']
  },
  {
    id: 'ips-viii-22',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 22,
    type: 'pg_kompleks',
    prompt: `Letak geografis Indonesia yang strategis tidak hanya memberikan keuntungan, tetapi juga menimbulkan beberapa dampak negatif. Berikut ini yang termasuk dampak negatif tersebut adalah ....
(Pilihlah semua jawaban yang benar! Setiap soal memiliki lebih dari satu jawaban benar.)`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Masuknya budaya asing yang tidak sesuai dengan nilai-nilai masyarakat Indonesia.' },
      { id: 'B', text: 'Meningkatnya potensi penyelundupan barang dan perdagangan manusia melalui jalur laut.' },
      { id: 'C', text: 'Bertambahnya potensi sumber daya laut yang dapat dimanfaatkan masyarakat.' },
      { id: 'D', text: 'Persaingan ekonomi semakin ketat akibat masuknya produk asing.' },
      { id: 'E', text: 'Meningkatnya potensi pariwisata karena banyak wisatawan dari negara lain' }
    ],
    correctAnswers: ['A', 'B', 'D']
  },
  {
    id: 'ips-viii-23',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 23,
    type: 'pg_kompleks',
    imageUrl: '/images/soal/ips_kelas8_no23_24.png',
    prompt: `Perhatikan gambar bentuk muka bumi di atas!
Berdasarkan informasi tersebut. Pilihlah semua jawaban yang benar!`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Gunung memiliki puncak yang lebih tinggi dari 600 meter di atas permukaan laut.' },
      { id: 'B', text: 'Dataran rendah merupakan wilayah yang memiliki ketinggian lebih dari 400 meter di atas permukaan laut.' },
      { id: 'C', text: 'Pegunungan merupakan kumpulan gunung yang berjajar sehingga membentuk suatu gugusan.' },
      { id: 'D', text: 'Bukit memiliki permukaan yang curam dan ketinggiannya selalu lebih dari 1.000 meter di atas permukaan laut.' },
      { id: 'E', text: 'Dataran tinggi merupakan daerah yang relatif datar dengan ketinggian lebih dari 400 meter di atas permukaan laut.' }
    ],
    correctAnswers: ['A', 'C', 'E']
  },
  {
    id: 'ips-viii-24',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 24,
    type: 'pg_kompleks',
    imageUrl: '/images/soal/ips_kelas8_no23_24.png',
    prompt: `Indonesia memiliki berbagai bentuk muka bumi dengan karakteristik ketinggian dan permukaan yang berbeda-beda. Berdasarkan gambar, pernyataan yang benar mengenai bentuk muka bumi adalah ....
(Pilihlah semua jawaban yang benar! Setiap soal memiliki lebih dari satu jawaban benar.)`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Dataran rendah memiliki ketinggian antara 400–600 meter di atas permukaan laut.' },
      { id: 'B', text: 'Dataran tinggi merupakan daerah yang relatif datar dengan ketinggian lebih dari 400 mdpl.' },
      { id: 'C', text: 'Gunung merupakan bagian permukaan bumi yang selalu memiliki ketinggian kurang dari 200 mdpl.' },
      { id: 'D', text: 'Dataran rendah memiliki ketinggian sekitar 0–200 mdpl.' },
      { id: 'E', text: 'Bukit merupakan bagian permukaan bumi yang lebih tinggi dibandingkan daerah sekitarnya dengan ketinggian kurang dari 600 mdpl.' }
    ],
    correctAnswers: ['B', 'D', 'E']
  },
  {
    id: 'ips-viii-25',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 25,
    type: 'pg_kompleks',
    prompt: `Setiap daerah di Indonesia memiliki sumber daya alam dan hasil produksi yang berbeda-beda. Perbedaan tersebut mendorong terjadinya perdagangan antarpulau. Berikut ini yang termasuk faktor pendorong perdagangan antarpulau adalah ....
(Pilihlah semua jawaban yang benar! Setiap soal memiliki lebih dari satu jawaban benar.)`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Perbedaan sumber daya alam yang dimiliki setiap daerah.' },
      { id: 'B', text: 'Keinginan setiap daerah untuk memenuhi kebutuhan sendiri tanpa bantuan daerah lain.' },
      { id: 'C', text: 'Kesamaan seluruh hasil produksi di setiap daerah.' },
      { id: 'D', text: 'Larangan melakukan perdagangan dengan daerah lain.' },
      { id: 'E', text: 'Perbedaan harga barang antara satu daerah dengan daerah lainnya.' }
    ],
    correctAnswers: ['A', 'B', 'E']
  },
  {
    id: 'ips-viii-26',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 26,
    type: 'pg_kompleks',
    prompt: `Perdagangan antarpulau memberikan berbagai manfaat bagi masyarakat dan kegiatan ekonomi. Berikut ini yang termasuk manfaat perdagangan antarpulau adalah ....
(Pilihlah semua jawaban yang benar! Setiap soal memiliki lebih dari satu jawaban benar.)`,
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Mengurangi jumlah barang yang tersedia di masyarakat.' },
      { id: 'B', text: 'Menyediakan barang yang tidak diproduksi di daerah tempat tinggal konsumen.' },
      { id: 'C', text: 'Meningkatkan jumlah produksi karena permintaan barang semakin bertambah.' },
      { id: 'D', text: 'Membuka kesempatan kerja baru melalui kegiatan perdagangan dan jasa pengiriman.' },
      { id: 'E', text: 'Membatasi kegiatan ekonomi masyarakat di daerah lain.' }
    ],
    correctAnswers: ['B', 'C', 'D']
  },
  {
    id: 'ips-viii-27',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 27,
    type: 'pg_kompleks',
    imageUrl: '/images/soal/ips_kelas8_no16_18.png',
    prompt: `Berdasarkan gambar tersebut, faktor-faktor yang memengaruhi dinamika penduduk adalah ....
(Pilihlah semua jawaban yang benar! Setiap soal memiliki lebih dari satu jawaban benar.)`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Pendapatan' },
      { id: 'B', text: 'Kelahiran' },
      { id: 'C', text: 'Industrialisasi' },
      { id: 'D', text: 'Kematian' },
      { id: 'E', text: 'Migrasi' }
    ],
    correctAnswers: ['B', 'D', 'E']
  },
  {
    id: 'ips-viii-28',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 28,
    type: 'pg_kompleks',
    prompt: `Peninggalan kebudayaan Islam di Indonesia dapat dilihat dari berbagai bentuk bangunan dan karya seni. Beberapa peninggalan tersebut merupakan hasil perpaduan budaya Islam dengan budaya lokal.

Manakah yang termasuk bentuk peninggalan budaya Islam dalam bidang bangunan dan seni?
(Pilihlah semua jawaban yang benar! Setiap soal memiliki lebih dari satu jawaban benar.)`,
    points: 5,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Candi bercorak Hindu-Buddha' },
      { id: 'B', text: 'Masjid dengan bentuk atap bertingkat' },
      { id: 'C', text: 'Seni ukir dengan motif tumbuhan dan kaligrafi' },
      { id: 'D', text: 'Makam dengan batu nisan bercorak khas Islam' },
      { id: 'E', text: 'Patung dewa-dewa sebagai hiasan tempat ibadah' }
    ],
    correctAnswers: ['B', 'C', 'D']
  },

  // -----------------------------------------------------------------------
  // C. MENJODOHKAN (No. 29 - 30)
  // -----------------------------------------------------------------------
  {
    id: 'ips-viii-29',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 29,
    type: 'mencocokkan',
    prompt:
      'Petunjuk: Jodohkan pernyataan pada Kolom A dengan jawaban yang tepat pada Kolom B. Pilihlah huruf jawaban yang sesuai.',
    points: 5,
    difficulty: 'sedang',
    options: [],
    matchingPairs: [
      {
        id: 'ips-viii-29-p1',
        leftText:
          '1. Wilayah yang berada pada garis lintang $23{,}5^\\circ$ LU–$23{,}5^\\circ$ LS, memiliki suhu hangat sepanjang tahun, curah hujan relatif tinggi, dan mengalami dua musim.',
        rightText: 'C. Iklim Tropis'
      },
      {
        id: 'ips-viii-29-p2',
        leftText:
          '2. Jenis iklim yang memiliki empat musim, yaitu musim semi, panas, gugur, dan dingin.',
        rightText: 'E. Iklim Subtropis'
      },
      {
        id: 'ips-viii-29-p3',
        leftText:
          '3. Wilayah yang berada pada garis lintang $40^\\circ$–$60^\\circ$ LU dan LS, dengan suhu tidak terlalu panas dan tidak terlalu dingin.',
        rightText: 'A. Iklim Sedang'
      },
      {
        id: 'ips-viii-29-p4',
        leftText:
          '4. Jenis iklim yang terdapat di wilayah Kutub Utara dan Kutub Selatan serta terdiri atas iklim tundra dan iklim es.',
        rightText: 'D. Iklim Dingin'
      },
      {
        id: 'ips-viii-29-p5',
        leftText:
          '5. Negara yang sebagian besar wilayahnya memiliki iklim tropis karena berada di sekitar garis khatulistiwa',
        rightText: 'F. Indonesia'
      }
    ],
    matchingRightOptions: [
      'A. Iklim Sedang',
      'B. Jepang',
      'C. Iklim Tropis',
      'D. Iklim Dingin',
      'E. Iklim Subtropis',
      'F. Indonesia'
    ]
  },
  {
    id: 'ips-viii-30',
    bankId: 'qbank-ips',
    subjectId: 'sbj-ips',
    classId: 'cls-8',
    grade: 'VIII',
    number: 30,
    type: 'mencocokkan',
    prompt:
      'Petunjuk: Jodohkan pernyataan pada Kolom A dengan jawaban yang tepat pada Kolom B. Pilihlah huruf jawaban yang sesuai.',
    points: 5,
    difficulty: 'mudah',
    options: [],
    matchingPairs: [
      {
        id: 'ips-viii-30-p1',
        leftText:
          '1. Unsur cuaca dan iklim yang menunjukkan derajat panas atau dinginnya udara.',
        rightText: 'D. Suhu'
      },
      {
        id: 'ips-viii-30-p2',
        leftText:
          '2. Pergerakan alami udara yang sejajar dengan permukaan bumi.',
        rightText: 'C. Angin'
      },
      {
        id: 'ips-viii-30-p3',
        leftText: '3. Kemampuan udara dalam mengandung uap air.',
        rightText: 'A. Kelembapan'
      },
      {
        id: 'ips-viii-30-p4',
        leftText:
          '4. Unsur cuaca dan iklim yang menunjukkan lamanya matahari bersinar dari terbit hingga terbenam serta memengaruhi suhu udara.',
        rightText: 'E. Penyinaran matahari'
      }
    ],
    matchingRightOptions: [
      'A. Kelembapan',
      'B. Curah hujan',
      'C. Angin',
      'D. Suhu',
      'E. Penyinaran matahari'
    ]
  }
];
