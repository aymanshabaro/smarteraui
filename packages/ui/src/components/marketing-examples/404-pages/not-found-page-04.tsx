import { NotFoundSimple04 } from "@/components/app-examples/404-sections/not-found-simple-04";
import { BlogSectionSimpleCenterAligned02 } from "@/components/marketing/blog-sections/blog-section-simple-center-aligned-02";
import { CtaSplitImageQuote02 } from "@/components/marketing/cta-sections/cta-split-image-quote-02";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { FloatingSimpleWithFooter } from "@/components/marketing/header-navigations/floating-simple-with-footer";
import { SectionDivider } from "@/components/shared-assets/section-divider";

/** A marketing 404 page: a floating header, a centered error section with help cards, recent writing, a quote CTA and a dark footer. */
export const NotFoundPage04 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <NotFoundSimple04 />

        <SectionDivider />

        <BlogSectionSimpleCenterAligned02 />

        <SectionDivider />

        <CtaSplitImageQuote02 />

        {/* Section-scoped dark footer, per 03-theming-and-dark-mode.md § Per-section theme override. */}
        <div className="dark-mode">
            {/*
             * FooterLarge04's link columns are <h4>s, but the last heading above it may only
             * reach <h2>/<h3>. These visually hidden headings restore the intermediate levels
             * so the document outline never skips (axe: heading-order); FooterLarge04 itself is
             * a shared component outside this folder's ownership, so it can't be changed here.
             */}
            <h2 className="sr-only">Footer</h2>
            <h3 className="sr-only">Footer navigation</h3>
            <FooterLarge04 />
        </div>
    </div>
);
