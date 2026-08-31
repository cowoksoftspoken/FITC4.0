# Mock Dataset Specification — Posyandu Pintar
## FITCOM 4.0 — Intelligent Home & Community

Dokumen ini menjelaskan struktur skema data tiruan (*mock dataset*) yang digunakan pada frontend prototype Posyandu Pintar.

---

## 1. Skema Entitas Data

### A. Pengguna (Users)
```json
{
  "id": "usr_kader_1",
  "username": "kader",
  "password": "123",
  "nama": "Sari Rahmawati",
  "sapaan": "Bu Sari",
  "peran": "kader", // "kader" | "bidan" | "admin"
  "dusun": "Sukamaju",
  "telepon": "0812-3456-7890"
}
```

### B. Balita (Children)
```json
{
  "id": "blt_01",
  "nik": "3515085408240001",
  "nama": "Dinda Aulia",
  "tanggalLahir": "2024-05-18",
  "jenisKelamin": "P", // "L" | "P"
  "namaOrangTua": "Siti Aminah",
  "namaAyah": "Herman Susanto",
  "dusun": "Melati",
  "alamat": "RT 02 / RW 01 Dusun Melati",
  "aktif": true,
  "statusTerakhir": "pemantauan", // "normal" | "pemantauan" | "prioritas"
  "beratTerakhir": 10.8,
  "tinggiTerakhir": 83.1,
  "perubahanBb": "+0.2",
  "tanggalUkurTerakhir": "2026-07-18",
  "sudahDiukurBulanIni": false,
  "catatan": "Nafsu makan agak berkurang sejak 2 minggu lalu."
}
```

### C. Pengukuran (Measurements)
```json
{
  "id": "ukur_01_1",
  "balitaId": "blt_01",
  "namaBalita": "Dinda Aulia",
  "tanggal": "2026-07-18",
  "usiaBulan": 26,
  "beratBadan": 10.6,
  "tinggiBadan": 82.9,
  "status": "pemantauan",
  "dicatatOleh": "Bu Sari",
  "catatan": "Nafsu makan agak turun."
}
```

---

## 2. Cakupan Dataset Tiruan
- **16 Balita Terdaftar** tersebar di 4 Dusun:
  - Dusun Sukamaju
  - Dusun Melati
  - Dusun Harapan
  - Dusun Karangrejo
- **Variasi Data**:
  - Sebagian balita memiliki riwayat lengkap 6 bulan (contoh: Dinda Aulia, Farel Aditya).
  - Sebagian memiliki riwayat 3-4 bulan.
  - Sebagian balita belum memiliki catatan pengukuran bulan berjalan (untuk simulasi tugas harian kader).
  - Sebaran status gizi mencakup *Normal*, *Perlu Pemantauan*, dan *Prioritas Bidan*.
