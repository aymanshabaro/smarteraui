import { Mail01, MarkerPin01, Phone } from "@properui/icons";
import { Button } from "../../base/buttons/button";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

const channels = [
    { icon: Mail01, title: "Email", subtitle: "Our friendly team is here to help.", cta: "hi@proper.example", href: "mailto:hi@proper.example" },
    {
        icon: MarkerPin01,
        title: "Office",
        subtitle: "Come say hello at our office HQ.",
        cta: "100 Smith Street\nCollingwood VIC 3066 AU",
        href: "https://maps.google.com/?q=100+Smith+Street+Collingwood+VIC+3066",
    },
    { icon: Phone, title: "Phone", subtitle: "Mon-Fri from 8am to 5pm.", cta: "+1 (555) 000-0000", href: "tel:+15550000000" },
];

/** Centered heading and three contact channels on the permanently branded section background. */
export const ContactSimpleIcons02Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-tertiary_on-brand md:text-md text-sm font-semibold">Contact us</span>
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">Get in touch</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Our friendly team is always here to chat.</p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                    {channels.map((channel) => (
                        <li key={channel.title} className="flex max-w-sm flex-col items-center text-center">
                            <FeaturedIcon icon={channel.icon} size="md" color="brand" theme="dark" className="flex md:hidden" />
                            <FeaturedIcon icon={channel.icon} size="lg" color="brand" theme="dark" className="hidden md:flex" />

                            <h3 className="text-primary_on-brand mt-4 text-lg font-semibold md:mt-5">{channel.title}</h3>
                            <p className="text-md text-tertiary_on-brand mt-1">{channel.subtitle}</p>
                            <Button href={channel.href} color="link-gray" size="lg" className="text-primary_on-brand mt-4 whitespace-pre md:mt-5">
                                {channel.cta}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
