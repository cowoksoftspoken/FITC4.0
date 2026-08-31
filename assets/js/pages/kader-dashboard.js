
document.addEventListener('DOMContentLoaded', async () => {

  const user = AuthService.cekAkses(['kader']);
  if (!user) return;

  const greetingEl = document.getElementById('kaderGreeting');
  const greetingDateEl = document.getElementById('kaderDate');
  if (greetingEl) {
    greetingEl.textContent = `Selamat datang, ${user.sapaan || user.nama}`;
  }
  if (greetingDateEl) {
    greetingDateEl.textContent = `${user.dusun ? 'Dusun ' + user.dusun + ' · ' : ''}${App.formatTanggalHari()}`;
  }

  await muatDataDashboard();
});

async function muatDataDashboard() {
  const containerBelum = document.getElementById('listBelumDitimbang');
  const containerPerhatian = document.getElementById('listPerluPerhatian');
  const bannerTitle = document.getElementById('taskBannerTitle');
  const bannerSubtitle = document.getElementById('taskBannerSubtitle');
  const metricTotal = document.getElementById('metricTotalAnak');
  const metricSudah = document.getElementById('metricSudahDiukur');
  const metricPerlu = document.getElementById('metricPerluPerhatian');

  try {
    const ringkasan = await DashboardService.ringkasanKader();

    if (metricTotal) metricTotal.textContent = ringkasan.totalAnak;
    if (metricSudah) metricSudah.textContent = ringkasan.sudahDiukur;
    if (metricPerlu) metricPerlu.textContent = ringkasan.perluPerhatian;

    if (bannerTitle) {
      bannerTitle.textContent = `${ringkasan.belumDiukur} balita belum ditimbang bulan ini.`;
    }
    if (bannerSubtitle) {
      bannerSubtitle.textContent = `${ringkasan.sudahDiukur} dari ${ringkasan.totalAnak} balita binaan sudah memiliki catatan penimbangan bulan ini.`;
    }

    if (containerBelum) {
      if (ringkasan.daftarBelumDitimbang.length === 0) {
        containerBelum.innerHTML = `
          <div class="empty-state py-4">
            <i class="bi bi-check-circle-fill text-success fs-3 mb-2 d-inline-block"></i>
            <h5 class="h6 text-forest mb-1">Semua balita sudah ditimbang</h5>
            <p class="font-sm text-ink-500 mb-0">Seluruh anak binaan telah memiliki catatan penimbangan bulan ini.</p>
          </div>
        `;
      } else {
        let html = '';
        ringkasan.daftarBelumDitimbang.forEach(b => {
          const umur = BalitaService.hitungUmur(b.tanggalLahir);
          const tglTerakhir = b.tanggalUkurTerakhir ? App.formatTanggal(b.tanggalUkurTerakhir, true) : 'Belum pernah diukur';

          html += `
            <div class="item-balita">
              <div class="item-balita-main">
                <div class="avatar-circle">${b.nama.charAt(0)}</div>
                <div class="item-balita-info">
                  <span class="item-balita-name">${b.nama}</span>
                  <span class="item-balita-meta">
                    <span>${umur.teks}</span>
                    <span>·</span>
                    <span>Dusun ${b.dusun}</span>
                  </span>
                  <span class="text-ink-500 font-sm">
                    Terakhir ditimbang: <strong>${tglTerakhir}</strong>
                  </span>
                </div>
              </div>
              <div class="item-balita-actions">
                <a href="pengukuran.html?id=${b.id}" class="btn-posyandu-primary btn-sm">
                  <i class="bi bi-clipboard-plus"></i> Catat
                </a>
              </div>
            </div>
          `;
        });
        containerBelum.innerHTML = html;
      }
    }

    if (containerPerhatian) {
      if (ringkasan.daftarPerhatian.length === 0) {
        containerPerhatian.innerHTML = EmptyState.tidakAdaPrioritas();
      } else {
        let html = '';
        ringkasan.daftarPerhatian.forEach(b => {
          const umur = BalitaService.hitungUmur(b.tanggalLahir);
          html += `
            <div class="item-balita">
              <div class="item-balita-main">
                <div class="avatar-circle" style="background-color: var(--warning-soft); color: var(--warning-text);">${b.nama.charAt(0)}</div>
                <div class="item-balita-info">
                  <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                    <span class="item-balita-name mb-0">${b.nama}</span>
                    ${StatusBadge.render(b.statusTerakhir)}
                  </div>
                  <span class="item-balita-meta">
                    <span>${umur.teksSingkat}</span>
                    <span>·</span>
                    <span>Dusun ${b.dusun}</span>
                    <span>·</span>
                    <span>Orang tua: ${b.namaOrangTua}</span>
                  </span>
                  <span class="text-ink-700 font-sm mt-1">
                    ${b.catatan || 'Perlu pemantauan kenaikan berat badan bulan depan.'}
                  </span>
                </div>
              </div>
              <div class="item-balita-actions">
                <a href="../shared/detail-balita.html?id=${b.id}" class="btn-posyandu-secondary btn-sm">
                  Lihat Riwayat
                </a>
              </div>
            </div>
          `;
        });
        containerPerhatian.innerHTML = html;
      }
    }

  } catch (e) {
    console.error('Gagal memuat data dashboard:', e);
    Toast.gagal('Data dashboard belum berhasil dimuat. Silakan coba lagi.');
  }
}
