import { COMPONENT_GROUPS, COMPOSABLE_VARIANTS, REGISTRY_ENTRIES, TEST_SUITES } from "./content";

/**
 * Metrics band.
 *
 * Copied from `marketing/metrics-sections/metrics-minimal-centered-text` — same `<dl>` grid,
 * rules and type scale — with the demo figures replaced by counts measured from the repo
 * (see `./content.ts` for how each one is derived).
 */

const metrics = [
    { value: String(REGISTRY_ENTRIES), label: "Registry entries an agent can fetch" },
    { value: String(COMPONENT_GROUPS), label: "Component groups" },
    { value: String(COMPOSABLE_VARIANTS), label: "Section and page variants to compose from" },
    { value: "0", label: `Detected axe violations in ${TEST_SUITES} automated suites` },
];

export const LandingMetrics = () => (
    <section aria-labelledby="by-the-numbers" className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <h2 id="by-the-numbers" className="sr-only">
                Smartera UI by the numbers
            </h2>
            <dl className="border-secondary grid gap-x-4 gap-y-8 md:grid-cols-2 md:border-y md:py-16 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-1 flex-col-reverse gap-3 text-center">
                        <dt className="text-primary text-lg font-semibold text-balance">{metric.label}</dt>
                        <dd className="text-display-lg text-primary md:text-display-xl font-semibold">{metric.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    </section>
);
