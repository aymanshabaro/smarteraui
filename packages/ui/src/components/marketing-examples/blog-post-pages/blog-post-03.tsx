import { sortCx } from "../../../utils/cx";
import { BlogSectionSplitLayout02 } from "../../marketing/blog-sections/blog-section-split-layout-02";
import { ContentAlternative03 } from "../../marketing/content-rich-text-sections/content-alternative-03";
import { FooterSmall04 } from "../../marketing/footers/footer-small-04";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

const styles = sortCx({
    // The related-posts row sits on the secondary surface to close the editorial layout.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Blog post 03 — a travel-style feature with a split title block and inline imagery, closed by a
 * related-posts row on the secondary surface and a compact newsletter footer.
 */
export const BlogPost03 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <ContentAlternative03 />
        </main>

        <div className={styles.onSecondary}>
            <BlogSectionSplitLayout02 />
        </div>

        <FooterSmall04 />
    </div>
);
