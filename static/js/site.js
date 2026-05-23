(function () {
  initSiteHeader();

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const finalText = target + suffix;

          if (suffix === ':1') {
            el.textContent = finalText;
            observer.unobserve(el);
            return;
          }

          let current = 0;
          const step = Math.max(1, Math.floor(target / 50));

          const tick = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = finalText;
              clearInterval(tick);
            } else {
              el.textContent = String(current) + suffix;
            }
          }, 20);

          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  initCurriculumTabs();
  initFaqAccordion();
  initTimelineScroll();
  initGalleryLightbox();
  initGalleryFilters();
})();

function initSiteHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const threshold = 24;
  let ticking = false;

  function update() {
    header.classList.toggle('is-scrolled', window.scrollY > threshold);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('gallery-lightbox-img');
  const closeBtn = document.getElementById('gallery-lightbox-close');
  if (!lightbox || !lightboxImg || !closeBtn) return;

  const photos = document.querySelectorAll('.gallery-photo');

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.remove('hidden');
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightboxImg.src = '';
    }, 500);
  }

  photos.forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) open(img.src, img.alt);
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
}

function initGalleryFilters() {
  const root = document.querySelector('[data-gallery-filters]');
  const grid = document.querySelector('[data-gallery-grid]');
  if (!root || !grid) return;

  const buttons = root.querySelectorAll('.gallery-filter-btn');
  const items = grid.querySelectorAll('[data-category]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      buttons.forEach((b) => {
        b.classList.remove('gallery-filter-active', 'border-secondary', 'bg-secondary', 'text-on-secondary');
        b.classList.add('border-outline');
      });
      btn.classList.add('gallery-filter-active', 'border-secondary', 'bg-secondary', 'text-on-secondary');
      btn.classList.remove('border-outline');

      items.forEach((item) => {
        const category = item.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

function initTimelineScroll() {
  const track = document.querySelector('[data-timeline-track]');
  const buttons = document.querySelectorAll('.timeline-scroll-btn');
  if (!track || !buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const direction = parseInt(btn.getAttribute('data-direction'), 10) || 1;
      track.scrollBy({ left: direction * 360, behavior: 'smooth' });
    });
  });
}

function initCurriculumTabs() {
  const root = document.querySelector('[data-curriculum-tabs]');
  const dataEl = document.getElementById('curriculum-data');
  if (!root || !dataEl) return;

  let data;
  try {
    data = JSON.parse(dataEl.textContent);
  } catch {
    return;
  }

  const tabs = root.querySelectorAll('.curriculum-tab');
  const title = document.getElementById('curriculum-title');
  const desc = document.getElementById('curriculum-desc');
  const img = document.getElementById('curriculum-img');
  const points = document.getElementById('curriculum-points');

  const inactiveClass = ['text-on-surface-variant'];
  const activeClass = ['active-tab'];

  function renderPoints(items) {
    if (!points) return;
    points.innerHTML = items
      .map(
        (text) =>
          `<li class="flex items-start gap-3"><span class="material-symbols-outlined text-secondary">check_circle</span><span>${text}</span></li>`
      )
      .join('');
  }

  function activate(tab) {
    const id = tab.getAttribute('data-tab');
    const selected = data[id];
    if (!selected) return;

    tabs.forEach((t) => {
      t.classList.remove('active-tab', 'border-b-2', 'border-secondary', 'font-bold', 'text-secondary');
      t.classList.add('text-on-surface-variant');
    });
    tab.classList.add('active-tab', 'border-b-2', 'border-secondary', 'font-bold', 'text-secondary');
    tab.classList.remove('text-on-surface-variant');

    if (title) title.textContent = selected.title;
    if (desc) desc.textContent = selected.desc;
    if (img) img.src = selected.img;
    renderPoints(selected.points || []);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab));
  });
}

function initFaqAccordion() {
  const root = document.querySelector('[data-faq-accordion]');
  if (!root) return;

  const triggers = root.querySelectorAll('.faq-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const icon = trigger.querySelector('.material-symbols-outlined');
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      triggers.forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        const otherPanel = other.nextElementSibling;
        const otherIcon = other.querySelector('.material-symbols-outlined');
        if (otherPanel) otherPanel.classList.add('hidden');
        if (otherIcon) {
          otherIcon.textContent = 'add';
          otherIcon.style.transform = '';
        }
      });

      if (!isOpen && panel) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.classList.remove('hidden');
        if (icon) {
          icon.textContent = 'remove';
          icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  });
}
