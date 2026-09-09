import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { BackgroundPattern } from "./index";

describe("BackgroundPattern", () => {
    const patterns = ["grid", "grid-check", "square", "circle"] as const;

    for (const pattern of patterns) {
        it(`${pattern} has no a11y violations`, async () => {
            const { container } = render(<BackgroundPattern pattern={pattern} />);
            expect(container.querySelector("svg")).toBeInTheDocument();
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("applies the requested size", () => {
        const { container } = render(<BackgroundPattern pattern="grid" size="sm" />);
        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("width", "336");
    });
});
