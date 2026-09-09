import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./log-in-pages.demo";
import { variantsA } from "./variants.a";

describe("Log in pages", () => {
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

    it("exposes the 16 part A variants", () => {
        expect(Object.keys(variantsA)).toHaveLength(16);
    });

    it("renders exactly one level-1 heading per variant", () => {
        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { getAllByRole, unmount } = render(<Variant />);
            expect(getAllByRole("heading", { level: 1 }), slug).toHaveLength(1);
            unmount();
        }
    });

    it("labels the credential fields and the submit action on every variant", () => {
        // The two social-first variants intentionally ship without a password field.
        const withoutPassword = ["login-simple-social-logins", "login-simple-social-login-leading"];

        for (const [slug, Variant] of Object.entries(variantsA)) {
            const { container, getByRole, unmount } = render(<Variant />);

            expect(getByRole("textbox", { name: /email/i }), slug).toBeInTheDocument();
            expect(getByRole("button", { name: /continue with email|^sign in$/i }), slug).toBeInTheDocument();
            expect(container.querySelectorAll('input[type="password"]'), slug).toHaveLength(withoutPassword.includes(slug) ? 0 : 1);

            unmount();
        }
    });

    it("cycles the customer review on the split quote image variants", () => {
        for (const slug of ["login-split-quote-image-01", "login-split-quote-image-02", "login-split-quote-image-03"] as const) {
            const Variant = variantsA[slug];
            const { container, getByRole, unmount } = render(<Variant />);

            const quote = () => container.querySelector("q")?.textContent;
            const first = quote();
            expect(first, slug).toBeTruthy();

            fireEvent.click(getByRole("button", { name: "Next review" }));
            expect(quote(), slug).not.toBe(first);

            fireEvent.click(getByRole("button", { name: "Previous review" }));
            expect(quote(), slug).toBe(first);

            unmount();
        }
    });
});
