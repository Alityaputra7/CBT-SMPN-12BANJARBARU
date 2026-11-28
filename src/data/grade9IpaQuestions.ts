import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI ILMU PENGETAHUAN ALAM (IPA) SMP KELAS IX (BAB 1-4)
// Sumber: SOAL_IPA_KELAS_9_20ea4408.pdf (25 Soal Lengkap, Total Skor = 100)
// Pedoman Penilaian Resmi (Hal. 5):
// - A. 15 Pilihan Ganda (No. 1-15) x 4 poin = 60 poin
// - B. 5 Benar atau Salah (No. 16-20) x 2 poin = 10 poin
// - C. 5 Esai (No. 21-25) x 6 poin = 30 poin
// Total = 100 poin
// =========================================================================

export const IPA_KELAS_9_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // A. PILIHAN GANDA (No. 1 - 15, 4 poin/soal = 60 poin)
  // -----------------------------------------------------------------------
  {
    id: 'ipa-ix-1',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt:
      'Seorang siswa melakukan pengamatan terhadap dua tanaman kacang hijau. Tanaman A diletakkan di tempat yang terkena cahaya matahari, sedangkan tanaman B diletakkan di tempat gelap. Setelah tujuh hari, tanaman B tumbuh lebih tinggi, tetapi batangnya berwarna pucat dan lemah. Berdasarkan hasil pengamatan tersebut, kesimpulan yang paling tepat adalah ....',
    points: 4,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Cahaya matahari menghambat seluruh proses pertumbuhan tanaman.' },
      { id: 'B', text: 'Tanaman di tempat gelap selalu memiliki kualitas pertumbuhan lebih baik.' },
      { id: 'C', text: 'Kekurangan cahaya menyebabkan tanaman mengalami pemanjangan batang yang tidak normal dan menghambat pembentukan klorofil.' },
      { id: 'D', text: 'Tanaman tidak membutuhkan cahaya selama proses pertumbuhan.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-ix-2',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 2,
    type: 'pg',
    prompt:
      'Seekor kupu-kupu mengalami perubahan bentuk selama siklus hidupnya, dimulai dari telur, larva, pupa, hingga kupu-kupu dewasa. Perubahan tersebut menunjukkan bahwa kupu-kupu mengalami ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Metamorfosis tidak sempurna.' },
      { id: 'B', text: 'Metamorfosis sempurna.' },
      { id: 'C', text: 'Perkembangbiakan vegetatif.' },
      { id: 'D', text: 'Pertumbuhan tanpa perkembangan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-ix-3',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 3,
    type: 'pg',
    prompt:
      'Seorang petani mengamati bahwa tanaman jagung yang diberi pupuk secukupnya tumbuh lebih subur dibandingkan tanaman yang tidak diberi pupuk. Namun, pemberian pupuk secara berlebihan justru menyebabkan beberapa tanaman layu. Faktor yang paling tepat menjelaskan peristiwa tersebut adalah ....',
    points: 4,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Tanaman hanya membutuhkan air untuk tumbuh.' },
      { id: 'B', text: 'Semua jenis pupuk selalu meningkatkan pertumbuhan tanaman.' },
      { id: 'C', text: 'Unsur hara diperlukan dalam jumlah sesuai kebutuhan tanaman.' },
      { id: 'D', text: 'Semakin banyak pupuk diberikan, semakin cepat tanaman tumbuh.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-ix-4',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 4,
    type: 'pg',
    prompt:
      'Pada masa pubertas, seorang anak mengalami perubahan fisik seperti pertumbuhan rambut di bagian tubuh tertentu, perubahan suara pada laki-laki, serta perkembangan organ reproduksi. Perubahan tersebut terutama dipengaruhi oleh ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Hormon yang dihasilkan oleh kelenjar endokrin.' },
      { id: 'B', text: 'Aktivitas sistem pencernaan.' },
      { id: 'C', text: 'Perubahan tekanan udara.' },
      { id: 'D', text: 'Peningkatan jumlah sel darah merah saja.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa-ix-5',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 5,
    type: 'pg',
    prompt:
      'Ketika seseorang tidak sengaja menyentuh benda panas, tangannya segera ditarik sebelum ia menyadari rasa sakitnya. Respons tersebut terjadi karena adanya gerak refleks yang melibatkan ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Otak besar sebagai satu-satunya pusat pengendali.' },
      { id: 'B', text: 'Sumsum tulang belakang sebagai pusat gerak refleks.' },
      { id: 'C', text: 'Sistem pencernaan sebagai pengatur gerakan.' },
      { id: 'D', text: 'Jantung sebagai pusat koordinasi tubuh.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-ix-6',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 6,
    type: 'pg',
    prompt:
      'Ketika suhu lingkungan meningkat, tubuh manusia mengeluarkan keringat. Penguapan keringat membantu menurunkan suhu tubuh agar tetap stabil. Peristiwa tersebut merupakan contoh ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Reproduksi.' },
      { id: 'B', text: 'Adaptasi morfologi.' },
      { id: 'C', text: 'Homeostasis.' },
      { id: 'D', text: 'Metamorfosis.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-ix-7',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 7,
    type: 'pg',
    prompt:
      'Seorang perempuan mengalami menstruasi secara teratur. Menstruasi terjadi ketika tidak ada pembuahan sehingga lapisan dinding rahim mengalami peluruhan. Organ reproduksi yang mengalami peluruhan lapisan dinding tersebut adalah ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Ovarium.' },
      { id: 'B', text: 'Tuba falopi.' },
      { id: 'C', text: 'Uterus (rahim).' },
      { id: 'D', text: 'Vagina.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-ix-8',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 8,
    type: 'pg',
    prompt:
      'Seorang remaja laki-laki mengalami peningkatan hormon testosteron ketika memasuki masa pubertas. Hormon ini berperan dalam perkembangan ciri-ciri kelamin sekunder. Organ yang menghasilkan hormon testosteron terutama adalah ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Testis.' },
      { id: 'B', text: 'Prostat.' },
      { id: 'C', text: 'Vesikula seminalis.' },
      { id: 'D', text: 'Epididimis.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa-ix-9',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 9,
    type: 'pg',
    prompt:
      'Seorang siswa menggunakan sepatu dengan hak tinggi ketika berjalan di atas tanah berlumpur. Sepatu tersebut lebih mudah tenggelam dibandingkan sepatu dengan alas yang lebar. Hal ini terjadi karena ....',
    points: 4,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Sepatu berhak tinggi memiliki massa lebih kecil.' },
      { id: 'B', text: 'Luas bidang tekan lebih kecil sehingga tekanan yang dihasilkan lebih besar.' },
      { id: 'C', text: 'Gaya gravitasi tidak bekerja pada sepatu beralas lebar.' },
      { id: 'D', text: 'Tekanan tidak dipengaruhi oleh luas permukaan.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-ix-10',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 10,
    type: 'pg',
    prompt:
      'Seorang penyelam berada pada kedalaman $2$ meter di bawah permukaan air. Ketika penyelam turun hingga kedalaman $5$ meter, tekanan air yang dirasakannya semakin besar. Penyebab utama peristiwa tersebut adalah ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Massa penyelam semakin bertambah.' },
      { id: 'B', text: 'Tekanan zat cair meningkat seiring bertambahnya kedalaman.' },
      { id: 'C', text: 'Volume air semakin berkurang.' },
      { id: 'D', text: 'Gaya gravitasi semakin kecil di dalam air.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-ix-11',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 11,
    type: 'pg',
    prompt:
      'Sebuah bendungan dibuat lebih tebal pada bagian bawah dibandingkan bagian atasnya. Alasan ilmiah yang paling tepat adalah ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Tekanan air di bagian atas lebih besar daripada di bagian bawah.' },
      { id: 'B', text: 'Tekanan air tidak dipengaruhi kedalaman.' },
      { id: 'C', text: 'Tekanan air semakin besar pada kedalaman yang lebih tinggi.' },
      { id: 'D', text: 'Tekanan air semakin besar seiring bertambahnya kedalaman.' }
    ],
    correctAnswers: ['D']
  },
  {
    id: 'ipa-ix-12',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 12,
    type: 'pg',
    prompt:
      'Ketika seseorang menggunakan sedotan untuk minum, cairan dapat naik melalui sedotan menuju mulut. Hal ini terjadi karena ....',
    points: 4,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Tekanan udara luar mendorong cairan naik ketika tekanan di dalam sedotan diturunkan.' },
      { id: 'B', text: 'Air memiliki gaya magnet yang menariknya ke atas.' },
      { id: 'C', text: 'Gravitasi bumi menghilang di dalam sedotan.' },
      { id: 'D', text: 'Cairan bergerak karena tidak memiliki massa.' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'ipa-ix-13',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 13,
    type: 'pg',
    prompt:
      'Sebuah rumah menggunakan beberapa lampu yang dirangkai secara paralel. Ketika salah satu lampu putus, lampu lainnya tetap menyala. Alasan yang tepat adalah ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Semua lampu terhubung dalam satu jalur arus listrik.' },
      { id: 'B', text: 'Setiap lampu memiliki cabang jalur listrik sendiri.' },
      { id: 'C', text: 'Arus listrik hanya mengalir pada lampu pertama.' },
      { id: 'D', text: 'Tegangan listrik pada semua lampu menjadi nol.' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'ipa-ix-14',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 14,
    type: 'pg',
    prompt:
      'Sebuah pabrik menggunakan generator untuk menghasilkan energi listrik. Generator tersebut bekerja dengan memanfaatkan prinsip induksi elektromagnetik. Perubahan energi yang terjadi pada generator adalah ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Energi listrik menjadi energi kimia.' },
      { id: 'B', text: 'Energi panas menjadi energi cahaya.' },
      { id: 'C', text: 'Energi mekanik menjadi energi listrik.' },
      { id: 'D', text: 'Energi listrik menjadi energi bunyi.' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'ipa-ix-15',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 15,
    type: 'pg',
    prompt:
      'Suatu daerah memiliki intensitas cahaya matahari yang tinggi sepanjang tahun. Pemerintah daerah ingin mengembangkan pembangkit listrik yang ramah lingkungan dan mengurangi penggunaan bahan bakar fosil. Sumber energi alternatif yang paling tepat dikembangkan adalah ....',
    points: 4,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Batu bara.' },
      { id: 'B', text: 'Minyak bumi.' },
      { id: 'C', text: 'Gas alam.' },
      { id: 'D', text: 'Energi surya.' }
    ],
    correctAnswers: ['D']
  },

  // -----------------------------------------------------------------------
  // B. BENAR ATAU SALAH (No. 16 - 20 / B.1 - B.5, 2 poin/soal = 10 poin)
  // -----------------------------------------------------------------------
  {
    id: 'ipa-ix-16',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 16,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nPertumbuhan pada makhluk hidup ditandai dengan bertambahnya ukuran, massa, dan jumlah sel yang bersifat tidak dapat kembali seperti semula.',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'ipa-ix-17',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 17,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nSumsum tulang belakang berperan dalam mengatur gerak refleks ketika seseorang menyentuh benda panas.',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'ipa-ix-18',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 18,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nSemakin besar luas bidang tekan dengan gaya yang sama, semakin besar tekanan yang dihasilkan.',
    points: 2,
    difficulty: 'sedang',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['SALAH']
  },
  {
    id: 'ipa-ix-19',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 19,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nPada rangkaian listrik seri, jika salah satu lampu terputus, seluruh lampu akan padam.',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },
  {
    id: 'ipa-ix-20',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 20,
    type: 'benar_salah',
    prompt:
      'Tentukan apakah pernyataan berikut Benar atau Salah sesuai dengan konsep IPA yang tepat:\n\nEnergi matahari dan energi angin termasuk sumber energi terbarukan karena dapat diperoleh kembali secara alami.',
    points: 2,
    difficulty: 'mudah',
    options: [
      { id: 'BENAR', text: 'BENAR' },
      { id: 'SALAH', text: 'SALAH' }
    ],
    correctAnswers: ['BENAR']
  },

  // -----------------------------------------------------------------------
  // C. ESAI (No. 21 - 25 / C.1 - C.5, 6 poin/soal = 30 poin)
  // -----------------------------------------------------------------------
  {
    id: 'ipa-ix-21',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 21,
    type: 'uraian',
    prompt:
      'Seorang petani menanam dua kelompok tanaman kacang hijau dengan kondisi lingkungan yang berbeda. Kelompok pertama mendapatkan air dan cahaya matahari yang cukup, sedangkan kelompok kedua kekurangan air dan diletakkan di tempat gelap. Jelaskan mengapa kedua kelompok tanaman tersebut dapat mengalami perbedaan pertumbuhan dan perkembangan!',
    points: 6,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban: Tanaman pertama tumbuh lebih baik karena memperoleh air dan cahaya yang cukup untuk fotosintesis dan metabolisme. Tanaman kedua mengalami hambatan pertumbuhan karena kekurangan air dan cahaya. (Skor maksimal 6.)'
  },
  {
    id: 'ipa-ix-22',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 22,
    type: 'uraian',
    prompt:
      'Ketika seseorang berlari dalam waktu yang cukup lama, detak jantung dan frekuensi pernapasannya meningkat serta tubuh mengeluarkan keringat. Jelaskan hubungan ketiga respons tersebut dengan fungsi sistem koordinasi dan mekanisme homeostasis dalam menjaga kestabilan kondisi tubuh!',
    points: 6,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban: Sistem saraf dan hormon mengatur respons tubuh. Detak jantung dan pernapasan meningkat untuk memenuhi kebutuhan oksigen, sedangkan keringat membantu menurunkan suhu tubuh sehingga homeostasis terjaga. (Skor maksimal 6.)'
  },
  {
    id: 'ipa-ix-23',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 23,
    type: 'uraian',
    prompt:
      'Seorang penyelam merasakan tekanan air semakin besar ketika menyelam lebih dalam. Jelaskan hubungan antara kedalaman zat cair dan besar tekanan hidrostatis berdasarkan peristiwa tersebut!',
    points: 6,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban: Semakin dalam posisi benda di dalam zat cair, semakin besar tekanan hidrostatis karena semakin besar berat zat cair yang berada di atasnya. (Skor maksimal 6.)'
  },
  {
    id: 'ipa-ix-24',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 24,
    type: 'uraian',
    prompt:
      'Sebuah rumah menggunakan rangkaian listrik paralel untuk menghidupkan beberapa lampu. Jelaskan alasan rangkaian paralel lebih sesuai digunakan dalam instalasi listrik rumah dibandingkan rangkaian seri!',
    points: 6,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban: Rangkaian paralel memiliki cabang tersendiri sehingga apabila satu lampu putus, lampu lainnya tetap menyala. Setiap lampu juga memperoleh tegangan sumber yang sama. (Skor maksimal 6.)'
  },
  {
    id: 'ipa-ix-25',
    bankId: 'qbank-ipa',
    subjectId: 'sbj-ipa',
    classId: 'cls-9',
    grade: 'IX',
    number: 25,
    type: 'uraian',
    prompt:
      'Sebuah desa terpencil belum mendapatkan pasokan listrik yang memadai, tetapi memiliki intensitas cahaya matahari yang tinggi sepanjang tahun. Jelaskan bagaimana pemanfaatan energi surya dapat menjadi solusi penyediaan listrik bagi masyarakat desa tersebut serta manfaatnya bagi lingkungan!',
    points: 6,
    difficulty: 'sedang',
    options: [],
    essayRubric:
      'Pedoman Jawaban: Energi matahari dapat diubah menjadi energi listrik menggunakan panel surya. Energi ini dapat dimanfaatkan untuk kebutuhan rumah tangga dan mengurangi ketergantungan terhadap bahan bakar fosil serta mengurangi pencemaran lingkungan. (Skor maksimal 6.)'
  }
];
