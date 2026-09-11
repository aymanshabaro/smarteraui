"use client";

import { RatingBadge } from "./rating-badge";
import { RatingStars } from "./rating-stars";

export const RatingBadgeExample = () => {
    return <RatingBadge />;
};

export const RatingStarsExample = () => {
    return <RatingStars rating={3.5} />;
};
