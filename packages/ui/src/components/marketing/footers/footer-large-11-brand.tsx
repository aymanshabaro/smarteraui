"use client";

import { PlayCircle } from "@properui/icons";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons-outline";
import { Button } from "@/components/base/buttons/button";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { AngelList, Dribbble, Facebook, GitHub, Layers, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    socialLink:
        "text-icon-fg-brand_on-brand outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
    footerLink: "max-h-5 text-footer-button-fg hover:text-footer-button-fg_hover",
});

const navItems = [
    { label: "Overview", href: "/product/overview" },
    { label: "Features", href: "/product/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/careers" },
    { label: "Help", href: "/help" },
    { label: "Privacy", href: "/privacy" },
];

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedIn },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "GitHub", href: "https://github.com/", icon: GitHub },
    { label: "AngelList", href: "https://angel.co/", icon: AngelList },
    { label: "Dribbble", href: "https://dribbble.com/", icon: Dribbble },
    { label: "Layers", href: "https://layers.com/", icon: Layers },
];

/** Brand-tinted centred call-to-action above a single-row navigation, app-store badges and a social bar. */
export const FooterLarge11Brand = () => (
    <footer className="bg-brand-section py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="border-brand_alt flex flex-col items-center border-b pb-8 text-center md:pb-16">
                <h2 className="text-primary_on-brand text-display-xs md:text-display-sm font-semibold">No long-term contracts. No catches. Simple.</h2>
                <p className="text-tertiary_on-brand text-md mt-2 md:mt-4 md:text-xl">Start your 30-day free trial. Cancel anytime.</p>
                <div className="mt-8 flex flex-col-reverse gap-3 self-stretch md:mt-12 md:flex-row md:self-center">
                    <Button size="xl" color="secondary" iconLeading={PlayCircle} className="shadow-xs! ring-0">
                        View demo
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>

            <div className="mt-12 flex flex-col justify-between gap-x-8 gap-y-12 md:mt-16 lg:flex-row">
                <div className="flex flex-col gap-8 md:items-start">
                    <div className="flex w-full flex-col gap-6 md:max-w-xs md:gap-8">
                        <ProperLogo className="dark-mode" />
                        <p className="text-tertiary_on-brand text-md">Design amazing digital experiences that create more happy in the world.</p>
                    </div>

                    <nav>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-[repeat(6,max-content)]">
                            {navItems.map((item) => (
                                <li key={item.label} className="flex">
                                    <Button href={item.href} color="link-color" size="md" className={styles.footerLink}>
                                        {item.label}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div>
                    <h3 className="text-primary_on-brand text-sm font-medium">Get the app</h3>
                    <div className="mt-4 flex w-max flex-row gap-4 lg:flex-col">
                        <AppStoreButton href="/download/ios" className="dark-mode w-[135px]" />
                        <GooglePlayButton href="/download/android" className="dark-mode w-[135px]" />
                    </div>
                </div>
            </div>

            <div className="border-brand_alt mt-12 flex flex-col-reverse justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row">
                <p className="text-quaternary_on-brand text-sm">© 2077 Proper UI. All rights reserved.</p>
                <ul className="flex gap-4">
                    {socials.map(({ label, href, icon: Icon }) => (
                        <li key={label}>
                            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.socialLink}>
                                <Icon aria-hidden="true" className="size-5" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </footer>
);
