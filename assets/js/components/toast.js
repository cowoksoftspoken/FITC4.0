
const Toast = {
  _getContainer() {
    let container = document.getElementById('posyanduToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'posyanduToastContainer';
      container.className = 'posyandu-toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
    return container;
  },

  tampilkan(pesan, tipe = 'success', durasi = 3500) {
    const container = this._getContainer();

    const toast = document.createElement('div');
    toast.className = `posyandu-toast posyandu-toast-${tipe}`;
    toast.setAttribute('role', 'alert');

    let iconClass = 'bi-check-circle-fill';
    if (tipe === 'danger') iconClass = 'bi-exclamation-triangle-fill';
    if (tipe === 'warning') iconClass = 'bi-exclamation-circle-fill';
    if (tipe === 'info') iconClass = 'bi-info-circle-fill';

    toast.innerHTML = `
      <i class="bi ${iconClass}"></i>
      <span class="toast-message">${pesan}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, durasi);
  },

  sukses(pesan) { this.tampilkan(pesan, 'success'); },
  gagal(pesan) { this.tampilkan(pesan, 'danger'); },
  peringatan(pesan) { this.tampilkan(pesan, 'warning'); },
  info(pesan) { this.tampilkan(pesan, 'info'); }
};

window.Toast = Toast;
