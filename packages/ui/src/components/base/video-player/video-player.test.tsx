import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { formatTime } from "./use-video-player";
import { VideoPlayer, styles } from "./video-player";
import * as Demos from "./video-player.demo";

describe("VideoPlayer", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);

            // TODO(orchestrator): switch to `toHaveNoViolations()` once vitest-axe's matcher types
            // are augmented for vitest 2 repo-wide; the matcher is registered but not typed today.
            const { violations } = await axe(container);

            expect(violations.map((violation) => violation.id)).toEqual([]);
        });
    }

    it("applies the size classes to the root element", () => {
        const { container } = render(<VideoPlayer size="sm" src="/demo/video-sample.mp4" />);

        const root = container.firstElementChild as HTMLElement;

        for (const className of styles.sizes.sm.root.split(" ")) {
            expect(root.classList.contains(className)).toBe(true);
        }
    });

    it("hides the timeline at sm and shows it at md", () => {
        const { unmount } = render(<VideoPlayer size="sm" src="/demo/video-sample.mp4" />);
        expect(screen.queryByRole("slider", { name: "Seek" })).toBeNull();
        unmount();

        render(<VideoPlayer size="md" src="/demo/video-sample.mp4" />);
        expect(screen.getByRole("slider", { name: "Seek" })).toBeTruthy();
    });

    it("only shows the volume slider and playback speed control at lg", () => {
        const { unmount } = render(<VideoPlayer size="md" src="/demo/video-sample.mp4" />);
        expect(screen.queryByRole("slider", { name: "Volume" })).toBeNull();
        unmount();

        render(<VideoPlayer size="lg" src="/demo/video-sample.mp4" />);
        expect(screen.getByRole("slider", { name: "Volume" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Change playback speed. Current speed: 1x" })).toBeTruthy();
    });

    it("labels every transport control", () => {
        render(<VideoPlayer src="/demo/video-sample.mp4" poster="/demo/video-poster.svg" />);

        expect(screen.getByRole("button", { name: "Play video" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Play" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Mute" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Enter fullscreen" })).toBeTruthy();
    });
});

describe("formatTime", () => {
    it("formats seconds as m:ss and falls back to 0:00", () => {
        expect(formatTime(0)).toBe("0:00");
        expect(formatTime(9.6)).toBe("0:09");
        expect(formatTime(125)).toBe("2:05");
        expect(formatTime(3725)).toBe("1:02:05");
        expect(formatTime(Number.NaN)).toBe("0:00");
        expect(formatTime(-5)).toBe("0:00");
    });
});
