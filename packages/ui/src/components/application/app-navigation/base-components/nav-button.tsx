"use client";

import type { FC, MouseEventHandler, ReactNode } from "react";
import { Pressable as AriaPressable } from "react-aria-components";
import { Tooltip } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";

export interface NavButtonProps {
    /** Whether the collapsible nav item is open. */
    open?: boolean;
    /** URL to navigate to when the button is clicked. */
    href?: string;
    /** Label text for the button. */
    label?: string;
    /** Icon component to display. */
    icon?: FC<{ className?: string }>;
    /** Whether the button is currently active. */
    current?: boolean;
    /** Handler for click events. */
    onClick?: MouseEventHandler;
    /** Additional CSS classes to apply to the button. */
    className?: string;
    /** Placement of the tooltip. */
    tooltipPlacement?: "top" | "right" | "bottom" | "left";
    /** Content to display. */
    children?: ReactNode;
}

export const NavButton = ({ current, label, href, icon: Icon, className, tooltipPlacement = "right", onClick, children }: NavButtonProps) => {
    const iconOnly = !children;

    return (
        <Tooltip isDisabled={!label} title={label} placement={tooltipPlacement}>
            <AriaPressable>
                <a
                    href={href}
                    aria-label={label}
                    aria-current={current ? "page" : undefined}
                    onClick={onClick}
                    className={cx(
                        "group/item bg-primary outline-focus-ring hover:bg-primary_hover relative flex w-full cursor-pointer items-center justify-center gap-1 rounded-md transition duration-100 ease-linear select-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
                        current && "bg-secondary hover:bg-secondary_hover",
                        iconOnly ? "size-9" : "px-2 py-1.5",
                        className,
                    )}
                >
                    {Icon && (
                        <Icon
                            aria-hidden="true"
                            className={cx(
                                "text-fg-quaternary transition-inherit-all group-hover/item:text-fg-quaternary_hover size-5 shrink-0",
                                current && "text-fg-quaternary_hover",
                            )}
                        />
                    )}

                    {children && (
                        <span
                            className={cx(
                                "text-secondary group-hover/item:text-secondary_hover px-0.5 text-sm font-semibold transition duration-100 ease-linear",
                                current && "text-secondary_hover",
                            )}
                        >
                            {children}
                        </span>
                    )}
                </a>
            </AriaPressable>
        </Tooltip>
    );
};
