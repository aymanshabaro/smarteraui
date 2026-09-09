import type { FC } from "react";
import * as Demos from "./empty-state.demo";

export default {
    title: "Application components/Empty state",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const EmptyStateExample = () => <Demos.EmptyStateExample />;
EmptyStateExample.storyName = "Empty state example";

export const FeaturedIcon = () => <Demos.FeaturedIcon />;
FeaturedIcon.storyName = "Featured icon";

export const Illustration = () => <Demos.Illustration />;
Illustration.storyName = "Illustration";

export const FileIcon = () => <Demos.FileIcon />;
FileIcon.storyName = "File icon";

export const AvatarRadius = () => <Demos.AvatarRadius />;
AvatarRadius.storyName = "Avatar radius";

export const AvatarRow = () => <Demos.AvatarRow />;
AvatarRow.storyName = "Avatar row";

export const AvatarGrid = () => <Demos.AvatarGrid />;
AvatarGrid.storyName = "Avatar grid";
