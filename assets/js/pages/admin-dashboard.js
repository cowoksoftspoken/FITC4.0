
document.addEventListener('DOMContentLoaded', async () => {
  const user = AuthService.cekAkses(['admin']);
  if (!user) return;

  await muatDashboardAdmin();
});

async function muatDashboardAdmin() {
  try {
    const data = await DashboardService.ringkasanAdmin();

    document.getElementById('metricAdminUsers').textContent = data.totalPenggunaAktif;
    document.getElementById('metricAdminBalita').textContent = data.totalBalitaAktif;
    document.getElementById('metricAdminUkur').textContent = data.pengukuranBulanIni;
    document.getElementById('metricAdminDusun').textContent = data.dusunTerlayani;

    renderAuditData(data.catatanPerluPerbaikan);

    renderAktivitasAdmin(data.aktivitasTerbaru);
  } catch (e) {
    console.error('Gagal memuat dashboard admin:', e);
    Toast.gagal('Gagal memuat ringkasan data admin.');
  }
}

function renderAuditData(list) {
  const container = document.getElementById('listAuditData');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-3 bg-success-soft text-success border border-success-border rounded-3 font-sm d-flex align-items-center gap-2">
        <i class="bi bi-check-circle-fill"></i>
        <span>Kualitas data sangat baik. Tidak ditemukan anomali atau data kosong.</span>
      </div>
    `;
    return;
  }

  let html = '';
  list.forEach(item => {
    html += `
      <div class="d-flex align-items-center justify-content-between p-3 border rounded-3 mb-2 bg-surface">
        <div>
          <div class="fw-bold text-forest">${item.balita} <span class="badge bg-surface-soft text-ink-700 font-xs ms-1">Dusun ${item.dusun}</span></div>
          <div class="font-sm text-warning-text mt-1"><i class="bi bi-exclamation-triangle-fill text-warning me-1"></i> ${item.isu}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderAktivitasAdmin(list) {
  const container = document.getElementById('listAktivitasAdmin');
  if (!container) return;

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
