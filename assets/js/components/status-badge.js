
const StatusBadge = {

  render(status) {
    if (!status) {
      return `
        <span class="status-badge status-badge-neutral">
          <i class="bi bi-dash-circle"></i> Belum Ada Data
        </span>
      `;
    }

    const s = status.toLowerCase();

    if (s === 'normal') {
      return `
        <span class="status-badge status-badge-normal">
          <i class="bi bi-check-circle-fill"></i> Normal
        </span>
      `;
    }

    if (s === 'pemantauan' || s === 'perlu pemantauan') {
      return `
        <span class="status-badge status-badge-pemantauan">
          <i class="bi bi-exclamation-circle-fill"></i> Perlu Pemantauan
        </span>
      `;
    }

    if (s === 'prioritas' || s === 'prioritas bidan') {
      return `
        <span class="status-badge status-badge-prioritas">
          <i class="bi bi-exclamation-triangle-fill"></i> Prioritas Bidan
        </span>
      `;
    }

    return `
      <span class="status-badge status-badge-neutral">
        <i class="bi bi-info-circle"></i> ${status}
      </span>
    `;
  }
};

window.StatusBadge = StatusBadge;
