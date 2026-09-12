import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "./theme-provider";

// `setTheme` takes next-themes' own theme keys ("light" | "dark" | "system"), the same as every
// real consumer in this repo (apps/docs/content/docs/dark-mode.mdx, the Next.js and Vite
// integration guides). `ThemeProvider`'s `value` prop maps those keys to the `.light-mode` /
// `.dark-mode` classes this library's tokens key off — the DOM class, not the argument to
// `setTheme`.
const Probe = () => {
    const { theme, setTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <button onClick={() => setTheme("dark")}>dark</button>
            <button onClick={() => setTheme("light")}>light</button>
        </div>
    );
};

afterEach(() => {
    document.documentElement.classList.remove("light-mode", "dark-mode");
    window.localStorage.clear();
});

describe("ThemeProvider", () => {
    it("renders its children", () => {
        render(
            <ThemeProvider>
                <p>hello</p>
            </ThemeProvider>,
        );
        expect(screen.getByText("hello")).not.toBeNull();
    });

    it("applies the mapped `.light-mode`/`.dark-mode` class to <html>, not next-themes' default `light`/`dark`", async () => {
        render(
            <ThemeProvider defaultTheme="light" enableSystem={false}>
                <Probe />
            </ThemeProvider>,
        );

        await waitFor(() => expect(document.documentElement.classList.contains("light-mode")).toBe(true));
        expect(document.documentElement.classList.contains("dark-mode")).toBe(false);
        expect(document.documentElement.classList.contains("light")).toBe(false);
    });

    it("switches the class in response to setTheme", async () => {
        render(
            <ThemeProvider defaultTheme="light" enableSystem={false}>
                <Probe />
            </ThemeProvider>,
        );
        await waitFor(() => expect(document.documentElement.classList.contains("light-mode")).toBe(true));

        act(() => {
            fireEvent.click(screen.getByText("dark"));
        });

        await waitFor(() => expect(document.documentElement.classList.contains("dark-mode")).toBe(true));
        expect(document.documentElement.classList.contains("light-mode")).toBe(false);
    });

    it("honours `forcedTheme` and locks the class regardless of setTheme calls", async () => {
        render(
            <ThemeProvider defaultTheme="light" forcedTheme="light" enableSystem={false}>
                <Probe />
            </ThemeProvider>,
        );
        await waitFor(() => expect(document.documentElement.classList.contains("light-mode")).toBe(true));

        act(() => {
            fireEvent.click(screen.getByText("dark"));
        });

        // forcedTheme keeps the resolved class pinned even after a setTheme call.
        expect(document.documentElement.classList.contains("light-mode")).toBe(true);
        expect(document.documentElement.classList.contains("dark-mode")).toBe(false);
    });

    it("passes through a custom `storageKey`", async () => {
        render(
            <ThemeProvider defaultTheme="light" enableSystem={false} storageKey="properui-theme-test">
                <Probe />
            </ThemeProvider>,
        );
        await waitFor(() => expect(document.documentElement.classList.contains("light-mode")).toBe(true));

        // next-themes persists to `storageKey` when a theme is explicitly set, not merely from
        // `defaultTheme` on mount.
        act(() => {
            fireEvent.click(screen.getByText("dark"));
        });

        await waitFor(() => expect(document.documentElement.classList.contains("dark-mode")).toBe(true));
        expect(window.localStorage.getItem("properui-theme-test")).toBe("dark");
    });
});
