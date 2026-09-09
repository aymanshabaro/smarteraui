const metrics = [
    { value: "400+", label: "Projects completed" },
    { value: "600%", label: "Return on investment" },
    { value: "10k", label: "Global downloads" },
];

/** The card layout on the brand background: the panel wraps the whole section on mobile, only the metrics from `md` up. */
export const MetricsCardBrandDark = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-brand-section flex flex-col gap-8 rounded-2xl px-6 py-10 md:gap-16 md:rounded-none md:bg-transparent md:p-0">
                <div className="flex w-full flex-col self-center text-center md:max-w-3xl">
                    <h2 className="text-display-sm text-primary_on-brand md:text-display-md md:text-primary font-semibold">Great products, faster than ever</h2>
                    <p className="text-tertiary_on-brand md:text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        Everything you need to build modern UI and great products.
                    </p>
                </div>

                <dl className="md:bg-brand-section flex flex-col gap-8 rounded-2xl md:flex-row md:p-16">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="flex flex-1 flex-col-reverse gap-3 text-center">
                            <dt className="text-tertiary_on-brand text-lg font-semibold">{metric.label}</dt>
                            <dd className="text-display-lg text-primary_on-brand md:text-display-xl font-semibold">{metric.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    </section>
);
