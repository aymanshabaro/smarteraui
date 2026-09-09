import type { FC } from "react";
import * as Demos from "./contact-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Contact sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const ContactSectionExample = () => <Demos.ContactSectionExample />;
ContactSectionExample.storyName = "Contact section example";

export const ContactSimpleForm = () => {
    const Variant = variantsA["contact-simple-form"];
    return <Variant />;
};
ContactSimpleForm.storyName = "Simple form";

export const ContactFormAndImage02 = () => {
    const Variant = variantsA["contact-form-and-image-02"];
    return <Variant />;
};
ContactFormAndImage02.storyName = "Form and image 02";

export const ContactMap01 = () => {
    const Variant = variantsA["contact-map-01"];
    return <Variant />;
};
ContactMap01.storyName = "Map 01";

export const ContactSimpleIcons02 = () => {
    const Variant = variantsA["contact-simple-icons-02"];
    return <Variant />;
};
ContactSimpleIcons02.storyName = "Simple icons 02";

export const ContactIconsAndForm = () => {
    const Variant = variantsA["contact-icons-and-form"];
    return <Variant />;
};
ContactIconsAndForm.storyName = "Icons and form";

export const ContactIconsAndImage = () => {
    const Variant = variantsA["contact-icons-and-image"];
    return <Variant />;
};
ContactIconsAndImage.storyName = "Icons and image";

export const ContactIconCards03 = () => {
    const Variant = variantsA["contact-icon-cards-03"];
    return <Variant />;
};
ContactIconCards03.storyName = "Icon cards 03";

export const ContactFeaturesTabsMap02 = () => {
    const Variant = variantsA["contact-features-tabs-map-02"];
    return <Variant />;
};
ContactFeaturesTabsMap02.storyName = "Features tabs map 02";

export const ContactSimpleForm02 = () => {
    const Variant = variantsA["contact-simple-form-02"];
    return <Variant />;
};
ContactSimpleForm02.storyName = "Simple form 02";

export const ContactSimpleForm05 = () => {
    const Variant = variantsA["contact-simple-form-05"];
    return <Variant />;
};
ContactSimpleForm05.storyName = "Simple form 05";

export const ContactSimpleIcons03Brand = () => {
    const Variant = variantsA["contact-simple-icons-03-brand"];
    return <Variant />;
};
ContactSimpleIcons03Brand.storyName = "Simple icons 03 brand";

export const ContactIconsAndMap01Brand = () => {
    const Variant = variantsA["contact-icons-and-map-01-brand"];
    return <Variant />;
};
ContactIconsAndMap01Brand.storyName = "Icons and map 01 brand";

export const ContactFormAndMap = () => {
    const Variant = variantsA["contact-form-and-map"];
    return <Variant />;
};
ContactFormAndMap.storyName = "Form and map";

export const ContactSimpleLinks01 = () => {
    const Variant = variantsA["contact-simple-links-01"];
    return <Variant />;
};
ContactSimpleLinks01.storyName = "Simple links 01";

export const ContactMap02 = () => {
    const Variant = variantsA["contact-map-02"];
    return <Variant />;
};
ContactMap02.storyName = "Map 02";

export const ContactSimpleIcons03 = () => {
    const Variant = variantsA["contact-simple-icons-03"];
    return <Variant />;
};
ContactSimpleIcons03.storyName = "Simple icons 03";

export const ContactIconsAndMap01 = () => {
    const Variant = variantsA["contact-icons-and-map-01"];
    return <Variant />;
};
ContactIconsAndMap01.storyName = "Icons and map 01";

export const ContactIconCards01 = () => {
    const Variant = variantsA["contact-icon-cards-01"];
    return <Variant />;
};
ContactIconCards01.storyName = "Icon cards 01";
