import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./faq-sections.demo";
import { variantsA } from "./variants.a";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a trigger. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("Marketing FAQ sections (part A)", () => {
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

    it("exposes the 16 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(16);
    });

    it("renders every question in the hero example", () => {
        const { getByRole, getByText } = render(<Demos.FAQSectionExample />);
        expect(getByRole("heading", { level: 2, name: "Frequently asked questions" })).toBeInTheDocument();
        expect(getByText("How does billing work?")).toBeInTheDocument();
        expect(getByRole("button", { name: "Get in touch" })).toBeInTheDocument();
    });

    it("renders the branded sections on the brand section background", () => {
        const Variant = variantsA["faq-simple-02-brand"];
        const { container } = render(<Variant />);
        expect(container.querySelector("section")).toHaveClass("bg-brand-section");
    });

    it("opens the first accordion item by default and collapses it on press", async () => {
        const Variant = variantsA["faq-accordion-01"];
        const { getByRole } = render(<Variant />);

        const trigger = getByRole("button", { name: "Is there a free trial available?" });
        expect(trigger).toHaveAttribute("aria-expanded", "true");

        press(trigger);

        await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
    });

    it("keeps only one accordion item expanded at a time", async () => {
        const Variant = variantsA["faq-accordion-02"];
        const { getByRole } = render(<Variant />);

        const first = getByRole("button", { name: "Is there a free trial available?" });
        const second = getByRole("button", { name: "Can I change my plan later?" });

        press(second);

        await waitFor(() => expect(second).toHaveAttribute("aria-expanded", "true"));
        expect(first).toHaveAttribute("aria-expanded", "false");
    });
});
