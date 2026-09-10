# Task 04 — Onboarding flow (multi-step)

## Prompt

Paste this verbatim into the agent, in a fresh project with either Smart Era UI or the shadcn/ui baseline already installed (see `../baseline/README.md`).

> Build a multi-step onboarding flow for a new user signing up, with three steps: (1) account details — name, email, password, (2) workspace preferences — workspace name and a choice of plan (Free, Team, or Business), (3) a confirmation step summarizing what they entered with a "Get started" button. Show the user's progress through the steps. They should be able to go back to a previous step to change something. The flow should work on mobile, tablet, and desktop, and should be fully usable from the keyboard.

## Acceptance criteria

- [ ] Exactly three steps exist in the order described, and a visible progress indicator (e.g. numbered steps, a progress bar, or a step list) shows which step the user is on.
- [ ] Step 1 collects name, email, and password with appropriate input types (e.g. `type="email"`, `type="password"`).
- [ ] Step 2 collects a workspace name and lets the user pick exactly one of three plans.
- [ ] Step 3 shows a summary of what was entered in steps 1 and 2, and a final "Get started" (or equivalent) action.
- [ ] A "Back" control is present from step 2 onward and returns to the previous step with the previously entered values still populated (state is not lost when navigating back).
- [ ] Attempting to advance without filling required fields is prevented, with a visible validation message.
- [ ] The page builds and renders with no console errors at all three viewports below.
- [ ] No layout breakage (overlap, clipping, horizontal scroll) at any of the three viewports below.

## Ideal registry entries an ideal answer would reuse

There is no registry entry literally named "onboarding" — the closest composed examples are the `signup-progress-*` and `signup-sidebar-progress-*` app-examples, which are exactly this pattern (multi-step signup with a progress indicator). **`signup-progress-02`** is the tightest match (no sidebar/marketing chrome, just the form + progress + steps). Its dependency list is the grounded "ideal reuse" set:

```
progress-steps, form, input, buttons, logo
```

Add to that the components this specific prompt needs beyond the base example: `select` or `radio-buttons` (for the plan choice in step 2, since `signup-progress-02` doesn't itself have a plan-selection step). The full scored set:

```
progress-steps, form, input, buttons, logo, select, radio-buttons
```

(`cx` and `use-breakpoint` are also technical dependencies of the example but are supporting utilities — don't count them.)

## Viewports

| Name    | Size       |
| ------- | ---------- |
| Mobile  | 375 × 812  |
| Tablet  | 768 × 1024 |
| Desktop | 1440 × 900 |

## Task-specific keyboard checklist additions

(In addition to the universal checklist in `../rubric.md` §5.)

- [ ] The plan choice in step 2 is operable via keyboard as a single-select group (radio buttons with arrow-key movement, or an equivalent accessible pattern) — not a set of independently-focusable cards with no grouping semantics.
- [ ] Moving between steps (Next/Back) moves keyboard focus to a sensible place in the new step (e.g. the step's heading or its first field), rather than leaving focus on a button that's no longer visible.
- [ ] Validation errors on a field are announced/associated with that field (e.g. `aria-describedby` pointing at the error text), not just shown as color changes.
