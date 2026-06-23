/* ============================================================
   M. VISHAL KUMAR — Portfolio Script
   ============================================================ */

'use strict';

if (typeof window === 'undefined' || typeof document === 'undefined') {
  module.exports = {};
} else {

/* ── STAR CANVAS ──────────────────────────────────────────── */
(function initStars() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function Star() {
    this.reset();
  }
  Star.prototype.reset = function() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.r     = Math.random() * 1.5 + 0.3;
    this.alpha = Math.random() * 0.6 + 0.1;
    this.speed = Math.random() * 0.18 + 0.04;
    this.drift = (Math.random() - 0.5) * 0.08;
  };

  for (let i = 0; i < 160; i++) stars.push(new Star());

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    stars.forEach(s => {
      // parallax nudge toward mouse
      const dx = mouse.x - s.x;
      const dy = mouse.y - s.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1 - dist / 250);

      s.x += s.drift + dx * force * 0.0015;
      s.y -= s.speed  + dy * force * 0.0015;

      if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W; }
      if (s.x < -4) s.x = W + 4;
      if (s.x > W + 4) s.x = -4;

      // glow near mouse
      const glow = dist < 120 ? 0.4 + force * 0.6 : s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dist < 120 ? '103,232,249' : '176,196,255'},${glow})`;
      ctx.fill();
    });

    // Connection lines near mouse
    stars.forEach(s => {
      const dx = mouse.x - s.x;
      const dy = mouse.y - s.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(59,130,246,${0.12 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── NAVBAR ───────────────────────────────────────────────── */
const navbar  = document.getElementById('navbar');
const toggle  = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
}, { passive: true });

toggle?.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;
  let current = '';
  sections.forEach(sec => {
    if (sec.offsetTop <= scrollY) current = sec.id;
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ── TYPING ANIMATION ─────────────────────────────────────── */
(function initTyping() {
  const el     = document.getElementById('typedText');
  if (!el) return;
  const phrases = [
    'Full Stack Developer',
    'AI & Automation Enthusiast',
    'Cloud Computing Learner',
    'Problem Solver'
  ];
  let pi = 0, ci = 0, deleting = false, wait = 0;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ci + 1);
      ci++;
      if (ci === phrase.length) {
        wait = 60;
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 85);
  }
  setTimeout(tick, 800);
})();

/* ── SCROLL REVEAL ────────────────────────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children if it's a grid container
        const children = entry.target.querySelectorAll('.glass-card, .interest-card, .cert-card');
        if (children.length > 1) {
          children.forEach((child, idx) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, idx * 80);
          });
        }
        setTimeout(() => entry.target.classList.add('revealed'), 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => observer.observe(t));
})();

/* ── BACK TO TOP ──────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── CONTACT FORM ─────────────────────────────────────────── */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Simulate network delay
    setTimeout(() => {
      success.classList.add('show');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = `
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Send Message`;
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1200);
  });
})();

/* ── RESUME DOWNLOAD ──────────────────────────────────────── */
document.getElementById('resumeBtn')?.addEventListener('click', e => {
  const href = e.currentTarget?.getAttribute('href');
  if (!href || href === '#') {
    e.preventDefault();
  }
});

/* ── HERO ENTRANCE ────────────────────────────────────────── */
(function heroEntrance() {
  const content = document.querySelector('.hero-content');
  if (!content) return;
  content.style.animation = 'fadeInUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both';
})();

/* ── SMOOTH ACTIVE SECTION HIGHLIGHT ─────────────────────── */
updateActiveNav();
}