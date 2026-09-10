# Installation

Proper UI can be consumed two ways. Both are supported; pick whichever suits the project.

1. **As a package.** `pnpm add @properui/ui` and import components from their subpaths. Upgrades are a version bump.
2. **As copied-in source.** `npx properui@latest add <component>` writes the component's `.tsx` into your repo. You own
   the code from that point; there is nothing to upgrade unless you ask for it.

Either way the styling setup is the same, because the package ships its stylesheet and token file as source.

## Requirements

- **React 19** and **react-dom 19**
- **Tailwind CSS v4** — the token layer is written entirely in v4 `@theme` syntax. Tailwind v3 is not supported; run
  `npx @tailwindcss/upgrade@latest` first.
- **Node 20+** to run the CLI.
- TypeScript 5.9+ if you're using TypeScript (the components are `.tsx`, but a JS project can consume them fine).

## Install as a package

```bash
pnpm add @properui/ui
# npm install @properui/ui · yarn add @properui/ui · bun add @properui/ui
```

Runtime dependencies (React Aria Components, `tailwind-merge`, `next-themes`, `recharts`, `motion`, `sonner` and the
rest) come with the package. `react`, `react-dom` and `tailwindcss` are peer dependencies you already have.

### Import the stylesheet

`@properui/ui/styles/globals.css` is a complete entry point — it imports Tailwind, the design tokens, the typography
scale, and registers the plugins and custom variants the components rely on:

```css
/* your global stylesheet */
@import "@properui/ui/styles/globals.css";

@source "../node_modules/@properui/ui/src/**/*.{ts,tsx}";
```

The `@source` line matters. Tailwind v4 scans your own source for class names but skips `node_modules`, so without it
every class used inside the library is dropped from the generated CSS. Adjust the relative path so it points at your
project's `node_modules` from wherever that stylesheet lives.

### Framework wiring

- **Next.js** — needs `transpilePackages: ["@properui/ui"]` plus the two providers. See [nextjs.md](./nextjs.md).
- **Vite** — needs the `@tailwindcss/vite` plugin. See [vite.md](./vite.md).

### Import a component

```tsx
import { Button } from "@properui/ui/components/base/buttons/button";

export const Example = () => <Button size="md">Get started</Button>;
```

Subpath imports map one-to-one onto the source tree: `@properui/ui/components/<layer>/<group>/<file>`. A root barrel
also exists (`import { Button } from "@properui/ui"`) which re-exports every component — convenient, but the subpath
keeps bundles smallest.

## Install with the CLI

The CLI copies source into your project instead of adding a dependency.

```bash
npx properui@latest init
```

`init` detects your framework, TypeScript setup, `src/` directory, path alias, Tailwind version and package manager,
then writes `components.json`, the theme token file, `utils/cx.ts`, the Tailwind `@source` line, and wraps your app
entry in `ThemeProvider`. Add `--nextjs` or `--vite` to skip detection, `--manual` to write the files without touching
your entry point, and `-y` to accept every default.

Then add components one at a time:

```bash
npx properui@latest add button
npx properui@latest add button input select table
```

Dependencies are resolved for you — `add badge-groups` also pulls in `badges` and `dot-icon`, because those are its
registry dependencies. Full command reference in [cli.md](./cli.md).

## Manual installation

If you want neither the package nor the CLI, you can set the token layer up by hand and paste components in.

**1. Install the runtime dependencies**

```bash
pnpm add react-aria-components tailwind-merge
pnpm add -D tailwindcss @tailwindcss/typography tailwindcss-react-aria-components tailwindcss-animate
```

Individual components pull in more (`recharts` for charts, `motion` for animated components, `@internationalized/date`
for date pickers, `input-otp` for verification code inputs). Each component page in the docs site lists its own.

**2. Copy the token files**

Copy [`packages/ui/src/styles/theme.css`](../packages/ui/src/styles/theme.css) and
[`typography.css`](../packages/ui/src/styles/typography.css) into your project. `theme.css` is the single file a
re-brand touches — see [theming.md](./theming.md).

**3. Write your global stylesheet**

Mirror [`packages/ui/src/styles/globals.css`](../packages/ui/src/styles/globals.css):

```css
@import "tailwindcss";
@import "./theme.css";
@import "./typography.css";

@plugin "@tailwindcss/typography";
@plugin "tailwindcss-react-aria-components";
@plugin "tailwindcss-animate";

@custom-variant dark (&:where(.dark-mode, .dark-mode *));
@custom-variant label (& [data-label]);
@custom-variant focus-input-within (&:has(input:focus));
```

**4. Add the `cx` utility**

Components merge their style objects through `cx`, a `tailwind-merge` instance that also knows about the `display-*`
text sizes:

```ts
// utils/cx.ts
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: ["display-xs", "display-sm", "display-md", "display-lg", "display-xl", "display-2xl"],
        },
    },
});

export const cx = twMerge;

/** Identity function — it only exists so Tailwind IntelliSense sorts classes inside style objects. */
export function sortCx<T extends Record<string, unknown>>(classes: T): T {
    return classes;
}
```

**5. Copy the components you need**

Take the files from `packages/ui/src/components/...` and fix the `@/` imports to match your aliases.

## Troubleshooting

**Components render unstyled.** The `@source` line is missing or its relative path is wrong. Tailwind is not seeing the
library's class names.

**`Cannot use import statement outside a module` in Next.js.** Add `transpilePackages: ["@properui/ui"]` to
`next.config.ts`; the package publishes TSX, not compiled JS.

**Theme flashes on first paint in Next.js.** Add `suppressHydrationWarning` to `<html>` — `next-themes` sets the theme
class before React hydrates.

**Tailwind v3 errors about `@theme` or `@plugin`.** Proper UI requires Tailwind v4. The CLI stops with upgrade
instructions rather than writing a broken setup.
