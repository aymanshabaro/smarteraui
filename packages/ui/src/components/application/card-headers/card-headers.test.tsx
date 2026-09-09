import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { CardHeader } from "./card-headers";
import * as Demos from "./card-headers.demo";

describe("CardHeader", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the title as a heading", () => {
        const { getByRole } = render(<CardHeader title="Team members" />);
        expect(getByRole("heading", { name: "Team members" })).toBeTruthy();
    });

    it("wraps a plain badge value in a modern gray badge", () => {
        const { getByText } = render(<CardHeader title="Team members" badge="40 users" />);
        expect(getByText("40 users").className).toContain("ring-primary");
    });

    it("renders a badge element as-is", () => {
        const { getByTestId } = render(<CardHeader title="Team members" badge={<span data-testid="custom-badge">New</span>} />);
        expect(getByTestId("custom-badge")).toBeTruthy();
    });

    it("only draws the divider when asked", () => {
        const { container: plain } = render(<CardHeader title="Team members" />);
        expect(plain.firstElementChild?.className).not.toContain("border-b");

        const { container: divided } = render(<CardHeader title="Team members" divider />);
        expect(divided.firstElementChild?.className).toContain("border-b");
    });

    it("applies the size padding", () => {
        const { container } = render(<CardHeader title="Team members" size="sm" />);
        expect(container.firstElementChild?.className).toContain("py-4");
    });
});
