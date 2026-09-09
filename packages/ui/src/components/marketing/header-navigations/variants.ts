import type { ComponentType } from "react";
import { Floating2ColWithLinksAndFooter } from "./floating-2-col-with-links-and-footer";
import { Floating2ColWithSidebar } from "./floating-2-col-with-sidebar";
import { Floating4ColSlimWithFooter } from "./floating-4-col-slim-with-footer";
import { FloatingBlogPostsWithFooter } from "./floating-blog-posts-with-footer";
import { FloatingFeatureCard } from "./floating-feature-card";
import { FloatingSimpleWithFooter } from "./floating-simple-with-footer";
import { Header2ColWithLinks } from "./header-2-col-with-links";
import { Header2ColWithSidebar } from "./header-2-col-with-sidebar";
import { Header3ColWithSidebar } from "./header-3-col-with-sidebar";
import { Header4ColSlimWithFooter } from "./header-4-col-slim-with-footer";
import { Header4ColWithFooter } from "./header-4-col-with-footer";
import { HeaderBlogPostsWithFooter } from "./header-blog-posts-with-footer";
import { HeaderBlogPostsWithSidebar } from "./header-blog-posts-with-sidebar";
import { HeaderDropdownFeatureCard } from "./header-dropdown-feature-card";
import { HeaderDropdownFeaturedPosts } from "./header-dropdown-featured-posts";
import { HeaderDropdownSimple } from "./header-dropdown-simple";
import { HeaderDropdownSimpleTwoColumns } from "./header-dropdown-simple-two-columns";
import { HeaderDropdownSimpleTwoColumnsWithFooter } from "./header-dropdown-simple-two-columns-with-footer";
import { HeaderDropdownSimpleWithFooter } from "./header-dropdown-simple-with-footer";
import { HeaderDropdownWithTwoColsAndLinksAndFooter } from "./header-dropdown-with-two-cols-and-links-and-footer";

/** Every header navigation variant, keyed by its docs route slug. */
export const variants = {
    "header-dropdown-simple": HeaderDropdownSimple,
    "header-dropdown-simple-two-columns-with-footer": HeaderDropdownSimpleTwoColumnsWithFooter,
    "header-dropdown-with-two-cols-and-links-and-footer": HeaderDropdownWithTwoColsAndLinksAndFooter,
    "floating-simple-with-footer": FloatingSimpleWithFooter,
    "header-4-col-with-footer": Header4ColWithFooter,
    "header-4-col-slim-with-footer": Header4ColSlimWithFooter,
    "floating-2-col-with-sidebar": Floating2ColWithSidebar,
    "header-dropdown-simple-with-footer": HeaderDropdownSimpleWithFooter,
    "floating-2-col-with-links-and-footer": Floating2ColWithLinksAndFooter,
    "header-dropdown-featured-posts": HeaderDropdownFeaturedPosts,
    "header-2-col-with-sidebar": Header2ColWithSidebar,
    "header-2-col-with-links": Header2ColWithLinks,
    "header-blog-posts-with-footer": HeaderBlogPostsWithFooter,
    "floating-blog-posts-with-footer": FloatingBlogPostsWithFooter,
    "header-dropdown-simple-two-columns": HeaderDropdownSimpleTwoColumns,
    "header-dropdown-feature-card": HeaderDropdownFeatureCard,
    "floating-feature-card": FloatingFeatureCard,
    "header-3-col-with-sidebar": Header3ColWithSidebar,
    "floating-4-col-slim-with-footer": Floating4ColSlimWithFooter,
    "header-blog-posts-with-sidebar": HeaderBlogPostsWithSidebar,
} as const satisfies Record<string, ComponentType>;
