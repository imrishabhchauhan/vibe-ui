# UX Laws and Behavioural Lenses

Use this catalogue to diagnose and design. For each lens: confirm the user problem, choose a practical intervention, and check the misuse warning. Do not cite a law as proof that a proposed design will increase conversion.

## Perception and organisation

### Aesthetic-Usability Effect

- Signal: users distrust or avoid a functional interface because it looks unfinished or incoherent.
- Apply: improve alignment, typography, colour discipline, and feedback while preserving usability.
- Example: replace a dense key/value receipt with a clear title, price, route timeline, and meaningful image.
- Misuse: beauty can mask broken navigation or inaccessible controls; test task completion separately.

### Law of Common Region

- Signal: users cannot tell which controls or information belong together.
- Apply: group related items in one surface or background region after trying spacing first.
- Example: place billing address fields in one labelled section and payment fields in another.
- Misuse: wrapping every item in a card creates card soup and destroys hierarchy.

### Law of Proximity

- Signal: labels, help, errors, and actions appear related to the wrong element.
- Apply: make intra-group spacing smaller than inter-group spacing.
- Example: keep an inline password requirement close to its field and farther from the next field.
- Misuse: proximity cannot replace semantic relationships or accessible labelling.

### Law of Similarity

- Signal: equivalent actions look different, or unrelated objects look interactive in the same way.
- Apply: make shared roles share shape, treatment, placement, and state behaviour.
- Example: all secondary actions use one neutral button treatment; links remain visibly distinct from body text.
- Misuse: do not make destructive and safe actions look identical.

### Law of Uniform Connectedness

- Signal: a sequence or relationship is hard to perceive.
- Apply: use a line, shared track, or continuous surface when it communicates an actual relationship.
- Example: connect pickup and delivery points with a vertical route line and retain readable labels.
- Misuse: decorative connectors can invent relationships that do not exist.

### Law of Prägnanz

- Signal: users must decode visually complex shapes or arrangements.
- Apply: simplify silhouettes, grouping, and component anatomy.
- Example: replace five equally strong controls with one primary action and a compact overflow menu.
- Misuse: simplicity must not hide essential consequences or status.

### Von Restorff Effect

- Signal: the primary action or critical status disappears among peers.
- Apply: give one key item controlled visual distinction through colour, weight, shape, or placement.
- Example: fill the single "Pay now" action; keep "Save draft" and "Cancel" neutral.
- Misuse: if everything is highlighted, nothing is. Do not use colour alone.

### Selective Attention

- Signal: users miss a change, alert, or action because competing stimuli dominate.
- Apply: remove distractions, place feedback near the action, and reveal changes with a stable cue.
- Example: after a filter changes results, update a nearby result count and retain selected-filter chips.
- Misuse: banner-like styling may be ignored; motion may distract or cause harm.

## Choice, memory, and complexity

### Choice Overload

- Signal: users stall among many comparable options.
- Apply: support filtering, comparison, recommendations, and progressive disclosure.
- Example: show three recommended booking times plus "View all times" instead of a long select.
- Misuse: do not hide important alternatives or steer toward the most profitable option without disclosure.

### Hick's Law

- Signal: time-critical decisions require scanning many controls.
- Apply: reduce or stage choices, highlight the likely next action, and group by user goal.
- Example: show date, popular times, guest stepper, and seating choices in task order.
- Misuse: simplification that turns labels into vague icons increases interpretation cost.

### Chunking

- Signal: dense information is hard to scan or remember.
- Apply: create meaningful groups with headings and consistent internal structure.
- Example: group SEO findings into critical, warning, and passed sections with counts and next actions.
- Misuse: chunks need meaningful boundaries; arbitrary card grids fragment comprehension.

### Cognitive Load

- Signal: users must interpret jargon, remember prior values, or track multiple simultaneous changes.
- Apply: externalise memory, remove irrelevant decoration, use progressive disclosure, and keep context visible.
- Example: carry the selected plan and price into checkout instead of making the user remember them.
- Misuse: eliminating necessary information can increase uncertainty and load.

### Working Memory

- Signal: a task requires recalling codes, settings, comparisons, or earlier decisions.
- Apply: keep prior choices visible, support recognition, save progress, and show comparison side by side.
- Example: show an order summary throughout checkout.
- Misuse: "7 plus or minus 2" is not a universal menu-item cap.

### Miller's Law

- Signal: long undifferentiated lists are treated as one memory task.
- Apply: organise into meaningful chunks and prioritise recognition.
- Example: group settings by notification, privacy, billing, and account.
- Misuse: never force every list into seven items.

### Mental Model

- Signal: controls behave unlike familiar products in the same category.
- Apply: use expected names, placement, and interaction patterns; research the target audience.
- Example: use a cart and checkout sequence familiar to commerce users.
- Misuse: conventions are not automatically good; depart when evidence supports a safer or clearer model.

### Jakob's Law

- Signal: users must relearn standard navigation, form, or control behaviour.
- Apply: preserve established platform conventions and migrate major changes gradually.
- Example: links navigate, buttons act, toggles change a binary setting.
- Misuse: copying competitors cannot replace understanding the user's job.

### Tesler's Law

- Signal: unavoidable complexity has been pushed onto every user.
- Apply: let the system calculate, format, infer, or remember what it can safely handle.
- Example: derive tax from location while showing how it was calculated and allowing correction.
- Misuse: hiding complexity must not remove control or make errors impossible to diagnose.

### Occam's Razor

- Signal: several interface elements solve the same problem with little added value.
- Apply: remove elements until each remaining item has a clear user purpose.
- Example: remove duplicate headings and decorative metrics from a checkout step.
- Misuse: the shortest interface is not always the clearest interface.

### Paradox of the Active User

- Signal: users skip onboarding and immediately attempt a task.
- Apply: provide contextual guidance, sensible defaults, examples, and recoverable exploration.
- Example: teach keyboard shortcuts when a user reaches the relevant action, not in a mandatory tour.
- Misuse: tooltips cannot rescue a fundamentally confusing workflow.

## Action, progress, and time

### Fitts's Law

- Signal: controls are small, distant from the task, or tightly packed.
- Apply: enlarge hit areas, place frequent actions near their context, and separate competing targets.
- Example: make the entire labelled row activate its checkbox while preserving a 44px touch target.
- Misuse: oversized controls can reduce information density and create accidental activation.

### Doherty Threshold

- Signal: the system feels unresponsive after an action.
- Apply: acknowledge input quickly, use optimistic UI only when safe, and show meaningful progress for longer work.
- Example: immediately show "Uploading" with cancel, progress, and eventual success or failure.
- Misuse: animation cannot compensate for avoidable slowness; never fake completion.

### Flow

- Signal: frequent interruptions or unclear feedback break task concentration.
- Apply: match complexity to expertise, remove avoidable friction, and keep progress and consequences visible.
- Example: autosave an editor and show a quiet saved state without blocking work.
- Misuse: "engagement" is not permission to make escape or stopping difficult.

### Goal-Gradient Effect

- Signal: users abandon a finite multi-step task because progress feels distant.
- Apply: show honest progress, completed steps, remaining work, and a meaningful head start based on real completion.
- Example: after account creation, show profile setup at 20% only if that completed step genuinely counts.
- Misuse: never inflate progress, hide added steps, or reset the finish line.

### Zeigarnik Effect

- Signal: users need a reminder that useful work remains incomplete.
- Apply: preserve drafts and show a calm, dismissible completion cue.
- Example: show "Profile 3 of 5 details complete" with "Continue setup" on the dashboard.
- Misuse: persistent nagging, shame, or fake incompleteness is manipulation.

### Parkinson's Law

- Signal: a task expands because the interface invites unnecessary work.
- Apply: autofill, smart defaults, concise paths, and optional advanced settings.
- Example: prefill country from a verified account address and let the user change it.
- Misuse: speed must not remove review for high-risk actions.

### Peak-End Rule

- Signal: the most stressful moment or completion state is abrupt, unclear, or negative.
- Apply: improve high-stakes moments and end with confirmation, outcome, and next step.
- Example: after payment, show receipt, delivery expectation, and support path.
- Misuse: a celebratory ending cannot excuse friction or deception earlier in the flow.

### Serial Position Effect

- Signal: critical items are buried in the middle of a sequence.
- Apply: place high-priority items at the beginning or clear completion action at the end.
- Example: put the primary navigation destination first and account/destructive controls in a distinct final group.
- Misuse: do not reorder established navigation without considering user habits.

### Pareto Principle

- Signal: equal effort is spent on rare and common paths.
- Apply: prioritise high-frequency, high-impact tasks using analytics or research.
- Example: optimise search, view, and checkout before building elaborate settings animation.
- Misuse: minority users and accessibility needs are not disposable because they are numerically smaller.

## Bias, defaults, and reciprocity

### Cognitive Bias

- Signal: a decision relies on an assumption about perfectly rational users.
- Apply: surface consequences, support comparison, test framing, and seek behavioural evidence.
- Example: show total recurring cost beside a trial CTA rather than relying on users to calculate it.
- Misuse: knowledge of bias must protect users, not exploit them.

### Status Quo Bias

- Signal: users resist a changed workflow or stay with a default without evaluation.
- Apply: preserve familiar paths, explain benefits, offer preview/revert for major redesigns, and make defaults safe.
- Example: allow users to try a new dashboard layout and return to the previous one during migration.
- Misuse: do not use inertia to trap users in subscriptions or privacy-invasive settings.

### Smart Defaults

- Signal: most users repeatedly make the same safe, predictable choice.
- Apply: preselect the evidence-backed common option when it is reversible, visible, and low risk; remember prior user choices when appropriate.
- Example: default a booking to two guests and the next available date, while making both obvious to change.
- Misuse: never preselect consent, add-ons, destructive actions, or high-cost options. Do not default fields where no safe majority exists.

### Reciprocity

- Signal: the product asks for effort or data before demonstrating value.
- Apply: provide useful value first, then make a proportionate and transparent request.
- Example: show a concise free audit result before asking users to create an account to save the full report.
- Misuse: blurred content, fake gifts, or withheld promised value create coercion rather than reciprocity.

### Postel's Law

- Signal: harmless variations in user input produce preventable errors.
- Apply: accept common formats, normalise safely, validate boundaries, and return precise feedback.
- Example: accept spaced or dashed phone numbers, store a canonical value, and show the user's readable format.
- Misuse: tolerant input must not weaken security, authorisation, or data integrity.

## Decision rule

For any proposed use of a law, write one sentence for each:

1. Evidence: what observed user or interface problem exists?
2. Intervention: what concrete change addresses it?
3. Safeguard: how will agency, accessibility, truthfulness, and reversibility be preserved?
4. Verification: what task, metric, or test will show whether it helped?

