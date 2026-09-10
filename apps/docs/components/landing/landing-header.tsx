"use client";

import { useRef } from "react";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { GithubMark } from "~/components/brand-icons";
import { ThemeToggle } from "~/components/theme-toggle";
import { X as CloseIcon, Menu02 } from "@properui/icons";
import { Button } from "@properui/ui/components/base/buttons/button";
import { cx, sortCx } from "@properui/ui/utils/cx";
import { REPO_URL } from "./content";
import { LandingLogo } from "./landing-logo";

/**
 * Site header for the landing page.
 *
 * Copied from `marketing/header-navigations/base-components/header.tsx` (the non-floating
 * `HeaderDropdownSimple` shape) and adapted: the library's placeholder dropdowns become plain
 * links into the docs, and the demo "Log in / Sign up" pair becomes the theme control, the
 * repository link and "Get started". Every class recipe is the section's own.
 */

const styles = sortCx({
    link: "flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-sm font-semibold text-secondary outline-focus-ring transition duration-100 ease-linear hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
    mobileLink:
        "text-md text-secondary outline-focus-ring hover:bg-primary_hover block rounded-lg px-3 py-2 font-semibold transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
    popoverMotion: {
        entering: "duration-150 ease-out animate-in fade-in placement-bottom:slide-in-from-top-1",
        exiting: "duration-100 ease-in animate-out fade-out placement-bottom:slide-out-to-top-1",
    },
});

const navItems = [
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/components" },
    { label: "Application UI", href: "/application-ui" },
    { label: "Marketing", href: "/marketing" },
];

export const LandingHeader = () => {
    const headerRef = useRef<HTMLElement>(null);

    return (
        <header ref={headerRef} className="max-md:has-aria-expanded:bg-primary relative flex h-16 w-full items-center justify-center md:h-18">
            <div className="max-w-container flex size-full flex-1 items-center ps-4 pe-3 md:px-8">
                <div className="flex w-full justify-between gap-4">
                    <div className="flex flex-1 items-center gap-5">
                        <a
                            href="/"
                            aria-label="Proper UI home"
                            className="outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <LandingLogo className="h-7" />
                        </a>

                        <nav aria-label="Main" className="max-md:hidden">
                            <ul className="flex items-center gap-0.5">
                                {navItems.map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} className={styles.link}>
                                            <span className="px-0.5">{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <ThemeToggle />
                        <Button
                            color="link-gray"
                            size="sm"
                            href={REPO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            iconLeading={<GithubMark className="size-4" data-icon="true" />}
                        >
                            GitHub
                        </Button>
                        <Button size="sm" href="/docs/installation">
                            Get started
                        </Button>
                    </div>

                    <AriaDialogTrigger>
                        <AriaButton
                            aria-label="Toggle navigation menu"
                            className="group outline-focus-ring ms-auto cursor-pointer rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
                        >
                            <Menu02 aria-hidden="true" className="text-fg-secondary size-6 group-aria-expanded:hidden" />
                            <CloseIcon aria-hidden="true" className="text-fg-secondary hidden size-6 group-aria-expanded:block" />
                        </AriaButton>

                        <AriaPopover
                            placement="bottom"
                            offset={0}
                            triggerRef={headerRef}
                            className={({ isEntering, isExiting }) =>
                                cx(
                                    "z-50 w-(--trigger-width) will-change-transform md:hidden",
                                    isEntering && styles.popoverMotion.entering,
                                    isExiting && styles.popoverMotion.exiting,
                                )
                            }
                        >
                            <AriaDialog aria-label="Navigation menu" className="bg-primary max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 pb-6 outline-hidden">
                                <ul className="border-secondary flex flex-col gap-1 border-t pt-4">
                                    {navItems.map((item) => (
                                        <li key={item.label}>
                                            <a href={item.href} className={styles.mobileLink}>
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                    <li>
                                        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={styles.mobileLink}>
                                            GitHub
                                        </a>
                                    </li>
                                </ul>

                                <div className="mt-5 flex flex-col gap-3">
                                    <Button size="lg" href="/docs/installation">
                                        Get started
                                    </Button>
                                    <Button size="lg" color="secondary" href="/components">
                                        Browse components
                                    </Button>
                                </div>
                            </AriaDialog>
                        </AriaPopover>
                    </AriaDialogTrigger>
                </div>
            </div>
        </header>
    );
};
