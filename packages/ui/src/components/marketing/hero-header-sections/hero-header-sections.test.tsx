import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./hero-header-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing hero header sections", () => {
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

    it("exposes the 22 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(22);
    });

    it("renders exactly one level-1 heading per variant", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("labels the email capture field on the split image hero", () => {
        const { getByRole } = render(<Demos.HeroHeaderSectionExample />);
        expect(getByRole("textbox", { name: "Enter your email" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Get started" })).toBeInTheDocument();
    });

    it("renders the app store links on the iPhone mockup hero", () => {
        const Variant = variantsA["hero-iphone-mockup-02"];
        const { getByRole } = render(<Variant />);
        expect(getByRole("link", { name: "Download on the App Store" })).toBeInTheDocument();
        expect(getByRole("link", { name: "Get it on Google Play" })).toBeInTheDocument();
    });
});
