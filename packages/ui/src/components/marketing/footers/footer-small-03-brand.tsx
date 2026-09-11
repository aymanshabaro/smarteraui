import { ProperLogo } from "../../foundations/logo/proper-logo";
import { AngelList, Dribbble, Facebook, GitHub, Layers, LinkedIn, X } from "../../foundations/social-icons";

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
 * A small brand footer with the social row, the logo and the copyright line balanced across
 * three equal columns from `lg` up and stacked (logo first) on smaller screens.
 */
export const FooterSmall03Brand = () => {
    return (
        <footer className="bg-brand-section py-12">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col items-center justify-between lg:flex-row">
                    <ul className="mt-12 flex gap-4 lg:mt-0 lg:w-full lg:max-w-xs">
                        {socialLinks.map(({ label, href, icon: Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="text-icon-fg-brand_on-brand outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    <Icon aria-hidden="true" className="size-5" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* The mark is always the light lockup on the solid brand background. */}
                    <ProperLogo className="dark-mode order-first h-7 w-min shrink-0 lg:order-none" />

                    <p className="text-quaternary_on-brand mt-6 text-sm lg:mt-0 lg:w-full lg:max-w-xs lg:text-end">© 2077 Proper UI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
