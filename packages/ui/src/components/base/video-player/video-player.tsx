"use client";

import { useRef } from "react";
import { Button as AriaButton, Slider as AriaSlider, SliderThumb as AriaSliderThumb, SliderTrack as AriaSliderTrack } from "react-aria-components";
import { Expand01, Minimize01, VolumeMax, VolumeX } from "@smarteraui/icons";
import { cx, sortCx } from "@/utils/cx";
import { formatTime, useVideoPlayer } from "./use-video-player";
import { MultiplyGlyph, PauseGlyph, PlayGlyph } from "./video-player-icons";

export const styles = sortCx({
    common: {
        root: "group/video relative aspect-video w-full overflow-hidden",
        video: "size-full cursor-pointer rounded-[inherit] bg-black outline-1 -outline-offset-1 outline-black/10",
        // Poster overlay doubles as the primary play affordance before playback starts.
        poster: [
            "group/poster absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-[inherit] transition-all duration-300 ease-in",
            "outline-focus-ring focus-visible:outline-2 focus-visible:-outline-offset-2",
        ].join(" "),
        posterHidden: "invisible opacity-0",
        posterImage: "absolute inset-0 size-full object-cover",
        playBadge: "flex size-16 items-center justify-center transition duration-100 ease-linear",
        playBadgeIcon: "size-5 text-fg-white",
        // Control bar slides up on hover, and whenever a control takes keyboard focus.
        controls: [
            "absolute inset-x-0 bottom-0 translate-y-4 transform bg-linear-to-t from-black/20 to-transparent opacity-0 transition duration-150 ease-in will-change-transform",
            "group-hover/video:translate-y-0 group-hover/video:opacity-100 group-hover/video:duration-200 group-hover/video:ease-out",
            "group-focus-within/video:translate-y-0 group-focus-within/video:opacity-100 group-focus-within/video:duration-200 group-focus-within/video:ease-out",
        ].join(" "),
        controlsRow: "flex items-center",
        button: [
            "relative flex h-8 min-w-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-2 text-fg-white transition duration-100 ease-linear",
            "outline-focus-ring hover:bg-alpha-white/20 hover:backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2",
        ].join(" "),
        buttonIcon: "pointer-events-none size-4 shrink-0",
        rateLabel: "pointer-events-none text-xs font-semibold",
        rateIcon: "pointer-events-none mt-0.5 size-2 shrink-0",
        timeline: "flex min-w-0 flex-1 items-center gap-2 px-2",
        timeLabel: "pointer-events-none text-xs font-semibold tabular-nums text-fg-white",
        // Generous vertical padding gives the thin bar a comfortable pointer target.
        progress: "group/progress -my-8 flex-1 cursor-pointer py-8",
        progressTrack: "relative h-2 w-full rounded-full bg-fg-white/30",
        progressFill: "pointer-events-none absolute inset-y-0 start-0 min-w-2 rounded-full bg-fg-white",
        progressThumb: [
            "top-1/2 size-3 rounded-full bg-fg-white opacity-0 outline-focus-ring transition-opacity duration-100 ease-linear",
            "group-hover/progress:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 dragging:opacity-100",
        ].join(" "),
        volumeGroup: "flex items-center rounded-md pe-2 transition duration-100 ease-linear hover:bg-alpha-white/20 hover:backdrop-blur-sm",
        volumeButton:
            "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-fg-white outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        volumeSlider: "flex w-11 shrink-0 cursor-pointer items-center py-2",
        volumeTrack: "relative h-1 w-full rounded-full bg-alpha-white/30",
        volumeFill: "pointer-events-none absolute inset-y-0 start-0 rounded-full bg-fg-white",
        volumeThumb: "top-1/2 size-3 rounded-full bg-fg-white outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
    },
    sizes: {
        sm: {
            root: "max-w-80 rounded-lg",
            controls: "px-1 pt-6 pb-1",
            controlsRow: "gap-0.5",
            // At this size the badge is a bare glyph — a translucent disc would swamp the frame.
            playBadge: "",
        },
        md: {
            root: "max-w-140 rounded-lg",
            controls: "px-5 pt-10 pb-4",
            controlsRow: "gap-0.5",
            playBadge: "rounded-full bg-alpha-white/30 backdrop-blur group-hover/poster:bg-alpha-white/40",
        },
        lg: {
            root: "max-w-180 rounded-xl",
            controls: "px-8 pt-12 pb-6",
            controlsRow: "gap-1",
            playBadge: "rounded-full bg-alpha-white/30 backdrop-blur group-hover/poster:bg-alpha-white/40",
        },
    },
});

/** A captions track offered alongside the video source. */
export interface VideoPlayerCaptions {
    /** URL of the WebVTT file. */
    src: string;
    /** BCP 47 language tag of the track, e.g. `"en"`. */
    srcLang?: string;
    /** Human readable track name shown in native caption menus. */
    label?: string;
}

export interface VideoPlayerProps {
    /** URL of the video file. */
    src: string;
    /** MIME type of the video file. */
    type?: string;
    /** URL of the poster image shown until playback starts. */
    poster?: string;
    /** Alt text for the poster image. Leave empty when the poster is decorative. */
    posterAlt?: string;
    /** Captions track for the video. Required for WCAG 1.2.2 whenever the video carries speech. */
    captions?: VideoPlayerCaptions;
    /** Accessible name of the video element. */
    label?: string;
    /** The size variant of the player. */
    size?: keyof typeof styles.sizes;
    /** Shows the elapsed/remaining time and the seek bar. Defaults to `true` above `sm`. */
    showTimeline?: boolean;
    /** Shows the volume slider next to the mute button. Defaults to `true` at `lg`. */
    showVolumeSlider?: boolean;
    /** Shows the playback speed control. Defaults to `true` at `lg`. */
    showPlaybackRate?: boolean;
    /** Shows the fullscreen toggle. */
    showFullscreen?: boolean;
    /** Playback rates the speed control cycles through. */
    playbackRates?: number[];
    /** Restarts the video when it reaches the end. */
    isLooping?: boolean;
    /** Starts the video with audio muted. */
    isMuted?: boolean;
    /** Starts playback as soon as the video can play. Pair with `isMuted` for browser autoplay policies. */
    isAutoPlaying?: boolean;

    className?: string;
}

/**
 * Video player with custom controls: play/pause, mute, volume, a seek bar, playback
 * speed and fullscreen. Wraps a native `<video>` element so the browser keeps handling
 * buffering, codecs and media keys, while every control is a React Aria primitive.
 */
export const VideoPlayer = ({
    src,
    type = "video/mp4",
    poster,
    posterAlt = "",
    captions,
    label = "Video player",
    size = "md",
    showTimeline,
    showVolumeSlider,
    showPlaybackRate,
    showFullscreen = true,
    playbackRates = [1, 1.5, 2, 0.5],
    isLooping,
    isMuted,
    isAutoPlaying,
    className,
}: VideoPlayerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const player = useVideoPlayer(videoRef, containerRef);

    const withTimeline = showTimeline ?? size !== "sm";
    const withVolumeSlider = showVolumeSlider ?? size === "lg";
    const withPlaybackRate = showPlaybackRate ?? size === "lg";

    const isSilent = player.isMuted || player.volume === 0;
    const VolumeIcon = isSilent ? VolumeX : VolumeMax;

    // The seek slider needs a positive range even before metadata has loaded.
    const seekMax = player.duration || 1;
    const remaining = Math.max(player.duration - player.currentTime, 0);

    const cyclePlaybackRate = () => {
        const current = playbackRates.indexOf(player.playbackRate);
        const next = playbackRates[(current + 1) % playbackRates.length];

        if (next) player.changePlaybackRate(next);
    };

    return (
        <div ref={containerRef} className={cx(styles.common.root, styles.sizes[size].root, className)}>
            <video
                ref={videoRef}
                aria-label={label}
                className={styles.common.video}
                poster={poster}
                loop={isLooping}
                muted={isMuted}
                autoPlay={isAutoPlaying}
                playsInline
                preload="metadata"
                onClick={player.togglePlay}
            >
                <source src={src} type={type} />
                {/* Always emitted so the element advertises a captions track; `captions` supplies the file. */}
                <track kind="captions" src={captions?.src} srcLang={captions?.srcLang} label={captions?.label} default />
                Your browser does not support the video tag.
            </video>

            {poster && (
                <AriaButton
                    aria-label="Play video"
                    excludeFromTabOrder={player.hasStarted}
                    className={cx(styles.common.poster, player.hasStarted && styles.common.posterHidden)}
                    onPress={player.play}
                >
                    <img src={poster} alt={posterAlt} className={styles.common.posterImage} />
                    <div className={cx(styles.common.playBadge, styles.sizes[size].playBadge)}>
                        <PlayGlyph className={styles.common.playBadgeIcon} />
                    </div>
                </AriaButton>
            )}

            <div className={cx(styles.common.controls, styles.sizes[size].controls)}>
                <div className={cx(styles.common.controlsRow, styles.sizes[size].controlsRow)}>
                    <AriaButton aria-label={player.isPlaying ? "Pause" : "Play"} className={styles.common.button} onPress={player.togglePlay}>
                        {player.isPlaying ? <PauseGlyph className={styles.common.buttonIcon} /> : <PlayGlyph className={styles.common.buttonIcon} />}
                    </AriaButton>

                    {withVolumeSlider ? (
                        <div className={styles.common.volumeGroup}>
                            <AriaButton aria-label={isSilent ? "Unmute" : "Mute"} className={styles.common.volumeButton} onPress={player.toggleMute}>
                                <VolumeIcon className={styles.common.buttonIcon} />
                            </AriaButton>

                            <AriaSlider
                                aria-label="Volume"
                                className={styles.common.volumeSlider}
                                minValue={0}
                                maxValue={1}
                                step={0.1}
                                value={isSilent ? 0 : player.volume}
                                onChange={player.changeVolume}
                            >
                                <AriaSliderTrack className={styles.common.volumeTrack}>
                                    {({ state }) => (
                                        <>
                                            <div className={styles.common.volumeFill} style={{ width: `${state.getThumbPercent(0) * 100}%` }} />
                                            <AriaSliderThumb className={styles.common.volumeThumb} />
                                        </>
                                    )}
                                </AriaSliderTrack>
                            </AriaSlider>
                        </div>
                    ) : (
                        <AriaButton aria-label={isSilent ? "Unmute" : "Mute"} className={styles.common.button} onPress={player.toggleMute}>
                            <VolumeIcon className={styles.common.buttonIcon} />
                        </AriaButton>
                    )}

                    {withTimeline ? (
                        <div className={styles.common.timeline}>
                            <span className={styles.common.timeLabel}>{formatTime(player.currentTime)}</span>

                            <AriaSlider
                                aria-label="Seek"
                                className={styles.common.progress}
                                minValue={0}
                                maxValue={seekMax}
                                step={0.1}
                                value={Math.min(player.currentTime, seekMax)}
                                onChange={player.seek}
                            >
                                <AriaSliderTrack className={styles.common.progressTrack}>
                                    {({ state }) => (
                                        <>
                                            <div className={styles.common.progressFill} style={{ width: `${state.getThumbPercent(0) * 100}%` }} />
                                            <AriaSliderThumb className={styles.common.progressThumb} />
                                        </>
                                    )}
                                </AriaSliderTrack>
                            </AriaSlider>

                            <span className={styles.common.timeLabel}>-{formatTime(remaining)}</span>
                        </div>
                    ) : (
                        <div className="flex-1" />
                    )}

                    {withPlaybackRate && (
                        <AriaButton
                            aria-label={`Change playback speed. Current speed: ${player.playbackRate}x`}
                            className={styles.common.button}
                            onPress={cyclePlaybackRate}
                        >
                            <span className={styles.common.rateLabel}>{player.playbackRate}</span>
                            <MultiplyGlyph className={styles.common.rateIcon} />
                        </AriaButton>
                    )}

                    {showFullscreen && (
                        <AriaButton
                            aria-label={player.isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                            className={styles.common.button}
                            onPress={player.toggleFullscreen}
                        >
                            {player.isFullscreen ? <Minimize01 className={styles.common.buttonIcon} /> : <Expand01 className={styles.common.buttonIcon} />}
                        </AriaButton>
                    )}
                </div>
            </div>
        </div>
    );
};
