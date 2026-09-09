import { CareersCard03 } from "@/components/marketing/careers-sections/careers-card-03";
import { FeaturesSimpleIcons02 } from "@/components/marketing/features-sections/features-simple-icons-02";
import { FooterLarge02 } from "@/components/marketing/footers/footer-large-02";
import { FloatingSimpleWithFooter } from "@/components/marketing/header-navigations/floating-simple-with-footer";
import { HeaderCentered } from "@/components/marketing/header-sections/header-centered";
import { MetricsSplitImage02 } from "@/components/marketing/metrics-sections/metrics-split-image-02";
import { SocialProofFullWidth } from "@/components/marketing/social-proof-sections/social-proof-full-width";
import { TeamSectionSimple04 } from "@/components/marketing/team-sections/team-section-simple-04";

/** The full-bleed rule the reference page draws between two sections that share a background. */
const SectionDivider = () => (
    <div className="max-w-container mx-auto px-4 md:px-8">
        <hr className="bg-border-secondary h-px w-full border-none" />
    </div>
);

/**
 * Corporate about page: a floating header over a centered introduction, a split-image metrics
 * block, customer logos, the team, the company values and the open roles, closed by a dark footer.
 */
export const AboutPage01 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <main>
            <HeaderCentered />

            <MetricsSplitImage02 />

            <SocialProofFullWidth />

            <SectionDivider />

            <TeamSectionSimple04 />

            <FeaturesSimpleIcons02 />

            <CareersCard03 />
        </main>

        <div className="dark-mode">
            <FooterLarge02 />
        </div>
    </div>
);
