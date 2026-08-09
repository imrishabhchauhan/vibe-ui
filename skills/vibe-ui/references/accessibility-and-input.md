# Accessibility and Input

Accessibility is a release floor, not a later polish pass.

## Use the platform

- Use buttons for actions and links for navigation.
- Use native inputs, labels, headings, landmarks, lists, and dialogs before custom widgets.
- Add ARIA only when native semantics cannot express the interaction.
- Keep DOM, reading, visual, and focus order aligned.

## Keyboard and focus

Every pointer path needs a keyboard path. Show a visible `:focus-visible` indicator. Overlays move focus inside, trap it when modal, close with Escape where expected, make the background inert, and return focus to the trigger.

Composite widgets follow the relevant ARIA Authoring Practices keyboard model. Never use positive `tabindex`.

## Names, states, and feedback

- Give every control an accessible name.
- Include visible label text in the accessible name.
- Expose expanded, selected, pressed, invalid, busy, and disabled states correctly.
- Use `aria-describedby` for field help and errors.
- Use a stable polite status region for non-urgent dynamic updates.
- Reserve alerts for urgent errors.
- Do not hide focusable elements from the accessibility tree.

## Hit areas and input

Meet the WCAG 2.5.8 24px target-or-spacing baseline and aim around 44px for touch when density allows. Expanded hit areas must not overlap. Do not rely on hover; touch, keyboard, switch, voice, and zoom users need equivalent access.

## Forms

Keep submit available until the request starts, validate on submit, focus the first invalid field, and explain how to fix it. Use correct `type`, `inputmode`, `name`, and `autocomplete`. Never block paste. Do not use disabled controls as the only explanation of missing requirements.

## Images and icons

Decorative images use empty alt text. Informative images describe meaning. Functional images describe the action. Icon-only controls need accessible labels; decorative icons are hidden from assistive technology.

## Motion, zoom, and reflow

Honour reduced motion. Remove autoplay, parallax, large translations, and non-essential loops. Preserve zoom and reflow at 320 CSS px and 200%. Never disable user scaling. Use flexible heights for text containers.

## Verification

At minimum:

1. complete the flow with keyboard only;
2. inspect names, roles, values, and states;
3. run available automated checks;
4. check zoom/reflow and text resize;
5. check reduced motion;
6. test a representative screen reader for critical or custom interactions when available.

Automated tools cannot prove accessibility. Mark unperformed assistive-technology checks as not verified.

