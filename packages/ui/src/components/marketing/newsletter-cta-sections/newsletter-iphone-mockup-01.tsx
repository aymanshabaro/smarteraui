import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { IPhoneMockup } from "@/components/shared-assets/mockups/iphone-mockup";
import { IMAGES } from "@/utils/demo-assets";

/** Pre-launch newsletter capture with a phone mockup floating over a soft decorative ellipse. */
export const NewsletterIphoneMockup01 = () => (
    <section className="bg-primary overflow-hidden pt-16 md:py-24">
        <div className="max-w-container relative mx-auto grid w-full grid-cols-1 gap-16 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
            <div className="z-20 flex flex-col items-start md:max-w-xl md:pr-18">
                <h2 className="text-display-sm text-primary md:text-display-md lg:text-display-lg font-semibold">Be the first to know when we launch</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                    We&apos;re still building. Subscribe for updates and 20% off when we launch. <span className="max-md:hidden">No spam, we promise!</span>
                </p>

                <Form className="mt-8 flex w-full flex-col gap-4 md:mt-12 md:max-w-120 md:flex-row">
                    <Input
                        isRequired
                        size="lg"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        wrapperClassName="py-0.5 md:max-w-86.25"
                        hint={
                            <span>
                                We care about your data in our{" "}
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

            <div className="relative min-h-90 md:min-h-100 md:w-full">
                {/* Decorative halo behind the device. */}
                <div aria-hidden="true" className="bg-secondary absolute -bottom-24 left-1/2 h-104 w-133 -translate-x-1/2 rounded-full" />

                <IPhoneMockup
                    image={IMAGES.square[0].src}
                    className="md:drop-shadow-iphone-mockup absolute top-0 right-1/2 w-full max-w-71 translate-x-1/2 md:max-w-78.5"
                />
            </div>
        </div>
    </section>
);
