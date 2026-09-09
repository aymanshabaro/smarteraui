import type { FC } from "react";
import * as Demos from "./newsletter-cta-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Newsletter CTA sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const NewsletterCTASectionExample = () => <Demos.NewsletterCTASectionExample />;
NewsletterCTASectionExample.storyName = "Newsletter CTA section example";

export const NewsletterIphoneMockup01 = () => {
    const Variant = variantsA["newsletter-iphone-mockup-01"];
    return <Variant />;
};
NewsletterIphoneMockup01.storyName = "iPhone mockup 01";

export const NewsletterIphoneMockup04 = () => {
    const Variant = variantsA["newsletter-iphone-mockup-04"];
    return <Variant />;
};
NewsletterIphoneMockup04.storyName = "iPhone mockup 04";

export const NewsletterScreenMockup03 = () => {
    const Variant = variantsA["newsletter-screen-mockup-03"];
    return <Variant />;
};
NewsletterScreenMockup03.storyName = "Screen mockup 03";

export const NewsletterCardHorizontalBrand = () => {
    const Variant = variantsA["newsletter-card-horizontal-brand"];
    return <Variant />;
};
NewsletterCardHorizontalBrand.storyName = "Card horizontal brand";

export const NewsletterSimpleCentered = () => {
    const Variant = variantsA["newsletter-simple-centered"];
    return <Variant />;
};
NewsletterSimpleCentered.storyName = "Simple centered";

export const NewsletterSimpleLeftBrand = () => {
    const Variant = variantsA["newsletter-simple-left-brand"];
    return <Variant />;
};
NewsletterSimpleLeftBrand.storyName = "Simple left brand";

export const NewsletterIphoneMockup02 = () => {
    const Variant = variantsA["newsletter-iphone-mockup-02"];
    return <Variant />;
};
NewsletterIphoneMockup02.storyName = "iPhone mockup 02";

export const NewsletterScreenMockup01 = () => {
    const Variant = variantsA["newsletter-screen-mockup-01"];
    return <Variant />;
};
NewsletterScreenMockup01.storyName = "Screen mockup 01";

export const NewsletterScreenMockup04 = () => {
    const Variant = variantsA["newsletter-screen-mockup-04"];
    return <Variant />;
};
NewsletterScreenMockup04.storyName = "Screen mockup 04";

export const NewsletterCardVertical = () => {
    const Variant = variantsA["newsletter-card-vertical"];
    return <Variant />;
};
NewsletterCardVertical.storyName = "Card vertical";

export const NewsletterSimpleLeft = () => {
    const Variant = variantsA["newsletter-simple-left"];
    return <Variant />;
};
NewsletterSimpleLeft.storyName = "Simple left";

export const NewsletterIphoneMockup03 = () => {
    const Variant = variantsA["newsletter-iphone-mockup-03"];
    return <Variant />;
};
NewsletterIphoneMockup03.storyName = "iPhone mockup 03";

export const NewsletterScreenMockup02 = () => {
    const Variant = variantsA["newsletter-screen-mockup-02"];
    return <Variant />;
};
NewsletterScreenMockup02.storyName = "Screen mockup 02";

export const NewsletterCardHorizontal = () => {
    const Variant = variantsA["newsletter-card-horizontal"];
    return <Variant />;
};
NewsletterCardHorizontal.storyName = "Card horizontal";

export const NewsletterCardVerticalBrand = () => {
    const Variant = variantsA["newsletter-card-vertical-brand"];
    return <Variant />;
};
NewsletterCardVerticalBrand.storyName = "Card vertical brand";

export const NewsletterSimpleCenteredBrand = () => {
    const Variant = variantsA["newsletter-simple-centered-brand"];
    return <Variant />;
};
NewsletterSimpleCenteredBrand.storyName = "Simple centered brand";
