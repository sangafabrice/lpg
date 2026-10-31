/* =============================================
   ARC-EN-CIEL CM — JavaScript Principal
   Magazine Web LGBTQ+ Cameroun
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     NAV — Scroll Effect & Hamburger Menu
     ============================================= */
  const nav = document.querySelector('.nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  // Sticky nav shadow on scroll
  const handleNavScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on backdrop click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* =============================================
     SCROLL REVEAL ANIMATION
     ============================================= */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  reveals.forEach(el => revealObserver.observe(el));

  /* =============================================
     TICKER — Duplication for seamless loop
     ============================================= */
  const tickerInner = document.querySelector('.ticker__inner');
  if (tickerInner) {
    const clone = tickerInner.cloneNode(true);
    tickerInner.parentElement.appendChild(clone);
  }

  /* =============================================
     NEWSLETTER FORM
     ============================================= */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter__input');
      const btn = newsletterForm.querySelector('.newsletter__submit');
      const email = input.value.trim();

      if (!email || !email.includes('@')) {
        input.style.borderColor = '#ff3d5a';
        input.style.boxShadow = '0 0 0 3px rgba(255,61,90,0.15)';
        setTimeout(() => {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        }, 2000);
        return;
      }

      // Success animation
      btn.textContent = '✓ Inscrit·e !';
      btn.style.background = 'linear-gradient(135deg, #06d6a0, #118ab2)';
      input.value = '';
      input.placeholder = 'Bienvenue dans la communauté ! 🏳️‍🌈';
      input.disabled = true;
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = "S'inscrire";
        btn.style.background = '';
        input.placeholder = 'votre@email.com';
        input.disabled = false;
        btn.disabled = false;
      }, 4000);
    });
  }

  /* =============================================
     ANIMATED COUNTER — Stats in Hero
     ============================================= */
  const counters = document.querySelectorAll('.hero__stat-number[data-target]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString('fr') + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('fr') + suffix;
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* =============================================
     ARTICLE CARDS — Hover magnetic effect
     ============================================= */
  const cards = document.querySelectorAll('.article-card, .droits__card, .story-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      card.style.transform = `translateY(-4px) rotateX(${-y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease';
    });
  });

  /* =============================================
     ORB PARALLAX — Hero background orbs
     ============================================= */
  const orbs = document.querySelectorAll('.hero__orb');
  if (orbs.length) {
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 15;
        orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
        orb.style.transition = 'transform 0.5s ease';
      });
    });
  }

  /* =============================================
     THEME — Easter egg: Konami code activates
     Rainbow mode
     ============================================= */
  const konamiCode = [38,38,40,40,37,39,37,39,66,65];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        document.body.classList.toggle('rainbow-mode');
        konamiIndex = 0;
        if (document.body.classList.contains('rainbow-mode')) {
          showToast('🏳️‍🌈 Mode Arc-en-Ciel activé ! Liberté & Fierté !');
        }
      }
    } else {
      konamiIndex = 0;
    }
  });

  /* =============================================
     TOAST NOTIFICATION
     ============================================= */
  function showToast(message, type = 'pride') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(10,6,18,0.95);
      border: 1px solid rgba(183,108,255,0.4);
      color: #f0ecff;
      padding: 1rem 1.5rem;
      border-radius: 9999px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      box-shadow: 0 8px 32px rgba(183,108,255,0.3);
      z-index: 9000;
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      backdrop-filter: blur(20px);
      white-space: nowrap;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
      });
    });

    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  /* =============================================
     SOS BANNER — Copy phone number
     ============================================= */
  const sosCta = document.querySelector('.sos-banner__cta');
  if (sosCta) {
    sosCta.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('+237 699 000 123').catch(() => {});
      showToast(`📞 Numéro copié ! Vous n'êtes pas seul·e.`);
    });
  }

  /* =============================================
     ACTIVE NAV LINK highlight on scroll
     ============================================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[data-section]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.dataset.section === id
            ? 'var(--color-text-primary)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

}); // end DOMContentLoaded

/* =============================================
   RAINBOW MODE — Easter Egg CSS injection
   ============================================= */
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
  .rainbow-mode * {
    animation-duration: 1s !important;
  }
  .rainbow-mode body {
    filter: hue-rotate(0deg);
    animation: hueRotate 4s linear infinite !important;
  }
  @keyframes hueRotate {
    to { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(rainbowStyle);
