import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import * as Demos from "./illustrations.demo";

describe("Illustrations", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders an svg for each demo", () => {
        const { container } = render(<Demos.IllustrationExample />);
        expect(container.querySelector("svg")).toBeTruthy();
    });
});
