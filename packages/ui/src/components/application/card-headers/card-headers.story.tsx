import type { FC } from "react";
import * as Demos from "./card-headers.demo";

export default {
    title: "Application components/Card headers",
    decorators: [
        (Story: FC) => (
            <div className="bg-secondary flex min-h-screen w-full items-start justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const CardHeaderExample = () => <Demos.CardHeaderExample />;
CardHeaderExample.storyName = "Card header example";

export const CardHeaderWithBadge = () => <Demos.CardHeaderWithBadge />;
CardHeaderWithBadge.storyName = "Card header with badge";

export const CardHeaderWithAvatarAndBadge = () => <Demos.CardHeaderWithAvatarAndBadge />;
CardHeaderWithAvatarAndBadge.storyName = "Card header with avatar and badge";
