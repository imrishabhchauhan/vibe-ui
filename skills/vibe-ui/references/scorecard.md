# Dashboard Scorecard (100 points)

Score every dashboard or admin screen before you present it, and score the "before" state in every audit. Each check is yes (2 points) or no (0). Ten areas, five checks each, 100 points.

Scoring needs the rendered screen at desktop width and at a phone width (360 to 430px). If you could not render, mark the score `unverified` and do not present it as final.

## Gates

- **Present only at 85 or more.** Below 85, fix the lowest areas first.
- **Hard fails cap the score at 60**, whatever the total:
  - horizontal page scroll at any supported width;
  - a number, status, or primary action present on desktop but missing on phone;
  - body or meta text under 12px, or text contrast under 4.5:1;
  - a pattern the project's `.vibe-ui/TASTE.md` bans (for example black buttons);
  - a keyboard trap or a control that cannot be reached by keyboard.

## 1. Job clarity

- [ ] A new user can say what the screen is for in five seconds.
- [ ] The single most important number or status is in the top third.
- [ ] "Needs attention" items are visible without scrolling, with an action each.
- [ ] There is exactly one filled primary action per region.
- [ ] Nothing on screen exists only because the data was available.

## 2. Typography

- [ ] Page title 20 to 24px; section titles 16 to 18px.
- [ ] KPI values 22 to 28px (never above 32px), tabular numbers.
- [ ] Body and table text 14 to 15px; meta text 12 to 13px or more.
- [ ] No text heavier than 600; titles and labels at 500; hierarchy also uses colour and position.
- [ ] Casing is consistent per role (labels, buttons, tabs).

## 3. Spacing and grouping

- [ ] Page gutter 24 to 32px desktop, 16px phone.
- [ ] Gaps between cards 16 to 24px; between sections 32px or more.
- [ ] Every card holds one concept and has one title.
- [ ] Equal-height cards in a row, actions aligned.
- [ ] No two tinted blocks touch without a visible gap.

## 4. Colour discipline

- [ ] Neutrals carry about 90% of the screen.
- [ ] The brand accent is under about 5% of the screen.
- [ ] Clickable text uses one link colour (blue if the accent is warm).
- [ ] Semantic colours (green, red, amber) appear only with meaning, paired with a word or icon.
- [ ] The accent still looks like the brand (no orange-to-brown drift); `check-colour.mjs` passes.

## 5. Navigation and tabs

- [ ] The rail or sidebar has 9 or fewer top-level items.
- [ ] Module sub-pages are tabs, and list tabs show counts.
- [ ] The current location is obvious (one active treatment).
- [ ] The top bar is sticky and the workspace or account switcher is visible but quiet.
- [ ] Every detail page has a way back that names the parent.

## 6. Tables and lists

- [ ] Toolbar shows count, search, quick filters, refresh, filter icon, export, and the primary add.
- [ ] Sort icons only on columns where sorting helps.
- [ ] Clickable names in link colour, with a muted secondary line (ID).
- [ ] Row actions in a real kebab menu button; selection checkboxes with a bulk bar.
- [ ] Zebra rows or clear row separators; sticky header on long tables.

## 7. Forms and inputs

- [ ] Long forms are split into titled sections.
- [ ] Every field has a visible label above it; required fields have a red asterisk.
- [ ] 2 to 4 fixed options use a segmented control.
- [ ] Phone has a country code; file inputs show accepted types; selects say "Select".
- [ ] Errors appear under the field, focus moves to the first error, input is kept.

## 8. States and feedback

- [ ] Loading keeps the layout (skeletons, no jumps).
- [ ] Empty states say what will appear and give one next action.
- [ ] Errors say what happened and how to fix it.
- [ ] Zero is shown as 0, not as a blank or a dash.
- [ ] Numbers that are not live show when they were last updated.

## 9. Quality of life

- [ ] Export on every operational table.
- [ ] Refresh where other people change the data.
- [ ] Print where the real-world output is paper.
- [ ] Filters and tab kept in the URL.
- [ ] Date views have Today and previous/next navigation, with today highlighted.

## 10. Mobile

- [ ] No horizontal scroll at 360, 390, and 430px.
- [ ] Every desktop number, status, and primary action is still present.
- [ ] Tables become card lists; filters move to a sheet.
- [ ] Touch targets are 44px or more.
- [ ] Navigation is a bottom bar or a menu sheet, and the add action stays reachable.

## Surface add-ons

Score each add-on that applies, 2 points per check, and report the result as a percentage next to the main score: `Main 88 / 100 · Dialogs 8 / 10 · Onboarding 10 / 10`. Any add-on under 7 / 10 blocks presentation.

**Dialogs**
- [ ] Short task title, close icon, Esc support.
- [ ] Concise body; primary button names the outcome; secondary is tinted or outline.
- [ ] Light backdrop (no blur, or 2 to 4px at most).
- [ ] Nested dialogs dim the one below without blur; never more than two levels.
- [ ] Focus moves in on open and back to the trigger on close.

**Onboarding**
- [ ] One kind of information per screen, one primary action.
- [ ] Country-dependent fields filled from the country.
- [ ] Placeholders start with "e.g."; selects say "Select"; search only in long lists.
- [ ] First-run wizard over a visible dashboard, current step marked, future steps dimmed.
- [ ] A setup checklist with progress that disappears when done.

**Record pages**
- [ ] Title, status, and key facts readable in five seconds.
- [ ] A pencil on every editable fact, and only there.
- [ ] Linked records in the link colour.
- [ ] Header actions grouped into a few menus by job.
- [ ] Sub-sections as tabs kept in the URL; empty panels teach the next action.

## Report format

```text
Score: 78 / 100 (before: 52)  ·  Hard fails: none
Weakest areas: Colour discipline 6/10, Quality of life 6/10
Taste rules applied: T-001, T-002
Top 3 fixes: ...
```
