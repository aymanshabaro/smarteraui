"use client";

import { PlayCircle } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { cx, sortCx } from "@/utils/cx";
import { AVATARS } from "@/utils/demo-assets";

const styles = sortCx({
    /** The header sits on the brand section colour, so its nav ink has to flip to the `on-brand` ramp. */
    header: [
        "[&_nav>ul>li>a]:text-secondary_on-brand [&_nav>ul>li>a]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button]:text-secondary_on-brand [&_nav>ul>li>button]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button>svg]:text-fg-brand-secondary_alt",
        "[&_span.text-fg-primary]:text-primary_on-brand",
    ].join(" "),
    /** The isometric transform shared by all three cards in the stack. */
    isometric: "[transform:scale(var(--scale))_rotateX(63deg)_rotateY(1deg)_rotateZ(51deg)_skewX(14deg)]",
});

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

/** The blurred four-colour bloom that shines through the frosted cards. */
const CardBloom = () => (
    <div aria-hidden="true" className="absolute -top-4 -left-4 z-0 grid grid-cols-2 blur-3xl">
        <div className="bg-utility-pink-500 size-20 rounded-tl-full opacity-30" />
        <div className="bg-utility-orange-500 size-20 rounded-tr-full opacity-50" />
        <div className="bg-utility-blue-500 size-20 rounded-bl-full opacity-30" />
        <div className="bg-utility-green-500 size-20 rounded-br-full opacity-30" />
    </div>
);

/** One frosted card in the isometric stack. */
const StackedCard = ({ cardHolder, className }: { cardHolder: string; className?: string }) => (
    <div className={cx("relative overflow-hidden rounded-2xl", className)}>
        <CardBloom />
        <CreditCard type="transparent" company="Smartera." cardHolder={cardHolder} />
    </div>
);

/**
 * Hero card mockup 07 — an eyebrow-led hero on the brand section colour with an isometric
 * stack of frosted cards alongside.
 */
export const HeroCardMockup07 = () => (
    <div className="bg-brand-section relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 opacity-20 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 opacity-20 md:hidden" />

        <MarketingHeader items={navItems} className={styles.header} />

        <section className="relative py-16 md:pb-24">
            <div className="max-w-container mx-auto grid grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex max-w-3xl flex-col items-start">
                    <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Super. Simple. Banking.</span>
                    <h1 className="text-display-md text-primary_on-brand md:text-display-lg lg:text-display-xl mt-3 font-semibold">
                        Banking technology that has your back.
                    </h1>
                    <p className="text-tertiary_on-brand mt-4 max-w-120 text-lg text-balance md:mt-6 md:text-xl">
                        Simple, transparent banking. No hidden fees.
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

                <div className="relative -mx-4 flex h-80 items-center justify-center md:mx-0 md:h-120 lg:h-full lg:min-h-140">
                    <div className="translate-x-[34px] translate-y-[3px] -space-y-[116.5px] md:translate-x-[53px] md:translate-y-[37px] md:-space-y-[83px]">
                        <div className="relative z-3 translate-y-[22px] rotate-[29.9deg]">
                            <StackedCard cardHolder={AVATARS[2].name} className={cx(styles.isometric, "[--scale:1.365] md:[--scale:2.1]")} />
                        </div>
                        <div className="relative z-2 translate-y-[10px] rotate-[14.8deg]">
                            <StackedCard cardHolder={AVATARS[0].name} className={cx(styles.isometric, "[--scale:1.365] md:[--scale:2.099]")} />
                        </div>
                        <StackedCard cardHolder={AVATARS[1].name} className={cx(styles.isometric, "z-1 [--scale:1.365] md:[--scale:2.1]")} />
                    </div>
                </div>
            </div>
        </section>
    </div>
);
