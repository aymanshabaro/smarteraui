"use client";

import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { AVATARS } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/** The isometric tilt every card in the stack shares. */
const tilt = { transform: "scale(var(--scale)) rotateX(63deg) rotateY(1deg) rotateZ(51deg) skewX(14deg)" };

/**
 * Hero card mockup 04 — copy on the start half beside a brand panel holding three
 * frosted credit cards fanned out on an isometric tilt.
 */
export const HeroCardMockup04 = () => (
    <div className="bg-secondary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex max-w-3xl flex-col items-start">
                    <a href="/features" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="modern" addonText="What's new?" className="hidden md:flex">
                            Instantly issue virtual cards
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" theme="modern" addonText="What's new?" className="md:hidden">
                            Instantly issue virtual cards
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">
                        No more business banking headaches
                    </h1>
                    <p className="text-tertiary mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        Proper UI is a next-gen financial technology company in the process of reinventing banking.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 md:mt-12 md:flex-row md:items-start">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>

                <div className="bg-brand-section relative -mx-4 flex h-80 items-center justify-center md:mx-0 md:h-120 lg:h-full lg:min-h-140">
                    <div className="translate-x-[34px] translate-y-[3px] -space-y-[116.5px] md:translate-x-[53px] md:translate-y-[37px] md:-space-y-[83px]">
                        <div className="relative z-3 translate-y-[22px] rotate-[29.9deg]">
                            <div style={tilt} className="[--scale:1.365] md:[--scale:2.1]">
                                <CreditCard company="Proper UI." type="transparent-gradient" cardHolder={AVATARS[2].name} />
                            </div>
                        </div>

                        <div className="relative z-2 translate-y-[10px] rotate-[14.8deg]">
                            <div style={tilt} className="[--scale:1.365] md:[--scale:2.099]">
                                <CreditCard company="Proper UI." type="transparent-gradient" cardHolder={AVATARS[0].name} />
                            </div>
                        </div>

                        <div style={tilt} className="relative z-1 [--scale:1.365] md:[--scale:2.1]">
                            <CreditCard company="Proper UI." type="transparent-gradient" cardHolder={AVATARS[1].name} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
