import type { FC } from "react";
import * as Demos from "./faq-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/FAQ pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const FAQPageExample = () => <Demos.FAQPageExample />;
FAQPageExample.storyName = "FAQ page example";

export const FaqPage01 = () => {
    const Variant = variantsA["faq-page-01"];
    return <Variant />;
};
FaqPage01.storyName = "FAQ page 01";

export const FaqPage04 = () => {
    const Variant = variantsA["faq-page-04"];
    return <Variant />;
};
FaqPage04.storyName = "FAQ page 04";

export const FaqPage07 = () => {
    const Variant = variantsA["faq-page-07"];
    return <Variant />;
};
FaqPage07.storyName = "FAQ page 07";

export const FaqPage10 = () => {
    const Variant = variantsA["faq-page-10"];
    return <Variant />;
};
FaqPage10.storyName = "FAQ page 10";

export const FaqPage02 = () => {
    const Variant = variantsA["faq-page-02"];
    return <Variant />;
};
FaqPage02.storyName = "FAQ page 02";

export const FaqPage05 = () => {
    const Variant = variantsA["faq-page-05"];
    return <Variant />;
};
FaqPage05.storyName = "FAQ page 05";

export const FaqPage08 = () => {
    const Variant = variantsA["faq-page-08"];
    return <Variant />;
};
FaqPage08.storyName = "FAQ page 08";

export const FaqPage03 = () => {
    const Variant = variantsA["faq-page-03"];
    return <Variant />;
};
FaqPage03.storyName = "FAQ page 03";

export const FaqPage06 = () => {
    const Variant = variantsA["faq-page-06"];
    return <Variant />;
};
FaqPage06.storyName = "FAQ page 06";

export const FaqPage09 = () => {
    const Variant = variantsA["faq-page-09"];
    return <Variant />;
};
FaqPage09.storyName = "FAQ page 09";
