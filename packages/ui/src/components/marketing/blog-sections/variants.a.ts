import { BlogHeaderAltLayout01 } from "./blog-header-alt-layout-01";
import { BlogHeaderAltLayout02 } from "./blog-header-alt-layout-02";
import { BlogHeaderAltLayout03 } from "./blog-header-alt-layout-03";
import { BlogHeaderAltLayout04 } from "./blog-header-alt-layout-04";
import { BlogHeaderFeaturedPost01 } from "./blog-header-featured-post-01";
import { BlogHeaderFeaturedPost02 } from "./blog-header-featured-post-02";
import { BlogHeaderFeaturedPost03 } from "./blog-header-featured-post-03";
import { BlogHeaderFeaturedPost04 } from "./blog-header-featured-post-04";
import { BlogHeaderSidebar01 } from "./blog-header-sidebar-01";
import { BlogHeaderSidebar02 } from "./blog-header-sidebar-02";
import { BlogHeaderSimple01 } from "./blog-header-simple-01";
import { BlogHeaderSimple02 } from "./blog-header-simple-02";
import { BlogHeaderSimple03 } from "./blog-header-simple-03";
import { BlogHeaderSimple04 } from "./blog-header-simple-04";
import { BlogHeaderSimple05 } from "./blog-header-simple-05";
import { BlogHeaderSimple06 } from "./blog-header-simple-06";
import { BlogSectionCarouselLayout01 } from "./blog-section-carousel-layout-01";
import { BlogSectionCarouselLayout02 } from "./blog-section-carousel-layout-02";
import { BlogSectionSimpleCenterAligned01 } from "./blog-section-simple-center-aligned-01";
import { BlogSectionSimpleCenterAligned02 } from "./blog-section-simple-center-aligned-02";
import { BlogSectionSimpleLeftAligned01 } from "./blog-section-simple-left-aligned-01";
import { BlogSectionSimpleLeftAligned02 } from "./blog-section-simple-left-aligned-02";
import { BlogSectionSplitLayout01 } from "./blog-section-split-layout-01";
import { BlogSectionSplitLayout02 } from "./blog-section-split-layout-02";

/** Part A of the blog section variants, keyed by docs route slug. Merged into `variants.ts` by the orchestrator. */
export const variantsA = {
    "blog-header-featured-post-01": BlogHeaderFeaturedPost01,
    "blog-header-featured-post-04": BlogHeaderFeaturedPost04,
    "blog-header-simple-03": BlogHeaderSimple03,
    "blog-header-simple-06": BlogHeaderSimple06,
    "blog-header-alt-layout-01": BlogHeaderAltLayout01,
    "blog-header-alt-layout-04": BlogHeaderAltLayout04,
    "blog-section-simple-center-aligned-01": BlogSectionSimpleCenterAligned01,
    "blog-section-split-layout-02": BlogSectionSplitLayout02,
    "blog-header-featured-post-02": BlogHeaderFeaturedPost02,
    "blog-header-simple-01": BlogHeaderSimple01,
    "blog-header-simple-04": BlogHeaderSimple04,
    "blog-header-sidebar-01": BlogHeaderSidebar01,
    "blog-header-alt-layout-02": BlogHeaderAltLayout02,
    "blog-section-simple-left-aligned-01": BlogSectionSimpleLeftAligned01,
    "blog-section-simple-center-aligned-02": BlogSectionSimpleCenterAligned02,
    "blog-section-carousel-layout-01": BlogSectionCarouselLayout01,
    "blog-header-featured-post-03": BlogHeaderFeaturedPost03,
    "blog-header-simple-02": BlogHeaderSimple02,
    "blog-header-simple-05": BlogHeaderSimple05,
    "blog-header-sidebar-02": BlogHeaderSidebar02,
    "blog-header-alt-layout-03": BlogHeaderAltLayout03,
    "blog-section-simple-left-aligned-02": BlogSectionSimpleLeftAligned02,
    "blog-section-split-layout-01": BlogSectionSplitLayout01,
    "blog-section-carousel-layout-02": BlogSectionCarouselLayout02,
} as const;
