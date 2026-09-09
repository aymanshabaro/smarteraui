import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./breadcrumbs.demo";

describe("Breadcrumbs", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("marks the last item of every trail as the current page", () => {
        const { container } = render(<Demos.BreadcrumbsText />);
        const current = container.querySelectorAll('[aria-current="page"]');

        expect(current).toHaveLength(2);
        expect(current[0]?.textContent).toBe("Team");
    });

    it("renders a navigation landmark per trail", () => {
        const { getAllByRole } = render(<Demos.BreadcrumbsText />);

        expect(getAllByRole("navigation")).toHaveLength(2);
    });

    it("applies the button treatment to the item links", () => {
        const { container } = render(<Demos.BreadcrumbsButton />);
        const list = container.querySelector("ol");

        expect(list?.className).toContain("gap-0.5");
        expect(container.querySelector('[aria-current="page"]')?.className).toContain("bg-primary_hover");
    });

    it("renders the requested divider icon between items", () => {
        const { container } = render(<Demos.AccountButtonSlash />);

        // Two dividers for a three item trail — the current item never renders one.
        expect(container.querySelectorAll("li > svg")).toHaveLength(2);
    });
});
