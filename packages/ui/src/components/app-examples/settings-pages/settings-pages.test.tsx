import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./settings-pages.demo";
import { variantsA } from "./variants.a";

describe("Settings pages with sidebar navigation", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    for (const [slug, Variant] of Object.entries(variantsA)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("exposes the 21 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(21);
    });

    it("renders exactly one level-1 heading per variant", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("labels the mobile tab select and renders the desktop tab row", () => {
        const { getByRole, getAllByRole } = render(<Demos.SettingsPageWithSidebarNavigationExample />);
        expect(getByRole("combobox", { name: "Page tabs" })).toBeInTheDocument();
        expect(getAllByRole("tab").length).toBe(10);
    });

    it("keeps the personal info form actions reachable", () => {
        const { getAllByRole } = render(<Demos.SettingsPageWithSidebarNavigationExample />);
        expect(getAllByRole("button", { name: "Save" }).length).toBeGreaterThan(0);
        expect(getAllByRole("button", { name: "Cancel" }).length).toBeGreaterThan(0);
    });
});
