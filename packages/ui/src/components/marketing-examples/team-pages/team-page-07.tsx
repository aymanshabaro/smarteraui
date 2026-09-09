import { CareersSimple02 } from "@/components/marketing/careers-sections/careers-simple-02";
import { FooterLarge15 } from "@/components/marketing/footers/footer-large-15";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { HeaderLeft } from "@/components/marketing/header-sections/header-left";
import { MetricsSimpleCenteredText } from "@/components/marketing/metrics-sections/metrics-simple-centered-text";
import { NewsletterCardHorizontal } from "@/components/marketing/newsletter-cta-sections/newsletter-card-horizontal";
import { TeamSectionImageCard02 } from "@/components/marketing/team-sections/team-section-image-card-02";
import { TestimonialCard } from "@/components/marketing/testimonial-sections/testimonial-card";

/**
 * Leadership page: a start-aligned introduction, the team as portrait cards, the open roles,
 * the numbers behind the distributed team, a quote and the careers newsletter card.
 */
export const TeamPage07 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <HeaderLeft />

        <TeamSectionImageCard02 />

        <CareersSimple02 />

        <MetricsSimpleCenteredText />

        <TestimonialCard />

        <NewsletterCardHorizontal />

        <FooterLarge15 />
    </div>
);
