const passwordItems = document.querySelectorAll('[data-form-password-item]');

passwordItems.forEach((passwordItem) => {
  const eyeBtn = passwordItem.querySelector('[data-eye-btn]');
  const passwordInput = passwordItem.querySelector('input[type="password"]');
  eyeBtn.addEventListener('click', () => {
    if (!eyeBtn.classList.contains('active')) {
      eyeBtn.classList.add('active');
      passwordInput.type = 'text';
    } else {
      eyeBtn.classList.remove('active');
      passwordInput.type = 'password';
    }
  });
});
