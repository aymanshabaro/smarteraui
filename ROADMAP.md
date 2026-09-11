# Roadmap

Proper UI is at `0.1.0`. The component library, the documentation site, the registry and the CLI
all work today. This page lists what is **not** built yet, so nothing in the docs promises something
the code does not do.

Each item links to where it would live. Issues and pull requests are welcome. See
[CONTRIBUTING.md](./CONTRIBUTING.md).

## Not built yet

### MCP server

An MCP server would let an AI coding assistant query the registry directly instead of shelling out
to `npx @properui/cli` for every lookup: `search_components`, `get_component`, `list_components`,
`add_component`.

Today the CLI is the supported path and covers the same ground: any assistant that can run shell
commands can drive it. The pieces an MCP server would build on already exist in
[`packages/registry`](./packages/registry) and
[`packages/cli/src/commands`](./packages/cli/src/commands). It would live at `packages/mcp`.

### `init` scaffolding a new project

`properui init` configures an **existing** project: it detects the framework, writes
`components.json`, installs the token stylesheet and wires the theme provider. It does not scaffold
a new project from a template. Use `create-next-app` or `create-vite` first, then run `init`.

### A bundled build for non-bundling consumers: attempted, not shipped

The package ships **source TSX**, which is why Next.js consumers add `transpilePackages`. A `tsup`
ESM build was built and measured three times; the numbers are recorded here so a fourth attempt
starts from evidence rather than the same assumption.

It does not solve the problem it was meant to solve. With `dist` in place, Next.js **still** needs
`transpilePackages`: a Server Component import reaches `dist` but trips Next's RSC client-only
check, and a Client Component import falls through to `src` and fails on this package's internal
`@/*` alias. Only Vite subpath imports benefit, and Vite users already have a working path.

The cost lands on everyone: the tarball goes from 0.93 MB to 7.6 MB, unpacked 5.9 MB to 42.1 MB,
1,177 files to 5,362. `dist` is 45 MB, of which 27 MB is duplicated chunks: `tsup`'s DTS step runs
in a worker capped near 4 GiB and OOMs on this tree, so the build is split into 47 independent
invocations that cannot share a chunk graph. A full build takes about five hours.

Two real defects surfaced while measuring, both are now fixed, independently of the bundled build:

- [`providers/router-provider.tsx`](./packages/ui/src/providers/router-provider.tsx) imported
  `next/navigation` unconditionally, breaking the root barrel under Vite even from source.
  `RouterProvider` has since been dropped from the root barrel (`packages/ui/src/index.ts`), so
  importing from the barrel under Vite no longer pulls in `next/navigation`.
- The package's internal `@/*` alias resolved only through this workspace's tsconfig, which stopped
  any external consumer (not just Next.js) from resolving `packages/ui/src`. Every internal
  specifier under `packages/ui/src` is now a relative import (converted by a one-off script; see the
  `@properui/ui` changeset for the count), and `packages/registry/src/build.ts` rewrites the
  relative specifiers that cross from `components/**` into `utils/**`/`hooks/**` back to `@/...` in
  the registry payload it serves, since that crossing is the one case the CLI's `--path` relocation
  actually breaks. `packages/ui/tsconfig.json`'s `paths` entry and `apps/docs/tsconfig.json`'s
  `@/*` entry (pointing at `packages/ui/src`) are gone. Neither was still referenced.

    **This does not make `transpilePackages` optional.** Verified with `npm pack` into scratch Vite
    and Next.js 15 apps: Vite's `vite build` now resolves both a subpath import and the root barrel
    with no config beyond installing the package. Next.js still needs `transpilePackages`. Without
    it, webpack's default loader can't parse the raw TSX/generics syntax this package ships from
    `node_modules` at all (`Module parse failed: Unexpected token`), regardless of the alias. What the
    fix changes is that `transpilePackages` now **works**: before, a Next.js build with
    `transpilePackages` set failed type-checking on `Cannot find module '@/utils/cx'`; now it compiles
    and type-checks cleanly. Separately (and unrelated to the alias): the default `create-next-app`
    tsconfig targets `ES2017`, and one file in this package
    (`components/application/code-snippet/highlight.ts`) uses ES2018 named capture groups in a regex
    literal, so Next's type-check step fails at that target: bumping the consumer's `target` to
    `ES2020`+ (already common) clears it. This is a pre-existing source-compatibility gap, not an
    alias issue.

### Full RTL coverage

Every component in `packages/ui/src/components` now uses logical properties. Zero physical
directional utilities remain. [`.storybook/preview.tsx`](./.storybook/preview.tsx) now registers a
direction (LTR/RTL) toolbar toggle alongside the light/dark theme switcher, and the committed visual
baseline (below) includes `dir="rtl"` captures of a form-heavy page, a dashboard and a marketing
hero, so a physical-property regression is caught the same way a layout regression is.

### Visual regression testing

`pnpm docs:shot` and `pnpm docs:diff` exist and work against a local run of the docs site for
one-off parity checks. Alongside them, a curated ~25-route visual regression baseline is now
committed under [`tests/visual/baseline/`](./tests/visual/baseline/) (light/dark, two viewports, a
handful of RTL passes: see [`tests/visual/routes.ts`](./tests/visual/routes.ts)) and compared on
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
entirely on the shared token file, so nothing needs merging. The field exists for when that changes.

## Not planned

- **A paid or "PRO" tier.** Everything in this repository is MIT licensed. There is no paid icon
  package, no gated component set and no account system. The CLI's `login` command exists only to
  store a token for someone self-hosting a private registry.
- **An `upgrade` or `migrate` command.** Copied-in components are yours to edit, so an automatic
  rewrite would fight you. `properui diff` shows what changed against the registry and
  `properui add --overwrite` takes the new version when you want it.
