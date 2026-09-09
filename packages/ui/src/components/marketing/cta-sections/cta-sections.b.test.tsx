import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { variantsB } from "./variants.b";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a trigger. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("Marketing CTA sections (part B)", () => {
    for (const [slug, Variant] of Object.entries(variantsB)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes the 15 part B variants", () => {
        expect(Object.keys(variantsB)).toHaveLength(15);
    });

    it("renders the branded sections on the brand section background", () => {
        for (const slug of ["cta-simple-centered-brand", "cta-simple-logos-01-brand", "cta-simple-logos-02-brand", "cta-abstract-images-brand"] as const) {
            const Variant = variantsB[slug];
            const { container } = render(<Variant />);
            expect(container.querySelector("section")).toHaveClass("bg-brand-section");
        }
    });

    it("nests the brand panel inside a plain section for the vertical brand card", () => {
        const Variant = variantsB["cta-card-vertical-brand"];
        const { container } = render(<Variant />);
        expect(container.querySelector("section")).toHaveClass("bg-primary");
        expect(container.querySelector(".bg-brand-section")).toBeInTheDocument();
    });

    it("renders both app-store badges as links in the phone mockup CTA", () => {
        const Variant = variantsB["cta-iphone-mockup-03"];
        const { getByRole } = render(<Variant />);
        expect(getByRole("link", { name: "Download on the App Store" })).toBeInTheDocument();
        expect(getByRole("link", { name: "Get it on Google Play" })).toBeInTheDocument();
    });

    it("hides the decorative collage tiles from assistive tech", () => {
        const Variant = variantsB["cta-abstract-images"];
        const { container } = render(<Variant />);
        const tiles = container.querySelectorAll("img[alt='']");
        expect(tiles).toHaveLength(5);
    });

    it("cycles the testimonial carousel with the next control", async () => {
        const Variant = variantsB["cta-split-image-quote-01"];
        const { getByRole, getByText } = render(<Variant />);

        expect(getByText(/saved us thousands of hours/)).toBeInTheDocument();

        press(getByRole("button", { name: "Next review" }));

        await waitFor(() => expect(getByText(/starts from a component that already matches/)).toBeInTheDocument());
    });

    it("wraps the testimonial carousel backwards from the first slide", async () => {
        const Variant = variantsB["cta-split-image-quote-04"];
        const { getByRole, getByText } = render(<Variant />);

        press(getByRole("button", { name: "Previous review" }));

        await waitFor(() => expect(getByText(/used to take a fortnight/)).toBeInTheDocument());
    });
});
