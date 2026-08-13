# Component Libraries and MCP Tooling

Build from what the project already has installed before reaching for a new dependency, a hand-rolled substitute, or an external MCP. This module covers detecting and extending installed component libraries, using component-registry MCP tools when available, and using design-reference MCPs for pattern research.

## Detect the installed component system first

Before building or improving a component, identify what is already installed rather than assuming shadcn/ui alone:

1. Read `components.json` if present: it names the base library (`"style"`), the resolved alias paths, and, in newer shadcn CLI versions, any additional registries under `registries` (e.g. a `@reui` or other namespaced registry alongside the default).
2. Read `package.json` dependencies for `@radix-ui/*`, `@base-ui-components/react`, `class-variance-authority`, `tailwind-variants`, and similar primitive/variant libraries.
3. Scan the resolved UI directory (commonly `components/ui`) for the actual installed component files; this is more reliable than assumptions, since shadcn-style libraries copy source into the repo rather than only listing a package dependency.
4. Note the installed style variant (e.g. `new-york`, `default`, `base-nova`, `radix-nova`) so any new component matches the same visual family.

Libraries such as ReUI ship as a shadcn-compatible registry: their components are added with the same `shadcn` CLI against a different namespace, install as owned source files the same way, and compose the same underlying Radix/Base UI primitives. Treat a registry-based library exactly like the base component library it extends: check what it already provides before building a substitute, and match its established variant and token usage.

## Prefer composition over invention

1. Search the installed component directory for an existing component or variant that already covers the need (e.g. a `DataTable`, `Combobox`, `Stepper`, or `Dialog` with a documented multi-step pattern) before writing a new one.
2. If the installed library or an already-added registry offers the needed pattern but it is not yet installed in this project, prefer adding it through the project's existing install mechanism (its CLI, its registry alias) over hand-building an equivalent.
3. Only build a genuinely new component when no installed primitive or registry item reasonably covers the need. When building one, compose it from the installed primitives (Radix/Base UI triggers, portals, focus management) and match the existing variant, token, and prop-naming conventions instead of introducing a parallel styling approach.
4. Do not be reluctant to add a new, small, well-scoped component when the task genuinely needs one; the goal is to avoid duplicating what already exists, not to avoid building.

## Use component and registry MCP tools when available

1. Inspect the live tool registry or the project's MCP configuration for an installed component-registry MCP server (for example an official shadcn MCP server or a similarly named registry server). Match actual configured tool names; never invent one.
2. If available and enabled, use it to search the configured registries (base library plus any added registry such as ReUI) for a component that matches the need, inspect its usage and props, and install it through the tool rather than hand-copying markup from memory.
3. If a relevant MCP tool is configured but disabled, tell the user which server is disabled and ask them to enable it before depending on it.
4. If no such MCP is available, fall back to the project's existing CLI-based install command (documented in its README or `components.json`) or to composing from what is already installed.
5. Never fetch or install a component from an unverified or unrelated registry without the user's awareness; treat new registry sources the same as any new dependency.

## Design research with Mobbin or Refero

Use design-reference MCPs to study shipped patterns, not to copy a screen or outsource product judgement.

### Availability policy

1. Inspect the live tool registry or the IDE's MCP configuration.
2. Match the actual configured server/tool names; do not assume they are exactly `mobbin` or `refero`.
3. If enabled and callable, use the relevant tools.
4. If configured but disabled, tell the user which server is disabled and ask them to enable it before depending on it.
5. If absent, unauthorised, quota-limited, or unavailable, continue with the project, supplied references, official docs, and general principles.

Do not auto-edit MCP configuration or request credentials. Do not imply free access. Mobbin MCP currently requires Pro, Team, or Enterprise; Refero MCP currently requires Refero Pro.

### Form a narrow research question

Good:

- web checkout address correction after payment failure;
- mobile restaurant booking with date, popular time, party size, and seating preference;
- desktop developer dashboard empty state with first successful action;
- subscription cancellation with transparent consequences and recovery.

Weak:

- "find premium UI";
- "make this look like Stripe";
- "show the best dashboard".

Specify audience, platform, product category, task stage, required states, and constraints.

### Study patterns

Collect a small set of relevant references. For each, extract:

- information order;
- primary and secondary actions;
- defaults and decision count;
- layout and responsive behaviour;
- loading, empty, error, success, and recovery;
- copy and trust cues;
- accessibility or manipulation risks;
- what is category convention versus brand styling.

### Synthesis

Create an original interface that fits the user's product, data, brand, component system, and permissions. Never reproduce protected brand assets, proprietary copy, or a screen pixel for pixel. Cite or record the reference source when the project requires an audit trail.

### Decision record

For each adopted pattern state:

- observed pattern;
- why it fits this audience and task;
- how it is adapted;
- what was deliberately not copied;
- how it will be tested.

## Cache what was detected

Record the detected component library, style variant, registries, and any relevant MCP availability in the project's `.vibe-ui/PROJECT.md` (see `workflow.md`) after the first engagement, so later engagements reuse this discovery instead of re-detecting or re-researching it from scratch every time. Re-verify only when the project's dependencies, `components.json`, or MCP configuration have visibly changed since the recorded date.
