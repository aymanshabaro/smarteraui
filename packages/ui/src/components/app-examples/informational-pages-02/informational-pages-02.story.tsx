import type { FC } from "react";
import * as Demos from "./informational-pages-02.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Informational pages with header navigation",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const InformationalPageWithHeaderNavigationExample = () => <Demos.InformationalPageWithHeaderNavigationExample />;
InformationalPageWithHeaderNavigationExample.storyName = "Informational page with header navigation example";

export const Informational01 = () => {
    const Variant = variantsA["informational-01"];
    return <Variant />;
};
Informational01.storyName = "Informational 01";

export const Informational04 = () => {
    const Variant = variantsA["informational-04"];
    return <Variant />;
};
Informational04.storyName = "Informational 04";

export const Informational07 = () => {
    const Variant = variantsA["informational-07"];
    return <Variant />;
};
Informational07.storyName = "Informational 07";

export const Informational10 = () => {
    const Variant = variantsA["informational-10"];
    return <Variant />;
};
Informational10.storyName = "Informational 10";

export const Informational13 = () => {
    const Variant = variantsA["informational-13"];
    return <Variant />;
};
Informational13.storyName = "Informational 13";

export const Informational16 = () => {
    const Variant = variantsA["informational-16"];
    return <Variant />;
};
Informational16.storyName = "Informational 16";

export const Informational19 = () => {
    const Variant = variantsA["informational-19"];
    return <Variant />;
};
Informational19.storyName = "Informational 19";

export const Informational02 = () => {
    const Variant = variantsA["informational-02"];
    return <Variant />;
};
Informational02.storyName = "Informational 02";

export const Informational05 = () => {
    const Variant = variantsA["informational-05"];
    return <Variant />;
};
Informational05.storyName = "Informational 05";

export const Informational08 = () => {
    const Variant = variantsA["informational-08"];
    return <Variant />;
};
Informational08.storyName = "Informational 08";

export const Informational11 = () => {
    const Variant = variantsA["informational-11"];
    return <Variant />;
};
Informational11.storyName = "Informational 11";

export const Informational14 = () => {
    const Variant = variantsA["informational-14"];
    return <Variant />;
};
Informational14.storyName = "Informational 14";

export const Informational17 = () => {
    const Variant = variantsA["informational-17"];
    return <Variant />;
};
Informational17.storyName = "Informational 17";

export const Informational03 = () => {
    const Variant = variantsA["informational-03"];
    return <Variant />;
};
Informational03.storyName = "Informational 03";

export const Informational06 = () => {
    const Variant = variantsA["informational-06"];
    return <Variant />;
};
Informational06.storyName = "Informational 06";

export const Informational09 = () => {
    const Variant = variantsA["informational-09"];
    return <Variant />;
};
Informational09.storyName = "Informational 09";

export const Informational12 = () => {
    const Variant = variantsA["informational-12"];
    return <Variant />;
};
Informational12.storyName = "Informational 12";

export const Informational15 = () => {
    const Variant = variantsA["informational-15"];
    return <Variant />;
};
Informational15.storyName = "Informational 15";

export const Informational18 = () => {
    const Variant = variantsA["informational-18"];
    return <Variant />;
};
Informational18.storyName = "Informational 18";
