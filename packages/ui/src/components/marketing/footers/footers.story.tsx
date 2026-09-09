import type { FC } from "react";
import * as Demos from "./footers.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Footers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full flex-col justify-end">
                <Story />
            </div>
        ),
    ],
};

export const FooterExample = () => <Demos.FooterExample />;
FooterExample.storyName = "Footer example";

export const FooterLarge01 = () => {
    const Variant = variantsA["footer-large-01"];
    return <Variant />;
};
FooterLarge01.storyName = "Large 01";

export const FooterLarge04 = () => {
    const Variant = variantsA["footer-large-04"];
    return <Variant />;
};
FooterLarge04.storyName = "Large 04";

export const FooterLarge07 = () => {
    const Variant = variantsA["footer-large-07"];
    return <Variant />;
};
FooterLarge07.storyName = "Large 07";

export const FooterLarge10 = () => {
    const Variant = variantsA["footer-large-10"];
    return <Variant />;
};
FooterLarge10.storyName = "Large 10";

export const FooterLarge13 = () => {
    const Variant = variantsA["footer-large-13"];
    return <Variant />;
};
FooterLarge13.storyName = "Large 13";

export const FooterLarge16 = () => {
    const Variant = variantsA["footer-large-16"];
    return <Variant />;
};
FooterLarge16.storyName = "Large 16";

export const FooterSmall03 = () => {
    const Variant = variantsA["footer-small-03"];
    return <Variant />;
};
FooterSmall03.storyName = "Small 03";

export const FooterLarge02Brand = () => {
    const Variant = variantsA["footer-large-02-brand"];
    return <Variant />;
};
FooterLarge02Brand.storyName = "Large 02 brand";

export const FooterLarge05Brand = () => {
    const Variant = variantsA["footer-large-05-brand"];
    return <Variant />;
};
FooterLarge05Brand.storyName = "Large 05 brand";

export const FooterLarge08Brand = () => {
    const Variant = variantsA["footer-large-08-brand"];
    return <Variant />;
};
FooterLarge08Brand.storyName = "Large 08 brand";

export const FooterLarge11Brand = () => {
    const Variant = variantsA["footer-large-11-brand"];
    return <Variant />;
};
FooterLarge11Brand.storyName = "Large 11 brand";

export const FooterLarge14Brand = () => {
    const Variant = variantsA["footer-large-14-brand"];
    return <Variant />;
};
FooterLarge14Brand.storyName = "Large 14 brand";

export const FooterSmall01Brand = () => {
    const Variant = variantsA["footer-small-01-brand"];
    return <Variant />;
};
FooterSmall01Brand.storyName = "Small 01 brand";

export const FooterSmall04Brand = () => {
    const Variant = variantsA["footer-small-04-brand"];
    return <Variant />;
};
FooterSmall04Brand.storyName = "Small 04 brand";

export const FooterLarge02 = () => {
    const Variant = variantsA["footer-large-02"];
    return <Variant />;
};
FooterLarge02.storyName = "Large 02";

export const FooterLarge05 = () => {
    const Variant = variantsA["footer-large-05"];
    return <Variant />;
};
FooterLarge05.storyName = "Large 05";

export const FooterLarge08 = () => {
    const Variant = variantsA["footer-large-08"];
    return <Variant />;
};
FooterLarge08.storyName = "Large 08";

export const FooterLarge11 = () => {
    const Variant = variantsA["footer-large-11"];
    return <Variant />;
};
FooterLarge11.storyName = "Large 11";

export const FooterLarge14 = () => {
    const Variant = variantsA["footer-large-14"];
    return <Variant />;
};
FooterLarge14.storyName = "Large 14";

export const FooterSmall01 = () => {
    const Variant = variantsA["footer-small-01"];
    return <Variant />;
};
FooterSmall01.storyName = "Small 01";
