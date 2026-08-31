
let rekapListState = [];

document.addEventListener('DOMContentLoaded', async () => {
  const user = AuthService.cekAkses(['bidan', 'admin']);
  if (!user) return;

  setupEventListeners();
  await muatDataRekap();
});

function setupEventListeners() {
  const filterBulan = document.getElementById('filterBulanRekap');
  const filterDusun = document.getElementById('filterDusunRekap');
  const filterStatus = document.getElementById('filterStatusRekap');
  const searchInput = document.getElementById('searchRekap');
  const btnExport = document.getElementById('btnEksporCsv');

  const onFilterChange = () => muatDataRekap();

  if (filterBulan) filterBulan.addEventListener('change', onFilterChange);
  if (filterDusun) filterDusun.addEventListener('change', onFilterChange);
  if (filterStatus) filterStatus.addEventListener('change', onFilterChange);
  if (searchInput) searchInput.addEventListener('input', onFilterChange);

  if (btnExport) {
    btnExport.addEventListener('click', () => eksporKeCsv());
  }
}

async function muatDataRekap() {
  const bulan = document.getElementById('filterBulanRekap')?.value || 'semua';
  const dusun = document.getElementById('filterDusunRekap')?.value || 'semua';
  const status = document.getElementById('filterStatusRekap')?.value || 'semua';
  const cari = document.getElementById('searchRekap')?.value.trim() || '';

  const filter = {
    bulan,
    dusun,
    status,
    cari
  };

  try {
    rekapListState = await PengukuranService.ambilSemua(filter);
    renderTabelRekap(rekapListState);
  } catch (e) {
    console.error('Gagal mengambil rekap:', e);
    Toast.gagal('Gagal memuat rekap pengukuran.');
  }
}

function renderTabelRekap(list) {
  const tbody = document.getElementById('tbodyRekap');
  const totalCountEl = document.getElementById('rekapTotalCount');
  if (!tbody) return;

  if (totalCountEl) {
    totalCountEl.textContent = `${list.length} rekaman data ditemukan`;
  }

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
  list.forEach(p => {
    html += `
      <tr>
        <td class="fw-semibold">${App.formatTanggal(p.tanggal)}</td>
        <td>
          <a href="../shared/detail-balita.html?id=${p.balitaId}" class="fw-bold text-forest text-decoration-none hover-underline">
            ${p.namaBalita}
          </a>
        </td>
        <td>${p.usiaBulan} bulan</td>
        <td><strong>${p.beratBadan} kg</strong></td>
        <td>${p.tinggiBadan} cm</td>
        <td>${StatusBadge.render(p.status)}</td>
        <td class="font-sm text-ink-500">${p.dicatatOleh || 'Kader'}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function eksporKeCsv() {
  if (!rekapListState || rekapListState.length === 0) {
    Toast.peringatan('Tidak ada data pengukuran untuk diekspor.');
    return;
  }

  const headers = ['Tanggal', 'Nama Balita', 'Usia (Bulan)', 'Berat Badan (kg)', 'Tinggi Badan (cm)', 'Status', 'Dicatat Oleh', 'Catatan'];
  const rows = rekapListState.map(p => [
    `"${p.tanggal}"`,
    `"${p.namaBalita}"`,
    `"${p.usiaBulan}"`,
    `"${p.beratBadan}"`,
    `"${p.tinggiBadan}"`,
    `"${p.status}"`,
    `"${p.dicatatOleh || 'Kader'}"`,
    `"${(p.catatan || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `rekap-pengukuran-posyandu-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  Toast.sukses('Data rekapitulasi berhasil diekspor ke format CSV.');
}
