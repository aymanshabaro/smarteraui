/**
 * Files `init` writes that the registry does not publish, plus offline fallbacks for the
 * ones it does. The registry now ships a `providers` entry (`theme-provider.tsx`, backed by
 * `next-themes`, and `router-provider.tsx` for Next's App Router) — `init` copies those when
 * the registry is reachable and only falls back to the templates below when it is not.
 *
 * Also mirrors the handful of `packages/ui/src/styles/globals.css` lines a copy-in project
 * needs so the components it copies actually compile: the Tailwind plugins, `@custom-variant`s
 * (including `dark`) and `@utility` blocks. Keep `STYLESHEET_*` below in sync with that file.
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

/** Offline fallback for the registry's `providers` entry, `router-provider.tsx`. */
export const ROUTER_PROVIDER_FALLBACK = `"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RouterProvider as AriaRouterProvider } from "react-aria-components";

declare module "react-aria-components" {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
    }
}

/**
 * Wires React Aria's client-side navigation to the Next.js router so every component that
 * accepts \`href\` performs a client-side transition. The registry was unreachable when this
 * was written; run \`properui add providers --overwrite\` once it is, to pick up any updates.
 */
export const RouterProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    return <AriaRouterProvider navigate={router.push}>{children}</AriaRouterProvider>;
};
`;

/** Used only when the registry is unreachable; the real file lives in the registry's `styles` entry. */
export const TYPOGRAPHY_CSS_PLACEHOLDER = `/*
 * Proper UI typography — PLACEHOLDER.
 *
 * The full stylesheet could not be downloaded (the registry was unreachable). This file is
 * intentionally near-empty so Tailwind still compiles. Replace it with the real one:
 *
 *   npx @properui/cli add styles --overwrite
 *
 * Spec: docs/theming.md
 */
`;

/**
 * Global-stylesheet lines \`init\` mirrors from \`packages/ui/src/styles/globals.css\` so a
 * copy-in project's Tailwind pipeline actually compiles the components it copies: without
 * these, dark mode never activates, the typography/react-aria plugins are missing and two
 * \`@utility\` classes used by copied components do not exist. Keep this block in sync with
 * that file — see docs/theming.md.
 */
export const TAILWIND_IMPORT = '@import "tailwindcss";';

export const STYLESHEET_PLUGIN_LINES = {
    typography: '@plugin "@tailwindcss/typography";',
    reactAria: '@plugin "tailwindcss-react-aria-components";',
    animate: '@plugin "tailwindcss-animate";',
};

/**
 * Whether `packages/ui/src/styles/globals.css` still declares the `tailwindcss-animate`
 * plugin. Flip to `false` (and drop `STYLESHEET_PLUGIN_LINES.animate` from what `init`
 * writes/installs) once animations are self-contained in theme.css and that line is gone.
 */
export const STYLESHEET_INCLUDES_ANIMATE_PLUGIN = true;

export const STYLESHEET_CUSTOM_VARIANTS = [
    "@custom-variant dark (&:where(.dark-mode, .dark-mode *));",
    "@custom-variant label (& [data-label]);",
    "@custom-variant focus-input-within (&:has(input:focus));",
];

export const STYLESHEET_UTILITIES = [
    `@utility scrollbar-hide {
    /* For Webkit-based browsers (Chrome, Safari and Opera) */
    &::-webkit-scrollbar {
        display: none;
        -webkit-appearance: none;
    }

    /* For IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}`,
    `@utility transition-inherit-all {
    transition-property: inherit;
    transition-duration: inherit;
    transition-timing-function: inherit;
}`,
];
