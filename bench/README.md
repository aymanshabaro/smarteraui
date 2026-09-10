# AgentBench

A reproducible benchmark for one question: **does a design system make a coding agent's output better?**

This is `bench/` from the Proper UI repository — the "Phase 2" item from `docs/spec/strategy/2026-09-plan.md` (§4, P2.1). It is not a benchmark of Proper UI's components in isolation; it is a benchmark of what an agent produces when it has Proper UI available versus when it has a documented shadcn/ui baseline available, given the same prompt and the same model.

Anyone can run this. You need a coding agent (Claude Code or Codex today; more can be added), about 30–60 minutes per task, and a willingness to publish what actually happened.

## What is being measured

Five "golden tasks" — a settings page, a data table, a pricing page, a multi-step onboarding flow, and a dashboard — each run twice per model: once with Proper UI installed, once with the documented shadcn/ui baseline installed. Same prompt, same model, same viewport list, different starting library.

The metrics are defined precisely in [`rubric.md`](./rubric.md): compile success, exact reuse of registry entries, token compliance (non-semantic literal count), axe violations, a manual keyboard pass, responsive defects per viewport, human repair minutes, and latency/cost.

## Directory map

| Path                      | Contents                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tasks/01..05-*.md`       | The five golden task prompts, acceptance criteria, the registry entries an ideal answer would reuse, and the viewport list.                             |
| `rubric.md`               | Exact metric definitions and how each is scored.                                                                                                        |
| `baseline/README.md`      | How to set up the shadcn/ui comparison project so the comparison is fair.                                                                               |
| `scripts/score-tokens.ts` | The token-compliance scanner — run it against generated output.                                                                                         |
| `scripts/run.md`          | The step-by-step manual run protocol (agent invocation is manual for now — there is no harness that drives Claude Code or Codex programmatically here). |
| `fixtures/`               | A tiny fixture pair (`clean.tsx`, `violations.tsx`) with known-good expected counts, used to keep the scanner honest.                                   |
| `results/TEMPLATE.md`     | The shape every submitted run report follows.                                                                                                           |
| `results/`                | Where run reports live once submitted (each as its own dated file; `.gitkeep` holds the empty directory).                                               |
| `leaderboard.md`          | An empty table of columns, filled in by submissions over time.                                                                                          |

## How to run it

Read [`scripts/run.md`](./scripts/run.md) for the full protocol. In short:

1. Scaffold a fresh app (Next.js 15 + Tailwind v4 — see `baseline/README.md` for the exact versions to pin).
2. Install either Proper UI (`npx properui@latest init`) or the shadcn/ui baseline, per `baseline/README.md`.
3. Paste one task prompt from `tasks/` into your agent verbatim. Do not edit it, do not add hints the other condition didn't get.
4. Save the full transcript (prompts, tool calls, and diffs) alongside your run.
5. Build the app. Record whether it compiled without manual edits.
6. Score it against `rubric.md`, running `scripts/score-tokens.ts` for the token-compliance number and `vitest-axe` (or `@axe-core/playwright`) for the accessibility number.
7. Copy `results/TEMPLATE.md` to `results/<date>-<tool>-<library>-<task>.md`, fill it in, and open a PR.

## Honesty rules

These are not optional and a submission that violates them gets removed, not corrected:

1. **Publish the raw output.** The generated code (or a link to a public branch/gist), the full transcript, and the build log all get committed or linked. A results file with only scores and no artifact is not a submission.
2. **Record model and date.** Model name, version/snapshot if the provider exposes one, and the date the run happened. Models change; a score without a date is unfalsifiable.
3. **No cherry-picking.** If you run a task more than once (e.g. the agent errored on attempt 1), report every attempt, not just the best one. State how many attempts you made in the report.
4. **No prompt engineering per condition.** The prompt in `tasks/` is what gets pasted, verbatim, for both the Proper UI run and the shadcn/ui run. If you think a prompt is unfair to one side, open an issue to fix the task file — don't patch it silently for one run.
5. **Report failures.** "The agent could not complete this task" is a valid, useful result. Do not omit a task because the answer was bad.
6. **Same reviewer standard both ways.** Score both conditions against the same rubric, applied by the same person, ideally back-to-back so recency doesn't bias judgment calls (e.g. the manual keyboard pass).

## Scope and honest limitations

- Two tools today (Claude Code, Codex). Cursor, Copilot, v0, Bolt and Lovable are candidates for later runs but are not covered by `run.md` yet.
- Agent invocation is manual. There is no CI job that drives an agent end to end — see `scripts/run.md` for why, and what a future automated version would need.
- Five tasks is a small sample. It is not a claim that these five generalize to every screen a real product needs; it is the fixed set the plan calls for, chosen to cover forms, data-heavy UI, marketing, multi-step flow, and composition-heavy dashboards.
- `scripts/score-tokens.ts` is a regex-based scanner, not a Tailwind class parser. It has known blind spots — see the limitations note at the top of `rubric.md`'s token-compliance section.

## Contributing a result

Open a PR that adds one file under `results/` following `results/TEMPLATE.md`, and — if your numbers are strong enough that you want them reflected in the table — a row in `leaderboard.md`. A maintainer reviews for the honesty rules above before merging, not for whether the result looks good for Proper UI.
