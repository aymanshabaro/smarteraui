"use client";

import { ArrowNext, ArrowPrevious } from "@properui/icons";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { Button } from "@/components/base/buttons/button";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { sortCx } from "@/utils/cx";
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const styles = sortCx({
    /** The round previous/next controls under the carousel. */
    control:
        "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 md:size-14",
    controlIcon: "size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6",
    /** The edge-to-edge frosted bar pinned to the bottom of each portrait. */
    panel: "relative flex cursor-auto flex-col gap-6 bg-alpha-white/30 p-4 pb-5 backdrop-blur-md before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-alpha-white/30 md:p-6",
});

interface GlassReview {
    name: string;
    role: string;
    industry: string;
    portrait: { src: string; alt: string };
    quote?: string;
}

const reviews: GlassReview[] = [
    { name: AVATARS[0].name, role: `PM, ${LOGOS[5].name}`, industry: "Web Design Agency", portrait: IMAGES.square[0] },
    {
        name: AVATARS[6].name,
        role: `COO, ${LOGOS[2].name}`,
        industry: "Web Development Agency",
        portrait: IMAGES.square[1],
        quote: "We've really sped up our workflow using Proper UI.",
    },
    { name: AVATARS[8].name, role: `Designer, ${LOGOS[3].name}`, industry: "UX Agency", portrait: IMAGES.square[2] },
    { name: AVATARS[1].name, role: `PM, ${LOGOS[1].name}`, industry: "Machine Learning", portrait: IMAGES.square[3] },
];

/** A draggable row of portraits, each with a full-width frosted caption bar. */
export const TestimonialGlassmorphicCards02 = () => (
    <section className="bg-primary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-0">
                <div className="flex max-w-3xl flex-col gap-4 md:gap-5">
                    <h2 className="text-display-sm md:text-display-md text-primary font-semibold">Don&apos;t just take our word for it</h2>
                    <p className="text-tertiary text-lg md:text-xl">Hear from some of our amazing customers who are building faster.</p>
                </div>

                <div className="flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:self-start">
                    <Button size="xl" color="secondary">
                        Our customers
                    </Button>
                    <Button size="xl">Create account</Button>
                </div>
            </div>

            <Carousel.Root aria-label="Customer testimonials" className="mt-12 md:mt-16">
                <Carousel.Content overflowHidden={false} className="gap-6 pe-4 md:gap-8 md:pe-8">
                    {reviews.map((review) => (
                        <Carousel.Item key={review.name} className="h-96 max-w-72 cursor-grab md:h-120 md:max-w-90">
                            <img src={review.portrait.src} alt="" className="size-full object-cover" />

                            <div className="relative">
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/40 to-black/0 pt-16 md:pt-20 lg:pt-24">
                                    <figure className={styles.panel}>
                                        {review.quote && <q className="text-xl font-semibold text-balance text-white">{review.quote}</q>}

                                        <figcaption className="flex flex-col gap-1.5 md:gap-2">
                                            <div className="flex flex-col gap-4">
                                                <RatingStars aria-hidden="true" className="gap-1" starClassName="text-fg-white" />
                                                <p className="md:text-display-xs text-xl font-semibold text-white">{review.name}</p>
                                            </div>

                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-md font-semibold text-white">{review.role}</p>
                                                <p className="text-sm font-medium text-white">{review.industry}</p>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel.Content>

                <div className="mt-8 flex gap-4 md:gap-8">
                    <Carousel.PrevTrigger className={styles.control}>
                        <ArrowPrevious aria-hidden="true" className={styles.controlIcon} />
                    </Carousel.PrevTrigger>
                    <Carousel.NextTrigger className={styles.control}>
                        <ArrowNext aria-hidden="true" className={styles.controlIcon} />
                    </Carousel.NextTrigger>
                </div>
            </Carousel.Root>
        </div>
    </section>
);
