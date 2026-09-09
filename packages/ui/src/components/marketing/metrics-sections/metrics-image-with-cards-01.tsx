import { Badge } from "@/components/base/badges/badges";
import { IMAGES } from "@/utils/demo-assets";

const metrics = [
    { value: "400+", label: "Projects completed", description: "We've helped build over 400 projects with great companies." },
    { value: "600%", label: "Return on investment", description: "We've helped build over 400 projects with great companies." },
    { value: "10k", label: "Global downloads", description: "Our free UI kit has been downloaded over 10k times." },
];

/** Centered intro above frosted metric cards laid over a full-bleed photo. */
export const MetricsImageWithCards01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 md:gap-16">
                <div className="flex w-full flex-col items-center text-center md:max-w-3xl md:self-center">
                    <Badge size="lg" color="brand" className="max-md:hidden">
                        Launch faster
                    </Badge>
                    <Badge size="md" color="brand" className="inline-block md:hidden">
                        Launch faster
                    </Badge>

                    <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold">Build something great</h2>
                    <p className="text-tertiary mt-4 hidden text-lg md:mt-5 md:block md:text-xl">Everything you need to build modern UI and great products.</p>
                    <p className="text-tertiary mt-4 block text-lg md:mt-5 md:hidden md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>
                </div>

                <div className="relative">
                    <img src={IMAGES.landscape[3].src} alt="" className="absolute inset-0 size-full object-cover" />

                    <dl className="relative grid grid-cols-1 gap-8 px-6 py-8 md:grid-cols-2 md:p-16 lg:grid-cols-3">
                        {metrics.map((metric) => (
                            <div
                                key={metric.label}
                                className="bg-alpha-white/30 ring-alpha-white/30 rounded-2xl p-6 text-center ring-1 backdrop-blur-xl ring-inset"
                            >
                                <dd className="text-display-lg md:text-display-xl font-semibold text-white">{metric.value}</dd>
                                <dt className="mt-3 flex flex-col gap-1">
                                    <span className="text-lg font-semibold text-white">{metric.label}</span>
                                    <span className="text-md text-white">{metric.description}</span>
                                </dt>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    </section>
);
