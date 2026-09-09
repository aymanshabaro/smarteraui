import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./header-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing header sections (part A)", () => {
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

    it("exposes all 25 part-A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(25);
    });

    it("gives every variant exactly one h1", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("renders the hero example headline and email capture", () => {
        const { getByRole } = render(<Demos.HeaderSectionExample />);

        expect(getByRole("heading", { level: 1, name: "People who care about your growth" })).toBeInTheDocument();
        expect(getByRole("textbox", { name: "Enter your email" })).toBeRequired();
        expect(getByRole("button", { name: "Get started" })).toHaveAttribute("type", "submit");
    });

    it("renders the brand headers on the brand surface", () => {
        const BrandHeader = variantsA["header-space-between-brand"];
        const { container } = render(<BrandHeader />);
        expect(container.querySelector("section")).toHaveClass("bg-brand-section");
    });
});
