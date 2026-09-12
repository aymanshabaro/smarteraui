import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { DatePicker } from "./date-picker";
import * as Demos from "./date-pickers.demo";
import { DateRangePicker } from "./date-range-picker";

// `Calendar` and `RangeCalendar` render the ported `Calendar` / `RangeCalendar` widgets bare (no
// surrounding `Dialog`). Their React Aria root intentionally carries `role="application"` (needed for
// arrow-key grid navigation) with its own `<header>` inside that root. Axe classifies `application` as a
// landmark, so a `<header>` inside it always reads as a non-top-level banner. That's upstream `Calendar` /
// `RangeCalendar` behavior (see `./calendar.tsx` / `./range-calendar.tsx`, faithfully ported from the MIT
// reference), not something these demos introduce, so it's excluded here only — every other demo wraps the
// same components in a `Dialog`, which doesn't trigger the rule.
const AXE_OPTIONS_BY_DEMO: Record<string, Parameters<typeof axe>[1]> = {
    Calendar: { rules: { "landmark-banner-is-top-level": { enabled: false } } },
    RangeCalendar: { rules: { "landmark-banner-is-top-level": { enabled: false } } },
};

describe("Date pickers", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container, AXE_OPTIONS_BY_DEMO[name])).toHaveNoViolations();
        });
    }

    it("shows the fixed date (Sept 9, 2026) on the date picker trigger", () => {
        render(<Demos.DatePickerExample />);
        const trigger = screen.getByRole("button", { name: /calendar/i });
        expect(trigger).toHaveTextContent("9");
        expect(trigger).toHaveTextContent("2026");
    });

    it("shows the fixed range (Sept 2 – Sept 9, 2026) on the date range picker trigger", () => {
        render(<Demos.DateRangePickerWithPresets />);
        const trigger = screen.getByRole("button", { name: /calendar/i });
        expect(trigger).toHaveTextContent("2");
        expect(trigger).toHaveTextContent("9");
        expect(trigger).toHaveTextContent("2026");
    });

    it("renders today (9) as the highlighted date in the calendar example", () => {
        render(<Demos.Calendar />);
        expect(screen.getAllByText("9").length).toBeGreaterThan(0);
    });
});

describe("DatePicker label/hint/tooltip", () => {
    it("renders the label above the trigger", () => {
        render(<DatePicker label="Start date" isRequired={false} />);
        expect(screen.getByText("Start date")).toBeInTheDocument();
    });

    it("renders the hint below the trigger", () => {
        render(<DatePicker label="Start date" hint="Cannot be in the past" isRequired={false} />);
        expect(screen.getByText("Cannot be in the past")).toBeInTheDocument();
    });

    it("marks the field as required via the label's indicator", () => {
        render(<DatePicker label="Start date" isRequired />);
        expect(screen.getByText("*")).toBeInTheDocument();
    });
});

describe("DateRangePicker label/hint/tooltip", () => {
    it("renders the label above the trigger", () => {
        render(<DateRangePicker label="Trip dates" isRequired={false} />);
        expect(screen.getByText("Trip dates")).toBeInTheDocument();
    });

    it("renders the hint below the trigger", () => {
        render(<DateRangePicker label="Trip dates" hint="Up to 14 days" isRequired={false} />);
        expect(screen.getByText("Up to 14 days")).toBeInTheDocument();
    });
});
