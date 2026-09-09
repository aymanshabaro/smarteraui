import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./content-rich-text-sections.demo";
import { variantsA } from "./variants.a";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a trigger. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("Marketing content rich text sections (part A)", () => {
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

    it("exposes the 22 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(22);
    });

    it("renders the hero example headline and share actions", () => {
        const { getByRole } = render(<Demos.ContentRichTextSectionExample />);

        expect(getByRole("heading", { level: 1, name: "UX review presentations" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Copy link" })).toBeInTheDocument();
    });

    it("renders the branded header on the brand section background", () => {
        const Variant = variantsA["content-large-image-04"];
        const { container } = render(<Variant />);

        expect(container.querySelector(".bg-brand-section")).toBeInTheDocument();
    });

    it("switches between the legal and plain-language policy versions", async () => {
        const Variant = variantsA["content-simple"];
        const { getByRole, getByText, queryByText } = render(<Variant />);

        expect(getByText("What information do we collect?")).toBeInTheDocument();

        press(getByRole("tab", { name: "Simple version" }));

        await waitFor(() => expect(getByText("What we collect")).toBeInTheDocument());
        expect(queryByText("What information do we collect?")).not.toBeInTheDocument();
    });

    it("labels the newsletter subscription field on the large image variant", () => {
        const Variant = variantsA["content-large-image-03"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("textbox", { name: "Enter your email" })).toBeInTheDocument();
    });
});
