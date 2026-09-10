"use client";

import { useState } from "react";
import { ArrowNext, ArrowPrevious } from "@properui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { cx, sortCx } from "@/utils/cx";
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const styles = sortCx({
    /** The round previous/next controls under the quote. */
    control:
        "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary md:size-14",
    controlIcon: "size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6",
});

const reviews = [
    {
        quote: "We've really sped up our workflow using Proper UI and haven't looked back.",
        author: AVATARS[6],
        role: `Project Manager, ${LOGOS[4].name}`,
    },
    {
        quote: "Every project starts with Proper UI which has 10x'd our output while keeping quality top-notch.",
        author: AVATARS[3],
        role: `Design Engineer, ${LOGOS[2].name}`,
    },
] as const;

/** The five-image collage that fills the grid beside the quote. */
const collage = [
    { image: IMAGES.landscape[0], area: "[grid-area:3/3/7/7]" },
    { image: IMAGES.landscape[1], area: "[grid-area:1/7/7/11]" },
    { image: IMAGES.landscape[2], area: "[grid-area:7/1/10/5]" },
    { image: IMAGES.landscape[3], area: "[grid-area:7/5/13/9]" },
    { image: IMAGES.landscape[4], area: "[grid-area:7/9/10/13]" },
] as const;

/** A rated quote beside an overlapping collage of customer photos. */
export const TestimonialAbstractImage = () => {
    const [index, setIndex] = useState(0);
    const review = reviews[index]!;

    const go = (delta: number) => setIndex((current) => (current + delta + reviews.length) % reviews.length);

    return (
        <section className="bg-primary py-16 lg:py-24">
            <div className="max-w-container mx-auto flex flex-col gap-12 overflow-hidden px-4 md:gap-16 md:px-8 lg:flex-row lg:items-center">
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

                <div
                    aria-hidden="true"
                    className="grid h-122 w-[150%] grid-cols-[repeat(12,1fr)] grid-rows-[repeat(12,1fr)] gap-2 self-center sm:h-124 sm:w-[120%] md:w-auto md:gap-4 lg:flex-1"
                >
                    {collage.map((item) => (
                        <img key={item.image.src} src={item.image.src} alt="" className={cx("size-full object-cover", item.area)} />
                    ))}
                </div>
            </div>
        </section>
    );
};
