import { CareersCard01 } from "@/components/marketing/careers-sections/careers-card-01";
import { CtaCardVertical } from "@/components/marketing/cta-sections/cta-card-vertical";
import { FooterLarge10 } from "@/components/marketing/footers/footer-large-10";
import { HeaderDropdownSimpleWithFooter } from "@/components/marketing/header-navigations/header-dropdown-simple-with-footer";
import { HeaderCentered } from "@/components/marketing/header-sections/header-centered";
import { TeamSectionImageGlass01 } from "@/components/marketing/team-sections/team-section-image-glass-01";
import { TestimonialSimpleCentered01 } from "@/components/marketing/testimonial-sections/testimonial-simple-centered-01";

/**
 * Team and careers page: the team as frosted portrait cards, the department-filtered careers
 * board, an open application card, a customer quote and a permanently dark footer.
 */
export const TeamPage04 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimpleWithFooter />

        <HeaderCentered />

        <TeamSectionImageGlass01 />

        <CareersCard01 />

        <CtaCardVertical />

        <TestimonialSimpleCentered01 />

        {/* Section-scoped theme override: this footer stays dark in both themes. */}
        <div className="dark-mode">
            <FooterLarge10 />
        </div>
    </div>
);
