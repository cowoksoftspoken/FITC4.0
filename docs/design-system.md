# Design System Specification — Posyandu Pintar
## FITCOM 4.0 — Intelligent Home & Community

Dokumen ini mendefinisikan sistem desain antarmuka Posyandu Pintar, mencakup palet warna, tipografi, aturan spasial, bentuk komponen, bahasa status, dan prinsip aksesibilitas.

---

## 1. Prinsip Visual & Kepribadian
- **Warm, Calm, Healthy, Grounded, Community**: Desain mencerminkan layanan kesehatan masyarakat desa yang bersahaja, terpercaya, dan ramah pengguna.
- **Anti-AI-Slop**: Menghindari elemen visual klise seperti gradien ungu/neon berlebih, glassmorphism gelap, sudut *pill* di semua tombol, grafik 3D yang tidak fungsional, atau animasi mengambang tanpa makna.
- **Action-Oriented Hierarchy**: Tata letak mengutamakan tindakan tugas pengguna riil (*Task Prompt*) sebelum informasi sekunder.

---

## 2. Design Tokens (CSS Custom Properties)

### Palet Warna
```css
:root {
  /* Brand & Forest Shades */
  --forest-900: #183B32;
  --forest-800: #1E4A3D;

  /* Primary Greens */
  --green-700: #24745A;
  --green-600: #2E8769;
  --green-100: #E6F1EC;
  --green-50:  #F2F7F4;

  /* Canvas & Surface */
  --canvas: #F7F7F2;
  --surface: #FFFFFF;
  --surface-soft: #F1F4F0;

  /* Tinta & Teks */
  --ink-900: #1F2925;
  --ink-700: #42514A;
  --ink-500: #69766F;
  --ink-400: #889690;

  /* Garis Pembatas */
  --line: #DDE5E0;
  --line-strong: #C4D0CA;

  /* Status Semantik Tri-State */
  --success: #2F7D58;
  --success-soft: #E8F4ED;
  --success-border: #BCDCC7;

  --warning: #B7791F;
  --warning-soft: #FBF1DB;
  --warning-border: #F0DAA6;

  --danger: #B64D4D;
  --danger-soft: #F8E6E6;
  --danger-border: #ECC0C0;
}
```

---

## 3. Tipografi
- **Font Family**: `Plus Jakarta Sans`, sans-serif.
- **Skala Ukuran**:
  - Hero Display: 36px – 44px
  - H1 Page Title: 28px – 32px
  - H2 Section Title: 20px – 24px
  - H3 Component Title: 16px – 18px
  - Body Text: 14px – 15px (line-height 1.55)
  - Caption / Metadata: 12px – 13px
- **Bobot Font**: Terbatas pada 400 (Regular), 500 (Medium), 600 (Semi-Bold), dan 700 (Bold).

---

## 4. Bentuk & Sudut (Border Radius)
- **Input & Form**: `10px` (`--radius-md`)
- **Tombol**: `10px – 12px`
- **Panel & Kartu**: `12px – 16px`
- **Badge Status**: `Pill (999px)`
- **Modal / Bottom Sheet**: `16px – 18px`

---

## 5. Bahasa Status Skrining (Teks + Warna + Ikon)
Sesuai aturan aksesibilitas, status tidak boleh hanya mengandalkan warna:
1. **Normal**:
   - Ikon: `bi-check-circle-fill`
   - Warna: Hijau (`--success`)
   - Teks: `Normal`
2. **Perlu Pemantauan**:
   - Ikon: `bi-exclamation-circle-fill`
   - Warna: Kuning/Karamel (`--warning`)
   - Teks: `Perlu Pemantauan`
3. **Prioritas Bidan**:
   - Ikon: `bi-exclamation-triangle-fill`
   - Warna: Merah Bata (`--danger`)
   - Teks: `Prioritas Bidan`

---

## 6. Motion & Transisi
- Durasi transisi interaktif: **150ms – 220ms**.
- Kurva akselerasi: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Diterapkan pada: *Toast entrance*, *Modal backdrop*, *Dropdown*, *Button active state*.
