# Spacing and Consistency

## Establish the system before local tweaks

Find the project's spacing scale, radii, shadows, borders, component variants, icon set, and density rules. Reuse sound tokens. If inconsistent values are systemic, repair the token or primitive and verify every consumer.

## Use spacing semantically

Map spacing to relationships:

- tight: icon to label, label to supporting value;
- normal: items within one component;
- loose: separate concepts or sections;
- page: content to viewport or shell boundary.

Do not choose gaps only because a screenshot looks balanced at one width. Check wrapping and dynamic states.

## Preserve rhythm

Use a small scale, commonly based on 4px, without forcing every geometry to the grid. Repeated screens should share page margins, title offsets, section intervals, field stacks, and action placement unless task context justifies a difference.

## Keep components consistent by role

Consistency means equivalent roles behave equivalently, not that every object looks the same.

- One primary button language per surface.
- One treatment for secondary, tertiary, and destructive actions.
- One field anatomy: label, control, hint, error, status.
- One icon family and coherent stroke weight.
- One vocabulary for loading, success, warning, and failure.
- One motion language for similar state changes.

Textual example:

- Before: one page uses purple filled "Continue", another black filled "Next", and a third link-like "Proceed" for the same step action.
- After: the flow uses one verb and one primary variant; only the final action changes label to name the outcome.

## Concentric surfaces

For nested rounded surfaces, start with `outer radius = inner radius + inset`. Verify visually because optical correction can be needed. Do not apply this formula across unrelated layers.

## Borders, shadows, and elevation

Use borders for structure or state. Use restrained shadows for elevation. Avoid combining heavy border, shadow, gradient, and glow on the same component.

## Consistency audit

Search for:

- arbitrary one-off colours, gaps, font sizes, radii, and z-index values;
- duplicate button or field implementations;
- mixed icon libraries on one surface;
- similar status states with different copy or colours;
- inconsistent page gutters and breakpoints;
- `transition: all` or unrelated motion timing;
- local fixes that bypass semantic tokens.

Consistency does not outrank accessibility, clarity, or platform convention. Change the shared system when the shared system is the defect.

