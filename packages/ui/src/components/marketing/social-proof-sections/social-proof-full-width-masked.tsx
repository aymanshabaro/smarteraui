import { cx, sortCx } from "@/utils/cx";
import { LOGOS } from "@/utils/demo-assets";

// The reference marquee runs ten wordmarks per track; the placeholder set ships six, so it is cycled
// to keep the track long enough for a seamless loop.
const logos = [...LOGOS, ...LOGOS.slice(0, 4)];

const styles = sortCx({
    track: "animate-marquee flex w-auto max-w-none shrink-0 justify-center gap-5 pl-5 motion-reduce:animate-none md:gap-6 md:pl-6",
    // The second row scrolls the other way and is offset so the two rows never line up.
    trackReverse: "direction-reverse [animation-delay:-3s] motion-reduce:-translate-x-1/2",
    // `dark:invert` is a documented asset swap: the placeholder wordmarks ship as a single mono set
    // instead of the reference's paired colour/white files.
    logo: "h-8 opacity-85 md:h-10 dark:invert",
});

const LogoTrack = ({ isReverse, isDuplicate }: { isReverse?: boolean; isDuplicate?: boolean }) => (
    // The looping copies repeat the same wordmarks, so they are hidden from assistive tech.
    <div aria-hidden={isDuplicate || undefined} className={cx(styles.track, isReverse && styles.trackReverse)}>
        {logos.map((logo, index) => (
            <img key={`${logo.name}-${index}`} src={logo.src} alt={logo.name} className={styles.logo} />
        ))}
    </div>
);

/** An edge-masked logo marquee: one scrolling row, plus a second reversed row on mobile only. */
export const SocialProofFullWidthMasked = () => (
    <section className="bg-primary overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-8">
                <p className="text-md text-tertiary text-center font-medium">Trusted by 4,000+ companies</p>

                <div className="flex max-w-full flex-col items-center gap-y-4 mask-x-from-80%">
                    <div className="flex">
                        <LogoTrack />
                        <LogoTrack isDuplicate />
                    </div>

                    <div className="flex md:hidden">
                        <LogoTrack isReverse isDuplicate />
                        <LogoTrack isReverse isDuplicate />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
