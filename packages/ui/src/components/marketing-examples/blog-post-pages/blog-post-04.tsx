import { sortCx } from "../../../utils/cx";
import { BannerSlimDefaultFullWidth } from "../../marketing/banners/banner-slim-default-full-width";
import { BlogSectionSimpleLeftAligned01 } from "../../marketing/blog-sections/blog-section-simple-left-aligned-01";
import { ContentSplitImage04 } from "../../marketing/content-rich-text-sections/content-split-image-04";
import { CtaAbstractImages } from "../../marketing/cta-sections/cta-abstract-images";
import { FooterLarge11 } from "../../marketing/footers/footer-large-11";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { NewsletterCardHorizontal } from "../../marketing/newsletter-cta-sections/newsletter-card-horizontal";
import { SectionDivider } from "../../shared-assets/section-divider";

const styles = sortCx({
    // The abstract-image CTA above already carries the top padding for this run of sections.
    tightTop: "[&>section]:pt-0",
});

/**
 * Blog post 04 — an announcement banner over an engineering post with a split title image, then the
 * latest posts, an abstract-image call to action, a newsletter card and a trial-CTA footer.
 */
export const BlogPost04 = () => (
    <div className="bg-primary">
        <BannerSlimDefaultFullWidth />

        <HeaderDropdownSimple />

        <main>
            <ContentSplitImage04 />
        </main>

        <SectionDivider />

        <BlogSectionSimpleLeftAligned01 />

        <SectionDivider />

        <CtaAbstractImages />

        <div className={styles.tightTop}>
            <NewsletterCardHorizontal />
        </div>

        <FooterLarge11 />
    </div>
);
