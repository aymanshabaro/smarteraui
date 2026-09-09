import type { FC } from "react";
import * as Demos from "./metrics-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Metrics sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const MetricsSectionExample = () => <Demos.MetricsSectionExample />;
MetricsSectionExample.storyName = "Metrics section example";

export const MetricsCardGrayLight = () => {
    const Variant = variantsA["metrics-card-gray-light"];
    return <Variant />;
};
MetricsCardGrayLight.storyName = "Card gray light";

export const MetricsSimpleWithActions02 = () => {
    const Variant = variantsA["metrics-simple-with-actions-02"];
    return <Variant />;
};
MetricsSimpleWithActions02.storyName = "Simple with actions 02";

export const MetricsSimpleAccentLine = () => {
    const Variant = variantsA["metrics-simple-accent-line"];
    return <Variant />;
};
MetricsSimpleAccentLine.storyName = "Simple accent line";

export const MetricsSplitImage02 = () => {
    const Variant = variantsA["metrics-split-image-02"];
    return <Variant />;
};
MetricsSplitImage02.storyName = "Split image 02";

export const MetricsSimpleAccentLineBrand = () => {
    const Variant = variantsA["metrics-simple-accent-line-brand"];
    return <Variant />;
};
MetricsSimpleAccentLineBrand.storyName = "Simple accent line brand";

export const MetricsSplitImage02Brand = () => {
    const Variant = variantsA["metrics-split-image-02-brand"];
    return <Variant />;
};
MetricsSplitImage02Brand.storyName = "Split image 02 brand";

export const MetricsCardBrandDark = () => {
    const Variant = variantsA["metrics-card-brand-dark"];
    return <Variant />;
};
MetricsCardBrandDark.storyName = "Card brand dark";

export const MetricsImageWithCards01 = () => {
    const Variant = variantsA["metrics-image-with-cards-01"];
    return <Variant />;
};
MetricsImageWithCards01.storyName = "Image with cards 01";

export const MetricsSimpleCenteredText = () => {
    const Variant = variantsA["metrics-simple-centered-text"];
    return <Variant />;
};
MetricsSimpleCenteredText.storyName = "Simple centered text";

export const MetricsMinimalCenteredText = () => {
    const Variant = variantsA["metrics-minimal-centered-text"];
    return <Variant />;
};
MetricsMinimalCenteredText.storyName = "Minimal centered text";

export const MetricsSimpleCenteredTextBrand = () => {
    const Variant = variantsA["metrics-simple-centered-text-brand"];
    return <Variant />;
};
MetricsSimpleCenteredTextBrand.storyName = "Simple centered text brand";

export const MetricsSimpleWithActions01 = () => {
    const Variant = variantsA["metrics-simple-with-actions-01"];
    return <Variant />;
};
MetricsSimpleWithActions01.storyName = "Simple with actions 01";

export const MetricsImageWithCards02 = () => {
    const Variant = variantsA["metrics-image-with-cards-02"];
    return <Variant />;
};
MetricsImageWithCards02.storyName = "Image with cards 02";

export const MetricsSplitImage01 = () => {
    const Variant = variantsA["metrics-split-image-01"];
    return <Variant />;
};
MetricsSplitImage01.storyName = "Split image 01";

export const MetricsMinimalCenteredTextBrand = () => {
    const Variant = variantsA["metrics-minimal-centered-text-brand"];
    return <Variant />;
};
MetricsMinimalCenteredTextBrand.storyName = "Minimal centered text brand";

export const MetricsSplitImage01Brand = () => {
    const Variant = variantsA["metrics-split-image-01-brand"];
    return <Variant />;
};
MetricsSplitImage01Brand.storyName = "Split image 01 brand";
