# Connected Surfaces

A screen is rarely the whole task. Treat every surface the primary view can open as in scope, not just the view named in the request or shown in a screenshot.

## Identify connected surfaces before concluding an audit

From the target view, enumerate what it can open or trigger:

- primary and secondary action buttons that open a dialog, drawer, sheet, or new route;
- row or card actions (view, edit, delete, expand) and their destination view;
- dropdown, select, and combobox menus, including their open/expanded state;
- filter and sort controls and the resulting changed list state;
- tabs and their individual panels;
- toasts, inline confirmations, and validation states triggered by an action;
- nested confirmations (e.g. a destructive action inside a dialog opening a second confirmation).

Build this list before writing findings. A `Block` or `Approve` verdict on the entry view alone is incomplete when its most common next step (e.g. "Add Client") has not been inspected.

## Inspect connected surfaces to the same standard

For each connected surface identified:

1. Open or trigger it the way a real user would (click the button, apply the filter, select the row).
2. Apply the same diagnosis order as the entry view: task and information architecture, cognitive load, access and input, state and feedback, hierarchy, spacing, typography, colour, motion.
3. Check its own state matrix where relevant: default, loading, error, empty, and success for that surface specifically (a dialog's own submit-loading and validation-error states, not just the page's).
4. Confirm it returns focus, list state, and scroll position sensibly when closed, and that closing it does not lose entered data unexpectedly.
5. If the surface itself opens another surface (a menu inside a dialog, a confirmation inside a drawer), follow it to a reasonable depth; stop when you reach a surface with no further meaningful interaction, not arbitrarily after one hop.

## Keep the scope proportional

"Connected" does not mean "the entire application." Follow the paths a user would realistically take from the requested surface for the task at hand. Do not chase unrelated navigation destinations (global nav links to unrelated modules) unless the user's request or a discovered defect makes them relevant. State explicitly which connected surfaces were inspected and which were left out of scope, so the report is honest about coverage.

## Report connected findings clearly

Attribute every finding to its exact surface (e.g. "Add Client dialog, Full Name field" vs "Client Master table, row actions") so the reader can locate and verify each one independently. Do not merge findings from different surfaces into one undifferentiated list.
