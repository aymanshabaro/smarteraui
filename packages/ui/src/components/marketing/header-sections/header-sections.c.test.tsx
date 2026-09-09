import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { variantsC } from "./variants.c";

describe("Marketing header sections (part C)", () => {
    for (const [slug, Variant] of Object.entries(variantsC)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes all 24 part C variants", () => {
        expect(Object.keys(variantsC)).toHaveLength(24);
    });

    it("renders the eyebrow, heading and supporting copy of a simple header", () => {
        const HeaderCentered = variantsC["header-centered"];
        const { getByRole, getByText } = render(<HeaderCentered />);

        expect(getByText("About us")).toBeInTheDocument();
        expect(getByRole("heading", { level: 1, name: "About the company" })).toBeInTheDocument();
    });

    it("marks the email field as required and labels it", () => {
        const HeaderCenteredEmail = variantsC["header-centered-email"];
        const { getByLabelText } = render(<HeaderCenteredEmail />);

        const input = getByLabelText("Enter your email");
        expect(input).toHaveAttribute("type", "email");
        expect(input).toBeRequired();
    });

    it("selects the monthly billing tab by default", () => {
        const HeaderSpaceBetweenTabs = variantsC["header-space-between-tabs"];
        const { getByRole } = render(<HeaderSpaceBetweenTabs />);

        expect(getByRole("tab", { name: "Monthly billing" })).toHaveAttribute("aria-selected", "true");
        expect(getByRole("tab", { name: "Annual billing" })).toHaveAttribute("aria-selected", "false");
    });

    it("ships no external image URLs in a variant that renders imagery", () => {
        const HeroSplitImage03 = variantsC["hero-split-image-03"];
        const { container } = render(<HeroSplitImage03 />);

        for (const image of container.querySelectorAll("img")) {
            expect(image.getAttribute("src")).not.toMatch(/^https?:\/\//);
        }
    });
});
