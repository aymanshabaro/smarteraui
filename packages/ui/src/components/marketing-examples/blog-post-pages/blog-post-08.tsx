import { BlogSectionSimpleCenterAligned01 } from "@/components/marketing/blog-sections/blog-section-simple-center-aligned-01";
import { ContentSplitImage03 } from "@/components/marketing/content-rich-text-sections/content-split-image-03";
import { CtaScreenMockup01 } from "@/components/marketing/cta-sections/cta-screen-mockup-01";
import { FooterLarge10 } from "@/components/marketing/footers/footer-large-10";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // Newsletter sign-up alternates surfaces with the screenshot band above it.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Blog post 08 — a documentation-style post with a sidebar of contents, contributors and a sign-up,
 * closed by a centered latest-posts row, a product screenshot CTA and a newsletter band.
 */
export const BlogPost08 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <ContentSplitImage03 />
        </main>

        <SectionDivider />

        <BlogSectionSimpleCenterAligned01 />

        <SectionDivider />

        <CtaScreenMockup01 />

        <div className={styles.onSecondary}>
            <NewsletterSimpleCentered />
        </div>

        <FooterLarge10 />
    </div>
);
