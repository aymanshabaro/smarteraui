import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { BadgeGroup } from "./badge-groups";
import * as Demos from "./badge-groups.demo";

describe("BadgeGroup", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the addon text and children", () => {
        const { getByText } = render(
            <BadgeGroup addonText="New feature" color="brand">
                We've just released a new feature
            </BadgeGroup>,
        );
        expect(getByText("New feature")).toBeTruthy();
        expect(getByText("We've just released a new feature")).toBeTruthy();
    });

    it("applies modern theme classes", () => {
        const { container } = render(
            <BadgeGroup addonText="New feature" color="brand" theme="modern">
                We've just released a new feature
            </BadgeGroup>,
        );
        const root = container.firstChild as HTMLElement;
        const classList = root.className.split(" ");
        expect(classList).toEqual(expect.arrayContaining(["bg-primary", "shadow-xs"]));
    });
});
