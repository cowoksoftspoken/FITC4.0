
let prioritasBalitaState = [];

document.addEventListener('DOMContentLoaded', async () => {
  const user = AuthService.cekAkses(['bidan', 'admin']);
  if (!user) return;

  setupEventListeners();
  await muatDataPrioritas();
});

function setupEventListeners() {
  const searchInput = document.getElementById('searchPrioritas');
  const filterDusun = document.getElementById('filterDusunPrioritas');
  const filterStatus = document.getElementById('filterStatusPrioritas');

  if (searchInput) {
    searchInput.addEventListener('input', () => filterDanRenderPrioritas());
  }

  if (filterDusun) {
    filterDusun.addEventListener('change', () => filterDanRenderPrioritas());
  }

  if (filterStatus) {
    filterStatus.addEventListener('change', () => filterDanRenderPrioritas());
  }
}

async function muatDataPrioritas() {
  try {
    const all = await BalitaService.ambilSemua();

    prioritasBalitaState = all.filter(b => b.statusTerakhir === 'prioritas' || b.statusTerakhir === 'pemantauan');

    prioritasBalitaState.sort((a, b) => {
      const order = { 'prioritas': 1, 'pemantauan': 2, 'normal': 3 };
      const statusDiff = (order[a.statusTerakhir] || 9) - (order[b.statusTerakhir] || 9);
      if (statusDiff !== 0) return statusDiff;

      const deltaA = parseFloat(a.perubahanBb) || 0;
      const deltaB = parseFloat(b.perubahanBb) || 0;
      return deltaA - deltaB; 
    });

    filterDanRenderPrioritas();
  } catch (e) {
    console.error('Gagal mengambil data prioritas:', e);
    Toast.gagal('Gagal memuat daftar prioritas balita.');
  }
}

function filterDanRenderPrioritas() {
  const q = document.getElementById('searchPrioritas')?.value.trim().toLowerCase() || '';
  const dusun = document.getElementById('filterDusunPrioritas')?.value || 'semua';
  const status = document.getElementById('filterStatusPrioritas')?.value || 'semua';

  let hasil = [...prioritasBalitaState];

  if (q) {
    hasil = hasil.filter(b => 
      b.nama.toLowerCase().includes(q) ||
      b.namaOrangTua.toLowerCase().includes(q)
    );
  }

  if (dusun !== 'semua') {
    hasil = hasil.filter(b => b.dusun.toLowerCase() === dusun.toLowerCase());
  }

  if (status !== 'semua') {
    hasil = hasil.filter(b => b.statusTerakhir === status);
  }

  renderTablePrioritas(hasil);
  renderMobileListPrioritas(hasil);
}

function renderTablePrioritas(list) {
  const tbody = document.getElementById('tbodyPrioritas');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="p-0">
          ${EmptyState.tidakAdaPrioritas()}
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  list.forEach(b => {
    const umur = BalitaService.hitungUmur(b.tanggalLahir);
    const tglUkur = b.tanggalUkurTerakhir ? App.formatTanggal(b.tanggalUkurTerakhir, true) : 'Belum diukur';
    const deltaStr = b.perubahanBb ? `${b.perubahanBb} kg` : '0.0 kg';
    const isNegatif = b.perubahanBb && b.perubahanBb.startsWith('-');

    html += `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-2">
            <div class="avatar-circle" style="width: 34px; height: 34px; font-size: 0.8125rem; background-color: ${b.statusTerakhir === 'prioritas' ? 'var(--danger-soft)' : 'var(--warning-soft)'}; color: ${b.statusTerakhir === 'prioritas' ? 'var(--danger-text)' : 'var(--warning-text)'};">
              ${b.nama.charAt(0)}
            </div>
            <div>
              <a href="../shared/detail-balita.html?id=${b.id}" class="fw-bold text-forest text-decoration-none hover-underline">
                ${b.nama}
              </a>
              <div class="font-sm text-ink-500">Ortu: ${b.namaOrangTua}</div>
            </div>
          </div>
        </td>
        <td>${umur.teks}</td>
        <td><span class="badge bg-surface-soft text-ink-700 border-line">${b.dusun}</span></td>
        <td>
          <div class="fw-semibold">${tglUkur}</div>
          <div class="font-sm text-ink-500">${b.beratTerakhir ? b.beratTerakhir + ' kg · ' + b.tinggiTerakhir + ' cm' : '-'}</div>
        </td>
        <td>
          <span class="fw-bold ${isNegatif ? 'text-danger' : 'text-forest'}">${deltaStr}</span>
        </td>
        <td>${StatusBadge.render(b.statusTerakhir)}</td>
        <td style="text-align: right;">
          <a href="../shared/detail-balita.html?id=${b.id}" class="btn-posyandu-primary btn-sm">
            <i class="bi bi-search"></i> Lihat Riwayat
          </a>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function renderMobileListPrioritas(list) {
  const container = document.getElementById('listMobilePrioritas');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = EmptyState.tidakAdaPrioritas();
    return;
  }

  let html = '';
  list.forEach(b => {
    const umur = BalitaService.hitungUmur(b.tanggalLahir);
    const tglUkur = b.tanggalUkurTerakhir ? App.formatTanggal(b.tanggalUkurTerakhir, true) : 'Belum diukur';
    const isNegatif = b.perubahanBb && b.perubahanBb.startsWith('-');

    html += `
      <div class="item-balita ${b.statusTerakhir === 'prioritas' ? 'border-danger-border' : ''}">
        <div class="item-balita-main">
          <div class="avatar-circle" style="background-color: ${b.statusTerakhir === 'prioritas' ? 'var(--danger-soft)' : 'var(--warning-soft)'}; color: ${b.statusTerakhir === 'prioritas' ? 'var(--danger-text)' : 'var(--warning-text)'};">
            ${b.nama.charAt(0)}
          </div>
          <div class="item-balita-info">
            <div class="d-flex align-items-center justify-content-between gap-2 mb-1">
              <a href="../shared/detail-balita.html?id=${b.id}" class="item-balita-name text-decoration-none">
                ${b.nama}
              </a>
              ${StatusBadge.render(b.statusTerakhir)}
            </div>
            <div class="item-balita-meta">
              <span>${umur.teksSingkat}</span>
              <span>·</span>
              <span>Dusun ${b.dusun}</span>
              <span>·</span>
              <span>Ortu: ${b.namaOrangTua}</span>
            </div>
            <div class="font-sm text-ink-700 mt-1">
              Terakhir diukur: ${tglUkur} (${b.beratTerakhir ? b.beratTerakhir + ' kg' : '-'})
              · Tren: <span class="fw-bold ${isNegatif ? 'text-danger' : 'text-forest'}">${b.perubahanBb || '0.0'} kg</span>
            </div>
          </div>
        </div>
        <div class="item-balita-actions">
          <a href="../shared/detail-balita.html?id=${b.id}" class="btn-posyandu-primary btn-sm w-100">
            <i class="bi bi-search"></i> Tinjau Riwayat
          </a>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}
