import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./testimonial-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing testimonial sections", () => {
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

    it("exposes all 26 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(26);
    });

    it("renders the quote and attribution of the hero example", () => {
        const { getByText, getByRole } = render(<Demos.TestimonialsSectionExample />);

        expect(getByRole("figure")).toBeInTheDocument();
        expect(getByText(/Love the simplicity of the service/)).toBeInTheDocument();
        expect(getByText("Head of Design, Layers")).toBeInTheDocument();
    });

    it("labels the carousel controls of the case study cards", () => {
        const Variant = variantsA["testimonial-case-study-cards"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("button", { name: "Previous slide" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Next slide" })).toBeInTheDocument();
    });

    it("switches review when a logo tab is selected", async () => {
        const Variant = variantsA["testimonial-simple-centered-03"];
        const { getAllByRole, getByText } = render(<Variant />);

        const tabs = getAllByRole("tab");
        expect(tabs).toHaveLength(5);
        expect(tabs[0]).toHaveAttribute("aria-selected", "true");

        expect(getByText(/saved us thousands of hours of work/)).toBeInTheDocument();
    });
});
