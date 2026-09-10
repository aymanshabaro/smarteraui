import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

/** The two-column logo CTA on the permanently branded section background. */
export const CtaSimpleLogos02Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col">
                    <div className="max-w-3xl">
                        <h2 className="text-display-sm text-primary_on-brand md:text-display-md font-semibold">
                            Join over 4,000+ startups growing with Proper
                        </h2>
                        <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Start your 30-day free trial today.</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 self-stretch sm:flex-row sm:self-start md:mt-12 lg:flex-row-reverse">
                        <Button size="xl">Get started</Button>
                        <Button size="xl" color="secondary" className="shadow-xs! ring-0">
                            Learn more
                        </Button>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-y-6 lg:mt-0">
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
