"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Button as AriaButton,
    Dialog as AriaDialog,
    Disclosure as AriaDisclosure,
    DisclosurePanel as AriaDisclosurePanel,
    Modal as AriaModal,
    ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { cx } from "~/lib/cx";
import { SITE_NAME } from "~/lib/site";
import type { SiteNavGroup, SiteNavItem } from "~/lib/site-nav";
import { ChevronDown, Menu02, XClose } from "@properui/icons";
import { Logo } from "./logo";
import { DottedDivider } from "./primitives";
import { SearchTrigger } from "./search";

/**
 * Left sidebar. Group order and membership come from lib/site-nav.ts, which mirrors
 * docs/spec/00-foundation/08-docs-site.md § "Global chrome".
 */

const itemClasses = (isActive: boolean) =>
    cx(
        "group relative flex w-full cursor-pointer items-center rounded-md px-2.5 py-2 outline-focus-ring select-none in-focus:z-10 in-focus:outline-2 in-focus:outline-offset-2 md:px-2 md:py-1.5",
        isActive ? "bg-secondary hover:bg-secondary_hover dark:bg-primary_hover" : "bg-primary hover:bg-primary_hover",
    );

const labelClasses = (isActive: boolean) =>
    cx(
        "z-1 flex-1 truncate text-md font-semibold transition-inherit-all md:text-sm",
        isActive ? "text-secondary" : "text-quaternary group-hover:text-secondary",
    );

const NavLink = ({ item, isActive, onNavigate }: { item: SiteNavItem; isActive: boolean; onNavigate?: () => void }) => {
    if (item.external) {
        return (
            <a href={item.href} target="_blank" rel="noopener noreferrer" className={itemClasses(false)}>
                <span className={labelClasses(false)}>{item.title}</span>
            </a>
        );
    }

    return (
        <Link href={item.href} onClick={onNavigate} aria-current={isActive ? "page" : undefined} className={itemClasses(isActive)}>
            <span className={labelClasses(isActive)}>{item.title}</span>
        </Link>
    );
};

const groupButtonClasses =
    "relative flex w-full cursor-pointer items-center justify-between gap-1 self-start rounded-md pt-2 pr-2.5 pb-3 text-sm font-semibold tracking-[5%] text-primary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover focus:z-1 focus:outline-offset-2 lg:px-2 lg:py-1.5 lg:text-xs";

const NavItems = ({ items, pathname, onNavigate }: { items: SiteNavItem[]; pathname: string; onNavigate?: () => void }) => (
    <ul className="mt-0.5 flex flex-col gap-0.5">
        {items.map((item) =>
            item.items ? (
                <li key={item.title}>
                    <AriaDisclosure className="group/nested flex flex-col" defaultExpanded={item.items.some((child) => child.href === pathname)}>
                        <AriaButton slot="trigger" className={cx(itemClasses(false), "text-left")}>
                            <span className={labelClasses(false)}>{item.title}</span>
                            <ChevronDown className="text-fg-quaternary size-4 shrink-0 transition-transform duration-100 ease-linear group-data-expanded/nested:rotate-180" />
                        </AriaButton>
                        <AriaDisclosurePanel>
                            <NavItems items={item.items} pathname={pathname} onNavigate={onNavigate} />
                        </AriaDisclosurePanel>
                    </AriaDisclosure>
                </li>
            ) : (
                <li key={`${item.title}-${item.href}`}>
                    <NavLink item={item} isActive={item.href === pathname} onNavigate={onNavigate} />
                </li>
            ),
        )}
    </ul>
);

export const SidebarNav = ({ nav, className, onNavigate }: { nav: SiteNavGroup[]; className?: string; onNavigate?: () => void }) => {
    const pathname = usePathname();

    return (
        <div className={cx("scrollbar-hide flex h-full max-h-full flex-col gap-3 px-4 lg:overflow-y-auto lg:px-5 lg:pt-8 lg:pb-12", className)}>
            {nav.map((group, index) => (
                <Fragment key={group.title}>
                    {index > 0 && <DottedDivider className="my-0!" />}
                    <AriaDisclosure className="group/group" defaultExpanded>
                        <AriaButton slot="trigger" className={groupButtonClasses}>
                            {group.title}
                            <ChevronDown className="text-fg-quaternary size-4 shrink-0 transition-transform duration-100 ease-linear group-data-expanded/group:rotate-180" />
                        </AriaButton>
                        <AriaDisclosurePanel>
                            <NavItems items={group.items} pathname={pathname} onNavigate={onNavigate} />
                        </AriaDisclosurePanel>
                    </AriaDisclosure>
                </Fragment>
            ))}
        </div>
    );
};

export const Sidebar = ({ nav }: { nav: SiteNavGroup[] }) => (
    <aside className="border-secondary bg-primary fixed top-0 bottom-0 left-0 z-10 hidden w-62 max-w-full flex-col border-r pt-4 lg:flex">
        <div className="-mb-1 flex items-center justify-between px-5 pb-1">
            <Link
                href="/"
                aria-label={`${SITE_NAME} documentation`}
                className="outline-focus-ring flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
            >
                <Logo />
            </Link>
            <SearchTrigger />
        </div>
        <SidebarNav nav={nav} />
    </aside>
);

/** Hamburger + drawer for viewports below `lg`, where the sidebar is hidden. */
export const MobileNav = ({ nav }: { nav: SiteNavGroup[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <AriaButton
                aria-label="Toggle navigation menu"
                onPress={() => setIsOpen(true)}
                className="group text-fg-quaternary outline-focus-ring hover:bg-primary_hover ml-auto cursor-pointer rounded-lg p-1.5 transition-all duration-100 ease-linear focus-visible:outline-2 lg:hidden"
            >
                <Menu02 className="size-6" />
            </AriaButton>

            <AriaModalOverlay
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                isDismissable
                className="bg-overlay/70 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out fixed inset-0 z-70 backdrop-blur-sm lg:hidden"
            >
                <AriaModal className="entering:animate-in entering:slide-in-from-left exiting:animate-out exiting:slide-out-to-left h-full w-72 max-w-[85vw]">
                    <AriaDialog aria-label="Navigation" className="bg-primary flex h-full flex-col overflow-y-auto pt-4 outline-hidden">
                        <div className="flex items-center justify-between px-5 pb-1">
                            <Logo />
                            <AriaButton
                                aria-label="Close navigation"
                                onPress={() => setIsOpen(false)}
                                className="text-fg-quaternary outline-focus-ring hover:bg-primary_hover cursor-pointer rounded-md p-1.5 focus-visible:outline-2"
                            >
                                <XClose className="size-5" />
                            </AriaButton>
                        </div>
                        <SidebarNav nav={nav} className="pt-6 pb-12" onNavigate={() => setIsOpen(false)} />
                    </AriaDialog>
                </AriaModal>
            </AriaModalOverlay>
        </>
    );
};
