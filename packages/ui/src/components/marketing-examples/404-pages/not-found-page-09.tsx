import { NotFoundSimple02 } from "@/components/app-examples/404-sections/not-found-simple-02";
import { BlogSectionCarouselLayout01 } from "@/components/marketing/blog-sections/blog-section-carousel-layout-01";
import { CtaIphoneMockup01 } from "@/components/marketing/cta-sections/cta-iphone-mockup-01";
import { FooterLarge09 } from "@/components/marketing/footers/footer-large-09";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { SectionDivider } from "@/components/shared-assets/section-divider";

/** A marketing 404 page: a badged error section with onward links, a blog carousel, an app CTA and a dark footer. */
export const NotFoundPage09 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <NotFoundSimple02 />

        <SectionDivider />

        <BlogSectionCarouselLayout01 />

        <SectionDivider />

        <CtaIphoneMockup01 />

        {/* Section-scoped dark footer, per 03-theming-and-dark-mode.md § Per-section theme override. */}
        <div className="dark-mode">
            <FooterLarge09 />
        </div>
    </div>
);
