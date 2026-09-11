import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { LOGOS } from "../../../utils/demo-assets";
import * as Demos from "./social-proof-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing social proof sections (part A)", () => {
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

    it("exposes the 12 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(12);
    });

    it("renders every placeholder wordmark in the hero example", () => {
        const { getAllByRole } = render(<Demos.SocialProofSectionExample />);
        expect(getAllByRole("img")).toHaveLength(LOGOS.length);
        expect(getAllByRole("img")[0]).toHaveAccessibleName(LOGOS[0].name);
    });

    it("renders the branded sections on the brand section background", () => {
        const Variant = variantsA["social-proof-full-width-brand"];
        const { container } = render(<Variant />);
        expect(container.querySelector("section")).toHaveClass("bg-brand-section");
    });

    it("hides the duplicated marquee tracks from assistive tech", () => {
        const Variant = variantsA["social-proof-full-width-masked"];
        const { container, getAllByRole } = render(<Variant />);

        expect(container.querySelectorAll("[aria-hidden='true']")).toHaveLength(3);
        // Only the one visible track exposes its wordmarks.
        expect(getAllByRole("img")).toHaveLength(10);
    });

    it("pauses the marquee for reduced-motion users", () => {
        const Variant = variantsA["social-proof-full-width-masked"];
        const { container } = render(<Variant />);
        for (const track of container.querySelectorAll(".animate-marquee")) {
            expect(track).toHaveClass("motion-reduce:animate-none");
        }
    });
});
