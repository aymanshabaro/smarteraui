import type { FC } from "react";
import * as Demos from "./informational-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Informational pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const InformationalPageWithSidebarNavigationExample = () => <Demos.InformationalPageWithSidebarNavigationExample />;
InformationalPageWithSidebarNavigationExample.storyName = "Informational page with sidebar navigation example";

export const Informational01 = () => {
    const Variant = variantsA["informational-01"];
    return <Variant />;
};
Informational01.storyName = "Informational page 01";

export const Informational04 = () => {
    const Variant = variantsA["informational-04"];
    return <Variant />;
};
Informational04.storyName = "Informational page 04";

export const Informational07 = () => {
    const Variant = variantsA["informational-07"];
    return <Variant />;
};
Informational07.storyName = "Informational page 07";

export const Informational10 = () => {
    const Variant = variantsA["informational-10"];
    return <Variant />;
};
Informational10.storyName = "Informational page 10";

export const Informational13 = () => {
    const Variant = variantsA["informational-13"];
    return <Variant />;
};
Informational13.storyName = "Informational page 13";

export const Informational16 = () => {
    const Variant = variantsA["informational-16"];
    return <Variant />;
};
Informational16.storyName = "Informational page 16";

export const Informational19 = () => {
    const Variant = variantsA["informational-19"];
    return <Variant />;
};
Informational19.storyName = "Informational page 19";

export const Informational02 = () => {
    const Variant = variantsA["informational-02"];
    return <Variant />;
};
Informational02.storyName = "Informational page 02";

export const Informational05 = () => {
    const Variant = variantsA["informational-05"];
    return <Variant />;
};
Informational05.storyName = "Informational page 05";

export const Informational08 = () => {
    const Variant = variantsA["informational-08"];
    return <Variant />;
};
Informational08.storyName = "Informational page 08";

export const Informational11 = () => {
    const Variant = variantsA["informational-11"];
    return <Variant />;
};
Informational11.storyName = "Informational page 11";

export const Informational14 = () => {
    const Variant = variantsA["informational-14"];
    return <Variant />;
};
Informational14.storyName = "Informational page 14";

export const Informational17 = () => {
    const Variant = variantsA["informational-17"];
    return <Variant />;
};
Informational17.storyName = "Informational page 17";

export const Informational03 = () => {
    const Variant = variantsA["informational-03"];
    return <Variant />;
};
Informational03.storyName = "Informational page 03";

export const Informational06 = () => {
    const Variant = variantsA["informational-06"];
    return <Variant />;
};
Informational06.storyName = "Informational page 06";

export const Informational09 = () => {
    const Variant = variantsA["informational-09"];
    return <Variant />;
};
Informational09.storyName = "Informational page 09";

export const Informational12 = () => {
    const Variant = variantsA["informational-12"];
    return <Variant />;
};
Informational12.storyName = "Informational page 12";

export const Informational15 = () => {
    const Variant = variantsA["informational-15"];
    return <Variant />;
};
Informational15.storyName = "Informational page 15";

export const Informational18 = () => {
    const Variant = variantsA["informational-18"];
    return <Variant />;
};
Informational18.storyName = "Informational page 18";
