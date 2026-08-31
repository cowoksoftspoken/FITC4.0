document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const artikelId = urlParams.get('id') || 'news_01';

  const beritaList = Storage.ambil('berita', window.MOCK_BERITA || []);
  const artikel = beritaList.find(b => b.id === artikelId) || beritaList[0];

  if (!artikel) {
    window.location.href = '../../index.html';
    return;
  }

  document.title = `${artikel.judul} — Posyandu Pintar`;

  const katEl = document.getElementById('detailKategori');
  const judEl = document.getElementById('detailJudul');
  const penEl = document.getElementById('detailPenulis');
  const tglEl = document.getElementById('detailTanggal');
  const wktEl = document.getElementById('detailWaktuBaca');
  const gbrEl = document.getElementById('detailGambar');
  const isiEl = document.getElementById('detailIsi');

  if (katEl) katEl.textContent = artikel.kategori;
  if (judEl) judEl.textContent = artikel.judul;
  if (penEl) penEl.textContent = artikel.penulis || 'Posyandu Pintar';
  if (tglEl) tglEl.textContent = artikel.tanggal;
  if (wktEl) wktEl.textContent = artikel.waktuBaca;
  if (gbrEl) {
    gbrEl.src = artikel.gambar ? `../../${artikel.gambar}` : '../../assets/images/berita_vitamin_a.jpg';
    gbrEl.alt = artikel.judul;
  }
  if (isiEl) isiEl.innerHTML = artikel.isi;

  renderBeritaLain(beritaList, artikel.id);
});

function renderBeritaLain(list, currentId) {
  const container = document.getElementById('daftarBeritaLain');
  if (!container) return;

  const lain = list.filter(b => b.id !== currentId).slice(0, 4);

  let html = '';
  lain.forEach(item => {
    const imgPath = item.gambar ? `../../${item.gambar}` : '../../assets/images/berita_vitamin_a.jpg';
    html += `
      <a href="detail-berita.html?id=${item.id}" class="d-flex gap-3 text-decoration-none p-2 rounded-3 border-line bg-canvas-soft transition-base">
        <div style="width: 72px; height: 72px; min-width: 72px; border-radius: 8px; overflow: hidden;" class="border-line bg-surface">
          <img src="${imgPath}" alt="${item.judul}" class="w-100 h-100 object-fit-cover">
        </div>
        <div class="d-flex flex-column justify-content-center">
          <span class="font-xs text-green-brand fw-bold text-uppercase">${item.kategori}</span>
          <span class="font-sm fw-bold text-forest line-clamp-2" style="line-height: 1.3;">${item.judul}</span>
          <span class="font-xs text-ink-500 mt-1">${item.tanggal}</span>
        </div>
      </a>
    `;
  });

  container.innerHTML = html;
}
