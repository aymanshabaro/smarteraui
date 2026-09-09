"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { BlogPostsMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <BlogPostsMenu />, menuWidth: "auto" },
    { label: "Services", menu: <BlogPostsMenu />, menuWidth: "auto" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <BlogPostsMenu />, menuWidth: "auto" },
    { label: "About", href: "/about" },
];

/** A floating header whose dropdowns show a grid of blog posts above an actions footer. */
export const FloatingBlogPostsWithFooter = () => <MarketingHeader items={items} isFloating />;
