"use client";

import { RatingBadge } from "@/components/foundations/rating/rating-badge";
import { RatingStars } from "@/components/foundations/rating/rating-stars";

export const RatingBadgeExample = () => {
    return <RatingBadge />;
};

export const RatingStarsExample = () => {
    return <RatingStars rating={3.5} />;
};
