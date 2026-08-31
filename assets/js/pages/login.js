
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const inputUsername = document.getElementById('inputUsername');
  const inputPassword = document.getElementById('inputPassword');
  const alertContainer = document.getElementById('loginAlert');
  const submitBtn = document.getElementById('btnSubmitLogin');

  const demoChips = document.querySelectorAll('.js-demo-chip');
  demoChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const u = chip.getAttribute('data-user');
      const p = chip.getAttribute('data-pass');
      if (inputUsername && inputPassword) {
        inputUsername.value = u;
        inputPassword.value = p;
        if (alertContainer) alertContainer.style.display = 'none';
        inputUsername.focus();
      }
    });
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = inputUsername.value.trim();
      const password = inputPassword.value.trim();

      if (!username || !password) {
        tampilkanPesanError('Silakan isi nama pengguna dan kata sandi.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Memeriksa...';

      try {
        const hasil = await AuthService.masuk(username, password);

        if (hasil.success) {
          Toast.sukses(`Selamat datang kembali, ${hasil.user.sapaan || hasil.user.nama}!`);
          setTimeout(() => {
            window.location.href = AuthService.dapatkanRedirectUrl(hasil.user.peran);
          }, 400);
        } else {
          tampilkanPesanError(hasil.message);
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> Masuk';
        }
      } catch (err) {
        console.error('Error login:', err);
        tampilkanPesanError('Terjadi gangguan saat memproses login. Silakan coba lagi.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> Masuk';
      }
    });
  }

  function tampilkanPesanError(pesan) {
    if (alertContainer) {
      alertContainer.textContent = pesan;
      alertContainer.style.display = 'block';
    } else {
      Toast.gagal(pesan);
    }
  }
});
