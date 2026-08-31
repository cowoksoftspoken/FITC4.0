
let chartDusunInstance = null;
let chartCakupanInstance = null;

document.addEventListener('DOMContentLoaded', async () => {
  const user = AuthService.cekAkses(['bidan', 'admin']);
  if (!user) return;

  await muatDashboardBidan();
});

async function muatDashboardBidan() {
  try {
    const data = await DashboardService.ringkasanBidan();

    document.getElementById('metricBidanTotal').textContent = data.totalBalita;
    document.getElementById('metricBidanDiukur').textContent = data.diukurBulanIni;
    document.getElementById('metricBidanPemantauan').textContent = data.perluPemantauan;
    document.getElementById('metricBidanPrioritas').textContent = data.prioritasBidan;

    renderDaftarPrioritas(data.daftarPrioritas);

    renderChartDusun(data.chartDusun);
    renderChartCakupan(data.chartCakupan);

    renderAktivitas(data.aktivitasTerbaru);
  } catch (e) {
    console.error('Gagal memuat dashboard bidan:', e);
    Toast.gagal('Gagal memuat data dashboard Bidan.');
  }
}

function renderDaftarPrioritas(list) {
  const container = document.getElementById('listBidanPrioritas');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = EmptyState.tidakAdaPrioritas();
    return;
  }

  let html = '';
  list.forEach(b => {
    const umur = BalitaService.hitungUmur(b.tanggalLahir);
    const tglUkur = b.tanggalUkurTerakhir ? App.formatTanggal(b.tanggalUkurTerakhir, true) : 'Belum diukur';
    const isPrioritasTinggi = b.statusTerakhir === 'prioritas';

    html += `
      <div class="item-balita ${isPrioritasTinggi ? 'border-danger-border bg-danger-soft' : ''}">
        <div class="item-balita-main">
          <div class="avatar-circle" style="background-color: ${isPrioritasTinggi ? 'var(--danger-soft)' : 'var(--warning-soft)'}; color: ${isPrioritasTinggi ? 'var(--danger-text)' : 'var(--warning-text)'};">
            ${b.nama.charAt(0)}
          </div>
          <div class="item-balita-info">
            <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
              <span class="item-balita-name mb-0">${b.nama}</span>
              ${StatusBadge.render(b.statusTerakhir)}
            </div>
            <span class="item-balita-meta">
              <span>${umur.teks}</span>
              <span>·</span>
              <span>Dusun ${b.dusun}</span>
              <span>·</span>
              <span>Orang tua: ${b.namaOrangTua}</span>
            </span>
            <div class="font-sm text-ink-700 mt-1">
              Terakhir diukur: <strong>${tglUkur}</strong> (${b.beratTerakhir ? b.beratTerakhir + ' kg · ' + b.tinggiTerakhir + ' cm' : '-'}) 
              · Perubahan BB: <span class="fw-bold">${b.perubahanBb || '0.0'} kg</span>
            </div>
            <div class="font-sm text-ink-500 mt-1">
              <em>Catatan: ${b.catatan || 'Kenaikan berat badan tidak adekuat dalam pemantauan.'}</em>
            </div>
          </div>
        </div>
        <div class="item-balita-actions">
          <a href="../shared/detail-balita.html?id=${b.id}" class="btn-posyandu-primary btn-sm">
            <i class="bi bi-search"></i> Tinjau Riwayat
          </a>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderChartDusun(chartData) {
  const canvas = document.getElementById('chartStatusDusun');
  if (!canvas) return;

  if (chartDusunInstance) chartDusunInstance.destroy();

  const ctx = canvas.getContext('2d');
  chartDusunInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: 'Normal',
          data: chartData.normal,
          backgroundColor: '#2F7D58',
          borderRadius: 4
        },
        {
          label: 'Perlu Pemantauan',
          data: chartData.pemantauan,
          backgroundColor: '#B7791F',
          borderRadius: 4
        },
        {
          label: 'Prioritas Bidan',
          data: chartData.prioritas,
          backgroundColor: '#B64D4D',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { family: 'Plus Jakarta Sans', size: 12 }, boxWidth: 12 }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Plus Jakarta Sans', size: 11 }, color: '#69766F' }
        },
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, font: { family: 'Plus Jakarta Sans', size: 11 }, color: '#69766F' },
          grid: { color: '#E6F1EC' }
        }
      }
    }
  });
}

function renderChartCakupan(chartData) {
  const canvas = document.getElementById('chartCakupanPengukuran');
  if (!canvas) return;

  if (chartCakupanInstance) chartCakupanInstance.destroy();

  const ctx = canvas.getContext('2d');
  chartCakupanInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Balita Ditimbang',
        data: chartData.realisasi,
        borderColor: '#24745A',
        backgroundColor: 'rgba(36, 116, 90, 0.1)',
        fill: true,
        tension: 0.3,
        borderWidth: 2.5,
        pointBackgroundColor: '#24745A',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Plus Jakarta Sans', size: 11 }, color: '#69766F' }
        },
        y: {
          beginAtZero: true,
          ticks: { stepSize: 4, font: { family: 'Plus Jakarta Sans', size: 11 }, color: '#69766F' },
          grid: { color: '#E6F1EC' }
        }
      }
    }
  });
}

function renderAktivitas(list) {
  const container = document.getElementById('listAktivitasBidan');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = '<div class="text-ink-500 font-sm p-3">Belum ada aktivitas terbaru.</div>';
    return;
  }

  let html = '';
  list.forEach(a => {
    html += `
      <div class="d-flex align-items-start gap-3 py-2 border-bottom">
        <span class="badge bg-surface-soft text-ink-700 font-xs border font-monospace">${a.waktu}</span>
        <div class="font-sm text-ink-800 flex-grow-1">
          ${a.teks}
          <div class="font-xs text-ink-500">${a.tanggal}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}
