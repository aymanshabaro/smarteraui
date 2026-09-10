# The shadcn/ui baseline

This is what "the documented shadcn/ui baseline" in the task files and `README.md` actually means, and how to set it up so a comparison against Smart Era UI is fair. The goal is to hold everything constant except the design system: same framework version, same Tailwind major version, same prompt, same model. If any of those differ between the two runs, the result measures the difference, not the design system.

## Versions to pin

Match what Smart Era UI itself targets, read from `packages/ui/package.json` and `apps/docs/package.json` in this repository at the time you run the benchmark (re-check these — they will drift as the project updates):

| Dependency        | Version at time of writing |
| ----------------- | -------------------------- |
| Next.js           | `^15.1.0`                  |
| React / React DOM | `^19`                      |
| Tailwind CSS      | `^4.3.0`                   |
| Node.js           | `>=20`                     |

Both the Smart Era UI run and the shadcn/ui run for a given task must use the same pinned versions of these four. If you're benchmarking a newer Smart Era UI release, re-read its `packages/ui/package.json` and update the baseline to match — don't run Smart Era UI on a newer Next/Tailwind than the baseline gets.

## Setting up the baseline project

```bash
# 1. Scaffold a plain Next.js 15 app with Tailwind already wired up.
npx create-next-app@latest bench-baseline --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd bench-baseline

# 2. Pin the versions from the table above if create-next-app resolved something newer/older.
#    Check package.json, adjust if needed, then reinstall.

# 3. Initialize shadcn/ui using its own CLI — this is the "documented" part: use the
#    installer shadcn/ui ships and publishes docs for, not a hand-rolled copy of its components.
npx shadcn@latest init

# 4. Add the primitives each task is likely to need, using the shadcn CLI, ahead of time.
#    This mirrors how a Smart Era UI project starts with the library "installed" —
#    the baseline should also start with a reasonable set of primitives present, not empty.
npx shadcn@latest add button input label select checkbox switch radio-group \
  tabs form avatar table pagination badge dialog dropdown-menu tooltip \
  progress card separator toast chart
```

Adjust the `add` list per task if a component doesn't exist in shadcn's registry (e.g. shadcn has no `activity-feed` — that's expected and is itself a data point: note in the results report which primitives had no shadcn equivalent and had to be hand-built by the agent).

## What "documented" means here

The agent should be pointed at shadcn/ui's own public documentation the same way it would naturally discover it — i.e. don't hand-curate a cheat sheet of exactly which components to use for the task, since Smart Era UI's condition doesn't get an equivalent cheat sheet beyond what its own `SKILL.md`/`AGENTS.md`/registry search surfaces on its own. Concretely:

- If your agent has web access or an MCP that can read shadcn's docs/registry (shadcn publishes a registry JSON and an MCP server, same as Smart Era UI), let it use that naturally.
- If it doesn't, it works from whatever's already installed in the project (the primitives added in step 4 above) plus its own training knowledge of shadcn/ui — which is a fair comparison, since Smart Era UI's own condition also relies on the agent's ability to discover and use what's installed (via `smarteraui list`, `smarteraui search`, or the registry file, depending on what `agent init` wrote for that tool).
- Do not tell the agent "use the `Tabs` component from shadcn" if the task prompt itself doesn't ask for a component by name. The task prompts in `../tasks/` are deliberately tool-agnostic and component-agnostic; keep it that way for both conditions.

## Fair-comparison checklist before you start a run

- [ ] Both conditions use the same pinned Next.js, React, and Tailwind versions.
- [ ] Both conditions start from a freshly scaffolded project — no leftover files from a previous run.
- [ ] Both conditions receive the exact same prompt text from `../tasks/`, unedited.
- [ ] Both conditions use the same model and the same tool (Claude Code or Codex), for a given run — you're comparing the design system, not the model.
- [ ] Neither condition's project has extra hints in `CLAUDE.md`/`AGENTS.md`/system prompt beyond what each tool's own `init` step naturally writes (Smart Era UI's `agent init` writes a `SKILL.md` + pointer file; the shadcn baseline gets nothing hand-authored beyond its own `init` scaffold).
- [ ] You've recorded which shadcn primitives were pre-installed (step 4) so a reader can tell what the agent had to build itself versus reuse.
