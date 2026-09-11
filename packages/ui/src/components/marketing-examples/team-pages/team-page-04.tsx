import { CareersCard01 } from "../../marketing/careers-sections/careers-card-01";
import { CtaCardVertical } from "../../marketing/cta-sections/cta-card-vertical";
import { FooterLarge10 } from "../../marketing/footers/footer-large-10";
import { HeaderDropdownSimpleWithFooter } from "../../marketing/header-navigations/header-dropdown-simple-with-footer";
import { HeaderCentered } from "../../marketing/header-sections/header-centered";
import { TeamSectionImageGlass01 } from "../../marketing/team-sections/team-section-image-glass-01";
import { TestimonialSimpleCentered01 } from "../../marketing/testimonial-sections/testimonial-simple-centered-01";

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
