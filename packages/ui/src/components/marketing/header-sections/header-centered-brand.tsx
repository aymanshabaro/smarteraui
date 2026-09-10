/**
 * Centered page header on the brand section background, using the `*_on-brand`
 * foreground tokens so the copy stays legible in light and dark themes.
 */
export const HeaderCenteredBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-secondary_on-brand md:text-md text-sm font-semibold">About us</span>
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg mt-3 font-semibold">About the company</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl">Learn more about the company and the world-class team behind Proper.</p>
            </div>
        </div>
    </section>
);
