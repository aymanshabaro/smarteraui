"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { ThreeColumnSidebarFullMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <ThreeColumnSidebarFullMenu />, menuWidth: "container" },
    { label: "Services", menu: <ThreeColumnSidebarFullMenu />, menuWidth: "container" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <ThreeColumnSidebarFullMenu />, menuWidth: "container" },
    { label: "About", href: "/about" },
];

/** A standard header whose full-width dropdowns pair three resource columns with a promotional feature card. */
export const Header3ColWithSidebar = () => <MarketingHeader items={items} />;
