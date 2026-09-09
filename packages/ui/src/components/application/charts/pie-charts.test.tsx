import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./pie-charts.demo";

describe("Pie charts", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders one legend entry per data series", () => {
        const { getByText } = render(<Demos.PieChartMd />);
        expect(getByText("Series 1")).toBeTruthy();
        expect(getByText("Series 5")).toBeTruthy();
    });
});
