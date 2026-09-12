---
"@properui/cli": minor
---

Fixes `init`'s CSS-ordering, honesty and incomplete-provider gaps from the agent feedback map
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
