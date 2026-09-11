"use client";

import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";

/**
 * The brand-background twin of `HeaderSpaceBetweenEmail`: the same blog header and
 * newsletter form on `bg-brand-section`, with the hint recoloured for the brand surface.
 */
export const HeaderSpaceBetweenEmailBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="text-secondary_on-brand md:text-md mb-3 text-sm font-semibold">Resources</div>

            <div className="grid grid-cols-[minmax(auto,768px)] gap-x-16 lg:grid-cols-[1fr_480px]">
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg font-semibold">Proper UI blog</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0">
                    The latest industry news, technologies and resources from the Proper UI team.
                </p>

                <Form className="mt-8 flex w-full max-w-120 flex-col gap-4 sm:mt-8 sm:flex-row">
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
