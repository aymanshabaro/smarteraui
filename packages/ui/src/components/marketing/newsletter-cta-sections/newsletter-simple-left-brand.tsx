import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";

/** The left-aligned newsletter capture on the permanently branded section background. */
export const NewsletterSimpleLeftBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto flex w-full flex-col items-start justify-between gap-8 px-4 md:px-8 lg:flex-row">
            <div>
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md font-semibold">Sign up for our newsletter</h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Be the first to know about releases and industry news and insights.</p>
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
                        <span className="text-tertiary_on-brand">
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
