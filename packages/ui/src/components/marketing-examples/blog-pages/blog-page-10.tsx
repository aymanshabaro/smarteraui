import { BlogHeaderAltLayout04 } from "@/components/marketing/blog-sections/blog-header-alt-layout-04";
import { BlogSectionSimpleCenterAligned01 } from "@/components/marketing/blog-sections/blog-section-simple-center-aligned-01";
import { FooterLarge08Brand } from "@/components/marketing/footers/footer-large-08-brand";
import { FloatingSimpleWithFooter } from "@/components/marketing/header-navigations/floating-simple-with-footer";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // The latest-posts row already ends the run of padding, so the sign-up keeps only its bottom spacing.
    tightTop: "[&>section]:pt-0",
});

/**
 * Blog page 10 — a floating header over a subscribe hero and paginated archive, then a centered
 * latest-posts row, a newsletter sign-up and a brand-coloured footer.
 */
export const BlogPage10 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <BlogHeaderAltLayout04 />

        <SectionDivider />

        <BlogSectionSimpleCenterAligned01 />

        <div className={styles.tightTop}>
            <NewsletterSimpleCentered />
        </div>

        <FooterLarge08Brand />
    </div>
);
