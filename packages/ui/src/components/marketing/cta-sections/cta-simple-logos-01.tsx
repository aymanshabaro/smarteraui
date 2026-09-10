import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

/** A left-aligned CTA with the actions pinned to the end edge and a logo row beneath. */
export const CtaSimpleLogos01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 items-start lg:grid-cols-[1fr_max-content] lg:gap-x-8">
                <div className="max-w-3xl">
                    <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Start your free trial</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Join over 4,000+ startups already growing with Proper UI.</p>
                </div>

                <div className="mt-8 flex flex-col-reverse justify-start gap-3 sm:flex-row lg:mt-0">
                    <Button size="xl" color="secondary">
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
