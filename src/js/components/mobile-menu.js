const hamburger = document.getElementById('hamburger');
const headerNav = document.getElementById('header-nav');


hamburger.addEventListener('click', () => {
  headerNav.classList.add('active');
});
