import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Table, TableCard } from "./table";
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

    it("static usage: takes its accessible name from an explicit aria-label and renders no checkbox column when selectionMode is omitted", () => {
        const { getByRole, queryAllByRole } = render(<Demos.StaticUsage />);
        expect(getByRole("grid", { name: "Team members" })).toBeInTheDocument();
        expect(queryAllByRole("checkbox")).toHaveLength(0);
    });

    it("static usage: gives every row column data via its own id", () => {
        const { getAllByRole } = render(<Demos.StaticUsage />);
        // One header row plus three static data rows.
        expect(getAllByRole("row")).toHaveLength(4);
    });

    it("names an icon-only column via a visually hidden label", () => {
        const { getByRole } = render(<Demos.VisuallyHiddenColumnLabel />);
        expect(getByRole("columnheader", { name: "Actions" })).toBeInTheDocument();
    });

    it("wires up a Table.Row's href as a navigable row (stays role=row, no <a>)", () => {
        const { getByRole } = render(
            <TableCard.Root>
                <Table aria-label="Projects">
                    <Table.Header>
                        <Table.Head label="Name" isRowHeader />
                    </Table.Header>
                    <Table.Body>
                        <Table.Row id="quarterly-review" href="/projects/quarterly-review">
                            <Table.Cell>Quarterly review</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </TableCard.Root>,
        );

        // React Aria keeps the grid semantics (role="row") rather than rendering a real <a> — see
        // the "Row links" section of `Table`'s doc comment.
        const row = getByRole("row", { name: "Quarterly review" });
        expect(row.tagName).toBe("TR");
        expect(row).toHaveAttribute("data-href", "/projects/quarterly-review");
    });
});
