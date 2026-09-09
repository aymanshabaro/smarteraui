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

/** The channels-plus-map layout on the permanently branded section background. */
export const ContactIconsAndMap01Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-tertiary_on-brand md:text-md text-sm font-semibold">Contact us</span>
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">Get in touch</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Our friendly team would love to hear from you.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 items-start gap-12 md:mt-16 md:gap-16 lg:grid-cols-3">
                <ul className="col-span-1 grid w-full grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-1 lg:gap-y-12">
                    {channels.map((channel) => (
                        <li key={channel.title} className="flex items-start gap-4">
                            <FeaturedIcon icon={channel.icon} size="md" color="brand" theme="dark" className="flex md:hidden" />
                            <FeaturedIcon icon={channel.icon} size="lg" color="brand" theme="dark" className="hidden md:flex" />

                            <div className="lg:pt-2.5">
                                <h3 className="text-primary_on-brand text-lg font-semibold">{channel.title}</h3>
                                <p className="text-md text-tertiary_on-brand mt-1">{channel.subtitle}</p>
                                <Button href={channel.href} color="link-gray" size="lg" className="text-primary_on-brand mt-4 whitespace-pre lg:mt-5">
                                    {channel.cta}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>

                <iframe title="Our address" src="https://snazzymaps.com/embed/451894" className="col-span-2 h-60 w-full border-none lg:h-full" />
            </div>
        </div>
    </section>
);
