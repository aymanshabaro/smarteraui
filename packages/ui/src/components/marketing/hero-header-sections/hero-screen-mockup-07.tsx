"use client";

import { PlayCircle } from "@smarteraui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { FloatingSimpleWithFooter } from "@/components/marketing/header-navigations/floating-simple-with-footer";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    mockup: {
        outer: "ring-utility-neutral-300 bg-primary size-full rounded-[9.03px] p-[0.9px] shadow-lg ring-[0.56px] ring-inset md:rounded-[32px] md:p-1 md:ring-[2px]",
        middle: "bg-primary shadow-modern-mockup-inner-md md:shadow-modern-mockup-inner-lg size-full rounded-[7.9px] p-0.5 md:rounded-[28px] md:p-[5.4px]",
        screen: "bg-utility-neutral-50 ring-utility-neutral-200 relative size-full overflow-hidden rounded-[6.77px] ring-[0.56px] md:rounded-[24px] md:ring-[2px]",
    },
});

/** Centred hero under a floating header, with an edge-to-edge bezelled screenshot anchored to the bottom. */
export const HeroScreenMockup07 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid-check" size="sm" className="absolute -top-2 left-1/2 z-0 max-w-none -translate-x-1/2 max-md:hidden" />
        <BackgroundPattern pattern="grid-check" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <FloatingSimpleWithFooter />

        <section className="relative overflow-hidden py-16 md:pt-24 md:pb-0">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                    <a href="/dashboard" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup className="hidden md:flex" size="lg" color="brand" theme="modern" addonText="New feature">
                            Check out the team dashboard
                        </BadgeGroup>
                        <BadgeGroup className="md:hidden" size="md" color="brand" theme="modern" addonText="New feature">
                            Check out the team dashboard
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">
                        Beautiful analytics to grow smarter
                    </h1>
                    <p className="text-tertiary mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full px-4 md:px-8">
                <div className="flex flex-col md:items-start">
                    <div className="mx-auto flex h-full w-full items-center justify-center md:max-h-105 md:w-full md:items-start lg:max-h-140">
                        <div className={styles.mockup.outer}>
                            <div className={styles.mockup.middle}>
                                <div className={styles.mockup.screen}>
                                    <img
                                        src={IMAGES.landscape[0].src}
                                        alt="Dashboard mockup showing the application interface"
                                        className="size-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
