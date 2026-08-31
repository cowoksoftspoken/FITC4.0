document.addEventListener('DOMContentLoaded', () => {
  setupBeritaEdukasiModal();
});

function setupBeritaEdukasiModal() {
  const itemCards = document.querySelectorAll('.js-open-berita');
  const modalEl = document.getElementById('modalDetailBerita');
  if (!modalEl) return;

  const beritaList = Storage.ambil('berita', window.MOCK_BERITA || []);

  itemCards.forEach(card => {
    card.addEventListener('click', () => {
      const beritaId = card.getAttribute('data-id');
      const item = beritaList.find(b => b.id === beritaId);
      if (!item) return;

      const tagEl = document.getElementById('modalBeritaKategori');
      const judulEl = document.getElementById('modalBeritaJudul');
      const metaEl = document.getElementById('modalBeritaMeta');
      const isiEl = document.getElementById('modalBeritaIsi');

      if (tagEl) tagEl.textContent = item.kategori;
      if (judulEl) judulEl.textContent = item.judul;
      if (metaEl) metaEl.textContent = `${item.penulis || 'Posyandu Pintar'} · ${item.tanggal} · ${item.waktuBaca}`;
      if (isiEl) isiEl.innerHTML = item.isi;

      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      bsModal.show();
    });
  });
}
