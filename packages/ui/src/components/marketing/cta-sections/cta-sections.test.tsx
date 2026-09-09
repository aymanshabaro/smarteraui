import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./cta-sections.demo";
import { variantsA } from "./variants.a";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a trigger. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("Marketing CTA sections (part A)", () => {
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

    it("exposes the 15 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(15);
    });

    it("renders both CTA actions in the hero example", () => {
        const { getByRole } = render(<Demos.CTASectionExample />);
        expect(getByRole("button", { name: "Get started" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Learn more" })).toBeInTheDocument();
    });

    it("renders the branded sections on the brand section background", () => {
        const Variant = variantsA["cta-simple-left-brand"];
        const { container } = render(<Variant />);
        expect(container.querySelector("section")).toHaveClass("bg-brand-section");
    });

    it("cycles the testimonial carousel with the next control", async () => {
        const Variant = variantsA["cta-split-image-quote-02"];
        const { getByRole, getByText } = render(<Variant />);

        expect(getByText(/saved us thousands of hours/)).toBeInTheDocument();

        press(getByRole("button", { name: "Next review" }));

        await waitFor(() => expect(getByText(/shipped our new marketing site/)).toBeInTheDocument());
    });

    it("wraps the testimonial carousel backwards from the first slide", async () => {
        const Variant = variantsA["cta-split-image-quote-03"];
        const { getByRole, getByText } = render(<Variant />);

        press(getByRole("button", { name: "Previous review" }));

        await waitFor(() => expect(getByText(/design and engineering finally stopped/)).toBeInTheDocument());
    });
});
