const playVideoBtn = document.querySelectorAll('[data-video-play]');

playVideoBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const videoBox = btn.closest('[data-video-box]');
    const overlay = videoBox.querySelector('[data-video-overlay]');
    overlay.remove();
  });
});


