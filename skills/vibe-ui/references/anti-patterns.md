# Dashboard Anti-Patterns

Each item below has been seen in real rejected designs. Check every screen against this list before showing it. Each entry says what it looks like, why it fails, and what to do instead.

## Visual weight

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| Black or near-black filled buttons on a light admin UI | Harsh, competes with body text, feels like a consumer app | Accent-filled primary; outline or tinted secondary |
| Brand colour on everything (buttons, icons, charts, badges, headings) | "Too orange / too purple"; nothing stands out because everything does | Spend the accent on primary action, current place, focus only (`dashboard-craft.md` §4) |
| Brand colour darkened until it changes family (orange to brown, red to maroon) | The product no longer looks like its brand | Keep the brand fill; fix contrast with label weight or size; check with `scripts/check-colour.mjs` |
| Huge page titles (32px+) and giant KPI numbers (40px+) | Reads like a landing page; wastes the first screen | Page title 20 to 24px, KPI 22 to 28px |
| Tiny meta text (under 12px) | Unreadable for many users | 12 to 13px minimum for meta |
| Dark mode as the default look of a staff tool | Owners of calm admin products rarely want it; it changes the brand feel | Light by default; dark only on request, designed separately |
| Illustrations, mascots, or 3D art on staff dashboards | Looks kiddish, adds no information | Line icons in tinted chips; illustrations only in empty states if allowed |
| Gradients, glows, and heavy shadows on cards | Noise; looks dated | White card, 1px border, optional faint shadow |

## Structure and focus

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| Everything on one screen | Congested; the user cannot find the next action | One job per screen; move detail to tabs or detail pages |
| Long sidebar listing every sub-page | High cognitive load; hides what matters | 6 to 9 modules in the rail, sub-pages as tabs with counts |
| Two cards that say the same thing | Duplication confuses and wastes space | One card per concept |
| A card with two titles or two jobs | Hard to scan | Split it |
| Thin seams between tinted blocks | Looks like a rendering bug | 24px+ gaps between sections |
| A chart because the data exists | Decoration, not answer | Every chart answers a named question or is removed |

## Controls

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| Bare coloured text as a row action | Not obviously clickable; poor keyboard support | Bordered kebab button or a small real button |
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

## Mobile

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| Hiding numbers, statuses, or actions on phones | The phone user loses the information they came for | Re-form it (2 by 2 tiles, card list, sheet), never drop it |
| A desktop table squeezed to 360px | Horizontal scroll, unreadable | Card list per row |
| Seven-day week grid on a phone | Unreadable | Day view or agenda list |
| Floating button covering list content | Blocks the last row and its actions | Put add in the header, or pad the list end |
| Any horizontal page scroll | Feels broken | Check `scrollWidth` at 360, 390, and 430px |
