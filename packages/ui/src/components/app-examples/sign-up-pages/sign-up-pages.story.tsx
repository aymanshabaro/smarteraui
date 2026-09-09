import type { FC } from "react";
import * as Demos from "./sign-up-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Sign up pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const SignUpPageExample = () => <Demos.SignUpPageExample />;
SignUpPageExample.storyName = "Sign up page example";

export const SignupSimple = () => {
    const Variant = variantsA["signup-simple"];
    return <Variant />;
};
SignupSimple.storyName = "Sign up simple";

export const SignupSimpleHeaderNavigation = () => {
    const Variant = variantsA["signup-simple-header-navigation"];
    return <Variant />;
};
SignupSimpleHeaderNavigation.storyName = "Sign up simple with header navigation";

export const SignupProgress01 = () => {
    const Variant = variantsA["signup-progress-01"];
    return <Variant />;
};
SignupProgress01.storyName = "Sign up progress 01";

export const SignupSplitMockup = () => {
    const Variant = variantsA["signup-split-mockup"];
    return <Variant />;
};
SignupSplitMockup.storyName = "Sign up split mockup";

export const SignupSplitImage = () => {
    const Variant = variantsA["signup-split-image"];
    return <Variant />;
};
SignupSplitImage.storyName = "Sign up split image";

export const SignupSplitAppMockup = () => {
    const Variant = variantsA["signup-split-app-mockup"];
    return <Variant />;
};
SignupSplitAppMockup.storyName = "Sign up split app mockup";

export const SignupSplitQuoteCarousel = () => {
    const Variant = variantsA["signup-split-quote-carousel"];
    return <Variant />;
};
SignupSplitQuoteCarousel.storyName = "Sign up split quote carousel";

export const SignupSimpleSocialLogins = () => {
    const Variant = variantsA["signup-simple-social-logins"];
    return <Variant />;
};
SignupSimpleSocialLogins.storyName = "Sign up simple with social logins";

export const SignupCardSeparated = () => {
    const Variant = variantsA["signup-card-separated"];
    return <Variant />;
};
SignupCardSeparated.storyName = "Sign up card separated";

export const SignupProgress02 = () => {
    const Variant = variantsA["signup-progress-02"];
    return <Variant />;
};
SignupProgress02.storyName = "Sign up progress 02";

export const SignupSplitMockupQuote = () => {
    const Variant = variantsA["signup-split-mockup-quote"];
    return <Variant />;
};
SignupSplitMockupQuote.storyName = "Sign up split mockup quote";

export const SignupSplitQuoteImage01 = () => {
    const Variant = variantsA["signup-split-quote-image-01"];
    return <Variant />;
};
SignupSplitQuoteImage01.storyName = "Sign up split quote image 01";

export const SignupSplitArrow = () => {
    const Variant = variantsA["signup-split-arrow"];
    return <Variant />;
};
SignupSplitArrow.storyName = "Sign up split arrow";

export const SignupSidebarProgress01 = () => {
    const Variant = variantsA["signup-sidebar-progress-01"];
    return <Variant />;
};
SignupSidebarProgress01.storyName = "Sign up sidebar progress 01";

export const SignupSimpleSocialLoginLeading = () => {
    const Variant = variantsA["signup-simple-social-login-leading"];
    return <Variant />;
};
SignupSimpleSocialLoginLeading.storyName = "Sign up simple with social login leading";

export const SignupCardCombined = () => {
    const Variant = variantsA["signup-card-combined"];
    return <Variant />;
};
SignupCardCombined.storyName = "Sign up card combined";

export const SignupProgress03 = () => {
    const Variant = variantsA["signup-progress-03"];
    return <Variant />;
};
SignupProgress03.storyName = "Sign up progress 03";

export const SignupSplitCarousel = () => {
    const Variant = variantsA["signup-split-carousel"];
    return <Variant />;
};
SignupSplitCarousel.storyName = "Sign up split carousel";

export const SignupSplitQuoteImage02 = () => {
    const Variant = variantsA["signup-split-quote-image-02"];
    return <Variant />;
};
SignupSplitQuoteImage02.storyName = "Sign up split quote image 02";

export const SignupSplitImageBackground = () => {
    const Variant = variantsA["signup-split-image-background"];
    return <Variant />;
};
SignupSplitImageBackground.storyName = "Sign up split image background";

export const SignupSidebarProgress02 = () => {
    const Variant = variantsA["signup-sidebar-progress-02"];
    return <Variant />;
};
SignupSidebarProgress02.storyName = "Sign up sidebar progress 02";
