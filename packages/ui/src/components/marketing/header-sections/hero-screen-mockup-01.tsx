"use client";

import { PlayCircle } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const styles = sortCx({
    /** The browser frame is three nested shells: bezel, inner shadow, then the screen. */
    bezel: "size-full rounded-[9.03px] bg-primary p-[0.9px] shadow-lg ring-[0.56px] ring-utility-neutral-300 ring-inset md:rounded-[28px] md:p-[3.5px] md:ring-[1.75px]",
    inner: "size-full rounded-[7.9px] bg-primary p-0.5 shadow-modern-mockup-inner-md md:rounded-[24.5px] md:p-1 md:shadow-modern-mockup-inner-lg",
    screen: "relative size-full overflow-hidden rounded-[6.77px] bg-utility-neutral-50 ring-[0.56px] ring-utility-neutral-200 md:rounded-[21px] md:ring-[1.75px]",
});

/**
 * Centered hero over a fading grid, with the product screenshot presented in a wide
 * browser-style mockup that caps its height from `md` up.
 */
export const HeroScreenMockup01 = () => (
    <div className="bg-secondary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2" />

        <MarketingHeader items={navItems} />

        <section className="relative overflow-hidden py-16 md:py-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">Beautiful analytics to grow smarter</h1>
                    <p className="text-tertiary mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button color="secondary" size="xl" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full px-4 md:h-100 md:px-8">
                <div className="flex flex-col md:items-start">
                    <div className="mx-auto flex h-full w-full items-center justify-center md:max-h-105 md:w-full md:max-w-266 md:items-start lg:max-h-140">
                        <div className={styles.bezel}>
                            <div className={styles.inner}>
                                <div className={styles.screen}>
                                    <img alt={IMAGES.landscape[2].alt} src={IMAGES.landscape[2].src} className="size-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
