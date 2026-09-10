"use client";

import { ArrowNext, ArrowPrevious, ArrowUpRight } from "@properui/icons";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { Button } from "@/components/base/buttons/button";
import { cx, sortCx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

const styles = sortCx({
    /** The round previous/next controls under the carousel. */
    control:
        "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 md:size-14",
    controlIcon: "size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6",
    /** The colored slide and the frosted quote panel that sits at its bottom. */
    slide: "relative flex h-118 max-w-76 cursor-grab items-end p-6 md:h-126 md:w-full md:max-w-sm md:p-5",
    panel: "flex cursor-auto flex-col bg-alpha-white/30 px-4 py-5 ring-1 ring-alpha-white/30 backdrop-blur-md ring-inset md:p-5 md:px-6 md:py-8",
});

const caseStudies = [
    {
        logo: LOGOS[0],
        quote: "Proper has saved us thousands of hours of work. We're able to spin up projects faster.",
        background: "bg-utility-brand-600",
    },
    {
        logo: LOGOS[1],
        quote: "We've been using Proper to kick start every new project and can't work without it.",
        background: "bg-utility-green-600",
    },
    {
        logo: LOGOS[2],
        quote: "Love the simplicity of the service and the prompt customer support.",
        background: "bg-utility-blue-600",
    },
    {
        logo: LOGOS[3],
        quote: "Proper has saved us thousands of hours of work. We're able to spin up projects faster.",
        background: "bg-utility-indigo-600",
    },
] as const;

/** A draggable row of colored case-study cards, each linking to its full story. */
export const TestimonialCaseStudyCards = () => (
    <section className="bg-primary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-0">
                <div className="flex max-w-3xl flex-col gap-4 md:gap-5">
                    <h2 className="text-display-sm md:text-display-md text-primary font-semibold">We&apos;ve helped hundreds of global companies</h2>
                    <p className="text-tertiary text-lg md:text-xl">Case studies from some of our amazing customers who are building faster.</p>
                </div>

                <div className="flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:self-start">
                    <Button size="xl" color="secondary">
                        Our customers
                    </Button>
                    <Button size="xl">Create account</Button>
                </div>
            </div>

            <Carousel.Root aria-label="Customer case studies" className="mt-12 md:mt-16">
                <Carousel.Content overflowHidden={false} className="gap-6 pe-4 md:gap-8 md:pe-8">
                    {caseStudies.map((study) => (
                        <Carousel.Item key={study.logo.name} className={cx(styles.slide, study.background)}>
                            {/* `invert` is a documented asset swap: the placeholder wordmarks ship as a single mono
                                set instead of the reference's paired colour/white files. */}
                            <img
                                src={study.logo.src}
                                alt={study.logo.name}
                                className="absolute start-6 top-6 h-10 object-contain invert md:start-8 md:top-8 md:h-12"
                            />

                            <figure className={styles.panel}>
                                <figcaption className="text-display-xs font-semibold text-white">{study.logo.name}</figcaption>
                                <q className="mt-3 text-lg font-medium text-balance text-white">{study.quote}</q>

                                <Button
                                    href="#"
                                    size="lg"
                                    color="link-gray"
                                    className="mt-6 text-white"
                                    iconTrailing={<ArrowUpRight data-icon aria-hidden="true" className="text-fg-white!" />}
                                >
                                    Read case study
                                </Button>
                            </figure>
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
