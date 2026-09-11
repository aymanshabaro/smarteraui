import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ButtonGroup, ButtonGroupItem } from "./button-group";
import * as Demos from "./button-group.demo";

describe("ButtonGroup demos", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});

describe("ButtonGroup", () => {
    it("applies the size classes to its items", () => {
        render(
            <ButtonGroup size="lg" selectedKeys={[]}>
                <ButtonGroupItem id="one">One</ButtonGroupItem>
            </ButtonGroup>,
        );
        const button = screen.getByRole("radio", { name: "One" });
        expect(button.className).toContain("text-md");
    });

    it("disables every item when isDisabled is set on the group", () => {
        render(
            <ButtonGroup isDisabled>
                <ButtonGroupItem id="one">One</ButtonGroupItem>
                <ButtonGroupItem id="two">Two</ButtonGroupItem>
            </ButtonGroup>,
        );
        expect(screen.getByRole("radio", { name: "One" })).toBeDisabled();
        expect(screen.getByRole("radio", { name: "Two" })).toBeDisabled();
    });

    it("disables an individual item without disabling the rest", () => {
        render(
            <ButtonGroup selectedKeys={[]}>
                <ButtonGroupItem id="one">One</ButtonGroupItem>
                <ButtonGroupItem isDisabled id="two">
                    Two
                </ButtonGroupItem>
            </ButtonGroup>,
        );
        expect(screen.getByRole("radio", { name: "One" })).not.toBeDisabled();
        expect(screen.getByRole("radio", { name: "Two" })).toBeDisabled();
    });
});
