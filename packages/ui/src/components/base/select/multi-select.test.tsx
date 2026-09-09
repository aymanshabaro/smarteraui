import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import * as Demos from "./multi-select.demo";

describe("MultiSelect", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("shows the selected count and supporting text in the trigger", () => {
        render(<Demos.Default />);
        expect(screen.getByText("2 selected")).toBeInTheDocument();
        expect(screen.getByText("16 users")).toBeInTheDocument();
    });

    it("renders the disabled trigger button as disabled", () => {
        render(<Demos.Disabled />);
        expect(screen.getByText("Select teams").closest("button")).toHaveAttribute("data-disabled");
    });

    it("renders every size in the Sizes demo", () => {
        render(<Demos.Sizes />);
        expect(screen.getAllByText("2 selected")).toHaveLength(3);
    });
});
