import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { FeaturesSimpleIcons02 } from "./features-simple-icons-02";
import { FeaturesTabsMockup01 } from "./features-tabs-mockup-01";
import { variantsB } from "./variants.b";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a tab. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("Marketing features sections (part B)", () => {
    for (const [slug, Variant] of Object.entries(variantsB)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes all 23 part B variants", () => {
        expect(Object.keys(variantsB)).toHaveLength(23);
    });

    it("renders every feature in the simple icons grid", () => {
        const { getAllByRole } = render(<FeaturesSimpleIcons02 />);
        expect(getAllByRole("heading", { level: 3 })).toHaveLength(6);
    });

    it("selects the first tab by default and switches on press", async () => {
        const { getByRole } = render(<FeaturesTabsMockup01 />);

        const first = getByRole("tab", { name: /Share team inboxes/ });
        const second = getByRole("tab", { name: /Deliver instant answers/ });

        expect(first).toHaveAttribute("aria-selected", "true");
        expect(first.className).toContain("border-brand");
        expect(second).toHaveAttribute("aria-selected", "false");

        press(second);

        await waitFor(() => expect(second).toHaveAttribute("aria-selected", "true"));
        expect(second.className).toContain("border-brand");
    });
});
