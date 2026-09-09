import { cx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

// The reference row holds ten wordmarks; the placeholder set ships six, so it is cycled to keep the
// two-row density and the "last two are desktop only" rule intact.
const logos = [...LOGOS, ...LOGOS.slice(0, 4)];

/** A denser, two-row logo wall — the last two wordmarks only appear from the `md` breakpoint up. */
export const SocialProofFullWidthDual = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-8">
                <p className="text-md text-tertiary text-center font-medium">Join 4,000+ companies already growing</p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-y-6">
                    {logos.map((logo, index) => (
                        <img
                            key={`${logo.name}-${index}`}
                            src={logo.src}
                            alt={logo.name}
                            // `dark:invert` is a documented asset swap: the placeholder wordmarks ship as a single
                            // mono set instead of the reference's paired colour/white files.
                            className={cx("h-9 md:h-10 dark:invert", index >= logos.length - 2 && "max-md:hidden")}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
