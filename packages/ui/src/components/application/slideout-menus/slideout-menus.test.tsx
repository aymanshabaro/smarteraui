import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./slideout-menus.demo";

describe("Drawers", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("opens with the drawer already visible (defaultOpen) and exposes a dialog", () => {
        render(<Demos.DrawerExample />);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("renders the drawer title and closes the dialog when the header close button is pressed", () => {
        render(<Demos.PlaceholderMenu />);
        expect(screen.getByText("Placeholder menu")).toBeInTheDocument();

        // Both the header's icon-only close button and the footer's "Close" button share the
        // accessible name "Close"; the header one renders first.
        const closeButtons = screen.getAllByRole("button", { name: "Close" });
        fireEvent.click(closeButtons[0] as HTMLElement);

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders one list item per team member in the team members menu", () => {
        render(<Demos.TeamMembersMenu />);
        expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });
});
