# Design Research with Mobbin or Refero

Use design-reference MCPs to study shipped patterns, not to copy a screen or outsource product judgement.

## Availability policy

1. Inspect the live tool registry or the IDE's MCP configuration.
2. Match the actual configured server/tool names; do not assume they are exactly `mobbin` or `refero`.
3. If enabled and callable, use the relevant tools.
4. If configured but disabled, tell the user which server is disabled and ask them to enable it before depending on it.
5. If absent, unauthorised, quota-limited, or unavailable, continue with the project, supplied references, official docs, and general principles.

Do not auto-edit MCP configuration or request credentials. Do not imply free access. Mobbin MCP currently requires Pro, Team, or Enterprise; Refero MCP currently requires Refero Pro.

## Form a narrow research question

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

## Study patterns

Collect a small set of relevant references. For each, extract:

- information order;
- primary and secondary actions;
- defaults and decision count;
- layout and responsive behaviour;
- loading, empty, error, success, and recovery;
- copy and trust cues;
- accessibility or manipulation risks;
- what is category convention versus brand styling.

## Synthesis

Create an original interface that fits the user's product, data, brand, component system, and permissions. Never reproduce protected brand assets, proprietary copy, or a screen pixel for pixel. Cite or record the reference source when the project requires an audit trail.

## Decision record

For each adopted pattern state:

- observed pattern;
- why it fits this audience and task;
- how it is adapted;
- what was deliberately not copied;
- how it will be tested.

