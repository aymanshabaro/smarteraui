import { sortCx } from "../../../utils/cx";
import { BannerSlimBrandFullWidth } from "../../marketing/banners/banner-slim-brand-full-width";
import { ContentLargeImage02 } from "../../marketing/content-rich-text-sections/content-large-image-02";
import { CtaSimpleLogos01 } from "../../marketing/cta-sections/cta-simple-logos-01";
import { FooterLarge08Brand } from "../../marketing/footers/footer-large-08-brand";
import { FloatingSimpleWithFooter } from "../../marketing/header-navigations/floating-simple-with-footer";
import { NewsletterSimpleCentered } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SectionDivider } from "../../shared-assets/section-divider";

const styles = sortCx({
    // The article body already ends the run of padding, so the sign-up keeps only its bottom spacing.
    tightTop: "[&>section]:pt-0",
});

/**
 * Blog post 10 — a brand announcement banner and floating header over a simple article layout,
 * closed by a newsletter sign-up, a logo-wall call to action and a brand-coloured footer.
 */
export const BlogPost10 = () => (
    <div className="bg-primary">
        <BannerSlimBrandFullWidth />

        <FloatingSimpleWithFooter />

        <main>
            <ContentLargeImage02 />
        </main>

        <div className={styles.tightTop}>
            <NewsletterSimpleCentered />
        </div>

        <SectionDivider />

        <CtaSimpleLogos01 />

        <FooterLarge08Brand />
    </div>
);
