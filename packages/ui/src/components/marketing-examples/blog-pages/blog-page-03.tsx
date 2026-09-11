import { sortCx } from "../../../utils/cx";
import { BlogHeaderSimple01 } from "../../marketing/blog-sections/blog-header-simple-01";
import { CtaAbstractImages } from "../../marketing/cta-sections/cta-abstract-images";
import { FooterLarge16 } from "../../marketing/footers/footer-large-16";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

const styles = sortCx({
    // The article grid already ends the run of padding, so the CTA only keeps its bottom spacing.
    tightTop: "[&>section]:pt-0",
});

/**
 * Blog page 03 — a searchable, category-filtered article grid with an inline newsletter card,
 * closed by an abstract-image call to action and a compact centered footer.
 */
export const BlogPage03 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <BlogHeaderSimple01 />

        <div className={styles.tightTop}>
            <CtaAbstractImages />
        </div>

        <FooterLarge16 />
    </div>
);
