import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

/** A left-aligned CTA paired with a wrapping row of customer logos. */
export const CtaSimpleLogos02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col">
                    <div className="max-w-3xl">
                        <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Join over 4,000+ startups growing with Proper</h2>
                        <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Start your 30-day free trial today.</p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 self-stretch sm:flex-row sm:self-start md:mt-12 lg:flex-row-reverse">
                        <Button size="xl">Get started</Button>
                        <Button size="xl" color="secondary">
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
                            // `dark:invert` is a documented asset swap: the placeholder wordmarks ship as a single
                            // mono set instead of the reference's paired colour/white files.
                            className={cx("h-9 md:h-10 dark:invert", index > 3 && "max-md:hidden")}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
