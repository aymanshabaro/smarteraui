import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Alert } from "./alerts";
import * as Demos from "./alerts.demo";

describe("Alerts", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the title and description inside an alert role", () => {
        const { getByRole, getByText } = render(<Alert title="Payment failed" description="Update your billing details." />);
        expect(getByRole("alert")).toBeTruthy();
        expect(getByText("Payment failed")).toBeTruthy();
        expect(getByText("Update your billing details.")).toBeTruthy();
    });

    it("applies the full-width layout classes", () => {
        const { getByRole } = render(<Alert layout="full-width" title="Heads up" />);
        expect(getByRole("alert").className).toContain("border-b");
    });

    it("hides the close button unless the alert is dismissable", () => {
        const { queryByRole, rerender } = render(<Alert title="Heads up" />);
        expect(queryByRole("button", { name: "Dismiss" })).toBeNull();

        rerender(<Alert isDismissable title="Heads up" />);
        expect(queryByRole("button", { name: "Dismiss" })).toBeTruthy();
    });

    it("calls onClose when the close button is pressed", () => {
        const onClose = vi.fn();
        const { getByRole } = render(<Alert isDismissable title="Heads up" onClose={onClose} />);

        getByRole("button", { name: "Dismiss" }).click();

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
