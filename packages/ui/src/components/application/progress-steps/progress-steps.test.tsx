import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

        // li > div (the step's row) > div (indicator + connector) > span.border-t-2
        expect(container.querySelectorAll("li > div > div > span.border-t-2")).toHaveLength(items.length - 1);
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

    it("renders static markup (no buttons) by default", () => {
        const { container } = render(<ProgressSteps items={items} />);
        expect(container.querySelectorAll("li button")).toHaveLength(0);
    });

    it("renders steps as buttons and calls onStepPress with the step id, except for locked steps", () => {
        const onStepPress = vi.fn();
        const stepsWithLocked: ProgressStepItem[] = [
            { id: "one", title: "One", status: "complete" },
            { id: "two", title: "Two", status: "current" },
            { id: "three", title: "Three", status: "locked" },
        ];
        const { getByRole } = render(<ProgressSteps items={stepsWithLocked} onStepPress={onStepPress} />);

        const lockedButton = getByRole("button", { name: /Three/ });
        expect(lockedButton).toBeDisabled();

        fireEvent.click(getByRole("button", { name: /One/ }));
        expect(onStepPress).toHaveBeenCalledWith("one");
    });

    it("renders a step's `children` slot", () => {
        const stepsWithChildren: ProgressStepItem[] = [{ id: "one", title: "One", status: "current", children: <span>Extra content</span> }];
        const { getByText } = render(<ProgressSteps items={stepsWithChildren} />);
        expect(getByText("Extra content")).toBeInTheDocument();
    });
});
