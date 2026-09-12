import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { NativeSelect } from "./select-native";

const options = [
    { label: "One", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3", disabled: true },
] as const;

describe("NativeSelect", () => {
    it("has no a11y violations", async () => {
        const { container } = render(<NativeSelect label="Pick one" hint="Choose wisely" options={options} />);
        expect(await axe(container)).toHaveNoViolations();
    });

    it("honours a caller-supplied id instead of always generating one", () => {
        render(<NativeSelect label="Pick one" id="my-select" options={options} />);
        expect(screen.getByLabelText("Pick one")).toHaveAttribute("id", "my-select");
    });

    it("falls back to a generated id when none is supplied", () => {
        render(<NativeSelect label="Pick one" options={options} />);
        expect(screen.getByLabelText("Pick one").id).toBeTruthy();
    });

    it("never gives the label and the select the same id", () => {
        render(<NativeSelect label="Pick one" options={options} />);
        const select = screen.getByLabelText("Pick one");
        const label = screen.getByText("Pick one");
        expect(select.id).not.toBe(label.id);
    });

    it("accepts a readonly options array", () => {
        // `options` above is declared `as const`, making it a readonly tuple — this must type-check
        // and render without incident.
        render(<NativeSelect label="Pick one" options={options} />);
        expect(screen.getAllByRole("option")).toHaveLength(3);
    });

    it("disables an option flagged as disabled", () => {
        render(<NativeSelect label="Pick one" options={options} />);
        expect((screen.getByRole("option", { name: "Three" }) as HTMLOptionElement).disabled).toBe(true);
    });

    it("renders a placeholder as a disabled first option", () => {
        render(<NativeSelect label="Pick one" placeholder="Select an option" options={options} />);
        const placeholderOption = screen.getByRole("option", { name: "Select an option" }) as HTMLOptionElement;
        expect(placeholderOption.disabled).toBe(true);
        expect(screen.getAllByRole("option")).toHaveLength(4);
    });

    it("omits the placeholder option when none is given", () => {
        render(<NativeSelect label="Pick one" options={options} />);
        expect(screen.getAllByRole("option")).toHaveLength(3);
    });
});
