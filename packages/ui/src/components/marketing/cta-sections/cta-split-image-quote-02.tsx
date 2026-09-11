"use client";

import { useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { ArrowNext, ArrowPrevious } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES, LOGOS } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { RatingStars } from "../../foundations/rating/rating-stars";

const styles = sortCx({
    /** The circular carousel controls that sit on top of the photo. */
    control: [
        "group outline-focus-ring flex size-12 cursor-pointer items-center justify-center rounded-full ring-1 ring-white/50 ring-inset transition duration-100 ease-linear",
        "hover:ring-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 md:size-14",
    ].join(" "),
    controlIcon: "size-5 text-white transition-inherit-all group-hover:opacity-70 md:size-6",
});

const reviews = [
    {
        quote: "Proper UI has saved us thousands of hours of work. We're able to spin up projects faster.",
        name: AVATARS[2].name,
        company: "Web Design Agency",
        role: `PM, ${LOGOS[5].name}`,
        image: IMAGES.square[1],
    },
    {
        quote: "We shipped our new marketing site in a week. The components just fit together.",
        name: AVATARS[4].name,
        company: "Product Studio",
        role: `Design Lead, ${LOGOS[2].name}`,
        image: IMAGES.square[2],
    },
] as const;

/** A left-aligned CTA beside a photo with a frosted, navigable testimonial panel. */
export const CtaSplitImageQuote02 = () => {
    const [index, setIndex] = useState(0);
    const review = reviews[index]!;

    const go = (delta: number) => setIndex((current) => (current + delta + reviews.length) % reviews.length);

    return (
        <section className="bg-primary py-16 lg:py-24">
            <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-x-16 gap-y-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
                <div className="flex max-w-3xl flex-col items-start">
                    <h2 className="text-display-sm text-primary md:text-display-md lg:text-display-lg font-semibold">
                        Join 4,000+ startups growing with Proper UI
                    </h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Start your 30-day free trial today.</p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary">
                            Learn more
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>

                <div className="relative h-170 w-full overflow-hidden lg:h-180">
                    <img src={review.image.src} alt="" className="size-full object-cover" />

                    <div className="relative">
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 flex h-110 items-end overflow-hidden bg-linear-to-t from-black/40 to-black/0 pt-16 md:pt-20 lg:pt-24"
                        />

                        <figure className="border-alpha-white/30 bg-primary/30 absolute inset-x-0 bottom-0 flex flex-col border-t px-5 pt-6 pb-8 backdrop-blur-[10px] md:p-8">
                            <blockquote className="md:text-display-sm text-xl font-semibold text-white">&ldquo;{review.quote}&rdquo;</blockquote>

                            <div className="mt-5 flex flex-col-reverse justify-between gap-4 md:mt-8 md:flex-row">
                                <p className="md:text-display-xs text-xl font-semibold whitespace-nowrap text-white">{review.name}</p>
                                <RatingStars aria-hidden="true" className="hidden gap-1 md:flex" starClassName="text-fg-white" />
                            </div>

                            <figcaption className="mt-2 flex flex-col justify-between gap-4 md:mt-3 md:flex-row md:gap-3">
                                <div className="flex flex-col md:gap-1">
                                    <p className="md:text-md text-lg font-semibold text-white">{review.company}</p>
                                    <p className="text-md font-medium text-white md:text-sm">{review.role}</p>
                                </div>

                                <div className="flex gap-4 md:gap-8">
                                    <AriaButton aria-label="Previous review" className={styles.control} onPress={() => go(-1)}>
                                        <ArrowPrevious aria-hidden="true" className={styles.controlIcon} />
                                    </AriaButton>
                                    <AriaButton aria-label="Next review" className={styles.control} onPress={() => go(1)}>
                                        <ArrowNext aria-hidden="true" className={styles.controlIcon} />
                                    </AriaButton>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
};
