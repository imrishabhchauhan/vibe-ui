# Gamified Experiences

Use this module for learner, student, child, parent-engagement, habit, or consumer surfaces where motivation is part of the product. Do not apply it to staff, admin, or professional surfaces unless the project's `.vibe-ui/TASTE.md` says so. A project's taste ledger outranks everything here; owners often have strong views on gamification.

Gamification exists to help people do something they already value (learn, practise, finish). It fails when it becomes the point, when it punishes, or when it manipulates.

## 1. Start with the core loop

Before any badge or point, write the loop in one line:

```text
Clear next step → do a small task → instant, honest feedback → visible progress → reason to return
```

- The home screen answers "what do I do now?" in under three seconds, with one obvious primary action.
- Tasks are small enough to finish in one sitting. Progress is saved after each step.
- Feedback comes immediately after the action, and says what was good or what to fix, not only "Great job!".

## 2. Choose few systems, and make each one mean something

Pick two or three of these, not all of them:

| System | Use it when | Design rules |
| --- | --- | --- |
| Progress path or journey | Content has an order | Show where the user is, what is next, and what is done; never hide future steps entirely |
| Badges and achievements | Milestones are real and explainable | One shape family, one bevel, one style; every badge says how it was earned; locked badges show the condition |
| Streaks | The habit has a natural rhythm | Count the real rhythm (weeks for weekly tasks); allow freezes or grace; never shame a missed day |
| Currency or points | Something can be earned and shown | One currency; show earn moments with motion; no spending flow until there is something worth buying |
| Levels or tiers | Long-term growth matters | Tiers only go up; no public demotion |
| Leaderboards | Peers motivate each other | Rank by effort or participation, never by ability or grades; show the user's own row wherever it is; care for the middle of the table |
| Celebrations | A meaningful milestone is reached | Short (under about 1.5s), skippable, respects reduced motion; not on every tap |

## 3. Visual language

- **Bigger and friendlier** than staff UI: rounded display type (weight 600 to 800 is fine here), 16 to 18px body, large tap targets (48px+), generous spacing, one clear action per screen.
- **Tactile buttons:** a solid fill with a darker bottom shadow (3 to 5px) that collapses on press. Use a box-shadow, not a border, so the layout does not jump.
- **Colour has meaning:** one action colour, green for correct and done, a warm accent for rewards. Avoid rainbow screens.
- **Illustrations and mascots** are welcome when they explain or encourage: empty states, first steps, celebrations. Keep one consistent style and cast; keep them crisp; never put them inside dense data.
- **Age matters:** younger users need fewer words, pictures and audio, one choice at a time; older students want more autonomy and less cuteness.

## 4. Feedback and motion

- Correct: a quick positive animation, a short sound if sound is on, and a plain sentence on why it was right.
- Wrong: calm, never red-flash shaming; show the right answer and let them try again.
- Earn moments: points or gems fly into the balance, a badge reveals with a brief shine, progress fills with an eased motion.
- Every motion has a reduced-motion fallback and never blocks the next action.

## 5. Parents and teachers around a gamified product

- Parents and teachers need to see progress, not play the game. Show the same achievements in a calmer layout with plain words and evidence.
- Never show a child's ranking by ability to other children or parents.

## 6. Anti-patterns

| Anti-pattern | Why it fails | Do instead |
| --- | --- | --- |
| Hearts or lives that block learning | Punishes mistakes, the core of learning | Let users retry freely |
| Daily streaks for weekly work | Users lose streaks for following the schedule | Match the real rhythm; add grace |
| Leaderboards by score or grade | Shames weaker learners; bullying surface | Rank by effort; no public demotion |
| Points for everything | Inflation; nothing feels earned | Reward meaningful milestones |
| Celebrations on every tap | Noise; slows people down | Celebrate real milestones only |
| Loot boxes, timers, fake scarcity, guilt messages | Manipulative; erodes trust, especially with children | Honest rewards, no pressure |
| A shop with nothing worth buying | Disappointment | Leave the shop out until it has value |
| Badges that cannot be explained | Feel random; worthless | One line: what it means and how it was earned |
| Mixed art styles across badges or mascots | Looks cheap | One style guide for every asset |
| Gamified styling leaking into staff tools | Looks kiddish to professionals | Keep staff surfaces calm and professional |

## 7. Checks

- Can the user say what to do next in three seconds?
- Does every reward map to a real achievement the user can explain?
- Can a user who missed a week, got answers wrong, or sits mid-table still feel progress?
- Do all motions respect reduced motion and stay under about 1.5s?
- Is anything here designed to pressure rather than help? If yes, remove it.
