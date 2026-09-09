import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./sidebar-navigation.demo";

describe("Sidebar navigations", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the section subheadings as group labels", () => {
        const { getAllByText } = render(<Demos.SectionsSubheadings />);
        expect(getAllByText("General").length).toBeGreaterThan(0);
        expect(getAllByText("Your teams").length).toBeGreaterThan(0);
    });

    it("renders the onboarding checklist with its step counter", () => {
        const { getByText, getByRole } = render(<Demos.OnboardingSteps />);
        expect(getByText("Step 3 of 4")).toBeInTheDocument();
        expect(getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
    });

    it("renders the referral link input as read-only", () => {
        const { getByLabelText } = render(<Demos.ReferralLink />);
        expect(getByLabelText("Referral link")).toHaveAttribute("readonly");
    });
});
