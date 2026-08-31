# Responsive Behavior & Breakpoint Strategy — Posyandu Pintar
## FITCOM 4.0 — Intelligent Home & Community

Dokumen ini menjelaskan strategi tata letak responsif dan transformasi perilaku komponen pada berbagai ukuran layar perangkat.

---

## 1. Breakpoint Standar

| Perangkat | Rentang Resolusi | Penyesuaian Antarmuka |
| :--- | :--- | :--- |
| **Mobile Compact** | 360px – 430px | Single column, Bottom Navigation (Kader), Stacked Card List, Tombol sentuh minimal 44px. |
| **Tablet** | 768px – 991px | 2-column grid dashboard, compact sidebar (220px), tabel data ringkas. |
| **Desktop** | 992px – 1440px+ | Full sidebar (260px), data table lengkap dengan aksi multi-kolom, grafik analitik berdampingan. |

---

## 2. Transformasi Perilaku Kunci

### A. Tabel Desktop $\rightarrow$ Daftar Kartu Mobile
- **Desktop (>=768px)**: Menampilkan tabel berstruktur lengkap dengan kolom Nama, Usia, Ortu, Dusun, Pengukuran, Status, dan Aksi.
- **Mobile (<768px)**: Tabel disembunyikan (`.d-desktop-table`), digantikan oleh daftar kartu bertumpuk (`.d-mobile-list`) dengan informasi hierarki: Avatar nama, Status badge di kanan atas, orang tua, dan tombol aksi berukuran jari.

### B. Navigasi Kader
- **Desktop**: Menu navigasi vertikal di sidebar kiri yang rapi.
- **Mobile**: Sidebar otomatis tersembunyi, digantikan oleh **Bottom Navigation** tetap (*Beranda*, *Balita*, *Ukur*) yang mudah dijangkau dengan jempol saat petugas memegang ponsel di lapangan.

### C. Formulir Pengukuran
- Seluruh input angka menggunakan `inputmode="decimal"` sehingga ponsel secara otomatis membuka papan ketik numerik.
- Satuan (kg, cm) diposisikan di dalam *input-group addon* yang jelas tanpa memotong keterbacaan angka desimal.
