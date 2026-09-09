import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { getAngleFromPoint, getColorAtPosition, getGradientEndpoints, toGradientCSS } from "./gradient-picker-utils";
import * as Demos from "./gradient-picker.demo";

const STOPS = [
    { color: "#7F56D9", position: 0 },
    { color: "#432E73", position: 100 },
];

describe("Gradient picker", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("opens on a linear gradient with two stops", () => {
        const { getByRole, getAllByRole } = render(<Demos.GradientPicker />);

        expect(getByRole("button", { name: "Gradient type" })).toHaveTextContent("Linear");
        expect(getAllByRole("slider", { name: /Gradient stop at/ })).toHaveLength(2);
    });

    it("disables removal while the gradient is at the two-stop minimum", () => {
        const { getByRole } = render(<Demos.GradientPicker />);
        expect(getByRole("button", { name: "Remove stop 1" })).toBeDisabled();
    });

    it("exposes both angle handles and the reverse control", () => {
        const { getByRole } = render(<Demos.GradientPicker />);

        expect(getByRole("slider", { name: "Gradient angle start" })).toHaveAttribute("aria-valuenow", "315");
        expect(getByRole("slider", { name: "Gradient angle end" })).toHaveAttribute("aria-valuenow", "135");
        expect(getByRole("button", { name: "Reverse gradient" })).toBeInTheDocument();
    });

    it("renders one swatch per saved gradient", () => {
        const { getAllByRole } = render(<Demos.GradientPicker />);
        expect(getAllByRole("button", { name: /^Select gradient/ })).toHaveLength(9);
    });

    it("writes a linear gradient by default", () => {
        expect(toGradientCSS(STOPS, { angle: 135 })).toBe("linear-gradient(135deg, #7F56D9 0%, #432E73 100%)");
    });

    it("writes conic and radial gradients for the other types", () => {
        expect(toGradientCSS(STOPS, { type: "radial" })).toContain("radial-gradient(circle at 50% 50%");
        expect(toGradientCSS(STOPS, { type: "angular", angle: 90 })).toContain("conic-gradient(from 90deg");
    });

    it("composes a diamond gradient from four quadrants", () => {
        const css = toGradientCSS(STOPS, { type: "diamond" });
        expect(css.split("linear-gradient")).toHaveLength(5);
        expect(css).toContain("top left / 50% 50% no-repeat");
    });

    it("puts a 135 degree gradient across the diagonal", () => {
        const { start, end } = getGradientEndpoints(135);

        expect(Math.round(start.x)).toBe(0);
        expect(Math.round(start.y)).toBe(0);
        expect(Math.round(end.x)).toBe(100);
        expect(Math.round(end.y)).toBe(100);
    });

    it("maps a point back to the angle that produced it", () => {
        expect(Math.round(getAngleFromPoint(100, 100))).toBe(135);
        expect(Math.round(getAngleFromPoint(50, 0))).toBe(0);
    });

    it("interpolates the color a new stop starts from", () => {
        expect(getColorAtPosition(STOPS, 50)).toBe("#6142A6");
        expect(getColorAtPosition(STOPS, 0)).toBe("#7F56D9");
    });
});
