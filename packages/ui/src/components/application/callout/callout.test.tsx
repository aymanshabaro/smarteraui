import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Callout } from "./callout";
import * as Demos from "./callout.demo";

describe("Callout", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("defaults to the neutral tone", () => {
        const { getByRole } = render(<Callout>Body copy</Callout>);
        expect(getByRole("note").className).toContain("bg-secondary");
    });

    it("applies the tone's background and border classes", () => {
        const { getByRole } = render(<Callout tone="error">Body copy</Callout>);
        expect(getByRole("note").className).toContain("bg-error-primary");
        expect(getByRole("note").className).toContain("border-error");
    });

    it("falls back to border-secondary for tones without a dedicated border token", () => {
        const { getByRole: getWarning, unmount } = render(<Callout tone="warning">Body copy</Callout>);
        expect(getWarning("note").className).toContain("border-secondary");
        unmount();

        const { getByRole: getSuccess } = render(<Callout tone="success">Body copy</Callout>);
        expect(getSuccess("note").className).toContain("border-secondary");
    });

    it("renders the title only when one is given", () => {
        const { queryByText, rerender } = render(<Callout>Body copy</Callout>);
        expect(queryByText("Body copy")).toBeInTheDocument();

        rerender(<Callout title="Heads up">Body copy</Callout>);
        expect(queryByText("Heads up")).toBeInTheDocument();
    });

    it("renders a default icon matched to the tone", () => {
        const { getByRole } = render(<Callout tone="success">Body copy</Callout>);
        expect(getByRole("note").querySelector("svg")).toBeInTheDocument();
    });

    it("omits the icon when icon is explicitly null", () => {
        const { getByRole } = render(
            <Callout tone="success" icon={null}>
                Body copy
            </Callout>,
        );
        expect(getByRole("note").querySelector("svg")).toBeNull();
    });
});
