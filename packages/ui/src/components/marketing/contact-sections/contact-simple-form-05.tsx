"use client";

import { Link as AriaLink } from "react-aria-components";
import { MarkerPin01, MessageChatCircle, Phone } from "@properui/icons";
import { countries } from "../../../utils/countries";
import { Button } from "../../base/buttons/button";
import { Checkbox } from "../../base/checkbox/checkbox";
import { Form } from "../../base/form/form";
import { Input, InputBase } from "../../base/input/input";
import { InputGroup } from "../../base/input/input-group";
import { NativeSelect } from "../../base/select/select-native";
import { TextArea } from "../../base/textarea/textarea";
import { Dribbble, Facebook, LinkedIn, X, YouTube } from "../../foundations/social-icons";

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

const services = [
    { name: "design", label: "Website design" },
    { name: "content", label: "Content creation" },
    { name: "ux", label: "UX design" },
    { name: "consulting", label: "Strategy & consulting" },
    { name: "research", label: "User research" },
    { name: "other", label: "Other" },
];

/** Full-height layout: a branded contact sidebar beside a services enquiry form. */
export const ContactSimpleForm05 = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-[416px_1fr]">
        <div className="bg-brand-section hidden px-4 py-16 lg:block lg:p-12">
            <div className="mx-auto flex max-w-128 flex-col lg:h-full">
                <h2 className="text-display-sm text-primary_on-brand lg:text-display-xs font-semibold">Get in touch</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg">We&apos;d love to hear from you. Our friendly team is always here to chat.</p>

                <ul className="mt-8 grid grid-cols-1 gap-8">
                    {channels.map((channel) => (
                        <li key={channel.title} className="flex gap-4">
                            <channel.icon aria-hidden="true" className="text-primary_on-brand mt-0.5 size-5 md:size-6" />
                            <div className="flex flex-col items-start">
                                <h3 className="text-primary_on-brand text-lg font-semibold">{channel.title}</h3>
                                <p className="text-md text-tertiary_on-brand mt-1">{channel.subtitle}</p>
                                <Button href={channel.href} color="link-color" size="lg" className="text-primary_on-brand mt-4 whitespace-pre md:mt-5">
                                    {channel.cta}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>

                <ul className="mt-12 flex gap-8 lg:mt-auto">
                    {socials.map((social) => (
                        <li key={social.label}>
                            <AriaLink
                                href="#"
                                aria-label={social.label}
                                className="text-icon-fg-brand_on-brand outline-focus-ring rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <social.icon aria-hidden="true" />
                            </AriaLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="flex w-full px-4 py-16 md:items-center md:px-8 lg:py-24">
            <div className="mx-auto w-full md:max-w-120">
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Level up your brand</h2>
                <p className="text-tertiary mt-4 text-lg whitespace-pre-line md:mt-5 md:text-xl">
                    You can reach us anytime via{" "}
                    <Button href="mailto:hi@proper.example" color="link-color" size="xl" className="text-lg font-medium md:text-xl">
                        hi@proper.example
                    </Button>
                </p>

                <Form className="mt-12 flex flex-col gap-8">
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

                        <fieldset className="max-md:hidden">
                            <legend className="text-secondary text-sm font-medium">Services</legend>
                            <div className="mt-4 grid grid-cols-1 gap-x-16 gap-y-4 sm:grid-cols-2">
                                {services.map((service) => (
                                    <Checkbox key={service.name} size="md" name={service.name} label={service.label} />
                                ))}
                            </div>
                        </fieldset>

                        <Checkbox
                            size="md"
                            name="privacy"
                            className="lg:hidden"
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
                        <span className="hidden lg:inline">Get started</span>
                        <span className="lg:hidden">Send message</span>
                    </Button>
                </Form>
            </div>
        </div>
    </section>
);
