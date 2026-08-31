
const Dialog = {

  konfirmasi({
    judul = 'Konfirmasi Aksi',
    pesan = 'Apakah Anda yakin ingin melanjutkan tindakan ini?',
    teksBatal = 'Batal',
    teksSetuju = 'Lanjutkan',
    tipeBahaya = false,
    onSetuju = () => {},
    onBatal = () => {}
  }) {

    const existing = document.getElementById('posyanduDynamicDialog');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.id = 'posyanduDynamicDialog';
    backdrop.className = 'modal fade show';
    backdrop.style.display = 'block';
    backdrop.style.backgroundColor = 'rgba(24, 59, 50, 0.4)';
    backdrop.setAttribute('tabindex', '-1');
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');

    backdrop.innerHTML = `
      <div class="modal-dialog modal-dialog-centered modal-dialog-posyandu" style="max-width: 440px;">
        <div class="modal-content modal-content-posyandu">
          <div class="modal-header modal-header-posyandu">
            <h5 class="modal-title modal-title-posyandu">${judul}</h5>
            <button type="button" class="btn-close" aria-label="Tutup"></button>
          </div>
          <div class="modal-body modal-body-posyandu">
            <p class="mb-0 text-ink-700" style="font-size: 0.9375rem; line-height: 1.5;">${pesan}</p>
          </div>
          <div class="modal-footer modal-footer-posyandu">
            <button type="button" class="btn-posyandu-secondary btn-sm btn-dialog-cancel">${teksBatal}</button>
            <button type="button" class="${tipeBahaya ? 'btn btn-danger btn-sm' : 'btn-posyandu-primary btn-sm'} btn-dialog-confirm" style="border-radius: var(--radius-md); font-weight:600;">
              ${teksSetuju}
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const closeBtn = backdrop.querySelector('.btn-close');
    const cancelBtn = backdrop.querySelector('.btn-dialog-cancel');
    const confirmBtn = backdrop.querySelector('.btn-dialog-confirm');

    const closeDialog = () => {
      backdrop.classList.remove('show');
      setTimeout(() => backdrop.remove(), 150);
    };

    closeBtn.onclick = () => { closeDialog(); onBatal(); };
    cancelBtn.onclick = () => { closeDialog(); onBatal(); };
    confirmBtn.onclick = () => { closeDialog(); onSetuju(); };
  },

  peringatanAnomali({
    judul = 'Periksa Kembali Pengukuran',
    pesan = '',
    onPerbaiki = () => {},
    onTetapSimpan = () => {}
  }) {
    const existing = document.getElementById('posyanduAnomalyDialog');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.id = 'posyanduAnomalyDialog';
    backdrop.className = 'modal fade show';
    backdrop.style.display = 'block';
    backdrop.style.backgroundColor = 'rgba(24, 59, 50, 0.4)';
    backdrop.setAttribute('tabindex', '-1');
    backdrop.setAttribute('role', 'dialog');

    backdrop.innerHTML = `
      <div class="modal-dialog modal-dialog-centered modal-dialog-posyandu" style="max-width: 480px;">
        <div class="modal-content modal-content-posyandu">
          <div class="modal-header modal-header-posyandu bg-warning-soft border-warning-border">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-exclamation-circle-fill text-warning" style="font-size: 1.25rem;"></i>
              <h5 class="modal-title modal-title-posyandu text-warning-text mb-0">${judul}</h5>
            </div>
          </div>
          <div class="modal-body modal-body-posyandu">
            <p class="mb-2 text-ink-800 font-medium">${pesan}</p>
            <p class="mb-0 text-muted-posyandu" style="font-size: 0.8125rem;">
              Sistem mendeteksi selisih yang tidak biasa dibandingkan catatan bulan lalu. Silakan periksa kembali angka pada alat ukur.
            </p>
          </div>
          <div class="modal-footer modal-footer-posyandu">
            <button type="button" class="btn-posyandu-primary btn-sm btn-perbaiki">
              <i class="bi bi-pencil-square"></i> Perbaiki Angka
            </button>
            <button type="button" class="btn-posyandu-secondary btn-sm btn-tetap-simpan">
              Tetap Simpan
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const perbaikiBtn = backdrop.querySelector('.btn-perbaiki');
    const tetapSimpanBtn = backdrop.querySelector('.btn-tetap-simpan');

    const closeDialog = () => {
      backdrop.classList.remove('show');
      setTimeout(() => backdrop.remove(), 150);
    };

    perbaikiBtn.onclick = () => {
      closeDialog();
      onPerbaiki();
    };

    tetapSimpanBtn.onclick = () => {
      closeDialog();
      onTetapSimpan();
    };
  }
};

window.Dialog = Dialog;
