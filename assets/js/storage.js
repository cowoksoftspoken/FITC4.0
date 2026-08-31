
const Storage = {
  PREFIX: 'posyandu_pintar_',

  simpan(key, data) {
    try {
      const payload = JSON.stringify(data);
      localStorage.setItem(this.PREFIX + key, payload);
      return true;
    } catch (e) {
      console.error('[Storage.simpan] Gagal menyimpan:', e);
      return false;
    }
  },

  ambil(key, fallback = null) {
    try {
      const item = localStorage.getItem(this.PREFIX + key);
      if (!item) return fallback;
      return JSON.parse(item);
    } catch (e) {
      console.error('[Storage.ambil] Gagal mengambil data:', e);
      return fallback;
    }
  },

  hapus(key) {
    try {
      localStorage.removeItem(this.PREFIX + key);
      return true;
    } catch (e) {
      console.error('[Storage.hapus] Gagal menghapus:', e);
      return false;
    }
  },

  bersihkanSemua() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(k => {
        if (k.startsWith(this.PREFIX)) {
          localStorage.removeItem(k);
        }
      });
      return true;
    } catch (e) {
      console.error('[Storage.bersihkanSemua] Gagal membersihkan:', e);
      return false;
    }
  },

  inisialisasi(seedData = {}) {
    Object.keys(seedData).forEach(key => {
      if (!this.ambil(key)) {
        this.simpan(key, seedData[key]);
      }
    });
  }
};

window.Storage = Storage;
