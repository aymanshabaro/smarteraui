import type { FC } from "react";
import * as Demos from "./header-navigations.demo";
import { variants } from "./variants";

export default {
    title: "Marketing components/Header navigations",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const HeaderNavigationExample = () => <Demos.HeaderNavigationExample />;
HeaderNavigationExample.storyName = "Header navigation example";

export const HeaderDropdownSimple = () => {
    const Variant = variants["header-dropdown-simple"];
    return <Variant />;
};
HeaderDropdownSimple.storyName = "Header dropdown simple";

export const HeaderDropdownSimpleTwoColumnsWithFooter = () => {
    const Variant = variants["header-dropdown-simple-two-columns-with-footer"];
    return <Variant />;
};
HeaderDropdownSimpleTwoColumnsWithFooter.storyName = "Header dropdown simple two columns with footer";

export const HeaderDropdownWithTwoColsAndLinksAndFooter = () => {
    const Variant = variants["header-dropdown-with-two-cols-and-links-and-footer"];
    return <Variant />;
};
HeaderDropdownWithTwoColsAndLinksAndFooter.storyName = "Header dropdown with two cols and links and footer";

export const FloatingSimpleWithFooter = () => {
    const Variant = variants["floating-simple-with-footer"];
    return <Variant />;
};
FloatingSimpleWithFooter.storyName = "Floating simple with footer";

export const Header4ColWithFooter = () => {
    const Variant = variants["header-4-col-with-footer"];
    return <Variant />;
};
Header4ColWithFooter.storyName = "Header 4 col with footer";

export const Header4ColSlimWithFooter = () => {
    const Variant = variants["header-4-col-slim-with-footer"];
    return <Variant />;
};
Header4ColSlimWithFooter.storyName = "Header 4 col slim with footer";

export const Floating2ColWithSidebar = () => {
    const Variant = variants["floating-2-col-with-sidebar"];
    return <Variant />;
};
Floating2ColWithSidebar.storyName = "Floating 2 col with sidebar";

export const HeaderDropdownSimpleWithFooter = () => {
    const Variant = variants["header-dropdown-simple-with-footer"];
    return <Variant />;
};
HeaderDropdownSimpleWithFooter.storyName = "Header dropdown simple with footer";

export const Floating2ColWithLinksAndFooter = () => {
    const Variant = variants["floating-2-col-with-links-and-footer"];
    return <Variant />;
};
Floating2ColWithLinksAndFooter.storyName = "Floating 2 col with links and footer";

export const HeaderDropdownFeaturedPosts = () => {
    const Variant = variants["header-dropdown-featured-posts"];
    return <Variant />;
};
HeaderDropdownFeaturedPosts.storyName = "Header dropdown featured posts";

export const Header2ColWithSidebar = () => {
    const Variant = variants["header-2-col-with-sidebar"];
    return <Variant />;
};
Header2ColWithSidebar.storyName = "Header 2 col with sidebar";

export const Header2ColWithLinks = () => {
    const Variant = variants["header-2-col-with-links"];
    return <Variant />;
};
Header2ColWithLinks.storyName = "Header 2 col with links";

export const HeaderBlogPostsWithFooter = () => {
    const Variant = variants["header-blog-posts-with-footer"];
    return <Variant />;
};
HeaderBlogPostsWithFooter.storyName = "Header blog posts with footer";

export const FloatingBlogPostsWithFooter = () => {
    const Variant = variants["floating-blog-posts-with-footer"];
    return <Variant />;
};
FloatingBlogPostsWithFooter.storyName = "Floating blog posts with footer";

export const HeaderDropdownSimpleTwoColumns = () => {
    const Variant = variants["header-dropdown-simple-two-columns"];
    return <Variant />;
};
HeaderDropdownSimpleTwoColumns.storyName = "Header dropdown simple two columns";

export const HeaderDropdownFeatureCard = () => {
    const Variant = variants["header-dropdown-feature-card"];
    return <Variant />;
};
HeaderDropdownFeatureCard.storyName = "Header dropdown feature card";

export const FloatingFeatureCard = () => {
    const Variant = variants["floating-feature-card"];
    return <Variant />;
};
FloatingFeatureCard.storyName = "Header dropdown floating feature card";

export const Header3ColWithSidebar = () => {
    const Variant = variants["header-3-col-with-sidebar"];
    return <Variant />;
};
Header3ColWithSidebar.storyName = "Header 3 col with sidebar";

export const Floating4ColSlimWithFooter = () => {
    const Variant = variants["floating-4-col-slim-with-footer"];
    return <Variant />;
};
Floating4ColSlimWithFooter.storyName = "Floating 4 col slim with footer";

export const HeaderBlogPostsWithSidebar = () => {
    const Variant = variants["header-blog-posts-with-sidebar"];
    return <Variant />;
};
HeaderBlogPostsWithSidebar.storyName = "Header blog posts with sidebar";
