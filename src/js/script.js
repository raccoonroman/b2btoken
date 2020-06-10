var hamburger = document.querySelector("#hamburger");
var headerNav = document.querySelector('#header-nav');


hamburger.addEventListener('click', function() {
  headerNav.classList.add('active');
});
