import type { FC } from "react";
import * as Demos from "./banners.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Banners",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full py-8">
                <Story />
            </div>
        ),
    ],
};

export const BannerExample = () => <Demos.BannerExample />;
BannerExample.storyName = "Banner example";

export const BannerTextFieldDefault = () => {
    const Variant = variantsA["banner-text-field-default"];
    return <Variant />;
};
BannerTextFieldDefault.storyName = "Text field default";

export const BannerSingleActionBrand = () => {
    const Variant = variantsA["banner-single-action-brand"];
    return <Variant />;
};
BannerSingleActionBrand.storyName = "Single action brand";

export const BannerSlimDefault = () => {
    const Variant = variantsA["banner-slim-default"];
    return <Variant />;
};
BannerSlimDefault.storyName = "Slim default";

export const BannerTextFieldBrandFullWidth = () => {
    const Variant = variantsA["banner-text-field-brand-full-width"];
    return <Variant />;
};
BannerTextFieldBrandFullWidth.storyName = "Text field brand full width";

export const BannerDualActionDefaultFullWidth = () => {
    const Variant = variantsA["banner-dual-action-default-full-width"];
    return <Variant />;
};
BannerDualActionDefaultFullWidth.storyName = "Dual action default full width";

export const BannerSlimBrandFullWidth = () => {
    const Variant = variantsA["banner-slim-brand-full-width"];
    return <Variant />;
};
BannerSlimBrandFullWidth.storyName = "Slim brand full width";

export const BannerCountdownDefaultFullWidth = () => {
    const Variant = variantsA["banner-countdown-default-full-width"];
    return <Variant />;
};
BannerCountdownDefaultFullWidth.storyName = "Countdown default full width";

export const BannerTextFieldBrand = () => {
    const Variant = variantsA["banner-text-field-brand"];
    return <Variant />;
};
BannerTextFieldBrand.storyName = "Text field brand";

export const BannerDualActionDefault = () => {
    const Variant = variantsA["banner-dual-action-default"];
    return <Variant />;
};
BannerDualActionDefault.storyName = "Dual action default";

export const BannerSlimBrand = () => {
    const Variant = variantsA["banner-slim-brand"];
    return <Variant />;
};
BannerSlimBrand.storyName = "Slim brand";

export const BannerSingleActionDefaultFullWidth = () => {
    const Variant = variantsA["banner-single-action-default-full-width"];
    return <Variant />;
};
BannerSingleActionDefaultFullWidth.storyName = "Single action default full width";

export const BannerDualActionBrandFullWidth = () => {
    const Variant = variantsA["banner-dual-action-brand-full-width"];
    return <Variant />;
};
BannerDualActionBrandFullWidth.storyName = "Dual action brand full width";

export const BannerCountdownDefault = () => {
    const Variant = variantsA["banner-countdown-default"];
    return <Variant />;
};
BannerCountdownDefault.storyName = "Countdown default";

export const BannerCountdownBrandFullWidth = () => {
    const Variant = variantsA["banner-countdown-brand-full-width"];
    return <Variant />;
};
BannerCountdownBrandFullWidth.storyName = "Countdown brand full width";

export const BannerSingleActionDefault = () => {
    const Variant = variantsA["banner-single-action-default"];
    return <Variant />;
};
BannerSingleActionDefault.storyName = "Single action default";

export const BannerDualActionBrand = () => {
    const Variant = variantsA["banner-dual-action-brand"];
    return <Variant />;
};
BannerDualActionBrand.storyName = "Dual action brand";

export const BannerTextFieldDefaultFullWidth = () => {
    const Variant = variantsA["banner-text-field-default-full-width"];
    return <Variant />;
};
BannerTextFieldDefaultFullWidth.storyName = "Text field default full width";

export const BannerSingleActionBrandFullWidth = () => {
    const Variant = variantsA["banner-single-action-brand-full-width"];
    return <Variant />;
};
BannerSingleActionBrandFullWidth.storyName = "Single action brand full width";

export const BannerSlimDefaultFullWidth = () => {
    const Variant = variantsA["banner-slim-default-full-width"];
    return <Variant />;
};
BannerSlimDefaultFullWidth.storyName = "Slim default full width";

export const BannerCountdownBrand = () => {
    const Variant = variantsA["banner-countdown-brand"];
    return <Variant />;
};
BannerCountdownBrand.storyName = "Countdown brand";
