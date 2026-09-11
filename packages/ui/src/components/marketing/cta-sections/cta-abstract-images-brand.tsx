import { cx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";

/**
 * The collage is a decorative mood board, so every tile is hidden from assistive tech
 * (`alt=""`). Each tile owns a fixed cell of the 12×12 grid via an arbitrary `grid-area`.
 */
const tiles = [
    { src: IMAGES.square[2].src, area: "[grid-area:3/3/7/7]" },
    { src: IMAGES.square[1].src, area: "[grid-area:1/7/7/11]" },
    { src: IMAGES.landscape[3].src, area: "[grid-area:7/5/13/9]" },
    { src: IMAGES.square[0].src, area: "[grid-area:7/9/10/13]" },
    { src: IMAGES.square[3].src, area: "[grid-area:7/1/10/5]" },
];

/** The photo-collage CTA on the permanently branded section background. */
export const CtaAbstractImagesBrand = () => (
    <section className="bg-brand-section py-16 lg:py-24">
        <div className="max-w-container mx-auto grid grid-cols-1 gap-16 overflow-hidden px-4 md:px-8 lg:grid-cols-2 lg:items-center">
            <div className="flex max-w-3xl flex-col items-start">
                <h2 className="text-display-sm text-primary_on-brand md:text-display-md lg:text-display-lg font-semibold">
                    No long-term contracts. No catches.
                </h2>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl">Start your 30-day free trial today.</p>

                <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start md:mt-12">
                    <Button size="xl" color="secondary" className="shadow-xs! ring-0">
                        Learn more
                    </Button>
                    <Button size="xl">Get started</Button>
                </div>
            </div>

            <div className="grid h-122 w-[150%] grid-cols-[repeat(12,1fr)] grid-rows-[repeat(12,1fr)] gap-2 justify-self-center sm:h-124 sm:w-[120%] md:w-auto md:gap-4">
                {tiles.map((tile) => (
                    <img key={tile.area} src={tile.src} alt="" className={cx("size-full object-cover", tile.area)} />
                ))}
            </div>
        </div>
    </section>
);
