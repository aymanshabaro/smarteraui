import { FeaturesAlternatingLayout02 } from "../../marketing/features-sections/features-alternating-layout-02";
import { FeaturesIconCards01 } from "../../marketing/features-sections/features-icon-cards-01";
import { FooterLarge04 } from "../../marketing/footers/footer-large-04";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";
import { HeaderCenteredButtons } from "../../marketing/header-sections/header-centered-buttons";
import { NewsletterSimpleCentered } from "../../marketing/newsletter-cta-sections/newsletter-simple-centered";
import { TeamSectionImageCollage02 } from "../../marketing/team-sections/team-section-image-collage-02";

/**
 * Company about page built around what the company does and values: a centred introduction with
 * two actions, the alternating product story, the value cards, the team photo collage and the
 * newsletter, closed by the link-column footer.
 */
export const AboutPage10 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <HeaderCenteredButtons />

            <FeaturesAlternatingLayout02 />

            <FeaturesIconCards01 />

            <TeamSectionImageCollage02 />

            <NewsletterSimpleCentered />
        </main>

        <FooterLarge04 />
    </div>
);
