# Dialogs and Overlays

Use this module for modals, confirmation dialogs, wizard dialogs, nested dialogs, side sheets, and their backdrops. For choosing between a popover, a modal, and a full page, see `dashboards-and-kpis.md` §8. For dialog versus side sheet on long forms, see `forms-onboarding-and-states.md`.

## 1. Anatomy

```text
┌──────────────────────────────────────────────┐
│ Copy students from class                  (×) │  ← header band, short title, close icon
├──────────────────────────────────────────────┤
│ Copy students from an existing class.         │  ← one concise line
│                                               │
│ Select a class                                │
│ [ Select a class                         ▾ ]  │
│                                               │
│                     [ Cancel ] [ Copy students ] │  ← footer, right-aligned
└──────────────────────────────────────────────┘
```

- **Title:** 16 to 18px, weight 500, a short verb phrase that names the task ("Enrol students", "Copy students from class"). No "Dialog", no "Information".
- **Header band:** optional light neutral tint with a 1px bottom border, which separates the title from the content on long dialogs.
- **Close icon:** a 32 to 36px round or rounded-square icon button with a visible hover state, in the top trailing corner, with an accessible name ("Close"). Esc also closes it (unless data would be lost; then confirm).
- **Content:** concise. One line of context, then the fields. If you need three paragraphs, it is a page, not a dialog.
- **Footer:** right-aligned buttons, 8 to 12px apart, 40 to 44px tall, 16 to 20px horizontal padding. Secondary ("Cancel") is tinted or outline; primary is filled and names the outcome ("Copy students", "Save changes"), never "OK" or "Submit".
- **Padding:** 20 to 24px inside; the footer has the same side padding as the content.
- **Width:** 400 to 480px for a confirmation, 560 to 720px for a short form, up to 960px for a two-panel task. Never full width on desktop.
- **Radius:** 12 to 16px, a soft shadow, no border needed.

## 2. Backdrops

- **Default backdrop:** a neutral dim of about 30 to 45% with no blur, or a mild blur of 2 to 4px at most. The user should still see where they came from.
- **Onboarding or first-run wizards:** keep the product visible behind (light dim, mild blur). Seeing the real product is motivation to finish.
- **Never** a black 80% backdrop or a heavy blur on routine dialogs. They feel like an error and hide context.
- Clicking the backdrop closes simple dialogs. It must not close a dialog with unsaved input; ask first.

## 3. Nested dialogs

Sometimes a dialog opens another (for example "Enrol students" opens "Copy students from class").

- The new dialog sits on top and is visually smaller than the one below.
- The lower dialog is dimmed by a second overlay, so it is clearly inactive, but it is **not blurred**. The user sees the context and knows they are one level deeper.
- Only the top dialog receives focus and keyboard input. Closing it returns focus to the control that opened it.
- Never go deeper than two levels. If a task needs a third level, move it to a page or a side sheet.

## 4. Wizard dialogs

- Numbered stepper under the header; current step in the accent with an underline; future steps dimmed; done steps with a check.
- Primary button names the next step ("Next: Schedule"); the last step names the result ("Create class").
- "Back" appears from step 2. "Skip" only when the step is optional.
- Keep the dialog height stable between steps so buttons do not jump.

## 5. Two-list transfer (assign many items)

For enrolling students, assigning permissions, or picking members from a large set:

```text
All students                 Enrolled students
[ search ]                   [ search ]
┌──────────────┐   [ › ]     ┌──────────────┐
│ list         │   [ ‹ ]     │ list         │
└──────────────┘             └──────────────┘
Use Shift and Ctrl to select several students.
```

- Two lists with their own search, arrow buttons between them, and a hint about multi-select keys.
- Offer shortcuts above the lists ("Copy from another class", "Add new student").
- Show counts on both list titles. On phones, switch to one searchable list with checkboxes and a "Selected (12)" chip.

## 6. Confirmation dialogs

- Use only for destructive or costly actions. For reversible actions, act and show an undo toast instead.
- The title states the action ("Delete 3 students?"); the body states the consequence in one line; the confirm button repeats the verb ("Delete students") in the danger colour.
- Focus starts on the safe action.

## 7. Side sheets

- Use for record previews, filter panels, and long forms that need the list in view. Width 400 to 560px on desktop, full screen on phones.
- Same header, close icon, and footer rules as dialogs.

## 8. Mobile

- Dialogs become bottom sheets (short tasks) or full-screen sheets (forms, wizards), with the title and close icon in a sticky header and actions in a sticky footer.
- Keep 16px padding, 44px targets, and keep the keyboard from covering the primary action.

## 9. Checks

- Does every dialog have a short task title, a close icon, and Esc support?
- Does the primary button name the outcome?
- Is the backdrop light enough to show context, with no heavy blur?
- In nested dialogs, is the lower one dimmed but not blurred?
- Does focus move into the dialog and back to the trigger on close?
