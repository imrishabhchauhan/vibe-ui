# Dashboard Craft: What Good Looks Like

Use this module whenever you build, redesign, or audit a dashboard, admin panel, back-office tool, or any logged-in product screen. Other modules explain *how to reason*. This one says *what to ship*: concrete sizes, layouts, and component recipes distilled from mature, calm, professional products. The skill never names or copies a specific product; it keeps only the patterns.

These are defaults, not laws. A project's `.vibe-ui/TASTE.md` (see `taste-memory.md`) outranks them. Accessibility floors outrank both.

## Contents

1. The feel to aim for
2. Typography scale for dashboards
3. Spacing and surfaces
4. Colour budget
5. App shell: top bar, rail, workspace
6. Module tabs with counts
7. Page and section headers
8. KPI tiles
9. Data tables
10. Forms
11. Calendars and timetables
12. Quality-of-life toolkit
13. Mobile translation of every recipe
14. Self-check before you show anything
15. Craft signals: why some products look expensive
16. Custom components worth designing (16a. Tables or cards?)
17. AI assistant panel

## 0. Start from the user's intents

Before any layout, write down the questions the user opens this page to answer, in their words, ordered by importance. For a platform admin that is typically: how many customers (schools, accounts) are onboarded and live, how many end users and staff are actually using it, how much revenue has come in, what needs my attention now, what support is waiting, and which actions I take most often. Then:

- The first screen answers the top intents directly, as numbers with context, not as links to other pages.
- Each intent gets the visual that answers it best: a count with a status split, a trend, a ratio against capacity, a table of exceptions, a queue.
- Quick actions are the 4 to 6 things the user does most from this page, named in their words.
- If an element answers no intent, remove it. If an intent has no element, the page is incomplete.
- Confirm the intent list with the owner when it is not obvious; never invent priorities silently.

## 1. The feel to aim for

- **Calm, not empty.** White cards on a very light grey canvas, or an all-white page held together by thin borders and dividers. Generous gaps either way. Many features are present, but each sits in its own clear place.
- **Focused.** Each screen has one job. The user never sees ten options when the task needs two. Rare actions live behind a menu, a tab, or a filter icon.
- **Quiet type.** Headings are small and confident. Numbers are readable, not shouted. Nothing looks like a landing page.
- **One accent, used with intent.** Neutrals carry the screen. The accent marks the primary action, the current place, and focus. Little else.
- **Obvious affordances.** Clickable text looks clickable (link colour). Menus look like menus (a real kebab button with a hover state). Inputs look like inputs.

If a screen looks impressive in a screenshot but makes the user stop and think, it has failed.

**Calm is not boring.** A page of four plain number cards and one plain table is calm but lifeless, and owners notice. Give every dashboard one strong, purposeful visual idea that answers a real intent (a footprint map, a reach funnel, a health matrix, goal rings, a revenue story, a bento of rich tiles), confident hierarchy with a clear focal point, and considered colour in small places. Interest comes from meaning and craft, never from decoration, gradients, or illustrations.

## 2. Typography scale for dashboards

Dashboards read at arm's length for hours. Use a compact scale. Measured on calm reference products: page title 20px, card title 16px, card value 14 to 20px.

| Role | Size | Weight | Notes |
| --- | --- | --- | --- |
| Page title | 20 to 24px | 500 | One per page. Never 32px+ on a working screen. Content hubs (library, learn, gallery) may use 28 to 36px. |
| Section title | 16 to 18px | 500 | With an optional 13 to 14px muted subtitle under it. |
| Card / panel title | 15 to 16px | 500 | |
| Body, table cells, inputs | 14 to 15px | 400 | Inputs at least 16px on phones to stop iOS zoom. |
| Labels, tab text, buttons | 14 to 15px | 500 | |
| Meta, helper, captions | 12 to 13px | 400 | Muted colour, but still 4.5:1 contrast. |
| KPI value | 22 to 28px | 500 to 600 | 32px is the ceiling. Use tabular numbers. |

Rules:

- One family for the product UI, preferably a soft, rounded-geometric or neo-grotesque sans with open letter shapes.
- **Light hand on weight.** 400 for body, 500 for titles, labels, tabs, and buttons. 600 only for KPI values or a single emphasised word. Never 700 to 900 anywhere in a working screen: thick text looks shouty and cheap, and it is the most common reason a dashboard feels amateur.
- Primary text is a soft near-black (around `#1F2329`), not pure black. Secondary text is a calm grey (around `#5B6370`).
- If everything is big, nothing is important. Size alone should never be the only hierarchy tool; use weight, colour, and position too.
- Line-height 1.4 to 1.5 for body, 1.2 to 1.3 for titles.
- Never go below 12px for any text a user must read.

## 3. Spacing and surfaces

Use a 4px base. Typical values:

| Space | Desktop | Phone |
| --- | --- | --- |
| Page gutter | 24 to 32px | 16px |
| Gap between cards in a grid | 16 to 24px | 12 to 16px |
| Gap between page sections | 32 to 40px | 24px |
| Card padding | 20 to 24px | 16px |
| Label to control | 6 to 8px | 6 to 8px |
| Form row gap | 20 to 24px | 16 to 20px |

Surfaces:

- Choose one surface model per product and keep it everywhere. **Tinted canvas:** very light neutral page (around `#F6F7F9`) with white cards. **All-white:** white page, content grouped by 1px dividers and bordered white cards, with light grey only for table headers, segmented-tab tracks, and the active nav item. The all-white model reads the cleanest when spacing is generous. Cards: white. Border: 1px light neutral (around `#E5E7EB`). Radius 10 to 14px for cards, 8 to 10px for inputs and buttons.
- Shadows are optional and faint (y 1 to 2px, blur 2 to 6px, 4 to 6% black). Never shadow plus heavy border plus gradient on one card.
- A card holds one concept. If a card needs two titles, it is two cards.
- Respect section gaps. A thin seam between two tinted blocks reads like a bug.

## 4. Colour budget

Think of colour as a budget you spend, not paint you apply.

- **About 90% neutral.** Canvas, cards, borders, body text.
- **One brand accent, under about 5% of the pixels.** Primary button (one per region), current tab underline or nav indicator, focus ring, selected state, checkbox fill.
- **Link colour for clickable text.** Use the accent if it is a cool hue (blue, indigo, teal). If the brand accent is warm (orange, red, pink), use a calm blue for links and clickable names; warm text everywhere reads like warnings and floods the screen.
- **Semantic colours only for meaning.** Green for done or paid, red for owed or error, amber for warning, each paired with a word or icon.
- **Category tints for small things.** Icon chips behind KPI icons, subject colours in a calendar, avatar rings. Use 8 to 12% tints with the full colour for the glyph. Different categories may use different hues; this adds life without shouting.
- **Charts:** one accent series plus neutral comparison series, or a calm categorical palette. Do not draw every chart in the brand colour.

Hard limits:

- No black or near-black filled buttons (`#000` to about `#2A2A2A`) as the primary action on a light product UI. They read harsh and compete with text. Use the accent.
- Do not darken a brand colour until it changes family. Orange darkened for contrast turns brown or rust; check with `scripts/check-colour.mjs`. Fix contrast with a heavier or larger label, or use the darker shade only for small text, not for the large fill.
- No dark mode as the default for an admin or staff product unless the owner asks for it. Offer it as an option, design it separately.

### A second colour, used with care

Many clean products pair the brand accent with one **companion hue** and a few soft supporting hues. The companion appears where a second colour helps reading, never on buttons:

- second chart series and comparison lines (purple brand with cyan or sky blue; orange brand with blue or teal; green brand with indigo);
- sparklines on KPI tiles, each tile its own soft hue so the row is easy to tell apart;
- filled feature icons on overview cards (one hue per card), status dots in chips, avatar rings.

This is a suggestion, not a rule. Offer it to the owner with a preview; some prefer a single accent. Record the decision in `.vibe-ui/TASTE.md`. See `clean-ui-details.md` for examples.

### Primary, secondary, tertiary: give each colour a job

When an owner says "the screen looks too much like our brand colour", do not drop the brand. Propose a small trio where each colour has one named job:

| Role | Job | Typical places |
| --- | --- | --- |
| Primary (brand) | Act here, you are here, selected | Primary button, active nav icon and label, selected tabs, checked boxes, toggles, selected options, new-item dots, assistant launcher |
| Secondary | Read and progress | Progress strips, selected tabs, info chips, date-chip bands, data cards |
| Tertiary | Done and celebrate | Live and success status, done checks, streaks, success dialogs |

Red, amber and green-for-paid stay semantic and sit outside the trio. Show two to four candidate trios side by side, each applied to the same screen, with contrast numbers for text on white. Let the owner pick; record it in `.vibe-ui/TASTE.md`.

## 5. App shell: header, sidebar, workspace

The shell is global. It holds only tools the user needs on every page; page-specific content and actions belong to the page.

```text
[⇤] [ Search schools…            Ctrl K ]                 [Workspace: Admin ▾] [🔔•] [RC ▾]
[rail]  page content
```

**Header (sticky, 56 to 64px)**

- **Sidebar toggle first**, at the start of the header, outside the sidebar, so it never moves when the sidebar changes width.
- **Search scoped to the primary entity** the user looks for most (for a platform admin: schools). Placeholder names it ("Search schools"). Selecting a result opens that record. Do not mix in invoices, tickets, or settings unless the user really searches for them.
- **Ctrl K (or click) opens a search panel**: a centred dialog with the input focused, recent items, live results grouped by type, keyboard navigation (arrows, Enter, Esc), and an empty state.
- **Workspace or role switcher** on the right (for example Admin, Teacher, Counsellor, Institution), showing the current one; opens a small menu. Use it for switching context, not for filtering data.
- **Notifications** bell with a calm dot; opens a panel with recent items, unread state, and "Mark all as read".
- **User menu** (avatar and name): profile, settings, help, sign out last.
- **Never in the header:** status text ("All systems normal"), planned-update notices, dates, page titles, or page action buttons. Status belongs in Support or a status page; actions belong on the page.
- Every control in the header must work in a prototype. A control that does nothing on click breaks trust faster than a missing one.

**Sidebar**

- **Brand mark only** at the top (the official logo or its short mark). No product subtitle.
- **Collapsed by default** to a 64 to 72px icon rail, every icon with a tooltip. On pointer hover (after only about 50ms of intent) it **expands over the content** to 240 to 260px with labels, without pushing the page, in about 160ms ease-out, with labels readable by about 200ms. It **closes at once** when the pointer leaves (about 120ms ease-in). Owners notice anything slower as lag. Open it for keyboard focus with `:has(:focus-visible)`, never `:focus-within`: after a mouse click, focus stays on the clicked item and a `:focus-within` rail never closes until the user clicks elsewhere. Rail and panel stay white with a 1px border; a grey panel looks dull. The header toggle pins it open. On touch devices, tap the toggle to open; never rely on hover.
- Nav items are at least 44px tall with the whole row clickable; the active item keeps its marker in both states.
- **Counts only where they drive action** (Support 7, Needs attention 3). No counts for reference data (number of counsellors, number of plans).
- 6 to 9 top-level modules, grouped by job; Help and Settings at the bottom.

## 6. Module tabs with counts

Inside a module, use a tab bar under the page title instead of extra sidebar items.

```text
People
[▦ Dashboard] [👥 Students (13)] [🎓 Teachers (4)] [Staff (2)] [Related contacts (1)] [Prospects (2)]
```

- Each tab: small line icon, label, and a count badge when the tab is a list. The count lets the user know the size of a list without opening it.
- The active tab uses the accent for text, icon, underline (2px), and a filled count badge. Inactive tabs are neutral with a light grey count badge.
- First tab of a module is often its own small "Dashboard" overview.
- On phones the tab bar scrolls sideways. Keep the counts. Never replace tabs with a hidden dropdown when there are five or fewer.

## 7. Page and section headers

- Page title on the left. Primary page action on the right (one filled button). Secondary actions as tinted or outline buttons to its left.
- Section header: title plus one-line muted subtitle on the left, the section's scope control on the right (date range picker such as "01-08-2026 to 31-08-2026 ▾"). The time language in the section must follow the selected range.
- Breadcrumbs only on detail pages that sit under a list ("Students › Allan Bowman").

## 8. KPI tiles

```text
┌───────────────────────┐
│ [tinted icon chip]    │
│ Lessons               │  ← 15 to 16px, 500
│ 128                   │  ← 22 to 28px, 500 to 600, tabular
│ 12 unenrolments       │  ← optional 13px muted sub-metric
└───────────────────────┘
```

- 4 to 6 tiles in one row at desktop, equal height, 2 per row on phones.
- Each tile has a different soft category tint on its icon chip (blue, green, red, grey, violet). The tile itself stays white.
- Add the comparison and period only when they matter ("up 8% vs last month"). A bare count with a clear label is fine for operational counts.
- Zero is a real value. Show `0`, not a dash, and not an empty tile.
- Tiles should be clickable into the filtered list they summarise.
- Use **one visual language** for every tile on a page (for example the same segmented progress strip on all four). A row where each tile has a different chart form (sparkline, bars, donut, ring) reads as a chart sampler, not a dashboard. More than two chart forms on one overview is a warning sign.

## 9. Data tables

Anatomy, desktop:

```text
┌ 👥 13 Students                                         [⇩ Export] [⊕ Add student] ┐
│ [🔍 Search ......]        [Teacher: All▾] [Classes▾] [Status: Live▾] [⟳] [⧩] [▥] │
├──┬───────────────────┬──────────┬──────────────┬───────────────┬────────┬────────┤
│☐ │ Name           ⇅  │ Phone    │ Email     ⇅  │ Registered ⇅  │ Due ⇅  │        │
├──┼───────────────────┼──────────┼──────────────┼───────────────┼────────┼────────┤
│☐ │ (avatar) Allan B. │ 885544   │ abow@...     │ 12-07-2022    │ €0.00  │ [⋯]    │
│  │          ID 562a  │          │              │               │        │        │
```

- **Toolbar row 1:** list icon with the total count ("13 Students"), then the export action (tinted secondary) and the one primary "Add" action on the right.
- **Toolbar row 2:** search on the left; on the right, quick filters as small dropdown buttons reading "Label: Value" (only the 3 to 4 facets people use most), a refresh icon button, an advanced filter icon button (opens a drawer with all filters), and a column chooser icon button. If everything fits in one row at wide widths, use one row.
- **Checkbox column** (40px) with a select-all in the header. Selecting rows shows a contextual bulk bar ("3 selected: Message, Export, Archive").
- **Sort icons only where sorting helps:** names, dates, amounts, counts, status. Not on phone numbers, free-text notes, or the actions column. Sort icon is a small muted up/down pair; the active direction turns dark.
- **Clickable names in link colour,** with avatar and a muted 12px secondary line (ID or roll number). This tells the user the name opens a record.
- **Row separation:** either thin 1px dividers between rows (cleanest, works best with generous row height) or zebra striping with a barely tinted row (2 to 4% tint of the link hue, around `#F8FAFD`). Pick one per product. A soft hover tint on the row helps either way. Header row on a light neutral grey band. Row height 52 to 60px with an avatar, 44 to 48px without.
- **Semantic values:** money owed in red, settled in green, both with the currency sign. Status as a chip or a small dot on the avatar with a tooltip.
- **Row menu:** a 32 to 36px kebab button (⋮ or ⋯) at the trailing edge, ghost or lightly bordered, with a visible hover and focus state, for all secondary row actions. Never bare coloured text links as actions.
- **Long tables:** pagination or "Load more" with page size, the count kept in the toolbar, and the header sticky on scroll.

## 10. Forms

```text
Register your interest
One sentence on why this form exists.

┌ Personal details ─────────────────────────────────────────┐  ← tinted header band
│ Student name *     Last name *         Gender              │
│ [            ]     [            ]      [Male|Female|Not specified] │
│ Mobile phone       Email               Photo               │
│ [🇮🇪 +353 ▾|     ] [            ]      [Choose file| No file chosen] │
│                                         Accepted types: jpg, png, gif │
│ Date of birth                                              │
│ [            ]  dd-mm-yyyy                                 │
└────────────────────────────────────────────────────────────┘
```

- **Split long forms into titled sections.** Each section is a card with a light tinted header band holding a 14 to 15px semibold title.
- **Grid:** 3 columns at 1024px+, 2 columns at 640 to 1023px, 1 column below. Related fields sit side by side (first name, last name).
- **Label above every field,** 14px medium. Never rely on placeholders as labels.
- **Required fields:** a red asterisk right after the label. On long forms add a one-line legend ("* Required").
- **Two to four fixed options:** a segmented control (joined buttons) instead of a dropdown or a vertical radio list. Gender is the classic case.
- **Phone:** country picker with flag and dial code joined to the number input, defaulting to the user's or school's country.
- **File input:** a "Choose file" button joined to a filename area ("No file chosen"), with accepted types and maximum size under it in 12 to 13px muted text.
- **Selects:** placeholder "Select" (or "Select college"). Never pre-fill a fake real value such as a sample college name.
- **Dates and codes:** show the expected format under the field ("dd-mm-yyyy") in the user's locale.
- Inputs 40 to 44px tall, 1px border, 8 to 10px radius, clear focus ring.
- Validate on submit, put the error under the field, move focus to the first error, and keep what the user typed.

## 11. Calendars and timetables

```text
[Default|Teacher|Classroom] [🖨 Print]        [Student: All▾][Teacher: All▾][Class: All▾][Subject: All▾] [⟳]
┌─────────────────────────────────────────────────────────────────────────────┐
│ [←][→] [Today]              Jun 23 to 29, 2025               [Month|Week|Day] │
└─────────────────────────────────────────────────────────────────────────────┘
      Mon 23    Tue 24 (today, soft yellow column)   Wed 25   ...
```

- **Perspective switch** (segmented): the same timetable seen by default, by teacher, by classroom.
- **Print** next to it. Schools and offices still print timetables for notice boards; printing is a real job, not a nice extra.
- **Filters** as "Label: All" dropdown buttons, plus a refresh button.
- **Navigation bar:** previous, next, "Today" (muted when today is already in view), the range title centred, and Month / Week / Day on the right.
- **Highlight today** with a soft warm yellow column (around `#FFF8E1`). It draws the eye without meaning "error" or "brand".
- **Events** coloured by category (one fixed colour per subject or type), showing time range then name. Overlapping events split the column width.
- Light hour grid lines; the time label column stays narrow.
- **Phones:** default to Day view or an agenda list under a week strip. Never squeeze seven columns into 360px.

## 12. Quality-of-life toolkit

Add these when the real-world job needs them. Each one saves the user a step or a question.

| Feature | When it is needed |
| --- | --- |
| Count badges on tabs | Any tabbed list the user cares about the size of. Do not repeat a count that a footer already shows ("Showing 7 of 7") |
| Refresh button | Data that other people change while the screen is open |
| Print | Things that end up on paper: timetables, attendance sheets, report cards, ID cards, invoices |
| Export (CSV or Excel) | Every operational table |
| Column chooser | Tables with more than 6 columns only; never on short summary tables |
| Quick filters plus an advanced filter drawer | Every table with more than about 20 rows |
| "Today" and range navigation | Every date-based view |
| Last updated time | Only where staleness changes a decision; a list page usually does not need it |
| Filters kept in the URL | Every list, so back and reload keep the view |
| Undo toast after a reversible action | Archive, remove from list, status change |
| Keyboard search shortcut (Ctrl K) | Products used daily by staff |

Do not add a feature because it exists elsewhere. Add it because the user's real job needs it.

## 13. Mobile translation of every recipe

Mobile is not a smaller desktop. Keep every important piece of information; change its form.

| Desktop | Phone (360 to 430px) |
| --- | --- |
| Top bar with search, add, workspace, avatar | Logo, search icon, "+" add, avatar. Workspace name moves into the menu sheet. |
| Collapsed rail | Bottom navigation with 4 to 5 items, or a menu sheet |
| Module tabs with counts | Horizontally scrolling tabs, counts kept |
| KPI row of 4 to 6 | 2 by 2 grid, same labels and values |
| Table | Card list: avatar, name (link colour), 2 key fields, status, kebab menu |
| Toolbar filters | Full-width search, then a "Filters (2)" button opening a bottom sheet |
| 3-column form | 1 column, same sections, same required markers |
| Week calendar | Day view or agenda list with a week strip |
| Hover tooltips | Tap targets of at least 44px, info in visible text |

Never hide a number, a status, or a primary action on phones because it did not fit. Find it a smaller home.

## 14. Self-check before you show anything

Run `scorecard.md`. If any answer below is "no", fix it first:

- Can a new user say what this screen is for within five seconds?
- Is there exactly one filled primary button per region?
- Is the page title 24px or smaller, and every KPI value 32px or smaller?
- Is the accent under about 5% of the screen?
- Does every clickable thing look clickable?
- Does the phone version keep every number, status, and primary action?

## 15. Craft signals: why some products look expensive

Owners often say a reference "looks really professional" without naming why. These are the usual reasons. Look for them in any reference and reproduce the signal, not the brand.

| Signal | What it is | Cheap version |
| --- | --- | --- |
| Tactile buttons | Primary with a very subtle vertical gradient, a 1px lighter inner top edge and a 1px darker bottom edge; secondary white with a 1px bottom shadow so it looks pressable | Flat fill, or heavy glossy gradient |
| One type family, few weights | 400 body, 500 titles and labels, 600 only for key numbers; titles 15 to 16px in cards | Many weights, bold everywhere |
| Quiet surfaces | White cards, 1px borders, near-white page, almost no shadow | Coloured panels, big shadows |
| Chips with meaning | Chips carry a tiny icon that encodes level or category (signal bars for level, a bug icon for "Bug"), outlined or softly tinted | Plain coloured pills with only text |
| Consistent icon set | One stroke weight and corner style everywhere, icons in tinted squares or circles | Mixed icon packs |
| Bespoke illustration in few places | Dialogs, empty states, success and onboarding use one illustration style (for example objects in a gradient circle, or isometric line drawings on a faint grid) | Stock art, mascots on working screens |
| Small "designed" details | Calendar date chips, step dots, struck-through done items, progress rings with a fraction, verified ticks | Generic text everywhere |
| Rhythm | One spacing scale, aligned left edges, equal card heights, equal button heights | Near-misses of 2 to 4px everywhere |

## 16. Custom components worth designing

Generic component libraries make every product look the same. A few bespoke components, used consistently, give a product its own face. Offer them to the owner as a set to approve, each with "where it would be used".

| Component | Anatomy | Good for |
| --- | --- | --- |
| Illustrated dialog | Illustration in a gradient circle or on a faint grid, icon chip (warning or success), title, two-line body, Cancel plus an outcome-named primary | Irreversible actions, success moments, exam or session rules |
| Level chip | Small outlined chip with a 1 to 3 bar signal icon and a word | Plans, difficulty, seniority, priority tiers |
| Date chip | Small calendar tile: coloured month band, large day number | Renewals, exams, deadlines, events |
| Streak row | Seven day circles with checks, today marked, a reward marker on a goal day | Learner or teacher weekly activity |
| Setup checklist | Progress ring with "2/5", rows with done items struck through and a current item highlighted | First-run setup, onboarding |
| Milestone badge | Crafted hexagon or rosette, locked state in grey with a lock | Achievements, certificates, milestones |
| Ticket or post card | Avatar, name, time ago, one-line title, category chip with icon, count of replies or votes | Support inboxes, Q&A, feedback |
| Score gauge | Half or three-quarter ring with a big percentage and one line of meaning | Quiz and report results |

Rules: one illustration style per product; illustrations in dialogs, empty states, success and onboarding, never as decoration on working tables; keep each component lean; the project taste ledger wins over these defaults.

## 15a. Breathing room and scrollbars

- The working area right of the rail needs generous side padding on both sides: about 48 to 64px at 1440 (`clamp(24px, 4vw, 64px)`), 16px on phones. Content hugging the rail or the scrollbar makes a calm page feel crowded.
- Style scrollbars: thin, rounded, warm or cool grey thumb that darkens on hover, transparent track (`scrollbar-width: thin; scrollbar-color` plus `::-webkit-scrollbar` rules). Default chunky scrollbars inside panels, tables and menus look unfinished.

## 16a. Tables or cards?

- **Records** (tickets, renewals, invoices, schools, people) are a growing list with several attributes: use a table or divided list rows. Boxed cards for records waste space, break scanning and do not scale.
- **Summaries** (a few number tiles, module cards, plan options) are a small fixed set: cards are right.
- When unsure, ask: "Could this list have 50 rows next year?" If yes, it is a table.

## 17. AI assistant panel

An "Ask" feature that only expands a box inside a card looks like a mock. A believable assistant has:

- **Placement:** two good options. (a) A **chatbot launcher**: a round 56px brand-coloured button fixed bottom right, opening a chat window of about 400×640 anchored above it, the dashboard staying usable; this costs no page space and owners often prefer it. (b) A docked side panel (about 400 to 460px, full height under the header). On phones, a full-screen sheet either way. Avoid a full-width ask bar that takes a whole section of the dashboard.
- **Identity:** give the assistant a real logo (a crafted mark, not a gradient square with a sparkle). Use it on the launcher, the chat header, the reply avatar and the empty state.
- **Header:** product name, new chat, history, close.
- **Turn anatomy:** user message as a soft right bubble; assistant avatar; a short working step with a spinner ("Reading 4 renewals…") that collapses to a done line; the answer streaming in; key numbers in bold; a data card with clickable rows; source chips with "updated" time; copy and thumbs up or down; two or three follow-up chips.
- **Composer:** pinned at the bottom, auto-growing, send disabled when empty, Enter sends, Shift+Enter adds a line, Esc closes, a one-line note on what data it uses.
- **Honesty:** a polite fallback for questions it cannot answer, offering what it can.
- **Agentic, not chatty:** show the steps it takes (one line each, spinner to check, collapsing into "Worked through 3 steps"), answer with real data in a compact table, and propose at most one action in a confirm block ("Send reminder to X?" with the action and "Not now"). After confirmation, show the step and the result. A Stop button replaces Send while streaming.
- **Minimal:** the reply is plain text on the page, not a bubble; message actions appear on hover; no suggestion or follow-up chips unless the owner asks; no gradient app-icon squares or sparkle clichés for the assistant mark; a neutral focus ring on the input.
- **Motion:** streaming and the working step respect reduced motion (show instantly).
