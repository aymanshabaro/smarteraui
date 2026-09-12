"use client";

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribeToReducedMotionChange = (onChange: () => void) => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
};
const getReducedMotionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServerSnapshot = () => false;

/**
 * `useSyncExternalStore`, not a `useEffect` + `useState` pair: it's the correct tool for reading
 * external browser state, it makes the value available on the very first client render (no
 * effect-timing gap for a moving frame to slip through before a correction lands), and it matches
 * this repo's existing convention for the same kind of check (see `subscribeToNothing` in
 * packages/ui/src/components/application/color-picker/color-picker.tsx).
 */
function useReducedMotion(): boolean {
    return useSyncExternalStore(subscribeToReducedMotionChange, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

/**
 * The hero product video: a real recording of `scripts/record-demos.ts` driving the actual site
 * (see that script's header for the full pipeline), turned into a short Apple-style walkthrough
 * with ffmpeg. Sources point at `apps/docs/public/demo/hero/` (webm first, then mp4 — a missing
 * webm, e.g. when the local ffmpeg build has no VP9 encoder, is silently skipped by the browser in
 * favor of the mp4 source, so this markup is safe to ship even before that file exists).
 *
 * Respects `prefers-reduced-motion: reduce` by never letting the video autoplay: the `<video>`
 * element itself is always mounted (its `poster` frame is what's visible while paused, so there is
 * no separate `<img>` fallback to keep in sync), but a layout effect pauses it before first paint
 * when the user has that preference, and it is not resumed just because the tool later scrolls
 * back into view. The visible play/pause button always stays available and can still start
 * playback on an explicit click even under reduced motion, so reduced motion means "does not move
 * on its own", not "cannot be watched".
 */
export function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const reducedMotion = useReducedMotion();
    const [wantsPlaying, setWantsPlaying] = useState(() => !reducedMotion);
    const [inView, setInView] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), { threshold: 0.25 });
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    // useLayoutEffect: this only ever calls the video element's own imperative play()/pause(),
    // never setState, so it isn't the "setState inside an effect" pattern — it's what makes a
    // reduced-motion visitor's very first paint never show a moving frame, on top of `autoPlay`
    // never being conditionally omitted from the markup itself.
    useLayoutEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (!reducedMotion && wantsPlaying && inView) video.play().catch(() => undefined);
        else video.pause();
    }, [wantsPlaying, inView, reducedMotion]);

    const togglePlayback = () => {
        setWantsPlaying((was) => !was);
    };

    return (
        <figure
            className="hv-figure"
            aria-label="Recorded Claude Code session: the prompt is typed, Claude searches the Proper UI registry, installs real components and writes the page, then the finished billing settings page is shown."
        >
            <video
                ref={videoRef}
                className="hv-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/demo/hero/hero-poster.jpg"
                width={1280}
                height={800}
                style={{ "--hv-aspect": "1280 / 800" } as CSSProperties}
            >
                <source src="/demo/hero/hero.webm" type="video/webm" />
                <source src="/demo/hero/hero.mp4" type="video/mp4" />
            </video>
            <button
                type="button"
                className="hv-toggle"
                onClick={togglePlayback}
                aria-pressed={wantsPlaying}
                aria-label={wantsPlaying ? "Pause the product video" : "Play the product video"}
            >
                {wantsPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
        </figure>
    );
}

function PlayIcon() {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" className="hv-icon">
            <path d="M4.5 2.7c0-.9 1-1.5 1.8-1l7 4.8a1.2 1.2 0 0 1 0 2l-7 4.8c-.8.5-1.8 0-1.8-1V2.7Z" />
        </svg>
    );
}

function PauseIcon() {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" className="hv-icon">
            <rect x="3.6" y="2.6" width="3" height="10.8" rx="1" />
            <rect x="9.4" y="2.6" width="3" height="10.8" rx="1" />
        </svg>
    );
}
