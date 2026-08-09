# Typography and Content

## Design type by role

Define a compact semantic type scale for page titles, section headings, component titles, body, labels, supporting text, data, and captions. Preserve semantic heading order independently from visual size.

Use few families and weights. Load only intended web faces, preferably WOFF2. Avoid thin weights for small UI text. Use variable axes through high-level CSS properties when available.

## Shape hierarchy

- headings: tighter line-height, restrained negative tracking only at display sizes;
- body: comfortable line-height, usually 1.5–1.6;
- small labels: adequate weight and contrast; uppercase only with tracking and a clear system;
- changing numbers: tabular figures;
- long-form content: roughly 60–75 characters per line;
- inputs on mobile: at least 16px text to avoid iOS zoom.

Use `text-wrap: balance` for short headings and `text-wrap: pretty` for short descriptions when supported and helpful. Ensure long URLs, IDs, names, and translated strings can wrap or remain reachable.

## Write for action

- Use plain, audience-appropriate language.
- Keep one term for one concept.
- Start buttons with a verb naming the outcome.
- Repeat destructive consequences in confirmation actions.
- Make links describe destinations.
- Keep visible labels; placeholders show examples or formats.
- Put corrective error copy beside the failure.
- Give empty states orientation and one useful next action.

Textual example:

- Before: "Oops! Something went wrong" in a toast after form submission.
- After: "Unable to save your profile. Check the highlighted phone number and try again" with an inline field error and focus moved to it.

## Avoid jargon and decorative copy

Do not use internal system names, AI jargon, vague benefit claims, or playful language in errors and high-stakes flows. Preserve intentional brand voice only when it does not reduce clarity or trust.

Remove copy whose only job is to narrate the interface. Headings such as "Summary", subtitles such as "Common tasks", and explanatory text beneath self-explanatory actions often add noise. Keep words that define scope, consequence, time, tax, currency, status, or an unfamiliar action.

Make time language follow the selected data scope. Do not say "this year" or "today" when a historical period is selected. Prefer stable labels such as "Revenue", "Expenses", "Pending invoices", and "Current team", then let the visible filter establish the period. If the data is not a historical snapshot, describe its true semantics rather than implying that it is.

## Verification

Read the page at normal speed, not just the code. Check hierarchy while squinting, line length, wrapping at narrow widths, 200% text zoom, content expansion, dynamic numbers, font loading, fallback faces, bidi content, selection, and truncation recovery.

