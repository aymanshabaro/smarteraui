"use client";

import { PlayCircle } from "@properui/icons";
import { AVATARS } from "../../../utils/demo-assets";
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

/** The rotated wall of cards, row by row, top to bottom. */
const cardRows = [
    { indent: true, types: ["brand-dark", "gray-dark", "brand-dark"] },
    { indent: false, types: ["gray-light", "gradient-strip", "salmon-strip"] },
    { indent: true, types: ["transparent-strip", "brand-dark"] },
    { indent: false, types: ["brand-dark"] },
] as const;

/**
 * Hero card mockup 10 — a left-aligned hero above a muted panel filled with a rotated wall
 * of credit cards.
 */
export const HeroCardMockup10 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative py-16 md:py-24">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="flex max-w-3xl flex-col items-start">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl font-semibold">
                        Simple, transparent business credit cards
                    </h1>
                    <p className="text-tertiary mt-4 text-lg text-balance md:mt-6 md:text-xl">
                        Mo money, no problems. Proper UI is a next-generation financial technology company in the process of reinventing banking. 30-day free
                        trial.
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
            </div>

            <div className="max-w-container relative mt-16 w-full md:mx-auto md:mt-24 md:px-8">
                <div className="bg-secondary h-80 w-full md:h-120 md:rounded-2xl" />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden sm:ps-[30vw] md:inset-x-8 md:rounded-2xl md:ps-0"
                >
                    <div className="flex w-max [transform:scale(0.585)_rotate(30deg)_translate(-87px,799px)] flex-col gap-4 md:[transform:rotate(30deg)_translate(416px,177px)]">
                        {cardRows.map((row, rowIndex) => (
                            <div key={rowIndex} className={row.indent ? "flex gap-4 ps-40" : "flex gap-4"}>
                                {row.types.map((type, cardIndex) => (
                                    <CreditCard key={cardIndex} type={type} company="Proper UI." cardHolder={AVATARS[1].name} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
);
