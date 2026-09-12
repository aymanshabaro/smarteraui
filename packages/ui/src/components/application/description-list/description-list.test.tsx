import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { DescriptionList } from "./description-list";
import * as Demos from "./description-list.demo";

describe("DescriptionList", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders term/details pairs as dt/dd inside a dl", () => {
        const { container, getByText } = render(
            <DescriptionList>
                <DescriptionList.Item>
                    <DescriptionList.Term>Name</DescriptionList.Term>
                    <DescriptionList.Details>Jane Doe</DescriptionList.Details>
                </DescriptionList.Item>
            </DescriptionList>,
        );

        expect(container.querySelector("dl")).toBeInTheDocument();
        expect(getByText("Name").tagName).toBe("DT");
        expect(getByText("Jane Doe").tagName).toBe("DD");
    });

    it("defaults to the stacked layout", () => {
        const { getByText } = render(
            <DescriptionList>
                <DescriptionList.Item>
                    <DescriptionList.Term>Email</DescriptionList.Term>
                    <DescriptionList.Details>jane@example.com</DescriptionList.Details>
                </DescriptionList.Item>
            </DescriptionList>,
        );
        expect(getByText("Email").className).not.toContain("sm:w-48");
    });

    it("applies the horizontal layout classes to term and details", () => {
        const { getByText } = render(
            <DescriptionList layout="horizontal">
                <DescriptionList.Item>
                    <DescriptionList.Term>Email</DescriptionList.Term>
                    <DescriptionList.Details>jane@example.com</DescriptionList.Details>
                </DescriptionList.Item>
            </DescriptionList>,
        );
        expect(getByText("Email").className).toContain("sm:w-48");
        expect(getByText("jane@example.com").className).toContain("sm:flex-1");
    });

    it("adds dividers between items only when requested", () => {
        const { container: withDividers } = render(
            <DescriptionList dividers>
                <DescriptionList.Item>
                    <DescriptionList.Term>A</DescriptionList.Term>
                    <DescriptionList.Details>1</DescriptionList.Details>
                </DescriptionList.Item>
            </DescriptionList>,
        );
        expect(withDividers.querySelector("dl")?.className).toContain("divide-y");

        const { container: withoutDividers } = render(
            <DescriptionList>
                <DescriptionList.Item>
                    <DescriptionList.Term>A</DescriptionList.Term>
                    <DescriptionList.Details>1</DescriptionList.Details>
                </DescriptionList.Item>
            </DescriptionList>,
        );
        expect(withoutDividers.querySelector("dl")?.className).not.toContain("divide-y");
    });
});
