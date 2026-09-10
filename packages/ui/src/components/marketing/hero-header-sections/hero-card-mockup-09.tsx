"use client";

import { PlayCircle } from "@properui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { cx } from "@/utils/cx";
import { AVATARS } from "@/utils/demo-assets";

/** Cards of the isometric stack, front to back. */
const cards = [
    { holder: AVATARS[3].name, type: "transparent-gradient", z: "z-4" },
    { holder: AVATARS[2].name, type: "brand-dark", z: "z-3" },
    { holder: AVATARS[0].name, type: "transparent", z: "z-2" },
    { holder: AVATARS[1].name, type: "gray-dark", z: "z-1" },
] as const;

/** The isometric tilt shared by every card in the stack; not expressible as a single Tailwind utility. */
const tilt = { transform: "scale(var(--scale)) rotateX(63deg) rotateY(1deg) rotateZ(51deg) skewX(14deg)" };

/** Two-column fintech hero with an isometric stack of business credit cards on a tinted panel. */
export const HeroCardMockup09 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="circle" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="circle" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <HeaderDropdownSimple />

        <section className="relative py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex max-w-3xl flex-col items-start">
                    <a href="/download/ios" className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup className="hidden md:flex" size="lg" color="success" theme="modern" addonText="New!">
                            Download the new iOS app
                        </BadgeGroup>
                        <BadgeGroup className="md:hidden" size="md" color="success" theme="modern" addonText="New!">
                            Download the new iOS app
                        </BadgeGroup>
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
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>
                </div>

                <div className="bg-tertiary relative -mx-4 flex h-80 items-center justify-center md:me-0 md:h-120 md:rounded-2xl lg:h-full lg:min-h-140">
                    <div className="-space-y-[146px] md:translate-y-3.5 md:-space-y-[126px]">
                        {cards.map((card) => (
                            <div key={card.holder} style={tilt} className={cx("relative [--scale:1.13] md:[--scale:1.641]", card.z)}>
                                <CreditCard type={card.type} company="Proper UI." cardHolder={card.holder} cardExpiration="06/28" />
                            </div>
                        ))}
                        <div style={tilt} className="relative z-0 [--scale:1.13] md:[--scale:1.641]">
                            <div className="bg-alpha-black/15 h-47.5 w-79 rounded-2xl blur-md" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
