"use client";

import { PlayCircle } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IMAGES, LOGOS } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/**
 * Split hero over a dotted grid: copy and actions on the start side, a bordered
 * screenshot on the other. The customer logo row sits under the copy at `lg` and moves
 * below the whole grid on narrower screens.
 */
export const HeroScreenMockup04 = () => (
    <div className="bg-secondary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2" />

        <MarketingHeader items={navItems} />

        <section className="relative overflow-hidden py-16 md:py-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center justify-items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:justify-items-start">
                <div className="flex max-w-5xl flex-col items-center text-center lg:items-start lg:text-start">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">Beautiful analytics to grow smarter</h1>
                    <p className="text-tertiary mt-4 max-w-lg text-lg text-balance md:mt-6 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.{" "}
                        <span className="md:hidden">Trusted by over 4,000 startups.</span>
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button color="secondary" size="xl" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>

                    <div className="mt-16 hidden flex-col gap-6 lg:flex">
                        <p className="text-md text-tertiary font-medium">Trusted by 4,000+ companies</p>
                        <div className="flex flex-wrap justify-start gap-4">
                            {LOGOS.map((logo) => (
                                <img key={logo.src} alt={logo.name} src={logo.src} className="h-10 object-contain" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative lg:h-128">
                    <img
                        alt={IMAGES.landscape[2].alt}
                        src={IMAGES.landscape[2].src}
                        className="ring-screen-mockup-border inset-0 aspect-3/2 h-auto w-full max-w-none rounded object-cover ring-4 md:h-90 md:w-auto md:rounded-xl lg:absolute lg:h-full lg:object-left"
                    />
                </div>

                <div className="flex max-w-3xl flex-col gap-8 lg:hidden">
                    <p className="text-md text-tertiary text-center font-medium">Trusted by 4,000+ companies</p>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        {LOGOS.map((logo) => (
                            <img key={logo.src} alt={logo.name} src={logo.src} className="h-9 object-contain" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
);
