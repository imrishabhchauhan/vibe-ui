# Visual and Behavioural Validation

## Build a state matrix

Select only applicable rows, but do not omit failure or accessibility states because they are inconvenient.

| Dimension | Representative checks |
| --- | --- |
| Viewport | 320, 375, 768, 1024, 1440 CSS px plus project breakpoints |
| Content | normal, empty, long, translated, partial, malformed |
| Network | loading, slow, offline, timeout, retry, duplicate submission |
| Interaction | hover, focus-visible, active, selected, disabled, open, closed |
| Outcome | success, warning, field error, request error, destructive confirmation |
| Appearance | light, dark, increased contrast, forced colours when supported |
| Preference | reduced motion, large text, zoom/reflow |
| Input | keyboard, touch, pointer, screen reader for critical/custom flows |

## Capture evidence

For every visual comparison record route, viewport, state, data fixture, theme, and timestamp or commit. Keep before and after conditions identical. Prefer screenshot diffs or side-by-side comparison for geometry and styling; use interaction traces for focus, motion, and state.

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

## Accessibility checks

Run automated tooling if present, keyboard traversal, accessible-name/state inspection, zoom/reflow, reduced motion, and a representative screen reader for critical custom interactions. Automation is evidence, not proof.

## Performance checks

Watch layout shift, delayed input feedback, expensive animation, oversized imagery, unnecessary client JavaScript, and re-render storms. Route deep performance work to Vibe Performance when installed.

## Verdict

- `Block`: a task, access path, destructive safeguard, or critical supported viewport is broken.
- `Needs changes`: meaningful clarity, consistency, responsiveness, or polish issues remain.
- `Approve`: no actionable findings remain in the verified scope.

Always list what was not tested.

