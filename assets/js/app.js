
const App = {

  formatTanggal(dateStr, singkat = false) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    const bulanPanjang = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const bulanSingkat = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];

    const tgl = d.getDate();
    const bln = singkat ? bulanSingkat[d.getMonth()] : bulanPanjang[d.getMonth()];
    const thn = d.getFullYear();

    return `${tgl} ${bln} ${thn}`;
  },

  formatTanggalHari(date = new Date()) {
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulanPanjang = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const namaHari = hari[date.getDay()];
    const tgl = date.getDate();
    const bln = bulanPanjang[date.getMonth()];
    const thn = date.getFullYear();

    return `${namaHari}, ${tgl} ${bln} ${thn}`;
  },

  inisialisasiUserWidget() {
    const user = AuthService.ambilPenggunaSaatIni();
    if (!user) return;

    const userNameElements = document.querySelectorAll('.js-user-name');
    userNameElements.forEach(el => el.textContent = user.sapaan || user.nama);

    const userRoleElements = document.querySelectorAll('.js-user-role');
    userRoleElements.forEach(el => {
      const peranStr = user.peran === 'kader' ? `Kader · ${user.dusun}` : (user.peran === 'bidan' ? 'Bidan Desa' : 'Admin Posyandu');
      el.textContent = peranStr;
    });

    const userAvatarElements = document.querySelectorAll('.js-user-avatar');
    userAvatarElements.forEach(el => {
      const inisial = user.nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      el.textContent = inisial;
    });

    const logoutBtns = document.querySelectorAll('.js-btn-logout');
    logoutBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        Dialog.konfirmasi({
          judul: 'Keluar dari Sistem?',
          pesan: 'Anda akan keluar dari akun saat ini dan kembali ke halaman masuk.',
          teksSetuju: 'Ya, Keluar',
          tipeBahaya: false,
          onSetuju: () => {
            AuthService.keluar();
          }
        });
      };
    });
  },

  chartDefaults: {
    fontFamily: 'Plus Jakarta Sans',
    textColor: '#69766F',
    gridColor: '#E6F1EC',
    tooltipBg: '#183B32'
  },

  init() {
    this.inisialisasiUserWidget();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;
