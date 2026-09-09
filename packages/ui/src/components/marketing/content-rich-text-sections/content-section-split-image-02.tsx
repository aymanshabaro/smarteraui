import { Button } from "@/components/base/buttons/button";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { sortCx } from "@/utils/cx";
import { AVATARS, IMAGES, LOGOS } from "@/utils/demo-assets";

const customer = AVATARS[9];

const styles = sortCx({
    /** The frosted caption that floats over the bottom of the portrait. */
    panel: "bg-primary/30 before:bg-alpha-white/30 relative flex flex-col gap-1.5 p-4 pb-5 backdrop-blur-[10px] before:absolute before:inset-x-0 before:top-0 before:h-px md:gap-2 md:p-6",
});

/** A case-study write-up beside a portrait with a frosted customer caption. */
export const ContentSectionSplitImage02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-12 px-4 md:gap-16 md:px-8 lg:grid-cols-2">
            <div className="flex flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Case study</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">How we helped {LOGOS[5].name}</h2>

                <div className="prose md:prose-lg mt-12">
                    <hr />
                    <p>
                        {LOGOS[5].name} ran a fifteen-person agency on three tools that disagreed with each other. Proposals lived in one, delivery in another,
                        and invoices in a spreadsheet nobody wanted to own.
                    </p>
                    <p>
                        We moved all three onto a single pipeline and rewrote the proposal template around the numbers the team actually reported on. Nothing
                        about their sales approach changed — only the amount of time between a yes and the first invoice.
                    </p>
                    <h3 className="text-display-xs! mb-4! font-semibold md:mt-8">Closing more clients</h3>
                    <p>
                        Six months in, their proposal-to-signature time had halved and their average engagement size had grown by a third, mostly because scope
                        was priced from real delivery data instead of memory.
                    </p>
                </div>

                <div className="mt-12 hidden gap-3 md:flex">
                    <Button size="xl" color="secondary">
                        Chat to us
                    </Button>
                    <Button size="xl">Read case study</Button>
                </div>
            </div>

            <div className="relative h-140 lg:h-160">
                <img src={IMAGES.square[0].src} className="size-full object-cover" alt="" />

                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/40 to-black/0 pt-16 md:pt-20 lg:pt-24">
                    <div className={styles.panel}>
                        <div className="flex flex-col-reverse justify-between gap-4 md:flex-row">
                            <p className="md:text-display-xs text-xl font-semibold whitespace-nowrap text-white">{customer.name}</p>
                            <RatingStars aria-hidden="true" className="gap-1" starClassName="text-fg-white" />
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <p className="text-md font-semibold text-white">PM, {LOGOS[5].name}</p>
                            <p className="text-sm font-medium text-white">Web Design Agency</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 md:hidden">
                <Button size="xl">Read case study</Button>
                <Button size="xl" color="secondary">
                    Chat to us
                </Button>
            </div>
        </div>
    </section>
);
