/** A two-column mission statement: heading plus continuation copy on the start edge, rich text on the end edge. */
export const ContentSectionSimple02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
            <div className="flex flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Our mission</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Transforming marketplaces</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    We build the infrastructure that lets small teams run marketplaces the way the largest ones do.
                </p>

                <div className="prose md:prose-lg mt-10 hidden md:block">
                    <hr />
                    <p>
                        Smartera started as an internal billing service for a two-sided rental business. The problem was never the payments — it was everything
                        that had to be true before a payment could happen safely.
                    </p>
                    <p>
                        Identity, payouts, disputes, tax and trust all had to agree with one another, and each one lived in a different vendor with a different
                        idea of what an account was. Reconciling them by hand cost more than the transactions were worth.
                    </p>
                    <p>
                        So we wrote the layer we wanted to buy. Today it runs for several thousand operators who would rather spend their attention on supply
                        and demand than on ledger drift.
                    </p>
                </div>
            </div>

            <div className="prose md:prose-lg">
                <hr className="md:hidden md:[&+*]:mt-0!" />
                <p>
                    Our thesis is simple: marketplaces fail on operations far more often than they fail on demand. The founders we work with rarely run out of
                    buyers first. They run out of the ability to settle correctly, at volume, without a finance team.
                </p>
                <ul>
                    <li>Onboarding and payouts that clear the same compliance bar in every market you sell into.</li>
                    <li>A ledger that survives refunds, split fees and partial cancellations without a spreadsheet reconciling it afterwards.</li>
                    <li>Dispute handling that a support agent can run end to end without escalating to engineering.</li>
                </ul>
                <p>
                    None of this is glamorous, and none of it appears on a landing page. It is, however, the difference between a marketplace that can enter its
                    fourth country and one that quietly stops at two.
                </p>
            </div>
        </div>
    </section>
);
