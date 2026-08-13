# Vibe UI

[![npm version](https://img.shields.io/npm/v/vibe-ui-skill.svg)](https://www.npmjs.com/package/vibe-ui-skill)
[![license](https://img.shields.io/npm/l/vibe-ui-skill.svg)](./LICENSE)

Evidence-led UI/UX engineering skill for AI coding agents. Current release: `v0.6.0`.

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
3. a project-owned `.vibe-ui/` context and evidence folder, where the skill records what it learns about *this* codebase;
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

## How it works

`SKILL.md` is the entry point and orchestrator. It always reads `workflow.md`, then loads only the reference modules relevant to the current scope — this keeps the agent's context focused on the actual problem instead of every UX/UI domain at once.

Before substantial design work, the skill classifies the audience, task, product type, journey stage, page archetype, dominant content, density, environment, and stakes, so an application dashboard, a marketing landing page, a checkout flow, and an expert tool do not receive the same generic treatment. UX laws are converted into practical diagnosis (observed signal → intervention → example → misuse warning → verification), not cited as justification for conversion tricks.

## Reference modules

Loaded on demand from `skills/vibe-ui/references/`:

| Module | Covers |
| --- | --- |
| `workflow.md` | The 8-step engagement process every request follows: frame, recon, inspect, diagnose, choose intervention, implement, verify, report. |
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
```

## Changelog

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
