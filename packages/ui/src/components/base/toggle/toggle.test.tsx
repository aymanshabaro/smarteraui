import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./toggle.demo";

describe("Toggle", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("applies the md size classes", () => {
        const { getAllByRole } = render(<Demos.Sizes />);
        const switches = getAllByRole("switch");
        expect(switches).toHaveLength(2);
    });

    it("renders the label and hint text", () => {
        const { getByText } = render(<Demos.WithLabelAndHint />);
        expect(getByText("Remember me")).not.toBeNull();
        expect(getByText("Save my login details for next time.")).not.toBeNull();
    });

    it("marks the toggle as disabled", () => {
        const { getByRole } = render(<Demos.Disabled />);
        expect((getByRole("switch") as HTMLInputElement).disabled).toBe(true);
    });

    it("renders the slim variant", () => {
        const { container } = render(<Demos.Slim />);
        expect(container.querySelector(".ring-1")).not.toBeNull();
    });
});
