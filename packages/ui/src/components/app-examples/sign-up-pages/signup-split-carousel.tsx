"use client";

import { ChevronLeft, ChevronRight } from "@properui/icons";
import { IMAGES } from "../../../utils/demo-assets";
import { Carousel, useCarousel } from "../../application/carousel/carousel-base";
import { PaginationDot } from "../../application/pagination/pagination-dot";
import { SignUpFormColumn } from "./base-components/form-column";
import { ScreenMockup } from "./base-components/screen-mockup";

const slides = [
    {
        image: IMAGES.landscape[0],
        title: "Introducing AutoReports 2.0®",
        description: "Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.",
    },
    {
        image: IMAGES.landscape[1],
        title: "Every metric, one dashboard",
        description: "Track activation, retention and revenue side by side without stitching five tools together.",
    },
    {
        image: IMAGES.landscape[2],
        title: "Share what matters, weekly",
        description: "Schedule a digest and let everyone see the numbers that moved without opening the app.",
    },
    {
        image: IMAGES.landscape[3],
        title: "Built for the whole team",
        description: "Invite unlimited teammates, set granular permissions and keep one source of truth.",
    },
];

/** Ties the carousel's scroll state to the on-brand dot indicator between the arrow buttons. */
const CarouselControls = () => {
    const { selectedIndex, scrollSnaps, api } = useCarousel();

    return (
        <div className="flex items-center justify-center gap-16">
            <Carousel.PrevTrigger className="outline-focus-ring cursor-pointer rounded-full p-2 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <ChevronLeft aria-hidden="true" className="text-fg-white size-5" />
            </Carousel.PrevTrigger>

            <PaginationDot isBrand page={selectedIndex + 1} total={scrollSnaps.length} onPageChange={(page) => api?.scrollTo(page - 1)} />

            <Carousel.NextTrigger className="outline-focus-ring cursor-pointer rounded-full p-2 transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <ChevronRight aria-hidden="true" className="text-fg-white size-5" />
            </Carousel.NextTrigger>
        </div>
    );
};

/** Split sign up whose right panel is a brand-tinted product tour carousel. */
export const SignupSplitCarousel = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <SignUpFormColumn
            headerClassName="hidden p-8 md:block"
            footerClassName="hidden p-8 pt-11 lg:flex"
            bodyClassName="md:py-0"
            passwordPlaceholder="••••••••••••"
        />

        <div className="bg-primary hidden h-full py-4 pe-4 lg:block">
            <div className="bg-brand-section relative h-full w-full items-center justify-center overflow-hidden rounded-[20px] lg:flex">
                <Carousel.Root className="flex w-full flex-col items-center gap-8">
                    <Carousel.Content>
                        {slides.map((slide) => (
                            <Carousel.Item key={slide.title} className="flex flex-col items-center gap-20">
                                <ScreenMockup src={slide.image.src} alt={slide.image.alt} className="w-160 transition lg:scale-75 xl:scale-100" />

                                <div className="flex max-w-114 flex-col gap-2 text-center">
                                    <p className="text-display-xs text-primary_on-brand font-semibold">{slide.title}</p>
                                    <p className="text-tertiary_on-brand text-md font-medium">{slide.description}</p>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel.Content>

                    <CarouselControls />
                </Carousel.Root>
            </div>
        </div>
    </section>
);
