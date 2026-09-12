import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import * as Demos from "./select.demo";

describe("Select", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the placeholder when nothing is selected", () => {
        render(<Demos.Default />);
        expect(screen.getByText("Select team member")).toBeInTheDocument();
    });

    it("renders the disabled trigger button as disabled", () => {
        render(<Demos.Disabled />);
        expect(screen.getByText("Select team member").closest("button")).toHaveAttribute("data-disabled");
    });

    it("renders every size in the Sizes demo", () => {
        render(<Demos.Sizes />);
        expect(screen.getAllByText("Select team member")).toHaveLength(3);
    });

    it("gives the trigger an accessible name equal to just the label, not label + value", () => {
        render(<Demos.Default />);
        // `Demos.Default` renders `label="Team member"` and a value of "Select team member" — the
        // trigger's accessible name must be exactly the label, not React Aria's default
        // "value, label" (or "label, value") concatenation.
        expect(screen.getByRole("button", { name: "Team member *" })).toBeInTheDocument();
    });
});
