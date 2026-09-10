"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { ChevronDown, X as CloseIcon, Menu02 } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";
import { cx, sortCx } from "@/utils/cx";

const styles = sortCx({
    trigger:
        "flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-sm font-semibold text-secondary outline-focus-ring transition duration-100 ease-linear hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2",
    chevron: "size-4 stroke-[2.625px] text-fg-quaternary transition duration-100 ease-linear in-aria-expanded:-rotate-180",
    popoverMotion: {
        entering: "duration-150 ease-out animate-in fade-in placement-bottom:slide-in-from-top-1",
        exiting: "duration-100 ease-in animate-out fade-out placement-bottom:slide-out-to-top-1",
    },
});

export interface MarketingNavItemType {
    /** Label of the nav entry. */
    label: string;
    /** URL for a plain link entry. Ignored when `menu` is set. */
    href?: string;
    /** The dropdown panel. When present the entry renders as a disclosure button. */
    menu?: ReactNode;
    /**
     * How wide the dropdown panel is.
     * - `"auto"` — a floating card sized by its own content, anchored under the trigger.
     * - `"container"` — a full-bleed panel that spans the whole header.
     * @default "auto"
     */
    menuWidth?: "auto" | "container";
}

export interface MarketingHeaderProps {
    /** The primary nav entries. */
    items: MarketingNavItemType[];
    /**
     * Renders the header bar as a floating, rounded card from `md` up.
     * @default false
     */
    isFloating?: boolean;
    /** Additional CSS classes to apply to the header. */
    className?: string;
}

/**
 * The shared chrome for every marketing header navigation: logo, primary nav with dropdown
 * panels, sign-in actions and the mobile disclosure menu.
 */
export const MarketingHeader = ({ items, isFloating = false, className }: MarketingHeaderProps) => {
    const headerRef = useRef<HTMLElement>(null);
    const hasFullWidthMenu = items.some((item) => item.menu && item.menuWidth === "container");
    const buttonSize = isFloating ? "md" : "sm";

    const renderPopover = (item: MarketingNavItemType) => {
        const isFullWidth = item.menuWidth === "container";

        return (
            <AriaPopover
                placement="bottom"
                offset={isFloating ? 8 : 0}
                triggerRef={isFullWidth ? headerRef : undefined}
                className={({ isEntering, isExiting }) =>
                    cx(
                        "z-50 will-change-transform max-md:hidden",
                        isFullWidth ? "w-(--trigger-width)" : "max-w-(--available-width)",
                        isEntering && styles.popoverMotion.entering,
                        isExiting && styles.popoverMotion.exiting,
                    )
                }
            >
                <AriaDialog aria-label={item.label} className="outline-hidden">
                    {item.menu}
                </AriaDialog>
            </AriaPopover>
        );
    };

    return (
        <header
            ref={headerRef}
            className={cx(
                "relative flex w-full items-center justify-center",
                isFloating ? "h-16 md:h-19 md:pt-3" : "h-16 md:h-18",
                hasFullWidthMenu ? "has-aria-expanded:bg-primary" : "max-md:has-aria-expanded:bg-primary",
                className,
            )}
        >
            <div className="max-w-container flex size-full flex-1 items-center ps-4 pe-3 md:px-8">
                <div
                    className={cx(
                        "flex w-full justify-between gap-4",
                        isFloating && "ring-secondary_alt md:bg-primary md:rounded-2xl md:py-3 md:ps-4 md:pe-3 md:shadow-xs md:ring-1",
                    )}
                >
                    <div className="flex flex-1 items-center gap-5">
                        <a
                            href="/"
                            aria-label="Go to homepage"
                            className="outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <ProperLogo className="h-7 md:max-lg:hidden" />
                            <ProperLogoMinimal className="hidden h-7 md:max-lg:block" />
                        </a>

                        <nav aria-label="Main" className="max-md:hidden">
                            <ul className="flex items-center gap-0.5">
                                {items.map((item) => (
                                    <li key={item.label}>
                                        {item.menu ? (
                                            <AriaDialogTrigger>
                                                <AriaButton className={styles.trigger}>
                                                    <span className="px-0.5">{item.label}</span>
                                                    <ChevronDown aria-hidden="true" className={styles.chevron} />
                                                </AriaButton>
                                                {renderPopover(item)}
                                            </AriaDialogTrigger>
                                        ) : (
                                            <a href={item.href} className={styles.trigger}>
                                                <span className="px-0.5">{item.label}</span>
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <Button color="secondary" size={buttonSize} href="/login">
                            Log in
                        </Button>
                        <Button size={buttonSize} href="/signup">
                            Sign up
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
                                    {items.map((item) => (
                                        <li key={item.label}>
                                            {item.menu ? (
                                                <>
                                                    <p className="text-brand-secondary px-3 pt-2 pb-1 text-sm font-semibold">{item.label}</p>
                                                    {item.menu}
                                                </>
                                            ) : (
                                                <a
                                                    href={item.href}
                                                    className="text-md text-secondary outline-focus-ring hover:bg-primary_hover block rounded-lg px-3 py-2 font-semibold transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
                                                >
                                                    {item.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-5 flex flex-col gap-3">
                                    <Button size="lg" href="/signup">
                                        Sign up
                                    </Button>
                                    <Button size="lg" color="secondary" href="/login">
                                        Log in
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
