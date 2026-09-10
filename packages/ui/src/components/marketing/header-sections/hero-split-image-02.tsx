"use client";

import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/**
 * Hero split image 02 — copy on the start half, a full-bleed photo pinned to the end
 * half from `lg` up and angled with a clip path from `xl` up.
 */
export const HeroSplitImage02 = () => (
    <div className="bg-primary">
        <MarketingHeader items={navItems} className="bg-primary" />

        <section className="bg-primary relative py-16 lg:flex lg:min-h-180 lg:items-center lg:py-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pe-8">
                    <a href="/careers" className="outline-focus-ring rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" addonText="We're hiring!" className="hidden md:flex">
                            Join our remote team
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" addonText="We're hiring!" className="md:hidden">
                            Join our remote team
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
                    src={IMAGES.landscape[0].src}
                    alt={IMAGES.landscape[0].alt}
                    className="size-full object-cover xl:absolute xl:inset-0 xl:-left-10 xl:w-[calc(100%+40px)] xl:max-w-none xl:[clip-path:polygon(10%_0%,_100%_0%,_100%_100%,_0%_100%)]"
                />
            </div>
        </section>
    </div>
);
