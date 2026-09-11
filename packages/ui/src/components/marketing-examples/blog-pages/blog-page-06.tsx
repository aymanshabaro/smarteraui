import { sortCx } from "../../../utils/cx";
import { BlogHeaderFeaturedPost02 } from "../../marketing/blog-sections/blog-header-featured-post-02";
import { CtaCardHorizontal } from "../../marketing/cta-sections/cta-card-horizontal";
import { CtaSimpleCentered } from "../../marketing/cta-sections/cta-simple-centered";
import { FooterLarge15 } from "../../marketing/footers/footer-large-15";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { SocialProofFullWidthDual } from "../../marketing/social-proof-sections/social-proof-full-width-dual";

const styles = sortCx({
    // The article grid already ends the run of padding, so the trial card only keeps its bottom spacing.
    tightTop: "[&>section]:pt-0",
    // Logo proof and the closing footer share the secondary surface.
    onSecondary: "[&>section]:bg-secondary",
    footerOnSecondary: "[&>footer]:bg-secondary",
});

/**
 * Blog page 06 — a featured post above a vertical-tab archive with search, then a trial card,
 * a two-row logo wall, a dark closing call to action and a centered footer.
 */
export const BlogPage06 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <BlogHeaderFeaturedPost02 />

        <div className={styles.tightTop}>
            <CtaCardHorizontal />
        </div>

        <div className={styles.onSecondary}>
            <SocialProofFullWidthDual />
        </div>

        <div className="dark-mode">
            <CtaSimpleCentered />
        </div>

        <div className={styles.footerOnSecondary}>
            <FooterLarge15 />
        </div>
    </div>
);
