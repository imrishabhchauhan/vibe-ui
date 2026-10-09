# Taste Memory: Learn From Every Review

Good designers remember what a client liked and rejected. An agent forgets at the end of every session unless the lesson is written down. This module turns owner feedback into durable, testable rules that every later engagement reads first.

## Where taste lives

| File | Scope | Who edits |
| --- | --- | --- |
| `.vibe-ui/TASTE.md` (in the project) | One product or brand | The agent, after every piece of design feedback |
| `references/dashboard-craft.md` (in this skill) | Every project | Upstreamed only when a taste rule proves general |

Order of authority when they disagree:

1. Accessibility floors and platform safety (contrast, target size, keyboard, no horizontal scroll).
2. `.vibe-ui/TASTE.md` rules for this project.
3. The project's own design docs (`AGENTS.md`, design guide, tokens).
4. This skill's defaults.
5. Your own judgement.

Keep `.vibe-ui/TASTE.md` in version control. It is shared design knowledge, and cloud sessions start from a fresh clone. If the project ignores `.vibe-ui/`, change the ignore rule to `.vibe-ui/*` plus `!.vibe-ui/TASTE.md` rather than leaving the ledger local.

## Read before you design

At the start of every `audit` or `improve` engagement:

1. Read `.vibe-ui/TASTE.md` if it exists. Treat every active rule as a hard constraint for this project.
2. List the 3 to 5 rules most relevant to the current screen in your plan, so the owner can see you applied them.
3. Look at the "Rejected" section. Never ship something that matches a rejected pattern, even in a new form.

## Capture after every piece of feedback

When the owner reviews a design (comments, screenshots with arrows, "I like this", "rejected because"):

1. **Quote it.** Keep the owner's short words as the source.
2. **Turn it into a testable rule.** "Looks too orange" becomes "Brand accent covers less than about 5% of the screen; charts and icons are not drawn in the brand colour."
3. **Find the principle behind it.** Ask why the owner reacted. "Black buttons rejected" is about harsh contrast and a consumer feel on a calm admin tool, so the rule also covers near-black fills.
4. **Set the scope.** Which roles, surfaces, or platforms does it apply to? ("Staff screens only; student screens may be playful.")
5. **Merge, do not pile up.** If a similar rule exists, sharpen it instead of adding a duplicate.
6. **Record liked references precisely.** Not "likes product X", but "likes: tabs with count badges; segmented control for gender; today column in soft yellow".
7. **Log the rejection.** Keep what was rejected and why, so the same mistake is not made in a new costume.

## TASTE.md format

```markdown
# Taste ledger

Last updated: YYYY-MM-DD

## Active rules

- **T-001 No black buttons.** Never use black or near-black filled buttons on staff screens.
  Why: harsh, competes with text, feels off-brand. Source: owner review, 2026-10-09.
  Check: no filled button darker than L 0.30 (OKLCH).
- **T-002 Accent budget.** Brand orange under about 5% of the screen: primary button, active tab, focus.
  Why: "looks too orange". Source: owner review, 2026-10-09.

## Liked references (what exactly)

- Reference school management app: page title 20px, card title 16px, value 14px; tabs with counts; zebra rows; kebab menus;
  quick filters plus a filter icon; refresh; print on timetables; today column in soft yellow.

## Rejected (and why)

- 2026-10-09: 10 dashboard concepts. Congested, kiddish illustrations, dark-mode inspiration.
```

Rules:

- Number rules (`T-001`, `T-002`) so reports can cite them ("applied T-002").
- Every rule has a **Why**, a **Source**, and, when possible, a **Check** that a person or script can verify.
- Keep the file short enough to read in one minute. Merge old rules; move retired ones to a "Retired" section with the reason.

## Upstream what generalises

When the same rule appears in two or more projects, or the owner states it as a general principle ("every table needs export"), propose adding it to `dashboard-craft.md`, `anti-patterns.md`, or `scorecard.md` in this skill. Keep project-specific facts (brand colours, names, fonts) out of the skill.

## Report taste compliance

In every design report, add one line: "Taste rules applied: T-001, T-002, T-005. New rules captured: T-007." If a request conflicts with an active rule, say so and ask before breaking it.
