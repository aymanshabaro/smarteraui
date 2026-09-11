"use client";

import { VIDEO_POSTER, VIDEO_SRC } from "../../../utils/demo-assets";
import { VideoPlayer } from "./video-player";

/**
 * Empty WebVTT track. The placeholder clip carries no dialogue, but shipping a captions
 * track keeps every demo compliant with WCAG 1.2.2 and with `jsx-a11y/media-has-caption`.
 */
const CAPTIONS = { src: "data:text/vtt;charset=utf-8,WEBVTT%0A%0A", srcLang: "en", label: "English" };

export const VideoPlayerExample = () => (
    <div className="flex w-full items-center justify-center">
        <VideoPlayer src={VIDEO_SRC} poster={VIDEO_POSTER.src} captions={CAPTIONS} label="Product demo video" />
    </div>
);

export const VideoPlayerSm = () => (
    <div className="flex w-full items-center justify-center">
        <VideoPlayer size="sm" src={VIDEO_SRC} poster={VIDEO_POSTER.src} captions={CAPTIONS} label="Product demo video" />
    </div>
);

export const VideoPlayerMd = () => (
    <div className="flex w-full items-center justify-center">
        <VideoPlayer size="md" src={VIDEO_SRC} poster={VIDEO_POSTER.src} captions={CAPTIONS} label="Product demo video" />
    </div>
);

export const VideoPlayerLg = () => (
    <div className="flex w-full items-center justify-center">
        <VideoPlayer size="lg" src={VIDEO_SRC} poster={VIDEO_POSTER.src} captions={CAPTIONS} label="Product demo video" />
    </div>
);
