"use client";

import { Mail01, MarkerPin01, MessageSmileCircle, Phone } from "@properui/icons";
import { Button } from "../../base/buttons/button";
import { Checkbox } from "../../base/checkbox/checkbox";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { TextArea } from "../../base/textarea/textarea";

const channels = [
    { icon: Mail01, title: "Email", subtitle: "Our friendly team is here to help.", cta: "hi@proper.example", href: "mailto:hi@proper.example" },
    { icon: MessageSmileCircle, title: "Live chat", subtitle: "Our friendly team is here to help.", cta: "Start new chat", href: "#" },
    {
        icon: MarkerPin01,
        title: "Office",
        subtitle: "Come say hello at our office HQ.",
        cta: "100 Smith Street\nCollingwood VIC 3066 AU",
        href: "https://maps.google.com/?q=100+Smith+Street+Collingwood+VIC+3066",
    },
    { icon: Phone, title: "Phone", subtitle: "Mon-Fri from 8am to 5pm.", cta: "+1 (555) 000-0000", href: "tel:+15550000000" },
];

/** A two-by-two grid of contact channels beside a boxed contact form. */
export const ContactIconsAndForm = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-xl flex-col sm:mx-auto lg:mx-0 lg:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Contact us</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Chat to our friendly team</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    We&apos;d love to hear from you. Please fill out this form or shoot us an email.
                </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-xl grid-cols-1 items-start gap-12 md:mt-16 md:gap-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <ul className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-12">
                    {channels.map((channel) => (
                        <li key={channel.title} className="flex max-w-sm flex-col items-start">
                            <channel.icon aria-hidden="true" className="text-icon-fg-brand size-6" />
                            <h3 className="text-primary mt-3 text-lg font-semibold md:mt-4 md:text-xl">{channel.title}</h3>
                            <p className="text-md text-tertiary mt-1 md:mt-2">{channel.subtitle}</p>
                            <Button href={channel.href} color="link-color" size="lg" className="mt-3 whitespace-pre md:mt-4">
                                {channel.cta}
                            </Button>
                        </li>
                    ))}
                </ul>

                <Form className="sm:bg-secondary flex flex-col gap-8 rounded-2xl sm:px-8 sm:py-10">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-x-8 gap-y-6 sm:flex-row">
                            <Input isRequired size="lg" name="firstName" label="First name" placeholder="First name" wrapperClassName="flex-1" />
                            <Input isRequired size="lg" name="lastName" label="Last name" placeholder="Last name" wrapperClassName="flex-1" />
                        </div>

                        <Input isRequired size="lg" type="email" name="email" label="Email" placeholder="you@company.com" />

                        <TextArea isRequired rows={5} name="message" label="Message" placeholder="Leave us a message..." />

                        <Checkbox
                            size="md"
                            name="privacy"
                            hint={
                                <span>
                                    You agree to our friendly{" "}
                                    <a
                                        href="/privacy"
                                        className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        privacy policy.
                                    </a>
                                </span>
                            }
                        />
                    </div>

                    <Button type="submit" size="xl">
                        Send message
                    </Button>
                </Form>
            </div>
        </div>
    </section>
);
