import type { FC } from "react";
import * as Demos from "./social-proof-sections.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Marketing components/Social proof sections",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const SocialProofSectionExample = () => <Demos.SocialProofSectionExample />;
SocialProofSectionExample.storyName = "Social proof section example";

export const SocialProofFullWidth = () => {
    const Variant = variantsA["social-proof-full-width"];
    return <Variant />;
};
SocialProofFullWidth.storyName = "Full width";

export const SocialProofCard = () => {
    const Variant = variantsA["social-proof-card"];
    return <Variant />;
};
SocialProofCard.storyName = "Card";

export const SocialProofFullWidthBrand = () => {
    const Variant = variantsA["social-proof-full-width-brand"];
    return <Variant />;
};
SocialProofFullWidthBrand.storyName = "Full width brand";

export const SocialProofCardBrand = () => {
    const Variant = variantsA["social-proof-card-brand"];
    return <Variant />;
};
SocialProofCardBrand.storyName = "Card brand";

export const SocialProofFullWidthDual = () => {
    const Variant = variantsA["social-proof-full-width-dual"];
    return <Variant />;
};
SocialProofFullWidthDual.storyName = "Full width dual";

export const SocialProofPressMentions = () => {
    const Variant = variantsA["social-proof-press-mentions"];
    return <Variant />;
};
SocialProofPressMentions.storyName = "Press mentions";

export const SocialProofFullWidthDualBrand = () => {
    const Variant = variantsA["social-proof-full-width-dual-brand"];
    return <Variant />;
};
SocialProofFullWidthDualBrand.storyName = "Full width dual brand";

export const SocialProofPressBrand = () => {
    const Variant = variantsA["social-proof-press-brand"];
    return <Variant />;
};
SocialProofPressBrand.storyName = "Press brand";

export const SocialProofFullWidthMasked = () => {
    const Variant = variantsA["social-proof-full-width-masked"];
    return <Variant />;
};
SocialProofFullWidthMasked.storyName = "Full width masked";

export const SocialProofCards = () => {
    const Variant = variantsA["social-proof-cards"];
    return <Variant />;
};
SocialProofCards.storyName = "Cards";

export const SocialProofFullWidthMaskedBrand = () => {
    const Variant = variantsA["social-proof-full-width-masked-brand"];
    return <Variant />;
};
SocialProofFullWidthMaskedBrand.storyName = "Full width masked brand";

export const SocialProofCardsBrand = () => {
    const Variant = variantsA["social-proof-cards-brand"];
    return <Variant />;
};
SocialProofCardsBrand.storyName = "Cards brand";
