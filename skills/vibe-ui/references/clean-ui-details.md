# Clean UI Details

Use this module when a screen works but does not yet feel clean and premium. Clean interfaces are not empty; they are made of many small, consistent decisions. Each pattern below is drawn as a recipe, with the reason it reads as calm.

## 1. Page header

```text
People                                                     [+ Add member]
Manage and collaborate within your organisation's teams
```

- Title 18 to 22px, weight 500; one muted description line (14 to 15px) directly under it, written as a plain sentence about what the page is for.
- One filled primary action on the right, vertically centred on the two lines. Nothing else in the header.
- 32 to 48px of space before the first content block.

## 2. Sidebar

- Brand mark and name at the top, with a collapse icon on the right. A thin divider under it.
- Items: 16 to 18px line icon, 14 to 15px label, 40 to 44px tall, 10 to 12px radius.
- **Active item:** a light grey fill behind the row, the icon switches to a filled or brand-coloured version, the label goes to weight 500, and a short 3 to 4px brand pill sits on the outer edge. Three quiet signals together, none of them loud.
- Low-frequency items (Settings, Support) at the bottom, above the account row (avatar, name, email, a chevron to open the account menu).
- One icon family, one stroke weight (1.5 to 1.8), one size. Mixed icon sets are the fastest way to look unprofessional.

## 3. Section title before a list

```text
Sick leave policy
Employees can be enrolled in one sick policy. Make sure your policy follows local rules.
──────────────────────────────────────────────────────────────
```

- A 16 to 18px weight 500 title, one muted line, then the list. This tells the user what the list is and any rule that applies, without a help page.

## 4. Lists and tables that breathe

- Rows 64 to 80px tall when they hold an avatar and two lines; separated by 1px dividers; no heavy borders around the table.
- **Two-line identity cell:** avatar (32 to 40px), name in 14 to 15px weight 500, email or ID under it in 13 to 14px muted.
- Plain values (dates, job titles, types) in regular weight, primary text colour. Do not colour them.
- **Status chips:** white or very light background, 1px light border, a 6 to 8px coloured dot, and the label in regular text colour ("● Sick leave", "● Holiday pay"). The dot carries the colour; the chip stays calm.
- **Row action:** a ghost vertical kebab (⋮) for menus, or an underlined link in the accent colour for a single clear action ("View payslip").
- Header band in light grey, 13 to 14px muted labels, sort arrows only where they help, and small icons in headers only when they explain the column type (a calendar icon on a date column).

## 5. KPI tiles with sparklines

```text
┌──────────────────────────┐
│ 307.48k                  │  ← 26 to 30px, weight 500
│ Total received           │  ← 13 to 14px muted
│ +30%          ╱╲╱‾╲_╱    │  ← delta 15px weight 500, sparkline in its own soft hue
│ This year                │
└──────────────────────────┘
```

- The number leads, the label follows. The delta sits on its own line with its period under it, and a small sparkline fills the remaining space on the right.
- Each tile may use its own soft sparkline hue (violet, green, amber, pink) with a faint gradient fill under the line. The tiles stay white.

## 6. One chart, done well

- One main series as a smooth line with a soft gradient fill fading to transparent. Light dashed horizontal grid lines, no vertical grid, muted axis labels.
- A small legend with dots above the plot. Period controls on the card's top right as quiet dropdowns ("2024 ▾", "Years ▾").
- A tooltip card with a small header (icon and period) and aligned label and value rows, plus a ringed marker on the hovered point.
- Card header: a line icon, the title (16 to 18px, 500), and a thin divider under the header.

## 7. Progress and gauges

- In tables, progress is a thin bar (6 to 8px, rounded) with the percentage beside it.
- A single headline ratio can use a half-ring gauge: the percentage large in the centre, "174 / 218 tasks done" under it, and one line of context below ("+12% compared with last year"). Use a gauge for one number only, never a row of gauges.

## 8. Overview and settings cards

```text
┌ (filled colour icon) ┐ ┌ (filled colour icon) ┐ ┌ (filled colour icon) ┐
│ Health benefits      │ │ Commuter             │ │ Life insurance       │
│ two muted lines      │ │ two muted lines      │ │ two muted lines      │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘

┌ ♡ Health ───────────────────────────────────────────────┐
│ [▢] Medical, dental and vision                         › │
│     Get medical, vision and dental cover at no extra cost│
│ [▢] Health savings account                             › │
│     Set money aside for health costs                    │
└──────────────────────────────────────────────────────────┘
```

- Top row: three equal cards with a 32 to 40px filled icon in its own hue, a title, and two muted lines. This is the right place for a little extra colour.
- Below: grouped list cards. A header with a line icon and a title, then rows with a 36 to 40px bordered icon box, a title (14 to 15px, 500), one muted line, and a chevron on the right. The whole row is clickable.

## 9. Segmented tabs and toolbar

- Segmented tabs: light grey track, white active chip with a faint shadow, 14 to 15px labels.
- On the same line, on the right: search (wide, with a leading icon), "Filters" with an icon, and "Sort by ▾". All are outline controls, the same height (36 to 40px), with 8 to 12px gaps.

## 10. The cleanliness checklist

- One surface model, one icon family, one radius family, one chip style.
- Colour lives in small things (dots, sparklines, feature icons, the active pill), never in large fills.
- Every block has a title and, where useful, one line explaining it.
- Weights stay at 400 and 500; the eye is guided by size, spacing, and grey levels.
- Generous row heights and section gaps; nothing touches.
- Every interactive element has a visible hover state: a row tint, a chip highlight, a button shade.
