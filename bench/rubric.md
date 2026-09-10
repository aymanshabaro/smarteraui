# AgentBench rubric

Every metric below is scored identically for both conditions (Smart Era UI, shadcn/ui baseline) and both tools (Claude Code, Codex). A result report (`results/TEMPLATE.md`) fills in one row per metric per run.

## 1. Compile success

**Definition:** does `pnpm build` (or the app's equivalent production build command) succeed with the code exactly as the agent left it — zero manual edits, zero additional installs the agent didn't run itself?

**Scoring:** binary, `pass` / `fail`. If it fails, record the first build error verbatim in the report. A run that needed one manual fix to compile is `fail`, with a note describing the fix — do not "help" it across the line and then score it as a pass. If the agent iterates on its own build errors within the same session (i.e., it re-ran the build and fixed things itself before finishing), that's still a `pass`; only human intervention makes it a `fail`.

## 2. Exact reuse

**Definition:** of the registry entries listed in the task file's "Ideal registry entries" section, what percentage does the final code actually import from `@smarteraui/ui` (or, for the shadcn baseline, from the equivalent installed shadcn component)?

**Scoring:** `reused / ideal_total`, reported as a percentage plus the raw fraction (e.g. `9/13 — 69%`). Count an entry as reused if the generated code imports it and uses it for a materially similar purpose to what the task describes (a `<Tabs>` used for page navigation counts; a `<Tabs>` accidentally imported and never rendered does not). Also record, separately, any registry entries the agent used that were _not_ on the ideal list — this isn't penalized, it's just useful context for whether the ideal list itself needs revising later.

This metric doesn't apply cleanly to the shadcn/ui condition, since shadcn has no equivalent registry entries — score the shadcn run's "ideal reuse" against the closest shadcn/ui primitives (e.g. `Tabs`, `Table`, `Pagination` from shadcn's own component list) and say so explicitly in the report.

## 3. Token compliance

**Definition:** count of non-semantic style literals in the generated files — i.e., places the agent reached for a raw value instead of a design-system token or an existing component's built-in variant.

Three rule families, each with an exact regex (also implemented in `scripts/score-tokens.ts` — run the script rather than hand-counting):

| Rule              | Catches                                                                                                                                      | Regex (JS)                                                                                                                                                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arbitrary-color` | Tailwind arbitrary-value color literals: `bg-[#1a1a2e]`, `text-[rgb(10,10,10)]`, `border-[hsl(0,0%,10%)]`                                    | `(?:^\|[^\w-])(?:[\w-]+:)*(bg\|text\|border\|ring(?:-offset)?\|fill\|stroke\|from\|via\|to\|divide\|outline\|decoration\|caret\|accent\|shadow\|placeholder\|selection)-\[(#[0-9a-fA-F]{3,8}\|rgba?\([^\]]*\)\|hsla?\([^\]]*\))\]`                         |
| `arbitrary-px`    | Arbitrary pixel dimensions on any utility: `w-[257px]`, `top-[13px]`, `text-[14px]`                                                          | `(?:^\|[^\w-])[a-zA-Z][\w-]*-\[[0-9]+(?:\.[0-9]+)?px\]`                                                                                                                                                                                                    |
| `raw-palette`     | A raw Tailwind color-scale class used directly instead of a semantic token: `bg-gray-500`, `text-blue-600`, `border-red-300`, `bg-brand-600` | `(?:^\|[^\w-])(?:[\w-]+:)*(bg\|text\|border\|ring(?:-offset)?\|fill\|stroke\|from\|via\|to\|divide\|outline\|decoration\|caret\|accent\|shadow\|placeholder\|selection)-[a-z]+-(?:50\|100\|200\|300\|400\|500\|600\|700\|800\|900\|950)(?:/[0-9]{1,3})?\b` |

**Deliberate exclusion:** `raw-palette` does not flag Smart Era UI's own `utility-*` color family (e.g. `bg-utility-blue-50`, `text-utility-blue-700`). Those classes appear verbatim inside shipped component source (see `packages/ui/src/components/base/badges/badges.tsx`) as the sanctioned way to express status/semantic color inside a variant — an agent that copies them via composing an existing component is doing exact reuse, not bypassing the token system. An agent that hand-writes `bg-blue-500` (the _default_ Tailwind palette, not the design system's namespaced one) to get a similar effect is exactly what this rule is for.

**Scoring:** raw counts per rule plus a total, each with `file:line`. Lower is better; report the total and the breakdown. This is a regex scanner, not a Tailwind AST parser — known blind spots:

- Multi-part arbitrary values (`grid-cols-[200px_1fr]`) are not matched by `arbitrary-px`.
- Values built from template literals or `clsx`/`cva` config objects spanning multiple lines may not match if the class name itself is not a static string token.
- Non-Tailwind inline `style={{ color: "#111" }}` is not scanned — this rubric only covers class-based styling, since that's the dimension a design system actually contests.

Run it: `pnpm exec tsx bench/scripts/score-tokens.ts <path-to-generated-app>`.

## 4. Axe violations

**Definition:** automated accessibility violations reported by `vitest-axe` (already used in this repo's own test suite — see `packages/ui/package.json`) or `@axe-core/playwright` if the generated app doesn't have a `vitest` unit-test harness to hook into.

**Scoring:** raw violation count from the tool's output, plus severity breakdown (`critical` / `serious` / `moderate` / `minor` — these are axe-core's own impact levels, not invented ones). Zero is the target; report the actual number and paste the violation summaries (rule id + node count) into the results report, not just the total.

Minimum setup: render the built page (or each of its interactive states — e.g. after opening a modal, after switching a tab) and run `axe.run()` against it. One assertion covering the page's default state is the floor; more states scored is better and should be noted.

## 5. Manual keyboard pass

**Definition:** a human, using only the keyboard (no mouse), completes the task's primary flow.

**Scoring:** a checklist, scored pass/fail per item, specific to what each task actually renders. The universal items every task's checklist includes:

- [ ] Every interactive element (link, button, input, tab, menu item) is reachable via `Tab` in a sensible order.
- [ ] The currently focused element has a visible focus indicator at every step.
- [ ] `Enter`/`Space` activates buttons and links as expected.
- [ ] Tabs (where present) follow the WAI-ARIA tabs pattern: arrow keys move between tabs, `Tab` moves _into_ the panel, not to the next tab.
- [ ] Modals/dialogs (where present) trap focus while open and return focus to the trigger on close.
- [ ] Menus/dropdowns/comboboxes (where present) open with `Enter`/`Space`/`ArrowDown`, close with `Escape`, and `Escape` returns focus to the trigger.
- [ ] Form submission is reachable and triggerable without a mouse, and validation errors are announced (visually associated with their field at minimum; a screen-reader spot check is a bonus, not required).
- [ ] No keyboard trap: a user can always continue tabbing forward through and out of the flow.

Each task file adds items specific to that screen (e.g. the data table task adds "pagination controls are operable via keyboard").

## 6. Responsive defects

**Definition:** visual/functional defects observed at each viewport in the task's viewport list, checked by a human against a screenshot or live render.

**Viewports (same three for every task):**

| Name    | Size       |
| ------- | ---------- |
| Mobile  | 375 × 812  |
| Tablet  | 768 × 1024 |
| Desktop | 1440 × 900 |

**Scoring:** count of defects per viewport, each logged as one line: `<viewport> — <what's wrong>` (e.g. "Mobile — tab labels overflow and overlap the badge"). The universal defect checklist per viewport:

- [ ] No horizontal scroll on the page body.
- [ ] No text or interactive element is clipped, overlapping, or unreadable.
- [ ] Touch targets are at least 24×24px on Mobile.
- [ ] Layout reflows sensibly (e.g. sidebar becomes a drawer/stack, table becomes scrollable or card-based) rather than shrinking proportionally until unusable.
- [ ] Nothing that was interactive at Desktop becomes unreachable at Mobile (e.g. a hover-only affordance with no touch equivalent).

Zero defects at all three viewports is the target; report the actual count per viewport.

## 7. Human repair minutes

**Definition:** wall-clock minutes a competent developer needs to take the agent's raw output to something they'd actually ship — fixing bugs, dead code, broken responsive behavior, accessibility gaps, or anything else the automated checks above already flagged as failing.

**How to time it:** start a timer the moment you begin reading the generated diff with intent to fix something. Stop it the moment every item from metrics 1–6 above passes (or you've made a judgment call that a given failure is out of scope for repair — state which, and why, in the report). Do the repair pass _after_ scoring 1–6, not before — repair minutes measures the gap the automated/manual scoring already found, it doesn't replace it. Use one stopwatch per condition; do not include time spent writing the report itself.

**Scoring:** minutes, reported as an integer, plus a one-line list of what was actually fixed (so a reader can judge whether "12 minutes" means "renamed a prop" or "rewrote the layout").

## 8. Latency and cost

**Definition:** how long the agent took and what it cost to produce the submitted output.

**What to record:**

- Wall-clock time from pasting the prompt to the agent declaring itself done (its last message in the transcript), in minutes.
- Token usage if the tool exposes it (input/output/cache tokens), or the tool's own cost estimate if it shows one (e.g. Claude Code's `/cost`).
- Number of turns/tool-calls if easily available — useful context, not a hard requirement.
- The exact model name and snapshot/version string used, and the date of the run (also required by the honesty rules in `README.md` — record it here too since it's part of this metric's meaning).

**Scoring:** report the raw numbers. There is no target value — this metric exists so cost/speed tradeoffs are visible next to the quality metrics, not to be optimized in isolation.
