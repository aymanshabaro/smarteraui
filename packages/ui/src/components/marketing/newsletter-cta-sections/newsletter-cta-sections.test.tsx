import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import * as Demos from "./newsletter-cta-sections.demo";
import { variantsA } from "./variants.a";

describe("Marketing newsletter CTA sections (part A)", () => {
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

    it("labels the email field and submits with the subscribe button", () => {
        const { getByRole } = render(<Demos.NewsletterCTASectionExample />);

        const email = getByRole("textbox", { name: "Enter your email" });
        expect(email).toHaveAttribute("type", "email");
        expect(email).toBeRequired();
        expect(getByRole("button", { name: "Subscribe" })).toHaveAttribute("type", "submit");
    });

    it("describes the email field with the privacy policy hint", () => {
        const { getByRole, getByText } = render(<Demos.NewsletterCTASectionExample />);

        const email = getByRole("textbox", { name: "Enter your email" });
        const hintId = email.getAttribute("aria-describedby")?.split(" ") ?? [];
        expect(hintId.some((id) => document.getElementById(id)?.textContent?.includes("privacy policy"))).toBe(true);
        expect(getByRole("link", { name: "privacy policy" })).toBeInTheDocument();
        expect(getByText(/Be the first to know when we launch/)).toBeInTheDocument();
    });

    it("keeps the words either side of the mobile line break separated", () => {
        for (const slug of ["newsletter-card-vertical", "newsletter-card-vertical-brand"] as const) {
            const Variant = variantsA[slug];
            const { container } = render(<Variant />);
            expect(container.querySelector("h2")?.textContent?.replace(/\s+/g, " ")).toBe("Still thinking about it?");
        }
    });

    it("renders the branded sections on the brand section background", () => {
        for (const slug of ["newsletter-simple-centered-brand", "newsletter-simple-left-brand"] as const) {
            const Variant = variantsA[slug];
            const { container } = render(<Variant />);
            expect(container.querySelector("section")).toHaveClass("bg-brand-section");
        }
    });

    it("nests the brand panel inside a plain section for the branded cards", () => {
        for (const slug of ["newsletter-card-vertical-brand", "newsletter-card-horizontal-brand", "newsletter-iphone-mockup-04"] as const) {
            const Variant = variantsA[slug];
            const { container } = render(<Variant />);
            expect(container.querySelector("section")).toHaveClass("bg-primary");
            expect(container.querySelector(".bg-brand-section")).toBeInTheDocument();
        }
    });

    it("hides the decorative notification cards from assistive tech", () => {
        const Variant = variantsA["newsletter-iphone-mockup-02"];
        const { container } = render(<Variant />);
        const list = container.querySelector("ul[aria-hidden='true']");
        expect(list).toBeInTheDocument();
        expect(list?.querySelectorAll("li")).toHaveLength(4);
    });

    it("renders the benefit checklist in screen mockup 01", () => {
        const Variant = variantsA["newsletter-screen-mockup-01"];
        const { getByText } = render(<Variant />);
        expect(getByText("Latest releases and tips")).toBeInTheDocument();
        expect(getByText("Our favorite articles each week")).toBeInTheDocument();
        expect(getByText("Exclusive interviews with big names")).toBeInTheDocument();
    });

    it("uses no external image URLs", () => {
        for (const Variant of Object.values(variantsA)) {
            const { container } = render(<Variant />);
            for (const image of container.querySelectorAll("img, image")) {
                const src = image.getAttribute("src") ?? image.getAttribute("xlink:href") ?? image.getAttribute("href") ?? "";
                expect(src.startsWith("http")).toBe(false);
            }
        }
    });
});
