// Executable recipes for opening a `Select` popover in jsdom (docs/spec/feedback/2026-09-11-
// agent-feedback-map.md item 2.16; Miraveli F66, F67, F72, F74). `select.test.tsx` (owned by
// another agent) only renders static demos and never opens the popover, so there was no
// in-repo precedent for the single hardest interaction in the kit (F74): every failure below
// is silent (no error, no warning, no non-zero exit: `aria-expanded` just stays `"false"`, F72),
// which is what makes it worth pinning down in an executable test rather than a comment.
//
// `@testing-library/user-event` is not a resolvable dependency of `packages/ui` (it's only
// pulled in transitively by Storybook, so it isn't linked into this package under pnpm's
// strict isolation, and this task may not add dependencies), so the pitfall this suite can't
// execute directly is F66 itself: a real `userEvent.click(trigger)` leaves `aria-expanded`
// `"false"` with no error, three different waves in the Miraveli migration independently lost
// 25-50 minutes to it. Consumers who do have `@testing-library/user-event` installed can
// reproduce it with `await userEvent.setup().click(trigger)` in place of the working recipes
// below and watch the same assertion fail. What this suite verifies instead are the recipes
// that do work: `fireEvent.click`, and `trigger.focus()` + arrow-key/keyboard activation.
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Table } from "../../application/table/table";
import { Select } from "./select";
import type { SelectItemType } from "./select-shared";

const roles: SelectItemType[] = [
    { id: "admin", label: "Admin" },
    { id: "editor", label: "Editor" },
    { id: "viewer", label: "Viewer" },
];

const renderRoleItem = (item: SelectItemType) => <Select.Item id={item.id}>{item.label}</Select.Item>;

describe("Select popover: opening it in jsdom", () => {
    it("(a) userEvent.click's own event sequence is not enough on its own: a single fireEvent.click(trigger) is", () => {
        render(
            <Select aria-label="Role" items={roles} placeholder="Pick a role">
                {renderRoleItem}
            </Select>,
        );
        const trigger = screen.getByRole("button", { name: /pick a role/i });
        expect(trigger).toHaveAttribute("aria-expanded", "false");

        // The working recipe (F66): a single native click event.
        fireEvent.click(trigger);

        expect(trigger).toHaveAttribute("aria-expanded", "true");
        expect(screen.getAllByRole("option")).toHaveLength(roles.length);
    });

    it("(a) trigger.focus() + keyboard ArrowDown also opens it, and renders every option", () => {
        render(
            <Select aria-label="Role" items={roles} placeholder="Pick a role">
                {renderRoleItem}
            </Select>,
        );
        const trigger = screen.getByRole("button", { name: /pick a role/i });

        // The other working recipe (F66): move real focus, then drive it by keyboard.
        act(() => {
            trigger.focus();
        });
        fireEvent.keyDown(trigger, { key: "ArrowDown" });

        expect(trigger).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("option", { name: "Admin" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Editor" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Viewer" })).toBeInTheDocument();
    });

    it("(b) inside the kit's Table (role=grid), ArrowDown is swallowed by roving cell focus, but Enter opens it", () => {
        render(
            <Table aria-label="Team">
                <Table.Header>
                    <Table.Head id="role" label="Role" isRowHeader />
                </Table.Header>
                <Table.Body>
                    <Table.Row id="row-1">
                        <Table.Cell>
                            <Select aria-label="Role" items={roles} placeholder="Pick a role">
                                {renderRoleItem}
                            </Select>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>,
        );

        // The Table renders an ARIA `grid`, not a plain `table`; see `testing.mdx`.
        expect(screen.getByRole("grid")).toBeInTheDocument();

        const trigger = screen.getByRole("button", { name: /pick a role/i });
        act(() => {
            trigger.focus();
        });

        // A *different* failure mode from (a): the grid's roving-cell-focus handling (F57)
        // swallows ArrowDown before the Select's own handler ever sees it.
        fireEvent.keyDown(trigger, { key: "ArrowDown" });
        expect(trigger).toHaveAttribute("aria-expanded", "false");

        // Enter isn't swallowed by the grid, so it still opens the popover (F67).
        fireEvent.keyDown(trigger, { key: "Enter" });
        expect(trigger).toHaveAttribute("aria-expanded", "true");
        expect(screen.getAllByRole("option")).toHaveLength(roles.length);
    });
});
