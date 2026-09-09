import type { FC } from "react";
import * as Demos from "./pricing-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Pricing pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const PricingPageExample = () => <Demos.PricingPageExample />;
PricingPageExample.storyName = "Pricing page example";

export const PricingPage01 = () => {
    const Variant = variantsA["pricing-page-01"];
    return <Variant />;
};
PricingPage01.storyName = "Pricing page 01";

export const PricingPage04 = () => {
    const Variant = variantsA["pricing-page-04"];
    return <Variant />;
};
PricingPage04.storyName = "Pricing page 04";

export const PricingPage07 = () => {
    const Variant = variantsA["pricing-page-07"];
    return <Variant />;
};
PricingPage07.storyName = "Pricing page 07";

export const PricingPage10 = () => {
    const Variant = variantsA["pricing-page-10"];
    return <Variant />;
};
PricingPage10.storyName = "Pricing page 10";

export const PricingPage02 = () => {
    const Variant = variantsA["pricing-page-02"];
    return <Variant />;
};
PricingPage02.storyName = "Pricing page 02";

export const PricingPage05 = () => {
    const Variant = variantsA["pricing-page-05"];
    return <Variant />;
};
PricingPage05.storyName = "Pricing page 05";

export const PricingPage08 = () => {
    const Variant = variantsA["pricing-page-08"];
    return <Variant />;
};
PricingPage08.storyName = "Pricing page 08";

export const PricingPage03 = () => {
    const Variant = variantsA["pricing-page-03"];
    return <Variant />;
};
PricingPage03.storyName = "Pricing page 03";

export const PricingPage06 = () => {
    const Variant = variantsA["pricing-page-06"];
    return <Variant />;
};
PricingPage06.storyName = "Pricing page 06";

export const PricingPage09 = () => {
    const Variant = variantsA["pricing-page-09"];
    return <Variant />;
};
PricingPage09.storyName = "Pricing page 09";
