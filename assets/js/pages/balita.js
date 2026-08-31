
let daftarBalitaState = [];
let modeEditId = null;

document.addEventListener('DOMContentLoaded', async () => {
  const user = AuthService.cekAkses(['kader', 'bidan', 'admin']);
  if (!user) return;

  setupEventListeners();

  await muatDataBalita();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('tambah') === '1') {
    bukaModalTambah();
  }
});

function setupEventListeners() {
  const searchInput = document.getElementById('searchBalita');
  const filterStatus = document.getElementById('filterStatus');
  const filterDusun = document.getElementById('filterDusun');
  const btnTambah = document.getElementById('btnBukaModalTambah');
  const formBalita = document.getElementById('formBalita');

  if (searchInput) {
    searchInput.addEventListener('input', () => filterDanRender());
  }

  if (filterStatus) {
    filterStatus.addEventListener('change', () => filterDanRender());
  }

  if (filterDusun) {
    filterDusun.addEventListener('change', () => filterDanRender());
  }

  if (btnTambah) {
    btnTambah.addEventListener('click', () => bukaModalTambah());
  }

  if (formBalita) {
    formBalita.addEventListener('submit', async (e) => {
      e.preventDefault();
      await simpanFormBalita();
    });
  }
}

async function muatDataBalita() {
  try {
    daftarBalitaState = await BalitaService.ambilSemua();
    filterDanRender();
  } catch (e) {
    console.error('Gagal mengambil data balita:', e);
    Toast.gagal('Gagal memuat data balita. Silakan segarkan halaman.');
  }
}

function filterDanRender() {
  const q = document.getElementById('searchBalita')?.value.trim().toLowerCase() || '';
  const status = document.getElementById('filterStatus')?.value || 'semua';
  const dusun = document.getElementById('filterDusun')?.value || 'semua';

  let hasil = [...daftarBalitaState];

  if (q) {
    hasil = hasil.filter(b => 
      b.nama.toLowerCase().includes(q) ||
      b.namaOrangTua.toLowerCase().includes(q) ||
      (b.nik && b.nik.includes(q))
    );
  }

  if (status !== 'semua') {
    hasil = hasil.filter(b => b.statusTerakhir === status);
  }

  if (dusun !== 'semua') {
    hasil = hasil.filter(b => b.dusun.toLowerCase() === dusun.toLowerCase());
  }

  renderDesktopTable(hasil);
  renderMobileList(hasil);
}

function renderDesktopTable(list) {
  const tbody = document.getElementById('tbodyBalita');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="p-0">
          ${EmptyState.tidakDitemukan()}
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  list.forEach(b => {
    const umur = BalitaService.hitungUmur(b.tanggalLahir);
    const tglUkur = b.tanggalUkurTerakhir ? App.formatTanggal(b.tanggalUkurTerakhir, true) : 'Belum diukur';
    const statusBadge = StatusBadge.render(b.statusTerakhir);

    html += `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-2">
            <div class="avatar-circle" style="width: 34px; height: 34px; font-size: 0.8125rem;">${b.nama.charAt(0)}</div>
            <div>
              <a href="../shared/detail-balita.html?id=${b.id}" class="fw-bold text-forest text-decoration-none hover-underline">
                ${b.nama}
              </a>
              <div class="font-sm text-muted-posyandu">${b.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
            </div>
          </div>
        </td>
        <td>${umur.teks}</td>
        <td>${b.namaOrangTua}</td>
        <td><span class="badge bg-surface-soft text-ink-700 border-line">${b.dusun}</span></td>
        <td>
          <div class="fw-semibold">${tglUkur}</div>
          <div class="font-sm text-ink-500">${b.beratTerakhir ? b.beratTerakhir + ' kg · ' + b.tinggiTerakhir + ' cm' : '-'}</div>
        </td>
        <td>${statusBadge}</td>
        <td>
          <div class="d-flex align-items-center gap-1">
            <a href="../shared/detail-balita.html?id=${b.id}" class="btn btn-sm btn-outline-secondary" title="Lihat Detail">
              <i class="bi bi-eye"></i>
            </a>
            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="bukaModalEdit('${b.id}')" title="Ubah Data">
              <i class="bi bi-pencil"></i>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger" onclick="konfirmasiNonaktifkan('${b.id}', '${b.nama}')" title="Nonaktifkan">
              <i class="bi bi-archive"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function renderMobileList(list) {
  const container = document.getElementById('listMobileBalita');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = EmptyState.tidakDitemukan();
    return;
  }

  let html = '';
  list.forEach(b => {
    const umur = BalitaService.hitungUmur(b.tanggalLahir);
    const tglUkur = b.tanggalUkurTerakhir ? App.formatTanggal(b.tanggalUkurTerakhir, true) : 'Belum diukur';
    const statusBadge = StatusBadge.render(b.statusTerakhir);

    html += `
      <div class="item-balita">
        <div class="item-balita-main">
          <div class="avatar-circle">${b.nama.charAt(0)}</div>
          <div class="item-balita-info">
            <div class="d-flex align-items-center justify-content-between gap-2 mb-1">
              <a href="../shared/detail-balita.html?id=${b.id}" class="item-balita-name text-decoration-none">
                ${b.nama}
              </a>
              ${statusBadge}
            </div>
            <div class="item-balita-meta">
              <span>${umur.teksSingkat}</span>
              <span>·</span>
              <span>Dusun ${b.dusun}</span>
            </div>
            <div class="item-balita-parent">
              Orang tua: <strong>${b.namaOrangTua}</strong>
            </div>
            <div class="font-sm text-ink-500 mt-1">
              Terakhir diukur: ${tglUkur} (${b.beratTerakhir ? b.beratTerakhir + ' kg' : '-'})
            </div>
          </div>
        </div>
        <div class="item-balita-actions">
          <a href="../shared/detail-balita.html?id=${b.id}" class="btn-posyandu-secondary btn-sm">
            Detail
          </a>
          <button type="button" class="btn btn-sm btn-outline-secondary" onclick="bukaModalEdit('${b.id}')">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-sm btn-outline-danger" onclick="konfirmasiNonaktifkan('${b.id}', '${b.nama}')">
            <i class="bi bi-archive"></i>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function bukaModalTambah() {
  modeEditId = null;
  const modalTitle = document.getElementById('modalBalitaTitle');
  const form = document.getElementById('formBalita');
  if (modalTitle) modalTitle.textContent = 'Tambah Data Balita';
  if (form) {
    form.reset();
    document.getElementById('inputTglLahir').max = new Date().toISOString().split('T')[0];
  }

  const modalEl = document.getElementById('modalBalita');
  if (modalEl) {
    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.show();
  }
}

async function bukaModalEdit(id) {
  modeEditId = id;
  const balita = await BalitaService.ambilDetail(id);
  if (!balita) return;

  const modalTitle = document.getElementById('modalBalitaTitle');
  if (modalTitle) modalTitle.textContent = 'Ubah Data Balita';

  document.getElementById('inputNamaBalita').value = balita.nama;
  document.getElementById('inputNikBalita').value = balita.nik || '';
  document.getElementById('inputTglLahir').value = balita.tanggalLahir;
  document.getElementById('inputTglLahir').max = new Date().toISOString().split('T')[0];
  document.getElementById('selectGender').value = balita.jenisKelamin;
  document.getElementById('inputOrangTua').value = balita.namaOrangTua;
  document.getElementById('selectDusun').value = balita.dusun;
  document.getElementById('inputAlamat').value = balita.alamat || '';

  const modalEl = document.getElementById('modalBalita');
  if (modalEl) {
    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.show();
  }
}

async function simpanFormBalita() {
  const nama = document.getElementById('inputNamaBalita').value.trim();
  const nik = document.getElementById('inputNikBalita').value.trim();
  const tglLahir = document.getElementById('inputTglLahir').value;
  const gender = document.getElementById('selectGender').value;
  const orangTua = document.getElementById('inputOrangTua').value.trim();
  const dusun = document.getElementById('selectDusun').value;
  const alamat = document.getElementById('inputAlamat').value.trim();

  const tglSekarang = new Date().toISOString().split('T')[0];
  if (tglLahir > tglSekarang) {
    Toast.gagal('Tanggal lahir tidak boleh melewati hari ini.');
    return;
  }

  const payload = {
    nama,
    nik,
    tanggalLahir: tglLahir,
    jenisKelamin: gender,
    namaOrangTua: orangTua,
    dusun,
    alamat
  };

  if (modeEditId) {
    const res = await BalitaService.ubah(modeEditId, payload);
    if (res.success) {
      Toast.sukses(`Data balita ${nama} berhasil diperbarui.`);
    }
  } else {
    const res = await BalitaService.tambah(payload);
    if (res.success) {
      Toast.sukses(`Data balita ${nama} berhasil ditambahkan.`);
    }
  }

  const modalEl = document.getElementById('modalBalita');
  if (modalEl) {
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    if (bsModal) bsModal.hide();
  }

  await muatDataBalita();
}

function konfirmasiNonaktifkan(id, nama) {
  Dialog.konfirmasi({
    judul: `Nonaktifkan data ${nama}?`,
    pesan: 'Data tidak akan muncul dalam daftar balita aktif, namun riwayat pengukuran sebelumnya tetap tersimpan rapi.',
    teksBatal: 'Batal',
    teksSetuju: 'Nonaktifkan Data',
    tipeBahaya: true,
    onSetuju: async () => {
      const res = await BalitaService.nonaktifkan(id);
      if (res.success) {
        Toast.sukses(res.message);
        await muatDataBalita();
      }
    }
  });
}

window.bukaModalTambah = bukaModalTambah;
window.bukaModalEdit = bukaModalEdit;
window.konfirmasiNonaktifkan = konfirmasiNonaktifkan;
