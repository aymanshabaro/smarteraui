"use client";

import type { ReactNode } from "react";
import { Bell01, Settings01, Zap } from "@properui/icons";
import { NavButton } from "../../application/app-navigation/base-components/nav-button";
import { HeaderNavigationBase } from "../../application/app-navigation/header-navigation";
import { Button } from "../../base/buttons/button";
import { DropdownAvatar } from "../../base/dropdown/dropdown-avatar";

/** A single entry of the product header navigation. */
export interface HeaderNavItem {
    label: string;
    href: string;
}

/**
 * The default product navigation shown across the informational page variants.
 * Variants that rename a section spread and replace the entry they need, e.g.
 * `[...productNavItems.slice(0, 5), { label: "Messages", href: "/messages" }]`.
 */
export const productNavItems: HeaderNavItem[] = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Tasks", href: "/tasks" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];

/** Replaces one entry of `productNavItems` by index, keeping the rest in place. */
export const navItemsWith = (index: number, item: HeaderNavItem): HeaderNavItem[] => productNavItems.map((navItem, i) => (i === index ? item : navItem));

/** Utility icon buttons (settings + notifications with an unread count) used by the avatar-only headers. */
const UtilityButtons = () => (
    <div className="flex gap-0.5">
        <NavButton icon={Settings01} label="Settings" href="/settings" tooltipPlacement="bottom" />
        <div className="relative">
            <NavButton icon={Bell01} label="Notifications" href="/notifications-01" tooltipPlacement="bottom" />
            <div className="bg-fg-error-primary absolute -end-0.25 -top-0.25 flex size-3.5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                2
            </div>
        </div>
    </div>
);

/**
 * The trailing actions of the header bar.
 * - `account` — the default search / settings / notifications icons plus the "Account" dropdown button.
 * - `avatar` — settings and notification icons plus the account avatar.
 * - `upgrade` — an "Upgrade now" CTA in front of the `avatar` actions.
 */
export type HeaderActionsType = "account" | "avatar" | "upgrade";

const headerActions: Record<HeaderActionsType, ReactNode> = {
    // `undefined` keeps `HeaderNavigationBase`'s own default actions.
    account: undefined,
    avatar: (
        <>
            <UtilityButtons />
            <DropdownAvatar />
        </>
    ),
    upgrade: (
        <>
            <Button size="sm" color="secondary" iconLeading={Zap}>
                Upgrade now
            </Button>
            <UtilityButtons />
            <DropdownAvatar />
        </>
    ),
};

export interface AppHeaderProps {
    /** URL of the currently active nav item. */
    activeUrl?: string;
    /** Primary navigation items. Defaults to `productNavItems`. */
    items?: HeaderNavItem[];
    /** Secondary navigation row. When present the header renders a second bar with a search field. */
    subItems?: HeaderNavItem[];
    /** Which trailing actions to render. */
    actions?: HeaderActionsType;
}

/** The horizontal product header shared by every informational page variant. */
export const AppHeader = ({ activeUrl, items = productNavItems, subItems, actions = "account" }: AppHeaderProps) => (
    <HeaderNavigationBase activeUrl={activeUrl} items={items} subItems={subItems} actions={headerActions[actions]} />
);
