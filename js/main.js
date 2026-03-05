/* ============================================
   French Tourism Website — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Navigation Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.createElement('div');
  navOverlay.classList.add('nav-overlay');
  navOverlay.style.cssText = `
    position: fixed; inset: 0; z-index: 999;
    background: rgba(0,0,0,0.4); opacity: 0;
    pointer-events: none; transition: opacity 0.3s ease;
  `;
  document.body.appendChild(navOverlay);

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    navOverlay.style.opacity = isOpen ? '1' : '0';
    navOverlay.style.pointerEvents = isOpen ? 'auto' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
    
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);
  }

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  
  function handleScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check initial state

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll-Triggered Animations (Intersection Observer) ----
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Counter animation for stat numbers ----
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = target.textContent;
          const numericPart = parseInt(finalValue.replace(/[^0-9]/g, ''));
          const suffix = finalValue.replace(/[0-9]/g, '');
          
          if (!isNaN(numericPart)) {
            let current = 0;
            const increment = Math.ceil(numericPart / 50);
            const timer = setInterval(() => {
              current += increment;
              if (current >= numericPart) {
                current = numericPart;
                clearInterval(timer);
              }
              target.textContent = current + suffix;
            }, 30);
          }
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }
});
