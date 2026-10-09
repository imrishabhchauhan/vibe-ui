# Dashboards and KPIs

Use this module for dashboard homes, analytics screens, monitoring surfaces, admin overviews, and any interface built primarily from a sidebar, KPI cards, charts, and summary tables or lists. Read `context-and-archetypes.md` first to classify the audience and page archetype; use this module for dashboard-specific layout, navigation, KPI, chart, and interaction decisions.

## Contents

1. Define the dashboard's job before its widgets
2. Build a three-level information hierarchy
3. Structure the sidebar
4. Lay out the grid
5. Design KPI cards that earn trust
6. Choose the right chart
7. Use contextual UI for bulk and rare actions
8. Choose popover, modal, or a dedicated page
9. Apply optimistic UI carefully
10. Verify with the five-second test and a dashboard checklist

## 1. Define the dashboard's job before its widgets

Do not start from "what can occupy this screen." Start from what the specific user needs to understand and do. Classify the dashboard's dominant job, since it changes what belongs on the first screen:

- **Monitoring**: what is happening right now (live counts, current status, alerts).
- **Analytical**: why something is happening (trends, breakdowns, comparisons, drivers).
- **Operational**: what work needs to be completed next (queues, pending approvals, assigned tasks).
- **Management**: whether the team or business is moving towards its targets (progress against goals, forecasts).
- **Administrative**: what requires configuration or control (users, permissions, settings, integrations).

Two dashboards that both contain charts and cards can legitimately look structurally different because their dominant job differs. Do not force a monitoring dashboard and an administrative one into the same template merely for visual consistency across the product; keep shared tokens and components, not shared content structure.

## 2. Build a three-level information hierarchy

Classify every piece of information before placing it:

- **Level 1, critical**: the one or two numbers or statuses the user must see immediately (e.g. a headline KPI with its trend).
- **Level 2, important**: supporting context the user scans next (trend chart, breakdown, pipeline, target progress).
- **Level 3, detailed**: information investigated on demand (transaction lists, logs, individual records, historical detail).

Sequence the page dashboard-first, detail-second, deep-analysis-third. Never force Level 3 content onto the first screen merely because the data exists; link or navigate to it instead. When auditing an existing dashboard, assign every visible element to a level and flag anything at Level 3 competing for space with Level 1.

## 3. Structure the sidebar

Treat the sidebar as persistent, cross-page infrastructure, not a place to list every route in build order.

- **Top**: organisation or product identity, and a workspace/account switcher if the product has more than one.
- **Primary navigation**: the handful of destinations the target user visits most; order by frequency and task relevance, not the codebase's route order.
- **Secondary navigation**: grouped by user goal (e.g. "Management": users, teams, permissions; "Finance": expenses, revenue, invoices), not by which team built the feature.
- **Bottom**: low-frequency items (help, documentation, settings, profile) separated from primary work.

Apply these rules when auditing or building a sidebar:

- Pair every icon with a visible label; an icon-only item is acceptable only when the sidebar is in a collapsed state that the user can expand.
- Maintain one consistent, visible active-item treatment (background, indicator, weight, or colour) so the user always knows their current location.
- Group related items under a heading once a flat list exceeds roughly seven to nine items; group by mental model (see `cognitive-load-and-information-architecture.md`), not alphabetically or by team ownership.
- Nest child items under a parent when navigation genuinely has a parent/child relationship; do not flatten a hierarchy into a long list, and do not nest for its own sake when items are peers.
- Treat every new sidebar item as a cognitive-load cost; do not add one for a feature the target user rarely needs from global navigation.

## 4. Lay out the grid

A dashboard carries more simultaneous information per viewport than most other page archetypes, so it needs stricter alignment and a denser, more disciplined type scale than a marketing or content page (see `typography-and-content.md` and `spacing-and-consistency.md`). A common desktop structure, adapted to actual content priority rather than applied mechanically:

```text
SIDEBAR | PAGE HEADER (title, description, global filters, primary action)
        | KPI   KPI   KPI   KPI
        | MAIN CHART            SECONDARY CHART
        | TABLE / LIST / ACTIVITY
        | PAGINATION
```

Order the page header's own elements by hierarchy: title, then context/description, then global filters, then the primary action (see `data-tables-and-controls.md` for consolidating filters and a primary action into one control row rather than stacking separate rows). Reprioritise this structure at narrower widths per `responsive-and-platforms.md`; do not simply shrink it (see the responsive KPI pattern below).

## 5. Design KPI cards that earn trust

A KPI card exists to answer "what should I understand immediately," so a bare number without context is incomplete. A complete KPI card includes:

1. a plain-language label naming the metric;
2. the primary value, sized and weighted to lead the card;
3. the change and its direction, when a comparison is meaningful;
4. the comparison period the change is measured against;
5. an optional sparkline or trend indicator;
6. a definition trigger (tooltip or popover per `cognitive-load-and-information-architecture.md`'s on-demand classification) when the metric's meaning is not self-evident to the target audience.

Apply the same data-trust questions used elsewhere in this skill to every KPI: what period does it represent, compared with what, when was it last updated, and is it live or a snapshot? Make the answer visible near the number rather than assumed, and follow `typography-and-content.md`'s rule that time language must match the selected scope (do not label a number "this month" once a different period is selected). Prefer "Assessment completion, 78.4%, up 8% vs previous week, updated 10:42" over a bare "78.4%".

## 6. Choose the right chart

Use the simplest chart that answers the user's actual question; do not choose a chart type for visual novelty.

| User question | Chart |
| --- | --- |
| How did this change over time? | Line chart |
| How do these categories compare? | Bar chart |
| What makes up this total? | Stacked bar, or a donut used sparingly |
| What is the exact value? | Table |
| How is this distributed? | Histogram |
| How do two variables relate? | Scatter plot |

Every chart needs labelled axes where the unit is not obvious, a visible date range or scope, a tooltip with exact values, and colour that carries semantic meaning rather than decoration (see `color-and-contrast.md`). If a chart cannot be explained by a specific question the user needs answered, remove it rather than justify it after the fact.

## 7. Use contextual UI for bulk and rare actions

Keep a table or list's default toolbar minimal, and reveal actions only when they become relevant. When one or more rows are selected, show a compact contextual bar (e.g. "3 selected — Archive, Export, Delete") rather than permanently displaying bulk-action controls the user cannot yet use. This extends the toolbar-consolidation and row-action rules in `data-tables-and-controls.md`: a permanent control that is disabled until selection is worse than a control that is absent until it is relevant, provided its appearance and disappearance is not so abrupt that users lose track of it (announce it to assistive technology per `accessibility-and-input.md`).

## 8. Choose popover, modal, or a dedicated page

This is a different axis from the dialog-vs-drawer choice in `forms-onboarding-and-states.md` (which compares dialogs and side sheets for substantial forms); use it for lighter or heavier interactions than a standard create/edit form:

- **Popover**: a lightweight, non-blocking, quickly reversible interaction the user can dismiss by clicking away — sort options, column visibility, a small filter, a date picker, a quick single-field edit.
- **Modal (dialog)**: the task needs the user's full attention, belongs directly to the surface they are on, and sending them to a new page would interrupt a short workflow unnecessarily. See `forms-onboarding-and-states.md` for choosing single-step vs multi-step dialogs by field count.
- **Dedicated page**: the task is too large for a dropdown, popover, or modal — a full record profile, a report builder, advanced settings, or anything with its own sub-navigation. Give every dedicated page reached from a list a visible way back (breadcrumb or back control) that names the parent context, e.g. "Schools › Northfield Academy › Class 8 › Student profile."

## 9. Apply optimistic UI carefully

For frequent, low-risk, reversible actions (removing a row, toggling a setting, dismissing a notification), reflect the result immediately in the UI and let the request complete in the background, rather than blocking on a spinner for an action the user expects to just work. If the request fails, restore the prior state and communicate the failure clearly; if the action is destructive and not easily reversible, use the confirmation pattern in `forms-onboarding-and-states.md` instead of optimism. Optimistic UI is a tool for perceived responsiveness (see the Doherty Threshold lens in `ux-laws-and-behavior.md`), not a way to avoid designing a failure state.

## 10. Verify with the five-second test and a dashboard checklist

Use the five-second test as a quick hierarchy check: shown the dashboard for five seconds, could a representative user name what it is about, its most important number, what looks like it needs attention, and the most important available action? If not, hierarchy needs work before polish.

When auditing or shipping a dashboard, in addition to the general state matrix in `visual-validation.md`, confirm specifically:

- every KPI card names its metric, comparison period, and update recency;
- every chart maps to a real user question and uses the simplest adequate type;
- the sidebar has one consistent active-item treatment and goal-based grouping;
- bulk or rare actions appear contextually rather than cluttering the default toolbar;
- a global filter's scope is visually distinct from a table-local filter (see `data-tables-and-controls.md`);
- Level 3 detail is reachable but not forced onto the first screen;
- the layout reprioritises rather than merely shrinks at tablet and compact-touch widths.
