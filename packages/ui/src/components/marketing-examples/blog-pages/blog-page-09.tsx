import { BlogHeaderSimple06 } from "@/components/marketing/blog-sections/blog-header-simple-06";
import { BlogSectionSplitLayout02 } from "@/components/marketing/blog-sections/blog-section-split-layout-02";
import { CtaSimpleCentered } from "@/components/marketing/cta-sections/cta-simple-centered";
import { FooterLarge09 } from "@/components/marketing/footers/footer-large-09";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // The closing call to action alternates surfaces with the blog row above it.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Blog page 09 — a stories-and-interviews index with a category filter, a split "from the blog"
 * row, a centered trial call to action and a dark footer.
 */
export const BlogPage09 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <BlogHeaderSimple06 />

        <SectionDivider />

        <BlogSectionSplitLayout02 />

        <div className={styles.onSecondary}>
            <CtaSimpleCentered />
        </div>

        <div className="dark-mode">
            <FooterLarge09 />
        </div>
    </div>
);
