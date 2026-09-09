import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { FilterBar } from "./filter-bar";
import * as Demos from "./filter-bars.demo";

describe("FilterBar", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("pushes the actions to the end of the bar", () => {
        const { container } = render(
            <FilterBar>
                <FilterBar.Actions>
                    <span>action</span>
                </FilterBar.Actions>
            </FilterBar>,
        );

        expect(container.firstElementChild?.className).toContain("flex-wrap");
        expect(container.firstElementChild?.firstElementChild?.className).toContain("ms-auto");
    });

    it("renders the applied filter count on the filter button and marks it active", () => {
        render(<FilterBar.FilterButton count={3} />);

        const button = screen.getByRole("button", { name: /Filters/ });
        expect(button.className.split(" ")).toContain("bg-primary_hover");
        expect(screen.getByText("3")).toBeTruthy();
    });

    it("omits the count badge and the active background when no filters are applied", () => {
        render(<FilterBar.FilterButton />);

        // `hover:bg-primary_hover` is always present, so compare whole class names rather than substrings.
        expect(screen.getByRole("button", { name: "Filters" }).className.split(" ")).not.toContain("bg-primary_hover");
    });

    it("labels the icon-only filter button", () => {
        render(<FilterBar.FilterIconButton />);

        expect(screen.getByRole("button", { name: "Filters" })).toBeTruthy();
    });

    it("calls onRemove when a filter row's remove button is pressed", () => {
        let removed = 0;
        render(
            <FilterBar.FilterRow onRemove={() => (removed += 1)}>
                <span>row</span>
            </FilterBar.FilterRow>,
        );

        fireEvent.click(screen.getByRole("button", { name: "Remove filter" }));
        expect(removed).toBe(1);
    });

    it("renders a filter row without a remove button when onRemove is omitted", () => {
        render(
            <FilterBar.FilterRow>
                <span>row</span>
            </FilterBar.FilterRow>,
        );

        expect(screen.queryByRole("button", { name: "Remove filter" })).toBeNull();
    });

    it("drops a filter row from the advanced filter bar when its remove button is pressed", () => {
        render(<Demos.AdvancedFilterActive />);

        expect(screen.getAllByRole("button", { name: "Remove filter" })).toHaveLength(3);

        fireEvent.click(screen.getAllByRole("button", { name: "Remove filter" })[0] as HTMLElement);

        expect(screen.getAllByRole("button", { name: "Remove filter" })).toHaveLength(2);
    });

    it("opens the filter dropdown panel from its trigger", async () => {
        render(<Demos.FilterDropdownActive />);

        expect(screen.queryByRole("dialog")).toBeNull();

        fireEvent.click(screen.getByRole("button", { name: /Filters/ }));

        expect(await screen.findByRole("dialog", { name: "Filters" })).toBeTruthy();
    });
});
