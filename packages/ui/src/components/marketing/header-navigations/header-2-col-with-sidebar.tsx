"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { TwoColumnSidebarFullMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <TwoColumnSidebarFullMenu />, menuWidth: "container" },
    { label: "Services", menu: <TwoColumnSidebarFullMenu />, menuWidth: "container" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <TwoColumnSidebarFullMenu />, menuWidth: "container" },
    { label: "About", href: "/about" },
];

/** A standard header whose full-width dropdowns pair two resource columns with a tutorials sidebar. */
export const Header2ColWithSidebar = () => <MarketingHeader items={items} />;
