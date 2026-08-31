
const AuthService = {

  async masuk(username, password) {

    await new Promise(resolve => setTimeout(resolve, 200));

    const users = Storage.ambil('users', window.MOCK_USERS || []);
    const user = users.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password.trim()
    );

    if (user) {

      const sessionUser = { ...user };
      delete sessionUser.password;
      Storage.simpan('currentUser', sessionUser);
      return { success: true, user: sessionUser };
    }

    return {
      success: false,
      message: 'Nama pengguna atau kata sandi tidak sesuai. Silakan coba lagi.'
    };
  },

  ambilPenggunaSaatIni() {
    return Storage.ambil('currentUser', null);
  },

  keluar() {
    Storage.hapus('currentUser');

    const isPagesDir = window.location.pathname.includes('/pages/');
    window.location.href = isPagesDir ? '../../login.html' : 'login.html';
  },

  cekAkses(peranDiizinkan = []) {
    const user = this.ambilPenggunaSaatIni();
    if (!user) {
      const isPagesDir = window.location.pathname.includes('/pages/');
      window.location.href = isPagesDir ? '../../login.html' : 'login.html';
      return null;
    }

    if (peranDiizinkan.length > 0 && !peranDiizinkan.includes(user.peran)) {

      window.location.href = this.dapatkanRedirectUrl(user.peran);
      return null;
    }

    return user;
  },

  dapatkanRedirectUrl(peran) {
    const isPagesDir = window.location.pathname.includes('/pages/');
    const base = isPagesDir ? '../' : 'pages/';

    switch (peran) {
      case 'kader':
        return base + 'kader/dashboard.html';
      case 'bidan':
        return base + 'bidan/dashboard.html';
      case 'admin':
        return base + 'admin/dashboard.html';
      default:
        return base + 'kader/dashboard.html';
    }
  }
};

window.AuthService = AuthService;
