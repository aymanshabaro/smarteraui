import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Notification } from "./notifications";
import * as Demos from "./notifications.demo";

describe("Notifications", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the title, the description and the timestamp", () => {
        const { getByText } = render(<Notification title="Katherine Moss" time="2 mins ago" description="I've finished adding my notes." />);

        expect(getByText("Katherine Moss")).toBeTruthy();
        expect(getByText("2 mins ago")).toBeTruthy();
        expect(getByText("I've finished adding my notes.")).toBeTruthy();
    });

    it("renders the close button only when onClose is given, and calls it", () => {
        const onClose = vi.fn();
        const { queryByRole, rerender, getByRole } = render(<Notification title="Saved" />);

        expect(queryByRole("button", { name: "Dismiss" })).toBeNull();

        rerender(<Notification title="Saved" onClose={onClose} />);
        fireEvent.click(getByRole("button", { name: "Dismiss" }));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("exposes the upload progress with a formatted label", () => {
        const { getByRole, getByText } = render(<Notification title="Uploading" progress={75} />);

        expect(getByRole("progressbar").getAttribute("aria-valuenow")).toBe("75");
        expect(getByText("75% uploaded...")).toBeTruthy();
    });

    it("switches to the media layout when an image is given", () => {
        const { container, getAllByRole } = render(<Notification title="New update" image={{ src: "/demo/landscape/landscape-01.svg", alt: "Dashboard" }} />);

        // One crop for desktop, one for mobile — only ever one of them is displayed.
        expect(getAllByRole("img", { name: "Dashboard" })).toHaveLength(2);
        expect(container.firstElementChild?.className).toContain("md:p-0");
    });

    it("nudges the copy down for the outline icon treatment only", () => {
        const { container: modern } = render(<Notification title="Saved" icon={() => <svg />} />);
        const { container: outline } = render(<Notification title="Saved" icon={() => <svg />} iconTheme="outline" />);

        expect(modern.querySelector("[data-featured-icon] + div")?.className).not.toContain("md:pt-0.5");
        expect(outline.querySelector("[data-featured-icon] + div")?.className).toContain("md:pt-0.5");
    });
});
