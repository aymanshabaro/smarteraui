import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./contact-sections.demo";
import { variantsA } from "./variants.a";

/**
 * Some variants embed a map `<iframe>`. axe-core cannot post messages into jsdom frames, so frame
 * traversal is disabled — every rule still runs against the section's own markup.
 */
const axeOptions = { iframes: false } as const;

/** React Aria listens for pointer events, so a plain `click` is not enough to press a trigger. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("Marketing contact sections (part A)", () => {
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

    it("exposes the 18 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(18);
    });

    it("renders the required fields of the hero contact form", () => {
        const { getByRole, getByLabelText } = render(<Demos.ContactSectionExample />);

        expect(getByLabelText(/First name/)).toBeRequired();
        expect(getByLabelText(/Email/)).toHaveAttribute("type", "email");
        expect(getByLabelText(/Message/)).toBeRequired();
        expect(getByRole("button", { name: "Send message" })).toHaveAttribute("type", "submit");
    });

    it("renders the branded sections on the brand section background", () => {
        const Variant = variantsA["contact-simple-icons-03-brand"];
        const { container } = render(<Variant />);
        expect(container.querySelector("section")).toHaveClass("bg-brand-section");
    });

    it("switches the store map when another location tab is selected", async () => {
        const Variant = variantsA["contact-features-tabs-map-02"];
        const { getByRole, getByTitle } = render(<Variant />);

        expect(getByTitle("Map of our Melbourne store")).toBeInTheDocument();

        press(getByRole("tab", { name: /Sydney/ }));

        await waitFor(() => expect(getByTitle("Map of our Sydney store")).toBeInTheDocument());
    });
});
