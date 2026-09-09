/** Two balanced rich-text columns with no heading — the plainest of the content sections. */
export const ContentSectionSimple04 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-16">
                <div className="prose md:prose-lg">
                    <p>
                        Most teams already collect more than enough data. What they are missing is a shared place to look at it, and a shared vocabulary for
                        describing what they see when they get there.
                    </p>
                    <p>
                        Smartera connects to the tools you already run and builds a single event model on top of them. Activation, retention and revenue are
                        defined once, reviewed by the whole team, and then used everywhere — dashboards, alerts and the weekly report all read from the same
                        definitions.
                    </p>
                    <p>
                        The result is fewer arguments about whose number is right and more time spent on the question underneath. Every metric links back to the
                        query that produced it, so anyone can check the working without waiting on an analyst.
                    </p>
                </div>

                <div className="prose md:prose-lg">
                    <p>
                        Getting there takes about an afternoon. You point Smartera at a warehouse or a product database, confirm the three or four events that
                        actually matter to your business, and the rest of the model is generated from what it finds.
                    </p>
                    <ul>
                        <li>Funnels that update themselves when you rename an event.</li>
                        <li>Cohorts you can hand to marketing without exporting a CSV first.</li>
                        <li>Alerts that fire on the metric, not on the dashboard that happens to display it.</li>
                    </ul>
                    <p>
                        From then on the work is editorial rather than technical. You decide which questions are worth asking each week, and the definitions
                        stay where the whole team can argue with them.
                    </p>
                </div>
            </div>
        </div>
    </section>
);
