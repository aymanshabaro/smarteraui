import type { FC } from "react";
import * as Demos from "./landing-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Landing pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const LandingPageExample = () => <Demos.LandingPageExample />;
LandingPageExample.storyName = "Landing page example";

export const LandingPage01 = () => {
    const Variant = variantsA["landing-page-01"];
    return <Variant />;
};
LandingPage01.storyName = "Landing page 01";

export const LandingPage04 = () => {
    const Variant = variantsA["landing-page-04"];
    return <Variant />;
};
LandingPage04.storyName = "Landing page 04";

export const LandingPage07 = () => {
    const Variant = variantsA["landing-page-07"];
    return <Variant />;
};
LandingPage07.storyName = "Landing page 07";

export const LandingPage10 = () => {
    const Variant = variantsA["landing-page-10"];
    return <Variant />;
};
LandingPage10.storyName = "Landing page 10";

export const LandingPage13 = () => {
    const Variant = variantsA["landing-page-13"];
    return <Variant />;
};
LandingPage13.storyName = "Landing page 13";

export const LandingPage16 = () => {
    const Variant = variantsA["landing-page-16"];
    return <Variant />;
};
LandingPage16.storyName = "Landing page 16";

export const LandingPage19 = () => {
    const Variant = variantsA["landing-page-19"];
    return <Variant />;
};
LandingPage19.storyName = "Landing page 19";

export const LandingPage02 = () => {
    const Variant = variantsA["landing-page-02"];
    return <Variant />;
};
LandingPage02.storyName = "Landing page 02";

export const LandingPage05 = () => {
    const Variant = variantsA["landing-page-05"];
    return <Variant />;
};
LandingPage05.storyName = "Landing page 05";

export const LandingPage08 = () => {
    const Variant = variantsA["landing-page-08"];
    return <Variant />;
};
LandingPage08.storyName = "Landing page 08";

export const LandingPage11 = () => {
    const Variant = variantsA["landing-page-11"];
    return <Variant />;
};
LandingPage11.storyName = "Landing page 11";

export const LandingPage14 = () => {
    const Variant = variantsA["landing-page-14"];
    return <Variant />;
};
LandingPage14.storyName = "Landing page 14";

export const LandingPage17 = () => {
    const Variant = variantsA["landing-page-17"];
    return <Variant />;
};
LandingPage17.storyName = "Landing page 17";

export const LandingPage20 = () => {
    const Variant = variantsA["landing-page-20"];
    return <Variant />;
};
LandingPage20.storyName = "Landing page 20";

export const LandingPage03 = () => {
    const Variant = variantsA["landing-page-03"];
    return <Variant />;
};
LandingPage03.storyName = "Landing page 03";

export const LandingPage06 = () => {
    const Variant = variantsA["landing-page-06"];
    return <Variant />;
};
LandingPage06.storyName = "Landing page 06";

export const LandingPage09 = () => {
    const Variant = variantsA["landing-page-09"];
    return <Variant />;
};
LandingPage09.storyName = "Landing page 09";

export const LandingPage12 = () => {
    const Variant = variantsA["landing-page-12"];
    return <Variant />;
};
LandingPage12.storyName = "Landing page 12";

export const LandingPage15 = () => {
    const Variant = variantsA["landing-page-15"];
    return <Variant />;
};
LandingPage15.storyName = "Landing page 15";

export const LandingPage18 = () => {
    const Variant = variantsA["landing-page-18"];
    return <Variant />;
};
LandingPage18.storyName = "Landing page 18";
