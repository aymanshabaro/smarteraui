"use client";

import { ArrowRight, PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { AVATARS } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const announcement = { addonText: "New!", children: "Download the new iOS app" };

/**
 * Every card in the stack shares one isometric transform; only the z-order and the card
 * finish change, and the negative row gap slides them over each other.
 */
const isometric = "scale(var(--scale)) rotateX(63deg) rotateY(1deg) rotateZ(51deg) skewX(14deg)";

const stackedCards = [
    { z: "z-4", type: "transparent-gradient", holder: AVATARS[3].name },
    { z: "z-3", type: "brand-dark", holder: AVATARS[2].name },
    { z: "z-2", type: "transparent-gradient", holder: AVATARS[0].name },
    { z: "z-1", type: "gray-dark", holder: AVATARS[1].name },
] as const;

/**
 * Split hero for a card product: copy on the start side, an isometric stack of cards
 * floating over a tinted panel on the other.
 */
export const HeroCardMockup09 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="circle" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex max-w-3xl flex-col items-start">
                    <a href="/blog/ios-app" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="success" theme="modern" iconTrailing={ArrowRight} className="hidden md:flex" {...announcement} />
                        <BadgeGroup size="md" color="success" theme="modern" iconTrailing={ArrowRight} className="md:hidden" {...announcement} />
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">Smart business credit cards</h1>
                    <p className="text-tertiary mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        <span className="max-md:hidden">Proper UI is a next-gen financial technology company in the process of reinventing banking.</span>
                        <span className="md:hidden">
                            Mo money, no problems. Proper UI is a next-generation financial technology company in the process of reinventing banking. 30-day
                            free trial.
                        </span>
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 md:mt-12 md:flex-row md:items-start">
                        <Button color="secondary" size="xl" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>

                <div className="bg-tertiary relative -mx-4 flex h-80 items-center justify-center md:me-0 md:h-120 md:rounded-2xl lg:h-full lg:min-h-140">
                    <div className="-space-y-[146px] md:translate-y-3.5 md:-space-y-[126px]">
                        {stackedCards.map((card) => (
                            <div key={card.z} className={`relative ${card.z} [--scale:1.13] md:[--scale:1.641]`} style={{ transform: isometric }}>
                                <CreditCard type={card.type} company="Proper UI." cardHolder={card.holder} />
                            </div>
                        ))}

                        {/* The contact shadow the stack appears to cast. */}
                        <div className="relative z-0 [--scale:1.13] md:[--scale:1.641]" style={{ transform: isometric }}>
                            <div className="bg-utility-neutral-900 h-47.5 w-79 rounded-2xl opacity-15 blur-md" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
