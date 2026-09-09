import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./header-navigations.demo";
import { variants } from "./variants";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a trigger. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("Marketing header navigations", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    for (const [slug, Variant] of Object.entries(variants)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes all 20 variants", () => {
        expect(Object.keys(variants)).toHaveLength(20);
    });

    it("renders the primary nav entries", () => {
        const { getByRole } = render(<Demos.HeaderNavigationExample />);
        expect(getByRole("button", { name: "Products" })).toBeInTheDocument();
        expect(getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    });

    it("opens a dropdown panel and keeps it accessible", async () => {
        const { getByRole, container } = render(<Demos.HeaderNavigationExample />);

        const trigger = getByRole("button", { name: "Resources" });
        expect(trigger).toHaveAttribute("aria-expanded", "false");

        press(trigger);

        await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));
        expect(getByRole("link", { name: /Customer stories/ })).toBeInTheDocument();
        expect(await axe(container)).toHaveNoViolations();
    });

    it("closes the dropdown panel on Escape", async () => {
        const { getByRole } = render(<Demos.HeaderNavigationExample />);

        const trigger = getByRole("button", { name: "Resources" });
        press(trigger);
        await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "true"));

        fireEvent.keyDown(document.activeElement ?? document.body, { key: "Escape" });
        await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", "false"));
    });
});
