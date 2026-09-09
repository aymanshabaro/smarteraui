import { BlogSectionCarouselLayout01 } from "@/components/marketing/blog-sections/blog-section-carousel-layout-01";
import { ContentSplitImage01 } from "@/components/marketing/content-rich-text-sections/content-split-image-01";
import { CtaCardHorizontal } from "@/components/marketing/cta-sections/cta-card-horizontal";
import { FooterLarge16 } from "@/components/marketing/footers/footer-large-16";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { SectionDivider } from "@/components/shared-assets/section-divider";

/**
 * Blog post 05 — a long-form post with a sticky table of contents beside the body, followed by a
 * carousel of the latest posts, a trial card and a dark footer.
 */
export const BlogPost05 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <ContentSplitImage01 />
        </main>

        <SectionDivider />

        <BlogSectionCarouselLayout01 />

        <SectionDivider />

        <CtaCardHorizontal />

        <div className="dark-mode">
            <FooterLarge16 />
        </div>
    </div>
);
