"use client";

import { PlayCircle } from "@properui/icons";
import { AVATARS } from "../../../utils/demo-assets";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Button } from "../../base/buttons/button";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import { CreditCard } from "../../shared-assets/credit-card/credit-card";
import type { MarketingNavItemType } from "../header-navigations/base-components/header";
import { MarketingHeader } from "../header-navigations/base-components/header";
import { SimpleResourcesMenu } from "../header-navigations/base-components/menus";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/**
 * Hero card mockup 02 — a split hero with copy on the left and two fanned credit cards on a
 * muted panel to the right.
 */
export const HeroCardMockup02 = () => (
    <div className="bg-secondary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex max-w-3xl flex-col items-start">
                    <a href="/whats-new" className="outline-focus-ring rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="light" addonText="What's new?" className="hidden md:flex">
                            Instantly issue virtual cards
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" theme="light" addonText="What's new?" className="md:hidden">
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
                        <Button size="xl" color="secondary" iconLeading={PlayCircle} href="/demo">
                            Demo
                        </Button>
                        <Button size="xl" href="/signup">
                            Sign up
                        </Button>
                    </div>
                </div>

                <div className="bg-quaternary relative -mx-4 flex h-80 items-center justify-center md:mx-0 md:h-120 lg:h-full lg:min-h-160">
                    <div className="-translate-x-0.5 -space-y-[106px] md:translate-x-[9px] md:-translate-y-px md:-space-y-16 lg:-space-y-8">
                        <div className="relative z-1 [transform:scale(var(--scale))_rotate(60deg)_translate(38px,-53px)] [--scale:0.84] md:[--scale:1.3] lg:[--scale:1.57]">
                            <CreditCard type="transparent" company="Proper UI." cardHolder={AVATARS[0].name} />
                        </div>
                        <div className="relative z-0 [transform:scale(var(--scale))_rotate(30deg)_translate(-23px,24px)] [--scale:0.84] md:[--scale:1.3] lg:[--scale:1.57]">
                            <CreditCard type="brand-dark" company="Proper UI." cardHolder={AVATARS[1].name} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
