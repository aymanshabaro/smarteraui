"use client";

import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";

/**
 * Blog page header: eyebrow above a headline/paragraph pair that splits into a
 * `1fr 480px` grid from `lg` up, with the newsletter sign-up filling the second column.
 */
export const HeaderSpaceBetweenEmail = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="text-brand-secondary md:text-md mb-3 text-sm font-semibold">Resources</div>

            <div className="grid grid-cols-[minmax(auto,768px)] gap-x-16 lg:grid-cols-[1fr_480px]">
                <h1 className="text-display-md text-primary md:text-display-lg font-semibold">Proper UI blog</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0">
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
                            <span>
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
