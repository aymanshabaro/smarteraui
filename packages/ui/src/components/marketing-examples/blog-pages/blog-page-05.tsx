import { sortCx } from "../../../utils/cx";
import { BannerSlimDefaultFullWidth } from "../../marketing/banners/banner-slim-default-full-width";
import { BlogHeaderFeaturedPost03 } from "../../marketing/blog-sections/blog-header-featured-post-03";
import { BlogSectionCarouselLayout02 } from "../../marketing/blog-sections/blog-section-carousel-layout-02";
import { CtaSplitImageQuote02 } from "../../marketing/cta-sections/cta-split-image-quote-02";
import { FooterLarge10 } from "../../marketing/footers/footer-large-10";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

const styles = sortCx({
    // The carousel band sits on the secondary surface between two primary-surface sections.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Blog page 05 — an announcement banner over a subscribe hero and paginated archive, followed by a
 * carousel of recent writings, a customer-quote call to action and a trial-CTA footer.
 */
export const BlogPage05 = () => (
    <div className="bg-primary">
        <BannerSlimDefaultFullWidth />

        <HeaderDropdownSimple />

        <BlogHeaderFeaturedPost03 />

        <div className={styles.onSecondary}>
            <BlogSectionCarouselLayout02 />
        </div>

        <CtaSplitImageQuote02 />

        <FooterLarge10 />
    </div>
);
