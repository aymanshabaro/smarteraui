import { sortCx } from "../../../utils/cx";
import { AppStoreButton, GooglePlayButton } from "../../base/buttons/app-store-buttons-outline";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";
import { AngelList, Dribbble, Facebook, GitHub, Layers, LinkedIn, X } from "../../foundations/social-icons";

const styles = sortCx({
    navLink: "max-h-5 text-footer-button-fg hover:text-footer-button-fg_hover",
    socialLink:
        "text-icon-fg-brand_on-brand outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const navItems = ["Overview", "Features", "Pricing", "Careers", "Help", "Privacy"];

const socialLinks = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedIn },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "GitHub", href: "https://github.com/", icon: GitHub },
    { label: "AngelList", href: "https://angel.co/", icon: AngelList },
    { label: "Dribbble", href: "https://dribbble.com/", icon: Dribbble },
    { label: "Layers", href: "https://layers.com/", icon: Layers },
];

/**
 * A brand footer that puts the logo, mission statement and an inline navigation on the left
 * and the app-store badges on the right, with the copyright and social row underneath.
 */
export const FooterLarge07Brand = () => {
    return (
        <footer className="bg-brand-section py-12 md:pt-16">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col justify-between gap-x-8 gap-y-12 lg:flex-row">
                    <div className="flex flex-col gap-8 md:items-start">
                        <div className="flex w-full flex-col gap-6 md:max-w-xs md:gap-8">
                            {/* The mark is always the light lockup on the solid brand background. */}
                            <ProperLogo className="dark-mode" />

                            <p className="text-tertiary_on-brand text-md">Design amazing digital experiences that create more happy in the world.</p>
                        </div>

                        <nav>
                            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-[repeat(6,max-content)]">
                                {navItems.map((item) => (
                                    <li key={item} className="flex">
                                        <Button href="#" size="md" color="link-color" className={styles.navLink}>
                                            {item}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-primary_on-brand text-sm font-medium">Get the app</h3>

                        <div className="mt-4 flex w-max flex-row gap-4 lg:flex-col">
                            {/* The outline badges are scoped dark so they read as light-on-brand. */}
                            <AppStoreButton className="dark-mode w-[135px]" />
                            <GooglePlayButton className="dark-mode w-[135px]" />
                        </div>
                    </div>
                </div>

                <div className="border-brand_alt mt-12 flex flex-col-reverse justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row">
                    <p className="text-quaternary_on-brand text-sm">© 2077 Proper UI. All rights reserved.</p>

                    <ul className="flex gap-4">
                        {socialLinks.map(({ label, href, icon: Icon }) => (
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
};
