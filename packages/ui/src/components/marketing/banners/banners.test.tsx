import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./banners.demo";
import { variantsA } from "./variants.a";

describe("Marketing banners (part A)", () => {
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

    it("exposes the 20 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(20);
    });

    it("gives every banner a labelled dismiss control", () => {
        for (const Variant of Object.values(variantsA)) {
            const { getByRole, unmount } = render(<Variant />);
            expect(getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
            unmount();
        }
    });

    it("renders the email capture form in the hero example", () => {
        const { getByRole } = render(<Demos.BannerExample />);

        const email = getByRole("textbox", { name: "Enter your email" });
        expect(email).toHaveAttribute("type", "email");
        expect(email).toBeRequired();
        expect(getByRole("button", { name: "Subscribe" })).toHaveAttribute("type", "submit");
    });

    it("renders the dual action pair with the primary action last", () => {
        const Variant = variantsA["banner-dual-action-default"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("button", { name: "Decline" })).toHaveClass("bg-primary");
        expect(getByRole("button", { name: "Allow" })).toHaveClass("bg-brand-solid");
    });

    it("puts the branded banners on the brand section background", () => {
        const Variant = variantsA["banner-slim-brand"];
        const { container } = render(<Variant />);

        expect(container.querySelector("section")).toHaveClass("bg-brand-section_subtle");
    });

    it("constrains the full width banners to the container width", () => {
        const Variant = variantsA["banner-single-action-default-full-width"];
        const { container } = render(<Variant />);

        expect(container.querySelector("section > div")).toHaveClass("max-w-container");
    });

    it("renders a deterministic countdown readout", () => {
        const Variant = variantsA["banner-countdown-default"];
        const { getByText } = render(<Variant />);

        expect(getByText("8")).toBeInTheDocument();
        expect(getByText("16")).toBeInTheDocument();
        expect(getByText("24")).toBeInTheDocument();
    });
});
