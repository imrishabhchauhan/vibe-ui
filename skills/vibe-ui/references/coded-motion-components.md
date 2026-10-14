# Coded Motion Components and Live Product Demos

Load this module when building an animated component in code: a live product demo on a landing page (the product's own interface playing a short story, driven by a scripted cursor), a polished interactive component (uploader, command menu, toast stack, stepper, chart reveal), or any motion that involves real text, real data, or real interaction. Read `motion-and-feedback.md` first. For illustration, brand, or organic motion, read `lottie-and-vector-animation.md` instead; section 1 below draws the line.

## 1. Code or Lottie?

| The motion is… | Build with | Why |
| --- | --- | --- |
| The product's own interface: screens, rows, buttons, numbers, text, states | **Code** in the project's stack | Real text (sharp, translatable, accessible), light and dark from one source, uses the real component library, a few KB. |
| A response to the user: hover, press, drag, open/close, reorder, layout change | **Code** (CSS transitions or the project's motion library) | Must be interruptible and follow real layout. |
| Data that changes: counters, progress, charts, live status | **Code** | Values come from props or state, not baked frames. |
| Organic or morphing shapes: blobs, liquid, voice orbs, hand-drawn strokes | **Lottie** | Path morphing and many coordinated shapes are designer work; CSS can't morph arbitrary paths. |
| Brand moments: logo reveal, signature transition, splash | **Lottie** | Frame-accurate choreography authored once by a designer, replayed identically everywhere. |
| Characters, mascots, illustrated scenes | **Lottie** (or Rive if they react to many inputs) | Hand-animated art. Rebuilding it in code is slow and never matches. |
| Animated icons that morph between states or draw on | **Lottie** | Small, crisp, consistent across the set, plays a segment on hover or click. |
| One asset for web, iOS, Android, React Native and Flutter | **Lottie** | The same JSON plays natively on every platform. A coded web demo is web-only. |
| A vector timeline scrubbed by scroll or a slider | **Lottie** | Seek to any frame (`goToAndStop`) of a complex scene; code has no timeline to scrub. |

Hybrids are normal: a coded call screen can host a small Lottie voice orb, and a coded hero can embed a Lottie logo mark.

Worked examples (measured):
- **Brand reveal:** the official logo SVG is split into parts (globe, letters, rule, tagline) and each part gets its own timing. It ends exactly on the static logo and is 8 KB gzip. The same file can serve as the native app splash.
- **Voice orb inside a coded call screen:** four state loops (idle, listening, thinking, speaking) that all start and end on the same rest pose. The coded UI requests a state and the player switches at the next `loopComplete`, so there is never a jump. 13 KB.
- **Animated feature icons:** one set (64 px grid, 2.25 px strokes, ink plus one accent). Each plays once on hover or focus and once on scroll-in on touch devices, and must end on its frame-0 rest pose. Under 1 KB each.

## 2. Build in the project's own stack

Never ship a parallel mini-framework. Detect the stack (`scripts/detect-project.mjs`, `.vibe-ui/PROJECT.md`) and build the component the way that codebase builds components.

**Next.js App Router**
- The section stays a Server Component. The animated demo is one small `'use client'` leaf that receives copy and data as props.
- Render the demo's initial state on the server exactly as the client's first frame. Start the timeline in `useEffect`, never during render. Do not call `Math.random()` or `Date.now()` during render, or hydration will mismatch.
- Use the project's fonts (`next/font` variables), Tailwind theme tokens or CSS variables, and its component library (the real `Button`, `Badge`, `Progress`, `Avatar`), so the demo matches the product.
- Motion: if `motion` or `framer-motion` is installed, use it (`AnimatePresence` for enter/exit, `layout` for height and reorder). Otherwise use CSS transitions plus the Web Animations API through the bundled hook. Do not add a motion library just for a demo.
- Lazy-load heavy demos below the fold with `next/dynamic` only when they are large. A typical demo is small enough to stay static.

**TanStack Start, Vite and React SPA:** same React rules. With SSR, keep the first render deterministic, as in Next.js. Use the router's own preloading conventions.

**Vue, Nuxt, Svelte, Astro:** the same structure in their idiom. In Astro, use an island with `client:visible`. Drive the timeline from `onMounted`/`onMount`, and keep state reactive rather than mutating the DOM by hand.

**Plain HTML:** use `assets/live-demo/demo-kit.js` + `demo-kit.css`.

**React projects:** use `assets/live-demo/useLiveDemo.ts` + `DemoCursor.tsx`. The script changes React state; it never mutates React-managed DOM.

## 3. Craft rules for live product demos

These come from frame-by-frame study of top-tier component demos. Every rule is checkable.

- **The real product at 1:1.** Real component, real copy, real numbers, at true UI size (13–16 px text). No isometric scenes, decorative blobs or glows. The demo should be indistinguishable from a screen recording of a polished app.
- **One accent colour.** Neutral surfaces: a card nested in a slightly darker shell, 1 px borders, small shadows. Semantic colours only for meaning: red for an error, green for done, amber for a warning.
- **A complete state story,** in order: idle → intent (hover, drag-over) → action → progress with live numbers → one realistic complication (error, objection, retry) → resolution → calm reset. A demo that only plays the happy path feels fake.
- **A cursor that behaves like a person.** It eases between targets (`cubic-bezier(.45, 0, .2, 1)`, 320–900 ms by distance), rests on hover for 150–300 ms before pressing, and scales to about 0.86 on press. It hides when it has nothing to do.
- **Timing, as measured from the references:**
  - hover and drag-over state: 250–300 ms, fast-out;
  - list items enter 80–120 ms apart, each about 300 ms (fade, small rise, slight de-blur);
  - container height animates over 400–450 ms with an expo-out curve;
  - text swaps cross-fade in about 250 ms;
  - progress advances in uneven real-world steps;
  - numbers count with an ease-out over 0.9–1.2 s in tabular figures.
- **No layout shift on the page.** The stage has a fixed height and the card grows inside it, anchored to the top.
- **The loop:** 10–20 s, with a 2–3 s hold on the result, then a quick fade back to the start state.
- **Light and dark** from the same tokens. Check both.

## 4. Behaviour contract (both kits implement it)

1. Pause the timeline while the stage is off-screen or the tab is hidden. Time must not advance, so the story never skips.
2. Under `prefers-reduced-motion: reduce`, render the finished state once, with no cursor.
3. Accessibility: the stage gets `role="img"` and an `aria-label` that tells the story in one sentence, or `aria-hidden` when adjacent text already says it. Fake controls inside the demo are not focusable (`tabindex="-1"` or `inert`).
4. Clean up on unmount: abort the script, cancel animations, disconnect observers.
5. Performance: animate transform, opacity and filter. Animate height only on the demo's own card, never on page layout. Keep any per-frame work (such as a waveform) inside one requestAnimationFrame loop.

## 5. Verify

- Record frames of a full loop (for example 2–4 fps for 20 s) and read them as a contact sheet: every state, the reset, light and dark.
- Check at the viewport sizes the user actually uses, including their own window size if known, and at 390 px wide.
- Check reduced motion (finished state only), the hidden tab (pauses), and a 4× CPU throttle.
- Compare against the reference the user approved. Any misalignment, clipped text, uneven margin or jitter is a failure.
