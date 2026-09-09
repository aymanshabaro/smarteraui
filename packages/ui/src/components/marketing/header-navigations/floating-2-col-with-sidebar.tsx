"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { TwoColumnSidebarMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <TwoColumnSidebarMenu />, menuWidth: "auto" },
    { label: "Services", menu: <TwoColumnSidebarMenu />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <TwoColumnSidebarMenu />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A floating header whose dropdowns pair two resource columns with a tutorials sidebar. */
export const Floating2ColWithSidebar = () => <MarketingHeader items={items} isFloating />;
