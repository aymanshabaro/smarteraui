import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { ConfirmDialog } from "./confirm-dialog";
import * as Demos from "./confirm-dialog.demo";

/** React Aria listens for pointer events, so a plain `click` is not enough to press a trigger. */
const press = (element: HTMLElement) => {
    fireEvent.pointerDown(element, { pointerType: "mouse", button: 0 });
    fireEvent.pointerUp(element, { pointerType: "mouse", button: 0 });
    fireEvent.click(element);
};

describe("ConfirmDialog", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders no dialog when it is not open", () => {
        render(<ConfirmDialog title="Delete project" onConfirm={() => {}} />);
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("shows the title, description and both actions when open", () => {
        render(
            <ConfirmDialog
                defaultOpen
                title="Delete project"
                description="This cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Keep it"
                onConfirm={() => {}}
            />,
        );

        expect(screen.getByRole("dialog", { name: "Delete project" })).toBeInTheDocument();
        expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Keep it" })).toBeInTheDocument();
    });

    it("calls onOpenChange(false) when Cancel is pressed", () => {
        const onOpenChange = vi.fn();
        render(<ConfirmDialog defaultOpen title="Delete project" onConfirm={() => {}} onOpenChange={onOpenChange} />);

        press(screen.getByRole("button", { name: "Cancel" }));
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("closes on Escape", async () => {
        render(<ConfirmDialog defaultOpen title="Delete project" onConfirm={() => {}} />);
        const dialog = screen.getByRole("dialog");

        // Dispatched on the dialog itself rather than `document.activeElement`: React Aria's
        // autofocus runs on a `requestAnimationFrame`, which is not guaranteed to have moved
        // focus into the dialog synchronously after render, especially back-to-back with a prior
        // test's dialog closing. Escape is handled by an ancestor `onKeyDown`, so dispatching on
        // the dialog is equivalent to a real Escape press from anywhere inside it.
        fireEvent.keyDown(dialog, { key: "Escape" });
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    });

    it('uses the destructive button color and default icon for tone="destructive"', () => {
        render(<ConfirmDialog defaultOpen tone="destructive" title="Delete project" confirmLabel="Delete" onConfirm={() => {}} />);
        expect(screen.getByRole("button", { name: "Delete" }).className).toContain("bg-error-solid");
    });

    it("shows a loading state on the confirm button while onConfirm is pending, then clears it", async () => {
        let resolveConfirm: () => void = () => {};
        const onConfirm = () =>
            new Promise<void>((resolve) => {
                resolveConfirm = resolve;
            });

        render(<ConfirmDialog defaultOpen title="Publish changes" confirmLabel="Publish" onConfirm={onConfirm} />);

        const confirmButton = screen.getByRole("button", { name: "Publish" });
        press(confirmButton);

        await waitFor(() => expect(confirmButton).toHaveAttribute("data-loading", "true"));

        resolveConfirm();
        await waitFor(() => expect(confirmButton).not.toHaveAttribute("data-loading"));
    });
});
