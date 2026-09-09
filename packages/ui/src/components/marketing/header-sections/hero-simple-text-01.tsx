"use client";

import { PlayCircle } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/**
 * Agency hero: a start-aligned headline with one underlined phrase, two actions, and a
 * wide banner photo running the full container width beneath.
 */
export const HeroSimpleText01 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:py-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="flex max-w-5xl flex-col">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-medium">
                        We design{" "}
                        <span className="relative underline decoration-[3px] underline-offset-[0.218em] md:decoration-4 lg:decoration-4">
                            digital experiences
                        </span>{" "}
                        that create more happy in the world
                    </h1>
                    <p className="text-tertiary mt-4 max-w-(--breakpoint-sm) text-lg text-balance md:mt-6 md:text-xl">
                        — We&apos;re a full-service design and development agency who specialize in simple, useful and beautiful solutions.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button color="secondary" size="xl" iconLeading={PlayCircle}>
                            Showreel
                        </Button>
                        <Button size="xl">Get in touch</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full px-4 md:px-8">
                <img alt={IMAGES.landscape[3].alt} src={IMAGES.landscape[3].src} className="h-60 w-full object-cover md:h-[360px] lg:h-129" />
            </div>
        </section>
    </div>
);
