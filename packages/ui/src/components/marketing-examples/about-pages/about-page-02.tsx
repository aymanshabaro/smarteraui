import { CareersCard04 } from "@/components/marketing/careers-sections/careers-card-04";
import { ContactMap02 } from "@/components/marketing/contact-sections/contact-map-02";
import { ContactSimpleForm01 } from "@/components/marketing/contact-sections/contact-simple-form-01";
import { ContactSimpleIcons04Brand } from "@/components/marketing/contact-sections/contact-simple-icons-04-brand";
import { FooterLarge05Brand } from "@/components/marketing/footers/footer-large-05-brand";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { SocialProofPressMentions } from "@/components/marketing/social-proof-sections/social-proof-press-mentions";
import { TeamSectionSimple01 } from "@/components/marketing/team-sections/team-section-simple-01";

/** The full-bleed rule the reference page draws between two sections that share a background. */
const SectionDivider = () => (
    <div className="max-w-container mx-auto px-4 md:px-8">
        <hr className="bg-border-secondary h-px w-full border-none" />
    </div>
);

/**
 * About us page for a distributed company: contact channels on a world map, the store list on a
 * branded band, the team, the careers board, a contact form and press mentions.
 */
export const AboutPage02 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <ContactMap02 />

            <ContactSimpleIcons04Brand />

            <TeamSectionSimple01 />

            <SectionDivider />

            <CareersCard04 />

            <SectionDivider />

            <ContactSimpleForm01 />

            <SectionDivider />

            <SocialProofPressMentions />
        </main>

        <FooterLarge05Brand />
    </div>
);
