"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { ProductsMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu />, menuWidth: "auto" },
    { label: "Services", menu: <ProductsMenu />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <ProductsMenu />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A standard header whose dropdowns pair two boxed-icon columns with a call-to-action footer. */
export const HeaderDropdownSimpleTwoColumnsWithFooter = () => <MarketingHeader items={items} />;
