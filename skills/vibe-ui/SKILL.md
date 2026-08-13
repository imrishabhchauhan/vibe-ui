---
name: vibe-ui
description: Audit or improve product interfaces with evidence-led UI/UX engineering, including building new components from the project's existing library and visually validating the result. Use for web or app screens, flows, components, dashboards, forms, onboarding, responsive layouts, design systems, visual polish, accessibility, typography, colour and contrast, spacing, hierarchy, consistency, UX writing, interaction states, data tables, motion, or conversion-sensitive journeys. Especially deep for Next.js, React, and Tailwind CSS projects, while remaining applicable to other stacks. Trigger on "use Vibe UI", "improve this UI/UX", "make this screen premium", "audit this interface", "fix the user experience", "review this design", "build this component", or "check this flow".
---

# Vibe UI

Treat the interface as a product system, not a styling exercise. Improve task success, comprehension, trust, accessibility, responsiveness, and visual craft together. Default to a mobile-first reading of every layout, interaction, and component decision, then scale up deliberately for larger viewports.

## Choose the mode

Resolve one mode from the request:

- `audit`: inspect and report; do not edit unless the user also asks for implementation. Covers review-only requests and requests to check a flow, a screenshot, or connected surfaces without changing code.
- `improve`: diagnose, agree or infer a bounded scope, implement, and verify. This is the only mode that edits code, and it covers every kind of implementation work: fixing a diagnosed problem, building a new interface or component from product intent and the project's existing patterns, and validating an already-implemented surface visually and behaviourally before or after the change.

If no mode is named, use `audit` for review, feedback, "what's wrong with this", or "what do you think" requests, including a bare screenshot with no change request. Use `improve` for anything that asks to fix, build, create, redesign, or ship something. When a user shares a screenshot and asks for an opinion, audit it, then ask or infer whether they also want it implemented before editing code.

`improve` always starts by running the `audit` steps on the current scope; do not implement a fix that skips diagnosis. There is no separate `build` or `validate` mode: creating a new component and validating a shipped one are both `improve` work, scoped by what the user asked for.

## Follow the workflow

Read [workflow.md](references/workflow.md) for every engagement and follow it in order.

1. Establish the user, job, success condition, scope, and constraints.
2. Trace the target's parents, dependencies, data path, shared primitives, and affected consumers.
3. Inspect the rendered interface before making visual findings when runtime access is available and authorised.
4. Diagnose root causes across UX and UI domains.
5. Select the smallest safe intervention that improves the complete task.
6. Implement in the project's existing system.
7. Verify supported viewports, states, input modes, and accessibility.
8. Report evidence, remaining risks, and what was not verified.

Do not infer a visual defect from code alone when rendering determines the result. Do not infer a code defect from a screenshot alone. If rendering is unavailable, unsafe, or prohibited, continue with source-backed findings but label the work `code-only, visually unverified`; never issue an `Approve` verdict.

## Load only relevant references

Always read `workflow.md`. Then load the modules needed for the scope:

| Need | Read |
| --- | --- |
| Audience, product type, journey stage, page archetype, content type, density | [context-and-archetypes.md](references/context-and-archetypes.md) |
| Dependency tracing, shared consumers, data paths, and experience performance | [context-dependencies-and-performance.md](references/context-dependencies-and-performance.md) |
| Cognitive load, explanatory content, navigation and tab architecture | [cognitive-load-and-information-architecture.md](references/cognitive-load-and-information-architecture.md) |
| Visual hierarchy, grouping, scanning, density | [visual-hierarchy-and-layout.md](references/visual-hierarchy-and-layout.md) |
| Spacing rhythm, components, tokens, cross-screen consistency | [spacing-and-consistency.md](references/spacing-and-consistency.md) |
| Palette, semantic colour, contrast, light/dark themes | [color-and-contrast.md](references/color-and-contrast.md) |
| Type systems, readability, wrapping, microcopy | [typography-and-content.md](references/typography-and-content.md) |
| Keyboard, screen readers, semantics, hit areas, zoom | [accessibility-and-input.md](references/accessibility-and-input.md) |
| Behavioural principles and all Laws of UX lenses | [ux-laws-and-behavior.md](references/ux-laws-and-behavior.md) |
| Forms, onboarding, dialog vs sheet choice, defaults, errors, loading and empty states | [forms-onboarding-and-states.md](references/forms-onboarding-and-states.md) |
| Data tables, row actions, sorting, filtering, truncation | [data-tables-and-controls.md](references/data-tables-and-controls.md) |
| Dialogs, drawers, menus, and other surfaces opened from the target view | [connected-surfaces.md](references/connected-surfaces.md) |
| Motion, transitions, feedback, reduced motion | [motion-and-feedback.md](references/motion-and-feedback.md) |
| Mobile, tablet, desktop, touch, pointer and responsive logic | [responsive-and-platforms.md](references/responsive-and-platforms.md) |
| Next.js, React, Tailwind CSS and component-system implementation | [next-react-tailwind.md](references/next-react-tailwind.md) |
| Detecting installed component libraries/registries, and Mobbin/Refero or registry MCP tools | [component-libraries-and-mcp.md](references/component-libraries-and-mcp.md) |
| Browser matrix, state matrix, screenshots and comparison testing | [visual-validation.md](references/visual-validation.md) |

## Apply the operating rules

### Start with the audience and task

Identify who is using the product, what they are trying to complete, their likely context, expertise, usage frequency, and the cost of error. Classify the product, journey stage, page archetype, dominant content, density, and device environment before choosing design patterns. Read `context-and-archetypes.md`. If evidence is missing, state a narrow assumption and avoid irreversible product decisions.

### Default to mobile-first

Unless the product is explicitly desktop-only (an internal expert tool with no mobile/tablet requirement, stated by the user or evident from the codebase), design and evaluate layout, navigation, controls, and typography from the narrowest supported width first, then scale up. Treat a desktop-only composition that was never checked at compact widths as an open risk, not a neutral default. Read `responsive-and-platforms.md`.

### Look beyond the entry surface

Do not limit an audit or improvement to the exact screenshot or route named in the request when it has an obvious next step. Identify the dialogs, drawers, menus, and filtered/sorted states it opens, and inspect those to the same standard. Read `connected-surfaces.md`. State explicitly which connected surfaces were inspected and which were left out of scope.

### Build from what is already installed

Detect the project's installed component library, style variant, and any additional component registries (for example a shadcn-registry-based library such as ReUI) before building or changing a component. Prefer composing or extending an installed primitive over inventing a parallel one; use an available component-registry MCP to search and install missing pieces when one is configured. Read `component-libraries-and-mcp.md`.

### Remember what was already discovered

After the first engagement on a project, record the detected stack, component library, registries, breakpoints, and design tokens in `.vibe-ui/PROJECT.md`. On later engagements, read that file first and only re-detect when the project's dependencies or configuration have visibly changed, instead of re-running full discovery or external research every time.

### Preserve the product before changing it

Inspect existing tokens, components, layout conventions, copy vocabulary, routes, state management, accessibility patterns, and dependency versions. Reuse defensible patterns. Report a shared-token or shared-component root cause once instead of fixing symptoms repeatedly.

Read `context-dependencies-and-performance.md` for any route-level change, shared component edit, data-driven interface, tabbed surface, or reported slowness. Search both dependencies and consumers before editing; do not optimise a leaf while ignoring the parent, primitive, state, or data source causing the experience.

### Separate UX from decoration

First fix missing information, confusing order, unnecessary decisions, poor defaults, blocked recovery, weak feedback, and inaccessible controls. Then fix hierarchy, spacing, typography, colour, surfaces, and motion. A polished broken flow is still broken.

Apply subtraction before addition. Every section, metric, action, label, illustration, and chart must earn its space by helping the page's primary job. Do not duplicate module-level data, notification content, or self-explanatory copy on a dashboard merely to make it look complete.

Read `cognitive-load-and-information-architecture.md` before redesigning settings, dashboards, dense cards, tabbed pages, navigation, or multi-choice flows. Inventory visible information and decisions before shortening copy or styling individual panels.

### Use behavioural principles as lenses, not commandments

Every law needs context and evidence. Never add gamification, artificial urgency, fake progress, forced defaults, hidden opt-outs, or manipulative friction merely because a principle can explain it. Prefer user agency, reversibility, and honest feedback.

### Design every state

Cover default, hover, focus-visible, active, selected, disabled, loading, success, empty, error, offline or retry, partial data, long content, narrow width, dark appearance when supported, and reduced motion where relevant.

Also verify state transitions. A filter change must not blank a working surface, shift its geometry, silently change the meaning of labels, or make a valid control appear broken. Preserve prior data during short refetches when it remains safe, expose local progress, and distinguish zero, unavailable, future, and not-yet-loaded values.

### Respect platform and stack

Use the existing styling and component system. In Next.js/React/Tailwind projects, load `next-react-tailwind.md` and use framework-native patterns. Outside that stack, translate principles into the repository's idiom without introducing a parallel system.

### Keep performance part of experience

Do not add heavy animation libraries, oversized media, client-side rendering boundaries, polling, or effects without clear value. Preserve perceived responsiveness and stable layout. If Vibe Performance is installed and the issue is fundamentally performance-related, coordinate with it instead of duplicating its job.

### Use design-reference MCPs carefully

Detect available tools from the actual tool registry or project configuration; never invent tool names. If Mobbin or Refero is available and enabled, use it only for a concrete pattern question. If configured but disabled, ask the user to enable it before relying on it. If absent or access fails, continue without it. Never imply these services are free; both currently require paid plans for MCP access. Read `component-libraries-and-mcp.md` for this and for component-registry MCP tooling.

### Treat Transitions.dev as an optional companion

If `transitions-dev` is installed, use it for matching transition patterns. If unavailable, implement restrained native CSS or the project's existing motion system. Never use or install Pro assets. Preserve `prefers-reduced-motion` behaviour.

## Use the output contract

For audits, provide:

1. scope and evidence inspected;
2. findings ordered by user impact;
3. exact location, current behaviour, proposed change, and reason;
4. considered but rejected changes;
5. verification completed and not completed;
6. verdict: `Block`, `Needs changes`, or `Approve`.

For implementations, provide:

1. what changed and why;
2. files changed;
3. checks run and observed results;
4. checks not run;
5. known risks;
6. manual verification steps only when automation cannot cover them.

Do not claim a visual improvement without rendering the affected interface. Do not claim accessibility from automated checks alone. Do not claim conversion improvement without product data or an experiment.
