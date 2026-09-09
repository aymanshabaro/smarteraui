import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./metrics-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing metrics sections (part A)", () => {
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

    it("exposes the 16 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(16);
    });

    it("pairs every metric value with its label in a description list", () => {
        const { container, getByText } = render(<Demos.MetricsSectionExample />);

        expect(container.querySelectorAll("dl")).toHaveLength(1);
        expect(container.querySelectorAll("dd")).toHaveLength(3);
        expect(getByText("400+").tagName).toBe("DD");
        expect(getByText("Projects completed").tagName).toBe("DT");
    });

    it("renders the branded sections on the brand section background", () => {
        const Variant = variantsA["metrics-minimal-centered-text-brand"];
        const { container } = render(<Variant />);

        expect(container.querySelector("section")).toHaveClass("bg-brand-section");
    });

    it("links every metric of the accent line variant", () => {
        const Variant = variantsA["metrics-simple-accent-line"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("link", { name: "View projects" })).toHaveAttribute("href", "/projects");
        expect(getByRole("link", { name: "Download now" })).toHaveAttribute("href", "/downloads");
    });

    it("renders both actions at each breakpoint of the with-actions variants", () => {
        const Variant = variantsA["metrics-simple-with-actions-01"];
        const { getAllByRole } = render(<Variant />);

        expect(getAllByRole("button", { name: "Demo" })).toHaveLength(2);
        expect(getAllByRole("button", { name: "Get started" })).toHaveLength(2);
    });

    it("marks the background photo of the card variants as decorative", () => {
        const Variant = variantsA["metrics-image-with-cards-01"];
        const { container } = render(<Variant />);

        const image = container.querySelector("img");
        expect(image).toHaveAttribute("alt", "");
        expect(image?.getAttribute("src")).not.toMatch(/^https?:\/\//);
    });
});
