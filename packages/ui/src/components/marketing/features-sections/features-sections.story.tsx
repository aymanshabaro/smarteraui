import type { FC } from "react";
import * as Demos from "./features-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Features sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const FeaturesSectionExample = () => <Demos.FeaturesSectionExample />;
FeaturesSectionExample.storyName = "Features section example";

export const FeaturesAlternatingLayout01 = () => {
    const Variant = variantsA["features-alternating-layout-01"];
    return <Variant />;
};
FeaturesAlternatingLayout01.storyName = "Alternating layout 01";

export const FeaturesAlternatingLayout04 = () => {
    const Variant = variantsA["features-alternating-layout-04"];
    return <Variant />;
};
FeaturesAlternatingLayout04.storyName = "Alternating layout 04";

export const FeaturesSimpleIcons03 = () => {
    const Variant = variantsA["features-simple-icons-03"];
    return <Variant />;
};
FeaturesSimpleIcons03.storyName = "Simple icons 03";

export const FeaturesIconsAndImage02 = () => {
    const Variant = variantsA["features-icons-and-image-02"];
    return <Variant />;
};
FeaturesIconsAndImage02.storyName = "Icons and image 02";

export const FeaturesIconCards01 = () => {
    const Variant = variantsA["features-icon-cards-01"];
    return <Variant />;
};
FeaturesIconCards01.storyName = "Icon cards 01";

export const FeaturesCenterMockup02 = () => {
    const Variant = variantsA["features-center-mockup-02"];
    return <Variant />;
};
FeaturesCenterMockup02.storyName = "Center mockup 02";

export const FeaturesIconsAndMockup03 = () => {
    const Variant = variantsA["features-icons-and-mockup-03"];
    return <Variant />;
};
FeaturesIconsAndMockup03.storyName = "Icons and mockup 03";

export const FeaturesIconsAndMockup06 = () => {
    const Variant = variantsA["features-icons-and-mockup-06"];
    return <Variant />;
};
FeaturesIconsAndMockup06.storyName = "Icons and mockup 06";

export const FeaturesLargeScreenMockup01 = () => {
    const Variant = variantsA["features-large-screen-mockup-01"];
    return <Variant />;
};
FeaturesLargeScreenMockup01.storyName = "Large screen mockup 01";

export const FeaturesTabsMockup02 = () => {
    const Variant = variantsA["features-tabs-mockup-02"];
    return <Variant />;
};
FeaturesTabsMockup02.storyName = "Tabs mockup 02";

export const FeaturesTabsMockup05 = () => {
    const Variant = variantsA["features-tabs-mockup-05"];
    return <Variant />;
};
FeaturesTabsMockup05.storyName = "Tabs mockup 05";

export const FeaturesTabsMockup08 = () => {
    const Variant = variantsA["features-tabs-mockup-08"];
    return <Variant />;
};
FeaturesTabsMockup08.storyName = "Tabs mockup 08";

export const FeaturesTabsMockup11 = () => {
    const Variant = variantsA["features-tabs-mockup-11"];
    return <Variant />;
};
FeaturesTabsMockup11.storyName = "Tabs mockup 11";

export const FeaturesIntegrationsIcons02 = () => {
    const Variant = variantsA["features-integrations-icons-02"];
    return <Variant />;
};
FeaturesIntegrationsIcons02.storyName = "Integrations icons 02";

export const FeaturesSimpleIcons01Brand = () => {
    const Variant = variantsA["features-simple-icons-01-brand"];
    return <Variant />;
};
FeaturesSimpleIcons01Brand.storyName = "Simple icons 01 brand";

export const FeaturesSimpleIcons04Brand = () => {
    const Variant = variantsA["features-simple-icons-04-brand"];
    return <Variant />;
};
FeaturesSimpleIcons04Brand.storyName = "Simple icons 04 brand";

export const FeaturesAlternatingLayout02 = () => {
    const Variant = variantsA["features-alternating-layout-02"];
    return <Variant />;
};
FeaturesAlternatingLayout02.storyName = "Alternating layout 02";

export const FeaturesSimpleIcons01 = () => {
    const Variant = variantsA["features-simple-icons-01"];
    return <Variant />;
};
FeaturesSimpleIcons01.storyName = "Simple icons 01";

export const FeaturesSimpleIcons04 = () => {
    const Variant = variantsA["features-simple-icons-04"];
    return <Variant />;
};
FeaturesSimpleIcons04.storyName = "Simple icons 04";

export const FeaturesIconsAndImage03 = () => {
    const Variant = variantsA["features-icons-and-image-03"];
    return <Variant />;
};
FeaturesIconsAndImage03.storyName = "Icons and image 03";

export const FeaturesIconCards02 = () => {
    const Variant = variantsA["features-icon-cards-02"];
    return <Variant />;
};
FeaturesIconCards02.storyName = "Icon cards 02";

export const FeaturesIconsAndMockup01 = () => {
    const Variant = variantsA["features-icons-and-mockup-01"];
    return <Variant />;
};
FeaturesIconsAndMockup01.storyName = "Icons and mockup 01";

export const FeaturesIconsAndMockup04 = () => {
    const Variant = variantsA["features-icons-and-mockup-04"];
    return <Variant />;
};
FeaturesIconsAndMockup04.storyName = "Icons and mockup 04";
