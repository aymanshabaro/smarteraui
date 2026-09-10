import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { RatingBadge } from "@/components/foundations/rating/rating-badge";
import { AngelList, Dribbble, Facebook, GitHub, Layers, LinkedIn, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

interface FooterLink {
    label: string;
    href: string;
    isNew?: boolean;
}

const columns: { title: string; items: FooterLink[] }[] = [
    {
        title: "Product",
        items: [
            { label: "Overview", href: "/product/overview" },
            { label: "Features", href: "/product/features" },
            { label: "Solutions", href: "/product/solutions", isNew: true },
            { label: "Tutorials", href: "/product/tutorials" },
            { label: "Pricing", href: "/pricing" },
            { label: "Releases", href: "/releases" },
        ],
    },
    {
        title: "Company",
        items: [
            { label: "About us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Press", href: "/press" },
            { label: "News", href: "/news" },
            { label: "Media kit", href: "/media-kit" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Resources",
        items: [
            { label: "Blog", href: "/blog" },
            { label: "Newsletter", href: "/newsletter" },
            { label: "Events", href: "/events" },
            { label: "Help centre", href: "/help" },
            { label: "Tutorials", href: "/tutorials" },
            { label: "Support", href: "/support" },
        ],
    },
    {
        title: "Social",
        items: [
            { label: "X", href: "https://x.com/" },
            { label: "LinkedIn", href: "https://www.linkedin.com/" },
            { label: "Facebook", href: "https://www.facebook.com/" },
            { label: "GitHub", href: "https://github.com/" },
            { label: "AngelList", href: "https://angel.co/" },
            { label: "Dribbble", href: "https://dribbble.com/" },
        ],
    },
    {
        title: "Legal",
        items: [
            { label: "Terms", href: "/terms" },
            { label: "Privacy", href: "/privacy" },
            { label: "Cookies", href: "/cookies" },
            { label: "Licenses", href: "/licenses" },
            { label: "Settings", href: "/settings" },
            { label: "Contact", href: "/contact" },
        ],
    },
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

/** Five link columns beside a brand blurb and rating badge, with a tinted social bar underneath. */
export const FooterLarge02 = () => (
    <footer>
        <div className="bg-primary py-12 md:pt-16">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col gap-8 md:gap-16 xl:flex-row">
                    <div className="flex flex-col items-start gap-6 md:w-80 md:gap-6">
                        <ProperLogo className="h-7 w-min shrink-0" />
                        <p className="text-tertiary text-md">Design amazing digital experiences that create more happy in the world.</p>
                        <RatingBadge className="origin-top-left scale-[0.78]" />
                    </div>

                    <nav className="flex-1">
                        <ul className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-5">
                            {columns.map((column) => (
                                <li key={column.title}>
                                    <h3 className="text-quaternary text-sm font-semibold">{column.title}</h3>
                                    <ul className="mt-4 flex flex-col gap-3">
                                        {column.items.map((item) => (
                                            <li key={item.label} className="flex">
                                                <Button
                                                    href={item.href}
                                                    color="link-gray"
                                                    size="md"
                                                    className="max-h-5"
                                                    iconTrailing={
                                                        item.isNew ? (
                                                            <Badge type="modern" size="sm" className="ms-1">
                                                                New
                                                            </Badge>
                                                        ) : undefined
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <div className="bg-secondary_alt py-10 md:py-12">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col-reverse justify-between gap-6 md:flex-row">
                    <p className="text-quaternary text-sm">© 2077 Proper. All rights reserved.</p>
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
        </div>
    </footer>
);
