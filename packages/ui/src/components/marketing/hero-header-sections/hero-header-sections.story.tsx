import type { FC } from "react";
import * as Demos from "./hero-header-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Hero header sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const HeroHeaderSectionExample = () => <Demos.HeroHeaderSectionExample />;
HeroHeaderSectionExample.storyName = "Hero header section example";

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

export const HeroSplitImage02 = () => {
    const Variant = variantsA["hero-split-image-02"];
    return <Variant />;
};
HeroSplitImage02.storyName = "Hero split image 02";

export const HeroSplitImage05 = () => {
    const Variant = variantsA["hero-split-image-05"];
    return <Variant />;
};
HeroSplitImage05.storyName = "Hero split image 05";

export const HeroSplitForm02 = () => {
    const Variant = variantsA["hero-split-form-02"];
    return <Variant />;
};
HeroSplitForm02.storyName = "Hero split form 02";

export const HeroAbstractAngles03 = () => {
    const Variant = variantsA["hero-abstract-angles-03"];
    return <Variant />;
};
HeroAbstractAngles03.storyName = "Hero abstract angles 03";

export const HeroScreenMockup02 = () => {
    const Variant = variantsA["hero-screen-mockup-02"];
    return <Variant />;
};
HeroScreenMockup02.storyName = "Hero screen mockup 02";

export const HeroScreenMockup05 = () => {
    const Variant = variantsA["hero-screen-mockup-05"];
    return <Variant />;
};
HeroScreenMockup05.storyName = "Hero screen mockup 05";

export const HeroScreenMockup08 = () => {
    const Variant = variantsA["hero-screen-mockup-08"];
    return <Variant />;
};
HeroScreenMockup08.storyName = "Hero screen mockup 08";
