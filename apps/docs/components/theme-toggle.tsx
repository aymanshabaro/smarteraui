"use client";

import { useEffect, useState } from "react";
import {
    Button as AriaButton,
    Menu as AriaMenu,
    MenuItem as AriaMenuItem,
    MenuTrigger as AriaMenuTrigger,
    Popover as AriaPopover,
} from "react-aria-components";
import { Monitor04, Moon01, Sun } from "@properui/icons";
import { useTheme } from "@properui/ui/providers";
import { menuItemClasses, popoverClasses, utilityButtonClasses } from "./primitives";

/**
 * Top-bar Light / Dark / System control.
 * Spec: docs/spec/00-foundation/03-theming-and-dark-mode.md
 */

const OPTIONS = [
    { key: "light", label: "Light", icon: Sun },
    { key: "dark", label: "Dark", icon: Moon01 },
    { key: "system", label: "System", icon: Monitor04 },
] as const;

export const ThemeToggle = () => {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // One-shot hydration flag: next-themes only knows the resolved theme on the client.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Before hydration we do not know the resolved theme; render the light icon so the
    // markup matches the server output and next-themes' blocking script keeps control.
    const Icon = mounted && resolvedTheme === "dark" ? Moon01 : Sun;

    return (
        <AriaMenuTrigger>
            <AriaButton aria-label="Toggle theme" className={utilityButtonClasses()}>
                <Icon className="size-4" data-icon="true" />
            </AriaButton>
            <AriaPopover placement="bottom end" className={popoverClasses}>
                <AriaMenu
                    aria-label="Theme"
                    selectionMode="single"
                    selectedKeys={mounted && theme ? [theme] : []}
                    onAction={(key) => setTheme(String(key))}
                    className="outline-hidden"
                >
                    {OPTIONS.map((option) => (
                        <AriaMenuItem key={option.key} id={option.key} className={menuItemClasses}>
                            <option.icon className="size-4" data-icon="true" />
                            {option.label}
                        </AriaMenuItem>
                    ))}
                </AriaMenu>
            </AriaPopover>
        </AriaMenuTrigger>
    );
};
