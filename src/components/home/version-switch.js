// Homepage review switch (owner, 21 Oct 2026), inlined right after its nav on /1/ to /4/ only.
// Each link carries the section in view, so switching lands on the same part of the other version:
// the last anchor whose top is in the top third of the screen. Only anchors that every version
// renders are listed (v1's use cases have only their heading's), so a carried anchor always resolves.
// A block only some versions have (v3's intent links under the hero, the builder block of v2 and v4)
// carries the nearest shared anchor above it, or none above Why Augur, which opens the other version
// at the top. Without JavaScript the links open each version at the top.
// How it works carries its heading, #how-heading, so a reader at the section (or at Holding REP?,
// further down it) lands on the closed section in v2 to v4 instead of on the example, which any arrival
// at #how-it-works opens (how-it-works-v2.js). #how-it-works is carried only while the open example
// (v1's always-open walkthrough, or v2 to v4's once opened) crosses the middle of the screen, so a
// reader in the example finds it open on the other side too, and one with the REP bar in the upper half
// lands on the bar (review fix, 21 Oct 2026).
// The switch steps aside (CSS reads data-away) while the reader scrolls down, at every width, and comes
// back on any scroll up, near the top and at the end. A jump down from an in-page link (the hero's
// actions, v3's intent links) counts as scrolling down; other jumps (Home, End, find in page) leave it
// where it is. Scrolls before the reader's first wheel, touch, key or press are the browser's own (the
// landing on the section carried from another version, a reload's restored position), so they never
// hide it. It also steps aside while one of the hero's actions lies under it (data-hero), which on short
// phones is the first screen: the page's main action is never covered; and while a focused control does
// (data-cover; review fix, 21 Oct 2026). Focus inside it always shows it (CSS).
(() => {
  const nav = document.currentScript?.previousElementSibling;
  if (!nav) return;
  const ids = ['why-augur', 'applications-heading', 'how-heading', 'how-it-works', 'roadmap', 'learn-more', 'contact-title'];
  const carry = () => {
    let id = '';
    const third = innerHeight / 3, demo = document.getElementById('how-demo');
    for (const at of ids) {
      const walk = at === 'how-it-works', el = walk ? (demo && demo.hidden ? null : document.querySelector('[data-walkthrough]')) : document.getElementById(at);
      if (!el) continue;
      const box = el.getBoundingClientRect();
      if (walk ? box.top <= innerHeight / 2 && box.bottom > innerHeight / 2 : box.top <= third) id = at;
    }
    nav.querySelectorAll('a').forEach(link => { link.hash = id; });
  };
  for (const type of ['pointerdown', 'focusin', 'click']) nav.addEventListener(type, carry);
  let last = scrollY, queued = false, jump = false, input = false;
  for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown']) addEventListener(type, () => { input = true; }, { passive: true, once: true });
  document.addEventListener('click', ({ target }) => { if (target.closest?.('a[href^="#"]')) jump = true; });
  addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const y = scrollY, step = y - last;
      if (Math.abs(step) < 8) return;
      last = y;
      if (!input) return;
      nav.toggleAttribute('data-away', step > 0 && (step < innerHeight || jump) && y > 96 && y + innerHeight < document.documentElement.scrollHeight - 48);
      jump = false;
      cover();
    });
  }, { passive: true });
  // The switch's own corner, where it rests even while it is slid out: from 4 px above its top edge to
  // the bottom of the screen, and from 4 px left of its left edge to the right.
  const band = () => [nav.getBoundingClientRect().left - 4, innerHeight - parseFloat(getComputedStyle(nav).bottom) - nav.offsetHeight - 4];
  // A focused control in that corner sends it aside too (data-cover), where scroll padding can't lift
  // the control above it (the footer's last links at the end of the page, at 360), so no focused
  // control or its ring is ever under it (WCAG 2.4.12; review fix, 21 Oct 2026).
  const cover = () => {
    const el = document.activeElement, [left, top] = band(), box = el && el !== document.body && !nav.contains(el) && el.getBoundingClientRect();
    nav.toggleAttribute('data-cover', !!box && box.height < innerHeight / 2 && box.bottom > top && box.right > left && box.top < innerHeight);
  };
  for (const type of ['focusin', 'focusout']) document.addEventListener(type, () => requestAnimationFrame(cover));
  // The hero's actions are watched in the same corner. Set up once the page has parsed (the hero comes
  // after this script) and again after a resize.
  let watch, wait;
  const guard = () => {
    watch?.disconnect();
    const links = document.querySelectorAll('.hero-actions a'), inside = new Set();
    if (!links.length || !window.IntersectionObserver) return;
    const [left, top] = band();
    watch = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) { if (isIntersecting) inside.add(target); else inside.delete(target); }
      nav.toggleAttribute('data-hero', inside.size > 0);
    }, { rootMargin: `${-Math.max(0, Math.round(top))}px 0px 0px ${-Math.max(0, Math.round(left))}px` });
    links.forEach(link => watch.observe(link));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', guard); else guard();
  addEventListener('resize', () => { clearTimeout(wait); wait = setTimeout(guard, 150); });
})();
