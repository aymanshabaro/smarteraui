# @properui/cli

## 0.2.0

### Minor Changes

- fcdd944: Fixes `init`'s CSS-ordering, honesty and incomplete-provider gaps from the agent feedback map
  (2.2, 2.3, 2.5, 2.6, 2.13, 2.14) and Miraveli F1-F6:

    - **CSS insertion order (2.2).** When the target stylesheet already has `@import "tailwindcss";`,
      everything `init` writes lands immediately _after_ that line, never above it — previously
      prepending broke `.dark-mode` on `<html>` by emitting the theme as unlayered `:root`.
    - **Full stylesheet (Miraveli F3).** `init` now mirrors the whole block a copied component
      needs, not three of twelve lines: the theme _and_ `styles/typography.css` imports, all three
      `@plugin` lines, all three `@custom-variant` lines (including `dark`), both `@utility` blocks,
      and the `@source` line. The plugin packages (`@tailwindcss/typography`,
      `tailwindcss-react-aria-components`, `tailwindcss-animate`) are reported in the install block.
    - **ThemeProvider + RouterProvider from the registry (2.3, 2.14).** `init` no longer writes a
      hand-rolled ThemeProvider; it copies the registry's `next-themes`-based one, and on Next's App
      Router also copies `providers/router-provider.tsx` and wires `<RouterProvider>` inside
      `<ThemeProvider>` in the root layout. Skipped for Vite (React Aria's own works with
      react-router) with a one-line note. New `--no-providers` skips all provider files and wiring
      (Miraveli F5).
    - **Honesty (2.6, Miraveli F1).** `init` collects every npm package the files it wrote need
      (theme plugins, `tailwind-merge`, `next-themes`, `react-aria-components`, and for Vite
      `tailwindcss` + `@tailwindcss/vite`) and prints `Install to finish: <cmd>` as the last thing it
      prints, plus that the project will not build until it runs. New `--install` runs it via the
      detected package manager. Fixed the success line: `Next: npx @properui/cli add buttons badges`
      (buttons, plural — 2.13). `--vite` now also registers `tailwindcss()` in `vite.config.ts`'s
      `plugins` when `@tailwindcss/vite` isn't already configured (Miraveli F2).
    - **Consumer tooling (2.5).** Detects `eslint.config.{js,mjs,ts}` (both a plain array export and
      the variadic `tseslint.config(...)` helper) and `.prettierignore`/a Prettier config, and
      appends an `ignores` entry for the vendored `components/`, `utils/`, `hooks/` and `providers/`
      directories with an explanatory comment, printing what it wrote. New `--no-tooling-ignores`
      skips this.
    - **Transparency (Miraveli F4).** `init` always prints a final "Files written/changed" list.

    `scripts/clean-room.ts` no longer hand-wires the Vite Tailwind plugin (init does it now, backed
    by a real `--install`) and, after `add`, runs the scaffold's own ESLint and a strict
    `npx tsc --noEmit` so a copy-in ESLint/Prettier regression fails the release gate instead of
    shipping quietly.

- fcdd944: Fixes the CLI honesty and dependency-hygiene gaps from the agent feedback map (2.6, 2.7, 2.8,
  2.10, 2.13, 2.21):

    - `info` probes the registry regardless of whether `components.json` exists yet, so
      `registryReachable` reflects the network instead of always being `false` on a fresh project
      (2.7). Its `installed` field now mirrors the new manifest below.
    - `add` records every installed entry in `components.json` under
      `installed: { [name]: { version, files, installedAt } }`. `diff` and `info` read it instead of
      re-scanning the filesystem or the whole registry index. Two new commands use it too:
      `remove <entry...>` deletes an entry's files (only those not shared with another installed
      entry) and reports npm dependencies that may now be orphaned; `why <file|entry>` prints the
      dependency chain that brought something in.
    - `add`'s install block always prints last. When npm dependencies are missing and neither
      `--yes` nor a TTY is available, it now exits non-zero with `Install to finish: <cmd>` as its
      final line instead of silently printing "Skipped install" with exit 0. `--yes` still installs.
      New `--no-optional` skips `optionalRegistryDependencies` (installed by default; the summary
      labels them `(optional)`). New `--with-demos` also writes an entry's `kind: "demo"` files when
      the registry publishes them. Missing npm dependencies are attributed to the specific file that
      needs them when the registry provides per-file `dependencies` (`need recharts
(metrics-chart.tsx)`).
    - `search` applies a real score threshold and prints `no match for "x"` instead of forcing a
      weak match; it also indexes `exports.json` so a query like `combobox` finds `select` (which
      exports `ComboBox` but never says so in its name/title/description) and reports the actual
      file. Counts are now honest: `N docs examples · M files`, and 0-file entries never appear.
      New `icons <query>` (also `search --icons`) fuzzy-searches the icon export index and prints
      the import line.
    - `list` hides 0-file entries and shows a file count per entry.
    - New `check [dir]` scans `.ts`/`.tsx`/`.jsx` files for raw Tailwind palette classes, hardcoded
      `dark:` variants and arbitrary colour values, printing `file:line` and exiting non-zero on any
      hit; the regexes are documented in `--help`.

    All of the above degrades gracefully against a registry built before these fields existed:
    `optionalRegistryDependencies`, per-file `dependencies`/`kind`, `icons.json` and `exports.json`
    are all optional.
