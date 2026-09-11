import { sortCx } from "../../../utils/cx";
import { BlogSectionCarouselLayout02 } from "../../marketing/blog-sections/blog-section-carousel-layout-02";
import { ContentSplitImage02 } from "../../marketing/content-rich-text-sections/content-split-image-02";
import { FooterLarge09 } from "../../marketing/footers/footer-large-09";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

const styles = sortCx({
    // The carousel band sits on the secondary surface between the article and the dark footer.
    onSecondary: "[&>section]:bg-secondary",
});

/**
 * Blog post 06 — an engineering round-up whose title block splits against a full-bleed image,
 * closed by a carousel of recent writings and a dark footer that carries the call to action.
 */
export const BlogPost06 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <ContentSplitImage02 />
        </main>

        <div className={styles.onSecondary}>
            <BlogSectionCarouselLayout02 />
        </div>

        <div className="dark-mode">
            <FooterLarge09 />
        </div>
    </div>
);
