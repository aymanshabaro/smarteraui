import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./tabs.demo";

describe("Tabs", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders every tab item's label", () => {
        const { getByRole } = render(<Demos.TabsExample />);
        expect(getByRole("tab", { name: "My details" })).toBeInTheDocument();
    });

    it("marks the first tab as selected by default", () => {
        const { getByRole } = render(<Demos.ButtonBrandHorizontal />);
        expect(getByRole("tab", { name: "My details" })).toHaveAttribute("aria-selected", "true");
    });
});
