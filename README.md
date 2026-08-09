# Vibe UI

Current foundation: `v0.4.0`.

Vibe UI is an evidence-led UI and UX engineering skill for AI coding agents. It audits, builds, improves, and visually validates interfaces across accessibility, hierarchy, layout, spacing, consistency, typography, colour, responsive behaviour, forms, onboarding, UX writing, interaction states, and motion.

It is stack-agnostic at the principle level and intentionally deeper for Next.js, React, and Tailwind CSS projects.

## Install

The npm package name is `vibe-ui-skill` because `vibe-ui` is already taken on npm. The command remains `vibe-ui`.

```bash
pnpm dlx vibe-ui-skill init
# or: npx vibe-ui-skill init
```

By default this installs:

1. the Vibe UI skill into `.agents/skills/vibe-ui/` and detected IDE-specific skill directories;
2. a fallback pointer in `AGENTS.md`;
3. a project-owned `.vibe-ui/` context and evidence folder;
4. the free `transitions-dev` agent skill in the universal project skill directory through its official `npx skills add` command.

It does not install `transitions-pro`, use Pro recipes, create an account, or require an API key. Use `--skip-transitions` for an offline Vibe UI-only installation.

```bash
npx vibe-ui-skill status
npx vibe-ui-skill update
npx vibe-ui-skill remove
npx vibe-ui-skill remove --purge-memory
```

`remove` keeps `.vibe-ui/` and the separately installed Transitions.dev skill unless explicitly told to purge Vibe UI project memory. This avoids deleting shared work or another tool's dependency.

## Use

Ask the agent:

> Use Vibe UI to audit and improve the restaurant booking flow on mobile, tablet, and desktop.

Vibe UI resolves one of four modes:

- `audit`: evidence-backed review without edits;
- `improve`: diagnose, implement, and verify a bounded change;
- `build`: create a new interface in the existing product system;
- `validate`: run visual, behavioural, responsive, and accessibility checks.

## Architecture

The installed bundle is intentionally lean:

```text
skills/vibe-ui/
├── SKILL.md
├── agents/openai.yaml
├── references/
└── scripts/
```

`SKILL.md` orchestrates the workflow. Dedicated references own contextual classification and page archetypes, colour, typography, layout, spacing, consistency, accessibility, behavioural UX laws, forms, motion, platforms, Next.js/React/Tailwind implementation, optional design-reference MCP research, and visual validation.

Before substantial design work, Vibe UI classifies the audience, task, product type, journey stage, page archetype, dominant content, density, environment, and stakes. This prevents application dashboards, landing pages, checkout flows, and expert tools from receiving the same generic AI visual treatment.

The skill converts UX theory into practical diagnosis: observed signal, intervention, textual example, misuse warning, and verification. It does not use laws as conversion tricks or copy attached screenshots at runtime.

Version 0.4 makes context and verification enforceable. It traces route dependencies and shared consumers, audits cognitive load and navigation architecture before panel polish, checks page-level experience performance, distinguishes Base UI from Radix composition, requires rendered evidence for visual approval, and expands the static auditor with diff-scoped Tailwind colour, image, mounting, fetching, and nested-interaction candidates.

## Optional Mobbin and Refero research

If Mobbin or Refero MCP tools are already available and enabled, Vibe UI can use them for a narrow design-pattern question before building. If configured but disabled, the skill asks the user to enable the server. If unavailable, it continues without them.

These services are optional and currently require paid plans for MCP access. Vibe UI does not configure credentials or claim they are free.

## Sources and acknowledgements

Vibe UI contains original synthesis and practical examples informed by:

- [Laws of UX](https://lawsofux.com/) for its public catalogue of behavioural and perception principles;
- [Jakub Krehel's interface skills](https://github.com/jakubkrehel/skills), MIT licensed, for the value of domain-owned progressive-disclosure skills;
- [Transitions.dev](https://github.com/Jakubantalik/transitions.dev) as an optional separately installed free companion skill;
- official [Next.js](https://nextjs.org/docs/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/docs), [Mobbin](https://docs.mobbin.com/mcp/introduction), and [Refero](https://doc.refero.design/mcp/getting-started) documentation.

No Transitions.dev source or Pro content is bundled in this repository.

## Development

```bash
npm test
python C:/Users/you/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/vibe-ui
```

Visual quality cannot be proven by a structural test. Forward tests should use real repositories and compare the same routes, fixtures, states, themes, and viewports before and after.

The bundled static auditor can scan a project or only Git-changed files:

```bash
node .agents/skills/vibe-ui/scripts/audit-static.mjs .
node .agents/skills/vibe-ui/scripts/audit-static.mjs . --changed
```

Its output contains review candidates, not automatic defects. Confirm every candidate in source and, when visual or runtime behaviour matters, in the rendered interface.

## Licence

MIT © Rishabh Chauhan
