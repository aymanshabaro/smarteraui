import { IMAGES } from "../../../utils/demo-assets";

const metrics = [
    { value: "400+", label: "Projects completed" },
    { value: "600%", label: "Return on investment" },
    { value: "10k", label: "Global downloads" },
    { value: "200+", label: "5-star reviews" },
];

/** A tall image on the start edge with a shorter mobile headline and a two-by-two metric grid beside it. */
export const MetricsSplitImage02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 gap-12 md:gap-8 lg:grid-cols-2">
                <div className="flex flex-col gap-12 md:gap-16 md:ps-8 lg:self-center">
                    <div className="flex flex-col md:hidden">
                        <p className="text-brand-secondary md:text-md text-sm font-semibold">Launch faster</p>
                        <h2 className="text-display-sm text-primary md:text-display-md xl:text-display-lg mt-3 font-semibold">Build something great</h2>
                        <p className="text-tertiary mt-4 text-lg md:mt-5 md:hidden md:text-xl">
                            Everything you need to build modern UI and great products. We&apos;ve done all the heavy lifting so you don&apos;t have to. The
                            perfect starting point for any project.
                        </p>
                    </div>

                    <div className="hidden flex-col md:flex">
                        <p className="text-brand-secondary md:text-md text-sm font-semibold">Build better, launch faster</p>
                        <h2 className="text-display-sm text-primary md:text-display-md xl:text-display-lg mt-3 font-semibold">
                            Build great products, faster than ever
                        </h2>
                    </div>

                    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-12">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="flex flex-1 flex-col-reverse gap-3">
                                <dt className="text-primary text-lg font-semibold">{metric.label}</dt>
                                <dd className="text-display-lg text-brand-tertiary_alt md:text-display-xl font-semibold">{metric.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <img
                    src={IMAGES.landscape[2].src}
                    alt="An abstract gradient of overlapping color bands"
                    className="h-70 w-full object-cover md:order-first md:-me-8 md:h-140"
                />
            </div>
        </div>
    </section>
);
