import type { FC } from "react";
import * as Demos from "./page-headers.demo";

export default {
    title: "Application components/Page headers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full justify-center py-8">
                <div className="w-full max-w-3xl">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const PageHeaderExample = () => <Demos.PageHeaderExample />;
PageHeaderExample.storyName = "Page header example";

export const Simple = () => <Demos.Simple />;
Simple.storyName = "Simple";

export const Avatar = () => <Demos.Avatar />;
Avatar.storyName = "Avatar";

export const BannerSimple = () => <Demos.BannerSimple />;
BannerSimple.storyName = "Banner simple";

export const BannerAvatar = () => <Demos.BannerAvatar />;
BannerAvatar.storyName = "Banner avatar";

export const BannerSimpleCentered = () => <Demos.BannerSimpleCentered />;
BannerSimpleCentered.storyName = "Banner simple centered";

export const BannerAvatarCentered = () => <Demos.BannerAvatarCentered />;
BannerAvatarCentered.storyName = "Banner avatar centered";
