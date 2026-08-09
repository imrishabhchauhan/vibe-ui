# Visual Hierarchy and Layout

## Build a reading order

Make the page communicate before it is read. Decide the primary task, supporting context, secondary actions, and metadata. Use position, scale, weight, contrast, and whitespace in that order; avoid solving hierarchy with colour alone.

Test by squinting at the screen. The primary subject and action should remain apparent. Then inspect the DOM and keyboard order: visual and semantic order must agree.

## Group meaningfully

- Keep related labels, values, help, and errors close.
- Make the space between groups at least visibly larger than the space within a group; 2x is a useful starting point.
- Prefer whitespace; use backgrounds when a bounded region adds meaning; use dividers last.
- Avoid card soup. A card must communicate ownership, grouping, selection, or elevation—not merely decorate content.

Textual example:

- Before: a receipt is seven equal label/value rows.
- After: order title and price lead; time is supporting metadata; pickup and destination form a connected route group; the image identifies the item.

## Align deliberately

Choose a small number of shared edges. Align headings, fields, list content, and actions to them. Fix optical imbalance in icons or asymmetric marks rather than trusting mathematical centring.

## Control density

Density depends on task, frequency, and input. A professional desktop data tool may be compact; a touch-first booking flow needs more separation. Do not increase whitespace blindly. Keep high-frequency related information close enough to compare.

## Reveal complexity progressively

Keep primary decisions visible. Place rare, advanced, or destructive options behind clearly labelled disclosure—not invisible gestures or ambiguous icons. Preserve the user's context when opening details.

## Make destinations discoverable

When an entire card or row navigates, give it a consistent visible affordance in the action zone. Use a familiar chevron or arrow with sufficient contrast, hit area, hover, focus-visible, and pressed feedback. Keep it beside the supporting row or trailing edge rather than crowding the title and semantic icon. A restrained border or surface behind the indicator can improve discoverability when a bare glyph is too faint.

Do not rely on cursor change alone. Do not add an arrow to a non-interactive card. Use a real link or button so keyboard and assistive-technology users receive the same destination cue.

## Layout failure patterns

- every block has equal visual strength;
- section headings are weaker than card titles;
- floating actions obscure content or safe areas;
- primary actions sit outside the normal task path;
- fixed heights clip translated, zoomed, or error text;
- columns collapse at framework-default breakpoints rather than when content fails;
- empty space is filled with decorative metrics unrelated to the task.

## Verification

Check narrow and wide extremes, 200% zoom, long strings, translated growth, empty and error states, RTL when supported, keyboard order, and mobile safe areas.

