/**
 * Page header with the eyebrow above a two-column row: the headline on the start
 * side and the supporting paragraph beside it from `lg` up.
 */
export const HeaderSpaceBetween = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="text-brand-secondary md:text-md mb-3 text-sm font-semibold">About us</div>

            <div className="flex flex-col gap-x-16 lg:flex-row">
                <h1 className="text-display-md text-primary md:text-display-lg flex-1 font-semibold">About the company</h1>
                <p className="text-tertiary mt-4 w-full text-lg md:mt-6 md:text-xl lg:mt-3 lg:max-w-120">
                    Learn more about the company and the world-class team behind Proper.
                </p>
            </div>
        </div>
    </section>
);
