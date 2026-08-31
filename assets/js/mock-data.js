const STATUS_SKRINING = {
  NORMAL: 'normal',
  PEMANTAUAN: 'pemantauan',
  PRIORITAS: 'prioritas'
};

const PERAN_PENGGUNA = {
  KADER: 'kader',
  BIDAN: 'bidan',
  ADMIN: 'admin'
};

const MOCK_USERS = [
  {
    id: 'usr_kader_1',
    username: 'kader',
    password: '123',
    nama: 'Sari Rahmawati',
    sapaan: 'Bu Sari',
    peran: 'kader',
    dusun: 'Sukamaju',
    telepon: '0812-3456-7890'
  },
  {
    id: 'usr_kader_2',
    username: 'kader_melati',
    password: '123',
    nama: 'Rini Astuti',
    sapaan: 'Bu Rini',
    peran: 'kader',
    dusun: 'Melati',
    telepon: '0813-9876-5432'
  },
  {
    id: 'usr_bidan_1',
    username: 'bidan',
    password: '123',
    nama: 'Bidan Siti Nurhaliza, S.Tr.Keb',
    sapaan: 'Bidan Siti',
    peran: 'bidan',
    dusun: 'Semua Dusun (Desa Sukatani)',
    telepon: '0811-2233-4455'
  },
  {
    id: 'usr_admin_1',
    username: 'admin',
    password: '123',
    nama: 'Administrator Desa Sukatani',
    sapaan: 'Pak Admin',
    peran: 'admin',
    dusun: 'Pemerintah Desa',
    telepon: '0819-0011-2233'
  }
];

const MOCK_DUSUN = [
  'Sukamaju',
  'Melati',
  'Harapan',
  'Karangrejo'
];

const MOCK_BALITA = [
  {
    id: 'blt_01',
    nik: '3515085408240001',
    nama: 'Dinda Aulia',
    tanggalLahir: '2024-05-18',
    jenisKelamin: 'P',
    namaOrangTua: 'Siti Aminah',
    namaAyah: 'Herman Susanto',
    dusun: 'Melati',
    alamat: 'RT 02 / RW 01 Dusun Melati',
    aktif: true,
    statusTerakhir: 'pemantauan',
    beratTerakhir: 10.8,
    tinggiTerakhir: 83.1,
    perubahanBb: '+0.2',
    tanggalUkurTerakhir: '2026-07-18',
    sudahDiukurBulanIni: false,
    catatan: 'Nafsu makan agak berkurang sejak 2 minggu lalu.'
  },
  {
    id: 'blt_02',
    nik: '3515081209240002',
    nama: 'Raka Pratama',
    tanggalLahir: '2024-09-12',
    jenisKelamin: 'L',
    namaOrangTua: 'Ahmad Fauzi',
    namaAyah: 'Ahmad Fauzi',
    dusun: 'Sukamaju',
    alamat: 'RT 01 / RW 02 Dusun Sukamaju',
    aktif: true,
    statusTerakhir: 'pemantauan',
    beratTerakhir: 9.8,
    tinggiTerakhir: 80.5,
    perubahanBb: '-0.1',
    tanggalUkurTerakhir: '2026-07-20',
    sudahDiukurBulanIni: false,
    catatan: 'Pertumbuhan perlu ditinjau kembali.'
  },
  {
    id: 'blt_03',
    nik: '3515086006250003',
    nama: 'Nabila Putri',
    tanggalLahir: '2025-06-20',
    jenisKelamin: 'P',
    namaOrangTua: 'Dewi Lestari',
    namaAyah: 'Budi Santoso',
    dusun: 'Sukamaju',
    alamat: 'RT 03 / RW 02 Dusun Sukamaju',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 9.4,
    tinggiTerakhir: 77.2,
    perubahanBb: '+0.4',
    tanggalUkurTerakhir: '2026-08-14',
    sudahDiukurBulanIni: true,
    catatan: 'Aktif dan ceria, ASI eksklusif dilanjutkan MPASI.'
  },
  {
    id: 'blt_04',
    nik: '3515081008230004',
    nama: 'Arga Ramadhan',
    tanggalLahir: '2023-08-10',
    jenisKelamin: 'L',
    namaOrangTua: 'Hendra Setiawan',
    namaAyah: 'Hendra Setiawan',
    dusun: 'Harapan',
    alamat: 'RT 01 / RW 01 Dusun Harapan',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 14.2,
    tinggiTerakhir: 95.0,
    perubahanBb: '+0.3',
    tanggalUkurTerakhir: '2026-08-12',
    sudahDiukurBulanIni: true,
    catatan: 'Tumbuh kembang motorik baik.'
  },
  {
    id: 'blt_05',
    nik: '3515082502250005',
    nama: 'Farel Aditya',
    tanggalLahir: '2025-02-25',
    jenisKelamin: 'L',
    namaOrangTua: 'Sri Rahayu',
    namaAyah: 'Agus Salim',
    dusun: 'Melati',
    alamat: 'RT 04 / RW 01 Dusun Melati',
    aktif: true,
    statusTerakhir: 'prioritas',
    beratTerakhir: 8.6,
    tinggiTerakhir: 75.4,
    perubahanBb: '-0.3',
    tanggalUkurTerakhir: '2026-08-10',
    sudahDiukurBulanIni: true,
    catatan: 'Kenaikan berat badan tidak adekuat dalam 2 bulan berturut-turut.'
  },
  {
    id: 'blt_06',
    nik: '3515084812250006',
    nama: 'Alya Safitri',
    tanggalLahir: '2025-12-08',
    jenisKelamin: 'P',
    namaOrangTua: 'Maya Indah',
    namaAyah: 'Rizal Fahmi',
    dusun: 'Karangrejo',
    alamat: 'RT 02 / RW 03 Dusun Karangrejo',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 7.9,
    tinggiTerakhir: 69.5,
    perubahanBb: '+0.5',
    tanggalUkurTerakhir: '2026-08-15',
    sudahDiukurBulanIni: true,
    catatan: 'Imunisasi dasar lengkap sesuai jadwal.'
  },
  {
    id: 'blt_07',
    nik: '3515081502240007',
    nama: 'Rizky Mahendra',
    tanggalLahir: '2024-02-15',
    jenisKelamin: 'L',
    namaOrangTua: 'Bambang Irawan',
    namaAyah: 'Bambang Irawan',
    dusun: 'Sukamaju',
    alamat: 'RT 02 / RW 02 Dusun Sukamaju',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 13.1,
    tinggiTerakhir: 90.8,
    perubahanBb: '+0.2',
    tanggalUkurTerakhir: '2026-08-11',
    sudahDiukurBulanIni: true,
    catatan: 'Sudah bisa berbicara kalimat sederhana.'
  },
  {
    id: 'blt_08',
    nik: '3515086508250008',
    nama: 'Zahra Khairunnisa',
    tanggalLahir: '2025-08-25',
    jenisKelamin: 'P',
    namaOrangTua: 'Rahmat Hidayat',
    namaAyah: 'Rahmat Hidayat',
    dusun: 'Harapan',
    alamat: 'RT 03 / RW 01 Dusun Harapan',
    aktif: true,
    statusTerakhir: 'pemantauan',
    beratTerakhir: 8.0,
    tinggiTerakhir: 72.0,
    perubahanBb: '0.0',
    tanggalUkurTerakhir: '2026-08-08',
    sudahDiukurBulanIni: true,
    catatan: 'Berat badan stagnan 1 bulan.'
  },
  {
    id: 'blt_09',
    nik: '3515080512240009',
    nama: 'Muhammad Alif',
    tanggalLahir: '2024-12-05',
    jenisKelamin: 'L',
    namaOrangTua: 'Nurul Huda',
    namaAyah: 'Arif Wibowo',
    dusun: 'Karangrejo',
    alamat: 'RT 01 / RW 03 Dusun Karangrejo',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 11.2,
    tinggiTerakhir: 84.6,
    perubahanBb: '+0.3',
    tanggalUkurTerakhir: '2026-08-09',
    sudahDiukurBulanIni: true,
    catatan: 'Pertumbuhan normal sesuai kurva KMS.'
  },
  {
    id: 'blt_10',
    nik: '3515084202230010',
    nama: 'Cantika Dewi',
    tanggalLahir: '2023-02-14',
    jenisKelamin: 'P',
    namaOrangTua: 'Anita Sulistyo',
    namaAyah: 'Dwi Prasetyo',
    dusun: 'Melati',
    alamat: 'RT 01 / RW 01 Dusun Melati',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 15.6,
    tinggiTerakhir: 98.2,
    perubahanBb: '+0.3',
    tanggalUkurTerakhir: '2026-08-05',
    sudahDiukurBulanIni: true,
    catatan: 'Pemberian vitamin A telah dilakukan.'
  },
  {
    id: 'blt_11',
    nik: '3515081802260011',
    nama: 'Bilal Pratama',
    tanggalLahir: '2026-02-18',
    jenisKelamin: 'L',
    namaOrangTua: 'Eko Wahyudi',
    namaAyah: 'Eko Wahyudi',
    dusun: 'Sukamaju',
    alamat: 'RT 04 / RW 02 Dusun Sukamaju',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 7.6,
    tinggiTerakhir: 66.8,
    perubahanBb: '+0.6',
    tanggalUkurTerakhir: '2026-08-16',
    sudahDiukurBulanIni: true,
    catatan: 'Mulai MPASI tunggal bertahap.'
  },
  {
    id: 'blt_12',
    nik: '3515085004250012',
    nama: 'Kayla Anindita',
    tanggalLahir: '2025-04-10',
    jenisKelamin: 'P',
    namaOrangTua: 'Wati Marlina',
    namaAyah: 'Slamet Riyadi',
    dusun: 'Sukamaju',
    alamat: 'RT 02 / RW 02 Dusun Sukamaju',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 9.9,
    tinggiTerakhir: 78.4,
    perubahanBb: '+0.2',
    tanggalUkurTerakhir: '2026-07-22',
    sudahDiukurBulanIni: false,
    catatan: 'Keluarga sedang ke luar kota saat posyandu Juli.'
  },
  {
    id: 'blt_13',
    nik: '3515082007240013',
    nama: 'Yusuf Maulana',
    tanggalLahir: '2024-07-20',
    jenisKelamin: 'L',
    namaOrangTua: 'Farhan Azis',
    namaAyah: 'Farhan Azis',
    dusun: 'Harapan',
    alamat: 'RT 02 / RW 01 Dusun Harapan',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 11.9,
    tinggiTerakhir: 86.2,
    perubahanBb: '+0.3',
    tanggalUkurTerakhir: '2026-07-15',
    sudahDiukurBulanIni: false,
    catatan: 'Kunjungan rumah direncanakan bila tidak hadir.'
  },
  {
    id: 'blt_14',
    nik: '3515081010250014',
    nama: 'Gibran Rayyan',
    tanggalLahir: '2025-10-10',
    jenisKelamin: 'L',
    namaOrangTua: 'Lisa Permata',
    namaAyah: 'Deni Setiawan',
    dusun: 'Melati',
    alamat: 'RT 03 / RW 01 Dusun Melati',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 8.8,
    tinggiTerakhir: 72.8,
    perubahanBb: '+0.4',
    tanggalUkurTerakhir: '2026-07-18',
    sudahDiukurBulanIni: false,
    catatan: 'Perlu jadwal timbang ulang.'
  },
  {
    id: 'blt_15',
    nik: '3515086212230015',
    nama: 'Aqila Putri',
    tanggalLahir: '2023-12-22',
    jenisKelamin: 'P',
    namaOrangTua: 'Tri Wahyuni',
    namaAyah: 'Sigit Purnomo',
    dusun: 'Sukamaju',
    alamat: 'RT 01 / RW 02 Dusun Sukamaju',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 12.8,
    tinggiTerakhir: 91.0,
    perubahanBb: '+0.2',
    tanggalUkurTerakhir: '2026-07-20',
    sudahDiukurBulanIni: false,
    catatan: 'Kondisi kesehatan stabil.'
  },
  {
    id: 'blt_16',
    nik: '3515080808220016',
    nama: 'Daniswara',
    tanggalLahir: '2022-08-08',
    jenisKelamin: 'L',
    namaOrangTua: 'Rudi Hartono',
    namaAyah: 'Rudi Hartono',
    dusun: 'Karangrejo',
    alamat: 'RT 03 / RW 03 Dusun Karangrejo',
    aktif: true,
    statusTerakhir: 'normal',
    beratTerakhir: 16.2,
    tinggiTerakhir: 102.5,
    perubahanBb: '+0.3',
    tanggalUkurTerakhir: '2026-07-19',
    sudahDiukurBulanIni: false,
    catatan: 'Sudah masuk PAUD desa.'
  }
];

const MOCK_PENGUKURAN = [
  {
    id: 'ukur_01_1',
    balitaId: 'blt_01',
    namaBalita: 'Dinda Aulia',
    tanggal: '2026-02-18',
    usiaBulan: 21,
    beratBadan: 9.9,
    tinggiBadan: 78.5,
    status: 'normal',
    dicatatOleh: 'Bu Sari',
    catatan: 'Pertumbuhan sesuai.'
  },
  {
    id: 'ukur_01_2',
    balitaId: 'blt_01',
    namaBalita: 'Dinda Aulia',
    tanggal: '2026-03-18',
    usiaBulan: 22,
    beratBadan: 10.2,
    tinggiBadan: 79.6,
    status: 'normal',
    dicatatOleh: 'Bu Sari',
    catatan: 'Kenaikan baik.'
  },
  {
    id: 'ukur_01_3',
    balitaId: 'blt_01',
    namaBalita: 'Dinda Aulia',
    tanggal: '2026-04-18',
    usiaBulan: 23,
    beratBadan: 10.4,
    tinggiBadan: 80.8,
    status: 'normal',
    dicatatOleh: 'Bu Sari',
    catatan: 'Kondisi anak aktif.'
  },
  {
    id: 'ukur_01_4',
    balitaId: 'blt_01',
    namaBalita: 'Dinda Aulia',
    tanggal: '2026-05-18',
    usiaBulan: 24,
    beratBadan: 10.6,
    tinggiBadan: 81.8,
    status: 'normal',
    dicatatOleh: 'Bu Rini',
    catatan: 'Evaluasi 2 tahun.'
  },
  {
    id: 'ukur_01_5',
    balitaId: 'blt_01',
    namaBalita: 'Dinda Aulia',
    tanggal: '2026-06-18',
    usiaBulan: 25,
    beratBadan: 10.6,
    tinggiBadan: 82.3,
    status: 'normal',
    dicatatOleh: 'Bu Sari',
    catatan: 'Berat badan tetap.'
  },
  {
    id: 'ukur_01_6',
    balitaId: 'blt_01',
    namaBalita: 'Dinda Aulia',
    tanggal: '2026-07-18',
    usiaBulan: 26,
    beratBadan: 10.6,
    tinggiBadan: 82.9,
    status: 'pemantauan',
    dicatatOleh: 'Bu Sari',
    catatan: 'Nafsu makan agak turun.'
  },
  {
    id: 'ukur_05_1',
    balitaId: 'blt_05',
    namaBalita: 'Farel Aditya',
    tanggal: '2026-05-10',
    usiaBulan: 15,
    beratBadan: 9.1,
    tinggiBadan: 74.0,
    status: 'normal',
    dicatatOleh: 'Bu Rini',
    catatan: 'Normal.'
  },
  {
    id: 'ukur_05_2',
    balitaId: 'blt_05',
    namaBalita: 'Farel Aditya',
    tanggal: '2026-06-10',
    usiaBulan: 16,
    beratBadan: 8.9,
    tinggiBadan: 74.6,
    status: 'pemantauan',
    dicatatOleh: 'Bu Rini',
    catatan: 'Ada riwayat demam dan batuk.'
  },
  {
    id: 'ukur_05_3',
    balitaId: 'blt_05',
    namaBalita: 'Farel Aditya',
    tanggal: '2026-07-10',
    usiaBulan: 17,
    beratBadan: 8.9,
    tinggiBadan: 75.0,
    status: 'pemantauan',
    dicatatOleh: 'Bu Rini',
    catatan: 'Berat badan tidak naik 2 bulan.'
  },
  {
    id: 'ukur_05_4',
    balitaId: 'blt_05',
    namaBalita: 'Farel Aditya',
    tanggal: '2026-08-10',
    usiaBulan: 18,
    beratBadan: 8.6,
    tinggiBadan: 75.4,
    status: 'prioritas',
    dicatatOleh: 'Bu Rini',
    catatan: 'Penurunan berat badan. Perlu konsultasi Bidan.'
  },
  {
    id: 'ukur_03_1',
    balitaId: 'blt_03',
    namaBalita: 'Nabila Putri',
    tanggal: '2026-06-14',
    usiaBulan: 12,
    beratBadan: 8.6,
    tinggiBadan: 74.8,
    status: 'normal',
    dicatatOleh: 'Bu Sari',
    catatan: '1 tahun, motorik jalan lancar.'
  },
  {
    id: 'ukur_03_2',
    balitaId: 'blt_03',
    namaBalita: 'Nabila Putri',
    tanggal: '2026-07-14',
    usiaBulan: 13,
    beratBadan: 9.0,
    tinggiBadan: 76.0,
    status: 'normal',
    dicatatOleh: 'Bu Sari',
    catatan: 'Pertumbuhan sangat baik.'
  },
  {
    id: 'ukur_03_3',
    balitaId: 'blt_03',
    namaBalita: 'Nabila Putri',
    tanggal: '2026-08-14',
    usiaBulan: 14,
    beratBadan: 9.4,
    tinggiBadan: 77.2,
    status: 'normal',
    dicatatOleh: 'Bu Sari',
    catatan: 'Kenaikan adekuat.'
  }
];

const MOCK_AKTIVITAS = [
  {
    waktu: '09:12',
    tanggal: 'Hari ini',
    teks: 'Bu Sari mencatat pengukuran Dinda Aulia di Dusun Melati.'
  },
  {
    waktu: '08:43',
    tanggal: 'Hari ini',
    teks: 'Bu Rini memperbarui data Raka Pratama.'
  },
  {
    waktu: '11:20',
    tanggal: 'Kemarin',
    teks: 'Pengukuran Nabila Putri dikoreksi oleh Bu Sari.'
  },
  {
    waktu: '10:05',
    tanggal: 'Kemarin',
    teks: 'Bidan Siti meninjau riwayat tumbuh kembang Farel Aditya.'
  },
  {
    waktu: '14:30',
    tanggal: '2 hari lalu',
    teks: 'Data balita baru atas nama Bilal Pratama ditambahkan.'
  }
];

const MOCK_BERITA = [
  {
    id: 'news_01',
    kategori: 'KABAR DESA',
    judul: 'Jadwal Penimbangan Serentak & Pembagian Vitamin A Bulan Depan',
    ringkasan: 'Pemerintah Desa Sukatani bersama Bidan Desa dan Kader mengumumkan jadwal posyandu serentak di 4 dusun pada pekan kedua September.',
    gambar: 'assets/images/berita_vitamin_a.jpg',
    waktuBaca: '3 menit baca',
    tanggal: '28 Agustus 2026',
    penulis: 'Bidan Siti Nurhaliza, S.Tr.Keb',
    isi: `
      <p>Kegiatan penimbangan bulanan Posyandu di Desa Sukatani akan dilaksanakan serentak mulai tanggal 7 hingga 12 September 2026 di seluruh posyandu dusun binaan.</p>
      <p>Selain penimbangan berat badan dan pengukuran tinggi/panjang badan secara digital melalui Posyandu Pintar, kader juga mendistribusikan kapsul Vitamin A untuk balita usia 6-59 bulan serta obat cacing berkala.</p>
      <h5>Jadwal Pelaksanaan di Tiap Dusun:</h5>
      <ul>
        <li><strong>Dusun Sukamaju:</strong> Senin, 7 September 2026 (08.00 - 11.30 WIB) di Balai RW 02.</li>
        <li><strong>Dusun Melati:</strong> Selasa, 8 September 2026 (08.00 - 11.30 WIB) di Pos Sehat Melati.</li>
        <li><strong>Dusun Harapan:</strong> Kamis, 10 September 2026 (08.00 - 11.30 WIB) di Balai Dusun Harapan.</li>
        <li><strong>Dusun Karangrejo:</strong> Sabtu, 12 September 2026 (08.00 - 11.30 WIB) di Posyandu Karangrejo.</li>
      </ul>
      <p>Ibu balita diharapkan membawa Buku KIA/KMS dan memastikan anak dalam keadaan sehat. Bagi balita yang berhalangan hadir pada hari pelaksanaan, kader akan menjadwalkan kunjungan rumah (*sweeping*) agar tidak ada balita yang terlewatkan dalam pencatatan pertumbuhan.</p>
    `
  },
  {
    id: 'news_02',
    kategori: 'GIZI & KESEHATAN',
    judul: 'Program PMT Pangan Lokal: Manfaat Telur & Ikan untuk Balita Gizi Kurang',
    ringkasan: 'Pemberian Makanan Tambahan (PMT) berbasis pangan lokal kaya protein hewani efektif mendorong kenaikan berat badan balita secara signifikan.',
    gambar: 'assets/images/berita_pmt_gizi.jpg',
    waktuBaca: '4 menit baca',
    tanggal: '25 Agustus 2026',
    penulis: 'Tim Gizi Puskesmas Desa Sukatani',
    isi: `
      <p>Kementerian Kesehatan menekankan bahwa intervensi gizi berbasis pangan lokal kaya protein hewani jauh lebih efektif dan mudah diterima balita dibandingkan makanan kemasan olahan pabrik.</p>
      <p>Protein hewani mengandung asam amino esensial lengkap yang dibutuhkan untuk sintesis hormon pertumbuhan dan pembentukan massa otot balita pada masa emas 1.000 Hari Pertama Kehidupan (HPK).</p>
      <h5>Hasil Evaluasi PMT di Desa Sukatani:</h5>
      <p>Sebanyak 12 balita dengan status berat badan kurang yang menerima PMT telur rebus dan olahan ikan lele lokal selama 4 minggu menunjukkan kenaikan rata-rata berat badan sebesar 350-500 gram per bulan.</p>
      <p>Kader posyandu terus mendampingi para ibu dalam mengolah menu MPASI bergizi seimbang dari bahan pangan lokal yang murah dan mudah diperoleh di pekarangan desa.</p>
    `
  },
  {
    id: 'news_03',
    kategori: 'KEGIATAN POSYANDU',
    judul: 'Kunjungan Bidan Desa & Evaluasi Tumbuh Kembang Balita di Dusun Melati',
    ringkasan: 'Bidan Siti melakukan kunjungan lapangan langsung untuk meninjau balita yang memerlukan pemantauan ketat dan memberikan konseling gizi keluarga.',
    gambar: 'assets/images/berita_kunjungan_bidan.jpg',
    waktuBaca: '3 menit baca',
    tanggal: '20 Agustus 2026',
    penulis: 'Bu Sari (Kader Posyandu)',
    isi: `
      <p>Pada hari Kamis lalu, Bidan Desa Siti Nurhaliza bersama kader Posyandu Dusun Melati melaksanakan kunjungan rumah langsung untuk memeriksa 3 balita yang terdeteksi mengalami tren kenaikan berat badan tidak adekuat dalam penimbangan terakhir.</p>
      <p>Kunjungan ini bertujuan untuk mengidentifikasi faktor penyebab perlambatan pertumbuhan, seperti riwayat batuk/demam berulang, higienitas air bersih, serta asupan porsi makanan pendamping ASI.</p>
      <h5>Hasil Konseling Keluarga:</h5>
      <p>Orang tua balita menyambut baik evaluasi tatap muka ini dan mendapatkan panduan porsi makan tinggi kalori serta jadwal kontrol penimbangan ulang di posyandu berikutnya.</p>
    `
  },
  {
    id: 'art_01',
    kategori: 'PANDUAN POSYANDU',
    judul: 'Kenapa pengukuran balita perlu dilakukan setiap bulan?',
    ringkasan: 'Penimbangan rutin setiap bulan adalah kunci utama mendeteksi perlambatan pertumbuhan sebelum anak mengalami risiko gizi kurang atau stunting.',
    gambar: 'assets/images/hero_timbang.jpg',
    waktuBaca: '5 menit baca',
    tanggal: '24 Agustus 2026',
    penulis: 'Bidan Siti Nurhaliza, S.Tr.Keb',
    isi: `
      <p>Pertumbuhan balita pada 1.000 Hari Pertama Kehidupan (HPK) berlangsung sangat pesat. Perubahan berat dan tinggi badan yang tidak naik atau bahkan turun dalam 1-2 bulan berturut-turut merupakan tanda awal adanya gangguan gizi atau infeksi.</p>
      <h5>1. Deteksi Dini Sebelum Kondisi Memburuk</h5>
      <p>Dengan menimbang secara teratur setiap bulan di Posyandu, garis pertumbuhan pada kurva KMS dapat segera terbaca. Jika garis pertumbuhan mendatar atau menurun, kader dan bidan desa dapat langsung memberikan intervensi tanpa menunggu anak tampak kurus.</p>
      <h5>2. Memastikan Pemberian Makanan Pendamping Sesuai Usia</h5>
      <p>Kader dapat mengevaluasi apakah tekstur, porsi, dan frekuensi MPASI sudah mencukupi kebutuhan kalori balita sesuai tahapan usianya.</p>
      <h5>3. Pemantauan Pemberian Vitamin & Imunisasi</h5>
      <p>Selain penimbangan, Posyandu menjadi sarana pemberian Vitamin A setiap Februari dan Agustus, serta imunisasi dasar lengkap.</p>
    `
  },
  {
    id: 'art_02',
    kategori: 'GIZI BALITA',
    judul: 'Protein hewani dan perannya dalam masa pertumbuhan',
    ringkasan: 'Sumber protein hewani seperti telur, ikan, hati ayam, dan daging mengandung asam amino esensial lengkap untuk mendukung pembentukan sel dan tinggi badan optimal.',
    gambar: 'assets/images/berita_pmt_gizi.jpg',
    waktuBaca: '4 menit baca',
    tanggal: '19 Agustus 2026',
    penulis: 'Tim Gizi Posyandu',
    isi: `
      <p>Kementerian Kesehatan menekankan pentingnya satu butir telur atau sumber protein hewani setiap hari untuk mencegah stunting pada balita.</p>
      <h5>Keunggulan Protein Hewani:</h5>
      <ul>
        <li><strong>Asam Amino Lengkap:</strong> Mudah diserap oleh sistem pencernaan balita dibandingkan protein nabati.</li>
        <li><strong>Kaya Zat Besi & Zink:</strong> Mencegah anemia yang dapat mengganggu konsentrasi dan pertumbuhan motorik anak.</li>
        <li><strong>Mudah Didapat di Desa:</strong> Telur ayam, ikan air tawar (lele, mujair), dan hati ayam memiliki harga terjangkau dengan kandungan nutrisi sangat tinggi.</li>
      </ul>
    `
  },
  {
    id: 'art_03',
    kategori: 'TIPS KADER',
    judul: 'Apa yang perlu disiapkan saat kunjungan Posyandu?',
    ringkasan: 'Panduan persiapan sederhana bagi orang tua dan kader sebelum menuju meja pendaftaran dan penimbangan di posyandu desa.',
    gambar: 'assets/images/berita_vitamin_a.jpg',
    waktuBaca: '3 menit baca',
    tanggal: '12 Agustus 2026',
    penulis: 'Kader Posyandu Sukamaju',
    isi: `
      <p>Agar proses pelayanan Posyandu berjalan lancar dan nyaman bagi balita, orang tua disarankan mempersiapkan beberapa hal berikut:</p>
      <ol>
        <li><strong>Buku KIA / KMS:</strong> Pastikan buku catatan kesehatan anak selalu dibawa.</li>
        <li><strong>Pakaian yang Nyaman:</strong> Kenakan pakaian yang mudah dilepas saat penimbangan agar angka timbangan akurat tanpa beban pakaian tebal.</li>
        <li><strong>Catatan Keluhan / Pola Makan:</strong> Sampaikan jika anak baru sembuh dari demam, batuk, atau mengalami penurunan nafsu makan dalam beberapa minggu terakhir.</li>
      </ol>
    `
  }
];

const MOCK_JADWAL_POSYANDU = [
  {
    id: 'jdw_01',
    hari: 12,
    bulan: 'SEP',
    tanggalLengkap: '12 September 2026',
    judul: 'Posyandu Balita — Dusun Sukamaju',
    lokasi: 'Balai RW 02, Dusun Sukamaju',
    jam: '08.00 – 11.00 WIB',
    layanan: ['Penimbangan', 'Pengukuran Tinggi', 'Konsultasi Bidan']
  },
  {
    id: 'jdw_02',
    hari: 13,
    bulan: 'SEP',
    tanggalLengkap: '13 September 2026',
    judul: 'Posyandu Balita — Dusun Melati',
    lokasi: 'Pos Sehat Melati',
    jam: '08.00 – 11.00 WIB',
    layanan: ['Penimbangan', 'Pengukuran Tinggi', 'Vitamin A']
  },
  {
    id: 'jdw_03',
    hari: 10,
    bulan: 'OKT',
    tanggalLengkap: '10 Oktober 2026',
    judul: 'Posyandu Balita — Dusun Harapan',
    lokasi: 'Balai Dusun Harapan',
    jam: '08.00 – 11.30 WIB',
    layanan: ['Penimbangan', 'Pengukuran Tinggi', 'Konsultasi Bidan']
  }
];

Storage.inisialisasi({
  users: MOCK_USERS,
  dusun: MOCK_DUSUN,
  balita: MOCK_BALITA,
  pengukuran: MOCK_PENGUKURAN,
  aktivitas: MOCK_AKTIVITAS,
  berita: MOCK_BERITA,
  jadwal: MOCK_JADWAL_POSYANDU,
  currentUser: MOCK_USERS[0]
});

window.STATUS_SKRINING = STATUS_SKRINING;
window.PERAN_PENGGUNA = PERAN_PENGGUNA;
window.MOCK_USERS = MOCK_USERS;
window.MOCK_BALITA = MOCK_BALITA;
window.MOCK_PENGUKURAN = MOCK_PENGUKURAN;
window.MOCK_AKTIVITAS = MOCK_AKTIVITAS;
window.MOCK_BERITA = MOCK_BERITA;
window.MOCK_JADWAL_POSYANDU = MOCK_JADWAL_POSYANDU;
