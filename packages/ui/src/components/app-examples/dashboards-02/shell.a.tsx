"use client";

// TODO(orchestrator): candidate for components/internal — the page shell shared by every
// `dashboards-02` variant (header navigation config + `<main>` container recipe).
import type { ReactNode } from "react";
import { Bell01, SearchLg, Settings01, Zap } from "@smarteraui/icons";
import { NavButton } from "@/components/application/app-navigation/base-components/nav-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Button } from "@/components/base/buttons/button";
import { DropdownAccountButton } from "@/components/base/dropdown/dropdown-account-button";
import { DropdownAccountCardSM } from "@/components/base/dropdown/dropdown-account-card-sm";
import { DropdownAvatar } from "@/components/base/dropdown/dropdown-avatar";
import { cx } from "@/utils/cx";

/** Primary header navigation shared by all 19 variants of this page example. */
export const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Tasks", href: "/tasks" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];

/** Secondary (dual-tier) navigation shown by the variants that carry a sub header. */
export const subNavItems = [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Notifications", href: "/dashboard/notifications" },
    { label: "Analytics", href: "/dashboard/analytics" },
    { label: "Saved reports", href: "/dashboard/saved-reports" },
    { label: "Scheduled reports", href: "/dashboard/scheduled-reports" },
    { label: "User reports", href: "/dashboard/user-reports" },
];

/** Variant of `subNavItems` used by the cards dashboards, where "Your cards" replaces "Saved reports". */
export const cardsSubNavItems = subNavItems.map((item) => (item.label === "Saved reports" ? { label: "Your cards", href: "/dashboard/your-cards" } : item));

/** The notification bell plus its unread counter. */
const NotificationsButton = () => (
    <div className="relative">
        <NavButton icon={Bell01} label="Notifications" href="/notifications-01" tooltipPlacement="bottom" />
        <div className="bg-fg-error-primary absolute -end-0.25 -top-0.25 flex size-3.5 items-center justify-center rounded-full text-[10px] font-bold text-white">
            2
        </div>
    </div>
);

interface DashboardHeaderProps {
    /** URL of the active primary nav item. */
    activeUrl?: string;
    /** Secondary nav items. Omit for the single-tier variants. */
    subItems?: { label: string; href: string }[];
    /** Renders the "Upgrade now" call to action ahead of the icon buttons. */
    upgrade?: boolean;
    /** Renders the search icon button. */
    search?: boolean;
    /** Renders the settings icon button. @default true */
    settings?: boolean;
    /**
     * Which account control closes the row.
     * - `avatar` — bare avatar dropdown trigger
     * - `button` — secondary "Account" button
     * - `card` — avatar + name card
     * - `none` — no account control
     * @default "avatar"
     */
    account?: "avatar" | "button" | "card" | "none";
}

/**
 * The dual-tier header navigation every `dashboards-02` page sits under, with the
 * per-variant differences in the trailing action row expressed as props.
 */
export const DashboardHeader = ({ activeUrl = "/dashboard", subItems, upgrade, search, settings = true, account = "avatar" }: DashboardHeaderProps) => (
    <HeaderNavigationBase
        activeUrl={activeUrl}
        items={navItems}
        subItems={subItems}
        actions={
            <>
                {upgrade && (
                    <Button iconLeading={Zap} color="secondary" size="sm">
                        Upgrade now
                    </Button>
                )}

                <div className="flex gap-0.5">
                    {search && <NavButton icon={SearchLg} label="Search" href="/search" tooltipPlacement="bottom" />}
                    {settings && <NavButton icon={Settings01} label="Settings" href="/settings" tooltipPlacement="bottom" />}
                    <NotificationsButton />
                </div>

                {account === "avatar" && <DropdownAvatar />}
                {account === "button" && <DropdownAccountButton />}
                {account === "card" && <DropdownAccountCardSM />}
            </>
        }
    />
);

/**
 * The page body: the vertical rhythm the reference uses between the header and the footer of
 * every dashboard.
 */
export const DashboardMain = ({ children, className }: { children: ReactNode; className?: string }) => (
    <main className={cx("bg-primary flex flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24", className)}>{children}</main>
);

/** A horizontally centred content band inside `DashboardMain`. */
export const DashboardSection = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cx("max-w-container mx-auto flex w-full flex-col px-4 lg:px-8", className)}>{children}</div>
);
