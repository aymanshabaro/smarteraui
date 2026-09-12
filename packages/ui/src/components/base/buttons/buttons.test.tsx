import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Button } from "./button";
import * as Demos from "./buttons.demo";

describe("Buttons", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});

describe("Button", () => {
    it("applies the size and color classes", () => {
        render(
            <Button color="secondary" size="lg">
                Click me
            </Button>,
        );
        const button = screen.getByRole("button", { name: "Click me" });
        expect(button.className).toContain("text-md");
        expect(button.className).toContain("bg-primary");
    });

    it("renders as a link when href is provided", () => {
        render(<Button href="/somewhere">Go</Button>);
        expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute("href", "/somewhere");
    });

    it("disables interaction when isDisabled is set", () => {
        render(<Button isDisabled>Click me</Button>);
        expect(screen.getByRole("button", { name: "Click me" })).toBeDisabled();
    });

    it("accepts a native title attribute", () => {
        render(<Button title="Save changes">Save</Button>);
        expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("title", "Save changes");
    });

    it("accepts a native title attribute on the link variant", () => {
        render(
            <Button href="/somewhere" title="Go there">
                Go
            </Button>,
        );
        expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute("title", "Go there");
    });
});
