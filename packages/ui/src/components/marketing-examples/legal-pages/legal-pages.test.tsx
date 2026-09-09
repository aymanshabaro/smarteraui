import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./legal-pages.demo";
import { variantsA } from "./variants.a";

describe("Legal pages (part A)", () => {
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

    it("exposes the 5 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(5);
    });

    it("renders exactly one level-1 heading per variant", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("wraps every variant in the site chrome", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { container, getByRole, unmount } = render(<Variant />);

            expect(getByRole("banner"), slug).toBeInTheDocument();
            expect(container.querySelector("footer"), slug).not.toBeNull();

            unmount();
        }
    });

    it("renders the policy body on every variant", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getByRole, unmount } = render(<Variant />);
            expect(getByRole("heading", { level: 2, name: "What information do we collect?" }), slug).toBeInTheDocument();
            unmount();
        }
    });

    it("uses demo assets rather than external images", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { container, unmount } = render(<Variant />);
            for (const image of container.querySelectorAll("img")) {
                expect(image.getAttribute("src"), slug).not.toMatch(/^https?:\/\//);
            }
            unmount();
        }
    });
});
