"use client";

import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";
import { countries } from "@/utils/countries";
import { IMAGES } from "@/utils/demo-assets";

const countryCodeOptions = countries.map((country) => ({ value: country.code, label: country.code }));

const services = [
    { name: "design", label: "Website design" },
    { name: "content", label: "Content creation" },
    { name: "ux", label: "UX design" },
    { name: "consulting", label: "Strategy & consulting" },
    { name: "research", label: "User research" },
    { name: "other", label: "Other" },
];

/** Services-aware contact form on the start edge and a full-height photo on the end edge. */
export const ContactSimpleForm03 = () => (
    <section className="bg-primary grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full px-4 py-16 md:px-8 md:py-24">
            <div className="mx-auto md:max-w-120">
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Let&apos;s level up your brand, together</h2>
                <p className="text-tertiary mt-4 text-lg whitespace-pre-line md:mt-5 md:text-xl">
                    You can reach us anytime via{" "}
                    <Button href="mailto:hi@smartera.com" color="link-color" size="xl" className="text-lg font-medium md:text-xl">
                        hi@smartera.com
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
                    </div>

                    <Button type="submit" size="xl">
                        Get started
                    </Button>
                </Form>
            </div>
        </div>

        <div className="relative max-lg:hidden">
            <img src={IMAGES.landscape[3].src} alt="An artist working in her studio" className="absolute inset-0 h-full max-w-full object-cover" />
        </div>
    </section>
);
