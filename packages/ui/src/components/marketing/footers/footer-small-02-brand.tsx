import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";

/**
 * The brand-background twin of `FooterSmall02`: the logo and a copyright line on a solid
 * brand section, centred and stacked on mobile and split apart from `lg` up.
 */
export const FooterSmall02Brand = () => {
    return (
        <footer className="bg-brand-section py-12">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col items-center justify-center md:justify-between lg:flex-row">
                    {/* The mark is always the light lockup on the solid brand background. */}
                    <SmarteraLogo className="dark-mode" />

                    <p className="text-quaternary_on-brand mt-12 text-sm lg:mt-0">© 2077 Smartera. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
