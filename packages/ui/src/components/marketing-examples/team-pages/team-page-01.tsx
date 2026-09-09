import { CareersCard03 } from "@/components/marketing/careers-sections/careers-card-03";
import { FooterLarge05 } from "@/components/marketing/footers/footer-large-05";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { HeaderCentered } from "@/components/marketing/header-sections/header-centered";
import { TeamSectionImageCard01 } from "@/components/marketing/team-sections/team-section-image-card-01";

/**
 * Team page: a centered introduction, the whole team as a four-up grid of portrait cards and
 * the open roles grouped by department, closed by the careers newsletter and six-column footer.
 */
export const TeamPage01 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <HeaderCentered />

        <TeamSectionImageCard01 />

        <CareersCard03 />

        <FooterLarge05 />
    </div>
);
