"use client";

import { useState } from "react";
import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { ArrowNarrowLeft, ArrowNarrowRight } from "@properui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { sortCx } from "@/utils/cx";
import { AVATARS, LOGOS } from "@/utils/demo-assets";

const styles = sortCx({
    /** Each logo doubles as the tab that selects its review. */
    tab: "outline-focus-ring cursor-pointer rounded transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-4",
    /** `invert` is a documented asset swap: the placeholder wordmarks ship as a single mono set. */
    tabLogo: "h-8 object-contain opacity-85 invert md:h-10",
});

const reviews = [
    {
        id: "review-01",
        logo: LOGOS[0],
        quote: "Proper has saved us thousands of hours of work. We're able to spin up projects and features faster.",
        author: AVATARS[0],
        role: "UX Designer",
    },
    {
        id: "review-02",
        logo: LOGOS[1],
        quote: "We've been using Proper to kick start every new project and can't imagine working without it.",
        author: AVATARS[3],
        role: "Product Manager",
    },
    {
        id: "review-03",
        logo: LOGOS[2],
        quote: "Love the simplicity of the service and the prompt customer support. We can't imagine working without it.",
        author: AVATARS[6],
        role: "Head of Design",
    },
    {
        id: "review-04",
        logo: LOGOS[3],
        quote: "We've really sped up our workflow using Proper and haven't looked back since.",
        author: AVATARS[8],
        role: "Data Engineer",
    },
    {
        id: "review-05",
        logo: LOGOS[4],
        quote: "Every project starts with Proper, and it's made a huge difference to our output.",
        author: AVATARS[10],
        role: "Web Developer",
    },
] as const;

/** The logo-tabbed centered testimonial on the brand-colored section background. */
export const TestimonialSimpleCentered03Brand = () => {
    const [selectedKey, setSelectedKey] = useState<string>(reviews[0].id);

    const index = reviews.findIndex((review) => review.id === selectedKey);
    const review = reviews[index === -1 ? 0 : index]!;

    const go = (delta: number) => setSelectedKey(reviews[(index + delta + reviews.length) % reviews.length]!.id);

    return (
        <AriaTabs selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(String(key))}>
            <section className="bg-brand-section py-16 md:py-24">
                <div className="max-w-container mx-auto px-4 md:px-8">
                    <div className="relative flex flex-col items-center gap-10 overflow-hidden md:gap-12">
                        <AriaTabList aria-label="Customer reviews" className="order-last hidden grid-cols-5 justify-items-center gap-8 md:grid">
                            {reviews.map((item) => (
                                <AriaTab key={item.id} id={item.id} className={styles.tab}>
                                    <img src={item.logo.src} alt={item.logo.name} className={styles.tabLogo} />
                                </AriaTab>
                            ))}
                        </AriaTabList>

                        {reviews.map((item) => (
                            <AriaTabPanel key={item.id} id={item.id} className="flex flex-col text-center">
                                <figure className="flex flex-col gap-8">
                                    <blockquote className="text-display-sm md:text-display-md lg:text-display-lg text-primary_on-brand font-medium text-balance">
                                        {item.quote}
                                    </blockquote>

                                    <figcaption className="flex justify-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <Avatar size="lg" border className="bg-primary" src={item.author.src} alt={item.author.name} />

                                            <div className="flex flex-col gap-1">
                                                <p className="text-primary_on-brand text-lg font-semibold">{item.author.name}</p>
                                                <cite className="text-md text-tertiary_on-brand not-italic">
                                                    {item.role}, {item.logo.name}
                                                </cite>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </AriaTabPanel>
                        ))}

                        <div className="flex w-full items-center justify-between md:hidden">
                            <Button color="link-color" size="sm" aria-label="See previous review" onPress={() => go(-1)}>
                                <ArrowNarrowLeft aria-hidden="true" className="text-fg-brand-secondary size-6" />
                            </Button>

                            <img src={review.logo.src} alt={review.logo.name} className="h-10 object-contain opacity-85 invert" />

                            <Button color="link-color" size="sm" aria-label="See next review" onPress={() => go(1)}>
                                <ArrowNarrowRight aria-hidden="true" className="text-fg-brand-secondary size-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </AriaTabs>
    );
};
