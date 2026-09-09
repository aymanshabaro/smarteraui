import type { FC } from "react";
import * as Demos from "./header-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Header sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const HeaderSectionExample = () => <Demos.HeaderSectionExample />;
HeaderSectionExample.storyName = "Header section example";

export const HeroSplitImage01 = () => {
    const Variant = variantsA["hero-split-image-01"];
    return <Variant />;
};
HeroSplitImage01.storyName = "Hero split image 01";

export const HeroSplitImage04 = () => {
    const Variant = variantsA["hero-split-image-04"];
    return <Variant />;
};
HeroSplitImage04.storyName = "Hero split image 04";

export const HeroSplitForm01 = () => {
    const Variant = variantsA["hero-split-form-01"];
    return <Variant />;
};
HeroSplitForm01.storyName = "Hero split form 01";

export const HeroAbstractAngles02 = () => {
    const Variant = variantsA["hero-abstract-angles-02"];
    return <Variant />;
};
HeroAbstractAngles02.storyName = "Hero abstract angles 02";

export const HeroScreenMockup01 = () => {
    const Variant = variantsA["hero-screen-mockup-01"];
    return <Variant />;
};
HeroScreenMockup01.storyName = "Hero screen mockup 01";

export const HeroScreenMockup04 = () => {
    const Variant = variantsA["hero-screen-mockup-04"];
    return <Variant />;
};
HeroScreenMockup04.storyName = "Hero screen mockup 04";

export const HeroScreenMockup07 = () => {
    const Variant = variantsA["hero-screen-mockup-07"];
    return <Variant />;
};
HeroScreenMockup07.storyName = "Hero screen mockup 07";

export const HeroIphoneMockup02 = () => {
    const Variant = variantsA["hero-iphone-mockup-02"];
    return <Variant />;
};
HeroIphoneMockup02.storyName = "Hero iPhone mockup 02";

export const HeroColorCard01 = () => {
    const Variant = variantsA["hero-color-card-01"];
    return <Variant />;
};
HeroColorCard01.storyName = "Hero color card 01";

export const HeroColorCard04 = () => {
    const Variant = variantsA["hero-color-card-04"];
    return <Variant />;
};
HeroColorCard04.storyName = "Hero color card 04";

export const HeroCardMockup03 = () => {
    const Variant = variantsA["hero-card-mockup-03"];
    return <Variant />;
};
HeroCardMockup03.storyName = "Hero card mockup 03";

export const HeroCardMockup06 = () => {
    const Variant = variantsA["hero-card-mockup-06"];
    return <Variant />;
};
HeroCardMockup06.storyName = "Hero card mockup 06";

export const HeroCardMockup09 = () => {
    const Variant = variantsA["hero-card-mockup-09"];
    return <Variant />;
};
HeroCardMockup09.storyName = "Hero card mockup 09";

export const HeroSimpleText01 = () => {
    const Variant = variantsA["hero-simple-text-01"];
    return <Variant />;
};
HeroSimpleText01.storyName = "Hero simple text 01";

export const HeroGeometricShapes03 = () => {
    const Variant = variantsA["hero-geometric-shapes-03"];
    return <Variant />;
};
HeroGeometricShapes03.storyName = "Hero geometric shapes 03";

export const HeaderCenteredButtons = () => {
    const Variant = variantsA["header-centered-buttons"];
    return <Variant />;
};
HeaderCenteredButtons.storyName = "Header centered buttons";

export const HeaderCenteredSearch = () => {
    const Variant = variantsA["header-centered-search"];
    return <Variant />;
};
HeaderCenteredSearch.storyName = "Header centered search";

export const HeaderLeftTabs = () => {
    const Variant = variantsA["header-left-tabs"];
    return <Variant />;
};
HeaderLeftTabs.storyName = "Header left tabs";

export const HeaderSpaceBetween = () => {
    const Variant = variantsA["header-space-between"];
    return <Variant />;
};
HeaderSpaceBetween.storyName = "Header space between";

export const HeaderSpaceBetweenEmail = () => {
    const Variant = variantsA["header-space-between-email"];
    return <Variant />;
};
HeaderSpaceBetweenEmail.storyName = "Header space between email";

export const HeaderCenteredButtonsBrand = () => {
    const Variant = variantsA["header-centered-buttons-brand"];
    return <Variant />;
};
HeaderCenteredButtonsBrand.storyName = "Header centered buttons brand";

export const HeaderCenteredSearchBrand = () => {
    const Variant = variantsA["header-centered-search-brand"];
    return <Variant />;
};
HeaderCenteredSearchBrand.storyName = "Header centered search brand";

export const HeaderLeftTabsBrand = () => {
    const Variant = variantsA["header-left-tabs-brand"];
    return <Variant />;
};
HeaderLeftTabsBrand.storyName = "Header left tabs brand";

export const HeaderSpaceBetweenBrand = () => {
    const Variant = variantsA["header-space-between-brand"];
    return <Variant />;
};
HeaderSpaceBetweenBrand.storyName = "Header space between brand";

export const HeaderSpaceBetweenEmailBrand = () => {
    const Variant = variantsA["header-space-between-email-brand"];
    return <Variant />;
};
HeaderSpaceBetweenEmailBrand.storyName = "Header space between email brand";
