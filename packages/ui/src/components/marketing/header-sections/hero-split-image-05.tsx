"use client";

import { PlayCircle } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/**
 * Hero split image 05 — copy over a faint grid, with a photo that floats to the end
 * side from `lg` up and carries opposite-corner radii.
 */
export const HeroSplitImage05 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="py-16 md:pb-24">
            <div className="max-w-container relative mx-auto grid grid-cols-1 gap-16 px-4 md:px-8 lg:min-h-160 lg:items-center">
                <div className="z-10 flex max-w-200 flex-col items-start">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">
                        Customer service software for customer-first teams
                    </h1>
                    <p className="text-tertiary mt-4 max-w-xl text-lg text-balance md:mt-6 md:text-xl">
                        The best customer service software for customer-first teams. Industry-leading email and live chat support.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 md:mt-12 md:flex-row md:items-start">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>

                <div className="relative lg:absolute lg:end-8 lg:top-0 lg:h-full lg:w-140">
                    <img
                        src={IMAGES.landscape[1].src}
                        alt={IMAGES.landscape[1].alt}
                        className="inset-0 h-60 w-full rounded-se-[32px] rounded-es-[32px] object-cover md:h-110 md:rounded-se-[64px] md:rounded-es-[64px] lg:h-full"
                    />
                </div>
            </div>
        </section>
    </div>
);
