# Next.js, React, and Tailwind CSS

Verify installed versions and current official documentation before using version-sensitive APIs.

## Recon

Inspect:

- App Router or Pages Router;
- Server and Client Component boundaries;
- global CSS, Tailwind version and theme configuration;
- component libraries such as shadcn/ui, Base UI, Radix, or internal primitives;
- variant helpers and class merging;
- icon, font, form, validation, data, and motion libraries;
- loading, error, not-found, and route transition conventions;
- Storybook, Playwright, Vitest, axe, and visual regression tooling.

## Next.js

- Keep layouts and non-interactive content as Server Components in the App Router.
- Add `'use client'` at the smallest interactive boundary; everything imported below that boundary joins the client graph.
- Keep secrets and privileged data access server-only.
- Use route-level loading and error states consistently with the product shell.
- Prefer framework image, font, link, and form primitives when they fit the installed version and project conventions.
- Preserve layouts during loading to reduce visual shift.
- Treat navigation as a product state: pending, success, failure, restoration, and scroll behaviour matter.

## React

- Model interactions as explicit states rather than imperative DOM toggles.
- Avoid duplicate or derived state that can disagree.
- Preserve or reset state intentionally; do not erase form work because component identity changed accidentally.
- Keep components focused, but do not fragment simple markup into abstraction noise.
- Use native elements and controlled custom widgets with complete keyboard behaviour.
- Memoise only after evidence; unnecessary memoisation harms readability and can be ineffective.

## Tailwind CSS

- Reuse semantic theme tokens and existing utilities.
- Avoid arbitrary values when a shared role exists; a justified one-off is better than a misleading token.
- Build mobile-first and add variants where content needs them.
- Use container queries for component adaptation when appropriate.
- Prefer logical properties or direction-aware utilities in localised layouts.
- Do not compose long opaque class strings repeatedly; extract a component or variant when a pattern is reused.
- Avoid `transition-all`; list properties with targeted transition utilities.
- Keep focus, disabled, dark, reduced-motion, group, and data-state variants explicit.

Textual example:

- Before: a page-level Client Component fetches data in an effect and renders static headings, cards, and one interactive filter.
- After: the page remains server-rendered; data is fetched near the source; a small Client Component owns the filter; loading and empty states retain the same layout.

## Component systems

Extend primitives through documented variants. Do not fork a copied Button, Input, Dialog, or Card for one screen. Repair shared accessibility or token defects at the primitive when safe and verify all consumers.

## Verification

Run the repository's typecheck, lint, targeted tests, build, and browser flow. Inspect the client boundary and bundle impact when adding interactivity or motion. Test hydration-sensitive and server/client state transitions.

