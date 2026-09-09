import { act, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./tooltip.demo";

describe("Tooltip", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("shows the tooltip title on focus", async () => {
        const { getByRole, findByText } = render(<Demos.DefaultExample />);
        act(() => getByRole("button").focus());
        expect(await findByText("This is a tooltip")).not.toBeNull();
    });

    it("shows the description when provided", async () => {
        const { getByRole, findByText } = render(<Demos.WithSupportingTextExample />);
        act(() => getByRole("button").focus());
        expect(await findByText(/In most scenarios/)).not.toBeNull();
    });
});
