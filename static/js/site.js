(function () {
  initSiteHeader();
  initHomeHeroSlider();

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
  initFormspreeForms();
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

function initHomeHeroSlider() {
  const root = document.querySelector('[data-home-hero-slider]');
  if (!root) return;

  const track = root.querySelector('[data-home-hero-track]');
  const slides = root.querySelectorAll('[data-home-hero-slide]');
  const dots = root.querySelectorAll('[data-home-hero-dot]');
  const prev = root.querySelector('[data-home-hero-prev]');
  const next = root.querySelector('[data-home-hero-next]');
  if (!track || slides.length < 2) return;

  let activeIndex = 0;
  let timer;

  function setActive(index) {
    activeIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeIndex);
    });
  }

  function start() {
    timer = setInterval(() => setActive(activeIndex + 1), 4500);
  }

  function restart() {
    clearInterval(timer);
    start();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      setActive(index);
      restart();
    });
  });

  if (prev) {
    prev.addEventListener('click', () => {
      setActive(activeIndex - 1);
      restart();
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      setActive(activeIndex + 1);
      restart();
    });
  }

  setActive(0);
  start();
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

function initFormspreeForms() {
  const forms = document.querySelectorAll('form[action^="https://formspree.io/"]');
  if (!forms.length) return;

  forms.forEach((form) => {
    const submitButton = form.querySelector('button[type="submit"]');
    const status = document.createElement('p');
    status.className = 'mt-4 text-sm font-semibold';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const originalText = submitButton ? submitButton.textContent : '';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      status.textContent = '';
      status.classList.remove('text-red-600', 'text-secondary', 'text-primary');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            Accept: 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        form.reset();
        status.textContent = 'Thank you. Your message has been sent successfully.';
        status.classList.add('text-secondary');
      } catch {
        status.textContent = 'Sorry, something went wrong. Please try again or call the school office.';
        status.classList.add('text-red-600');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    });
  });
}
