import { BlogHeaderFeaturedPost01 } from "@/components/marketing/blog-sections/blog-header-featured-post-01";
import { CtaScreenMockup03 } from "@/components/marketing/cta-sections/cta-screen-mockup-03";
import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FooterLarge08 } from "@/components/marketing/footers/footer-large-08";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // The closing call to action alternates surfaces with the screen-mockup band above it.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Blog page 01 — a featured post above a tabbed, sorted article grid with pagination, closed by a
 * product screenshot call to action, a centered trial band and a newsletter footer.
 */
export const BlogPage01 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <BlogHeaderFeaturedPost01 />

        <SectionDivider />

        <CtaScreenMockup03 />

        <div className={styles.onSecondary}>
            <CtaSimpleCentered />
        </div>

        <FooterLarge08 />
    </div>
);
