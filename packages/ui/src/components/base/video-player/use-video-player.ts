"use client";

import { type RefObject, useCallback, useEffect, useState } from "react";

/** Media events that can change any part of the snapshot below. */
const MEDIA_EVENTS = ["play", "playing", "pause", "ended", "timeupdate", "durationchange", "loadedmetadata", "volumechange", "ratechange"] as const;

/** Snapshot of the underlying `<video>` element's playback state. */
export interface VideoPlayerState {
    /** Whether the video is currently playing. */
    isPlaying: boolean;
    /** Whether playback has started and has not yet ended — drives the poster overlay. */
    hasStarted: boolean;
    /** Whether audio output is muted. */
    isMuted: boolean;
    /** Volume between `0` and `1`. */
    volume: number;
    /** Playback position in seconds. */
    currentTime: number;
    /** Total duration in seconds, or `0` while it is still unknown. */
    duration: number;
    /** Current playback rate multiplier. */
    playbackRate: number;
    /** Whether the player container is displayed fullscreen. */
    isFullscreen: boolean;
}

/** Imperative actions the controls call on the underlying `<video>` element. */
export interface VideoPlayerActions {
    /** Starts playback, ignoring browser autoplay rejections. */
    play: () => void;
    /** Pauses playback. */
    pause: () => void;
    /** Plays when paused, pauses when playing. */
    togglePlay: () => void;
    /** Mutes when unmuted, unmutes when muted. */
    toggleMute: () => void;
    /** Sets the volume; a volume of `0` also mutes, anything above unmutes. */
    changeVolume: (volume: number) => void;
    /** Seeks to the given position in seconds. */
    seek: (time: number) => void;
    /** Sets the playback rate multiplier. */
    changePlaybackRate: (rate: number) => void;
    /** Enters fullscreen for the container, or leaves it when already fullscreen. */
    toggleFullscreen: () => void;
}

const INITIAL_STATE: VideoPlayerState = {
    isPlaying: false,
    hasStarted: false,
    isMuted: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    playbackRate: 1,
    isFullscreen: false,
};

const finite = (value: number) => (Number.isFinite(value) ? value : 0);

/**
 * Subscribes to a `<video>` element and exposes its playback state plus the actions
 * the custom controls need. Keeping the element as the single source of truth means
 * native interactions (picture-in-picture, media keys) stay in sync with the UI.
 */
export function useVideoPlayer(
    videoRef: RefObject<HTMLVideoElement | null>,
    containerRef: RefObject<HTMLElement | null>,
): VideoPlayerState & VideoPlayerActions {
    const [state, setState] = useState<VideoPlayerState>(INITIAL_STATE);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const sync = () => {
            setState((previous) => ({
                ...previous,
                isPlaying: !video.paused && !video.ended,
                hasStarted: video.ended ? false : previous.hasStarted || !video.paused,
                isMuted: video.muted,
                volume: finite(video.volume),
                currentTime: finite(video.currentTime),
                duration: finite(video.duration),
                playbackRate: video.playbackRate || 1,
            }));
        };

        MEDIA_EVENTS.forEach((event) => video.addEventListener(event, sync));
        sync();

        return () => MEDIA_EVENTS.forEach((event) => video.removeEventListener(event, sync));
    }, [videoRef]);

    useEffect(() => {
        const sync = () =>
            setState((previous) => ({ ...previous, isFullscreen: !!containerRef.current && document.fullscreenElement === containerRef.current }));

        document.addEventListener("fullscreenchange", sync);
        return () => document.removeEventListener("fullscreenchange", sync);
    }, [containerRef]);

    const play = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        try {
            // Browsers reject `play()` under their autoplay policies; the paused state stays correct either way.
            video.play()?.catch(() => {});
        } catch {
            // Environments without media playback (jsdom, some embedded webviews) throw synchronously.
        }
    }, [videoRef]);

    const pause = useCallback(() => videoRef.current?.pause(), [videoRef]);

    const togglePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused || video.ended) {
            play();
        } else {
            video.pause();
        }
    }, [videoRef, play]);

    const toggleMute = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
    }, [videoRef]);

    const changeVolume = useCallback(
        (volume: number) => {
            const video = videoRef.current;
            if (!video) return;

            video.volume = Math.min(Math.max(volume, 0), 1);
            video.muted = video.volume === 0;
        },
        [videoRef],
    );

    const seek = useCallback(
        (time: number) => {
            const video = videoRef.current;
            if (!video) return;

            video.currentTime = Math.max(time, 0);
        },
        [videoRef],
    );

    const changePlaybackRate = useCallback(
        (rate: number) => {
            const video = videoRef.current;
            if (!video) return;

            video.playbackRate = rate;
        },
        [videoRef],
    );

    const toggleFullscreen = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        if (document.fullscreenElement) {
            document.exitFullscreen?.()?.catch(() => {});
            return;
        }

        container.requestFullscreen?.()?.catch(() => {});
    }, [containerRef]);

    return { ...state, play, pause, togglePlay, toggleMute, changeVolume, seek, changePlaybackRate, toggleFullscreen };
}

/**
 * Formats a duration in seconds as `m:ss`, or `h:mm:ss` once it passes an hour.
 */
export function formatTime(seconds: number): string {
    const total = Math.floor(Number.isFinite(seconds) && seconds > 0 ? seconds : 0);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const remainder = total % 60;

    const paddedSeconds = String(remainder).padStart(2, "0");

    return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}` : `${minutes}:${paddedSeconds}`;
}
