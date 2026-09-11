import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";

/** The stacked newsletter card on a permanently branded panel. */
export const NewsletterCardVerticalBrand = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-brand-section flex flex-col items-center rounded-2xl px-6 py-10 text-center lg:p-16">
                <h2 className="text-display-sm text-primary_on-brand xl:text-display-md font-semibold">
                    Still thinking <br className="md:hidden" />
                    about it?
                </h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 lg:text-xl">Sign up for our newsletter and get 10% off your next purchase.</p>

                <Form className="mt-8 flex w-full flex-col gap-4 md:max-w-120 md:flex-row">
                    <Input
                        isRequired
                        size="lg"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        wrapperClassName="py-0.5 md:max-w-86.25"
                        hint={
                            <span className="text-tertiary_on-brand">
                                <span className="md:hidden">Read about our</span>
                                <span className="max-md:hidden">We care about your data in our</span>{" "}
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
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
