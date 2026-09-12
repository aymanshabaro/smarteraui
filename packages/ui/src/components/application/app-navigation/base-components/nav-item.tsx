"use client";

import type { FC, HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Link as AriaLink } from "react-aria-components";
import { ChevronDown, Share04 } from "@properui/icons";
import { cx, sortCx } from "../../../../utils/cx";
import { Badge } from "../../../base/badges/badges";

const styles = sortCx({
    root: "group relative flex max-h-9 w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
    rootSelected: "bg-secondary hover:bg-secondary_hover",
});

/** Override for the nav item's root and selected-state classes, e.g. to re-brand the accent. */
export interface NavItemBaseClassNames {
    /** Replaces the base root classes (background, hover, focus ring, transition). */
    root?: string;
    /** Replaces the classes applied when `current` is true. */
    rootSelected?: string;
}

export interface NavItemBaseProps {
    /** Whether the nav item shows only an icon. */
    iconOnly?: boolean;
    /** Whether the collapsible nav item is open. */
    open?: boolean;
    /** URL to navigate to when the nav item is clicked. */
    href?: string;
    /** Type of the nav item. */
    type: "link" | "collapsible" | "collapsible-child";
    /** Icon component to display. */
    icon?: FC<HTMLAttributes<HTMLOrSVGElement>>;
    /** Badge to display. */
    badge?: ReactNode;
    /** Whether the nav item is currently active. */
    current?: boolean;
    /** Whether to truncate the label text. */
    truncate?: boolean;
    /** Handler for click events. */
    onClick?: MouseEventHandler;
    /** Content to display. */
    children?: ReactNode;
    /** Extra classes merged onto the item's root element, after every other class. */
    className?: string;
    /** Overrides for the root/selected-state styling, e.g. to re-brand the accent. */
    classNames?: NavItemBaseClassNames;
}

export const NavItemBase = ({ current, type, badge, href, icon: Icon, children, truncate = true, onClick, className, classNames }: NavItemBaseProps) => {
    const rootClassName = classNames?.root ?? styles.root;
    const rootSelectedClassName = classNames?.rootSelected ?? styles.rootSelected;
    const iconElement = Icon && (
        <Icon
            aria-hidden="true"
            className={cx(
                "text-fg-quaternary transition-inherit-all group-hover/item:text-fg-quaternary_hover me-2 size-5 shrink-0",
                current && "text-fg-quaternary_hover",
            )}
        />
    );

    const badgeElement =
        badge && (typeof badge === "string" || typeof badge === "number") ? (
            <Badge className="ms-3" color="gray" type="pill-color" size="sm">
                {badge}
            </Badge>
        ) : (
            badge
        );

    const labelElement = (
        <span
            className={cx(
                "text-secondary transition-inherit-all group-hover/item:text-secondary_hover flex-1 text-sm font-semibold",
                truncate && "truncate",
                current && "text-secondary_hover",
            )}
        >
            {children}
        </span>
    );

    const isExternal = href?.startsWith("http");
    const externalIcon = isExternal && <Share04 aria-hidden="true" className="text-fg-quaternary size-4 stroke-[2.5px]" />;

    if (type === "collapsible") {
        return (
            <summary className={cx("p-2", rootClassName, current && rootSelectedClassName, className)} onClick={onClick}>
                {iconElement}

                {labelElement}

                {badgeElement}

                <ChevronDown aria-hidden="true" className="text-fg-quaternary ms-3 size-4 shrink-0 stroke-[2.5px] in-open:-scale-y-100" />
            </summary>
        );
    }

    if (type === "collapsible-child") {
        return (
            <AriaLink
                href={href!}
                target={isExternal ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={cx("py-2 ps-10 pe-3", rootClassName, current && rootSelectedClassName, className)}
                onClick={onClick}
                aria-current={current ? "page" : undefined}
            >
                {labelElement}
                {externalIcon}
                {badgeElement}
            </AriaLink>
        );
    }

    return (
        <AriaLink
            href={href!}
            target={isExternal ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={cx("group/item p-2", rootClassName, current && rootSelectedClassName, className)}
            onClick={onClick}
            aria-current={current ? "page" : undefined}
        >
            {iconElement}
            {labelElement}
            {externalIcon}
            {badgeElement}
        </AriaLink>
    );
};
