import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { variantsB } from "./variants.b";

describe("Marketing header sections (part B)", () => {
    for (const [slug, Variant] of Object.entries(variantsB)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes all 25 part B variants", () => {
        expect(Object.keys(variantsB)).toHaveLength(25);
    });

    it("renders the page header headline as an h1", () => {
        const HeaderLeft = variantsB["header-left"];
        const { getByRole } = render(<HeaderLeft />);
        expect(getByRole("heading", { level: 1, name: "About the company" })).toBeInTheDocument();
    });

    it("labels the support-centre search field", () => {
        const HeaderSpaceBetweenSearch = variantsB["header-space-between-search"];
        const { getByRole } = render(<HeaderSpaceBetweenSearch />);
        expect(getByRole("searchbox", { name: "Search" })).toBeInTheDocument();
    });
});
