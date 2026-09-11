# Dark mode

Dark mode is **class-based**, not media-query based, and it is driven entirely by CSS variables.

`globals.css` declares the variant:

```css
@custom-variant dark (&:where(.dark-mode, .dark-mode *));
```

and `theme.css` re-maps every semantic token inside a `.dark-mode { ... }` block. So adding `.dark-mode` anywhere in the
ancestor chain flips the whole subtree. A component written against semantic tokens (`bg-primary`, `text-primary`,
`border-secondary`) is correct in dark mode with **zero** `dark:` utilities of its own.

Reach for an explicit `dark:` utility only for something a token cannot express: swapping an image asset, inverting a
logo mark, a gradient stop with no semantic equivalent. Leave a comment explaining why when you do.

## Whole-app toggle

Wrap the app in `ThemeProvider`. It wraps [`next-themes`](https://github.com/pacocoursey/next-themes) with
`attribute="class"`, `defaultTheme="system"`, `enableSystem`, and a value map of
`{ light: "light-mode", dark: "dark-mode" }`: the two classes the tokens key off. No props are required.

```tsx
// app/layout.tsx
import { ThemeProvider } from "@properui/ui/providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
```

`suppressHydrationWarning` is required: the theme class is written to `<html>` before React hydrates, which is also what
prevents a flash of the wrong theme on first paint.

Every `next-themes` prop is forwarded, so you can change the defaults:

```tsx
<ThemeProvider defaultTheme="dark" enableSystem={false} storageKey="my-app-theme">
    {children}
</ThemeProvider>
```

`ThemeProvider` works outside Next.js too: `next-themes` only needs `localStorage` and a `document`, both of which a
Vite SPA has.

## Reading and setting the theme

`useTheme` is re-exported from the same module:

```tsx
import { useTheme } from "@properui/ui/providers";

const { theme, resolvedTheme, setTheme } = useTheme();
```

- `theme`, what the user chose: `"light"`, `"dark"` or `"system"`.
- `resolvedTheme`: what is actually rendering, with `"system"` resolved.
- `setTheme`: accepts any of the three.

A minimal toggle:

```tsx
"use client";

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

`resolvedTheme` is `undefined` on the server and during the first client render. If your toggle renders a
theme-dependent icon, either accept the one-frame swap or gate the icon on a mounted flag.

## Without `next-themes`

Nothing in the library requires the provider: the tokens only care about the class. Manage it yourself if you prefer:

```ts
const isDark = document.documentElement.classList.toggle("dark-mode");
localStorage.setItem("theme", isDark ? "dark" : "light");
```

Restore it in a blocking inline script in `<head>` so there is no flash before hydration.

## Section-scoped dark mode

Some sections should render permanently dark regardless of the page theme (a dark footer, a dark CTA band). Put
`.dark-mode` on that element instead of hard-coding colours:

```tsx
<section className="dark-mode bg-primary text-primary">
    <Footer />
</section>
```

Everything inside resolves its dark tokens with no prop drilling, because the `dark` variant matches `.dark-mode` at any
depth, not just on `<html>`. `.light-mode` works the same way for a light island on a dark page.

## Writing dark-mode-correct components

- Use semantic tokens for every colour. If a component needs a colour there is no token for, that is usually a sign the
  wrong token is being reached for. Check `theme.css` before adding a `dark:` utility.
- Utility colours (`bg-utility-green-50`, `text-utility-green-700` on badges, chart series colours) are already remapped
  in the `.dark-mode` block; use them rather than raw palette classes.
- Check both modes before opening a PR. In Storybook, use the themes toolbar; in the docs site, use the theme toggle.

## FAQ

**Can light and dark components coexist on one page?** Yes: apply `.dark-mode` or `.light-mode` to any container.

**Do I need to write separate dark styles?** No. Semantic classes resolve to the right value in both themes.

**Does switching cost anything?** Switching flips CSS variable values; it does not duplicate stylesheets or re-render
the tree.

**How do I customise the dark palette?** Edit the `.dark-mode` block in `theme.css`. Each semantic token has a light
value in `@theme` and a dark value there; change one without touching the other.
