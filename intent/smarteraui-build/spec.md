---
slug: smarteraui-build
status: superseded
updated: 2026-09-09
approved_by: aymanshabaro (chat instruction, 2026-09-09)
---

# Spec

The full specification already exists and is authoritative: `docs/spec/00-foundation/*` (architecture,
tokens, theming, typography, conventions, icons/assets, a11y/testing, docs site, CLI, orchestration) and
one requirement file per task under `docs/spec/01-…06-*`. This file only records decisions that the spec
bundle left open.

## Decisions

1. **Icons** are imported from `@smarteraui/icons` (an npm alias of `@untitledui/icons`), never from
   `@untitledui/icons` directly, so the set can be swapped later.
2. **Demo assets** come only from `packages/ui/src/utils/demo-assets.ts` (SVG placeholders under
   `apps/docs/public/demo/`). Flags are local `/flags/XX.svg` from `flag-icons` (MIT).
3. **Docs MDX contract** is fixed up front in `docs/spec/manifest/AGENT-BRIEF.md` §5 so component agents
   and the docs-shell agent can work concurrently.
4. **Shared-folder tasks are merged** into one agent each (buttons + social/utility/app-store buttons;
   badges + badge groups; radio buttons + radio groups; dropdowns + context menus; inputs + verification
   code inputs; select + multi-select; the four chart tasks; calendars + date pickers; header + sidebar +
   marketing header navigations), because the runbook forbids two in-flight tasks sharing an `owns` glob.
5. **Single working tree**, no per-agent worktrees: tasks own disjoint directories, node_modules and the
   490 MB reference bundle make worktrees impractical, and agents never run git. The orchestrator commits
   per wave. (Deviation from the global SDLC rule 5, justified by the project's own ownership model.)
6. **Tiering:** Sonnet for FREE ports, docs pages, and verification; Opus for PRO components, marketing
   sections, page examples, the docs shell, CLI/registry, and review passes; Haiku for mechanical work.
