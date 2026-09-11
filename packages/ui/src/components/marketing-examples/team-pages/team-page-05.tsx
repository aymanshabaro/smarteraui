import { CareersSimple01 } from "../../marketing/careers-sections/careers-simple-01";
import { CtaAbstractImages } from "../../marketing/cta-sections/cta-abstract-images";
import { FeaturesSimpleIcons02 } from "../../marketing/features-sections/features-simple-icons-02";
import { FooterLarge09Brand } from "../../marketing/footers/footer-large-09-brand";
import { Floating2ColWithSidebar } from "../../marketing/header-navigations/floating-2-col-with-sidebar";
import { HeaderCentered } from "../../marketing/header-sections/header-centered";
import { NewsletterSimpleCentered } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered";
import { TeamSectionImageGlass02 } from "../../marketing/team-sections/team-section-image-glass-02";

/**
 * Team page under a floating header: frosted portrait cards, the values that hold the team
 * together, the open positions, a photo collage and the newsletter, over a brand footer.
 */
export const TeamPage05 = () => (
    <div className="bg-primary">
        <Floating2ColWithSidebar />

        <HeaderCentered />

        <TeamSectionImageGlass02 />

        <FeaturesSimpleIcons02 />

        <CareersSimple01 />

        <CtaAbstractImages />

        <NewsletterSimpleCentered />

        <FooterLarge09Brand />
    </div>
);
