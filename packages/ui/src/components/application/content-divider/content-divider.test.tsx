import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./content-divider.demo";

describe("ContentDivider", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the label content passed as children", () => {
        const { getByText } = render(<Demos.ContentDividerExample />);
        expect(getByText("Notifications")).toBeTruthy();
    });

    it("renders a dual-line divider with a border-y wrapper", () => {
        const { getByText } = render(<Demos.DualLine />);
        const label = getByText("Notifications");
        expect(label.parentElement?.className).toContain("border-y");
    });

    it("renders a background-fill divider with a filled background", () => {
        const { getByText } = render(<Demos.BackgroundFill />);
        const label = getByText("Notifications");
        expect(label.parentElement?.className).toContain("bg-secondary");
    });
});
