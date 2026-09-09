import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { TAILWIND_PALETTE, TAILWIND_PALETTE_COLUMNS } from "./color-picker-colors";
import * as Demos from "./color-picker.demo";

describe("Color picker", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("shows the current color as a hex value", () => {
        const { getByRole } = render(<Demos.ColorPicker />);
        expect(getByRole("textbox", { name: "Hex color" })).toHaveValue("#7F56D9");
    });

    it("defaults the format selector to Hex", () => {
        const { getByRole } = render(<Demos.ColorPicker />);
        expect(getByRole("button", { name: /Color format/ })).toHaveTextContent("Hex");
    });

    it("renders a hue and an alpha slider", () => {
        const { getByRole } = render(<Demos.MinimalPicker />);
        expect(getByRole("group", { name: "Hue" })).toBeInTheDocument();
        expect(getByRole("group", { name: "Alpha" })).toBeInTheDocument();
    });

    it("outlines the swatch matching the current color", () => {
        const { getByRole } = render(<Demos.ColorPicker />);
        expect(getByRole("option", { selected: true })).toHaveAttribute("data-key", "#7F56D9FF");
    });

    it("leaves swatch grids unselected when the selection indicator is off", () => {
        const { queryByRole } = render(<Demos.SavedSwatchesMedium />);
        expect(queryByRole("option", { selected: true })).toBeNull();
    });

    it("renders one palette cell per color", () => {
        const { getByRole } = render(<Demos.PalettePicker />);
        expect(getByRole("listbox", { name: "Color palette" }).children).toHaveLength(TAILWIND_PALETTE.length);
    });

    it("keeps the palette a whole number of rows wide", () => {
        expect(TAILWIND_PALETTE.length % TAILWIND_PALETTE_COLUMNS).toBe(0);
    });

    it("formats the hue slider value in degrees", () => {
        const { getByText } = render(<Demos.HueSlider />);
        expect(getByText("259°")).toBeInTheDocument();
    });

    it("formats the transparency slider value as a percentage", () => {
        const { getByText } = render(<Demos.TransparencySlider />);
        expect(getByText("100%")).toBeInTheDocument();
    });
});
