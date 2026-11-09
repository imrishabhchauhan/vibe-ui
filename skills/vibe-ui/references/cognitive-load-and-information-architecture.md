# Cognitive Load and Information Architecture

## Inventory before simplifying

For each viewport and meaningful state, inventory:

- primary task and completion action;
- visible headings, labels, descriptions, statuses, and metadata;
- simultaneous choices and competing action clusters;
- navigation items, tabs, filters, and hidden overflow;
- controls whose labels or consequences are visually distant;
- repeated explanations, repeated values, and decorative accents competing for attention.

Counts are diagnostic signals, not universal scores. A dense expert tool may justify more visible information than an occasional-use settings page.

## Classify every explanatory block

- `decision-critical`: needed to choose safely or understand consequence; keep inline.
- `task-supporting`: helps most users complete the current task; keep concise and near the control.
- `on-demand`: defines unfamiliar terminology or a rare detail; use an accessible help trigger, popover, disclosure, or documentation link.
- `error-conditional`: reveal when validation or failure makes it relevant.
- `duplicated`: repeats a label, value, placeholder, or obvious action; remove.

Do not move essential information into a tooltip. Tooltips are supplementary and weak on touch; use a popover or disclosure when interactive, persistent, or accessible detail is required. A card with more than a title and one supporting block should trigger classification, not automatic deletion.

## A caption that explains the layout is a layout bug

If a label, tagline, caption or helper line exists only to make the layout understandable, the layout is broken. Fix the grouping, order, heading or control first, then remove the text. Do not paper over a confusing screen with explanation. (Sources: Vox, [@Voxyz_ai](https://x.com/Voxyz_ai/status/2117281830449942825), and Khairallah AL-Awady, [@eng_khairallah1](https://x.com/eng_khairallah1/status/2117321468841517449), checked 2026-11.)

Guard against over-applying it. Keep text that states a real constraint or consequence: password rules, accepted format or file size, privacy notes, and warnings about irreversible actions. These are `decision-critical` or `task-supporting` above, and accessibility needs them (visible labels, format hints, help and error text tied to the field). The test: after the layout is fixed, would deleting the text make the user lose a fact they need to act safely? If yes, keep it. If it only repeats what the layout already shows, remove it.

## Audit navigation before panel content

Evaluate the number, naming, grouping, order, selected state, and overflow behaviour of tabs or navigation before polishing individual panels.

- Treat more than seven peer choices as a grouping review trigger, not an automatic failure.
- Treat clipped or silently scrollable navigation as a discoverability risk; test touch, keyboard, focus visibility, and active-item visibility.
- Group by user goal and mental model, not organisational ownership.
- Keep labels distinct and predictable; do not solve excess choices with vague names.
- Propose a concrete grouping and verify that frequent destinations do not become slower.

## Apply behavioural laws operationally

- Hick-Hyman: reduce, group, sequence, or progressively disclose choices when decision time and error risk rise.
- Fitts: make targets sufficiently large and easy to reach; keep a control visually and semantically associated with its label. Do not invent a universal pixel-distance rule.
- Proximity and common region: group labels, controls, validation, and consequences so the relationship is apparent.
- Jakob: prefer familiar placement and interaction unless evidence justifies a deviation.
- Recognition over recall: keep current scope, selection, status, and available next actions visible.

For each finding, name the observed signal and user consequence. Cite a law only when it explains the evidence; never use a law as decoration.

## Verify the reduction

Compare before and after at the same viewport and state. Confirm that removed text was redundant, disclosed help remains reachable by touch and keyboard, grouping improves navigation, labels still explain consequences, and expert efficiency has not been sacrificed for visual emptiness.
