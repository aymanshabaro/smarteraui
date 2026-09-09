import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    band: "bg-secondary pt-16 pb-28 md:pt-24 md:pb-40",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    heading: "mx-auto flex w-full max-w-3xl flex-col items-center text-center",
});

/** A centered heading on a tinted band with a wide screenshot pulled up over the band's lower edge. */
export const FeaturesLargeScreenMockup02 = () => (
    <section className="bg-primary pb-16 md:pb-0">
        <div className={styles.band}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Cutting-edge features for advanced analytics</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>
                </div>
            </div>
        </div>

        <div className="max-w-container mx-auto -mt-17 w-full px-4 pt-1 md:-mt-26 md:overflow-hidden md:px-8 md:pt-2">
            <div className="flex flex-col md:items-start">
                <div className="flex h-full w-full items-center justify-center md:max-h-105 md:w-full md:items-start lg:max-h-140">
                    <img
                        alt="Dashboard mockup showing application interface"
                        src={IMAGES.landscape[0].src}
                        className="ring-screen-mockup-border size-full rounded object-cover ring-4 md:rounded-xl md:ring-8"
                    />
                </div>
            </div>
        </div>
    </section>
);
