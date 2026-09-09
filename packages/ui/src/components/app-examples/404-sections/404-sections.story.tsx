import type { FC } from "react";
import * as Demos from "./404-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/404 sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const Section404Example = () => <Demos.Section404Example />;
Section404Example.storyName = "404 section example";

export const NotFoundSimple01 = () => {
    const Variant = variantsA["not-found-simple-01"];
    return <Variant />;
};
NotFoundSimple01.storyName = "Simple 01";

export const NotFoundSimple04 = () => {
    const Variant = variantsA["not-found-simple-04"];
    return <Variant />;
};
NotFoundSimple04.storyName = "Simple 04";

export const NotFoundSplitImage01 = () => {
    const Variant = variantsA["not-found-split-image-01"];
    return <Variant />;
};
NotFoundSplitImage01.storyName = "Split image 01";

export const NotFoundSplitImage04 = () => {
    const Variant = variantsA["not-found-split-image-04"];
    return <Variant />;
};
NotFoundSplitImage04.storyName = "Split image 04";

export const NotFoundIllustration01 = () => {
    const Variant = variantsA["not-found-illustration-01"];
    return <Variant />;
};
NotFoundIllustration01.storyName = "Illustration 01";

export const NotFoundSimple02 = () => {
    const Variant = variantsA["not-found-simple-02"];
    return <Variant />;
};
NotFoundSimple02.storyName = "Simple 02";

export const NotFoundSimple05 = () => {
    const Variant = variantsA["not-found-simple-05"];
    return <Variant />;
};
NotFoundSimple05.storyName = "Simple 05";

export const NotFoundSplitImage02 = () => {
    const Variant = variantsA["not-found-split-image-02"];
    return <Variant />;
};
NotFoundSplitImage02.storyName = "Split image 02";

export const NotFoundSplitImage05 = () => {
    const Variant = variantsA["not-found-split-image-05"];
    return <Variant />;
};
NotFoundSplitImage05.storyName = "Split image 05";

export const NotFoundIllustration02 = () => {
    const Variant = variantsA["not-found-illustration-02"];
    return <Variant />;
};
NotFoundIllustration02.storyName = "Illustration 02";

export const NotFoundSimple03 = () => {
    const Variant = variantsA["not-found-simple-03"];
    return <Variant />;
};
NotFoundSimple03.storyName = "Simple 03";

export const NotFoundSimple06 = () => {
    const Variant = variantsA["not-found-simple-06"];
    return <Variant />;
};
NotFoundSimple06.storyName = "Simple 06";

export const NotFoundSplitImage03 = () => {
    const Variant = variantsA["not-found-split-image-03"];
    return <Variant />;
};
NotFoundSplitImage03.storyName = "Split image 03";

export const NotFoundScreenMockup = () => {
    const Variant = variantsA["not-found-screen-mockup"];
    return <Variant />;
};
NotFoundScreenMockup.storyName = "Screen mockup";
