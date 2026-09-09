import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./blog-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing blog sections (part A)", () => {
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

    it("exposes the 24 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(24);
    });

    it("renders the featured post and the newsletter card in the hero example", () => {
        const { getAllByRole, getByRole } = render(<Demos.BlogSectionExample />);

        expect(getAllByRole("heading", { name: "Resources and insights" })[0]).toBeInTheDocument();
        expect(getByRole("tab", { name: "View all", selected: true })).toBeInTheDocument();
    });

    it("labels every blog card image with its post title", () => {
        const Variant = variantsA["blog-section-simple-center-aligned-01"];
        const { getByAltText } = render(<Variant />);

        expect(getByAltText("UX review presentations")).toBeInTheDocument();
        expect(getByAltText("Building your API stack")).toBeInTheDocument();
    });

    it("gives the carousel controls accessible names", () => {
        const Variant = variantsA["blog-section-carousel-layout-02"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("button", { name: "Previous slide" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Next slide" })).toBeInTheDocument();
    });
});
