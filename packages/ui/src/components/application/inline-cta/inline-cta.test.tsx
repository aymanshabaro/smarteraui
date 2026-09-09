import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { InlineCTA } from "./inline-cta";
import * as Demos from "./inline-cta.demo";

describe("InlineCTA", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the title as a heading with the description under it", () => {
        const { getByRole, getByText } = render(<InlineCTA title="Change your plan" description="Flexible pricing that grows with you." />);
        expect(getByRole("heading", { name: "Change your plan" })).toBeTruthy();
        expect(getByText("Flexible pricing that grows with you.")).toBeTruthy();
    });

    it("renders the image variant with an accessible image and no card border", () => {
        const { getByRole, container } = render(<InlineCTA title="Update" image={{ src: "/demo/landscape/landscape-01.svg", alt: "Placeholder" }} />);
        expect(getByRole("img", { name: "Placeholder" })).toBeTruthy();
        expect(container.firstElementChild?.className).toContain("overflow-hidden");
    });

    it("renders feature items as list items", () => {
        const { getAllByRole } = render(
            <InlineCTA title="Upgrade your plan">
                <InlineCTA.FeatureList>
                    <InlineCTA.Feature title="10 users" description="Add up to 10 team members." />
                    <InlineCTA.Feature title="20 GB data" />
                </InlineCTA.FeatureList>
            </InlineCTA>,
        );
        expect(getAllByRole("listitem")).toHaveLength(2);
    });
});
