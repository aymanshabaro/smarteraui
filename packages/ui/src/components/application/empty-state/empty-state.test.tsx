import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./empty-state.demo";

describe("EmptyState", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the title and description", () => {
        const { getByText } = render(<Demos.EmptyStateExample />);
        expect(getByText("No projects found")).toBeTruthy();
        expect(getByText("Your search “Landing page design” did not match any projects. Please try again.")).toBeTruthy();
    });

    it("renders the footer actions", () => {
        const { getByRole } = render(<Demos.EmptyStateExample />);
        expect(getByRole("button", { name: "Clear search" })).toBeTruthy();
        expect(getByRole("button", { name: "New project" })).toBeTruthy();
    });

    it("renders a folder file-type icon", () => {
        const { container } = render(<Demos.FileIcon />);
        expect(container.querySelector("svg")).toBeTruthy();
    });

    it("renders the requested number of avatars in the avatar row", () => {
        const { container } = render(<Demos.AvatarRow />);
        expect(container.querySelectorAll("img").length).toBe(6);
    });
});
