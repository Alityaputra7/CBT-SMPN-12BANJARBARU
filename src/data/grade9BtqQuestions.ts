import { Question } from '../types/cbt';

// =========================================================================
// BANK SOAL RESMI BACA TULIS AL-QUR'AN (BTQ) KELAS IX SMPN 12 BANJARBARU
// Sumber: SOAL_BTA_Kelas_9_d3dd1315.pdf (30 Soal Lengkap, Total Skor = 100)
// Pedoman Penskoran Resmi (Hal. 10):
// - Bagian A: 25 Pilihan Ganda Tunggal (No. 1-25) x 3 poin = 75 poin
// - Bagian B: 5 Pilihan Ganda Kompleks / Campuran (No. 26-30) x 5 poin = 25 poin
// Total = 100 poin
// =========================================================================

export const BTQ_KELAS_9_QUESTIONS: Question[] = [
  // -----------------------------------------------------------------------
  // BAGIAN A: PILIHAN GANDA TUNGGAL (No. 1 - 25, 3 poin/soal = 75 poin)
  // -----------------------------------------------------------------------
  {
    id: 'btq-ix-1',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 1,
    type: 'pg',
    prompt:
      "Seorang siswa melafalkan huruf ح (Ha) dengan cara mengeluarkan bunyi dari pangkal tenggorokan sehingga terdengar seperti huruf هـ (Ha besar). Berdasarkan pembagian 5 makhraj global (Al-Makharij Al-'Ammah) dan 17 makhraj terperinci, kesalahan siswa tersebut terletak pada...",
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Menggeser makhraj Halq bagian tengah (Wasathul Halq) ke pangkal tenggorokan (Aqshal Halq)' },
      { id: 'B', text: 'Menggeser makhraj Lisan bagian pangkal ke ujung tenggorokan (Adnal Halq)' },
      { id: 'C', text: 'Tertukarnya makhraj Jauf dengan makhraj Syafatain saat posisi sukun' },
      { id: 'D', text: 'Berpindahnya makhraj Khaisyum menuju bagian tengah tenggorokan (Wasathul Halq)' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-2',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 2,
    type: 'pg',
    prompt:
      'Perhatikan pasangan huruf berikut: ط (Tha) dan ت (Ta). Keduanya keluar dari makhraj yang sama, yakni ujung lidah yang bertemu dengan pangkal gigi seri atas. Namun, bunyi keduanya sangat berbeda saat diucapkan. Faktor sifat huruf (Sifatul Huruf) berlawanan yang paling menentukan perbedaan karakter tebal-tipisnya bunyi kedua huruf tersebut adalah...',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Hams dan Jahr' },
      { id: 'B', text: 'Syiddah dan Rakhawah' },
      { id: 'C', text: "Isti'la dan Istifal" },
      { id: 'D', text: 'Idzlaq dan Ishmat' }
    ],
    correctAnswers: ['C']
  },
  {
    id: 'btq-ix-3',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 3,
    type: 'pg',
    prompt:
      'Dalam ilmu tajwid terdapat sifat huruf yang tidak memiliki lawan (Sifat Ghairu Mutadhadah). Salah satu sifat tersebut adalah Tafasyyi, yang berarti menyebarnya angin di dalam mulut secara merata saat mengucapkan hurufnya. Huruf hijaiyah yang secara khusus memiliki sifat ini adalah...',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'ص (Shad)' },
      { id: 'B', text: 'ش (Syin)' },
      { id: 'C', text: 'ض (Dhad)' },
      { id: 'D', text: 'ز (Zai)' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-ix-4',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 4,
    type: 'pg',
    prompt:
      'Perhatikan penggalan ayat berikut:\nفَإِذَا جَاءَتِ الطَّامَّةُ الْكُبْرٰى\n\nPada lafaz الطَّامَّةُ terdapat tanda bendera (maddah) di atas huruf Tha yang bertemu dengan huruf Mim bertasydid dalam satu kata. Hukum bacaan dan cara membacanya yang paling tepat adalah...',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Mad Wajib Muttashil, dibaca panjang 4 atau 5 harakat tanpa penekanan' },
      { id: 'B', text: 'Mad Lazim Mutsaqqal Kalimi, dibaca panjang 6 harakat lalu ditekan/diidghamkan ke huruf Mim' },
      { id: 'C', text: 'Mad Lazim Mukhaffaf Kilmi, dibaca panjang 6 harakat tanpa ada penekanan tasydid' },
      { id: 'D', text: 'Mad Farqu, dibaca panjang 6 harakat untuk membedakan kalimat tanya dan berita' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-ix-5',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 5,
    type: 'pg',
    prompt:
      "Cermati lafaz berikut yang terdapat dalam Q.S. Yunus ayat 51 dan 91:\nءَآلْـٰٔنَ\n\nDalam seluruh Al-Qur'an, lafaz ini menjadi satu-satunya contoh dari hukum Mad Lazim Mukhaffaf Kilmi. Alasan utama penamaan Mukhaffaf (diringankan) pada hukum mad tersebut adalah...",
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Huruf mad bertemu dengan huruf yang berharakat sukun asli tanpa disertai tasydid dalam satu kata' },
      { id: 'B', text: "Huruf mad bertemu dengan hamzah qatha' yang berharakat sukun di akhir kalimat" },
      { id: 'C', text: 'Huruf mad terjadi karena pertemuan dua huruf yang sama namun dibaca ringan' },
      { id: 'D', text: 'Huruf mad berfungsi sebagai pengganti hamzah washal pada awal kalimat tanya' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-6',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 6,
    type: 'pg',
    prompt:
      'Perhatikan ayat berikut:\nقُلْ ءَآللّٰهُ أَذِنَ لَكُمْ\n\nPada lafaz ءَآللّٰهُ, panjang bacaannya adalah 6 harakat. Fungsi utama dari hukum Mad Farqu pada lafaz tersebut adalah...',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Memanjangkan suara agar irama tilawah terdengar lebih tartil di awal kalimat' },
      { id: 'B', text: 'Membedakan antara kalimat tanya (istifham) dengan kalimat berita (khabar)' },
      { id: 'C', text: "Menggantikan fungsi huruf lam ta'rif yang melebur ke dalam lafaz Jalalah" },
      { id: 'D', text: 'Memisahkan dua huruf berharakat sama yang berdampingan dalam satu lafaz' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-ix-7',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 7,
    type: 'pg',
    prompt:
      'Perhatikan potongan ayat dari Q.S. Al-Muthaffifin ayat 14 berikut:\nكَلَّا بَلْ ۜ رَانَ عَلٰى قُلُوْبِهِمْ\n\nPada mushaf standar Usmani, terdapat huruf س kecil di atas huruf Lam pada kata بَلْ. Tanda tersebut menunjukkan adanya bacaan Saktah. Cara mempraktikkan bacaan Saktah yang benar saat tilawah adalah...',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Berhenti sejenak selama 2 harakat sambil mengambil napas baru, lalu melanjutkan bacaan' },
      { id: 'B', text: 'Berhenti sejenak tanpa mengambil napas sekitar 2 harakat, kemudian melanjutkan ke kata berikutnya' },
      { id: 'C', text: 'Menyambung bacaan secara langsung dengan meleburkan huruf Lam ke dalam huruf Ra' },
      { id: 'D', text: 'Memanjangkan bunyi huruf Lam selama 4 harakat sebelum berpindah ke huruf Ra' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-ix-8',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 8,
    type: 'pg',
    prompt:
      'Perhatikan dua potongan lafaz berikut: (1) حُيِّيْتُمْ (Q.S. An-Nisa: 86) dan (2) النَّبِيِّيْنَ (Q.S. Al-Baqarah: 61).\nKedua lafaz di atas mengandung hukum Mad Tamkin yang dibaca panjang 2 harakat. Syarat terjadinya hukum bacaan tersebut adalah...',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Bertemunya dua huruf Ya, di mana Ya pertama bertasydid dan berharakat kasrah, sedangkan Ya kedua berharakat sukun' },
      { id: 'B', text: 'Bertemunya dua huruf Wau sukun di tengah kata yang didahului oleh huruf berharakat dhammah' },
      { id: 'C', text: 'Huruf Ya sukun yang didahului oleh huruf berharakat fathah dan terletak di akhir ayat' },
      { id: 'D', text: 'Bertemunya huruf Ya mad dengan huruf bertasydid pada kata yang berbeda' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-9',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 9,
    type: 'pg',
    prompt:
      "Pada pembukaan beberapa surat dalam Al-Qur'an terdapat huruf-huruf terputus (Huruf Muqattha'ah), seperti pada awal Q.S. Al-Qalam (نٓ) dan Q.S. Yasin (يٰسٓ). Berdasarkan pembagian Mad Harfi, perbedaan cara membaca huruf ن (Nun) dan huruf ي (Ya) pada kedua pembukaan surat tersebut adalah...",
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "Huruf ن dibaca 6 harakat (Mad Lazim Harfi), sedangkan huruf ي dibaca 2 harakat (Mad Thabi'i Harfi)" },
      { id: 'B', text: "Huruf ن dibaca 2 harakat (Mad Thabi'i Harfi), sedangkan huruf ي dibaca 6 harakat (Mad Lazim Harfi)" },
      { id: 'C', text: 'Keduanya sama-sama dibaca 6 harakat karena terletak di awal surat sebagai pembuka ayat' },
      { id: 'D', text: 'Huruf ن dibaca 4 harakat dengan dengung, sedangkan huruf ي dibaca 2 harakat tanpa dengung' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-10',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 10,
    type: 'pg',
    prompt:
      "Perhatikan daftar huruf-huruf Muqattha'ah berikut: ن – ق – ص – ع – س – ل – ك – م. Huruf-huruf yang terhimpun dalam kalimat نَقَصَ عَسَلُكُمْ (Naqasha 'Asalukum) tersebut apabila berada di awal surat memiliki ketentuan bacaan yang sama, yaitu...",
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Dibaca sesuai nama hurufnya dengan panjang 2 harakat tanpa pengecualian' },
      { id: 'B', text: 'Dibaca sesuai nama hurufnya dengan panjang 6 harakat (Mad Lazim Harfi)' },
      { id: 'C', text: 'Dibaca berdasarkan harakat yang tertulis di atasnya sepanjang 4 harakat' },
      { id: 'D', text: 'Dibaca dengan memantulkan ujung hurufnya (Qalqalah) sepanjang 2 harakat' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-ix-11',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 11,
    type: 'pg',
    prompt:
      "Perhatikan perbedaan penulisan dan pelafalan Hamzah berikut: Lafaz A: اِهْدِنَا الصِّرَاطَ (jika dibaca dari awal ayat) dan Lafaz B: وَأْمُرْ أَهْلَكَ (hamzah pada kata wa'mur di tengah kalimat). Analisis yang tepat mengenai kedudukan Hamzah Washal dan Hamzah Qatha' pada kedua lafaz di atas adalah...",
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: "Lafaz A menggunakan Hamzah Washal yang terbaca berharakat kasrah di awal bacaan dan gugur jika disambung; Lafaz B menggunakan Hamzah Qatha' yang tetap terbaca jelas di tengah kalimat" },
      { id: 'B', text: "Lafaz A menggunakan Hamzah Qatha' yang selalu berharakat kasrah; Lafaz B menggunakan Hamzah Washal yang gugur ketika disambung dengan huruf Wau" },
      { id: 'C', text: 'Keduanya menggunakan Hamzah Washal, namun Lafaz A wajib dibaca kasrah dan Lafaz B wajib dibaca sukun' },
      { id: 'D', text: "Keduanya menggunakan Hamzah Qatha', sehingga penulisan kepalanya (ra'sul 'ain) harus selalu dicantumkan di awal maupun di tengah kata" }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-12',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 12,
    type: 'pg',
    prompt:
      "Ketika seorang qari memulai bacaan (ibtida') dari kata kerja (fi'il) yang diawali oleh Hamzah Washal tanpa harakat tertulis, seperti pada lafaz اُدْعُ إِلٰى سَبِيْلِ رَبِّكَ, cara menentukan harakat Hamzah Washal yang tepat adalah...",
    points: 3,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: "Melihat harakat huruf ketiga; karena huruf ketiga ('Ain) berharakat dhammah, maka Hamzah Washal dibaca dhammah (U)" },
      { id: 'B', text: "Selalu membaca Hamzah Washal dengan harakat kasrah (I) pada semua bentuk kata kerja (fi'il)" },
      { id: 'C', text: 'Melihat harakat huruf kedua; karena huruf kedua (Dal) bersukun, maka Hamzah Washal dibaca fathah (A)' },
      { id: 'D', text: 'Membaca Hamzah Washal dengan harakat sukun sehingga langsung melafalkan huruf kedua' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-13',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 13,
    type: 'pg',
    prompt:
      "Saat membaca Q.S. Al-Baqarah ayat 2, seorang siswa menjumpai tanda waqaf ۛ (titik tiga) sebanyak dua kali pada penggalan:\nذٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيْهِ ۛ هُدًى لِلْمُتَّقِيْنَ\n\nSiswa tersebut berhenti sejenak pada tanda titik tiga yang pertama (setelah kata raiba), lalu melanjutkan bacaan tanpa berhenti pada tanda titik tiga kedua (setelah kata fihi). Hukum tindakan siswa tersebut menurut kaidah Waqaf Mu'anaqah adalah...",
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Salah, karena tanda titik tiga mewajibkan pembaca berhenti di kedua tempat tersebut' },
      { id: 'B', text: "Benar, karena Waqaf Mu'anaqah mengharuskan berhenti di salah satu tanda saja dan tidak boleh di keduanya" },
      { id: 'C', text: "Kurang tepat, karena tanda titik tiga berarti dilarang berhenti (Waqaf Mamnu')" },
      { id: 'D', text: 'Benar, karena tanda titik tiga menunjukkan bahwa menyambung bacaan lebih utama daripada berhenti' }
    ],
    correctAnswers: ['B']
  },
  {
    id: 'btq-ix-14',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 14,
    type: 'pg',
    prompt:
      "Dalam mushaf Al-Qur'an terdapat tanda waqaf قلى (Al-Waqfu Aula) dan tanda waqaf صلى (Al-Washlu Aula). Perbedaan prinsip penerapan kedua tanda waqaf tersebut saat tilawah adalah...",
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'قلى mengutamakan berhenti pada kata tersebut, sedangkan صلى mengutamakan menyambung bacaan ke kata berikutnya' },
      { id: 'B', text: 'قلى mengutamakan menyambung bacaan, sedangkan صلى mewajibkan pembaca untuk berhenti sejenak' },
      { id: 'C', text: 'قلى melarang pembaca berhenti karena merusak makna, sedangkan صلى membolehkan berhenti dan menyambung secara seimbang' },
      { id: 'D', text: 'Keduanya memiliki arti yang sama, yakni wajib berhenti di akhir ayat agar makna tidak terputus' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-15',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 15,
    type: 'pg',
    prompt:
      "Perhatikan ayat berikut:\nسَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى\n\nKandungan pokok yang diperintahkan Allah SWT kepada Nabi Muhammad SAW dan umat Islam pada ayat pertama Q.S. Al-A'la tersebut adalah...",
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Menyucikan nama Allah Yang Mahatinggi dari segala sifat kekurangan dan menyekutukan-Nya' },
      { id: 'B', text: 'Mengingat kembali penciptaan manusia dari setetes air yang terpancar' },
      { id: 'C', text: 'Menyampaikan kabar gembira bagi orang-orang yang beriman tentang surga yang tinggi' },
      { id: 'D', text: 'Merenungkan pergantian siang dan malam sebagai tanda kekuasaan Allah' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-16',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 16,
    type: 'pg',
    prompt:
      'Perhatikan terjemahan ayat dari Q.S. Al-A\'la berikut:\n"Tetapi kamu (orang-orang kafir) memilih kehidupan duniawi. Sedang kehidupan akhirat adalah lebih baik dan lebih kekal."\n\nLafaz ayat yang sesuai dengan terjemahan di atas adalah...',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'بَلْ تُؤْثِرُوْنَ الْحَيٰوةَ الدُّنْيَا ﴿١٦﴾ وَالْآخِرَةُ خَيْرٌ وَأَبْقٰى ﴿١٧﴾' },
      { id: 'B', text: 'قَدْ أَفْلَحَ مَنْ تَزَكّٰى ﴿١٤﴾ وَذَكَرَ اسْمَ رَبِّهِ فَصَلّٰى ﴿١٥﴾' },
      { id: 'C', text: 'سَيَذَّكَّرُ مَنْ يَخْشٰى ﴿١٠﴾ وَيَتَجَنَّبُهَا الْأَشْقَى ﴿١١﴾' },
      { id: 'D', text: 'إِنَّ هٰذَا لَفِي الصُّحُفِ الْأُوْلٰى ﴿١٨﴾ صُحُفِ إِبْرَاهِيْمَ وَمُوْسٰى ﴿١٩﴾' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-17',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 17,
    type: 'pg',
    prompt:
      'Dalam Q.S. Al-Ghasyiyah ayat 17–20, Allah SWT mengajak manusia untuk memperhatikan empat ciptaan-Nya di alam semesta sebagai bukti kekuasaan dan kebesaran-Nya. Urutan objek perenungan yang disebutkan secara berurutan dalam ayat-ayat tersebut adalah...',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Unta diciptakan – Langit ditinggikan – Gunung-gunung ditegakkan – Bumi dihamparkan' },
      { id: 'B', text: 'Langit ditinggikan – Bumi dihamparkan – Gunung-gunung ditegakkan – Unta diciptakan' },
      { id: 'C', text: 'Bumi dihamparkan – Unta diciptakan – Langit ditinggikan – Gunung-gunung ditegakkan' },
      { id: 'D', text: 'Gunung-gunung ditegakkan – Unta diciptakan – Bumi dihamparkan – Langit ditinggikan' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-18',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 18,
    type: 'pg',
    prompt:
      'Perhatikan potongan ayat dari Q.S. Al-Ghasyiyah berikut:\nفَذَكِّرْ إِنَّمَا أَنْتَ مُذَكِّرٌ ﴿٢١﴾ لَسْتَ عَلَيْهِمْ بِمُصَيْطِرٍ ﴿٢٢﴾\n\nPesan utama yang terkandung dalam kedua ayat tersebut terkait tugas dakwah Rasulullah SAW adalah...',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Tugas rasul hanyalah menyampaikan peringatan, bukan memaksa kehendak orang lain untuk beriman' },
      { id: 'B', text: "Tugas rasul adalah menghukum secara langsung kaum yang menolak kebenaran Al-Qur'an" },
      { id: 'C', text: 'Tugas rasul adalah mencatat seluruh amal perbuatan manusia sebelum hari pembalasan tiba' },
      { id: 'D', text: 'Tugas rasul terbatas hanya pada kaum kerabat terdekat di kota Makkah saja' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-19',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 19,
    type: 'pg',
    prompt:
      'Dalam Q.S. Al-Fajr ayat 15–16, Allah SWT menggambarkan sifat dasar manusia yang keliru dalam memaknai ujian hidup. Ketika diberi kelapangan rezeki ia merasa dimuliakan, namun ketika rezekinya disempitkan ia berkata "Rabbī ahānan" (Tuhanku telah menghinakanku). Sikap yang tepat untuk meluruskan cara pandang keliru tersebut berdasarkan Q.S. Al-Fajr adalah...',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Menyadari bahwa kekayaan maupun kesempitan rezeki sama-sama merupakan bentuk ujian keimanan, bukan ukuran kemuliaan di sisi Allah' },
      { id: 'B', text: 'Meyakini bahwa kemuliaan seseorang di akhirat ditentukan sepenuhnya oleh banyaknya harta yang dimiliki di dunia' },
      { id: 'C', text: 'Menganggap bahwa kesempitan rezeki merupakan tanda bahwa Allah tidak lagi mengasihi hamba-Nya' },
      { id: 'D', text: 'Menjauhi seluruh urusan duniawi agar terhindar dari ujian berupa kelapangan maupun kesempitan harta' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-20',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 20,
    type: 'pg',
    prompt:
      'Perhatikan potongan ayat berikut:\nيَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ﴿٢٧﴾ ارْجِعِي إِلٰى رَبِّكِ رَاضِيَةً مَرْضِيَّةً ﴿٢٨﴾\n\nSeruan lembut pada akhir Q.S. Al-Fajr di atas ditujukan kepada...',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Jiwa yang tenang karena keimanannya, untuk kembali kepada Allah dengan hati rida dan diridai serta masuk ke dalam surga-Nya' },
      { id: 'B', text: 'Orang-orang yang lalai dalam memuliakan anak yatim dan enggan memberi makan orang miskin' },
      { id: 'C', text: "Kaum terdahulu seperti kaum 'Ad, Tsamud, dan Fir'aun yang berbuat melampaui batas di muka bumi" },
      { id: 'D', text: 'Manusia yang menyesal pada hari kiamat karena tidak mempersiapkan bekal amal saleh selama di dunia' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-21',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 21,
    type: 'pg',
    prompt:
      'Perhatikan urutan ayat dalam Q.S. Ath-Thariq berikut:\n(1) يَخْرُجُ مِنْ بَيْنِ الصُّلْبِ وَالتَّرَائِبِ\n(2) فَلْيَنْظُرِ الْإِنْسَانُ مِمَّ خُلِقَ\n(3) إِنَّهُ عَلٰى رَجْعِهِ لَقَادِرٌ\n(4) خُلِقَ مِنْ مَاءٍ دَافِقٍ\n\nSusunan ayat yang benar sesuai urutan mushaf Q.S. Ath-Thariq ayat 5 hingga 8 adalah...',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: '2 – 4 – 1 – 3' },
      { id: 'B', text: '2 – 1 – 4 – 3' },
      { id: 'C', text: '4 – 2 – 1 – 3' },
      { id: 'D', text: '1 – 2 – 4 – 3' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-22',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 22,
    type: 'pg',
    prompt:
      "Dalam Q.S. Ath-Thariq ayat 13–14, Allah SWT menegaskan sifat Al-Qur'an dengan firman-Nya:\nإِنَّهُ لَقَوْلٌ فَصْلٌ ﴿١٣﴾ وَمَا هُوَ بِالْهَزْلِ ﴿١٤﴾\n\nMakna dari ungkapan Qaulun Fashlun dan Wa mā huwa bil-hazl pada ayat tersebut adalah...",
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: "Al-Qur'an adalah firman yang memisahkan antara kebenaran dan kebatilan, serta sama sekali bukan senda gurau" },
      { id: 'B', text: "Al-Qur'an adalah kitab yang diturunkan secara berangsur-angsur dalam bahasa Arab yang fasih" },
      { id: 'C', text: "Al-Qur'an adalah peringatan khusus bagi bintang yang bersinar terang pada malam hari" },
      { id: 'D', text: "Al-Qur'an adalah catatan amal manusia yang dijaga ketat oleh para malaikat pencatat" }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-23',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 23,
    type: 'pg',
    prompt:
      'Perhatikan ayat dari Q.S. Al-Buruj berikut:\nقُتِلَ أَصْحَابُ الْأُخْدُوْدِ ﴿٤﴾ النَّارِ ذَاتِ الْوَقُوْدِ ﴿٥﴾\n\nPeristiwa sejarah yang diabadikan dalam ayat tersebut merupakan pelajaran tentang keteguhan iman, yakni...',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Pengorbanan kaum mukminin yang dibakar hidup-hidup di dalam parit berapi oleh penguasa zalim karena mempertahankan akidah tauhid' },
      { id: 'B', text: "Kehancuran tentara bergajah yang hendak menghancurkan Ka'bah di kota Makkah" },
      { id: 'C', text: "Tenggelamnya bala tentara Fir'aun di Laut Merah saat mengejar Nabi Musa AS dan Bani Israil" },
      { id: 'D', text: 'Binasanya kaum Tsamud akibat sambaran petir setelah menyembelih unta mukjizat Nabi Saleh AS' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-24',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 24,
    type: 'pg',
    prompt:
      'Perhatikan penggalan Q.S. Al-Insyiqaq berikut:\nفَأَمَّا مَنْ أُوْتِيَ كِتَابَهُ بِيَمِيْنِهِ ﴿٧﴾ فَسَوْفَ يُحَاسَبُ حِسَابًا يَسِيْرًا ﴿٨﴾\n\nBerdasarkan ayat tersebut, kondisi golongan manusia yang menerima catatan amalnya dengan tangan kanan pada hari kiamat adalah...',
    points: 3,
    difficulty: 'mudah',
    options: [
      { id: 'A', text: 'Akan diperiksa amalnya dengan pemeriksaan yang mudah dan kembali kepada kaumnya dalam keadaan gembira' },
      { id: 'B', text: 'Akan berteriak mengharapkan kebinasaan dan dimasukkan ke dalam api neraka yang menyala-nyala' },
      { id: 'C', text: 'Akan merasakan kesengsaraan yang bertingkat-tingkat karena mendustakan hari pembalasan' },
      { id: 'D', text: 'Akan terhalang dari rahmat Allah karena selama di dunia menyangka tidak akan pernah kembali kepada-Nya' }
    ],
    correctAnswers: ['A']
  },
  {
    id: 'btq-ix-25',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 25,
    type: 'pg',
    prompt:
      'Perhatikan ayat berikut dari Q.S. Al-Insyiqaq ayat 19:\nلَتَرْكَبُنَّ طَبَقًا عَنْ طَبَقٍ\n\nPesan moral yang terkandung dalam ayat tersebut bagi kehidupan manusia adalah...',
    points: 3,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Manusia pasti akan melalui fase kehidupan demi fase secara bertingkat, mulai dari lahir, hidup di dunia, mati, hingga kebangkitan di akhirat' },
      { id: 'B', text: 'Manusia diperintahkan untuk melakukan perjalanan jauh guna mencari karunia Allah di muka bumi' },
      { id: 'C', text: 'Langit akan terbelah dan patuh sepenuhnya terhadap perintah Tuhannya pada hari kiamat' },
      { id: 'D', text: 'Orang-orang yang beriman dan beramal saleh akan memperoleh pahala yang tidak pernah terputus' }
    ],
    correctAnswers: ['A']
  },

  // -----------------------------------------------------------------------
  // BAGIAN B: PILIHAN GANDA KOMPLEKS / CAMPURAN (No. 26 - 30, 5 poin/soal = 25 poin)
  // -----------------------------------------------------------------------
  {
    id: 'btq-ix-26',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 26,
    type: 'pg_kompleks',
    prompt:
      "(Pilih DUA jawaban yang benar) Dalam ilmu tajwid, terdapat 5 tempat keluar huruf secara umum (Al-Makharij Al-'Ammah) yang dirinci menjadi 17 makhraj khusus. Manakah pernyataan di bawah ini yang tepat mengenai pengelompokan makhraj global dan rinciannya?",
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Al-Jauf (rongga mulut dan tenggorokan) memiliki 1 makhraj terperinci yang khusus untuk huruf-huruf mad (ا، و، ي).' },
      { id: 'B', text: 'Al-Halq (tenggorokan) terbagi menjadi 3 makhraj terperinci yang masing-masing ditempati oleh 2 huruf hijaiyah.' },
      { id: 'C', text: 'Al-Lisan (lidah) merupakan makhraj dengan pembagian paling sedikit, yakni hanya terdiri atas 2 makhraj terperinci.' },
      { id: 'D', text: 'Asy-Syafatain (dua bibir) memiliki 4 makhraj terperinci yang ditempati oleh huruf-huruf Qalqalah.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'btq-ix-27',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 27,
    type: 'pg_kompleks',
    prompt:
      '(Pilih TIGA jawaban yang benar) Sifat huruf yang tidak memiliki lawan (Sifat Ghairu Mutadhadah) berfungsi menyempurnakan karakter bunyi huruf tertentu. Manakah pasangan sifat huruf dan hurufnya berikut ini yang benar?',
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: 'Qalqalah (pantulan suara) dimiliki oleh 5 huruf yang tergabung dalam قُطْبُ جَدٍّ (ق، ط، ب، ج، د).' },
      { id: 'B', text: 'Shafir (suara desis menyerupai siulan) dimiliki oleh 3 huruf, yaitu ص، ز، س.' },
      { id: 'C', text: 'Istithalah (memanjangnya suara dari pangkal tepi lidah hingga ujungnya) dimiliki khusus oleh huruf ض (Dhad).' },
      { id: 'D', text: 'Takrir (bergetarnya ujung lidah secara berlebihan) dimiliki oleh huruf ل (Lam) dan ن (Nun).' }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'btq-ix-28',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 28,
    type: 'pg_kompleks',
    prompt:
      "(Pilih DUA jawaban yang benar) Cermati ketentuan hukum Mad Lazim Mutsaqqal Kalimi dan Mad Lazim Harfi Musyba' berikut ini. Manakah pernyataan analisis yang benar terkait kedua hukum mad tersebut?",
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Pada Mad Lazim Mutsaqqal Kalimi, huruf mad bertemu dengan huruf bertasydid dalam satu kata dan wajib dibaca sepanjang 6 harakat, seperti pada kata الضَّالِّيْنَ.' },
      { id: 'B', text: "Pada Mad Lazim Harfi Musyba', huruf muqattha'ah di awal surat yang ejaannya terdiri atas 3 huruf dengan huruf tengah berupa huruf mad dibaca sepanjang 6 harakat, seperti huruf ل dan م pada الٓمٓ." },
      { id: 'C', text: 'Kedua hukum mad tersebut sama-sama boleh dibaca pendek 2 harakat apabila pembaca ingin mempercepat bacaan (hadr).' },
      { id: 'D', text: 'Mad Lazim Mutsaqqal Kalimi hanya terjadi pada huruf-huruf pembuka surat, sedangkan Mad Lazim Harfi hanya terjadi di pertengahan ayat.' }
    ],
    correctAnswers: ['A', 'B']
  },
  {
    id: 'btq-ix-29',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 29,
    type: 'pg_kompleks',
    prompt:
      "(Pilih TIGA jawaban yang benar) Perhatikan aturan mengenai Hamzah Washal dan Hamzah Qatha' dalam penulisan mushaf Usmani serta pelafalannya. Manakah pernyataan berikut yang sesuai dengan kaidah ilmu tajwid?",
    points: 5,
    difficulty: 'sukar',
    options: [
      { id: 'A', text: 'Hamzah Washal ditulis dalam bentuk huruf Alif dengan tanda kepala huruf Shad kecil di atasnya (ٱ), dan tidak dilafalkan ketika disambung dengan kata sebelumnya.' },
      { id: 'B', text: "Hamzah Washal pada Alif Lam Ta'rif (ال) selalu dibaca dengan harakat fathah (A) apabila dijadikan permulaan bacaan (ibtida'), contohnya pada kata ٱلْحَمْدُ." },
      { id: 'C', text: "Hamzah Qatha' ditulis dengan kepala huruf 'Ain kecil (أ / إ / ؤ / ئ) dan tetap dilafalkan dengan jelas baik di awal kalimat maupun di tengah kalimat." },
      { id: 'D', text: "Hamzah Qatha' akan gugur dan tidak terbaca apabila didahului oleh huruf Wau atau Fa di tengah kalimat." }
    ],
    correctAnswers: ['A', 'B', 'C']
  },
  {
    id: 'btq-ix-30',
    bankId: 'qbank-btq',
    subjectId: 'sbj-btq',
    classId: 'cls-9',
    grade: 'IX',
    number: 30,
    type: 'pg_kompleks',
    prompt:
      "(Pilih DUA jawaban yang benar) Cermati keterkaitan kandungan ayat antar-surat dalam Juz 'Amma berikut ini. Manakah pernyataan yang benar mengenai pesan pokok surat-surat tersebut?",
    points: 5,
    difficulty: 'sedang',
    options: [
      { id: 'A', text: "Q.S. Al-A'la ayat 14–15 menegaskan bahwa keberuntungan sejati diraih oleh orang yang menyucikan diri (beriman/berzakat), mengingat nama Tuhannya, lalu mendirikan salat." },
      { id: 'B', text: "Q.S. Al-Buruj menggambarkan kebinasaan para pembuat parit yang menyiksa kaum beriman, sekaligus menegaskan bahwa Al-Qur'an terjaga di Lauh Mahfuzh." },
      { id: 'C', text: 'Q.S. Al-Ghasyiyah menjelaskan bahwa pada hari kiamat seluruh manusia tanpa terkecuali akan memiliki wajah yang berseri-seri dan merasa puas atas usahanya.' },
      { id: 'D', text: 'Q.S. Al-Fajr mengajarkan bahwa memuliakan anak yatim dan saling mengajak memberi makan orang miskin bukanlah kewajiban yang diperhitungkan di akhirat.' }
    ],
    correctAnswers: ['A', 'B']
  }
];
