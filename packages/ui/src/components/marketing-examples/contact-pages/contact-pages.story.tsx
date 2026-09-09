import type { FC } from "react";
import * as Demos from "./contact-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Contact pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const ContactPageExample = () => <Demos.ContactPageExample />;
ContactPageExample.storyName = "Contact page example";

export const ContactPage01 = () => {
    const Variant = variantsA["contact-page-01"];
    return <Variant />;
};
ContactPage01.storyName = "Contact page 01";

export const ContactPage04 = () => {
    const Variant = variantsA["contact-page-04"];
    return <Variant />;
};
ContactPage04.storyName = "Contact page 04";

export const ContactPage07 = () => {
    const Variant = variantsA["contact-page-07"];
    return <Variant />;
};
ContactPage07.storyName = "Contact page 07";

export const ContactPage10 = () => {
    const Variant = variantsA["contact-page-10"];
    return <Variant />;
};
ContactPage10.storyName = "Contact page 10";

export const ContactPage02 = () => {
    const Variant = variantsA["contact-page-02"];
    return <Variant />;
};
ContactPage02.storyName = "Contact page 02";

export const ContactPage05 = () => {
    const Variant = variantsA["contact-page-05"];
    return <Variant />;
};
ContactPage05.storyName = "Contact page 05";

export const ContactPage08 = () => {
    const Variant = variantsA["contact-page-08"];
    return <Variant />;
};
ContactPage08.storyName = "Contact page 08";

export const ContactPage03 = () => {
    const Variant = variantsA["contact-page-03"];
    return <Variant />;
};
ContactPage03.storyName = "Contact page 03";

export const ContactPage06 = () => {
    const Variant = variantsA["contact-page-06"];
    return <Variant />;
};
ContactPage06.storyName = "Contact page 06";

export const ContactPage09 = () => {
    const Variant = variantsA["contact-page-09"];
    return <Variant />;
};
ContactPage09.storyName = "Contact page 09";
