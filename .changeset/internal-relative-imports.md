---
"@properui/ui": patch
---

Internal imports under `packages/ui/src` no longer use the `@/…` alias — every specifier is now a
plain relative import (`./cx`, `../../utils/cx`, etc.), converted mechanically across 1,017 files /
4,650 specifiers.

`@/*` resolved only through this workspace's own `tsconfig.json` `paths`, so it never worked for an
external consumer: a scratch Vite app built from a packed tarball failed with `Rolldown failed to
resolve import "@/utils/cx"`, and a Next.js consumer with `transpilePackages` failed its
type-check step on `Cannot find module '@/utils/cx'`. Neither environment has this workspace's
tsconfig, so the alias was unresolvable outside this monorepo.

No consumer-facing import path changes — this only affects imports _within_ the package's own
source, not the public subpath/barrel exports. `npm pack` into a scratch Vite app now builds
importing both a subpath (`@properui/ui/components/base/checkbox/checkbox`) and the root barrel
(`@properui/ui`). Next.js with `transpilePackages` set now compiles and type-checks instead of
failing on the missing module — `transpilePackages` itself is still required (Next does not
transpile TSX from `node_modules` by default), it just actually works now.

The component registry (what `properui add` copies into a consuming project) is unaffected: an
entry's own files still ship `@/…` for any import that crosses from `components/**` into
`utils/**`/`hooks/**` — the one case where the CLI's `--path <dir>` relocation actually changes the
relative distance between two files — so `properui add`'s alias rewrite keeps working exactly as
before. `pnpm test:clean-room` (Vite + Next.js copy-in, end to end) passes.

`packages/ui/tsconfig.json`'s `@/*` path entry and `apps/docs/tsconfig.json`'s `@/*` entry
(pointing at `packages/ui/src`) are removed — neither is referenced by any remaining import.
