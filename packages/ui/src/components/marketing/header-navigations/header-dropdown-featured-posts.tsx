"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { FeaturedPostsMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <FeaturedPostsMenu />, menuWidth: "auto" },
    { label: "Services", menu: <FeaturedPostsMenu />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <FeaturedPostsMenu />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A standard header whose dropdowns pair a resources column with the latest blog posts. */
export const HeaderDropdownFeaturedPosts = () => <MarketingHeader items={items} />;
