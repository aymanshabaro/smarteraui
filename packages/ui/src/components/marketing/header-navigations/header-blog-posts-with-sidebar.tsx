"use client";

import type { MarketingNavItemType } from "./base-components/header";
import { MarketingHeader } from "./base-components/header";
import { BlogPostsSidebarFullMenu } from "./base-components/menus";

const items: MarketingNavItemType[] = [
    { label: "Products", menu: <BlogPostsSidebarFullMenu />, menuWidth: "container" },
    { label: "Services", menu: <BlogPostsSidebarFullMenu />, menuWidth: "container" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <BlogPostsSidebarFullMenu />, menuWidth: "container" },
    { label: "About", href: "/about" },
];

/** A standard header whose full-width dropdowns pair a blog-category column with a grid of posts. */
export const HeaderBlogPostsWithSidebar = () => <MarketingHeader items={items} />;
