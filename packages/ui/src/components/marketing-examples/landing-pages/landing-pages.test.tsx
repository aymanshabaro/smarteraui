import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./landing-pages.demo";
import { variantsA } from "./variants.a";

describe("Landing pages (part A)", () => {
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

    it("exposes the 20 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(20);
    });

    it("gives every landing page a single level-1 heading", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("closes every landing page with a footer landmark", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { container, unmount } = render(<Variant />);
            expect(container.querySelector("footer"), slug).not.toBeNull();
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
