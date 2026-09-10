"use client";

import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

// TODO(orchestrator): candidate for a shared `shared-assets/mockups/screen-mockup` primitive.
const styles = sortCx({
    mockup: {
        bezel: "bg-primary ring-utility-neutral-300 size-full rounded-[23.89px] p-[3px] shadow-lg ring-[1.5px] ring-inset md:rounded-[32px] md:p-1 md:ring-[2px]",
        frame: "bg-primary shadow-modern-mockup-inner-sm md:shadow-modern-mockup-inner-lg size-full rounded-[20.91px] p-1 md:rounded-[28px] md:p-[5.4px]",
        screen: "bg-utility-neutral-50 ring-utility-neutral-200 relative size-full overflow-hidden rounded-[17.92px] ring-[1.5px] md:rounded-[24px] md:ring-[2px]",
    },
});

/**
 * Hero screen mockup 05 — a floating header over centered copy, with the product
 * screenshot inside a bezelled device frame that narrows to a phone below `md`.
 */
export const HeroScreenMockup05 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid-check" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid-check" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} isFloating />

        <section className="relative pt-16 md:pt-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                    <a href="/features" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="modern" addonText="New feature" className="hidden md:flex">
                            Check out the team dashboard
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" theme="modern" addonText="New feature" className="md:hidden">
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

            <div className="max-w-container mx-auto mt-16 h-90 w-full overflow-hidden px-4 md:h-124 md:px-8">
                <div className="mx-auto flex h-auto w-full max-w-70 items-center justify-center md:w-full md:max-w-none md:items-start">
                    <div className={styles.mockup.bezel}>
                        <div className={styles.mockup.frame}>
                            <div className={styles.mockup.screen}>
                                <img
                                    src={IMAGES.landscape[4].src}
                                    alt="Dashboard mockup showing the application interface"
                                    className="size-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
