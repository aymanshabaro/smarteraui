import { MarkerPin01, MessageChatCircle, Phone } from "@properui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { IMAGES } from "@/utils/demo-assets";

const cards = [
    {
        icon: MessageChatCircle,
        title: "Chat to sales",
        subtitle: "Speak to our friendly team.",
        cta: "sales@proper.example",
        href: "mailto:sales@proper.example",
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

/** A badge-led centered heading, a wide cover photo, then three contact cards. */
export const ContactIconCards03 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <Badge color="brand" size="lg" className="hidden md:flex">
                    Contact us
                </Badge>
                <Badge color="brand" size="md" className="md:hidden">
                    Contact us
                </Badge>
                <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold">We&apos;d love to hear from you</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Chat to our friendly team.</p>
            </div>

            <div className="mt-12 flex flex-col gap-12 md:mt-16 md:gap-24">
                <img src={IMAGES.landscape[1].src} alt="People discussing a topic" className="h-60 w-full object-cover md:h-100 lg:h-140" />

                <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
