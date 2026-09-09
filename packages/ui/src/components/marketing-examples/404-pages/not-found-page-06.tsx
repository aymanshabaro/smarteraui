import { NotFoundScreenMockup } from "@/components/app-examples/404-sections/not-found-screen-mockup";
import { BlogSectionSimpleCenterAligned01 } from "@/components/marketing/blog-sections/blog-section-simple-center-aligned-01";
import { FooterLarge06Brand } from "@/components/marketing/footers/footer-large-06-brand";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { SectionDivider } from "@/components/shared-assets/section-divider";

/** A marketing maintenance page: an error section beside an app screen mockup, the latest posts and a brand newsletter footer. */
export const NotFoundPage06 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <NotFoundScreenMockup />

        <SectionDivider />

        <BlogSectionSimpleCenterAligned01 />

        {/*
         * FooterLarge06Brand's link columns are <h4>s, but the last heading above it may only
         * reach <h2>/<h3>. These visually hidden headings restore the intermediate levels so
         * the document outline never skips (axe: heading-order); FooterLarge06Brand itself is
         * a shared component outside this folder's ownership, so it can't be changed here.
         */}
        <h2 className="sr-only">Footer</h2>
        <h3 className="sr-only">Footer navigation</h3>
        <FooterLarge06Brand />
    </div>
);
