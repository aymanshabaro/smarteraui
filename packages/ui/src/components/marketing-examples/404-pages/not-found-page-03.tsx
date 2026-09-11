import { NotFoundSplitImage05 } from "../../app-examples/404-sections/not-found-split-image-05";
import { BlogSectionSplitLayout01 } from "../../marketing/blog-sections/blog-section-split-layout-01";
import { CtaSimpleCentered } from "../../marketing/cta-sections/cta-simple-centered";
import { FooterLarge03Brand } from "../../marketing/footers/footer-large-03-brand";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { SectionDivider } from "../../shared-assets/section-divider";

/** A marketing 404 page: a searchable error section with onward links, the latest blog posts, a closing CTA and a brand footer. */
export const NotFoundPage03 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <NotFoundSplitImage05 />

        <SectionDivider />

        <BlogSectionSplitLayout01 />

        <SectionDivider />

        <CtaSimpleCentered />

        {/*
         * FooterLarge03Brand's link columns are <h4>s, but the last heading above it may only
         * reach <h2>/<h3>. These visually hidden headings restore the intermediate levels so
         * the document outline never skips (axe: heading-order); FooterLarge03Brand itself is
         * a shared component outside this folder's ownership, so it can't be changed here.
         */}
        <h2 className="sr-only">Footer</h2>
        <h3 className="sr-only">Footer navigation</h3>
        <FooterLarge03Brand />
    </div>
);
