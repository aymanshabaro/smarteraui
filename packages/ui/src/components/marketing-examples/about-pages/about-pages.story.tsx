import type { FC } from "react";
import * as Demos from "./about-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/About pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const AboutPageExample = () => <Demos.AboutPageExample />;
AboutPageExample.storyName = "About page example";

export const AboutPage01 = () => {
    const Variant = variantsA["about-page-01"];
    return <Variant />;
};
AboutPage01.storyName = "About page 01";

export const AboutPage04 = () => {
    const Variant = variantsA["about-page-04"];
    return <Variant />;
};
AboutPage04.storyName = "About page 04";

export const AboutPage07 = () => {
    const Variant = variantsA["about-page-07"];
    return <Variant />;
};
AboutPage07.storyName = "About page 07";

export const AboutPage10 = () => {
    const Variant = variantsA["about-page-10"];
    return <Variant />;
};
AboutPage10.storyName = "About page 10";

export const AboutPage02 = () => {
    const Variant = variantsA["about-page-02"];
    return <Variant />;
};
AboutPage02.storyName = "About page 02";

export const AboutPage05 = () => {
    const Variant = variantsA["about-page-05"];
    return <Variant />;
};
AboutPage05.storyName = "About page 05";

export const AboutPage08 = () => {
    const Variant = variantsA["about-page-08"];
    return <Variant />;
};
AboutPage08.storyName = "About page 08";

export const AboutPage03 = () => {
    const Variant = variantsA["about-page-03"];
    return <Variant />;
};
AboutPage03.storyName = "About page 03";

export const AboutPage06 = () => {
    const Variant = variantsA["about-page-06"];
    return <Variant />;
};
AboutPage06.storyName = "About page 06";

export const AboutPage09 = () => {
    const Variant = variantsA["about-page-09"];
    return <Variant />;
};
AboutPage09.storyName = "About page 09";
