import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./footers.demo";
import { variantsA } from "./variants.a";

describe("Marketing footers (part A)", () => {
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

    it("exposes all 20 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(20);
    });

    it("renders the footer example as a contentinfo landmark with navigation links", () => {
        const { getByRole } = render(<Demos.FooterExample />);
        expect(getByRole("contentinfo")).toBeInTheDocument();
        expect(getByRole("link", { name: "Overview" })).toBeInTheDocument();
        expect(getByRole("link", { name: /Solutions/ })).toBeInTheDocument();
    });

    it("labels the newsletter input and its submit button", () => {
        const Newsletter = variantsA["footer-small-04-brand"];
        const { getByRole } = render(<Newsletter />);
        expect(getByRole("textbox", { name: "Enter your email" })).toBeRequired();
        expect(getByRole("button", { name: "Subscribe" })).toHaveAttribute("type", "submit");
    });

    it("gives every social icon link an accessible name", () => {
        const Social = variantsA["footer-small-03"];
        const { getAllByRole } = render(<Social />);
        expect(getAllByRole("link", { name: "Dribbble" })).toHaveLength(1);
    });
});
