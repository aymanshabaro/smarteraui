"use client";

import { MarkerPin01, MessageChatCircle, Phone } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";
import { Dribbble, Facebook, LinkedIn, X, YouTube } from "@/components/foundations/social-icons";
import { countries } from "@/utils/countries";

const countryCodeOptions = countries.map((country) => ({ value: country.code, label: country.code }));

const channels = [
    {
        icon: MessageChatCircle,
        title: "Chat to us",
        subtitle: "Our friendly team is here to help.",
        cta: "hi@proper.example",
        href: "mailto:hi@proper.example",
    },
    {
        icon: MarkerPin01,
        title: "Office",
        subtitle: "Come say hello at our office HQ.",
        cta: "100 Smith Street\nCollingwood VIC 3066 AU",
        href: "https://maps.google.com/?q=100+Smith+Street+Collingwood+VIC+3066",
    },
    { icon: Phone, title: "Phone", subtitle: "Mon-Fri from 8am to 5pm.", cta: "+1 (555) 000-0000", href: "tel:+15550000000" },
];

const socials = [
    { label: "Facebook", icon: Facebook },
    { label: "X", icon: X },
    { label: "LinkedIn", icon: LinkedIn },
    { label: "YouTube", icon: YouTube },
    { label: "Dribbble", icon: Dribbble },
];

const heading = (
    <>
        <h2 className="text-display-sm text-primary lg:text-display-xs font-semibold">Get in touch</h2>
        <p className="text-tertiary mt-4 text-lg">We&apos;d love to hear from you. Our friendly team is always here to chat.</p>
    </>
);

/** Full-height contact panel: channels and socials in a fixed sidebar, form filling the rest. */
export const ContactSimpleForm04 = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-[416px_1fr]">
        <div className="bg-secondary px-4 py-16 max-lg:hidden lg:p-12">
            <div className="mx-auto flex max-w-128 flex-col lg:h-full">
                {heading}

                <ul className="mt-8 grid grid-cols-1 gap-8">
                    {channels.map((channel) => (
                        <li key={channel.title} className="flex gap-4">
                            <channel.icon className="text-icon-fg-brand mt-0.5 size-5 md:size-6" aria-hidden="true" />

                            <div className="flex flex-col items-start">
                                <h3 className="text-primary text-lg font-semibold">{channel.title}</h3>
                                <p className="text-md text-tertiary mt-1">{channel.subtitle}</p>
                                <Button href={channel.href} color="link-color" size="lg" className="mt-4 whitespace-pre md:mt-5">
                                    {channel.cta}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>

                <ul className="mt-12 flex gap-8 lg:mt-auto">
                    {socials.map((social) => (
                        <li key={social.label}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                            <a
                                href="#"
                                aria-label={social.label}
                                className="text-fg-quaternary hover:text-fg-quaternary_hover outline-focus-ring rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <social.icon size={24} aria-hidden="true" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="flex w-full px-4 py-16 md:items-center md:px-8 lg:py-24">
            <div className="mx-auto w-full md:max-w-120">
                <div className="mb-12 lg:hidden">{heading}</div>

                <Form className="flex flex-col gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-x-8 gap-y-6 sm:flex-row">
                            <Input isRequired size="lg" name="firstName" label="First name" placeholder="First name" wrapperClassName="flex-1" />
                            <Input isRequired size="lg" name="lastName" label="Last name" placeholder="Last name" wrapperClassName="flex-1" />
                        </div>

                        <Input isRequired size="lg" type="email" name="email" label="Email" placeholder="you@company.com" />

                        <InputGroup
                            size="lg"
                            label="Phone number"
                            leadingAddon={<NativeSelect aria-label="Country code" defaultValue="US" options={countryCodeOptions} />}
                        >
                            <InputBase type="tel" name="phone" placeholder="+1 (000) 000-0000" />
                        </InputGroup>

                        <TextArea isRequired rows={5} name="message" label="Message" placeholder="Leave us a message..." />

                        <Checkbox
                            size="md"
                            name="privacy"
                            hint={
                                <span>
                                    You agree to our friendly{" "}
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                    <a
                                        href="#"
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
