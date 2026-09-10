import { ProperLogo } from "@/components/foundations/logo/proper-logo";

/**
 * The smallest footer: the logo and a copyright line, centred and stacked on mobile,
 * split to opposite ends of the container from `lg` up.
 */
export const FooterSmall02 = () => {
    return (
        <footer className="bg-primary py-12">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col items-center justify-center md:justify-between lg:flex-row">
                    <ProperLogo className="h-7 w-min shrink-0" />

                    <p className="text-quaternary mt-12 text-sm lg:mt-0">© 2077 Proper. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
