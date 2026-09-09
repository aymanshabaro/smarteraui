import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./faq-pages.demo";
import { variantsA } from "./variants.a";

describe("FAQ pages (part A)", () => {
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

    it("frames the hero page with the marketing header and footer", () => {
        const { getByRole } = render(<Demos.FAQPageExample />);

        expect(getByRole("banner")).toBeInTheDocument();
        expect(getByRole("contentinfo")).toBeInTheDocument();
    });

    it("gives every variant exactly one level-1 heading", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("keeps the permanently dark bands on a section-scoped theme override", () => {
        const Variant = variantsA["faq-page-06"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("banner").parentElement).toHaveClass("dark-mode");
    });

    it("opens the first question of the accordion pages", () => {
        const Variant = variantsA["faq-page-10"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("button", { name: "Is there a free trial available?" })).toHaveAttribute("aria-expanded", "true");
    });
});
