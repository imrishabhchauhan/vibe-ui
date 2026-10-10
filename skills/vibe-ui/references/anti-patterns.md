# Dashboard Anti-Patterns

Each item below has been seen in real rejected designs. Check every screen against this list before showing it. Each entry says what it looks like, why it fails, and what to do instead.

## Visual weight

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| Black or near-black filled buttons on a light admin UI | Harsh, competes with body text, feels like a consumer app | Accent-filled primary; outline or tinted secondary |
| Brand colour on everything (buttons, icons, charts, badges, headings) | "Too orange / too purple"; nothing stands out because everything does | Spend the accent on primary action, current place, focus only (`dashboard-craft.md` §4) |
| Brand colour darkened until it changes family (orange to brown, red to maroon) | The product no longer looks like its brand | Keep the brand fill; fix contrast with label weight or size; check with `scripts/check-colour.mjs` |
| Huge page titles (32px+) and giant KPI numbers (40px+) | Reads like a landing page; wastes the first screen | Page title 20 to 24px, KPI 22 to 28px |
| Bold or heavy text (700+) on titles, labels, and numbers | Looks shouty and cheap; the most common amateur tell | 400 body, 500 titles and labels, 600 only for KPI values |
| Tiny meta text (under 12px) | Unreadable for many users | 12 to 13px minimum for meta |
| Dark mode as the default look of a staff tool | Owners of calm admin products rarely want it; it changes the brand feel | Light by default; dark only on request, designed separately |
| Illustrations, mascots, or 3D art on staff dashboards | Looks kiddish, adds no information | Line icons in tinted chips. Small, consistent illustrations are fine on role cards, personalisation tiles, and empty states, not on working dashboards |
| Gradients, glows, and heavy shadows on cards | Noise; looks dated | White card, 1px border, optional faint shadow |

## Structure and focus

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| Calm but boring: plain number cards and a plain table with no focal point | Feels lifeless and generic; the owner loses trust in the product | One purposeful visual idea per dashboard, a clear focal point, richer tiles (status splits, trends, capacity) |
| Layout chosen before the user's intents are listed | Misses what the user opens the page for | List the intents first; every element must answer one |
| Everything on one screen | Congested; the user cannot find the next action | One job per screen; move detail to tabs or detail pages |
| Long sidebar listing every sub-page | High cognitive load; hides what matters | 6 to 9 modules in the rail, sub-pages as tabs with counts |
| Two cards that say the same thing | Duplication confuses and wastes space | One card per concept |
| A card with two titles or two jobs | Hard to scan | Split it |
| Thin seams between tinted blocks | Looks like a rendering bug | 24px+ gaps between sections |
| A chart because the data exists | Decoration, not answer | Every chart answers a named question or is removed |

## Controls

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| Bare coloured text as a row action | Not obviously clickable; poor keyboard support | A real kebab button (ghost or bordered, with hover and focus) or a small real button |
| Sort icons on every column | Noise; sorting phone numbers helps no one | Sort only names, dates, amounts, counts, status |
| No count on list tabs | The user must open each tab to know its size | Count badge on every list tab |
| No export on an operational table | Users copy data by hand | Export button in the table toolbar |
| No refresh on shared, changing data | Users reload the whole page and lose filters | Refresh icon button in the toolbar |
| No print on things that get printed | Users screenshot and paste into Word | Print action on timetables, sheets, cards |
| Dropdown for 2 to 4 options | Hides the choices; one extra click | Segmented control |
| Placeholder used as the label | Disappears while typing; fails accessibility | Label above the field |
| Fake example value pre-filled in a select | Users submit it by mistake | Placeholder "Select" |
| Required fields not marked | Users find out only on submit | Red asterisk after the label |
| File input without accepted types | Users upload the wrong file and fail | Accepted types and size limit under the input |

## Onboarding, dialogs, and records

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| One long sign-up form mixing personal and workspace details | Feels like paperwork; people abandon it | One kind of information per screen |
| Asking for time zone, currency, and date format separately | Three decisions the product could make | Derive them from the country, editable |
| Placeholder that looks like a real value ("My School") | Users think it is already filled | "e.g. My Learning Centre", muted |
| Blank dashboard after sign-up | The user does not know what to do next | First-run wizard plus a setup checklist |
| Wizard with all steps looking equal | The user cannot see where they are | Current step in accent, future steps dimmed, done steps checked |
| Heavy blur or black backdrop behind dialogs | Hides context; feels like an error | Light dim, no blur or 2 to 4px at most |
| Nested dialog that blurs the one below | The user loses track of where they are | Dim the lower dialog, do not blur it |
| Dialog without a close icon, or with "OK" / "Submit" buttons | Unclear exit; unclear outcome | Close icon plus Esc; primary names the outcome ("Copy students") |
| Separate "Edit mode" for a record page | Extra step; users do not find it | Pencil icon next to each editable fact |
| "No data" as an empty state | Dead end | Icon, title, one line, one action |
| A menu that opens over its own trigger or over the content being used | Hides context; feels clumsy | Anchor beside the trigger, open toward free space (`menus-popovers-and-indicators.md`) |
| Red count badges for "something new" | Feels like an alarm | A small calm dot on the trigger and on the exact item |
| Onboarding questions whose answers change nothing | Wasted effort; users notice | Ask only what personalises the product |
| Status text, notices, or page buttons in the global header ("All systems normal", "Planned update", "Add school") | Noise in the one place users scan for tools; duplicates other sections | Header holds search, workspace switcher, notifications, user menu only |
| Search that mixes every object type ("schools, invoices, tickets") | Users must think about what to type; results get noisy | Scope search to the primary entity; open the record on select |
| Header controls that do nothing in a prototype | Breaks trust; owner cannot judge the experience | Search panel, notifications panel, workspace and user menus all open |
| Counts on low-value nav items | Draws attention to trivia | Counts only where they ask for action |
| Header that scrolls away | Search, menu, and sign out disappear | Sticky slim top bar |

## Mobile

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| Hiding numbers, statuses, or actions on phones | The phone user loses the information they came for | Re-form it (2 by 2 tiles, card list, sheet), never drop it |
| A desktop table squeezed to 360px | Horizontal scroll, unreadable | Card list per row |
| Seven-day week grid on a phone | Unreadable | Day view or agenda list |
| Floating button covering list content | Blocks the last row and its actions | Put add in the header, or pad the list end |
| Any horizontal page scroll | Feels broken | Check `scrollWidth` at 360, 390, and 430px |
