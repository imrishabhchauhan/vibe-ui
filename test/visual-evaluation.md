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

Minimum acceptance: no zero, at least 15/18 overall, and score 2 for task success, accessibility, and context fit. A failed case becomes a specific skill revision followed by a clean rerun.
