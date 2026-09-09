import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./features-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing features sections", () => {
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

    it("exposes all 23 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(23);
    });

    it("renders the section heading and every feature of the hero demo", () => {
        const { getByRole } = render(<Demos.FeaturesSectionExample />);

        expect(getByRole("heading", { level: 2, name: "Beautiful analytics to grow smarter" })).toBeInTheDocument();
        expect(getByRole("heading", { level: 2, name: "Share team inboxes" })).toBeInTheDocument();
        expect(getByRole("heading", { level: 2, name: "Deliver instant answers" })).toBeInTheDocument();
        expect(getByRole("heading", { level: 2, name: "Manage your team with reports" })).toBeInTheDocument();
    });

    it("renders a tablist with the first tab selected", () => {
        const Variant = variantsA["features-tabs-mockup-05"];
        const { getAllByRole, getByRole } = render(<Variant />);

        expect(getByRole("tablist")).toBeInTheDocument();
        expect(getAllByRole("tab")).toHaveLength(3);
        expect(getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true");
    });

    it("renders every integration tile with an accessible name", () => {
        const Variant = variantsA["features-integrations-icons-02"];
        const { getByText } = render(<Variant />);

        expect(getByText("Next.js")).toBeInTheDocument();
        expect(getByText("Perplexity")).toBeInTheDocument();
    });
});
