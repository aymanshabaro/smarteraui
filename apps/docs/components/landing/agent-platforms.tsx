"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";
import { SetupDialog } from "./setup-dialog";
import type { GuideKey } from "./setup-guides";

const ALL_AGENTS_COMMAND = "npx @properui/cli@latest agent init --client all";

/**
 * The four agent platform cards, the "set up every agent at once" command, the "how it works"
 * strip, and the shared step-by-step setup dialog they open. Grouped into one client component
 * because all four "View step-by-step setup" triggers open the same dialog instance, exactly like
 * the single `#setup-dialog` the supplied `script.js` reuses and repopulates.
 */
export function AgentPlatforms() {
    const [guideKey, setGuideKey] = useState<GuideKey>("claude");
    // Bumped on every trigger click so the dialog re-opens even when re-clicking the same
    // platform's trigger after closing it — see the comment on SetupDialog's `openToken` prop.
    const [openToken, setOpenToken] = useState(0);
    const openGuide = (key: GuideKey) => {
        setGuideKey(key);
        setOpenToken((token) => token + 1);
    };

    return (
        <>
            <div className="platform-grid">
                <article className="platform-card featured-platform">
                    <div className="platform-top">
                        <span className="platform-mark">
                            <img src="/claude.svg" alt="" />
                        </span>
                        <div>
                            <strong>Claude Code</strong>
                            <small>Automatic project skill</small>
                        </div>
                        <span className="ready-pill">Ready</span>
                    </div>
                    <p>Run once in your project terminal. Claude will automatically load the Proper UI workflow for future UI tasks.</p>
                    <div className="platform-copy">
                        <code>npx @properui/cli@latest agent init --client claude</code>
                        <CopyButton value="npx @properui/cli@latest agent init --client claude">Copy</CopyButton>
                    </div>
                    <div className="platform-destination">
                        <span>Creates</span>
                        <code>.claude/skills/properui/SKILL.md + CLAUDE.md</code>
                    </div>
                    <button className="guide-trigger" type="button" onClick={() => openGuide("claude")}>
                        View step-by-step setup <span>→</span>
                    </button>
                </article>

                <article className="platform-card">
                    <div className="platform-top">
                        <span className="platform-mark">
                            <img src="/codex.svg" alt="" />
                        </span>
                        <div>
                            <strong>Codex</strong>
                            <small>Skill + AGENTS.md rules</small>
                        </div>
                    </div>
                    <p>Run once in your project terminal. Codex reads the skill and rules before it writes or edits interface code.</p>
                    <div className="platform-copy">
                        <code>npx @properui/cli@latest agent init --client codex</code>
                        <CopyButton value="npx @properui/cli@latest agent init --client codex">Copy</CopyButton>
                    </div>
                    <div className="platform-destination">
                        <span>Creates</span>
                        <code>.agents/skills/properui/SKILL.md + AGENTS.md</code>
                    </div>
                    <button className="guide-trigger" type="button" onClick={() => openGuide("codex")}>
                        View step-by-step setup <span>→</span>
                    </button>
                </article>

                <article className="platform-card">
                    <div className="platform-top">
                        <span className="platform-mark">
                            <img src="/lovable.svg" alt="" />
                        </span>
                        <div>
                            <strong>Lovable</strong>
                            <small>Knowledge-ready instructions</small>
                        </div>
                    </div>
                    <p>
                        Lovable cannot read local skill files. Copy this link into <strong>Project settings → Knowledge → Custom instructions</strong>.
                    </p>
                    <div className="platform-copy">
                        <code>github.com/properui/properui/blob/main/skills/properui/SKILL.md</code>
                        <CopyButton value="https://github.com/properui/properui/blob/main/skills/properui/SKILL.md">Copy URL</CopyButton>
                    </div>
                    <div className="platform-destination">
                        <span>Then prompt</span>
                        <code>Build a pricing page using Proper UI.</code>
                    </div>
                    <button className="guide-trigger" type="button" onClick={() => openGuide("lovable")}>
                        View step-by-step setup <span>→</span>
                    </button>
                </article>

                <article className="platform-card">
                    <div className="platform-top">
                        <span className="platform-mark">
                            <img src="/cursor.svg" alt="" />
                        </span>
                        <div>
                            <strong>Cursor</strong>
                            <small>Always-on project rule</small>
                        </div>
                    </div>
                    <p>Run once in your project terminal. Cursor Agent receives an always-on rule that makes it search before hand-writing UI.</p>
                    <div className="platform-copy">
                        <code>npx @properui/cli@latest agent init --client cursor</code>
                        <CopyButton value="npx @properui/cli@latest agent init --client cursor">Copy</CopyButton>
                    </div>
                    <div className="platform-destination">
                        <span>Creates</span>
                        <code>.cursor/rules/properui.mdc</code>
                    </div>
                    <button className="guide-trigger" type="button" onClick={() => openGuide("cursor")}>
                        View step-by-step setup <span>→</span>
                    </button>
                </article>
            </div>

            <div className="all-agents-command">
                <div>
                    <span>Using more than one?</span>
                    <strong>Set up every supported agent at once.</strong>
                </div>
                <div className="command light-command">
                    <code>{ALL_AGENTS_COMMAND}</code>
                    <CopyButton value={ALL_AGENTS_COMMAND}>Copy</CopyButton>
                </div>
            </div>

            <div className="how-agent-works" aria-label="How Proper UI works with coding agents">
                <div>
                    <b>1</b>
                    <span>
                        <strong>Copy once</strong>
                        <small>Install the correct project instructions.</small>
                    </span>
                </div>
                <i>→</i>
                <div>
                    <b>2</b>
                    <span>
                        <strong>Prompt normally</strong>
                        <small>Describe the screen you want.</small>
                    </span>
                </div>
                <i>→</i>
                <div>
                    <b>3</b>
                    <span>
                        <strong>Agent searches</strong>
                        <small>It runs info, search and add.</small>
                    </span>
                </div>
                <i>→</i>
                <div>
                    <b>4</b>
                    <span>
                        <strong>Proper UI result</strong>
                        <small>Real components, composed beautifully.</small>
                    </span>
                </div>
            </div>

            <SetupDialog guideKey={guideKey} openToken={openToken} />
        </>
    );
}
