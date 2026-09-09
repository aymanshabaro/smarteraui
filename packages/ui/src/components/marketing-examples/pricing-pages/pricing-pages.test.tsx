import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./pricing-pages.demo";
import { variantsA } from "./variants.a";

describe("Pricing pages (part A)", () => {
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
        const { getByRole } = render(<Demos.PricingPageExample />);

        expect(getByRole("banner")).toBeInTheDocument();
        expect(getByRole("contentinfo")).toBeInTheDocument();
    });

    it("keeps the permanently dark footers on a section-scoped theme override", () => {
        const Variant = variantsA["pricing-page-04"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("contentinfo").parentElement).toHaveClass("dark-mode");
    });
});
