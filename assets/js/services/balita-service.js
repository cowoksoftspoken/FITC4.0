
const BalitaService = {

  async ambilSemua(filter = {}) {
    await new Promise(resolve => setTimeout(resolve, 150));
    let list = Storage.ambil('balita', window.MOCK_BALITA || []);

    if (filter.hanyaAktif !== false) {
      list = list.filter(b => b.aktif !== false);
    }

    if (filter.dusun && filter.dusun !== 'semua') {
      list = list.filter(b => b.dusun.toLowerCase() === filter.dusun.toLowerCase());
    }

    if (filter.status && filter.status !== 'semua') {
      list = list.filter(b => b.statusTerakhir === filter.status);
    }

    if (filter.belumDiukurBulanIni === true) {
      list = list.filter(b => b.sudahDiukurBulanIni === false);
    }

    if (filter.cari && filter.cari.trim() !== '') {
      const q = filter.cari.trim().toLowerCase();
      list = list.filter(b => 
        b.nama.toLowerCase().includes(q) ||
        (b.namaOrangTua && b.namaOrangTua.toLowerCase().includes(q)) ||
        (b.nik && b.nik.includes(q))
      );
    }

    return list;
  },

  async ambilDetail(id) {
    await new Promise(resolve => setTimeout(resolve, 100));
    const list = Storage.ambil('balita', window.MOCK_BALITA || []);
    return list.find(b => b.id === id) || null;
  },

  async tambah(payload) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const list = Storage.ambil('balita', window.MOCK_BALITA || []);

    const newId = 'blt_' + Date.now().toString(36);
    const newBalita = {
      id: newId,
      nik: payload.nik || '',
      nama: payload.nama.trim(),
      tanggalLahir: payload.tanggalLahir,
      jenisKelamin: payload.jenisKelamin, 
      namaOrangTua: payload.namaOrangTua.trim(),
      namaAyah: payload.namaAyah ? payload.namaAyah.trim() : payload.namaOrangTua.trim(),
      dusun: payload.dusun,
      alamat: payload.alamat || '',
      aktif: true,
      statusTerakhir: 'normal',
      beratTerakhir: null,
      tinggiTerakhir: null,
      perubahanBb: '0.0',
      tanggalUkurTerakhir: null,
      sudahDiukurBulanIni: false,
      catatan: payload.catatan || 'Data baru terdaftar.'
    };

    list.unshift(newBalita);
    Storage.simpan('balita', list);

    this._tambahAktivitas(`Data balita baru atas nama ${newBalita.nama} berhasil ditambahkan.`);

    return { success: true, data: newBalita };
  },

  async ubah(id, payload) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const list = Storage.ambil('balita', window.MOCK_BALITA || []);
    const idx = list.findIndex(b => b.id === id);

    if (idx === -1) {
      return { success: false, message: 'Data balita tidak ditemukan.' };
    }

    list[idx] = {
      ...list[idx],
      ...payload
    };

    Storage.simpan('balita', list);
    this._tambahAktivitas(`Data balita ${list[idx].nama} diperbarui.`);

    return { success: true, data: list[idx] };
  },

  async nonaktifkan(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const list = Storage.ambil('balita', window.MOCK_BALITA || []);
    const idx = list.findIndex(b => b.id === id);

    if (idx === -1) {
      return { success: false, message: 'Data balita tidak ditemukan.' };
    }

    list[idx].aktif = false;
    Storage.simpan('balita', list);
    this._tambahAktivitas(`Data balita ${list[idx].nama} telah dinonaktifkan.`);

    return { success: true, message: `Data ${list[idx].nama} berhasil dinonaktifkan.` };
  },

  hitungUmur(tanggalLahir, tanggalPatokanStr = null) {
    if (!tanggalLahir) return { bulanTotal: 0, teks: '-' };

    const tglLahir = new Date(tanggalLahir);
    const tglPatokan = tanggalPatokanStr ? new Date(tanggalPatokanStr) : new Date();

    let tahun = tglPatokan.getFullYear() - tglLahir.getFullYear();
    let bulan = tglPatokan.getMonth() - tglLahir.getMonth();

    if (bulan < 0 || (bulan === 0 && tglPatokan.getDate() < tglLahir.getDate())) {
      tahun--;
      bulan += 12;
    }

    const bulanTotal = (tahun * 12) + bulan;

    let teks = '';
    if (tahun > 0) {
      teks = `${tahun} tahun ${bulan > 0 ? bulan + ' bulan' : ''}`.trim();
    } else {
      teks = `${bulanTotal} bulan`;
    }

    return {
      bulanTotal: Math.max(0, bulanTotal),
      teks: teks || '0 bulan',
      teksSingkat: tahun > 0 ? `${tahun} th ${bulan} bln` : `${bulanTotal} bln`
    };
  },

  _tambahAktivitas(teks) {
    const list = Storage.ambil('aktivitas', window.MOCK_AKTIVITAS || []);
    const now = new Date();
    const jam = String(now.getHours()).padStart(2, '0');
    const menit = String(now.getMinutes()).padStart(2, '0');

    list.unshift({
      waktu: `${jam}:${menit}`,
      tanggal: 'Hari ini',
      teks: teks
    });

    if (list.length > 20) list.pop();
    Storage.simpan('aktivitas', list);
  }
};

window.BalitaService = BalitaService;
