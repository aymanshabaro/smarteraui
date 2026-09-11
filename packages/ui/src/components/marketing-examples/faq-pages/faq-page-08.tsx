"use client";

import { SearchLg } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";
import { FaqAccordion04 } from "../../marketing/faq-sections/faq-accordion-04";
import { FeaturesIconsAndImage01 } from "../../marketing/features-sections/features-icons-and-image-01";
import { FooterLarge10Brand } from "../../marketing/footers/footer-large-10-brand";
import { HeaderDropdownSimple } from "../../marketing/header-navigations/header-dropdown-simple";

const styles = sortCx({
    // The hero opens on the brand section, so the header is painted to match it.
    brandHeader: [
        "[&>header]:bg-brand-section",
        "[&_nav>ul>li>a]:text-secondary_on-brand [&_nav>ul>li>a]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button]:text-secondary_on-brand [&_nav>ul>li>button]:hover:text-secondary_on-brand",
        "[&_nav>ul>li>button>svg]:text-fg-brand-secondary_alt",
        "[&_svg_path.fill-fg-primary]:fill-fg-white",
    ].join(" "),
    // The features block follows a section that already carries the bottom gutter.
    withoutTopPadding: "[&>section]:pt-0",
});

/**
 * FAQ page 08 — a brand-coloured header and searchable hero, the two-column card accordion,
 * a branded trial panel, the annotated features block and the brand trial footer.
 */
export const FaqPage08 = () => (
    <div className="bg-primary">
        <div className={styles.brandHeader}>
            <HeaderDropdownSimple />
        </div>

        <section className="bg-brand-section py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <p className="text-secondary_on-brand md:text-md mb-3 text-sm font-semibold">Support</p>

                {/* The paragraph is pulled level with the headline from `lg` by zeroing its height. */}
                <div className="grid grid-cols-[minmax(auto,768px)] gap-x-16 lg:grid-cols-[1fr_480px]">
                    <h1 className="text-display-md text-primary_on-brand md:text-display-lg font-semibold">Top questions about Proper UI</h1>
                    <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0">
                        Need something cleared up? Here are our most frequently asked questions.
                    </p>

                    <div className="mt-8 w-full sm:w-80">
                        <Input size="lg" type="search" icon={SearchLg} aria-label="Search" placeholder="Search" wrapperClassName="sm:py-0.5" />
                    </div>
                </div>
            </div>
        </section>

        <FaqAccordion04 />

        <section className="bg-primary pb-16 md:pb-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="bg-brand-section flex flex-col items-center rounded-2xl px-6 py-10 text-center lg:p-16">
                    <h2 className="text-display-sm text-primary_on-brand xl:text-display-md font-semibold">
                        <span className="hidden md:inline">Start your 30-day free trial</span>
                        <span className="md:hidden">Start your free trial</span>
                    </h2>
                    <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 lg:text-xl">Join over 4,000+ startups already growing with Proper UI.</p>

                    <div className="mt-8 flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:self-center">
                        {/* The secondary button loses its ring on the brand background. */}
                        <Button size="xl" color="secondary" className="shadow-xs! ring-0">
                            Learn more
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>
        </section>

        <div className={styles.withoutTopPadding}>
            <FeaturesIconsAndImage01 />
        </div>

        <FooterLarge10Brand />
    </div>
);
