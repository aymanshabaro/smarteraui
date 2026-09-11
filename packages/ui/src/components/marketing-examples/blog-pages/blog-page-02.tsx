import { BlogHeaderAltLayout02 } from "../../marketing/blog-sections/blog-header-alt-layout-02";
import { CtaIphoneMockup02 } from "../../marketing/cta-sections/cta-iphone-mockup-02";
import { FooterLarge09 } from "../../marketing/footers/footer-large-09";
import { FloatingSimpleWithFooter } from "../../marketing/header-navigations/floating-simple-with-footer";

/**
 * Blog page 02 — a floating header over a subscribe hero, a recent-posts row and the full archive,
 * followed by a phone-mockup call to action and a dark footer that carries the closing CTA.
 */
export const BlogPage02 = () => (
    <div className="bg-primary">
        <FloatingSimpleWithFooter />

        <BlogHeaderAltLayout02 />

        <CtaIphoneMockup02 />

        <div className="dark-mode">
            <FooterLarge09 />
        </div>
    </div>
);
