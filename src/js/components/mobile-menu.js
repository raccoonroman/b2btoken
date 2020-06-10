const hamburger = document.getElementById('hamburger');
const headerNav = document.getElementById('header-nav');
const closeMenuBtn = document.getElementById('header-close');

hamburger.addEventListener('click', () => {
  headerNav.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
  headerNav.classList.remove('active');
});
