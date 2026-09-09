"use client";

import { PlayCircle } from "@smarteraui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import type { MarketingNavItemType } from "@/components/marketing/header-navigations/base-components/header";
import { MarketingHeader } from "@/components/marketing/header-navigations/base-components/header";
import { SimpleResourcesMenu } from "@/components/marketing/header-navigations/base-components/menus";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IPhoneMockup } from "@/components/shared-assets/mockups/iphone-mockup";
import { cx } from "@/utils/cx";
import { AVATARS, IMAGES } from "@/utils/demo-assets";

const navItems: MarketingNavItemType[] = [
    { label: "Products", menu: <SimpleResourcesMenu /> },
    { label: "Services", menu: <SimpleResourcesMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", menu: <SimpleResourcesMenu /> },
    { label: "About", href: "/about" },
];

const socialProofAvatars = AVATARS.slice(0, 5);

const notifications = [
    {
        avatar: AVATARS[0],
        body: (
            <p className="text-secondary text-sm">
                <span className="text-brand-secondary font-medium">{AVATARS[0].name}</span> followed you!
            </p>
        ),
        meta: AVATARS[0].username,
        opacity: "",
    },
    {
        avatar: AVATARS[4],
        body: (
            <p className="text-secondary text-sm">
                <span className="text-brand-secondary font-medium">{AVATARS[4].name}</span> and 2 others gave you kudos on{" "}
                <span className="text-brand-secondary font-medium">Clubhouse 101</span> post
            </p>
        ),
        meta: null,
        opacity: "",
    },
    {
        avatar: AVATARS[1],
        body: (
            <p className="text-secondary text-sm">
                <span className="text-brand-secondary font-medium">{AVATARS[1].name}</span> joined your team{" "}
                <span className="text-brand-secondary font-medium">Melbourne Startups Growth</span>
            </p>
        ),
        meta: null,
        opacity: "opacity-75",
    },
    {
        avatar: AVATARS[2],
        body: (
            <p className="text-secondary text-sm">
                <span className="text-brand-secondary font-medium">{AVATARS[2].name}</span> just launched{" "}
                <span className="text-brand-secondary font-medium">The 10k users challenge</span>
            </p>
        ),
        meta: null,
        opacity: "opacity-50",
    },
];

/**
 * Split hero with social proof under the call to action, and an iPhone mockup rising out of a
 * rounded pedestal with floating notification cards beside it from `md` up.
 */
export const HeroIphoneMockup04 = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <MarketingHeader items={navItems} />

        <section className="relative overflow-hidden pt-16 md:pb-24">
            <div className="max-w-container mx-auto flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:items-center lg:gap-8">
                <div className="w-full flex-1">
                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl max-w-3xl font-semibold">
                        Growth performance tracking made easy
                    </h1>
                    <p className="text-tertiary mt-4 max-w-lg text-lg text-balance md:mt-6 md:text-xl">
                        Designed by creators, for creators. Smartera gives you the guidance, data and innovation you need to sell more and grow your digital
                        business.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                        <Button size="xl">Sign up</Button>
                    </div>

                    <div className="mt-8 flex items-center gap-4 md:mt-12">
                        <div className="inline-flex -space-x-3 overflow-hidden">
                            {socialProofAvatars.map((person) => (
                                <Avatar key={person.username} size="md" src={person.src} alt={person.name} className="ring-bg-primary ring-[1.5px]" />
                            ))}
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                                <RatingStars rating={5} className="items-center gap-1" starClassName="relative size-5 shrink-0 grow-0" />
                                <span className="text-md text-secondary font-semibold">5.0</span>
                            </div>
                            <p className="text-md text-tertiary font-medium">from 200+ reviews</p>
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-1 flex-col items-center overflow-y-clip md:h-160 md:pt-20 lg:max-w-140">
                    {/* Rounded pedestal the device stands on; decorative only. */}
                    <div
                        aria-hidden="true"
                        className="bg-tertiary absolute top-20 left-1/2 h-94 w-120 -translate-x-1/2 rounded-t-[320px] rounded-b-3xl md:top-0 md:h-160 md:w-140"
                    />

                    <div className="relative flex h-104 w-max items-start justify-center md:h-140">
                        <ul aria-hidden="true" className="absolute -start-[218px] -bottom-3 z-10 hidden flex-col gap-3 md:flex">
                            {notifications.map((notification) => (
                                <li
                                    key={notification.avatar.username + (notification.meta ?? "")}
                                    className={cx("bg-alpha-white/90 flex w-full max-w-xs gap-3 rounded-lg p-4 backdrop-blur-lg", notification.opacity)}
                                >
                                    <img
                                        src={notification.avatar.src}
                                        alt=""
                                        className="size-10 rounded-full object-cover outline-1 -outline-offset-1 outline-black/10"
                                    />
                                    <div>
                                        {notification.body}
                                        {notification.meta && <p className="text-tertiary text-sm">{notification.meta}</p>}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <IPhoneMockup
                            image={IMAGES.landscape[5].src}
                            className="drop-shadow-iphone-mockup h-[579px] w-71 md:h-auto md:w-[313px] md:drop-shadow-none"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
);
