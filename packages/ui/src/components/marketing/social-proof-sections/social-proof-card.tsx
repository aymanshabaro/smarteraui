import { cx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

/** The logo row inside a rounded, secondary-surface card that bleeds to the edges on mobile. */
export const SocialProofCard = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto md:px-8">
            <div className="bg-secondary flex flex-col gap-8 px-6 py-12 md:rounded-2xl md:p-16">
                <p className="text-md text-tertiary text-center font-medium md:text-xl">Trusted by 4,000+ companies</p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 xl:gap-x-8">
                    {LOGOS.map((logo, index) => (
                        <img
                            key={logo.name}
                            src={logo.src}
                            alt={logo.name}
                            // `dark:invert` is a documented asset swap: the placeholder wordmarks ship as a single
                            // mono set instead of the reference's paired colour/white files.
                            className={cx("h-9 md:h-10 dark:invert", index === LOGOS.length - 1 && "md:hidden")}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
);
