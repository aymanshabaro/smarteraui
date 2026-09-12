import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Button } from "../buttons/button";
import { Popover } from "./popover";
import * as Demos from "./popover.demo";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a trigger. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("Popover", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("is closed until the trigger is pressed", async () => {
        render(
            <Popover trigger={<Button>Open</Button>} aria-label="More info">
                <p>Popover content</p>
            </Popover>,
        );

        expect(screen.queryByRole("dialog")).toBeNull();

        press(screen.getByRole("button", { name: "Open" }));
        await waitFor(() => expect(screen.getByRole("dialog", { name: "More info" })).toBeInTheDocument());
    });

    it("closes on Escape", async () => {
        render(
            <Popover trigger={<Button>Open</Button>} aria-label="More info">
                <p>Popover content</p>
            </Popover>,
        );

        press(screen.getByRole("button", { name: "Open" }));
        const dialog = await waitFor(() => screen.getByRole("dialog"));

        // Dispatched on the dialog itself rather than `document.activeElement`: React Aria's
        // autofocus runs on a `requestAnimationFrame`, which is not guaranteed to have moved
        // focus into the popover synchronously after opening. Escape is handled by an ancestor
        // `onKeyDown`, so dispatching on the dialog is equivalent to a real Escape press from
        // anywhere inside it.
        fireEvent.keyDown(dialog, { key: "Escape" });
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    });

    it("closes on outside press", async () => {
        render(
            <div>
                <Popover trigger={<Button>Open</Button>} aria-label="More info">
                    <p>Popover content</p>
                </Popover>
                <button type="button">Outside</button>
            </div>,
        );

        press(screen.getByRole("button", { name: "Open" }));
        await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

        // This jsdom environment has no global `PointerEvent`, so React Aria's outside-press
        // detection falls back to its `mousedown`/`mouseup` (rather than `pointerdown`/`pointerup`)
        // path, which listens on the document and does not depend on hit-testing.
        const outsideButton = screen.getByRole("button", { name: "Outside" });
        fireEvent.mouseDown(outsideButton, { button: 0 });
        fireEvent.mouseUp(outsideButton, { button: 0 });

        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    });

    it("does not bind the popover's width to the trigger", async () => {
        render(
            <Popover trigger={<Button>Open</Button>} aria-label="More info">
                <p>Popover content</p>
            </Popover>,
        );

        press(screen.getByRole("button", { name: "Open" }));
        const dialog = await waitFor(() => screen.getByRole("dialog"));
        expect(dialog.parentElement?.className ?? "").not.toContain("trigger-width");
        expect(dialog.parentElement?.className ?? "").toContain("w-max");
    });
});
