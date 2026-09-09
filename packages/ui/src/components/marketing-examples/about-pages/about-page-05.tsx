import { CareersCard01 } from "@/components/marketing/careers-sections/careers-card-01";
import { FeaturesSimpleIcons02 } from "@/components/marketing/features-sections/features-simple-icons-02";
import { FooterLarge05 } from "@/components/marketing/footers/footer-large-05";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { HeaderCentered } from "@/components/marketing/header-sections/header-centered";
import { MetricsImageWithCards01 } from "@/components/marketing/metrics-sections/metrics-image-with-cards-01";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { TeamSectionSimple04 } from "@/components/marketing/team-sections/team-section-simple-04";
import { TestimonialAbstractImage } from "@/components/marketing/testimonial-sections/testimonial-abstract-image";

/**
 * About us page that walks from the introduction through the numbers, the values and the team to
 * the filtered careers board, a team member's quote and the careers newsletter.
 */
export const AboutPage05 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <HeaderCentered />

            <MetricsImageWithCards01 />

            <FeaturesSimpleIcons02 />

            <TeamSectionSimple04 />

            <CareersCard01 />

            <TestimonialAbstractImage />

            <NewsletterSimpleCentered />
        </main>

        <div className="dark-mode">
            <FooterLarge05 />
        </div>
    </div>
);
