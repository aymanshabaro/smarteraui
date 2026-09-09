import { CareersSimple04 } from "@/components/marketing/careers-sections/careers-simple-04";
import { ContactSimpleForm01 } from "@/components/marketing/contact-sections/contact-simple-form-01";
import { FooterLarge13 } from "@/components/marketing/footers/footer-large-13";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { HeaderCentered } from "@/components/marketing/header-sections/header-centered";
import { NewsletterSimpleCentered } from "@/components/marketing/newsletter-cta-sections/newsletter-simple-centered";
import { SocialProofFullWidthMasked } from "@/components/marketing/social-proof-sections/social-proof-full-width-masked";
import { TeamSectionSimple03 } from "@/components/marketing/team-sections/team-section-simple-03";
import { SectionDivider } from "@/components/shared-assets/section-divider";

/**
 * About us page that states the mission, proves it with customer logos, introduces the
 * leadership team and the open roles, then closes on the careers newsletter, a contact form
 * and a dark centred sign-off.
 */
export const AboutPage08 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <HeaderCentered />

            <SocialProofFullWidthMasked />

            <TeamSectionSimple03 />

            <SectionDivider />

            <CareersSimple04 />

            <NewsletterSimpleCentered />

            <SectionDivider />

            <ContactSimpleForm01 />
        </main>

        {/* Section-scoped dark sign-off, per 03-theming-and-dark-mode.md § Per-section theme override. */}
        <div className="dark-mode">
            <FooterLarge13 />
        </div>
    </div>
);
