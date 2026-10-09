# Forms, Onboarding, and States

## Choose the right container before styling the form

Do not default every "create" or "edit" action to a side sheet/drawer merely because it is a common component-library example. Choose the container by task weight and field count, then check the installed component library for the matching primitive:

- **Inline or popover**: one or two low-stakes fields with an immediate, reversible effect (rename, quick note, single toggle).
- **Dialog (modal)**: a focused, bounded task the user completes and confirms before returning to context — most create/edit forms with up to roughly seven to ten fields in one coherent group. A dialog keeps the user's attention on the task and communicates "this is a discrete decision," which a form with several required identity, contact, and address fields usually is.
- **Multi-step dialog**: the same bounded task, but with enough fields that one screen would force scrolling past validation or hurt scannability — typically past ten to twelve fields, or fields with a natural sequence (identity, then contact, then address, then confirmation). Show step labels or a progress indicator, validate each step before advancing, keep entered values when the user goes back, and give the final step a clear summary or confirm action. Do not force steps onto data with no real sequential dependency merely to look sophisticated.
- **Side sheet/drawer**: a task the user wants to keep doing alongside visible context behind it — reviewing or editing a record while still seeing the list or canvas it came from, long-form content with independent scroll, or a workflow the product already establishes this pattern for. A drawer is not a default replacement for a dialog; use it when peeking at the underlying page is part of the task, not merely because it feels lighter to implement.
- **Full page or route**: the task is a primary journey on its own (checkout, onboarding, complex report builder) rather than a supporting action from a list.

When a "create" action from a data table opens a form with many required fields grouped by topic (type, identity, contact, address), prefer a dialog — multi-step if the field count crosses the threshold above — over a side sheet. Reassess the choice if the project's design system has already standardised on one pattern; do not fragment an established convention for a single screen without discussing it.

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

## Field-level craft

See `dashboard-craft.md` §10 for the drawn recipe. In short:

- Split long forms into titled sections, each a card with a light header band.
- Put a visible label above every field; mark required fields with a red asterisk after the label.
- Use a segmented control for two to four fixed options (for example gender: Male, Female, Not specified).
- Join a country code picker (flag and dial code) to phone inputs.
- Show accepted file types and size limits under file inputs, next to a clear "Choose file" button and the chosen file name.
- Use "Select" as the placeholder for selects; never pre-fill a fake real value.
- Show the expected format under date and code fields, in the user's locale.
- Use three columns on wide screens, two on tablets, and one on phones, keeping the same sections.
- Choose the selector by list length: segmented control for 2 to 4 options, a plain dropdown for about 5 to 12, a searchable dropdown for longer lists or names people type faster than they scroll (countries, time zones, currencies, people). See `onboarding-and-activation.md` §4.
- Start text placeholders with "e.g." so they never look like a value already entered.
