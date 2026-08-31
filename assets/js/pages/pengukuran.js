
let semuaBalitaState = [];
let balitaDipilih = null;
let riwayatBalitaDipilih = [];

document.addEventListener('DOMContentLoaded', async () => {
  const user = AuthService.cekAkses(['kader', 'bidan']);
  if (!user) return;

  const inputTgl = document.getElementById('inputTanggal');
  if (inputTgl) {
    inputTgl.value = new Date().toISOString().split('T')[0];
    inputTgl.max = new Date().toISOString().split('T')[0];
  }

  await inisialisasiDropdownBalita();

  setupFormListeners();

  const urlParams = new URLSearchParams(window.location.search);
  const preselectedId = urlParams.get('id');
  if (preselectedId) {
    const select = document.getElementById('selectBalita');
    if (select) {
      select.value = preselectedId;
      onBalitaChange(preselectedId);
    }
  }
});

async function inisialisasiDropdownBalita() {
  const select = document.getElementById('selectBalita');
  if (!select) return;

  semuaBalitaState = await BalitaService.ambilSemua();

  let optionsHtml = '<option value="">-- Pilih Balita --</option>';
  semuaBalitaState.forEach(b => {
    const statusBulanIni = b.sudahDiukurBulanIni ? ' (Sudah ditimbang)' : ' (Belum ditimbang)';
    optionsHtml += `<option value="${b.id}">${b.nama} — Dusun ${b.dusun} ${statusBulanIni}</option>`;
  });

  select.innerHTML = optionsHtml;
}

function setupFormListeners() {
  const select = document.getElementById('selectBalita');
  const form = document.getElementById('formPengukuran');
  const btnResetSuccess = document.getElementById('btnResetFormPengukuran');

  if (select) {
    select.addEventListener('change', (e) => {
      onBalitaChange(e.target.value);
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await prosesSimpanPengukuran(false);
    });
  }

  if (btnResetSuccess) {
    btnResetSuccess.addEventListener('click', () => {
      resetFormKeAwal();
    });
  }
}

async function onBalitaChange(balitaId) {
  const previewBox = document.getElementById('balitaInfoPreview');
  if (!balitaId) {
    balitaDipilih = null;
    riwayatBalitaDipilih = [];
    if (previewBox) previewBox.style.display = 'none';
    return;
  }

  balitaDipilih = semuaBalitaState.find(b => b.id === balitaId);
  if (!balitaDipilih) return;

  riwayatBalitaDipilih = await PengukuranService.ambilRiwayat(balitaId);

  if (previewBox) {
    const umur = BalitaService.hitungUmur(balitaDipilih.tanggalLahir);
    const prev = riwayatBalitaDipilih.length > 0 ? riwayatBalitaDipilih[0] : null;

    document.getElementById('previewNama').textContent = balitaDipilih.nama;
    document.getElementById('previewUmur').textContent = umur.teks;
    document.getElementById('previewOrtuDusun').textContent = `Orang Tua: ${balitaDipilih.namaOrangTua} · Dusun ${balitaDipilih.dusun}`;

    if (prev) {
      document.getElementById('previewTerakhir').textContent = 
        `${prev.beratBadan} kg · ${prev.tinggiBadan} cm (${App.formatTanggal(prev.tanggal, true)})`;
    } else {
      document.getElementById('previewTerakhir').textContent = 'Belum pernah diukur';
    }

    previewBox.style.display = 'block';
  }
}

async function prosesSimpanPengukuran(abaikanAnomali = false) {
  const balitaId = document.getElementById('selectBalita').value;
  const tanggal = document.getElementById('inputTanggal').value;
  const berat = parseFloat(document.getElementById('inputBerat').value);
  const tinggi = parseFloat(document.getElementById('inputTinggi').value);
  const catatan = document.getElementById('inputCatatan').value.trim();

  if (!balitaId || !tanggal || isNaN(berat) || isNaN(tinggi)) {
    Toast.gagal('Silakan lengkapi pilihan balita, tanggal, berat, dan tinggi badan.');
    return;
  }

  if (!abaikanAnomali) {
    const hasilAnomali = await PengukuranService.periksaAnomali(balitaId, berat, tinggi);
    if (hasilAnomali.adaAnomali) {
      Dialog.peringatanAnomali({
        judul: hasilAnomali.pesanJudul,
        pesan: hasilAnomali.pesanDeskripsi,
        onPerbaiki: () => {
          if (hasilAnomali.jenis === 'tinggi_turun') {
            document.getElementById('inputTinggi').focus();
          } else {
            document.getElementById('inputBerat').focus();
          }
        },
        onTetapSimpan: async () => {
          await prosesSimpanPengukuran(true);
        }
      });
      return;
    }
  }

  const payload = {
    balitaId,
    tanggal,
    beratBadan: berat,
    tinggiBadan: tinggi,
    catatan
  };

  const res = await PengukuranService.tambah(payload);

  if (res.success) {
    tampilkanSuccessPanel(res);
  } else {
    Toast.gagal(res.message || 'Gagal menyimpan pengukuran.');
  }
}

function tampilkanSuccessPanel(res) {
  const formCard = document.getElementById('cardFormPengukuran');
  const successCard = document.getElementById('cardSuccessPengukuran');

  if (formCard) formCard.style.display = 'none';
  if (successCard) {
    document.getElementById('successNamaBalita').textContent = res.balita.nama;
    document.getElementById('successAngkaPengukuran').textContent = 
      `${res.data.beratBadan} kg · ${res.data.tinggiBadan} cm`;

    const statusContainer = document.getElementById('successStatusBadge');
    if (statusContainer) {
      statusContainer.innerHTML = StatusBadge.render(res.evaluasi.status);
    }

    const recoEl = document.getElementById('successRekomendasi');
    if (recoEl) recoEl.textContent = res.evaluasi.rekomendasi;

    const linkDetail = document.getElementById('btnLihatRiwayatDetail');
    if (linkDetail) {
      linkDetail.href = `../shared/detail-balita.html?id=${res.balita.id}`;
    }

    successCard.style.display = 'block';
  }

  Toast.sukses('Pengukuran berhasil dicatat.');
}

function resetFormKeAwal() {
  const formCard = document.getElementById('cardFormPengukuran');
  const successCard = document.getElementById('cardSuccessPengukuran');
  const form = document.getElementById('formPengukuran');

  if (form) form.reset();
  document.getElementById('inputTanggal').value = new Date().toISOString().split('T')[0];
  document.getElementById('balitaInfoPreview').style.display = 'none';

  if (successCard) successCard.style.display = 'none';
  if (formCard) formCard.style.display = 'block';

  inisialisasiDropdownBalita();
}

window.resetFormKeAwal = resetFormKeAwal;
