"use client";

import type { ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

/**
 * Class-based theme provider. Adds `.dark-mode` / `.light-mode` to <html>,
 * which is what every semantic token in styles/theme.css keys off.
 * See docs/theming.md
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
