import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./table.demo";

describe("Table", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders a grid with a row for every team member", () => {
        const { getAllByRole } = render(<Demos.TableExample />);
        // One header row plus ten data rows.
        expect(getAllByRole("row").length).toBe(11);
    });

    it("applies the md row height by default and the sm row height at size='sm'", () => {
        const { container: md } = render(<Demos.TableExample />);
        expect(md.querySelector("tbody tr")?.className).toContain("h-18");

        const { container: sm } = render(<Demos.TableSmallSizeExample />);
        expect(sm.querySelector("tbody tr")?.className).toContain("h-14");
    });

    it("renders a selection checkbox column when selectionMode is multiple", () => {
        const { getAllByRole } = render(<Demos.TableExample />);
        expect(getAllByRole("checkbox").length).toBeGreaterThan(1);
    });

    it("renders alternating row fills for the alternating variants", () => {
        const { container } = render(<Demos.AlternatingFills01 />);
        expect(container.querySelector("tbody tr")?.className).toContain("odd:bg-secondary");
    });

    it("renders the empty state copy instead of rows", () => {
        const { getByText, queryByRole } = render(<Demos.SomethingWentWrong />);
        expect(getByText("Something went wrong...")).toBeTruthy();
        expect(queryByRole("grid")).toBeNull();
    });
});
