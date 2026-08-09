# Context and Archetype Routing

Use this module before a substantial build or redesign. It prevents generic AI styling by deciding which interface logic fits the user, task, product, page, content, density, and device.

## Contents

1. Classification model
2. Product and journey logic
3. Page archetypes
4. Content and density
5. Audience capability
6. Navigation and promotion
7. Preserve-or-change decision
8. Compact design brief

## 1. Classification model

Resolve these dimensions from evidence:

| Dimension | Question | Useful values |
| --- | --- | --- |
| Audience | Who uses this and with what capability? | occasional, frequent, novice, expert, child, student, professional, older, low digital literacy |
| Task | What must be understood or completed? | authenticate, compare, decide, create, monitor, recover, purchase |
| Product type | What kind of product is this? | application, dashboard, marketing site, landing page, commerce, content product |
| Journey stage | Where is the user in the relationship? | acquisition, entry, activation, core use, management, recovery |
| Page archetype | What job does this surface perform? | authentication, onboarding, dashboard, search, form, table, report, checkout, settings, error |
| Usage | How often and under what time pressure? | occasional, recurring, high-frequency, operational |
| Dominant content | What occupies attention? | data, content, action, visual media, forms, commerce |
| Density | How much simultaneous information supports the job? | low, medium, high, expert |
| Environment | How is it operated? | compact touch, tablet, desktop pointer/keyboard, large workspace |
| Stakes | What is the cost of error? | low, financial, security, healthcare, destructive, regulated |

Do not infer capability from age alone. Treat demographics as weak context until research, product evidence, or accessibility needs explain the actual interaction requirement.

## 2. Product and journey logic

### Application and dashboard UI

Optimise repeated task completion, data clarity, system status, navigation, search, filtering, sorting, bulk work, recovery, and scalable density. Persistent controls are valuable when they reduce repeated work.

Textual example: a reporting dashboard should prioritise current metrics, filters, anomalies, and export—not a large brand story or promotional hero.

### Marketing and landing UI

Optimise immediate comprehension, audience relevance, credible value, proof, objections, trust, and one honest next action. A useful narrative is `problem → promise → value → proof → product → objections → action`, adapted to evidence rather than followed mechanically.

Textual example: a B2B landing page may lead with the operational outcome and proof from comparable teams, while the product dashboard leads with the user's live work.

### Journey stages

- Acquisition: explain relevance and earn attention.
- Entry: authenticate or recover access with minimal distraction.
- Activation: reach the first credible value moment before deep configuration.
- Core use: prioritise frequent tasks, continuity, speed, and persistent context.
- Management: make consequences, scope, permissions, and saved state explicit.
- Recovery: explain what happened, preserve work, and provide a safe route forward.

The same brand can legitimately use different density, copy, and layout across stages.

## 3. Page archetypes

### Authentication

Prioritise identity context, primary authentication, alternative approved methods, legal requirements, and recovery. Keep marketing and promotion subordinate. A simple task deserves a focused screen.

### Onboarding

Prove value early, request only currently needed information, show honest progress, support skip where safe, and preserve resumable work.

### Dashboard home

Prioritise status and the user's most valuable or frequent actions. A dashboard is not a catalogue of every feature. Use analytics and research to distinguish habitual work from occasional navigation.

Treat a dashboard as an orientation and decision surface, not a compressed copy of every module. Remove tables, deadlines, activity feeds, alerts, and creation actions when their dedicated pages or notification centre already serve them better. Add a dashboard element only when it answers a recurring cross-module question, reveals a meaningful change, or shortens a genuinely frequent task.

For financial or operational dashboards:

- prefer bars for discrete monthly comparisons and lines for genuinely continuous trends;
- keep charts compact enough that summary and context remain visible together;
- retain essential scope such as tax treatment, currency, or reporting basis;
- remove duplicate KPI chips and legends when axes, labels, colour, or tooltips already make the series clear;
- make global filters visibly control the nearby cards and charts, or label exceptions explicitly;
- show a complete period domain when users select a complete period, distinguishing future or unavailable values from numeric zero.

### Search and discovery

Preserve the query, filters, result count, sorting, and recovery from no results. Support recognition and comparison. Do not hide active constraints.

### Forms and workflows

Sequence information by dependency, use safe defaults, prevent invalid states, and preserve data after failure. Complex workflows need orientation and review, not merely fewer fields per screen.

### Data tables and reports

Optimise comparison, scanning, sorting, filtering, column meaning, units, precision, density, and keyboard use. Mobile may require a prioritised list and separate detail view rather than a compressed table.

### Commerce and checkout

Keep product, price, delivery, fees, selected options, and final consequence visible. Avoid surprise costs, preselected add-ons, promotional interruptions, and ambiguous confirmation.

### Settings and administration

Group by user goal, make scope and affected subjects explicit, separate destructive controls, and accommodate expert density without hiding permissions or consequences.

### Error and recovery

State what happened, why when known, what was preserved, what the user can do now, and where support or an alternate path exists.

## 4. Content and density

### Dominant content

- Data-heavy: prioritise comparison, precision, filters, states, and compact repeatable structures.
- Content-heavy: prioritise reading order, measure, navigation, wayfinding, and retrieval.
- Action-heavy: prioritise status, consequences, feedback, safe shortcuts, and recovery.
- Visual-heavy: prioritise media meaning, crop, performance, captions, and alternative access.
- Form-heavy: prioritise sequencing, defaults, validation, draft preservation, and completion.
- Commerce-heavy: prioritise selection clarity, trust, total cost, fulfilment, and confirmation.

### Density

- Low: focused entry, onboarding step, or single decision.
- Medium: overview, consumer dashboard, or mixed content/action surface.
- High: CRM, ERP, analytics, or operational workspace.
- Expert: specialist terminals or professional tools where simultaneous context and keyboard speed matter.

High density is not inherently poor UX. Excessive whitespace, oversized cards, and staged navigation can reduce expert efficiency. Low density is not inherently simple if it hides required context across many screens.

## 5. Audience capability

### Children and younger users

Consider shorter tasks, visible progress, clear feedback, suitable illustration, and larger interactions. Do not equate youth with cartoons or childish language. Match developmental ability and product seriousness.

### Older or low-digital-literacy users

Prefer explicit labels, familiar controls, strong contrast, readable type, larger targets, predictable navigation, fewer simultaneous choices, visible feedback, and forgiving recovery. Avoid hidden gestures and clever icon-only actions.

Calibrate guidance from observed capability and product evidence, never nationality, age, or another demographic stereotype. When discoverability is uncertain, strengthen familiar affordances for everyone rather than writing condescending copy.

### Expert users

Protect speed, density, shortcuts, customisation, bulk actions, power filters, persistent context, and keyboard control. Do not oversimplify professional software to make it resemble a marketing site.

### Occasional users

Prioritise recognition, orientation, clear labels, recent context, and low setup burden. Avoid workflows that assume remembered codes, terminology, or configuration.

## 6. Navigation and promotion

Rank navigation by task frequency, importance, user expectation, and product goal—not the organisation chart. Mobile and desktop can expose the same capability through different architectures.

Promotional content must not interrupt authentication, assessment, payment, recovery, or core operational work. Monetisation can coexist with the task when it remains clearly secondary and dismissible.

Textual example: a banking home may give balance, recent activity, and common transfers priority while placing loan promotion below core actions rather than above them.

## 7. Preserve-or-change decision

Classify each meaningful existing element:

- `KEEP`: already supports the task, system, and accessibility.
- `REFINE`: correct role; improve copy, spacing, visual treatment, or state.
- `RESTRUCTURE`: useful content or capability; change grouping, order, or interaction architecture.
- `REPLACE`: the pattern itself blocks clarity, access, or adaptation.
- `REMOVE`: no meaningful user or required business purpose, or duplicates another element.

Do not rewrite for novelty. Preserve familiar behaviour, useful content, stable primitives, accessibility work, and defensible design-system rules.

## 8. Compact design brief

Use this shape internally when context is complex:

```yaml
interface:
  product_type: application
  journey_stage: core_use
  page_archetype: report
  dominant_content: data_heavy
  density: medium
  device_targets: [compact_touch, tablet, desktop]

audience:
  primary: university_students
  capability: medium_high_digital_literacy
  usage_frequency: occasional
  accessibility_needs: [keyboard, zoom_reflow, colour_independence]

task:
  primary: understand_skill_gap_results
  secondary: [identify_weak_areas, view_recommendations]
  cost_of_error: medium

preserve:
  brand: true
  working_components: true
  familiar_behaviour: true

priority: [comprehension, hierarchy, recovery, responsive_use, accessibility]
```

Keep unknown values explicit. Do not invent research. The brief guides decisions; it is not a user-facing deliverable unless requested.

