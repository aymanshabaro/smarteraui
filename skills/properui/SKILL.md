---
name: properui
description: Use when building or editing UI screens, pages, forms, or components in a project that uses (or could use) Proper UI (@properui/ui) — before writing any new JSX/TSX markup by hand. Covers checking the registry for an existing component or full-page example, inspecting the project's Proper UI setup, installing with the CLI instead of hand-copying source, and the accessibility/token/RTL rules the installed code must keep. Trigger on "build a settings page", "add a form", "make a dashboard", "add a button/modal/table", or any request to create or modify UI in a React/Next.js/Vite project.
license: MIT
---

# Proper UI

Proper UI (`@properui/ui`) is a registry of React Aria + Tailwind v4 components distributed as
source, not a runtime package you import blindly. The `properui` CLI copies the files you ask for
into the project and rewrites their imports to fit. Follow these steps, in order, every time UI work
comes up.

## 1. Inspect the project first

Before adding or writing anything, run:

```bash
npx properui@latest info --json
```

This reports whether the project is already set up (framework, Tailwind version, `components.json`
aliases, theme CSS path, which registry entries are already installed, and the installed
`@properui/ui` / `properui` versions). Read it before deciding anything else:

- No `components.json` → run `npx properui@latest init -y` first. Do not hand-write
  `components.json`, `utils/cx.ts`, the theme token file, or the `ThemeProvider` wiring — `init`
  generates all of it correctly for the detected framework.
- `components.json` exists → note the `aliases.components` value (often `@/components`, sometimes a
  project-specific prefix) and use it for every import you write by hand.
- Tailwind is not v4 → `init` will refuse and print an upgrade path. Do not attempt to work around
  this by writing v3-style config.

## 2. Search before creating

Never write a component's markup from memory or invent your own version of something the registry
already has. Check first:

```bash
npx properui@latest search "<what you need>"     # fuzzy match over names, titles, examples
npx properui@latest list --layer base             # browse by layer: base, application, marketing
npx properui@latest list --type example            # full-page examples specifically
```

Only write custom markup when the search genuinely comes up empty. If it does, still build the
custom piece out of already-installed primitives and the same semantic tokens (below) rather than
one-off styling.

## 3. Prefer whole examples for whole screens

- Building a recognizable whole screen (a settings page, a pricing page, an onboarding flow, a
  dashboard, an auth page)? Search `list --type example` / `search` for a matching full-page
  example first and install it with `add example <name>`. Adapt copy and data to the request; don't
  rebuild the layout from primitives when an example already covers it.
- Building or fixing one isolated piece of behavior (a button variant, a single form field, a
  tooltip)? Install the specific primitive(s) with `add <name>` instead of pulling in a whole
  example.

```bash
npx properui@latest add example settings-01
npx properui@latest add button input select
```

`add` resolves `registryDependencies` recursively (installing a component's own component
dependencies), rewrites the library's internal `@/` imports to the project's configured alias, and
reports missing npm packages to install — it does not silently run installs for you. A second `add`
of the same name is a no-op unless you pass `--overwrite`; never pass `--overwrite` on top of a file
a human has since edited without checking `diff` first:

```bash
npx properui@latest diff <name>     # see local modifications before overwriting
```

## 4. Never mix component systems

Once a screen uses Proper UI components, keep using Proper UI components for the rest of that
screen — don't drop in a different UI library's `<Button>` or a hand-rolled equivalent alongside
installed ones. If the project already has another design system in place, ask before introducing
Proper UI into it rather than mixing the two silently.

## 5. Write code that matches the installed conventions

Every file `add` copies in already follows these rules. Any markup you write by hand — glue code, a
page shell, a piece the registry doesn't have — must follow them too:

- **React Aria props, not DOM props.** `onPress` not `onClick`, `isDisabled` not `disabled`,
  `isSelected` not `checked`. These components wrap React Aria Components; a DOM prop is silently
  ignored.
- **Semantic tokens only — never a literal.** `bg-primary`, `text-tertiary`, `border-secondary`,
  `bg-brand-solid`. Never a raw palette class (`bg-purple-600`) and never an arbitrary value
  (`bg-[#7f56d9]`, `p-[13px]`). Typography is tokenised the same way: `text-display-lg`, `text-md`,
  not `text-4xl`. The full token set lives in the project's theme CSS file (path reported by
  `info --json`).
- **No `dark:` utilities.** A `.dark-mode` class on an ancestor repoints every semantic token, so a
  component written against tokens is already correct in both themes. A `dark:` utility is a bug,
  not a stylistic choice.
- **Logical properties for anything directional**, so `dir="rtl"` keeps working: `ms-*`/`me-*` not
  `ml-*`/`mr-*`, `ps-*`/`pe-*` not `pl-*`/`pr-*`, `start-*`/`end-*` not `left-*`/`right-*`,
  `text-start` not `text-left`.
- **Icons as component references.** `<Button iconLeading={ArrowRight}>`, not
  `<Button iconLeading={<ArrowRight />}>` — the component applies its own sizing and the `data-icon`
  attribute its styles target.
- **Import from the component's subpath**, e.g. `@properui/ui/components/base/buttons/button`, so
  bundlers keep only what's used — never a barrel import of the whole library for one component.
- **Preserve what's already there.** Keyboard interaction, focus order, ARIA attributes, and
  responsive breakpoints on installed components are load-bearing. When adapting a copied file,
  change content and composition, not the underlying interaction or accessibility behavior — and
  don't remove a responsive class because a screenshot at one width looked fine without it.

## 6. Verify after installing or editing

Before reporting the work as done, run whatever subset of these the project defines (check
`package.json` scripts — names vary by project, but the checks are the same ones the registry's own
CI runs):

1. Type-check (`tsc --noEmit` or the project's `type-check`/`typecheck` script).
2. Build (`next build`, `vite build`, or the project's `build` script) — catches broken imports from
   alias rewriting.
3. Targeted tests for anything touched, if the project has a test runner configured.

If a check fails because of something `add` did (a missing dependency it reported but that wasn't
installed, for example), fix that before moving on — don't report success with a broken build.

## 7. Report what happened

End every piece of UI work with a short, concrete summary:

- **Files added** — which components/examples were installed, and where (respecting `--path` or the
  project's configured alias directory).
- **Entries reused** — anything `info --json` or `diff` showed was already installed and left alone.
- **Checks run** — which of type-check / build / tests were run, and whether they passed.

This is what lets a human (or the next session) trust the change without re-deriving it.
