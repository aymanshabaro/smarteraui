import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { AngelList, Dribbble, Facebook, GitHub, Layers, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedIn },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "GitHub", href: "https://github.com/", icon: GitHub },
    { label: "AngelList", href: "https://angel.co/", icon: AngelList },
    { label: "Dribbble", href: "https://dribbble.com/", icon: Dribbble },
    { label: "Layers", href: "https://layers.com/", icon: Layers },
];

/** Compact footer with social icons, a centred logo and the copyright. */
export const FooterSmall03 = () => (
    <footer className="bg-primary py-12">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-between lg:flex-row">
                <ul className="mt-12 flex gap-4 lg:mt-0 lg:w-full lg:max-w-xs">
                    {socials.map(({ label, href, icon: Icon }) => (
                        <li key={label}>
                            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.socialLink}>
                                <Icon aria-hidden="true" className="size-5" />
                            </a>
                        </li>
                    ))}
                </ul>

                <ProperLogo className="order-first h-7 w-min shrink-0 lg:order-none" />

                <p className="text-quaternary mt-6 text-sm lg:mt-0 lg:w-full lg:max-w-xs lg:text-end">© 2077 Proper. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
