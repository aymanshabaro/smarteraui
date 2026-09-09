import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./team-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing team sections", () => {
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

    it("exposes all 14 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(14);
    });

    it("renders one heading per team member in the hero example", () => {
        const { getByRole, getAllByRole } = render(<Demos.TeamSectionExample />);

        expect(getByRole("heading", { level: 2, name: "Meet our team" })).toBeInTheDocument();
        expect(getAllByRole("heading", { level: 3 })).toHaveLength(8);
    });

    it("gives every social link an accessible name that names the member", () => {
        const Variant = variantsA["team-section-simple-02"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("link", { name: "Olivia Rhye on LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/");
    });

    it("labels the carousel controls of the image card carousel", () => {
        const Variant = variantsA["team-section-image-card-04"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("button", { name: "Previous slide" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Next slide" })).toBeInTheDocument();
    });
});
