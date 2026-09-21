/** A single moving surface keeps adjacent navigation menus visually connected. */
export function initProductNavigation(header: HTMLElement | null) {
  const surface = header?.querySelector<HTMLElement>('[data-navigation-surface]');
  if (!header || !surface) return;

  const menus = Array.from(header.querySelectorAll<HTMLDetailsElement>('.nav-menu'));
  const lifecycle = new AbortController();
  const options = { signal: lifecycle.signal };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  let active: HTMLDetailsElement | null = null;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;
  let resizeFrame = 0;
  let surfaceMotion: Animation | undefined;
  let contentMotion: Animation | undefined;

  header.dataset.enhanced = '';
  const entrance = !reduced.matches
    ? header.animate(
      [{ opacity: .5, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)' },
    )
    : undefined;

  const cancelClose = () => {
    clearTimeout(closeTimer);
    closeTimer = undefined;
  };

  const positionSurface = (previous?: DOMRect, moving = false) => {
    const panel = active?.querySelector<HTMLElement>('.nav-panel');
    if (!panel) return;
    const frame = header.getBoundingClientRect();
    const rect = panel.getBoundingClientRect();
    const x = rect.left - frame.left;
    const y = rect.top - frame.top;
    surfaceMotion?.cancel();
    Object.assign(surface.style, {
      width: `${rect.width}px`, height: `${rect.height}px`,
      transform: `translate(${x}px, ${y}px)`,
    });
    if (reduced.matches || !moving) return;

    // The new box is already laid out. Animate only its visual transform.
    const from = previous
      ? `translate(${previous.left - frame.left}px, ${previous.top - frame.top}px) scale(${previous.width / rect.width}, ${previous.height / rect.height})`
      : `translate(${x}px, ${y - 6}px) scale(1, .96)`;
    surfaceMotion = surface.animate(
      [{ transform: from, opacity: previous ? 1 : 0 }, { transform: `translate(${x}px, ${y}px) scale(1, 1)`, opacity: 1 }],
      { duration: previous ? 300 : 220, easing: 'cubic-bezier(.16,1,.3,1)' },
    );
  };

  const open = (menu: HTMLDetailsElement) => {
    cancelClose();
    if (active === menu) return;
    const previousMenu = active;
    const previous = active ? surface.getBoundingClientRect() : undefined;
    contentMotion?.cancel();
    menus.forEach(item => { item.open = item === menu; });
    active = menu;
    surface.dataset.open = '';
    positionSurface(previous, true);
    const panel = menu.querySelector<HTMLElement>('.nav-panel');
    if (panel && !reduced.matches) {
      const direction = previousMenu ? Math.sign(menus.indexOf(menu) - menus.indexOf(previousMenu)) : 0;
      contentMotion = panel.animate(
        [{ opacity: 0, transform: `translate(${direction * 10}px, ${previousMenu ? 0 : -4}px)` }, { opacity: 1, transform: 'translate(0, 0)' }],
        { duration: 180, easing: 'cubic-bezier(.16,1,.3,1)' },
      );
    }
  };

  const close = () => {
    cancelClose();
    contentMotion?.cancel();
    surfaceMotion?.cancel();
    menus.forEach(menu => { menu.open = false; });
    active = null;
    delete surface.dataset.open;
    surface.removeAttribute('style');
  };

  const scheduleClose = () => {
    cancelClose();
    // Cross the trigger-to-panel gap or the Blog link without a close/open flash.
    closeTimer = setTimeout(() => {
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && active?.contains(focused) && focused.matches(':focus-visible')) return;
      close();
    }, 180);
  };

  menus.forEach(menu => {
    const summary = menu.querySelector('summary');
    if (!summary) return;
    menu.addEventListener('pointerenter', event => {
      if (hover.matches && event.pointerType !== 'touch') open(menu);
    }, options);
    menu.addEventListener('pointerleave', event => {
      if (hover.matches && event.pointerType !== 'touch') scheduleClose();
    }, options);
    menu.addEventListener('focusin', () => {
      cancelClose();
    }, options);
    summary.addEventListener('click', event => {
      event.preventDefault();
      entrance?.cancel();
      // A mouse click after hover keeps the menu open; touch/keyboard can toggle.
      const mouseClick = event.detail > 0 && hover.matches && !(event instanceof PointerEvent && event.pointerType === 'touch');
      if (active === menu && !mouseClick) close();
      else open(menu);
    }, options);
    summary.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown') return;
      event.preventDefault();
      open(menu);
      menu.querySelector<HTMLAnchorElement>('.nav-panel a')?.focus();
    }, options);
  });

  header.querySelectorAll<HTMLElement>('.nav-item,.home-link,.header-contact').forEach(link => {
    link.addEventListener('pointerenter', () => { if (hover.matches) scheduleClose(); }, options);
  });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !active) return;
    event.preventDefault();
    const summary = active.querySelector('summary');
    close();
    summary?.focus();
  }, options);
  header.addEventListener('click', event => {
    if ((event.target as Element).closest('a')) close();
  }, options);
  header.addEventListener('focusout', () => queueMicrotask(() => {
    if (!active?.contains(document.activeElement)) close();
  }), options);
  document.addEventListener('pointerdown', event => {
    entrance?.cancel();
    if (!header.contains(event.target as Node)) close();
  }, options);

  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => positionSurface());
  }, options);
  document.fonts.ready.then(() => { if (!lifecycle.signal.aborted) positionSurface(); });
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    entrance?.cancel();
    surfaceMotion?.cancel();
    contentMotion?.cancel();
  }, options);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    entrance?.cancel();
    close();
  }, options);
  window.addEventListener('pagehide', event => {
    close();
    entrance?.cancel();
    cancelAnimationFrame(resizeFrame);
    if (!event.persisted) lifecycle.abort();
  }, options);
}
