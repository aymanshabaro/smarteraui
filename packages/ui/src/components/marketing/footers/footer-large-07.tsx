import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { Button } from "@/components/base/buttons/button";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";
import { AngelList, Dribbble, Facebook, GitHub, Layers, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
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

/** Single-row navigation with a brand blurb and app-store badges, over a social bar. */
export const FooterLarge07 = () => (
    <footer className="bg-primary py-12 md:pt-16">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col justify-between gap-x-8 gap-y-12 lg:flex-row">
                <div className="flex flex-col gap-8 md:items-start">
                    <div className="flex w-full flex-col gap-6 md:max-w-xs md:gap-8">
                        <SmarteraLogo className="h-7 w-min shrink-0" />
                        <p className="text-tertiary text-md">Design amazing digital experiences that create more happy in the world.</p>
                    </div>

                    <nav>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-[repeat(6,max-content)]">
                            {navItems.map((item) => (
                                <li key={item.label} className="flex">
                                    <Button href={item.href} color="link-gray" size="md" className="max-h-5">
                                        {item.label}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div>
                    <h3 className="text-brand-secondary text-sm font-medium">Get the app</h3>
                    <div className="mt-4 flex w-max flex-row gap-4 lg:flex-col">
                        <AppStoreButton href="/download/ios" className="w-[135px]" />
                        <GooglePlayButton href="/download/android" className="w-[135px]" />
                    </div>
                </div>
            </div>

            <div className="border-secondary mt-12 flex flex-col-reverse justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row">
                <p className="text-quaternary text-sm">© 2077 Smartera. All rights reserved.</p>
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
