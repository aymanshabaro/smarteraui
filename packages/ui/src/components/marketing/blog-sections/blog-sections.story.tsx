import type { FC } from "react";
import * as Demos from "./blog-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Blog sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const BlogSectionExample = () => <Demos.BlogSectionExample />;
BlogSectionExample.storyName = "Blog section example";

export const BlogHeaderFeaturedPost01 = () => {
    const Variant = variantsA["blog-header-featured-post-01"];
    return <Variant />;
};
BlogHeaderFeaturedPost01.storyName = "Featured post 01";

export const BlogHeaderFeaturedPost04 = () => {
    const Variant = variantsA["blog-header-featured-post-04"];
    return <Variant />;
};
BlogHeaderFeaturedPost04.storyName = "Featured post 04";

export const BlogHeaderSimple03 = () => {
    const Variant = variantsA["blog-header-simple-03"];
    return <Variant />;
};
BlogHeaderSimple03.storyName = "Simple 03";

export const BlogHeaderSimple06 = () => {
    const Variant = variantsA["blog-header-simple-06"];
    return <Variant />;
};
BlogHeaderSimple06.storyName = "Simple 06";

export const BlogHeaderAltLayout01 = () => {
    const Variant = variantsA["blog-header-alt-layout-01"];
    return <Variant />;
};
BlogHeaderAltLayout01.storyName = "Alternative layout 01";

export const BlogHeaderAltLayout04 = () => {
    const Variant = variantsA["blog-header-alt-layout-04"];
    return <Variant />;
};
BlogHeaderAltLayout04.storyName = "Alternative layout 04";

export const BlogSectionSimpleCenterAligned01 = () => {
    const Variant = variantsA["blog-section-simple-center-aligned-01"];
    return <Variant />;
};
BlogSectionSimpleCenterAligned01.storyName = "Simple center aligned 01";

export const BlogSectionSplitLayout02 = () => {
    const Variant = variantsA["blog-section-split-layout-02"];
    return <Variant />;
};
BlogSectionSplitLayout02.storyName = "Split layout 02";

export const BlogHeaderFeaturedPost02 = () => {
    const Variant = variantsA["blog-header-featured-post-02"];
    return <Variant />;
};
BlogHeaderFeaturedPost02.storyName = "Featured post 02";

export const BlogHeaderSimple01 = () => {
    const Variant = variantsA["blog-header-simple-01"];
    return <Variant />;
};
BlogHeaderSimple01.storyName = "Simple 01";

export const BlogHeaderSimple04 = () => {
    const Variant = variantsA["blog-header-simple-04"];
    return <Variant />;
};
BlogHeaderSimple04.storyName = "Simple 04";

export const BlogHeaderSidebar01 = () => {
    const Variant = variantsA["blog-header-sidebar-01"];
    return <Variant />;
};
BlogHeaderSidebar01.storyName = "Sidebar 01";

export const BlogHeaderAltLayout02 = () => {
    const Variant = variantsA["blog-header-alt-layout-02"];
    return <Variant />;
};
BlogHeaderAltLayout02.storyName = "Alternative layout 02";

export const BlogSectionSimpleLeftAligned01 = () => {
    const Variant = variantsA["blog-section-simple-left-aligned-01"];
    return <Variant />;
};
BlogSectionSimpleLeftAligned01.storyName = "Simple left aligned 01";

export const BlogSectionSimpleCenterAligned02 = () => {
    const Variant = variantsA["blog-section-simple-center-aligned-02"];
    return <Variant />;
};
BlogSectionSimpleCenterAligned02.storyName = "Simple center aligned 02";

export const BlogSectionCarouselLayout01 = () => {
    const Variant = variantsA["blog-section-carousel-layout-01"];
    return <Variant />;
};
BlogSectionCarouselLayout01.storyName = "Carousel layout 01";

export const BlogHeaderFeaturedPost03 = () => {
    const Variant = variantsA["blog-header-featured-post-03"];
    return <Variant />;
};
BlogHeaderFeaturedPost03.storyName = "Featured post 03";

export const BlogHeaderSimple02 = () => {
    const Variant = variantsA["blog-header-simple-02"];
    return <Variant />;
};
BlogHeaderSimple02.storyName = "Simple 02";

export const BlogHeaderSimple05 = () => {
    const Variant = variantsA["blog-header-simple-05"];
    return <Variant />;
};
BlogHeaderSimple05.storyName = "Simple 05";

export const BlogHeaderSidebar02 = () => {
    const Variant = variantsA["blog-header-sidebar-02"];
    return <Variant />;
};
BlogHeaderSidebar02.storyName = "Sidebar 02";

export const BlogHeaderAltLayout03 = () => {
    const Variant = variantsA["blog-header-alt-layout-03"];
    return <Variant />;
};
BlogHeaderAltLayout03.storyName = "Alternative layout 03";

export const BlogSectionSimpleLeftAligned02 = () => {
    const Variant = variantsA["blog-section-simple-left-aligned-02"];
    return <Variant />;
};
BlogSectionSimpleLeftAligned02.storyName = "Simple left aligned 02";

export const BlogSectionSplitLayout01 = () => {
    const Variant = variantsA["blog-section-split-layout-01"];
    return <Variant />;
};
BlogSectionSplitLayout01.storyName = "Split layout 01";

export const BlogSectionCarouselLayout02 = () => {
    const Variant = variantsA["blog-section-carousel-layout-02"];
    return <Variant />;
};
BlogSectionCarouselLayout02.storyName = "Carousel layout 02";
