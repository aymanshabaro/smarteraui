"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { ResourcesWithLinksMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <ResourcesWithLinksMenu />, menuWidth: "auto" },
    { label: "Services", menu: <ResourcesWithLinksMenu />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <ResourcesWithLinksMenu />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A floating header whose dropdowns combine a text-link column, two resource columns and an actions footer. */
export const Floating2ColWithLinksAndFooter = () => <MarketingHeader items={items} isFloating />;
