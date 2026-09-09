const metrics = [
    { value: "400+", label: "Projects completed" },
    { value: "600%", label: "Return on investment" },
    { value: "10k", label: "Global downloads" },
];

/** Centered heading above a rounded gray metric card that becomes a full-width panel from `md` up. */
export const MetricsCardGrayLight = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="bg-secondary flex flex-col gap-8 rounded-2xl px-6 py-10 md:gap-16 md:rounded-none md:bg-transparent md:p-0">
                <div className="flex w-full flex-col self-center text-center md:max-w-3xl">
                    <h2 className="text-display-sm text-primary md:text-display-md font-semibold">Great products, faster than ever</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Everything you need to build modern UI and great products.</p>
                </div>

                <dl className="bg-secondary flex flex-col gap-8 rounded-2xl md:flex-row md:p-16">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="flex flex-1 flex-col-reverse gap-3 text-center">
                            <dt className="text-primary text-lg font-semibold">{metric.label}</dt>
                            <dd className="text-display-lg text-brand-tertiary_alt md:text-display-xl font-semibold">{metric.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    </section>
);
