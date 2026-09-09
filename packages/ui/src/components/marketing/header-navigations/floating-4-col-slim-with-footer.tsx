"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { SlimCompanyMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <SlimCompanyMenu />, menuWidth: "auto" },
    { label: "Services", menu: <SlimCompanyMenu />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SlimCompanyMenu />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A floating header whose dropdowns are a single slim row of four boxed-icon entries above a call-to-action footer. */
export const Floating4ColSlimWithFooter = () => <MarketingHeader items={items} isFloating />;
