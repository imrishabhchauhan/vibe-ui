# Visual Forward-Test Programme

Run these cases against disposable fixtures or approved real projects. Use the same route, data, theme, viewport, and browser before and after. Do not give the testing agent the expected fix.

## Case 1 — Information card hierarchy

Prompt: `Use $vibe-ui improve to redesign this dense order summary card without removing essential information.`

Fixture: equal-weight restaurant, item, day, time, pickup, destination, and price rows.

Pass evidence:

- item and price lead;
- route and timing relationships are clear;
- long locations and translated text do not clip;
- the card works at 320, 768, and 1440px;
- code reuses existing primitives and tokens.

## Case 2 — Value before sign-up

Prompt: `Use $vibe-ui improve on this SEO report acquisition flow.`

Fixture: report content blurred until account creation.

Pass evidence:

- users receive meaningful, truthful value before registration;
- the account request explains the incremental benefit;
- critical, warning, and passed results are scannable;
- no fake scarcity, reciprocity trick, or inaccessible colour-only status appears.

## Case 3 — Honest progress

Prompt: `Use $vibe-ui improve on this five-step profile setup flow.`

Fixture: current page says 0% after account creation.

Pass evidence:

- completed work counts only when real;
- remaining steps and current position are clear;
- draft data survives navigation or request failure;
- reduced motion and keyboard traversal work;
- progress does not nag after dismissal.

## Case 4 — Smart defaults in booking

Prompt: `Use $vibe-ui build to create a restaurant booking step for mobile, tablet, and desktop.`

Fixture: empty selects for date, time, guests, seating, and occasion.

Pass evidence:

- only safe, evidence-backed choices default;
- alternatives remain easy to change;
- time discovery and party-size input are efficient;
- the search action names the result when known;
- touch targets, keyboard operation, errors, loading, and no-availability states pass.

## Case 5 — Professional dashboard system

Prompt: `Use $vibe-ui audit full on this Next.js and Tailwind dashboard.`

Fixture: inconsistent page gutters, arbitrary colours, duplicated buttons, mixed icons, weak empty state, and a large page-level Client Component.

Pass evidence:

- findings identify root tokens/primitives instead of listing symptoms;
- accessibility blockers outrank decoration;
- Next.js recommendations match installed versions and current docs;
- implementation suggestions preserve Server Components where practical;
- audit remains read-only.

## Case 6 — Motion restraint

Prompt: `Use $vibe-ui improve to make this modal, tabs, tooltip, and success state feel polished.`

Fixture: `transition-all`, long bounce animations, no reduced-motion treatment, and layout-shifting transitions.

Pass evidence:

- Transitions.dev is used only if installed and relevant;
- exact properties and coherent tokens replace ad-hoc motion;
- interactions remain interruptible;
- reduced motion works;
- motion does not delay primary actions or become the only feedback.

## Case 7 — Context changes the design logic

Prompt A: `Use $vibe-ui build to create a homepage for a B2B reporting product.`

Prompt B: `Use $vibe-ui build to create the signed-in reporting workspace for the same product.`

Pass evidence:

- the homepage prioritises relevance, value, proof, objections, and an honest next action;
- the workspace prioritises live data, repeated tasks, filters, status, recovery, and appropriate density;
- both preserve the same brand system without sharing one generic card-grid layout;
- the agent records product type, journey stage, archetype, dominant content, audience, density, and device assumptions;
- fashionable surfaces, oversized headings, and decorative motion appear only with functional justification.

## Case 8 — Settings information architecture

Prompt: `Use $vibe-ui audit on this production settings route.`

Fixture: ten horizontally overflowing tabs, repeated card descriptions, distant switches, important and optional explanations mixed together, and several shared primitives.

Pass evidence:

- navigation architecture is evaluated before individual panel styling;
- excess choices trigger a concrete goal-based grouping proposal rather than an arbitrary tab limit;
- explanatory blocks are classified as critical, supporting, on-demand, conditional, or duplicated;
- essential help remains accessible on touch and to assistive technology instead of being hidden in tooltips;
- controls remain visually and semantically associated with their labels;
- dependencies, shared consumers, and affected states are included in the audit scope.

## Case 9 — Tab performance and dependency tracing

Prompt: `Use $vibe-ui improve to make this tabbed Next.js workspace feel responsive.`

Fixture: inactive panels mount charts and editors, an effect fetches duplicate data, a shared loading boundary blanks the whole page, and the target component has several consumers.

Pass evidence:

- the agent traces route, layout, panels, hooks, data path, primitive, and shared consumers;
- runtime behaviour and source evidence identify the actual bottleneck;
- inactive work is deferred without erasing intentionally persistent state;
- the fix does not prescribe Suspense, memoisation, or dynamic import without evidence;
- slow, empty, error, retry, and stale-response states remain usable;
- affected consumers receive proportional regression checks.

## Case 10 — Framework composition and verification gate

Prompt: `Use $vibe-ui validate on these Base UI and Radix tooltip changes.`

Fixture: one valid Radix `asChild` button, one invalid Base UI nested button, hardcoded Tailwind palette classes, a raw image, and a hydration error visible in the browser console.

Pass evidence:

- valid Radix composition is not incorrectly flagged as nested markup;
- the Base UI composition follows its installed-version `render` API;
- static candidates are confirmed rather than reported as proven defects;
- compact touch, tablet, and desktop evidence covers affected states and full-page overflow;
- new console or hydration errors block approval;
- when runtime access is prohibited, the verdict is explicitly `code-only, visually unverified`, never `Approve`.

## Scoring rubric

Score each 0–2:

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Task success | blocked or unclear | completes with friction | obvious, recoverable completion |
| UX reasoning | generic taste | partly evidence-led | audience/task/evidence linked |
| Accessibility | blockers remain | basics pass | keyboard, semantics, zoom, motion verified |
| Responsive | one viewport | major widths pass | content-driven adaptation and stress states pass |
| Visual system | arbitrary styling | mostly coherent | shared tokens, hierarchy, and consistency |
| Framework fit | parallel patterns | acceptable reuse | native Next/React/Tailwind implementation |
| State coverage | happy path only | main errors/loading | complete relevant state matrix |
| Verification | claims only | partial checks | reproducible visual and behavioural evidence |
| Context fit | generic pattern | some audience or page awareness | product, journey, archetype, density, and device logic agree |
| Dependency awareness | target file only | main imports inspected | parents, data path, primitives, and affected consumers traced |
| Experience performance | ignored | source candidates noted | runtime and dependency evidence drive a proportional fix |

Minimum acceptance: no zero, at least 19/22 overall, and score 2 for task success, accessibility, context fit, and dependency awareness. A failed case becomes a specific skill revision followed by a clean rerun.
