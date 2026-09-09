"use client";

import { Bell01, Settings01, Zap } from "@smarteraui/icons";
import { NavButton } from "@/components/application/app-navigation/base-components/nav-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Button } from "@/components/base/buttons/button";
import { DropdownAvatar } from "@/components/base/dropdown/dropdown-avatar";

const subItems = [
    { label: "Overview", href: "/dashboard/overview" },
    { label: "Notifications", href: "/dashboard/notifications" },
    { label: "Analytics", href: "/dashboard/analytics" },
    { label: "Saved reports", href: "/dashboard/saved-reports" },
    { label: "Scheduled reports", href: "/dashboard/scheduled-reports" },
    { label: "User reports", href: "/dashboard/user-reports" },
];

const items = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard", items: subItems },
    { label: "Projects", href: "/projects" },
    { label: "Tasks", href: "/tasks" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];

const simpleItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Tasks", href: "/tasks" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];

const dualTierActions = (
    <>
        <Button iconLeading={Zap} color="secondary" size="sm">
            Upgrade now
        </Button>
        <div className="flex gap-0.5">
            <NavButton icon={Settings01} label="Settings" href="/settings-01" tooltipPlacement="bottom" />
            <div className="relative">
                <NavButton icon={Bell01} label="Notifications" href="/notifications-01" tooltipPlacement="bottom" />
                <div className="bg-fg-error-primary absolute -end-0.25 -top-0.25 flex size-3.5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                    2
                </div>
            </div>
        </div>
        <DropdownAvatar />
    </>
);

export const HeaderNavigationExample = () => <HeaderNavigationBase activeUrl="/dashboard" items={items} actions={dualTierActions} />;

export const Simple = () => <HeaderNavigationBase activeUrl="/dashboard" items={simpleItems} />;

export const DualTier = () => <HeaderNavigationBase activeUrl="/dashboard" items={items} actions={dualTierActions} />;
