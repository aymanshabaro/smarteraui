# @properui/ui

An accessible React 19 component library: base primitives, application patterns, marketing sections and whole page examples, built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/) and [Tailwind CSS v4](https://tailwindcss.com), typed with strict TypeScript.

The package ships **source TSX**: no bundled build. Your app's compiler sees the same code the library authors do, so tree-shaking, source maps and "go to definition" all work, and Tailwind can scan real class names. In exchange, your bundler has to be told to compile it (one line in Next.js, nothing in Vite: see below).

```
src/components/base/                primitives (buttons, inputs, badges, ...)
src/components/application/         app patterns (tables, modals, navigation, charts, ...)
src/components/marketing/           marketing sections (heroes, pricing, footers, ...)
src/components/app-examples/        whole app pages (dashboards, settings, login, ...)
src/components/marketing-examples/  whole marketing pages (landing, pricing, blog, ...)
src/components/foundations/         featured icons, logo, social/payment icons, rating
src/components/shared-assets/       background patterns, illustrations, mockups
src/hooks  src/utils  src/providers  src/styles
```

## Install

```bash
pnpm add @properui/ui
# or: npm install @properui/ui / yarn add @properui/ui
```

Peer dependencies: `react` ^19, `react-dom` ^19, `tailwindcss` ^4.3. `next` ^15.1 is an **optional** peer: only `@properui/ui/providers/router-provider` needs it.

Prefer to own the code instead of depending on the package? The CLI copies components straight into your project, shadcn-style:

```bash
npx @properui/cli@latest init
npx @properui/cli@latest add button input select
```

## Setup: Next.js (App Router)

**1. Transpile the package** (it ships TSX, not compiled JS):

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ["@properui/ui"],
};

export default nextConfig;
```

**2. Import the styles and let Tailwind scan the package** in `app/globals.css`:

```css
@import "@properui/ui/styles/globals.css";
@source "../node_modules/@properui/ui/src/**/*.{ts,tsx}";
```

`globals.css` pulls in Tailwind, the design tokens (`theme.css`), the typography layer and the plugins the components rely on. Adjust the `@source` path so it resolves to `node_modules` from that CSS file (in a monorepo it is usually `../../node_modules/...`).

**3. Wrap the app** in the providers:

```tsx
// app/layout.tsx
import { ThemeProvider } from "@properui/ui/providers";
import { RouterProvider } from "@properui/ui/providers/router-provider";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <RouterProvider>{children}</RouterProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
```

`ThemeProvider` puts `.light-mode` / `.dark-mode` on `<html>`. Every semantic token keys off those. `RouterProvider` wires React Aria's navigation to the Next.js router, so any component that takes `href` does a client-side transition.

## Setup: Vite

```bash
pnpm add @properui/ui @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    // Only needed if you render on the server: keeps the TSX source in the
    // build pipeline instead of externalising it.
    ssr: { noExternal: ["@properui/ui"] },
});
```

```css
/* src/index.css */
@import "@properui/ui/styles/globals.css";
@source "../node_modules/@properui/ui/src/**/*.{ts,tsx}";
```

```tsx
// src/main.tsx
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@properui/ui/providers";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
);
```

`RouterProvider` is Next.js-only. On Vite, use React Aria's own `RouterProvider` from `react-aria-components` with your router's navigate function.

## First component

Import from the root barrel, or from a subpath if you want only what you use:

```tsx
import { Button } from "@properui/ui/components/base/buttons/button";

// or: import { Button } from "@properui/ui";

export function SaveBar() {
    return (
        <div className="flex gap-3">
            <Button color="secondary" size="md">
                Cancel
            </Button>
            <Button color="primary" size="md" onPress={() => console.log("saved")}>
                Save changes
            </Button>
        </div>
    );
}
```

Interactive components are React Aria based, so use `onPress` rather than `onClick` and `isDisabled` rather than `disabled`. Keyboard behaviour, focus management, ARIA wiring and RTL come for free, and each component is covered by unit tests plus axe assertions.

## Theming

The design tokens live in [`src/styles/theme.css`](./src/styles/theme.css) as a Tailwind v4 `@theme` block. Re-branding means overriding the eleven `--color-brand-*` steps in your own CSS after the import. Every semantic token (`bg-brand-solid`, `text-brand-secondary`, ...) cascades from them, in light and dark:

```css
@import "@properui/ui/styles/globals.css";

@theme {
    --color-brand-500: rgb(56 189 248);
    --color-brand-600: rgb(2 132 199);
    --color-brand-700: rgb(3 105 161);
    /* ...the remaining brand steps */
}
```

Dark mode is class-based (`.dark-mode` on `<html>`), driven by `ThemeProvider` (built on `next-themes`); `useTheme` is re-exported from `@properui/ui/providers` for a theme toggle.

## License

MIT © Ayman Shabaro. See [LICENSE](./LICENSE).

Portions of the component library are derived from the MIT-licensed [Untitled UI React](https://www.untitledui.com/react) project; see the `NOTICE` and `LICENSES/` files in the repository root.
