import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./radar-charts.demo";

describe("Radar charts", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders one legend entry per data series", () => {
        const { getByText } = render(<Demos.RadarChart />);
        expect(getByText("Series 1")).toBeTruthy();
        expect(getByText("Series 2")).toBeTruthy();
        expect(getByText("Series 3")).toBeTruthy();
    });

    it("renders a day-of-week tick for each radar axis", () => {
        const { getByText } = render(<Demos.RadarChart />);
        expect(getByText("Mon")).toBeTruthy();
        expect(getByText("Sun")).toBeTruthy();
    });
});
