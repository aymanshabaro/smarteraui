import type { FC } from "react";
import * as Demos from "./settings-pages-02.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Settings pages with header navigation",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const SettingsPageWithHeaderNavigationExample = () => <Demos.SettingsPageWithHeaderNavigationExample />;
SettingsPageWithHeaderNavigationExample.storyName = "Settings page with header navigation example";

export const Settings01 = () => {
    const Variant = variantsA["settings-01"];
    return <Variant />;
};
Settings01.storyName = "Settings 01";

export const Settings04 = () => {
    const Variant = variantsA["settings-04"];
    return <Variant />;
};
Settings04.storyName = "Settings 04";

export const Settings07 = () => {
    const Variant = variantsA["settings-07"];
    return <Variant />;
};
Settings07.storyName = "Settings 07";

export const Settings10 = () => {
    const Variant = variantsA["settings-10"];
    return <Variant />;
};
Settings10.storyName = "Settings 10";

export const Settings13 = () => {
    const Variant = variantsA["settings-13"];
    return <Variant />;
};
Settings13.storyName = "Settings 13";

export const Settings16 = () => {
    const Variant = variantsA["settings-16"];
    return <Variant />;
};
Settings16.storyName = "Settings 16";

export const Settings19 = () => {
    const Variant = variantsA["settings-19"];
    return <Variant />;
};
Settings19.storyName = "Settings 19";

export const Settings02 = () => {
    const Variant = variantsA["settings-02"];
    return <Variant />;
};
Settings02.storyName = "Settings 02";

export const Settings05 = () => {
    const Variant = variantsA["settings-05"];
    return <Variant />;
};
Settings05.storyName = "Settings 05";

export const Settings08 = () => {
    const Variant = variantsA["settings-08"];
    return <Variant />;
};
Settings08.storyName = "Settings 08";

export const Settings11 = () => {
    const Variant = variantsA["settings-11"];
    return <Variant />;
};
Settings11.storyName = "Settings 11";

export const Settings14 = () => {
    const Variant = variantsA["settings-14"];
    return <Variant />;
};
Settings14.storyName = "Settings 14";

export const Settings17 = () => {
    const Variant = variantsA["settings-17"];
    return <Variant />;
};
Settings17.storyName = "Settings 17";

export const Settings20 = () => {
    const Variant = variantsA["settings-20"];
    return <Variant />;
};
Settings20.storyName = "Settings 20";

export const Settings03 = () => {
    const Variant = variantsA["settings-03"];
    return <Variant />;
};
Settings03.storyName = "Settings 03";

export const Settings06 = () => {
    const Variant = variantsA["settings-06"];
    return <Variant />;
};
Settings06.storyName = "Settings 06";

export const Settings09 = () => {
    const Variant = variantsA["settings-09"];
    return <Variant />;
};
Settings09.storyName = "Settings 09";

export const Settings12 = () => {
    const Variant = variantsA["settings-12"];
    return <Variant />;
};
Settings12.storyName = "Settings 12";

export const Settings15 = () => {
    const Variant = variantsA["settings-15"];
    return <Variant />;
};
Settings15.storyName = "Settings 15";

export const Settings18 = () => {
    const Variant = variantsA["settings-18"];
    return <Variant />;
};
Settings18.storyName = "Settings 18";

export const Settings21 = () => {
    const Variant = variantsA["settings-21"];
    return <Variant />;
};
Settings21.storyName = "Settings 21";
