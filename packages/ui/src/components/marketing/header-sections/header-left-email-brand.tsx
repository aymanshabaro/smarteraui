"use client";

import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";

/**
 * The blog page header with its newsletter sign-up on a solid brand section; the
 * hint under the field switches to the on-brand tertiary token.
 */
export const HeaderLeftEmailBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Resources</span>
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg mt-3 font-semibold">Smartera blog</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl">
                    The latest industry news, technologies and resources from the Smartera team.
                </p>

                <Form className="mt-8 flex w-full flex-col gap-4 sm:mt-12 sm:max-w-120 sm:flex-row">
                    <Input
                        isRequired
                        size="lg"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        aria-label="Enter your email"
                        wrapperClassName="py-0.5"
                        hint={
                            <span className="text-tertiary_on-brand">
                                We care about your data in our{" "}
                                <a
                                    href="/privacy"
                                    className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    privacy policy
                                </a>
                                .
                            </span>
                        }
                    />
                    <Button type="submit" size="xl">
                        Get started
                    </Button>
                </Form>
            </div>
        </div>
    </section>
);
