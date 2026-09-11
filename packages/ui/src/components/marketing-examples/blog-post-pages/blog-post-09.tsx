import { BlogSectionSplitLayout01 } from "../../marketing/blog-sections/blog-section-split-layout-01";
import { ContentLargeImage03 } from "../../marketing/content-rich-text-sections/content-large-image-03";
import { FooterLarge16 } from "../../marketing/footers/footer-large-16";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { SectionDivider } from "../../shared-assets/section-divider";

/**
 * Blog post 09 — a leadership feature whose byline and share link sit beneath the hero image,
 * closed by a split "from the blog" row and a dark newsletter footer.
 */
export const BlogPost09 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <ContentLargeImage03 />
        </main>

        <SectionDivider />

        <BlogSectionSplitLayout01 />

        <div className="dark-mode">
            <FooterLarge16 />
        </div>
    </div>
);
