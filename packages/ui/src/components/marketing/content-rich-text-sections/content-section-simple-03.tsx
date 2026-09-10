/** A full-width heading block above two balanced rich-text columns. */
export const ContentSectionSimple03 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="grid max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Beautiful analytics to grow smarter</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-16">
                <div className="prose md:prose-lg">
                    <p>
                        Proper connects to the tools you already run and builds a single event model on top of them. Activation, retention and revenue are
                        defined once and then used everywhere.
                    </p>
                    <p>
                        Dashboards, alerts and the weekly report all read from the same definitions, so the number in the board deck matches the number in the
                        support queue. Every metric links back to the query that produced it, which means anyone can check the working without waiting on an
                        analyst.
                    </p>
                    <p>
                        Getting there takes about an afternoon. You point Proper at a warehouse or a product database, confirm the three or four events that
                        actually matter to your business, and the rest of the model is generated from what it finds.
                    </p>
                </div>

                <div className="prose md:prose-lg">
                    <p>
                        From then on the work is editorial rather than technical. You decide which questions are worth asking each week, and the definitions
                        stay somewhere the whole team can argue with them.
                    </p>
                    <ul>
                        <li>Funnels that update themselves when you rename an event.</li>
                        <li>Cohorts you can hand to marketing without exporting a CSV first.</li>
                        <li>Alerts that fire on the metric, not on the dashboard that happens to display it.</li>
                    </ul>
                    <p>
                        The teams that get the most out of this treat their metric definitions like code: reviewed, versioned, and changed on purpose rather
                        than by accident.
                    </p>
                </div>
            </div>
        </div>
    </section>
);
