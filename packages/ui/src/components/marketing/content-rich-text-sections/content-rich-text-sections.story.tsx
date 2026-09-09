import type { FC } from "react";
import * as Demos from "./content-rich-text-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Content rich text sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const ContentRichTextSectionExample = () => <Demos.ContentRichTextSectionExample />;
ContentRichTextSectionExample.storyName = "Content rich text section example";

export const ContentLargeImage01 = () => {
    const Variant = variantsA["content-large-image-01"];
    return <Variant />;
};
ContentLargeImage01.storyName = "Large image 01";

export const ContentLargeImage04 = () => {
    const Variant = variantsA["content-large-image-04"];
    return <Variant />;
};
ContentLargeImage04.storyName = "Large image 04";

export const ContentSplitImage03 = () => {
    const Variant = variantsA["content-split-image-03"];
    return <Variant />;
};
ContentSplitImage03.storyName = "Split image 03";

export const ContentAlternative02 = () => {
    const Variant = variantsA["content-alternative-02"];
    return <Variant />;
};
ContentAlternative02.storyName = "Alternative 02";

export const ContentSectionSplitImage01 = () => {
    const Variant = variantsA["content-section-split-image-01"];
    return <Variant />;
};
ContentSectionSplitImage01.storyName = "Split image 01";

export const ContentSectionSimple01 = () => {
    const Variant = variantsA["content-section-simple-01"];
    return <Variant />;
};
ContentSectionSimple01.storyName = "Simple 01";

export const ContentSectionSimple04 = () => {
    const Variant = variantsA["content-section-simple-04"];
    return <Variant />;
};
ContentSectionSimple04.storyName = "Simple 04";

export const ContentSectionRichText02 = () => {
    const Variant = variantsA["content-section-rich-text-02"];
    return <Variant />;
};
ContentSectionRichText02.storyName = "Rich text 02";

export const ContentLargeImage02 = () => {
    const Variant = variantsA["content-large-image-02"];
    return <Variant />;
};
ContentLargeImage02.storyName = "Large image 02";

export const ContentSplitImage01 = () => {
    const Variant = variantsA["content-split-image-01"];
    return <Variant />;
};
ContentSplitImage01.storyName = "Split image 01";

export const ContentSplitImage04 = () => {
    const Variant = variantsA["content-split-image-04"];
    return <Variant />;
};
ContentSplitImage04.storyName = "Split image 04";

export const ContentAlternative03 = () => {
    const Variant = variantsA["content-alternative-03"];
    return <Variant />;
};
ContentAlternative03.storyName = "Alternative 03";

export const ContentSectionSplitImage02 = () => {
    const Variant = variantsA["content-section-split-image-02"];
    return <Variant />;
};
ContentSectionSplitImage02.storyName = "Split image 02";

export const ContentSectionSimple02 = () => {
    const Variant = variantsA["content-section-simple-02"];
    return <Variant />;
};
ContentSectionSimple02.storyName = "Simple 02";

export const ContentSectionSimple05 = () => {
    const Variant = variantsA["content-section-simple-05"];
    return <Variant />;
};
ContentSectionSimple05.storyName = "Simple 05";

export const ContentLargeImage03 = () => {
    const Variant = variantsA["content-large-image-03"];
    return <Variant />;
};
ContentLargeImage03.storyName = "Large image 03";

export const ContentSplitImage02 = () => {
    const Variant = variantsA["content-split-image-02"];
    return <Variant />;
};
ContentSplitImage02.storyName = "Split image 02";

export const ContentAlternative01 = () => {
    const Variant = variantsA["content-alternative-01"];
    return <Variant />;
};
ContentAlternative01.storyName = "Alternative 01";

export const ContentSimple = () => {
    const Variant = variantsA["content-simple"];
    return <Variant />;
};
ContentSimple.storyName = "Simple";

export const ContentSectionSplitImage03 = () => {
    const Variant = variantsA["content-section-split-image-03"];
    return <Variant />;
};
ContentSectionSplitImage03.storyName = "Split image 03";

export const ContentSectionSimple03 = () => {
    const Variant = variantsA["content-section-simple-03"];
    return <Variant />;
};
ContentSectionSimple03.storyName = "Simple 03";

export const ContentSectionRichText01 = () => {
    const Variant = variantsA["content-section-rich-text-01"];
    return <Variant />;
};
ContentSectionRichText01.storyName = "Rich text 01";
