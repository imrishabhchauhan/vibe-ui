# Lottie and Vector Animation

Before choosing Lottie, read section 1 of `coded-motion-components.md`: if the motion is the product's own interface, build it in code instead.

Load this module whenever a task adds, replaces, audits, or authors an illustrative animation: success and error moments, empty states, onboarding or hero illustrations, loaders, celebratory moments, animated icons, or any Lottie, dotLottie, or Rive asset. Read `motion-and-feedback.md` first; its rules (motion needs a job, reduced motion, calm chrome) still apply.

## 1. Choose the medium before the asset

Pick the lightest medium that can do the job:

| Need | Use | Why |
| --- | --- | --- |
| Hover, press, focus, open/close, toggles, tab or panel changes | CSS transitions or the project's motion library | Interruptible, tiny, follows layout and theme tokens. Lottie is the wrong tool. |
| A simple spinner, skeleton shimmer, or progress bar | CSS | A Lottie player for a spinner costs more than the spinner. |
| Showing the product itself in action (a call screen, an upload flow, a scorecard) on a landing page | **Coded live UI**: real HTML and CSS components driven by a scripted cursor and timeline | Real text stays sharp and translatable, light and dark come from one source, about 8 KB. The same demo as Lottie measured about 80 KB gzip, because text becomes shapes. |
| Artwork code cannot reasonably produce: brand moments (logo reveals), morphing or organic shapes (voice orbs, blobs), characters, icon morphs and draw-ons, illustrations, cross-platform assets (web + iOS + Android), scroll-scrubbed vector scenes | **Lottie** played by `lottie-web` (`lottie_light`, SVG) | Small JSON, vector-crisp, free and open-source player, works in any web stack. |
| Lottie that must carry its own state machine, theming slots, or several animations in one file, and the page can afford a WASM player | dotLottie (`@lottiefiles/dotlottie-web`, WebGL build) | Interactivity lives in the file. Large runtime; see budgets. |
| Rich runtime interactivity: characters reacting to many inputs, data-bound values, layout-aware animation, game-like UI | Rive | Its state machines and data binding exceed Lottie. Large runtime; check the plan's export terms. |
| Photographic, long, or narrative footage | Video (`<video>` with poster, muted, `playsinline`) | Lottie is not a video codec. |

Do not add a Lottie when a static illustration plus a CSS fade communicates the same thing. Every Lottie must earn its bytes, attention, and motion.

## 2. Choose the player by measured cost

Starting figures from one measured comparison (Oct 2026: lottie-web 5.13.0, dotlottie-web 0.81.0, @rive-app/canvas 2.43.1; gzipped; headless Chrome at a 390×844 viewport, 3× device pixel ratio, CPU throttled 4×). Re-measure in the target project before quoting numbers to a user.

| Player | Runtime (gzip) | Card-sized animation | Dense scene (≈450 shapes) |
| --- | --- | --- | --- |
| `lottie-web` `lottie_light` (SVG, no expressions) | ~46 KB | smooth | ~55 fps |
| `lottie-web` `lottie_svg` (expressions) | ~62 KB | smooth | ~55 fps |
| `dotlottie-web` software renderer | ~529 KB | 14–36 fps at 3× DPR | 5–8 fps |
| `dotlottie-web/webgl` | ~564 KB | smooth | ~30 fps |
| Rive canvas | ~908 KB | smooth | ~85 fps |

Rules that follow:

- Default to `lottie-web/build/player/lottie_light` with the SVG renderer.
- Use `lottie_svg` (full) only when the file uses expressions. Confirm with `scripts/lottie-inspect.mjs`.
- Use the canvas renderer only for very dense scenes after measuring. It loses crisp CSS scaling and DOM accessibility.
- If dotLottie is required, use the WebGL build, cap the device pixel ratio at 2, and budget the WASM download.
- Gaussian blur (depth of field, soft shadows, bloom) renders only in the full SVG build (`lottie_svg`), as an SVG filter. Prefer radial-gradient glows where they look the same: blur filters clip at their filter region and cost paint time.
- A React wrapper is acceptable when it lets you pick the light build and exposes segments and destroy. Check which `lottie-web` entry it imports before adopting it.

## 3. Asset contract

Every shipped Lottie file should satisfy:

- **Size budget (gzip):** spot icon ≤ 15 KB, state illustration ≤ 30 KB, hero scene ≤ 80 KB, full-screen overlay ≤ 60 KB. Above that, look for baked keyframes, duplicated shapes, or embedded images.
- **No embedded raster images**, no fonts that need loading (convert text to shapes or render text in HTML beside the animation), no expressions unless the full build is chosen deliberately, and no After Effects effects (`ef`): lottie-web ignores most of them silently.
- **Named segments (markers)** for every state the UI can request, for example `in`, `idle`, `on`, `off`, `uploading`, `done`. UI code plays segments by name and never hard-codes frame numbers.
- **A poster frame:** the frame that reads as the finished state, shown when motion is reduced and before the player loads.
- **Seamless loops:** the first and last frames of a loop segment are identical. Settle one-shots within about 1.6 s, then hold or hand over to a calm idle segment.
- **Brand colours only**, from the project's tokens. Lottie colours are baked in, so supply a dark-theme variant file when the app supports dark mode and the art does not read on both.
- **Provenance:** record the source, author, and licence of third-party animations (marketplaces differ per asset and per plan) next to the asset or in `.vibe-ui/PROJECT.md`.

Run `node .agents/skills/vibe-ui/scripts/lottie-inspect.mjs <file.json> [...]` on every new or changed Lottie file. It reports size, duration, layers, segments, unsupported features, and the cheapest compatible player build.

## 4. Implementation contract

Use the bundled component and helper rather than re-deriving them:

- React, Next.js, TanStack Start: `assets/lottie/LottiePlayer.tsx`
- Plain HTML or any framework: `assets/lottie/lottie-player.js`

Both implement the rules below. When writing your own, keep every rule:

1. **Reserve the box.** Give the container a fixed `aspect-ratio` from the file's `w`/`h` so loading never shifts layout.
2. **Load lazily, client-only.** Import the player inside an effect or after an `IntersectionObserver` hit. In Next.js App Router, keep the component a small `"use client"` leaf; never make a page or layout a client component to host an animation. Serve JSON from `public/` (or a CDN) instead of bundling large files into JavaScript.
3. **Split static from animated.** For large scenes (heroes), export a static back plate (floor light, glass panels, guide lines) and an animated front plate as two files. Stack them, and give the front its own compositor layer (`will-change: transform`). One SVG repaints everything under a moving element; a measured hero went from ~35 fps to the 144 fps ceiling with this split alone.
4. **Pause off-screen.** Pause when the element leaves the viewport and when `document.hidden` is true. Cap concurrent playing animations on one screen at a handful.
5. **Honour reduced motion.** Under `prefers-reduced-motion: reduce`, do not autoplay. Render the poster frame with `goToAndStop(poster, true)`, and react if the preference changes while mounted.
6. **Name it or hide it.** Decorative animation gets `aria-hidden="true"`. Meaningful animation gets `role="img"` and an `aria-label`, but the state it shows must also exist as text (for example "Payment complete"). Animation is never the only feedback.
7. **Interact through real controls.** Clickable animations live inside a `<button>` (with `aria-pressed` for toggles), not a clickable `<div>`. Play the matching segment with `playSegments(segment, true)`.
8. **Destroy on unmount.** Call `animation.destroy()`, disconnect observers, and remove listeners.
9. **Do not block the task.** A one-shot must never delay navigation, focus, or the next action. Celebrations are rare and dismiss themselves.

## 5. Authoring

Choose the authoring path that can be verified and maintained:

- **Generated JSON (code):** best for icon sets, state illustrations, and data-driven variants. Keep one generator per animation, a shared palette, easing, and timing kit, and regenerate instead of hand-editing JSON.
- **LottieFiles Creator** (optionally through its MCP bridge): best for designer iteration and visual editing. Export `.json` for lottie-web.
- **After Effects + Bodymovin:** best for complex character or illustration work. Avoid effects and expressions unless the full build is accepted.

If the LottieFiles `motion-design` companion skill is installed, use it to choose personality, timing, easing, and choreography before keyframing. Vibe UI's restraint rules win for high-frequency interface chrome.

House motion rules for illustrative Lottie:

- One signature easing for most moves (a decelerating curve such as `cubic-bezier(0.2, 0, 0, 1)`). Overshoot only on small accents.
- Three layers of motion: primary (the story), secondary (follow-through such as sparks, shadows, clapper lag), and ambient (quiet idle). A flat animation is usually missing the secondary layer.
- Stagger related elements by 40–80 ms. Exits are faster and quieter than entrances.
- Use the brand accent sparingly (about 5–10% of the art). Most of the art uses the workhorse colour and neutrals.

## 6. Agentic and cloud workflow (no desktop, no editor window)

Lottie is just JSON, so an agent can author, review and ship it anywhere: on a laptop, in CI, or in a cloud session with nobody at the keyboard.

| Path | What it does | Where it works |
| --- | --- | --- |
| **Generated JSON (default for agents)** | Write the animation as code with `assets/lottie-forge/lot.py` (shapes, paths, path morphs, trims, masks, gradients, markers), one generator file per asset. Review with `scripts/lottie-render.mjs`, validate with `scripts/lottie-inspect.mjs`. | Anywhere with Python 3, Node 18+ and Chromium. Fully headless. |
| **LottieFiles remote MCP** (`https://mcp.lottiefiles.com/mcp`, OAuth sign-in) | Works on the LottieFiles account: list workspaces and projects, find animations by tag, rename and organize, and run the platform GraphQL API. It does not build or edit animation content. | Any MCP client, including cloud sessions, once signed in. |
| **Lottie Creator MCP** (local npm bridge) | Builds and edits inside a Lottie Creator browser tab. | Only on a machine with that tab open. Not for unattended or cloud work. |
| **dotLottie packaging** (`@lottiefiles/dotlottie-js`) | Bundles several animations, themes and state machines into one `.lottie` file. | Node, anywhere. |

Cloud setup, once per session:

```bash
pip install fonttools svgpathtools   # text-as-paths and SVG import, only if the generator needs them
npm i lottie-web                     # the player the renderer and the site use
npx playwright install chromium      # only if the box has no Chrome; lottie-render.mjs finds it
```

Agent loop for every asset:

1. Write or edit `<name>.py`, then run it to produce `<name>.json`.
2. Run `node scripts/lottie-render.mjs <name>.json --segments` (or `--frames 0..120:10`) and read the PNG. Look for alignment, clipping, muddy colour, a broken-looking mid-transition frame, and whether the loop seam matches.
3. Run `node scripts/lottie-inspect.mjs <name>.json --budget=…` and clear its warnings.
4. Commit the generator, the JSON and the contact sheet, so a reviewer on a phone can see the frames in the pull request.

Brand assets: import the official SVG and animate its parts. Never redraw or recolour a logo.

## 7. Verify

- Render a contact sheet of key frames (start, mid-action, settle, idle, loop end). Check centring, clipping, overlap, line weight, colour, and that loop start equals loop end.
- Play in the real page at the smallest and largest sizes it appears, in light and dark themes when supported.
- Test reduced motion (poster shown, no autoplay), keyboard activation of interactive animations, and screen-reader output.
- Measure on a throttled mobile profile when a page carries a dense scene or more than a few animations. Check that off-screen animations are paused.
- Record the inspect output and the contact sheet in `.vibe-ui/evidence/`.

## Audit signals

Treat these as candidates to confirm, not automatic defects:

- a Lottie replacing what CSS could do (button hover, spinner, toggle);
- the full `lottie-web` build, or a WASM player, used for files that need neither;
- autoplaying loops with no reduced-motion handling, or that keep running off-screen;
- containers without reserved dimensions (layout shift on load);
- an animation as the only signal of success, error, or progress, or a loader implying progress that is not real;
- many simultaneous loops near reading or form content;
- oversized files, embedded images, or unsupported features that render differently in the chosen player;
- third-party assets without a recorded licence.
