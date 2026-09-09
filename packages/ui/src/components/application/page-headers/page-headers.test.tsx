import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { PageHeader } from "./page-headers";
import * as Demos from "./page-headers.demo";

describe("PageHeader", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the title as the heading and the description", () => {
        const { getByRole, getByText } = render(<Demos.Simple />);
        expect(getByRole("heading", { level: 1, name: "Team members" })).toBeTruthy();
        expect(getByText("Manage your team members and their account permissions here.")).toBeTruthy();
    });

    it("renders the actions", () => {
        const { getByRole } = render(<Demos.Simple />);
        expect(getByRole("button", { name: "Import" })).toBeTruthy();
        expect(getByRole("button", { name: "Add member" })).toBeTruthy();
    });

    it("centers the content when align is center", () => {
        const { container } = render(
            <PageHeader align="center">
                <PageHeader.Content>
                    <PageHeader.Heading>
                        <PageHeader.Title>Centered</PageHeader.Title>
                    </PageHeader.Heading>
                </PageHeader.Content>
            </PageHeader>,
        );

        expect(container.querySelector("header")?.className).toContain("items-center");
    });

    it("offsets the avatar over a banner", () => {
        const { container } = render(<Demos.BannerAvatar />);
        expect(container.querySelector("[data-avatar]")?.parentElement?.className).toContain("-mt-12");
    });

    it("keeps the avatar inline when there is no banner", () => {
        const { container } = render(<Demos.Avatar />);
        expect(container.querySelector("[data-avatar]")?.parentElement?.className).not.toContain("-mt-12");
    });
});
