import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./pin-input.demo";

describe("PinInput (verification code inputs)", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});

describe("PinInput", () => {
    it("renders one slot per digit", () => {
        const { container } = render(<Demos.FourDigits />);
        expect(container.querySelectorAll("[aria-label^='Enter digit']")).toHaveLength(4);
    });

    it("renders a separator when provided", () => {
        const { container } = render(<Demos.WithSeparator />);
        expect(container.querySelector("[role='separator']")).not.toBeNull();
    });
});
