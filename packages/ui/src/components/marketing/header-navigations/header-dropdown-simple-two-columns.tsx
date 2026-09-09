"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { TwoColumnResourcesMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <TwoColumnResourcesMenu />, menuWidth: "auto" },
    { label: "Services", menu: <TwoColumnResourcesMenu />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <TwoColumnResourcesMenu />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A standard header whose dropdowns are two columns of linked resources. */
export const HeaderDropdownSimpleTwoColumns = () => <MarketingHeader items={items} />;
