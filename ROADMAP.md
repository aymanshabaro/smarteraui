# Roadmap

Smartera UI is at `0.1.0`. The component library, the documentation site, the registry and the CLI
all work today. This page lists what is **not** built yet, so nothing in the docs promises something
the code does not do.

Each item links to where it would live. Issues and pull requests are welcome — see
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Not built yet

### MCP server

An MCP server would let an AI coding assistant query the registry directly instead of shelling out
to `npx smarteraui` for every lookup: `search_components`, `get_component`, `list_components`,
`add_component`.

Today the CLI is the supported path and covers the same ground — any assistant that can run shell
commands can drive it. The pieces an MCP server would build on already exist in
[`packages/registry`](./packages/registry) and
[`packages/cli/src/commands`](./packages/cli/src/commands). It would live at `packages/mcp`.

### `init` scaffolding a new project

`smarteraui init` configures an **existing** project: it detects the framework, writes
`components.json`, installs the token stylesheet and wires the theme provider. It does not scaffold
a new project from a template. Use `create-next-app` or `create-vite` first, then run `init`.

### A bundled build for non-bundling consumers

The package ships **source TSX**, which is why Next.js consumers add `transpilePackages` and Vite
consumers get it through their own pipeline. This keeps tree-shaking and Tailwind class detection
simple, and it is what comparable Tailwind component libraries do.

An optional `tsup` ESM build would help consumers whose bundler will not transpile a dependency.
`packages/ui` currently has no `build` script.

### Full RTL coverage

Every component in `packages/ui/src/components` now uses logical properties — zero physical
directional utilities remain. What is still missing is _verification_: no RTL snapshot exists, and
[`.storybook/preview.tsx`](./.storybook/preview.tsx) registers only the light/dark theme switcher,
so there is no direction toggle to eyeball a component in.

### Visual regression testing

`pnpm docs:shot` and `pnpm docs:diff` exist and work against a local run of the docs site, but there
is no committed screenshot baseline and no CI job comparing against one, so visual changes are not
caught automatically. The tooling is in [`scripts/shot.ts`](./scripts/shot.ts) and
[`scripts/diff-shots.ts`](./scripts/diff-shots.ts).

### Variant gallery thumbnails

The variant galleries render a neutral placeholder card where a thumbnail is missing, which is
currently every variant. `pnpm shots:thumbs` generates them into `apps/docs/public/thumbs/` by
rendering each variant's preview route; they are not committed yet.

### `cssVars` in the registry

Every registry entry carries an empty `cssVars` array. The field is reserved for per-component CSS
custom properties the CLI would merge into a consuming app's stylesheet. Components currently rely
entirely on the shared token file, so nothing needs merging — the field exists for when that changes.

## Not planned

- **A paid or "PRO" tier.** Everything in this repository is MIT licensed. There is no paid icon
  package, no gated component set and no account system. The CLI's `login` command exists only to
  store a token for someone self-hosting a private registry.
- **An `upgrade` or `migrate` command.** Copied-in components are yours to edit, so an automatic
  rewrite would fight you. `smarteraui diff` shows what changed against the registry and
  `smarteraui add --overwrite` takes the new version when you want it.
