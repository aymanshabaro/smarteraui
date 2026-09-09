import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { TextArea } from "@/components/base/textarea/textarea";
import * as Demos from "@/components/base/textarea/textarea.demo";

describe("Textareas", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});

describe("TextArea", () => {
    it("applies the size classes", () => {
        render(<TextArea label="Description" size="sm" placeholder="This is a placeholder." />);
        expect(screen.getByPlaceholderText("This is a placeholder.").className).toContain("text-sm");
    });

    it("marks the textarea as invalid when isInvalid is set", () => {
        render(<TextArea label="Description" isInvalid placeholder="This is a placeholder." />);
        expect(screen.getByPlaceholderText("This is a placeholder.")).toHaveAttribute("aria-invalid", "true");
    });

    it("disables the textarea when isDisabled is set", () => {
        render(<TextArea label="Description" isDisabled placeholder="This is a placeholder." />);
        expect(screen.getByPlaceholderText("This is a placeholder.")).toBeDisabled();
    });
});
