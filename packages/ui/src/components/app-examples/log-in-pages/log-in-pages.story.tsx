import type { FC } from "react";
import * as Demos from "./log-in-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Log in pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const LogInPageExample = () => <Demos.LogInPageExample />;
LogInPageExample.storyName = "Log in page example";

export const LoginSimple = () => {
    const Variant = variantsA["login-simple"];
    return <Variant />;
};
LoginSimple.storyName = "Log in simple";

export const LoginSimpleMinimal = () => {
    const Variant = variantsA["login-simple-minimal"];
    return <Variant />;
};
LoginSimpleMinimal.storyName = "Log in simple minimal";

export const LoginCardSeparated = () => {
    const Variant = variantsA["login-card-separated"];
    return <Variant />;
};
LoginCardSeparated.storyName = "Log in card separated";

export const LoginSplitMockup = () => {
    const Variant = variantsA["login-split-mockup"];
    return <Variant />;
};
LoginSplitMockup.storyName = "Log in split mockup";

export const LoginSplitQuote = () => {
    const Variant = variantsA["login-split-quote"];
    return <Variant />;
};
LoginSplitQuote.storyName = "Log in split quote";

export const LoginSplitQuoteImage03 = () => {
    const Variant = variantsA["login-split-quote-image-03"];
    return <Variant />;
};
LoginSplitQuoteImage03.storyName = "Log in split quote image 03";

export const LoginSimpleSocialLogins = () => {
    const Variant = variantsA["login-simple-social-logins"];
    return <Variant />;
};
LoginSimpleSocialLogins.storyName = "Log in simple with social logins";

export const LoginSimpleHeaderNavigation = () => {
    const Variant = variantsA["login-simple-header-navigation"];
    return <Variant />;
};
LoginSimpleHeaderNavigation.storyName = "Log in simple with header navigation";

export const LoginCardCombined = () => {
    const Variant = variantsA["login-card-combined"];
    return <Variant />;
};
LoginCardCombined.storyName = "Log in card combined";

export const LoginSplitMockupQuote = () => {
    const Variant = variantsA["login-split-mockup-quote"];
    return <Variant />;
};
LoginSplitMockupQuote.storyName = "Log in split mockup quote";

export const LoginSplitQuoteImage01 = () => {
    const Variant = variantsA["login-split-quote-image-01"];
    return <Variant />;
};
LoginSplitQuoteImage01.storyName = "Log in split quote image 01";

export const LoginSimpleSocialLoginLeading = () => {
    const Variant = variantsA["login-simple-social-login-leading"];
    return <Variant />;
};
LoginSimpleSocialLoginLeading.storyName = "Log in simple with social login leading";

export const LoginSimpleIllustration = () => {
    const Variant = variantsA["login-simple-illustration"];
    return <Variant />;
};
LoginSimpleIllustration.storyName = "Log in simple illustration";

export const LoginSplitCarousel = () => {
    const Variant = variantsA["login-split-carousel"];
    return <Variant />;
};
LoginSplitCarousel.storyName = "Log in split carousel";

export const LoginSplitImage = () => {
    const Variant = variantsA["login-split-image"];
    return <Variant />;
};
LoginSplitImage.storyName = "Log in split image";

export const LoginSplitQuoteImage02 = () => {
    const Variant = variantsA["login-split-quote-image-02"];
    return <Variant />;
};
LoginSplitQuoteImage02.storyName = "Log in split quote image 02";
