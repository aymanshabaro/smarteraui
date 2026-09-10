---
slug: properui-build
status: superseded
updated: 2026-09-09
approved_by: aymanshabaro (chat instruction, 2026-09-09)
---

# Plan — parallel waves

Source of truth for readiness: `pnpm task:next` over `docs/spec/manifest/tasks.json`. Every agent gets
`docs/spec/manifest/AGENT-BRIEF.md` + its spec file(s). Between waves the orchestrator runs
`pnpm gen:barrels && pnpm gen:demos && pnpm gen:nav && pnpm registry:build && pnpm test`, fixes
integration failures, commits, and marks tasks done.

| Wave        | Agents (model)                                                                                                                                                                                                              | Gate                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| 0 bootstrap | toolchain fixes (sonnet), demo assets (haiku)                                                                                                                                                                               | type-check, lint, prettier, test green |
| 1+2         | DOC-shell (opus); foundations (sonnet); 20 base tasks merged into ~11 agents (sonnet; text-editors and video-players opus)                                                                                                  | gen + test                             |
| 3           | inputs+verification, dropdowns+context-menus, button-groups, textareas, select+multi-select (sonnet); no-dep application tasks: charts×4, breadcrumbs, content-dividers, loading-indicators, pagination, tabs (sonnet/opus) | gen + test                             |
| 4           | remaining application simple (opus for PRO, sonnet for FREE)                                                                                                                                                                | gen + test                             |
| 5           | application composites: modals, drawers, tables, calendars+date-pickers, command-menus, file-uploaders, carousels, navigations (opus/sonnet)                                                                                | gen + test + visual diff sample        |
| 6           | 18 marketing sections (opus, variants split across sub-agents by file)                                                                                                                                                      | gen + test                             |
| 7           | 22 page examples (opus)                                                                                                                                                                                                     | gen + test                             |
| 8           | 20 docs/integration pages (sonnet), CLI + registry (opus)                                                                                                                                                                   | build, storybook build                 |
| 9 verify    | sdlc-verifier (sonnet) full checks; sdlc-reviewer (opus) review passes; visual parity report                                                                                                                                | proof.md                               |

Risks: concurrent agents hammering tsc/vitest on one machine (mitigated by scoped checks); MDX contract
drift (mitigated by AGENT-BRIEF §5); reference copy/asset leakage (mitigated by `pnpm check:assets` and
demo-assets); registry/CLI depend on the final component tree (scheduled last).
