"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { TwoColumnLinksFullMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <TwoColumnLinksFullMenu />, menuWidth: "container" },
    { label: "Services", menu: <TwoColumnLinksFullMenu />, menuWidth: "container" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <TwoColumnLinksFullMenu />, menuWidth: "container" },
    { label: "About", href: "/about" },
];

/** A standard header whose full-width dropdowns pair three resource columns with a "get started" link column. */
export const Header2ColWithLinks = () => <MarketingHeader items={items} />;
