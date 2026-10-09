# Data Tables and List Controls

Use this module for any table, list, or record grid: clients, invoices, users, transactions, or similar operational records.

For a complete, drawn table recipe (toolbar anatomy, zebra rows, link-coloured names, kebab menus, quality-of-life controls), read `dashboard-craft.md` §9 and §12.

## Consolidate the toolbar

A table needs one clear control area above it. Use one row when everything fits. When it does not, use exactly two rows with fixed jobs: row one carries the list identity (icon, count such as "13 Students") and the list actions (export, the primary add); row two carries search on the leading edge and filters on the trailing edge. Never scatter controls across three or more rows. Put the primary create action, view-mode tabs, and the most-used filters (date range, status, type, search) in the same row, ordered by frequency and reading direction: high-use filters first, primary action last on the trailing edge.

- Do not stack "tabs on one row, primary button on a second far row, filter chip on a third row" when they all act on the same list. Merge them.
- On narrow widths, keep the primary action and search visible; move secondary filters into a labelled disclosure (filter sheet or popover) rather than wrapping every control into a second row by default.
- If the page genuinely has two independent controls (for example a page-level date range that affects cards above the table, and a table-only search that does not), keep them visually distinct through spacing and grouping, not through two identical-looking rows that look like one broken row.

## Make row actions real controls

Never render a row action as bare coloured or underlined text with an `onClick`. Use an actual `<button>` (icon button, text button, or a trailing overflow menu) with a visible affordance: border, filled/ghost background, or a recognisable icon plus label. It needs hover, focus-visible, active, and disabled states like any other button, an accessible name (e.g. "View Geeta University, Panipat"), and a touch target that meets the accessibility baseline.

- A single dominant row action ("View", "Open") can be a small button or icon-button at the trailing edge.
- Two or more row actions belong in a consistent action cluster or an overflow menu, not a widening list of separate links.
- Do not make the action distinguishable only by cursor change; keyboard and assistive-technology users need the same cue.

## Do not truncate before you must

Ellipsis or `truncate` classes are a last resort for a column whose rendered width cannot fit its content at the current breakpoint, not a default applied to every text column. Before shipping a truncated column:

1. Measure the actual rendered column width against representative and longest expected content at each supported breakpoint.
2. If visible empty space remains before the next column or the row's trailing edge, remove the truncation and let the column size to content, or redistribute column widths (for example let a name column flex while a short status column stays fixed).
3. Only keep truncation when the content is genuinely long relative to available space, and always expose the full value through the accessible name, a title/tooltip, or a detail view.
4. Prefer wrapping to a second line over truncation for name-like columns when the row height can absorb it; truncation is worse for comprehension than a slightly taller row.

## Provide sorting and filtering as real controls

- Do not add sort controls to columns where order means nothing to the user (phone numbers, free-text notes, actions). Sort icons on every column are noise.
- Give every meaningfully comparable column (names, amounts, dates, counts, status) a sort control: a clickable header with a visible direction indicator, `aria-sort` on the header cell, and keyboard operability.
- Provide filtering for the facets users actually narrow by (status, type, date range, owner). Show active filters as removable chips or a visible control state, keep the result count visible, and never blank the table while filters resolve; use the loading and stale-response guidance in `forms-onboarding-and-states.md`.
- Persist sort and filter state in the URL or component state consistent with the project's existing list patterns, so back navigation and reload preserve the user's context.
- When both a global scope filter (for example a financial year) and table-local filters exist, make it visually and semantically clear which one is which, and confirm the global filter actually changes the values shown beneath it.

## Make tables easy to scan and act on

- Show clickable names in the link colour, with an avatar and a muted secondary line (ID, roll number), so users know the name opens a record.
- Alternate row backgrounds with a barely visible tint (2 to 4%) or use clear separators; keep the header on a light neutral.
- Put the total count in the toolbar and on the tab that leads to the table.
- Offer quick filters as "Label: Value" dropdowns for the 3 to 4 most used facets, and an advanced filter icon that opens a drawer for the rest. Show the active filter count on that icon.
- Add a refresh button when other people change the data, an export button on every operational table, and a column chooser when there are more than six columns.
- On phones, turn each row into a card (name, two key fields, status, kebab menu) instead of shrinking the table.

## Verification

Confirm at the narrowest supported width and the widest: toolbar controls fit in one row or collapse predictably, every row action is reachable and operable by keyboard, no column truncates content that already has visible room, sort and filter controls have accessible names and states, and the empty/loading/filtered-empty states from `forms-onboarding-and-states.md` all render inside the same table shell.
