import { IMAGES } from "../../../utils/demo-assets";

const metrics = [
    { value: "400+", label: "Projects completed", description: "We've helped build over 400 amazing projects." },
    { value: "600%", label: "Return on investment", description: "Our customers have reported an average of ~600% ROI." },
    { value: "10k", label: "Global downloads", description: "Our free UI kit has been downloaded over 10k times." },
    { value: "200+", label: "5-star reviews", description: "We're proud of our 5-star rating with over 200 reviews." },
];

/** A full-width intro above a two-by-two metric grid paired with a tall image on the end edge. */
export const MetricsSplitImage01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 md:gap-16">
                <div className="flex w-full flex-col md:max-w-3xl">
                    <p className="text-brand-secondary md:text-md text-sm font-semibold">Launch faster</p>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Build something great</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        Everything you need to build modern UI and great products. We&apos;ve done all the heavy lifting so you don&apos;t have to—the perfect
                        starting point for any project.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 md:gap-8 lg:grid-cols-2">
                    <dl className="grid grid-cols-1 gap-8 self-center md:grid-cols-2 md:gap-y-16 md:pe-8">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="flex flex-1 flex-col-reverse gap-3 text-center">
                                <dt className="flex flex-col gap-1">
                                    <span className="text-primary text-lg font-semibold">{metric.label}</span>
                                    <span className="text-md text-tertiary">{metric.description}</span>
                                </dt>
                                <dd className="text-display-lg text-brand-tertiary_alt md:text-display-xl font-semibold">{metric.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <img src={IMAGES.landscape[1].src} alt="A designer reviewing work in a bright studio" className="h-70 w-full object-cover md:h-140" />
                </div>
            </div>
        </div>
    </section>
);
