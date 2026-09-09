import { NotFoundSimple01 } from "@/components/app-examples/404-sections/not-found-simple-01";
import { BlogSectionSimpleLeftAligned01 } from "@/components/marketing/blog-sections/blog-section-simple-left-aligned-01";
import { FooterLarge10 } from "@/components/marketing/footers/footer-large-10";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { NewsletterCardHorizontal } from "@/components/marketing/newsletter-cta-sections/newsletter-card-horizontal";
import { SectionDivider } from "@/components/shared-assets/section-divider";

/** A marketing 404 page: a left-aligned error section, the latest blog posts, a newsletter card and a trial-CTA footer. */
export const NotFoundPage10 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <NotFoundSimple01 />

        <SectionDivider />

        <BlogSectionSimpleLeftAligned01 />

        <NewsletterCardHorizontal />

        <FooterLarge10 />
    </div>
);
