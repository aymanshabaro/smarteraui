import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./header-navigation.demo";

describe("Header navigations", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders every primary nav item", () => {
        const { getAllByRole } = render(<Demos.Simple />);
        const labels = ["Home", "Dashboard", "Projects", "Tasks", "Reporting", "Users"];
        for (const label of labels) {
            expect(getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
        }
    });

    it("marks the active item with aria-current", () => {
        const { getAllByRole } = render(<Demos.Simple />);
        const [dashboard] = getAllByRole("link", { name: "Dashboard" });
        expect(dashboard).toHaveAttribute("aria-current", "page");
    });

    it("renders the secondary nav when the active item has sub-items", () => {
        const { getAllByRole } = render(<Demos.DualTier />);
        expect(getAllByRole("link", { name: "Saved reports" }).length).toBeGreaterThan(0);
    });
});
