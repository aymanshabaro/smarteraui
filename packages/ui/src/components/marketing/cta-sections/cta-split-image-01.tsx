import { Check } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { IMAGES } from "@/utils/demo-assets";

const benefits = ["30-day free trial", "Personalized onboarding", "Access to all features"];

/** Copy and a benefit checklist on the start edge, a full-bleed image on the end edge. */
export const CtaSplitImage01 = () => (
    <section className="bg-primary grid grid-cols-1 gap-y-12 py-16 lg:grid-cols-2 lg:items-center lg:py-0">
        <div className="flex w-full lg:justify-end lg:py-24">
            <div className="flex max-w-3xl flex-col items-start px-4 md:px-8 lg:max-w-(--breakpoint-sm)">
                <h2 className="text-display-sm text-primary md:text-display-md lg:text-display-lg font-semibold">Join 4,000+ startups growing with Smartera</h2>

                <ul className="mt-8 flex flex-col gap-4 md:gap-5 md:ps-4">
                    {benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-3">
                            <div className="bg-brand-primary text-featured-icon-light-fg-brand flex size-7 shrink-0 items-center justify-center rounded-full">
                                <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                            </div>
                            <span className="text-md text-tertiary pt-0.5 md:pt-0 md:text-lg">{benefit}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start md:mt-12">
                    <Button size="xl" color="secondary">
                        Learn more
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>
        </div>

        <div className="h-70 w-full md:h-95 lg:h-180">
            <img src={IMAGES.landscape[0].src} alt="Abstract shapes representing growth" className="size-full object-cover px-4 md:px-8 lg:px-0" />
        </div>
    </section>
);
