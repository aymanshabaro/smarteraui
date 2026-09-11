import { MarkerPin01, MessageChatCircle, Phone } from "@properui/icons";
import { Button } from "../../base/buttons/button";

const channels = [
    {
        icon: MessageChatCircle,
        title: "Chat to sales",
        subtitle: "Speak to our friendly team.",
        cta: "sales@proper.example",
        href: "mailto:sales@proper.example",
    },
    {
        icon: MessageChatCircle,
        title: "Chat to support",
        subtitle: "We're here to help.",
        cta: "support@proper.example",
        href: "mailto:support@proper.example",
    },
    {
        icon: MarkerPin01,
        title: "Visit us",
        subtitle: "Visit our office HQ.",
        cta: "100 Smith St, Collingwood VIC 3066 AU",
        href: "https://maps.google.com/?q=100+Smith+Street+Collingwood+VIC+3066",
    },
    { icon: Phone, title: "Call us", subtitle: "Mon-Fri from 8am to 5pm.", cta: "+1 (555) 000-0000", href: "tel:+15550000000" },
];

/** Heading on the start edge and a two-by-two grid of bare-icon contact cards on the end edge. */
export const ContactIconCards02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container m-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-3 md:gap-8 md:px-8">
            <div className="col-span-1 flex max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Contact us</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Get in touch</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Chat to our friendly team.</p>
            </div>

            <ul className="col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                {channels.map((channel) => (
                    <li key={channel.title} className="bg-secondary flex h-full flex-col items-start p-6">
                        <channel.icon className="text-icon-fg-brand size-6" aria-hidden="true" />

                        <h3 className="text-primary mt-8 text-lg font-semibold md:mt-12">{channel.title}</h3>
                        <p className="text-md text-tertiary mt-1">{channel.subtitle}</p>
                        <Button href={channel.href} color="link-color" size="lg" className="mt-4 whitespace-pre md:mt-5 md:whitespace-nowrap">
                            {channel.cta}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);
