import { APPLICATION_GROUPS, AXE_SUITES, AXE_VIOLATIONS, BASE_COMPONENTS, MARKETING_SECTIONS, PAGE_EXAMPLES } from "~/components/landing/stats";

/** Supporting points from the improvement brief (Priority 8), verbatim. */
const POINTS = [
    "Installed source is inspectable and customizable.",
    "Developers are not tied to a hosted visual runtime.",
    "Components use TypeScript and semantic tokens.",
    "Interaction foundations use React Aria where documented.",
    "The repository and license are directly accessible.",
];

/** Landing section "open-source" (brief Priority 8): open-source and technical trust. */
export function Trust() {
    return (
        <section className="section trust" id="open-source" aria-labelledby="open-source-title">
            <div className="container">
                <div className="section-heading">
                    <span className="eyebrow">No catch</span>
                    <h2 id="open-source-title">Open source. Your code. No runtime lock-in.</h2>
                </div>

                <ul className="trust-points">
                    {POINTS.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>

                <div className="trust-actions">
                    <a className="button button-primary" href="https://github.com/properui/properui" target="_blank" rel="noreferrer">
                        View on GitHub
                    </a>
                    <a className="button button-secondary" href="/docs/registry-metadata">
                        Browse the registry
                    </a>
                    <a className="button button-secondary" href="/docs">
                        Read the documentation
                    </a>
                </div>
                <p className="trust-registry-note">
                    Or fetch the raw catalog directly: <code>GET /r/index.json</code>.
                </p>

                <div className="trust-stats" role="group" aria-label="Verified registry metrics">
                    <div className="trust-stat">
                        <strong>{BASE_COMPONENTS}</strong>
                        <span>Base components</span>
                    </div>
                    <div className="trust-stat">
                        <strong>{APPLICATION_GROUPS}</strong>
                        <span>Application groups</span>
                    </div>
                    <div className="trust-stat">
                        <strong>{MARKETING_SECTIONS}</strong>
                        <span>Marketing sections</span>
                    </div>
                    <div className="trust-stat">
                        <strong>{PAGE_EXAMPLES}</strong>
                        <span>Full-page examples</span>
                    </div>
                    <div className="trust-stat">
                        <strong>{AXE_SUITES}</strong>
                        <span>Automated axe suites</span>
                    </div>
                    <div className="trust-stat">
                        <strong>{AXE_VIOLATIONS}</strong>
                        <span>Detected axe violations</span>
                    </div>
                </div>
                <p className="trust-stats-note">Violations detected in the markup those suites render, not a guarantee against every accessibility issue.</p>
            </div>
        </section>
    );
}
