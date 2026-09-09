import type { FC } from "react";
import * as Rating from "@/components/foundations/rating/rating.demo";

export default {
    title: "Base components/Rating badge and stars",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex items-center justify-center p-16">
                <Story />
            </div>
        ),
    ],
};

export const RatingBadgeExample = () => <Rating.RatingBadgeExample />;
RatingBadgeExample.storyName = "Rating badge example";

export const RatingStarsExample = () => <Rating.RatingStarsExample />;
RatingStarsExample.storyName = "Rating stars example";
