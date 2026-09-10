/**
 * The brand-background twin of `HeaderSpaceBetween`: the same two-column page header
 * rendered on `bg-brand-section` with the `*_on-brand` text tokens.
 */
export const HeaderSpaceBetweenBrand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="text-secondary_on-brand md:text-md mb-3 text-sm font-semibold">About us</div>

            <div className="flex flex-col gap-x-16 lg:flex-row">
                <h1 className="text-display-md text-primary_on-brand md:text-display-lg flex-1 font-semibold">About the company</h1>
                <p className="text-tertiary_on-brand mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:max-w-120">
                    Learn more about the company and the world-class team behind Proper UI.
                </p>
            </div>
        </div>
    </section>
);
