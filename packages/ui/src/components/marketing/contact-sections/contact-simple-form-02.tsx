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

/** A full-bleed portrait beside a boxed contact form. */
export const ContactSimpleForm02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                <div className="max-lg:hidden lg:h-192">
                    <img src={IMAGES.square[0].src} alt="A member of the Proper UI team" className="size-full object-cover" />
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-full md:max-w-120">
                        <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Contact us</h2>
                        <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Our friendly team would love to hear from you.</p>

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
            </div>
        </div>
    </section>
);
