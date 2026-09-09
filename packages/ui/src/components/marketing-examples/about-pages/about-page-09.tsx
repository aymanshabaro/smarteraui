import { CareersSimple03 } from "@/components/marketing/careers-sections/careers-simple-03";
import { ContentSectionSimple03 } from "@/components/marketing/content-rich-text-sections/content-section-simple-03";
import { FooterLarge08 } from "@/components/marketing/footers/footer-large-08";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { HeaderCentered } from "@/components/marketing/header-sections/header-centered";
import { MetricsMinimalCenteredText } from "@/components/marketing/metrics-sections/metrics-minimal-centered-text";
import { TeamSectionImageGlass04 } from "@/components/marketing/team-sections/team-section-image-glass-04";
import { TestimonialCaseStudyCards } from "@/components/marketing/testimonial-sections/testimonial-case-study-cards";
import { SectionDivider } from "@/components/shared-assets/section-divider";

/**
 * About company page told as a story: the mission, the headline numbers, the long-form company
 * history, the customer case studies, the growing team and the roles still open.
 */
export const AboutPage09 = () => (
    <div className="bg-primary">
        <HeaderDropdownSimple />

        <main>
            <HeaderCentered />

            <MetricsMinimalCenteredText />

            <ContentSectionSimple03 />

            <SectionDivider />

            <TestimonialCaseStudyCards />

            <TeamSectionImageGlass04 />

            <CareersSimple03 />
        </main>

        <FooterLarge08 />
    </div>
);
