"use client";

import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Loops a ~12s scripted re-enactment (not a video) of the real registry workflow described in
 * the improvement brief's Priority 6: a prompt is typed, real search results appear, a real file
 * path is written, and the resulting page's real thumbnail scales in. Every name and path below
 * is verified, not invented:
 *   - `pricing-page-02` / `pricing-page-03` / `pricing-page-04` are real, adjacent entries in
 *     `packages/registry/dist/` (see `pricing-page-0{2,3,4}.json`).
 *   - `ADD_PATH` is `packages/registry/dist/pricing-page-03.json`'s `files[0].path`, verbatim.
 *   - `THUMB_SRC` exists at `apps/docs/public/thumbs/marketing-examples/pricing-pages/
 *     pricing-page-03.webp`.
 *
 * CSS/JS driven (no animation library): a small step state machine advances on timers, pausing
 * while the card is off-screen (IntersectionObserver) and collapsing to the finished "screen"
 * frame with no motion at all under `prefers-reduced-motion: reduce`.
 */

type Step = "idle" | "typing" | "searching" | "adding" | "screen" | "hold" | "fade";
const STEP_ORDER: Step[] = ["idle", "typing", "searching", "adding", "screen", "hold", "fade"];
const STEP_MS: Record<Step, number> = {
    idle: 400,
    typing: 1600,
    searching: 2000,
    adding: 1800,
    screen: 900,
    hold: 3200,
    fade: 500,
};

const PROMPT_TEXT = "Build a pricing page with Proper UI";
const SEARCH_RESULTS: Array<{ name: string; match: boolean }> = [
    { name: "pricing-page-02", match: false },
    { name: "pricing-page-03", match: true },
    { name: "pricing-page-04", match: false },
];
const ADD_PATH = "components/marketing-examples/pricing-pages/pricing-page-03.tsx";
const THUMB_SRC = "/thumbs/marketing-examples/pricing-pages/pricing-page-03.webp";

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

export function WorkflowAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState<Step>("idle");
    const [cycle, setCycle] = useState(0);
    const [inView, setInView] = useState(false);
    const reducedMotion = useReducedMotion();

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

    // Advances exactly one step after STEP_MS[step] elapses, then relies on the resulting
    // `step` state change to re-run this effect for the next step — no ref-tracked index needed.
    // Cleanup cancels the pending timer whenever step/inView/reducedMotion changes, which is what
    // pauses the loop the instant the card scrolls out of view or reduced motion is requested.
    useEffect(() => {
        if (reducedMotion || !inView) return;
        const timer = setTimeout(() => {
            const nextIndex = (STEP_ORDER.indexOf(step) + 1) % STEP_ORDER.length;
            if (nextIndex === 0) setCycle((c) => c + 1);
            setStep(STEP_ORDER[nextIndex]!);
        }, STEP_MS[step]);
        return () => clearTimeout(timer);
    }, [step, inView, reducedMotion]);

    const activeStep: Step = reducedMotion ? "screen" : step;
    const showResults = activeStep === "searching" || activeStep === "adding" || activeStep === "screen" || activeStep === "hold";
    const showAdd = activeStep === "adding" || activeStep === "screen" || activeStep === "hold";
    const showScreen = activeStep === "screen" || activeStep === "hold";

    return (
        <div ref={containerRef} className="wa-card" data-step={activeStep} aria-hidden="true">
            <div className="wa-bar">
                <span className="wa-dot" />
                <span className="wa-dot" />
                <span className="wa-dot" />
            </div>
            <div className="wa-body">
                <div className="wa-prompt-row">
                    <span className="wa-prompt-label">Prompt</span>
                    {reducedMotion ? (
                        <span className="wa-prompt-text">{PROMPT_TEXT}</span>
                    ) : (
                        <span className="wa-prompt-text wa-typed" key={cycle} style={{ "--wa-chars": `${PROMPT_TEXT.length}ch` } as CSSProperties}>
                            {PROMPT_TEXT}
                        </span>
                    )}
                </div>

                <div className="wa-results" data-visible={showResults}>
                    <p className="wa-label">Searching the registry</p>
                    <ul>
                        {SEARCH_RESULTS.map((result) => (
                            <li key={result.name} className={result.match ? "wa-match" : undefined}>
                                {result.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="wa-add" data-visible={showAdd}>
                    <span className="wa-check" aria-hidden="true">
                        &#10003;
                    </span>
                    <code>{ADD_PATH}</code>
                </div>

                <div className="wa-screen" data-visible={showScreen}>
                    <img src={THUMB_SRC} alt="" width={640} height={360} loading="lazy" />
                </div>
            </div>
        </div>
    );
}
