"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { SlimCompanyMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <SlimCompanyMenu isCard={false} />, menuWidth: "container" },
    { label: "Services", menu: <SlimCompanyMenu isCard={false} />, menuWidth: "container" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SlimCompanyMenu isCard={false} />, menuWidth: "container" },
    { label: "About", href: "/about" },
];

/** A standard header whose dropdowns span the full width across a single slim row of four boxed-icon entries. */
export const Header4ColSlimWithFooter = () => <MarketingHeader items={items} />;
