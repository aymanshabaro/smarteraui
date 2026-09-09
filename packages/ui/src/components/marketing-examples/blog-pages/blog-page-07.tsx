import { BlogHeaderFeaturedPost04 } from "@/components/marketing/blog-sections/blog-header-featured-post-04";
import { CtaIphoneMockup02 } from "@/components/marketing/cta-sections/cta-iphone-mockup-02";
import { FooterLarge16 } from "@/components/marketing/footers/footer-large-16";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // The brand hero runs under the header, so the navigation adopts the on-brand foreground colours.
    brandHeader: [
        "[&>header]:bg-brand-section",
        "[&_nav>ul>li>a]:text-secondary_on-brand [&_nav>ul>li>a]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button]:text-secondary_on-brand [&_nav>ul>li>button]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button>svg]:text-fg-white",
    ].join(" "),
    // Newsletter sign-up sits on the secondary surface between two primary-surface bands.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Blog page 07 — a brand-coloured resource-library hero whose card grid overlaps the band below it,
 * followed by a newsletter sign-up, a phone-mockup call to action and a dark footer.
 */
export const BlogPage07 = () => (
    <div className="bg-primary">
        <div className={styles.brandHeader}>
            <HeaderDropdownSimple />
        </div>

        <BlogHeaderFeaturedPost04 />

        <SectionDivider />

        <div className={styles.onSecondary}>
            <NewsletterSimpleCentered />
        </div>

        <CtaIphoneMockup02 />

        <div className="dark-mode">
            <FooterLarge16 />
        </div>
    </div>
);
