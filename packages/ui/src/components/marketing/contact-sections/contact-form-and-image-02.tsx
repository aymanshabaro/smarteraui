"use client";

import { countries } from "../../../utils/countries";
import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { Checkbox } from "../../base/checkbox/checkbox";
import { Form } from "../../base/form/form";
import { Input, InputBase } from "../../base/input/input";
import { InputGroup } from "../../base/input/input-group";
import { NativeSelect } from "../../base/select/select-native";
import { TextArea } from "../../base/textarea/textarea";

const countryCodeOptions = countries.map((country) => ({ value: country.code, label: country.code }));

const services = [
    { name: "design", label: "Website design" },
    { name: "content", label: "Content creation" },
    { name: "ux", label: "UX design" },
    { name: "consulting", label: "Strategy & consulting" },
    { name: "research", label: "User research" },
    { name: "other", label: "Other" },
];

/** A cover image on the start edge and a services-aware contact form on the end edge. */
export const ContactFormAndImage02 = () => (
    <section className="bg-primary grid grid-cols-1 lg:grid-cols-2">
        <div className="relative max-lg:hidden">
            <img src={IMAGES.landscape[0].src} alt="The Proper UI team at work" className="absolute inset-0 h-full max-w-full object-cover" />
        </div>

        <div className="w-full px-4 py-16 md:px-8 md:py-24">
            <div className="mx-auto w-full md:max-w-120">
                <h2 className="text-display-md text-primary md:text-display-lg font-semibold">Let&apos;s level up your brand, together</h2>
                <p className="text-tertiary mt-4 text-lg whitespace-pre-line md:mt-6 md:text-xl">
                    You can reach us anytime via{" "}
                    <Button href="mailto:hi@proper.example" color="link-color" size="xl" className="text-lg font-medium md:text-xl">
                        hi@proper.example
                    </Button>
                </p>

                <Form className="mt-12 flex flex-col gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-x-8 gap-y-6 md:flex-row">
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
                            <div className="mt-4 grid grid-cols-1 gap-x-16 gap-y-4 md:grid-cols-2">
                                {services.map((service) => (
                                    <Checkbox key={service.name} size="md" name={service.name} label={service.label} />
                                ))}
                            </div>
                        </fieldset>
                    </div>

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

                    <Button type="submit" size="xl">
                        <span className="hidden lg:inline">Get started</span>
                        <span className="lg:hidden">Send message</span>
                    </Button>
                </Form>
            </div>
        </div>
    </section>
);
