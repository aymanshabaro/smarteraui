import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { ToggleChip } from "./toggle-chip";
import * as Demos from "./toggle-chip.demo";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a toggle. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("ToggleChip", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("defaults to unselected", () => {
        render(<ToggleChip>Remote</ToggleChip>);
        expect(screen.getByRole("button", { name: "Remote" })).toHaveAttribute("aria-pressed", "false");
    });

    it("reflects isSelected as aria-pressed", () => {
        render(<ToggleChip defaultSelected>Remote</ToggleChip>);
        expect(screen.getByRole("button", { name: "Remote" })).toHaveAttribute("aria-pressed", "true");
    });

    it("calls onChange with the next selected state when pressed", () => {
        const onChange = vi.fn();
        render(<ToggleChip onChange={onChange}>Remote</ToggleChip>);

        press(screen.getByRole("button", { name: "Remote" }));
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it("applies the size class for the given size prop", () => {
        const { getByRole } = render(<ToggleChip size="sm">Small</ToggleChip>);
        expect(getByRole("button").className.split(" ")).toEqual(expect.arrayContaining(["text-xs"]));
    });

    it("applies the matching badge color palette once selected", () => {
        const { getByRole } = render(
            <ToggleChip color="success" defaultSelected>
                Success
            </ToggleChip>,
        );
        expect(getByRole("button").className).toContain("bg-utility-green-50");
    });

    it("ignores presses while disabled", () => {
        const onChange = vi.fn();
        render(
            <ToggleChip isDisabled onChange={onChange}>
                Unavailable
            </ToggleChip>,
        );

        press(screen.getByRole("button", { name: "Unavailable" }));
        expect(onChange).not.toHaveBeenCalled();
    });
});
