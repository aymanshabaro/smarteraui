import type { Metadata } from "next";
import { AgentPlatforms } from "~/components/landing/agent-platforms";
import { BrandMark } from "~/components/landing/brand-mark";
import { CopyButton } from "~/components/landing/copy-button";
import "~/components/landing/landing.css";
import {
    APPLICATION_GROUPS,
    AXE_SUITES,
    AXE_VIOLATIONS,
    BASE_COMPONENTS,
    COMPOSABLE_VARIANTS,
    MARKETING_SECTIONS,
    PAGE_EXAMPLES,
    PUBLISHED_GROUPS,
    REGISTRY_ENTRIES,
} from "~/components/landing/stats";
import { SITE_NAME } from "~/lib/site";

const TITLE = "Proper UI — UI your AI can actually use";
const DESCRIPTION =
    "The open-source React 19 component library built for AI-generated code. Accessible, typed, token-driven, and ready for Claude Code, Codex, Cursor, Lovable, v0, and Bolt.";

/** Canonical origin for the marketing site, which is not the docs origin in `~/lib/site`. */
const CANONICAL = "https://properui.dev";

const INSTALL_COMMAND = "npx @properui/cli@latest add buttons input select";

export const metadata: Metadata = {
    // Set here rather than in the shared layout: this route is the only one that lives on the
    // marketing origin, so it is the only one whose social-image URLs resolve against it.
    metadataBase: new URL(CANONICAL),
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: CANONICAL },
    icons: { icon: "/favicon.svg" },
    openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, siteName: SITE_NAME, type: "website" },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/** JSON-LD, ported verbatim from the supplied page's `<script type="application/ld+json">` block. */
const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Proper UI",
    description: "Open-source React 19 component library built for AI-generated code.",
    url: "https://properui.dev/",
    codeRepository: "https://github.com/properui/properui",
    programmingLanguage: ["TypeScript", "TSX", "CSS"],
    runtimePlatform: "React 19",
    license: "https://github.com/properui/properui/blob/main/LICENSE",
};

/**
 * The marketing landing page, ported faithfully from the supplied static design
 * (`properui-landing-claude/site/index.html` + `styles.css` + `script.js`).
 *
 * All of the source page's CSS lives in `~/components/landing/landing.css`, scoped under the
 * `.pui-landing` class below so none of it leaks into the rest of the docs site — see that file's
 * header comment for exactly how each global selector (`:root`, `*`, `html`, `body`, `a`, …) was
 * rewritten. The page's colours are fixed light (not theme-aware): every rule sets its own
 * hardcoded color/background rather than reading the docs' semantic tokens, so the root
 * `ThemeProvider`'s dark mode cannot partially apply to it.
 */
export default function LandingPage() {
    return (
        <div className="pui-landing">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

            <header className="site-header">
                <div className="header-inner container">
                    <a className="brand" href="#top" aria-label="Proper UI home">
                        <BrandMark />
                        <span>Proper UI</span>
                    </a>

                    <nav className="main-nav" aria-label="Main navigation">
                        <a href="#agents">For AI</a>
                        <a href="#examples">Examples</a>
                        <a href="#system">Components</a>
                        <a href="#install">Installation</a>
                    </nav>

                    <div className="header-actions">
                        <a className="button button-secondary header-github" href="https://github.com/properui/properui" target="_blank" rel="noreferrer">
                            GitHub
                        </a>
                        <a className="button button-primary" href="#install">
                            Get started
                        </a>
                    </div>
                </div>
            </header>

            <main id="top">
                <section className="hero">
                    <div className="hero-grid" aria-hidden="true" />
                    <div className="hero-glow" aria-hidden="true" />
                    <div className="hero-copy container">
                        <a className="badge-group" href="https://github.com/properui/properui" target="_blank" rel="noreferrer">
                            <span>
                                <i />
                                Open source
                            </span>
                            Built for AI-generated code
                            <b aria-hidden="true">→</b>
                        </a>
                        <h1>
                            The UI library your AI <em>can actually use.</em>
                        </h1>
                        <p>
                            Production-ready React components made for the way interfaces get built now: by agents, at speed. Real source, strict types,
                            accessible behavior, and one token system from prompt to product.
                        </p>
                        <div className="hero-actions">
                            <a className="button button-primary button-xl" href="#install">
                                Start building free
                            </a>
                            <a className="button button-secondary button-xl" href="#system">
                                Explore the system
                            </a>
                        </div>
                        <small>
                            MIT licensed <i>·</i> React 19 <i>·</i> React Aria <i>·</i> Tailwind CSS v4
                        </small>
                    </div>

                    <div className="workbench-wrap container">
                        <div className="workbench">
                            <div className="workbench-top">
                                <div className="window-dots" aria-hidden="true">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <span className="file-tab">⌘ {" "} checkout-page.tsx</span>
                                <span className="build-status">
                                    <i /> Compiles cleanly
                                </span>
                            </div>
                            <div className="workbench-body">
                                <div className="agent-panel">
                                    <span className="panel-label">✦ Agent prompt</span>
                                    <div className="prompt-card">
                                        <p>Build a clean checkout confirmation screen using Proper UI. Keep it keyboard accessible and use semantic tokens.</p>
                                        <div>
                                            <span>React 19</span>
                                            <span>Responsive</span>
                                            <span>Dark mode</span>
                                        </div>
                                    </div>
                                    <ul className="agent-checks">
                                        <li>
                                            <b>✓</b> Read component registry
                                        </li>
                                        <li>
                                            <b>✓</b> Resolve dependencies
                                        </li>
                                        <li>
                                            <b>✓</b> Compose named variants
                                        </li>
                                    </ul>
                                    <pre className="code-card">
                                        <code>
                                            <span className="purple">import</span> {"{ Button }"} <span className="purple">from</span>
                                            {"\n"}
                                            <span className="green">&quot;@properui/ui/components/base/buttons/button&quot;</span>
                                            {"\n\n"}
                                            <span className="blue">&lt;Button</span> <span className="amber">size</span>=
                                            <span className="green">&quot;lg&quot;</span> <span className="amber">color</span>=
                                            <span className="green">&quot;primary&quot;</span>
                                            <span className="blue">&gt;</span>
                                            {"\n  "}View order{"\n"}
                                            <span className="blue">&lt;/Button&gt;</span>
                                        </code>
                                    </pre>
                                </div>

                                <div className="result-panel">
                                    <span className="panel-label">✧ Generated result</span>
                                    <div className="mini-app">
                                        <div className="mini-nav">
                                            <strong>
                                                <i>N</i> Northstar
                                            </strong>
                                            <span>AS</span>
                                        </div>
                                        <div className="success-mark">✓</div>
                                        <small>ORDER CONFIRMED</small>
                                        <h2>You&rsquo;re all set.</h2>
                                        <p>Your order #PU-2408 is confirmed. We&rsquo;ll send tracking details as soon as it ships.</p>
                                        <div className="order-row">
                                            <i>◫</i>
                                            <span>
                                                <strong>Creator workspace</strong>
                                                <small>Annual plan</small>
                                            </span>
                                            <b>$192.00</b>
                                        </div>
                                        <div className="mini-actions">
                                            <button className="button button-primary">View order</button>
                                            <button className="button button-secondary">Back to dashboard</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="tool-strip" aria-label="Compatible AI coding tools">
                    <div className="tool-strip-inner container">
                        <p>Built to work where you work</p>
                        <div>
                            <span>Claude Code</span>
                            <span>Codex</span>
                            <span>Cursor</span>
                            <span>Lovable</span>
                            <span>v0</span>
                            <span>Bolt</span>
                        </div>
                    </div>
                </section>

                <section className="metrics" aria-label="Proper UI by the numbers">
                    <div className="metrics-grid container">
                        <div>
                            <strong>{REGISTRY_ENTRIES}</strong>
                            <span>Registry entries</span>
                        </div>
                        <div>
                            <strong>{PUBLISHED_GROUPS}</strong>
                            <span>Published component groups</span>
                        </div>
                        <div>
                            <strong>{COMPOSABLE_VARIANTS}</strong>
                            <span>Composable variants</span>
                        </div>
                        <div>
                            <strong>{AXE_VIOLATIONS}</strong>
                            <span>Detected axe violations</span>
                        </div>
                    </div>
                </section>

                <section className="section agents" id="agents">
                    <div className="split container">
                        <div className="section-copy sticky">
                            <span className="eyebrow">Designed for agents</span>
                            <h2>
                                Real source.
                                <br />
                                Not plausible guesses.
                            </h2>
                            <p>
                                Models are excellent at composing interfaces—and unreliable at recalling an API from memory. Proper UI gives every agent three
                                machine-readable surfaces so it can inspect before it writes.
                            </p>
                            <a
                                className="button button-secondary button-lg"
                                href="https://github.com/properui/properui#built-for-ai-code-generators"
                                target="_blank"
                                rel="noreferrer"
                            >
                                See how it works
                            </a>
                        </div>

                        <div className="steps">
                            <article>
                                <span className="step-no">01</span>
                                <i className="step-icon">⌘</i>
                                <h3>Read the docs as markdown</h3>
                                <p>Every page has a plain-text twin indexed at /llms.txt. No DOM scraping. No missing context.</p>
                                <code>curl properui.dev/llms.txt</code>
                            </article>
                            <article>
                                <span className="step-no">02</span>
                                <i className="step-icon">{"{ }"}</i>
                                <h3>Fetch the exact component</h3>
                                <p>Registry entries include real TSX, dependencies, props, and related components.</p>
                                <code>curl properui.dev/r/buttons.json</code>
                            </article>
                            <article>
                                <span className="step-no">03</span>
                                <i className="step-icon">＋</i>
                                <h3>Write it into the project</h3>
                                <p>The CLI resolves dependencies, rewrites aliases, and gives you source you can inspect.</p>
                                <code>npx @properui/cli add buttons</code>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="section ai-platforms" aria-labelledby="platforms-title">
                    <div className="container">
                        <div className="platforms-heading">
                            <div>
                                <span className="eyebrow">Easy in every AI workspace</span>
                                <h2 id="platforms-title">One command teaches your agent the whole system.</h2>
                            </div>
                            <p>
                                Proper UI installs durable project instructions—not a prompt you have to remember. Your agent learns to inspect the project,
                                search before creating, choose complete examples when they fit, and preserve the design system.
                            </p>
                        </div>

                        <AgentPlatforms />
                    </div>
                </section>

                <section className="section component-picker" id="examples" aria-labelledby="picker-title">
                    <div className="picker-glow" aria-hidden="true" />
                    <div className="container">
                        <div className="picker-heading">
                            <span className="eyebrow">Component intelligence, not guesswork</span>
                            <h2 id="picker-title">Describe the page. Your agent chooses the beautiful parts.</h2>
                            <p>
                                Instead of generating another generic layout, the agent searches {REGISTRY_ENTRIES} registry entries, compares intent and
                                composition metadata, then assembles a proven Proper UI example.
                            </p>
                        </div>

                        <div className="selection-workbench">
                            <div className="selection-sidebar">
                                <div className="selection-label">
                                    <span>01</span> Your prompt
                                </div>
                                <div className="selection-prompt">
                                    Build a polished SaaS pricing page with a simple header, three plans, social proof and a clear FAQ.
                                </div>
                                <div className="selection-label">
                                    <span>02</span> Proper UI search
                                </div>
                                <div className="search-line">
                                    <span>⌕</span>
                                    <code>pricing page saas</code>
                                    <kbd>Registry results</kbd>
                                </div>
                                <div className="selected-list">
                                    <article className="selected-component active">
                                        <span className="component-thumb nav-thumb">
                                            <i />
                                            <i />
                                            <i />
                                        </span>
                                        <div>
                                            <strong>header-dropdown-simple</strong>
                                            <small>Marketing · responsive</small>
                                        </div>
                                        <b>✓</b>
                                    </article>
                                    <article className="selected-component active">
                                        <span className="component-thumb price-thumb">
                                            <i />
                                            <i />
                                            <i />
                                        </span>
                                        <div>
                                            <strong>pricing-section-featured-cards-01</strong>
                                            <small>3 tiers · featured plan</small>
                                        </div>
                                        <b>✓</b>
                                    </article>
                                    <article className="selected-component active">
                                        <span className="component-thumb quote-thumb">&ldquo;</span>
                                        <div>
                                            <strong>testimonial-simple-centered-01</strong>
                                            <small>Logo + customer quote</small>
                                        </div>
                                        <b>✓</b>
                                    </article>
                                    <article className="selected-component active">
                                        <span className="component-thumb faq-thumb">
                                            <i />
                                            <i />
                                            <i />
                                        </span>
                                        <div>
                                            <strong>faq-accordion-02</strong>
                                            <small>Accessible disclosure</small>
                                        </div>
                                        <b>✓</b>
                                    </article>
                                </div>
                                <div className="selection-checks">
                                    <span>✓ Dependencies resolved</span>
                                    <span>✓ Semantic tokens</span>
                                    <span>✓ Keyboard accessible</span>
                                </div>
                            </div>

                            <div className="page-preview">
                                <div className="preview-browser">
                                    <span />
                                    <span />
                                    <span />
                                    <code>acme.dev/pricing</code>
                                </div>
                                <div className="preview-page">
                                    <nav className="preview-nav">
                                        <strong>
                                            <i>A</i> Acme
                                        </strong>
                                        <div>
                                            <span>Product</span>
                                            <span>Solutions</span>
                                            <span>Pricing</span>
                                        </div>
                                        <button>Get started</button>
                                    </nav>
                                    <header className="preview-hero">
                                        <small>PRICING</small>
                                        <h3>Plans that scale with you.</h3>
                                        <p>Start free. Upgrade when your team is ready.</p>
                                        <div className="billing-toggle">
                                            <span>Monthly</span>
                                            <b>
                                                Yearly <i>Save 20%</i>
                                            </b>
                                        </div>
                                    </header>
                                    <div className="pricing-cards">
                                        <article>
                                            <span>Starter</span>
                                            <strong>
                                                $0<small>/mo</small>
                                            </strong>
                                            <p>For trying things out.</p>
                                            <button>Start free</button>
                                            <ul>
                                                <li>✓ 3 projects</li>
                                                <li>✓ Core analytics</li>
                                            </ul>
                                        </article>
                                        <article className="popular">
                                            <em>Most popular</em>
                                            <span>Growth</span>
                                            <strong>
                                                $29<small>/mo</small>
                                            </strong>
                                            <p>For growing products.</p>
                                            <button>Start building</button>
                                            <ul>
                                                <li>✓ Unlimited projects</li>
                                                <li>✓ Advanced analytics</li>
                                            </ul>
                                        </article>
                                        <article>
                                            <span>Scale</span>
                                            <strong>
                                                $79<small>/mo</small>
                                            </strong>
                                            <p>For ambitious teams.</p>
                                            <button>Contact sales</button>
                                            <ul>
                                                <li>✓ SSO &amp; permissions</li>
                                                <li>✓ Priority support</li>
                                            </ul>
                                        </article>
                                    </div>
                                    <div className="preview-proof">
                                        <span className="proof-avatar">MK</span>
                                        <blockquote>&ldquo;We launched the redesign in days, and it finally feels like one product.&rdquo;</blockquote>
                                        <strong>Maria King · Northstar</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="example-types" aria-label="Available Proper UI example types">
                            <article>
                                <div className="example-mini dashboard-mini">
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <div>
                                    <strong>Application UI</strong>
                                    <p>Dashboards, tables, settings, forms and onboarding flows.</p>
                                </div>
                            </article>
                            <article>
                                <div className="example-mini marketing-mini">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <div>
                                    <strong>Marketing pages</strong>
                                    <p>Heroes, pricing, testimonials, FAQs and complete landing pages.</p>
                                </div>
                            </article>
                            <article>
                                <div className="example-mini commerce-mini">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <div>
                                    <strong>Product experiences</strong>
                                    <p>Checkout, account screens, empty states and polished workflows.</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="section system" id="system">
                    <div className="container">
                        <div className="section-heading">
                            <span className="eyebrow">One coherent system</span>
                            <h2>Beautiful parts. Production behavior.</h2>
                            <p>From a button to a complete dashboard, every layer speaks the same typed, accessible, token-driven language.</p>
                        </div>

                        <div className="feature-grid">
                            <article className="feature-card wide">
                                <i className="feature-icon">{"{ }"}</i>
                                <span className="meta">No invented classes</span>
                                <h3>A vocabulary AI can follow</h3>
                                <p>Semantic tokens and typed props give every coding agent the same finite, predictable language.</p>
                                <div className="button-demo">
                                    <button className="button button-primary">Primary</button>
                                    <button className="button button-secondary">Secondary</button>
                                    <button className="button button-ghost">Tertiary</button>
                                </div>
                            </article>
                            <article className="feature-card">
                                <i className="feature-icon">⌨</i>
                                <span className="meta">{AXE_SUITES} axe suites</span>
                                <h3>Accessibility in the primitive</h3>
                                <p>React Aria handles focus, keyboard interaction, and ARIA before the prompt even mentions them.</p>
                            </article>
                            <article className="feature-card">
                                <i className="feature-icon">TS</i>
                                <span className="meta">Source TSX</span>
                                <h3>Readable source, not a black box</h3>
                                <p>Install the package or copy components into your repo. Review, change, and own every line.</p>
                            </article>
                            <article className="feature-card wide">
                                <i className="feature-icon">◐</i>
                                <span className="meta">Tailwind CSS v4</span>
                                <h3>One token layer, every screen</h3>
                                <p>Change one brand scale and buttons, charts, focus rings, badges, and surfaces move together.</p>
                                <div className="swatches">
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </article>
                            <article className="feature-card">
                                <i className="feature-icon">☾</i>
                                <span className="meta">Token-native</span>
                                <h3>Dark mode without cleanup</h3>
                                <p>Theme classes remap semantic tokens globally, so generated screens stay coherent in both modes.</p>
                            </article>
                        </div>

                        <div className="layer-stats">
                            <div>
                                <strong>{BASE_COMPONENTS}</strong>
                                <span>Base components</span>
                            </div>
                            <div>
                                <strong>{APPLICATION_GROUPS}</strong>
                                <span>Application groups</span>
                            </div>
                            <div>
                                <strong>{MARKETING_SECTIONS}</strong>
                                <span>Marketing sections</span>
                            </div>
                            <div>
                                <strong>{PAGE_EXAMPLES}</strong>
                                <span>Full-page examples</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section tokens">
                    <div className="token-glow" aria-hidden="true" />
                    <div className="token-grid container">
                        <div className="theme-code">
                            <header>
                                <span>theme.css</span>
                                <span>11 brand steps</span>
                            </header>
                            <pre>
                                <code>
                                    <span className="purple">@theme</span> {"{"}
                                    {"\n  "}
                                    <span className="blue">--color-brand-50</span>: rgb(249 245 255);
                                    {"\n  "}
                                    <span className="blue">--color-brand-100</span>: rgb(244 235 255);
                                    {"\n  "}
                                    <span className="blue">--color-brand-400</span>: rgb(182 146 246);
                                    {"\n  "}
                                    <span className="blue">--color-brand-600</span>: rgb(127 86 217);
                                    {"\n  "}
                                    <span className="blue">--color-brand-800</span>: rgb(83 56 158);
                                    {"\n  "}
                                    <span className="blue">--color-brand-950</span>: rgb(44 28 95);
                                    {"\n"}
                                    {"}"}
                                </code>
                            </pre>
                            <footer>
                                <span>✓ Buttons</span>
                                <span>✓ Focus rings</span>
                                <span>✓ Charts</span>
                                <span>✓ Dark mode</span>
                            </footer>
                        </div>
                        <div className="section-copy token-copy">
                            <span className="eyebrow">Built for systems</span>
                            <h2>Rebrand every component in one file.</h2>
                            <p>
                                Proper UI components never hard-code a palette. Change the brand ramp once and every generated screen follows—without chasing
                                hundreds of utility classes.
                            </p>
                            <ul>
                                <li>✓ Semantic color and type tokens</li>
                                <li>✓ Class-based light and dark modes</li>
                                <li>✓ Logical spacing for RTL layouts</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="section install" id="install">
                    <div className="install-card container">
                        <div>
                            <span className="eyebrow">Start in one command</span>
                            <h2>Your next screen is one prompt away.</h2>
                            <p>Add only what you need. The CLI writes readable components into your project, or install the complete package from npm.</p>
                        </div>
                        <div className="install-actions">
                            <div className="command">
                                <code>{INSTALL_COMMAND}</code>
                                <CopyButton value={INSTALL_COMMAND}>Copy</CopyButton>
                            </div>
                            <div>
                                <a className="button light-button button-lg" href="https://www.npmjs.com/package/@properui/ui" target="_blank" rel="noreferrer">
                                    View on npm
                                </a>
                                <a className="button outline-button button-lg" href="https://github.com/properui/properui" target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section faq" id="faq">
                    <div className="faq-grid container">
                        <div className="section-copy">
                            <span className="eyebrow">The short version</span>
                            <h2>Questions, answered properly.</h2>
                            <p>Everything is open source. There is no hidden PRO tier and no proprietary runtime between your app and the code.</p>
                        </div>
                        <div className="faq-list">
                            <details open>
                                <summary>
                                    Which AI coding tools does it work with?
                                    <b>›</b>
                                </summary>
                                <p>
                                    Claude Code, Codex and Cursor get native project instructions through one CLI command. Lovable gets the same Proper UI skill
                                    through its knowledge panel. v0, Bolt, Gemini CLI and other tools can use the public registry and Markdown docs directly.
                                </p>
                            </details>
                            <details>
                                <summary>
                                    How does the AI choose the right component?
                                    <b>›</b>
                                </summary>
                                <p>
                                    The installed skill tells the agent to inspect the project and search the Proper UI registry before writing JSX. Registry
                                    metadata describes each component&rsquo;s intent, dependencies, accessibility contract and what it composes with, helping
                                    the model select a fitting primitive, section or full-page example.
                                </p>
                            </details>
                            <details>
                                <summary>
                                    Do I install a package or copy the components?
                                    <b>›</b>
                                </summary>
                                <p>Either. Install @properui/ui normally, or use the CLI to write selected components into your project and own the source.</p>
                            </details>
                            <details>
                                <summary>
                                    Is it free for commercial projects?
                                    <b>›</b>
                                </summary>
                                <p>Yes. Proper UI is MIT licensed, including base components, application UI, marketing sections, and full-page examples.</p>
                            </details>
                            <details>
                                <summary>
                                    Does it replace Tailwind CSS or React Aria?
                                    <b>›</b>
                                </summary>
                                <p>No. React Aria provides behavior and accessibility; Tailwind CSS v4 and Proper UI tokens provide the visual system.</p>
                            </details>
                        </div>
                    </div>
                </section>

                <section className="final-cta">
                    <div className="container">
                        <div>
                            <span className="eyebrow">Open source. Production ready.</span>
                            <h2>Give your agent better building blocks.</h2>
                        </div>
                        <a className="button light-button button-xl" href="#install">
                            Start building free
                        </a>
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <div className="footer-main container">
                    <div>
                        <a className="brand inverse" href="#top">
                            <BrandMark />
                            <span>Proper UI</span>
                        </a>
                        <p>The open-source React component library built for AI-generated code.</p>
                    </div>
                    <nav aria-label="Footer navigation">
                        <div>
                            <strong>Explore</strong>
                            <a href="#agents">For AI agents</a>
                            <a href="#system">Components</a>
                            <a href="#install">Installation</a>
                        </div>
                        <div>
                            <strong>Project</strong>
                            <a href="https://github.com/properui/properui" target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                            <a href="https://www.npmjs.com/package/@properui/ui" target="_blank" rel="noreferrer">
                                npm
                            </a>
                            <a href="https://github.com/properui/properui/blob/main/LICENSE" target="_blank" rel="noreferrer">
                                MIT license
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="footer-bottom container">
                    <span>© 2026 Proper UI</span>
                    <span>Built in public by Ayman Shabaro.</span>
                </div>
            </footer>
        </div>
    );
}
