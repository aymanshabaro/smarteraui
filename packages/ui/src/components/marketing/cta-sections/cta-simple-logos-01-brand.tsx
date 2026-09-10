import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

/** The logo-backed CTA on the permanently branded section background. */
export const CtaSimpleLogos01Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 items-start lg:grid-cols-[1fr_max-content] lg:gap-x-8">
                <div className="max-w-3xl">
                    <h2 className="text-display-sm text-primary_on-brand md:text-display-md font-semibold">Start your 30-day free trial</h2>
                    <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Join over 4,000+ startups already growing with Proper.</p>
                </div>

                <div className="mt-8 flex flex-col-reverse justify-start gap-3 sm:flex-row lg:mt-0">
                    <Button size="xl" color="secondary" className="shadow-xs! ring-0">
                        Learn more
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>

                <div className="mt-12 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-4 md:justify-start">
                    {LOGOS.map((logo, index) => (
                        <img
                            key={logo.name}
                            src={logo.src}
                            alt={logo.name}
                            // The section background is always dark, so the mono placeholder wordmarks are inverted
                            // unconditionally — this stands in for the reference's separate white logo files.
                            className={cx("h-9 opacity-85 invert md:h-10", index > 3 && "max-md:hidden")}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
