import type { FC } from "react";
import * as Buttons from "@/components/base/buttons/social-buttons.demo";

export default {
    title: "Base components/Social buttons",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const SocialButtonsExample = () => <Buttons.SocialButtonsExample />;
SocialButtonsExample.storyName = "Social buttons example";

export const GoogleSocialButtons = () => <Buttons.GoogleSocialButtons />;
GoogleSocialButtons.storyName = "Google social buttons";

export const FacebookSocialButtons = () => <Buttons.FacebookSocialButtons />;
FacebookSocialButtons.storyName = "Facebook social buttons";

export const AppleSocialButtons = () => <Buttons.AppleSocialButtons />;
AppleSocialButtons.storyName = "Apple social buttons";

export const TwitterSocialButtons = () => <Buttons.TwitterSocialButtons />;
TwitterSocialButtons.storyName = "Twitter social buttons";

export const FigmaSocialButtons = () => <Buttons.FigmaSocialButtons />;
FigmaSocialButtons.storyName = "Figma social buttons";

export const DribbleSocialButtons = () => <Buttons.DribbleSocialButtons />;
DribbleSocialButtons.storyName = "Dribble social buttons";

export const BrandSocialButtonsGroup = () => <Buttons.BrandSocialButtonsGroup />;
BrandSocialButtonsGroup.storyName = "Brand social buttons group";

export const IconsBrandSocialButtonsGroup = () => <Buttons.IconsBrandSocialButtonsGroup />;
IconsBrandSocialButtonsGroup.storyName = "Icons brand social buttons group";

export const ColorSocialButtonsGroup = () => <Buttons.ColorSocialButtonsGroup />;
ColorSocialButtonsGroup.storyName = "Color social buttons group";

export const IconsColorSocialButtonsGroup = () => <Buttons.IconsColorSocialButtonsGroup />;
IconsColorSocialButtonsGroup.storyName = "Icons color social buttons group";

export const GraySocialButtonsGroup = () => <Buttons.GraySocialButtonsGroup />;
GraySocialButtonsGroup.storyName = "Gray social buttons group";
