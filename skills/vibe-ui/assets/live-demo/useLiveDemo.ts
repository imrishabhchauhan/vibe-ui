'use client';
// Live product demos for React, Next.js (App Router) and TanStack Start.
// A script is an async function that changes React state and moves the cursor; it never mutates React-managed DOM.
// Contract (references/coded-motion-components.md): time pauses off-screen and in hidden tabs, reduced motion shows
// the finished state only, unmount aborts everything, and the first render is deterministic (SSR-safe).
//
//   const stage = useRef<HTMLDivElement>(null);
//   const [step, setStep] = useState<Step>('idle');
//   const demo = useLiveDemo(stage, async (d) => {
//     setStep('idle'); await d.sleep(600);
//     await d.cursor.moveTo(endButtonRef.current); await d.cursor.press();
//     setStep('summary'); await d.sleep(2600);
//   }, { onReset: () => setStep('idle'), onReduced: () => setStep('summary') });
//   return <div ref={stage} className="relative"> ... <DemoCursor ref={demo.cursorRef} /></div>;
import { useEffect, useRef, useState, type RefObject } from 'react';

export interface DemoCursorApi {
  show(visible?: boolean): void;
  /** Move to an element (centre by default) or to stage coordinates [x, y] in px. */
  moveTo(target: Element | null | [number, number], opts?: { ax?: number; ay?: number; ms?: number }): Promise<void>;
  press(): Promise<void>;
}

export interface LiveDemo {
  /** Resolves after `ms` of *visible* time; rejects with an AbortError when the demo unmounts. */
  sleep(ms: number): Promise<void>;
  /** Run a Web Animation that pauses with the demo; keeps the end state. */
  animate(el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions): Promise<void>;
  /** Count a number from -> to over ms (ease-out) and report each frame. */
  count(from: number, to: number, ms: number, onValue: (v: number) => void): Promise<void>;
  cursor: DemoCursorApi;
  signal: AbortSignal;
}

interface Options { onReset?: () => void; onReduced?: () => void; loop?: boolean; threshold?: number }

const MOVE = 'cubic-bezier(.45, 0, .2, 1)';

export function useLiveDemo(stageRef: RefObject<HTMLElement | null>, script: (d: LiveDemo) => Promise<void>, options: Options = {}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const scriptRef = useRef(script); scriptRef.current = script;
  const optsRef = useRef(options); optsRef.current = options;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (rm.matches) { setReduced(true); optsRef.current.onReduced?.(); return; }

    const ctrl = new AbortController();
    const { signal } = ctrl;
    let visible = false;
    const waiters = new Set<() => void>();
    const running = () => visible && !document.hidden;
    const wake = () => { if (running()) { waiters.forEach((w) => w()); waiters.clear(); } };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }, { threshold: optsRef.current.threshold ?? 0.25 });
    io.observe(stage);
    document.addEventListener('visibilitychange', wake);
    const abortError = () => new DOMException('Demo stopped', 'AbortError');
    const gate = () => (signal.aborted ? Promise.reject(abortError()) : running() ? Promise.resolve()
      : new Promise<void>((res, rej) => { waiters.add(res); signal.addEventListener('abort', () => rej(abortError()), { once: true }); }));

    const live = new Set<Animation>();
    const sync = setInterval(() => live.forEach((a) => (running() ? a.playState === 'paused' && a.play() : a.pause())), 100);

    async function sleep(ms: number) {
      let left = ms;
      while (left > 0) {
        await gate();
        const t0 = performance.now();
        await new Promise((r) => setTimeout(r, Math.min(left, 50)));
        left -= performance.now() - t0;
      }
    }
    async function animate(el: Element, keyframes: Keyframe[], opts: KeyframeAnimationOptions) {
      await gate();
      const a = el.animate(keyframes, { fill: 'forwards', ...opts });
      live.add(a);
      try { await a.finished; } finally { live.delete(a); }
      try { a.commitStyles(); } catch { /* element detached */ }
      a.cancel();
    }
    async function count(from: number, to: number, ms: number, onValue: (v: number) => void) {
      let elapsed = 0, last = performance.now();
      for (;;) {
        await gate();
        const now = performance.now(); elapsed += Math.min(now - last, 50); last = now;
        const u = Math.min(1, elapsed / ms);
        onValue(from + (to - from) * (1 - Math.pow(1 - u, 3)));
        if (u >= 1) return;
        await new Promise((r) => requestAnimationFrame(r));
      }
    }

    let pos: [number, number] = [stage.clientWidth * 0.9, stage.clientHeight * 1.05];
    const place = (p: [number, number]) => `translate(${p[0] - 3}px, ${p[1] - 2}px)`;
    const cursor: DemoCursorApi = {
      show(on = true) { cursorRef.current?.toggleAttribute('data-on', on); },
      async moveTo(target, { ax = 0.5, ay = 0.5, ms } = {}) {
        const el = cursorRef.current; if (!el || !target) return;
        let to: [number, number];
        if (Array.isArray(target)) to = target;
        else {
          const s = stage.getBoundingClientRect(), r = target.getBoundingClientRect();
          to = [r.left - s.left + r.width * ax, r.top - s.top + r.height * ay];
        }
        const d = Math.hypot(to[0] - pos[0], to[1] - pos[1]);
        const from = pos; pos = to;
        await animate(el, [{ transform: place(from) }, { transform: place(to) }], { duration: ms ?? Math.min(900, Math.max(320, 260 + d * 1.1)), easing: MOVE });
      },
      async press() {
        const el = cursorRef.current; if (!el) return;
        el.setAttribute('data-press', ''); await sleep(130); el.removeAttribute('data-press'); await sleep(60);
      },
    };
    if (cursorRef.current) cursorRef.current.style.transform = place(pos);

    const demo: LiveDemo = { sleep, animate, count, cursor, signal };
    (async () => {
      do {
        try {
          optsRef.current.onReset?.();
          await scriptRef.current(demo);
        } catch (e) {
          if ((e as Error)?.name === 'AbortError') return;
          console.error(e);
          return;
        }
      } while (optsRef.current.loop !== false && !signal.aborted);
    })();

    return () => {
      ctrl.abort(); io.disconnect(); clearInterval(sync);
      document.removeEventListener('visibilitychange', wake);
      live.forEach((a) => a.cancel());
    };
  }, [stageRef]);

  return { cursorRef, reduced };
}
