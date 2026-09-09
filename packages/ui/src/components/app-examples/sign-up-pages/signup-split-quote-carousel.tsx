"use client";

import { ChevronLeft, ChevronRight } from "@smarteraui/icons";
import { Carousel, useCarousel } from "@/components/application/carousel/carousel-base";
import { PaginationDot } from "@/components/application/pagination/pagination-dot";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { avatar } from "@/utils/demo-assets";
import { SignUpFormColumn } from "./base-components/form-column";
import { SupportFooter } from "./base-components/page-parts";

const quotes = [
    {
        quote: "Smartera has saved us thousands of hours of work. We're able to spin up projects and features much faster.",
        author: avatar(2),
        role: "Product Designer, Sisyphus",
    },
    {
        quote: "Everything our team ships now starts from Smartera. The handover between design and code finally disappeared.",
        author: avatar(5),
        role: "Head of Design, Circooles",
    },
    {
        quote: "We replaced three tools with Smartera and shipped our redesign a full quarter ahead of schedule.",
        author: avatar(8),
        role: "Engineering Lead, Catalog",
    },
];

/** Ties the carousel's scroll state to the dot indicator between the two arrow buttons. */
const QuoteControls = () => {
    const { selectedIndex, scrollSnaps, api } = useCarousel();

    return (
        <div className="flex items-center justify-center gap-16">
            <Carousel.PrevTrigger>
                {({ isDisabled, onClick }) => (
                    <Button color="tertiary" size="lg" aria-label="Previous testimonial" iconLeading={ChevronLeft} isDisabled={isDisabled} onPress={onClick} />
                )}
            </Carousel.PrevTrigger>

            <PaginationDot page={selectedIndex + 1} total={scrollSnaps.length} onPageChange={(page) => api?.scrollTo(page - 1)} />

            <Carousel.NextTrigger>
                {({ isDisabled, onClick }) => (
                    <Button color="tertiary" size="lg" aria-label="Next testimonial" iconLeading={ChevronRight} isDisabled={isDisabled} onPress={onClick} />
                )}
            </Carousel.NextTrigger>
        </div>
    );
};

/** Split sign up page with a rotating customer testimonial filling the left half. */
export const SignupSplitQuoteCarousel = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="bg-secondary relative hidden flex-1 flex-col items-center justify-center self-stretch overflow-hidden lg:flex">
            <header className="absolute start-8 top-8">
                <SmarteraLogo />
            </header>

            <Carousel.Root className="w-full">
                <Carousel.Content>
                    {quotes.map((item) => (
                        <Carousel.Item key={item.quote}>
                            <figure className="flex flex-col items-center gap-8 px-20 text-center">
                                <RatingStars rating={5} className="gap-1" />

                                <blockquote className="text-display-sm text-primary font-medium text-balance">{item.quote}</blockquote>

                                <figcaption className="flex flex-col items-center gap-4">
                                    <Avatar size="lg" src={item.author.src} alt={item.author.name} verified />

                                    <div className="flex flex-col gap-1">
                                        <p className="text-primary text-md font-semibold whitespace-nowrap">{item.author.name}</p>
                                        <cite className="text-tertiary text-sm font-medium whitespace-nowrap not-italic">{item.role}</cite>
                                    </div>
                                </figcaption>
                            </figure>
                        </Carousel.Item>
                    ))}
                </Carousel.Content>

                <div className="mt-8">
                    <QuoteControls />
                </div>
            </Carousel.Root>

            <SupportFooter className="absolute inset-x-0 bottom-0 hidden px-8 pb-8 lg:flex" />
        </div>

        <SignUpFormColumn />
    </section>
);
