import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./404-sections.demo";
import { variantsA } from "./variants.a";

describe("404 sections (part A)", () => {
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

    it("exposes the 14 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(14);
    });

    it("renders both recovery actions in the hero example", () => {
        const { getByRole } = render(<Demos.Section404Example />);
        expect(getByRole("button", { name: "Go back" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Take me home" })).toBeInTheDocument();
    });

    it("labels the site search on the search-led variants", () => {
        const Variant = variantsA["not-found-split-image-03"];
        const { getByRole } = render(<Variant />);
        expect(getByRole("searchbox", { name: "Search our site" })).toBeInTheDocument();
    });

    it("uses demo assets rather than external images", () => {
        const Variant = variantsA["not-found-split-image-02"];
        const { container } = render(<Variant />);
        const image = container.querySelector("img");
        expect(image?.getAttribute("src")).toMatch(/^\/demo\//);
        expect(image).toHaveAttribute("alt");
    });
});
