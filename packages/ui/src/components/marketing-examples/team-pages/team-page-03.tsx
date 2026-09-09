import { CareersCard01 } from "@/components/marketing/careers-sections/careers-card-01";
import { FooterLarge10 } from "@/components/marketing/footers/footer-large-10";
import { HeaderDropdownSimpleTwoColumns } from "@/components/marketing/header-navigations/header-dropdown-simple-two-columns";
import { HeaderLeft } from "@/components/marketing/header-sections/header-left";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { TeamSectionImageCard03 } from "@/components/marketing/team-sections/team-section-image-card-03";

/**
 * Team and careers page: a start-aligned introduction, the leadership grid with social links,
 * a department-filtered careers board, and a permanently dark newsletter and footer.
 */
export const TeamPage03 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimpleTwoColumns />

        <HeaderLeft />

        <TeamSectionImageCard03 />

        <CareersCard01 />

        {/* Section-scoped theme override: the sign-off stays dark in both themes. */}
        <div className="dark-mode">
            <NewsletterSimpleCentered />

            <FooterLarge10 />
        </div>
    </div>
);
