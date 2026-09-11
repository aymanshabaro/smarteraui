import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";

/** A rounded card that stacks the copy and the email capture in a single centered column. */
export const NewsletterCardVertical = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-secondary flex flex-col items-center rounded-2xl px-6 py-10 text-center lg:p-16">
                <h2 className="text-display-sm text-primary xl:text-display-md font-semibold">
                    Still thinking <br className="md:hidden" />
                    about it?
                </h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 lg:text-xl">Sign up for our newsletter and get 10% off your next purchase.</p>

                <Form className="mt-8 flex w-full flex-col gap-4 md:max-w-120 md:flex-row">
                    <Input
                        isRequired
                        size="lg"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        wrapperClassName="py-0.5 md:max-w-86.25"
                        hint={
                            <span>
                                Read about our {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                <a
                                    href="#"
                                    className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    privacy policy
                                </a>
                                .
                            </span>
                        }
                    />
                    <Button type="submit" size="xl">
                        Subscribe
                    </Button>
                </Form>
            </div>
        </div>
    </section>
);
