import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { MobileNavigationHeader, NavItemBase } from "./sidebar-navigation-base";
import * as Demos from "./sidebar-navigation.demo";
import { SidebarNavigationSimple } from "./sidebar-navigation/sidebar-simple";
import { SidebarNavigationSlim } from "./sidebar-navigation/sidebar-slim";

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

    it("merges NavItemBase's className last and lets classNames override the selected-row style", () => {
        const { getByRole } = render(
            <NavItemBase type="link" href="/" current className="extra-class" classNames={{ root: "custom-root", rootSelected: "custom-selected" }}>
                Home
            </NavItemBase>,
        );

        const link = getByRole("link", { name: "Home" });
        expect(link.className).toContain("custom-root");
        expect(link.className).toContain("custom-selected");
        expect(link.className).toContain("extra-class");
        expect(link.className).not.toContain("bg-secondary hover:bg-secondary_hover");
    });

    it("overrides MobileNavigationHeader's labels and logo", () => {
        const { getByRole, getByText } = render(
            <MobileNavigationHeader logo={<span>Brand</span>} labels={{ nav: "App navigation", expand: "Open menu" }}>
                <div>Menu content</div>
            </MobileNavigationHeader>,
        );

        expect(getByText("Brand")).toBeInTheDocument();
        expect(getByRole("navigation", { name: "App navigation" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Open menu" })).toBeInTheDocument();
    });

    it("SidebarNavigationSimple accepts a custom logo, ariaLabel, and drops search when search is false", () => {
        const { getByRole, getByText, queryByRole } = render(
            <SidebarNavigationSimple items={[]} logo={<span>Brand</span>} search={false} ariaLabel="Main navigation" />,
        );

        expect(getByText("Brand")).toBeInTheDocument();
        expect(getByRole("complementary", { name: "Main navigation" })).toBeInTheDocument();
        expect(queryByRole("searchbox")).toBeNull();
        expect(queryByRole("textbox", { name: "Search" })).toBeNull();
    });

    it("SidebarNavigationSlim accepts custom logo and mobileLogo overrides", () => {
        const { getAllByText } = render(<SidebarNavigationSlim items={[{ label: "Home", href: "/", icon: () => null }]} logo={<span>D</span>} />);
        expect(getAllByText("D").length).toBeGreaterThan(0);
    });
});
