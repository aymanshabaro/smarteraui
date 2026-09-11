import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";

/** A centered newsletter capture above a wide desktop screen mockup that bleeds off the bottom edge. */
export const NewsletterScreenMockup03 = () => (
    <section className="bg-primary overflow-hidden py-16 md:pt-24 md:pb-0">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center">
                <h2 className="text-display-sm text-primary md:text-display-md max-w-3xl font-semibold">We&apos;ll send you a nice letter once per week</h2>
                <p className="text-tertiary mt-4 max-w-3xl text-lg md:mt-5 md:text-xl">
                    No spam. Just the latest releases and tips, interesting articles, and exclusive interviews with great people.
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
        </div>

        <div className="max-w-container mx-auto mt-16 w-full px-4 md:max-h-100 md:overflow-hidden md:px-8">
            {/* Screen mockup bezel: outer frame, inner shadow ring, then the screen itself. */}
            <div className="bg-primary ring-utility-neutral-300 size-full rounded-[9.03px] p-[0.9px] shadow-lg ring-[0.56px] ring-inset md:rounded-[32px] md:p-1 md:ring-[2px]">
                <div className="bg-primary shadow-modern-mockup-inner-md md:shadow-modern-mockup-inner-lg size-full rounded-[7.9px] p-0.5 md:rounded-[28px] md:p-[5.4px]">
                    <div className="bg-utility-neutral-50 ring-utility-neutral-200 relative size-full overflow-hidden rounded-[6.77px] ring-[0.56px] md:rounded-[24px] md:ring-[2px]">
                        <img
                            src={IMAGES.landscape[0].src}
                            alt="Dashboard mockup showing the Proper UI application interface"
                            className="size-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
