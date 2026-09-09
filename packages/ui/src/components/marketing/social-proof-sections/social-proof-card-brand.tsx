import { cx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

/** The card layout with the logo row sitting on a brand-colored panel. */
export const SocialProofCardBrand = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto md:px-8">
            <div className="bg-brand-section flex flex-col gap-8 px-6 py-12 md:rounded-2xl md:p-16">
                <p className="text-md text-tertiary_on-brand text-center font-medium md:text-xl">Trusted by 4,000+ companies</p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 xl:gap-x-8">
                    {LOGOS.map((logo, index) => (
                        <img
                            key={logo.name}
                            src={logo.src}
                            alt={logo.name}
                            // The panel background is always dark, so the mono placeholder wordmarks are inverted
                            // unconditionally — this stands in for the reference's separate white logo files.
                            className={cx("h-9 opacity-85 invert md:h-10", index === LOGOS.length - 1 && "md:hidden")}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
