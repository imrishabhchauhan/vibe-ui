# Forms, Onboarding, and States

## Reduce the work, not the clarity

Ask only for information needed now. Derive or defer the rest. Group related fields, use visible labels, provide format examples, retain entered values after errors, and preserve drafts for meaningful work.

## Use smart defaults safely

A default is acceptable when it is:

- supported by evidence or prior user choice;
- low risk and easy to reverse;
- visible before commitment;
- not consent, an add-on, a destructive action, or a high-cost choice;
- appropriate for the user's region, role, or context.

Do not default every field. Blank is safer when no dominant safe answer exists.

Textual example:

- Before: restaurant booking uses five empty selects for date, time, guests, seating, and occasion.
- After: tomorrow and two guests are visible, evidence-backed defaults; popular time chips reduce searching; seating remains an explicit choice; occasion is optional.

## Stage onboarding around value

Lead with the smallest credible value moment, then request deeper setup. Explain why information is needed. Allow skip when the feature can work without it. Save progress and make resumption obvious.

Use progress indicators only for finite, known work. Count completed steps honestly. Do not show 20% because it looks motivating if no real completion occurred.

## Design validation and recovery

- Prevent errors with constraints, formats, previews, and reversible actions.
- Validate locally where it improves immediacy, but keep server-side validation authoritative.
- Show field errors beside fields and summary errors when multiple failures exist.
- Preserve valid input after a failed request.
- Provide retry, cancel, back, and support paths appropriate to the stakes.
- Confirm destructive actions with consequence-specific language or provide undo.

## Loading

Choose feedback by duration and uncertainty:

- immediate: visible pressed/pending state;
- short: local spinner or skeleton that preserves layout;
- longer: progress, current stage, cancel when meaningful;
- indeterminate: explain what is happening and preserve agency.

Never show a spinner with no context for a high-stakes action. Never replace a whole page skeleton when only one region is updating.

For filters and tabs, keep the control responsive and the affected region stable. Preserve the last valid result during a short refetch when showing it is not misleading, add a compact local pending indicator, and reserve geometry so cards and charts do not disappear or jump. Never render blank card shells while a neighbouring chart still implies that data exists.

## Empty states

Differentiate first-use, no results, filtered-empty, permission-empty, and failure. Each needs distinct copy and action.

Differentiate these again from a legitimate zero. A metric card may show `0` without redundant prose such as "0 invoices awaiting payment" or "all settled". Preserve separators and alignment when they provide consistent structure, but leave the supporting row intentionally empty when there is nothing useful to say.

For time-series controls, a selected range must visibly change the domain. A twelve-month financial-year view should show the full reporting sequence, such as April through March, even when later months are unavailable. Represent unavailable or future months as missing values rather than zero so users do not mistake absence for performance.

## Success

Confirm what happened, show important identifiers or next timing, and offer the natural next action. Celebration must match stakes and frequency.

## Disabled states

Use disabled controls for genuine temporary unavailability, not to hide validation. Explain prerequisites near the control. Ensure disabled appearance is distinguishable without looking like broken low-contrast text.

