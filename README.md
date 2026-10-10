# Vibe UI

[![npm version](https://img.shields.io/npm/v/vibe-ui-skill.svg)](https://www.npmjs.com/package/vibe-ui-skill)
[![license](https://img.shields.io/npm/l/vibe-ui-skill.svg)](./LICENSE)

Evidence-led UI/UX engineering skill for AI coding agents, with concrete taste for calm, professional dashboards. Current release: `v0.12.1`.

Vibe UI audits and improves product interfaces — including building new components from a project's existing library and visually validating shipped work — across accessibility, hierarchy, layout, spacing, consistency, typography, colour, responsive behaviour, data tables, dashboards, forms, onboarding, UX writing, interaction states, and motion.

It is stack-agnostic at the principle level and intentionally deeper for Next.js, React, and Tailwind CSS projects.

## Contents

- [Install](#install)
- [Use](#use)
- [How it works](#how-it-works)
- [Reference modules](#reference-modules)
- [Component libraries and MCP research](#component-libraries-and-mcp-research)
- [CLI reference](#cli-reference)
- [Development](#development)
- [Changelog](#changelog)
- [Sources and acknowledgements](#sources-and-acknowledgements)
- [License](#license)

## Install

The npm package name is `vibe-ui-skill` because `vibe-ui` is already taken on npm. The command remains `vibe-ui`.

```bash
pnpm dlx vibe-ui-skill init
# or: npx vibe-ui-skill init
```

By default, `init` installs:

1. the Vibe UI skill into `.agents/skills/vibe-ui/` and any detected IDE-specific skill directories (Claude Code, Cursor, Windsurf, Kiro, GitHub/Copilot);
2. a fallback pointer in `AGENTS.md`, for tools that read that file directly instead of doing skill discovery;
3. a project-owned `.vibe-ui/` context and evidence folder, where the skill records what it learns about *this* codebase, including `TASTE.md`, the owner's taste ledger;
4. the free `transitions-dev` agent skill, installed into the universal project skill directory via its official `npx skills add` command.

It never installs `transitions-pro`, uses Pro recipes, creates an account, or requires an API key. Pass `--skip-transitions` for an offline, Vibe UI-only installation.

No network calls are made beyond the installs above; the skill itself runs entirely inside the AI agent you're already using, reading and writing only files in your project directory.

## Use

Ask your agent:

> Use Vibe UI to audit and improve the restaurant booking flow on mobile, tablet, and desktop.

Vibe UI resolves one of two modes:

| Mode | What it does |
| --- | --- |
| `audit` | Evidence-backed review without edits. Covers a review request, a screenshot critique, or "what's wrong with this" — the skill inspects and reports; it does not touch code unless implementation is also requested. |
| `improve` | Diagnose, implement, and verify a bounded change. Covers fixing a diagnosed problem, building a new component or interface from the project's existing patterns, and running visual/behavioural/responsive/accessibility checks on already-shipped work. |

Every `improve` engagement audits its own scope first; there is no way to skip diagnosis and jump straight to editing. Every `audit` also follows the target surface's most obvious next step — a dialog, drawer, filter, or menu it opens — rather than stopping at the entry screenshot or route.

## What makes it opinionated

Vibe UI gives your agent the role of a senior product designer and design engineer. It audits every screen visually and in code, across desktop, tablet, and mobile (desktop and mobile first), before it changes anything.

Most UI skills tell an agent how to review. Vibe UI also tells it what good looks like:

- **Craft defaults with numbers** (`dashboard-craft.md`): a compact dashboard type scale (page title 20 to 24px, KPI 22 to 28px), spacing, a colour budget (about 90% neutral, accent under about 5%), and drawn recipes for the app shell, module tabs with counts, KPI tiles, data tables, forms, calendars, and their mobile versions.
- **Anti-patterns** (`anti-patterns.md`): black buttons, brand colour on everything, brand orange darkened into brown, giant titles, kiddish illustrations on staff screens, dark mode by default, sort icons on every column, and hiding information on phones.
- **A fix playbook** (`fix-playbook.md`): ten ordered passes that correct any existing dashboard, from structure and shell to type, colour, components, states, quality of life, and mobile, with find-and-replace tables.
- **Onboarding, dialog, and record-page recipes**: account and workspace setup with smart defaults, a first-run wizard over a visible dashboard, setup checklists, teaching empty states, dialog anatomy and backdrops, nested dialogs, inline editing with pencil icons.
- **A device audit** (`device-audit.md`, `scripts/capture-viewports.mjs`): captures 10 viewports from 360px phones to 1920px screens and flags horizontal scroll, missing viewport tags, tiny text, small touch targets, heavy weights, and console errors.
- **Menus, dots, and gamification** (`menus-popovers-and-indicators.md`, `gamified-experiences.md`): menus that open beside their trigger, calm attention dots, role and personalisation onboarding, and honest gamified learner experiences.
- **Clean UI details** (`clean-ui-details.md`): the small decisions behind calm, premium screens, from the sidebar's active state to status chips, sparkline KPI tiles, one well-made chart, grouped list cards, and an optional companion colour.
- **Suggestion-oriented by design**: reports separate facts, suggestions with confidence, and questions; taste-level choices are offered as options, never assumed.
- **A 100-point scorecard** (`scorecard.md`) with hard fails, used before any design is shown.
- **A taste ledger** (`taste-memory.md` and `.vibe-ui/TASTE.md`): every owner review becomes a numbered, testable rule that later sessions read first, so the agent stops repeating rejected work.
- **A colour checker** (`scripts/check-colour.mjs`): flags near-black primaries and brand colours that drift into brown or maroon, and reports contrast.

## How it works

`SKILL.md` is the entry point and orchestrator. It always reads `workflow.md`, then loads only the reference modules relevant to the current scope — this keeps the agent's context focused on the actual problem instead of every UX/UI domain at once.

Before substantial design work, the skill classifies the audience, task, product type, journey stage, page archetype, dominant content, density, environment, and stakes, so an application dashboard, a marketing landing page, a checkout flow, and an expert tool do not receive the same generic treatment. UX laws are converted into practical diagnosis (observed signal → intervention → example → misuse warning → verification), not cited as justification for conversion tricks.

## Reference modules

Loaded on demand from `skills/vibe-ui/references/`:

| Module | Covers |
| --- | --- |
| `dashboard-craft.md` | Concrete dashboard defaults: type scale, spacing, colour budget, app shell, module tabs with counts, KPI tiles, tables, forms, calendars, quality-of-life toolkit, and the mobile translation of each. |
| `device-audit.md` | The device matrix (desktop and mobile first, then tablet and wide), visual and code passes, and evidence rules. |
| `menus-popovers-and-indicators.md` | Menu placement and anatomy, attention dots versus counts, segmented tabs, cascading filters, the account area. |
| `gamified-experiences.md` | Core loop, choosing reward systems, visual language, feedback and motion, and gamification anti-patterns. |
| `clean-ui-details.md` | Page header, sidebar active state, breathing tables, status chips, KPI sparklines, charts, gauges, overview and grouped list cards, companion colour. |
| `fix-playbook.md` | Ten ordered passes for correcting any existing dashboard, with find-and-replace tables. |
| `onboarding-and-activation.md` | Sign-up and workspace setup, smart defaults, placeholders and selector choice, first-run wizard, setup checklist, empty states, announcements. |
| `dialogs-and-overlays.md` | Dialog anatomy, backdrops, nested dialogs, wizard dialogs, two-list transfer, confirmations, side sheets. |
| `detail-pages-and-editing.md` | Record headers, inline editing with pencil icons, sub-section tabs, status, print and share. |
| `anti-patterns.md` | Patterns that get dashboards rejected, each with the reason and the fix. |
| `scorecard.md` | 100-point dashboard scorecard with presentation gate (85) and hard fails. |
| `taste-memory.md` | Turning owner feedback into numbered, testable rules in `.vibe-ui/TASTE.md`, and upstreaming general ones. |
| `workflow.md` | The engagement process every request follows: frame, recon (taste ledger first), inspect, diagnose, choose intervention, implement, verify (scorecard), report, learn. |
| `context-and-archetypes.md` | Audience, product type, journey stage, page archetype, content type, and density classification. |
| `dashboards-and-kpis.md` | Dashboard job classification, information hierarchy, sidebar structure, KPI card completeness, chart selection, contextual bulk actions. |
| `context-dependencies-and-performance.md` | Dependency tracing, shared consumers, data paths, and page-level experience performance. |
| `cognitive-load-and-information-architecture.md` | Explanatory-content classification, navigation and tab architecture, decision load. |
| `visual-hierarchy-and-layout.md` | Reading order, grouping, alignment, density, progressive disclosure. |
| `spacing-and-consistency.md` | Spacing systems, token reuse, cross-screen and cross-component consistency. |
| `color-and-contrast.md` | Semantic colour roles, contrast thresholds, palette discipline, dark appearance. |
| `typography-and-content.md` | Type systems, readability, wrapping, microcopy, and label/placeholder casing consistency. |
| `accessibility-and-input.md` | Keyboard operation, screen readers, semantics, hit areas, zoom and reflow. |
| `ux-laws-and-behavior.md` | The full Laws of UX catalogue as diagnostic lenses, each with a misuse warning. |
| `forms-onboarding-and-states.md` | Dialog vs multi-step-dialog vs side-sheet choice, defaults, validation, loading/empty/error states. |
| `data-tables-and-controls.md` | Toolbar consolidation, real row-action buttons, sorting, filtering, and when truncation is (and isn't) justified. |
| `connected-surfaces.md` | Following a target view into the dialogs, drawers, menus, and filtered states it opens. |
| `motion-and-feedback.md` | Motion with a job, timing systems, reduced-motion behaviour. |
| `responsive-and-platforms.md` | Mobile-first adaptation across compact touch, tablet, and desktop. |
| `next-react-tailwind.md` | Next.js/React/Tailwind-specific implementation patterns and framework composition. |
| `component-libraries-and-mcp.md` | Installed component-library detection, composition over invention, and MCP tooling (registries plus Mobbin/Refero). |
| `visual-validation.md` | The state matrix, evidence capture, and verdict rules (`Block` / `Needs changes` / `Approve`). |

## Component libraries and MCP research

Vibe UI detects the project's installed component library (shadcn/ui, Radix, Base UI, and shadcn-registry-based libraries such as ReUI) and any configured component-registry MCP server before building a new component, preferring composition over invention. See `component-libraries-and-mcp.md`.

If Mobbin or Refero MCP tools are already available and enabled, Vibe UI can also use them for a narrow design-pattern question before building. If configured but disabled, the skill asks the user to enable the server; if unavailable, it continues without them. These design-research services are optional and currently require paid plans for MCP access — Vibe UI does not configure credentials or claim they are free.

## CLI reference

```bash
npx vibe-ui-skill init [--skip-transitions]   # install into the current project
npx vibe-ui-skill status                     # show what's currently installed
npx vibe-ui-skill update [--skip-transitions] # refresh skill content only
npx vibe-ui-skill remove [--purge-memory]     # uninstall
```

`update` only refreshes the installed skill directories (the methodology itself) — it never touches `.vibe-ui/`, so a project's recorded stack fingerprint, engagement state, and evidence survive every update. `remove` keeps `.vibe-ui/` and the separately installed Transitions.dev skill unless `--purge-memory` is passed, so removing Vibe UI never silently deletes another tool's dependency or a project's accumulated context.

## Development

```bash
npm test
npm run validate:skill
```

`npm test` runs the CLI lifecycle test (`test/cli.test.js`) and the static-auditor heuristic test (`test/static-audit.test.js`). `validate:skill` checks the packaged skill bundle's structure (all referenced modules exist, required resources are present, core operating rules haven't regressed).

Visual quality cannot be proven by a structural test. Forward tests should use real repositories and compare the same routes, fixtures, states, themes, and viewports before and after — see `test/visual-evaluation.md` for the current case list and scoring rubric.

The bundled static auditor can scan a project, or only its Git-changed files, for review candidates (not automatic defects — confirm every finding in source and, when it matters, in the rendered interface):

```bash
node .agents/skills/vibe-ui/scripts/audit-static.mjs .
node .agents/skills/vibe-ui/scripts/audit-static.mjs . --changed
node .agents/skills/vibe-ui/scripts/check-colour.mjs "#CF4A0C" --brand "#FA4B09"
node .agents/skills/vibe-ui/scripts/capture-viewports.mjs http://localhost:3000/dashboard --only desktop,mobile
```

## Publishing

Publishing needs an npm token with publish rights for `vibe-ui-skill`, available as the `NPM_TOKEN` environment variable. Never commit a token.

```bash
npm config set //registry.npmjs.org/:_authToken "$NPM_TOKEN"
npm publish   # prepublishOnly runs the tests and the skill validation first
```

## Changelog

**0.12.1**: Every control in a prototype or component gallery must work; component galleries get Preview, Anatomy, Behaviour and Usage views.

**0.12.0**: Rewrites the app shell: the header holds only global tools (sidebar toggle first, search scoped to the primary entity with a Ctrl K panel, workspace or role switcher, notifications, user menu) and never status text or page buttons; the sidebar shows the brand mark only, is collapsed by default and expands over the content on hover intent; counts only where they drive action. Adds a component-collection habit to taste memory.

**0.11.0**: Intent-first design: list the user's questions before layout, answer the top ones on the first screen, and remove anything that answers none. Adds the "calm is not boring" principle (one purposeful visual idea per dashboard) and asks for desktop, phone, and design-system views whenever directions are presented.

**0.10.0**: Adds `clean-ui-details.md` and a "Suggest, do not assume" operating rule: reports separate facts, suggestions, and questions, and taste-level changes (colour, type, surfaces, density, gamification) are offered as options. Adds the all-white surface model, divider-separated rows, ghost kebab menus, and an optional companion colour.

**0.9.0**: Gives the agent the role of a senior product designer and design engineer. Adds `device-audit.md` and `scripts/capture-viewports.mjs` (10-viewport capture with automatic signals), `menus-popovers-and-indicators.md` (menu placement, attention dots, segmented tabs, cascading filters), and `gamified-experiences.md`. Extends onboarding with log-in pages, role cards, and personalisation questions, and typography with clean product typefaces and content-hub titles.

**0.8.0**: Adds `fix-playbook.md` (ten ordered passes to correct any dashboard), `onboarding-and-activation.md`, `dialogs-and-overlays.md`, and `detail-pages-and-editing.md`. Lightens the type rules (500 for titles, never 700+), adds the sticky top bar, "e.g." placeholders, selector choice by list length, scorecard add-ons for dialogs, onboarding, and record pages, and two static audit candidates (`heavy-weight`, `heavy-backdrop`). Removes product and real place names from the skill: it keeps patterns, never brands.

**0.7.0**: Gives the skill taste. Adds `dashboard-craft.md` (numeric type, spacing, and colour defaults plus drawn recipes for shell, tabs with counts, KPI tiles, tables, forms, calendars, quality-of-life features, and mobile translation), `anti-patterns.md`, a 100-point `scorecard.md` with hard fails, and `taste-memory.md` with a project `.vibe-ui/TASTE.md` ledger created by `init`. Adds `scripts/check-colour.mjs` for brand drift and contrast, and three static audit candidates (`near-black-fill`, `oversized-text`, `dark-by-default`). Workflow now reads the taste ledger first, scores before presenting, and ends with a learn step.

**0.6.1** — Documentation only: restructured README with a table of contents, a table describing all 19 reference modules, a CLI reference table, and a dedicated changelog section. No skill behaviour changed.

**0.6.0** — Adds `dashboards-and-kpis.md`: dashboard job classification (monitoring/analytical/operational/management/administrative) before choosing widgets, a three-level critical/important/detailed information hierarchy, sidebar grouping and active-state rules, KPI cards that must carry a comparison period and update recency, a chart-selection table keyed to the user's actual question, contextual bulk-action toolbars, and the popover-vs-modal-vs-dedicated-page decision for dashboard interactions.

**0.5.0** — Collapses four modes into `audit` and `improve` (building a component and validating shipped work are now scoped `improve` work). Adds mobile-first as the explicit default; follows a target view into the dialogs, drawers, menus, and filtered states it opens instead of stopping at the entry surface; adds data-table guidance (real row-action buttons, sorting, filtering, truncation only when content genuinely lacks room); adds dialog-vs-sheet and multi-step-dialog guidance for detail-heavy forms; adds a placeholder/label casing-consistency rule; detects installed component libraries and shadcn-style registries such as ReUI before building a new component; broadens MCP guidance to component-registry MCP servers; caches first-run project discovery in `.vibe-ui/PROJECT.md`.

**0.4.0** — Traces route dependencies and shared consumers; audits cognitive load and navigation architecture before panel polish; checks page-level experience performance; distinguishes Base UI from Radix composition; requires rendered evidence for visual approval; expands the static auditor with diff-scoped Tailwind colour, image, mounting, fetching, and nested-interaction candidates.

**0.3.0 and earlier** — See [GitHub releases](https://github.com/imrishabhchauhan/vibe-ui/releases) and commit history for the initial `audit` / `improve` / `build` / `validate` foundation.

## Sources and acknowledgements

Vibe UI contains original synthesis and practical examples informed by:

- [Laws of UX](https://lawsofux.com/), for its public catalogue of behavioural and perception principles;
- [Jakub Krehel's interface skills](https://github.com/jakubkrehel/skills) (MIT licensed), for the value of domain-owned progressive-disclosure skills;
- [Transitions.dev](https://github.com/Jakubantalik/transitions.dev), as an optional, separately installed free companion skill;
- official [Next.js](https://nextjs.org/docs/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/docs), [Mobbin](https://docs.mobbin.com/mcp/introduction), and [Refero](https://doc.refero.design/mcp/getting-started) documentation.

No Transitions.dev source or Pro content is bundled in this repository.

## License

[MIT](./LICENSE) © Rishabh Chauhan
