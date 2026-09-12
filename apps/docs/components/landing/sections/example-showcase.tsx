"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import { ExampleFrame } from "~/components/landing/example-frame";

type ShowcaseExample = {
    id: string;
    label: string;
    prompt: string;
    /** Real registry entry names (verified against `packages/registry/dist/*.json`). */
    registry: string[];
    src: string;
    openHref: string;
    frameTitle: string;
};

const EXAMPLES: ShowcaseExample[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        prompt: "Build a responsive analytics dashboard with KPI cards, a revenue trend chart and a recent activity table using Proper UI.",
        registry: ["dashboard-04", "metrics", "charts", "table", "app-navigation"],
        src: "/preview/variant/app-examples/dashboards/dashboard-04",
        openHref: "/components/dashboards/dashboard-04",
        frameTitle: "Analytics dashboard example rendered with Proper UI",
    },
    {
        id: "pricing",
        label: "Pricing",
        prompt: "Build a polished SaaS pricing page with monthly and annual billing, a highlighted plan and an FAQ using Proper UI.",
        registry: ["pricing-page-03", "pricing-sections", "faq-sections", "header-navigations", "footers"],
        src: "/preview/variant/marketing-examples/pricing-pages/pricing-page-03",
        openHref: "/marketing/pricing-pages/pricing-page-03",
        frameTitle: "Pricing page example rendered with Proper UI",
    },
    {
        id: "settings",
        label: "Settings",
        prompt: "Build workspace settings with team management, member roles and a members table using Proper UI.",
        registry: ["settings-08", "app-navigation", "table", "button-group"],
        src: "/preview/variant/app-examples/settings-pages/settings-08",
        openHref: "/components/settings-pages/settings-08",
        frameTitle: "Team settings example rendered with Proper UI",
    },
    {
        id: "data-table",
        label: "Data table",
        // No CRM example exists in the registry (verified: no entry matches "checkout" or a lead/deal
        // pipeline). This is a dashboard whose main content is a sortable, filterable table instead.
        prompt: "Build a data table experience with session metrics, a search and filter bar, and a sortable table using Proper UI.",
        registry: ["dashboard-02", "table", "metrics", "badges"],
        src: "/preview/variant/app-examples/dashboards/dashboard-02",
        openHref: "/components/dashboards/dashboard-02",
        frameTitle: "Data table experience rendered with Proper UI",
    },
];

/**
 * Landing section "examples" (brief Priority 4): a hand-rolled accessible tabbed viewer (roving
 * tabindex, arrow/Home/End keys, `tablist`/`tab`/`tabpanel`) over four complete, real Proper UI
 * examples. No library — the brief asks for the ARIA tabs pattern directly and the interaction is
 * small enough to own outright. Only the active tab's `ExampleFrame` is ever mounted, so switching
 * tabs is the only thing that loads a new iframe.
 */
export function ExampleShowcase() {
    const [activeId, setActiveId] = useState(EXAMPLES[0]!.id);
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const activeIndex = EXAMPLES.findIndex((example) => example.id === activeId);
    const active = EXAMPLES[activeIndex]!;

    const selectByIndex = (index: number) => {
        const target = EXAMPLES[(index + EXAMPLES.length) % EXAMPLES.length]!;
        setActiveId(target.id);
        tabRefs.current[EXAMPLES.indexOf(target)]?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case "ArrowRight":
                event.preventDefault();
                selectByIndex(activeIndex + 1);
                break;
            case "ArrowLeft":
                event.preventDefault();
                selectByIndex(activeIndex - 1);
                break;
            case "Home":
                event.preventDefault();
                selectByIndex(0);
                break;
            case "End":
                event.preventDefault();
                selectByIndex(EXAMPLES.length - 1);
                break;
            default:
                break;
        }
    };

    return (
        <section className="section" id="examples" aria-labelledby="examples-title">
            <div className="container">
                <div className="section-heading">
                    <span className="eyebrow">What&apos;s already built</span>
                    <h2 id="examples-title">What your AI can build</h2>
                    <p>
                        Four real, complete Proper UI examples: the prompt behind each one, the registry entries it&apos;s built from, and the rendered result.
                    </p>
                </div>

                {/* `tabIndex={-1}`: the tablist itself is never a tab stop — focus lives on the active tab via roving tabindex — but eslint-plugin-jsx-a11y's interactive-supports-focus rule wants an explicit tabIndex on any element with an interactive role. */}
                <div className="showcase-tabs" role="tablist" aria-label="Example screens" tabIndex={-1} onKeyDown={onKeyDown}>
                    {EXAMPLES.map((example, index) => (
                        <button
                            key={example.id}
                            ref={(el) => {
                                tabRefs.current[index] = el;
                            }}
                            role="tab"
                            id={`showcase-tab-${example.id}`}
                            aria-selected={example.id === activeId}
                            aria-controls={`showcase-panel-${example.id}`}
                            tabIndex={example.id === activeId ? 0 : -1}
                            className="showcase-tab"
                            type="button"
                            onClick={() => setActiveId(example.id)}
                        >
                            {example.label}
                        </button>
                    ))}
                </div>

                <div id={`showcase-panel-${active.id}`} role="tabpanel" aria-labelledby={`showcase-tab-${active.id}`} tabIndex={0} className="showcase-panel">
                    <div className="showcase-meta">
                        <div className="showcase-prompt">
                            <span className="showcase-meta-label">Prompt</span>
                            <p>&ldquo;{active.prompt}&rdquo;</p>
                        </div>

                        <div className="showcase-registry">
                            <span className="showcase-meta-label">Registry entries used</span>
                            <ul>
                                {active.registry.map((name) => (
                                    <li key={name}>
                                        <code>{name}</code>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <ExampleFrame src={active.src} title={active.frameTitle} openHref={active.openHref} height={620} className="showcase-frame" />
                </div>
            </div>
        </section>
    );
}
