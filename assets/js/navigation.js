
const Navigation = {

  tandaiMenuAktif() {
    const currentPath = window.location.pathname.toLowerCase();

    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const hrefFile = href.split('/').pop().toLowerCase();
        if (currentPath.endsWith(hrefFile)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });

    const mobileLinks = document.querySelectorAll('.nav-kader-item');
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const hrefFile = href.split('/').pop().toLowerCase();
        if (currentPath.endsWith(hrefFile)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  },

  setupMobileToggle() {
    const toggleBtn = document.getElementById('btnToggleSidebar');
    const sidebar = document.querySelector('.app-sidebar');

    if (toggleBtn && sidebar) {
      toggleBtn.onclick = () => {
        sidebar.classList.toggle('sidebar-open');
      };

      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('sidebar-open')) {
          sidebar.classList.remove('sidebar-open');
        }
      });
    }
  },

  init() {
    this.tandaiMenuAktif();
    this.setupMobileToggle();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});

window.Navigation = Navigation;
