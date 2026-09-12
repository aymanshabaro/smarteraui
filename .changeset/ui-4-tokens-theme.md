---
"@properui/ui": minor
---

Fixes the theming/token gaps from the agent feedback map (2.2 theme.css half, 2.14, 2.15) and
DrivenSellers §3.2/§6:

- `theme.css`'s dark-mode block now wins regardless of whether a consumer imports it before or
  after `@import "tailwindcss"`. Previously it was written as `.dark-mode { ... }` inside
  `@layer base`; Tailwind v4 only wraps `@theme`'s own output in a cascade layer when
  `theme.css` is imported _after_ `tailwindcss`, so an import in the other order left the light
  defaults unlayered and always winning over the layered dark override on cascade-layer terms
  alone, no matter the selector. The block is now unlayered too, with a boosted
  `:root.dark-mode, .dark-mode` selector, so it wins either way (verified by compiling both
  import orders with `@tailwindcss/postcss` and reading `getComputedStyle` in a browser).
- Completes the `success`/`warning` token families to match the existing `error` ones:
  `--ring-color-{success,success_subtle,warning,warning_subtle}`, plus the matching
  `--border-color-*`/`--outline-color-*` pairs, in both light and dark mode. Adds a
  `--text-decoration-color-*` namespace (the theme key Tailwind's `decoration-*` utility
  actually resolves against, verified by compiling `decoration-brand` and comparing against a
  `--decoration-color-*` guess, which produced no rule at all) mirroring the text/border remaps,
  so `decoration-brand`, `decoration-error`, `decoration-success`, `decoration-warning`, etc. all
  resolve instead of silently inheriting `currentColor`.
- Declares `--color-neutral-50…950` and the `red`/`green`/`yellow` steps the semantic layer
  consumes, at their current Tailwind default values, so "re-brand in one file" covers every
  color the system depends on rather than only the eleven `--color-brand-*` lines (values
  unchanged; verified by diffing every affected custom property's compiled value before and
  after). `--font-body`/`--font-display` are now commented as the sanctioned place to set a font
  stack.
- Adds the `animate-in`/`animate-out`/`fade-in`/`fade-out`/`zoom-in-95`/`zoom-out-95`/
  `slide-in-from-*`/`slide-out-to-*` keyframes and utilities that `modal.tsx`, `dropdown.tsx` and
  `mobile-header.tsx` already use, as plain CSS in `theme.css`, so copy-in consumers who don't
  install `tailwindcss-animate` still get the enter/exit animations those components render with.
  `globals.css` keeps the plugin for the npm/monorepo path; verified the two don't conflict when
  both are present (Tailwind merges same-named utilities, and the declarations agree).
- `ThemeProvider`'s JSDoc now documents its `next-themes` passthrough props (`defaultTheme`,
  `forcedTheme`, `enableSystem`, `storageKey`, `attribute`) and that `next-themes` has no Next.js
  dependency, so it works the same way in Vite/plain React. Adds
  `providers/theme-provider.test.tsx` (none existed before).
- `theming.mdx` and `dark-mode.mdx` document all of the above: the declared ramps, the "one file"
  claim stated accurately, the new status token families and `decoration-*` namespace, the
  font-token home, import-order independence, and the `ThemeProvider` prop table.

Not done: no `--color-blue-*`/etc. utility-color ramp was added (only the four the semantic layer
itself consumes — neutral/red/green/yellow); the CLI's `init` template is unaffected by this
change (see 2.13/2.14 for that side).
