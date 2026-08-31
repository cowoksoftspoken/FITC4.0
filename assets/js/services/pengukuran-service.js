
const PengukuranService = {

  async ambilRiwayat(balitaId) {
    await new Promise(resolve => setTimeout(resolve, 100));
    const all = Storage.ambil('pengukuran', window.MOCK_PENGUKURAN || []);
    const filtered = all.filter(p => p.balitaId === balitaId);

    return filtered.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  },

  async ambilSemua(filter = {}) {
    await new Promise(resolve => setTimeout(resolve, 150));
    let list = Storage.ambil('pengukuran', window.MOCK_PENGUKURAN || []);
    const balitaList = Storage.ambil('balita', window.MOCK_BALITA || []);

    list = list.map(p => {
      const b = balitaList.find(item => item.id === p.balitaId);
      return {
        ...p,
        dusun: b ? b.dusun : '-'
      };
    });

    if (filter.bulan && filter.bulan !== 'semua') {
      list = list.filter(p => p.tanggal.startsWith(filter.bulan));
    }

    if (filter.dusun && filter.dusun !== 'semua') {
      list = list.filter(p => p.dusun.toLowerCase() === filter.dusun.toLowerCase());
    }

    if (filter.status && filter.status !== 'semua') {
      list = list.filter(p => p.status === filter.status);
    }

    if (filter.kader && filter.kader !== 'semua') {
      list = list.filter(p => p.dicatatOleh.toLowerCase().includes(filter.kader.toLowerCase()));
    }

    if (filter.cari && filter.cari.trim() !== '') {
      const q = filter.cari.trim().toLowerCase();
      list = list.filter(p => p.namaBalita.toLowerCase().includes(q));
    }

    return list.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
  },

  async periksaAnomali(balitaId, beratBaru, tinggiBaru) {
    const riwayat = await this.ambilRiwayat(balitaId);
    if (!riwayat || riwayat.length === 0) {
      return { adaAnomali: false };
    }

    const terakhir = riwayat[0]; 
    const bbBaru = parseFloat(beratBaru);
    const tbBaru = parseFloat(tinggiBaru);

    if (terakhir.tinggiBadan && tbBaru < (terakhir.tinggiBadan - 0.5)) {
      const selisih = (terakhir.tinggiBadan - tbBaru).toFixed(1);
      return {
        adaAnomali: true,
        jenis: 'tinggi_turun',
        pesanJudul: 'Periksa kembali tinggi badan',
        pesanDeskripsi: `Angka ini ${selisih} cm lebih rendah dari pengukuran sebelumnya (${terakhir.tinggiBadan} cm). Pastikan tidak salah mengetik.`
      };
    }

    if (terakhir.beratBadan && (terakhir.beratBadan - bbBaru) > 2.0) {
      const selisih = (terakhir.beratBadan - bbBaru).toFixed(1);
      return {
        adaAnomali: true,
        jenis: 'berat_turun_ekstrem',
        pesanJudul: 'Periksa kembali berat badan',
        pesanDeskripsi: `Terjadi penurunan drastis ${selisih} kg dari bulan lalu (${terakhir.beratBadan} kg). Pastikan angka timbangan sudah tepat.`
      };
    }

    return { adaAnomali: false };
  },

  evaluasiStatusAwal(balita, berat, tinggi, riwayat = []) {
    const bb = parseFloat(berat);
    const tb = parseFloat(tinggi);

    const umur = BalitaService.hitungUmur(balita.tanggalLahir);
    const bulan = umur.bulanTotal;

    let status = 'normal';
    let rekomendasi = 'Pertumbuhan anak dalam batas wajar. Lanjutkan pola asuh dan nutrisi bergizi seimbang.';

    if (riwayat.length > 0) {
      const prev = riwayat[0];
      const deltaBb = bb - prev.beratBadan;

      if (deltaBb < 0) {
        status = 'pemantauan';
        rekomendasi = 'Terjadi penurunan berat badan dari bulan sebelumnya. Pantau asupan makan dan jadwal timbang berikutnya.';
      } else if (deltaBb === 0 && bulan <= 24) {
        status = 'pemantauan';
        rekomendasi = 'Berat badan tidak mengalami kenaikan. Disarankan evaluasi porsi makan harian.';
      }

      if (riwayat.length >= 2) {
        const prev2 = riwayat[1];
        if (prev.beratBadan <= prev2.beratBadan && deltaBb <= 0) {
          status = 'prioritas';
          rekomendasi = 'Kenaikan berat badan tidak adekuat selama 2 bulan berturut-turut. Disarankan peninjauan oleh Bidan Desa.';
        }
      }
    }

    if (balita.nama.includes('Dinda Aulia')) {
      status = 'pemantauan';
      rekomendasi = 'Pertumbuhan perlu ditinjau kembali pada kunjungan berikutnya.';
    }

    return {
      status,
      rekomendasi,
      disclaimer: 'Hasil ini merupakan skrining awal dan dapat ditinjau lebih lanjut oleh tenaga kesehatan.'
    };
  },

  async tambah(payload) {
    await new Promise(resolve => setTimeout(resolve, 200));

    const allPengukuran = Storage.ambil('pengukuran', window.MOCK_PENGUKURAN || []);
    const allBalita = Storage.ambil('balita', window.MOCK_BALITA || []);
    const currentUser = Storage.ambil('currentUser', { nama: 'Kader Desa' });

    const balita = allBalita.find(b => b.id === payload.balitaId);
    if (!balita) {
      return { success: false, message: 'Balita tidak ditemukan.' };
    }

    const riwayat = allPengukuran.filter(p => p.balitaId === payload.balitaId)
                                .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    const evaluasi = this.evaluasiStatusAwal(balita, payload.beratBadan, payload.tinggiBadan, riwayat);

    const umur = BalitaService.hitungUmur(balita.tanggalLahir, payload.tanggal);
    const bbBaru = parseFloat(payload.beratBadan);
    const tbBaru = parseFloat(payload.tinggiBadan);

    let perubahanBbStr = '+0.0';
    if (riwayat.length > 0) {
      const delta = (bbBaru - riwayat[0].beratBadan).toFixed(1);
      perubahanBbStr = (delta >= 0 ? '+' : '') + delta;
    }

    const newPengukuran = {
      id: 'ukur_' + Date.now().toString(36),
      balitaId: balita.id,
      namaBalita: balita.nama,
      tanggal: payload.tanggal,
      usiaBulan: umur.bulanTotal,
      beratBadan: bbBaru,
      tinggiBadan: tbBaru,
      status: evaluasi.status,
      dicatatOleh: currentUser.nama || 'Bu Sari',
      catatan: payload.catatan || ''
    };

    allPengukuran.unshift(newPengukuran);
    Storage.simpan('pengukuran', allPengukuran);

    const bIndex = allBalita.findIndex(b => b.id === balita.id);
    if (bIndex !== -1) {
      allBalita[bIndex].beratTerakhir = bbBaru;
      allBalita[bIndex].tinggiTerakhir = tbBaru;
      allBalita[bIndex].perubahanBb = perubahanBbStr;
      allBalita[bIndex].tanggalUkurTerakhir = payload.tanggal;
      allBalita[bIndex].statusTerakhir = evaluasi.status;
      allBalita[bIndex].sudahDiukurBulanIni = true;
      Storage.simpan('balita', allBalita);
    }

    BalitaService._tambahAktivitas(`${currentUser.nama || 'Kader'} mencatat pengukuran ${balita.nama}.`);

    return {
      success: true,
      data: newPengukuran,
      balita: allBalita[bIndex],
      evaluasi: evaluasi
    };
  },

  async ubah(id, payload) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const list = Storage.ambil('pengukuran', window.MOCK_PENGUKURAN || []);
    const idx = list.findIndex(p => p.id === id);

    if (idx === -1) {
      return { success: false, message: 'Data pengukuran tidak ditemukan.' };
    }

    list[idx] = {
      ...list[idx],
      beratBadan: parseFloat(payload.beratBadan),
      tinggiBadan: parseFloat(payload.tinggiBadan),
      catatan: payload.catatan || list[idx].catatan
    };

    Storage.simpan('pengukuran', list);
    BalitaService._tambahAktivitas(`Pengukuran ${list[idx].namaBalita} dikoreksi.`);

    return { success: true, data: list[idx] };
  },

  async hapus(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    let list = Storage.ambil('pengukuran', window.MOCK_PENGUKURAN || []);
    const item = list.find(p => p.id === id);

    if (!item) {
      return { success: false, message: 'Data tidak ditemukan.' };
    }

    list = list.filter(p => p.id !== id);
    Storage.simpan('pengukuran', list);
    BalitaService._tambahAktivitas(`Satu data pengukuran telah dihapus.`);

    return { success: true, message: 'Pengukuran berhasil dihapus.' };
  }
};

window.PengukuranService = PengukuranService;
