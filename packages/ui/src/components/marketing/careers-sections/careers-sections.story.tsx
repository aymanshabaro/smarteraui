import type { FC } from "react";
import * as Demos from "./careers-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Careers sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const CareersSectionExample = () => <Demos.CareersSectionExample />;
CareersSectionExample.storyName = "Careers section example";

export const CareersSimple01 = () => {
    const Variant = variantsA["careers-simple-01"];
    return <Variant />;
};
CareersSimple01.storyName = "Simple 01";

export const CareersSimple04 = () => {
    const Variant = variantsA["careers-simple-04"];
    return <Variant />;
};
CareersSimple04.storyName = "Simple 04";

export const CareersCard03 = () => {
    const Variant = variantsA["careers-card-03"];
    return <Variant />;
};
CareersCard03.storyName = "Card 03";

export const CareersSimple02Brand = () => {
    const Variant = variantsA["careers-simple-02-brand"];
    return <Variant />;
};
CareersSimple02Brand.storyName = "Simple 02 brand";

export const CareersSimple02 = () => {
    const Variant = variantsA["careers-simple-02"];
    return <Variant />;
};
CareersSimple02.storyName = "Simple 02";

export const CareersCard01 = () => {
    const Variant = variantsA["careers-card-01"];
    return <Variant />;
};
CareersCard01.storyName = "Card 01";

export const CareersCard04 = () => {
    const Variant = variantsA["careers-card-04"];
    return <Variant />;
};
CareersCard04.storyName = "Card 04";

export const CareersSimple03Brand = () => {
    const Variant = variantsA["careers-simple-03-brand"];
    return <Variant />;
};
CareersSimple03Brand.storyName = "Simple 03 brand";

export const CareersSimple03 = () => {
    const Variant = variantsA["careers-simple-03"];
    return <Variant />;
};
CareersSimple03.storyName = "Simple 03";

export const CareersCard02 = () => {
    const Variant = variantsA["careers-card-02"];
    return <Variant />;
};
CareersCard02.storyName = "Card 02";

export const CareersSimple01Brand = () => {
    const Variant = variantsA["careers-simple-01-brand"];
    return <Variant />;
};
CareersSimple01Brand.storyName = "Simple 01 brand";

export const CareersSimple04Brand = () => {
    const Variant = variantsA["careers-simple-04-brand"];
    return <Variant />;
};
CareersSimple04Brand.storyName = "Simple 04 brand";
