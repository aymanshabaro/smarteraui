// Executable recipes for driving `Select.ComboBox` in jsdom (docs/spec/feedback/2026-09-11-
// agent-feedback-map.md item 2.16; Miraveli F68, F69, F70). Every assertion here mirrors a
// finding that cost a migrating team real time because the failure was silent: no error, no
// warning, just an empty popover or a menu that never re-opens (F72).
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./select";
import type { SelectItemType } from "./select-shared";

const fruits: SelectItemType[] = [
    { id: "apple", label: "Apple" },
    { id: "apricot", label: "Apricot" },
    { id: "banana", label: "Banana" },
];

const renderFruitItem = (item: SelectItemType) => <Select.Item id={item.id}>{item.label}</Select.Item>;

describe("ComboBox: opening and filtering it in jsdom", () => {
    it("(c) fireEvent.focus does not open the menu; a real .focus() does", () => {
        render(
            <Select.ComboBox aria-label="Fruit" items={fruits}>
                {renderFruitItem}
            </Select.ComboBox>,
        );
        const input = screen.getByRole("combobox");
        expect(input).toHaveAttribute("aria-expanded", "false");

        // `fireEvent.focus` dispatches a non-bubbling event without moving
        // `document.activeElement`, so React Aria's real focus tracking never sees it (F68).
        act(() => {
            fireEvent.focus(input);
        });
        expect(input).toHaveAttribute("aria-expanded", "false");

        // A real `.focus()` call does move `document.activeElement`, which is what this
        // component's hardcoded `menuTrigger="focus"` is listening for.
        act(() => {
            input.focus();
        });
        expect(input).toHaveAttribute("aria-expanded", "true");
        expect(screen.getAllByRole("option")).toHaveLength(fruits.length);
    });

    it("(c) userEvent.click(input) is the other working recipe (asserted here via a real click + focus, since @testing-library/user-event isn't a dependency of this package)", () => {
        render(
            <Select.ComboBox aria-label="Fruit" items={fruits}>
                {renderFruitItem}
            </Select.ComboBox>,
        );
        const input = screen.getByRole("combobox");

        act(() => {
            fireEvent.click(input);
            input.focus();
        });
        expect(input).toHaveAttribute("aria-expanded", "true");
    });

    it("(c) app-side filtering needs defaultFilter={() => true}, or the built-in filter double-filters an already-filtered list to zero", () => {
        // Simulates app-side diacritics-insensitive filtering: the app has already narrowed
        // `items` down to what it considers a match for "apricot", but the *raw* input value
        // wouldn't survive AriaComboBox's own built-in `contains` filter (F69).
        const alreadyFiltered = [fruits[1]!];

        render(
            <Select.ComboBox aria-label="Fruit" items={alreadyFiltered} inputValue="apricot" defaultFilter={() => true}>
                {renderFruitItem}
            </Select.ComboBox>,
        );
        const input = screen.getByRole("combobox");
        act(() => {
            input.focus();
        });

        // With `defaultFilter={() => true}`, AriaComboBox trusts the caller's list as-is.
        expect(screen.getByRole("option", { name: "Apricot" })).toBeInTheDocument();
    });

    it("(c) allowsEmptyCollection defaults to false: a query with zero matches auto-closes the popover", () => {
        render(
            <Select.ComboBox aria-label="Fruit" items={fruits}>
                {renderFruitItem}
            </Select.ComboBox>,
        );
        const input = screen.getByRole("combobox");
        act(() => {
            input.focus();
        });
        expect(input).toHaveAttribute("aria-expanded", "true");

        act(() => {
            fireEvent.change(input, { target: { value: "no-such-fruit" } });
        });
        // No matches, `allowsEmptyCollection` unset (defaults to false): the popover closes
        // itself, and continuing to type never reopens it on its own (F70).
        expect(input).toHaveAttribute("aria-expanded", "false");
    });

    it("(c) allowsEmptyCollection keeps the (empty) popover open through a zero-match query", () => {
        render(
            <Select.ComboBox aria-label="Fruit" items={fruits} allowsEmptyCollection>
                {renderFruitItem}
            </Select.ComboBox>,
        );
        const input = screen.getByRole("combobox");
        act(() => {
            input.focus();
        });

        act(() => {
            fireEvent.change(input, { target: { value: "no-such-fruit" } });
        });
        expect(input).toHaveAttribute("aria-expanded", "true");
        expect(screen.queryAllByRole("option")).toHaveLength(0);
    });
});
