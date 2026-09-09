import type { FC } from "react";
import * as Demos from "./pricing-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Pricing sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const PricingSectionExample = () => <Demos.PricingSectionExample />;
PricingSectionExample.storyName = "Pricing section example";

export const PricingSimpleIcon = () => {
    const Variant = variantsA["pricing-simple-icon"];
    return <Variant />;
};
PricingSimpleIcon.storyName = "Simple icon";

export const PricingSimpleDualCheckItem = () => {
    const Variant = variantsA["pricing-simple-dual-check-item"];
    return <Variant />;
};
PricingSimpleDualCheckItem.storyName = "Simple dual check item";

export const PricingAbstractAngles = () => {
    const Variant = variantsA["pricing-abstract-angles"];
    return <Variant />;
};
PricingAbstractAngles.storyName = "Abstract angles";

export const PricingSimpleBanner = () => {
    const Variant = variantsA["pricing-simple-banner"];
    return <Variant />;
};
PricingSimpleBanner.storyName = "Simple banner";

export const PricingLargeTable01 = () => {
    const Variant = variantsA["pricing-large-table-01"];
    return <Variant />;
};
PricingLargeTable01.storyName = "Large table 01";

export const PricingSectionSimpleCards02 = () => {
    const Variant = variantsA["pricing-section-simple-cards-02"];
    return <Variant />;
};
PricingSectionSimpleCards02.storyName = "Simple cards 02";

export const PricingSectionFeaturedCards01 = () => {
    const Variant = variantsA["pricing-section-featured-cards-01"];
    return <Variant />;
};
PricingSectionFeaturedCards01.storyName = "Featured cards 01";

export const PricingSectionFeaturedCards04 = () => {
    const Variant = variantsA["pricing-section-featured-cards-04"];
    return <Variant />;
};
PricingSectionFeaturedCards04.storyName = "Featured cards 04";

export const PricingSimpleCallOut = () => {
    const Variant = variantsA["pricing-simple-call-out"];
    return <Variant />;
};
PricingSimpleCallOut.storyName = "Simple callout";

export const PricingGrayBadge = () => {
    const Variant = variantsA["pricing-gray-badge"];
    return <Variant />;
};
PricingGrayBadge.storyName = "Gray badge";

export const PricingSimpleAccentLine = () => {
    const Variant = variantsA["pricing-simple-accent-line"];
    return <Variant />;
};
PricingSimpleAccentLine.storyName = "Simple accent line";

export const PricingPrimaryCardSimple = () => {
    const Variant = variantsA["pricing-primary-card-simple"];
    return <Variant />;
};
PricingPrimaryCardSimple.storyName = "Primary card simple";

export const PricingLargeTable02 = () => {
    const Variant = variantsA["pricing-large-table-02"];
    return <Variant />;
};
PricingLargeTable02.storyName = "Large table 02";

export const PricingSectionSimpleCards03 = () => {
    const Variant = variantsA["pricing-section-simple-cards-03"];
    return <Variant />;
};
PricingSectionSimpleCards03.storyName = "Simple cards 03";

export const PricingSectionFeaturedCards02 = () => {
    const Variant = variantsA["pricing-section-featured-cards-02"];
    return <Variant />;
};
PricingSectionFeaturedCards02.storyName = "Featured cards 02";

export const PricingSimpleIconOffset = () => {
    const Variant = variantsA["pricing-simple-icon-offset"];
    return <Variant />;
};
PricingSimpleIconOffset.storyName = "Simple icon offset";

export const PricingPrimaryDarkBadge = () => {
    const Variant = variantsA["pricing-primary-dark-badge"];
    return <Variant />;
};
PricingPrimaryDarkBadge.storyName = "Primary dark badge";

export const PricingDualAction = () => {
    const Variant = variantsA["pricing-dual-action"];
    return <Variant />;
};
PricingDualAction.storyName = "Dual action";

export const PricingPrimaryCardIcon = () => {
    const Variant = variantsA["pricing-primary-card-icon"];
    return <Variant />;
};
PricingPrimaryCardIcon.storyName = "Primary card icon";

export const PricingSectionSimpleCards01 = () => {
    const Variant = variantsA["pricing-section-simple-cards-01"];
    return <Variant />;
};
PricingSectionSimpleCards01.storyName = "Simple cards 01";

export const PricingSectionSimpleCards04 = () => {
    const Variant = variantsA["pricing-section-simple-cards-04"];
    return <Variant />;
};
PricingSectionSimpleCards04.storyName = "Simple cards 04";

export const PricingSectionFeaturedCards03 = () => {
    const Variant = variantsA["pricing-section-featured-cards-03"];
    return <Variant />;
};
PricingSectionFeaturedCards03.storyName = "Featured cards 03";
