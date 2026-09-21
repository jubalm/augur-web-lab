// The weave moves continuously while visible; Escape pauses until fresh input.

export function mountHeroLoom(root: HTMLElement) {
  let pending = false;
  const lifecycle = new AbortController();
  const observer = new IntersectionObserver(entries => {
    if (pending || !entries.some(entry => entry.isIntersecting)) return;
    pending = true;
    observer.disconnect();
    void initialize(root, lifecycle.signal).catch(error => {
      root.dataset.renderer = 'static';
      console.warn('Hero artwork could not initialize; keeping its static illustration.', error);
    });
  }, { rootMargin: '200px' });
  observer.observe(root);
  window.addEventListener('pagehide', event => {
    observer.disconnect();
    if (!event.persisted) lifecycle.abort();
  }, { signal: lifecycle.signal });
  window.addEventListener('pageshow', () => {
    if (!pending) observer.observe(root);
  }, { signal: lifecycle.signal });
}

async function initialize(root: HTMLElement, lifecycle: AbortSignal) {
  const stage = root.querySelector<HTMLElement>('[data-hero-loom-stage]')!;
  const canvas = root.querySelector<HTMLCanvasElement>('canvas')!;
  const fallback = root.querySelector<SVGElement>('[data-hero-loom-fallback]')!;
  const background = root.querySelector<HTMLElement>('[data-background-probe]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const colorScheme = matchMedia('(prefers-color-scheme: dark)');
  const { createFocusScene } = await import('./focus-field-scene');
  if (lifecycle.aborted || !root.isConnected) return;
  // Both views own input; the scene's camera helper has no listeners or render loop.
  const scene = createFocusScene(canvas, stage, {
    backgroundElement: background, maxAlignment: .96, interactionStrength: .75,
  });
  if (!scene) return;

  const abort = new AbortController();
  let frame = 0, last = 0, contact = 0;
  let visible = false, disposed = false, pageHidden = false, paused = false;
  let pointer: { x: number; y: number } | null = null;
  let drag: { id: number; x: number; y: number; moved: boolean; rect: DOMRect } | null = null;
  const inputAllowed = () => !disposed && !pageHidden && !document.hidden && !reduced.matches;

  function sync() {
    root.dataset.state = reduced.matches ? 'reduced' : paused ? 'paused' : 'live';
    root.dataset.interactive = String(!reduced.matches && !disposed);
    if (reduced.matches || disposed) {
      stage.removeAttribute('tabindex');
      stage.removeAttribute('aria-describedby');
      stage.setAttribute('role', 'img');
      stage.setAttribute('aria-label', 'Scattered strands gathering into one pattern');
    } else {
      // Stays focusable: Escape here is how keyboard users pause the continuous motion.
      stage.tabIndex = 0;
      stage.setAttribute('role', 'group');
      stage.setAttribute('aria-label', 'Animation: scattered strands gathering into one pattern');
      stage.setAttribute('aria-describedby', 'hero-loom-instructions');
    }
  }
  function stop() {
    cancelAnimationFrame(frame); frame = 0; last = 0;
    root.dataset.rendering = 'false';
  }
  function releaseContact() {
    contact = 0; pointer = null;
    scene!.setPointer(0, 0, false);
    const captured = drag?.id;
    drag = null;
    if (captured !== undefined && stage.hasPointerCapture(captured)) stage.releasePointerCapture(captured);
    scene!.setDragging(false);
    root.dataset.dragging = 'false';
  }
  function suspend() { stop(); releaseContact(); scene!.stopCamera(); }
  function tick(now: number) {
    frame = 0;
    if (!inputAllowed() || !visible || paused) { stop(); return; }
    const delta = last ? Math.max(0, (now - last) / 1000) : 0;
    if (contact > 0) {
      contact = Math.max(0, contact - delta);
      if (!contact) scene!.setPointer(0, 0, false);
    }
    scene!.draw(delta, true);
    last = now;
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    if (!frame && inputAllowed() && visible && !paused) {
      root.dataset.rendering = 'true'; frame = requestAnimationFrame(tick);
    }
  }
  function updateVisibility() {
    if (disposed) return;
    const rect = stage.getBoundingClientRect();
    const viewport = document.documentElement;
    const shownHeight = Math.min(rect.bottom, viewport.clientHeight) - Math.max(rect.top, 0);
    visible = shownHeight > Math.min(rect.height * .15, 100) && rect.right > 0 && rect.left < viewport.clientWidth;
    root.dataset.inView = String(visible);
    if (visible) schedule(); else suspend();
  }
  function wake() {
    if (!inputAllowed()) return;
    paused = false;
    sync(); if (visible) schedule(); else updateVisibility();
  }
  function locate(event: PointerEvent, rect = stage.getBoundingClientRect()) {
    const x = (event.clientX - rect.left) / rect.width * 2 - 1;
    const y = 1 - (event.clientY - rect.top) / rect.height * 2;
    pointer = { x: event.clientX, y: event.clientY };
    contact = .2;
    scene!.setPointer(x, y, Math.abs(x) <= 1 && Math.abs(y) <= 1);
  }
  function redraw() {
    if (reduced.matches) scene!.staticView();
    else scene!.draw(0, false);
  }
  function preference() { suspend(); redraw(); sync(); schedule(); }
  function resize() {
    scene!.resize();
    if (drag) drag.rect = stage.getBoundingClientRect();
    redraw(); updateVisibility();
  }
  function theme() { scene!.theme(); redraw(); }
  stage.addEventListener('pointermove', event => {
    if (!inputAllowed() || !event.isPrimary || (drag && event.pointerId !== drag.id)) return;
    const previous = pointer;
    if (previous && event.clientX === previous.x && event.clientY === previous.y) return;
    if (drag && event.pointerId === drag.id) {
      if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 5) drag.moved = true;
      if (previous && drag.moved) scene!.turn(
        -(event.clientX - previous.x) / drag.rect.width * 2.2,
        (event.clientY - previous.y) / drag.rect.height * 1.6,
      );
    }
    locate(event, drag?.rect); wake();
  }, { signal: abort.signal });
  stage.addEventListener('pointerdown', event => {
    if (!inputAllowed() || !event.isPrimary || event.button !== 0 || drag) return;
    const rect = stage.getBoundingClientRect();
    locate(event, rect);
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, rect };
    stage.setPointerCapture(event.pointerId);
    scene!.setDragging(true);
    root.dataset.dragging = 'true';
    wake();
  }, { signal: abort.signal });
  stage.addEventListener('pointerup', event => {
    if (!inputAllowed() || !drag || drag.id !== event.pointerId) return;
    const clicked = !drag.moved;
    locate(event, drag.rect);
    if (clicked) { scene!.disturb(true); wake(); }
    releaseContact();
  }, { signal: abort.signal });
  stage.addEventListener('pointerleave', () => { if (!drag) releaseContact(); }, { signal: abort.signal });
  stage.addEventListener('pointercancel', event => {
    if (event.isPrimary && (!drag || drag.id === event.pointerId)) releaseContact();
  }, { signal: abort.signal });
  stage.addEventListener('lostpointercapture', releaseContact, { signal: abort.signal });
  stage.addEventListener('keydown', event => {
    if (!inputAllowed()) return;
    if (event.key === 'Escape') {
      event.preventDefault(); suspend(); paused = true; scene!.clearTrace(true); sync();
    } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      scene!.turn(event.key === 'ArrowLeft' ? -.12 : event.key === 'ArrowRight' ? .12 : 0,
        event.key === 'ArrowUp' ? .1 : event.key === 'ArrowDown' ? -.1 : 0);
      wake();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); releaseContact(); scene!.disturb(true); wake();
    }
  }, { signal: abort.signal });
  reduced.addEventListener('change', preference, { signal: abort.signal });
  colorScheme.addEventListener('change', theme, { signal: abort.signal });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) suspend(); else updateVisibility();
  }, { signal: abort.signal });
  window.addEventListener('scroll', updateVisibility, { passive: true, signal: abort.signal });
  const intersection = new IntersectionObserver(updateVisibility, { threshold: [0, .15] });
  const resizeObserver = new ResizeObserver(resize);
  const themeObserver = new MutationObserver(theme);
  intersection.observe(stage); resizeObserver.observe(stage);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  function dispose() {
    if (disposed) return;
    suspend(); disposed = true; sync(); abort.abort();
    intersection.disconnect(); resizeObserver.disconnect(); themeObserver.disconnect(); scene!.dispose();
  }
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    canvas.hidden = true; fallback.style.display = '';
    root.dataset.renderer = 'static'; dispose(); root.dataset.state = 'static';
  }, { signal: abort.signal });
  window.addEventListener('pagehide', event => {
    pageHidden = true;
    if (event.persisted) suspend(); else dispose();
  }, { signal: abort.signal });
  window.addEventListener('pageshow', () => { pageHidden = false; updateVisibility(); }, { signal: abort.signal });
  canvas.hidden = false; fallback.style.display = 'none'; root.dataset.renderer = 'three';
  resize(); sync();
}
