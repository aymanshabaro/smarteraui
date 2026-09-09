"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { FeatureCardMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <FeatureCardMenu />, menuWidth: "auto" },
    { label: "Services", menu: <FeatureCardMenu />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <FeatureCardMenu />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A floating header whose dropdowns pair a resources column with a promotional feature card. */
export const FloatingFeatureCard = () => <MarketingHeader items={items} isFloating />;
