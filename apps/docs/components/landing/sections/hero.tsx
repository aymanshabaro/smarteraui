import { ToolSelector } from "~/components/landing/tool-selector";

/**
 * Landing hero (brief Priority 1). Copy is verbatim from the brief except the headline, which
 * drops the owner-banned em dash ("Build with AI—without losing your design system.") in favor
 * of a plain sentence. The interactive tool selector and setup preview live in `ToolSelector`
 * (a client component) so the primary CTA can focus the selector's checked radio.
 */
export function Hero() {
    return (
        <section className="hero" id="top-hero">
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-glow" aria-hidden="true" />
            <div className="hero-copy container">
                <span className="eyebrow">THE DESIGN SYSTEM FOR AI-BUILT PRODUCTS</span>
                <h1>Build with AI without losing your design system.</h1>
                <p>
                    Proper UI gives Claude, Codex, Cursor and Lovable a machine-readable React component system, so every screen ships faster and stays
                    consistent across your product.
                </p>

                <ToolSelector />
            </div>
        </section>
    );
}
