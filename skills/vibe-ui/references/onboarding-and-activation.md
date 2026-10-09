# Onboarding and Activation

Use this module for sign-up, first-time workspace setup, the first visit to an empty dashboard, setup checklists, and in-product announcements. A smooth first hour decides whether a customer stays. The goal is simple: get the user from "account created" to "first real value" with no confusion and no dead ends.

## Contents

1. The activation path
2. Account and workspace setup screens
3. Smart defaults
4. Placeholders and selectors in setup forms
5. The first-run wizard
6. The setup checklist on the dashboard
7. Empty states that teach
8. Announcements
9. Mobile
10. Checks

## 1. The activation path

Design the whole path, not single screens:

```text
Sign up (who you are) → Workspace setup (your school / company) → Dashboard with first-run wizard
   → Setup checklist (what is left) → First real value (first class, first invoice, first report)
```

- Ask for one kind of information per screen. Personal details first, then workspace details. Never mix them in one long form.
- Every screen has one primary action ("Continue"). No sidebar, no extra links, no competing buttons.
- Do not let the user land on a blank dashboard. After setup, show where they are and what to do next.
- Never lose what the user typed. If they leave, resume where they stopped.

## 2. Account and workspace setup screens

Desktop layout: a split screen.

```text
┌────────────────────────────┬─────────────────────────────┐
│   Let's create your school │                             │
│  ┌──────────────────────┐  │   (logo of a customer)      │
│  │ Tell us about your … │  │   "Short, real quote about  │
│  │ one-line why          │  │    how easy it was."        │
│  │ [fields]              │  │   photo, name, role         │
│  └──────────────────────┘  │                             │
│        [ Continue ]        │   soft gradient background  │
└────────────────────────────┴─────────────────────────────┘
```

- **Left:** a page title (24 to 28px, weight 500), then one white card holding the form. Card title (18 to 20px, 500) plus one muted line saying why the information is needed ("We'll use this to set up your workspace"). One primary button under the card, centred or aligned with the card.
- **Right:** quiet social proof on a very soft gradient: a customer logo, one short quote, a small photo, name, and role. It reassures without asking for anything. Use only real, approved quotes.
- **Group fields with small muted sub-headings** inside the card ("Select your local settings") instead of extra cards.
- Two columns for short related fields (type and size, country and time zone). One column on phones.
- Typography stays light: regular body, medium titles, nothing bold, nothing huge.

## 3. Smart defaults

Every field you can fill correctly for the user is one less decision.

- Pre-fill country from the browser locale or IP, then derive time zone, currency, and date format from it. Show them as normal selected values the user can change.
- Pre-select the most common option only when it is very likely right (for example the current academic year). Never pre-select something with legal, money, or privacy impact.
- Show the date format as a real date ("09-10-2026"), not as a pattern code.
- After a choice that changes other fields (country), update the dependent fields at once and visibly.

## 4. Placeholders and selectors in setup forms

- **Text placeholders show an example of the shape, prefixed with "e.g."**: "e.g. My Learning Centre". This tells the user what to type without looking like a value they already entered. Placeholder text is muted (around 50 to 60% grey), lighter than real values.
- **Selects show "Select"** (or "Select country") until chosen.
- **Choose the selector by list length:**

| Options | Control |
| --- | --- |
| 2 to 4, all visible | Segmented control or radio cards |
| 5 to about 12 | Plain dropdown (no search) |
| More than about 12, or names users type faster than they scroll (countries, time zones, currencies, people) | Searchable dropdown (combobox) with type-to-filter |
| Unknown or unbounded (users, records) | Async search with results as you type |

- Searchable dropdowns show a flag or icon where it helps recognition (countries) and keep keyboard support (arrows, Enter, Esc).
- Make the disabled or read-only look clearly different from an empty field (light grey fill, no chevron change on hover).

## 5. The first-run wizard

After setup, open a short wizard on top of the dashboard to create the first real object (first class, first project, first invoice).

```text
┌──────────────────────────────────────────────────────────────┐
│           Let's quickly add your first class!                │  ← tinted header band
│   Just the basics for now: title, teacher, schedule, students │
├──────────────────────────────────────────────────────────────┤
│ (1) Class details  (2) Schedule  (3) Teacher  (4) Price  (5) Students │
│ ─────────────────                                            │
│      Class title *                                           │
│      [                                           ]           │
│                                   [Cancel] [Next: Schedule]  │
│                                                      [Skip]  │
└──────────────────────────────────────────────────────────────┘
```

- **Header band:** a friendly, short title and one line listing what will be asked ("Just the basics for now"). This sets expectations and lowers effort.
- **Stepper:** numbered steps with short names. The current step is in the accent colour with an underline. Future steps are dimmed (lower contrast, still readable), so the user knows where they are and how far is left. Completed steps show a check.
- **One small group of fields per step.** Required fields marked with a red asterisk.
- **Buttons name the next step:** "Next: Schedule", not "Next". The secondary action is "Cancel" (tinted or outline). A quiet "Skip" lets confident users leave.
- **Keep the dashboard visible behind it.** Use a light dim (about 30 to 45% neutral overlay) and at most a mild blur (2 to 4px). Seeing the real product behind the wizard motivates the user to finish quickly and honestly. A fully black or heavily blurred backdrop hides the reward.
- Save progress per step. If the user closes the wizard, the checklist (section 6) shows how to resume.

## 6. The setup checklist on the dashboard

Until setup is complete, the dashboard leads with a checklist card.

```text
┌ (icon) Let's get Northfield ready to use                ┐
│ Add your students, classes and teachers                  │
│ 18% ████░░░░░░░░░░                                       │
│ ✓ 2 completed ▾                                          │
│ (icon) Add your first class         ▶  Create a class…   │
│ (icon) Import your school data         Upload a spreadsheet… │
│ (icon) Invite people                   Give teachers access… │
│ …                                                        │
│                     [Live chat] [Help centre] [Book a call] │
└──────────────────────────────────────────────────────────┘
```

- A title that uses the workspace name, one line of purpose, and a progress bar with a percentage.
- Completed items collapse into one line ("2 completed") so the list shows only what is left.
- Each item: a line icon in a soft tinted chip, a short title, one muted line of what it involves, and an optional "watch how" video icon.
- Help options at the bottom as quiet outline buttons (chat, help centre, book a call).
- The checklist disappears once complete, and can be dismissed earlier. It must not live forever as clutter.
- Side widgets on the same dashboard (announcements, today's activity, birthdays, attendance) show calm empty text until data exists.

## 7. Empty states that teach

An empty list is an onboarding moment, not a dead end.

- A line icon in the accent or a soft category colour (40 to 48px), a short title saying what to do ("Enrol students in this class"), one line on what will appear ("Students will appear here once they are enrolled"), and one tinted button for the action ("+ Enrol students").
- Centre it inside the panel where the content will appear. Keep the panel title and description above it, so the user knows where they are.
- Never show only "No data". Say what is missing and how to add it.

## 8. Announcements

- A slim, dismissible banner at the very top for product news ("New: ask questions about your school in plain language"). One sentence, a close icon, accent background with white text or a soft tint with dark text.
- Show it once per user per announcement. Remember the dismissal.
- Never stack more than one banner. Never use banners for marketing upsells during a critical task.

## 9. Mobile

- Drop the testimonial panel on phones, or move a short version below the form.
- The setup card becomes full width with 16px gutters; two-column fields become one column.
- The wizard becomes a full-screen sheet with the stepper as "Step 1 of 5: Class details" plus a thin progress bar.
- The checklist stays first on the dashboard, with the same progress bar.

## 10. Checks

- Can a new user reach first real value in under five minutes without help?
- Does every setup screen have exactly one primary action?
- Are country-dependent fields filled from the country?
- Does every placeholder start with "e.g." or say "Select"?
- Is the dashboard visible (dimmed, lightly blurred at most) behind the first-run wizard?
- Are future wizard steps dimmed and the current step clearly marked?
- Does every empty state have an icon, a title, one line, and an action?
