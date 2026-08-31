
const EmptyState = {

  render({
    icon = 'bi-inbox',
    judul = 'Data Belum Tersedia',
    deskripsi = 'Belum ada data untuk ditampilkan pada bagian ini.',
    teksAksi = null,
    onAksi = null,
    hrefAksi = null
  }) {
    let actionBtnHtml = '';
    if (hrefAksi && teksAksi) {
      actionBtnHtml = `<a href="${hrefAksi}" class="btn-posyandu-primary btn-sm"><i class="bi bi-plus-lg"></i> ${teksAksi}</a>`;
    } else if (onAksi && teksAksi) {
      actionBtnHtml = `<button type="button" class="btn-posyandu-primary btn-sm btn-empty-action"><i class="bi bi-plus-lg"></i> ${teksAksi}</button>`;
    }

    return `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="bi ${icon}"></i>
        </div>
        <h4 class="empty-state-title">${judul}</h4>
        <p class="empty-state-desc">${deskripsi}</p>
        ${actionBtnHtml}
      </div>
    `;
  },

  belumAdaBalita(onTambah = null) {
    return this.render({
      icon: 'bi-person-plus',
      judul: 'Belum ada balita terdaftar',
      deskripsi: 'Tambahkan data balita pertama untuk mulai mencatat pengukuran dan memantau tumbuh kembang.',
      teksAksi: 'Tambah Balita',
      onAksi: onTambah
    });
  },

  belumAdaPengukuran(hrefPengukuran = 'pengukuran.html') {
    return this.render({
      icon: 'bi-clipboard-pulse',
      judul: 'Belum ada riwayat pengukuran',
      deskripsi: 'Catat pengukuran berat dan tinggi badan pertama pada kunjungan Posyandu.',
      teksAksi: 'Catat Pengukuran',
      hrefAksi: hrefPengukuran
    });
  },

  tidakAdaPrioritas() {
    return this.render({
      icon: 'bi-shield-check',
      judul: 'Tidak ada balita prioritas saat ini',
      deskripsi: 'Semua balita berada dalam pertumbuhan normal atau terkontrol. Pemantauan rutin tetap dilanjutkan.'
    });
  },

  tidakDitemukan() {
    return this.render({
      icon: 'bi-search',
      judul: 'Data tidak ditemukan',
      deskripsi: 'Tidak ada data balita yang cocok dengan kata kunci atau filter pencarian Anda.'
    });
  }
};

window.EmptyState = EmptyState;
