const metrics = [
    { value: "400+", label: "Projects completed" },
    { value: "600%", label: "Return on investment" },
    { value: "10k", label: "Global downloads" },
    { value: "200+", label: "5-star reviews" },
];

/** Four centered metrics on the page background, framed by horizontal rules from `md` up. */
export const MetricsMinimalCenteredText = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <dl className="border-secondary grid gap-x-4 gap-y-8 md:grid-cols-2 md:border-y md:py-16 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-1 flex-col-reverse gap-3 text-center">
                        <dt className="text-primary text-lg font-semibold">{metric.label}</dt>
                        <dd className="text-display-lg text-primary md:text-display-xl font-semibold">{metric.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    </section>
);
