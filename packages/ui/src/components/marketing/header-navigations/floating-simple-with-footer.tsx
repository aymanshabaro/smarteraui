"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { SimpleResourcesMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu withFooter />, menuWidth: "auto" },
    { label: "Services", menu: <SimpleResourcesMenu withFooter />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu withFooter />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A floating header whose dropdowns are a single column of resources closed by a "see all" link. */
export const FloatingSimpleWithFooter = () => <MarketingHeader items={items} isFloating />;
