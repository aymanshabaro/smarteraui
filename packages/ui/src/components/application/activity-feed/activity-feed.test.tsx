import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { ActivityFeed } from "./activity-feed";
import * as Demos from "./activity-feed.demo";

describe("ActivityFeed", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders every entry as a list item of a labelled list", () => {
        const { getByRole, getAllByRole } = render(<Demos.ActivityFeedExample />);

        expect(getByRole("list", { name: "Recent activity" })).toBeTruthy();
        expect(getAllByRole("listitem")).toHaveLength(15);
    });

    it("separates entries with a divider in the divided treatment", () => {
        const { container } = render(<Demos.ActivityFeedDivided />);

        expect(container.querySelector("ul")?.className).toContain("divide-y");
        expect(container.querySelector("li")?.className).toContain("pb-4");
    });

    it("draws one connector per entry in the connected treatment, hiding the last", () => {
        const { container } = render(<Demos.ActivityFeedConnected />);
        const connectors = container.querySelectorAll("line");

        expect(container.querySelector("ul")?.className).not.toContain("divide-y");
        expect(connectors).toHaveLength(15);
        expect(connectors[0]?.closest("div")?.className).toContain("group-last/item:hidden");
    });

    it("spaces entries without a divider in the spaced treatment", () => {
        const { container } = render(<Demos.ActivityFeedSpaced />);

        expect(container.querySelector("ul")?.className).toContain("gap-8");
        expect(container.querySelector("ul")?.className).not.toContain("divide-y");
    });

    it("exposes the timestamp as a machine readable time element", () => {
        const { container } = render(
            <ActivityFeed aria-label="Feed">
                <ActivityFeed.Item name="Olivia Rhye" time="2 mins ago" dateTime="2027-01-20T17:20" action="Sent you a message" />
            </ActivityFeed>,
        );

        expect(container.querySelector("time")?.getAttribute("datetime")).toBe("2027-01-20T17:20");
    });

    it("marks unread entries with a labelled dot", () => {
        const { getAllByRole } = render(<Demos.ActivityFeedExample />);

        expect(getAllByRole("img", { name: "Unread" })).toHaveLength(5);
    });
});
