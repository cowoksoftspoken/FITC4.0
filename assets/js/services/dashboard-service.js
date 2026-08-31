
const DashboardService = {

  async ringkasanKader(filterDusun = null) {
    await new Promise(resolve => setTimeout(resolve, 150));
    let balitaList = Storage.ambil('balita', window.MOCK_BALITA || []);
    balitaList = balitaList.filter(b => b.aktif !== false);

    if (filterDusun && filterDusun !== 'semua') {
      balitaList = balitaList.filter(b => b.dusun.toLowerCase() === filterDusun.toLowerCase());
    }

    const totalAnak = balitaList.length;
    const sudahDiukurList = balitaList.filter(b => b.sudahDiukurBulanIni === true);
    const belumDiukurList = balitaList.filter(b => b.sudahDiukurBulanIni === false);
    const perhatianList = balitaList.filter(b => b.statusTerakhir === 'pemantauan' || b.statusTerakhir === 'prioritas');

    return {
      totalAnak,
      sudahDiukur: sudahDiukurList.length,
      belumDiukur: belumDiukurList.length,
      perluPerhatian: perhatianList.length,
      daftarBelumDitimbang: belumDiukurList,
      daftarPerhatian: perhatianList
    };
  },

  async ringkasanBidan() {
    await new Promise(resolve => setTimeout(resolve, 150));
    const balitaList = Storage.ambil('balita', window.MOCK_BALITA || []).filter(b => b.aktif !== false);
    const pengukuranList = Storage.ambil('pengukuran', window.MOCK_PENGUKURAN || []);
    const aktivitasList = Storage.ambil('aktivitas', window.MOCK_AKTIVITAS || []);

    const totalBalita = balitaList.length;
    const diukurBulanIni = balitaList.filter(b => b.sudahDiukurBulanIni === true).length;
    const perluPemantauanList = balitaList.filter(b => b.statusTerakhir === 'pemantauan');
    const prioritasBidanList = balitaList.filter(b => b.statusTerakhir === 'prioritas');

    const daftarPrioritas = [...prioritasBidanList, ...perluPemantauanList].slice(0, 5);

    const dusunList = ['Sukamaju', 'Melati', 'Harapan', 'Karangrejo'];
    const chartDusun = {
      labels: dusunList,
      normal: dusunList.map(d => balitaList.filter(b => b.dusun === d && b.statusTerakhir === 'normal').length),
      pemantauan: dusunList.map(d => balitaList.filter(b => b.dusun === d && b.statusTerakhir === 'pemantauan').length),
      prioritas: dusunList.map(d => balitaList.filter(b => b.dusun === d && b.statusTerakhir === 'prioritas').length)
    };

    const chartCakupan = {
      labels: ['Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus'],
      target: [16, 16, 16, 16, 16, 16],
      realisasi: [14, 15, 16, 15, 16, diukurBulanIni]
    };

    return {
      totalBalita,
      diukurBulanIni,
      perluPemantauan: perluPemantauanList.length,
      prioritasBidan: prioritasBidanList.length,
      daftarPrioritas,
      chartDusun,
      chartCakupan,
      aktivitasTerbaru: aktivitasList.slice(0, 5)
    };
  },

  async ringkasanAdmin() {
    await new Promise(resolve => setTimeout(resolve, 150));
    const balitaList = Storage.ambil('balita', window.MOCK_BALITA || []);
    const usersList = Storage.ambil('users', window.MOCK_USERS || []);
    const pengukuranList = Storage.ambil('pengukuran', window.MOCK_PENGUKURAN || []);
    const aktivitasList = Storage.ambil('aktivitas', window.MOCK_AKTIVITAS || []);

    const totalBalitaAktif = balitaList.filter(b => b.aktif !== false).length;
    const totalPenggunaAktif = usersList.length;
    const pengukuranBulanIni = balitaList.filter(b => b.sudahDiukurBulanIni === true).length;
    const dusunTerlayani = 4;

    const catatanPerluPerbaikan = [];
    balitaList.forEach(b => {
      if (!b.tanggalUkurTerakhir) {
        catatanPerluPerbaikan.push({
          balita: b.nama,
          dusun: b.dusun,
          isu: 'Belum memiliki riwayat penimbangan sejak terdaftar.'
        });
      }
      if (!b.nik || b.nik.length < 16) {
        catatanPerluPerbaikan.push({
          balita: b.nama,
          dusun: b.dusun,
          isu: 'Format NIK belum lengkap 16 digit.'
        });
      }
    });

    return {
      totalBalitaAktif,
      totalPenggunaAktif,
      pengukuranBulanIni,
      dusunTerlayani,
      catatanPerluPerbaikan: catatanPerluPerbaikan.slice(0, 4),
      aktivitasTerbaru: aktivitasList.slice(0, 6)
    };
  }
};

window.DashboardService = DashboardService;
