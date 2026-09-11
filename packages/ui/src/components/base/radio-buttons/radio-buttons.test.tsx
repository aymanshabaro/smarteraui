import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { RadioButton, RadioGroup } from "./radio-buttons";
import * as Demos from "./radio-buttons.demo";

describe("Radio buttons", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the md size with a larger indicator", () => {
        render(
            <RadioGroup aria-label="Sizes" size="md" defaultValue="basic">
                <RadioButton label="Basic plan" value="basic" />
            </RadioGroup>,
        );

        expect(screen.getByText("Basic plan")).toHaveClass("text-md");
    });

    it("marks an individually disabled option as disabled", () => {
        render(
            <RadioGroup aria-label="Pricing plans" defaultValue="basic">
                <RadioButton label="Basic plan" value="basic" />
                <RadioButton isDisabled label="Enterprise plan" value="enterprise" />
            </RadioGroup>,
        );

        expect(screen.getByRole("radio", { name: "Enterprise plan" })).toBeDisabled();
        expect(screen.getByRole("radio", { name: "Basic plan" })).not.toBeDisabled();
    });
});
