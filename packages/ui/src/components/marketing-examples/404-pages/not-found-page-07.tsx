import { NotFoundIllustration02 } from "@/components/app-examples/404-sections/not-found-illustration-02";
import { CtaAbstractImages } from "@/components/marketing/cta-sections/cta-abstract-images";
import { FooterLarge07 } from "@/components/marketing/footers/footer-large-07";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";

/** A marketing maintenance page: an illustrated error section with site search, a collage CTA and a dark footer. */
export const NotFoundPage07 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <NotFoundIllustration02 />

        <CtaAbstractImages />

        {/* Section-scoped dark footer, per 03-theming-and-dark-mode.md § Per-section theme override. */}
        <div className="dark-mode">
            {/*
             * FooterLarge07's "Get the app" heading is an <h4>, but the last heading above it
             * may only reach <h2>/<h3>. These visually hidden headings restore the intermediate
             * levels so the document outline never skips (axe: heading-order); FooterLarge07
             * itself is a shared component outside this folder's ownership, so it can't be
             * changed here.
             */}
            <h2 className="sr-only">Footer</h2>
            <h3 className="sr-only">Footer navigation</h3>
            <FooterLarge07 />
        </div>
    </div>
);
