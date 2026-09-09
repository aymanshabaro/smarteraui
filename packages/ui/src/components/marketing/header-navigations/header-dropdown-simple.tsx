"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { SimpleResourcesMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu />, menuWidth: "auto" },
    { label: "Services", menu: <SimpleResourcesMenu />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A standard header whose dropdowns are a single column of linked resources. */
export const HeaderDropdownSimple = () => <MarketingHeader items={items} />;
