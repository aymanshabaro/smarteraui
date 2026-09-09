import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./careers-sections.demo";
import { variantsA } from "./variants.a";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a trigger. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("Marketing careers sections (part A)", () => {
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

    it("lists every open position in the hero example", () => {
        const { getAllByRole, getByRole } = render(<Demos.CareersSectionExample />);
        expect(getByRole("heading", { level: 2, name: "Open positions" })).toBeInTheDocument();
        expect(getAllByRole("heading", { level: 3 })).toHaveLength(5);
    });

    it("renders the branded sections on the brand section background", () => {
        const Variant = variantsA["careers-simple-01-brand"];
        const { container } = render(<Variant />);
        expect(container.querySelector("section")).toHaveClass("bg-brand-section");
    });

    it("filters the card 01 board down to the selected department tab", async () => {
        const Variant = variantsA["careers-card-01"];
        const { getAllByRole, getByRole, queryByRole } = render(<Variant />);

        expect(getAllByRole("heading", { level: 3 })).toHaveLength(5);

        press(getByRole("tab", { name: "Design" }));

        await waitFor(() => expect(getAllByRole("heading", { level: 3 })).toHaveLength(1));
        expect(queryByRole("heading", { level: 3, name: "Account Executive" })).not.toBeInTheDocument();
    });

    it("keeps the card 01 department tabs and the mobile select in sync", async () => {
        const Variant = variantsA["careers-card-01"];
        const { getAllByRole, getByRole } = render(<Variant />);

        fireEvent.change(getByRole("combobox"), { target: { value: "sales" } });

        await waitFor(() => expect(getAllByRole("heading", { level: 3 })).toHaveLength(1));
        expect(getByRole("tab", { name: "Sales" })).toHaveAttribute("aria-selected", "true");
    });

    it("groups the card 04 board by department", () => {
        const Variant = variantsA["careers-card-04"];
        const { getByRole } = render(<Variant />);

        expect(getByRole("heading", { level: 2, name: "Design" })).toBeInTheDocument();
        expect(getByRole("heading", { level: 2, name: "Software Development" })).toBeInTheDocument();
        expect(getByRole("heading", { level: 3, name: "Backend Developer" })).toBeInTheDocument();
    });
});
