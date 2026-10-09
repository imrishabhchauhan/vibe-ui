# Detail Pages and Editing

Use this module for a single record's page: a class, a student, a customer, an invoice, a project. A good detail page answers "what is this, what is its state, what can I do with it" at a glance, and makes editing feel safe and obvious.

## 1. Record header

```text
● Class 2  ✎                                  [Message ▾] [Print ▾] [⋯ More ▾]
📅 Monday (5:00 to 10:00), Tuesday (3:30 to 10:00)  ✎
   Repeats weekly from 19-10-2026 to 20-10-2026
🏷 Price: No fee  ✎
🎓 Teacher: Asha Verma             ← link colour, opens the person
📍 Classroom: Online lesson
📖 Total lessons: 2
Created by: … · Created: 09-10-2026 22:57   ← 12 to 13px muted meta
```

- **Title** 20 to 24px, weight 500, with an identity mark where it helps (the record's colour dot, avatar, or icon).
- **Key facts as a short list,** each with a small line icon, a label in medium weight, and the value in regular weight. Group related facts; put the most used ones first.
- **Linked records in the link colour** (teacher, school, parent), so users see they can open them.
- **Header actions** on the right as tinted secondary buttons with icons, grouped into menus by job ("Message ▾", "Print ▾", "More ▾"). One menu per job, not ten buttons.
- **Meta** (created by, created date, last updated) at the end, small and muted.
- A breadcrumb or back link above the title when the page is reached from a list.

## 2. Inline editing with the pencil

- Put a small pencil icon button (28 to 32px, round, light border or ghost) right after each editable fact or title. It tells the user "this is editable" without a separate edit mode.
- Clicking it turns the fact into an inline field or opens a small popover or dialog for that one fact, with Save and Cancel.
- Show the pencil always on touch devices; on desktop it may be always visible or appear on row hover, but never hidden from keyboard users.
- After saving, show the new value at once and a short confirmation toast; on failure, restore the old value and explain.
- Facts that cannot be edited have no pencil. Do not show disabled pencils.

## 3. Sub-sections as tabs

```text
[📖 Lessons] [👥 Students] [🏷 Fees] [🧾 Receipts] [📄 Class log] [📎 Materials] [☰ Assignments] [📋 Forms] [🏅 Gradebooks]
```

- Each tab has a line icon and a short label; the active tab uses the accent colour and a 2px underline. Add counts to list tabs.
- Each tab panel is a white card with its own title and one muted description line ("View and manage students enrolled in this class"), then its content or empty state.
- Keep the selected tab in the URL, so refresh and shared links open the same tab.
- On phones, the tab bar scrolls sideways; never wrap it into two rows.

## 4. Empty panels

Follow `onboarding-and-activation.md` §7: icon, title, one line, one tinted action ("+ Enrol students"), centred in the panel.

## 5. Status and danger

- Show the record's status near the title as a chip (Active, Archived, Draft) with text, not colour alone.
- Put destructive actions (archive, delete) at the bottom of the "More" menu, separated by a divider, in the danger colour, with confirmation.

## 6. Print and share

- If the record ends up on paper (timetable, report card, invoice, attendance sheet), offer "Print" with a print-friendly layout: no navigation, black text on white, page breaks between sections.
- Offer "Copy link" for records people discuss with colleagues.

## 7. Mobile

- Title and status first, header actions collapse into one "Actions" menu button.
- Facts stay as a list (icon, label, value); pencils stay visible.
- Tabs scroll sideways; panels are full width.

## 8. Checks

- Can a user tell in five seconds what this record is and its state?
- Does every editable fact have a pencil, and only editable facts?
- Are linked records in the link colour?
- Are header actions grouped by job into a few menus?
- Is the active tab in the URL, and do empty panels teach the next action?
