import type { FC } from "react";
import * as Demos from "./faq-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/FAQ sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const FAQSectionExample = () => <Demos.FAQSectionExample />;
FAQSectionExample.storyName = "FAQ section example";

export const FaqSimple01 = () => {
    const Variant = variantsA["faq-simple-01"];
    return <Variant />;
};
FaqSimple01.storyName = "Simple 01";

export const FaqSimple04 = () => {
    const Variant = variantsA["faq-simple-04"];
    return <Variant />;
};
FaqSimple04.storyName = "Simple 04";

export const FaqAccordion03 = () => {
    const Variant = variantsA["faq-accordion-03"];
    return <Variant />;
};
FaqAccordion03.storyName = "Accordion 03";

export const FaqSimple02Brand = () => {
    const Variant = variantsA["faq-simple-02-brand"];
    return <Variant />;
};
FaqSimple02Brand.storyName = "Simple 02 brand";

export const FaqAccordion01Brand = () => {
    const Variant = variantsA["faq-accordion-01-brand"];
    return <Variant />;
};
FaqAccordion01Brand.storyName = "Accordion 01 brand";

export const FaqAccordion04Brand = () => {
    const Variant = variantsA["faq-accordion-04-brand"];
    return <Variant />;
};
FaqAccordion04Brand.storyName = "Accordion 04 brand";

export const FaqSimple02 = () => {
    const Variant = variantsA["faq-simple-02"];
    return <Variant />;
};
FaqSimple02.storyName = "Simple 02";

export const FaqAccordion01 = () => {
    const Variant = variantsA["faq-accordion-01"];
    return <Variant />;
};
FaqAccordion01.storyName = "Accordion 01";

export const FaqAccordion04 = () => {
    const Variant = variantsA["faq-accordion-04"];
    return <Variant />;
};
FaqAccordion04.storyName = "Accordion 04";

export const FaqSimple03Brand = () => {
    const Variant = variantsA["faq-simple-03-brand"];
    return <Variant />;
};
FaqSimple03Brand.storyName = "Simple 03 brand";

export const FaqAccordion02Brand = () => {
    const Variant = variantsA["faq-accordion-02-brand"];
    return <Variant />;
};
FaqAccordion02Brand.storyName = "Accordion 02 brand";

export const FaqSimple03 = () => {
    const Variant = variantsA["faq-simple-03"];
    return <Variant />;
};
FaqSimple03.storyName = "Simple 03";

export const FaqAccordion02 = () => {
    const Variant = variantsA["faq-accordion-02"];
    return <Variant />;
};
FaqAccordion02.storyName = "Accordion 02";

export const FaqSimple01Brand = () => {
    const Variant = variantsA["faq-simple-01-brand"];
    return <Variant />;
};
FaqSimple01Brand.storyName = "Simple 01 brand";

export const FaqSimple04Brand = () => {
    const Variant = variantsA["faq-simple-04-brand"];
    return <Variant />;
};
FaqSimple04Brand.storyName = "Simple 04 brand";

export const FaqAccordion03Brand = () => {
    const Variant = variantsA["faq-accordion-03-brand"];
    return <Variant />;
};
FaqAccordion03Brand.storyName = "Accordion 03 brand";
