// The lab's reading position follows scrolling, anchor navigation and disclosures.
document.querySelectorAll<HTMLElement>('[data-section-nav]').forEach(nav => {
  const entries = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
    .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(entry => entry.section !== null);
  if (!entries.length) return;
  let frame = 0;
  const update = () => {
    frame = 0;
    let current = entries[0];
    for (const entry of entries) {
      if (entry.section!.getBoundingClientRect().top <= 160) current = entry;
    }
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = entries[entries.length - 1];
    }
    for (const entry of entries) {
      if (entry === current) entry.link.setAttribute('aria-current', 'location');
      else entry.link.removeAttribute('aria-current');
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  window.addEventListener('pageshow', schedule);
  document.addEventListener('toggle', schedule, true);
  const resize = new ResizeObserver(schedule);
  entries.forEach(entry => resize.observe(entry.section!));
  update();
  window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); frame = 0; });
});
