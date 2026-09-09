import type { FC } from "react";
import * as Demos from "./team-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Team sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const TeamSectionExample = () => <Demos.TeamSectionExample />;
TeamSectionExample.storyName = "Team section example";

export const TeamSectionSimple01 = () => {
    const Variant = variantsA["team-section-simple-01"];
    return <Variant />;
};
TeamSectionSimple01.storyName = "Simple 01";

export const TeamSectionSimple02 = () => {
    const Variant = variantsA["team-section-simple-02"];
    return <Variant />;
};
TeamSectionSimple02.storyName = "Simple 02";

export const TeamSectionSimple03 = () => {
    const Variant = variantsA["team-section-simple-03"];
    return <Variant />;
};
TeamSectionSimple03.storyName = "Simple 03";

export const TeamSectionSimple04 = () => {
    const Variant = variantsA["team-section-simple-04"];
    return <Variant />;
};
TeamSectionSimple04.storyName = "Simple 04";

export const TeamSectionImageCard01 = () => {
    const Variant = variantsA["team-section-image-card-01"];
    return <Variant />;
};
TeamSectionImageCard01.storyName = "Image card 01";

export const TeamSectionImageCard02 = () => {
    const Variant = variantsA["team-section-image-card-02"];
    return <Variant />;
};
TeamSectionImageCard02.storyName = "Image card 02";

export const TeamSectionImageCard03 = () => {
    const Variant = variantsA["team-section-image-card-03"];
    return <Variant />;
};
TeamSectionImageCard03.storyName = "Image card 03";

export const TeamSectionImageCard04 = () => {
    const Variant = variantsA["team-section-image-card-04"];
    return <Variant />;
};
TeamSectionImageCard04.storyName = "Image card 04";

export const TeamSectionImageGlass01 = () => {
    const Variant = variantsA["team-section-image-glass-01"];
    return <Variant />;
};
TeamSectionImageGlass01.storyName = "Image glass 01";

export const TeamSectionImageGlass02 = () => {
    const Variant = variantsA["team-section-image-glass-02"];
    return <Variant />;
};
TeamSectionImageGlass02.storyName = "Image glass 02";

export const TeamSectionImageGlass03 = () => {
    const Variant = variantsA["team-section-image-glass-03"];
    return <Variant />;
};
TeamSectionImageGlass03.storyName = "Image glass 03";

export const TeamSectionImageGlass04 = () => {
    const Variant = variantsA["team-section-image-glass-04"];
    return <Variant />;
};
TeamSectionImageGlass04.storyName = "Image glass 04";

export const TeamSectionImageCollage01 = () => {
    const Variant = variantsA["team-section-image-collage-01"];
    return <Variant />;
};
TeamSectionImageCollage01.storyName = "Image collage 01";

export const TeamSectionImageCollage02 = () => {
    const Variant = variantsA["team-section-image-collage-02"];
    return <Variant />;
};
TeamSectionImageCollage02.storyName = "Image collage 02";
