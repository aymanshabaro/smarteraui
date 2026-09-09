import { Button } from "@/components/base/buttons/button";
import { IMAGES } from "@/utils/demo-assets";

/** A heading row with a call to action, then a rich-text column beside a wide image. */
export const ContentSectionSplitImage01 = () => (
    <section className="bg-primary flex flex-col gap-12 py-16 md:gap-16 md:py-24">
        <div className="max-w-container mx-auto flex w-full flex-col items-stretch justify-between gap-8 px-4 md:flex-row md:items-start md:px-8">
            <div className="flex max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Why we&apos;re different</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">
                    We bring honesty and transparency to financial services technology
                </h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Every fee, every hold and every settlement window is written down before you sign anything.
                </p>
            </div>

            <Button size="xl">Get started</Button>
        </div>

        <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
            <div className="prose md:prose-lg">
                <p>
                    Financial infrastructure is sold on trust and priced in footnotes. We decided early that we would rather lose a deal than win one on terms
                    the customer did not fully understand.
                </p>

                <h2>Why we&apos;re better</h2>

                <p>
                    Pricing is a single page. Settlement times are published per corridor and per currency, updated monthly, and we show the historical
                    distribution rather than the best case. When a payout is late, the dashboard says so before support does.
                </p>
                <p>
                    That transparency changes what our customers can promise their own users. Instead of hedging with &ldquo;within a few business days&rdquo;,
                    they can quote a real number and be right almost all of the time.
                </p>
            </div>

            <img className="h-60 w-full object-cover md:h-140" alt="" src={IMAGES.landscape[0].src} />
        </div>
    </section>
);
