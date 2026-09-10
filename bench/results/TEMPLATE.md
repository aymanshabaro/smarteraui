# Run report

Copy this file to `results/<YYYY-MM-DD>-<tool>-<library>-<task-slug>.md` (e.g. `results/2026-09-10-claude-code-properui-01-settings-page.md`) and fill in every field. Read `../README.md`'s honesty rules before submitting — an incomplete report (missing transcript, missing raw output) is not a valid submission.

## Run identity

| Field              | Value                                                                      |
| ------------------ | -------------------------------------------------------------------------- |
| Task               | (e.g. `01-settings-page`)                                                  |
| Library condition  | Proper UI `<version>` / shadcn/ui baseline                                 |
| Tool               | Claude Code / Codex                                                        |
| Model              | exact model name + snapshot/version if the provider exposes one            |
| Date               | YYYY-MM-DD                                                                 |
| Run attempt number | 1 of N (report every attempt if you ran more than one — see honesty rules) |
| Transcript         | link to the saved transcript (gist, branch, or path in this PR)            |
| Generated code     | link to the branch/gist/commit containing the raw, unedited output         |

## 1. Compile success

- Result: pass / fail
- If fail, first build error (verbatim):
    ```

    ```

## 2. Exact reuse

- Ideal set (from the task file): `n` entries
- Reused: `n` entries — list them
- Reused but not on the ideal list (context only, not penalized): list them
- Percentage: `reused / ideal_total = X%`

## 3. Token compliance

Output of `pnpm exec tsx bench/scripts/score-tokens.ts <path>`:

```
(paste raw output here)
```

- `arbitrary-color`: `n`
- `arbitrary-px`: `n`
- `raw-palette`: `n`
- Total: `n`

## 4. Axe violations

- Total violations: `n`
- By impact: critical `n` / serious `n` / moderate `n` / minor `n`
- States tested (default page, opened modal, etc.):
- Raw output (rule id + node count per violation):
    ```

    ```

## 5. Manual keyboard pass

- Universal checklist (from `../rubric.md` §5): `n`/`8` passed
- Task-specific checklist (from the task file): `n`/`m` passed
- Notes on any failure:

## 6. Responsive defects

| Viewport           | Defect count | Notes |
| ------------------ | ------------ | ----- |
| Mobile (375×812)   |              |       |
| Tablet (768×1024)  |              |       |
| Desktop (1440×900) |              |       |

## 7. Human repair minutes

- Minutes: `n`
- What was fixed:
  -
- What was deliberately left unfixed (and why):

## 8. Latency and cost

- Wall-clock time (prompt paste to agent's final message): `n` minutes
- Token usage (if available): input `n` / output `n` / cache `n`
- Tool's own cost estimate (if available): `$n`
- Turn/tool-call count (if easily available): `n`

## Overall notes

Anything a reader needs to interpret these numbers correctly — surprises, judgment calls made during scoring, things the task file should clarify for next time, etc.
