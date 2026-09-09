import { CareersCard02 } from "@/components/marketing/careers-sections/careers-card-02";
import { CtaCardVertical } from "@/components/marketing/cta-sections/cta-card-vertical";
import { FeaturesSimpleIcons04 } from "@/components/marketing/features-sections/features-simple-icons-04";
import { FooterLarge11 } from "@/components/marketing/footers/footer-large-11";
import { HeaderDropdownFeatureCard } from "@/components/marketing/header-navigations/header-dropdown-feature-card";
import { HeaderCentered } from "@/components/marketing/header-sections/header-centered";
import { MetricsMinimalCenteredText } from "@/components/marketing/metrics-sections/metrics-minimal-centered-text";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { TeamSectionImageGlass03 } from "@/components/marketing/team-sections/team-section-image-glass-03";

/**
 * About us page opening on a permanently dark introduction: the leadership grid, the company
 * values, a location-filtered careers board, an open application card and the newsletter.
 */
export const TeamPage06 = () => (
    <div className="bg-primary">
        {/* Section-scoped theme override: the page opens dark in both themes. */}
        <div className="dark-mode bg-primary">
            <HeaderDropdownFeatureCard />

            <HeaderCentered />
        </div>

        <TeamSectionImageGlass03 />

        <FeaturesSimpleIcons04 />

        <CareersCard02 />

        <CtaCardVertical />

        <MetricsMinimalCenteredText />

        <NewsletterSimpleCentered />

        <FooterLarge11 />
    </div>
);
