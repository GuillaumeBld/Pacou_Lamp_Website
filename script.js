document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('page-transition');

  document.querySelectorAll('a[href]').forEach(link => {
    const url = new URL(link.href, window.location.href);
    if (url.origin === window.location.origin) {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.body.classList.add('page-transition');
        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      });
    }
  });
});

// Start with fade out
document.body.classList.add('page-transition');
