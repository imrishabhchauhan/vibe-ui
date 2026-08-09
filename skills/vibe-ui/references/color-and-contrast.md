# Colour and Contrast

## Start with roles, not swatches

Inventory semantic roles: canvas, surface, elevated surface, primary text, muted text, border, focus, primary action, link, success, warning, danger, selection, and disabled. Components consume roles; they should not invent colours.

Preserve the project's colour notation unless creating or migrating the system. For a new web system, prefer a perceptual space such as OKLCH and verify sRGB gamut.

## Give colour one meaning

If blue means navigation, do not reuse the same treatment for decoration. If red means destructive or error, avoid using it as a harmless accent on the same surface. Pair every status colour with text, icon, shape, or placement.

## Contrast is pair-specific

Measure the rendered foreground against its actual background, including transparency, gradients, overlays, and states. Check normal, hover, focus, selected, disabled, light, and dark appearances.

WCAG 2 contrast starting points:

- normal text: 4.5:1;
- large text: 3:1;
- meaningful UI components and graphical objects: 3:1 against adjacent colours.

Do not treat these as the only readability evidence. Font size, weight, antialiasing, glare, and low vision matter. Do not "fix" contrast by making disabled controls look enabled.

## Build a palette with controlled emphasis

- Keep neutral surfaces dominant.
- Reserve the strongest chroma for the primary action or critical status.
- Tune lightness first when repairing contrast, then re-check hue, chroma, and gamut.
- Design dark appearance rather than mechanically inverting light tokens.
- Provide sRGB fallbacks for wide-gamut colours when used.

Textual example:

- Before: purple fills cards, icons, badges, links, selected controls, and the primary button.
- After: neutral surfaces carry content; purple marks the primary action, selection, and focus; status uses semantic colours with icons and labels.

## Frequent failures

- muted text becomes unreadable on tinted cards;
- border tokens are reused as text tokens;
- placeholder text is the only label;
- several coloured buttons compete;
- dark mode uses pure inversion and produces neon saturation;
- selection is indicated only by colour;
- focus rings disappear against one of the surfaces they cross;
- hard-coded colours bypass theme tokens.

## Verification

Measure exact pairs. Check colour-vision simulation as supporting evidence, not a replacement for semantic cues. Inspect forced colours where relevant. Record the value, threshold, state, and location for each contrast finding.

