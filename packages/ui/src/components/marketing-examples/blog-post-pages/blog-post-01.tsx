import { sortCx } from "../../../utils/cx";
import { BlogSectionSimpleLeftAligned01 } from "../../marketing/blog-sections/blog-section-simple-left-aligned-01";
import { ContentAlternative02 } from "../../marketing/content-rich-text-sections/content-alternative-02";
import { CtaAbstractImages } from "../../marketing/cta-sections/cta-abstract-images";
import { FooterLarge10 } from "../../marketing/footers/footer-large-10";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { NewsletterCardHorizontal } from "../../marketing/newsletter-cta-sections/newsletter-card-horizontal";
import { SectionDivider } from "../../shared-assets/section-divider";

const styles = sortCx({
    // The abstract-image CTA above already carries the top padding for this run of sections.
    tightTop: "[&>section]:pt-0",
});

/**
 * Blog post 01 — an interview laid out as an image collage above the article body, followed by the
 * latest posts, an abstract-image call to action, a newsletter card and a trial-CTA footer.
 */
export const BlogPost01 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <ContentAlternative02 />
        </main>

        <SectionDivider />

        <BlogSectionSimpleLeftAligned01 />

        <SectionDivider />

        <CtaAbstractImages />

        <div className={styles.tightTop}>
            <NewsletterCardHorizontal />
        </div>

        <FooterLarge10 />
    </div>
);
