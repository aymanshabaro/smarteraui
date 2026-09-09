"use client";

import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";
import { countries } from "@/utils/countries";

const countryCodeOptions = countries.map((country) => ({ value: country.code, label: country.code }));

/** Contact form on the start edge, an embedded office map filling the end edge. */
export const ContactFormAndMap = () => (
    <section className="bg-primary grid grid-cols-1 overflow-hidden lg:grid-cols-2">
        <div className="self-center px-4 py-16 md:px-8 md:py-24">
            <div className="mx-auto w-full md:max-w-120">
                <h2 className="text-display-md text-primary md:text-display-lg font-semibold">Contact us</h2>
                <p className="text-tertiary mt-4 text-lg whitespace-pre-line md:mt-6 md:text-xl">Our friendly team would love to hear from you.</p>

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

        <iframe
            title="Our address"
            src="https://snazzymaps.com/embed/451871"
            className="outline-secondary_alt -my-px -me-px hidden h-240 w-full border-none outline-1 -outline-offset-1 lg:block"
        />
    </section>
);
