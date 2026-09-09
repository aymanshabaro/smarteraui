"use client";

import { PlayCircle } from "@smarteraui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { IMAGES } from "@/utils/demo-assets";

const badge = { addonText: "We're hiring!", children: "Join our remote team", href: "/careers" };

/** Split hero with a light brand badge and an angled image that bleeds off the right edge on large screens. */
export const HeroSplitImage02 = () => (
    <>
        <HeaderDropdownSimple />

        <section className="bg-primary relative py-16 lg:flex lg:min-h-180 lg:items-center lg:py-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pe-8">
                    <a href={badge.href} className="outline-focus-ring rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup className="hidden md:flex" size="lg" color="brand" addonText={badge.addonText}>
                            {badge.children}
                        </BadgeGroup>
                        <BadgeGroup className="md:hidden" size="md" color="brand" addonText={badge.addonText}>
                            {badge.children}
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">People who care about your growth</h1>
                    <p className="text-tertiary mt-4 text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 md:mt-12 md:flex-row md:items-start">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>
            </div>

            <div className="relative mt-16 h-70 w-full px-4 md:h-96 md:px-8 lg:absolute lg:inset-y-0 lg:end-0 lg:mt-0 lg:h-full lg:w-1/2 lg:px-0">
                <img
                    src={IMAGES.landscape[1].src}
                    alt={IMAGES.landscape[1].alt}
                    className="size-full object-cover xl:absolute xl:inset-0 xl:-start-10 xl:w-[calc(100%+40px)] xl:max-w-none xl:[clip-path:polygon(10%_0%,_100%_0%,_100%_100%,_0%_100%)]"
                />
            </div>
        </section>
    </>
);
