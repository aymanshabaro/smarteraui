# Roadmap

Proper UI is at `0.1.0`. The component library, the documentation site, the registry and the CLI
all work today. This page lists what is **not** built yet, so nothing in the docs promises something
the code does not do.

Each item links to where it would live. Issues and pull requests are welcome — see
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Not built yet

### MCP server

An MCP server would let an AI coding assistant query the registry directly instead of shelling out
to `npx @properui/cli` for every lookup: `search_components`, `get_component`, `list_components`,
`add_component`.

Today the CLI is the supported path and covers the same ground — any assistant that can run shell
commands can drive it. The pieces an MCP server would build on already exist in
[`packages/registry`](./packages/registry) and
[`packages/cli/src/commands`](./packages/cli/src/commands). It would live at `packages/mcp`.

### `init` scaffolding a new project

`properui init` configures an **existing** project: it detects the framework, writes
`components.json`, installs the token stylesheet and wires the theme provider. It does not scaffold
a new project from a template. Use `create-next-app` or `create-vite` first, then run `init`.

### A bundled build for non-bundling consumers — attempted, not shipped

The package ships **source TSX**, which is why Next.js consumers add `transpilePackages`. A `tsup`
ESM build was built and measured three times; the numbers are recorded here so a fourth attempt
starts from evidence rather than the same assumption.

It does not solve the problem it was meant to solve. With `dist` in place, Next.js **still** needs
`transpilePackages`: a Server Component import reaches `dist` but trips Next's RSC client-only
check, and a Client Component import falls through to `src` and fails on this package's internal
`@/*` alias. Only Vite subpath imports benefit, and Vite users already have a working path.

The cost lands on everyone: the tarball goes from 0.93 MB to 7.6 MB, unpacked 5.9 MB to 42.1 MB,
1,177 files to 5,362. `dist` is 45 MB, of which 27 MB is duplicated chunks — `tsup`'s DTS step runs
in a worker capped near 4 GiB and OOMs on this tree, so the build is split into 47 independent
invocations that cannot share a chunk graph. A full build takes about five hours.

Two real defects surfaced while measuring, and fixing them is the more promising route:

- [`providers/router-provider.tsx`](./packages/ui/src/providers/router-provider.tsx) imports
  `next/navigation` unconditionally, so the root barrel breaks under Vite even from source.
- The package's internal `@/*` alias resolves only through this workspace's tsconfig, which is what
  stops Next.js consuming `src` directly.

### Full RTL coverage

Every component in `packages/ui/src/components` now uses logical properties — zero physical
directional utilities remain. [`.storybook/preview.tsx`](./.storybook/preview.tsx) now registers a
direction (LTR/RTL) toolbar toggle alongside the light/dark theme switcher, and the committed visual
baseline (below) includes `dir="rtl"` captures of a form-heavy page, a dashboard and a marketing
hero, so a physical-property regression is caught the same way a layout regression is.

### Visual regression testing

`pnpm docs:shot` and `pnpm docs:diff` exist and work against a local run of the docs site for
one-off parity checks. Alongside them, a curated ~25-route visual regression baseline is now
committed under [`tests/visual/baseline/`](./tests/visual/baseline/) (light/dark, two viewports, a
handful of RTL passes — see [`tests/visual/routes.ts`](./tests/visual/routes.ts)) and compared on
every PR by the `visual` job in `.github/workflows/ci.yml`, via
[`scripts/visual-baseline.ts`](./scripts/visual-baseline.ts) and
[`scripts/visual-check.ts`](./scripts/visual-check.ts).

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
  rewrite would fight you. `properui diff` shows what changed against the registry and
  `properui add --overwrite` takes the new version when you want it.
