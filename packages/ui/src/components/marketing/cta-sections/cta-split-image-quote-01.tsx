"use client";

import { useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { ArrowNext, ArrowPrevious, CheckCircle } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES, LOGOS } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { RatingStars } from "../../foundations/rating/rating-stars";

const styles = sortCx({
    /** The circular carousel controls that sit on top of the photo. */
    control: [
        "group outline-focus-ring flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/50 transition duration-100 ease-linear",
        "hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 md:size-14",
    ].join(" "),
    controlIcon: "size-5 text-white transition-inherit-all group-hover:opacity-70 md:size-6",
});

const benefits = ["30-day free trial", "Personalized onboarding", "Access to all features"];

const reviews = [
    {
        quote: "Proper UI has saved us thousands of hours of work. We're able to spin up projects and features faster.",
        name: AVATARS[11].name,
        company: "Web Design Agency",
        role: `PM, ${LOGOS[5].name}`,
        image: IMAGES.square[2],
    },
    {
        quote: "Every handover now starts from a component that already matches the brand. Nothing gets redrawn twice.",
        name: AVATARS[6].name,
        company: "Brand Studio",
        role: `Creative Director, ${LOGOS[1].name}`,
        image: IMAGES.square[1],
    },
] as const;

/** A benefit checklist beside a photo whose frosted, rounded quote card cycles through reviews. */
export const CtaSplitImageQuote01 = () => {
    const [index, setIndex] = useState(0);
    const review = reviews[index]!;

    const go = (delta: number) => setIndex((current) => (current + delta + reviews.length) % reviews.length);

    return (
        <section className="bg-primary grid grid-cols-1 gap-y-12 py-16 lg:grid-cols-2 lg:items-center lg:py-0">
            <div className="flex w-full lg:justify-end lg:py-24">
                <div className="flex max-w-3xl flex-col items-start px-4 md:px-8 lg:max-w-(--breakpoint-sm)">
                    <h2 className="text-display-sm text-primary md:text-display-md lg:text-display-lg font-semibold">
                        Join 4,000+ startups growing with Proper UI
                    </h2>

                    <ul className="mt-8 flex flex-col gap-4 md:gap-5 md:ps-4">
                        {benefits.map((benefit) => (
                            <li key={benefit} className="flex gap-3">
                                <CheckCircle aria-hidden="true" className="text-fg-brand-primary size-7 shrink-0" />
                                <span className="text-md text-tertiary pt-0.5 md:pt-0 md:text-lg">{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary">
                            Learn more
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>

            <div className="relative h-170 w-full overflow-hidden px-4 md:px-8 lg:h-180 lg:px-0">
                <img src={review.image.src} alt="" className="size-full object-cover" />

                <div className="relative">
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/40 to-black/0 p-4 pt-16 md:p-8 md:pt-20 lg:pt-24">
                        <figure className="bg-primary/30 ring-alpha-white/30 flex flex-col overflow-hidden rounded-xl px-4 py-6 ring-1 backdrop-blur-[10px] ring-inset md:px-5">
                            <blockquote className="md:text-display-sm text-xl font-semibold text-balance text-white">&ldquo;{review.quote}&rdquo;</blockquote>

                            <div className="mt-5 flex flex-col-reverse justify-between gap-4 md:mt-8 md:flex-row">
                                <p className="md:text-display-xs text-xl font-semibold whitespace-nowrap text-white">{review.name}</p>
                                <RatingStars aria-hidden="true" className="hidden gap-1 md:flex" starClassName="text-fg-white" />
                            </div>

                            <figcaption className="mt-2 flex flex-col justify-between gap-5 md:mt-3 md:flex-row md:gap-3">
                                <div className="flex flex-col gap-0.5 md:gap-1">
                                    <p className="md:text-md text-lg font-semibold whitespace-nowrap text-white">{review.company}</p>
                                    <p className="text-md whitespace-nowrap text-white md:text-sm">{review.role}</p>
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
