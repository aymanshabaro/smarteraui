import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Badge } from "./badges";
import * as Demos from "./badges.demo";

describe("Badges", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("applies the size class for the given size prop", () => {
        const { getByText } = render(
            <Badge size="lg" type="pill-color" color="gray">
                Label
            </Badge>,
        );
        const classList = getByText("Label").className.split(" ");
        expect(classList).toEqual(expect.arrayContaining(["py-1", "px-3"]));
    });

    it("applies the color class for the given color prop", () => {
        const { getByText } = render(
            <Badge size="md" type="pill-color" color="success">
                Label
            </Badge>,
        );
        const classList = getByText("Label").className.split(" ");
        expect(classList).toEqual(expect.arrayContaining(["bg-utility-green-50", "text-utility-green-700"]));
    });
});
