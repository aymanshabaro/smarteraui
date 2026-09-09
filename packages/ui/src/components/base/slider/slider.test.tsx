import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./slider.demo";

describe("Slider", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders a range slider with two thumbs by default", () => {
        const { container } = render(<Demos.Default />);
        expect(container.querySelectorAll('input[type="range"]')).toHaveLength(2);
    });

    it("renders a single thumb when given a single value", () => {
        const { container } = render(<Demos.SingleThumb />);
        expect(container.querySelectorAll('input[type="range"]')).toHaveLength(1);
    });
});
