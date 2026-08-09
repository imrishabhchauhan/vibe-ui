# Visual and Behavioural Validation

## Build a state matrix

Select only applicable rows, but do not omit failure or accessibility states because they are inconvenient.

| Dimension | Representative checks |
| --- | --- |
| Viewport | 320, 375, 768, 1024, 1440 CSS px plus project breakpoints |
| Content | normal, empty, long, translated, partial, malformed |
| Data scope | current, historical, zero, unavailable, future period, partial period |
| Network | loading, slow, offline, timeout, retry, duplicate submission |
| Interaction | hover, focus-visible, active, selected, disabled, open, closed |
| Outcome | success, warning, field error, request error, destructive confirmation |
| Appearance | light, dark, increased contrast, forced colours when supported |
| Preference | reduced motion, large text, zoom/reflow |
| Input | keyboard, touch, pointer, screen reader for critical/custom flows |

## Capture evidence

For every visual comparison record route, viewport, state, data fixture, theme, and timestamp or commit. Keep before and after conditions identical. Prefer screenshot diffs or side-by-side comparison for geometry and styling; use interaction traces for focus, motion, and state.

For `audit`, `improve`, and `validate`, rendered evidence is required for visual approval when runtime access is available and authorised. Capture compact touch, tablet, and desktop widths or supported project equivalents. Scroll the full surface, including every affected tab or panel. If rendering cannot be performed, label the result `code-only, visually unverified` and do not return `Approve`.

## Visual checks

- no clipping, overlap, unintended horizontal scroll, or hidden actions;
- hierarchy remains clear at all widths;
- shared edges and spacing rhythm hold;
- text wraps and truncates intentionally;
- loading preserves layout;
- focus and selection remain visible;
- contrast and status cues work in every appearance;
- image crop and aspect ratio preserve meaning;
- motion starts from and ends in stable states.

## Behaviour checks

Complete the primary journey, then force invalid input, server failure, interruption, retry, and back navigation. Check duplicate submissions and preservation of drafts. Use real permissions where role-specific UI exists.

For every filter and tab, verify the selected styling, changed data domain, copy semantics, URL or state persistence when intended, and refetch transition. Toggle away and back. Confirm that a zero result remains structurally intentional, a historical period does not retain current-period wording, and a full-period control does not appear inert merely because some months lack data.

Inspect the browser console before and after the change. New hydration, rendering, accessibility, request, and uncaught errors are blockers. The target is zero relevant errors; when unrelated errors pre-exist, record exact evidence and prove the change did not add or worsen them.

Inspect every changed interactive control in default, hover, focus-visible, active or pressed, selected, disabled, loading, and error states when applicable. Verify the full scroll extent for clipping, sticky collisions, hidden overflow, and unreachable content.

## Accessibility checks

Run automated tooling if present, keyboard traversal, accessible-name/state inspection, zoom/reflow, reduced motion, and a representative screen reader for critical custom interactions. Automation is evidence, not proof.

## Performance checks

Load `context-dependencies-and-performance.md`. Watch layout shift, delayed input feedback, eager inactive panels, hidden charts or observers, request waterfalls, oversized imagery, unnecessary client JavaScript, and re-render storms. Inspect runtime evidence and the responsible dependency path. Route deep profiling to Vibe Performance when installed.

## Verdict

- `Block`: a task, access path, destructive safeguard, or critical supported viewport is broken.
- `Needs changes`: meaningful clarity, consistency, responsiveness, or polish issues remain.
- `Approve`: no actionable findings remain in the verified scope.

Always list what was not tested.

