"use client";

import { useState } from "react";
import { ArrowNext, ArrowPrevious } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES, LOGOS } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { RatingStars } from "../../foundations/rating/rating-stars";

const styles = sortCx({
    /** The round previous/next controls under the quote. */
    control:
        "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary md:size-14",
    controlIcon: "size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6",
});

const reviews = [
    {
        quote: "Proper UI has saved us thousands of hours of work. We're able to spin up projects and features faster.",
        author: AVATARS[9],
        company: LOGOS[5].name,
        role: `PM, ${LOGOS[5].name}`,
        industry: "Web Design Agency",
        portrait: IMAGES.square[1],
    },
    {
        quote: "Using Proper UI has streamlined our entire design process. It's an invaluable part of our studio.",
        author: AVATARS[7],
        company: LOGOS[4].name,
        role: `Design Lead, ${LOGOS[4].name}`,
        industry: "Product Studio",
        portrait: IMAGES.square[2],
    },
] as const;

/** A rated quote beside a portrait whose caption bar bleeds past the photo edge. */
export const TestimonialSplitImage02 = () => {
    const [index, setIndex] = useState(0);
    const review = reviews[index]!;

    const go = (delta: number) => setIndex((current) => (current + delta + reviews.length) % reviews.length);

    return (
        <section className="bg-primary py-16 lg:py-24">
            <div className="max-w-container mx-auto flex flex-col gap-12 px-4 md:gap-16 md:px-8 lg:flex-row lg:items-center">
                <figure className="flex flex-col gap-8 md:gap-12 lg:flex-1">
                    <div className="flex flex-1 flex-col gap-6 md:gap-8">
                        <RatingStars aria-hidden="true" className="gap-1" />
                        <blockquote className="text-display-sm sm:text-display-md md:text-display-lg text-primary line-clamp-5 font-medium text-balance">
                            {review.quote}
                        </blockquote>
                    </div>

                    <div className="flex flex-col justify-between gap-6 md:flex-row">
                        <figcaption className="flex flex-col gap-1">
                            <p className="text-primary text-lg font-semibold whitespace-nowrap">{review.author.name}</p>
                            <cite className="text-md text-tertiary whitespace-nowrap not-italic">{review.company}</cite>
                        </figcaption>

                        <div className="flex gap-4 md:gap-8">
                            <Button color="link-gray" size="sm" aria-label="Previous review" className={styles.control} onPress={() => go(-1)}>
                                <ArrowPrevious aria-hidden="true" className={styles.controlIcon} />
                            </Button>
                            <Button color="link-gray" size="sm" aria-label="Next review" className={styles.control} onPress={() => go(1)}>
                                <ArrowNext aria-hidden="true" className={styles.controlIcon} />
                            </Button>
                        </div>
                    </div>
                </figure>

                <div className="relative h-140 lg:h-180 lg:flex-1">
                    <img src={review.portrait.src} alt="" className="size-full object-cover" />

                    <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-linear-to-t from-black/40 to-black/0 pt-16 md:pt-20 lg:pt-24">
                        <div className="relative flex flex-col gap-1.5 p-4 pb-5 backdrop-blur-md md:gap-2 md:p-6">
                            <div
                                aria-hidden="true"
                                className="border-alpha-white/30 bg-alpha-white/30 absolute inset-y-0 -start-10 w-[calc(100%+80px)] border-t"
                            />

                            <div className="relative flex flex-col-reverse justify-between gap-4 md:flex-row">
                                <p className="md:text-display-xs text-xl font-semibold whitespace-nowrap text-white">{review.author.name}</p>
                                <RatingStars aria-hidden="true" className="gap-1" starClassName="text-fg-white" />
                            </div>

                            <div className="relative flex flex-col gap-0.5">
                                <p className="text-md font-semibold text-white">{review.role}</p>
                                <p className="text-sm font-medium text-white">{review.industry}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
