import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { IMAGES } from "@/utils/demo-assets";

/** A rounded card whose screen mockup is nudged out of the bottom-end corner. */
export const NewsletterScreenMockup04 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-secondary grid grid-cols-1 overflow-hidden rounded-2xl md:rounded-3xl lg:grid-cols-2 lg:items-center">
                <div className="flex flex-1 flex-col px-6 pt-10 pb-12 sm:p-12 lg:p-16">
                    <h2 className="text-display-sm text-primary xl:text-display-md font-semibold">We&apos;ll send you a nice letter once per week</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 lg:text-xl">
                        No spam. Just the latest releases and tips, interesting articles, and exclusive interviews.
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

                <div className="h-52 w-full translate-x-6 translate-y-0 sm:h-90 sm:translate-x-12 sm:translate-y-12 md:h-120 lg:w-auto">
                    {/* Screen mockup bezel: outer frame, inner shadow ring, then the screen itself. */}
                    <div className="bg-primary ring-utility-neutral-300 w-max max-w-full rounded-[9.03px] p-[0.9px] shadow-lg ring-[0.56px] ring-inset md:rounded-[20.91px] md:p-0.5 md:ring-[1.26px] lg:max-w-3xl">
                        <div className="bg-primary shadow-modern-mockup-inner-md md:shadow-modern-mockup-inner-lg size-full rounded-[7.9px] p-0.5 md:rounded-[17.68px] md:p-1">
                            <div className="bg-utility-neutral-50 ring-utility-neutral-200 relative size-full overflow-hidden rounded-[6.77px] ring-[0.56px] md:rounded-[15.16px] md:ring-[1.26px]">
                                <img
                                    src={IMAGES.landscape[0].src}
                                    alt="Dashboard mockup showing the Proper UI application interface"
                                    className="size-full object-cover object-left-top"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
