import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Avatar } from "./avatar";
import { AvatarLabelGroup } from "./avatar-label-group";
import { AvatarProfilePhoto } from "./avatar-profile-photo";
import * as Demos from "./avatar.demo";
import { getInitials } from "./utils";

describe("Avatar", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("applies the size class for each avatar size", () => {
        const { container } = render(<Avatar size="lg" alt="Test" />);
        expect(container.querySelector("[data-avatar]")).toHaveClass("size-12");
    });

    it("renders initials when no image is provided", () => {
        const { getByText } = render(<Avatar initials="OR" alt="Olivia Rhye" />);
        expect(getByText("OR")).toBeInTheDocument();
    });

    it("falls back to the placeholder icon when the image fails to load", () => {
        const { container, getByRole } = render(<Avatar src="/does-not-exist.png" alt="Broken" />);
        const img = getByRole("img");
        fireEvent.error(img);
        expect(container.querySelector("[data-avatar-img]")).not.toBeInTheDocument();
    });

    it("renders a status indicator dot when status is set", () => {
        const { container } = render(<Avatar status="online" alt="Online user" />);
        expect(container.querySelector("[data-avatar] > span")).toBeInTheDocument();
    });
});

describe("AvatarLabelGroup", () => {
    it("renders the title and subtitle", () => {
        const { getByText } = render(<AvatarLabelGroup size="md" alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@proper.example" />);
        expect(getByText("Olivia Rhye")).toBeInTheDocument();
        expect(getByText("olivia@proper.example")).toBeInTheDocument();
    });
});

describe("AvatarProfilePhoto", () => {
    it("renders initials when no image is provided", () => {
        const { getByText } = render(<AvatarProfilePhoto size="md" initials="OR" alt="Olivia Rhye" />);
        expect(getByText("OR")).toBeInTheDocument();
    });
});

describe("getInitials", () => {
    it("returns both initials for a two-word name", () => {
        expect(getInitials("Olivia Rhye")).toBe("OR");
    });

    it("returns a single initial for a one-word name", () => {
        expect(getInitials("Cher")).toBe("C");
    });
});
