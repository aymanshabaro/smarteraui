import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./image-picker.demo";

describe("Image picker", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("shows the default fill mode label", () => {
        const { getByText } = render(<Demos.ImagePickerExample />);
        expect(getByText("Fill")).toBeInTheDocument();
    });

    it("renders one slider per adjustment", () => {
        const { getAllByRole } = render(<Demos.ImagePickerExample />);
        expect(getAllByRole("slider")).toHaveLength(7);
    });

    it("exposes a rotate button labelled for assistive tech", () => {
        const { getByRole } = render(<Demos.ImagePickerExample />);
        expect(getByRole("button", { name: "Rotate image" })).toBeInTheDocument();
    });
});
