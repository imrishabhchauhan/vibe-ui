// Vibe UI Lottie helper: framework-free, ES module, ~3 KB.
// Implements the contract in references/lottie-and-vector-animation.md:
// reserved aspect ratio, lazy load, off-screen and hidden-tab pause, reduced motion -> poster,
// named segments from markers, accessible labelling, and full cleanup.
//
//   import { mountLottie } from './lottie-player.js';
//   const ctl = mountLottie(el, { src: '/lottie/success.json', intro: 'in', loop: 'idle', label: 'Payment complete' });
//   ctl.play('on');            // play a named segment once
//   ctl.play('idle', true);    // loop a named segment
//   ctl.destroy();
//
// The player defaults to lottie-web's light SVG build. Pass `loadPlayer` to supply it from your bundler:
//   loadPlayer: () => import('lottie-web/build/player/lottie_light').then((m) => m.default)

const DEFAULT_PLAYER_URL = 'https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie_light.min.js';
let scriptPlayer;

// An element with id="lottie" also appears as window.lottie, so check for the real player API.
const globalPlayer = () => (typeof globalThis.lottie?.loadAnimation === 'function' ? globalThis.lottie : null);

function loadScriptPlayer(url) {
  if (globalPlayer()) return Promise.resolve(globalPlayer());
  scriptPlayer ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => (globalPlayer() ? resolve(globalPlayer()) : reject(new Error('Lottie player script loaded but window.lottie is not the player')));
    script.onerror = () => reject(new Error(`Could not load Lottie player from ${url}`));
    document.head.appendChild(script);
  });
  return scriptPlayer;
}

const dataCache = new Map();
function loadData(src) {
  if (!dataCache.has(src)) {
    dataCache.set(src, fetch(src).then((response) => {
      if (!response.ok) throw new Error(`Lottie ${src}: HTTP ${response.status}`);
      return response.json();
    }));
  }
  return dataCache.get(src);
}

function segmentsOf(data) {
  const segments = {};
  for (const marker of data.markers || []) segments[marker.cm] = [marker.tm, marker.tm + (marker.dr || 0)];
  return segments;
}

/**
 * @param {HTMLElement} el      container; gets aspect-ratio, role/aria and the SVG
 * @param {object} options
 * @param {string} [options.src]           URL of the Lottie JSON (or pass options.data)
 * @param {object} [options.data]          already-parsed Lottie JSON
 * @param {string} [options.intro]         segment to play once on first view (e.g. 'in')
 * @param {string|boolean} [options.loop]  segment to loop afterwards, `true` to loop the whole file, false for none
 * @param {number|string} [options.poster] frame or segment name shown under reduced motion (default: end of intro, else 0)
 * @param {string} [options.fit]           SVG preserveAspectRatio, e.g. 'xMidYMid meet' (default) or 'xMidYMax slice'
 *                                         to fill a CSS-sized box and crop the edges (hero art that must fit the viewport)
 * @param {string} [options.label]         accessible name; omit for decorative animations (aria-hidden)
 * @param {boolean} [options.autoplay=true] start when first visible
 * @param {() => Promise<any>} [options.loadPlayer] returns the lottie-web module
 * @param {string} [options.playerUrl]     script URL used when loadPlayer is not given
 * @param {(ctl: object) => void} [options.onReady]
 */
export function mountLottie(el, options = {}) {
  const { intro, loop = false, label, autoplay = true, onReady } = options;
  const reduce = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
  let anim = null;
  let segments = {};
  let visible = false;
  let destroyed = false;
  let current = null; // { name, looping }

  if (label) { el.setAttribute('role', 'img'); el.setAttribute('aria-label', label); }
  else el.setAttribute('aria-hidden', 'true');

  const posterFrame = () => {
    const { poster } = options;
    if (typeof poster === 'number') return poster;
    if (typeof poster === 'string' && segments[poster]) return segments[poster][1] - 1;
    if (intro && segments[intro]) return segments[intro][1] - 1;
    return 0;
  };

  const showPoster = () => { anim?.goToAndStop(posterFrame(), true); current = null; };

  const play = (name, looping = false) => {
    if (!anim) return;
    if (reduce?.matches) { showPoster(); return; }
    current = { name, looping };
    anim.loop = looping;
    if (name === true || name == null) anim.goToAndPlay(0, true);
    else if (segments[name]) anim.playSegments(segments[name], true);
    else console.warn(`Lottie: no segment named "${name}"`, Object.keys(segments));
    if (!visible || document.hidden) anim.pause();
  };

  const start = () => {
    if (reduce?.matches || !autoplay) { showPoster(); return; }
    if (intro && segments[intro]) play(intro, false);
    else if (loop) play(loop === true ? true : loop, true);
    else play(true, false);
  };

  const onComplete = () => {
    if (!current || current.looping) return;
    const finishedIntro = current.name === intro;
    current = null; // a finished one-shot holds its last frame; visibility changes must not replay it
    if (finishedIntro && loop) play(loop === true ? true : loop, true);
  };

  const sync = () => {
    if (!anim || !current) return;
    if (visible && !document.hidden) anim.play(); else anim.pause();
  };

  const onMotionChange = () => (reduce.matches ? showPoster() : start());

  const load = async () => {
    const [lottie, data] = await Promise.all([
      options.loadPlayer ? options.loadPlayer() : loadScriptPlayer(options.playerUrl || DEFAULT_PLAYER_URL),
      options.data ? Promise.resolve(options.data) : loadData(options.src),
    ]);
    if (destroyed) return;
    segments = segmentsOf(data);
    anim = lottie.loadAnimation({
      container: el, renderer: 'svg', loop: false, autoplay: false,
      animationData: structuredClone(data), // lottie-web mutates its input
      rendererSettings: { preserveAspectRatio: options.fit || 'xMidYMid meet', progressiveLoad: true },
    });
    anim.addEventListener('complete', onComplete);
    anim.addEventListener('DOMLoaded', () => { start(); onReady?.(controller); });
  };

  // Reserve layout before anything loads (needs w/h: from options.data, or options.aspectRatio).
  const ratio = options.aspectRatio || (options.data && `${options.data.w} / ${options.data.h}`);
  if (ratio && !el.style.aspectRatio) el.style.aspectRatio = ratio;

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !anim && !destroyed) load().catch((error) => console.error(error));
    sync();
  }, { rootMargin: '200px' });
  io.observe(el);
  document.addEventListener('visibilitychange', sync);
  reduce?.addEventListener?.('change', onMotionChange);

  const controller = {
    play,
    poster: showPoster,
    get segments() { return { ...segments }; },
    get animation() { return anim; },
    destroy() {
      destroyed = true;
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduce?.removeEventListener?.('change', onMotionChange);
      anim?.destroy();
      anim = null;
    },
  };
  return controller;
}
