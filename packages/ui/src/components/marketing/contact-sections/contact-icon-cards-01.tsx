import { MarkerPin01, MessageChatCircle, MessageSmileCircle, Phone } from "@properui/icons";
import { Button } from "../../base/buttons/button";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";

const cards = [
    {
        icon: MessageChatCircle,
        title: "Chat to sales",
        subtitle: "Speak to our friendly team.",
        cta: "sales@proper.example",
        href: "mailto:sales@proper.example",
    },
    {
        icon: MessageSmileCircle,
        title: "Chat to support",
        subtitle: "We're here to help.",
        cta: "support@proper.example",
        href: "mailto:support@proper.example",
    },
    {
        icon: MarkerPin01,
        title: "Visit us",
        subtitle: "Visit our office HQ.",
        cta: "100 Smith Street\nCollingwood VIC 3066 AU",
        href: "https://maps.google.com/?q=100+Smith+Street+Collingwood+VIC+3066",
    },
    { icon: Phone, title: "Call us", subtitle: "Mon-Fri from 8am to 5pm.", cta: "+1 (555) 000-0000", href: "tel:+15550000000" },
];

/** Four contact cards on a tinted surface, each fronted by a solid featured icon. */
export const ContactIconCards01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Contact us</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">We&apos;d love to hear from you</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Our friendly team is always here to chat.</p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <li key={card.title} className="bg-secondary flex h-full flex-col items-start p-6">
                            <FeaturedIcon icon={card.icon} size="lg" color="brand" theme="dark" />

                            <h3 className="text-primary mt-12 text-lg font-semibold md:mt-16">{card.title}</h3>
                            <p className="text-md text-tertiary mt-1">{card.subtitle}</p>
                            <Button href={card.href} color="link-color" size="lg" className="mt-4 whitespace-pre md:mt-5">
                                {card.cta}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
