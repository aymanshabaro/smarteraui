"use client";

import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    mockup: {
        outer: "ring-utility-neutral-300 bg-primary rounded-[9.03px] p-[0.9px] shadow-lg ring-[0.56px] ring-inset md:rounded-[32px] md:p-1 md:ring-[2px]",
        middle: "bg-primary shadow-modern-mockup-inner-md md:shadow-modern-mockup-inner-lg rounded-[7.9px] p-0.5 md:rounded-[28px] md:p-[5.4px]",
        screen: "bg-utility-neutral-50 ring-utility-neutral-200 relative overflow-hidden rounded-[6.77px] ring-[0.56px] md:rounded-[24px] md:ring-[2px]",
    },
});

/** Two-column hero whose bezelled screenshot overflows the right edge from `lg` up. */
export const HeroScreenMockup08 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="circle" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="circle" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <HeaderDropdownSimple />

        <section className="relative overflow-hidden py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center justify-items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:justify-items-start lg:gap-8">
                <div className="flex w-full max-w-3xl flex-col items-center text-center lg:items-start lg:text-start">
                    <a href="/careers" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup className="hidden md:flex" size="lg" color="brand" theme="modern" addonText="We're hiring!">
                            Join our remote team
                        </BadgeGroup>
                        <BadgeGroup className="md:hidden" size="md" color="brand" theme="modern" addonText="We're hiring!">
                            Join our remote team
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">
                        Beautiful banking <br className="max-lg:hidden" /> to grow smarter
                    </h1>
                    <p className="text-tertiary mt-4 max-w-lg text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you budget, forecast, and save.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>

                <div className="relative w-full lg:h-128">
                    <div className="flex size-full items-center justify-center lg:absolute lg:start-0 lg:top-0 lg:w-full lg:items-start lg:justify-start">
                        <div className={styles.mockup.outer}>
                            <div className={styles.mockup.middle}>
                                <div className={styles.mockup.screen}>
                                    <img
                                        src={IMAGES.landscape[0].src}
                                        alt="Dashboard mockup showing the application interface"
                                        className="object-cover lg:max-w-5xl"
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
