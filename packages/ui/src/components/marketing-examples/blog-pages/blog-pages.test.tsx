import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./blog-pages.demo";
import { variantsA } from "./variants.a";

describe("Blog pages", () => {
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

    it("wraps every variant in the site chrome", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { container, getByRole, unmount } = render(<Variant />);

            expect(getByRole("banner"), slug).toBeInTheDocument();
            expect(getByRole("navigation", { name: "Main" }), slug).toBeInTheDocument();
            expect(container.querySelector("footer"), slug).toBeInTheDocument();

            unmount();
        }
    });

    it("gives every variant a paginated article list", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("navigation", { name: "Pagination Navigation" }), slug).not.toHaveLength(0);
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
