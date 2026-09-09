import type { FC } from "react";
import * as Demos from "./cta-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/CTA sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const CTASectionExample = () => <Demos.CTASectionExample />;
CTASectionExample.storyName = "CTA section example";

export const CtaSimpleCentered = () => {
    const Variant = variantsA["cta-simple-centered"];
    return <Variant />;
};
CtaSimpleCentered.storyName = "Simple centered";

export const CtaSimpleLogos02 = () => {
    const Variant = variantsA["cta-simple-logos-02"];
    return <Variant />;
};
CtaSimpleLogos02.storyName = "Simple logos 02";

export const CtaSplitImage03 = () => {
    const Variant = variantsA["cta-split-image-03"];
    return <Variant />;
};
CtaSplitImage03.storyName = "Split image 03";

export const CtaSplitImageQuote02 = () => {
    const Variant = variantsA["cta-split-image-quote-02"];
    return <Variant />;
};
CtaSplitImageQuote02.storyName = "Split image quote 02";

export const CtaIphoneMockup01 = () => {
    const Variant = variantsA["cta-iphone-mockup-01"];
    return <Variant />;
};
CtaIphoneMockup01.storyName = "iPhone mockup 01";

export const CtaIphoneMockup04 = () => {
    const Variant = variantsA["cta-iphone-mockup-04"];
    return <Variant />;
};
CtaIphoneMockup04.storyName = "iPhone mockup 04";

export const CtaScreenMockup03 = () => {
    const Variant = variantsA["cta-screen-mockup-03"];
    return <Variant />;
};
CtaScreenMockup03.storyName = "Screen mockup 03";

export const CtaCardHorizontal = () => {
    const Variant = variantsA["cta-card-horizontal"];
    return <Variant />;
};
CtaCardHorizontal.storyName = "Card horizontal";

export const CtaSimpleLeftBrand = () => {
    const Variant = variantsA["cta-simple-left-brand"];
    return <Variant />;
};
CtaSimpleLeftBrand.storyName = "Simple left brand";

export const CtaCardHorizontalBrand = () => {
    const Variant = variantsA["cta-card-horizontal-brand"];
    return <Variant />;
};
CtaCardHorizontalBrand.storyName = "Card horizontal brand";

export const CtaSimpleLeft = () => {
    const Variant = variantsA["cta-simple-left"];
    return <Variant />;
};
CtaSimpleLeft.storyName = "Simple left";

export const CtaSplitImage01 = () => {
    const Variant = variantsA["cta-split-image-01"];
    return <Variant />;
};
CtaSplitImage01.storyName = "Split image 01";

export const CtaSplitImage04 = () => {
    const Variant = variantsA["cta-split-image-04"];
    return <Variant />;
};
CtaSplitImage04.storyName = "Split image 04";

export const CtaSplitImageQuote03 = () => {
    const Variant = variantsA["cta-split-image-quote-03"];
    return <Variant />;
};
CtaSplitImageQuote03.storyName = "Split image quote 03";

export const CtaIphoneMockup02 = () => {
    const Variant = variantsA["cta-iphone-mockup-02"];
    return <Variant />;
};
CtaIphoneMockup02.storyName = "iPhone mockup 02";
