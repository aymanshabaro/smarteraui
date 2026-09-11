import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";

/** A rounded card that lays the copy and the email capture out side by side on large screens. */
export const NewsletterCardHorizontal = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-secondary flex flex-col items-start justify-between gap-x-16 gap-y-8 rounded-2xl px-6 py-10 lg:flex-row lg:p-16">
                <div className="flex max-w-3xl flex-col">
                    <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Join 2,000+ subscribers</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 lg:text-xl">Stay in the loop with everything you need to know.</p>
                </div>

                <Form className="flex w-full flex-col gap-4 md:max-w-120 md:flex-row">
                    <Input
                        isRequired
                        size="lg"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        wrapperClassName="flex-1 py-0.5 md:max-w-86.25"
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
