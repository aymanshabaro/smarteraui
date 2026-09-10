import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Input } from "@/components/base/input/input";
import * as Demos from "@/components/base/input/inputs.demo";

describe("Inputs", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});

describe("Input", () => {
    it("applies the size classes", () => {
        render(<Input label="Email" size="lg" placeholder="olivia@proper.example" />);
        const input = screen.getByPlaceholderText("olivia@proper.example");
        expect(input.className).toContain("text-md");
    });

    it("marks the input as invalid when isInvalid is set", () => {
        render(<Input label="Email" isInvalid placeholder="olivia@proper.example" />);
        expect(screen.getByPlaceholderText("olivia@proper.example")).toHaveAttribute("aria-invalid", "true");
    });

    it("disables the input when isDisabled is set", () => {
        render(<Input label="Email" isDisabled placeholder="olivia@proper.example" />);
        expect(screen.getByPlaceholderText("olivia@proper.example")).toBeDisabled();
    });
});
