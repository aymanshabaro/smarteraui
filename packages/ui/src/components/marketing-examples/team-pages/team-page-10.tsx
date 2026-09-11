import { CareersSimple03 } from "../../marketing/careers-sections/careers-simple-03";
import { FooterLarge09 } from "../../marketing/footers/footer-large-09";
import { Floating4ColSlimWithFooter } from "../../marketing/header-navigations/floating-4-col-slim-with-footer";
import { HeaderCentered } from "../../marketing/header-sections/header-centered";
import { MetricsMinimalCenteredText } from "../../marketing/metrics-sections/metrics-minimal-centered-text";
import { MetricsSplitImage02 } from "../../marketing/metrics-sections/metrics-split-image-02";
import { TeamSectionSimple04 } from "../../marketing/team-sections/team-section-simple-04";

/**
 * Agency team page: the studio introduced in the centre, the team on tinted cards, the
 * headline numbers, the product philosophy beside a photo and the open positions.
 */
export const TeamPage10 = () => (
    <div className="bg-primary">
        <Floating4ColSlimWithFooter />

        <HeaderCentered />

        <TeamSectionSimple04 />

        <MetricsMinimalCenteredText />

        <MetricsSplitImage02 />

        <CareersSimple03 />

        <FooterLarge09 />
    </div>
);
