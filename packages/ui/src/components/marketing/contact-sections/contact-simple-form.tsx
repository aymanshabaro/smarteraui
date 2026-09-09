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

const PrivacyConsent = () => (
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
);

/** Centered heading with a single-column contact form underneath. */
export const ContactSimpleForm = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Contact us</span>
                <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Get in touch</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">We&apos;d love to hear from you. Please fill out this form.</p>
            </div>

            <Form className="mx-auto mt-16 flex flex-col gap-8 md:mt-24 md:max-w-120">
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

                    <PrivacyConsent />
                </div>

                <Button type="submit" size="xl">
                    Send message
                </Button>
            </Form>
        </div>
    </section>
);
