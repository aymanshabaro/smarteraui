"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { TOOL_SETUPS, type ToolKey } from "~/components/landing/tool-setup";

const subscribeToReducedMotionChange = (onChange: () => void) => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
};
const getReducedMotionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServerSnapshot = () => false;

/**
 * `useSyncExternalStore`, not a `useEffect` + `useState` pair: it makes the reduced-motion value
 * available on the very first client render (no effect-timing gap for a frame of the entry
 * transitions to slip through), and matches this repo's existing convention for the same kind of
 * check (see `subscribeToNothing` in packages/ui/src/components/application/color-picker/
 * color-picker.tsx).
 */
function useReducedMotion(): boolean {
    return useSyncExternalStore(subscribeToReducedMotionChange, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

/**
 * Loops a terminal-style re-enactment (not a video) of one real agent setup, driven entirely by
 * `tool-setup.ts`'s `TOOL_SETUPS` so it can never say anything different from the setup card or
 * dialog elsewhere on the page: it types the tool's real `copyValue`, then checks off the real
 * `creates` entries one at a time, holds, and restarts.
 *
 * Lovable is not disguised as a local command: `TOOL_SETUPS.lovable.mode === "url"`, so this
 * renders a "Paste this URL" line instead of a "$" prompt, and its one `creates` entry is already
 * the honest Knowledge-panel destination text (see tool-setup.ts), not a file path.
 *
 * CSS/JS driven (no animation library), pauses while off-screen, and collapses to the finished
 * (fully typed and checked) frame with no motion under `prefers-reduced-motion: reduce`.
 */

type Step = "idle" | "typing" | "lines" | "hold" | "fade";
const STEP_ORDER: Step[] = ["idle", "typing", "lines", "hold", "fade"];

export function SetupAnimation({ tool }: { tool: ToolKey }) {
    const setup = TOOL_SETUPS[tool];
    const containerRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState<Step>("idle");
    const [cycle, setCycle] = useState(0);
    const [inView, setInView] = useState(false);
    const reducedMotion = useReducedMotion();

    const stepMs = useMemo<Record<Step, number>>(() => {
        const typing = Math.min(2600, Math.max(900, setup.copyValue.length * 35));
        const lines = Math.max(700, setup.creates.length * 700);
        return { idle: 400, typing, lines, hold: 3000, fade: 500 };
    }, [setup.copyValue, setup.creates.length]);

    // The tool prop can change (a visitor switches tools elsewhere on the page while this is
    // mounted) — restart the loop from the top rather than showing a stale mid-cycle frame for
    // the new tool's (differently sized) command and file list. Adjusted here, during render
    // (React's documented pattern for resetting state when a prop changes: react.dev/learn/
    // you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes), not in an effect —
    // an effect would run one render late and briefly show the previous tool's stale frame.
    const [prevTool, setPrevTool] = useState(tool);
    if (tool !== prevTool) {
        setPrevTool(tool);
        setStep("idle");
        setCycle((c) => c + 1);
    }

    // Visibility observer: a plain effect whose only job is subscribing to an external system
    // (IntersectionObserver) and calling setState from ITS callback, not synchronously in the
    // effect body — exactly the pattern react-hooks/set-state-in-effect asks for.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), { threshold: 0.2 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Advances exactly one step after stepMs[step] elapses, then relies on the resulting `step`
    // state change to re-run this effect for the next step — no ref-tracked index needed.
    // Cleanup cancels the pending timer whenever step/inView/reducedMotion/stepMs changes, which
    // is what pauses the loop the instant the card scrolls out of view or reduced motion is
    // requested.
    useEffect(() => {
        if (reducedMotion || !inView) return;
        const timer = setTimeout(() => {
            const nextIndex = (STEP_ORDER.indexOf(step) + 1) % STEP_ORDER.length;
            if (nextIndex === 0) setCycle((c) => c + 1);
            setStep(STEP_ORDER[nextIndex]!);
        }, stepMs[step]);
        return () => clearTimeout(timer);
    }, [step, inView, reducedMotion, stepMs]);

    const activeStep: Step = reducedMotion ? "hold" : step;
    const showLines = activeStep === "lines" || activeStep === "hold";

    return (
        <div ref={containerRef} className="sa-card" data-step={activeStep} data-mode={setup.mode} aria-hidden="true">
            <div className="sa-bar">
                <span className="sa-dot" />
                <span className="sa-dot" />
                <span className="sa-dot" />
            </div>
            <div className="sa-body">
                <div className="sa-command-row">
                    <span className="sa-prefix">{setup.mode === "command" ? "$" : "URL"}</span>
                    {reducedMotion ? (
                        <span className="sa-command-text">{setup.copyValue}</span>
                    ) : (
                        <span
                            className="sa-command-text sa-typed"
                            key={cycle}
                            style={{ "--sa-chars": `${setup.copyValue.length}ch`, "--sa-typing-ms": `${stepMs.typing}ms` } as CSSProperties}
                        >
                            {setup.copyValue}
                        </span>
                    )}
                </div>
                <ul className="sa-lines" data-visible={showLines}>
                    {setup.creates.map((file, index) => (
                        <li key={file.path} style={{ "--sa-line-delay": `${index * 350}ms` } as CSSProperties}>
                            <span className="sa-check" aria-hidden="true">
                                &#10003;
                            </span>
                            <code>{file.path}</code>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
