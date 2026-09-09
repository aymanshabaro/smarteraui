import type { FC } from "react";
import * as Badges from "./badges.demo";

export default {
    title: "Base components/Badges",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const BadgeExample = () => <Badges.BadgeExample />;
BadgeExample.storyName = "Badge example";

export const PillColor = () => <Badges.PillColor />;
PillColor.storyName = "Pill color";

export const Color = () => <Badges.Color />;
Color.storyName = "Color";

export const Modern = () => <Badges.Modern />;
Modern.storyName = "Modern";

export const WithDot = () => <Badges.WithDot />;
WithDot.storyName = "With dot";

export const WithDotBadgeColor = () => <Badges.WithDotBadgeColor />;
WithDotBadgeColor.storyName = "With dot badge color";

export const WithDotBadgeModern = () => <Badges.WithDotBadgeModern />;
WithDotBadgeModern.storyName = "With dot badge modern";

export const WithFlag = () => <Badges.WithFlag />;
WithFlag.storyName = "With flag";

export const WithFlagBadgeColor = () => <Badges.WithFlagBadgeColor />;
WithFlagBadgeColor.storyName = "With flag badge color";

export const WithFlagBadgeModern = () => <Badges.WithFlagBadgeModern />;
WithFlagBadgeModern.storyName = "With flag badge modern";

export const WithAvatar = () => <Badges.WithAvatar />;
WithAvatar.storyName = "With avatar";

export const WithAvatarBadgeColor = () => <Badges.WithAvatarBadgeColor />;
WithAvatarBadgeColor.storyName = "With avatar badge color";

export const WithAvatarBadgeModern = () => <Badges.WithAvatarBadgeModern />;
WithAvatarBadgeModern.storyName = "With avatar badge modern";

export const WithCloseX = () => <Badges.WithCloseX />;
WithCloseX.storyName = "With close X";

export const WithCloseXBadgeColor = () => <Badges.WithCloseXBadgeColor />;
WithCloseXBadgeColor.storyName = "With close X badge color";

export const WithCloseXBadgeModern = () => <Badges.WithCloseXBadgeModern />;
WithCloseXBadgeModern.storyName = "With close X badge modern";

export const WithIconLeading = () => <Badges.WithIconLeading />;
WithIconLeading.storyName = "With icon leading";

export const ColorWithIconLeading = () => <Badges.ColorWithIconLeading />;
ColorWithIconLeading.storyName = "Color with icon leading";

export const ModernWithIconLeading = () => <Badges.ModernWithIconLeading />;
ModernWithIconLeading.storyName = "Modern with icon leading";

export const WithIconTrailing = () => <Badges.WithIconTrailing />;
WithIconTrailing.storyName = "With icon trailing";

export const ColorWithIconTrailing = () => <Badges.ColorWithIconTrailing />;
ColorWithIconTrailing.storyName = "Color with icon trailing";

export const ModernWithIconTrailing = () => <Badges.ModernWithIconTrailing />;
ModernWithIconTrailing.storyName = "Modern with icon trailing";

export const WithIconOnly = () => <Badges.WithIconOnly />;
WithIconOnly.storyName = "With icon only";

export const ColorWithIconOnly = () => <Badges.ColorWithIconOnly />;
ColorWithIconOnly.storyName = "Color with icon only";

export const ModernWithIconOnly = () => <Badges.ModernWithIconOnly />;
ModernWithIconOnly.storyName = "Modern with icon only";
