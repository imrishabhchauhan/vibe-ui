# Responsive and Platform Behaviour

## Design one adaptive system

Do not create desktop, tablet, and mobile as unrelated compositions. Preserve task priority and information relationships while adapting navigation, density, alignment, and disclosure.

## Start at extremes

Test the narrowest supported viewport and a wide desktop first. Add breakpoints where content or interaction fails—not because a device label says tablet. Use container queries for reusable components when the repository supports them.

## Mobile

- Keep the primary task and status visible early.
- Use touch-sized targets and adequate separation.
- Respect safe-area insets and on-screen keyboards.
- Avoid hover-only discovery.
- Keep inputs at 16px text on iOS.
- Do not pin critical actions where the keyboard or browser chrome hides them.
- Preserve progress and drafts across interruption.

## Tablet

Tablet is not a stretched phone. Check portrait and landscape, touch reach, split view, intermediate widths, sidebars, two-column forms, and keyboard/trackpad combinations.

## Desktop

- Use width for comparison, context, and efficient workflows—not empty decorative panels.
- Maintain readable measures.
- Preserve keyboard shortcuts, hover as enhancement, and dense information where the audience benefits.
- Keep frequent actions near their objects.

## Adaptive decisions

For every element decide whether it:

- remains and reflows;
- changes order while preserving semantic reading order;
- collapses behind a labelled control;
- becomes a different interaction suited to the input;
- is removed because it is genuinely secondary, not because it is inconvenient to fit.

## Stress cases

Check 320, 375, 768, 1024, and 1440 CSS px when supported, plus the actual product breakpoints. Test 200% zoom, landscape mobile, long localisation, large system text, RTL, safe areas, virtual keyboard, touch and pointer, and reduced motion.

Avoid browser-specific device chrome in implementation unless building for that platform. A screenshot framed as an iPhone does not mean the web UI should copy native chrome.

