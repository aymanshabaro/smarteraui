import type { FC } from "react";
import * as Demos from "./testimonial-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Testimonial sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const TestimonialsSectionExample = () => <Demos.TestimonialsSectionExample />;
TestimonialsSectionExample.storyName = "Testimonials section example";

export const TestimonialSimpleCentered01 = () => {
    const Variant = variantsA["testimonial-simple-centered-01"];
    return <Variant />;
};
TestimonialSimpleCentered01.storyName = "Simple centered 01";

export const TestimonialSimpleLeftAligned = () => {
    const Variant = variantsA["testimonial-simple-left-aligned"];
    return <Variant />;
};
TestimonialSimpleLeftAligned.storyName = "Simple left aligned";

export const TestimonialSplitImage03 = () => {
    const Variant = variantsA["testimonial-split-image-03"];
    return <Variant />;
};
TestimonialSplitImage03.storyName = "Split image 03";

export const TestimonialGlassmorphicCards02 = () => {
    const Variant = variantsA["testimonial-glassmorphic-cards-02"];
    return <Variant />;
};
TestimonialGlassmorphicCards02.storyName = "Glassmorphic cards 02";

export const TestimonialCard = () => {
    const Variant = variantsA["testimonial-card"];
    return <Variant />;
};
TestimonialCard.storyName = "Card";

export const TestimonialSocialCards02 = () => {
    const Variant = variantsA["testimonial-social-cards-02"];
    return <Variant />;
};
TestimonialSocialCards02.storyName = "Social cards 02";

export const TestimonialSimpleCentered02Brand = () => {
    const Variant = variantsA["testimonial-simple-centered-02-brand"];
    return <Variant />;
};
TestimonialSimpleCentered02Brand.storyName = "Simple centered 02 brand";

export const TestimonialCardBrand = () => {
    const Variant = variantsA["testimonial-card-brand"];
    return <Variant />;
};
TestimonialCardBrand.storyName = "Card brand";

export const TestimonialSocialCards02Brand = () => {
    const Variant = variantsA["testimonial-social-cards-02-brand"];
    return <Variant />;
};
TestimonialSocialCards02Brand.storyName = "Social cards 02 brand";

export const TestimonialSimpleCentered02 = () => {
    const Variant = variantsA["testimonial-simple-centered-02"];
    return <Variant />;
};
TestimonialSimpleCentered02.storyName = "Simple centered 02";

export const TestimonialSplitImage01 = () => {
    const Variant = variantsA["testimonial-split-image-01"];
    return <Variant />;
};
TestimonialSplitImage01.storyName = "Split image 01";

export const TestimonialAbstractImage = () => {
    const Variant = variantsA["testimonial-abstract-image"];
    return <Variant />;
};
TestimonialAbstractImage.storyName = "Abstract image";

export const TestimonialGlassmorphicCards03 = () => {
    const Variant = variantsA["testimonial-glassmorphic-cards-03"];
    return <Variant />;
};
TestimonialGlassmorphicCards03.storyName = "Glassmorphic cards 03";

export const TestimonialCardSplitImage = () => {
    const Variant = variantsA["testimonial-card-split-image"];
    return <Variant />;
};
TestimonialCardSplitImage.storyName = "Card split image";

export const TestimonialSocialCards03 = () => {
    const Variant = variantsA["testimonial-social-cards-03"];
    return <Variant />;
};
TestimonialSocialCards03.storyName = "Social cards 03";

export const TestimonialSimpleCentered03Brand = () => {
    const Variant = variantsA["testimonial-simple-centered-03-brand"];
    return <Variant />;
};
TestimonialSimpleCentered03Brand.storyName = "Simple centered 03 brand";

export const TestimonialCardSplitImageBrand = () => {
    const Variant = variantsA["testimonial-card-split-image-brand"];
    return <Variant />;
};
TestimonialCardSplitImageBrand.storyName = "Card split image brand";

export const TestimonialSocialCards03Brand = () => {
    const Variant = variantsA["testimonial-social-cards-03-brand"];
    return <Variant />;
};
TestimonialSocialCards03Brand.storyName = "Social cards 03 brand";

export const TestimonialSimpleCentered03 = () => {
    const Variant = variantsA["testimonial-simple-centered-03"];
    return <Variant />;
};
TestimonialSimpleCentered03.storyName = "Simple centered 03";

export const TestimonialSplitImage02 = () => {
    const Variant = variantsA["testimonial-split-image-02"];
    return <Variant />;
};
TestimonialSplitImage02.storyName = "Split image 02";

export const TestimonialGlassmorphicCards01 = () => {
    const Variant = variantsA["testimonial-glassmorphic-cards-01"];
    return <Variant />;
};
TestimonialGlassmorphicCards01.storyName = "Glassmorphic cards 01";

export const TestimonialCaseStudyCards = () => {
    const Variant = variantsA["testimonial-case-study-cards"];
    return <Variant />;
};
TestimonialCaseStudyCards.storyName = "Case study cards";

export const TestimonialSocialCards01 = () => {
    const Variant = variantsA["testimonial-social-cards-01"];
    return <Variant />;
};
TestimonialSocialCards01.storyName = "Social cards 01";

export const TestimonialSimpleCentered01Brand = () => {
    const Variant = variantsA["testimonial-simple-centered-01-brand"];
    return <Variant />;
};
TestimonialSimpleCentered01Brand.storyName = "Simple centered 01 brand";

export const TestimonialSimpleLeftAlignedBrand = () => {
    const Variant = variantsA["testimonial-simple-left-aligned-brand"];
    return <Variant />;
};
TestimonialSimpleLeftAlignedBrand.storyName = "Simple left aligned brand";

export const TestimonialSocialCards01Brand = () => {
    const Variant = variantsA["testimonial-social-cards-01-brand"];
    return <Variant />;
};
TestimonialSocialCards01Brand.storyName = "Social cards 01 brand";
