import { sortCx } from "../../../utils/cx";
import { BlogHeaderSidebar02 } from "../../marketing/blog-sections/blog-header-sidebar-02";
import { FooterLarge16 } from "../../marketing/footers/footer-large-16";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

const styles = sortCx({
    // The reference closes this layout on the secondary surface to separate it from the article list.
    onSecondary: "[&>footer]:bg-secondary",
});

/**
 * Blog page 04 — a resources index whose sidebar carries the search box and category filters beside
 * a paginated article list, closed by a compact centered footer on the secondary surface.
 */
export const BlogPage04 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <BlogHeaderSidebar02 />

        <div className={styles.onSecondary}>
            <FooterLarge16 />
        </div>
    </div>
);
