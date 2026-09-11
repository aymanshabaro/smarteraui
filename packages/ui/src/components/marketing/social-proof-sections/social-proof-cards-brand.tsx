import { sortCx } from "../../../utils/cx";
import { LOGOS } from "../../../utils/demo-assets";

// The reference grid holds eight logo tiles; the placeholder set ships six, so it is cycled to fill
// the two rows of four that the `md` grid lays out.
const logos = [...LOGOS, ...LOGOS.slice(0, 2)];

const styles = sortCx({
    // On mobile the tiles are a fixed-width wrapping deck that is clipped by the section; from `md`
    // up they become a four-column grid. The last tile only joins in at `md`.
    grid: "flex w-max max-w-[855px] flex-wrap justify-center gap-3 self-center md:grid md:w-full md:max-w-none md:grid-cols-4 md:justify-normal md:gap-4 md:self-auto",
    card: "bg-brand-section_subtle flex h-28 w-50 items-center justify-center rounded-xl px-6 py-10 last:hidden md:h-42 md:w-auto md:px-8 md:py-16 md:last:flex",
    // The section background is always dark, so the mono placeholder wordmarks are inverted
    // unconditionally — this stands in for the reference's separate white logo files.
    logo: "h-8 opacity-85 invert md:h-10",
});

/** The logo tile grid on the brand-colored section, with each tile on the subtler brand surface. */
export const SocialProofCardsBrand = () => (
    <section className="bg-brand-section overflow-hidden py-16 md:py-24">
        <div className="max-w-container mx-auto px-0 md:px-8">
            <div className="flex flex-col gap-8 lg:gap-10">
                <p className="text-md text-tertiary_on-brand text-center font-medium">Trusted by 4,000+ companies</p>

                <div className={styles.grid}>
                    {logos.map((logo, index) => (
                        <div key={`${logo.name}-${index}`} className={styles.card}>
                            <img src={logo.src} alt={logo.name} className={styles.logo} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
