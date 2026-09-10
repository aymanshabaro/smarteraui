---
slug: properui-build
status: superseded
origin: chat
originator: aymanshabaro@gmail.com
created: 2026-09-09
updated: 2026-09-09
approved_by: aymanshabaro (chat instruction, 2026-09-09)
---

# Intent — build the Proper UI kit and library

**What:** implement the whole `properui` design system from the scaffold in
`properui-scaffold_1.tar.gz`: the `@properui/ui` component library (base, application, marketing,
page examples, foundations, shared assets), the docs site (`apps/docs`), the CLI + registry, and the
docs/integration pages — 128 tasks in `docs/spec/manifest/tasks.json`.

**Why:** every Proper app should share one UI, modeled 1:1 on Untitled UI React, re-brandable from a
single token file.

**How (from the originator):** orchestrate as many Opus and Sonnet agents as needed, in parallel;
use Fable only for orchestration and decisions that genuinely need it.

**Out of scope for this pass:** publishing to npm/Vercel, replacing placeholder photos with real brand
photography, the optional MCP server unless time allows.

## Superseded

All 130 tasks in this chain shipped in the `0.1.0` release. Remaining work is tracked as future
improvements in [ROADMAP.md](../../ROADMAP.md); new work starts a fresh intent.
