import { CareersSimple03 } from "../../marketing/careers-sections/careers-simple-03";
import { CtaAbstractImages } from "../../marketing/cta-sections/cta-abstract-images";
import { FooterLarge15 } from "../../marketing/footers/footer-large-15";
import { FloatingSimpleWithFooter } from "../../marketing/header-navigations/floating-simple-with-footer";
import { HeaderCentered } from "../../marketing/header-sections/header-centered";
import { NewsletterSimpleCentered } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered";
import { TeamSectionSimple01 } from "../../marketing/team-sections/team-section-simple-01";
import { TeamSectionSimple03 } from "../../marketing/team-sections/team-section-simple-03";

/**
 * Team directory under a floating header: the leadership grid of circular portraits, a second
 * grid for the board, the open roles, a photo collage call to action and the newsletter.
 */
export const TeamPage02 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <HeaderCentered />

        <TeamSectionSimple01 />

        <TeamSectionSimple03 />

        <CareersSimple03 />

        <CtaAbstractImages />

        <NewsletterSimpleCentered />

        <FooterLarge15 />
    </div>
);
