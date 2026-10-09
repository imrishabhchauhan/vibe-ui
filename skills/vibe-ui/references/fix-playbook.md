# Fix Playbook: Correct Any Dashboard

Use this module when asked to fix, polish, or "make professional" an existing dashboard or admin product, whatever its stack or current state. It turns the rest of the skill into an ordered set of passes. Work top to bottom: structure problems make polish useless, so never start with colours.

Before pass 1: read `.vibe-ui/TASTE.md`, render the current screens at desktop and 390px, and score them with `scorecard.md`. Keep the screenshots; you will compare against them at the end.

## Pass 1: Job and structure

Find:
- screens with no single clear job; dashboards that are a wall of equal cards;
- the same number or list shown twice; charts nobody asked for;
- long sidebars (more than 9 items) listing sub-pages.

Fix:
- Name each screen's job in one sentence. Order content by it: needs attention, quick stats, quick actions, then analytics, then detail.
- Remove duplicates and decoration. Move detail to tabs or detail pages.
- Collapse sub-pages into module tabs with counts (`dashboard-craft.md` §6).

## Pass 2: Shell

Find: a non-sticky header, missing global search or quick-create, a hidden workspace switcher, an always-wide sidebar eating space.

Fix: a slim sticky top bar (logo, search, quick-create, workspace switcher, avatar), a collapsible icon rail that expands on hover or pin, and a bottom nav or menu sheet on phones (`dashboard-craft.md` §5).

## Pass 3: Type reset

Find and replace (Tailwind shown; translate for other stacks):

| Find | Replace with | Why |
| --- | --- | --- |
| `font-bold`, `font-extrabold`, `font-black`, `font-weight: 700+` on titles, labels, numbers | `font-medium` (500); `font-semibold` (600) only for KPI values | Thick text looks shouty |
| Page titles `text-3xl` and up (30px+) | `text-xl` to `text-2xl` (20 to 24px) | Working screens, not landing pages |
| KPI values `text-4xl` and up | `text-2xl` to `text-[28px]` | Readable, not shouting |
| Body or table text `text-xs` (12px) | `text-sm` (14px) | Readability |
| Meta below 12px | 12 to 13px | Readability floor |
| Pure black text `#000`, `text-black` | soft near-black token (about `#1F2329`) | Calmer contrast |
| ALL CAPS labels without tracking | sentence case, or caps with `tracking-wide` | Consistency |

## Pass 4: Colour budget

Find:
- the brand colour used on icons, headings, chart series, badges, and backgrounds;
- black or near-black filled buttons;
- brand fills darkened for contrast (orange turned brown);
- several filled buttons in one region; links in a warm brand colour everywhere.

Fix:
- Neutral surfaces for about 90% of the screen; brand accent only on the primary action, current place, focus, selection.
- Replace near-black buttons with the accent fill. Keep one filled button per region; make the rest tinted or outline.
- Move icons into soft tinted chips with per-category hues; draw charts with one accent series plus neutral comparisons.
- Use a calm blue for links and clickable names when the accent is warm.
- Run `scripts/check-colour.mjs` on every accent and button colour.

## Pass 5: Spacing and surfaces

Find: cramped cards, inconsistent gutters, tinted blocks touching, heavy shadows plus borders plus gradients, mixed radii.

Fix: canvas `#F6F7F9`-like, white cards, 1px light borders, 10 to 14px radius, 24 to 32px gutters, 16 to 24px card gaps, 32 to 40px between sections, 20 to 24px card padding (16px on phones). One concept per card.

## Pass 6: Components

Work through each component type present, using its recipe:

| Component | Recipe |
| --- | --- |
| Tables | `dashboard-craft.md` §9, `data-tables-and-controls.md` |
| Forms and setup | `dashboard-craft.md` §10, `onboarding-and-activation.md` §2 to §4 |
| Dialogs and sheets | `dialogs-and-overlays.md` |
| Record pages | `detail-pages-and-editing.md` |
| Calendars | `dashboard-craft.md` §11 |
| KPI tiles | `dashboard-craft.md` §8 |

Typical quick wins: real kebab menus instead of text links; sort icons removed from useless columns; link-coloured names; "e.g." placeholders and "Select" for selects; segmented controls for 2 to 4 options; pencil icons on editable facts; dialogs with a close icon and outcome-named buttons; light, unblurred backdrops.

## Pass 7: States

Add or fix: skeleton loading that keeps layout, empty states with icon, title, line, and action, inline errors with recovery, 0 shown as 0, last-updated times, and a setup checklist for new workspaces.

## Pass 8: Quality of life

Add what the real job needs: counts on tabs, refresh, export, print, column chooser, quick filters plus a filter drawer, filters in the URL, Today navigation, undo toasts, keyboard search (`dashboard-craft.md` §12).

## Pass 9: Mobile

At 360, 390, and 430px: no horizontal scroll; every number, status, and primary action still present; tables as card lists; filters in a sheet; dialogs as sheets; bottom nav; 44px targets (`dashboard-craft.md` §13).

## Pass 10: Score, compare, learn

- Re-score with `scorecard.md`. Present only at 85 or more, with no hard fail.
- Show before and after side by side at desktop and phone widths, with the scores.
- Run `scripts/audit-static.mjs --changed` and fix real candidates.
- After the owner reviews, update `.vibe-ui/TASTE.md` (`taste-memory.md`).

## Scope control

On a large product, fix the shared tokens and primitives first (type scale, colour tokens, button, input, table, dialog), then the highest-traffic screens. One shared fix beats fifty local ones. Never redesign everything in one change; ship pass by pass so each can be reviewed.
