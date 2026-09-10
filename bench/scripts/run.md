# Manual run protocol

There is no harness that drives Claude Code or Codex programmatically here — both tools are interactive-first, and scripting either one reliably (headless auth, session control, transcript capture) is more infrastructure than a five-task benchmark justifies right now. This is the manual protocol until that changes. Budget 30–60 minutes per task per condition, plus scoring time.

Run this once per **(task, library condition, tool)** triple — e.g. Task 01, Proper UI, Claude Code is one run; Task 01, shadcn/ui, Claude Code is a second, separate run of the same task.

## 1. Fresh app

Scaffold a new project. Never reuse a project from a previous run — leftover files, installed dependencies, or agent memory from an earlier task will contaminate the result.

- **Proper UI condition:** follow the quickstart in the docs (`npx create-next-app@latest`, matching versions in `../baseline/README.md`, then `npx @properui/cli@latest init`).
- **shadcn/ui condition:** follow `../baseline/README.md` exactly.

Confirm the app runs (`pnpm dev`) and builds (`pnpm build`) empty, before the agent touches it. If the empty scaffold doesn't build, fix that first — a build failure caused by scaffolding, not by the agent, would corrupt the compile-success metric.

## 2. Agent init

Give the agent whatever setup step the library documents for that tool, and nothing more:

- **Proper UI:** `npx @properui/cli@latest agent init --client claude` (or `--client codex`), which writes the Skill file and its pointer (`CLAUDE.md` or `AGENTS.md`) into the project.
- **shadcn/ui:** whatever `npx shadcn@latest init` itself sets up. No hand-authored `CLAUDE.md`/`AGENTS.md` beyond that.

Start a fresh agent session/conversation in the project directory. Do not carry over context from a previous task's session.

## 3. Paste the prompt

Open the task file (e.g. `../tasks/01-settings-page.md`), copy the blockquoted prompt text verbatim, and paste it as your first message to the agent. Do not:

- Add extra instructions ("use Tailwind", "make it accessible") beyond what's already in the prompt.
- Answer follow-up questions from the agent with information not in the prompt or the acceptance criteria — if it asks something the prompt doesn't specify, tell it to use its own judgment (or answer minimally and record what you told it in the report; either is fine, but it must be recorded, since it's an input that could differ between conditions).
- Interrupt or redirect mid-task unless the agent is fully stuck (see "Handling failures" below).

Let it run to completion — i.e. until it declares itself done, or it stops making progress.

## 4. Save the transcript

Before doing anything else, save:

- The full conversation transcript (prompts, the agent's responses, and its tool calls/diffs). Most tools have an export or the raw session log — use that rather than a manual copy-paste, so nothing is silently dropped.
- The final state of the generated code (commit it, or copy it out of the working directory).
- Wall-clock start and end time, and (if available) the tool's own token/cost report for the session.

This step happens _before_ scoring, so the record reflects exactly what the agent produced — not a version you've already started fixing.

## 5. Build

```bash
pnpm build
```

Run it exactly as the agent left the code — no edits. Record pass/fail and, on failure, the first error verbatim. This is metric 1 (compile success) in `../rubric.md`.

If it fails, you may _optionally_ continue scoring the other metrics on the failed build (accessibility/keyboard checks can still be meaningful against `pnpm dev` even if the production build fails) — note clearly in the report that compile success was a fail and which other metrics were scored against a non-building app.

## 6. Score it

Work through `../rubric.md` in order:

1. **Compile success** — already done in step 5.
2. **Exact reuse** — compare the final imports against the task file's "Ideal registry entries" list.
3. **Token compliance** — run the scanner against the generated files:
    ```bash
    pnpm exec tsx bench/scripts/score-tokens.ts <path-to-generated-app>/src
    ```
    (Run this from a checkout of this repository, since the script lives here — point its argument at the _baseline/Proper-UI project's_ source directory, wherever that project lives on disk.)
4. **Axe violations** — add a `vitest-axe` (or `@axe-core/playwright`) assertion against the rendered page's default state, and against any additional interactive states the task calls out (e.g. an opened modal). If the generated app has no test setup at all, the fastest path is a small standalone script using `@axe-core/playwright` against the built app running locally.
5. **Manual keyboard pass** — unplug your mouse or just don't touch it; go through the checklist in the task file and in `../rubric.md` §5.
6. **Responsive defects** — resize the browser (or use device emulation) to each of the three viewports in the task file and check the per-viewport checklist in `../rubric.md` §6.
7. **Human repair minutes** — only after 1–6 are fully scored, time yourself fixing what's broken. See `../rubric.md` §7 for exactly when to start/stop the clock.
8. **Latency and cost** — pull from what you saved in step 4.

## 7. Write it up

Copy `../results/TEMPLATE.md` to `../results/<YYYY-MM-DD>-<tool>-<library>-<task-slug>.md` (e.g. `../results/2026-09-10-claude-code-properui-01-settings-page.md`), fill in every field, link or attach the transcript and generated code, and open a PR. See the honesty rules in `../README.md` before you do — a submission that skips them gets removed.

## Handling failures

If the agent gets stuck in a loop, crashes, or produces something wildly incomplete after a reasonable number of turns (use your judgment — there's no fixed turn limit), stop it and record that as the result: "did not complete" is a valid, useful outcome for metric 1 and should be reported like any other, per the honesty rules. Don't quietly restart and only report the attempt that worked — if you restart, report both attempts (see `../README.md` rule 3).

## Toward automation (not built yet)

If this protocol becomes a bottleneck, the next step is likely: a headless invocation mode for whichever tool supports one (both Claude Code and Codex have non-interactive/CLI modes suitable for scripting a single prompt-in, diff-out run), a fixed container image per (Next/Tailwind version) pin, and a script that scaffolds, prompts, builds, and runs the automatable parts of scoring (token compliance, axe) without a human in the loop — leaving only the manual keyboard pass, responsive check, and repair-minutes timing as human steps. That's future work; this file describes what to do until it exists.
