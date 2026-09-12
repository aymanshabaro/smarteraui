import { CopyButton } from "~/components/landing/copy-button";
import { UNIVERSAL_SETUP_COMMAND } from "~/components/landing/tool-setup";

/** Landing section "get-started" (brief Priority 10): the closing CTA, copy verbatim from the brief. */
export function FinalCta() {
    return (
        <section className="final-cta" id="get-started" aria-labelledby="get-started-title">
            <div className="final-cta-inner container">
                <h2 id="get-started-title">Give your AI a real design system.</h2>
                <p>Set up Proper UI once. Then build complete, consistent interfaces with Claude, Codex, Cursor or Lovable.</p>

                <div className="final-cta-actions">
                    <a className="button light-button button-xl" href="#setup">
                        Set up your agent
                    </a>
                    <a className="button outline-button button-xl" href="/components">
                        Browse components
                    </a>
                </div>

                <div className="final-cta-command">
                    <span>Or set up every agent at once</span>
                    <div className="command">
                        <code>{UNIVERSAL_SETUP_COMMAND}</code>
                        <CopyButton value={UNIVERSAL_SETUP_COMMAND}>Copy</CopyButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
