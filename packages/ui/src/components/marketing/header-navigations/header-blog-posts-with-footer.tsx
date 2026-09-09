"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { BlogPostsFullMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <BlogPostsFullMenu />, menuWidth: "container" },
    { label: "Services", menu: <BlogPostsFullMenu />, menuWidth: "container" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <BlogPostsFullMenu />, menuWidth: "container" },
    { label: "About", href: "/about" },
];

/** A standard header whose full-width dropdowns show a grid of blog posts above an actions footer. */
export const HeaderBlogPostsWithFooter = () => <MarketingHeader items={items} />;
