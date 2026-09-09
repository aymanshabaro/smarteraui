import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./calendar.demo";

// `CalendarDayView` renders the ported `Calendar` widget, whose React Aria root intentionally carries
// `role="application"` (needed for arrow-key grid navigation) and its own `<header>` inside that root.
// Axe classifies `application` as a landmark, so a `<header>` inside it always reads as a non-top-level
// banner. That's upstream `Calendar` behavior (see `./calendar.tsx`, faithfully ported from the MIT
// reference), not something this demo introduces, so it's excluded here only.
const AXE_OPTIONS_BY_DEMO: Record<string, Parameters<typeof axe>[1]> = {
    CalendarDayView: { rules: { "landmark-banner-is-top-level": { enabled: false } } },
};

describe("Calendars", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container, AXE_OPTIONS_BY_DEMO[name])).toHaveNoViolations();
        });
    }

    it("renders today (Sept 9, 2026) as the highlighted date in the calendar example", () => {
        const { getAllByText } = render(<Demos.CalendarExample />);
        expect(getAllByText("9").length).toBeGreaterThan(0);
    });

    it("renders the day view's event detail panel", () => {
        const { getByText } = render(<Demos.CalendarDayView />);
        expect(getByText("Product demo")).toBeInTheDocument();
    });
});
