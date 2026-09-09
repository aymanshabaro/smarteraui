import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./command-menu.demo";

describe("CommandMenu", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("labels the search field and renders every group", () => {
        const { getByRole, getAllByRole } = render(<Demos.Users />);

        expect(getByRole("searchbox", { name: "Search" })).toBeTruthy();
        expect(getAllByRole("group").length).toBe(2);
    });

    it("renders one menu item per action, with its shortcut", () => {
        const { getAllByRole, getByText } = render(<Demos.Actions />);

        expect(getAllByRole("menuitem").length).toBe(9);
        expect(getByText("⌘N")).toBeTruthy();
    });

    it("stacks the supporting text under the label when layout is stacked", () => {
        const { getByRole } = render(<Demos.ActionsStacked />);

        const item = getByRole("menuitem", { name: /Create new project/ });
        expect(item.textContent).toContain("Start from a blank canvas or a template.");
    });

    it("shows the empty state when the query matches nothing", () => {
        const { container, getByText, queryByText } = render(<Demos.EmptyState />);

        // RAC marks an emptied collection with `data-empty` and wraps `renderEmptyState` in a presentational menu item.
        expect(container.querySelector("[role='menu'][data-empty]")).toBeTruthy();
        expect(queryByText("Invite team member")).toBeNull();
        expect(getByText("No results found")).toBeTruthy();
    });

    // The popover examples render through a portal, so they fall outside `container` in the loop above.
    for (const [name, Demo] of Object.entries({
        UsersMenu: Demos.UsersMenu,
        UsersMenuStacked: Demos.UsersMenuStacked,
        IntegrationsMenu: Demos.IntegrationsMenu,
        IntegrationsMenuStacked: Demos.IntegrationsMenuStacked,
    })) {
        it(`${name} opens a popover with no a11y violations`, async () => {
            const { baseElement, getAllByRole } = render(<Demo />);

            const dialog = baseElement.querySelector("[role='dialog']");
            expect(dialog).toBeTruthy();
            expect(getAllByRole("menuitem").length).toBeGreaterThan(0);
            expect(await axe(dialog as HTMLElement)).toHaveNoViolations();
        });
    }
});
