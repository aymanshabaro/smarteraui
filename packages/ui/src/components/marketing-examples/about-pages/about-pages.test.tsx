import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./about-pages.demo";
import { variantsA } from "./variants.a";

/**
 * about-page-03 embeds a map `<iframe>`. axe-core cannot post messages into jsdom frames, so frame
 * traversal is disabled — every rule still runs against the page's own markup.
 */
const axeOptions = { iframes: false } as const;

describe("About pages", () => {
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

    it("wraps every variant in the site chrome", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { container, getByRole, unmount } = render(<Variant />);

            expect(getByRole("navigation", { name: "Main" }), slug).toBeInTheDocument();
            expect(container.querySelector("main"), slug).toBeInTheDocument();
            expect(container.querySelector("footer"), slug).toBeInTheDocument();

            unmount();
        }
    });
});
