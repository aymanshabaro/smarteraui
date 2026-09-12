import { WorkflowAnimation } from "~/components/landing/animations/workflow-animation";
import { CopyButton } from "~/components/landing/copy-button";

/** The five-step workflow from the improvement brief (Priority 6), verbatim titles and one-line descriptions. */
const STEPS: Array<{ title: string; body: string }> = [
    { title: "Set up once", body: "Proper UI installs a durable skill or project rule for the selected agent." },
    { title: "Prompt normally", body: "The developer describes the desired interface without memorizing APIs." },
    { title: "Search the registry", body: "The agent finds real primitives, compositions and full-page examples." },
    { title: "Install real source", body: "The CLI resolves dependencies and writes inspectable component source into the project." },
    { title: "Keep the system intact", body: "Future work reuses the same tokens, components and accessibility patterns." },
];

/**
 * Verified against the real CLI: `node packages/cli/dist/index.js search "pricing page"
 * --registry packages/registry/dist` returns `pricing-page-03` as a real entry, and
 * `node packages/cli/dist/index.js info --json --registry packages/registry/dist` accepts
 * `info --json` exactly as shown. `@latest` matches every other command shown on this site
 * (see apps/docs/content/docs/cli.mdx).
 */
const COMMAND_LINES = [
    "npx @properui/cli@latest info --json",
    'npx @properui/cli@latest search "pricing page"',
    "npx @properui/cli@latest add pricing-page-03",
];

/**
 * A representative slice of the real `pricing-page-03.json` registry entry (see
 * `packages/registry/dist/pricing-page-03.json`), real field names only, file `content`
 * elided as a comment. The `description` field is intentionally omitted (it contains an em
 * dash the owner does not want on the page).
 */
const REGISTRY_SAMPLE = `{
    "name": "pricing-page-03",
    "layer": "marketing-examples",
    "type": "example",
    "title": "Pricing page 03",
    "files": [
        {
            "path": "components/marketing-examples/pricing-pages/pricing-page-03.tsx"
            // content: (elided)
        }
    ],
    "registryDependencies": [
        "cta-sections",
        "cx",
        "faq-sections",
        "features-sections",
        "footers",
        "header-navigations",
        "pricing-sections"
    ],
    "optionalRegistryDependencies": [],
    "dependencies": [],
    "docs": "/marketing/pricing-pages/pricing-page-03",
    "token_contract": [
        "bg-brand-section",
        "bg-primary",
        "bg-secondary",
        "text-fg-brand-secondary_alt",
        "text-secondary_on-brand"
    ]
}`;

/** Landing section "workflow" (brief Priority 6): the technical, five-step agent workflow. */
export function Workflow() {
    return (
        <section className="section workflow" id="workflow" aria-labelledby="workflow-title">
            <div className="container">
                <div className="section-heading">
                    <span className="eyebrow">How it works</span>
                    <h2 id="workflow-title">Your agent inspects the system before it writes.</h2>
                    <p>Nothing about how you prompt changes. What changes is what your agent reaches for while it works.</p>
                </div>

                <ol className="workflow-steps">
                    {STEPS.map((step, index) => (
                        <li className="workflow-step" key={step.title}>
                            <span className="workflow-step-no" aria-hidden="true">
                                {index + 1}
                            </span>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                        </li>
                    ))}
                </ol>

                <WorkflowAnimation />

                <div className="workflow-example">
                    <div className="workflow-example-head">
                        <span className="workflow-example-label">A real session</span>
                        <CopyButton className="workflow-copy" value={COMMAND_LINES.join("\n")} successLabel="Copied">
                            Copy
                        </CopyButton>
                    </div>
                    <pre className="workflow-code">
                        <code>{COMMAND_LINES.join("\n")}</code>
                    </pre>
                    <p className="workflow-example-caption">
                        <code>search</code> finds the real entry, then <code>add</code> installs its source and dependencies into the project.
                    </p>

                    <div className="workflow-registry">
                        <span className="workflow-registry-label">
                            What <code>search</code> and <code>add</code> resolve underneath: a slice of the real <code>pricing-page-03</code> registry entry
                        </span>
                        <pre className="workflow-code">
                            <code>{REGISTRY_SAMPLE}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}
