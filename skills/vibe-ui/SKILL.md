---
name: vibe-ui
description: Build, audit, improve, or validate product interfaces with evidence-led UI/UX engineering. Use for web or app screens, flows, components, dashboards, forms, onboarding, responsive layouts, design systems, visual polish, accessibility, typography, colour and contrast, spacing, hierarchy, consistency, UX writing, interaction states, motion, or conversion-sensitive journeys. Especially deep for Next.js, React, and Tailwind CSS projects, while remaining applicable to other stacks. Trigger on "use Vibe UI", "improve this UI/UX", "make this screen premium", "audit this interface", "fix the user experience", "review this design", "build this page", or "visually validate this flow".
---

# Vibe UI

Treat the interface as a product system, not a styling exercise. Improve task success, comprehension, trust, accessibility, responsiveness, and visual craft together.

## Choose the mode

Resolve one mode from the request:

- `audit`: inspect and report; do not edit unless the user also asks for implementation.
- `improve`: diagnose, agree or infer a bounded scope, edit, and verify.
- `build`: create a new interface from product intent, existing patterns, and evidence.
- `validate`: test an implemented interface visually and behaviourally, then fix only when authorised.

If no mode is named, use `improve` for explicit change requests and `audit` for review requests.

## Follow the workflow

Read [workflow.md](references/workflow.md) for every engagement and follow it in order.

1. Establish the user, job, success condition, scope, and constraints.
2. Recon the real project before judging or coding.
3. Inspect the rendered interface when visual or runtime behaviour matters.
4. Diagnose root causes across UX and UI domains.
5. Select the smallest safe intervention that improves the complete task.
6. Implement in the project's existing system.
7. Verify supported viewports, states, input modes, and accessibility.
8. Report evidence, remaining risks, and what was not verified.

Do not infer a visual defect from code alone when rendering determines the result. Do not infer a code defect from a screenshot alone.

## Load only relevant references

Always read `workflow.md`. Then load the modules needed for the scope:

| Need | Read |
| --- | --- |
| Audience, product type, journey stage, page archetype, content type, density | [context-and-archetypes.md](references/context-and-archetypes.md) |
| Visual hierarchy, grouping, scanning, density | [visual-hierarchy-and-layout.md](references/visual-hierarchy-and-layout.md) |
| Spacing rhythm, components, tokens, cross-screen consistency | [spacing-and-consistency.md](references/spacing-and-consistency.md) |
| Palette, semantic colour, contrast, light/dark themes | [color-and-contrast.md](references/color-and-contrast.md) |
| Type systems, readability, wrapping, microcopy | [typography-and-content.md](references/typography-and-content.md) |
| Keyboard, screen readers, semantics, hit areas, zoom | [accessibility-and-input.md](references/accessibility-and-input.md) |
| Behavioural principles and all Laws of UX lenses | [ux-laws-and-behavior.md](references/ux-laws-and-behavior.md) |
| Forms, onboarding, defaults, errors, loading and empty states | [forms-onboarding-and-states.md](references/forms-onboarding-and-states.md) |
| Motion, transitions, feedback, reduced motion | [motion-and-feedback.md](references/motion-and-feedback.md) |
| Mobile, tablet, desktop, touch, pointer and responsive logic | [responsive-and-platforms.md](references/responsive-and-platforms.md) |
| Next.js, React, Tailwind CSS and component-system implementation | [next-react-tailwind.md](references/next-react-tailwind.md) |
| Mobbin or Refero research when their MCP tools are available | [design-research-mcp.md](references/design-research-mcp.md) |
| Browser matrix, state matrix, screenshots and comparison testing | [visual-validation.md](references/visual-validation.md) |

## Apply the operating rules

### Start with the audience and task

Identify who is using the product, what they are trying to complete, their likely context, expertise, usage frequency, and the cost of error. Classify the product, journey stage, page archetype, dominant content, density, and device environment before choosing design patterns. Read `context-and-archetypes.md`. If evidence is missing, state a narrow assumption and avoid irreversible product decisions.

### Preserve the product before changing it

Inspect existing tokens, components, layout conventions, copy vocabulary, routes, state management, accessibility patterns, and dependency versions. Reuse defensible patterns. Report a shared-token or shared-component root cause once instead of fixing symptoms repeatedly.

### Separate UX from decoration

First fix missing information, confusing order, unnecessary decisions, poor defaults, blocked recovery, weak feedback, and inaccessible controls. Then fix hierarchy, spacing, typography, colour, surfaces, and motion. A polished broken flow is still broken.

Apply subtraction before addition. Every section, metric, action, label, illustration, and chart must earn its space by helping the page's primary job. Do not duplicate module-level data, notification content, or self-explanatory copy on a dashboard merely to make it look complete.

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

Detect available tools from the actual tool registry or project configuration; never invent tool names. If Mobbin or Refero is available and enabled, use it only for a concrete pattern question. If configured but disabled, ask the user to enable it before relying on it. If absent or access fails, continue without it. Never imply these services are free; both currently require paid plans for MCP access.

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
