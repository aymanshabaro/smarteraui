import type { Metadata } from "next";
import { LandingCta } from "~/components/landing/landing-cta";
import { LandingFaq } from "~/components/landing/landing-faq";
import { LandingFeatures } from "~/components/landing/landing-features";
import { LandingFooter } from "~/components/landing/landing-footer";
import { LandingHeader } from "~/components/landing/landing-header";
import { LandingHero } from "~/components/landing/landing-hero";
import { LandingLayers } from "~/components/landing/landing-layers";
import { LandingMetrics } from "~/components/landing/landing-metrics";
import { LandingTheming } from "~/components/landing/landing-theming";
import { SITE_NAME } from "~/lib/site";

const TITLE = `${SITE_NAME} — accessible React components, ready on arrival`;
const DESCRIPTION =
    "Smartera UI is an open-source React component library built on React Aria Components and Tailwind CSS v4. 69 component groups, 446 marketing sections and 233 page examples, MIT licensed.";

/** Canonical origin for the marketing site, which is not the docs origin in `~/lib/site`. */
const CANONICAL = "https://smarteraui.com";

export const metadata: Metadata = {
    // Set here rather than in the shared layout: this route is the only one that lives on the
    // marketing origin, so it is the only one whose social-image URLs resolve against it.
    metadataBase: new URL(CANONICAL),
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: CANONICAL },
    openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, siteName: SITE_NAME, type: "website" },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/**
 * The marketing landing page, composed from the library's own marketing sections.
 * Each `~/components/landing/*` file names the section variant it was adapted from.
 */
export default function LandingPage() {
    return (
        <>
            <LandingHeader />
            <main>
                <LandingHero />
                <LandingMetrics />
                <LandingFeatures />
                <LandingLayers />
                <LandingTheming />
                <LandingFaq />
                <LandingCta />
            </main>
            <LandingFooter />
        </>
    );
}
