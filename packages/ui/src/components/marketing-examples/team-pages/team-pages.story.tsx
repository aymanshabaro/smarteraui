import type { FC } from "react";
import * as Demos from "./team-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Team pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const TeamPageExample = () => <Demos.TeamPageExample />;
TeamPageExample.storyName = "Team page example";

export const TeamPage01 = () => {
    const Variant = variantsA["team-page-01"];
    return <Variant />;
};
TeamPage01.storyName = "Team page 01";

export const TeamPage04 = () => {
    const Variant = variantsA["team-page-04"];
    return <Variant />;
};
TeamPage04.storyName = "Team page 04";

export const TeamPage07 = () => {
    const Variant = variantsA["team-page-07"];
    return <Variant />;
};
TeamPage07.storyName = "Team page 07";

export const TeamPage10 = () => {
    const Variant = variantsA["team-page-10"];
    return <Variant />;
};
TeamPage10.storyName = "Team page 10";

export const TeamPage02 = () => {
    const Variant = variantsA["team-page-02"];
    return <Variant />;
};
TeamPage02.storyName = "Team page 02";

export const TeamPage05 = () => {
    const Variant = variantsA["team-page-05"];
    return <Variant />;
};
TeamPage05.storyName = "Team page 05";

export const TeamPage08 = () => {
    const Variant = variantsA["team-page-08"];
    return <Variant />;
};
TeamPage08.storyName = "Team page 08";

export const TeamPage03 = () => {
    const Variant = variantsA["team-page-03"];
    return <Variant />;
};
TeamPage03.storyName = "Team page 03";

export const TeamPage06 = () => {
    const Variant = variantsA["team-page-06"];
    return <Variant />;
};
TeamPage06.storyName = "Team page 06";

export const TeamPage09 = () => {
    const Variant = variantsA["team-page-09"];
    return <Variant />;
};
TeamPage09.storyName = "Team page 09";
