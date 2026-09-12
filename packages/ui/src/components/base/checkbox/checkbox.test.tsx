import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./checkbox.demo";

describe("Checkbox", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("applies the md size classes", () => {
        const { getAllByRole, container } = render(<Demos.Sizes />);
        const checkboxes = getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(2);
        expect(container.querySelectorAll(".size-5").length).toBeGreaterThan(0);
    });

    it("renders the label and hint text", () => {
        const { getByText } = render(<Demos.WithLabelAndHint />);
        expect(getByText("Remember me")).not.toBeNull();
        expect(getByText("Save my login details for next time.")).not.toBeNull();
    });

    it("marks the checkbox as disabled", () => {
        const { getByRole } = render(<Demos.Disabled />);
        expect((getByRole("checkbox") as HTMLInputElement).disabled).toBe(true);
    });

    it("gives a checkbox with a hint an accessible name equal to just the label", () => {
        render(<Demos.WithLabelAndHint />);
        // The hint used to sit inside React Aria's generated `<label>`, so it joined the checkbox's
        // accessible name (e.g. "Remember me Save my login details..."). It must not anymore.
        expect(screen.getByRole("checkbox", { name: "Remember me" })).toBeInTheDocument();
    });

    it("still describes the checkbox with its hint via aria-describedby", () => {
        render(<Demos.WithLabelAndHint />);
        const checkbox = screen.getByRole("checkbox", { name: "Remember me" });
        const describedbyId = checkbox.getAttribute("aria-describedby");
        expect(describedbyId).toBeTruthy();
        expect(document.getElementById(describedbyId!)).toHaveTextContent("Save my login details for next time.");
    });
});
