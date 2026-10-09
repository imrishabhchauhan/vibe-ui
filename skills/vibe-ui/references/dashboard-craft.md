# Dashboard Craft: What Good Looks Like

Use this module whenever you build, redesign, or audit a dashboard, admin panel, back-office tool, or any logged-in product screen. Other modules explain *how to reason*. This one says *what to ship*: concrete sizes, layouts, and component recipes taken from mature, calm, professional products (for example all-in-one school management systems such as Teach 'n Go, analysed from screenshots; no assets copied).

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

## 1. The feel to aim for

- **Calm, not empty.** White cards on a very light grey canvas, thin borders, generous gaps. Many features are present, but each sits in its own clear place.
- **Focused.** Each screen has one job. The user never sees ten options when the task needs two. Rare actions live behind a menu, a tab, or a filter icon.
- **Quiet type.** Headings are small and confident. Numbers are readable, not shouted. Nothing looks like a landing page.
- **One accent, used with intent.** Neutrals carry the screen. The accent marks the primary action, the current place, and focus. Little else.
- **Obvious affordances.** Clickable text looks clickable (link colour). Menus look like menus (bordered kebab button). Inputs look like inputs.

If a screen looks impressive in a screenshot but makes the user stop and think, it has failed.

## 2. Typography scale for dashboards

Dashboards read at arm's length for hours. Use a compact scale. Measured on calm reference products: page title 20px, card title 16px, card value 14 to 20px.

| Role | Size | Weight | Notes |
| --- | --- | --- | --- |
| Page title | 20 to 24px | 600 | One per page. Never 32px+ on a working screen. |
| Section title | 16 to 18px | 600 | With an optional 13 to 14px muted subtitle under it. |
| Card / panel title | 15 to 16px | 500 to 600 | |
| Body, table cells, inputs | 14 to 15px | 400 | Inputs at least 16px on phones to stop iOS zoom. |
| Labels, tab text, buttons | 14 to 15px | 500 | |
| Meta, helper, captions | 12 to 13px | 400 | Muted colour, but still 4.5:1 contrast. |
| KPI value | 22 to 28px | 600 | 32px is the ceiling. Use tabular numbers. |

Rules:

- One family for the product UI. Two weights do most of the work (400 and 600, plus 500 for labels).
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

- Canvas: very light neutral (around `#F6F7F9`). Cards: white. Border: 1px light neutral (around `#E5E7EB`). Radius 10 to 14px for cards, 8 to 10px for inputs and buttons.
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

## 5. App shell: top bar, rail, workspace

Desktop shell, top to bottom:

```text
[logo] [ global search ...........]      [plan/trial status] [+ Add new] [workspace switcher ▾] [avatar ▾]
[rail]  page content
```

- **Top bar (56 to 64px):** logo, global search (280 to 420px wide, placeholder "Search"), a quiet status text if relevant ("Trial ends in 14 days"), one primary quick-create button ("Add new" opening a menu of create actions), a workspace or school switcher showing the current workspace name, and the user avatar.
- **Workspace switcher** sits in the top bar in a normal, quiet style (bordered button with an icon, name, and up/down chevron). It must be visible but must not pull the eye.
- **Navigation rail:** collapsed by default to 64 to 72px with line icons only, each with a tooltip. It expands to 240 to 260px with labels on hover or on a pin toggle at the bottom. The active item gets a soft tinted square behind the icon.
- **Keep the rail short.** 6 to 9 top-level modules. Sub-pages go into module tabs (section 6), not into the rail.
- A floating help or chat button is fine in the bottom-right corner; keep it clear of table actions and pagination.

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
│ 128                   │  ← 22 to 28px, 600, tabular
│ 12 unenrolments       │  ← optional 13px muted sub-metric
└───────────────────────┘
```

- 4 to 6 tiles in one row at desktop, equal height, 2 per row on phones.
- Each tile has a different soft category tint on its icon chip (blue, green, red, grey, violet). The tile itself stays white.
- Add the comparison and period only when they matter ("up 8% vs last month"). A bare count with a clear label is fine for operational counts.
- Zero is a real value. Show `0`, not a dash, and not an empty tile.
- Tiles should be clickable into the filtered list they summarise.

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
- **Zebra striping:** alternate white and a barely tinted row (2 to 4% tint of the link hue, around `#F8FAFD`). Header row on light neutral grey. Row height 52 to 60px with an avatar, 44 to 48px without.
- **Semantic values:** money owed in red, settled in green, both with the currency sign. Status as a chip or a small dot on the avatar with a tooltip.
- **Row menu:** a 32 to 36px bordered, rounded kebab button (⋯) at the trailing edge, for all secondary row actions. Never bare coloured text links as actions.
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
| Count badges on tabs and list titles | Any list the user cares about the size of |
| Refresh button | Data that other people change while the screen is open |
| Print | Things that end up on paper: timetables, attendance sheets, report cards, ID cards, invoices |
| Export (CSV or Excel) | Every operational table |
| Column chooser | Tables with more than 6 columns |
| Quick filters plus an advanced filter drawer | Every table with more than about 20 rows |
| "Today" and range navigation | Every date-based view |
| Last updated time | Numbers that are not live |
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
