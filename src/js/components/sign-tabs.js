const signTabItems = document.querySelectorAll('.sign-box__tab-item');
const signForms = document.querySelectorAll('.sign-box__form');

signTabItems.forEach((tabItem) => {
  const tab = tabItem.querySelector('.sign-box__tab');

  tab.addEventListener('click', (evt) => {
    evt.preventDefault();
    const activeTabItem = document.querySelector('.sign-box__tab-item.active');
    if (activeTabItem !== tabItem) {
      const signType = evt.target.hash.substr(1);
      const currentForm = document.getElementById(signType);
      activeTabItem.classList.remove('active');
      tabItem.classList.add('active');
      signForms.forEach((form) => form.classList.remove('active'));
      currentForm.classList.add('active');
    }
  });
});
