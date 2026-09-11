import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";

/** A left-aligned headline with the email capture pushed to the end of the row on large screens. */
export const NewsletterSimpleLeft = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto flex w-full flex-col items-start justify-between gap-8 px-4 md:px-8 lg:flex-row">
            <div>
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Sign up for our newsletter</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Be the first to know about releases and industry news and insights.</p>
            </div>

            <Form className="flex w-full flex-col gap-4 md:max-w-120 md:flex-row">
                <Input
                    isRequired
                    size="lg"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    wrapperClassName="py-0.5 md:max-w-86.25"
                    hint={
                        <span>
                            We care about your data in our {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
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
    </section>
);
