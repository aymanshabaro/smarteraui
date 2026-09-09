import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./loading-indicator.demo";

describe("LoadingIndicator", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the accessible label text when provided", () => {
        const { getByText, getByRole } = render(<Demos.LineSimpleWithLabel />);
        expect(getByText("Loading...")).toBeTruthy();
        expect(getByRole("status").getAttribute("aria-label")).toBe("Loading...");
    });

    it("falls back to a generic accessible label when none is provided", () => {
        const { getByRole } = render(<Demos.LineSimple />);
        expect(getByRole("status").getAttribute("aria-label")).toBe("Loading");
    });

    it("applies the requested size classes to the spinner", () => {
        const { container: sm } = render(<Demos.LineSimple />);
        const { container: xl } = render(<Demos.Sizes />);
        expect(sm.querySelector("svg")?.getAttribute("class")).toContain("size-12");
        expect(xl.querySelectorAll("svg")[3]?.getAttribute("class")).toContain("size-16");
    });
});
