import type { FC } from "react";
import * as Demos from "./skeleton.demo";

export default {
    title: "Base components/Skeletons",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const SkeletonExample = () => <Demos.SkeletonExample />;
SkeletonExample.storyName = "Skeleton example";

export const Avatar = () => <Demos.Avatar />;
Avatar.storyName = "Avatar";

export const TextBlock = () => <Demos.TextBlock />;
TextBlock.storyName = "Text block";

export const CardSkeleton = () => <Demos.CardSkeleton />;
CardSkeleton.storyName = "Card";
