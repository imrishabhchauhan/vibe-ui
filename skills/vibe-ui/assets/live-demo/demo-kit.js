// Live product-demo kit (plain HTML / any framework without React). A demo is an async script that drives real DOM
// with a scripted cursor. See references/coded-motion-components.md.
// The script loops while the stage is on screen and the tab is visible; it pauses (mid-step) otherwise.
// Under prefers-reduced-motion the demo renders `final(api)` once and never animates.

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const CURSOR = `<svg viewBox="0 0 22 22"><path d="M3 2.2v15.6l4.3-4.1 2.7 6.1 2.6-1.1-2.7-6h6.1z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

export function mountDemo(stage, demo) {
  const ctx = makeCtx(stage);
  const api = demo.build(ctx);
  if (reduce.matches) { demo.final?.(api); return; }
  (async () => {
    for (;;) {
      try {
        demo.reset?.(api);
        ctx.cursorTo(...(demo.cursorStart || [0.85, 1.05]), 0);
        await demo.script(ctx, api);
      } catch (e) { if (e !== STOP) console.error(e); }
    }
  })();
}
const STOP = Symbol('stop');

function makeCtx(stage) {
  const cursor = document.createElement('div');
  cursor.className = 'dk-cursor'; cursor.innerHTML = CURSOR;
  const tip = document.createElement('div'); tip.className = 'dk-tip';
  stage.append(cursor, tip);
  let pos = [0, 0];
  let visible = false;
  const waiters = new Set();
  const running = () => visible && !document.hidden;
  const wake = () => { if (running()) { for (const w of waiters) w(); waiters.clear(); } };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }, { threshold: 0.25 }).observe(stage);
  document.addEventListener('visibilitychange', wake);
  const gate = () => (running() ? Promise.resolve() : new Promise((r) => waiters.add(r)));

  // time only advances while visible: sleep in small slices
  async function sleep(ms) {
    let left = ms;
    while (left > 0) {
      await gate();
      const t0 = performance.now();
      await new Promise((r) => setTimeout(r, Math.min(left, 50)));
      left -= performance.now() - t0;
    }
  }
  // play a WAAPI animation and keep the end state
  async function anim(el, keyframes, opts) {
    await gate();
    const a = el.animate(keyframes, { fill: 'forwards', ...opts });
    const iv = setInterval(() => { if (!running()) a.pause(); else if (a.playState === 'paused') a.play(); }, 100);
    try { await a.finished; } finally { clearInterval(iv); }
    try { a.commitStyles(); } catch {}
    a.cancel();
  }
  const rel = (el, ax = 0.5, ay = 0.5) => {
    const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    return [r.left - s.left + r.width * ax, r.top - s.top + r.height * ay];
  };
  let carried = null;   // { el, dx, dy }: an element that follows the cursor (drag)
  function cursorTo(x, y, ms = 600) {
    // numbers <= 1.5 are fractions of the stage
    const s = stage.getBoundingClientRect();
    const px = x <= 1.5 ? x * s.width : x, py = y <= 1.5 ? y * s.height : y;
    const from = pos; pos = [px, py];
    const kf = (p, ox = -3, oy = -2) => ({ transform: `translate(${p[0] + ox}px, ${p[1] + oy}px)` });
    if (!ms) {
      cursor.style.transform = kf(pos).transform;
      if (carried) carried.el.style.transform = kf(pos, carried.dx, carried.dy).transform;
      return Promise.resolve();
    }
    const opts = { duration: ms, easing: 'cubic-bezier(.45, 0, .2, 1)' };
    return Promise.all([
      anim(cursor, [kf(from), kf(pos)], opts),
      carried ? anim(carried.el, [kf(from, carried.dx, carried.dy), kf(pos, carried.dx, carried.dy)], opts) : null,
    ]);
  }
  function carry(el, dx = 8, dy = 10) {
    if (!el) { const c = carried; carried = null; return c?.el; }
    el.style.position = 'absolute'; el.style.left = '0'; el.style.top = '0'; el.style.zIndex = 19;
    stage.append(el); carried = { el, dx, dy };
    el.style.transform = `translate(${pos[0] + dx}px, ${pos[1] + dy}px)`;
    return el;
  }
  return {
    stage, sleep, anim, rel, carry,
    get pos() { return pos; },
    showCursor(on = true) { cursor.classList.toggle('on', on); },
    cursorTo,
    async moveTo(el, { ax = 0.5, ay = 0.5, ms } = {}) {
      const [x, y] = rel(el, ax, ay);
      const d = Math.hypot(x - pos[0], y - pos[1]);
      await cursorTo(x, y, ms ?? Math.round(Math.min(900, Math.max(320, 260 + d * 1.1))));
    },
    hover(el, on = true) { el.classList.toggle('is-hover', on); },
    async click(el) {
      cursor.classList.add('press'); el?.classList.add('is-press');
      await sleep(130);
      cursor.classList.remove('press'); el?.classList.remove('is-press');
      await sleep(60);
    },
    async tipFor(text, el, ms = 1200) {
      tip.textContent = text;
      const [x, y] = rel(el, 0.5, 0);
      tip.style.left = `${x}px`; tip.style.top = `${y - 34}px`; tip.style.translate = '-50% 0';
      tip.classList.add('on'); await sleep(ms); tip.classList.remove('on');
    },
    // text helpers
    async type(el, text, cps = 28) {
      el.textContent = '';
      for (const ch of text) { el.textContent += ch; await sleep(1000 / cps * (ch === ' ' ? 0.6 : 1) * (0.7 + Math.random() * 0.6)); }
    },
    async words(el, text, wps = 6) {
      el.textContent = '';
      const parts = text.split(' ');
      for (let i = 0; i < parts.length; i++) { el.textContent += (i ? ' ' : '') + parts[i]; await sleep(1000 / wps * (0.75 + Math.random() * 0.5)); }
    },
    async count(el, from, to, ms, fmt = (v) => Math.round(v).toString()) {
      const t0 = performance.now(); let paused = 0;
      for (;;) {
        const g0 = performance.now(); await gate(); paused += performance.now() - g0;
        const u = Math.min(1, (performance.now() - t0 - paused) / ms);
        const e = 1 - Math.pow(1 - u, 3);
        el.textContent = fmt(from + (to - from) * e);
        if (u >= 1) break;
        await new Promise((r) => requestAnimationFrame(r));
      }
    },
    bar(el, to, ms = 800, easing = 'cubic-bezier(.16, 1, .3, 1)') {
      const from = el.style.width || '0%';
      return anim(el, [{ width: from }, { width: `${to}%` }], { duration: ms, easing });
    },
    // reveal an element: fade + small rise + de-blur
    enter(el, ms = 320, dy = 6) {
      el.hidden = false;
      return anim(el, [{ opacity: 0, transform: `translateY(${dy}px)`, filter: 'blur(2px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }],
        { duration: ms, easing: 'cubic-bezier(.16, 1, .3, 1)' });
    },
    async leave(el, ms = 200) {
      await anim(el, [{ opacity: 1 }, { opacity: 0 }], { duration: ms, easing: 'ease-in' });
      el.hidden = true; el.style.opacity = '';
    },
    // swap text with a quick cross-blur
    async swap(el, text, ms = 260) {
      await anim(el, [{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(2px)' }], { duration: ms / 2, easing: 'ease-in' });
      el.textContent = text;
      await anim(el, [{ opacity: 0, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0)' }], { duration: ms / 2, easing: 'ease-out' });
    },
    // animate a container's height across a DOM change (FLIP)
    async grow(el, mutate, ms = 420) {
      const h0 = el.getBoundingClientRect().height;
      mutate();
      const h1 = el.getBoundingClientRect().height;
      if (Math.abs(h1 - h0) < 1) return;
      el.style.overflow = 'hidden';
      await anim(el, [{ height: `${h0}px` }, { height: `${h1}px` }], { duration: ms, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      el.style.height = ''; el.style.overflow = '';
    },
  };
}

export const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
