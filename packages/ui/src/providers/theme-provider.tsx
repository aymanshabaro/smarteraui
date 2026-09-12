"use client";

import type { ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

/**
 * Class-based theme provider. Adds `.dark-mode` / `.light-mode` to `<html>`,
 * which is what every semantic token in styles/theme.css keys off.
 * See apps/docs/content/docs/theming.mdx and dark-mode.mdx.
 *
 * This is a thin wrapper around `next-themes`. Despite the package name,
 * `next-themes` has no dependency on Next.js — it reads/writes `localStorage`
 * and toggles a class or attribute on `<html>` using plain DOM APIs, so it
 * works the same way in Vite, CRA, Remix, or any other plain React setup.
 * (`RouterProvider`, exported from `./router-provider` but not re-exported
 * from this package's root `providers` barrel, is the one piece here that
 * *is* Next-specific.)
 *
 * All of `next-themes`' own props pass through via `{...props}` and override
 * the defaults set below, in particular:
 *
 * - `defaultTheme` — theme used before the user (or the system) has picked
 *   one. Defaults to `"system"` here; pass `"light-mode"` or `"dark-mode"`
 *   to start the app on a fixed theme instead.
 * - `forcedTheme` — pins the app to one theme and disables the toggle
 *   entirely (the `useTheme().setTheme` calls become no-ops). Use this for a
 *   light-only or dark-only product, or on a marketing page that must not
 *   follow the app's stored preference.
 * - `enableSystem` — whether `"system"` is an available theme that follows
 *   `prefers-color-scheme`. Defaults to `true`; pass `false` for a
 *   light/dark-only toggle with no "match device" option.
 * - `storageKey` — the `localStorage` key the chosen theme is persisted
 *   under. Defaults to `next-themes`' own `"theme"`; set this if the host
 *   app already uses that key for something else, or if two independent
 *   `ThemeProvider`s on the same origin would otherwise clobber each other.
 * - `attribute` — which `<html>` attribute the resolved theme is written to.
 *   Defaults to `"class"` here (so `.dark-mode`/`.light-mode` land in
 *   `class`, matching `theme.css`'s `.dark-mode` selector and globals.css's
 *   `@custom-variant dark`). Pass `"data-theme"` (or an array mixing both)
 *   only if you also update the selectors those files key off — the two
 *   must stay in sync.
 */
export const ThemeProvider = ({ children, ...props }: ComponentProps<typeof NextThemesProvider>) => (
    <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        value={{ light: "light-mode", dark: "dark-mode" }}
        {...props}
    >
        {children}
    </NextThemesProvider>
);

export { useTheme };
