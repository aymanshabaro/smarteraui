import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./informational-pages-02.demo";
import { variantsA } from "./variants.a";

describe("Informational pages with header navigation", () => {
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

    it("exposes the 19 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(19);
    });

    it("renders exactly one level-1 heading per variant", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("gives every variant the product header navigation", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("navigation", { name: "Main" }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("renders the trade history table on the hero example", () => {
        const { getByRole } = render(<Demos.InformationalPageWithHeaderNavigationExample />);
        expect(getByRole("grid", { name: "Trades" })).toBeInTheDocument();
        expect(getByRole("heading", { level: 1, name: "Trade history" })).toBeInTheDocument();
    });
});
