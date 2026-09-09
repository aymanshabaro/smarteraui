import type { ReactNode } from "react";
import * as Demos from "@/components/base/video-player/video-player.demo";

export default {
    title: "Base components/Video player",
    decorators: [
        (Story: () => ReactNode) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-4">
                <Story />
            </div>
        ),
    ],
};

export const VideoPlayerExample = () => <Demos.VideoPlayerExample />;
VideoPlayerExample.storyName = "Video player example";

export const VideoPlayerSm = () => <Demos.VideoPlayerSm />;
VideoPlayerSm.storyName = "Video player sm";

export const VideoPlayerMd = () => <Demos.VideoPlayerMd />;
VideoPlayerMd.storyName = "Video player md";

export const VideoPlayerLg = () => <Demos.VideoPlayerLg />;
VideoPlayerLg.storyName = "Video player lg";
