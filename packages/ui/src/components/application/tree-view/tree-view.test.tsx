import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { TreeView } from "./tree-view";
import * as Demos from "./tree-view.demo";

const Sample = ({ ...props }: Partial<Parameters<typeof TreeView>[0]>) => (
    <TreeView aria-label="Files" defaultExpandedKeys={["root", "docs"]} {...props}>
        <TreeView.Item id="root" textValue="Root">
            <TreeView.ItemContent>Root</TreeView.ItemContent>
            <TreeView.Item id="docs" textValue="Docs">
                <TreeView.ItemContent>Docs</TreeView.ItemContent>
                <TreeView.Item id="readme" textValue="Readme">
                    <TreeView.ItemContent>Readme</TreeView.ItemContent>
                </TreeView.Item>
            </TreeView.Item>
            <TreeView.Item id="notes" textValue="Notes">
                <TreeView.ItemContent>Notes</TreeView.ItemContent>
            </TreeView.Item>
        </TreeView.Item>
    </TreeView>
);

/** The styled row inside a `role="row"` element — the gridcell around it only sets `display: contents`. */
const rowContent = (row?: Element): HTMLElement => {
    const content = row?.querySelector<HTMLElement>('[role="gridcell"] > div');
    if (!content) throw new Error("The row has no content element.");
    return content;
};

describe("TreeView", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders one row per visible node with its nesting level", () => {
        const { getAllByRole } = render(<Sample />);
        const rows = getAllByRole("row");

        expect(rows).toHaveLength(4);
        expect(rows.map((row) => row.getAttribute("aria-level"))).toEqual(["1", "2", "3", "2"]);
    });

    it("indents with padding when the guides are hidden", () => {
        const { getAllByRole } = render(<Sample />);
        const [, second] = getAllByRole("row");

        expect(rowContent(second).style.paddingInlineStart).toBe("32px");
    });

    it("replaces the indentation with one guide cell per ancestor when hasGuides is set", () => {
        const { getAllByRole } = render(<Sample hasGuides />);
        const [, second, third] = getAllByRole("row");

        expect(rowContent(second).style.paddingInlineStart).toBe("8px");
        expect(rowContent(second).querySelectorAll("[data-tree-guide]")).toHaveLength(1);
        expect(rowContent(third).querySelectorAll("[data-tree-guide]")).toHaveLength(2);
    });

    it("closes a branch with an elbow on its last child and passes the line through otherwise", () => {
        const { getAllByRole } = render(<Sample hasGuides />);
        const guideKinds = getAllByRole("row").map((row) =>
            [...rowContent(row).querySelectorAll(":scope > [data-tree-guide]")].map((guide) =>
                guide.innerHTML.includes("rounded-es") ? "elbow" : guide.innerHTML.includes("bg-border-secondary") ? "line" : "blank",
            ),
        );

        // Root has no ancestors; Docs continues into Notes; Readme and Notes each close their branch.
        expect(guideKinds).toEqual([[], ["line"], ["line", "elbow"], ["elbow"]]);
    });

    it("renders a checkbox per row only when a selection mode is set", () => {
        const { queryAllByRole, rerender } = render(<Sample />);
        expect(queryAllByRole("checkbox")).toHaveLength(0);

        rerender(<Sample selectionMode="multiple" />);
        expect(queryAllByRole("checkbox")).toHaveLength(4);
    });

    it("marks an ancestor of a selected node as indeterminate", () => {
        const { getAllByRole } = render(<Sample selectionMode="multiple" defaultSelectedKeys={new Set(["readme"])} />);
        const boxes = getAllByRole("checkbox") as HTMLInputElement[];

        // Root and Docs are partially selected, Readme is selected, Notes is untouched.
        expect(boxes.map((box) => box.indeterminate)).toEqual([true, true, false, false]);
        expect(boxes.map((box) => box.checked)).toEqual([false, false, true, false]);
    });

    it("highlights the rows that are selected or partially selected", () => {
        const { getAllByRole } = render(<Sample selectionMode="multiple" defaultSelectedKeys={new Set(["readme"])} />);

        expect(getAllByRole("row").map((row) => rowContent(row).className.includes("bg-secondary"))).toEqual([true, true, true, false]);
    });

    it("applies the md row density", () => {
        const { getAllByRole } = render(<Sample size="md" />);

        expect(rowContent(getAllByRole("row")[0]).className).toContain("py-2");
    });
});
