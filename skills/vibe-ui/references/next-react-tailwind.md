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
- During scoped refetches, prefer the repository's supported placeholder or previous-data pattern over clearing the entire region. Keep the selected filter immediate, expose `isFetching` locally, and prevent stale responses from overwriting a newer selection.

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

Use the installed Tabs, Select, Tooltip, Link, and Card primitives before drawing custom substitutes. A text pair with an underline is not a tab system unless it exposes selected state, keyboard behaviour, focus treatment, and a visibly changed panel.

### Base UI and Radix composition

Identify the installed library and version before applying composition advice; Base UI and Radix APIs are not interchangeable.

- Base UI popup triggers render their own element by default and use the documented `render` prop to compose another element. Do not place an interactive child inside a trigger that already renders an interactive element.
- Radix triggers use `asChild` to replace the default element with the child. A valid single button child is the documented composition pattern, not an automatic nested-button defect.
- Inspect the rendered DOM for nested buttons, links inside links, invalid interactive descendants, duplicate focus targets, and missing accessible names. Treat actual invalid markup or hydration errors as blockers.
- Keep critical descriptions inline or in an accessible popover/disclosure. A tooltip is supplementary and cannot be the only explanation for touch or assistive-technology users.

### Tabs and expensive panels

Inspect the installed primitive's mounting behaviour rather than assuming inactive panels unmount. Confirm whether heavy charts, editors, requests, observers, and subscriptions run while hidden. Defer expensive Client Components only when it improves the measured path and preserves state intentionally; Suspense or dynamic import is a tool, not a default fix.

## Verification

Run the repository's typecheck, lint, targeted tests, build, and browser flow. Inspect the client boundary and bundle impact when adding interactivity or motion. Test hydration-sensitive and server/client state transitions.

