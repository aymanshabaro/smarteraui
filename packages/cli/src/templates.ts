/**
 * Files `init` writes that the registry does not publish, plus offline fallbacks for the
 * ones it does. The registry has no `providers/*` entry (see report), so the CLI ships the
 * ThemeProvider itself — dependency-free, toggling the `.light-mode` / `.dark-mode` classes
 * every semantic token in styles/theme.css keys off.
 *
 * Spec: docs/theming.md, 09-cli-and-distribution.md.
 */

/** Used only when the registry is unreachable; the real 800-line token set lives in the registry. */
export const THEME_CSS_PLACEHOLDER = `/*
 * Proper UI theme tokens — PLACEHOLDER.
 *
 * The full token set could not be downloaded (the registry was unreachable), so this file
 * only carries enough tokens to keep Tailwind compiling. Replace it with the real theme:
 *
 *   npx @properui/cli add styles --overwrite
 *
 * Spec: docs/theming.md
 */

@theme {
    --font-body: var(--font-inter, "Inter"), -apple-system, "Segoe UI", Roboto, Arial, sans-serif;

    --color-brand-600: rgb(127 86 217);
    --color-brand-700: rgb(105 65 198);

    --color-bg-primary: rgb(255 255 255);
    --color-bg-secondary: rgb(249 250 251);
    --color-bg-brand-solid: var(--color-brand-600);

    --color-text-primary: rgb(16 24 40);
    --color-text-secondary: rgb(71 84 103);

    --color-border-primary: rgb(208 213 221);

    --background-color-primary: var(--color-bg-primary);
    --background-color-secondary: var(--color-bg-secondary);
    --background-color-brand-solid: var(--color-bg-brand-solid);

    --text-color-primary: var(--color-text-primary);
    --text-color-secondary: var(--color-text-secondary);

    --border-color-primary: var(--color-border-primary);
    --ring-color-primary: var(--color-border-primary);
}

@layer base {
    .dark-mode {
        --color-bg-primary: rgb(12 14 18);
        --color-bg-secondary: rgb(22 26 33);
        --color-text-primary: rgb(247 247 247);
        --color-text-secondary: rgb(203 202 204);
        --color-border-primary: rgb(55 58 67);
    }
}
`;

/** Offline fallback for the registry's `cx` entry. Requires the `tailwind-merge` package. */
export const CX_TS_FALLBACK = `import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: ["display-xs", "display-sm", "display-md", "display-lg", "display-xl", "display-2xl"],
        },
    },
});

/**
 * This function is a wrapper around the twMerge function.
 * It is used to merge the classes inside style objects.
 */
export const cx = twMerge;

/**
 * This function does nothing besides helping us to be able to
 * sort the classes inside style objects which is not supported
 * by the Tailwind IntelliSense by default.
 */
export function sortCx<T extends Record<string, string | number | Record<string, string | number | Record<string, string | number>>>>(classes: T): T {
    return classes;
}
`;

export const THEME_PROVIDER_TSX = `"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Class-based theme provider. Adds \`.light-mode\` / \`.dark-mode\` to <html>, which is what
 * every semantic token in styles/theme.css keys off.
 */
export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "properui-theme";

const systemTheme = (): "light" | "dark" =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const readStoredTheme = (fallback: Theme): Theme => {
    if (typeof window === "undefined") return fallback;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system" ? stored : fallback;
};

export const ThemeProvider = ({ children, defaultTheme = "system" }: { children: ReactNode; defaultTheme?: Theme }) => {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

    useEffect(() => setThemeState(readStoredTheme(defaultTheme)), [defaultTheme]);

    useEffect(() => {
        const apply = () => {
            const resolved = theme === "system" ? systemTheme() : theme;
            setResolvedTheme(resolved);
            const root = document.documentElement;
            root.classList.remove("light-mode", "dark-mode");
            root.classList.add(resolved === "dark" ? "dark-mode" : "light-mode");
            root.style.colorScheme = resolved;
        };

        apply();
        if (theme !== "system") return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        media.addEventListener("change", apply);
        return () => media.removeEventListener("change", apply);
    }, [theme]);

    const setTheme = useCallback((next: Theme) => {
        window.localStorage.setItem(STORAGE_KEY, next);
        setThemeState(next);
    }, []);

    const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used inside <ThemeProvider>.");
    return context;
};
`;

/** JavaScript flavour of the provider, for projects without TypeScript. */
export const THEME_PROVIDER_JSX = `"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * Class-based theme provider. Adds \`.light-mode\` / \`.dark-mode\` to <html>, which is what
 * every semantic token in styles/theme.css keys off.
 */
const ThemeContext = createContext(null);

const STORAGE_KEY = "properui-theme";

const systemTheme = () => (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

const readStoredTheme = (fallback) => {
    if (typeof window === "undefined") return fallback;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system" ? stored : fallback;
};

export const ThemeProvider = ({ children, defaultTheme = "system" }) => {
    const [theme, setThemeState] = useState(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = useState("light");

    useEffect(() => setThemeState(readStoredTheme(defaultTheme)), [defaultTheme]);

    useEffect(() => {
        const apply = () => {
            const resolved = theme === "system" ? systemTheme() : theme;
            setResolvedTheme(resolved);
            const root = document.documentElement;
            root.classList.remove("light-mode", "dark-mode");
            root.classList.add(resolved === "dark" ? "dark-mode" : "light-mode");
            root.style.colorScheme = resolved;
        };

        apply();
        if (theme !== "system") return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        media.addEventListener("change", apply);
        return () => media.removeEventListener("change", apply);
    }, [theme]);

    const setTheme = useCallback((next) => {
        window.localStorage.setItem(STORAGE_KEY, next);
        setThemeState(next);
    }, []);

    const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used inside <ThemeProvider>.");
    return context;
};
`;
