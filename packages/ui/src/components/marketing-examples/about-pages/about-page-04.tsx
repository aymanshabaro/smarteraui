import { CtaSimpleCentered } from "../../marketing/cta-sections/cta-simple-centered";
import { FooterLarge03 } from "../../marketing/footers/footer-large-03";
import { FloatingSimpleWithFooter } from "../../marketing/header-navigations/floating-simple-with-footer";
import { HeaderCentered } from "../../marketing/header-sections/header-centered";
import { MetricsImageWithCards01 } from "../../marketing/metrics-sections/metrics-image-with-cards-01";
import { TeamSectionImageCard01 } from "../../marketing/team-sections/team-section-image-card-01";
import { TestimonialSimpleCentered01 } from "../../marketing/testimonial-sections/testimonial-simple-centered-01";

/** The full-bleed rule the reference page draws between two sections that share a background. */
const SectionDivider = () => (
    <div className="max-w-container mx-auto px-4 md:px-8">
        <hr className="bg-border-secondary h-px w-full border-none" />
    </div>
);

/**
 * About us page for a software team: a floating header, a centered introduction, the team as
 * square portrait cards, the numbers on a photo, a customer quote and a hiring call to action.
 */
export const AboutPage04 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <main>
            <HeaderCentered />

            <SectionDivider />

            <TeamSectionImageCard01 />

            <SectionDivider />

            <MetricsImageWithCards01 />

            <SectionDivider />

            <TestimonialSimpleCentered01 />

            <CtaSimpleCentered />
        </main>

        <div className="dark-mode">
            <FooterLarge03 />
        </div>
    </div>
);
