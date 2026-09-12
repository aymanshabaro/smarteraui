import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Input } from "./input";
import * as Demos from "./inputs.demo";
import { Label } from "./label";

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

    it("passes min, max, and step through to the underlying input", () => {
        render(<Input label="Amount" type="number" min={0} max={10} step={2} />);
        const input = screen.getByLabelText("Amount");
        expect(input).toHaveAttribute("min", "0");
        expect(input).toHaveAttribute("max", "10");
        expect(input).toHaveAttribute("step", "2");
    });

    it("renders a prefix and suffix slot", () => {
        render(<Input label="Website" prefix="https://" suffix=".com" />);
        expect(screen.getByText("https://")).toBeInTheDocument();
        expect(screen.getByText(".com")).toBeInTheDocument();
    });

    it("applies hintProps to the hint element, e.g. to keep role=alert on a standalone error hint", () => {
        render(<Input label="Email" hint="Something went wrong" hintProps={{ role: "alert" }} />);
        expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    });
});

describe("Label", () => {
    it("gives a non-required field an accessible name that exactly matches its label text", () => {
        render(<Input label="Email" isRequired={false} />);
        // No stray "*" (or anything else) should join the accessible name when the field isn't required.
        expect(screen.getByLabelText("Email", { exact: true })).toBeInTheDocument();
    });

    it("does not render the required indicator at all when isRequired is false", () => {
        const { container } = render(<Label isRequired={false}>Email</Label>);
        expect(container.textContent).toBe("Email");
    });

    it("renders the required indicator when isRequired is true", () => {
        render(<Input label="Email" isRequired />);
        expect(screen.getByText("*")).toBeInTheDocument();
    });
});
