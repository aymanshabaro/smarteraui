import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./activity-gauges.demo";

describe("Activity gauges", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the active users title and subtitle", () => {
        const { getAllByText } = render(<Demos.ActivityGaugeMd />);
        expect(getAllByText("1,000").length).toBeGreaterThan(0);
        expect(getAllByText("Active users").length).toBeGreaterThan(0);
    });

    it("renders one legend entry per data series", () => {
        const { getByText } = render(<Demos.ActivityGaugeLg />);
        expect(getByText("Series 1")).toBeTruthy();
        expect(getByText("Series 2")).toBeTruthy();
        expect(getByText("Series 3")).toBeTruthy();
    });
});
