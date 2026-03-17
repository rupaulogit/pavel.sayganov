const E = (s, r = document) => [...r.querySelectorAll(s)];
const easeOutQuart = t => 1 - (1 - t) ** 4;

document.addEventListener('DOMContentLoaded', () => {
  E('.animate-in').forEach((el, i) => setTimeout(() => el.classList.add('is-in'), i * 100));

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      E(':scope > *', target).forEach((c, i) => (c.style.transitionDelay = `${i * 50}ms`));
      reveal.unobserve(target);
    });
  }, { threshold: 0.1 });
  E('.resume__section').forEach(s => reveal.observe(s));

  const animateMetric = el => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const original = el.textContent.trim(), raw = el.dataset.value || original;
    if (/^-?\d+(\.\d+)?$/.test(raw)) {
      const end = parseFloat(raw), dur = 1200, start = performance.now(), suffix = original.includes('%') ? '%' : '';
      const tick = now => {
        const p = Math.min((now - start) / dur, 1), v = end * easeOutQuart(p);
        el.textContent = `${Math.round(v)}${suffix}`.replace('--', '-');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } else {
      let i = 0; el.textContent = '';
      const t = setInterval(() => {
        el.textContent = raw.slice(0, ++i);
        if (i >= raw.length) clearInterval(t);
      }, 35);
    }
  };

  const metricObs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && animateMetric(e.target)), { threshold: 0.2 });
  E('.metric-value').forEach(m => metricObs.observe(m));

  const skills = document.querySelector('.skills');
  if (skills) new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    E('.skill-badge', skills).forEach((b, i) => setTimeout(() => b.classList.add('is-in'), i * 30));
    E('.progress-bar', skills).forEach((bar, i) => setTimeout(() => (bar.style.width = bar.dataset.width || '0%'), i * 100));
  }), { threshold: 0.2 }).observe(skills);

  E('.metric-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transition = 'var(--transition-slow)'; card.style.transform = ''; });
  });
});
