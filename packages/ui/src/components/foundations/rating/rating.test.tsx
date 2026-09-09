import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./rating.demo";

describe("Rating badge and stars", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the rating badge default title and subtitle", () => {
        const { getByText } = render(<Demos.RatingBadgeExample />);
        expect(getByText("Best Design Tool").tagName).toBe("P");
        expect(getByText("2,000+ reviews").tagName).toBe("P");
    });

    it("renders five stars for rating stars example", () => {
        const { container } = render(<Demos.RatingStarsExample />);
        expect(container.querySelectorAll("svg")).toHaveLength(5);
    });
});
