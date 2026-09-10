# Vite

Vite has no server/client split and no framework router to work around, which makes it the simplest target to wire up.

## Install

```bash
pnpm add @properui/ui
pnpm add -D @tailwindcss/vite
```

Or let the CLI do it:

```bash
npx properui@latest init --vite
```

## 1. Register the Tailwind plugin

Tailwind v4 ships a first-class Vite plugin; there is no PostCSS config and no `tailwind.config.js`.

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: { "@": path.resolve(__dirname, "./src") },
    },
});
```

The `@` alias is optional for package consumers, but the CLI writes components that import `@/utils/cx`, so set it up if
you plan to copy components in. Mirror it in `tsconfig.json` so the editor and `tsc` agree:

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": { "@/*": ["./src/*"] }
    }
}
```

## 2. Stylesheet

```css
/* src/index.css */
@import "@properui/ui/styles/globals.css";

@source "../node_modules/@properui/ui/src/**/*.{ts,tsx}";
```

`@properui/ui/styles/globals.css` already imports Tailwind, the tokens, the typography scale and the plugins. The
`@source` line is what makes Tailwind scan the package — Tailwind v4 skips `node_modules` by default, and without it the
components render unstyled. From `src/index.css` the path to your project's `node_modules` is `../node_modules`.

Import it once from your entry:

```ts
// src/main.tsx
import "./index.css";
```

## 3. Providers

**`ThemeProvider`** is framework-agnostic — `next-themes` needs only `localStorage` and a `document`, both of which a
Vite SPA has. Import it from `@properui/ui/providers` and use it as-is.

**`RouterProvider`** from `@properui/ui/providers` is Next-only: it reads `useRouter` from `next/navigation`. In Vite,
use React Aria's own `RouterProvider` and hand it your router's navigate function, so components that accept `href` do a
client-side transition:

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { RouterProvider } from "react-aria-components";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@properui/ui/providers";
import { App } from "./app";
import "./index.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    return (
        <ThemeProvider>
            <RouterProvider navigate={navigate}>{children}</RouterProvider>
        </ThemeProvider>
    );
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Providers>
                <App />
            </Providers>
        </BrowserRouter>
    </StrictMode>,
);
```

No router at all? Drop `RouterProvider` entirely. Every component still renders and behaves correctly — `href` links
just do a full page load.

## 4. Use a component

```tsx
import { Button } from "@properui/ui/components/base/buttons/button";

export const App = () => <Button size="md">Get started</Button>;
```

React Aria components take `onPress` rather than `onClick`, and `isDisabled` rather than `disabled`.

## Theme toggle

```tsx
// src/components/theme-toggle.tsx
import { Moon01, Sun } from "@properui/icons";
import { ButtonUtility } from "@properui/ui/components/base/buttons/button-utility";
import { useTheme } from "@properui/ui/providers";

export const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <ButtonUtility
            aria-label="Toggle dark mode"
            icon={resolvedTheme === "dark" ? Sun : Moon01}
            onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        />
    );
};
```

More in [dark-mode.md](./dark-mode.md).

## Fonts

`theme.css` sets `--font-body` and `--font-display` to `var(--font-inter, "Inter"), …`. Load Inter however you like
(a `<link>` to Google Fonts, `@fontsource/inter`, a self-hosted `@font-face`) and it is picked up. For a different
typeface, override the two tokens in your stylesheet:

```css
@theme {
    --font-body: "Geist", system-ui, sans-serif;
    --font-display: "Geist", system-ui, sans-serif;
}
```

## Troubleshooting

**Everything renders unstyled.** The `@source` line is missing, or its relative path does not reach `node_modules`.

**HMR.** Components are ordinary React function components — Fast Refresh swaps them in place like your own code.

**SSR (vite-plugin-ssr, Remix, TanStack Start).** `ThemeProvider` writes a class before hydration; suppress the
hydration warning on the element that carries it, the same way the Next.js setup does.

## Next steps

- [Theming](./theming.md)
- [Dark mode](./dark-mode.md)
- [RTL](./rtl.md)
