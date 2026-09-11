import { BlogSectionSimpleLeftAligned02 } from "../../marketing/blog-sections/blog-section-simple-left-aligned-02";
import { ContentLargeImage01 } from "../../marketing/content-rich-text-sections/content-large-image-01";
import { FooterLarge08 } from "../../marketing/footers/footer-large-08";
import { FloatingSimpleWithFooter } from "../../marketing/header-navigations/floating-simple-with-footer";
import { NewsletterSimpleCenteredBrand } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered-brand";
import { SectionDivider } from "../../shared-assets/section-divider";

/**
 * Blog post 02 — a floating header over a tagged post with a full-width hero image, followed by a
 * "from the blog" row, a brand-coloured newsletter band and a dark footer.
 */
export const BlogPost02 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <main>
            <ContentLargeImage01 />
        </main>

        <SectionDivider />

        <BlogSectionSimpleLeftAligned02 />

        <NewsletterSimpleCenteredBrand />

        <div className="dark-mode">
            <FooterLarge08 />
        </div>
    </div>
);
