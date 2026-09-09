import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./contact-pages.demo";
import { variantsA } from "./variants.a";

/**
 * Some pages embed a map `<iframe>`. axe-core cannot post messages into jsdom frames, so frame
 * traversal is disabled — every rule still runs against the page's own markup.
 */
const axeOptions = { iframes: false } as const;

describe("Contact pages (part A)", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container, axeOptions)).toHaveNoViolations();
        });
    }

    for (const [slug, Variant] of Object.entries(variantsA)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container, axeOptions)).toHaveNoViolations();
        });
    }

    it("exposes the 10 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(10);
    });

    it("frames the hero page with the marketing header and footer", () => {
        const { getByRole } = render(<Demos.ContactPageExample />);

        expect(getByRole("banner")).toBeInTheDocument();
        expect(getByRole("contentinfo")).toBeInTheDocument();
        expect(getByRole("button", { name: "Send message" })).toHaveAttribute("type", "submit");
    });

    it("renders the standalone contact panel without page chrome", () => {
        const Variant = variantsA["contact-page-10"];
        const { queryByRole } = render(<Variant />);

        expect(queryByRole("banner")).not.toBeInTheDocument();
        expect(queryByRole("contentinfo")).not.toBeInTheDocument();
    });

    it("keeps the permanently dark footers on a section-scoped theme override", () => {
        const Variant = variantsA["contact-page-03"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("contentinfo").parentElement).toHaveClass("dark-mode");
    });
});
