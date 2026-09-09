const metrics = [
    { value: "400+", label: "Projects completed" },
    { value: "600%", label: "Return on investment" },
    { value: "10k", label: "Global downloads" },
    { value: "200+", label: "5-star reviews" },
];

/** The minimal four-up metric row on the brand background. */
export const MetricsMinimalCenteredTextBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <dl className="border-brand grid gap-x-4 gap-y-8 md:grid-cols-2 md:border-y md:py-16 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-1 flex-col-reverse gap-3 text-center">
                        <dt className="text-tertiary_on-brand text-lg font-semibold">{metric.label}</dt>
                        <dd className="text-display-lg text-primary_on-brand md:text-display-xl font-semibold">{metric.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    </section>
);
