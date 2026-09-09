"use client";

import { cx } from "@/utils/cx";
import type { NavItemDividerType, NavItemType } from "../config";
import { NavItemBase } from "./nav-item";

export interface NavListProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** Additional CSS classes to apply to the list. */
    className?: string;
    /** List of items to display. */
    items: (NavItemType | NavItemDividerType)[];
}

export const NavList = ({ activeUrl, items, className }: NavListProps) => {
    const activeItem = items.find((item) => item.href === activeUrl || item.items?.some((subItem) => subItem.href === activeUrl));

    return (
        <ul className={cx("flex flex-col px-4 pt-5", className)}>
            {items.map((item, index) => {
                if (item.divider) {
                    return (
                        <li key={index} className="w-full px-0.5 py-2">
                            <hr className="bg-border-secondary h-px w-full border-none" />
                        </li>
                    );
                }

                if (item.items?.length) {
                    return (
                        // Deviation from the reference: the `<details>` is wrapped in an `<li>` and its
                        // body is a `<div>` rather than a `<dd>`. A `<ul>` may only contain `<li>`
                        // children and a `<dd>` is only valid inside a `<dl>`; both are axe/HTML
                        // validity failures in the reference markup. Neither element carries styles.
                        <li key={item.label} className="py-0.25">
                            <details open={activeItem?.href === item.href} className="appearance-none">
                                <NavItemBase href={item.href} badge={item.badge} icon={item.icon} type="collapsible">
                                    {item.label}
                                </NavItemBase>

                                <div>
                                    <ul className="pb-1">
                                        {item.items.map((childItem) => (
                                            <li key={childItem.label} className="py-0.25">
                                                <NavItemBase
                                                    href={childItem.href}
                                                    badge={childItem.badge}
                                                    type="collapsible-child"
                                                    current={activeUrl === childItem.href}
                                                >
                                                    {childItem.label}
                                                </NavItemBase>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </details>
                        </li>
                    );
                }

                return (
                    <li key={item.label} className="py-px">
                        <NavItemBase type="link" badge={item.badge} icon={item.icon} href={item.href} current={activeUrl === item.href}>
                            {item.label}
                        </NavItemBase>
                    </li>
                );
            })}
        </ul>
    );
};
