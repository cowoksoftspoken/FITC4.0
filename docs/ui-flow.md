# UI Flow & User Journeys — Posyandu Pintar
## FITCOM 4.0 — Intelligent Home & Community

Dokumen ini memetakan diagram alur antarmuka pengguna untuk Landing Page, Edukasi, serta peran Kader, Bidan, dan Admin Desa.

---

## 1. Alur Masuk & Autentikasi

```mermaid
graph TD
    Landing["Landing Page (index.html)"] -->|Eksplorasi Info & Edukasi| EdukasiModal["Modal Baca Artikel Edukatif (Read-Only)"]
    Landing -->|Klik Masuk| Login["Halaman Masuk (login.html)"]
    Login -->|Autentikasi Akun / Quick-Fill Chip| RoleCheck{"Deteksi Peran"}
    RoleCheck -->|Kader| KaderDash["Dashboard Kader (pages/kader/dashboard.html)"]
    RoleCheck -->|Bidan| BidanDash["Dashboard Bidan (pages/bidan/dashboard.html)"]
    RoleCheck -->|Admin| AdminDash["Dashboard Admin (pages/admin/dashboard.html)"]
```

---

## 2. Alur Pengguna: Kader Posyandu (HP-First)

Pertanyaan Utama: *"Hari ini siapa yang perlu saya catat?"*

```mermaid
graph TD
    KaderDash["Beranda Kader"] -->|Lihat Tugas Hari Ini| TaskBanner["7 Balita Belum Ditimbang"]
    TaskBanner -->|Klik Mulai Pengukuran / Catat Balita| FormUkur["Formulir Pengukuran (pengukuran.html)"]
    
    FormUkur -->|Pilih Balita| LivePreview["Preview Usia & Pengukuran Terakhir"]
    LivePreview -->|Input BB & TB| AnomalyCheck{"Pemeriksaan Anomali Input"}
    
    AnomalyCheck -->|TB Menurun / BB Drastis| AnomalyDialog["Modal Konfirmasi: Perbaiki / Tetap Simpan"]
    AnomalyDialog -->|Perbaiki| FormUkur
    AnomalyDialog -->|Tetap Simpan| SimpanData["Simpan Data Pengukuran"]
    
    AnomalyCheck -->|Data Normal| SimpanData
    SimpanData --> SuccessSheet["Success Feedback Panel: Status Skrining Awal"]
    
    SuccessSheet -->|Lihat Riwayat| DetailBalita["Detail Balita & Grafik (detail-balita.html)"]
    SuccessSheet -->|Catat Lain| FormUkur
    
    KaderDash -->|Menu Balita| DataBalita["Data Balita (balita.html)"]
    DataBalita -->|Tambah Balita| ModalTambah["Modal Tambah Balita"]
    DataBalita -->|Klik Balita| DetailBalita
    DataBalita -->|Nonaktifkan| DialogDeactivate["Modal Nonaktifkan Data"]
```

---

## 3. Alur Pengguna: Bidan Desa (Decision-First)

Pertanyaan Utama: *"Anak mana yang perlu saya tinjau lebih dulu?"*

```mermaid
graph TD
    BidanDash["Dashboard Bidan"] --> PrioritasSection["Daftar Prioritas Review (Tampil Pertama)"]
    PrioritasSection -->|Klik Tinjau Riwayat| DetailBalita["Detail Balita (detail-balita.html)"]
    DetailBalita --> GrowthChart["Grafik Pertumbuhan BB/TB & Riwayat Lengkap"]
    
    BidanDash --> AnalyticsSection["Grafik Sebaran Status Dusun & Cakupan 6 Bulan"]
    
    BidanDash -->|Menu Balita Prioritas| HalamanPrioritas["Halaman Balita Prioritas (prioritas.html)"]
    HalamanPrioritas -->|Filter Dusun / Status| FilteredList["Daftar Terurut Berdasarkan Urgensi"]
    FilteredList --> DetailBalita
    
    BidanDash -->|Menu Rekap| HalamanRekap["Rekap Pengukuran (rekap.html)"]
    HalamanRekap -->|Filter Multi-Parameter| FilteredRekap["Tabel Log Pengukuran"]
    FilteredRekap -->|Klik Ekspor| DownloadCSV["File CSV Rekapitulasi"]
```

---

## 4. Alur Pengguna: Admin Posyandu Desa

```mermaid
graph TD
    AdminDash["Dashboard Admin (dashboard.html)"] --> Metrics["Ringkasan 4 Petugas, 16 Balita, 4 Dusun"]
    AdminDash --> DataAudit["Audit Kualitas Data (Deteksi NIK Kosong / Belum Diukur)"]
    AdminDash --> ActivityLog["Log Riwayat Aktivitas Seluruh Petugas"]
```
