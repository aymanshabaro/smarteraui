"use client";

import { useState } from "react";
import { ArrowNext, ArrowPrevious } from "@properui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { sortCx } from "@/utils/cx";
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const styles = sortCx({
    /** The round previous/next controls under the quote. */
    control:
        "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary md:size-14",
    controlIcon: "size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6",
});

const reviews = [
    {
        quote: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it.",
        author: AVATARS[4],
        role: `Data Engineer, ${LOGOS[1].name}`,
        portrait: IMAGES.square[2],
    },
    {
        quote: "From concept to completion, Proper UI helps us deliver outstanding designs faster than ever.",
        author: AVATARS[1],
        role: `UX Designer, ${LOGOS[2].name}`,
        portrait: IMAGES.square[3],
    },
] as const;

/** A rated quote with an avatar attribution beside a portrait column. */
export const TestimonialSplitImage03 = () => {
    const [index, setIndex] = useState(0);
    const review = reviews[index]!;

    const go = (delta: number) => setIndex((current) => (current + delta + reviews.length) % reviews.length);

    return (
        <section className="bg-primary py-16 lg:py-24">
            <div className="max-w-container mx-auto flex flex-col gap-12 px-4 md:gap-16 md:px-8 lg:flex-row lg:items-center">
                <figure className="flex flex-col gap-8 md:gap-12 lg:flex-1">
                    <div className="flex flex-1 flex-col gap-6 md:gap-12">
                        <RatingStars aria-hidden="true" className="gap-1" />
                        <blockquote className="text-display-sm sm:text-display-md md:text-display-lg text-primary font-medium text-balance">
                            {review.quote}
                        </blockquote>
                    </div>

                    <div className="flex flex-col justify-between gap-6 md:flex-row">
                        <div className="flex gap-4">
                            <Avatar size="xl" border src={review.author.src} alt={review.author.name} />

                            <figcaption className="flex flex-col gap-0.5">
                                <p className="text-primary text-lg font-semibold whitespace-nowrap">{review.author.name}</p>
                                <cite className="text-md text-tertiary whitespace-nowrap not-italic">{review.role}</cite>
                            </figcaption>
                        </div>

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

                <div className="h-100 sm:h-95 lg:h-180 lg:flex-1">
                    <img src={review.portrait.src} alt="" className="size-full object-cover" />
                </div>
            </div>
        </section>
    );
};
