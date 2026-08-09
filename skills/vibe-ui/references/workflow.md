# Workflow

## 1. Frame the problem

Capture, from the request or repo:

- primary audience and expertise;
- job to be done and completion event;
- product type, journey stage, page archetype, dominant content type, and intended density;
- business goal without treating it as permission for dark patterns;
- supported devices, input modes, locales, themes, and browsers;
- product constraints, brand rules, component library, and deadlines;
- whether the task is an audit, bounded improvement, new build, or validation.

State assumptions only when they materially affect the result. Prefer discovering facts from code, running UI, analytics, design files, or user-provided evidence.

Read `context-and-archetypes.md` and create a compact design brief for `build` work, substantial redesigns, or scopes where product surfaces need different logic. Do not force the brief format on a small component fix.

## 2. Recon the project

Inspect before editing:

1. repository structure and instructions;
2. package versions and scripts;
3. framework, routing, rendering, styling, components, icons, fonts, and motion dependencies;
4. global tokens and theme variables;
5. the target route, layouts, boundaries, imported sections, shared parents, and primitives;
6. hooks, providers, stores, server actions, API routes, queries, caches, and permissions feeding the UI;
7. consumers of any shared file likely to change;
8. similar screens and established patterns;
9. tests, Storybook, visual regression tooling, browser automation, and accessibility tooling;
10. existing screenshots, specs, research, and analytics.

Run `node scripts/detect-project.mjs <project-root>` when useful. Treat its output as discovery assistance, not proof of correctness.

Load `context-dependencies-and-performance.md` for route-level work, shared components, data-driven surfaces, tabs, or reported slowness. Build a proportional UI blast-radius map and identify the likely root before proposing a fix.

## 3. Inspect the real experience

For `audit`, `improve`, and `validate`, render the affected experience before making visual claims when runtime access is available, safe, and authorised. Reuse an existing preview when possible; do not start a server or browser when the user prohibits it. Walk the primary task as the target user would. Observe:

- what is visible first;
- whether the next action is obvious;
- which decisions are required;
- where users must recall information;
- system feedback and latency;
- error prevention and recovery;
- layout changes across widths;
- keyboard and touch behaviour;
- empty, loading, success, and failure states.

Capture exact route, viewport, state, and component for every visual finding.

Inspect the applicable tabs or navigation structure before individual panels. Capture a baseline at compact touch, tablet, and desktop widths or the product's supported equivalents. Inspect both themes when supported and exercise loading, empty, error, partial, and representative populated states.

If runtime access is unavailable, unsafe, or prohibited, continue with source-backed accessibility, architecture, consistency, and performance candidates. Mark every visual conclusion `unverified`, state the limitation prominently, and do not return `Approve`.

## 4. Diagnose root causes

Review foundations before polish:

1. task and information architecture;
2. cognitive load and navigation choices;
3. access and input;
4. state, feedback, and perceived performance;
5. hierarchy and layout;
6. spacing and consistency;
7. typography and content;
8. colour and contrast;
9. motion and details.

Use UX laws to explain a confirmed behaviour, not to manufacture a finding. Consolidate repeated symptoms under the shared token, component, or flow decision causing them.

## 5. Choose an intervention

Prefer the smallest intervention that completes the user task cleanly. For each proposed change record:

- user problem;
- evidence;
- affected audience and states;
- intended behaviour;
- implementation scope;
- accessibility and responsive impact;
- performance impact;
- verification method;
- confidence and uncertainty.

Do not redesign unrelated surfaces. Do not replace a design system because one component is weak.

## 6. Implement safely

- Reuse existing primitives and tokens.
- Keep business logic outside presentation where the codebase already separates it.
- Preserve server-side permissions and validation.
- Add new dependencies only when the benefit exceeds maintenance and bundle cost.
- Keep loading, error, empty, success, and interruption recovery coherent.
- Make destructive actions reversible or explicitly confirmed.
- Preserve user-entered drafts when navigation, refresh, or failure could otherwise erase meaningful work.

## 7. Verify

Load `visual-validation.md`. Run proportional checks: typecheck, lint, tests, build, targeted accessibility checks, browser journeys, and visual comparisons. Validate source and rendered behaviour.

Treat source review as verification of source only. For rendered work, inspect relevant browser-console errors, responsive screenshots, full-page overflow, focus/hover/selected behaviour, and applicable loading, empty, error, and partial states. New or changed runtime errors block completion. Record unrelated pre-existing errors rather than hiding them.

## 8. Report

Distinguish:

- verified facts;
- implemented changes;
- recommendations not implemented;
- unverified assumptions;
- risks and follow-up experiments.

Never state that a UI is "better" only because it looks more decorated. Tie the result to clarity, task success, accessibility, consistency, responsiveness, or measured outcomes.
