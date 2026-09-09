import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./dashboards-02.demo";
import { variantsA } from "./variants.a";

describe("Dashboards with header navigation (part A)", () => {
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

    it("puts the primary navigation in the header of every variant", () => {
        const Variant = variantsA["dashboard-10"];
        const { getByRole } = render(<Variant />);
        expect(getByRole("navigation", { name: "Main" })).toBeInTheDocument();
        expect(getByRole("navigation", { name: "Secondary" })).toBeInTheDocument();
    });

    it("labels the sales overview toolbar controls", () => {
        const Variant = variantsA["dashboard-10"];
        const { getByRole } = render(<Variant />);
        expect(getByRole("heading", { level: 1, name: "Sales overview" })).toBeInTheDocument();
        expect(getByRole("list", { name: "Recent activity" })).toBeInTheDocument();
    });

    it("labels the deposit ledger of the banking dashboard", () => {
        const Variant = variantsA["dashboard-13"];
        const { getByRole } = render(<Variant />);
        expect(getByRole("list", { name: "Recent deposits" })).toBeInTheDocument();
    });

    it("uses demo assets rather than external images", () => {
        const Variant = variantsA["dashboard-19"];
        const { container } = render(<Variant />);
        for (const image of container.querySelectorAll("img")) {
            expect(image.getAttribute("src")).toMatch(/^\/(demo|flags)\//);
        }
    });
});
