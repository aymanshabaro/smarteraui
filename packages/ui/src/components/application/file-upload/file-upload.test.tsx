import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./file-upload.demo";

describe("File upload", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the disabled drop zone's file input as disabled", () => {
        const { container } = render(<Demos.Disabled />);
        expect(container.querySelector("input[type='file']")).toBeDisabled();
    });

    it("renders the accept-image-only hint text", () => {
        const { getByText } = render(<Demos.AcceptImageOnly />);
        expect(getByText("Please upload PNG or JPEG images only.")).toBeInTheDocument();
    });

    it("renders one file list item per placeholder file in the progress bar example", () => {
        const { getAllByRole } = render(<Demos.FileUploadExample />);
        expect(getAllByRole("listitem")).toHaveLength(3);
    });
});
