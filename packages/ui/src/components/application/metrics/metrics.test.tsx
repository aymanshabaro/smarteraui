import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { MetricSimple } from "./metrics";
import * as Demos from "./metrics.demo";

describe("Metrics", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the title, value and change", () => {
        const { getByRole, getByText } = render(<Demos.Simple />);
        expect(getByRole("heading", { level: 3, name: "Views 24 hours" })).toBeInTheDocument();
        expect(getByText("2,000")).toBeInTheDocument();
        expect(getByText("100%")).toBeInTheDocument();
    });

    it("labels the overflow menu trigger", () => {
        const { getByRole } = render(<Demos.Simple />);
        expect(getByRole("button", { name: "Open menu" })).toBeInTheDocument();
    });

    it("colors the change indicator by trend", () => {
        const { getByText: getPositive } = render(<MetricSimple title="Views" value="2,000" change="100%" />);
        expect(getPositive("100%").className).toContain("*:text-fg-success-secondary");

        const { getByText: getNegative } = render(<MetricSimple title="Views" value="2,000" change="12%" trend="negative" />);
        expect(getNegative("12%").className).toContain("*:text-fg-error-secondary");
    });

    it("renders no change indicator when `change` is omitted", () => {
        const { getByText, container } = render(<Demos.SimpleNoChange />);
        expect(getByText("128")).toBeInTheDocument();
        expect(container.querySelector("svg")).toBeNull();
    });

    it("only renders a footer when actions are passed", () => {
        const { queryByRole } = render(<Demos.Simple />);
        expect(queryByRole("link", { name: "View report" })).toBeNull();

        const { getByRole } = render(<Demos.SimpleActions />);
        expect(getByRole("link", { name: "View report" })).toBeInTheDocument();
    });
});
