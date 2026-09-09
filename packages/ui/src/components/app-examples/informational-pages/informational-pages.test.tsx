import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./informational-pages.demo";
import { variantsA } from "./variants.a";

describe("Informational pages", () => {
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

    it("renders a sidebar navigation landmark on every variant", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("navigation").length, slug).toBeGreaterThan(0);
            unmount();
        }
    });

    it("renders exactly one level-1 heading on the profile and search variants", () => {
        for (const slug of ["informational-15", "informational-16", "informational-17", "informational-18", "informational-19"] as const) {
            const Variant = variantsA[slug];
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });
});
