"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { FourColumnMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <FourColumnMenu />, menuWidth: "container" },
    { label: "Services", menu: <FourColumnMenu />, menuWidth: "container" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <FourColumnMenu />, menuWidth: "container" },
    { label: "About", href: "/about" },
];

/** A standard header whose dropdowns span the full width across four boxed-icon columns and a call-to-action footer. */
export const Header4ColWithFooter = () => <MarketingHeader items={items} />;
