import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { ContactCenteredMap } from "./contact-centered-map";
import { ContactFeaturesTabsMap01 } from "./contact-features-tabs-map-01";
import { ContactSimpleIcons01 } from "./contact-simple-icons-01";
import { variantsB } from "./variants.b";

/**
 * Some variants embed a map `<iframe>`. axe-core cannot post messages into jsdom frames, so frame
 * traversal is disabled — every rule still runs against the section's own markup.
 */
const axeOptions = { iframes: false } as const;

describe("Marketing contact sections (part B variants)", () => {
    for (const [slug, Variant] of Object.entries(variantsB)) {
        it(`${slug} has no a11y violations`, async () => {
            const { container } = render(<Variant />);
            expect(await axe(container, axeOptions)).toHaveNoViolations();
        });
    }

    it("exposes all 18 part B variants", () => {
        expect(Object.keys(variantsB)).toHaveLength(18);
    });

    it("renders every store address in the centered map variant", () => {
        const { getByRole, getByTitle } = render(<ContactCenteredMap />);

        expect(getByRole("heading", { level: 3, name: "Melbourne" })).toBeInTheDocument();
        expect(getByRole("heading", { level: 3, name: "Sweden" })).toBeInTheDocument();
        expect(getByTitle("Our address")).toBeInTheDocument();
    });

    it("wires the contact links to mail, map and phone targets", () => {
        const { getByRole } = render(<ContactSimpleIcons01 />);

        expect(getByRole("link", { name: "hi@proper.example" })).toHaveAttribute("href", "mailto:hi@proper.example");
        expect(getByRole("link", { name: "+1 (555) 000-0000" })).toHaveAttribute("href", "tel:+15550000000");
    });

    it("selects the first store tab by default", () => {
        const { getAllByRole } = render(<ContactFeaturesTabsMap01 />);

        const tabs = getAllByRole("tab");
        expect(tabs).toHaveLength(3);
        expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    });
});
