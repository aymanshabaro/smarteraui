import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Skeleton, SkeletonText } from "./skeleton";
import * as Demos from "./skeleton.demo";

describe("Skeleton", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("hides the block placeholder from assistive tech", () => {
        const { container } = render(<Skeleton className="h-10 w-10" />);
        expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    });

    it("applies pulse and sizing classes to the block placeholder", () => {
        const { container } = render(<Skeleton className="h-10 w-10 rounded-full" />);
        const classes = container.firstElementChild?.className.split(" ") ?? [];
        expect(classes).toEqual(expect.arrayContaining(["animate-pulse", "h-10", "w-10", "rounded-full"]));
    });

    it("defaults to three text lines", () => {
        const { container } = render(<SkeletonText />);
        expect(container.firstElementChild?.children).toHaveLength(3);
    });

    it("renders the requested number of lines and shortens only the last one", () => {
        const { container } = render(<SkeletonText lines={4} />);
        const lines = Array.from(container.firstElementChild?.children ?? []);
        expect(lines).toHaveLength(4);
        lines.slice(0, -1).forEach((line) => expect(line.className).not.toContain("w-2/3"));
        expect(lines.at(-1)?.className).toContain("w-2/3");
    });

    it("hides the text block from assistive tech", () => {
        const { container } = render(<SkeletonText />);
        expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    });
});
