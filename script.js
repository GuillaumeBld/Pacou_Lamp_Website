// Combined JavaScript for Website 3

// =============================
// Fullscreen Image Viewer Setup
// =============================
document.addEventListener('DOMContentLoaded', function() {
    // Create fullscreen overlay elements
    const fsOverlay = document.createElement('div');
    fsOverlay.className = 'fs-overlay';
    
    const fsContainer = document.createElement('div');
    fsContainer.className = 'fs-image-container';
    
    const fsCloseBtn = document.createElement('button');
    fsCloseBtn.className = 'fs-close-btn';
    fsCloseBtn.innerHTML = '&times;';
    fsCloseBtn.setAttribute('aria-label', 'Close fullscreen');
    
    const fsPrevBtn = document.createElement('button');
    fsPrevBtn.className = 'fs-nav-btn fs-prev-btn';
    fsPrevBtn.innerHTML = '&larr;';
    fsPrevBtn.setAttribute('aria-label', 'Previous image');
    
    const fsNextBtn = document.createElement('button');
    fsNextBtn.className = 'fs-nav-btn fs-next-btn';
    fsNextBtn.innerHTML = '&rarr;';
    fsNextBtn.setAttribute('aria-label', 'Next image');
    
    const fsImage = document.createElement('img');
    
    // Build overlay structure
    fsContainer.appendChild(fsImage);
    fsContainer.appendChild(fsCloseBtn);
    fsContainer.appendChild(fsPrevBtn);
    fsContainer.appendChild(fsNextBtn);
    fsOverlay.appendChild(fsContainer);
    document.body.appendChild(fsOverlay);
    
    // Track current image index and catalog images
    let currentImageIndex = 0;
    let imageElements = [];
    
    function initImageElements() {
      // Select images inside .lamp-image container
      imageElements = Array.from(document.querySelectorAll('.lamp-image img'));
    }
    
    function showFullscreen(index) {
      if (!imageElements.length) initImageElements();
      if (index < 0 || index >= imageElements.length) return;
      
      currentImageIndex = index;
      fsImage.src = imageElements[index].src;
      fsImage.alt = imageElements[index].alt || 'Fullscreen product image';
      fsOverlay.classList.add('active');
      document.body.classList.add('no-scroll');
    }
    
    function hideFullscreen() {
      fsOverlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
    
    function showNext() {
      showFullscreen((currentImageIndex + 1) % imageElements.length);
    }
    
    function showPrev() {
      showFullscreen((currentImageIndex - 1 + imageElements.length) % imageElements.length);
    }
    
    fsCloseBtn.addEventListener('click', hideFullscreen);
    fsPrevBtn.addEventListener('click', showPrev);
    fsNextBtn.addEventListener('click', showNext);
    
    document.addEventListener('keydown', function(e) {
      if (!fsOverlay.classList.contains('active')) return;
      switch(e.key) {
        case 'Escape':
          hideFullscreen();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'ArrowRight':
          showNext();
          break;
      }
    });
    
    fsOverlay.addEventListener('click', function(e) {
      if (e.target === fsOverlay) {
        hideFullscreen();
      }
    });
    
    function initCatalogImageHandlers() {
      initImageElements();
      imageElements.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => showFullscreen(index));
      });
    }
    
    if (document.querySelector('.lamp-carousel')) {
      // Delay a bit to ensure carousel slides are rendered
      setTimeout(initCatalogImageHandlers, 500);
    }
  });
  
  // =============================
  // Page Transition Setup
  // =============================
  const transitionElement = document.createElement('div');
  transitionElement.className = 'page-transition';
  document.body.appendChild(transitionElement);
  
  document.addEventListener('click', function(e) {
    if (
      e.target.tagName === 'A' &&
      e.target.href &&
      !e.target.href.includes('#') &&
      !e.target.href.includes('javascript:') &&
      !e.target.href.includes('mailto:')
    ) {
      e.preventDefault();
      
      transitionElement.classList.add('active');
      
      const isContactPage = e.target.href.includes('contact.html');
      if (isContactPage) {
        // Preload style and script if heading to contact page
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = 'style.css';
        document.head.appendChild(link);
        
        const scriptLink = document.createElement('link');
        scriptLink.rel = 'preload';
        scriptLink.href = 'script.js';
        document.head.appendChild(scriptLink);
      }
      
      setTimeout(() => {
        if (isContactPage) {
          setTimeout(() => {
            window.location.href = e.target.href;
          }, 150);
        } else {
          window.location.href = e.target.href;
        }
      }, isContactPage ? 350 : 300);
    }
  });
  
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
  // =============================
  // Utility: Get URL Parameter
  // =============================
  function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  // =============================
  // Navigation & Bottom Nav Logic
  // =============================
  document.addEventListener('DOMContentLoaded', async function() {
    const desktopNav = document.querySelector('nav:not(.mobile-nav):not(.mobile-bottom-nav)');
    const desktopNavLinks = desktopNav ? desktopNav.querySelectorAll('a') : [];
    const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Bottom nav ripple effect
    bottomNavItems.forEach(item => {
      const itemHref = item.getAttribute('href');
      if (itemHref === currentPage) {
        item.classList.add('active');
      }
      item.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
    
    // Desktop nav: smooth scroll for anchor links and active highlighting
    if (desktopNavLinks.length > 0) {
      desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
              });
              desktopNavLinks.forEach(lnk => lnk.classList.remove('active'));
              this.classList.add('active');
            }
          }
        });
      });
    
      function highlightDesktopNavOnScroll() {
        if (window.innerWidth > 768) {
          const scrollPosition = window.scrollY;
          const sections = document.querySelectorAll('main section[id]');
          let currentSectionId = null;
          sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              currentSectionId = section.getAttribute('id');
            }
          });
          desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (currentSectionId && linkHref === `#${currentSectionId}`) {
              link.classList.add('active');
            } else if (!linkHref.includes('#') && linkHref === currentPage) {
              link.classList.add('active');
            }
          });
          if (scrollPosition < 100 && (currentPage === 'index.html' || currentPage === '')) {
            desktopNavLinks.forEach(link => {
              if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#home') {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        } else {
          desktopNavLinks.forEach(link => link.classList.remove('active'));
        }
      }
      window.addEventListener('scroll', highlightDesktopNavOnScroll);
      highlightDesktopNavOnScroll();
    }
    
    // =============================
    // Product Loading & Catalog Logic
    // =============================
    if (document.querySelector('.lamp-carousel')) {
      const lampParam = getUrlParameter('lamp');
      if (lampParam) {
        const lampIndex = parseInt(lampParam) - 1;
        if (!isNaN(lampIndex) && lampIndex >= 0 && lampIndex < 8) {
          currentIndex = lampIndex;
          updateSlide();
        }
      }
    
      let products = [];
      try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        products = data.products;
        console.log('Loaded products:', products);
        // Populate catalog dynamically if needed
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
    
    // =============================
    // Intersection Observer for Fade-in Effects
    // =============================
    const fadeElements = document.querySelectorAll('.product-card, .hero-content, .creator-profile, .contact-section');
    if (fadeElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
    
      fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
      });
    }
    
    // =============================
    // Hide Hero Content on Scroll (Index Page Specific)
    // =============================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && (currentPage === 'index.html' || currentPage === '')) {
      window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (!header) return;
        const headerHeight = header.offsetHeight;
        const heroRect = heroContent.getBoundingClientRect();
        const opacity = Math.max(0, Math.min(1, (heroRect.top - headerHeight) / 50));
        heroContent.style.opacity = opacity;
        heroContent.style.pointerEvents = opacity === 0 ? 'none' : 'auto';
      });
    }
  });