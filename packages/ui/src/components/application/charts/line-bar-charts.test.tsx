import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./line-bar-charts.demo";

// jsdom does not implement `window.matchMedia`, which the `useBreakpoint` hook used by these
// demos relies on. Stub it so the demos render in the test environment.
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: true,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe("Line & bar charts", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders three legend series for a line chart", () => {
        const { getByText } = render(<Demos.LineChart01 />);
        expect(getByText("Series 1")).toBeTruthy();
        expect(getByText("Series 2")).toBeTruthy();
        expect(getByText("Series 3")).toBeTruthy();
    });

    it("renders three legend series for a bar chart", () => {
        const { getByText } = render(<Demos.BarChart01 />);
        expect(getByText("Series 1")).toBeTruthy();
        expect(getByText("Series 2")).toBeTruthy();
        expect(getByText("Series 3")).toBeTruthy();
    });
});
