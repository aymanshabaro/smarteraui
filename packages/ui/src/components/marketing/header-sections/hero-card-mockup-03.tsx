"use client";

import type { CSSProperties } from "react";
import { ArrowRight, PlayCircle } from "@properui/icons";
import { AVATARS } from "../../../utils/demo-assets";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Button } from "../../base/buttons/button";
import { BackgroundPattern } from "../../shared-assets/background-patterns";
import { CreditCard } from "../../shared-assets/credit-card/credit-card";
import type { MarketingNavItemType } from "../header-navigations/base-components/header";
import { MarketingHeader } from "../header-navigations/base-components/header";
import { ProductsMenu, SimpleResourcesMenu } from "../header-navigations/base-components/menus";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <ProductsMenu /> },
    { label: "Services", menu: <ProductsMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const announcement = { addonText: "What's new?", children: "Instantly issue virtual cards" };

/**
 * The fan is five cards pivoting around a shared origin: each is rotated 30° further and
 * nudged out along the arc. Scale is the only thing that changes between breakpoints.
 */
const fannedCards = [
    { holder: AVATARS[1].name, translate: "-59px, 39px", rotate: 30 },
    { holder: AVATARS[0].name, translate: "-38px, 10px", rotate: 60 },
    { holder: AVATARS[2].name, translate: "0px, 0px", rotate: 90 },
    { holder: AVATARS[3].name, translate: "36px, 10px", rotate: 120 },
    { holder: AVATARS[4].name, translate: "59px, 39px", rotate: 150 },
];

/**
 * Fintech hero: centered copy over a fading grid, closing on a fan of translucent credit
 * cards rising out of a brand-coloured band.
 */
export const HeroCardMockup03 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute -top-2 left-1/2 z-0 max-w-none -translate-x-1/2" />

        <MarketingHeader items={navItems} />

        <section className="relative overflow-hidden pt-16 md:pt-24 md:pb-0">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col md:items-center md:text-center">
                    <a href="/blog/virtual-cards" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup size="lg" color="brand" theme="modern" iconTrailing={ArrowRight} className="hidden md:flex" {...announcement} />
                        <BadgeGroup size="md" color="brand" theme="modern" iconTrailing={ArrowRight} className="md:hidden" {...announcement} />
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold">No more banking headaches</h1>
                    <p className="text-tertiary mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                        Mo money, no problems. Proper UI is a next-generation financial technology company in the process of reinventing{" "}
                        <span className="max-md:hidden">banking. 30-day free trial.</span>
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button color="secondary" size="xl" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-container mx-auto mt-16 w-full md:px-8">
                <div className="bg-brand-section flex h-51 items-end justify-center md:h-129">
                    <div className="flex -translate-y-[53px] items-start justify-end md:translate-y-3">
                        {fannedCards.map((card) => (
                            <div
                                key={card.rotate}
                                className="absolute origin-right [transform:var(--transform-mobile)] md:[transform:var(--transform-desktop)]"
                                style={
                                    {
                                        "--transform-mobile": `scale(0.7) translate(${card.translate}) rotate(${card.rotate}deg)`,
                                        "--transform-desktop": `scale(1.77) translate(${card.translate}) rotate(${card.rotate}deg)`,
                                    } as CSSProperties
                                }
                            >
                                <CreditCard type="transparent-gradient" company="Proper UI." cardHolder={card.holder} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
);
