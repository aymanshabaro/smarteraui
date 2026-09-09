import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./progress-indicators.demo";

describe("Progress indicators", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});

describe("ProgressBar", () => {
    it("exposes the current value via ARIA attributes", () => {
        const { getByRole } = render(<Demos.Default />);
        const bar = getByRole("progressbar");
        expect(bar.getAttribute("aria-valuenow")).toBe("40");
        expect(bar.getAttribute("aria-valuemin")).toBe("0");
        expect(bar.getAttribute("aria-valuemax")).toBe("100");
    });

    it("renders the formatted percentage text for labelPosition variants", () => {
        const { getByText } = render(<Demos.TextRight />);
        expect(getByText("40%")).toBeTruthy();
    });
});
