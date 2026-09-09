import { BlogSectionSplitLayout01 } from "@/components/marketing/blog-sections/blog-section-split-layout-01";
import { ContentLargeImage04 } from "@/components/marketing/content-rich-text-sections/content-large-image-04";
import { FooterLarge08 } from "@/components/marketing/footers/footer-large-08";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    // The brand-coloured title block runs under the header, so the navigation adopts on-brand colours.
    brandHeader: [
        "[&>header]:bg-brand-section",
        "[&_nav>ul>li>a]:text-secondary_on-brand [&_nav>ul>li>a]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button]:text-secondary_on-brand [&_nav>ul>li>button]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button>svg]:text-fg-white",
    ].join(" "),
});

/**
 * Blog post 07 — a brand-coloured title block whose hero image overlaps the article body, closed by
 * a split "from the blog" row, a newsletter sign-up and a newsletter footer.
 */
export const BlogPost07 = () => (
    <div className="bg-primary">
        <div className={styles.brandHeader}>
            <HeaderDropdownSimple />
        </div>

        <main>
            <ContentLargeImage04 />
        </main>

        <SectionDivider />

        <BlogSectionSplitLayout01 />

        <SectionDivider />

        <NewsletterSimpleCentered />

        <FooterLarge08 />
    </div>
);
