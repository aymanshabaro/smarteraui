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
        quote: "We've been using Proper UI to kick start every new project and can't imagine working without it.",
        author: AVATARS[2],
        company: LOGOS[0].name,
        role: `Designer, ${LOGOS[0].name}`,
        industry: "Web Design Agency",
        portrait: IMAGES.square[0],
    },
    {
        quote: "Every project starts with Proper UI, and it's made a huge difference in our output.",
        author: AVATARS[5],
        company: LOGOS[3].name,
        role: `Product Lead, ${LOGOS[3].name}`,
        industry: "Product Studio",
        portrait: IMAGES.square[1],
    },
] as const;

/** A full-bleed portrait beside a large quote, with a frosted caption card over the photo. */
export const TestimonialSplitImage01 = () => {
    const [index, setIndex] = useState(0);
    const review = reviews[index]!;

    const go = (delta: number) => setIndex((current) => (current + delta + reviews.length) % reviews.length);

    return (
        <section className="bg-primary flex flex-col justify-center gap-12 py-16 lg:flex-row lg:items-center lg:gap-0 lg:py-0">
            <div className="max-w-container px-4 md:px-8 lg:absolute lg:py-24">
                <figure className="flex flex-col gap-8 lg:w-1/2 lg:gap-10 lg:pe-16">
                    <blockquote className="text-display-sm sm:text-display-md md:text-display-lg text-primary line-clamp-5 font-medium text-balance">
                        {review.quote}
                    </blockquote>

                    <div className="flex justify-between">
                        <figcaption className="flex flex-col gap-1">
                            <p className="text-primary text-lg font-semibold whitespace-nowrap">{review.author.name}</p>
                            <cite className="text-md text-tertiary not-italic">{review.company}</cite>
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
            </div>

            <div className="h-140 px-4 md:px-8 lg:ms-auto lg:h-180 lg:w-1/2 lg:px-0">
                <img src={review.portrait.src} alt="" className="size-full object-cover" />

                <div className="relative">
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/40 to-black/0 p-3 pt-16 md:p-8 md:pt-20 lg:p-5 lg:pt-24">
                        <div className="bg-alpha-white/30 ring-alpha-white/30 flex flex-col gap-1.5 rounded-xl px-4 py-6 ring-1 backdrop-blur-md ring-inset md:gap-2 md:rounded-2xl md:p-5">
                            <div className="flex flex-col-reverse justify-between gap-4 md:flex-row">
                                <p className="md:text-display-xs text-xl font-semibold whitespace-nowrap text-white">{review.author.name}</p>
                                <RatingStars aria-hidden="true" className="gap-1" starClassName="text-fg-white" />
                            </div>

                            <div className="flex flex-col gap-0.5">
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
