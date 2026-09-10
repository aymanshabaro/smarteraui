"use client";

import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { cx } from "@/utils/cx";
import { AVATARS } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/** The card scale is a breakpoint-driven custom property, so the transform has to stay inline. */
const cardScale = "relative [--scale:0.84] md:[--scale:1.3] lg:[--scale:1.57]";

/** Split hero with two rotated credit cards stacked inside a tinted panel on the end edge. */
export const HeroCardMockup02 = () => (
    <div className="bg-secondary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex max-w-3xl flex-col items-start">
                    <a href="/features/virtual-cards" className="outline-focus-ring rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" addonText="What's new?" className="hidden md:flex">
                            Instantly issue virtual cards
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" addonText="What's new?" className="md:hidden">
                            Instantly issue virtual cards
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">
                        No more business banking headaches
                    </h1>
                    <p className="text-tertiary mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        Proper is a next-gen financial technology company in the process of reinventing banking.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 md:mt-12 md:flex-row md:items-start">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>

                <div className="bg-quaternary relative -mx-4 flex h-80 items-center justify-center md:mx-0 md:h-120 lg:h-full lg:min-h-160">
                    <div className="-translate-x-0.5 -space-y-[106px] md:translate-x-[9px] md:-translate-y-px md:-space-y-16 lg:-space-y-8">
                        <div className={cx(cardScale, "z-1")} style={{ transform: "scale(var(--scale)) rotate(60deg) translate(38px, -53px)" }}>
                            <CreditCard type="transparent" company="Proper." cardHolder={AVATARS[0].name} />
                        </div>
                        <div className={cx(cardScale, "z-0")} style={{ transform: "scale(var(--scale)) rotate(30deg) translate(-23px, 24px)" }}>
                            <CreditCard type="brand-dark" company="Proper." cardHolder={AVATARS[1].name} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
