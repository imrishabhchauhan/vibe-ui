# Device Audit Protocol

Use this module at the start of every `audit` and `improve` engagement that touches a rendered interface. A professional designer never judges a screen from one window size or from code alone. This protocol makes the agent look at every supported device, in priority order, both visually and in code, before saying anything about quality.

## 1. Device matrix

Priority 1 is desktop and mobile. Tablet is checked every time, but findings there rank below equal findings on desktop and mobile.

| Priority | Class | Viewports (CSS px) | Why |
| --- | --- | --- | --- |
| 1 | Desktop | 1440×900, 1366×768, 1280×800 | Most staff and admin work; 1366×768 is the common low-end laptop and the tightest height |
| 1 | Mobile | 390×844, 360×800, 430×932 | Most parents, learners, and on-the-go managers; 360 is the narrowest common Android width |
| 2 | Tablet | 768×1024, 820×1180, 1024×768 | Portrait and landscape tablets, small laptops in split screen |
| 3 | Wide | 1920×1080 | Checks that content does not stretch or float lost in empty space |

Add the project's own breakpoints and any device the owner names. Check mobile at device scale factor 2 or 3 so text rendering is realistic.

## 2. Visual pass (rendered)

For each viewport, on the entry screen and its connected surfaces (`connected-surfaces.md`):

1. Capture a full-page screenshot. `scripts/capture-viewports.mjs` does this for the whole matrix and reports automatic signals.
2. Look at every screenshot yourself. Automated signals find candidates; your eyes decide.
3. Record, per viewport:
   - horizontal scroll (`scrollWidth` larger than the viewport) and any element overflowing the right edge;
   - text smaller than 12px, tap targets smaller than 44×44px on touch widths;
   - content present on desktop but missing on mobile (numbers, statuses, primary actions);
   - overlap, clipping, sticky elements covering content, floating buttons over list items;
   - whether the first screen answers what the page is for and shows the primary action without scrolling at 1366×768 and 390×844;
   - menus, dialogs, and sheets opening in the right place and fitting the viewport.
4. Exercise interaction where it matters: open the main menu, a dialog, a filter, a long list, the keyboard on a form field (mobile).

## 3. Code pass

Run alongside the visual pass, never instead of it:

1. `scripts/detect-project.mjs` for stack, tokens, and component library (or read `.vibe-ui/PROJECT.md`).
2. `scripts/audit-static.mjs` (or `--changed`) for candidates: near-black fills, heavy weights, oversized text, heavy backdrops, dark by default, hard-coded colours, missing focus styles, clickable divs, fixed heights, tiny text.
3. Read the breakpoints and layout primitives: grid and flex wrapping rules, `hidden md:block` style classes that remove content on small screens (each one is a candidate for "information dropped on mobile"), fixed widths, `overflow-x` on the body, `vh` units that break with mobile browser bars.
4. Check tokens: type scale, weights, spacing, radii, colours. Run `scripts/check-colour.mjs` on the accent and button colours.
5. Map each visual finding to its source (component, token, or layout rule). Fix the shared source, not the symptom.

## 4. Report

Group findings by device priority, then by impact:

```text
Desktop (1440, 1366, 1280): 2 findings
Mobile (390, 360, 430): 4 findings, 1 hard fail (status column missing at 390)
Tablet (768, 820, 1024): 1 finding
Wide (1920): content max-width missing
Scorecard: 71 / 100 (hard fail cap) · Evidence: .vibe-ui/evidence/2026-10-09/
```

Save screenshots under `.vibe-ui/evidence/<date>/` with the viewport in the file name. Never claim a device was checked if it was not; list unchecked devices explicitly.
