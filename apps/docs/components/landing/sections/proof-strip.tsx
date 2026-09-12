import { AXE_SUITES, AXE_VIOLATIONS, COMPOSABLE_VARIANTS, PUBLISHED_GROUPS, REGISTRY_ENTRIES } from "~/components/landing/stats";

/**
 * Landing section "proof" (brief Priority 2): a compact, verified proof strip directly below the
 * hero. Deliberately thin and subordinate; the deeper technical proof lives later in the "trust"
 * section. Every number comes from `stats.ts`, never a literal.
 */
const CELLS: Array<{ value: number; label: string; qualifier?: string }> = [
    { value: REGISTRY_ENTRIES, label: "Searchable registry entries" },
    { value: PUBLISHED_GROUPS, label: "Published component groups" },
    { value: COMPOSABLE_VARIANTS, label: "Composable variants" },
    { value: AXE_SUITES, label: "Automated axe suites" },
    {
        value: AXE_VIOLATIONS,
        label: "Detected axe violations",
        qualifier: "in the markup those suites render; not a guarantee against every accessibility issue",
    },
];

export function ProofStrip() {
    return (
        <section className="proof" id="proof" aria-labelledby="proof-title">
            <h2 id="proof-title" className="visually-hidden">
                Proper UI by the numbers
            </h2>
            <div className="proof-grid container">
                {CELLS.map((cell) => (
                    <div className="proof-cell" key={cell.label}>
                        <strong>{cell.value}</strong>
                        <span>{cell.label}</span>
                        {cell.qualifier ? <small>{cell.qualifier}</small> : null}
                    </div>
                ))}
            </div>
        </section>
    );
}
