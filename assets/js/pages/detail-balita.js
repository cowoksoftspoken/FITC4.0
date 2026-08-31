
let balitaState = null;
let riwayatPengukuranState = [];
let chartInstance = null;
let modeMetrikChart = 'berat'; 

document.addEventListener('DOMContentLoaded', async () => {
  const user = AuthService.cekAkses(['kader', 'bidan', 'admin']);
  if (!user) return;

  const urlParams = new URLSearchParams(window.location.search);
  const balitaId = urlParams.get('id');

  if (!balitaId) {
    window.location.href = '../shared/not-found.html';
    return;
  }

  setupBackButton(user);

  await muatDetailBalita(balitaId);

  setupChartToggle();
});

function setupBackButton(user) {
  const backBtn = document.getElementById('btnKembaliDetail');
  if (!backBtn) return;

  if (user.peran === 'bidan') {
    backBtn.href = '../bidan/prioritas.html';
  } else if (user.peran === 'admin') {
    backBtn.href = '../admin/dashboard.html';
  } else {
    backBtn.href = '../kader/balita.html';
  }
}

async function muatDetailBalita(id) {
  try {
    balitaState = await BalitaService.ambilDetail(id);
    if (!balitaState) {
      window.location.href = '../shared/not-found.html';
      return;
    }

    riwayatPengukuranState = await PengukuranService.ambilRiwayat(id);

    renderHeaderBalita();
    renderSummaryMetrik();
    renderGrafikPertumbuhan();
    renderRiwayatTabelDanTimeline();
  } catch (e) {
    console.error('Gagal memuat detail balita:', e);
    Toast.gagal('Gagal memuat detail data balita.');
  }
}

function renderHeaderBalita() {
  const umur = BalitaService.hitungUmur(balitaState.tanggalLahir);

  document.getElementById('childName').textContent = balitaState.nama;
  document.getElementById('childAvatar').textContent = balitaState.nama.charAt(0);
  document.getElementById('childMetaText').textContent = 
    `${balitaState.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'} · ${umur.teks} · Dusun ${balitaState.dusun}`;
  document.getElementById('childParentText').textContent = `Orang Tua: ${balitaState.namaOrangTua}`;

  const badgeContainer = document.getElementById('childStatusBadge');
  if (badgeContainer) {
    badgeContainer.innerHTML = StatusBadge.render(balitaState.statusTerakhir);
  }

  const btnUkur = document.getElementById('btnTambahUkurBalita');
  if (btnUkur) {
    btnUkur.href = `../kader/pengukuran.html?id=${balitaState.id}`;
  }
}

function renderSummaryMetrik() {
  const bbEl = document.getElementById('metricBbTerakhir');
  const tbEl = document.getElementById('metricTbTerakhir');
  const deltaEl = document.getElementById('metricDeltaBb');
  const tglEl = document.getElementById('metricTglTerakhir');

  if (riwayatPengukuranState.length > 0) {
    const latest = riwayatPengukuranState[0];
    if (bbEl) bbEl.textContent = `${latest.beratBadan} kg`;
    if (tbEl) tbEl.textContent = `${latest.tinggiBadan} cm`;
    if (tglEl) tglEl.textContent = App.formatTanggal(latest.tanggal);

    if (deltaEl) {
      deltaEl.textContent = balitaState.perubahanBb || '0.0';
      if (balitaState.perubahanBb && balitaState.perubahanBb.startsWith('-')) {
        deltaEl.className = 'val text-danger';
      } else if (balitaState.perubahanBb && balitaState.perubahanBb.startsWith('+') && balitaState.perubahanBb !== '+0.0') {
        deltaEl.className = 'val text-green-brand';
      } else {
        deltaEl.className = 'val text-forest';
      }
    }
  } else {
    if (bbEl) bbEl.textContent = '-';
    if (tbEl) tbEl.textContent = '-';
    if (deltaEl) deltaEl.textContent = '-';
    if (tglEl) tglEl.textContent = 'Belum pernah diukur';
  }
}

function setupChartToggle() {
  const btnBb = document.getElementById('btnToggleChartBb');
  const btnTb = document.getElementById('btnToggleChartTb');

  if (btnBb && btnTb) {
    btnBb.addEventListener('click', () => {
      modeMetrikChart = 'berat';
      btnBb.classList.add('active');
      btnTb.classList.remove('active');
      renderGrafikPertumbuhan();
    });

    btnTb.addEventListener('click', () => {
      modeMetrikChart = 'tinggi';
      btnTb.classList.add('active');
      btnBb.classList.remove('active');
      renderGrafikPertumbuhan();
    });
  }
}

function renderGrafikPertumbuhan() {
  const canvas = document.getElementById('chartPertumbuhan');
  const emptyContainer = document.getElementById('chartEmptyNotice');
  if (!canvas) return;

  if (!riwayatPengukuranState || riwayatPengukuranState.length < 2) {
    canvas.style.display = 'none';
    if (emptyContainer) {
      emptyContainer.style.display = 'block';
      emptyContainer.innerHTML = `
        <div class="empty-state py-4">
          <i class="bi bi-graph-up text-muted-posyandu fs-3 mb-2 d-inline-block"></i>
          <h5 class="h6 text-forest mb-1">Belum cukup data riwayat</h5>
          <p class="font-sm text-ink-500 mb-0">Dibutuhkan minimal 2 catatan penimbangan untuk menampilkan grafik tren pertumbuhan.</p>
        </div>
      `;
    }
    return;
  }

  canvas.style.display = 'block';
  if (emptyContainer) emptyContainer.style.display = 'none';

  const sorted = [...riwayatPengukuranState].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  const labels = sorted.map(p => `${App.formatTanggal(p.tanggal, true)} (${p.usiaBulan} bln)`);
  const values = modeMetrikChart === 'berat' 
    ? sorted.map(p => p.beratBadan) 
    : sorted.map(p => p.tinggiBadan);

  const labelDataset = modeMetrikChart === 'berat' ? 'Berat Badan (kg)' : 'Tinggi Badan (cm)';
  const colorLine = modeMetrikChart === 'berat' ? '#24745A' : '#436C87';
  const colorFill = modeMetrikChart === 'berat' ? 'rgba(36, 116, 90, 0.08)' : 'rgba(67, 108, 135, 0.08)';

  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = canvas.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: labelDataset,
        data: values,
        borderColor: colorLine,
        backgroundColor: colorFill,
        borderWidth: 2.5,
        fill: true,
        tension: 0.25,
        pointBackgroundColor: colorLine,
        pointRadius: 4.5,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#183B32',
          titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
          bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y} ${modeMetrikChart === 'berat' ? 'kg' : 'cm'}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Plus Jakarta Sans', size: 11 }, color: '#69766F' }
        },
        y: {
          grid: { color: '#E6F1EC' },
          ticks: { font: { family: 'Plus Jakarta Sans', size: 11 }, color: '#69766F' }
        }
      }
    }
  });
}

function renderRiwayatTabelDanTimeline() {
  const tbody = document.getElementById('tbodyRiwayatBalita');
  const timeline = document.getElementById('timelineRiwayatBalita');

  if (riwayatPengukuranState.length === 0) {
    const emptyHtml = EmptyState.belumAdaPengukuran(`../kader/pengukuran.html?id=${balitaState.id}`);
    if (tbody) tbody.innerHTML = `<tr><td colspan="7" class="p-0">${emptyHtml}</td></tr>`;
    if (timeline) timeline.innerHTML = emptyHtml;
    return;
  }

  if (tbody) {
    let htmlTable = '';
    riwayatPengukuranState.forEach(p => {
      htmlTable += `
        <tr>
          <td class="fw-semibold">${App.formatTanggal(p.tanggal)}</td>
          <td>${p.usiaBulan} bulan</td>
          <td><strong>${p.beratBadan} kg</strong></td>
          <td>${p.tinggiBadan} cm</td>
          <td>${StatusBadge.render(p.status)}</td>
          <td class="font-sm text-ink-500">${p.dicatatOleh || 'Kader'}</td>
          <td class="font-sm text-ink-700">${p.catatan || '-'}</td>
          <td style="text-align: right;">
            <button type="button" class="btn btn-sm btn-outline-danger" onclick="hapusRiwayatPengukuran('${p.id}')" title="Hapus Catatan">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = htmlTable;
  }

  if (timeline) {
    let htmlTimeline = '';
    riwayatPengukuranState.forEach(p => {
      htmlTimeline += `
        <div class="timeline-item">
          <div class="timeline-bullet"></div>
          <div class="timeline-card">
            <div class="d-flex align-items-center justify-content-between mb-1">
              <span class="fw-bold text-forest">${App.formatTanggal(p.tanggal)}</span>
              ${StatusBadge.render(p.status)}
            </div>
            <div class="font-sm text-ink-800 mb-1">
              <strong>${p.beratBadan} kg</strong> · ${p.tinggiBadan} cm (${p.usiaBulan} bulan)
            </div>
            <div class="font-xs text-muted-posyandu">
              Dicatat oleh: ${p.dicatatOleh || 'Kader'}
            </div>
            ${p.catatan ? `<div class="font-sm text-ink-700 mt-1 border-top pt-1">${p.catatan}</div>` : ''}
          </div>
        </div>
      `;
    });
    timeline.innerHTML = htmlTimeline;
  }
}

function hapusRiwayatPengukuran(id) {
  Dialog.konfirmasi({
    judul: 'Hapus Catatan Pengukuran?',
    pesan: 'Catatan penimbangan ini akan dihapus dari riwayat tumbuh kembang balita.',
    teksBatal: 'Batal',
    teksSetuju: 'Hapus Catatan',
    tipeBahaya: true,
    onSetuju: async () => {
      const res = await PengukuranService.hapus(id);
      if (res.success) {
        Toast.sukses('Data pengukuran berhasil dihapus.');
        await muatDetailBalita(balitaState.id);
      }
    }
  });
}

window.hapusRiwayatPengukuran = hapusRiwayatPengukuran;
