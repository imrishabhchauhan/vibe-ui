# Menus, Popovers, and Attention Indicators

Use this module for account menus, overflow (kebab) menus, filter menus with sub-menus, segmented tabs, sort dropdowns, and the small dots and badges that tell users something is new. These details are small, but they are where minimal products feel either effortless or clumsy.

## 1. Where a menu opens

A menu must never cover the thing the user is working on, and never cover its own trigger.

- **Anchor to the trigger** with a 4 to 8px gap. The menu's nearest edge lines up with the trigger's edge.
- **Open toward the free space.** A trigger in the bottom-left corner (account menu in the sidebar footer) opens **upward and to the right**, beside the sidebar, not over the sidebar's own items. A trigger in the top-right (avatar) opens downward and aligned to the right edge. A table kebab opens below, aligned to the right, and flips up near the bottom of the viewport.
- **Collision handling:** flip to the other side or shift along the edge before the menu would clip. Never let it run off screen or create a scrollbar.
- **Sub-menus** open to the side of their parent item, top-aligned with it, with the same gap. Hovering a sub-menu item must not close the parent (use a safe hover triangle or a short delay).
- Close on Esc, on outside click, and after choosing an item. Return focus to the trigger.

## 2. Menu anatomy

```text
┌──────────────────────────────┐
│ ▓ Create more                │  ← optional promo card (one, dismissible, top)
│ ▓ Subscribe for credits      │
│ ▓ [ See plans ]              │
├──────────────────────────────┤
│ ▢ Pricing                    │
│ </> MCP server               │
│ ✧ What's new        ●  ›     │  ← attention dot + sub-menu chevron
│   New: Characters            │  ← one muted line saying what is new
│ ▢ Contact us                 │
│ ? Docs and guides            │
├──────────────────────────────┤
│ ⚙ Settings                   │
│ 🔔 Notifications             │
│ ◐ Theme                   ›  │
├──────────────────────────────┤
│ ↦ Log out                    │  ← last, separated
└──────────────────────────────┘
```

- Width 220 to 280px. Item height 36 to 40px, 12px side padding, 16px line icons with 8 to 10px gap to the label, labels 14px weight 400.
- **Group by job** with thin dividers: help and resources, account settings, and finally sign out on its own at the bottom.
- An item may carry one muted secondary line (12 to 13px) when it explains something new.
- A chevron (›) marks items that open a sub-menu. Never mix chevrons and external-link icons on the same item.
- At most one promo card per menu, at the top, visually distinct (brand or deep tint), with one button. Never put a promo in the middle of actions.
- Destructive or session items (log out, delete) are last and separated.

## 3. Attention dots

A small dot says "there is something here you have not seen yet" without the noise of a number.

- **Size and style:** 6 to 8px solid dot, with a 2px ring in the surface colour so it reads on any background. Use the brand or a calm accent (green, blue), not red, unless it is an error or something urgent.
- **Placement:** on the top-right corner of the trigger (the kebab, the avatar, the bell), and again on the exact menu item that holds the new thing, so the user can follow the trail.
- **Clear it** once the user has opened the item, not merely the menu.
- **Dot or number?** Use a dot for "something new" (feature news, an unread changelog). Use a count badge when the number matters for a decision (3 approvals waiting, 12 unread messages). Never both on the same trigger.
- Never put dots on everything. If more than two triggers have dots at once, the signal is lost.

## 4. Segmented tabs and filters

- **Segmented tab group:** a light grey track (radius 10 to 12px, 4px padding) holding the options; the active option is a white chip with a faint shadow, weight 500; inactive options are muted text. Icons optional and small. Good for 2 to 6 sibling views (All, Tutorials, Live streams; Generations, Uploads).
- **Long category rows** (more than about 8) scroll sideways inside the same track, with the most used first. Do not wrap them into two rows.
- **Filter button** opens a cascading menu: first level lists facet groups (Models, Output types, Input types), second level lists values with counts in parentheses ("Image (43)"). Checked values show a tick; the filter button shows the active count ("Filter · 2").
- **Sort control** is a quiet dropdown showing the current value ("Default ▾"), placed after search.
- **Toolbar order:** search, filter, sort, then the page's primary action ("Upload", "Create") on the trailing edge.

## 5. Sidebar footer and account area

- The account sits at the bottom of the sidebar: avatar, handle or name, one muted line (plan, credits), and a kebab button that opens the account menu.
- A small, dismissible "new" card may sit above the account row (badge "New", one line, one button, a close icon). One at a time, and it must not push primary navigation off screen at 768px height.

## 6. Mobile

- Menus become bottom sheets with the same groups and dividers, 48px rows, and a drag handle. Sub-menus slide in as a second sheet page with a back arrow.
- Attention dots stay on the trigger (avatar or menu icon in the top bar) and on the sheet item.
- Segmented tabs scroll sideways; filters open a full-height sheet with facet groups as sections.

## 7. Checks

- Does every menu open beside or away from its trigger, never over it, and stay fully on screen?
- Are items grouped with dividers, with sign out last?
- Does each attention dot lead to one specific item, and clear once seen?
- Are counts used only when the number changes a decision?
- Do filters show active counts and values show item counts?
