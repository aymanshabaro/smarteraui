"use client";

import { Plus } from "@properui/icons";
import { AVATARS, IMAGES, LOGOS } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { RatingStars } from "../../foundations/rating/rating-stars";

interface GlassReview {
    name: string;
    role: string;
    industry: string;
    portrait: { src: string; alt: string };
    quote?: string;
}

const reviews: GlassReview[] = [
    { name: AVATARS[0].name, role: `PM, ${LOGOS[5].name}`, industry: "Web Design Agency", portrait: IMAGES.square[0] },
    { name: AVATARS[6].name, role: `COO, ${LOGOS[2].name}`, industry: "Web Development Agency", portrait: IMAGES.square[1] },
    {
        name: AVATARS[8].name,
        role: `Designer, ${LOGOS[3].name}`,
        industry: "UX Agency",
        portrait: IMAGES.square[2],
        quote: "Proper UI has saved us thousands of hours.",
    },
    { name: AVATARS[1].name, role: `PM, ${LOGOS[1].name}`, industry: "Machine Learning", portrait: IMAGES.square[3] },
    { name: AVATARS[10].name, role: `Fullstack Dev, ${LOGOS[4].name}`, industry: "Performance Marketing", portrait: IMAGES.landscape[0] },
    { name: AVATARS[3].name, role: `Marketing, ${LOGOS[0].name}`, industry: "Machine Learning", portrait: IMAGES.landscape[1] },
];

/** A responsive grid of portraits, each with a rounded frosted caption card. */
export const TestimonialGlassmorphicCards03 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto flex flex-col gap-12 px-4 md:gap-16 md:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row">
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

            <div className="flex flex-col gap-8">
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-[repeat(3,minmax(0,384px))]">
                    {reviews.map((review) => (
                        <li key={review.name} className="h-100 md:h-120">
                            <img src={review.portrait.src} alt="" className="size-full object-cover" />

                            <div className="relative">
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/40 to-black/0 p-3 pt-16 md:p-4 lg:pt-24">
                                    <figure className="bg-alpha-white/30 ring-alpha-white/30 flex flex-col gap-6 rounded-xl px-4 py-6 ring-1 backdrop-blur-md ring-inset md:gap-6 md:rounded-2xl md:p-5 md:px-5">
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
                        </li>
                    ))}
                </ul>

                <Button size="xl" color="secondary" iconLeading={Plus} className="self-center sm:hidden">
                    Load more
                </Button>
            </div>
        </div>
    </section>
);
