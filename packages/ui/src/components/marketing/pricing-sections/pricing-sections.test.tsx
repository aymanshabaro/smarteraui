import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./pricing-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing pricing sections (part A)", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    for (const [slug, Variant] of Object.entries(variantsA)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes the 22 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(22);
    });

    it("renders all three plans in the hero example", () => {
        const { getAllByRole, getByText } = render(<Demos.PricingSectionExample />);

        expect(getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual(["Basic plan", "Business plan", "Enterprise plan"]);
        expect(getByText("$40/mth")).toBeInTheDocument();
    });

    it("puts the billing-period switch on a tab list", () => {
        const Variant = variantsA["pricing-simple-dual-check-item"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("tablist", { name: "Billing period" })).toBeInTheDocument();
        expect(getByRole("tab", { name: /Monthly billing/ })).toHaveAttribute("aria-selected", "true");
    });

    it("scopes the dark-badge header to the brand section background", () => {
        const Variant = variantsA["pricing-primary-dark-badge"];
        const { container } = render(<Variant />);

        expect(container.querySelector(".bg-brand-section")).toBeInTheDocument();
    });

    it("labels every comparison-table cell for screen readers", () => {
        const Variant = variantsA["pricing-large-table-01"];
        const { getAllByText } = render(<Variant />);

        expect(getAllByText("Not included in Basic").length).toBeGreaterThan(0);
        expect(getAllByText("Included in Enterprise").length).toBeGreaterThan(0);
    });
});
