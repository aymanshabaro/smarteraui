import { CareersCard03 } from "../../marketing/careers-sections/careers-card-03";
import { ContactVectorMap03 } from "../../marketing/contact-sections/contact-vector-map-03";
import { FooterLarge07 } from "../../marketing/footers/footer-large-07";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { HeaderSpaceBetween } from "../../marketing/header-sections/header-space-between";
import { MetricsSimpleWithActions01 } from "../../marketing/metrics-sections/metrics-simple-with-actions-01";
import { NewsletterCardHorizontal } from "../../marketing/newsletter-cta-sections/newsletter-card-horizontal";
import { TestimonialCard } from "../../marketing/testimonial-sections/testimonial-card";

/** The full-bleed rule the reference page draws between two sections that share a background. */
const SectionDivider = () => (
    <div className="max-w-container mx-auto px-4 md:px-8">
        <hr className="bg-border-secondary h-px w-full border-none" />
    </div>
);

/**
 * About us page with a space-between introduction, the headline numbers, the careers board, the
 * offices on a dotted world map, a quote from the team and the newsletter card.
 */
export const AboutPage06 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <HeaderSpaceBetween />

            <MetricsSimpleWithActions01 />

            <SectionDivider />

            <CareersCard03 />

            <ContactVectorMap03 />

            <TestimonialCard />

            <NewsletterCardHorizontal />
        </main>

        <FooterLarge07 />
    </div>
);
