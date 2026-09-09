import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./featured-icon.demo";

describe("FeaturedIcon", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the data-featured-icon attribute", () => {
        const { container } = render(<Demos.FeaturedIconExample />);
        expect(container.querySelectorAll("[data-featured-icon]").length).toBeGreaterThan(0);
    });
});
