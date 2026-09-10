# AGENTS.md

Conventions for an AI assistant working in this repository. Same file Codex reads; Claude Code reads it too.

If you are consuming Smartera UI in **another** project rather than developing the library itself, you only need the
three surfaces under "Fetching components" below.

## Fetching components

Do not write a Smartera UI component from memory. Fetch it.

```bash
curl https://smarteraui.com/llms.txt          # index of every docs page, as plain markdown
curl https://smarteraui.com/r/index.json      # every registry entry: name, layer, type, dependencies
curl https://smarteraui.com/r/buttons.json    # one entry, including its real source
npx smarteraui@latest add buttons date-picker # write the files into the project
```

`add` resolves `registryDependencies`, rewrites `@/` imports to the alias in `components.json` and installs missing npm
packages. Prefer it over hand-copying source out of a registry payload.

## Writing component code

- **React Aria props, not DOM props.** `onPress` not `onClick`, `isDisabled` not `disabled`, `isSelected` not
  `checked`. Interactive components wrap React Aria Components; the DOM prop is silently ignored.
- **Semantic tokens only.** `bg-primary`, `text-tertiary`, `border-secondary`, `bg-brand-solid`. Never a raw palette
  class (`bg-purple-600`), never an arbitrary value (`bg-[#7f56d9]`, `p-[13px]`). The full set is in
  `packages/ui/src/styles/theme.css`.
- **No `dark:` utilities.** A `.dark-mode` class on an ancestor repoints every token. A component written against
  semantic tokens is already correct in both themes; a `dark:` utility is a bug.
- **Logical properties for anything directional.** `ms-*`/`me-*` not `ml-*`/`mr-*`, `ps-*`/`pe-*` not `pl-*`/`pr-*`,
  `start-*`/`end-*` not `left-*`/`right-*`, `text-start` not `text-left`. This is what makes `dir="rtl"` work.
- **Typography is tokenised too.** `text-display-lg`, `text-md` — not `text-4xl`.
- **Icons as component references.** `<Button iconLeading={ArrowRight}>`, not `<Button iconLeading={<ArrowRight />}>`.
  The component applies sizing and the `data-icon` attribute that its own styles target.
- **Import from the subpath** so bundlers keep only what is used:
  `@smarteraui/ui/components/base/buttons/button`.

## Repository conventions

These apply when changing the library itself.

- kebab-case file names; one component group per folder under `packages/ui/src/components/<layer>/`.
- React Aria imports are aliased `Aria*` (`import { Button as AriaButton } from "react-aria-components"`).
- Class lists go through `styles = sortCx({})` from `@smarteraui/ui/utils/cx`.
- Anything a server component may render needs `"use client"` when it exports a function or a compound-component object
  — those cannot cross the RSC boundary.
- Every component ships a demo, a story, a test and a docs page. The test asserts zero axe violations.
- Generated files (barrels, demos, variants, nav, registry) come from `pnpm gen:all`. Edit the generator, not the output.

## Checks

Run these before claiming a change is done. They are what CI runs.

```bash
pnpm type-check     # tsc --noEmit across the workspace
pnpm lint
pnpm prettier:check
pnpm test           # vitest + axe
pnpm build
```

`pnpm test` builds the CLI first via `packages/cli/turbo.json`; a bare `vitest` in `packages/cli` will fail without it.

## Things that are not true

Do not document or generate code against these — they do not exist:

- `smarteraui upgrade` / `smarteraui migrate`. The commands are `init`, `add`, `list`, `search`, `diff`, `login`.
- A browser OAuth flow for `login`. It takes `--token`, or prompts you to paste one.
- An MCP server. It is on the [roadmap](./ROADMAP.md); the CLI covers the same ground today.
- A paid or PRO tier. Everything in this repository is MIT licensed.
