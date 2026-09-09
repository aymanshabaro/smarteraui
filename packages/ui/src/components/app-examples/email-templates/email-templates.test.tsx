import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./email-templates.demo";
import { variantsA } from "./variants.a";

describe("Email templates (part A)", () => {
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

    it("exposes the 10 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(10);
    });

    it("renders the primary action and the unsubscribe controls in the hero example", () => {
        const { getByRole } = render(<Demos.EmailTemplateExample />);
        expect(getByRole("link", { name: "Log in" })).toHaveAttribute("href", "/login");
        expect(getByRole("link", { name: "unsubscribe" })).toBeInTheDocument();
        expect(getByRole("link", { name: "manage your email preferences" })).toBeInTheDocument();
    });

    it("announces the verification code as text rather than only as tiles", () => {
        const Variant = variantsA["simple-verification"];
        const { getByText } = render(<Variant />);
        expect(getByText("Your verification code is 3 0 6 6.")).toBeInTheDocument();
    });

    it("keeps every email body inside the 640px email column", () => {
        for (const Variant of Object.values(variantsA)) {
            const { container, unmount } = render(<Variant />);
            expect(container.querySelector("section > div")).toHaveClass("max-w-160");
            unmount();
        }
    });
});
