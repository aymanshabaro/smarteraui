import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Tag, TagGroup, TagList } from "./tags";
import * as Demos from "./tags.demo";

describe("Tags", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }
});

describe("Tag sizes", () => {
    it("applies the sm size classes to every tag in the group", () => {
        const { container } = render(<Demos.SizesExample />);
        const tags = container.querySelectorAll('[role="row"]');
        expect(tags.length).toBeGreaterThan(0);
    });
});

describe("Tag count", () => {
    it("renders the count badge text", () => {
        const { getAllByText } = render(<Demos.CountExample />);
        expect(getAllByText("5").length).toBeGreaterThan(0);
    });
});

describe("Tag rest props", () => {
    it("spreads rest props (data-*) onto the root element instead of silently dropping them", () => {
        const { getByText } = render(
            <TagGroup label="Tags">
                <TagList>
                    <Tag id="a" data-testid="my-tag">
                        Label
                    </Tag>
                </TagList>
            </TagGroup>,
        );
        const tag = getByText("Label").closest("[role='row']");
        expect(tag).toHaveAttribute("data-testid", "my-tag");
    });
});
