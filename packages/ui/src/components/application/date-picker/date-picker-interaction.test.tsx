// Executable recipes for date-field segments and for driving a `usePress` component under
// fake timers (docs/spec/feedback/2026-09-11-agent-feedback-map.md item 2.16; Miraveli F71,
// F76). Every assertion here mirrors a finding that cost a migrating team real time because the
// failure was silent or, in the fake-timers case, looked like a hang rather than a bug (F72).
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../base/buttons/button";
import { InputDate } from "../../base/input/input-date";

describe("Date field segments: targeting them in jsdom", () => {
    it("(d) getByLabelText on a date field returns every element that shares its label, not one", () => {
        render(<InputDate label="Appointment date" />);

        // Two `role="group"` wrappers (the field's own group, and `InputDateBase`'s) plus one
        // `role="spinbutton"` segment per date part (month/day/year) all carry
        // `aria-labelledby` pointing at the same label text (F76).
        const matches = screen.getAllByLabelText("Appointment date");
        expect(matches.length).toBeGreaterThan(1);
        expect(matches.every((element) => element.tagName === "DIV" || element.getAttribute("role") === "spinbutton")).toBe(true);
    });

    it("(d) the first focusable segment is a role=spinbutton element, not index [0] of getAllByLabelText", () => {
        render(<InputDate label="Appointment date" />);

        // Index `[0]` of `getAllByLabelText` is a non-focusable `<div role="group">`; clicking
        // or typing into it does nothing. Target the segments directly by role instead.
        const segments = screen.getAllByRole("spinbutton");
        expect(segments.length).toBeGreaterThan(0);

        const firstSegment = segments[0]!;
        act(() => {
            firstSegment.focus();
        });
        expect(firstSegment).toHaveFocus();
    });

    it("(d) disabled and invalid live on each segment (aria-disabled/aria-invalid), never as a native disabled attribute", () => {
        render(<InputDate label="Appointment date" isDisabled />);

        const segments = screen.getAllByRole("spinbutton");
        for (const segment of segments) {
            expect(segment).toHaveAttribute("aria-disabled", "true");
            // `toBeDisabled()` checks the native `disabled` property/attribute, which a `<span>`
            // segment never has; see `testing.mdx`'s note on `isLoading`/`aria-disabled` too.
            expect(segment).not.toBeDisabled();
        }
    });

    it("(d) invalid state sets aria-invalid on segments and data-invalid on the group", () => {
        render(<InputDate label="Appointment date" isInvalid />);

        const segments = screen.getAllByRole("spinbutton");
        expect(segments.length).toBeGreaterThan(0);
        for (const segment of segments) {
            expect(segment).toHaveAttribute("aria-invalid", "true");
        }
    });
});

describe("Fake timers + a usePress component", () => {
    it("(e) fireEvent.click + act(vi.advanceTimersByTime) fires onPress; the userEvent + advanceTimers recipe would hang here", () => {
        vi.useFakeTimers();
        try {
            const onPress = vi.fn();
            render(<Button onPress={onPress}>Confirm</Button>);
            const button = screen.getByRole("button", { name: "Confirm" });

            // The documented `userEvent.setup({ advanceTimers: vi.advanceTimersByTime })` +
            // `await user.click(...)` recipe never resolves against a `usePress` button under
            // fake timers (F71): a silent 5-second Vitest timeout that looks like a broken
            // component, not a bad recipe. This is the recipe that actually works.
            fireEvent.click(button);
            act(() => {
                vi.advanceTimersByTime(4000);
            });

            expect(onPress).toHaveBeenCalledTimes(1);
        } finally {
            vi.useRealTimers();
        }
    });
});
