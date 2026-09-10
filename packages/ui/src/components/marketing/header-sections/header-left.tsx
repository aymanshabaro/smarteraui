/**
 * The plainest page header: eyebrow, headline and paragraph aligned to the start
 * edge inside a 48rem measure.
 */
export const HeaderLeft = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">About us</span>
                <h1 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">About the company</h1>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Learn more about the company and the world-class team behind Proper UI.</p>
            </div>
        </div>
    </section>
);
