import { Mail01, MarkerPin01, Phone } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const channels = [
    { icon: Mail01, title: "Email", subtitle: "Our friendly team is here to help.", cta: "hi@smartera.com", href: "mailto:hi@smartera.com" },
    {
        icon: MarkerPin01,
        title: "Office",
        subtitle: "Come say hello at our office HQ.",
        cta: "100 Smith Street\nCollingwood VIC 3066 AU",
        href: "https://maps.google.com/?q=100+Smith+Street+Collingwood+VIC+3066",
    },
    { icon: Phone, title: "Phone", subtitle: "Mon-Fri from 8am to 5pm.", cta: "+1 (555) 000-0000", href: "tel:+15550000000" },
];

/** Three centered contact channels behind circular featured icons, with no section heading. */
export const ContactSimpleIcons01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <ul className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                {channels.map((channel) => (
                    <li key={channel.title} className="flex max-w-sm flex-col items-center text-center">
                        <FeaturedIcon icon={channel.icon} size="lg" color="brand" theme="light" className="hidden md:flex" />
                        <FeaturedIcon icon={channel.icon} size="md" color="brand" theme="light" className="flex md:hidden" />

                        <h3 className="text-primary mt-4 text-lg font-semibold md:mt-5">{channel.title}</h3>
                        <p className="text-md text-tertiary mt-1">{channel.subtitle}</p>
                        <Button href={channel.href} color="link-color" size="lg" className="mt-4 whitespace-pre md:mt-5">
                            {channel.cta}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);
