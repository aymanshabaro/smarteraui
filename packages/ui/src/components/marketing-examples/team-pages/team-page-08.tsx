import { CareersSimple03 } from "../../marketing/careers-sections/careers-simple-03";
import { FeaturesSimpleIcons03 } from "../../marketing/features-sections/features-simple-icons-03";
import { FooterLarge09 } from "../../marketing/footers/footer-large-09";
import { Header4ColWithFooter } from "../../marketing/header-navigations/header-4-col-with-footer";
import { HeaderSpaceBetweenBrand } from "../../marketing/header-sections/header-space-between-brand";
import { TeamSectionImageCard04 } from "../../marketing/team-sections/team-section-image-card-04";

/**
 * Team page led by a brand-coloured introduction: the team in a portrait carousel, the
 * principles the company works by and the open positions, over a sign-off footer.
 */
export const TeamPage08 = () => (
    <div className="bg-primary">
        <Header4ColWithFooter />

        <HeaderSpaceBetweenBrand />

        <TeamSectionImageCard04 />

        <FeaturesSimpleIcons03 />

        <CareersSimple03 />

        <FooterLarge09 />
    </div>
);
