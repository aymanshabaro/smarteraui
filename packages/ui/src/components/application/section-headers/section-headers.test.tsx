import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { SectionHeader } from "./section-headers";
import * as Demos from "./section-headers.demo";

describe("SectionHeader", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the title as a heading", () => {
        const { getByRole } = render(<SectionHeader title="Projects" />);
        expect(getByRole("heading", { name: "Projects" })).toBeTruthy();
    });

    it("wraps a plain badge value in a modern gray badge", () => {
        const { getByText } = render(<SectionHeader title="Projects" badge="24 active" />);
        expect(getByText("24 active").className).toContain("ring-primary");
    });

    it("draws the divider by default and drops it when a tab row is supplied", () => {
        const { container: plain } = render(<SectionHeader title="Projects" />);
        expect(plain.firstElementChild?.className).toContain("border-b");

        const { container: withTabs } = render(
            <SectionHeader title="Projects">
                <div data-testid="tabs" />
            </SectionHeader>,
        );
        expect(withTabs.firstElementChild?.className).not.toContain("border-b");
    });

    it("lets `divider` override the default", () => {
        const { container } = render(
            <SectionHeader title="Projects" divider>
                <div />
            </SectionHeader>,
        );
        expect(container.firstElementChild?.className).toContain("border-b");
    });

    it("applies the heading size", () => {
        const { getByRole } = render(<SectionHeader title="Projects" size="lg" />);
        expect(getByRole("heading", { name: "Projects" }).className).toContain("text-xl");
    });
});
