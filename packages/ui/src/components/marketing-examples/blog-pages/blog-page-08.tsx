import { sortCx } from "../../../utils/cx";
import { BlogHeaderSimple05 } from "../../marketing/blog-sections/blog-header-simple-05";
import { BlogSectionSimpleLeftAligned02 } from "../../marketing/blog-sections/blog-section-simple-left-aligned-02";
import { FooterLarge08 } from "../../marketing/footers/footer-large-08";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { NewsletterSimpleCentered } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SectionDivider } from "../../shared-assets/section-divider";

const styles = sortCx({
    // The header shares the secondary surface with the resource-library hero underneath it.
    headerOnSecondary: "[&>header]:bg-secondary",
    footerOnSecondary: "[&>footer]:bg-secondary",
});

/**
 * Blog page 08 — a resource library on the secondary surface, a left-aligned "from the blog" row,
 * a dark newsletter band and a six-column footer.
 */
export const BlogPage08 = () => (
    <div className="bg-primary">
        <div className={styles.headerOnSecondary}>
            <HeaderDropdownSimple />
        </div>

        <BlogHeaderSimple05 />

        <SectionDivider />

        <BlogSectionSimpleLeftAligned02 />

        <SectionDivider />

        <div className="dark-mode">
            <NewsletterSimpleCentered />
        </div>

        <div className={styles.footerOnSecondary}>
            <FooterLarge08 />
        </div>
    </div>
);
