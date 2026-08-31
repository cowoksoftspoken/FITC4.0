# Posyandu Pintar — Frontend Redesign & Application
## FITCOM 4.0 — Intelligent Home & Community

> **Tagline**: *Tumbuh mereka berubah setiap bulan. Catatannya jangan sampai tertinggal.*

Posyandu Pintar adalah prototipe aplikasi pencatatan tumbuh kembang balita dan sistem skrining awal pertumbuhan berbasis aturan pertumbuhan anak (*growth standards*) untuk posyandu desa di Indonesia.

---

## 1. Latar Belakang & Masalah
Pencatatan tumbuh kembang anak di Posyandu desa sebagian besar masih menggunakan buku KMS fisik. Hal ini menimbulkan kendala nyata:
- Catatan fisik rentan tercecer, terselip, atau robek.
- Riwayat berat dan tinggi badan sulit dibandingkan antar bulan secara cepat.
- Bidan desa sulit menyaring balita mana yang membutuhkan perhatian khusus (*priority screening*) dari puluhan balita binaan.
- Kesalahan ketik atau anomali input pengukuran baru disadari terlambat.

**Solusi Posyandu Pintar**:
1. **Untuk Kader**: Layanan HP-first untuk melihat balita yang belum ditimbang bulan ini, pencatatan hasil timbang cepat tanpa perlu menghitung umur secara manual, dan deteksi anomali input (misal tinggi badan anak menyusut).
2. **Untuk Bidan**: Layanan tinjauan prioritas balita pertama (*Decision-First*), visualisasi kurva pertumbuhan balita, analisis sebaran status gizi antar dusun, dan rekapitulasi data terpadu desa.
3. **Info & Edukasi Read-Only**: Menyediakan panduan literasi gizi balita, pentingnya penimbangan bulanan, dan tips kunjungan posyandu bagi orang tua & kader.

---

## 2. Struktur Direktori Proyek

```
posyandu-pintar-frontend/
├── index.html                    # Redesigned Editorial Landing Page
├── login.html                    # Halaman Masuk dengan Quick-Fill Demo Chips
├── pages/
│   ├── kader/
│   │   ├── dashboard.html        # Beranda Kerja Kader (Task Prompt, Belum Ditimbang)
│   │   ├── balita.html           # Pengelolaan Data Balita (Pencarian, Filter, Modal)
│   │   └── pengukuran.html       # Formulir Catat Pengukuran & Anomaly Validation
│   ├── bidan/
│   │   ├── dashboard.html        # Dasbor Bidan (Daftar Prioritas Tampil Pertama, Grafik)
│   │   ├── prioritas.html        # Daftar Balita Prioritas Review
│   │   └── rekap.html            # Rekapitulasi Data Pengukuran & Ekspor CSV
│   ├── admin/
│   │   └── dashboard.html        # Ringkasan Sistem & Audit Kualitas Data
│   └── shared/
│       ├── detail-balita.html    # Detail Riwayat Balita & Grafik Pertumbuhan Chart.js
│       ├── profil.html           # Informasi Akun Petugas
│       └── not-found.html        # Halaman 404
├── assets/
│   ├── css/
│   │   ├── tokens.css            # Design Tokens (Warna, Spacing, Radius, Shadow)
│   │   ├── base.css              # Typography, Reset, Tombol, Form Controls
│   │   ├── layout.css            # Shell, Sidebar, Topbar, Bottom Navigation
│   │   ├── components.css        # Badge Semantik, Toast, Dialog, Empty State
│   │   ├── pages.css             # Gaya Editorial Landing, Login, & Modul
│   │   └── responsive.css        # Aturan Breakpoint responsif (360px - 1440px)
│   └── js/
│       ├── storage.js            # Abstraksi Storage dengan Namespace
│       ├── mock-data.js          # Dataset 16 Balita, 4 Dusun, & Artikel Edukasi
│       ├── app.js                # Helper Global, Format Tanggal, & Chart Defaults
│       ├── navigation.js         # Navigasi Responsif & Status Aktif Menu
│       ├── services/             # Lapisan Layanan Data (API-Ready)
│       │   ├── auth-service.js
│       │   ├── balita-service.js
│       │   ├── pengukuran-service.js
│       │   └── dashboard-service.js
│       ├── components/           # Komponen UI Terisolasi
│       │   ├── toast.js
│       │   ├── dialog.js
│       │   ├── status-badge.js
│       │   ├── empty-state.js
│       │   └── loading-state.js
│       └── pages/                # Kontroler Logika Antarmuka
│           ├── landing.js        # Alur Hero & Modal Edukasi
│           ├── login.js
│           ├── kader-dashboard.js
│           ├── balita.js
│           ├── pengukuran.js
│           ├── bidan-dashboard.js
│           ├── prioritas.js
│           ├── rekap.js
│           ├── detail-balita.js
│           └── admin-dashboard.js
├── docs/
│   ├── design-system.md          # Spesifikasi Lengkap Sistem Desain
│   ├── ui-flow.md                # Diagram Alur Pengguna & Edukasi
│   ├── mock-data.md              # Skema Data Tiruan & Artikel
│   └── responsive-behavior.md    # Panduan Perilaku Responsif
└── README.md                     # Panduan Proyek
```

---

## 3. Akun Demo Prototipe

Gunakan tombol *quick-fill chip* di halaman login atau masukkan kredensial berikut:

| Peran | Nama Pengguna | Kata Sandi | Nama Petugas & Wilayah |
| :--- | :--- | :--- | :--- |
| **Kader** | `kader` | `123` | Bu Sari (Dusun Sukamaju) |
| **Bidan** | `bidan` | `123` | Bidan Siti (Desa Sukatani) |
| **Admin** | `admin` | `123` | Admin Desa (Pemerintah Desa) |

---

## 4. Skenario Uji Coba Demo (Demo Walkthrough)

Prototipe ini telah diuji untuk skenario demo FITCOM 4.0:

1. **Buka Beranda**: Akses `index.html` $\rightarrow$ perhatikan visual alur vertikal proses skrining dan buka salah satu artikel edukasi.
2. **Masuk Kader**: Buka `login.html`, klik chip **Kader (Bu Sari)** $\rightarrow$ Masuk.
3. **Pesan Tugas Kerja**: Pada dashboard tampil prompt *"7 balita belum ditimbang bulan ini"*.
4. **Catat Pengukuran**: Pilih balita **Dinda Aulia**, klik `[ Catat ]`.
5. **Input Data**: Masukkan berat **10.8 kg** dan tinggi **83.1 cm**.
6. **Skrining Otomatis**: Sistem menyimpan data dan menampilkan *Success Feedback Panel* dengan status **Perlu Pemantauan** disertai catatan penjelasan ramah.
7. **Lihat Riwayat & Grafik**: Klik `[ Lihat Riwayat Tumbuh ]` $\rightarrow$ perhatikan grafik garis pertumbuhan BB dan riwayat penimbangan sebelumnya.
8. **Keluar Akun**: Klik ikon keluar pada panel kiri bawah.
9. **Masuk Bidan**: Buka `login.html`, klik chip **Bidan (Bidan Siti)** $\rightarrow$ Masuk.
10. **Prioritas Tampil Pertama**: Pada dashboard Bidan, **Daftar Balita Perlu Ditinjau** tampil paling atas sebelum grafik analitik, memuat nama Dinda Aulia dan Farel Aditya.
11. **Grafik Analitik**: Periksa grafik *Status per Dusun* dan *Cakupan Penimbangan 6 Bulan*.
12. **Rekapitulasi**: Buka menu *Rekap Pengukuran*, uji coba filter dusun dan tombol **Ekspor CSV**.

---

## 5. Cara Menjalankan Proyek

### Menggunakan Live Server / HTTP Server:
```bash
# Menggunakan Node npx serve
npx -y serve .

# Atau menggunakan Python 3
python -m http.server 8080
```
Buka peramban di `http://localhost:8080`.
