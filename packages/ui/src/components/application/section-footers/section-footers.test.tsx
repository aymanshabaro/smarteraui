import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { SectionFooter } from "./section-footers";
import * as Demos from "./section-footers.demo";

describe("SectionFooter", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("draws a top rule for the section type", () => {
        const { container } = render(<SectionFooter>actions</SectionFooter>);
        expect(container.firstElementChild?.className).toContain("border-t");
    });

    it("rounds the bottom corners for the card type", () => {
        const { container } = render(<SectionFooter type="card">actions</SectionFooter>);
        expect(container.firstElementChild?.className).toContain("rounded-b-xl");
    });

    it("renders leading content before the actions", () => {
        const { container, getByTestId } = render(<SectionFooter contentLeading={<span data-testid="leading">Filter</span>}>actions</SectionFooter>);
        expect(container.firstElementChild?.firstElementChild?.contains(getByTestId("leading"))).toBe(true);
    });

    it("does not claim a page landmark", () => {
        const { queryByRole } = render(<SectionFooter>actions</SectionFooter>);
        expect(queryByRole("contentinfo")).toBeNull();
    });
});
