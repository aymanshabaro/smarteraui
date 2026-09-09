import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { type ProgressStepItem, ProgressSteps } from "./progress-steps";
import * as Demos from "./progress-steps.demo";

const items: ProgressStepItem[] = [
    { id: "one", title: "One", description: "First", status: "complete" },
    { id: "two", title: "Two", description: "Second", status: "current" },
    { id: "three", title: "Three", description: "Third", status: "incomplete" },
];

describe("ProgressSteps", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("marks only the current step with aria-current", () => {
        const { container } = render(<ProgressSteps items={items} />);
        const current = container.querySelectorAll('[aria-current="step"]');

        expect(current).toHaveLength(1);
        expect(current[0]?.textContent).toContain("Two");
    });

    it("renders one connector fewer than it has steps", () => {
        const { container } = render(<ProgressSteps items={items} />);

        expect(container.querySelectorAll("li > div > span.border-t-2")).toHaveLength(items.length - 1);
    });

    it("omits connectors when connector is none", () => {
        const { container } = render(<ProgressSteps items={items} connector="none" />);

        expect(container.querySelectorAll("span.border-t-2")).toHaveLength(0);
    });

    it("numbers the steps of the number type and checks the completed ones", () => {
        const { container, getByText } = render(<ProgressSteps items={items} type="number" />);

        expect(getByText("2")).toBeTruthy();
        expect(getByText("3")).toBeTruthy();
        // The first step is complete, so it renders a check instead of its number.
        expect(container.querySelector(".bg-success-solid svg")).toBeTruthy();
    });

    it("draws the vertical connector with a logical border in the vertical orientation", () => {
        const { container } = render(<ProgressSteps items={items} orientation="vertical" />);

        expect(container.querySelectorAll("span.border-s-2")).toHaveLength(items.length - 1);
    });

    it("labels every indicator of the minimal variant for screen readers", () => {
        const { getByText, container } = render(<ProgressSteps.Minimal items={["complete", "current", "incomplete"]} />);

        expect(getByText("Step 1, completed")).toBeTruthy();
        expect(container.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
    });
});
