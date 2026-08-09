# Motion and Feedback

## Give motion a job

Use motion only to explain continuity, state change, hierarchy, spatial relationship, or direct manipulation. Static cues must still communicate the state.

Prefer:

- opacity and small translation for entry/exit;
- interruptible CSS transitions for interactive state changes;
- transforms and opacity for compositor-friendly motion;
- short feedback for frequent actions;
- quieter exits than entrances;
- one coherent duration and easing system.

Never use `transition: all`. Avoid layout-triggering animation when a transform can communicate the same change. Use `will-change` only for observed first-frame problems and remove it when no longer needed.

## Timing starting points

These are starting ranges, not universal tokens:

- micro feedback: 80–150ms;
- common control or popover state: 150–250ms;
- larger panel or staged transition: 250–400ms;
- rare emphasis: up to about 500ms when it does not delay action.

Match the existing system. Do not add animation merely to use a library.

## Direct manipulation and interruption

Interactive animations should reverse smoothly when the user changes direction. Avoid one-shot keyframes for hover, open/close, or toggles when transitions or state-driven motion can be interrupted.

## Reduced motion

Under `prefers-reduced-motion: reduce`:

- remove parallax, large spatial moves, tilt, shake, and autoplay;
- replace necessary transitions with short opacity changes or instant state updates;
- retain non-motion feedback such as text, colour, and icon changes.

## Transitions.dev companion

If `transitions-dev` is installed, select a pattern by the visible interaction and follow that skill's implementation and reduced-motion instructions. Do not copy Pro recipes or call the `transitions-pro` package. If it is absent, use the project's existing motion primitives or restrained native CSS.

Textual example:

- Before: a button uses 600ms bounce, glow, and scale on every hover.
- After: colour changes in 120ms, press scales subtly, focus remains visible, and reduced motion removes scale.

## Feedback rules

- Input acknowledgement should feel immediate.
- Optimistic success is only safe when rollback and failure communication are reliable.
- Loading animation must not imply progress that is not real.
- Error shake cannot replace error text and focus management.
- Success celebration must be rare, proportional, and non-blocking.
- High-frequency interface chrome should be calm.

## Verify

Replay at slow speed, interrupt open/close mid-flight, test repeated triggers, inspect layout stability, measure on low-end or throttled conditions where relevant, and verify reduced motion.

